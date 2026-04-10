"use client"

import {useEffect} from "react"
import {usePathname} from "next/navigation"
import {useLocale} from "next-intl"

export const TrackPageView = () => {
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    const payload = {
      path: pathname,
      screenWidth: screen.width,
      screenHeight: screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      language: navigator.language,
      locale,
    }

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
  }, [pathname, locale])

  return null
}
