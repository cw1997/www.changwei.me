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
  const t = useTranslations("errorPage")

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
            {t("memeText")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
          </p>
          <p className={styles.meme_face}>¯\_(ツ)_/¯</p>
        </div>

        {error.digest ? (
          <p className={styles.meta}>
            {t("digest")} {error.digest}
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
            {t("home")}
          </Link>
        </div>
      </section>
    </main>
  )
}
