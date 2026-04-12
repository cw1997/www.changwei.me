import type {Metadata} from "next"
import {defaultLocale, locales, type Locale} from "@/i18n/routing"

export const siteUrl = "https://www.changwei.me"

const openGraphLocaleByLocale: Record<Locale, string> = {
  "en-US": "en_US",
  "zh-Hant": "zh_TW",
  "zh-Hans": "zh_CN",
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/"
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`
  return withLeadingSlash.replace(/\/+$/, "")
}

export function getLocalizedPath(locale: Locale, pathname = "/"): string {
  const normalizedPath = normalizePath(pathname)
  if (locale === defaultLocale) {
    return normalizedPath
  }

  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`
}

export function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString()
}

function buildLanguageAlternates(pathname: string): Record<string, string> {
  const alternates: Record<string, string> = {
    "x-default": toAbsoluteUrl(getLocalizedPath(defaultLocale, pathname)),
  }

  for (const locale of locales) {
    alternates[locale] = toAbsoluteUrl(getLocalizedPath(locale, pathname))
  }

  return alternates
}

type BuildLocalizedMetadataOptions = {
  locale: Locale
  pathname?: string
  title: string
  description: string
  siteName: string
  keywords?: readonly string[]
  robots?: Metadata["robots"]
}

export function buildLocalizedMetadata({
  locale,
  pathname = "/",
  title,
  description,
  siteName,
  keywords,
  robots,
}: BuildLocalizedMetadataOptions): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname)
  const canonicalUrl = toAbsoluteUrl(localizedPath)

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternates(pathname),
    },
    robots,
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonicalUrl,
      locale: openGraphLocaleByLocale[locale],
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => openGraphLocaleByLocale[item]),
      images: "/opengraph-image.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/twitter-image.jpg",
    },
  }
}
