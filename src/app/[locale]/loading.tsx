import {LoadingOutlined} from "@ant-design/icons";
import styles from "./loading.module.sass";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={styles.container}>
      <div><LoadingOutlined style={{fontSize: 64}} /></div>
      <div style={{fontSize: 24}}>Loading...</div>
    </div>
  )
}