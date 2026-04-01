import type {Meta, StoryObj} from "@storybook/nextjs-vite"
import React, {Suspense} from "react"

import {ProfileSection} from "./ProfileSection"

const meta = {
  title: "Home/Sections/ProfileSection",
  component: ProfileSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{padding: 24}}>
      <Suspense fallback={<div>Loading…</div>}>
        <ProfileSection />
      </Suspense>
    </div>
  ),
} satisfies Meta<typeof ProfileSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
