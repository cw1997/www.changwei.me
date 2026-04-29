"use client"

import React from "react"
import Giscus from "@giscus/react"
import {useTranslations, useLocale} from "next-intl"
import {Separator} from "@/components/ui/separator"

export default function GuestbookPage() {
  const t = useTranslations("guestbook")
  const locale = useLocale()

  const giscusLang = locale === "zh-Hans" ? "zh-CN" : locale === "zh-Hant" ? "zh-TW" : "en"

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">{t("title")}</h2>
      <Separator />
      <Giscus
        id="comments"
        repo="cw1997/www.changwei.me"
        repoId="R_kgDOLLaI-Q"
        category="Announcements"
        categoryId="DIC_kwDOLLaI-c4Cgdw4"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang={giscusLang}
        loading="lazy"
      />
    </main>
  )
}
