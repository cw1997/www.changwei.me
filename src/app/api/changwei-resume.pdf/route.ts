// app/api/proxy/resume/route.ts

import { NextResponse } from 'next/server';
import {url_resume_pdf_github} from "@/data";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(url_resume_pdf_github, {
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch the target PDF' },
        { status: res.status }
      );
    }

    const buffer = await res.arrayBuffer();
    const headers = new Headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="changwei-resume.pdf"',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
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
