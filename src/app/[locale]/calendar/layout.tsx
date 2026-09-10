import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {defaultLocale, isLocale, type Locale} from "@/i18n/routing"
import {buildLocalizedMetadata} from "@/lib/seo"

type Props = LayoutProps<"/[locale]/calendar">

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {params} = props
  const {locale} = await params
  const localeValue: Locale = isLocale(locale) ? locale : defaultLocale
  const [t, tMetadata] = await Promise.all([
    getTranslations({locale: localeValue, namespace: "calendar"}),
    getTranslations({locale: localeValue, namespace: "metadata"}),
  ])

  return buildLocalizedMetadata({
    locale: localeValue,
    pathname: "/calendar",
    title: t("pageTitle"),
    description: t("description"),
    siteName: tMetadata("title"),
  })
}

export default function CalendarLayout(props: Props) {
  const {children} = props
  return children
}
