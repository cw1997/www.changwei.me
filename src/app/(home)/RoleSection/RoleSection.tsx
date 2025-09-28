"use client"

import {OutsideLink} from "@/components/OutsideLink";
import {Col, Row, Space} from "antd"
import React from "react"
import Image from "next/image"

import styles from "./RoleSection.module.sass"
import ntnu_logo_image from "@/assets/images/logo/ntnu_red.png"
import ntnu_gdsc_logo_image from "@/assets/images/logo/ntnu_gdsc_logo.jpg"
import ntu_gdsc_logo_image from "@/assets/images/logo/ntu_gdsc_logo_with_padding.png"
import ntust_gdsc_logo_image from "@/assets/images/logo/ntust_gdsc.jpg"
import ntust_student_council_logo_image from "@/assets/images/logo/ntust_student_council.jpg"
import ntust_student_association_logo_image from "@/assets/images/logo/ntust_student_association.jpg"
import risingwave_logo_image from "@/assets/images/logo/risingwave.png"
import pingcap_logo_image from "@/assets/images/logo/PingCAP.svg"
import ntust_ece_logo_image from "@/assets/images/logo/ntust_ece.png"
import ntust_piano_club_logo_image from "@/assets/images/logo/ntust_piano_club.jpg"

type t_role_item =  {
  icon: React.ReactNode
  name: string
  role: string
  // contact: string
  url?: string
  description?: React.ReactNode
  // qrcode_image_url?: string
}

const logo_size = 64

const data: {
  name: string
  items: {
    icon: React.ReactNode
    name: string
    role: string
    // contact: string
    url?: string
    description?: React.ReactNode
    // qrcode_image_url?: string
  }[]
}[] = [
  {
    name: "Current",
    items: [
      {
        icon: <Image src={ntnu_gdsc_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Google Developer Groups on Campus (National Taiwan Normal University)",
        role: "Lecture Speaker (Web Front-end, Python, Database & SQL)",
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-normal-university-taipei-taiwan/",
      },
      {
        icon: <Image src={ntnu_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "National Taiwan Normal University",
        role: "Ph.D. student (Department of Adult and Continuing Education)",
        url: "https://www.ace.ntnu.edu.tw/",
      },
      {
        icon: <Image src={ntust_piano_club_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Piano club (National Taiwan University of Science and Technology)",
        role: "Member",
        url: "https://www.instagram.com/ntust_piano/",
      },
    ] as const
  },
  {
    name: "Former",
    items: [
      {
        icon: <Image src={risingwave_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "RisingWave Labs",
        role: "Web Front-end Developer (Intern)",
        url: "https://risingwave.com/",
      },
      {
        icon: <Image src={pingcap_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "PingCAP",
        role: "Web Front-end Developer (Intern)",
        url: "https://pingcap.com/",
      },
      {
        icon: <Image src={ntu_gdsc_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Google Developer Groups on Campus (National Taiwan University)",
        role: "Lecture Speaker (Efficiency Engineering & Devtools & DevOps)",
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-taipei-taiwan/",
      },
      {
        icon: <Image src={ntust_gdsc_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Google Developer Groups on Campus (National Taiwan University of Science and Technology)",
        role: "Lecture Speaker (Web Front-end)",
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-of-science-and-technology-taipei-taiwan/",
      },
      {
        icon: <Image src={ntust_student_council_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Student Council (National Taiwan University of Science and Technology)",
        role: "VP (Vice-President)",
        url: "https://www.facebook.com/ntustsc/",
      },
      {
        icon: <Image src={ntust_student_association_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Student Association (National Taiwan University of Science and Technology)",
        role: "CFO (Chief Finance Officer)",
        url: "https://www.facebook.com/ntustsa/",
      },
      {
        icon: <Image src={ntust_ece_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Electrical and Computer Engineering (National Taiwan University of Science and Technology)",
        role: "Master's degree student",
        url: "https://ece.ntust.edu.tw/",
      },
      {
        icon: <Image src={ntust_ece_logo_image.src} alt={""} width={logo_size} height={logo_size} />,
        name: "Electrical and Computer Engineering (National Taiwan University of Science and Technology)",
        role: "Bachelor's degree student",
        url: "https://ece.ntust.edu.tw/",
      },
    ] as const
  },
] as const

export interface IPropsRoleSection {}

export const RoleSection: React.FunctionComponent<IPropsRoleSection> = (
  props,
) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Role</h2>
      <Space direction={"vertical"} size={24}>
        {data.map((category) => (
          <div key={category.name}>
            <h3 className={styles.title_2}>{category.name}</h3>
            <Row gutter={[16, 16]} align={"stretch"}>
              {category.items.map((item) => (
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
        ))}
      </Space>
    </div>
  )
}
