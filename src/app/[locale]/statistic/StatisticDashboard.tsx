"use client"

import React, {useEffect, useState, useCallback, useMemo} from "react"
import {
  Clock,
  Code,
  Globe,
  Loader2,
  Monitor,
  Smartphone,
  Tablet,
  Table as TableIcon,
} from "lucide-react"
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
import {useLocale} from "next-intl"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const WORLD_MAP_NAME = "world"
const WORLD_MAP_GEOJSON_URL = "https://fastly.jsdelivr.net/npm/echarts@5/map/json/world.json"

let worldMapPromise: Promise<void> | null = null

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(max-width: 767px)")
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    setIsMobile(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

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

function EmptyState({message}: {message: string}) {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
      {message}
    </div>
  )
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          <span className="inline-flex items-center gap-2">
            <Code className="h-4 w-4" /> SQL Query
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="h-3.5 w-3.5" /> {executionTimeMs} ms
          </Badge>
          <Badge
            className={
              fromCache
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
            }
          >
            {fromCache ? "Cached" : "Refreshed"}
          </Badge>
        </div>
        <div className="text-xs text-slate-500">
          Updated: {formatUpdatedAt(cachedAt)}
        </div>
        <SyntaxHighlighter
          language="sql"
          style={oneLight}
          customStyle={{margin: 0, borderRadius: 8, fontSize: 12, lineHeight: 1.55}}
          wrapLongLines
        >
          {sql}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  )
}

function formatTableValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) return "-"

  if (typeof value === "object") {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }

  return String(value)
}

const intlLocaleByAppLocale: Record<string, string> = {
  "en-US": "en-US",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW",
}

function formatDateWithWeekday(value: unknown, locale: string): React.ReactNode {
  const raw = String(value ?? "")
  const match = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (!match) return formatTableValue(value)

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return formatTableValue(value)
  }

  const formattedWeekday = new Intl.DateTimeFormat(
    intlLocaleByAppLocale[locale] ?? "en-US",
    {
      weekday: locale === "en-US" ? "short" : "long",
    },
  ).format(date)
  const weekday =
    locale === "en-US" && !formattedWeekday.endsWith(".")
      ? `${formattedWeekday}.`
      : formattedWeekday
  const dateText = `${year}-${month}-${day}`
  return `${dateText} (${weekday})`
}

