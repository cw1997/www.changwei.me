import {NextRequest, NextResponse} from "next/server"
import {sql} from "drizzle-orm"
import {db} from "@/db"

export const dynamic = "force-dynamic"

type QueryType =
  | "dailyVisits"
  | "geoDistribution"
  | "languageDistribution"
  | "deviceDistribution"
  | "browserDistribution"
  | "osDistribution"
  | "screenDistribution"

interface QueryDef {
  sql: string
  description: string
}

const queries: Record<QueryType, QueryDef> = {
  dailyVisits: {
    sql: `SELECT
  DATE(visited_at) AS date,
  device_type,
  COUNT(*) AS count
FROM page_visits
GROUP BY DATE(visited_at), device_type
ORDER BY date ASC`,
    description: "Daily visits grouped by device type",
  },
  geoDistribution: {
    sql: `SELECT
  COALESCE(country, 'Unknown') AS country,
  COUNT(*) AS count
FROM page_visits
GROUP BY country
ORDER BY count DESC
LIMIT 50`,
    description: "Geographic distribution by country",
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

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") as QueryType | null

  if (!type || !queries[type]) {
    return NextResponse.json(
      {error: "Invalid query type", validTypes: Object.keys(queries)},
      {status: 400},
    )
  }

  const queryDef = queries[type]

  try {
    const start = performance.now()
    const result = await db.execute(sql.raw(queryDef.sql))
    const executionTimeMs = Math.round((performance.now() - start) * 100) / 100

    const data = Array.isArray(result) ? result : (result as {rows?: unknown[]}).rows ?? []

    return NextResponse.json({
      data,
      sql: queryDef.sql,
      description: queryDef.description,
      executionTimeMs,
    })
  } catch (error) {
    console.error(`Statistic query [${type}] failed:`, error)
    return NextResponse.json(
      {error: "Query execution failed", sql: queryDef.sql},
      {status: 500},
    )
  }
}
