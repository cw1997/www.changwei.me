import type {Meta, StoryObj} from "@storybook/nextjs-vite"

import {ContactSection} from "./ContactSection"

const meta = {
  title: "Home/Sections/ContactSection",
  component: ContactSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{padding: 24}}>
      <ContactSection />
    </div>
  ),
} satisfies Meta<typeof ContactSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
