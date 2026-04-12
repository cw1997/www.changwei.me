import {eq, sql} from "drizzle-orm"
import {db} from "@/db"
import {statisticCache} from "@/db/schema"

export const STATISTIC_CACHE_TTL_MS = 60 * 60 * 1000

export const QUERY_TYPES = [
  "dailyVisits",
  "geoDistribution",
  "languageDistribution",
  "deviceDistribution",
  "browserDistribution",
  "osDistribution",
  "screenDistribution",
] as const

export type QueryType = (typeof QUERY_TYPES)[number]

interface QueryDef {
  sql: string
  description: string
}

export interface StatisticResult {
  data: Record<string, unknown>[]
  sql: string
  description: string
  executionTimeMs: number
  cachedAt: string
  fromCache: boolean
}

const queries: Record<QueryType, QueryDef> = {
  dailyVisits: {
    sql: `SELECT
  DATE(visited_at) AS date,
  COALESCE(device_type, 'desktop') AS device_type,
  COUNT(*) AS count
FROM page_visits
GROUP BY DATE(visited_at), COALESCE(device_type, 'desktop')
ORDER BY date ASC`,
    description: "Daily visits grouped by device type",
  },
  geoDistribution: {
    sql: `SELECT
  COALESCE(cl.country, pv.country, 'Unknown') AS country,
  AVG(CAST(cl.latitude AS DECIMAL(10,6))) AS latitude,
  AVG(CAST(cl.longitude AS DECIMAL(10,6))) AS longitude,
  COUNT(*) AS count
FROM page_visits pv
LEFT JOIN cron_location cl
  ON JSON_UNQUOTE(JSON_EXTRACT(pv.ip_chain, '$[0]')) = cl.ip
GROUP BY COALESCE(cl.country, pv.country, 'Unknown')
ORDER BY count DESC
LIMIT 100`,
    description: "Geographic distribution by country with map coordinates",
  },
  languageDistribution: {
    sql: `SELECT
  COALESCE(language, 'Unknown') AS language,
  COUNT(*) AS count
FROM page_visits
GROUP BY language
ORDER BY count DESC
LIMIT 30`,
    description: "Browser language distribution",
  },
  deviceDistribution: {
    sql: `SELECT
  COALESCE(device_type, 'Unknown') AS device_type,
  COUNT(*) AS count
FROM page_visits
GROUP BY device_type
ORDER BY count DESC`,
    description: "Device type distribution",
  },
  browserDistribution: {
    sql: `SELECT
  COALESCE(browser_name, 'Unknown') AS browser_name,
  COUNT(*) AS count
FROM page_visits
GROUP BY browser_name
ORDER BY count DESC
LIMIT 20`,
    description: "Browser distribution",
  },
  osDistribution: {
    sql: `SELECT
  COALESCE(os_name, 'Unknown') AS os_name,
  COUNT(*) AS count
FROM page_visits
GROUP BY os_name
ORDER BY count DESC
LIMIT 20`,
    description: "Operating system distribution",
  },
  screenDistribution: {
    sql: `SELECT
  CONCAT(screen_width, 'x', screen_height) AS resolution,
  COUNT(*) AS count
FROM page_visits
WHERE screen_width IS NOT NULL AND screen_height IS NOT NULL
GROUP BY screen_width, screen_height
ORDER BY count DESC
LIMIT 20`,
    description: "Screen resolution distribution",
  },
}

function asRows(result: unknown): Record<string, unknown>[] {
  if (Array.isArray(result)) {
    return result as Record<string, unknown>[]
  }

  if (typeof result === "object" && result !== null && "rows" in result) {
    const rows = (result as {rows?: unknown[]}).rows
    if (Array.isArray(rows)) {
      return rows as Record<string, unknown>[]
    }
  }

  return []
}

function parseExecutionTimeMs(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.round(numeric * 100) / 100
}

function toDateString(date: Date): string {
  return date.toISOString()
}

export function isQueryType(value: string): value is QueryType {
  return QUERY_TYPES.includes(value as QueryType)
}

export function getQueryDef(type: QueryType): QueryDef {
  return queries[type]
}

async function runSourceQuery(type: QueryType): Promise<Omit<StatisticResult, "fromCache">> {
  const queryDef = queries[type]
  const started = performance.now()
  const result = await db.execute(sql.raw(queryDef.sql))
  const executionTimeMs = Math.round((performance.now() - started) * 100) / 100
  const data = asRows(result)
  const cachedAt = new Date()

  await db
    .insert(statisticCache)
    .values({
      queryType: type,
      payloadJson: data,
      sqlText: queryDef.sql,
      description: queryDef.description,
      executionTimeMs: executionTimeMs.toFixed(2),
      cachedAt,
    })
    .onDuplicateKeyUpdate({
      set: {
        payloadJson: data,
        sqlText: queryDef.sql,
        description: queryDef.description,
        executionTimeMs: executionTimeMs.toFixed(2),
        cachedAt,
      },
    })

  return {
    data,
    sql: queryDef.sql,
    description: queryDef.description,
    executionTimeMs,
    cachedAt: toDateString(cachedAt),
  }
}

export async function getStatistic(type: QueryType, forceRefresh = false): Promise<StatisticResult> {
  const cachedRows = await db
    .select()
    .from(statisticCache)
    .where(eq(statisticCache.queryType, type))
    .limit(1)

  const cached = cachedRows[0]

  if (!forceRefresh && cached) {
    const ageMs = Date.now() - cached.cachedAt.getTime()
    if (ageMs < STATISTIC_CACHE_TTL_MS) {
      return {
        data: Array.isArray(cached.payloadJson)
          ? (cached.payloadJson as Record<string, unknown>[])
          : [],
        sql: cached.sqlText,
        description: cached.description,
        executionTimeMs: parseExecutionTimeMs(cached.executionTimeMs),
        cachedAt: toDateString(cached.cachedAt),
        fromCache: true,
      }
    }
  }

  const refreshed = await runSourceQuery(type)
  return {
    ...refreshed,
    fromCache: false,
  }
}

export async function refreshAllStatisticsCache() {
  const results: Array<{type: QueryType; ok: boolean; error?: string}> = []

  for (const type of QUERY_TYPES) {
    try {
      await getStatistic(type, true)
      results.push({type, ok: true})
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      results.push({type, ok: false, error: message})
    }
  }

  return {
    refreshedAt: new Date().toISOString(),
    results,
  }
}
