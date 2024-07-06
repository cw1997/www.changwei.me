import {Space} from "antd";

import {ContactSection} from "./ContactSection/ContactSection";
import {ExperienceSection} from "./ExperienceSection/ExperienceSection";
import styles from "./page.module.sass";
import {ProfileSection} from "./ProfileSection/ProfileSection";
import {SkillSection} from "./SkillSection/SkillSection";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Space className={styles.main} direction={'vertical'} size={48}>
        <ProfileSection />
        <ContactSection />
        <SkillSection />
        <ExperienceSection />
      </Space>
    </div>
  )
}
