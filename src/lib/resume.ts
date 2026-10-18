import { education, experience, skillsSummary, stats } from "./data";
import { site } from "./site";

export type Resume = {
  name: string;
  title: string;
  location: string;
  email: string;
  links: typeof site.links;
  tagline: string;
  audience: string;
  highlights: string[];
  experience: typeof experience;
  education: typeof education;
  stack: string[];
  generatedAt: string;
};

export function buildResume(): Resume {
  return {
    name: site.name,
    title: site.title,
    location: site.location,
    email: site.email,
    links: site.links,
    tagline: site.tagline,
    audience: site.audience,
    highlights: stats.map((s) => `${s.value}${s.suffix} ${s.label}`),
    experience,
    education,
    stack: skillsSummary,
    generatedAt: new Date().toISOString(),
  };
}

export function renderResumeHtml(resume: Resume): string {
  const esc = (v: string) =>
    v.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
    );

  const jobs = resume.experience
    .map(
      (job) => `
      <section class="job">
        <div class="row">
          <div>
            <h3>${esc(job.role)}</h3>
            <p class="org">${esc(job.company)}</p>
          </div>
          <span class="period">${esc(job.period)}</span>
        </div>
        <p class="meta">${esc(job.type)}</p>
        <ul>${job.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
      </section>`,
    )
    .join("");

  const schools = resume.education
    .map(
      (ed) => `
      <div class="edu">
        <h3>${esc(ed.degree)}</h3>
        <p class="org">${esc(ed.school)} · ${esc(ed.period)}</p>
      </div>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(resume.name)} — Resume</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 40px 44px; background: #ffffff; color: #171b26;
    font-family: "Inter", "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 14px; line-height: 1.55;
  }
  header { border-bottom: 2px solid #7c3aed; padding-bottom: 18px; margin-bottom: 22px; }
  h1 { margin: 0; font-size: 30px; letter-spacing: -0.02em; }
  .title { color: #6366f1; font-weight: 600; margin: 4px 0 8px; }
  .contact { color: #4b5565; font-size: 13px; }
  .contact span + span::before { content: " · "; color: #a3a9bb; }
  h2 {
    font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em;
    color: #7c3aed; margin: 26px 0 12px;
  }
  .summary { margin: 0; color: #3d4455; }
  .highlights { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 14px 0 0; list-style: none; }
  .highlights li {
    background: #f4f2ff; border: 1px solid #ddd6fe; color: #5b21b6;
    padding: 5px 10px; border-radius: 999px; font-size: 12.5px; font-weight: 600;
  }
  .job { margin-bottom: 18px; page-break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
  h3 { margin: 0; font-size: 15.5px; }
  .org { margin: 2px 0 0; color: #6366f1; font-weight: 600; font-size: 13.5px; }
  .period { color: #6b7280; font-size: 12.5px; white-space: nowrap; }
  .meta { margin: 2px 0 6px; color: #8b91a3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
  ul { margin: 0; padding-left: 18px; color: #3d4455; }
  li { margin-bottom: 4px; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .edu h3 { font-size: 14.5px; }
  .stack { display: flex; flex-wrap: wrap; gap: 7px; padding: 0; margin: 0; list-style: none; }
  .stack li {
    border: 1px solid #e5e7eb; background: #f9fafb; border-radius: 6px;
    padding: 4px 9px; font-size: 12.5px; color: #374151;
  }
  footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #eceef3; color: #9ca3af; font-size: 11.5px; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <header>
    <h1>${esc(resume.name)}</h1>
    <p class="title">${esc(resume.title)}</p>
    <p class="contact">
      <span>${esc(resume.location)}</span><span>${esc(resume.email)}</span>
      <span>${esc(resume.links.portfolio)}</span><span>${esc(resume.links.linkedin)}</span>
    </p>
  </header>

  <h2>Profile</h2>
  <p class="summary">${esc(resume.tagline)} ${esc(resume.audience)}</p>
  <ul class="highlights">${resume.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>

  <h2>Experience</h2>
  ${jobs}

  <div class="grid">
    <div>
      <h2>Education</h2>
      ${schools}
    </div>
    <div>
      <h2>Core Stack</h2>
      <ul class="stack">${resume.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    </div>
  </div>

  <footer>Generated ${new Date(resume.generatedAt).toUTCString()} · ${esc(resume.email)}</footer>
</body>
</html>`;
}
