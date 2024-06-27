import Image from "next/image";
import styles from "./page.module.sass";
import {Space, Tag} from "antd";
import {OutsideLink} from "@/components/OutsideLink";
import photo_image from './changwei_at_google_taipei.jpg'
import {MailOutlined} from "@ant-design/icons";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.profile_info}>
            <h1>
              <Space split={'/'}>
                <Space>
                  <strong>Chang Wei</strong>
                  <Tag>en</Tag>
                </Space>
                <Space>
                  <strong>昌维</strong>
                  <Tag>zh-Hans</Tag>
                </Space>
                <Space>
                  <strong>昌維</strong>
                  <Tag>zh-Hant</Tag>
                </Space>
              </Space>
            </h1>
            <table className={styles.profile_info_list}>
              <tbody>
                <tr className={styles.profile_info_list_item}>
                  <td className={styles.profile_info_list_item_key}>Birthday:</td>
                  <td className={styles.profile_info_list_item_value}>1997/10/06</td>
                </tr>
                <tr className={styles.profile_info_list_item}>
                  <td className={styles.profile_info_list_item_key}>Major:</td>
                  <td className={styles.profile_info_list_item_value}>Electrical and Computer Engineering</td>
                </tr>
                <tr className={styles.profile_info_list_item}>
                  <td className={styles.profile_info_list_item_key}>School:</td>
                  <td className={styles.profile_info_list_item_value}>NTUST(National Taiwan University of Science and Technology)</td>
                </tr>
                <tr className={styles.profile_info_list_item}>
                  <td className={styles.profile_info_list_item_key}>Work:</td>
                  <td className={styles.profile_info_list_item_value}>RisingWave Labs (Web Front-End Engineer)</td>
                </tr>
              </tbody>
            </table>
            <div>
              <MailOutlined/> Email: changwei1006@gmail.com
            </div>
            <div>
              <MailOutlined/> Email (Chinese mainland): changwei1006@qq.com
            </div>
          </div>
          
          <div className={styles.profile_photo}>
            <img src={photo_image.src} alt={'Chang Wei at Google Taipei office'} width={256}/>
          </div>
        </div>
        
        <div className={styles.skill}>
          <Space>
            {[
              {name: 'TypeScript',},
              {name: 'Sass',},
              {name: 'React',},
              {name: 'Vue',},
              {name: 'Webpack',},
              {name: 'Glup',},
            ].map((item) => (
              <div key={item.name}>{item.name}</div>
            ))}
          </Space>
        </div>
      </main>
      
      <footer>
        <div>
          <PoweredByVercel/>
        </div>
      </footer>
    </div>
  );
}

const PoweredByVercel = () => {
  return (
    <Space align={'center'}>
      Powered By
      <OutsideLink className={styles.logo} href={'https://vercel.com'}>
        <Image
          src={require('./icons/vercel.svg')}
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
          src={require('./icons/next.svg')}
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
