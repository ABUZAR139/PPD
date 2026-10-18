"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services built to"
          accent="convert, scale & impress."
          description="Four focused offerings that take Gulf and global brands from idea to a fast, measurable web presence."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.id}>
                <motion.article
                  whileHover={{ y: -7, scale: 1.012 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-500 hover:border-brand/45 hover:bg-white/[0.055] hover:shadow-[0_0_70px_-28px_rgba(124,58,244,0.95)] sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand/0 blur-2xl transition-all duration-700 group-hover:bg-brand/30" />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/25 to-accent/10 text-brand-light transition-all duration-500 group-hover:scale-105 group-hover:border-brand/50 group-hover:shadow-[0_12px_30px_-14px_rgba(124,58,244,0.9)]">
                      <Icon className="h-5.5 w-5.5" strokeWidth={1.9} />
                    </span>
                    <span className="font-display text-4xl font-bold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-brand/40">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-xl font-bold leading-snug tracking-tight text-ink sm:text-[1.35rem]">
                    {service.title}
                  </h3>

                  <p className="relative mt-3 text-[14.5px] leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="relative mt-5 space-y-2.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] text-ink/75"
                      >
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-light">
                          <Check className="h-2.5 w-2.5" strokeWidth={3.2} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="relative mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-light opacity-80 transition-all duration-300 group-hover:opacity-100"
                  >
                    Discuss this project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-10">
          <p className="text-center text-[13.5px] text-muted">
            Not sure which one fits?{" "}
            <a
              href="#contact"
              className="font-semibold text-brand-light underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
            >
              Tell me about the project
            </a>{" "}
            and I&apos;ll scope it with you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
