import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import "@/app/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chang Wei",
  description: "Chang Wei's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*<!-- Google tag (gtag.js) -->*/}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GPVC7Z21XH"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-GPVC7Z21XH');
        `.split('\n').map(t => t.trim()).join('')}} />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
