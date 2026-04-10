import {connect} from "@tidbcloud/serverless"
import {drizzle} from "drizzle-orm/tidb-serverless"
import * as fs from "node:fs";
import * as schema from "./schema"

const client = connect({
  url: process.env.TIDB_DATABASE_URL!,
  ssl: {
    ca: fs.readFileSync('./isrgrootx1.pem').toString(),
    // minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
})

export const db = drizzle({client, schema})
