import {ExperienceSection} from "@/components/ExperienceSection/ExperienceSection";
import {Footer} from "@/components/Footer/Footer";
import {ProfileSection} from "@/components/ProfileSection/ProfileSection";
import {SkillSection} from "@/components/SkillSection/SkillSection";
import {Space} from "antd";
import styles from "./page.module.sass";

export default function Home() {
  return (
    <div className={styles.container}>
      <Space className={styles.main} direction={'vertical'} size={48}>
        <ProfileSection />
        <SkillSection />
        <ExperienceSection />
      </Space>
      
      <Footer />
    </div>
  )
}
