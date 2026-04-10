import {bigint, datetime, int, json, mysqlTable, text, varchar} from "drizzle-orm/mysql-core"

export const pageVisits = mysqlTable("page_visits", {
  id: bigint("id", {mode: "number"}).primaryKey().autoincrement(),
  visitedAt: datetime("visited_at", {fsp: 3}).notNull(),
  path: varchar("path", {length: 2048}).notNull(),
  ipChain: json("ip_chain").$type<string[]>().notNull(),
  userAgent: text("user_agent"),
  referer: varchar("referer", {length: 2048}),
  language: varchar("language", {length: 64}),
  screenWidth: int("screen_width"),
  screenHeight: int("screen_height"),
  deviceType: varchar("device_type", {length: 32}),
  browserName: varchar("browser_name", {length: 128}),
  browserVersion: varchar("browser_version", {length: 64}),
  osName: varchar("os_name", {length: 128}),
  osVersion: varchar("os_version", {length: 64}),
  country: varchar("country", {length: 128}),
  city: varchar("city", {length: 128}),
  viewportWidth: int("viewport_width"),
  viewportHeight: int("viewport_height"),
  locale: varchar("locale", {length: 16}),
})
