import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {ExperienceSection} from "./ExperienceSection"

const meta = {
  title: "Home/Sections/ExperienceSection",
  component: ExperienceSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{padding: 24}}>
      <ExperienceSection />
    </div>
  ),
} satisfies Meta<typeof ExperienceSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
