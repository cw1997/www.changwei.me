import type {Preview} from "@storybook/nextjs-vite"
import {NextIntlClientProvider} from "next-intl"
import React from "react"

import {defaultLocale} from "../src/i18n/routing"
import messages from "../src/messages/en-US.json"

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale={defaultLocale} messages={messages}>
        <Story />
      </NextIntlClientProvider>
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
