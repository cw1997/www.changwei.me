import {buildLanguageAlternates} from "@/i18n/alternates"
import type {Metadata} from "next"
import React from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  return {
    title: "Portfolio 作品集",
    alternates: buildLanguageAlternates(locale, "/portfolio"),
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
