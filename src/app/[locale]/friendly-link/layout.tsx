import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("friendlyLink")
  return {title: t("pageTitle")}
}

export default function FriendlyLinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
