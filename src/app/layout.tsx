import {Footer} from "@/components/Footer/Footer"
import {Header} from "@/components/Header/Header"
import {AntdRegistry} from "@ant-design/nextjs-registry"
// import {GoogleTagManager} from '@next/third-parties/google'
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/next"
import type {Metadata} from "next"
import {Noto_Sans_SC} from "next/font/google"
import React from "react"
import styles from "./layout.module.sass"
import "@/app/globals.scss"
import "@ant-design/v5-patch-for-react-19"

const title = "Chang Wei's website / 昌维的网站 / 昌維的網站"
const description = "Chang Wei's personal website, including profile, contacts, education and work experiences, portfolio and more. 昌维的个人网站，包括个人资料，联系方式，教育经历和工作经历，作品集等。"
const url = "https://www.changwei.me"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.changwei.me"),
  title: {
    default: title,
    template: "%s | " + title,
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
}

const font_Noto_Sans_SC = Noto_Sans_SC({subsets: ["latin-ext"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <head>
      {/*open graph*/}
      <meta property="og:image" content="<generated>"/>
      <meta property="og:image:type" content="<generated>"/>
      <meta property="og:image:width" content="<generated>"/>
      <meta property="og:image:height" content="<generated>"/>
      
      {/*twitter*/}
      <meta name="twitter:image" content="<generated>"/>
      <meta name="twitter:image:type" content="<generated>"/>
      <meta name="twitter:image:width" content="<generated>"/>
      <meta name="twitter:image:height" content="<generated>"/>
      
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
    <body className={`${font_Noto_Sans_SC.className}`}>
    <AntdRegistry>
      <div id={"header"}>
        <Header/>
      </div>
      <div className={styles.container} id={"container"}>
        {children}
        <Footer/>
      </div>
    </AntdRegistry>
    <SpeedInsights/>
    <Analytics/>
    </body>
    {/*<GoogleAnalytics gaId={'G-GPVC7Z21XH'} />*/}
    </html>
  )
}
