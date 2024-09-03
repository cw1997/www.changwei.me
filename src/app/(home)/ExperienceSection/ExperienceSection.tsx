import ntust_logo from "@/assets/images/logo/ntust.png"
import pingcap_logo from "@/assets/images/logo/PingCAP.svg"
import risingwave_logo from "@/assets/images/logo/risingwave.png"
import wspc_logo from "@/assets/images/logo/wspc.jpg"
import {OutsideLink} from "@/components/OutsideLink"
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkOutlined,
  TagsOutlined,
  ZhihuCircleFilled,
} from "@ant-design/icons"
import {Divider, Space, Tag} from "antd"
import React from "react"

import styles from "./ExperienceSection.module.sass"

const data = [
  {
    category_name: "Work",
    items: [
      {
        icon: risingwave_logo,
        name: "Intern (2nd)",
        organization: "RisingWave Labs",
        organization_url: "https://risingwave.com/",
        time_range: {
          start: "2024-05",
          end: "now",
        },
        location: "Remote",
        position: "Frontend",
        note: (
          <>
            <ul>
              <li>
                Develop and maintain the official website <LinkOutlined />{" "}
                <OutsideLink href={"https://risingwave.com/"} />
              </li>
            </ul>
          </>
        ),
        tags: [
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
        ],
      },
      {
        icon: pingcap_logo,
        name: "Intern (1st)",
        organization: "PingCAP",
        organization_url: "https://www.pingcap.com/",
        time_range: {
          start: "2020-10",
          end: "2024-05",
        },
        location: "Chinese mainland (+86), Beijing City, Haidian District",
        position: "Frontend",
        note: (
          <>
            <ul>
              <li>
                Develop and maintain the Chinese official website{" "}
                <LinkOutlined />{" "}
                <OutsideLink href={"https://cn.pingcap.com/"} /> and{" "}
                <LinkOutlined /> <OutsideLink href={"https://pingcap.cn/"} />
              </li>
              <li>
                Develop and maintain the TiDB developer community website{" "}
                <LinkOutlined /> <OutsideLink href={"https://tidb.net/"} /> ,{" "}
                <br />
                it is a source available project and its GitHub repository is{" "}
                <GithubOutlined />{" "}
                <OutsideLink href={"https://github.com/pingcap-inc/tidb.io"} />
              </li>
            </ul>
          </>
        ),
        tags: [
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
        ],
      },
    ],
  },
  {
    category_name: "Education",
    items: [
      {
        icon: ntust_logo,
        name: "Master degree",
        organization: "National Taiwan University of Science and Technology",
        organization_url: "https://www.ntust.edu.tw/",
        time_range: {
          start: "2021-09",
          end: "now",
        },
        location: "Taiwan (+886), Taipei City (106), Da'an District",
        position: "ECE (Electrical and Computer Engineering)",
        note: (
          <>
            <ul>
              <li>
                Group of Electronic System. Research to optimize
                5GC(5th-generation core network). Reading 3GPP specification to
                find the point of enhance/optimize the protocol of 5G
                telecommunication network.
              </li>
              <li>
                Group of Optoelectronic and Semiconductors. Research to build
                FSS(Frequency Selective Surface) and Microwave-Switch using
                Varactor Diode(Pin Diode) and LC(Liquid Crystal).
              </li>
            </ul>
          </>
        ),
        tags: [
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
        ],
      },
      {
        icon: ntust_logo,
        name: "Bachelor degree",
        organization: "National Taiwan University of Science and Technology",
        organization_url: "https://www.ntust.edu.tw/",
        time_range: {
          start: "2018-09",
          end: "2021-08",
        },
        location: "Taiwan (+886), Taipei City (106), Da'an District",
        position: "ECE (Electrical and Computer Engineering)",
        note: (
          <>
            <ul>
              <li>
                Digital Circuit, MCU(Microcontroller Unit), FPGA(Field
                Programmable Gate Array), PCB(Printed Circuit Board) layout,
                embedded system development using ASM(assembly language) and
                C/C++.
                <ul>
                  <li>
                    A real-time OS(Operating System) written by C and ARM
                    Cortex-M3 assembly language, <GithubOutlined />{" "}
                    <OutsideLink href={"https://github.com/cw1997/ez-rtos"} />
                  </li>
                  <li>
                    <ZhihuCircleFilled />{" "}
                    <OutsideLink
                      href={"https://zhuanlan.zhihu.com/p/350587132"}
                    >
                      从零开始写一个操作系统（一） —— 基本概念
                    </OutsideLink>
                  </li>
                  <li>
                    <ZhihuCircleFilled />{" "}
                    <OutsideLink
                      href={"https://zhuanlan.zhihu.com/p/350627431"}
                    >
                      从零开始写一个操作系统（二） —— startup 与 bootloader
                    </OutsideLink>
                  </li>
                  <li>
                    <ZhihuCircleFilled />{" "}
                    <OutsideLink
                      href={"https://zhuanlan.zhihu.com/p/350625869"}
                    >
                      从零开始写一个操作系统（三） —— 任务切换器
                    </OutsideLink>
                  </li>
                  <li>
                    <ZhihuCircleFilled />{" "}
                    <OutsideLink
                      href={"https://zhuanlan.zhihu.com/p/351781211"}
                    >
                      从零开始写一个操作系统（四） —— 任务切换的时机
                    </OutsideLink>
                  </li>
                  <li>
                    <ZhihuCircleFilled />{" "}
                    <OutsideLink
                      href={"https://zhuanlan.zhihu.com/p/361465834"}
                    >
                      从零开始写一个操作系统（五） —— 让程序睡一会儿
                    </OutsideLink>
                  </li>
                </ul>
              </li>
              <li>
                {
                  "Retrieve ISA(instruction set architecture) specifications (RISC-V, Intel IA-32/x86-64), confirm each instructions operation's detail then implement it by VerilogHDL/SystemVerilogHDL and build it on FPGA."
                }
                <ul>
                  <li>
                    <GithubOutlined />{" "}
                    <OutsideLink
                      href={"https://github.com/cw1997/SDRAM-Controller"}
                    />
                  </li>
                  <li>
                    <GithubOutlined />{" "}
                    <OutsideLink href={"https://github.com/risc-v-cpu"} />
                  </li>
                  <li>
                    <GithubOutlined />{" "}
                    <OutsideLink href={"https://github.com/openx86"} />
                  </li>
                </ul>
              </li>
              <li>
                Retrieve the network protocol specifications (RFC, IEEE, etc.),
                implement it by programming language.
                <ul>
                  <li>
                    <GithubOutlined />{" "}
                    <OutsideLink href={"https://github.com/cw1997/inetutils"} />
                  </li>
                  <li>
                    <GithubOutlined />{" "}
                    <OutsideLink
                      href={"https://github.com/cw1997/ez-mysql/tree/develop"}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </>
        ),
        tags: [
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
        ],
      },
      {
        icon: wspc_logo,
        name: "Junior college",
        organization: "Wuhan Institute of Shipbuilding Technology",
        organization_url: "https://www.wspc.edu.cn/",
        time_range: {
          start: "2015-09",
          end: "2018-07",
        },
        location:
          "Chinese mainland (+86), Hubei Province, Wuhan City (430000), Hanyang District",
        position: "Software Engineering",
        note: (
          <>
            <ul>
              <li>
                Web backend development, including Java platform (JSP(Java
                Server Pages), Servlet, Spring framework & Spring MVC & Mybatis
                & Hibernate), Microsoft.NET platform (ASP.NET WebForm & ASP.NET
                MVC), PHP (Laravel), Python (Flask), Golang (Beego, gin)
              </li>
              <li>Web frontend development, including jQuery, Vue.js, React</li>
            </ul>
          </>
        ),
        tags: [
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
        ],
      },
    ],
  },
] as const

