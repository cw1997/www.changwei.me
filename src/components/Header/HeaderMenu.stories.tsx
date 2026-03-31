import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {HeaderMenu} from "./HeaderMenu"

const meta = {
  title: "Components/HeaderMenu",
  component: HeaderMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
} satisfies Meta<typeof HeaderMenu>

export default meta
type Story = StoryObj<typeof meta>

export const OnHomePage: Story = {}

export const OnGuestbookPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/guestbook",
      },
    },
  },
}
