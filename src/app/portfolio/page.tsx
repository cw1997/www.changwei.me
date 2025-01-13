import React from "react"
import {
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
  TagsOutlined,
} from "@ant-design/icons"
import {Divider, Space, Tag} from "antd"

import {OutsideLink} from "@/components/OutsideLink"

import styles from "./page.module.sass"
import ntust_lib_icon from "./ntust_lib_icon.png"
import rtos_icon from "./rtos_icon.png"
import sdram_controller_icon from "./dram.jpg"
import inetutils_icon from "./inetutils_icon.png"
import ez_react_icon from "@/assets/images/logo/frontend/React-icon.svg"

const data = {
  items: [
    {
      icon: ntust_lib_icon,
      name: "NTUST LIB",
      type: "Mobile App",
      url: "https://library.ntust.edu.tw/p/405-1049-110462,c11171.php?Lang=zh-tw",
      source_code_url: undefined,
      create_datetime: "2022-07",
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>
              『台灣科技大學圖書館APP』(NTUST LIB)
              為讀者在行動裝置上提供圖書館服務，其支援iOS、Android作業系統，包括個人借閱情況查詢、館藏資料查詢、圖書館最新消息、活動行事曆、館內導覽、樓層空間分佈情況查詢、經典與暢銷書籍推薦、圖書推薦QRcode感應入館、登記座位、櫃台借書與智慧空間與討論小間借用等多項功能服務，可免費下載至智慧型手機或平板裝置上，歡迎多加利用!!
            </li>
            <li>
              APP 前端基於 React Native with Expo SDK 開發，使用 TypeScript
              程式語言。支援跨平台使用『iOS、Android 作業系統』
            </li>
            <li>
              APP 後端基於 Nest.js 開發，使用 TypeScript 程式語言。使用 MySQL
              作為 Database。
            </li>
          </ul>
        </>
      ),
      tags: [
        "React",
        "React Native",
        "Expo",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "GitHub",
        "Git",
        "Github Actions",
        "Linux",
        "Docker",
        "Nest.js",
        "MySQL",
      ],
    },
    {
      icon: ez_react_icon,
      name: "ez-react",
      type: "Frontend",
      url: "https://ez-react.changwei.me/",
      source_code_url: "https://github.com/cw1997/ez-react",
      create_datetime: "2021-04",
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>
              React 是一个可以根据页面状态变化而自动重新渲染 UI 的 JavaScript
              视图框架。该框架(ez-react)使用 TypeScript
              编写，实现了一个功能上非常接近官方版 React 框架。
            </li>
            <li>
              ez-react 框架总共包括以下两个 npm package
              <ul>
                <li>
                  @cw1997/ez-react 实现了 react 的主要核心功能
                  <ul>
                    <li>实现了 react 的功能</li>
                    <li>
                      createElement 函数返回 VirtualDOM 对象。JSX 语法在经过
                      babel 等 transplier
                      转换后会产生存储视图描述结构的对象(类似于DOM结构，该对象成员包括
                      element 名称，属性，children 等)，而该 package
                      主要维护视图节点对象的类型声明
                    </li>
                    <li>
                      ClassComponent 类组件和 FunctionComponent
                      函数组件的类型声明
                    </li>
                  </ul>
                </li>
                <li>
                  @cw1997/ez-react-dom 实现了 react-dom/client 的主要核心功能
                  <ul>
                    <li>
                      react-dom/client 主要用于在 Web Browser 端渲染 react
                      输出的视图节点对象，并且在组件属性变更或者事件(event)触发以及副作用(effect)导致状态(state)变化时自动执行组件的
                      render
                      函数，重新渲染受影响的视图，实现单向数据流变更导致子视图变更，确保数据和视图之间的一致性。数据变更的业务逻辑代码和视图渲染的描述代码分离有助于前端开发工程师编写更加高内聚低耦合与可维护性更强的代码，这也是目前绝大多数前端框架的开发理念。
                    </li>
                    <li>实现了 ClassComponent 类组件的生命周期</li>
                    <li>
                      实现了 ClassComponent 类组件的 ref 功能，允许类成员持有
                      DOM 节点的对象引用
                    </li>
                    <li>
                      实现了朴素 diff 算法，能够在执行 setState
                      函数之后自动比对原有真实 DOM 和 即将更新的 VirtualDOM
                      之间的差异，并且更新差异部分。支持使用 key
                      属性加速包含列表数组的更新，如果新旧 DOM 存在相同
                      key，则会保留而不会重新创建，确保性能最优。
                    </li>
                    <li>
                      <strong>[Experimental] 额外</strong>实现了 ClassComponent
                      类组件的事件处理函数自动绑定 this 指针功能(Bind `this` of
                      the instance of the class component to the event handler
                      functions automatically which are belong to the component
                      )，其将自动绑定类组件的事件处理函数内部的 this
                      指针到类组件的实例
                    </li>
                  </ul>
                </li>
                <li>
                  @cw1997/ez-react-demo 主要用于演示 ez-react 的基本功能
                  <ul>
                    <li>
                      <OutsideLink href={"https://ez-react.changwei.me/"} />{" "}
                      搭建在 GitHub Pages
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </>
      ),
      tags: [
        "React",
        "React.js",
        "React DOM",
        "react",
        "react-dom",
        "react-dom/client",
        "ez-react",
        "ez-react-dom",
        "ez-react-demo",
        "JavaScript",
        "TypeScript",
        "JavaScript Framework",
        "View layer",
      ],
    },
    {
      icon: sdram_controller_icon,
      name: "SDRAM Controller",
      type: "IP Core, written by SystemVerilogHDL",
      url: undefined,
      source_code_url: "https://github.com/cw1997/SDRAM-Controller",
      create_datetime: "2021-04",
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>
              使用 SystemVerilogHDL 编写的 SDRAM(Synchronous dynamic
              random-access memory) 内存控制器
            </li>
            <li>
              内存控制器通常集成于计算机的北桥芯片或者CPU中(after AMD Athlon X2,
              after Intel
              Nehalem)，用于按照特定的控制时序去控制内存颗粒芯片的读写操作以及Auto
              refresh操作和排程
            </li>
            <li>
              本设计在基于 Altera Cyclone II EP2C35F672 芯片的 Terasic
              DE2(de2-35) FPGA 开发板上验证通过
            </li>
          </ul>
        </>
      ),
      tags: [
        "SDRAM(Synchronous dynamic random-access memory)",
        "SDRAM Controller",
        "DRAM(Dynamic random-access memory)",
        "DRAM Controller",
        "RAM(Random-access memory)",
        "RAM Controller",
        "IP Core",
        "FPGA(Field Programmable Gate Arrays)",
        "SystemVerilogHDL",
        "Verilog",
        "VerilogHDL",
        "HDL(Hardware description language)",
        "Digital logic",
        "Digital IC",
      ],
    },
    {
      icon: rtos_icon,
      name: "ez-rtos",
      type: "System",
      url: undefined,
      source_code_url: "https://github.com/cw1997/ez-rtos",
      create_datetime: "2021-02",
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>
              Real-time Operating System
              是实时操作系统，其能够在指定的时间内执行特定操作，具有基本的多任务执行和切换功能，主要应用在嵌入式系统中。
            </li>
            <li>
              该 ez-rtos 系统在基于 ARM Cortex-M3 内核的 MCU(Micro Controller)
              STM32F103ZET6 上测试通过
              <ul>
                <li>
                  该 RTOS 支持如下功能
                  <ul>
                    <li>任务切换（基于 ARM Cortex-M3 SysTick 时钟中断）</li>
                    <li>
                      delay
                      延迟函数（允许某个任务暂停执行，任务切换调度器将让出时间片给其他任务执行）
                    </li>
                    <li>
                      内存分配器（支持 C 语言标准库的 malloc(size_t) 和
                      free(void *) 函数）
                    </li>
                    <li>
                      关键区段，该区段内将禁止全部中断，确保该区段内的代码执行不被中断，通常用于执行一些对时序要求极其严格的操作，例如外设驱动等
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </>
      ),
      tags: [
        "RTOS",
        "Real-time OS",
        "Real-time Operating System",
        "OS",
        "Operating System",
      ],
    },
    {
      icon: inetutils_icon,
      name: "inetutils",
      type: "Computer Network",
      url: undefined,
      source_code_url: "https://github.com/cw1997/inetutils",
      create_datetime: "2021-05",
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>
              inetutils 是使用 C 语言开发的 GNU
              网络实用程序，其包括一系列程序，例如常用的 ping、ping6(ping for
              IPv6)、traceroute 等等
            </li>
            <li>
              cw1997/inetutils 这个项目是本人参考 GNU 的官方版本 inetutils
              功能后，使用 C 语言编写的一个类似的开源工具，其实现了 ping 和
              traceroute 这两个命令工具
            </li>
            <li>
              该项目主要使用了 SOL_SOCKET 原始套接字功能实现 C 语言发送 network
              layer 网络层数据包，进而能够发送 ping 和 traceroute 所使用的 ICMP
              协议数据包
            </li>
            <li>
              该项目使用 cmake 编译，使用 GitHub Actions 进行 CI 构建并生成
              Linux X86 平台下的可执行程序
            </li>
          </ul>
        </>
      ),
      tags: [
        "network",
        "computer network",
        "ICMP(Internet Control Message Protocol)",
        "ping",
        "traceroute",
        "3-Layer",
        "network layer",
        "inetutils",
        "cmake",
        "linux",
        "socket",
        "POSIX",
        "SOL_SOCKET",
      ],
    },
  ],
} as const

