import ntnu_logo from "@/assets/images/logo/ntnu_blue.png"
import ntust_logo from "@/assets/images/logo/ntust.png"
import pingcap_logo from "@/assets/images/logo/PingCAP.svg"
import risingwave_logo from "@/assets/images/logo/risingwave.png"
import wspc_logo from "@/assets/images/logo/wspc.jpg"
import {getLocale, getTranslations} from "next-intl/server"
import type {Locale} from "@/i18n/routing"
import React from "react"
import {experienceNoteFor} from "./experienceNotes"

export type ExperienceItem = {
  id: string
  icon: {src: string}
  name: string
  organization: string
  organization_url: string
  time_range: {start: string; end: string}
  location: string
  department: string
  department_url: string
  note: React.ReactNode
  tags: readonly string[]
}

export type ExperienceCategory = {
  category_key: "work" | "education"
  items: ExperienceItem[]
}

export async function getExperienceData(): Promise<ExperienceCategory[]> {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations("experience")

  const tagsRisingwave = [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "jQuery",
    "Next.js",
    "TailwindCSS",
    "Tailwind UI",
    "GitHub",
    "Git",
    "Github Actions",
    "WordPress",
    "PHP",
    "MySQL",
    "Linux",
    "Docker",
  ] as const

  const tagsPingcap = [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Webpack",
    "Next.js",
    "Storybook",
    "Ramda",
    "Lodash",
    "ahooks",
    "Gatsby.js",
    "GraphQL",
    "Strapi",
    "GitHub",
    "Git",
    "Github Actions",
    "Ant-Design",
    "Sass",
    "styled-component",
    "Rollup",
    "WordPress",
    "PHP",
    "MySQL",
    "Linux",
    "Docker",
  ] as const

  const tagsMaster = [
    "5G",
    "5GC",
    "core network",
    "network protocol",
    "telecommunication",
    "3GPP",
    "FSS(Frequency Selective Surface)",
    "Microwave-Switch",
    "RF-Switch",
    "electromagnetic wave",
    "electromagnetic",
    "electromagnetism",
    "microwave",
    "millimeter wave",
    "liquid crystal",
    "pin-diode",
    "varactor",
  ] as const

  const tagsBachelor = [
    "digital circuit",
    "MCU(Microcontroller Unit)",
    "FPGA(Field Programmable Gate Array)",
    "PCB(Printed Circuit Board) layout",
    "embedded system development",
    "ASM(assembly language)",
    "C",
    "C++",
    "RISC-V",
    "MIPS",
    "ARM",
    "STM32",
    "Cortex-M",
    "8051",
    "Intel",
    "X86",
    "x86-64",
    "IA-32",
    "OS(Operating System)",
    "soft core",
    "CPU",
    "SDRAM(synchronous dynamic random-access memory)",
    "memory controller",
    "computer",
    "computer system",
    "ISA(instruction set architecture)",
    "HDL(hardware description language)",
    "VerilogHDL",
    "SystemVerilogHDL",
  ] as const

  const tagsWspc = [
    "web frontend",
    "web backend",
    "Java",
    "JSP(Java Server Pages)",
    "Servlet",
    "Spring",
    "Spring framework",
    "Spring MVC",
    "Mybatis",
    "Hibernate",
    "Microsoft.NET",
    "ASP.NET",
    "WebForm",
    "ASP.NET MVC",
    "PHP",
    "Laravel",
    "Python",
    "Flask",
    "Golang",
    "Beego",
    "gin",
    "jQuery",
    "Vue.js",
    "React",
  ] as const

  return [
    {
      category_key: "work",
      items: [
        {
          id: "risingwave",
          icon: risingwave_logo,
          name: t("intern2Name"),
          organization: t("orgRisingWave"),
          organization_url: "https://risingwave.com/",
          time_range: {start: "2024/05", end: "2025/02"},
          location: t("locRemote"),
          department: t("deptWebFrontend"),
          department_url: "",
          note: experienceNoteFor(locale, "risingwave"),
          tags: [...tagsRisingwave],
        },
        {
          id: "pingcap",
          icon: pingcap_logo,
          name: t("intern1Name"),
          organization: t("orgPingCAP"),
          organization_url: "https://www.pingcap.com/",
          time_range: {start: "2020/10", end: "2024/04"},
          location: t("locBeijingHaidian"),
          department: t("deptWebFrontend"),
          department_url: "",
          note: experienceNoteFor(locale, "pingcap"),
          tags: [...tagsPingcap],
        },
      ],
    },
    {
      category_key: "education",
      items: [
        {
          id: "phd-ntnu",
          icon: ntnu_logo,
          name: t("degreePhd"),
          organization: t("orgNTNU"),
          organization_url: "https://www.ntnu.edu.tw/",
          time_range: {start: "2025/09", end: t("timeNow")},
          location: t("locTaipeiDaan"),
          department: t("deptACE"),
          department_url: "https://ace.ntnu.edu.tw/",
          note: experienceNoteFor(locale, "phd"),
          tags: [],
        },
        {
          id: "master-ntust",
          icon: ntust_logo,
          name: t("degreeMaster"),
          organization: t("orgNTUST"),
          organization_url: "https://www.ntust.edu.tw/",
          time_range: {start: "2021/09", end: "2025/08"},
          location: t("locTaipeiDaan"),
          department: t("deptECE"),
          department_url: "https://ece.ntust.edu.tw/",
          note: experienceNoteFor(locale, "master"),
          tags: [...tagsMaster],
        },
        {
          id: "bachelor-ntust",
          icon: ntust_logo,
          name: t("degreeBachelor"),
          organization: t("orgNTUST"),
          organization_url: "https://www.ntust.edu.tw/",
          time_range: {start: "2018/09", end: "2021/08"},
          location: t("locTaipeiDaan"),
          department: t("deptECE"),
          department_url: "https://ece.ntust.edu.tw/",
          note: experienceNoteFor(locale, "bachelor"),
          tags: [...tagsBachelor],
        },
        {
          id: "junior-wspc",
          icon: wspc_logo,
          name: t("degreeJuniorCollege"),
          organization: t("orgWSPC"),
          organization_url: "https://www.wspc.edu.cn/",
          time_range: {start: "2015/09", end: "2018/07"},
          location: t("locWuhanHanyang"),
          department: t("deptSoftwareEngineering"),
          department_url: "",
          note: experienceNoteFor(locale, "wspc"),
          tags: [...tagsWspc],
        },
      ],
    },
  ]
}
