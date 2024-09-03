import {Space} from "antd"

import {ContactSection} from "./(home)/ContactSection/ContactSection"
import {ExperienceSection} from "./(home)/ExperienceSection/ExperienceSection"
import {ProfileSection} from "./(home)/ProfileSection/ProfileSection"
import {SkillSection} from "./(home)/SkillSection/SkillSection"
import styles from "./page.module.sass"

export default function HomePage() {
  return (
    <Space className={styles.main} direction={"vertical"} size={48}>
      <ProfileSection />
      <ContactSection />
      <SkillSection />
      <ExperienceSection />
    </Space>
  )
}
