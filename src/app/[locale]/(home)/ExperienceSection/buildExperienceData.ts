import ntnu_logo from "@/assets/images/logo/ntnu_blue.png"
import ntust_logo from "@/assets/images/logo/ntust.png"
import pingcap_logo from "@/assets/images/logo/PingCAP.svg"
import risingwave_logo from "@/assets/images/logo/risingwave.png"
import wspc_logo from "@/assets/images/logo/wspc.jpg"
// Stored as Mininggoat.jfif; `.jfif` is not a Next.js recognised image extension
// (see next/image-types/global.d.ts), so a static import of it resolves to a bare
// URL string instead of StaticImageData and yields no width/height. The identical
// JPEG is therefore committed as .jpg.
import mininggoat_logo from "@/assets/images/logo/Mininggoat.jpg"
import type {Locale} from "@/i18n/routing"
import React from "react"
import {experienceNoteFor} from "./experienceNotes"

export type ExperienceItem = {
  id: string
  /** Optional logo. When absent a monogram badge is derived from the organization. */
  icon?: {src: string}
  name: string
  organization: string
  /** Registered legal entity of the organization, shown as supplementary detail. */
  legal_entity?: string
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

export function getExperienceData(
  locale: Locale,
  t: (key: string) => string,
): ExperienceCategory[] {
  const tagsMininggoat = [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Sass",
    "TailwindCSS",
    "GitHub",
    "Git",
    "Github Actions",
    "Cursor",
    "Grok",
    "OpenCode",
    "DeepSeek",
    "Linux",
    "Docker",
    "System Operations",
  ] as const

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
          id: "mininggoat",
          icon: mininggoat_logo,
          name: t("roleFrontendSysOps"),
          organization: t("orgMininggoat"),
          legal_entity: t("legalEntityMininggoat"),
          organization_url: "https://washuyang.com/",
          time_range: {start: "2026/01", end: "2026/09"},
          location: t("locRemote"),
          department: t("deptWebFrontendSysOps"),
          department_url: "",
          note: experienceNoteFor(locale, "mininggoat"),
          tags: [...tagsMininggoat],
        },
        {
          id: "risingwave",
          icon: risingwave_logo,
          name: t("roleFrontend"),
          organization: t("orgRisingWave"),
          legal_entity: t("legalEntityRisingWave"),
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
          name: t("roleFrontend"),
          organization: t("orgPingCAP"),
          legal_entity: t("legalEntityPingCAP"),
          organization_url: "https://www.pingcap.com/",
          time_range: {start: "2020/10", end: "2024/04"},
          location: t("locBeijingShenzhenRemote"),
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
          time_range: {start: "2015/09", end: "2018/08"},
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
