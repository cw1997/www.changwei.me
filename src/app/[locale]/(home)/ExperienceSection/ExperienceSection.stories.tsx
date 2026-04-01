import type {Meta, StoryObj} from "@storybook/nextjs-vite"
import React, {Suspense} from "react"

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
      <Suspense fallback={<div>Loading…</div>}>
        <ExperienceSection />
      </Suspense>
    </div>
  ),
} satisfies Meta<typeof ExperienceSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
