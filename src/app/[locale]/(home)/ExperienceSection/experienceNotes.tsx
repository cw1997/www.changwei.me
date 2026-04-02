import {OutsideLink} from "@/components/OutsideLink"
import {GithubOutlined, LinkOutlined, ZhihuCircleFilled} from "@ant-design/icons"
import React from "react"
import type {Locale} from "@/i18n/routing"

export function experienceNoteFor(
  locale: Locale,
  key:
    | "risingwave"
    | "pingcap"
    | "phd"
    | "master"
    | "bachelor"
    | "wspc",
): React.ReactNode {
  switch (key) {
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

function RisingWaveNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          开发与维护官方网站 <LinkOutlined /> <OutsideLink href="https://risingwave.com/" />
        </li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          開發與維護官方網站 <LinkOutlined /> <OutsideLink href="https://risingwave.com/" />
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Develop and maintain the official website <LinkOutlined />{" "}
        <OutsideLink href="https://risingwave.com/" />
      </li>
    </ul>
  )
}

function PingcapNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          开发与维护中文官网 <LinkOutlined /> <OutsideLink href="https://cn.pingcap.com/" /> 与{" "}
          <LinkOutlined /> <OutsideLink href="https://pingcap.cn/" />
        </li>
        <li>
          开发与维护 TiDB 开发者社区网站 <LinkOutlined /> <OutsideLink href="https://tidb.net/" />
          ，<br />
          其为源码可得项目，GitHub 仓库为 <GithubOutlined />{" "}
          <OutsideLink href="https://github.com/pingcap-inc/tidb.io" />
        </li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          開發與維護中文官網 <LinkOutlined /> <OutsideLink href="https://cn.pingcap.com/" /> 與{" "}
          <LinkOutlined /> <OutsideLink href="https://pingcap.cn/" />
        </li>
        <li>
          開發與維護 TiDB 開發者社群網站 <LinkOutlined /> <OutsideLink href="https://tidb.net/" />
          ，<br />
          其為原始碼可得專案，GitHub 儲存庫為 <GithubOutlined />{" "}
          <OutsideLink href="https://github.com/pingcap-inc/tidb.io" />
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Develop and maintain the Chinese official website <LinkOutlined />{" "}
        <OutsideLink href="https://cn.pingcap.com/" /> and <LinkOutlined />{" "}
        <OutsideLink href="https://pingcap.cn/" />
      </li>
      <li>
        Develop and maintain the TiDB developer community website{" "}
        <LinkOutlined /> <OutsideLink href="https://tidb.net/" /> ,<br />
        it is a source available project and its GitHub repository is{" "}
        <GithubOutlined />{" "}
        <OutsideLink href="https://github.com/pingcap-inc/tidb.io" />
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
          电子系统组。研究优化 5GC（第五代核心网）。阅读 3GPP 规范以寻找增强/优化 5G
          电信网络协议的方向。
        </li>
        <li>
          光电与半导体组。研究使用变容二极管（PIN 二极管）与液晶（LC）构建
          FSS（频率选择表面）与微波开关。
        </li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          系統組（乙組）。研究最佳化 5GC（第五代核心網）。閱讀 3GPP 規範以尋找增強/最佳化 5G
          電信網路協定的方向。
        </li>
        <li>
          光電與半導體組（丙組）。研究使用變容二極體（PIN 二極體）與液晶（LC）建構
          FSS（頻率選擇表面）與微波開關。
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Group of Electronic System. Research to optimize 5GC(5th-generation
        core network). Reading 3GPP specification to find the point of
        enhance/optimize the protocol of 5G telecommunication network.
      </li>
      <li>
        Group of Optoelectronic and Semiconductors. Research to build
        FSS(Frequency Selective Surface) and Microwave-Switch using Varactor
        Diode(Pin Diode) and LC(Liquid Crystal).
      </li>
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
  const z = ZHIHU_TITLES[locale]
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
            <OutsideLink href="https://github.com/cw1997/SDRAM-Controller" />
          </li>
          <li>
            <GithubOutlined /> <OutsideLink href="https://github.com/risc-v-cpu" />
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
    </ul>
  )
}

function WspcNote({locale}: {locale: Locale}) {
  if (locale === "zh-Hans") {
    return (
      <ul>
        <li>
          Web 后端开发，包括 Java 平台（JSP、Servlet、Spring 与 Spring MVC、Mybatis、Hibernate）、Microsoft.NET
          平台（ASP.NET WebForm 与 ASP.NET MVC）、PHP（Laravel）、Python（Flask）、Golang（Beego、gin）
        </li>
        <li>Web 前端开发，包括 jQuery、Vue.js、React</li>
      </ul>
    )
  }
  if (locale === "zh-Hant") {
    return (
      <ul>
        <li>
          Web 後端開發，包括 Java 平台（JSP、Servlet、Spring 與 Spring MVC、Mybatis、Hibernate）、Microsoft.NET
          平台（ASP.NET WebForm 與 ASP.NET MVC）、PHP（Laravel）、Python（Flask）、Golang（Beego、gin）
        </li>
        <li>Web 前端開發，包括 jQuery、Vue.js、React</li>
      </ul>
    )
  }
  return (
    <ul>
      <li>
        Web backend development, including Java platform (JSP(Java Server
        Pages), Servlet, Spring framework & Spring MVC & Mybatis & Hibernate),
        Microsoft.NET platform (ASP.NET WebForm & ASP.NET MVC), PHP (Laravel),
        Python (Flask), Golang (Beego, gin)
      </li>
      <li>Web frontend development, including jQuery, Vue.js, React</li>
    </ul>
  )
}
