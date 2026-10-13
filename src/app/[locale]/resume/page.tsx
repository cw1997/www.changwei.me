"use client"

import {Button, Divider, Space} from "antd"
import {DownloadOutlined, EyeOutlined, GithubOutlined} from "@ant-design/icons"
import {OutsideLink} from "@/components/OutsideLink"
import {
  url_resume_pdf_mirror,
  url_resume_pdf_release,
  url_resume_pdf_source,
} from "@/data"
import {useLocale, useTranslations} from "next-intl"

import styles from "./page.module.sass"

/**
 * Stays a client component: antd's package barrel calls `createContext` at module
 * evaluation time, which throws when imported from a server component.
 */
export default function ResumePage(_props: PageProps<"/[locale]/resume">) {
  const locale = useLocale()
  const t = useTranslations("resume")

  const resumePdfUrl = `${url_resume_pdf_mirror}?locale=${locale}`

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>{t("title")}</h1>
        <Divider />
        <Space wrap size={"large"}>
          <OutsideLink href={resumePdfUrl}>
            <Button type={"primary"} icon={<DownloadOutlined />}>
              {t("download")}
            </Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_release}>
            <Button type={"primary"} ghost icon={<GithubOutlined />}>
              {t("downloadGithub")}
            </Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_source}>
            <Button type={"default"} icon={<EyeOutlined />}>
              {t("viewSource")}
            </Button>
          </OutsideLink>
        </Space>
        <div className={styles.resume}>
          <iframe
            className={styles.resume_embed}
            src={resumePdfUrl}
            title={t("title")}
          />
        </div>
      </main>
    </div>
  )
}
