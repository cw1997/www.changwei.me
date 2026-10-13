import {NextResponse} from "next/server"
import {url_resume_pdf_github, url_resume_pdf_github_english} from "@/data"

export const dynamic = "force-dynamic"

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
      // Cache the response at the CDN, without depending on a writable Next.js
      // data cache in the standalone deployment.
      cache: "no-store",
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

    // Finish reading before sending headers so upstream read errors are caught.
    const responseBody = await res.arrayBuffer()
    headers.set("Content-Length", String(responseBody.byteLength))
    return new NextResponse(responseBody, {headers})
  } catch (err) {
    console.error("Proxy error:", err)
    return NextResponse.json(
      {error: "Internal Server Error"},
      {status: 500},
    )
  }
}
