import React from "react"
import Image from "next/image"
import {Divider, Space} from "antd"
import {CodeOutlined, GithubOutlined} from "@ant-design/icons"

import {OutsideLink} from "@/components/OutsideLink"
import next_logo from "@/assets/images/logo/frontend/next.svg"
import vercel_logo from "@/assets/images/logo/frontend/vercel.svg"
import cloudflare_logo from "@/assets/images/logo/Cloudflare_Logo.svg"

import styles from "./Footer.module.sass"

export interface IPropsFooter {}

export const Footer: React.FunctionComponent<IPropsFooter> = (props) => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.copyright}>
            © {year}, Chang Wei, All rights reserved. <br />© {year}, 昌维
            版权所有.
          </p>
          <div className={styles.nerd_info}>
            <p>
              <CodeOutlined /> Source code [
              <OutsideLink href={"https://github.com/cw1997/www.changwei.me"}>
                cw1997/www.changwei.me
              </OutsideLink>
              ] is under{" "}
              <OutsideLink href={"https://www.apache.org/licenses/LICENSE-2.0"}>
                Apache License, Version 2.0 (Apache 2.0)
              </OutsideLink>
            </p>
            <p className={styles.copyright_github}>
              <GithubOutlined /> GitHub Repository:{" "}
              <OutsideLink href={"https://github.com/cw1997/www.changwei.me"} />
            </p>
            <div style={{marginTop: 8}}>
              <div>
                <Space wrap>
                  <img
                    alt="GitHub Repo stars"
                    src="https://img.shields.io/github/stars/cw1997/www.changwei.me"
                  />
                  <img
                    alt="GitHub Repo watchers"
                    src="https://img.shields.io/github/watchers/cw1997/www.changwei.me"
                  />
                  <img
                    alt="GitHub Repo forks"
                    src="https://img.shields.io/github/forks/cw1997/www.changwei.me"
                  />
                  <img
                    alt="GitHub branch status"
                    src="https://img.shields.io/github/checks-status/cw1997/www.changwei.me/main"
                  />
                  <img
                    alt="GitHub last commit"
                    src="https://img.shields.io/github/last-commit/cw1997/www.changwei.me?style=flat"
                  />
                  <img
                    alt="GitHub Created At"
                    src="https://img.shields.io/github/created-at/cw1997/www.changwei.me"
                  />
                  <img
                    alt="GitHub repo size"
                    src="https://img.shields.io/github/repo-size/cw1997/www.changwei.me"
                  />
                </Space>
              </div>
              <div>
                <Space wrap>
                  <img
                    alt="GitHub followers"
                    src="https://img.shields.io/github/followers/cw1997"
                  />
                  <img
                    alt="GitHub User's stars"
                    src="https://img.shields.io/github/stars/cw1997"
                  />
                  <img
                    alt="X (formerly Twitter) Follow"
                    src="https://img.shields.io/twitter/follow/changwei1006"
                  />
                </Space>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.powered_by}>
          <Space
            align={"center"}
            className={styles.powered_by_list}
            split={<Divider type={"vertical"} />}
            wrap
          >
            <div className={styles.powered_by_item}>
              Powered by
              <OutsideLink className={styles.logo} href={"https://nextjs.org/"}>
                <Image
                  src={next_logo}
                  alt="NextJS Logo"
                  className={styles.logo_img}
                  // width={100}
                  height={16}
                  priority
                />
              </OutsideLink>
            </div>
            <div className={styles.powered_by_item}>
              Hosted on
              <OutsideLink className={styles.logo} href={"https://vercel.com"}>
                <Image
                  src={vercel_logo}
                  alt="Vercel Logo"
                  className={styles.logo_img}
                  // width={100}
                  height={16}
                  priority
                />
              </OutsideLink>
            </div>
            <div className={styles.powered_by_item}>
              CDN:
              <OutsideLink
                className={styles.logo}
                href={"https://cloudflare.com"}
              >
                <Image
                  src={cloudflare_logo}
                  alt="CloudFlare Logo"
                  className={styles.logo_img}
                  // width={100}
                  height={32}
                  priority
                />
              </OutsideLink>
            </div>
          </Space>
        </div>
      </div>
    </footer>
  )
}
