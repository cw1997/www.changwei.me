'use client'

import {MenuOutlined} from "@ant-design/icons";
import {Button, ConfigProvider, Divider, Dropdown, Space} from "antd";
import Link from "next/link";
import React from "react";

import styles from "./Header.module.sass";

const data = {
  items: [
    {label: 'Guestbook', url: '/guestbook'},
    {label: 'Portfolio', url: '/portfolio'},
  ]
}

export interface IPropsHeader {
}

export const HeaderMenu: React.FunctionComponent<IPropsHeader> = (props) => {
  
  return (
    <>
      <HeaderMenuDesktop />
      <HeaderMenuMobile />
    </>
  )
}


export const HeaderMenuDesktop: React.FunctionComponent<IPropsHeader> = (props) => {
  
  return (
    <Space align={'center'} className={styles.menu_desktop} split={<Divider type={'vertical'} />}>
      {data.items.map((item) => (
        <Link key={item.url} href={item.url} className={styles.menu_item}>
          {item.label}
        </Link>
      ))}
    </Space>
  )
}

export const HeaderMenuMobile: React.FunctionComponent<IPropsHeader> = (props) => {
  
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
        menu={{ items: data.items.map((item) => ({key: item.url, label: (
          <Link key={item.url} href={item.url} className={styles.menu_item}>
            {item.label}
          </Link>
        )})) }}
        className={styles.menu_mobile} overlayStyle={{zIndex: 99999}}
        trigger={['click']}
      >
        <Button icon={<MenuOutlined />} size={'large'} />
      </Dropdown>
    </ConfigProvider>
  )
}
