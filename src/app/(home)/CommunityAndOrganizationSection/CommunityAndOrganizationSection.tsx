"use client"

import {OutsideLink} from "@/components/OutsideLink";
import {Col, Row, Space} from "antd"
import Link from "next/link";
import React from "react"
import Image from "next/image"

import styles from "./CommunityAndOrganizationSection.module.sass"
import ntu_gdsc_logo_image from "@/assets/images/logo/ntu_gdsc_logo_with_padding.png"
import ntust_gdsc_logo_image from "@/assets/images/logo/ntust_gdsc.jpg"
import ntust_student_council_logo_image from "@/assets/images/logo/ntust_student_council.jpg"
import risingwave_logo_image from "@/assets/images/logo/risingwave.png"
import ntust_ece_logo_image from "@/assets/images/logo/ntust_ece.png"
import ntust_piano_club_logo_image from "@/assets/images/logo/ntust_piano_club.jpg"

const logo_size = 64

const data: {
  icon: React.ReactNode
  name: string
  role: string
  // contact: string
  url?: string
  description?: React.ReactNode
  // qrcode_image_url?: string
}[] = [
  {
    icon: <Image src={ntu_gdsc_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
    name: "Google Developer Groups on Campus (National Taiwan University)",
    role: "Speaker (Efficiency Engineering & Devtools & DevOps)",
    url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-taipei-taiwan/",
  },
  {
    icon: <Image src={ntust_gdsc_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
    name: "Google Developer Groups on Campus (National Taiwan University of Science and Technology)",
    role: "Speaker (Web Front-end)",
    url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-of-science-and-technology-taipei-taiwan/",
  },
  {
    icon: <Image src={ntust_student_council_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
    name: "Student Council (National Taiwan University of Science and Technology)",
    role: "Vice-President",
    url: "https://www.facebook.com/ntustsc/",
  },
  {
    icon: <Image src={risingwave_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
    name: "RisingWave Labs",
    role: "Web Front-end Developer (Intern)",
    url: "https://risingwave.com/",
  },
  {
    icon: <Image src={ntust_ece_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
    name: "Electrical and Computer Engineering (National Taiwan University of Science and Technology)",
    role: "Master degree",
    url: "https://ece.ntust.edu.tw/",
  },
  {
    icon: <Image src={ntust_piano_club_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
    name: "Piano club (National Taiwan University of Science and Technology)",
    role: "Member",
    url: "",
  },
] as const

export interface IPropsCommunityAndOrganizationSection {}

export const CommunityAndOrganizationSection: React.FunctionComponent<IPropsCommunityAndOrganizationSection> = (
  props,
) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Community and organization</h2>
      <Row gutter={[16, 16]} align={"stretch"}>
        {data.map((item) => (
          <Col key={item.name} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
            <div className={styles.item}>
              <Space align={"start"}>
                <div className={styles.item_icon}>{item.icon}</div>
                <div className={styles.item_info}>
                  <OutsideLink href={item.url} className={styles.item_info_name}>{item.name}</OutsideLink>
                  <div className={styles.item_info_role}>{item.role}</div>
                </div>
              </Space>
              {item.description && (
                <div className={styles.item_description}>{item.description}</div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
