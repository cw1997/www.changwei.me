"use client"

import {Divider} from "antd"
import React from "react"
import styles from "./page.module.sass"
import Giscus from "@giscus/react"

export default function GuestbookPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Guestbook 留言板</h2>
        <Divider />
        <Giscus
          id="comments"
          repo="cw1997/www.changwei.me"
          repoId="R_kgDOLLaI-Q"
          category="Announcements"
          categoryId="DIC_kwDOLLaI-c4Cgdw4"
          mapping="pathname"
          // term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="lazy"
        />
      </main>
    </div>
  )
}
