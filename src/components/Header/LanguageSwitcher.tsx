"use client"

import {useLocale, useTranslations} from "next-intl"
import {useRouter, usePathname} from "@/i18n/navigation"
import {locales, localeLabels} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import React, {useTransition} from "react"

import styles from "./Header.module.sass"

export const LanguageSwitcher: React.FunctionComponent = () => {
  const t = useTranslations("header")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value as Locale
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale})
    })
  }

  return (
    <select
      className={styles.language_switcher}
      value={locale}
      onChange={onChange}
      aria-label={t("selectLanguage")}
      disabled={isPending}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeLabels[loc]}
        </option>
      ))}
    </select>
  )
}
