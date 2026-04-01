"use client"

import Open_House_NTUs_logo_image from "@/assets/images/logo/Open_House_NTUs.png"
import ntnu_gdsc_logo_image from "@/assets/images/logo/ntnu_gdsc_logo.jpg"
import ntnu_logo_image from "@/assets/images/logo/ntnu_red.png"
import ntu_gdsc_logo_image from "@/assets/images/logo/ntu_gdsc_logo_with_padding.png"
import ntust_gdsc_logo_image from "@/assets/images/logo/ntust_gdsc.jpg"
import ntust_student_association_logo_image from "@/assets/images/logo/ntust_student_association.jpg"
import ntust_student_council_logo_image from "@/assets/images/logo/ntust_student_council.jpg"
import ntust_ece_logo_image from "@/assets/images/logo/ntust_ece.png"
import ntust_logo_image from "@/assets/images/logo/ntust.png"
import ntust_piano_club_logo_image from "@/assets/images/logo/ntust_piano_club.jpg"
import pingcap_logo_image from "@/assets/images/logo/PingCAP.svg"
import risingwave_logo_image from "@/assets/images/logo/risingwave.png"
import wspc_logo_image from "@/assets/images/logo/wspc.jpg"
import {OutsideLink} from "@/components/OutsideLink"
import {Col, Row, Space} from "antd"
import {useMessages, useTranslations} from "next-intl"
import Image from "next/image"
import React from "react"

import styles from "./RoleSection.module.sass"

const logo_size = 64

type RoleItemMsg = {name: string; role: string}

const currentIcons = [
  <Image
    key="gdg-ntnu"
    src={ntnu_gdsc_logo_image}
    alt=""
    width={logo_size}
    height={logo_size}
  />,
  <Image
    key="open-house"
    src={Open_House_NTUs_logo_image}
    alt=""
    width={logo_size}
    height={logo_size}
  />,
  <Image key="ntnu" src={ntnu_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image
    key="piano"
    src={ntust_piano_club_logo_image}
    alt=""
    width={logo_size}
    height={logo_size}
  />,
]

const currentUrls = [
  "https://gdg.community.dev/gdg-on-campus-national-taiwan-normal-university-taipei-taiwan/",
  "https://www.facebook.com/openhousentus/?locale=zh_TW",
  "https://www.ace.ntnu.edu.tw/",
  "https://www.instagram.com/ntust_piano/",
]

const formerIcons = [
  <Image key="rw" src={risingwave_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="pingcap" src={pingcap_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="gdg-ntu" src={ntu_gdsc_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="gdg-ntust" src={ntust_gdsc_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image
    key="council"
    src={ntust_student_council_logo_image}
    alt=""
    width={logo_size}
    height={logo_size}
  />,
  <Image
    key="assoc"
    src={ntust_student_association_logo_image}
    alt=""
    width={logo_size}
    height={logo_size}
  />,
  <Image key="ece-m" src={ntust_ece_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="ece-b" src={ntust_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="wspc" src={wspc_logo_image} alt="" width={logo_size} height={logo_size} />,
]

const formerUrls = [
  "https://risingwave.com/",
  "https://pingcap.com/",
  "https://www.instagram.com/gdg.ntu/",
  "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-of-science-and-technology-taipei-taiwan/",
  "https://www.facebook.com/ntustsc/",
  "https://www.facebook.com/ntustsa/",
  "https://ece.ntust.edu.tw/",
  "https://ece.ntust.edu.tw/",
  "https://www.wspc.edu.cn/",
]

export interface IPropsRoleSection {}

export const RoleSection: React.FunctionComponent<IPropsRoleSection> = () => {
  const t = useTranslations("role")
  const messages = useMessages() as {
    role: {currentItems: RoleItemMsg[]; formerItems: RoleItemMsg[]}
  }

  const categories = [
    {
      name: t("current"),
      items: messages.role.currentItems.map((item, i) => ({
        ...item,
        icon: currentIcons[i],
        url: currentUrls[i],
      })),
    },
    {
      name: t("former"),
      items: messages.role.formerItems.map((item, i) => ({
        ...item,
        icon: formerIcons[i],
        url: formerUrls[i],
      })),
    },
  ]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>
      <Space orientation={"vertical"} size={24}>
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className={styles.category_name}>{category.name}</h3>
            <Row gutter={[16, 16]} align={"stretch"}>
              {category.items.map((item) => (
                <Col
                  key={item.name + item.role}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  xxl={8}
                >
                  <div className={styles.item}>
                    <Space align={"start"}>
                      <div className={styles.item_icon}>{item.icon}</div>
                      <div className={styles.item_info}>
                        <OutsideLink
                          href={item.url}
                          className={styles.item_info_name}
                        >
                          {item.name}
                        </OutsideLink>
                        <div className={styles.item_info_role}>{item.role}</div>
                      </div>
                    </Space>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Space>
    </div>
  )
}
