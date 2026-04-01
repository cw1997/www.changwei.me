import {Link} from "@/i18n/navigation"
import {useTranslations} from "next-intl"
import styles from "./fallback.module.sass"

export default function NotFound() {
  const t = useTranslations("notFound")

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
            {t("memeText")}<br />
            {t("browserTriedHard")}
          </p>
          <p className={styles.meme_face}>{t("memeFace")}</p>
        </div>

        <p className={styles.joke}>{t("joke")}</p>

        <div className={styles.actions}>
          <Link className={`${styles.button} ${styles.button_primary}`} href="/">
            {t("goHome")}
          </Link>
          <Link className={`${styles.button} ${styles.button_ghost}`} href="/guestbook">
            {t("goGuestbook")}
          </Link>
        </div>
      </section>
    </main>
  )
}
