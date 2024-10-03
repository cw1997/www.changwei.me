import {Noto_Sans_SC, Noto_Sans_TC} from "next/font/google"
import React from "react"
import type {Metadata} from "next"
import {AntdRegistry} from "@ant-design/nextjs-registry"
// import {GoogleTagManager} from '@next/third-parties/google'
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/next"

import {Footer} from "@/components/Footer/Footer"
import {Header} from "@/components/Header/Header"

// import pictureImage from "@/app/(hmoe)/ProfileSection/changwei_at_google_taipei.jpg"
import styles from "./layout.module.sass"
import "@/app/globals.scss"

const title = "Chang Wei's website / 昌维的网站 / 昌維的網站"

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | " + title,
  },
  description:
    "Chang Wei's personal website, including profile, contacts, education and work experiences, portfolio and more. 昌维的个人网站，包括个人资料，联系方式，教育经历和工作经历，作品集等。",
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
}

const font_Noto_Sans_TC = Noto_Sans_TC({subsets: ["latin"]})
const font_Noto_Sans_SC = Noto_Sans_SC({subsets: ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <head>
      {/*open graph*/}
      {/*<meta property="twitter:image" content="Twitter link preview image URL"/>*/}
      <meta property="twitter:card" content="summary_large_image"/>
      {/*<meta property="twitter:title" content="Twitter link preview title"/>*/}
      {/*<meta property="twitter:description" content="Twitter link preview description"/>*/}
      {/*<meta property="og:image" content="Link preview image URL"/>*/}
      {/*<meta property="og:site_name" content="Link preview site name"/>*/}
      {/*<meta property="og:title" content="Link preview title"/>*/}
      {/*<meta property="og:description" content="Link preview description"/>*/}
      {/*<meta property="og:url" content="Canonical link preview URL"/>*/}
      
      {/*<!-- Google tag (gtag.js) -->*/}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GPVC7Z21XH"
      ></script>
      <script
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
    {/*<GoogleTagManager gtmId="G-GPVC7Z21XH" />*/}
    <body className={`${font_Noto_Sans_TC.className} ${font_Noto_Sans_SC.className}`}>
        <AntdRegistry>
          <div id={"header"}>
            <Header />
          </div>
          <div className={styles.container} id={"container"}>
            {children}
            <Footer />
          </div>
        </AntdRegistry>
        <SpeedInsights />
        <Analytics />
      </body>
      {/*<GoogleAnalytics gaId={'G-GPVC7Z21XH'} />*/}
    </html>
  )
}
