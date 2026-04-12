import {NextRequest, NextResponse} from "next/server"
import {resolveLocationsFromVisits} from "@/lib/location-cron"
import {refreshAllStatisticsCache} from "@/lib/statistics"

export const dynamic = "force-dynamic"

function isAuthorized(request: NextRequest): boolean {
  const expectedSecret = process.env.CRON_SECRET
  if (!expectedSecret) {
    return true
  }

  const authorization = request.headers.get("authorization")
  return authorization === `Bearer ${expectedSecret}`
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  try {
    const locationSummary = await resolveLocationsFromVisits()
    const cacheSummary = await refreshAllStatisticsCache()

    return NextResponse.json({
      ok: true,
      locationSummary,
      cacheSummary,
    })
  } catch (error) {
    console.error("Cron location refresh failed:", error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {status: 500},
    )
  }
}
