"use client"

import {OutsideLink} from "@/components/OutsideLink"
import {useLocale, useTranslations} from "next-intl"

import {getFriendlyLinkItems} from "./data"
import styles from "./page.module.sass"

export default function FriendlyLinkPage(_props: PageProps<'/[locale]/friendly-link'>) {
  const t = useTranslations("friendlyLink")
  const locale = useLocale()
  const items = getFriendlyLinkItems(locale)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <hr style={{margin: "0 0 16px", border: 0, borderTop: "1px solid rgba(0, 0, 0, 0.12)"}} />
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.name}>
              <div className={styles.item} style={{display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap"}}>
                <div className={styles.item_icon}>
                  <img
                    style={{width: 16, height: 16, objectFit: "contain"}}
                    src={typeof item.icon === "string" ? item.icon : (item.icon?.src ?? `https://s2.googleusercontent.com/s2/favicons?domain_url=${item.url}`)}
                    alt={item.name}
                    width={16}
                    height={16}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.item_name}>{item.name}</div>
                <div className={styles.item_split}>-</div>
                <div className={styles.item_url}>
                  <OutsideLink href={item.url} />{" "}
                  <span aria-hidden="true" style={{fontSize: 12}}>↗</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
