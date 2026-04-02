"use client"

import {MenuOutlined} from "@ant-design/icons"
import {Button, ConfigProvider, Divider, Dropdown, Space} from "antd"
import {Link, usePathname} from "@/i18n/navigation"
import {useTranslations} from "next-intl"
import React from "react"

import styles from "./Header.module.sass"

export interface IPropsHeader {}

export const HeaderMenu: React.FunctionComponent<IPropsHeader> = () => {
  const t = useTranslations("nav")

  const items = [
    {
      label: (<>{t("home")}<br />{t("homeSubtitle")}</>),
      url: "/" as const,
    },
    {
      label: (<>{t("portfolio")}<br />{t("portfolioSubtitle")}</>),
      url: "/portfolio" as const,
    },
    {
      label: (<>{t("guestbook")}<br />{t("guestbookSubtitle")}</>),
      url: "/guestbook" as const,
    },
    {
      label: (<>{t("friendlyLink")}<br />{t("friendlyLinkSubtitle")}</>),
      url: "/friendly-link" as const,
    },
    {
      label: (<>{t("resume")}<br />{t("resumeSubtitle")}</>),
      url: "/resume" as const,
    },
  ]

  return (
    <>
      <HeaderMenuDesktop items={items} />
      <HeaderMenuMobile items={items} />
    </>
  )
}

type MenuItem = {
  label: React.ReactNode
  url: string
}

const HeaderMenuDesktop: React.FunctionComponent<{items: MenuItem[]}> = ({items}) => {
  const pathname = usePathname()
  return (
    <Space
      align={"center"}
      className={styles.menu_desktop}
      separator={<Divider orientation={"vertical"} />}
    >
      {items.map((item) => {
        const is_current = item.url === "/" ? pathname === "/" : pathname?.startsWith(item.url)
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

const HeaderMenuMobile: React.FunctionComponent<{items: MenuItem[]}> = ({items}) => {
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
              key: item.url,
              label: (
                <Link key={item.url} href={item.url} className={styles.menu_item}>
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
