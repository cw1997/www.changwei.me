import type {MetadataRoute} from "next"
import {siteUrl} from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/sentry-example-page"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // No `host` field: it is a deprecated Yandex-era directive that other crawlers
    // ignore, and it is not part of the MetadataRoute.Robots contract.
  }
}
