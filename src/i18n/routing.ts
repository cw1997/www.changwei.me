import {defineRouting} from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en-US", "zh-Hant", "zh-Hans"],
  defaultLocale: "en-US",
  /** First visit: use Accept-Language + NEXT_LOCALE cookie when no explicit locale in URL. */
  localeDetection: true,
  /** 路径前缀与 locale 标签一致（语义化、可读）。 */
  localePrefix: {
    mode: "always",
    prefixes: {
      "en-US": "/en-US",
      "zh-Hant": "/zh-Hant",
      "zh-Hans": "/zh-Hans",
    },
  },
})

export type AppLocale = (typeof routing.locales)[number]
