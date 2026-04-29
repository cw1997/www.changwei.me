"use client"

import photo_image from "./changwei_at_google_taipei.jpg"
import {Now} from "./Now"
import {OutsideLink} from "@/components/OutsideLink"
import {
  Camera,
  Clock,
  Mail,
  MapPin,
} from "lucide-react"
import {useTranslations} from "next-intl"
import React from "react"
import Image from "next/image"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"

function getProfileRows(t: (key: string) => string) {
  return [
    {rowKey: "birthday", label: t("birthday"), value: t("birthdayValue")},
    {
      rowKey: "location",
      label: t("location"),
      value: (
        <OutsideLink href="https://www.google.com/maps/place/Da%E2%80%99an+District,+Taipei+City,+106/@25.026306,121.5232035,14z/data=!3m1!4b1!4m6!3m5!1s0x3442aa2c1969f84d:0x6ea0b5cbf2d9955d!8m2!3d25.0249441!4d121.5433783!16zL20vMDJfNDY3?entry=ttu">
          {t("locationValue")}
        </OutsideLink>
      ),
    },
    {
      rowKey: "homeplace",
      label: t("homeplace"),
      value: (
        <OutsideLink href="https://map.baidu.com/search/%E5%90%89%E5%B7%9E%E5%8C%BA/@12789893.52945679,3124670.185,12.7z?querytype=s&da_src=shareurl&wd=%E5%90%89%E5%B7%9E%E5%8C%BA&c=9002&src=0&wd2=%E5%90%89%E5%AE%89%E5%B8%82%E5%90%89%E5%B7%9E%E5%8C%BA&pn=0&sug=1&l=15&b=(13523606.739607658,2856687.76226769;13540382.739607658,2863967.76226769)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&sug_forward=fb92f2f75515957842afe6c6&device_ratio=1">
          {t("homeplaceValue")}
        </OutsideLink>
      ),
    },
    {
      rowKey: "major",
      label: t("majorDegree"),
      value: (
        <OutsideLink href="https://www.ace.ntnu.edu.tw/">
          {t("majorValue")}
        </OutsideLink>
      ),
    },
    {
      rowKey: "school",
      label: t("school"),
      value: (
        <OutsideLink href="https://www.ntnu.edu.tw/">
          {t("schoolValue")}
        </OutsideLink>
      ),
    },
    {
      rowKey: "timezone",
      label: t("timezone"),
      value: (
        <>
          <OutsideLink href="https://timezonedb.com/time-zones/Asia/Taipei">
            Asia/Taipei (UTC+08:00)
          </OutsideLink>
          , <Now />
        </>
      ),
    },
    {
      rowKey: "language",
      label: t("language"),
      value: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">zh-Hans-CN</Badge>
            <span>{t("langHans")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">zh-Hant-TW</Badge>
            <span>{t("langHant")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">en</Badge>
            <span>{t("langEnLabel")}</span>
          </div>
        </div>
      ),
    },
  ]
}

function PhotoPlaceValue({t}: {t: (key: string) => string}) {
  const parts = t("photoPlaceLines").split(" | ").map((s) => s.trim())
  return (
    <OutsideLink href="https://www.google.com/maps/place/Google+Taipei/@25.0339808,121.561964,17z/data=!3m1!4b1!4m6!3m5!1s0x3442abb6da80a7ad:0xdfbc764cc6880ac8!8m2!3d25.033976!4d121.5645389!16s%2Fg%2F12ll42d15?entry=ttu">
      {parts.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </OutsideLink>
  )
}

function PhotoExifValue({t}: {t: (key: string) => string}) {
  const parts = t("photoExifValue").split(" | ").map((s) => s.trim())
  return (
    <>
      {parts.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </>
  )
}

export interface IPropsSkillSection {}

export const ProfileSection: React.FunctionComponent<IPropsSkillSection> = () => {
  const t = useTranslations("profile")
  const profile = getProfileRows(t)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-start gap-3 border-b border-slate-200 pb-4">
          <div className="text-sm text-slate-500">{t("trueName")}</div>
          <h1 className="text-2xl font-light text-slate-900">
            <div className="flex flex-wrap items-start gap-6 text-base">
              <div>
                <div className="text-sm text-slate-500">[tʃɑŋ weɪ]</div>
                <div className="mt-1 flex items-center gap-2">
                  <strong className="font-semibold text-slate-900">Chang, Wei</strong>
                  <Badge variant="outline">en</Badge>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <div className="text-sm text-slate-500">Chāng Wéi</div>
                <div className="mt-1 flex items-center gap-2">
                  <strong className="font-semibold text-slate-900">昌维</strong>
                  <Badge variant="outline">zh-Hans</Badge>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <div className="text-sm text-slate-500">ㄔㄤ ㄨㄟˊ</div>
                <div className="mt-1 flex items-center gap-2">
                  <strong className="font-semibold text-slate-900">昌維</strong>
                  <Badge variant="outline">zh-Hant</Badge>
                </div>
              </div>
            </div>
          </h1>
        </div>

        <table className="hidden w-full text-sm text-slate-600 md:table">
          <tbody>
            {profile.map((item) => (
              <tr key={item.rowKey}>
                <td className="w-40 py-2 pr-4 text-right text-slate-500">
                  {item.label}:
                </td>
                <td className="py-2 text-slate-700">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-4 md:hidden">
          {profile.map((item) => (
            <div key={item.rowKey}>
              <div className="text-sm text-slate-500">{item.label}:</div>
              <div className="mt-1 text-sm text-slate-700">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> {t("emailGlobal")}:
            <a href="mailto:changwei1006@gmail.com">changwei1006@gmail.com</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> {t("emailChina")}:
            <a href="mailto:changwei1006@qq.com">changwei1006@qq.com</a>
          </div>
        </div>

        <div className="border-t border-dashed border-slate-200 pt-4 text-sm text-slate-600">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="h-4 w-4" /> {t("addressEnLabel")}
              </div>
              <div className="pl-6">
                <OutsideLink href="https://maps.app.goo.gl/nXxbx9iaARZxa5hEA">
                  {t("addressEnValue")}
                </OutsideLink>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="h-4 w-4" /> {t("addressZhLabel")}
              </div>
              <div className="pl-6">
                <OutsideLink href="https://maps.app.goo.gl/nXxbx9iaARZxa5hEA">
                  {t("addressZhValue")}
                </OutsideLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <Image
          src={photo_image}
          alt={t("photoAlt")}
          width={photo_image.width}
          height={photo_image.height}
          className="h-auto w-full object-cover"
        />
        <div className="px-6 py-3 text-center text-sm text-slate-500">
          {t("photoDescription")}
        </div>
        <div className="px-6 pb-5 text-sm text-slate-600">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-32 py-2 pr-3 text-right text-slate-500">
                  <Clock className="inline h-4 w-4" /> {t("datetime")}
                </td>
                <td className="py-2">{t("photoDatetimeValue")}</td>
              </tr>
              <tr>
                <td className="w-32 py-2 pr-3 text-right text-slate-500">
                  <MapPin className="inline h-4 w-4" /> {t("photoLocation")}
                </td>
                <td className="py-2">
                  <PhotoPlaceValue t={t} />
                </td>
              </tr>
              <tr>
                <td className="w-32 py-2 pr-3 text-right text-slate-500">
                  <Camera className="inline h-4 w-4" /> {t("exif")}
                </td>
                <td className="py-2">
                  <PhotoExifValue t={t} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
