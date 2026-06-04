import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {defaultLocale, isLocale, type Locale} from "@/i18n/routing"
import {buildLocalizedMetadata} from "@/lib/seo"

type Props = LayoutProps<'/[locale]/friendly-link'>

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {params} = props
  const {locale} = await params
  const localeValue: Locale = isLocale(locale) ? locale : defaultLocale
  const [t, tMetadata] = await Promise.all([
    getTranslations({locale: localeValue, namespace: "friendlyLink"}),
    getTranslations({locale: localeValue, namespace: "metadata"}),
  ])

  return buildLocalizedMetadata({
    locale: localeValue,
    pathname: "/friendly-link",
    title: t("pageTitle"),
    description: t("description"),
    siteName: tMetadata("title"),
  })
}

export default function FriendlyLinkLayout(props: Props) {
  const {children} = props
  return children
}
