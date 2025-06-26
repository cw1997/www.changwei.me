import React from "react"
import styles from "./page.module.sass"
import {Button, Divider, Space} from "antd";
import {DownloadOutlined, EyeOutlined, GithubOutlined} from "@ant-design/icons";
import {OutsideLink} from "@/components/OutsideLink";
import {url_resume_pdf_mirror, url_resume_pdf_release, url_resume_pdf_source} from "@/data";

export interface IPropsResumePage {}

const ResumePage: React.FunctionComponent<IPropsResumePage> = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Resume 简历</h2>
        <Divider />
        <Space wrap size={"large"}>
          <OutsideLink href={url_resume_pdf_mirror}>
            <Button type="primary" icon={<DownloadOutlined />}>下载简历 Download</Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_release}>
            <Button type="primary" ghost icon={<GithubOutlined />}>下载简历(GitHub) Download from GitHub)</Button>
          </OutsideLink>
          <OutsideLink href={url_resume_pdf_source}>
            <Button type="default" icon={<EyeOutlined />}>查看简历 LaTeX 源码 View source code (LaTeX)</Button>
          </OutsideLink>
        </Space>
        <div className={styles.resume}>
          <embed src={url_resume_pdf_mirror} width="100%" height="800px" type="application/pdf"/>
          {/*<iframe src={url_resume_pdf_mirror} style={{border: 0, width: "100%", height: "100vh", /*height: "calc(100vh - 156px)", *!/}/>*/}
          {/*<PdfViewer url={"/api/download-resume"} />*/}
        </div>
      </main>
    </div>
  )
}
export default ResumePage
