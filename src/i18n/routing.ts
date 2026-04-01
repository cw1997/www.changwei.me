import {defineRouting} from "next-intl/routing"

/** 与 `localePrefix.prefixes` 一致，供去前缀等逻辑复用（避免类型收窄问题）。 */
export const localeUrlPrefixes = {
  "en-US": "/en-US",
  "zh-Hant": "/zh-Hant",
  "zh-Hans": "/zh-Hans",
} as const

export const routing = defineRouting({
  locales: ["en-US", "zh-Hant", "zh-Hans"],
  defaultLocale: "en-US",
  /** First visit: use Accept-Language + NEXT_LOCALE cookie when no explicit locale in URL. */
  localeDetection: true,
  /** 路径前缀与 locale 标签一致（语义化、可读）。 */
  localePrefix: {
    mode: "always",
    prefixes: localeUrlPrefixes,
  },
})

export type AppLocale = (typeof routing.locales)[number]
