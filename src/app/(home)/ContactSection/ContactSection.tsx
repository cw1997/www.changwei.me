"use client"

// import Changwei_icon_svg_url from '@/assets/images/changwei-logo.svg'
import instagram_qrcode_image_url from "@/assets/images/contact/instagram_changwei1997.jpg"
import line_qrcode_image_url from "@/assets/images/contact/line_changwei.jpg"
import qq_qrcode_image_url from "@/assets/images/contact/qq_867597730.jpg"
import telegram_qrcode_image_url from "@/assets/images/contact/telegram_changwei1006.jpg"
import wechat_qrcode_image_url from "@/assets/images/contact/wechat_changwei1006.jpg"
import zhihu_qrcode_image_url from "@/assets/images/contact/zhihu_changwei1006.jpg"
import {OutsideLink} from "@/components/OutsideLink"
import {
  BilibiliOutlined,
  DiscordOutlined,
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboOutlined,
  XOutlined,
  YoutubeOutlined,
  ZhihuOutlined,
} from "@ant-design/icons"
import {
  faFacebookMessenger,
  faLine,
  faTelegram,
  faThreads,
} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Popover, QRCode, Space, Typography} from "antd"
import React from "react"

import styles from "./ContactSection.module.sass"

const data: {
  category_name: string
  items: {
    icon: React.ReactNode
    name: string
    contact: string
    url?: string
    content?: React.ReactNode
    note?: React.ReactNode
    qrcode_image_url?: string
  }[]
}[] = [
  {
    category_name: "Social network",
    items: [
      {
        icon: <FacebookOutlined />,
        name: "Facebook",
        contact: "changwei1006",
        url: "https://www.facebook.com/changwei1006/",
        note: undefined,
      },
      {
        icon: <InstagramOutlined />,
        name: "Instagram",
        contact: "changwei1997",
        url: "https://instagram.com/changwei1997",
        content: (
          <img
            src={instagram_qrcode_image_url.src}
            alt={"https://instagram.com/changwei1997"}
          />
        ),
        qrcode_image_url: instagram_qrcode_image_url.src,
        note: undefined,
      },
      {
        icon: <XOutlined />,
        name: "X (Twitter)",
        contact: "changwei1006",
        url: "https://twitter.com/changwei1006",
        note: undefined,
      },
      {
        icon: <FontAwesomeIcon icon={faThreads} />,
        name: "Threads",
        contact: "changwei1997",
        url: "https://www.threads.net/@changwei1997",
        note: undefined,
      },
      {
        icon: <GithubOutlined />,
        name: "GitHub",
        contact: "cw1997",
        url: "https://github.com/cw1997",
        note: undefined,
      },
      {
        icon: <GitlabOutlined />,
        name: "Gitlab",
        contact: "cw1997",
        url: "https://gitlab.com/cw1997",
        note: undefined,
      },
      {
        icon: <LinkedinOutlined />,
        name: "LinkedIn",
        contact: "昌維, UID: 967703134",
        url: "https://www.linkedin.com/in/%E7%B6%AD-%E6%98%8C-967703134/",
        note: undefined,
      },
      {
        icon: <ZhihuOutlined />,
        name: "Zhihu (知乎)",
        contact: "changwei1006",
        url: "https://www.zhihu.com/people/changwei1006",
        content: (
          <img
            src={zhihu_qrcode_image_url.src}
            alt={"https://www.zhihu.com/people/changwei1006"}
          />
        ),
        qrcode_image_url: zhihu_qrcode_image_url.src,
        note: undefined,
      },
      {
        icon: (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1496"
            width="16"
            height="16"
          >
            <path
              d="M0 0m228.544 0l566.912 0q228.544 0 228.544 228.544l0 566.912q0 228.544-228.544 228.544l-566.912 0q-228.544 0-228.544-228.544l0-566.912q0-228.544 228.544-228.544Z"
              fill="#666666"
              p-id="1497"
            ></path>
            <path
              d="M360.768 390.976a269.696 269.696 0 0 1 138.24 34.688v8.064L465.28 506.88a154.304 154.304 0 0 0-88.704-28.16c-42.432 0-51.2 21.184-51.2 38.976 0 28.864 27.264 39.104 61.824 52.096l23.552 9.152c64 26.688 98.752 54.848 98.752 128 0 117.568-103.872 134.208-165.824 134.208a251.968 251.968 0 0 1-154.752-49.024v-8.192L224 713.6c27.648 25.664 63.04 41.344 100.544 44.672 27.648 0 57.28-11.392 57.28-43.392 0-28.16-25.28-38.528-57.088-51.712a503.296 503.296 0 0 1-37.632-16.64c-52.672-26.176-87.808-57.216-87.808-123.968 0-118.848 113.024-131.648 161.472-131.648z m377.6-209.792a232.384 232.384 0 0 1 96.768 18.304v10.048l-25.472 75.712a81.344 81.344 0 0 0-36.544-10.24c-27.968 0-40.064 19.776-40.064 66.176v57.088c0 1.408 0.512 2.816 1.472 3.84l1.792 1.088 2.048 0.384h70.4l-1.472 92.864h-16c-12.928 0-29.376-0.192-43.136-0.576l-9.792-0.32a5.824 5.824 0 0 0-3.84 1.472 5.12 5.12 0 0 0-1.472 3.84c0.576 29.888 1.024 78.144 1.408 128.832l0.384 50.816c0.448 67.264 0.64 129.28 0.768 148.032l-130.368 0.704v-40.512-11.84l0.064-26.496 0.192-77.12 0.128-32.64c0.256-54.464 0.704-107.392 1.472-139.072a6.016 6.016 0 0 0-1.664-3.84l-1.792-1.088-2.048-0.384c-18.304 0-34.752 0.96-44.416 0.96l1.472-92.928H601.6a5.824 5.824 0 0 0 3.84-1.472 5.696 5.696 0 0 0 1.664-3.84l-1.856-75.328c0-117.76 73.152-142.464 133.12-142.464z"
              fill="#ffffff"
              p-id="1498"
            ></path>
          </svg>
        ),
        name: "SegmentFault",
        contact: "changwei",
        url: "https://segmentfault.com/u/changwei",
        note: undefined,
      },
      {
        icon: <WeiboOutlined />,
        name: "Weibo (微博)",
        contact: "changweicw",
        url: "https://weibo.com/changweicw",
        note: undefined,
      },
      {
        icon: (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4745"
            width="16"
            height="16"
          >
            <path
              d="M366.301006 398.071626l285.509878 0 0 118.961511-285.509878 0 0-118.961511Z"
              fill="#272636"
              p-id="4746"
            ></path>
            <path
              d="M512.002558 64.695529c-247.03455 0-447.297819 200.285783-447.297819 447.314192 0 260.420431 200.26327 447.293726 447.297819 447.293726 247.02841 0 447.29168-186.873295 447.29168-447.293726C959.295261 264.981312 759.031991 64.695529 512.002558 64.695529M247.345635 754.957182 247.345635 707.375443l163.30039 0c-14.24239-47.589926-32.811323-66.468921-55.871551-101.028052l55.871551-19.958584c22.182231 32.808253 41.955596 73.39671 59.458243 120.985613l105.697403 0c20.927656-47.583786 39.31444-79.790334 55.118397-123.168327l60.7384 24.332199c-15.866378 36.584256-33.025194 51.246202-51.180711 98.836128l130.293615 0 0 47.581739L247.345635 754.956159zM294.926351 564.617946 294.926351 350.48784l418.230778 0 10.034551 0 0 214.129083L294.926351 564.616922zM770.777512 279.107045l-523.475879 0 0-47.583786 523.475879 0L770.777512 279.107045z"
              fill="#272636"
              p-id="4747"
            ></path>
          </svg>
        ),
        name: "Douban (豆瓣)",
        contact: "UID: 27225472",
        url: "https://www.douban.com/people/27225472/?_i=9769701ynDeuaL",
        note: undefined,
      },
      {
        icon: (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5764"
            width="16"
            height="16"
          >
            <path
              d="M105.557 34.601c-32.768 7.25-57.166 29.003-68.604 61.351l-3.902 11.152v810.103l4.325 11.994c10.175 28.44 29.696 47.821 58.42 58l11.154 3.908h810.1l11.991-4.328c28.447-10.175 47.828-29.7 58.006-58.42l3.902-11.154V107.104l-3.902-11.152c-10.178-28.723-29.56-48.244-58.006-58.422l-11.991-4.322-401.565-0.28c-329.059-0.14-403.094 0.14-409.928 1.673z m341.33 365.872c21.75 5.717 36.113 16.868 44.336 34.3 9.486 19.938 6.973 45.732-6.134 65.67-8.506 13.107-23.702 26.494-54.657 48.383-6.134 4.462-14.64 11.015-18.825 14.92l-7.666 6.83 47.824 0.144h47.684l-0.276 24.678-0.42 24.818h-184.05l0.42-4.884c0.836-7.387 5.573-21.893 11.014-32.908 10.039-20.91 29.56-40.99 68.321-70.55 35.137-26.911 45.176-41.27 39.319-56.47-3.202-8.643-13.94-15.616-23.979-15.756-6.137 0-14.363 3.068-18.685 7.25-3.485 3.348-8.786 16.035-8.786 21.333 0 1.812-0.416 3.628-0.976 3.908-1.532 0.976-60.231-3.908-61.348-5.018-1.672-1.675 2.37-19.38 6.834-30.119 8.642-20.633 27.604-34.297 53.402-38.482 17.704-2.928 52.008-1.816 66.648 1.953zM165.37 416.229c2.792 8.642 13.667 43.64 24.262 77.663 10.738 34.021 19.66 61.348 20.08 60.648 0.417-0.693 11.292-35.553 24.263-77.663l23.422-76.268h70.414l-2.789 7.254c-1.533 4.041-19.797 53.541-40.714 109.868L246.24 620.213l-37.505 0.28-37.646 0.416-41.134-108.895c-22.586-59.956-41.27-109.596-41.55-110.152-0.277-0.696 15.895-1.256 35.836-1.256h36.253l4.874 15.623z m530.681 8.086v23.702H581.717v33.464l52.706 0.277 52.562 0.42 0.42 22.586 0.28 22.73-52.566 0.279-52.709 0.416v41.83l58.146 0.417 58.143 0.284 0.42 19.797 0.413 19.657 34.024-51.166c18.688-28.166 34.024-51.869 34.024-52.845s-15.06-24.818-33.604-52.985c-18.545-28.303-33.744-51.729-33.744-52.006 0-0.28 17.148-0.56 38.062-0.56h37.925l18.685 32.769c10.318 17.848 19.24 32.348 19.66 32.068 0.56-0.42 9.063-15.056 18.829-32.765l17.984-32.071h37.366c20.5 0 37.37 0.28 37.37 0.7 0 0.416-15.057 24.261-33.468 52.981-18.405 28.58-33.465 52.426-33.465 52.982 0 0.42 16.176 25.375 35.977 55.494 19.797 30.12 36.53 55.494 37.09 56.33 0.835 1.396-7.114 1.813-37.79 1.813H855.56l-20.774-34.161c-11.574-18.828-21.333-34.02-21.893-33.74-0.693 0.14-10.315 15.332-21.753 33.74l-20.634 33.464-128.553 0.42-128.556 0.277V400.609H696.05v23.706z"
              p-id="5765"
            ></path>
          </svg>
        ),
        name: "V2EX",
        contact: "changwei",
        url: "https://www.v2ex.com/member/changwei",
        note: undefined,
      },
      {
        icon: <BilibiliOutlined />,
        name: "Bilibili",
        contact: "UID: 4654368",
        url: "https://space.bilibili.com/4654368",
        note: undefined,
      },
      {
        icon: <YoutubeOutlined />,
        name: "Youtube",
        contact: "changwei1006",
        url: "https://www.youtube.com/@changwei1006",
        note: undefined,
      },
    ],
  },
  {
    category_name: "Instant Messaging",
    items: [
      {
        icon: <WechatOutlined />,
        name: "Wechat",
        contact: "changwei1006",
        content: <img src={wechat_qrcode_image_url.src} alt={"changwei1006"} />,
        qrcode_image_url: wechat_qrcode_image_url.src,
        url: undefined,
        note: undefined,
      },
      {
        icon: <FontAwesomeIcon icon={faTelegram} />,
        name: "Telegram",
        contact: "changwei1006",
        content: (
          <img src={telegram_qrcode_image_url.src} alt={"changwei1006"} />
        ),
        qrcode_image_url: telegram_qrcode_image_url.src,
        url: "https://t.me/changwei1006",
        note: undefined,
      },
      {
        icon: <QqOutlined />,
        name: "QQ",
        contact: "867597730",
        content: <img src={qq_qrcode_image_url.src} alt={"867597730"} />,
        qrcode_image_url: qq_qrcode_image_url.src,
        url: undefined,
        note: undefined,
      },
      {
        icon: <MailOutlined />,
        name: "Email (Global)",
        contact: "changwei1006@gmail.com",
        url: "mailto:changwei1006@gmail.com",
        note: undefined,
      },
      {
        icon: <MailOutlined />,
        name: "Email (中国大陆)",
        contact: "changwei1006@qq.com",
        url: "mailto:changwei1006@qq.com",
        note: undefined,
      },
      {
        icon: <FontAwesomeIcon icon={faFacebookMessenger} />,
        name: "Facebook Messenger",
        contact: "changwei1006",
        url: "https://www.facebook.com/changwei1006/",
        note: undefined,
      },
      {
        icon: <DiscordOutlined />,
        name: "Discord",
        contact: "changwei1006",
        note: undefined,
      },
      {
        icon: <FontAwesomeIcon icon={faLine} />,
        name: "Line",
        contact: "+886-0912-***-***",
        content: (
          <img
            src={line_qrcode_image_url.src}
            alt={"https://line.me/ti/p/b_9gnmE0Ob"}
          />
        ),
        qrcode_image_url: line_qrcode_image_url.src,
        url: "https://line.me/ti/p/b_9gnmE0Ob",
        note: undefined,
      },
    ],
  },
] as const

