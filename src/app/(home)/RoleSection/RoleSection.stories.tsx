import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {RoleSection} from "./RoleSection"

const meta = {
  title: "Home/Sections/RoleSection",
  component: RoleSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{padding: 24}}>
      <RoleSection />
    </div>
  ),
} satisfies Meta<typeof RoleSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
