import {defineConfig} from "drizzle-kit"

/** drizzle-kit 使用 mysql2；TiDB Serverless 要求 TLS，需在 URL 中带上 ssl 查询参数（mysql2 会 JSON.parse）。 */
function tidbDatabaseUrlForDrizzleKit(raw: string | undefined): string {
  if (!raw) {
    throw new Error("TIDB_DATABASE_URL is required for drizzle-kit")
  }
  const u = new URL(raw)
  if (!u.searchParams.has("ssl")) {
    u.searchParams.set("ssl", JSON.stringify({rejectUnauthorized: true}))
  }
  return u.toString()
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: tidbDatabaseUrlForDrizzleKit(process.env.TIDB_DATABASE_URL),
  },
})
