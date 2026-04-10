import React from "react"
import {Divider} from "antd"
import {getTranslations} from "next-intl/server"

import {StatisticDashboard} from "./StatisticDashboard"
import styles from "./page.module.sass"

export async function generateMetadata() {
  const t = await getTranslations("statistic")
  return {
    title: t("title"),
  }
}

const StatisticPage: React.FunctionComponent = async () => {
  const t = await getTranslations("statistic")

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("pageTitle")}</h2>
        <Divider />
        <StatisticDashboard />
      </main>
    </div>
  )
}
export default StatisticPage
