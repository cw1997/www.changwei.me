"use client"

import {Divider} from "antd"
import {useLocale, useTranslations} from "next-intl"
import React from "react"
import Giscus from "@giscus/react"

import styles from "./page.module.sass"

const giscusLang = {
  "en-US": "en",
  "zh-Hant": "zh-TW",
  "zh-Hans": "zh-CN",
} as const

export default function GuestbookPage() {
  const t = useTranslations("guestbook")
  const locale = useLocale() as keyof typeof giscusLang

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <Divider />
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
          lang={giscusLang[locale] ?? "en"}
          loading="lazy"
        />
      </main>
    </div>
  )
}
