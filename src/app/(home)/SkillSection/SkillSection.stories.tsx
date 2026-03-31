import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {SkillSection} from "./SkillSection"

const meta = {
  title: "Home/Sections/SkillSection",
  component: SkillSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{padding: 24}}>
      <SkillSection />
    </div>
  ),
} satisfies Meta<typeof SkillSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
