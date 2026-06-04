import {NextResponse} from "next/server"
import {url_resume_pdf_github, url_resume_pdf_github_english} from "@/data"

export const dynamic = "force-dynamic"

const PDF_REVALIDATE_SECONDS = 3600

function isChineseLocale(locale: string): boolean {
  return locale === "zh-Hans" || locale === "zh-Hant"
}

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url)
    const locale = searchParams.get("locale") ?? "en-US"
    const isChinese = isChineseLocale(locale)
    const pdfUrl = isChinese ? url_resume_pdf_github : url_resume_pdf_github_english
    const filename = isChinese ? "changwei-resume.pdf" : "changwei-resume-english.pdf"

    const res = await fetch(pdfUrl, {
      next: {revalidate: PDF_REVALIDATE_SECONDS},
    })

    if (!res.ok) {
      return NextResponse.json(
        {error: "Failed to fetch the target PDF"},
        {status: res.status},
      )
    }

    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    })

    const upstreamContentLength = res.headers?.get?.("content-length")
    if (upstreamContentLength) {
      headers.set("Content-Length", upstreamContentLength)
    }

    const responseBody = res.body ?? (await res.arrayBuffer())
    return new NextResponse(responseBody, {headers})
  } catch (err) {
    console.error("Proxy error:", err)
    return NextResponse.json(
      {error: "Internal Server Error"},
      {status: 500},
    )
  }
}
