"use client"

import {routing} from "@/i18n/routing"
import {usePathname, useRouter} from "@/i18n/navigation"
import {Select} from "antd"
import {useLocale} from "next-intl"
import React from "react"

const options: {value: (typeof routing.locales)[number]; label: string}[] = [
  {value: "en-US", label: "English"},
  {value: "zh-Hant", label: "繁體中文"},
  {value: "zh-Hans", label: "简体中文"},
]

export const LocaleSwitcher: React.FC = () => {
  const locale = useLocale() as (typeof routing.locales)[number]
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Select
      aria-label="Language"
      value={locale}
      onChange={(next) => {
        router.replace(pathname, {locale: next})
      }}
      options={options}
      style={{minWidth: 140}}
      popupMatchSelectWidth={false}
    />
  )
}
