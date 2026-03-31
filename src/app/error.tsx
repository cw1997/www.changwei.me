"use client"

import * as Sentry from "@sentry/nextjs"
import Link from "next/link"
import {useEffect} from "react"
import styles from "./fallback.module.sass"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className={styles.page}>
      <div aria-hidden className={styles.backdrop} />
      <section className={styles.card}>
        <p className={styles.badge}>500 Plot Twist</p>
        <h1 className={styles.title}>页面刚才绊了一跤</h1>
        <p className={styles.description}>
          抱歉，页面在加载时遇到了一个意外错误。我们已经记录了这个问题。
        </p>

        <div className={styles.meme_box}>
          <p className={styles.meme_title}>调试现场</p>
          <p className={styles.meme_text}>
            我只改了一行代码。<br />
            结果整个宇宙的状态都变了。
          </p>
          <p className={styles.meme_face}>¯\_(ツ)_/¯</p>
        </div>

        {error.digest ? <p className={styles.meta}>错误追踪号: {error.digest}</p> : null}

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.button_primary}`}
            onClick={() => reset()}
            type="button"
          >
            再试一次
          </button>
          <Link className={`${styles.button} ${styles.button_ghost}`} href="/">
            返回首页
          </Link>
        </div>
      </section>
    </main>
  )
}
