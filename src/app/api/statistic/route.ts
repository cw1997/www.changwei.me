import {NextRequest, NextResponse} from "next/server"
import {QUERY_TYPES, getQueryDef, getStatistic, isQueryType} from "@/lib/statistics"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type")

  if (!type || !isQueryType(type)) {
    return NextResponse.json(
      {error: "Invalid query type", validTypes: QUERY_TYPES},
      {status: 400},
    )
  }

  try {
    const result = await getStatistic(type)

    return NextResponse.json({
      data: result.data,
      sql: result.sql,
      description: result.description,
      executionTimeMs: result.executionTimeMs,
      cachedAt: result.cachedAt,
      fromCache: result.fromCache,
    })
  } catch (error) {
    const queryDef = getQueryDef(type)
    console.error(`Statistic query [${type}] failed:`, error)
    return NextResponse.json(
      {error: "Query execution failed", sql: queryDef.sql},
      {status: 500},
    )
  }
}
