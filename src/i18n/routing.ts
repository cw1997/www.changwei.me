import {defineRouting} from "next-intl/routing"

export const locales = ["en-US", "zh-Hant", "zh-Hans"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en-US"

export const localeLabels: Record<Locale, string> = {
  "en-US": "English | en-US",
  "zh-Hant": "繁體中文 | zh-Hant",
  "zh-Hans": "简体中文 | zh-Hans",
}

export const localeHtmlLang: Record<Locale, string> = {
  "en-US": "en",
  "zh-Hant": "zh-Hant",
  "zh-Hans": "zh-Hans",
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
})
