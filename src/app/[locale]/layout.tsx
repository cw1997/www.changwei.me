import {Footer} from "@/components/Footer/Footer"
import {Header} from "@/components/Header/Header"
import {routing} from "@/i18n/routing"
import {AntdRegistry} from "@ant-design/nextjs-registry"
import {ConfigProvider} from "antd"
import enUS from "antd/locale/en_US"
import zhCN from "antd/locale/zh_CN"
import zhTW from "antd/locale/zh_TW"
import type {Metadata} from "next"
import {getTranslations, setRequestLocale} from "next-intl/server"
import React from "react"

import styles from "../layout.module.sass"

const siteUrl = "https://www.changwei.me"

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: "metadata"})
  const title = t("title")

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: t("description"),
    authors: [{name: "Chang Wei", url: "https://github.com/cw1997"}],
    keywords: [
      "Chang Wei",
      "昌维",
      "昌維",
      "cw1997",
      "changwei",
      "personal website",
      "个人网站",
      "履歷",
      "profile",
      "Resume",
    ],
    openGraph: {
      siteName: title,
      title,
      description: t("description"),
      url: siteUrl,
      images: "/opengraph-image.png",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("description"),
      images: "/twitter-image.png",
    },
  }
}

const antdLocales = {
  "en-US": enUS,
  "zh-Hant": zhTW,
  "zh-Hans": zhCN,
} as const

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{locale: string}>
}>) {
  const {locale} = await params
  setRequestLocale(locale)
  const antdLocale =
    antdLocales[locale as keyof typeof antdLocales] ?? antdLocales["en-US"]

  return (
    <ConfigProvider locale={antdLocale}>
      <AntdRegistry>
        <div id={"header"}>
          <Header />
        </div>
        <div className={styles.container} id={"container"}>
          {children}
          <Footer />
        </div>
      </AntdRegistry>
    </ConfigProvider>
  )
}
