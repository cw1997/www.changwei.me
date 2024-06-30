import {Space} from "antd";

import {Footer} from "@/components/Footer/Footer";

import {ContactSection} from "./ContactSection/ContactSection";
import {ExperienceSection} from "./ExperienceSection/ExperienceSection";
import {ProfileSection} from "./ProfileSection/ProfileSection";
import {SkillSection} from "./SkillSection/SkillSection";
import styles from "./page.module.sass";

export default function Home() {
  return (
    <div className={styles.container}>
      <Space className={styles.main} direction={'vertical'} size={48}>
        <ProfileSection />
        <ContactSection />
        <SkillSection />
        <ExperienceSection />
      </Space>
      
      <Footer />
    </div>
  )
}
