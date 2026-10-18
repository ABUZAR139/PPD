"use client";

import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experience } from "@/lib/data";
import { site } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-40 h-[360px] w-[360px] rounded-full bg-brand/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Resume & Experience"
          title="A track record of"
          accent="shipping real products."
          description="Four years of building, optimizing and consulting on frontend platforms for regional agencies, Gulf brands and global startups."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative pl-8 sm:pl-10">
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[9px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-brand via-accent/60 to-transparent sm:left-[13px]"
            />

            {experience.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.12} className="relative pb-8 last:pb-0">
                <span className="absolute -left-8 top-1.5 grid h-[19px] w-[19px] place-items-center rounded-full border border-brand/40 bg-canvas sm:-left-10">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-light to-accent shadow-[0_0_12px_rgba(124,58,244,0.9)]" />
                </span>

                <article className="glass glass-hover rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11.5px] font-medium text-brand-light">
                      <Briefcase className="h-3.5 w-3.5" />
                      {job.period}
                    </span>
                    <span className="text-[11.5px] text-muted">{job.type}</span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-[13.5px] font-medium text-accent">
                    {job.company}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {job.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.8px] leading-relaxed text-muted"
                      >
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand-light">
                    <GraduationCap className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">
                    Education
                  </h3>
                </div>

                <div className="mt-5 space-y-4">
                  {education.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-brand/30"
                    >
                      <p className="text-[14px] font-semibold text-ink">
                        {item.degree}
                      </p>
                      <p className="mt-1 text-[12.5px] text-muted">
                        {item.school}
                      </p>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-brand-light/80">
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass relative overflow-hidden rounded-3xl p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/25 blur-2xl" />
                <h3 className="relative font-display text-base font-bold text-ink">
                  Want the full breakdown?
                </h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted">
                  Download a print-ready résumé with stack, experience and
                  delivery highlights.
                </p>
                <a
                  href="/api/resume"
                  className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-accent px-6 py-3 text-[13px] font-semibold text-white shadow-[0_18px_38px_-20px_rgba(124,58,244,0.95)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Download Résumé
                  <ArrowDownToLine className="h-4 w-4" />
                </a>

                <div className="relative mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-[12.5px] text-muted">
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-brand-light" />
                    {site.location}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 text-emerald-400 pulse-dot" />
                    {site.availability}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