export interface IPropsExperienceSection {}

export const ExperienceSection: React.FunctionComponent<
  IPropsExperienceSection
> = (props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Experience</h2>
      <Space direction={"vertical"} size={32}>
        {data.map((category) => (
          <div key={category.category_name} className={styles.category}>
            <div className={styles.category_name}>
              {category.category_name}:{" "}
            </div>
            <Space
              className={styles.list}
              direction={"vertical"}
              size={32}
              wrap
            >
              {category.items.map((item) => (
                <div key={item.name} className={styles.item}>
                  <div className={styles.item_icon}>
                    <img
                      style={{width: 64, height: "auto"}}
                      src={item.icon.src}
                      alt={item.name}
                    />
                  </div>
                  <div className={styles.item_info}>
                    {/*<div className={styles.item_info_name}>{item.name}</div>*/}
                    <div className={styles.item_info_organization}>
                      {item.organization}
                    </div>
                    <div className={styles.item_info_name}>
                      <Space
                        split={<Divider type={"vertical"} />}
                        size={[0, 4]}
                        wrap
                      >
                        <div>{item.name}</div>
                        <div>{item.position}</div>
                      </Space>
                    </div>
                    <div className={styles.item_info_organization_url}>
                      <LinkOutlined />{" "}
                      <OutsideLink href={item.organization_url} />
                    </div>
                    <div className={styles.item_info_meta}>
                      <Space
                        split={<Divider type={"vertical"} />}
                        size={[0, 4]}
                        wrap
                      >
                        <div>
                          <ClockCircleOutlined /> {item.time_range.start} ~{" "}
                          {item.time_range.end}
                        </div>
                        <div>
                          <EnvironmentOutlined /> {item.location}
                        </div>
                      </Space>
                    </div>
                    {/*<div className={styles.item_info_location}>{item.location}</div>*/}
                    {item.note && (
                      <div className={styles.item_info_note}>{item.note}</div>
                    )}
                    {(item.tags?.length ?? 0) > 0 && (
                      <Space className={styles.item_info_tags} wrap>
                        <TagsOutlined />{" "}
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Space>
                    )}
                  </div>
                </div>
              ))}
            </Space>
          </div>
        ))}
      </Space>
    </div>
  )
}
