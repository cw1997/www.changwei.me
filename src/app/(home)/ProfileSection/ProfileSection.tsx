import photo_image from "./changwei_at_google_taipei.jpg"
import {Now} from "./Now"
import {OutsideLink} from "@/components/OutsideLink"
import {
  CameraOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons"
import {Divider, Space, Tag, Image} from "antd"
import React from "react"
import styles from "./ProfileSection.module.sass"

const profile = [
  {
    key: "Birthday",
    value: "1997/10/06 UTC+08:00 (CST, China Standard Time)",
  },
  {
    key: "Location",
    value: (
      <OutsideLink
        href={
          "https://www.google.com/maps/place/Da%E2%80%99an+District,+Taipei+City,+106/@25.026306,121.5232035,14z/data=!3m1!4b1!4m6!3m5!1s0x3442aa2c1969f84d:0x6ea0b5cbf2d9955d!8m2!3d25.0249441!4d121.5433783!16zL20vMDJfNDY3?entry=ttu"
        }
      >
        {"Taiwan (+886), Taipei City, Da'an District (臺灣臺北市大安區)"}
      </OutsideLink>
    ),
  },
  {
    key: "Homeplace",
    value: (
      <OutsideLink
        href={
          "https://map.baidu.com/search/%E5%90%89%E5%B7%9E%E5%8C%BA/@12789893.52945679,3124670.185,12.7z?querytype=s&da_src=shareurl&wd=%E5%90%89%E5%B7%9E%E5%8C%BA&c=9002&src=0&wd2=%E5%90%89%E5%AE%89%E5%B8%82%E5%90%89%E5%B7%9E%E5%8C%BA&pn=0&sug=1&l=15&b=(13523606.739607658,2856687.76226769;13540382.739607658,2863967.76226769)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&sug_forward=fb92f2f75515957842afe6c6&device_ratio=1"
        }
      >
        {
          "Chinese mainland (+86), JiangXi Province, Ji'an City, Ji'zhou District (江西省吉安市吉州区)"
        }
      </OutsideLink>
    ),
  },
  {
    key: "Major & Degree",
    value: (
      <OutsideLink href={"https://www.ace.ntnu.edu.tw/"}>
        Department of Adult and Continuing Education, Ph.D. (社會教育學系博士班)
      </OutsideLink>
    ),
  },
  {
    key: "School",
    value: (
      <OutsideLink href={"https://www.ntnu.edu.tw/"}>
        National Taiwan Normal University (NTNU, 國立臺灣師範大學)
      </OutsideLink>
    ),
  },
  /*{
    key: "Work",
    value: (
      <>
        <OutsideLink href={"https://risingwave.com"}>
          RisingWave Labs
        </OutsideLink>{" "}
        (Web Front-End Engineer)
      </>
    ),
  },*/
  {
    key: "Timezone",
    value: (
      <>
        <OutsideLink href={"https://timezonedb.com/time-zones/Asia/Taipei"}>
          Asia/Taipei (UTC+08:00)
        </OutsideLink>, <Now />
      </>
    ),
  },
  {
    key: "Language",
    value: (
      <Space direction={"vertical"}>
        <div>
          <Tag>zh-Hans-CN</Tag>
          <span>Chinese (Simplified Han) 简体中文（中国大陆）</span>
        </div>
        <div>
          <Tag>zh-Hant-TW</Tag>
          <span>Chinese (Traditional Han) 繁體中文/正體中文（臺灣）</span>
        </div>
        <div>
          <Tag>en</Tag>
          <span>English</span>
        </div>
      </Space>
    ),
  },
] as const

export interface IPropsSkillSection {}

export const ProfileSection: React.FunctionComponent<IPropsSkillSection> = (
  props,
) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_info}>
        <Space className={styles.profile_info_name} wrap>
          <div className={styles.profile_info_name_key}>True Name:</div>
          <h1 className={styles.profile_info_name_value}>
            <Space separator={"/"} wrap>
              <div>
                <div className={styles.pronounce}>[tʃɑŋ weɪ]</div>
                <Space>
                  <strong>Chang, Wei</strong>
                  <Tag>en</Tag>
                </Space>
              </div>
              <div>
                <div className={styles.pronounce}>Chāng Wéi</div>
                <Space>
                  <strong>昌维</strong>
                  <Tag>zh-Hans</Tag>
                </Space>
              </div>
              <div>
                <div className={styles.pronounce}>ㄔㄤ ㄨㄟˊ</div>
                <Space>
                  <strong>昌維</strong>
                  <Tag>zh-Hant</Tag>
                </Space>
              </div>
              {/*<Space>
                <strong>Chāng Wéi</strong>
                <Tag>Pinyin</Tag>
              </Space>
              <Space>
                <strong>ㄔㄤ ㄨㄟˊ</strong>
                <Tag>注音</Tag>
              </Space>*/}
            </Space>
          </h1>
        </Space>
        <table className={styles.profile_info_list}>
          <tbody className={styles.profile_info_list_desktop}>
            {profile.map((item) => (
              <tr
                key={item.key}
                className={styles.profile_info_list_desktop_item}
              >
                <td className={styles.profile_info_list_desktop_item_key}>
                  {item.key}:
                </td>
                <td className={styles.profile_info_list_desktop_item_value}>
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
          <tbody className={styles.profile_info_list_mobile}>
            {profile.map((item) => (
              <React.Fragment key={item.key}>
                <tr className={styles.profile_info_list_mobile_item}>
                  <td className={styles.profile_info_list_mobile_item_key}>
                    {item.key}:
                  </td>
                </tr>
                <tr className={styles.profile_info_list_mobile_item}>
                  <td className={styles.profile_info_list_mobile_item_value}>
                    {item.value}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {/*<div className={styles.profile_info_intro}>*/}
        {/*  <div className={styles.profile_info_intro_key}>*/}
        {/*    Introduction*/}
        {/*  </div>*/}
        {/*  <div className={styles.profile_info_intro_value}>*/}
        {/*  Chang Wei*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={styles.profile_contact}>
          <Space
            className={styles.profile_contact_list}
            separator={<Divider orientation={"vertical"} />}
          >
            <div className={styles.profile_contact_list_item}>
              <span className={styles.profile_contact_list_item_key}>
                <MailOutlined /> Email (Global):{" "}
              </span>
              <span className={styles.profile_contact_list_item_value}>
                <a href={"mailto:changwei1006@gmail.com"}>
                  changwei1006@gmail.com
                </a>
              </span>
            </div>
            <div className={styles.profile_contact_list_item}>
              <span className={styles.profile_contact_list_item_key}>
                <MailOutlined /> Email (中国大陆):{" "}
              </span>
              <span className={styles.profile_contact_list_item_value}>
                <a href={"mailto:changwei1006@qq.com"}>changwei1006@qq.com</a>
              </span>
            </div>
          </Space>
        </div>
        <div className={styles.profile_location}>
          <Space
            className={styles.profile_location_list}
            direction={"vertical"}
            wrap
          >
            <div className={styles.profile_location_list_item}>
              <div className={styles.profile_location_list_item_key}>
                <EnvironmentOutlined /> Address (English) (Accept package and mail[postcard exchange is available]):{" "}
              </div>
              <div className={styles.profile_location_list_item_value}>
                <OutsideLink href={"https://maps.app.goo.gl/nXxbx9iaARZxa5hEA"}>
                  {
                    "No. 9, Shida Rd., Da'an Dist., Taipei City 106311, Taiwan (R.O.C.)"
                  }
                </OutsideLink>
              </div>
            </div>
            <div className={styles.profile_location_list_item}>
              <div className={styles.profile_location_list_item_key}>
                <EnvironmentOutlined /> Address (中文) (接受物品包裹和信封[明信片交換可使用該地址]):{" "}
              </div>
              <div className={styles.profile_location_list_item_value}>
                <OutsideLink href={"https://maps.app.goo.gl/nXxbx9iaARZxa5hEA"}>
                  106311 臺北市大安區師大路 9 號
                </OutsideLink>
              </div>
            </div>
          </Space>
        </div>
      </div>

      <div className={styles.profile_photo}>
        {/*<OutsideLink href={photo_image.src}>*/}
        <Image
          rootClassName={styles.profile_photo_image}
          src={photo_image.src}
          alt={"Chang Wei at Google Taipei office"}
        />
        {/*</OutsideLink>*/}
        <div className={styles.profile_photo_description}>
          Chang Wei attended to the event {"<"}GDG Cloud Taipei AI Techtalk: Meet Google Cloud DevRel Team{">"} at Google Taipei office in TAIPEI 101. <br />
          {/*This photo was taken on Tuesday, June 11, at the Taipei 101 14F (visitor center of Google Taipei office)*/}
        </div>
        <div className={styles.profile_photo_info}>
          <table className={styles.profile_photo_info_list}>
            <tbody>
              <tr className={styles.profile_photo_info_list_item}>
                <td className={styles.profile_photo_info_list_item_key}>
                  <ClockCircleOutlined /> Datetime:
                </td>
                <td className={styles.profile_photo_info_list_item_value}>
                  June 11, 2024, Tuesday 21:11
                </td>
              </tr>
              <tr className={styles.profile_photo_info_list_item}>
                <td className={styles.profile_photo_info_list_item_key}>
                  <EnvironmentOutlined /> Location:
                </td>
                <td className={styles.profile_photo_info_list_item_value}>
                  <OutsideLink
                    href={
                      "https://www.google.com/maps/place/Google+Taipei/@25.0339808,121.561964,17z/data=!3m1!4b1!4m6!3m5!1s0x3442abb6da80a7ad:0xdfbc764cc6880ac8!8m2!3d25.033976!4d121.5645389!16s%2Fg%2F12ll42d15?entry=ttu"
                    }
                  >
                    Taiwan (+886), Taipei City (106), Xinyi District, <br />
                    Taipei 101 14F (visitor center of Google Taipei office){" "}<br />
                    (25.033487,121.564922)
                  </OutsideLink>
                </td>
              </tr>
              <tr className={styles.profile_photo_info_list_item}>
                <td className={styles.profile_photo_info_list_item_key}>
                  <CameraOutlined /> EXIF:
                </td>
                <td className={styles.profile_photo_info_list_item_value}>
                  Xiaomi 12S Ultra (Sony IMX989) <br />
                  f/1.9 1/90s ISO 945 8.7mm (Equivalent focal length 23mm) No-flash
                </td>
              </tr>
              {/*<tr className={styles.profile_photo_info_list_item}>*/}
              {/*  <td className={styles.profile_photo_info_list_item_key}>Note:</td>*/}
              {/*  <td className={styles.profile_photo_info_list_item_value}>*/}
              {/*    GDG events*/}
              {/*  </td>*/}
              {/*</tr>*/}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
