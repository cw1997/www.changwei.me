'use client'

import {SendOutlined} from "@ant-design/icons";
import React from "react";
import {Button, Col, Form, Input, Row} from "antd";

export interface IPropsGuestbookInput {
}

export const GuestbookInput: React.FunctionComponent<IPropsGuestbookInput> = (props) => {
  return (
    <Form>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={8}>
          <Form.Item label={'Name'} required>
            <Input style={{width: '100%'}} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Form.Item label={'Email'}>
            <Input style={{width: '100%'}} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Form.Item label={'Website'}>
            <Input style={{width: '100%'}} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={'Content'}>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type={'primary'} icon={<SendOutlined />}>Submit</Button>
      </Form.Item>
    </Form>
  )
}
