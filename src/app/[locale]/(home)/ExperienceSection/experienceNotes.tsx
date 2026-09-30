import {OutsideLink} from "@/components/OutsideLink"
import {GithubOutlined, LinkOutlined, ZhihuCircleFilled} from "@ant-design/icons"
import React from "react"
import {defaultLocale, type Locale} from "@/i18n/routing"

export type ExperienceNoteKey =
  | "mininggoat"
  | "risingwave"
  | "pingcap"
  | "phd"
  | "master"
  | "bachelor"
  | "wspc"

export function experienceNoteFor(
  locale: Locale,
  key: ExperienceNoteKey,
): React.ReactNode {
  switch (key) {
    case "mininggoat":
      return <MininggoatNote locale={locale} />
    case "risingwave":
      return <RisingWaveNote locale={locale} />
    case "pingcap":
      return <PingcapNote locale={locale} />
    case "phd":
      return <PhdNote locale={locale} />
    case "master":
      return <MasterNote locale={locale} />
    case "bachelor":
      return <BachelorNote locale={locale} />
    case "wspc":
      return <WspcNote locale={locale} />
  }
}

function MininggoatNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          主要负责挖数羊智能数据交易平台 <LinkOutlined />{" "}
          <OutsideLink href="https://washuyang.com/" /> 的前端开发与系统运维工作，包括平台前端功能开发、页面优化、系统维护及相关技术支持等。
        </li>
        <li>
          使用 React、Next.js 等技术栈，结合 Cursor、Grok、OpenCode（DeepSeek）
          等 AI Coding 工具加速开发。
        </li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          主要負責挖數羊智慧資料交易平台 <LinkOutlined />{" "}
          <OutsideLink href="https://washuyang.com/" /> 的前端開發與系統維運工作，包括平臺前端功能開發、頁面最佳化、系統維護及相關技術支援等。
        </li>
        <li>
          使用 React、Next.js 等技術棧，結合 Cursor、Grok、OpenCode（DeepSeek）
          等 AI Coding 工具加速開發。
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Responsible for frontend development and system operations for the
        Mininggoat intelligent data trading platform (Washuyang) <LinkOutlined />{" "}
        <OutsideLink href="https://washuyang.com/" />, including frontend
        feature development, page optimization, system maintenance and
        technical support.
      </li>
      <li>
        Accelerated development with React and Next.js, together with AI coding
        tools such as Cursor, Grok and OpenCode (DeepSeek).
      </li>
    </ul>
  )
}

function RisingWaveNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          开发与维护官方网站 <LinkOutlined />{" "}
          <OutsideLink href="https://risingwave.com/" /> ：维护旧版官网，对原有
          WordPress 主题做二次开发，并新开发 WordPress 插件与模板。
        </li>
        <li>
          开发新版官网，将站点从旧版 WordPress 迁移至 React.js 与 Next.js
          技术栈。
        </li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          開發與維護官方網站 <LinkOutlined />{" "}
          <OutsideLink href="https://risingwave.com/" /> ：維護舊版官網，對原有
          WordPress 主題做二次開發，並新開發 WordPress 外掛與範本。
        </li>
        <li>
          開發新版官網，將網站從舊版 WordPress 遷移至 React.js 與 Next.js
          技術棧。
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Develop and maintain the official website <LinkOutlined />{" "}
        <OutsideLink href="https://risingwave.com/" /> — maintained the legacy
        WordPress site by extending its existing theme, and built new
        WordPress plugins and templates.
      </li>
      <li>
        Rebuilt the website on React.js and Next.js, migrating it away from the
        legacy WordPress stack.
      </li>
    </ul>
  )
}

function PingcapNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          从零开发 TiDB 中文社区官网 <LinkOutlined />{" "}
          <OutsideLink href="https://tidb.net/" />，使用 React.js 与 Next.js
          技术栈。 其为源码可得项目，GitHub 仓库为 <GithubOutlined />{" "}
          <OutsideLink href="https://github.com/pingcap-inc/tidb.io" />
        </li>
        <li>
          开发 PingCAP 新版中文官网 <LinkOutlined />{" "}
          <OutsideLink href="https://cn.pingcap.com/" /> ，从旧版 Hugo
          框架迁移至 React.js 与 Gatsby.js 技术栈。
        </li>
        <li>
          从零开始使用 Next.js 构建平凯星辰公司官网 <LinkOutlined />{" "}
          <OutsideLink href="https://pingcap.cn/" /> 。
        </li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          從零開發 TiDB 中文社群官網 <LinkOutlined />{" "}
          <OutsideLink href="https://tidb.net/" />，使用 React.js 與 Next.js
          技術棧。 其為原始碼可得專案，GitHub 儲存庫為 <GithubOutlined />{" "}
          <OutsideLink href="https://github.com/pingcap-inc/tidb.io" />
        </li>
        <li>
          開發 PingCAP 新版中文官網 <LinkOutlined />{" "}
          <OutsideLink href="https://cn.pingcap.com/" /> ，從舊版 Hugo
          框架遷移至 React.js 與 Gatsby.js 技術棧。
        </li>
        <li>
          從零開始使用 Next.js 建構平凱星辰公司官網 <LinkOutlined />{" "}
          <OutsideLink href="https://pingcap.cn/" /> 。
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Built the TiDB Chinese community website <LinkOutlined />{" "}
        <OutsideLink href="https://tidb.net/" /> from scratch with React.js and
        Next.js. It is a source-available project — GitHub repository:{" "}
        <GithubOutlined />{" "}
        <OutsideLink href="https://github.com/pingcap-inc/tidb.io" />
      </li>
      <li>
        Built PingCAP's new Chinese official website <LinkOutlined />{" "}
        <OutsideLink href="https://cn.pingcap.com/" /> , migrating it from the
        legacy Hugo framework to React.js and Gatsby.js.
      </li>
      <li>
        Built PingCAP's corporate website <LinkOutlined />{" "}
        <OutsideLink href="https://pingcap.cn/" /> from scratch with Next.js.
      </li>
    </ul>
  )
}

function PhdNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>研究助理，关注教育与 AI 融合相关主题。（技术栈：Dify + Next.js）。</li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>研究助理，關注教育與 AI 融合相關主題。（技術棧：Dify + Next.js）。</li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Research Assistant, focusing on topics related to the integration of
        Education and AI. (Technology stack: Dify + Next.js).
      </li>
    </ul>
  )
}

function MasterNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          光电及半导体组。研究使用变容二极管（PIN 二极管）与液晶（LC）构建
          FSS（频率选择表面）与微波开关。
        </li>
        <li>
          研究基于 PCB 电路板、半导体元件与各种新型材料，设计毫米波空间滤波器／天线。
        </li>
        <li>
          电子系统组。研究优化 5GC（第五代核心网）。阅读 3GPP 规范以寻找增强／优化 5G
          电信网络协议的方向。
        </li>
        <li>获校级奖学金。</li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          光電與半導體組。研究使用變容二極體（PIN 二極體）與液晶（LC）建構
          FSS（頻率選擇表面）與微波開關。
        </li>
        <li>
          研究以 PCB 電路板、半導體元件與各種新型材料，設計毫米波空間濾波器／天線。
        </li>
        <li>
          系統組。研究最佳化 5GC（第五代核心網）。閱讀 3GPP 規範以尋找增強／最佳化 5G
          電信網路協定的方向。
        </li>
        <li>獲校級獎學金。</li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Group of Optoelectronics and Semiconductors. Research to build
        FSS(Frequency Selective Surface) and Microwave-Switch using Varactor
        Diode(Pin Diode) and LC(Liquid Crystal).
      </li>
      <li>
        Research on designing millimeter-wave spatial filters and antennas based
        on PCB circuits, semiconductor devices and novel materials.
      </li>
      <li>
        Group of Electronic System. Research to optimize 5GC(5th-generation
        core network). Reading 3GPP specification to find the point of
        enhance/optimize the protocol of 5G telecommunication network.
      </li>
      <li>Awarded a university-level scholarship.</li>
    </ul>
  )
}

