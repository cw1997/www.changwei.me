import {NextRequest, NextResponse} from "next/server"
import {UAParser} from "ua-parser-js"
import type {IDevice} from "ua-parser-js"
import * as Sentry from "@sentry/nextjs"
import {getDb} from "@/db"
import {pageVisits} from "@/db/schema"

interface TrackBody {
  path: string
  screenWidth?: number
  screenHeight?: number
  viewportWidth?: number
  viewportHeight?: number
  language?: string
  locale?: string
  deviceModel?: string | null
  cpuArchitecture?: string | null
  cpuCores?: number | null
  deviceMemoryGb?: number | null
  networkType?: string | null
  networkDownlinkMbps?: number | null
  networkRttMs?: number | null
  networkSaveData?: boolean | null
  platform?: string | null
  platformVersion?: string | null
  uaFullVersion?: string | null
  formFactor?: string | null
  timezone?: string | null
}

function normalizeTrackedPath(value: unknown): string {
  if (typeof value !== "string") {
    return "/"
  }

  const trimmed = value.trim()
  if (!trimmed || !trimmed.startsWith("/")) {
    return "/"
  }

  return trimmed.slice(0, 2048)
}

function toNullableString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  return trimmed.slice(0, maxLength)
}

function parseIpChain(request: NextRequest): string[] {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",").map((ip) => ip.trim()).filter(Boolean)
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return [realIp.trim()]
  }
  return []
}

function classifyDevice(device: IDevice): string {
  const type = device.type?.toLowerCase()
  if (type === "mobile" || type === "wearable") return "mobile"
  if (type === "tablet") return "tablet"
  return "desktop"
}

function toNullableInteger(value: unknown): number | null {
  const numeric = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(numeric)) return null
  return Math.round(numeric)
}

function toNullableDecimalString(value: unknown): string | null {
  const numeric = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(numeric)) return null
  return numeric.toFixed(2)
}

const MAX_BODY_BYTES = 8 * 1024

export async function POST(request: NextRequest) {
  // Guard the payload before parsing: this endpoint is an open write path into
  // the public statistics, so an unbounded body would be a cheap way to waste
  // memory and disk.
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({error: "Unsupported Media Type"}, {status: 415})
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "")
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({error: "Payload Too Large"}, {status: 413})
  }

  let body: TrackBody
  try {
    const parsed: unknown = await request.json()
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return NextResponse.json({error: "Invalid payload"}, {status: 400})
    }
    body = parsed as TrackBody
  } catch {
    return NextResponse.json({error: "Invalid JSON"}, {status: 400})
  }

  try {
    const userAgent = request.headers.get("user-agent") ?? undefined
    const referer = request.headers.get("referer") ?? undefined
    const ipChain = parseIpChain(request)

    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser()
    const os = parser.getOS()
    const device = parser.getDevice()
    const cpu = parser.getCPU()

    await getDb().insert(pageVisits).values({
      visitedAt: new Date(),
      path: normalizeTrackedPath(body.path),
      ipChain,
      userAgent: toNullableString(userAgent, 512),
      referer: toNullableString(referer, 2048),
      language: toNullableString(body.language, 64),
      screenWidth: toNullableInteger(body.screenWidth),
      screenHeight: toNullableInteger(body.screenHeight),
      viewportWidth: toNullableInteger(body.viewportWidth),
      viewportHeight: toNullableInteger(body.viewportHeight),
      deviceType: classifyDevice(device),
      browserName: browser.name ?? null,
      browserVersion: browser.version ?? null,
      osName: os.name ?? null,
      osVersion: os.version ?? null,
      locale: toNullableString(body.locale, 16),
      country: null,
      city: null,
      deviceVendor: device.vendor ?? null,
      deviceModel: toNullableString(body.deviceModel, 128) ?? device.model ?? null,
      cpuArchitecture: toNullableString(body.cpuArchitecture, 64) ?? cpu.architecture ?? null,
      cpuCores: toNullableInteger(body.cpuCores),
      deviceMemoryGb: toNullableInteger(body.deviceMemoryGb),
      networkType: toNullableString(body.networkType, 64),
      networkDownlinkMbps: toNullableDecimalString(body.networkDownlinkMbps),
      networkRttMs: toNullableInteger(body.networkRttMs),
      networkSaveData: body.networkSaveData == null ? null : body.networkSaveData ? 1 : 0,
      platform: toNullableString(body.platform, 128),
      platformVersion: toNullableString(body.platformVersion, 64),
      uaFullVersion: toNullableString(body.uaFullVersion, 64),
      formFactor: toNullableString(body.formFactor, 64),
      timezone: toNullableString(body.timezone, 64),
    })

    return new NextResponse(null, {status: 204})
  } catch (error) {
    // Previously this also returned 204, so a completely broken database was
    // invisible: no client signal, no error rate, nothing in the dashboards.
    console.error("Failed to track page visit:", error)
    Sentry.captureException(error)
    return NextResponse.json({error: "Failed to record page view"}, {status: 500})
  }
}
