import {Footer} from "@/components/Footer/Footer";
import {Header} from "@/components/Header/Header";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {GoogleTagManager} from '@next/third-parties/google'
import {SpeedInsights} from "@vercel/speed-insights/next"
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.scss";
import styles from "./layout.module.sass";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Chang Wei's personal website / 昌维的网站",
    template: "%s | Chang Wei's personal website / 昌维的网站",
  },
  // description: "Chang Wei's personal website / 昌维的网站",
  authors: [{name: 'Chang Wei', url: 'https://github.com/cw1997'}],
  keywords: [
    'Chang Wei',
    '昌维',
    '昌維',
    '个人网站',
    'profile',
    'cw1997',
    'changwei1006',
    'changwei1997',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<head>*/}
      {/*  /!*<!-- Google tag (gtag.js) -->*!/*/}
      {/*  <script async src="https://www.googletagmanager.com/gtag/js?id=G-GPVC7Z21XH"></script>*/}
      {/*  <script dangerouslySetInnerHTML={{__html: `*/}
      {/*    window.dataLayer = window.dataLayer || [];*/}
      {/*    function gtag(){dataLayer.push(arguments);}*/}
      {/*    gtag('js', new Date());*/}
      {/*  */}
      {/*    gtag('config', 'G-GPVC7Z21XH');*/}
      {/*  `.split('\n').map(t => t.trim()).join('')}} />*/}
      {/*</head>*/}
      <GoogleTagManager gtmId="G-GPVC7Z21XH" />
      <body className={inter.className}>
        <AntdRegistry>
          <div id={'header'}>
            <Header/>
          </div>
          <div className={styles.container} id={'container'}>
            {children}
            <Footer/>
          </div>
        </AntdRegistry>
        <SpeedInsights/>
      </body>
      {/*<GoogleAnalytics gaId={'G-GPVC7Z21XH'} />*/}
    </html>
  );
}
