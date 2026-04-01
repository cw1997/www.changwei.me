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
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const djLocale = dayjsLocaleByAppLocale[locale] ?? "en"
  const text = now
    .tz("Asia/Taipei")
    .locale(djLocale)
    .format("dddd YYYY-MM-DD HH:mm:ss")

  return <span suppressHydrationWarning>{text}</span>
}
