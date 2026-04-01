import {Link} from "@/i18n/navigation"
import {getTranslations} from "next-intl/server"
import React from "react"

import styles from "../fallback.module.sass"

export default async function NotFound() {
  const t = await getTranslations("notFound")

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
                <React.Fragment key={i}>
                  {i > 0 ? <br /> : null}
                  {line}
                </React.Fragment>
              ))}
          </p>
          <p className={styles.meme_face}>(╯°□°)╯︵ ┻━┻</p>
        </div>

        <p className={styles.joke}>{t("joke")}</p>

        <div className={styles.actions}>
          <Link className={`${styles.button} ${styles.button_primary}`} href="/">
            {t("home")}
          </Link>
          <Link
            className={`${styles.button} ${styles.button_ghost}`}
            href="/guestbook"
          >
            {t("guestbook")}
          </Link>
        </div>
      </section>
    </main>
  )
}
