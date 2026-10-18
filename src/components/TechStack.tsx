"use client";

import type { IconType } from "react-icons";
import {
  SiCss,
  SiCursor,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techGroups, type TechIconName } from "@/lib/data";

const iconMap: Record<TechIconName, IconType> = {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFramer,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiCursor,
  SiVercel,
  SiPostman,
};

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[280px] bg-gradient-to-r from-transparent via-brand/[0.07] to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Tech Stack & Tools"
          title="The toolkit behind"
          accent="fast, reliable delivery."
          description="A focused, modern stack — chosen for performance, maintainability and speed of iteration."
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((group) => (
            <RevealItem key={group.id} className="h-full">
              <div className="glass glass-hover h-full rounded-3xl p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-brand-light">
                    {group.label}
                  </h3>
                  <span className="text-[11px] text-muted">
                    {group.items.length}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <li
                        key={item.name}
                        className="group/item flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:bg-white/[0.06]"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-ink transition-colors duration-300 group-hover/item:bg-brand/20 group-hover/item:text-brand-light">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[13.5px] font-semibold text-ink">
                            {item.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-muted">
                            {item.note}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10">
          <div className="glass flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl px-6 py-5 text-center text-[12.5px] text-muted">
            <span>Accessible, semantic markup</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>Core Web Vitals budgets</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>SEO & schema ready</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>Design-system driven</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
