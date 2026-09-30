"use client"

import {Space} from "antd"

import {ProfileSection} from "./(home)/ProfileSection/ProfileSection"
import {ContactSection} from "./(home)/ContactSection/ContactSection"
import {RoleSection} from "./(home)/RoleSection/RoleSection"
import {SkillSection} from "./(home)/SkillSection/SkillSection"
import {ExperienceSection} from "./(home)/ExperienceSection/ExperienceSection"
import styles from "./page.module.sass"

export default function HomePage(_props: PageProps<'/[locale]'>) {
  return (
    // Every other route wraps its content in <main>; the home page was the only
    // one without a main landmark, which screen readers use to skip navigation.
    <main className={styles.main}>
      <Space orientation={"vertical"} size={48} style={{width: "100%"}}>
        <ProfileSection />
        <RoleSection />
        <ContactSection />
        <SkillSection />
        <ExperienceSection />
      </Space>
    </main>
  )
}
