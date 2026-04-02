"use client"

import {Divider} from "antd"
import React from "react"
import styles from "./page.module.sass"
import Giscus from "@giscus/react"
import {useTranslations, useLocale} from "next-intl"

export default function GuestbookPage() {
  const t = useTranslations("guestbook")
  const locale = useLocale()

  const giscusLang = locale === "zh-Hans" ? "zh-CN" : locale === "zh-Hant" ? "zh-TW" : "en"

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
          lang={giscusLang}
          loading="lazy"
        />
      </main>
    </div>
  )
}
