"use client"

import {useEffect} from "react"
import {usePathname} from "next/navigation"
import {useLocale} from "next-intl"

type NavigatorWithDeviceInfo = Navigator & {
  connection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
    saveData?: boolean
  }
  deviceMemory?: number
  userAgentData?: {
    mobile?: boolean
    platform?: string
    getHighEntropyValues?: (hints: string[]) => Promise<Record<string, unknown>>
  }
}

const highEntropyHints = [
  "model",
  "platformVersion",
  "uaFullVersion",
  "architecture",
  "bitness",
  "formFactors",
]

let highEntropyPromise: Promise<Record<string, unknown>> | null = null

function toNullableNumber(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

async function getHighEntropyData(nav: NavigatorWithDeviceInfo): Promise<Record<string, unknown>> {
  if (!nav.userAgentData?.getHighEntropyValues) {
    return {}
  }

  if (!highEntropyPromise) {
    highEntropyPromise = nav.userAgentData
      .getHighEntropyValues(highEntropyHints)
      .catch(() => ({}))
  }

  return highEntropyPromise
}

async function buildTrackPayload(pathname: string, locale: string) {
  const nav = navigator as NavigatorWithDeviceInfo
  const connection = nav.connection
  const highEntropy = await getHighEntropyData(nav)

  const formFactors = Array.isArray(highEntropy.formFactors)
    ? highEntropy.formFactors.filter((item): item is string => typeof item === "string")
    : []

  return {
    path: pathname,
    screenWidth: screen.width,
    screenHeight: screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    language: navigator.language,
    locale,
    deviceModel: typeof highEntropy.model === "string" ? highEntropy.model : null,
    cpuArchitecture: typeof highEntropy.architecture === "string" ? highEntropy.architecture : null,
    cpuCores: toNullableNumber(navigator.hardwareConcurrency),
    deviceMemoryGb: toNullableNumber(nav.deviceMemory),
    networkType: connection?.effectiveType ?? null,
    networkDownlinkMbps: toNullableNumber(connection?.downlink),
    networkRttMs: toNullableNumber(connection?.rtt),
    networkSaveData: connection?.saveData ?? null,
    platform:
      (typeof nav.userAgentData?.platform === "string" ? nav.userAgentData.platform : null) ??
      navigator.platform ??
      null,
    platformVersion:
      typeof highEntropy.platformVersion === "string" ? highEntropy.platformVersion : null,
    uaFullVersion: typeof highEntropy.uaFullVersion === "string" ? highEntropy.uaFullVersion : null,
    formFactor: formFactors.length > 0 ? formFactors.join(",") : nav.userAgentData?.mobile ? "mobile" : "desktop",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
  }
}

export const TrackPageView = () => {
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    let cancelled = false

    const sendTrack = async () => {
      const payload = await buildTrackPayload(pathname, locale)
      if (cancelled) return

      const blob = new Blob([JSON.stringify(payload)], {type: "application/json"})
      const sent = navigator.sendBeacon("/api/track", blob)

      if (!sent) {
        fetch("/api/track", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {})
      }
    }

    sendTrack().catch(() => {})

    return () => {
      cancelled = true
    }
  }, [pathname, locale])

  return null
}
