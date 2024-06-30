'use client'

import {OutsideLink} from "@/components/OutsideLink";
import React from "react";
import {BilibiliOutlined, FacebookOutlined, GithubOutlined, InstagramOutlined, QqOutlined, WechatOutlined, WeiboOutlined, XOutlined, ZhihuOutlined} from "@ant-design/icons";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Popover, QRCode, Space, Typography} from "antd";

import Changwei_icon_svg_url from '@/assets/images/changwei-logo.svg'

import styles from "./ContactSection.module.sass";


const data: {
  category_name: string
  items: {
    icon: React.ReactNode
    name: string
    contact: string
    url?: string
    content?: string
    note?: React.ReactNode
  }[]
}[] = [
  {
    category_name: "Social network",
    items: [
      {
        icon: <FacebookOutlined />,
        name: 'Facebook',
        contact: 'changwei1006',
        url: 'https://www.facebook.com/changwei1006/',
        note: undefined,
      },
      {
        icon: <InstagramOutlined />,
        name: 'Instagram',
        contact: 'changwei1997',
        url: 'https://instagram.com/changwei1997',
        note: undefined,
      },
      {
        icon: <XOutlined />,
        name: 'X (Twitter)',
        contact: 'changwei1006',
        url: 'https://twitter.com/changwei1006',
        note: undefined,
      },
      {
        icon: <GithubOutlined />,
        name: 'GitHub',
        contact: 'cw1997',
        url: 'https://github.com/cw1997',
        note: undefined,
      },
      {
        icon: <ZhihuOutlined />,
        name: 'Zhihu',
        contact: 'changwei1006',
        url: 'https://www.zhihu.com/people/changwei1006',
        note: undefined,
      },
      {
        icon: <WeiboOutlined />,
        name: 'Weibo',
        contact: 'changweicw',
        url: 'https://weibo.com/changweicw',
        note: undefined,
      },
      {
        icon: <BilibiliOutlined />,
        name: 'Bilibili',
        contact: 'UID: 4654368',
        url: 'https://space.bilibili.com/4654368',
        note: undefined,
      },
    ],
  },
  {
    category_name: "Instant Messaging",
    items: [
      {
        icon: <QqOutlined />,
        name: 'QQ',
        contact: '867597730',
        url: undefined,
        note: undefined,
      },
      {
        icon: <WechatOutlined />,
        name: 'QQ',
        contact: 'changwei1006',
        url: undefined,
        note: undefined,
      },
      {
        icon: <FontAwesomeIcon icon={faTelegram} />,
        name: 'Telegram',
        contact: 'changwei1006',
        url: undefined,
        note: undefined,
      },
    ],
  },
] as const

export interface IPropsContactSection {
}

export const ContactSection: React.FunctionComponent<IPropsContactSection> = (props) => {
  return (
    <div className={styles.container}>
      {/*<h2 className={styles.title}>Social and Contact</h2>*/}
      <Space direction={'vertical'} size={16}>
        {data.map((category) => (
          <div key={category.category_name} className={styles.category}>
            <div className={styles.category_name}>{category.category_name}:</div>
            <Space className={styles.list} size={8} wrap>
              {category.items.map((item, index) => (
                <Popover
                  key={item.name}
                  open={index === 0}
                  title={<Space>{item.icon} {item.name}</Space>}
                  content={(
                    <Space direction={'vertical'}>
                      <Typography.Text copyable>{item.contact}</Typography.Text>
                      {item.url && (
                        <Space direction={'vertical'}>
                          <QRCode
                            errorLevel="H"
                            value={item.url}
                            // icon={changwei_icon_svg_url.url}
                          />
                          <OutsideLink href={item.url}/>
                        </Space>
                      )}
                      {item.content}
                      {item.note && (
                        <p>{item.note}</p>
                      )}
                    </Space>
                  )}
                >
                  <div className={styles.item}>
                    <div className={styles.item_icon}>
                      {/*<img style={{width: 64, height: 'auto'}} src={item.icon.src} alt={item.name}/>*/}
                      {item.icon}
                    </div>
                    <div className={styles.item_info}>
                      {/*<div className={styles.item_info_name}>{item.name}</div>*/}
                      <div className={styles.item_info_contact}>{item.contact}</div>
                      {item.note && <div className={styles.item_info_note}>{item.note}</div>}
                      {/*{(item.tags?.length ?? 0) > 0 && (*/}
                      {/*  <Space className={styles.item_info_tags} wrap>*/}
                      {/*    <TagsOutlined/> {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}*/}
                      {/*  </Space>*/}
                      {/*)}*/}
                    </div>
                  </div>
                </Popover>
              ))}
            </Space>
          </div>
        ))}
      </Space>
    </div>
  )
}
