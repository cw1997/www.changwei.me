import {GuestbookList} from "@/app/guestbook/GuestbookList/GuestbookList";
import {Divider} from "antd";
import Script from "next/script";
import React from "react";
import {GuestbookInput} from "./GuestbookInput/GuestbookInput";
import styles from "./page.module.sass";

export default function GuestbookPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Guestbook 留言板</h1>
      <Divider/>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></Script>
      <GuestbookInput/>
      <Divider/>
      <GuestbookList/>
    </main>
  )
}
