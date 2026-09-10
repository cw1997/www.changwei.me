"use client"

import {CalendarOutlined, MailOutlined} from "@ant-design/icons"
import {
  Button,
  ConfigProvider,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Space,
} from "antd"
import dayjs from "dayjs"
import type {Dayjs} from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/zh-cn"
import "dayjs/locale/zh-tw"
import enUS from "antd/locale/en_US"
import zhCN from "antd/locale/zh_CN"
import zhTW from "antd/locale/zh_TW"
import {useLocale, useTranslations} from "next-intl"
import React, {useCallback, useEffect, useState} from "react"
import styles from "./page.module.sass"

const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&showPrint=0&src=Y2hhbmd3ZWkxMDA2QGdtYWlsLmNvbQ&src=MzdiY2Q1MjRhMWMwZjcwMDQ4YzVlNDUxZDEwNDRlZmQ1YTc3ZTA0YmM4NWE3YTg2MDg0ZGM3MWY1MGMzMDlmN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MGI2NzlmNHZyZmpiY3E4OTJlODNraGVxZjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZThzOW90cWtjcmVsOWo5dHFtNHAwMDc1bHE3c3JoNWdAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bGlicmVmNjE5NkBnbWFpbC5jb20&src=ZjYxMjFlMDU2NTg3ODM4NzI5YWQ4NDBhNmM0YzcxYTE3Yzg5MjAwYTc1MWJlOGNjNjQ5MGJhNzVmMTFjNDc1YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=emgtY24uY2hpbmEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=emgtdHcudGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=b3U2N2tucWFqNXNxODMzdXRpN2JhNmJraHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZmE1ODlpdGg0Zm85MDFvOWxjdDQ2NGZncDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=Y185ZWYyZGRiMzY0ZTU4ZWE1MWUyZDcxNjhkNjYxNWExNTE1Yzg2NzBkOTM0NTE5NWI5NjliODZkNzJhNGI3NGY4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=MnI1ZWZuNDZuMzRoNm9tN3NtMjVtaWQ4ZThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=YjRvc211NTdqZzlwOXU1dTZ2NWF1Zm0wbDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ODcxbTc1MHN1b212NTY3NXNqZnA4cHU3cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZmdzNzcwNGp0YTIwcGZqY21rb2txY2J1cmtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aDlnbHR0ZDVjM2YwZW9xMGd0Mmhrc3Y2NGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=amlqZHJvcjJhbmRrdmtpNWU4YmoyanUzdGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=emgtY24uaG9uZ19rb25nI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%239e69af&color=%237986cb&color=%23f6bf26&color=%230b8043&color=%23a79b8e&color=%23c0ca33&color=%230b8043&color=%234285f4&color=%233f51b5&color=%23009688&color=%23d81b60&color=%23f6bf26&color=%23d50000&color=%237cb342&color=%23a79b8e&color=%238e24aa&color=%23e67c73&color=%23f4511e"

const BOOK_URL = "https://calendar.app.google/ks4sRpiehtRuQW3q6"

type AppLocale = "en-US" | "zh-Hans" | "zh-Hant"
type RequestLanguage = "zh-Hant" | "zh-Hans" | "en"
type Recipient = "gmail" | "qq"

const RECIPIENT_EMAILS: Record<Recipient, string> = {
  gmail: "changwei1006@gmail.com",
  qq: "changwei1006@qq.com",
}

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm"
const TIME_FORMAT = "HH:mm"

const dayjsLocaleByAppLocale: Record<AppLocale, string> = {
  "en-US": "en",
  "zh-Hans": "zh-cn",
  "zh-Hant": "zh-tw",
}

const antdLocaleByAppLocale: Record<AppLocale, typeof enUS> = {
  "en-US": enUS,
  "zh-Hans": zhCN,
  "zh-Hant": zhTW,
}

