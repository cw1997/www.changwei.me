import dayjs from "dayjs"
import type {NextApiRequest, NextApiResponse} from "next"
import {sql} from "@vercel/postgres"
import utc from "dayjs/plugin/utc" // ES 2015
import timezone from "dayjs/plugin/timezone" // ES 2015
dayjs.extend(utc)
dayjs.extend(timezone)

type ResponseData =
  | {
      data: {items: any[]; count: number}
    }
  | {
      error: {message: string}
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // const {name, email, website, content} = req.body
  const body = JSON.parse(req.body)

  const offset = body.offset
  const limit = body.limit

  if (offset == null || typeof offset !== "number") {
    res.status(400).json({error: {message: '"offset" is required'}})
    return
  }
  if (limit == null || typeof limit !== "number") {
    res.status(400).json({error: {message: '"limit" is required'}})
    return
  }

  const result_select = await sql`
SELECT * FROM guestbook
WHERE private = 'false' AND delete_datetime IS NULL
ORDER BY create_datetime DESC
OFFSET ${offset} LIMIT ${limit}
;`
  const result_count = await sql`
SELECT COUNT(*) AS _count FROM guestbook
WHERE delete_datetime IS NULL
;`
  const count = result_count.rows[0]._count
  // console.log(result)
  const items = result_select.rows.map((row) => {
    if (row.hide_name) row.name = "***"
    if (row.hide_email) row.email = "***@***.***"
    if (row.hide_website) row.website = "https://***.***.***/"
    return row
  })
  res.status(200).json({data: {items, count}})
}
