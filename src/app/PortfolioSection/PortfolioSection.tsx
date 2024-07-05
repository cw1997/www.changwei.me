import React from "react";
import {ClockCircleOutlined, LinkOutlined, TagsOutlined} from "@ant-design/icons";
import {Divider, Space, Tag} from "antd";

import {OutsideLink} from "@/components/OutsideLink";

import styles from "./PortfolioSection.module.sass";
import ntust_lib_icon from './ntust_lib_icon.png'
import sdram_controller_icon from './dram.jpg'


const data = {
  items: [
    {
      icon: ntust_lib_icon,
      name: 'NTUST LIB',
      type: 'Mobile App',
      url: 'https://library.ntust.edu.tw/p/405-1049-110462,c11171.php?Lang=zh-tw',
      source_code_url: undefined,
      create_datetime: '2022-07',
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>『台灣科技大學圖書館APP』(NTUST LIB) 為讀者在行動裝置上提供圖書館服務，其支援iOS、Android作業系統，包括個人借閱情況查詢、館藏資料查詢、圖書館最新消息、活動行事曆、館內導覽、樓層空間分佈情況查詢、經典與暢銷書籍推薦、圖書推薦QRcode感應入館、登記座位、櫃台借書與智慧空間與討論小間借用等多項功能服務，可免費下載至智慧型手機或平板裝置上，歡迎多加利用!!</li>
            <li>APP 前端基於 React Native with Expo SDK 開發，使用 TypeScript 程式語言。支援跨平台使用『iOS、Android 作業系統』</li>
            <li>APP 後端基於 Nest.js 開發，使用 TypeScript 程式語言。使用 MySQL 作為 Database。</li>
          </ul>
        </>
      ),
      tags: [
        'React',
        'React Native',
        'Expo',
        'Node.js',
        'JavaScript',
        'TypeScript',
        'GitHub',
        'Git',
        'Github Actions',
        'Linux',
        'Docker',
        'Nest.js',
        'MySQL',
      ],
    },
    {
      icon: sdram_controller_icon,
      name: 'SDRAM Controller',
      type: 'IP Core, written by SystemVerilogHDL ',
      url: undefined,
      source_code_url: 'https://github.com/cw1997/SDRAM-Controller',
      create_datetime: '2021-04',
      // update_datetime: '2024-07',
      note: (
        <>
          <ul>
            <li>使用 SystemVerilogHDL 编写的 SDRAM(Synchronous dynamic random-access memory) 内存控制器</li>
            <li>内存控制器通常集成于计算机的北桥芯片或者CPU中(after AMD Athlon X2, after Intel Nehalem)，用于按照特定的控制时序去控制内存颗粒芯片的读写操作以及Auto refresh操作和排程</li>
            <li>本设计在基于 Alter Cyclone II EP2C35F672 芯片的 Terasic DE2(de2-35) FPGA 开发板上验证通过</li>
          </ul>
        </>
      ),
      tags: [
        'SDRAM(Synchronous dynamic random-access memory)',
        'SDRAM Controller',
        'DRAM(Dynamic random-access memory)',
        'DRAM Controller',
        'RAM(Random-access memory)',
        'RAM Controller',
        'IP Core',
        'FPGA(Field Programmable Gate Arrays)',
        'SystemVerilogHDL',
        'Verilog',
        'VerilogHDL',
        'HDL(Hardware description language)',
        'Digital logic',
        'Digital IC',
      ],
    },
  ],
} as const

export interface IPropsPortfolioSection {
}

export const PortfolioSection: React.FunctionComponent<IPropsPortfolioSection> = (props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Portfolio</h2>
      <Space className={styles.list} direction={'vertical'} size={32} wrap>
        {data.items.map((item) => (
          <div key={item.name} className={styles.item}>
            <div className={styles.item_icon}>
              <img style={{width: 64, height: 'auto'}} src={item.icon.src} alt={item.name}/>
            </div>
            <div className={styles.item_info}>
              {/*<div className={styles.item_info_name}>{item.name}</div>*/}
              <div className={styles.item_info_organization}>{item.name}</div>
              <div className={styles.item_info_name}>
                <Space split={<Divider type={'vertical'}/>} size={[0, 4]} wrap>
                  <div>{item.type}</div>
                </Space>
              </div>
              <div className={styles.item_info_organization_url}>
                <LinkOutlined /> <OutsideLink href={item.url}/>
              </div>
              <div className={styles.item_info_meta}>
                <Space split={<Divider type={'vertical'}/>} size={[0, 4]} wrap>
                  <div><ClockCircleOutlined/> {item.create_datetime}</div>
                  {/*<div><EnvironmentOutlined/> {item.location}</div>*/}
                </Space>
              </div>
              {/*<div className={styles.item_info_location}>{item.location}</div>*/}
              {item.note && <div className={styles.item_info_note}>{item.note}</div>}
              {(item.tags?.length ?? 0) > 0 && (
                <Space className={styles.item_info_tags} wrap>
                  <TagsOutlined/> {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </Space>
              )}
            </div>
          </div>
        ))}
      </Space>
    </div>
  )
}
