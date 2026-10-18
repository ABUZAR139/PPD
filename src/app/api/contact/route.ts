import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import {
  clientKey,
  forwardInquiry,
  persistInquiry,
  rateLimit,
  readInquiries,
  type Inquiry,
} from "@/lib/store";

const MIN_FILL_MS = 2500;

export async function POST(request: Request) {
  const key = clientKey(request);
  if (!rateLimit(key)) {
    return NextResponse.json(
      { ok: false, errors: { form: "Too many submissions. Please try again later." } },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Invalid request body." } },
      { status: 400 },
    );
  }

  const body = (payload ?? {}) as Partial<ContactInput>;

  // Honeypot + timing trap: silently accept and drop bot submissions.
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }
  if (Number(body.formTime ?? 0) < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json(result, { status: 422 });
  }

  const inquiry: Inquiry = {
    id: result.id,
    name: String(body.name).trim(),
    email: String(body.email).trim().toLowerCase(),
    projectType: String(body.projectType).trim(),
    region: typeof body.region === "string" ? body.region.trim() : undefined,
    budget: String(body.budget).trim(),
    message: String(body.message).trim(),
    userAgent: request.headers.get("user-agent") ?? "unknown",
    receivedAt: new Date().toISOString(),
  };

  const stored = persistInquiry(inquiry);
  const forwarded = await forwardInquiry(inquiry);

  if (stored === "none" && forwarded === "none") {
    return NextResponse.json(
      { ok: false, errors: { form: "Could not deliver your message. Please email directly." } },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}

/**
 * Admin listing — requires CONTACT_ADMIN_TOKEN.
 * GET /api/contact?token=...
 */
export async function GET(request: Request) {
  const token = process.env.CONTACT_ADMIN_TOKEN;
  const url = new URL(request.url);
  const provided = url.searchParams.get("token") ?? "";

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Admin access is not configured." },
      { status: 403 },
    );
  }
  if (provided !== token) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ ok: true, inquiries: readInquiries(50) });
}
