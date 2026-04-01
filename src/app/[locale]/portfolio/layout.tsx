import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portfolio")
  return {title: t("pageTitle")}
}

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
