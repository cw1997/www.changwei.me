import next_logo from '@/assets/images/logo/next.svg'
import vercel_logo from '@/assets/images/logo/vercel.svg'
import {OutsideLink} from "@/components/OutsideLink";
import {ProfileSection} from "@/components/ProfileSection/ProfileSection";
import {SkillSection} from "@/components/SkillSection/SkillSection";
import {Space} from "antd";
import Image from "next/image";
import styles from "./page.module.sass";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ProfileSection />
        
        {/*<div className={styles.skill}>
          <SkillSection />
        </div>*/}
      </main>
      
      <footer>
        <div>
          <PoweredByVercel/>
        </div>
      </footer>
    </div>
  )
}

const PoweredByVercel = () => {
  return (
    <Space align={'center'}>
      Powered By
      <OutsideLink className={styles.logo} href={'https://vercel.com'}>
        <Image
          src={vercel_logo}
          alt="Vercel Logo"
          className={styles.logo_img}
          // width={100}
          height={16}
          priority
        />
      </OutsideLink>
      And
      <OutsideLink className={styles.logo} href={'https://nextjs.org/'}>
        <Image
          src={next_logo}
          alt="NextJS Logo"
          className={styles.logo_img}
          // width={100}
          height={16}
          priority
        />
      </OutsideLink>
    </Space>
  )
}
