import React from "react"
import styles from "./page.module.sass"
import {PdfViewer} from "@/components/PdfViewer/PdfViewer"

export interface IPropsResumePage {}

const ResumePage: React.FunctionComponent<IPropsResumePage> = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Resume 简历</h2>
        <div>
          <PdfViewer fileUrl={"/api/download-resume"} />
          {/*<iframe src={"/api/download-resume"} style={{border: 0, width: "100%", height: "100%", }} />*/}
        </div>
      </main>
    </div>
  )
}
export default ResumePage
