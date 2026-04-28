"use client"

import React, {useEffect, useState, useCallback, useMemo} from "react"
import {Card, Spin, Tag, Empty, Row, Col, Grid} from "antd"
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
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {oneLight} from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import {LineChart, PieChart, BarChart, MapChart, EffectScatterChart} from "echarts/charts"
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GeoComponent,
  VisualMapComponent,
} from "echarts/components"
import {CanvasRenderer} from "echarts/renderers"

import styles from "./StatisticDashboard.module.sass"

echarts.use([
  LineChart,
  PieChart,
  BarChart,
  MapChart,
  EffectScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GeoComponent,
  VisualMapComponent,
  CanvasRenderer,
])

interface QueryResult {
  data: Record<string, unknown>[]
  sql: string
  description: string
  executionTimeMs: number
  cachedAt: string
  fromCache: boolean
}

type QueryType =
  | "dailyVisits"
  | "geoDistribution"
  | "languageDistribution"
  | "deviceDistribution"
  | "browserDistribution"
  | "osDistribution"
  | "screenDistribution"

const WORLD_MAP_NAME = "world"
const WORLD_MAP_GEOJSON_URL = "https://fastly.jsdelivr.net/npm/echarts@5/map/json/world.json"

let worldMapPromise: Promise<void> | null = null

async function ensureWorldMapRegistered() {
  if (echarts.getMap(WORLD_MAP_NAME)) return

  if (!worldMapPromise) {
    worldMapPromise = fetch(WORLD_MAP_GEOJSON_URL, {cache: "force-cache"})
      .then((res) => {
        if (!res.ok) throw new Error("Failed to download world map")
        return res.json() as Promise<unknown>
      })
      .then((geoJson) => {
        echarts.registerMap(WORLD_MAP_NAME, geoJson as never)
      })
  }

  try {
    await worldMapPromise
  } catch (error) {
    worldMapPromise = null
    throw error
  }
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "-"
  return date.toLocaleString()
}

function SqlPanel({
  sql,
  executionTimeMs,
  cachedAt,
  fromCache,
}: {
  sql: string
  executionTimeMs: number
  cachedAt: string
  fromCache: boolean
}) {
  return (
    <Card
      size="small"
      className={styles.sqlPanel}
      title={
        <span>
          <CodeOutlined /> SQL Query
        </span>
      }
    >
      <div className={styles.sqlMeta}>
        <Tag color="blue" bordered={false}>
          <ClockCircleOutlined /> {executionTimeMs} ms
        </Tag>
        <Tag color={fromCache ? "green" : "gold"} bordered={false}>
          {fromCache ? "Cached" : "Refreshed"}
        </Tag>
      </div>
      <div className={styles.updatedAt}>Updated: {formatUpdatedAt(cachedAt)}</div>
      <SyntaxHighlighter
        language="sql"
        style={oneLight}
        customStyle={{margin: 0, borderRadius: 8, fontSize: 12, lineHeight: 1.55}}
        wrapLongLines
      >
        {sql}
      </SyntaxHighlighter>
    </Card>
  )
}