export interface IPropsPortfolioPage {}

const PortfolioPage: React.FunctionComponent<IPropsPortfolioPage> = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Portfolio</h2>
        <Space className={styles.list} direction={"vertical"} size={32} wrap>
          {data.items.map((item) => (
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
                <div className={styles.item_info_organization}>{item.name}</div>
                <div className={styles.item_info_name}>
                  <Space
                    split={<Divider type={"vertical"} />}
                    size={[0, 4]}
                    wrap
                  >
                    <div>{item.type}</div>
                  </Space>
                </div>
                <div className={styles.item_info_organization_url}>
                  <Space
                    split={<Divider type={"vertical"} />}
                    size={[0, 4]}
                    wrap
                  >
                    {item.url && (
                      <div>
                        <LinkOutlined /> <OutsideLink href={item.url} />
                      </div>
                    )}
                    {item.source_code_url && (
                      <div>
                        <GithubOutlined />{" "}
                        <OutsideLink href={item.source_code_url} />
                      </div>
                    )}
                  </Space>
                </div>
                <div className={styles.item_info_meta}>
                  <Space
                    split={<Divider type={"vertical"} />}
                    size={[0, 4]}
                    wrap
                  >
                    <div>
                      <ClockCircleOutlined /> {item.create_datetime}
                    </div>
                    {/*<div><EnvironmentOutlined/> {item.location}</div>*/}
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
      </main>
    </div>
  )
}
export default PortfolioPage
