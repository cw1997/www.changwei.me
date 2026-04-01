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
    title: "Sentry Onboarding",
    description: "Test Sentry for your Next.js app!",
    alternates: buildLanguageAlternates(locale, "/sentry-example-page"),
  }
}

export default function SentryExampleLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return children
}
