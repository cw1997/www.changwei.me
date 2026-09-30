"use client"

import {OutsideLink} from "@/components/OutsideLink"
import {Col, Row, Space} from "antd"
import React from "react"
import Image from "next/image"
import {useTranslations} from "next-intl"

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

type RoleNameKey = "current" | "former"
type TranslatedRole = {name: string; role: string}

/**
 * Icons and links are locale-independent, so they live in code. The human-readable
 * `name` / `role` strings come from the `roleDetail` message namespace so they are
 * translated; the two lists are matched positionally, and a length mismatch
 * degrades gracefully instead of rendering "undefined".
 */
const data: {
  nameKey: RoleNameKey
  items: {icon: React.ReactNode; url?: string}[]
}[] = [
  {
    nameKey: "current",
    items: [
      {
        icon: <Image src={ntnu_gdsc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-normal-university-taipei-taiwan/",
      },
      {
        icon: <Image src={Open_House_NTUs_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.facebook.com/openhousentus/?locale=zh_TW",
      },
      {
        icon: <Image src={ntnu_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.ace.ntnu.edu.tw/",
      },
      {
        icon: <Image src={ntust_piano_club_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.instagram.com/ntust_piano/",
      },
    ],
  },
  {
    nameKey: "former",
    items: [
      {
        icon: <Image src={risingwave_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://risingwave.com/",
      },
      {
        icon: <Image src={pingcap_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://pingcap.com/",
      },
      {
        icon: <Image src={ntu_gdsc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.instagram.com/gdg.ntu/",
      },
      {
        icon: <Image src={ntust_gdsc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-of-science-and-technology-taipei-taiwan/",
      },
      {
        icon: <Image src={ntust_student_council_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.facebook.com/ntustsc/",
      },
      {
        icon: <Image src={ntust_student_association_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.facebook.com/ntustsa/",
      },
      {
        icon: <Image src={ntust_ece_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://ece.ntust.edu.tw/",
      },
      {
        icon: <Image src={ntust_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://ece.ntust.edu.tw/",
      },
      {
        icon: <Image src={wspc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        url: "https://www.wspc.edu.cn/",
      },
    ],
  },
]

function readTranslatedRoles(
  raw: unknown,
  expectedCount: number,
  nameKey: RoleNameKey,
): TranslatedRole[] {
  const rows = Array.isArray(raw) ? (raw as TranslatedRole[]) : []

  if (rows.length !== expectedCount && process.env.NODE_ENV !== "production") {
    console.warn(
      `[RoleSection] message key "roleDetail.${nameKey}" has ${rows.length} entries but the component defines ${expectedCount}.`,
    )
  }

  return Array.from({length: Math.max(rows.length, expectedCount)}, (_, index) => {
    const row = rows[index]
    return {
      name: row?.name ?? "",
      role: row?.role ?? "",
    }
  })
}

export interface IPropsRoleSection {}

export const RoleSection: React.FunctionComponent<IPropsRoleSection> = () => {
  const t = useTranslations("sections")
  const tDetail = useTranslations("roleDetail")

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("role")}</h2>
      <Space orientation={"vertical"} size={24}>
        {data.map((category) => {
          const translated = readTranslatedRoles(
            tDetail.raw(category.nameKey),
            category.items.length,
            category.nameKey,
          )

          return (
            <section key={category.nameKey}>
              <h3 className={styles.category_name}>{t(category.nameKey)}</h3>
              <Row gutter={[16, 16]} align={"stretch"}>
                {category.items.map((item, index) => {
                  const entry = translated[index]
                  return (
                    <Col key={`${category.nameKey}-${index}`} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                      <div className={styles.item}>
                        <Space align={"start"}>
                          <div className={styles.item_icon}>{item.icon}</div>
                          <div className={styles.item_info}>
                            {item.url ? (
                              <OutsideLink href={item.url} className={styles.item_info_name}>
                                {entry.name}
                              </OutsideLink>
                            ) : (
                              <div className={styles.item_info_name}>{entry.name}</div>
                            )}
                            <div className={styles.item_info_role}>{entry.role}</div>
                          </div>
                        </Space>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </section>
          )
        })}
      </Space>
    </div>
  )
}