import type {Preview} from "@storybook/nextjs-vite"
import {NextIntlClientProvider} from "next-intl"
import React from "react"

import enUS from "../src/messages/en-US.json"

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en-US" messages={enUS}>
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
      test: "todo",
    },
  },
}

export default preview
