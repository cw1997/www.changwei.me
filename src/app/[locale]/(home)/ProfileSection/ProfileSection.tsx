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
import {getTranslations} from "next-intl/server"
import React from "react"
import styles from "./ProfileSection.module.sass"

export interface IPropsSkillSection {}

export async function ProfileSection(props: IPropsSkillSection) {
  const t = await getTranslations("profile")

  const profile: {key: string; value: React.ReactNode}[] = [
    {
      key: t("keys.birthday"),
      value: t("values.birthday"),
    },
    {
      key: t("keys.location"),
      value: (
        <OutsideLink
          href={
            "https://www.google.com/maps/place/Da%E2%80%99an+District,+Taipei+City,+106/@25.026306,121.5232035,14z/data=!3m1!4b1!4m6!3m5!1s0x3442aa2c1969f84d:0x6ea0b5cbf2d9955d!8m2!3d25.0249441!4d121.5433783!16zL20vMDJfNDY3?entry=ttu"
          }
        >
          {t("values.location")}
        </OutsideLink>
      ),
    },
    {
      key: t("keys.homeplace"),
      value: (
        <OutsideLink
          href={
            "https://map.baidu.com/search/%E5%90%89%E5%B7%9E%E5%8C%BA/@12789893.52945679,3124670.185,12.7z?querytype=s&da_src=shareurl&wd=%E5%90%89%E5%B7%9E%E5%8C%BA&c=9002&src=0&wd2=%E5%90%89%E5%AE%89%E5%B8%82%E5%90%89%E5%B7%9E%E5%8C%BA&pn=0&sug=1&l=15&b=(13523606.739607658,2856687.76226769;13540382.739607658,2863967.76226769)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&sug_forward=fb92f2f75515957842afe6c6&device_ratio=1"
          }
        >
          {t("values.homeplace")}
        </OutsideLink>
      ),
    },
    {
      key: t("keys.major"),
      value: (
        <OutsideLink href={"https://www.ace.ntnu.edu.tw/"}>
          {t("values.major")}
        </OutsideLink>
      ),
    },
    {
      key: t("keys.school"),
      value: (
        <OutsideLink href={"https://www.ntnu.edu.tw/"}>
          {t("values.school")}
        </OutsideLink>
      ),
    },
    {
      key: t("keys.timezone"),
      value: (
        <>
          <OutsideLink href={"https://timezonedb.com/time-zones/Asia/Taipei"}>
            {t("values.timezoneSuffix")}
          </OutsideLink>
          , <Now />
        </>
      ),
    },
    {
      key: t("keys.language"),
      value: (
        <Space orientation={"vertical"}>
          <div>
            <Tag>zh-Hans-CN</Tag>
            <span>
              {t("language.hansLabel")}（{t("language.hansRegion")}）
            </span>
          </div>
          <div>
            <Tag>zh-Hant-TW</Tag>
            <span>
              {t("language.hantLabel")}（{t("language.hantRegion")}）
            </span>
          </div>
          <div>
            <Tag>en</Tag>
            <span>{t("language.en")}</span>
          </div>
        </Space>
      ),
    },
  ]

  return (
    <div className={styles.profile}>
      <div className={styles.profile_info}>
        <Space className={styles.profile_info_name} wrap>
          <div className={styles.profile_info_name_key}>{t("trueName")}</div>
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
        <div className={styles.profile_contact}>
          <Space
            className={styles.profile_contact_list}
            separator={<Divider orientation={"vertical"} />}
          >
            <div className={styles.profile_contact_list_item}>
              <span className={styles.profile_contact_list_item_key}>
                <MailOutlined /> {t("emailGlobal")}{" "}
              </span>
              <span className={styles.profile_contact_list_item_value}>
                <a href={"mailto:changwei1006@gmail.com"}>
                  changwei1006@gmail.com
                </a>
              </span>
            </div>
            <div className={styles.profile_contact_list_item}>
              <span className={styles.profile_contact_list_item_key}>
                <MailOutlined /> {t("emailCn")}{" "}
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
            orientation={"vertical"}
            wrap
          >
            <div className={styles.profile_location_list_item}>
              <div className={styles.profile_location_list_item_key}>
                <EnvironmentOutlined /> {t("addressEn")}{" "}
              </div>
              <div className={styles.profile_location_list_item_value}>
                <OutsideLink href={"https://maps.app.goo.gl/nXxbx9iaARZxa5hEA"}>
                  {t("values.addressEn")}
                </OutsideLink>
              </div>
            </div>
            <div className={styles.profile_location_list_item}>
              <div className={styles.profile_location_list_item_key}>
                <EnvironmentOutlined /> {t("addressZh")}{" "}
              </div>
              <div className={styles.profile_location_list_item_value}>
                <OutsideLink href={"https://maps.app.goo.gl/nXxbx9iaARZxa5hEA"}>
                  {t("values.addressZh")}
                </OutsideLink>
              </div>
            </div>
          </Space>
        </div>
      </div>

      <div className={styles.profile_photo}>
        <Image
          rootClassName={styles.profile_photo_image}
          src={photo_image.src}
          alt={t("photoAlt")}
        />
        <div className={styles.profile_photo_description}>
          {t("photoCaption")} <br />
        </div>
        <div className={styles.profile_photo_info}>
          <table className={styles.profile_photo_info_list}>
            <tbody>
              <tr className={styles.profile_photo_info_list_item}>
                <td className={styles.profile_photo_info_list_item_key}>
                  <ClockCircleOutlined /> {t("photoDatetime")}
                </td>
                <td className={styles.profile_photo_info_list_item_value}>
                  {t("photoDatetimeValue")}
                </td>
              </tr>
              <tr className={styles.profile_photo_info_list_item}>
                <td className={styles.profile_photo_info_list_item_key}>
                  <EnvironmentOutlined /> {t("photoLocation")}
                </td>
                <td className={styles.profile_photo_info_list_item_value}>
                  <OutsideLink
                    href={
                      "https://www.google.com/maps/place/Google+Taipei/@25.0339808,121.561964,17z/data=!3m1!4b1!4m6!3m5!1s0x3442abb6da80a7ad:0xdfbc764cc6880ac8!8m2!3d25.033976!4d121.5645389!16s%2Fg%2F12ll42d15?entry=ttu"
                    }
                  >
                    {t("values.photoLocation")}
                  </OutsideLink>
                </td>
              </tr>
              <tr className={styles.profile_photo_info_list_item}>
                <td className={styles.profile_photo_info_list_item_key}>
                  <CameraOutlined /> {t("photoExif")}
                </td>
                <td className={styles.profile_photo_info_list_item_value}>
                  {t("values.photoExif")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
