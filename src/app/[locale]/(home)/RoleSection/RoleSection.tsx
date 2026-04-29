"use client"

import {OutsideLink} from "@/components/OutsideLink"
import React from "react"
import Image from "next/image"
import {useTranslations} from "next-intl"

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

const data: {
  nameKey: "current" | "former"
  items: {
    icon: React.ReactNode
    name: string
    role: string
    url?: string
    description?: React.ReactNode
  }[]
}[] = [
  {
    nameKey: "current",
    items: [
      {
        icon: <Image src={ntnu_gdsc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "谷歌學生開發者社群｜Google Developer Groups on Campus (National Taiwan Normal University)",
        role: "Lecture Speaker (Web Front-end, Python, Database & SQL)",
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-normal-university-taipei-taiwan/",
      },
      {
        icon: <Image src={Open_House_NTUs_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "打開台大｜Open House NTUs",
        role: "Volunteer (Activities Section)",
        url: "https://www.facebook.com/openhousentus/?locale=zh_TW",
      },
      {
        icon: <Image src={ntnu_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "社會教育學系｜Department of Adult and Continuing Education (National Taiwan Normal University)",
        role: "Ph.D. student",
        url: "https://www.ace.ntnu.edu.tw/",
      },
      {
        icon: <Image src={ntust_piano_club_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "鋼琴社｜Piano club (National Taiwan University of Science and Technology)",
        role: "Member",
        url: "https://www.instagram.com/ntust_piano/",
      },
    ],
  },
  {
    nameKey: "former",
    items: [
      {
        icon: <Image src={risingwave_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "RisingWave Labs",
        role: "Web Front-end Developer (Intern)",
        url: "https://risingwave.com/",
      },
      {
        icon: <Image src={pingcap_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "PingCAP",
        role: "Web Front-end Developer (Intern)",
        url: "https://pingcap.com/",
      },
      {
        icon: <Image src={ntu_gdsc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "谷歌學生開發者社群｜Google Developer Groups on Campus (National Taiwan University)",
        role: "Lecture Speaker (Efficiency Engineering & Devtools & DevOps)",
        url: "https://www.instagram.com/gdg.ntu/",
      },
      {
        icon: <Image src={ntust_gdsc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "谷歌學生開發者社群｜Google Developer Groups on Campus (National Taiwan University of Science and Technology)",
        role: "Lecture Speaker (Web Front-end)",
        url: "https://gdg.community.dev/gdg-on-campus-national-taiwan-university-of-science-and-technology-taipei-taiwan/",
      },
      {
        icon: <Image src={ntust_student_council_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "學生議會｜Student Council (National Taiwan University of Science and Technology)",
        role: "VP (Vice-President)",
        url: "https://www.facebook.com/ntustsc/",
      },
      {
        icon: <Image src={ntust_student_association_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "學生會｜Student Association (National Taiwan University of Science and Technology)",
        role: "CFO (Chief Finance Officer)",
        url: "https://www.facebook.com/ntustsa/",
      },
      {
        icon: <Image src={ntust_ece_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "電子工程系｜Department of Electrical and Computer Engineering (National Taiwan University of Science and Technology)",
        role: "Master's degree student",
        url: "https://ece.ntust.edu.tw/",
      },
      {
        icon: <Image src={ntust_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "電子工程系｜Department of Electrical and Computer Engineering (National Taiwan University of Science and Technology)",
        role: "Bachelor's degree student",
        url: "https://ece.ntust.edu.tw/",
      },
      {
        icon: <Image src={wspc_logo_image} alt={""} width={logo_size} height={logo_size} />,
        name: "软件技术专业｜Department of Software Engineering (Wuhan Institute of Shipbuilding Technology)",
        role: "College student",
        url: "https://www.wspc.edu.cn/",
      },
    ],
  },
]

export interface IPropsRoleSection {}

export const RoleSection: React.FunctionComponent<IPropsRoleSection> = () => {
  const t = useTranslations("sections")

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">{t("role")}</h2>
      <div className="space-y-6">
        {data.map((category) => (
          <div key={category.nameKey} className="space-y-4">
            <h3 className="text-lg font-medium text-slate-600">{t(category.nameKey)}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <div
                  key={item.name + item.role}
                  className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      {item.url ? (
                        <OutsideLink href={item.url} className="font-medium text-slate-900">
                          {item.name}
                        </OutsideLink>
                      ) : (
                        <div className="font-medium text-slate-900">{item.name}</div>
                      )}
                      <div className="mt-1 text-sm text-slate-600">{item.role}</div>
                    </div>
                  </div>
                  {item.description && (
                    <div className="text-sm text-slate-600">{item.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
