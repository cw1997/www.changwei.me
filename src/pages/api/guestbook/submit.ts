import dayjs from "dayjs"
import type {NextApiRequest, NextApiResponse} from "next"
import {sql} from "@vercel/postgres"
import utc from "dayjs/plugin/utc" // ES 2015
import timezone from "dayjs/plugin/timezone" // ES 2015
dayjs.extend(utc)
dayjs.extend(timezone)

type ResponseData =
  | {
      data: {id: string}
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

  const name = body.name
  const email = body.email ?? null
  const website = body.website ?? null
  const content = body.content
  const _private = body.private
  const hide_name = body.hide_name
  const hide_email = body.hide_email
  const hide_website = body.hide_website
  const timezone = req.body.timezone

  if (name == null || name === "") {
    res.status(400).json({error: {message: '"Name" is required'}})
    return
  }
  if (content == null || content === "") {
    res.status(400).json({error: {message: '"Content" is required'}})
    return
  }

  // Turnstile injects a token in "cf-turnstile-response".
  const turnstile_token = body.turnstile_token
  const cf_ip = req.headers["CF-Connecting-IP"]
  // Validate the token by calling the
  // "/siteverify" API endpoint.
  const idempotencyKey = crypto.randomUUID()
  const firstResult = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstile_token,
        remoteip: cf_ip,
        idempotency_key: idempotencyKey,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  const firstOutcome = await firstResult.json()
  if (!firstOutcome.success) {
    res.status(403).json({
      error: {message: "Occur error while validating if you are the human"},
    })
    return
  }
  // console.log('req.body', req.body, {name, email, website, content})
  const ip =
    (req.headers["x-forwarded-for"] ?? req.socket.remoteAddress)
      ? [req.socket.remoteAddress]
      : undefined
  const user_agent = req.headers["user-agent"] ?? "NULL"
  const create_datetime = dayjs().tz(timezone).toISOString()
  const result = await sql`
INSERT INTO guestbook
(name, email, website, content, private, hide_name, hide_email, hide_website, ip, user_agent, create_datetime)
VALUES
(${name}, ${email}, ${website}, ${content}, ${_private}, ${hide_name}, ${hide_email}, ${hide_website}, ${ip ? "{" + ip?.map((item) => item).join(", ") + "}" : ""}, ${user_agent ?? ""}, ${create_datetime})
RETURNING id;
`
  // console.log(result)
  const id = result.rows[0].id
  console.debug(`[DEBUG] insert to guestbook, id={${id}}`)
  res.status(200).json({data: {id}})
}
