import {ExportOutlined} from "@ant-design/icons"
import {Space} from "antd"
import React from "react"

import {OutsideLink} from "@/components/OutsideLink"

import {data} from "./data"
import styles from "./page.module.sass"

export interface IPropsFriendlyLinkPage {}

const FriendlyLinkPage: React.FunctionComponent<IPropsFriendlyLinkPage> = (
  props,
) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>FriendlyLink</h2>
        <ul className={styles.list}>
          {data.items.map((item) => (
            <li key={item.name}>
              <Space className={styles.item} wrap>
                <div className={styles.item_icon}>
                  <img
                    style={{width: 16, height: "auto"}}
                    src={typeof item.icon === "string" ? item.icon : (item.icon?.src ?? `https://s2.googleusercontent.com/s2/favicons?domain_url=${item.url}`)}
                    alt={item.name}
                  />
                </div>
                <div className={styles.item_name}>{item.name}</div>
                <div className={styles.item_split}>-</div>
                <div className={styles.item_url}>
                  <OutsideLink href={item.url} />{" "}
                  <ExportOutlined style={{fontSize: 12}} />
                </div>
              </Space>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
export default FriendlyLinkPage
