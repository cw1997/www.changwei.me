"use client"

import styles from "./Header.module.sass"
import {MenuOutlined} from "@ant-design/icons"
import {Link, usePathname} from "@/i18n/navigation"
import {Button, ConfigProvider, Divider, Dropdown, Space} from "antd"
import {useTranslations} from "next-intl"
import React from "react"

const paths = ["/", "/portfolio", "/guestbook", "/friendly-link", "/resume"] as const

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
  const t = useTranslations("nav")

  const items = [
    {path: paths[0], label: t("home")},
    {path: paths[1], label: t("portfolio")},
    {path: paths[2], label: t("guestbook")},
    {path: paths[3], label: t("friendlyLink")},
    {path: paths[4], label: t("resume")},
  ] as const

  return (
    <Space
      align={"center"}
      className={styles.menu_desktop}
      separator={<Divider orientation={"vertical"} />}
    >
      {items.map((item) => {
        const is_current =
          item.path === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.path)
        return (
          <Link
            key={item.path}
            href={item.path}
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
  const t = useTranslations("nav")

  const items = [
    {path: paths[0], label: t("home")},
    {path: paths[1], label: t("portfolio")},
    {path: paths[2], label: t("guestbook")},
    {path: paths[3], label: t("friendlyLink")},
    {path: paths[4], label: t("resume")},
  ] as const

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
      <div className={styles.menu_mobile}>
        <Dropdown
          menu={{
            items: items.map((item) => ({
              key: item.path,
              label: (
                <Link
                  key={item.path}
                  href={item.path}
                  className={styles.menu_item}
                >
                  {item.label}
                </Link>
              ),
            })),
          }}
          styles={{root: {zIndex: 99999}}}
          trigger={["click"]}
        >
          <Button icon={<MenuOutlined />} size={"large"} />
        </Dropdown>
      </div>
    </ConfigProvider>
  )
}
