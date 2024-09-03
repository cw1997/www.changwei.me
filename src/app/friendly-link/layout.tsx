import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Friendly Link 友情链接",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
