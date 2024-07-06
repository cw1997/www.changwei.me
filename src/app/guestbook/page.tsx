import {Divider} from "antd";
import {GuestbookInput} from "./GuestbookInput/GuestbookInput";
import styles from "./page.module.sass";

export default function GuestbookPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Guestbook 留言板</h1>
      <Divider/>
      <GuestbookInput/>
      <Divider/>
    </main>
  )
}
