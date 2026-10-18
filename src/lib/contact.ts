export const budgetOptions = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Monthly retainer",
] as const;

export const projectTypeOptions = [
  "Dashboard",
  "Landing Page",
  "Custom App",
] as const;

export const regionOptions = [
  "Saudi Arabia (KSA)",
  "United Arab Emirates (UAE)",
  "Pakistan",
  "Middle East — Other",
  "Global / Remote",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  projectType: string;
  region?: string;
  budget: string;
  message: string;
  company?: string;
  formTime?: number;
};

export type ContactResult =
  | { ok: true; id: string }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export function validateContact(raw: unknown): ContactResult {
  const body = (raw ?? {}) as Record<string, unknown>;

  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const projectType = clean(body.projectType, 60);
  const budget = clean(body.budget, 60);
  const message = clean(body.message, 2000);

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!(projectTypeOptions as readonly string[]).includes(projectType))
    errors.projectType = "Select a project type.";
  if (!(budgetOptions as readonly string[]).includes(budget))
    errors.budget = "Select a budget range.";
  if (message.length < 10)
    errors.message = "Tell me a little more about the project (10+ characters).";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, id: buildId(name) };
}

function buildId(name: string) {
  const stamp = Date.now().toString(36);
  const slug =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 24) || "lead";
  return `${stamp}-${slug}`;
}
