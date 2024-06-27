import React from "react";
import styles from "./ContactItem.module.sass";

export interface IPropsContactItem {
  icon: React.ReactNode
  label: string
  value: string
}

export const ContactItem: React.FunctionComponent<IPropsContactItem> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.text}>
        <div className={styles.label}>{props.label}</div>
        <div className={styles.value}>{props.value}</div>
      </div>
    </div>
  )
}
