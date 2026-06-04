import type {Metadata} from "next"
import {getTranslations} from "next-intl/server"
import {defaultLocale, isLocale, type Locale} from "@/i18n/routing"
import {buildLocalizedMetadata} from "@/lib/seo"

import {StatisticDashboard} from "./StatisticDashboard"
import styles from "./page.module.sass"

type Props = PageProps<'/[locale]/statistic'>

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {params} = props
  const {locale} = await params
  const localeValue: Locale = isLocale(locale) ? locale : defaultLocale
  const [t, tMetadata] = await Promise.all([
    getTranslations({locale: localeValue, namespace: "statistic"}),
    getTranslations({locale: localeValue, namespace: "metadata"}),
  ])

  return buildLocalizedMetadata({
    locale: localeValue,
    pathname: "/statistic",
    title: t("title"),
    description: t("description"),
    siteName: tMetadata("title"),
  })
}

export default async function StatisticPage(_props: Props) {
  const t = await getTranslations("statistic")

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("pageTitle")}</h2>
        <hr style={{margin: "0 0 16px", border: 0, borderTop: "1px solid rgba(0, 0, 0, 0.12)"}} />
        <StatisticDashboard />
      </main>
    </div>
  )
}
