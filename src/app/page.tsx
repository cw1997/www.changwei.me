import {Space} from "antd"

import {ProfileSection} from "./(home)/ProfileSection/ProfileSection"
import {ContactSection} from "./(home)/ContactSection/ContactSection"
import {RoleSection} from "@/app/(home)/RoleSection/RoleSection";
import {SkillSection} from "./(home)/SkillSection/SkillSection"
import {ExperienceSection} from "./(home)/ExperienceSection/ExperienceSection"
import styles from "./page.module.sass"

export default function HomePage() {
  return (
    <Space className={styles.main} direction={"vertical"} size={48}>
      <ProfileSection />
      <RoleSection />
      <ContactSection />
      <SkillSection />
      <ExperienceSection />
    </Space>
  )
}
