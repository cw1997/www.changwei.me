import ntust_logo from '@/assets/images/logo/ntust.png'
import pingcap_logo from '@/assets/images/logo/PingCAP.svg'
import risingwave_logo from '@/assets/images/logo/risingwave.png'
import wspc_logo from '@/assets/images/logo/wspc.jpg'
import {OutsideLink} from "@/components/OutsideLink";
import {ClockCircleOutlined, EnvironmentOutlined, GithubOutlined, LinkOutlined, TagsOutlined, ZhihuCircleFilled} from "@ant-design/icons";
import {Divider, Space, Tag} from "antd";
import React from "react";

import styles from "./PortfolioSection.module.sass";


const data = [
  {
    category_name: "Work",
    items: [
      {
        icon: risingwave_logo,
        name: 'Intern (2nd)',
        organization: 'RisingWave Labs',
        organization_url: 'https://risingwave.com/',
        time_range: {
          start: '2024-05',
          end: 'now',
        },
        location: 'Remote',
        position: 'Frontend',
        note: (
          <>
            <ul>
              <li>
                Develop and maintain the official website <LinkOutlined /> <OutsideLink href={'https://risingwave.com/'} />
              </li>
            </ul>
          </>
        ),
        tags: [
          'React',
          'Node.js',
          'JavaScript',
          'TypeScript',
          'jQuery',
          'Next.js',
          'TailwindCSS',
          'Tailwind UI',
          'GitHub',
          'Git',
          'Github Actions',
          'WordPress',
          'PHP',
          'MySQL',
          'Linux',
          'Docker',
        ],
      },
      {
        icon: pingcap_logo,
        name: 'Intern (1st)',
        organization: 'PingCAP',
        organization_url: 'https://www.pingcap.com/',
        time_range: {
          start: '2020-10',
          end: '2024-05',
        },
        location: 'Chinese mainland (+86), Beijing City, Haidian District',
        position: 'Frontend',
        note: (
          <>
            <ul>
              <li>
                Develop and maintain the Chinese official website <LinkOutlined /> <OutsideLink href={'https://cn.pingcap.com/'} /> and <LinkOutlined /> <OutsideLink href={'https://pingcap.cn/'} />
              </li>
              <li>
                Develop and maintain the TiDB developer community website <LinkOutlined /> <OutsideLink href={'https://tidb.net/'} /> , <br/>
                it is a source available project and its GitHub repository is <GithubOutlined /> <OutsideLink href={'https://github.com/pingcap-inc/tidb.io'} />
              </li>
            </ul>
          </>
        ),
        tags: [
          'React',
          'Node.js',
          'JavaScript',
          'TypeScript',
          'Webpack',
          'Next.js',
          'Storybook',
          'Ramda',
          'Lodash',
          'ahooks',
          'Gatsby.js',
          'GraphQL',
          'Strapi',
          'GitHub',
          'Git',
          'Github Actions',
          'Ant-Design',
          'Sass',
          'styled-component',
          'Rollup',
          'WordPress',
          'PHP',
          'MySQL',
          'Linux',
          'Docker',
        ],
      },
    ],
  },
] as const

export interface IPropsPortfolioSection {
}

export const PortfolioSection: React.FunctionComponent<IPropsPortfolioSection> = (props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Portfolio</h2>
      <Space direction={'vertical'} size={32}>
      {data.map((category) => (
        <div key={category.category_name} className={styles.category}>
          <div className={styles.category_name}>{category.category_name}: </div>
          <Space className={styles.list} direction={'vertical'} size={32} wrap>
            {category.items.map((item) => (
              <div key={item.name} className={styles.item}>
                <div className={styles.item_icon}>
                  <img style={{width: 64, height: 'auto'}} src={item.icon.src} alt={item.name}/>
                </div>
                <div className={styles.item_info}>
                  {/*<div className={styles.item_info_name}>{item.name}</div>*/}
                  <div className={styles.item_info_organization}>{item.organization}</div>
                  <div className={styles.item_info_name}>
                    <Space split={<Divider type={'vertical'}/>} size={[0, 4]} wrap>
                      <div>{item.name}</div>
                      <div>{item.position}</div>
                    </Space>
                  </div>
                  <div className={styles.item_info_organization_url}>
                    <LinkOutlined /> <OutsideLink href={item.organization_url}/>
                  </div>
                  <div className={styles.item_info_meta}>
                    <Space split={<Divider type={'vertical'}/>} size={[0, 4]} wrap>
                      <div><ClockCircleOutlined/> {item.time_range.start} ~ {item.time_range.end}</div>
                      <div><EnvironmentOutlined/> {item.location}</div>
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
      ))}
      </Space>
    </div>
  )
}
