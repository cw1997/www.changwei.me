import {defineRouting} from "next-intl/routing"

/**
 * 仅非默认语言需要 URL 前缀；`en-US` 使用无前缀路径（`/`、`/portfolio` 等）。
 * 与 `localePrefix.prefixes` 一致，供去前缀等逻辑复用。
 */
export const localeUrlPrefixes = {
  "zh-Hant": "/zh-Hant",
  "zh-Hans": "/zh-Hans",
} as const

export type PrefixedAppLocale = keyof typeof localeUrlPrefixes

export const routing = defineRouting({
  locales: ["en-US", "zh-Hant", "zh-Hans"],
  defaultLocale: "en-US",
  /** First visit: use Accept-Language + NEXT_LOCALE cookie when no explicit locale in URL. */
  localeDetection: true,
  /** 英文默认语无前缀；中文变体保留语义化前缀。 */
  localePrefix: {
    mode: "as-needed",
    prefixes: localeUrlPrefixes,
  },
})

export type AppLocale = (typeof routing.locales)[number]
