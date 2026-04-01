"use client"

import React, {useEffect, useState} from "react"
import dayjs from "dayjs"

import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export interface IProps extends React.ComponentPropsWithoutRef<"span"> {}

export const Now: React.FC<IProps> = () => {
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return <span suppressHydrationWarning>{now.tz("Asia/Taipei").format("dddd YYYY-MM-DD HH:mm:ss")}</span>
}
