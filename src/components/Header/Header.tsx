import logo_image from "@/assets/images/changwei-logo.svg"
import {HeaderMenu} from "@/components/Header/HeaderMenu"
import {Space} from "antd"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import styles from "./Header.module.sass"

// export const element_id = 'header'

export interface IPropsHeader {}

export const Header: React.FunctionComponent<IPropsHeader> = (props) => {
  return (
    <header className={styles.container}>
      <div className={styles.main}>
        <div>
          <Space align={"center"}>
            <Link href="/">
              <div className={styles.logo}>
                <Image src={logo_image.src} width={48} height={48} alt={""} />
              </div>
            </Link>
            <div className={styles.split} />
            <Link href="/">
              <div className={styles.title}>
                昌维的网站 / 昌維的網站<br/>
                {"Chang Wei's website"}<br/>
                <span style={{fontSize: 14, lineHeight: 1, color: "#8c8c8c"}}>{"www.changwei.me"}</span>
              </div>
            </Link>
          </Space>
        </div>
        <div>
          <HeaderMenu />
        </div>
      </div>
    </header>
  )
}
