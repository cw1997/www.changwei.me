import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Noto_Sans_SC} from "next/font/google"
import {getLocale} from "next-intl/server"
import Script from "next/script"
import React from "react"
import "@/app/globals.css"
import {localeHtmlLang} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"

const font_Noto_Sans_SC = Noto_Sans_SC({subsets: ["latin-ext"]})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const htmlLang = localeHtmlLang[locale as Locale] ?? "en"

  return (
    <html lang={htmlLang}>
      <body className={`${font_Noto_Sans_SC.className} min-h-screen bg-background text-foreground antialiased`}>
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
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
