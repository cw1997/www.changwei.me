'use client'

import {SendOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Spin} from "antd";

export interface IPropsGuestbookInput {
}

export const GuestbookInput: React.FunctionComponent<IPropsGuestbookInput> = (props) => {
  const [form] = Form.useForm()
  const [loadingSubmit, setLoadingSubmit] = useState(true)
  
  const turnstile_token = useRef<string>()
  const turnstile_widget_id = useRef<string>()
  // const [turnstile_token, setTurnstile_token] = useState('')
  useEffect(() => {
    // if using synchronous loading, will be called once the DOM is ready
    window.turnstile.ready(function () {
        turnstile_widget_id.current = window.turnstile.render('#turnstile', {
            sitekey: '0x4AAAAAAAeiWteAnXC3k3s-',
            callback: function(token: string) {
              setLoadingSubmit(false)
              // console.log(`Challenge Success ${token}`)
              turnstile_token.current = token
            },
        });
    });
  }, [])
  
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
          turnstile_token: turnstile_token.current,
        }),
      })
      const json = await result.json()
      if (result.ok) {
        Modal.success({title: 'Submit successful', content: 'You submit the content to the guestbook successful!'})
        form.resetFields()
      } else {
        Modal.error({title: 'Submit failed', content: await json.error.message})
      }
    } catch (error) {
      Modal.error({title: 'System error', content: 'Occur error while submitting content to the guestbook, please try again later.'})
    } finally {
      // alert('window.turnstile.isExpired(turnstile_widget_id.current):' + window.turnstile.isExpired(turnstile_widget_id.current))
      if (window.turnstile.isExpired(turnstile_widget_id.current)) {
        window.turnstile.reset(turnstile_widget_id.current)
      }
      setLoadingSubmit(false)
    }
  }
  
  return (
    <Spin spinning={loadingSubmit}>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script>
      <Form form={form}>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={'Name'} name={'name'} required>
              <Input style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={'Email'} name={'email'}>
              <Input style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label={'Website'} name={'website'}>
              <Input style={{width: '100%'}}/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={'Content'} name={'content'} required>
          <Input.TextArea rows={3}/>
        </Form.Item>
        <Form.Item>
          <div id={'turnstile'} />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} icon={<SendOutlined/>} onClick={handleSubmit}>Submit</Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
