import logo_image from "@/assets/images/changwei-logo.svg"
import {HeaderMenu} from "@/components/Header/HeaderMenu"
import {LanguageSwitcher} from "@/components/Header/LanguageSwitcher"
import {Space} from "antd"
import Image from "next/image"
import {Link} from "@/i18n/navigation"
import {getTranslations} from "next-intl/server"
import React from "react"

import styles from "./Header.module.sass"

export interface IPropsHeader {}

export const Header: React.FunctionComponent<IPropsHeader> = async () => {
  const t = await getTranslations("header")

  return (
    <header className={styles.container}>
      <div className={styles.main}>
        <div className={styles.main_left}>
          <Space align={"center"} className={styles.main_space}>
            <Link href="/">
              <div className={styles.logo}>
                <Image src={logo_image} width={48} height={48} alt={t("logoAlt")} />
              </div>
            </Link>
            <div className={styles.split} />
            <Link href="/" className={styles.title_link}>
              <div className={styles.title}>
                {t("siteTitleLine1")}
                {t("siteTitleLine2") && <><br/>{t("siteTitleLine2")}</>}
                <br/>
                <span style={{fontSize: 14, lineHeight: 1, color: "#8c8c8c"}}>{t("siteSubtitle")}</span>
              </div>
            </Link>
          </Space>
        </div>
        <div className={styles.right}>
          <HeaderMenu />
          <div className={styles.right_split} aria-hidden />
          <div className={styles.language_switcher_wrap}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
