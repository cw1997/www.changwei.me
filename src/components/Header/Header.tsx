import logo_image from '@/assets/images/changwei-logo.svg'
import {Space} from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./Header.module.sass";

export interface IPropsHeader {
}

export const Header: React.FunctionComponent<IPropsHeader> = (props) => {
  
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div>
          <Space align={'center'}>
            <Link href="/">
              <div className={styles.logo}><Image src={logo_image.src} width={48} height={48} alt={''}/></div>
            </Link>
            <div className={styles.split}/>
            <Link href="/">
              <div className={styles.title}>
                昌维的网站 <br/> {"Chang Wei's website"}
              </div>
            </Link>
          </Space>
        </div>
        <div>
          <Space align={'center'}>
            <Link href="/guestbook" className={styles.menu_item}>
              Guestbook
            </Link>
          </Space>
        </div>
      </div>
    </header>
  )
}