function ChartCard({
  title,
  icon,
  queryType,
  requiresWorldMap = false,
  renderChart,
}: {
  title: string
  icon: React.ReactNode
  queryType: QueryType
  requiresWorldMap?: boolean
  renderChart: (
    data: QueryResult["data"],
    context: {worldMapReady: boolean; isMobile: boolean},
  ) => echarts.EChartsCoreOption
}) {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [worldMapReady, setWorldMapReady] = useState(!requiresWorldMap)
  const [worldMapLoadFailed, setWorldMapLoadFailed] = useState(false)

  useEffect(() => {
    if (!requiresWorldMap) return

    let active = true

    ensureWorldMapRegistered()
      .then(() => {
        if (active) setWorldMapReady(true)
      })
      .catch(() => {
        if (active) setWorldMapLoadFailed(true)
      })

    return () => {
      active = false
    }
  }, [requiresWorldMap])

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

  const chartOption = useMemo(() => {
    if (!result) return null

    return renderChart(result.data, {
      worldMapReady: worldMapReady && !worldMapLoadFailed,
      isMobile,
    })
  }, [isMobile, renderChart, result, worldMapReady, worldMapLoadFailed])

  const waitingMap = requiresWorldMap && !worldMapReady && !worldMapLoadFailed

  return (
    <Card
      title={
        <div className={styles.cardTitle}>
          <span>
            {icon} {title}
          </span>
          {result ? <span className={styles.cardUpdatedAt}>Updated: {formatUpdatedAt(result.cachedAt)}</span> : null}
        </div>
      }
      className={styles.chartCard}
    >
      {(loading || waitingMap) && (
        <div className={styles.loading}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      )}
      {error && <Empty description="Failed to load data" />}
      {!loading && !waitingMap && !error && result && (
        <Row gutter={[isMobile ? 12 : 16, 16]} align="top">
          <Col xs={24} md={16}>
            {result.data.length > 0 && chartOption ? (
              <ReactEChartsCore echarts={echarts} option={chartOption} style={{height: isMobile ? 320 : 420}} notMerge />
            ) : (
              <Empty description="No data yet" />
            )}
          </Col>
          <Col xs={24} md={8}>
            <SqlPanel
              sql={result.sql}
              executionTimeMs={result.executionTimeMs}
              cachedAt={result.cachedAt}
              fromCache={result.fromCache}
            />
            {worldMapLoadFailed ? <Tag color="warning">World map failed to load, fallback chart is shown.</Tag> : null}
          </Col>
        </Row>
      )}
    </Card>
  )
}

function buildDailyVisitsOption(data: Record<string, unknown>[]): echarts.EChartsCoreOption {
  const dateSet = new Set<string>()
  const deviceTypes = ["desktop", "tablet", "mobile"]
  const deviceMap: Record<string, Record<string, number>> = {}

  for (const row of data) {
    const date = String(row.date ?? "").slice(0, 10)
    const device = String(row.device_type ?? "desktop")
    const count = Number(row.count ?? 0)
    if (!date) continue
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
    legend: {data: deviceTypes.map((d) => nameMap[d]), top: 8, left: "center"},
    grid: {left: 12, right: 16, top: 72, bottom: 20, containLabel: true},
    xAxis: {type: "category", boundaryGap: false, data: dates},
    yAxis: {type: "value"},
    series: deviceTypes.map((device) => ({
      name: nameMap[device],
      type: "line",
      stack: "visits",
      areaStyle: {},
      emphasis: {focus: "series"},
      color: colorMap[device],
      data: dates.map((d) => deviceMap[device]?.[d] ?? 0),
    })),
  }
}

function buildPieOption(data: Record<string, unknown>[], nameKey: string, isMobile: boolean): echarts.EChartsCoreOption {
  const values = data.map((row) => ({
    name: String(row[nameKey] ?? "Unknown"),
    value: Number(row.count ?? 0),
  }))

  return {
    tooltip: {trigger: "item", formatter: "{b}: {c} ({d}%)"},
    legend: {
      type: "scroll",
      orient: isMobile ? "horizontal" : "vertical",
      ...(isMobile
        ? {
            left: "center",
            right: "auto",
            bottom: 0,
          }
        : {
            right: 8,
            top: 16,
            bottom: 16,
          }),
    },
    grid: isMobile ? {left: 8, right: 8, top: 8, bottom: 8, containLabel: true} : undefined,
    series: [
      {
        type: "pie",
        center: isMobile ? ["50%", "38%"] : ["34%", "50%"],
        radius: isMobile ? ["38%", "56%"] : ["40%", "68%"],
        avoidLabelOverlap: true,
        itemStyle: {borderRadius: 6, borderColor: "#fff", borderWidth: 2},
        label: {show: false},
        labelLine: {show: false},
        emphasis: {
          label: {
            show: true,
            formatter: "{b}\n{d}%",
            fontWeight: "bold",
          },
        },
        data: values,
      },
    ],
  }
}

function buildBarOption(data: Record<string, unknown>[], nameKey: string, isMobile: boolean): echarts.EChartsCoreOption {
  return {
    tooltip: {trigger: "axis", axisPointer: {type: "shadow"}},
    grid: {left: 12, right: 16, bottom: isMobile ? 82 : 64, containLabel: true},
    xAxis: {
      type: "category",
      data: data.map((row) => String(row[nameKey] ?? "Unknown")),
      axisLabel: {
        rotate: isMobile ? 36 : 24,
        interval: 0,
        width: isMobile ? 70 : 92,
        overflow: "truncate",
      },
    },
    yAxis: {type: "value"},
    series: [
      {
        type: "bar",
        data: data.map((row) => Number(row.count ?? 0)),
        itemStyle: {borderRadius: [4, 4, 0, 0]},
        colorBy: "data",
      },
    ],
  }
}

