import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import type {Metadata} from "next"
import {Noto_Sans_SC} from "next/font/google"
import {getLocale} from "next-intl/server"
import Script from "next/script"
import "@/app/globals.scss"
import {localeHtmlLang} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import {siteUrl} from "@/lib/seo"

const font_Noto_Sans_SC = Noto_Sans_SC({subsets: ["latin-ext"]})

// Localized routes build their own metadata via `buildLocalizedMetadata`, but the
// root layout still owns the `opengraph-image.jpg` / `twitter-image.jpg` file
// conventions. Without `metadataBase` here Next cannot resolve those relative
// image URLs and falls back to http://localhost:3000.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
}

export default async function RootLayout(props: LayoutProps<'/'>) {
  const {children} = props
  const locale = await getLocale()
  const htmlLang = localeHtmlLang[locale as Locale] ?? "en"

  return (
    <html lang={htmlLang}>
      <body className={font_Noto_Sans_SC.className}>
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
