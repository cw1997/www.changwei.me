import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {NextIntlClientProvider} from "next-intl"
import {getLocale, getMessages} from "next-intl/server"
import {Noto_Sans, Noto_Sans_SC, Noto_Sans_TC} from "next/font/google"
import type {Metadata} from "next"
import Script from "next/script"
import React from "react"

import "@/app/globals.scss"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.changwei.me"),
}

const font_EN = Noto_Sans({subsets: ["latin", "latin-ext"], variable: "--font-noto-en"})
const font_SC = Noto_Sans_SC({subsets: ["latin-ext"], variable: "--font-noto-sc"})
const font_TC = Noto_Sans_TC({subsets: ["latin"], variable: "--font-noto-tc"})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${font_EN.variable} ${font_SC.variable} ${font_TC.variable}`}
      suppressHydrationWarning
    >
      <head>
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
      <body
        className={
          locale === "zh-Hant"
            ? font_TC.className
            : locale === "zh-Hans"
              ? font_SC.className
              : font_EN.className
        }
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
