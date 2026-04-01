"use client"

import * as Sentry from "@sentry/nextjs"
import {Link} from "@/i18n/navigation"
import {useTranslations} from "next-intl"
import {useEffect} from "react"
import styles from "./fallback.module.sass"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  const t = useTranslations("error")

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className={styles.page}>
      <div aria-hidden className={styles.backdrop} />
      <section className={styles.card}>
        <p className={styles.badge}>{t("badge")}</p>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.description}>{t("description")}</p>

        <div className={styles.meme_box}>
          <p className={styles.meme_title}>{t("memeTitle")}</p>
          <p className={styles.meme_text}>
            {t("memeLine1")}
            <br />
            {t("memeLine2")}
          </p>
          <p className={styles.meme_face}>{t("memeFace")}</p>
        </div>

        {error.digest ? (
          <p className={styles.meta}>
            {t("digestLabel")} {error.digest}
          </p>
        ) : null}

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.button_primary}`}
            onClick={() => reset()}
            type="button"
          >
            {t("retry")}
          </button>
          <Link className={`${styles.button} ${styles.button_ghost}`} href="/">
            {t("goHome")}
          </Link>
        </div>
      </section>
    </main>
  )
}
