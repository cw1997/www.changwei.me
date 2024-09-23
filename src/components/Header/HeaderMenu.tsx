"use client"

import {MenuOutlined} from "@ant-design/icons"
import {Button, ConfigProvider, Divider, Dropdown, Space} from "antd"
import Link from "next/link"
import {usePathname} from "next/navigation"
import React from "react"

import styles from "./Header.module.sass"

const data = {
  items: [
    {
      label: (
        <>
          Home
          <br />
          (首页)
        </>
      ),
      url: "/",
    },
    {
      label: (
        <>
          Portfolio
          <br />
          (作品集)
        </>
      ),
      url: "/portfolio",
    },
    {
      label: (
        <>
          Guestbook
          <br />
          (留言板)
        </>
      ),
      url: "/guestbook",
    },
    {
      label: (
        <>
          Friendly Link
          <br />
          (友情链接)
        </>
      ),
      url: "/friendly-link",
    },
  ],
}

export interface IPropsHeader {}

export const HeaderMenu: React.FunctionComponent<IPropsHeader> = (props) => {
  return (
    <>
      <HeaderMenuDesktop />
      <HeaderMenuMobile />
    </>
  )
}

export const HeaderMenuDesktop: React.FunctionComponent<IPropsHeader> = (
  props,
) => {
  const pathname = usePathname()
  return (
    <Space
      align={"center"}
      className={styles.menu_desktop}
      split={<Divider type={"vertical"} />}
    >
      {data.items.map((item) => {
        const is_current = pathname?.startsWith(item.url)
        return (
          <Link
            key={item.url}
            href={item.url}
            className={styles.menu_item}
            style={{
              fontWeight: is_current ? "700" : "400",
              textDecoration: is_current ? "underline" : "",
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </Space>
  )
}

export const HeaderMenuMobile: React.FunctionComponent<IPropsHeader> = (
  props,
) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            paddingBlock: 8,
            fontSize: 16,
          },
        },
      }}
    >
      <Dropdown
        // getPopupContainer={(element) => document.getElementById('header')}
        menu={{
          items: data.items.map((item) => ({
            key: item.url,
            label: (
              <Link key={item.url} href={item.url} className={styles.menu_item}>
                {item.label}
              </Link>
            ),
          })),
        }}
        className={styles.menu_mobile}
        overlayStyle={{zIndex: 99999}}
        trigger={["click"]}
      >
        <Button icon={<MenuOutlined />} size={"large"} />
      </Dropdown>
    </ConfigProvider>
  )
}
