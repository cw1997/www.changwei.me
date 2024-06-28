import {Footer} from "@/components/Footer/Footer";
import {ProfileSection} from "@/components/ProfileSection/ProfileSection";
import {SkillSection} from "@/components/SkillSection/SkillSection";
import styles from "./page.module.sass";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ProfileSection />
        
        <div className={styles.skill}>
          <SkillSection />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
