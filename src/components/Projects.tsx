"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/lib/data";

const accentMap = {
  violet: "from-violet-500/30 via-violet-500/5 to-transparent",
  indigo: "from-indigo-500/30 via-indigo-500/5 to-transparent",
  fuchsia: "from-fuchsia-500/30 via-fuchsia-500/5 to-transparent",
} as const;

const filters = [
  { id: "all", label: "All Work" },
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "framer", label: "Framer Motion" },
  { id: "dashboards", label: "Dashboards" },
] as const;

type FilterId = (typeof filters)[number]["id"];

const matchers: Record<Exclude<FilterId, "all">, (project: Project) => boolean> = {
  nextjs: (project) => project.tech.some((tech) => /next/i.test(tech)),
  react: (project) => project.tech.some((tech) => /^react/i.test(tech)),
  tailwind: (project) => project.tech.some((tech) => /tailwind/i.test(tech)),
  framer: (project) => project.tech.some((tech) => /framer/i.test(tech)),
  dashboards: (project) =>
    /dashboard/i.test(
      `${project.title} ${project.category} ${project.description}`,
    ),
};

export function Projects() {
  const [active, setActive] = useState<FilterId>("all");

  const matched = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((project) => matchers[active](project));
  }, [active]);

  const featured = active === "all" ? matched[0] : undefined;
  const rest = featured ? matched.slice(1) : matched;

  return (
    <section id="portfolio" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.35]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Latest Works"
          title="Featured projects &"
          accent="live product builds."
          description="Filterable gallery of Next.js, React, Tailwind CSS, Framer Motion and real-time dashboard builds for Gulf and global clients."
        />

        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                aria-pressed={isActive}
                className={`relative rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors duration-300 ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/10 bg-white/[0.035] text-muted hover:border-brand/40 hover:text-ink"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-accent shadow-[0_14px_32px_-18px_rgba(124,58,244,0.95)]"
                  />
                ) : null}
                <span className="relative">{filter.label}</span>
              </button>
            );
          })}

          <span className="ml-auto hidden text-[12.5px] text-muted sm:block">
            {matched.length} {matched.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {featured ? (
            <motion.div
              key={featured.id}
              layout
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <FeaturedCard project={featured} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {rest.length > 0 ? (
          <RevealGroup
            key={active}
            className={`grid gap-6 lg:grid-cols-2 ${
              featured ? "mt-6" : "mt-10"
            }`}
          >
            {rest.map((project) => (
              <RevealItem key={project.id} className="h-full">
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : null}

        {matched.length === 0 ? (
          <div className="glass mt-10 rounded-3xl px-6 py-12 text-center">
            <p className="font-display text-lg font-bold text-ink">
              No projects in this filter yet.
            </p>
            <p className="mt-2 text-[14px] text-muted">
              Pick another stack above, or tell me what you need built.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group glass relative grid overflow-hidden rounded-3xl lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative p-7 pt-7 lg:p-9">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[project.accent]} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              Featured
            </span>
            <span className="text-[12.5px] text-muted">{project.category}</span>
          </div>

          <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
            {project.title}
          </h3>

          <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-ink/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-accent px-6 py-3 text-[13px] font-semibold text-white shadow-[0_18px_38px_-20px_rgba(124,58,244,0.95)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-[13px] font-semibold text-ink/85 transition-colors duration-300 hover:border-white/25 hover:text-ink"
            >
              <FaGithub className="h-4 w-4" />
              Source
            </a>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-brand-light">
              <TrendingUp className="h-4 w-4" />
              {project.metric}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex items-center p-6 lg:p-8">
        <ProjectPreview id={project.id} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group glass glass-hover relative flex h-full flex-col overflow-hidden rounded-3xl">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[project.accent]} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
      />
      <div className="relative p-4">
        <ProjectPreview id={project.id} compact />
      </div>

      <div className="relative flex flex-1 flex-col p-6 pt-2 sm:p-7 sm:pt-2">
        <span className="text-[12px] uppercase tracking-[0.16em] text-muted">
          {project.category}
        </span>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-medium text-ink/75"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brand-light">
            <Sparkles className="h-3.5 w-3.5" />
            {project.metric}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-colors duration-300 hover:border-white/25 hover:text-ink"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-ink transition-colors duration-300 hover:bg-brand/25"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function PreviewShell({
  url,
  children,
  compact,
}: {
  url: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-500 group-hover:scale-[1.015]">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-300/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 truncate rounded-md bg-black/25 px-2 py-0.5 text-[10px] text-muted">
          {url}
        </span>
      </div>
      <div className={`mt-3 ${compact ? "h-36" : "h-56 sm:h-64"}`}>{children}</div>
    </div>
  );
}

function ProjectPreview({ id, compact }: { id: string; compact?: boolean }) {
  if (id === "analytics-dashboard") {
    const bars = [38, 62, 48, 78, 56, 88, 70, 94];
    return (
      <PreviewShell url="analytics.enterprise.io" compact={compact}>
        <div className="flex h-full gap-3">
          <div className="flex-1 rounded-xl border border-white/[0.07] bg-black/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] text-muted">Revenue</span>
              <span className="text-[10.5px] font-semibold text-emerald-300">
                +18.4%
              </span>
            </div>
            <div className="mt-3 flex h-[calc(100%-24px)] items-end gap-1.5">
              {bars.map((height, index) => (
                <motion.span
                  key={index}
                  className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand/40 to-brand-light/90"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.08 * index, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
          <div className="hidden w-24 flex-col gap-2 sm:flex">
            {["Sessions", "Orders", "Uptime"].map((label, index) => (
              <div
                key={label}
                className="rounded-xl border border-white/[0.07] bg-black/20 p-2.5"
              >
                <p className="text-[9.5px] uppercase tracking-wider text-muted">
                  {label}
                </p>
                <p className="mt-1 text-[12.5px] font-semibold text-ink">
                  {["18.2k", "6.4k", "99.9%"][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PreviewShell>
    );
  }

  if (id === "gulf-booking") {
    return (
      <PreviewShell url="booking.gulfservice.sa" compact={compact}>
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2">
            <span className="text-[11px] text-muted">Language</span>
            <div className="flex items-center gap-1 rounded-lg bg-white/[0.06] p-0.5">
              <span className="rounded-md bg-brand/70 px-2.5 py-1 text-[10.5px] font-semibold text-white">
                EN
              </span>
              <span className="px-2.5 py-1 text-[10.5px] text-muted">عربي</span>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
              <div className="h-2 w-14 rounded-full bg-white/15" />
              <div className="mt-2 h-1.5 w-20 rounded-full bg-white/[0.09]" />
              <div className="mt-3 space-y-1.5">
                {[80, 62, 92].map((width, index) => (
                  <div
                    key={index}
                    className="h-1.5 rounded-full bg-white/[0.07]"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 h-6 rounded-lg bg-gradient-to-r from-brand to-accent" />
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
              <p className="text-[9.5px] uppercase tracking-wider text-muted">
                Book a slot
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {["S", "M", "T", "W", "T", "F", "S", "M", "T"].map((day, index) => (
                  <span
                    key={index}
                    className={`grid h-5 place-items-center rounded-md text-[9.5px] ${
                      index === 4
                        ? "bg-brand/80 font-semibold text-white"
                        : "bg-white/[0.05] text-muted"
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <p className="mt-2.5 rounded-md bg-emerald-400/10 px-2 py-1 text-[9.5px] text-emerald-300">
                14:30 confirmed
              </p>
            </div>
          </div>
        </div>
      </PreviewShell>
    );
  }

  if (id === "ecommerce-showcase") {
    return (
      <PreviewShell url="shop.modernstore.com" compact={compact}>
        <div className="grid h-full grid-cols-3 gap-2.5">
          {[0, 1, 2].map((column) => (
            <div key={column} className="flex flex-col gap-2.5">
              <div className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br from-brand/20 via-white/[0.04] to-accent/15">
                <span className="absolute left-2 top-2 rounded-md bg-black/35 px-1.5 py-0.5 text-[9px] text-white/80">
                  {["New", "-30%", "Hot"][column]}
                </span>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-2.5">
                <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="h-1.5 w-8 rounded-full bg-white/[0.09]" />
                  <span className="h-4 w-4 rounded-full bg-gradient-to-br from-brand to-accent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </PreviewShell>
    );
  }

  if (id === "ops-control-dashboard") {
    const bars = [46, 68, 54, 82, 62, 90];
    return (
      <PreviewShell url="ops.controltower.app" compact={compact}>
        <div className="flex h-full flex-col gap-2.5">
          <div className="grid grid-cols-3 gap-2.5">
            {["Throughput", "SLA", "Alerts"].map((label, index) => (
              <div
                key={label}
                className="rounded-xl border border-white/[0.07] bg-black/20 p-2.5"
              >
                <p className="text-[9.5px] uppercase tracking-wider text-muted">
                  {label}
                </p>
                <p
                  className={`mt-1 text-[12.5px] font-semibold ${
                    index === 2 ? "text-amber-300" : "text-emerald-300"
                  }`}
                >
                  {["1,284", "99.4%", "3"][index]}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-xl border border-white/[0.07] bg-black/20 p-3">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-accent/40 to-indigo-300/90"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.07 * index, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>
      </PreviewShell>
    );
  }

  if (id === "ai-ui-studio") {
    return (
      <PreviewShell url="studio.ai-components.dev" compact={compact}>
        <div className="grid h-full grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-2 rounded-xl border border-white/[0.07] bg-black/20 p-3">
            <span className="inline-flex w-fit items-center gap-1 rounded-md bg-brand/25 px-1.5 py-0.5 text-[9px] font-semibold text-brand-light">
              <Sparkles className="h-2.5 w-2.5" />
              Prompt
            </span>
            <div className="space-y-1.5">
              {[92, 74, 86, 58].map((width, index) => (
                <div
                  key={index}
                  className="h-1.5 rounded-full bg-white/[0.08]"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
            <div className="mt-auto h-5 rounded-lg bg-gradient-to-r from-brand to-accent" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[0, 1, 2, 3].map((tile) => (
              <div
                key={tile}
                className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-brand/20 via-white/[0.04] to-accent/15 p-2"
              >
                <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/[0.09]" />
                <div className="mt-3 h-4 rounded-md bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </div>
      </PreviewShell>
    );
  }

  return (
    <PreviewShell url="landing.saasproduct.com" compact={compact}>
      <div className="flex h-full flex-col gap-2.5">
        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
          <div className="h-2 w-24 rounded-full bg-white/20" />
          <div className="mt-2 h-1.5 w-40 rounded-full bg-white/[0.09]" />
          <div className="mt-3 flex gap-2">
            <span className="h-5 w-16 rounded-lg bg-gradient-to-r from-brand to-accent" />
            <span className="h-5 w-14 rounded-lg border border-white/12 bg-white/[0.05]" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2.5">
          {[0, 1, 2].map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-white/[0.07] bg-black/20 p-2.5"
            >
              <span className="grid h-5 w-5 place-items-center rounded-md bg-brand/30" />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/[0.09]" />
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}
