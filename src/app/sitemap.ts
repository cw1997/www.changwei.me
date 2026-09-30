import type {MetadataRoute} from "next"
import {locales} from "@/i18n/routing"
import {getLocalizedPath, toAbsoluteUrl} from "@/lib/seo"

const indexedRouteConfigs = [
  {pathname: "/", changeFrequency: "daily", priority: 1},
  {pathname: "/portfolio", changeFrequency: "weekly", priority: 0.8},
  {pathname: "/guestbook", changeFrequency: "weekly", priority: 0.8},
  {pathname: "/friendly-link", changeFrequency: "weekly", priority: 0.7},
  {pathname: "/resume", changeFrequency: "weekly", priority: 0.9},
  {pathname: "/statistic", changeFrequency: "daily", priority: 0.6},
  {pathname: "/calendar", changeFrequency: "daily", priority: 0.7},
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // Intentionally no `lastModified`: stamping every URL with the regeneration
  // time told crawlers all 21 pages changed on every deploy, which is both
  // inaccurate and a signal that pushes crawl budget onto static pages.
  return indexedRouteConfigs.flatMap((route) =>
    locales.map((locale) => ({
      url: toAbsoluteUrl(getLocalizedPath(locale, route.pathname)),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  )
}