export interface IPropsContactSection {}

export const ContactSection: React.FunctionComponent<IPropsContactSection> = (
  props,
) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Social and Contact</h2>
      <Space direction={"vertical"} size={16}>
        {data.map((category) => (
          <div key={category.category_name} className={styles.category}>
            <div className={styles.category_name}>
              {category.category_name}:
            </div>
            <Space className={styles.list} size={8} wrap>
              {category.items.map((item, index) => (
                <Popover
                  trigger={["focus", "hover"]}
                  key={item.name}
                  placement={"right"}
                  // open={index === 0}
                  title={
                    <Space>
                      {item.icon} {item.name}
                    </Space>
                  }
                  content={
                    <Space direction={"vertical"} className={styles.item_popup}>
                      <Typography.Text copyable>{item.contact}</Typography.Text>
                      {item.url && (
                        <Space direction={"vertical"}>
                          <QRCode
                            errorLevel="H"
                            value={item.url}
                            // icon={changwei_icon_svg_url.url}
                          />
                          <OutsideLink href={item.url} />
                        </Space>
                      )}
                      <div className={styles.item_popup_content}>
                        {item.content}
                      </div>
                      {item.note && <p>{item.note}</p>}
                    </Space>
                  }
                >
                  <OutsideLink
                    className={styles.item}
                    href={item.url ?? item.qrcode_image_url}
                  >
                    <div className={styles.item_icon}>
                      {/*<img style={{width: 64, height: 'auto'}} src={item.icon.src} alt={item.name}/>*/}
                      {item.icon}
                    </div>
                    <div className={styles.item_info}>
                      {/*<div className={styles.item_info_name}>{item.name}</div>*/}
                      <div className={styles.item_info_contact}>
                        {item.contact}
                      </div>
                      {item.note && (
                        <div className={styles.item_info_note}>{item.note}</div>
                      )}
                      {/*{(item.tags?.length ?? 0) > 0 && (*/}
                      {/*  <Space className={styles.item_info_tags} wrap>*/}
                      {/*    <TagsOutlined/> {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}*/}
                      {/*  </Space>*/}
                      {/*)}*/}
                    </div>
                  </OutsideLink>
                </Popover>
              ))}
            </Space>
          </div>
        ))}
      </Space>
    </div>
  )
}
