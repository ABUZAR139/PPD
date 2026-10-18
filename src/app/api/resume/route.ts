import { NextResponse } from "next/server";
import { connection } from "next/server";
import { buildResume, renderResumeHtml } from "@/lib/resume";

/**
 * GET /api/resume          -> downloads a print-ready HTML résumé
 * GET /api/resume?format=json -> structured résumé payload
 */
export async function GET(request: Request) {
  await connection();

  const { searchParams } = new URL(request.url);
  const resume = buildResume();

  if (searchParams.get("format") === "json") {
    return NextResponse.json(resume, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  }

  const html = renderResumeHtml(resume);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Syed-Abuzar-Resume.html"',
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
