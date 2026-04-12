import {
  ClockCircleOutlined,
  GithubOutlined,
  LinkOutlined,
  TagsOutlined,
} from "@ant-design/icons"
import {Divider, Space, Tag} from "antd"

import {OutsideLink} from "@/components/OutsideLink"
import {getTranslations, getLocale} from "next-intl/server"

import styles from "./page.module.sass"
import ntust_lib_icon from "./ntust_lib_icon.png"
import rtos_icon from "./rtos_icon.png"
import sdram_controller_icon from "./dram.jpg"
import inetutils_icon from "./inetutils_icon.png"
import ez_react_icon from "@/assets/images/logo/frontend/React-icon.svg"

function getData(locale: string) {
  const isZhHans = locale === "zh-Hans"
  const isZhHant = locale === "zh-Hant"
  const isZh = isZhHans || isZhHant

  return {
    items: [
      {
        icon: ntust_lib_icon,
        name: "NTUST LIB",
        type: "Mobile App",
        url: "https://library.ntust.edu.tw/p/405-1049-110462,c11171.php?Lang=zh-tw",
        source_code_url: undefined,
        create_datetime: "2022-07",
        note: isZhHant ? (
          <ul>
            <li>
              『臺灣科技大學圖書館APP』(NTUST LIB)
              為讀者在行動裝置上提供圖書館服務，其支援iOS、Android作業系統，包括個人借閱情況查詢、館藏資料查詢、圖書館最新消息、活動行事曆、館內導覽、樓層空間分佈情況查詢、經典與暢銷書籍推薦、圖書推薦QRcode感應入館、登記座位、櫃臺借書與智慧空間與討論小間借用等多項功能服務，可免費下載至智慧型手機或平板裝置上，歡迎多加利用!!
            </li>
            <li>APP 前端基於 React Native with Expo SDK 開發，使用 TypeScript 程式語言。支援跨平台使用『iOS、Android 作業系統』</li>
            <li>APP 後端基於 Nest.js 開發，使用 TypeScript 程式語言。使用 MySQL 作為 Database。</li>
          </ul>
        ) : isZhHans ? (
          <ul>
            <li>
              "台湾科技大学图书馆APP"(NTUST LIB)
              为读者在移动设备上提供图书馆服务，支持iOS、Android操作系统，包括个人借阅情况查询、馆藏资料查询、图书馆最新消息、活动日历、馆内导览、楼层空间分布查询、经典与畅销书籍推荐、图书推荐QRcode感应入馆、登记座位、柜台借书与智能空间与讨论室借用等多项功能服务，可免费下载至智能手机或平板设备上，欢迎多加利用!!
            </li>
            <li>APP 前端基于 React Native with Expo SDK 开发，使用 TypeScript 编程语言。支持跨平台使用"iOS、Android 操作系统"</li>
            <li>APP 后端基于 Nest.js 开发，使用 TypeScript 编程语言。使用 MySQL 作为数据库。</li>
          </ul>
        ) : (
          <ul>
            <li>NTUST LIB is a mobile library app for NTUST (National Taiwan University of Science and Technology). It supports iOS and Android, offering personal borrowing inquiries, collection searches, library news, event calendars, floor guides, book recommendations, QR code entry, seat reservations, counter borrowing, and smart space bookings.</li>
            <li>Frontend built with React Native + Expo SDK in TypeScript, supporting cross-platform (iOS & Android).</li>
            <li>Backend built with Nest.js in TypeScript, using MySQL as the database.</li>
          </ul>
        ),
        tags: ["React", "React Native", "Expo", "Node.js", "JavaScript", "TypeScript", "GitHub", "Git", "Github Actions", "Linux", "Docker", "Nest.js", "MySQL"],
      },
      {
        icon: ez_react_icon,
        name: "ez-react",
        type: "Frontend",
        url: "https://ez-react.changwei.me/",
        source_code_url: "https://github.com/cw1997/ez-react",
        create_datetime: "2021-04",
        note: isZh ? (
          <ul>
            <li>
              React 是一个可以根据页面状态变化而自动重新渲染 UI 的 JavaScript 视图框架。该框架(ez-react)使用 TypeScript 编写，实现了一个功能上非常接近官方版 React 框架。
            </li>
            <li>
              ez-react 框架总共包括以下两个 npm package
              <ul>
                <li>@cw1997/ez-react {isZhHant ? "實現了" : "实现了"} react {isZhHant ? "的主要核心功能" : "的主要核心功能"}</li>
                <li>@cw1997/ez-react-dom {isZhHant ? "實現了" : "实现了"} react-dom/client {isZhHant ? "的主要核心功能" : "的主要核心功能"}</li>
                <li>@cw1997/ez-react-demo {isZhHant ? "主要用於演示" : "主要用于演示"} ez-react {isZhHant ? "的基本功能" : "的基本功能"}：<OutsideLink href={"https://ez-react.changwei.me/"} /> {isZhHant ? "搭建在" : "搭建在"} GitHub Pages</li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul>
            <li>React is a JavaScript view framework that automatically re-renders UI based on state changes. ez-react is a TypeScript implementation that closely mirrors the official React framework.</li>
            <li>
              ez-react includes two npm packages:
              <ul>
                <li>@cw1997/ez-react — implements core React functionality</li>
                <li>@cw1997/ez-react-dom — implements react-dom/client core functionality</li>
                <li>@cw1997/ez-react-demo — demonstrates ez-react features: <OutsideLink href={"https://ez-react.changwei.me/"} /> hosted on GitHub Pages</li>
              </ul>
            </li>
          </ul>
        ),
        tags: ["React", "React.js", "React DOM", "react", "react-dom", "react-dom/client", "ez-react", "ez-react-dom", "ez-react-demo", "JavaScript", "TypeScript", "JavaScript Framework", "View layer"],
      },
      {
        icon: sdram_controller_icon,
        name: "SDRAM Controller",
        type: "IP Core, written by SystemVerilogHDL",
        url: undefined,
        source_code_url: "https://github.com/cw1997/SDRAM-Controller",
        create_datetime: "2021-04",
        note: isZh ? (
          <ul>
            <li>{isZhHant ? "使用 SystemVerilogHDL 編寫的 SDRAM(Synchronous dynamic random-access memory) 記憶體控制器" : "使用 SystemVerilogHDL 编写的 SDRAM(Synchronous dynamic random-access memory) 内存控制器"}</li>
            <li>{isZhHant ? "記憶體控制器通常整合於電腦的北橋芯片或 CPU 中，用於按照特定的控制時序去控制記憶體顆粒芯片的讀寫操作以及 Auto refresh 操作和排程" : "内存控制器通常集成于计算机的北桥芯片或 CPU 中，用于按照特定的控制时序去控制内存颗粒芯片的读写操作以及 Auto refresh 操作和排程"}</li>
            <li>{isZhHant ? "本設計在基於 Altera Cyclone II EP2C35F672 芯片的 Terasic DE2(de2-35) FPGA 開發板上驗證通過" : "本设计在基于 Altera Cyclone II EP2C35F672 芯片的 Terasic DE2(de2-35) FPGA 开发板上验证通过"}</li>
          </ul>
        ) : (
          <ul>
            <li>An SDRAM (Synchronous Dynamic Random-Access Memory) controller written in SystemVerilogHDL.</li>
            <li>Memory controllers are typically integrated into the northbridge chipset or CPU, controlling memory chip read/write operations and auto-refresh scheduling according to specific timing sequences.</li>
            <li>This design was verified on a Terasic DE2 (de2-35) FPGA development board based on the Altera Cyclone II EP2C35F672 chip.</li>
          </ul>
        ),
        tags: ["SDRAM(Synchronous dynamic random-access memory)", "SDRAM Controller", "DRAM(Dynamic random-access memory)", "DRAM Controller", "RAM(Random-access memory)", "RAM Controller", "IP Core", "FPGA(Field Programmable Gate Arrays)", "SystemVerilogHDL", "Verilog", "VerilogHDL", "HDL(Hardware description language)", "Digital logic", "Digital IC"],
      },
      {
        icon: rtos_icon,
        name: "ez-rtos",
        type: "System",
        url: undefined,
        source_code_url: "https://github.com/cw1997/ez-rtos",
        create_datetime: "2021-02",
        note: isZh ? (
          <ul>
            <li>Real-time Operating System {isZhHant ? "是即時作業系統，能夠在指定的時間內執行特定操作，具有基本的多任務執行和切換功能，主要應用在嵌入式系統中。" : "是实时操作系统，能够在指定的时间内执行特定操作，具有基本的多任务执行和切换功能，主要应用在嵌入式系统中。"}</li>
            <li>{isZhHant ? "該 ez-rtos 系統在基於 ARM Cortex-M3 內核的 MCU STM32F103ZET6 上測試通過" : "该 ez-rtos 系统在基于 ARM Cortex-M3 内核的 MCU STM32F103ZET6 上测试通过"}</li>
          </ul>
        ) : (
          <ul>
            <li>A Real-time Operating System (RTOS) that can execute specific operations within a specified time, with basic multitasking and task switching capabilities, primarily used in embedded systems.</li>
            <li>ez-rtos was tested and verified on STM32F103ZET6 MCU based on the ARM Cortex-M3 core.</li>
          </ul>
        ),
        tags: ["RTOS", "Real-time OS", "Real-time Operating System", "OS", "Operating System"],
      },
      {
        icon: inetutils_icon,
        name: "inetutils",
        type: "Computer Network",
        url: undefined,
        source_code_url: "https://github.com/cw1997/inetutils",
        create_datetime: "2021-05",
        note: isZh ? (
          <ul>
            <li>inetutils {isZhHant ? "是使用 C 語言開發的 GNU 網路實用程式，包括 ping、ping6、traceroute 等" : "是使用 C 语言开发的 GNU 网络实用程序，包括 ping、ping6、traceroute 等"}</li>
            <li>cw1997/inetutils {isZhHant ? "是參考 GNU 官方版本 inetutils 功能後，使用 C 語言編寫的開源工具，實現了 ping 和 traceroute" : "是参考 GNU 官方版本 inetutils 功能后，使用 C 语言编写的开源工具，实现了 ping 和 traceroute"}</li>
            <li>{isZhHant ? "使用 SOL_SOCKET 原始套接字發送 ICMP 協議數據包" : "使用 SOL_SOCKET 原始套接字发送 ICMP 协议数据包"}</li>
            <li>{isZhHant ? "使用 cmake 編譯，使用 GitHub Actions 進行 CI 構建" : "使用 cmake 编译，使用 GitHub Actions 进行 CI 构建"}</li>
          </ul>
        ) : (
          <ul>
            <li>inetutils is a set of GNU network utilities developed in C, including ping, ping6, traceroute, etc.</li>
            <li>cw1997/inetutils is an open-source reimplementation in C, implementing ping and traceroute commands.</li>
            <li>Uses SOL_SOCKET raw sockets to send ICMP protocol packets at the network layer.</li>
            <li>Built with cmake and GitHub Actions CI for Linux x86 platform.</li>
          </ul>
        ),
        tags: ["network", "computer network", "ICMP(Internet Control Message Protocol)", "ping", "traceroute", "3-Layer", "network layer", "inetutils", "cmake", "linux", "socket", "POSIX", "SOL_SOCKET"],
      },
    ],
  } as const
}

export interface IPropsPortfolioPage {}

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio")
  const locale = await getLocale()
  const data = getData(locale)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <Divider />
        <Space className={styles.list} orientation={"vertical"} size={32}>
          {data.items.map((item) => (
            <div key={item.name} className={styles.item}>
              <div className={styles.item_icon}>
                <img
                  style={{width: 64, height: 64, objectFit: "contain"}}
                  src={item.icon.src}
                  alt={item.name}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.item_info}>
                <div className={styles.item_info_organization}>{item.name}</div>
                <div className={styles.item_info_name}>
                  <Space
                    separator={<Divider orientation={"vertical"} />}
                    size={[0, 4]}
                    wrap
                  >
                    <div>{item.type}</div>
                  </Space>
                </div>
                <div className={styles.item_info_organization_url}>
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
                </div>
                <div className={styles.item_info_meta}>
                  <Space
                    separator={<Divider orientation={"vertical"} />}
                    size={[0, 4]}
                    wrap
                  >
                    <div>
                      <ClockCircleOutlined /> {item.create_datetime}
                    </div>
                  </Space>
                </div>
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
