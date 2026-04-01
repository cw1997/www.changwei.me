"use client"

import {ExportOutlined} from "@ant-design/icons"
import {Divider, Space} from "antd"
import {useTranslations} from "next-intl"
import React from "react"

import {OutsideLink} from "@/components/OutsideLink"

import {data} from "./data"
import styles from "./page.module.sass"

export interface IPropsFriendlyLinkPage {}

const FriendlyLinkPage: React.FunctionComponent<IPropsFriendlyLinkPage> = () => {
  const t = useTranslations("friendlyLink")

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <Divider />
        <ul className={styles.list}>
          {data.items.map((item) => (
            <li key={item.id}>
              <Space className={styles.item} wrap>
                <div className={styles.item_icon}>
                  <img
                    style={{width: 16, height: "auto"}}
                    src={
                      typeof item.icon === "string"
                        ? item.icon
                        : (item.icon?.src ??
                          `https://s2.googleusercontent.com/s2/favicons?domain_url=${item.url}`)
                    }
                    alt={t(`items.${item.id}`)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.item_name}>{t(`items.${item.id}`)}</div>
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