function ResultTable({
  data,
  queryType,
}: {
  data: QueryResult["data"]
  queryType: QueryType
}) {
  const locale = useLocale()
  const pageSize = 7
  const [page, setPage] = useState(1)

  const tableData = useMemo(() => {
    if (queryType !== "dailyVisits") return data

    const grouped = new Map<
      string,
      {
        date: string
        "count(desktop)": number
        "count(tablet)": number
        "count(mobile)": number
      }
    >()

    for (const row of data) {
      const date = String(row.date ?? "").slice(0, 10)
      if (!date) continue

      const device = String(row.device_type ?? "desktop").toLowerCase()
      const count = Number(row.count ?? 0)
      const safeCount = Number.isFinite(count) ? count : 0

      if (!grouped.has(date)) {
        grouped.set(date, {
          date,
          "count(desktop)": 0,
          "count(tablet)": 0,
          "count(mobile)": 0,
        })
      }

      const current = grouped.get(date)
      if (!current) continue

      if (device === "tablet") {
        current["count(tablet)"] += safeCount
      } else if (device === "mobile") {
        current["count(mobile)"] += safeCount
      } else {
        current["count(desktop)"] += safeCount
      }
    }

    return Array.from(grouped.values()).sort((a, b) => a.date.localeCompare(b.date))
  }, [data, queryType])

  const columns = useMemo(() => {
    if (queryType === "dailyVisits") {
      return [
        {
          title: "date",
          dataIndex: "date",
          key: "date",
          render: (value: unknown) => formatDateWithWeekday(value, locale),
        },
        {
          title: "desktop",
          dataIndex: "count(desktop)",
          key: "count(desktop)",
          render: (value: unknown) => formatTableValue(value),
        },
        {
          title: "tablet",
          dataIndex: "count(tablet)",
          key: "count(tablet)",
          render: (value: unknown) => formatTableValue(value),
        },
        {
          title: "mobile",
          dataIndex: "count(mobile)",
          key: "count(mobile)",
          render: (value: unknown) => formatTableValue(value),
        },
      ]
    }

    return Object.keys(tableData[0] ?? {}).map((key) => ({
      title: key,
      dataIndex: key,
      key,
      render: (value: unknown) => formatTableValue(value),
    }))
  }, [locale, queryType, tableData])

  useEffect(() => {
    setPage(1)
  }, [tableData.length, queryType])

  const pageCount = Math.max(1, Math.ceil(tableData.length / pageSize))
  const pageStart = (page - 1) * pageSize
  const pageData = tableData.slice(pageStart, pageStart + pageSize)

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          <span className="inline-flex items-center gap-2">
            <TableIcon className="h-4 w-4" /> Query Result
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tableData.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>{column.title}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map((row, rowIndex) => (
                  <TableRow key={`${rowIndex}-${String(rowIndex)}`}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render(row[column.dataIndex as keyof typeof row])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {pageCount > 1 ? (
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  Page {page} of {pageCount}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                    disabled={page === pageCount}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState message="No data yet" />
        )}
      </CardContent>
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
  const isMobile = useIsMobile()
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
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base">
            <span className="inline-flex items-center gap-2">
              {icon} {title}
            </span>
          </CardTitle>
          {result ? (
            <span className="text-xs text-slate-500">
              Updated: {formatUpdatedAt(result.cachedAt)}
            </span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {(loading || waitingMap) && (
          <div className="flex h-[320px] items-center justify-center text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {error && <EmptyState message="Failed to load data" />}
        {!loading && !waitingMap && !error && result && (
          <div className="space-y-4">
            <div
              className={`grid gap-4 ${
                isMobile
                  ? "grid-cols-1"
                  : "grid-cols-[minmax(0,1fr)_minmax(240px,320px)]"
              }`}
            >
              <div className="min-h-[320px]">
                {result.data.length > 0 && chartOption ? (
                  <ReactEChartsCore
                    echarts={echarts}
                    option={chartOption}
                    style={{height: isMobile ? 320 : 420}}
                    notMerge
                  />
                ) : (
                  <EmptyState message="No data yet" />
                )}
              </div>
              <div className="min-w-0">
                <ResultTable data={result.data} queryType={queryType} />
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <SqlPanel
                sql={result.sql}
                executionTimeMs={result.executionTimeMs}
                cachedAt={result.cachedAt}
                fromCache={result.fromCache}
              />
              {worldMapLoadFailed ? (
                <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">
                  World map failed to load, fallback chart is shown.
                </Badge>
              ) : null}
            </div>
          </div>
        )}
      </CardContent>
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

function buildPieOption(
  data: Record<string, unknown>[],
  nameKey: string,
  isMobile: boolean,
): echarts.EChartsCoreOption {
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

function buildBarOption(
  data: Record<string, unknown>[],
  nameKey: string,
  isMobile: boolean,
): echarts.EChartsCoreOption {
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
    <div className="flex flex-col gap-6">
      <ChartCard
        title="Daily Visits"
        icon={<Monitor className="h-4 w-4" />}
        queryType="dailyVisits"
        renderChart={(data) => buildDailyVisitsOption(data)}
      />

      {/*<ChartCard
        title="Geographic Distribution"
        icon={<Globe className="h-4 w-4" />}
        queryType="geoDistribution"
        requiresWorldMap
        renderChart={(data, context) => buildGeoMapOption(data, context)}
      />*/}

      <ChartCard
        title="Language Distribution"
        icon={<Globe className="h-4 w-4" />}
        queryType="languageDistribution"
        renderChart={(data, context) => buildPieOption(data, "language", context.isMobile)}
      />

      <ChartCard
        title="Device Type Distribution"
        icon={<Smartphone className="h-4 w-4" />}
        queryType="deviceDistribution"
        renderChart={(data, context) => buildPieOption(data, "device_type", context.isMobile)}
      />

      <ChartCard
        title="Browser Distribution"
        icon={<Globe className="h-4 w-4" />}
        queryType="browserDistribution"
        renderChart={(data, context) => buildBarOption(data, "browser_name", context.isMobile)}
      />

      <ChartCard
        title="Operating System Distribution"
        icon={<Tablet className="h-4 w-4" />}
        queryType="osDistribution"
        renderChart={(data, context) => buildBarOption(data, "os_name", context.isMobile)}
      />

      <ChartCard
        title="Screen Resolution Distribution"
        icon={<Monitor className="h-4 w-4" />}
        queryType="screenDistribution"
        renderChart={(data, context) => buildBarOption(data, "resolution", context.isMobile)}
      />
    </div>
  )
}
