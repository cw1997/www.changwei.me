"use client"

import {SendOutlined} from "@ant-design/icons"
import {Turnstile, type TurnstileInstance} from "@marsidev/react-turnstile"
import {Button, Checkbox, Col, Form, Input, Modal, Row, Space, Spin} from "antd"
import React, {useEffect, useRef, useState} from "react"
import {mutate} from "swr"

export interface IPropsGuestbookInput {
  // onSubmit: () => void
}

export const GuestbookInput: React.FunctionComponent<IPropsGuestbookInput> = (
  props,
) => {
  const [form] = Form.useForm()
  const resetForm = () => {
    form.setFieldValue("name", "")
    form.setFieldValue("email", "")
    form.setFieldValue("website", "")
    form.setFieldValue("content", "")
    form.setFieldValue("private", false)
    form.setFieldValue("hide_name", false)
    form.setFieldValue("hide_email", false)
    form.setFieldValue("hide_website", false)
  }
  useEffect(() => {
    resetForm()
  }, [resetForm])

  const [loading, setLoading] = useState(false)

  const turnstile_ref = useRef<TurnstileInstance>(null)
  const [turnstile_token, setTurnstile_token] = useState("")

  // form.validateFields((err, values) => {})
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const result = await fetch("/api/guestbook/submit", {
        method: "POST",
        body: JSON.stringify({
          name: form.getFieldValue("name"),
          email: form.getFieldValue("email"),
          website: form.getFieldValue("website"),
          content: form.getFieldValue("content"),
          private: form.getFieldValue("private"),
          hide_name: form.getFieldValue("hide_name"),
          hide_email: form.getFieldValue("hide_email"),
          hide_website: form.getFieldValue("hide_website"),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          turnstile_token,
        }),
      })
      const json = await result.json()
      if (result.ok) {
        // props.onSubmit?.()
        await mutate(["guestbook/list", 0, 20])
        Modal.success({
          title: "Submit successful",
          content: "You submit the content to the guestbook successful!",
        })
        // form.resetFields()
        resetForm()
      } else {
        Modal.error({title: "Submit failed", content: await json.error.message})
      }
    } catch (error) {
      Modal.error({
        title: "System error",
        content:
          "Occur error while submitting content to the guestbook, please try again later.",
      })
    } finally {
      // alert('window.turnstile.isExpired(turnstile_widget_id.current):' + window.turnstile.isExpired(turnstile_widget_id.current))
      /*if (window.turnstile.isExpired(turnstile_widget_id.current)) {
        console.debug('[DEBUG] turnstile turnstile_token is expired')
        window.turnstile.reset(turnstile_widget_id.current)
      }*/
      turnstile_ref.current?.reset()
      setLoading(false)
    }
  }

  return (
    <Spin spinning={loading}>
      <Form form={form}>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={"Name"} name={"name"} required>
              <Input style={{width: "100%"}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={"Email"} name={"email"}>
              <Input style={{width: "100%"}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={"Website"} name={"website"}>
              <Input style={{width: "100%"}} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={"Content"} name={"content"} required>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Turnstile
            ref={turnstile_ref}
            siteKey="0x4AAAAAAAeiWteAnXC3k3s-"
            onSuccess={setTurnstile_token}
          />
        </Form.Item>
        <Space wrap size={32}>
          <Form.Item>
            <Button
              type={"primary"}
              icon={<SendOutlined />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
          <Space wrap>
            <Form.Item name={"private"} valuePropName={"checked"}>
              <Checkbox>Private</Checkbox>
            </Form.Item>
            <Form.Item name={"hide_name"} valuePropName={"checked"}>
              <Checkbox>Hide name</Checkbox>
            </Form.Item>
            <Form.Item name={"hide_email"} valuePropName={"checked"}>
              <Checkbox>Hide email</Checkbox>
            </Form.Item>
            <Form.Item name={"hide_website"} valuePropName={"checked"}>
              <Checkbox>Hide website</Checkbox>
            </Form.Item>
          </Space>
        </Space>
      </Form>
    </Spin>
  )
}
