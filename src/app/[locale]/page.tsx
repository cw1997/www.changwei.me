import {buildLanguageAlternates} from "@/i18n/alternates"
import {Space} from "antd"
import type {Metadata} from "next"

import {ProfileSection} from "./(home)/ProfileSection/ProfileSection"
import {ContactSection} from "./(home)/ContactSection/ContactSection"
import {RoleSection} from "./(home)/RoleSection/RoleSection"
import {SkillSection} from "./(home)/SkillSection/SkillSection"
import {ExperienceSection} from "./(home)/ExperienceSection/ExperienceSection"
import styles from "./page.module.sass"

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  return {alternates: buildLanguageAlternates(locale, "/")}
}

export default async function HomePage() {
  return (
    <Space className={styles.main} orientation={"vertical"} size={48}>
      <ProfileSection />
      <RoleSection />
      <ContactSection />
      <SkillSection />
      <ExperienceSection />
    </Space>
  )
}
