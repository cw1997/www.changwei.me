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
    title: "Resume 简历",
    alternates: buildLanguageAlternates(locale, "/resume"),
  }
}

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
