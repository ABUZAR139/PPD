import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  region?: string;
  budget: string;
  message: string;
  userAgent: string;
  receivedAt: string;
};

const FILE_NAME = "inquiries.ndjson";

function candidates(): string[] {
  const localDir = path.join(process.cwd(), "data");
  return [path.join(localDir, FILE_NAME), path.join(tmpdir(), FILE_NAME)];
}

export function persistInquiry(inquiry: Inquiry): "file" | "none" {
  const line = `${JSON.stringify(inquiry)}\n`;

  for (const file of candidates()) {
    try {
      const dir = path.dirname(file);
      if (!existsSync(/* turbopackIgnore: true */ dir))
        mkdirSync(/* turbopackIgnore: true */ dir, { recursive: true });
      appendFileSync(/* turbopackIgnore: true */ file, line, "utf8");
      return "file";
    } catch {
      // read-only filesystem (e.g. serverless) -> try next candidate
    }
  }
  return "none";
}

export function readInquiries(limit = 50): Inquiry[] {
  for (const file of candidates()) {
    try {
      if (!existsSync(/* turbopackIgnore: true */ file)) continue;
      const lines = readFileSync(/* turbopackIgnore: true */ file, "utf8")
        .split("\n")
        .filter(Boolean);
      return lines
        .slice(-limit)
        .reverse()
        .map((line) => JSON.parse(line) as Inquiry);
    } catch {
      // ignore and try next candidate
    }
  }
  return [];
}

export async function forwardInquiry(inquiry: Inquiry): Promise<"webhook" | "none"> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return "none";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "portfolio.inquiry", ...inquiry }),
      signal: AbortSignal.timeout(6000),
    });
    return res.ok ? "webhook" : "none";
  } catch {
    return "none";
  }
}

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (buckets.size > 500) buckets.clear();
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
