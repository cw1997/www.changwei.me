import {getPathname} from "@/i18n/navigation"
import {routing, type AppLocale} from "@/i18n/routing"
import type {Metadata} from "next"

/** Pathnames used in nav and metadata (locale prefix handled by next-intl). */
export type LocalizedPath = (typeof localizedPaths)[number]

export const localizedPaths = [
  "/",
  "/portfolio",
  "/guestbook",
  "/friendly-link",
  "/resume",
  "/sentry-example-page",
] as const

export function buildLanguageAlternates(
  locale: string,
  href: LocalizedPath,
): NonNullable<Metadata["alternates"]> {
  const l = locale as AppLocale
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      getPathname({href, locale: loc}),
    ]),
  ) as Record<AppLocale, string>

  return {
    canonical: getPathname({href, locale: l}),
    languages,
  }
}
