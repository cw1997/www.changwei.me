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
    title: "Guestbook 留言板",
    alternates: buildLanguageAlternates(locale, "/guestbook"),
  }
}

export default function GuestbookPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