export default function CalendarPage(_props: PageProps<"/[locale]/calendar">) {
  const t = useTranslations("calendar")
  const tr = useTranslations("calendarRequest")
  const locale = useLocale()

  const appLocale: AppLocale =
    locale === "zh-Hans" || locale === "zh-Hant" ? locale : "en-US"

  const [requestOpen, setRequestOpen] = useState(false)
  const [language, setLanguage] = useState<RequestLanguage>("zh-Hant")
  const [form] = Form.useForm()

  useEffect(() => {
    dayjs.locale(dayjsLocaleByAppLocale[appLocale])
  }, [appLocale])

  const openBook = useCallback(() => {
    window.open(BOOK_URL, "_blank", "noopener,noreferrer")
  }, [])

  const languageItems = [
    {
      key: "zh-Hant" as const,
      value: "zh-Hant" as const,
      label: tr("languageZHT"),
    },
    {
      key: "zh-Hans" as const,
      value: "zh-Hans" as const,
      label: tr("languageZHS"),
    },
    {key: "en" as const, value: "en" as const, label: tr("languageEN")},
  ]

  const syncEndTime = (
    startTime: Dayjs | null | undefined,
    duration: number | null | undefined,
  ) => {
    if (startTime && duration) {
      form.setFieldValue("endTime", startTime.add(duration, "minute"))
    }
  }

  const handleStartTimeChange = (value: Dayjs | null) => {
    syncEndTime(value, form.getFieldValue("duration"))
  }

  const handleDurationChange = (value: number | null) => {
    syncEndTime(form.getFieldValue("startTime"), value)
  }

  const handleEndTimeChange = (value: Dayjs | null) => {
    const startTime = form.getFieldValue("startTime") as Dayjs | undefined
    if (startTime && value) {
      const diffMinutes = Math.round(value.diff(startTime, "minute", true))
      form.setFieldValue("duration", Math.max(0, diffMinutes))
    }
  }

  const endTimeValidator = (_rule: unknown, value: unknown) => {
    const startTime = form.getFieldValue("startTime") as Dayjs | undefined
    const endTime = value as Dayjs | undefined
    if (startTime && endTime && endTime.isBefore(startTime)) {
      return Promise.reject(new Error(tr("endTimeError")))
    }
    return Promise.resolve()
  }

  const handleSubmit = async () => {
    let values: {
      recipient: Recipient
      startTime: Dayjs
      endTime: Dayjs
      duration: number
      subject: string
      location: string
    }
    try {
      values = await form.validateFields()
    } catch {
      return
    }
    const startText = values.startTime.format(DATE_TIME_FORMAT)
    const endText = values.endTime.format(DATE_TIME_FORMAT)
    const durationText = `${values.duration} ${tr("messageMinute")}`
    const body = [
      `${tr("messageGreeting")}\n${tr("messageIntro")}`,
      `- ${tr("messageStartTime")}: ${startText}`,
      `- ${tr("messageEndTime")}: ${endText}`,
      `- ${tr("messageDuration")}: ${durationText}`,
      `- ${tr("messageSubject")}: ${values.subject}`,
      `- ${tr("messageLocation")}: ${values.location}`,
      "",
      tr("messageClosing"),
      tr("messageSignOff"),
    ].join("\n")
    const mailto = `mailto:${RECIPIENT_EMAILS[values.recipient]}?subject=${encodeURIComponent(
      tr("mailTitle"),
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setRequestOpen(false)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("pageTitle")}</h2>
        <Divider />
        <Space className={styles.toolbar}>
          <Button
            className={styles.book_button}
            type={"primary"}
            icon={<CalendarOutlined />}
            onClick={openBook}
          >
            {t("book")}
          </Button>
          <Dropdown
            menu={{
              items: languageItems,
              onClick: ({key}) => {
                setLanguage(key as RequestLanguage)
                setRequestOpen(true)
              },
            }}
            trigger={["click"]}
          >
            <Button className={styles.request_button} icon={<MailOutlined />}>
              {tr("title")}
            </Button>
          </Dropdown>
        </Space>
        <div className={styles.iframe_wrap}>
          <iframe
            style={{width: "100%", height: 1280}}
            src={GOOGLE_CALENDAR_EMBED_URL}
            title={t("pageTitle")}
            // width="100%"
            // height="600"
            loading="lazy"
            // scrolling="no"
          />
        </div>
      </main>

      <Modal
        className={styles.request_modal}
        title={tr("title")}
        open={requestOpen}
        onCancel={() => setRequestOpen(false)}
        onOk={handleSubmit}
        okText={tr("submitLabel")}
        cancelText={tr("cancelLabel")}
        destroyOnHidden
      >
        <ConfigProvider locale={antdLocaleByAppLocale[appLocale]}>
          <Form
            form={form}
            layout="vertical"
            preserve={false}
            initialValues={{recipient: "gmail" as Recipient}}
          >
            <Form.Item label={tr("languageLabel")}>
              <Radio.Group
                value={language}
                onChange={(e) => setLanguage(e.target.value as RequestLanguage)}
                options={languageItems}
              />
            </Form.Item>
            <Form.Item name="recipient" label={tr("recipientLabel")}>
              <Radio.Group
                options={[
                  {label: tr("recipientGmail"), value: "gmail"},
                  {label: tr("recipientQQ"), value: "qq"},
                ]}
              />
            </Form.Item>
            <Form.Item
              name="startTime"
              label={tr("startTimeLabel")}
              rules={[{required: true, message: tr("startTimeLabel")}]}
            >
              <DatePicker
                showTime={{format: TIME_FORMAT}}
                format={DATE_TIME_FORMAT}
                needConfirm={false}
                onChange={handleStartTimeChange}
              />
            </Form.Item>
            <Form.Item
              name="duration"
              label={tr("durationLabel")}
              initialValue={30}
              rules={[{required: true, message: tr("durationLabel")}]}
            >
              <InputNumber
                min={15}
                max={480}
                step={15}
                addonAfter={tr("messageMinute")}
                onChange={handleDurationChange}
              />
            </Form.Item>
            <Form.Item
              name="endTime"
              label={tr("endTimeLabel")}
              extra={tr("endTimeHelp")}
              rules={[
                {required: true, message: tr("endTimeLabel")},
                {validator: endTimeValidator},
              ]}
            >
              <DatePicker
                showTime={{format: TIME_FORMAT}}
                format={DATE_TIME_FORMAT}
                needConfirm={false}
                onChange={handleEndTimeChange}
              />
            </Form.Item>
            <Form.Item
              name="subject"
              label={tr("subjectLabel")}
              rules={[{required: true, message: tr("subjectLabel")}]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="location"
              label={tr("locationLabel")}
              extra={tr("locationHelp")}
              rules={[{required: true, message: tr("locationLabel")}]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  )
}
