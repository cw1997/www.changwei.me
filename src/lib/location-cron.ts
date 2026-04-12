import {sql} from "drizzle-orm"
import {db} from "@/db"
import {cronLocation} from "@/db/schema"

const DEFAULT_BATCH_SIZE = 200
const GEO_LOOKUP_BASE_URL = process.env.IP_GEOLOOKUP_API_BASE?.replace(/\/$/, "") || "https://ipwho.is"

interface IpWhoIsResponse {
  success?: boolean
  ip?: string
  type?: string
  continent?: string
  country?: string
  country_code?: string
  region?: string
  city?: string
  latitude?: number
  longitude?: number
  timezone?: {
    id?: string
  }
  connection?: {
    isp?: string
    org?: string
  }
}

function asRows(result: unknown): Record<string, unknown>[] {
  if (Array.isArray(result)) return result as Record<string, unknown>[]
  if (typeof result === "object" && result && "rows" in result) {
    const rows = (result as {rows?: unknown[]}).rows
    if (Array.isArray(rows)) return rows as Record<string, unknown>[]
  }
  return []
}

function normalizeIp(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed.includes(":")) {
    return trimmed
  }

  if (trimmed.startsWith("[") && trimmed.includes("]")) {
    return trimmed.slice(1, trimmed.indexOf("]"))
  }

  const lastColon = trimmed.lastIndexOf(":")
  if (lastColon > 0 && /^\d+$/.test(trimmed.slice(lastColon + 1))) {
    const maybeIpv4 = trimmed.slice(0, lastColon)
    if (/^\d+\.\d+\.\d+\.\d+$/.test(maybeIpv4)) {
      return maybeIpv4
    }
  }

  return trimmed
}

function isPrivateIpv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => Number(p))
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    return false
  }

  if (parts[0] === 10) return true
  if (parts[0] === 127) return true
  if (parts[0] === 169 && parts[1] === 254) return true
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true
  if (parts[0] === 192 && parts[1] === 168) return true
  return false
}

function isPrivateIpv6(ip: string): boolean {
  const normalized = ip.toLowerCase()
  return (
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80")
  )
}

function isPublicIp(rawIp: string): boolean {
  const ip = normalizeIp(rawIp)
  if (!ip) return false

  if (/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
    return !isPrivateIpv4(ip)
  }

  if (ip.includes(":")) {
    return !isPrivateIpv6(ip)
  }

  return false
}

function numericOrNull(input: unknown): string | null {
  const n = typeof input === "number" ? input : Number(input)
  if (!Number.isFinite(n)) return null
  return n.toFixed(6)
}

async function fetchLocation(ip: string): Promise<IpWhoIsResponse | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(`${GEO_LOOKUP_BASE_URL}/${encodeURIComponent(ip)}`, {
      method: "GET",
      headers: {"accept": "application/json"},
      signal: controller.signal,
      cache: "no-store",
    })

    if (!res.ok) return null
    const payload = (await res.json()) as IpWhoIsResponse
    if (!payload.success) return null
    return payload
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

async function upsertLocation(ip: string, payload: IpWhoIsResponse) {
  const now = new Date()

  await db
    .insert(cronLocation)
    .values({
      ip,
      ipType: payload.type ?? null,
      continent: payload.continent ?? null,
      country: payload.country ?? null,
      countryCode: payload.country_code ?? null,
      region: payload.region ?? null,
      city: payload.city ?? null,
      latitude: numericOrNull(payload.latitude),
      longitude: numericOrNull(payload.longitude),
      timezone: payload.timezone?.id ?? null,
      isp: payload.connection?.isp ?? null,
      org: payload.connection?.org ?? null,
      source: "ipwho.is",
      rawPayload: payload,
      createdAt: now,
      updatedAt: now,
    })
    .onDuplicateKeyUpdate({
      set: {
        ipType: payload.type ?? null,
        continent: payload.continent ?? null,
        country: payload.country ?? null,
        countryCode: payload.country_code ?? null,
        region: payload.region ?? null,
        city: payload.city ?? null,
        latitude: numericOrNull(payload.latitude),
        longitude: numericOrNull(payload.longitude),
        timezone: payload.timezone?.id ?? null,
        isp: payload.connection?.isp ?? null,
        org: payload.connection?.org ?? null,
        source: "ipwho.is",
        rawPayload: payload,
        updatedAt: now,
      },
    })
}

async function backfillVisitGeoColumns() {
  await db.execute(sql.raw(`UPDATE page_visits pv
JOIN cron_location cl
  ON JSON_UNQUOTE(JSON_EXTRACT(pv.ip_chain, '$[0]')) = cl.ip
SET
  pv.country = COALESCE(cl.country, pv.country),
  pv.city = COALESCE(cl.city, pv.city)
WHERE pv.country IS NULL OR pv.city IS NULL`))
}

export async function resolveLocationsFromVisits(batchSize = DEFAULT_BATCH_SIZE) {
  const rowsResult = await db.execute(sql.raw(`SELECT DISTINCT ip FROM (
  SELECT JSON_UNQUOTE(JSON_EXTRACT(ip_chain, '$[0]')) AS ip
  FROM page_visits
) source
LEFT JOIN cron_location cl ON source.ip = cl.ip
WHERE source.ip IS NOT NULL
  AND source.ip <> ''
  AND cl.ip IS NULL
LIMIT ${Math.max(1, Math.floor(batchSize))}`))

  const ips = asRows(rowsResult)
    .map((row) => String(row.ip ?? "").trim())
    .filter(Boolean)

  let skippedPrivate = 0
  let resolved = 0
  let failed = 0

  for (const candidate of ips) {
    const ip = normalizeIp(candidate)

    if (!isPublicIp(ip)) {
      skippedPrivate += 1
      continue
    }

    const payload = await fetchLocation(ip)
    if (!payload) {
      failed += 1
      continue
    }

    await upsertLocation(ip, payload)
    resolved += 1
  }

  await backfillVisitGeoColumns()

  return {
    processed: ips.length,
    resolved,
    failed,
    skippedPrivate,
    lookupBaseUrl: GEO_LOOKUP_BASE_URL,
    updatedAt: new Date().toISOString(),
  }
}
