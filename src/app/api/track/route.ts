import {NextRequest, NextResponse} from "next/server"
import {UAParser} from "ua-parser-js"
import type {IDevice} from "ua-parser-js"
import {db} from "@/db"
import {pageVisits} from "@/db/schema"

interface TrackBody {
  path: string
  screenWidth?: number
  screenHeight?: number
  viewportWidth?: number
  viewportHeight?: number
  language?: string
  locale?: string
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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TrackBody

    const userAgent = request.headers.get("user-agent") ?? undefined
    const referer = request.headers.get("referer") ?? undefined
    const ipChain = parseIpChain(request)

    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser()
    const os = parser.getOS()
    const device = parser.getDevice()

    await db.insert(pageVisits).values({
      visitedAt: new Date(),
      path: body.path,
      ipChain,
      userAgent: userAgent ?? null,
      referer: referer ?? null,
      language: body.language ?? null,
      screenWidth: body.screenWidth ?? null,
      screenHeight: body.screenHeight ?? null,
      viewportWidth: body.viewportWidth ?? null,
      viewportHeight: body.viewportHeight ?? null,
      deviceType: classifyDevice(device),
      browserName: browser.name ?? null,
      browserVersion: browser.version ?? null,
      osName: os.name ?? null,
      osVersion: os.version ?? null,
      locale: body.locale ?? null,
      country: null,
      city: null,
    })

    return new NextResponse(null, {status: 204})
  } catch (error) {
    console.error("Failed to track page visit:", error)
    return new NextResponse(null, {status: 204})
  }
}
