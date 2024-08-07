import {Space} from "antd";

import {ContactSection} from "./ContactSection/ContactSection";
import {ExperienceSection} from "./ExperienceSection/ExperienceSection";
import {ProfileSection} from "./ProfileSection/ProfileSection";
import {SkillSection} from "./SkillSection/SkillSection";
import styles from "./page.module.sass";

export default function HomePage() {
  return (
    <Space className={styles.main} direction={'vertical'} size={48}>
      <ProfileSection />
      <ContactSection />
      <SkillSection />
      <ExperienceSection />
    </Space>
  )
}
