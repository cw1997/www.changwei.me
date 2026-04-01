"use client"

import {url_resume_pdf_mirror, url_resume_pdf_release, url_resume_pdf_source} from "@/data"
import {OutsideLink} from "@/components/OutsideLink"
import {DownloadOutlined, EyeOutlined, GithubOutlined} from "@ant-design/icons"
import {Button, Divider, Space} from "antd"
import {useTranslations} from "next-intl"
import React from "react"

import styles from "./page.module.sass"

export interface IPropsResumePage {}

const ResumePage: React.FunctionComponent<IPropsResumePage> = () => {
  const t = useTranslations("resume")

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <Divider />
        <Space wrap size={"large"}>
          <OutsideLink href={url_resume_pdf_mirror}>
            <Button type="primary" icon={<DownloadOutlined />}>
              {t("download")}
            </Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_release}>
            <Button type="primary" ghost icon={<GithubOutlined />}>
              {t("downloadGithub")}
            </Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_source}>
            <Button type="default" icon={<EyeOutlined />}>
              {t("viewSource")}
            </Button>
          </OutsideLink>
        </Space>
        <div className={styles.resume}>
          <embed
            src={url_resume_pdf_mirror}
            width="100%"
            height="800px"
            type="application/pdf"
          />
        </div>
      </main>
    </div>
  )
}

export default ResumePage
