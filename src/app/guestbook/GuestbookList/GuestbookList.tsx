"use client"

import {LoadingOutlined} from "@ant-design/icons"
import {Divider, Pagination, Space, Spin} from "antd"
import React, {useEffect, useState} from "react"
import useSWR from "swr"

import styles from "./GuestbookList.module.sass"

export interface IPropsGuestbookList {}

export const GuestbookList: React.FunctionComponent<IPropsGuestbookList> = (
  props,
) => {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)
  const swr_list = useSWR(["guestbook/list", offset, limit], () =>
    fetch("/api/guestbook/list", {
      method: "POST",
      body: JSON.stringify({offset, limit}),
    }),
  )
  const [data, setData] = useState<any>()
  useEffect(() => {
    // swr_list.data?.json().then((value) => setData(value))
    swr_list.data?.json().then((value) => setData(value))
  }, [swr_list.data])

  const jsx_pagination = data && (
    <Pagination
      pageSize={limit}
      current={offset / limit + 1}
      total={data.data.count}
      responsive
      showQuickJumper
      showSizeChanger
      showTitle
      showPrevNextJumpers
      showTotal={(total) => `Total records ${total}`}
      onChange={(pageNumber, pageSize) => {
        setOffset((pageNumber - 1) * limit)
        setLimit(pageSize)
      }}
    />
  )

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Threads{" "}
        {swr_list.isValidating ? <LoadingOutlined /> : `(${data?.data.count})`}
      </h3>
      <Spin spinning={swr_list.isLoading}>
        <div className={styles.pagination}>{jsx_pagination}</div>
        <Space direction="vertical" size={16} className={styles.list}>
          {data?.data.items.map((row: any) => (
            <div key={row.id} className={styles.item}>
              <div className={styles.item_info}>
                <Space
                  split={<Divider type={"vertical"} />}
                  className={styles.item_info}
                >
                  <div>Name: {row.name}</div>
                  <div>Email: {row.email}</div>
                  <div>Website: {row.website}</div>
                </Space>
              </div>
              <div className={styles.item_content}>{row.content}</div>
            </div>
          ))}
        </Space>
        <div className={styles.pagination}>{jsx_pagination}</div>
      </Spin>
    </div>
  )
}
