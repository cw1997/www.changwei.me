import {Space} from "antd"

import {ProfileSection} from "./(home)/ProfileSection/ProfileSection"
import {ContactSection} from "./(home)/ContactSection/ContactSection"
import {CommunityAndOrganizationSection} from "./(home)/CommunityAndOrganizationSection/CommunityAndOrganizationSection";
import {SkillSection} from "./(home)/SkillSection/SkillSection"
import {ExperienceSection} from "./(home)/ExperienceSection/ExperienceSection"
import styles from "./page.module.sass"

export default function HomePage() {
  return (
    <Space className={styles.main} direction={"vertical"} size={48}>
      <ProfileSection />
      <CommunityAndOrganizationSection />
      <ContactSection />
      <SkillSection />
      <ExperienceSection />
    </Space>
  )
}
