import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {Now} from "./Now"

const meta = {
  title: "Home/Profile/Now",
  component: Now,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Now>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
