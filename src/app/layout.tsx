import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import "@/app/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chang Wei / 昌维 / 昌維",
  description: "Chang Wei's personal website / 昌维的网站",
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
          {children}
        </AntdRegistry>
      </body>
      <GoogleAnalytics gaId={'G-GPVC7Z21XH'} />
    </html>
  );
}
