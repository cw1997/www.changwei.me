import {localeUrlPrefixes, routing, type AppLocale} from "@/i18n/routing"

/** 从 pathname 首段解析当前地区（大小写不敏感），无法识别时返回 undefined。 */
export function localeFromPathname(pathname: string | null): AppLocale | undefined {
  if (pathname == null || pathname === "") return undefined
  const pathOnly = pathname.split("?")[0] ?? pathname
  const firstLower = pathOnly.split("/").filter(Boolean)[0]?.toLowerCase()
  if (!firstLower) return undefined

  for (const loc of routing.locales) {
    const slug = localeUrlPrefixes[loc as keyof typeof localeUrlPrefixes]
      .replace(/^\//, "")
      .toLowerCase()
    if (firstLower === slug) return loc as AppLocale
  }
  return undefined
}

/**
 * 从浏览器 pathname 去掉当前地区前缀，得到 next-intl 内部路径（如 `/portfolio`）。
 * 与库内默认逻辑不同：按首段与配置前缀做大小写不敏感匹配，避免 `/zh-hant/...` 等
 * 与配置 `/zh-Hant` 不一致时无法去前缀，进而 `router.replace` 拼出错误 URL。
 */
export function toUnlocalizedPathname(pathname: string): string {
  const pathOnly = pathname.split("?")[0] ?? pathname
  const segments = pathOnly.split("/").filter(Boolean)
  if (segments.length === 0) return "/"

  const firstLower = segments[0].toLowerCase()

  for (const loc of routing.locales) {
    const prefix = localeUrlPrefixes[loc as keyof typeof localeUrlPrefixes]
    const slug = prefix.replace(/^\//, "").toLowerCase()
    if (firstLower === slug) {
      const rest = segments.slice(1)
      return rest.length ? `/${rest.join("/")}` : "/"
    }
  }

  return pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`
}
