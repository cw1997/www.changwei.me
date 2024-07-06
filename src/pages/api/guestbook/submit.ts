import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";
import utc from 'dayjs/plugin/utc' // ES 2015
import timezone from 'dayjs/plugin/timezone' // ES 2015
dayjs.extend(utc);
dayjs.extend(timezone);

type ResponseData = {
  id: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // const {name, email, website, content} = req.body
  const body = JSON.parse(req.body)
  const name = body.name
  const email = body.email ?? null
  const website = body.website ?? null
  const content = body.content
  const timezone = req.body.timezone
  // console.log('req.body', req.body, {name, email, website, content})
  const ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ? [req.socket.remoteAddress] : undefined
  const user_agent = req.headers['user-agent'] ?? 'NULL'
  const create_datetime = dayjs().tz(timezone).toISOString()
  const result = await sql`
INSERT INTO guestbook
(name, email, website, content, ip, user_agent, create_datetime)
VALUES
(${name}, ${email}, ${website}, ${content}, ${'{' + ip?.map((item) => item).join(', ') + '}' ?? ''}, ${user_agent ?? ''}, ${create_datetime})
RETURNING id;
`;
  // console.log(result)
  const id = result.rows[0].id
  console.debug(`[DEBUG] insert to guestbook, id={${id}}`);
  res.status(200).json({ id })
}
