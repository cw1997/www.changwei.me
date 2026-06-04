"use client"

import styles from "./page.module.sass"
import {Button, Divider, Space} from "antd"
import {DownloadOutlined, EyeOutlined, GithubOutlined} from "@ant-design/icons"
import {OutsideLink} from "@/components/OutsideLink"
import {url_resume_pdf_mirror, url_resume_pdf_release, url_resume_pdf_source} from "@/data"
import {useLocale, useTranslations} from "next-intl"

type Props = PageProps<'/[locale]/resume'>

export default function ResumePage(_props: Props) {
  const locale = useLocale()
  const t = useTranslations("resume")

  const resumePdfUrl = `${url_resume_pdf_mirror}?locale=${locale}`

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <Divider />
        <Space wrap size={"large"}>
          <OutsideLink href={resumePdfUrl}>
            <Button type="primary" icon={<DownloadOutlined />}>{t("download")}</Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_release}>
            <Button type="primary" ghost icon={<GithubOutlined />}>{t("downloadGithub")}</Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_source}>
            <Button type="default" icon={<EyeOutlined />}>{t("viewSource")}</Button>
          </OutsideLink>
        </Space>
        <div className={styles.resume}>
          <object
            className={styles.resume_embed}
            data={resumePdfUrl}
            type="application/pdf"
            aria-label={t("title")}
          >
            <embed
              className={styles.resume_embed}
              src={resumePdfUrl}
              type="application/pdf"
            />
            <p className={styles.resume_fallback}>
              {t("inlineUnsupportedTip")}{" "}
              <OutsideLink href={resumePdfUrl}>{t("download")}</OutsideLink>
            </p>
          </object>
        </div>
      </main>
    </div>
  )
}
