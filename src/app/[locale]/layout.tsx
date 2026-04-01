import {Footer} from "@/components/Footer/Footer"
import {Header} from "@/components/Header/Header"
import {AntdRegistry} from "@ant-design/nextjs-registry"
import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import type {Metadata} from "next"
import {Noto_Sans_SC} from "next/font/google"
import Script from "next/script"
import React from "react"
import {NextIntlClientProvider} from "next-intl"
import {getMessages, getTranslations} from "next-intl/server"
import {notFound} from "next/navigation"
import {routing} from "@/i18n/routing"
import {localeHtmlLang} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import styles from "./layout.module.sass"

const url = "https://www.changwei.me"

type Props = {
  children: React.ReactNode
  params: Promise<{locale: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: "metadata"})

  const title = t("title")
  const description = t("description")

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    authors: [{name: "Chang Wei", url: "https://github.com/cw1997"}],
    keywords: [
      "Chang Wei",
      "昌维",
      "昌維",
      "昌维001",
      "昌维cw",
      "cw1997",
      "changwei",
      "changwei1006",
      "changwei1997",
      "personal website",
      "个人网站",
      "简历",
      "profile",
      "CV",
      "Curriculum Vitae",
      "Resume",
    ],

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

const font_Noto_Sans_SC = Noto_Sans_SC({subsets: ["latin-ext"]})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()
  const htmlLang = localeHtmlLang[locale as Locale] ?? "en"

  return (
    <html lang={htmlLang}>
      <head>
        {/*<!-- Google tag (gtag.js) -->*/}
        <Script
          id={"googletagmanager"}
          src="https://www.googletagmanager.com/gtag/js?id=G-GPVC7Z21XH"
          strategy="afterInteractive"
        />
        <Script
          id={"gtag"}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GPVC7Z21XH');
        `
              .split("\n")
              .map((t) => t.trim())
              .join(""),
          }}
        />
      </head>
      <body className={`${font_Noto_Sans_SC.className}`}>
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
