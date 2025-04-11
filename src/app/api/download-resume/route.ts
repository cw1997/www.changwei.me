// app/api/proxy/resume/route.ts

import { NextResponse } from 'next/server';
import {url_resume_pdf} from "@/data";

export async function GET() {
  try {
    const res = await fetch(url_resume_pdf);

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch the target PDF' },
        { status: res.status }
      );
    }

    // 读取响应体为 Buffer
    const buffer = await res.arrayBuffer();
    const headers = new Headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume-wei_chang.pdf"',
      'Cache-Control': 'public, max-age=3600',
    });

    return new NextResponse(buffer, { headers });
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