const ZHIHU_TITLES: Record<Locale, [string, string, string, string, string]> = {
  "en-US": [
    "Writing an OS from scratch (1) — Basic concepts",
    "Writing an OS from scratch (2) — startup & bootloader",
    "Writing an OS from scratch (3) — Task switcher",
    "Writing an OS from scratch (4) — When to switch tasks",
    "Writing an OS from scratch (5) — Putting programs to sleep",
  ],
  "zh-Hans": [
    "从零开始写一个操作系统（一） —— 基本概念",
    "从零开始写一个操作系统（二） —— startup 与 bootloader",
    "从零开始写一个操作系统（三） —— 任务切换器",
    "从零开始写一个操作系统（四） —— 任务切换的时机",
    "从零开始写一个操作系统（五） —— 让程序睡一会儿",
  ],
  "zh-Hant": [
    "從零開始寫一個作業系統（一） —— 基本概念",
    "從零開始寫一個作業系統（二） —— startup 與 bootloader",
    "從零開始寫一個作業系統（三） —— 工作切換器",
    "從零開始寫一個作業系統（四） —— 工作切換的時機",
    "從零開始寫一個作業系統（五） —— 讓程式睡一會兒",
  ],
}

function BachelorNote({locale}: {locale: Locale}) {
  const z = ZHIHU_TITLES[locale] ?? ZHIHU_TITLES[defaultLocale]
  const osIntro =
    locale === "zh-Hans"
      ? "使用 C 与 ARM Cortex-M3 汇编语言编写的实时操作系统，"
      : locale === "zh-Hant"
        ? "使用 C 與 ARM Cortex-M3 組合語言撰寫的即時作業系統，"
        : "A real-time OS written by C and ARM Cortex-M3 assembly language, "

  const isa =
    locale === "zh-Hans"
      ? "查阅 ISA（指令集架构）规范（RISC-V、Intel IA-32/x86-64），确认各指令行为细节后以 VerilogHDL/SystemVerilogHDL 实现并部署于 FPGA。"
      : locale === "zh-Hant"
        ? "查閱 ISA（指令集架構）規範（RISC-V、Intel IA-32/x86-64），確認各指令行為細節後以 VerilogHDL/SystemVerilogHDL 實作並部署於 FPGA。"
        : "Retrieve ISA(instruction set architecture) specifications (RISC-V, Intel IA-32/x86-64), confirm each instructions operation's detail then implement it by VerilogHDL/SystemVerilogHDL and build it on FPGA."

  const net =
    locale === "zh-Hans"
      ? "查阅网络协议规范（RFC、IEEE 等），并以编程语言实现。"
      : locale === "zh-Hant"
        ? "查閱網路協定規範（RFC、IEEE 等），並以程式語言實作。"
        : "Retrieve the network protocol specifications (RFC, IEEE, etc.), implement it by programming language."

  const dig =
    locale === "zh-Hans"
      ? "数字电路、MCU（微控制器）、FPGA（现场可编程门阵列）、PCB 布线，使用汇编与 C/C++ 的嵌入式系统开发。"
      : locale === "zh-Hant"
        ? "數位電路、MCU（微控制器）、FPGA（現場可程式化邏輯閘陣列）、PCB 佈線，使用組合語言與 C/C++ 的嵌入式系統開發。"
        : "Digital Circuit, MCU(Microcontroller Unit), FPGA(Field Programmable Gate Array), PCB(Printed Circuit Board) layout, embedded system development using ASM(assembly language) and C/C++."

  const capstone =
    locale === "zh-Hans"
      ? "毕业设计：使用 VerilogHDL 在 FPGA 上构建 RISC-V 指令集架构的 CPU。"
      : locale === "zh-Hant"
        ? "畢業專題：使用 VerilogHDL 於 FPGA 上建構 RISC-V 指令集架構的 CPU。"
        : "Capstone project: built a RISC-V instruction set architecture CPU on an FPGA using Verilog HDL."

  const award =
    locale === "zh-Hans"
      ? "获书卷奖（班级排名第一）。"
      : locale === "zh-Hant"
        ? "獲書卷獎（班級排名第一）。"
        : "Awarded the Academic Excellence Award (ranked first in the class)."

  const urls = [
    "https://zhuanlan.zhihu.com/p/350587132",
    "https://zhuanlan.zhihu.com/p/350627431",
    "https://zhuanlan.zhihu.com/p/350625869",
    "https://zhuanlan.zhihu.com/p/351781211",
    "https://zhuanlan.zhihu.com/p/361465834",
  ]

  return (
    <ul>
      <li>
        {capstone}
      </li>
      <li>
        {dig}
        <ul>
          <li>
            {osIntro}
            <GithubOutlined /> <OutsideLink href="https://github.com/cw1997/ez-rtos" />
          </li>
          {urls.map((href, i) => (
            <li key={href}>
              <ZhihuCircleFilled />{" "}
              <OutsideLink href={href}>{z[i]}</OutsideLink>
            </li>
          ))}
        </ul>
      </li>
      <li>
        {isa}
        <ul>
          <li>
            <GithubOutlined />{" "}
            <OutsideLink href="https://github.com/risc-v-cpu" />
          </li>
          <li>
            <GithubOutlined />{" "}
            <OutsideLink href="https://github.com/cw1997/SDRAM-Controller" />
          </li>
          <li>
            <GithubOutlined /> <OutsideLink href="https://github.com/openx86" />
          </li>
        </ul>
      </li>
      <li>
        {net}
        <ul>
          <li>
            <GithubOutlined /> <OutsideLink href="https://github.com/cw1997/inetutils" />
          </li>
          <li>
            <GithubOutlined />{" "}
            <OutsideLink href="https://github.com/cw1997/ez-mysql/tree/develop" />
          </li>
        </ul>
      </li>
      <li>{award}</li>
    </ul>
  )
}

function WspcNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          主要学习 Java／PHP 等 Web 前后端开发相关技术。Web
          后端包括 Java 平台（JSP、Servlet、Spring 与 Spring MVC、Mybatis、Hibernate）、Microsoft.NET
          平台（ASP.NET WebForm 与 ASP.NET MVC）、PHP（Laravel）、Python（Flask）、Golang（Beego、gin）
        </li>
        <li>Web 前端开发，包括 jQuery、Vue.js、React</li>
        <li>担任班级学习委员，负责班级助教工作。获校级奖学金。</li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          主要學習 Java／PHP 等 Web 前後端開發相關技術。Web
          後端包括 Java 平臺（JSP、Servlet、Spring 與 Spring MVC、Mybatis、Hibernate）、Microsoft.NET
          平臺（ASP.NET WebForm 與 ASP.NET MVC）、PHP（Laravel）、Python（Flask）、Golang（Beego、gin）
        </li>
        <li>Web 前端開發，包括 jQuery、Vue.js、React</li>
        <li>擔任班級學習委員，負責班級助教工作。獲校級獎學金。</li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Focused on Java/PHP and other web frontend and backend development
        technologies. Backend work included the Java platform (JSP(Java Server
        Pages), Servlet, Spring framework & Spring MVC & Mybatis & Hibernate),
        Microsoft.NET platform (ASP.NET WebForm & ASP.NET MVC), PHP (Laravel),
        Python (Flask), Golang (Beego, gin)
      </li>
      <li>Web frontend development, including jQuery, Vue.js, React</li>
      <li>
        Served as the class study committee member and assisted with class
        teaching activities. Awarded a university-level scholarship.
      </li>
    </ul>
  )
}
