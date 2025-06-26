import {GuestbookList} from "@/app/guestbook/GuestbookList/GuestbookList"
import {Divider} from "antd"
import React from "react"
import {GuestbookInput} from "./GuestbookInput/GuestbookInput"
import styles from "./page.module.sass"

export default function GuestbookPage() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Guestbook 留言板</h2>
      <Divider />
      <GuestbookInput />
      <Divider />
      <GuestbookList />
    </main>
  )
}
