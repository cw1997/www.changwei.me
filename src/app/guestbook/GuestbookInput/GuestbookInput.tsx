'use client'

import {SendOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Spin} from "antd";

export interface IPropsGuestbookInput {
}

export const GuestbookInput: React.FunctionComponent<IPropsGuestbookInput> = (props) => {
  const [form] = Form.useForm()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  // form.validateFields((err, values) => {})
  const handleSubmit = async () => {
    try {
      setLoadingSubmit(true)
      const result = await fetch('/api/guestbook/submit', {
        method: "POST",
        body: JSON.stringify({
          name: form.getFieldValue('name'),
          email: form.getFieldValue('email'),
          website: form.getFieldValue('website'),
          content: form.getFieldValue('content'),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })
      Modal.success({title: 'Submit successful', content: 'You submit the content to the guestbook successful!'})
      form.resetFields()
    } catch (error) {
      Modal.error({title: 'System error', content: 'Occur error while submitting content to the guestbook, please try again later.'})
    } finally {
      setLoadingSubmit(false)
    }
  }
  return (
    <Spin spinning={loadingSubmit}>
      <Form form={form}>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={'Name'} name={'name'} required>
              <Input style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={'Email'} name={'email'}>
              <Input style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={'Website'} name={'website'}>
              <Input style={{width: '100%'}} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={'Content'} name={'content'} required>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} icon={<SendOutlined />} onClick={handleSubmit}>Submit</Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
