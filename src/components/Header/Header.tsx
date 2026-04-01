"use client"

import logo_image from "@/assets/images/changwei-logo.svg"
import {HeaderMenu} from "@/components/Header/HeaderMenu"
import {LocaleSwitcher} from "@/components/LocaleSwitcher/LocaleSwitcher"
import {Link} from "@/i18n/navigation"
import {Space} from "antd"
import {useTranslations} from "next-intl"
import Image from "next/image"
import React from "react"

import styles from "./Header.module.sass"

export interface IPropsHeader {}

export const Header: React.FunctionComponent<IPropsHeader> = () => {
  const t = useTranslations("header")

  return (
    <header className={styles.container}>
      <div className={styles.main}>
        <div>
          <Space align={"center"}>
            <Link href="/">
              <div className={styles.logo}>
                <Image
                  src={logo_image}
                  width={48}
                  height={48}
                  alt={t("logoAlt")}
                />
              </div>
            </Link>
            <div className={styles.split} />
            <Link href="/">
              <div className={styles.title}>
                {t("primary")}
                {t("secondary") ? (
                  <>
                    <br />
                    {t("secondary")}
                  </>
                ) : null}
                <br />
                <span
                  style={{fontSize: 14, lineHeight: 1, color: "#8c8c8c"}}
                >
                  {t("subtitle")}
                </span>
              </div>
            </Link>
          </Space>
        </div>
        <div className={styles.actions}>
          <Space align={"center"} size={16} wrap>
            <HeaderMenu />
            <LocaleSwitcher />
          </Space>
        </div>
      </div>
    </header>
  )
}
