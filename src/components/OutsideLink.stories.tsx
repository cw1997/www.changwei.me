import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {OutsideLink} from "./OutsideLink"

const meta = {
  title: "Components/OutsideLink",
  component: OutsideLink,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    href: "https://www.changwei.me/",
    children: "Visit changwei.me",
  },
} satisfies Meta<typeof OutsideLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OpenInSameTab: Story = {
  args: {
    href: "https://github.com/cw1997",
    target: "_self",
    rel: "noreferrer",
    children: "Open GitHub in current tab",
  },
}