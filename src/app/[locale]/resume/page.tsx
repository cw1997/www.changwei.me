import styles from "./page.module.sass"
import {Button, Divider, Space} from "antd"
import {DownloadOutlined, EyeOutlined, GithubOutlined} from "@ant-design/icons"
import {OutsideLink} from "@/components/OutsideLink"
import {url_resume_pdf_mirror, url_resume_pdf_release, url_resume_pdf_source} from "@/data"
import {getTranslations} from "next-intl/server"

export interface IPropsResumePage {}

export default async function ResumePage() {
  const t = await getTranslations("resume")

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("title")}</h2>
        <Divider />
        <Space wrap size={"large"}>
          <OutsideLink href={url_resume_pdf_mirror}>
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
          <iframe
            className={styles.resume_embed}
            src={url_resume_pdf_mirror}
            title={t("title")}
            loading="lazy"
          />
        </div>
      </main>
    </div>
  )
}
