"use client"

import React, {useEffect, useState} from "react"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/zh-cn"
import "dayjs/locale/zh-tw"
import {useLocale} from "next-intl"

import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

const dayjsLocaleByAppLocale: Record<string, string> = {
  "en-US": "en",
  "zh-Hans": "zh-cn",
  "zh-Hant": "zh-tw",
}

export interface IProps extends React.ComponentPropsWithoutRef<"span"> {}

export const Now: React.FC<IProps> = () => {
  const locale = useLocale()
  // `useState(dayjs())` re-evaluated the constructor on every render and threw the
  // result away after mount. The lazy initializer only runs once.
  const [now, setNow] = useState(() => dayjs())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const djLocale = dayjsLocaleByAppLocale[locale] ?? "en"
  // `.locale()` is an instance method, so it does not mutate dayjs's global
  // locale the way `dayjs.locale()` would.
  const text = now
    .tz("Asia/Taipei")
    .locale(djLocale)
    .format("dddd YYYY-MM-DD HH:mm:ss")

  return <span suppressHydrationWarning>{text}</span>
}
