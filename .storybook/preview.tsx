import type {Preview} from "@storybook/nextjs-vite"
import {Noto_Sans_SC} from "next/font/google"
import {NextIntlClientProvider} from "next-intl"
import React from "react"

import "../src/app/globals.scss"
import {
  defaultLocale,
  localeHtmlLang,
  localeLabels,
  locales,
  type Locale,
} from "../src/i18n/routing"
import messagesEnUS from "../src/messages/en-US.json"
import messagesZhHans from "../src/messages/zh-Hans.json"
import messagesZhHant from "../src/messages/zh-Hant.json"

const messagesByLocale: Record<Locale, typeof messagesEnUS> = {
  "en-US": messagesEnUS,
  "zh-Hant": messagesZhHant,
  "zh-Hans": messagesZhHans,
}

/** Same as `src/app/layout.tsx` so Storybook matches production typography. */
const fontBody = Noto_Sans_SC({subsets: ["latin-ext"]})

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "next-intl locale for stories",
      defaultValue: defaultLocale,
      toolbar: {
        title: "Language",
        icon: "globe",
        items: locales.map((value) => ({
          value,
          title: localeLabels[value],
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const raw = context.globals.locale as string | undefined
      const locale =
        raw && locales.includes(raw as Locale) ? (raw as Locale) : defaultLocale
      const messages = messagesByLocale[locale]
      return (
        <div lang={localeHtmlLang[locale]} className={fontBody.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Story />
          </NextIntlClientProvider>
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
