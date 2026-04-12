import {Footer} from "@/components/Footer/Footer"
import {Header} from "@/components/Header/Header"
import {TrackPageView} from "@/components/TrackPageView/TrackPageView"
import {AntdRegistry} from "@ant-design/nextjs-registry"
import type {Metadata} from "next"
import React from "react"
import {NextIntlClientProvider} from "next-intl"
import {getMessages, getTranslations} from "next-intl/server"
import {notFound} from "next/navigation"
import {defaultLocale, isLocale, routing} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import {buildLocalizedMetadata} from "@/lib/seo"
import styles from "./layout.module.sass"

type Props = {
  children: React.ReactNode
  params: Promise<{locale: string}>
}

const baseSiteKeywords = [
  "Chang Wei",
  "cw1997",
  "changwei",
  "changwei1006",
  "changwei1997",
  "profile",
  "CV",
  "Curriculum Vitae",
  "Resume",
  "personal website",
] as const

const localeExtraKeywords: Record<Locale, readonly string[]> = {
  "zh-Hans": ["昌维", "昌維", "昌维001", "昌维cw", "个人网站", "简历"],
  "zh-Hant": ["昌維", "昌维", "昌维001", "昌维cw", "個人網站", "履歷", "簡歷"],
  "en-US": [],
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params
  const localeValue: Locale = isLocale(locale) ? locale : defaultLocale
  const t = await getTranslations({locale: localeValue, namespace: "metadata"})

  const title = t("title")
  const description = t("description")
  const extra = localeExtraKeywords[localeValue] ?? []

  const pageMetadata = buildLocalizedMetadata({
    locale: localeValue,
    pathname: "/",
    title,
    description,
    siteName: title,
    keywords: [...baseSiteKeywords, ...extra],
  })

  return {
    ...pageMetadata,
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    authors: [{name: "Chang Wei", url: "https://github.com/cw1997"}],
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <AntdRegistry>
        <div id={"header"}>
          <Header />
        </div>
        <div className={styles.container} id={"container"}>
          {children}
          <Footer />
          <TrackPageView />
        </div>
      </AntdRegistry>
    </NextIntlClientProvider>
  )
}
