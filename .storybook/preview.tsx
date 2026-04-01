import type {Preview} from "@storybook/nextjs-vite"
import {Noto_Sans_SC} from "next/font/google"
import {NextIntlClientProvider} from "next-intl"
import React from "react"

import "../src/app/globals.scss"
import {defaultLocale} from "../src/i18n/routing"
import messages from "../src/messages/en-US.json"

/** Same as `src/app/layout.tsx` so Storybook matches production typography. */
const fontBody = Noto_Sans_SC({subsets: ["latin-ext"]})

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={fontBody.className}>
        <NextIntlClientProvider locale={defaultLocale} messages={messages}>
          <Story />
        </NextIntlClientProvider>
      </div>
    ),
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
