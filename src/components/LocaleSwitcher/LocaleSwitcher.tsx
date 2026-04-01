"use client"

import {routing, type AppLocale} from "@/i18n/routing"
import {localeFromPathname, toUnlocalizedPathname} from "@/i18n/unlocalizedPathname"
import {useRouter} from "@/i18n/navigation"
import {Select} from "antd"
import {useLocale} from "next-intl"
import {usePathname as useNextPathname, useSearchParams} from "next/navigation"
import React, {useMemo} from "react"

const optionTitles: Record<AppLocale, string> = {
  "en-US": "English",
  "zh-Hant": "繁體中文",
  "zh-Hans": "简体中文",
}

const selectOptions = routing.locales.map((loc) => {
  const l = loc as AppLocale
  return {
    value: l,
    label: `${optionTitles[l]} | ${l}`,
  }
})

export const LocaleSwitcher: React.FC = () => {
  const intlLocale = useLocale() as AppLocale
  const nextPathname = useNextPathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  /** URL 先于 next-intl 上下文更新时用 pathname 驱动 Select，避免切换后显示不刷新。 */
  const selectedLocale =
    localeFromPathname(nextPathname) ?? intlLocale

  const href = useMemo(() => {
    const base = toUnlocalizedPathname(nextPathname ?? "/")
    const q = searchParams.toString()
    return q ? `${base}?${q}` : base
  }, [nextPathname, searchParams])

  return (
    <Select<AppLocale>
      key={selectedLocale}
      aria-label="Language"
      value={selectedLocale}
      onChange={(next) => {
        router.replace(href, {locale: next})
      }}
      options={selectOptions}
      style={{minWidth: 220}}
      popupMatchSelectWidth={false}
    />
  )
}
