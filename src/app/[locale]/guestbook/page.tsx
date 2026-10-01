"use client"

import {Divider} from "antd"
import styles from "./page.module.sass"
import Giscus from "@giscus/react"
import {useLocale, useTranslations} from "next-intl"

export default function GuestbookPage(_props: PageProps<'/[locale]/guestbook'>) {
  const t = useTranslations("guestbook")
  const locale = useLocale()

  const giscusLang = locale === "zh-Hans" ? "zh-CN" : locale === "zh-Hant" ? "zh-TW" : "en"

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>{t("title")}</h1>
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
