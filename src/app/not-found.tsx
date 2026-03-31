import Link from "next/link"
import styles from "./fallback.module.sass"

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div aria-hidden className={styles.backdrop} />
      <section className={styles.card}>
        <p className={styles.badge}>404 Quest Unlocked</p>
        <h1 className={styles.title}>这页被外星猫咪叼走了</h1>
        <p className={styles.description}>
          你访问的地址可能不存在，或者它刚刚搬去了另一个宇宙分支。
        </p>

        <div className={styles.meme_box}>
          <p className={styles.meme_title}>今日梗图字幕</p>
          <p className={styles.meme_text}>
            当你复制了链接，但漏了最后一段路径。<br />
            浏览器：我真的尽力了。
          </p>
          <p className={styles.meme_face}>(╯°□°)╯︵ ┻━┻</p>
        </div>

        <p className={styles.joke}>404 不代表你迷路，只是这条路还没被 commit。</p>

        <div className={styles.actions}>
          <Link className={`${styles.button} ${styles.button_primary}`} href="/">
            返回首页
          </Link>
          <Link className={`${styles.button} ${styles.button_ghost}`} href="/guestbook">
            去留言区打个卡
          </Link>
        </div>
      </section>
    </main>
  )
}
