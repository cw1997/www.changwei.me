"use client"

import {useLocale, useTranslations} from "next-intl"
import {useRouter, usePathname} from "@/i18n/navigation"
import {locales, localeLabels} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import React, {useTransition} from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    <Select
      value={locale as Locale}
      disabled={isPending}
      onValueChange={(nextLocale) => {
        startTransition(() => {
          router.replace(pathname, {locale: nextLocale})
        })
      }}
    >
      <SelectTrigger aria-label={t("selectLanguage")} className="h-9">
        <SelectValue placeholder={t("selectLanguage")} />
      </SelectTrigger>
      <SelectContent align="end">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
