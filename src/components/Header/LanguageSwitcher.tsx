"use client"

import {useLocale, useTranslations} from "next-intl"
import {useRouter, usePathname} from "@/i18n/navigation"
import {locales, localeLabels} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import {Select} from "antd"
import React, {useTransition} from "react"

import styles from "./Header.module.sass"

export const LanguageSwitcher: React.FunctionComponent = () => {
  const t = useTranslations("header")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const options = locales.map((loc) => ({
    value: loc,
    label: localeLabels[loc],
  }))

  return (
    <Select<Locale>
      className={styles.language_switcher}
      value={locale as Locale}
      options={options}
      size="small"
      disabled={isPending}
      aria-label={t("selectLanguage")}
      popupMatchSelectWidth={false}
      styles={{popup: {root: {zIndex: 100_000}}}}
      onChange={(nextLocale) => {
        startTransition(() => {
          router.replace(pathname, {locale: nextLocale})
        })
      }}
    />
  )
}
