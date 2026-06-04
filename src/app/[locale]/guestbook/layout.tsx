import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {defaultLocale, isLocale, type Locale} from "@/i18n/routing"
import {buildLocalizedMetadata} from "@/lib/seo"

type Props = LayoutProps<'/[locale]/guestbook'>

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {params} = props
  const {locale} = await params
  const localeValue: Locale = isLocale(locale) ? locale : defaultLocale
  const [t, tMetadata] = await Promise.all([
    getTranslations({locale: localeValue, namespace: "guestbook"}),
    getTranslations({locale: localeValue, namespace: "metadata"}),
  ])

  return buildLocalizedMetadata({
    locale: localeValue,
    pathname: "/guestbook",
    title: t("pageTitle"),
    description: t("description"),
    siteName: tMetadata("title"),
  })
}

export default function GuestbookPageLayout(props: Props) {
  const {children} = props
  return children
}
