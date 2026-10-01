"use client"

import {useLocale, useTranslations} from "next-intl"
import {useRouter, usePathname} from "@/i18n/navigation"
import {locales, localeLabels} from "@/i18n/routing"
import type {Locale} from "@/i18n/routing"
import {ConfigProvider, Select} from "antd"
import React, {useTransition} from "react"

import styles from "./Header.module.sass"

// The switcher sits on the translucent, blurred header, so it must not paint its
// own opaque background, and its focus ring should match the header's dark accent
// rather than antd's default blue. antd v6 exposes both as component tokens; the
// old CSS-module overrides targeted the antd v5 `.ant-select-selector` wrapper and
// had been dead since the v6 migration. Border colours live in `Header.module.sass`
// because they are shared with the hover state and need `!important` to win.
const selectTheme = {
  components: {
    Select: {
      selectorBg: "transparent",
      activeOutlineColor: "rgba(51, 51, 51, 0.12)",
    },
  },
} as const

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
    <ConfigProvider theme={selectTheme}>
      <Select<Locale>
        className={styles.language_switcher}
        value={locale as Locale}
        options={options}
        disabled={isPending}
        aria-label={t("selectLanguage")}
        popupMatchSelectWidth={false}
        onChange={(nextLocale) => {
          startTransition(() => {
            router.replace(pathname, {locale: nextLocale})
          })
        }}
      />
    </ConfigProvider>
  )
}
