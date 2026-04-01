"use client"

import {OutsideLink} from "@/components/OutsideLink"
import {Col, Row, Space} from "antd"
import React from "react"
import Image from "next/image"
import {useMessages, useTranslations} from "next-intl"

import styles from "./RoleSection.module.sass"
import Open_House_NTUs_logo_image from "@/assets/images/logo/Open_House_NTUs.png"
import ntnu_logo_image from "@/assets/images/logo/ntnu_red.png"
import ntnu_gdsc_logo_image from "@/assets/images/logo/ntnu_gdsc_logo.jpg"
import ntu_gdsc_logo_image from "@/assets/images/logo/ntu_gdsc_logo_with_padding.png"
import ntust_gdsc_logo_image from "@/assets/images/logo/ntust_gdsc.jpg"
import ntust_student_council_logo_image from "@/assets/images/logo/ntust_student_council.jpg"
import ntust_student_association_logo_image from "@/assets/images/logo/ntust_student_association.jpg"
import risingwave_logo_image from "@/assets/images/logo/risingwave.png"
import pingcap_logo_image from "@/assets/images/logo/PingCAP.svg"
import ntust_ece_logo_image from "@/assets/images/logo/ntust_ece.png"
import ntust_logo_image from "@/assets/images/logo/ntust.png"
import ntust_piano_club_logo_image from "@/assets/images/logo/ntust_piano_club.jpg"
import wspc_logo_image from "@/assets/images/logo/wspc.jpg"

const logo_size = 64

type RoleRow = {name: string; role: string}

type RoleDetailMsg = {
  current: RoleRow[]
  former: RoleRow[]
}

const currentUrls = [
  "https://gdg.community.dev/gdg-on-campus-national-taiwan-normal-university-taipei-taiwan/",
  "https://www.facebook.com/openhousentus/?locale=zh_TW",
  "https://www.ace.ntnu.edu.tw/",
  "https://www.instagram.com/ntust_piano/",
] as const

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
] as const

const currentIcons = [
  <Image key="ntnu_gdsc" src={ntnu_gdsc_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="open_house" src={Open_House_NTUs_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="ntnu" src={ntnu_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="piano" src={ntust_piano_club_logo_image} alt="" width={logo_size} height={logo_size} />,
]

const formerIcons = [
  <Image key="rw" src={risingwave_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="pc" src={pingcap_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="ntu_gdsc" src={ntu_gdsc_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="ntust_gdsc" src={ntust_gdsc_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="sc" src={ntust_student_council_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="sa" src={ntust_student_association_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="ece_m" src={ntust_ece_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="ece_b" src={ntust_logo_image} alt="" width={logo_size} height={logo_size} />,
  <Image key="wspc" src={wspc_logo_image} alt="" width={logo_size} height={logo_size} />,
]

export interface IPropsRoleSection {}

export const RoleSection: React.FunctionComponent<IPropsRoleSection> = () => {
  const t = useTranslations("sections")
  const messages = useMessages()
  const detail = (messages as {roleDetail: RoleDetailMsg}).roleDetail

  const categories: {
    nameKey: "current" | "former"
    items: {icon: React.ReactNode; name: string; role: string; url: string}[]
  }[] = [
    {
      nameKey: "current",
      items: detail.current.map((row, i) => ({
        icon: currentIcons[i],
        name: row.name,
        role: row.role,
        url: currentUrls[i],
      })),
    },
    {
      nameKey: "former",
      items: detail.former.map((row, i) => ({
        icon: formerIcons[i],
        name: row.name,
        role: row.role,
        url: formerUrls[i],
      })),
    },
  ]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("role")}</h2>
      <Space orientation={"vertical"} size={24}>
        {categories.map((category) => (
          <div key={category.nameKey}>
            <h3 className={styles.category_name}>{t(category.nameKey)}</h3>
            <Row gutter={[16, 16]} align={"stretch"}>
              {category.items.map((item) => (
                <Col key={item.url} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                  <div className={styles.item}>
                    <Space align={"start"}>
                      <div className={styles.item_icon}>{item.icon}</div>
                      <div className={styles.item_info}>
                        <OutsideLink href={item.url} className={styles.item_info_name}>
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