function buildGeoMapOption(
  data: Record<string, unknown>[],
  context: {worldMapReady: boolean; isMobile: boolean},
): echarts.EChartsCoreOption {
  if (!context.worldMapReady) {
    return buildBarOption(data, "country", context.isMobile)
  }

  const countryData = new Map<string, number>()
  const points: Array<{name: string; value: [number, number, number]}> = []

  for (const row of data) {
    const country = String(row.country ?? "Unknown")
    const count = Number(row.count ?? 0)
    const latitude = Number(row.latitude)
    const longitude = Number(row.longitude)

    countryData.set(country, (countryData.get(country) || 0) + count)

    if (Number.isFinite(latitude) && Number.isFinite(longitude) && country !== "Unknown") {
      points.push({
        name: country,
        value: [longitude, latitude, count],
      })
    }
  }

  const mapData = Array.from(countryData.entries()).map(([name, value]) => ({name, value}))
  const maxValue = Math.max(1, ...mapData.map((item) => Number(item.value || 0)))

  return {
    tooltip: {
      trigger: "item",
      formatter: (params: {name?: string; value?: unknown}) => {
        if (Array.isArray(params.value)) {
          const count = Number(params.value[2] ?? 0)
          return `${params.name ?? "Unknown"}: ${count}`
        }

        return `${params.name ?? "Unknown"}: ${Number(params.value ?? 0)}`
      },
    },
    visualMap: {
      min: 0,
      max: maxValue,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: 8,
      inRange: {
        color: ["#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"],
      },
      text: ["High", "Low"],
    },
    geo: {
      map: WORLD_MAP_NAME,
      roam: true,
      scaleLimit: {
        min: 1,
        max: 8,
      },
      itemStyle: {
        areaColor: "#f8fafc",
        borderColor: "#94a3b8",
      },
      emphasis: {
        itemStyle: {
          areaColor: "#c7d2fe",
        },
      },
    },
    series: [
      {
        name: "Visits",
        type: "map",
        geoIndex: 0,
        data: mapData,
      },
      {
        name: "Geo Points",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: points
          .sort((a, b) => b.value[2] - a.value[2])
          .slice(0, 120),
        symbolSize: (value: unknown) => {
          const count = Array.isArray(value) ? Number(value[2] ?? 0) : 0
          return Math.max(6, Math.sqrt(Math.max(count, 1)) * 1.8)
        },
        rippleEffect: {scale: 3},
        itemStyle: {
          color: "#f97316",
          shadowBlur: 10,
          shadowColor: "rgba(249, 115, 22, 0.4)",
        },
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
        renderChart={(data) => buildDailyVisitsOption(data)}
      />

      {/*<ChartCard
        title="Geographic Distribution"
        icon={<GlobalOutlined />}
        queryType="geoDistribution"
        requiresWorldMap
        renderChart={(data, context) => buildGeoMapOption(data, context)}
      />*/}

      <ChartCard
        title="Language Distribution"
        icon={<GlobalOutlined />}
        queryType="languageDistribution"
        renderChart={(data, context) => buildPieOption(data, "language", context.isMobile)}
      />

      <ChartCard
        title="Device Type Distribution"
        icon={<MobileOutlined />}
        queryType="deviceDistribution"
        renderChart={(data, context) => buildPieOption(data, "device_type", context.isMobile)}
      />

      <ChartCard
        title="Browser Distribution"
        icon={<ChromeOutlined />}
        queryType="browserDistribution"
        renderChart={(data, context) => buildBarOption(data, "browser_name", context.isMobile)}
      />

      <ChartCard
        title="Operating System Distribution"
        icon={<TabletOutlined />}
        queryType="osDistribution"
        renderChart={(data, context) => buildBarOption(data, "os_name", context.isMobile)}
      />

      <ChartCard
        title="Screen Resolution Distribution"
        icon={<DesktopOutlined />}
        queryType="screenDistribution"
        renderChart={(data, context) => buildBarOption(data, "resolution", context.isMobile)}
      />
    </div>
  )
}
