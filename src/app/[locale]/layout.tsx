import {Footer} from "@/components/Footer/Footer"
import {Header} from "@/components/Header/Header"
import {AntdRegistry} from "@ant-design/nextjs-registry"
import type {Metadata} from "next"
import React from "react"
import {NextIntlClientProvider} from "next-intl"
import {getMessages, getTranslations} from "next-intl/server"
import {notFound} from "next/navigation"
import {routing} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import styles from "./layout.module.sass"

const url = "https://www.changwei.me"

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

const localeExtraKeywords: Record<string, readonly string[]> = {
  "zh-Hans": ["昌维", "昌維", "昌维001", "昌维cw", "个人网站", "简历"],
  "zh-Hant": ["昌維", "昌维", "昌维001", "昌维cw", "個人網站", "履歷", "簡歷"],
  "en-US": [],
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: "metadata"})

  const title = t("title")
  const description = t("description")
  const extra = localeExtraKeywords[locale] ?? []

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    authors: [{name: "Chang Wei", url: "https://github.com/cw1997"}],
    keywords: [...baseSiteKeywords, ...extra],

    openGraph: {
      siteName: title,
      title,
      description,
      url,
      images: "/opengraph-image.png",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/twitter-image.png",
    },

    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "zh-Hant": `${url}/zh-Hant`,
        "zh-Hans": `${url}/zh-Hans`,
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params

  if (!routing.locales.includes(locale as Locale)) {
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
        </div>
      </AntdRegistry>
    </NextIntlClientProvider>
  )
}
