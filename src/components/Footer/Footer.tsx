import {OutsideLink} from "@/components/OutsideLink";
import {Space} from "antd";
import React from "react";
import Image from "next/image";

import next_logo from '@/assets/images/logo/frontend/next.svg'
import vercel_logo from '@/assets/images/logo/frontend/vercel.svg'

import styles from "./Footer.module.sass";

export interface IPropsFooter {
}

export const Footer: React.FunctionComponent<IPropsFooter> = (props) => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <Space align={'center'}>
          Powered By
          <OutsideLink className={styles.logo} href={'https://vercel.com'}>
            <Image
              src={vercel_logo}
              alt="Vercel Logo"
              className={styles.logo_img}
              // width={100}
              height={16}
              priority
            />
          </OutsideLink>
          And
          <OutsideLink className={styles.logo} href={'https://nextjs.org/'}>
            <Image
              src={next_logo}
              alt="NextJS Logo"
              className={styles.logo_img}
              // width={100}
              height={16}
              priority
            />
          </OutsideLink>
        </Space>
      </div>
    </footer>
  )
}
