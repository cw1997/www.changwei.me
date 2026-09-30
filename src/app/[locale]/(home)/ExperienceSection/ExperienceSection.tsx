"use client"

import {OutsideLink} from "@/components/OutsideLink"
import {isLocale, type Locale} from "@/i18n/routing"
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

const LOGO_SIZE = 64

/** First visible character, safe for surrogate pairs and combining marks. */
function monogramOf(text: string): string {
  const first = Array.from(text.trim())[0]
  return first ? first.toUpperCase() : "?"
}

export interface IPropsExperienceSection {}

export const ExperienceSection: React.FunctionComponent<
  IPropsExperienceSection
> = () => {
  const locale = useLocale()
  // Guard the cast: a locale outside `routing.locales` would otherwise resolve to
  // `undefined` in the per-locale note lookup tables and crash the whole section.
  const safeLocale: Locale = isLocale(locale) ? locale : "en-US"
  const t = useTranslations("sections")
  const tExperience = useTranslations("experience")
  const data = getExperienceData(safeLocale, tExperience)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("experience")}</h2>
      <Space orientation={"vertical"} size={32} style={{width: "100%"}}>
        {data.map((category) => (
          <section key={category.category_key}>
            <h3 className={styles.category_name}>{t(category.category_key)}</h3>
            <Space className={styles.list} orientation={"vertical"} size={32}>
              {category.items.map((item) => (
                <article key={item.id} className={styles.item}>
                  <div className={styles.item_icon} aria-hidden={true}>
                    {item.icon?.src ? (
                      <img
                        src={item.icon.src}
                        alt={""}
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        style={{width: LOGO_SIZE, height: "auto"}}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className={styles.item_monogram}>
                        {monogramOf(item.organization)}
                      </span>
                    )}
                  </div>
                  <div className={styles.item_info}>
                    <div className={styles.item_info_organization}>
                      {item.organization}
                      {item.legal_entity && (
                        <span className={styles.item_info_legal_entity}>
                          {item.legal_entity}
                        </span>
                      )}
                    </div>
                    <div className={styles.item_info_name}>
                      <Space
                        separator={<Divider orientation={"vertical"} />}
                        size={[0, 4]}
                        wrap
                      >
                        <div>{item.name}</div>
                        {item.department && (
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
                        )}
                      </Space>
                    </div>
                    <div className={styles.item_info_organization_url}>
                      <LinkOutlined aria-hidden={true} /> <OutsideLink
                        href={item.organization_url}
                      />
                    </div>
                    <div className={styles.item_info_meta}>
                      <Space
                        separator={<Divider orientation={"vertical"} />}
                        size={[0, 4]}
                        wrap
                      >
                        <div>
                          <ClockCircleOutlined aria-hidden={true} />{" "}
                          {item.time_range.start} ~ {item.time_range.end}
                        </div>
                        <div>
                          <EnvironmentOutlined aria-hidden={true} />{" "}
                          {item.location}
                        </div>
                      </Space>
                    </div>
                    {item.note && (
                      <div className={styles.item_info_note}>{item.note}</div>
                    )}
                    {(item.tags?.length ?? 0) > 0 && (
                      <Space className={styles.item_info_tags} wrap>
                        <TagsOutlined aria-hidden={true} />{" "}
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Space>
                    )}
                  </div>
                </article>
              ))}
            </Space>
          </section>
        ))}
      </Space>
    </div>
  )
}