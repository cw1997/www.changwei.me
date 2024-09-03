"use client"

import React, {useEffect, useState} from "react"
import dayjs from "dayjs"

import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Now: React.FC<IProps> = (props) => {
  const {children, className, ...rest} = props
  const [now, setNow] = useState(dayjs())
  useEffect(() => {
    setInterval(() => setNow(dayjs()), 1000)
  }, [])
  return now.tz("Asia/Taipei").format("dddd YYYY-MM-DD HH:mm:ss")
}
