"use client"

import React, {useEffect, useState, useCallback} from "react"
import {Card, Collapse, Spin, Tag, Empty} from "antd"
import {
  LoadingOutlined,
  CodeOutlined,
  ClockCircleOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  GlobalOutlined,
  ChromeOutlined,
} from "@ant-design/icons"
import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import {LineChart, PieChart, BarChart} from "echarts/charts"
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components"
import {CanvasRenderer} from "echarts/renderers"

import styles from "./StatisticDashboard.module.sass"

echarts.use([
  LineChart,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
])

interface QueryResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[]
  sql: string
  description: string
  executionTimeMs: number
}

type QueryType =
  | "dailyVisits"
  | "geoDistribution"
  | "languageDistribution"
  | "deviceDistribution"
  | "browserDistribution"
  | "osDistribution"
  | "screenDistribution"

function SqlPanel({sql, executionTimeMs}: {sql: string; executionTimeMs: number}) {
  return (
    <Collapse
      size="small"
      items={[
        {
          key: "sql",
          label: (
            <span>
              <CodeOutlined /> SQL Query &nbsp;
              <Tag color="blue" bordered={false}>
                <ClockCircleOutlined /> {executionTimeMs} ms
              </Tag>
            </span>
          ),
          children: (
            <pre className={styles.sqlBlock}>
              <code>{sql}</code>
            </pre>
          ),
        },
      ]}
    />
  )
}

function ChartCard({
  title,
  icon,
  queryType,
  renderChart,
}: {
  title: string
  icon: React.ReactNode
  queryType: QueryType
  renderChart: (data: QueryResult["data"]) => echarts.EChartsCoreOption
}) {
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`/api/statistic?type=${queryType}`)
      if (!res.ok) throw new Error("fetch failed")
      const json: QueryResult = await res.json()
      setResult(json)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [queryType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Card
      title={
        <span>
          {icon} {title}
        </span>
      }
      className={styles.chartCard}
    >
      {loading && (
        <div className={styles.loading}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      )}
      {error && <Empty description="Failed to load data" />}
      {!loading && !error && result && (
        <>
          {result.data.length > 0 ? (
            <ReactEChartsCore
              echarts={echarts}
              option={renderChart(result.data)}
              style={{height: 400}}
              notMerge
            />
          ) : (
            <Empty description="No data yet" />
          )}
          <SqlPanel sql={result.sql} executionTimeMs={result.executionTimeMs} />
        </>
      )}
    </Card>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildDailyVisitsOption(data: Record<string, any>[]): echarts.EChartsCoreOption {
  const dateSet = new Set<string>()
  const deviceTypes = ["desktop", "tablet", "mobile"]
  const deviceMap: Record<string, Record<string, number>> = {}

  for (const row of data) {
    const date = String(row.date).slice(0, 10)
    const device = String(row.device_type || "desktop")
    const count = Number(row.count)
    dateSet.add(date)
    if (!deviceMap[device]) deviceMap[device] = {}
    deviceMap[device][date] = (deviceMap[device][date] || 0) + count
  }

  const dates = Array.from(dateSet).sort()
  const colorMap: Record<string, string> = {
    desktop: "#5B8FF9",
    tablet: "#5AD8A6",
    mobile: "#F6BD16",
  }
  const nameMap: Record<string, string> = {
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
  }

  return {
    tooltip: {trigger: "axis"},
    legend: {data: deviceTypes.map((d) => nameMap[d])},
    grid: {left: "3%", right: "4%", bottom: "3%", containLabel: true},
    xAxis: {type: "category", boundaryGap: false, data: dates},
    yAxis: {type: "value"},
    series: deviceTypes.map((device) => ({
      name: nameMap[device],
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {focus: "series"},
      color: colorMap[device],
      data: dates.map((d) => deviceMap[device]?.[d] ?? 0),
    })),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildPieOption(data: Record<string, any>[], nameKey: string): echarts.EChartsCoreOption {
  return {
    tooltip: {trigger: "item", formatter: "{b}: {c} ({d}%)"},
    legend: {type: "scroll", bottom: 0},
    series: [
      {
        type: "pie",
        radius: ["35%", "65%"],
        avoidLabelOverlap: true,
        itemStyle: {borderRadius: 6, borderColor: "#fff", borderWidth: 2},
        label: {show: true, formatter: "{b}: {d}%"},
        data: data.map((row) => ({
          name: String(row[nameKey]),
          value: Number(row.count),
        })),
      },
    ],
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildBarOption(data: Record<string, any>[], nameKey: string): echarts.EChartsCoreOption {
  return {
    tooltip: {trigger: "axis", axisPointer: {type: "shadow"}},
    grid: {left: "3%", right: "4%", bottom: "3%", containLabel: true},
    xAxis: {
      type: "category",
      data: data.map((row) => String(row[nameKey])),
      axisLabel: {rotate: 30, interval: 0},
    },
    yAxis: {type: "value"},
    series: [
      {
        type: "bar",
        data: data.map((row) => Number(row.count)),
        itemStyle: {borderRadius: [4, 4, 0, 0]},
        colorBy: "data",
      },
    ],
  }
}

export function StatisticDashboard() {
  return (
    <div className={styles.dashboard}>
      <ChartCard
        title="Daily Visits"
        icon={<DesktopOutlined />}
        queryType="dailyVisits"
        renderChart={buildDailyVisitsOption}
      />

      <ChartCard
        title="Geographic Distribution"
        icon={<GlobalOutlined />}
        queryType="geoDistribution"
        renderChart={(data) => buildPieOption(data, "country")}
      />

      <ChartCard
        title="Language Distribution"
        icon={<GlobalOutlined />}
        queryType="languageDistribution"
        renderChart={(data) => buildPieOption(data, "language")}
      />

      <ChartCard
        title="Device Type Distribution"
        icon={<MobileOutlined />}
        queryType="deviceDistribution"
        renderChart={(data) => buildPieOption(data, "device_type")}
      />

      <ChartCard
        title="Browser Distribution"
        icon={<ChromeOutlined />}
        queryType="browserDistribution"
        renderChart={(data) => buildBarOption(data, "browser_name")}
      />

      <ChartCard
        title="Operating System Distribution"
        icon={<TabletOutlined />}
        queryType="osDistribution"
        renderChart={(data) => buildBarOption(data, "os_name")}
      />

      <ChartCard
        title="Screen Resolution Distribution"
        icon={<DesktopOutlined />}
        queryType="screenDistribution"
        renderChart={(data) => buildBarOption(data, "resolution")}
      />
    </div>
  )
}
