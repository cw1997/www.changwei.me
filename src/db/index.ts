import {connect} from "@tidbcloud/serverless"
import {drizzle} from "drizzle-orm/tidb-serverless"
import * as fs from "node:fs"
import * as path from "node:path"
import * as schema from "./schema"

type Db = ReturnType<typeof drizzle<typeof schema>>

let cached: Db | undefined

/**
 * Returns the database client, connecting on first use.
 *
 * This is deliberately lazy rather than module-scope: connecting eagerly meant a
 * missing `TIDB_DATABASE_URL` (or a CA bundle missing from the traced standalone
 * output) threw while `next build` was collecting routes, turning an environment
 * problem into a build failure on every page instead of just the DB-backed routes.
 */
export function getDb(): Db {
  if (cached) return cached

  const databaseUrl = process.env.TIDB_DATABASE_URL
  if (!databaseUrl) {
    throw new Error("TIDB_DATABASE_URL is not set; cannot connect to the database")
  }

  // Resolve against the process working directory rather than a bare "./..."
  // literal: output-file tracing does not reliably follow a CWD-relative read at
  // module scope, so in the standalone runner this file can be missing.
  const caPath = path.join(process.cwd(), "isrgrootx1.pem")
  if (!fs.existsSync(caPath)) {
    throw new Error(`Missing TiDB CA bundle at ${caPath}`)
  }

  const client = connect({
    url: databaseUrl,
    ssl: {
      ca: fs.readFileSync(caPath).toString(),
      // minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
    strict: true,
    // Logging every statement would leak query parameters into production logs.
    verbose: process.env.NODE_ENV === "development",
  })

  cached = drizzle({client, schema})
  return cached
}