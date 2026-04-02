"use client"

import {OutsideLink} from "@/components/OutsideLink"
import type {Locale} from "@/i18n/routing"
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  TagsOutlined,
} from "@ant-design/icons"
import {Divider, Space, Tag} from "antd"
import {useLocale, useTranslations} from "next-intl"
import React from "react"

import styles from "./ExperienceSection.module.sass"
import {getExperienceData} from "./buildExperienceData"

export interface IPropsExperienceSection {}

export const ExperienceSection: React.FunctionComponent<
  IPropsExperienceSection
> = () => {
  const locale = useLocale() as Locale
  const t = useTranslations("sections")
  const tExperience = useTranslations("experience")
  const data = getExperienceData(locale, tExperience)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("experience")}</h2>
      <Space orientation={"vertical"} size={32} style={{width: "100%"}}>
        {data.map((category) => (
          <div key={category.category_key} className={styles.category}>
            <h3 className={styles.category_name}>{t(category.category_key)}</h3>
            <Space
              className={styles.list}
              orientation={"vertical"}
              size={32}
            >
              {category.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.item_icon}>
                    <img
                      style={{width: 64, height: "auto"}}
                      src={item.icon.src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.item_info}>
                    <div className={styles.item_info_organization}>
                      {item.organization}
                    </div>
                    <div className={styles.item_info_name}>
                      <Space
                        separator={<Divider orientation={"vertical"} />}
                        size={[0, 4]}
                        wrap
                      >
                        <div>{item.name}</div>
                        <div>
                          {item.department_url ? (
                            <OutsideLink
                              href={item.department_url}
                              style={{color: "unset"}}
                            >
                              {item.department}
                            </OutsideLink>
                          ) : (
                            item.department
                          )}
                        </div>
                      </Space>
                    </div>
                    <div className={styles.item_info_organization_url}>
                      <LinkOutlined />{" "}
                      <OutsideLink href={item.organization_url} />
                    </div>
                    <div className={styles.item_info_meta}>
                      <Space
                        separator={<Divider orientation={"vertical"} />}
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
