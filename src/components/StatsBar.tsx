"use client";

import { Bot, Gauge, Layers, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Metric = {
  id: string;
  icon: LucideIcon;
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
  detail: string;
};

const metrics: Metric[] = [
  {
    id: "experience",
    icon: Gauge,
    value: 4,
    suffix: "+",
    label: "Years Experience",
    detail: "Frontend & Next.js",
  },
  {
    id: "delivery",
    icon: Layers,
    value: 20,
    suffix: "+",
    label: "Web Platforms & Dashboards Delivered",
    detail: "Gulf & worldwide clients",
  },
  {
    id: "ai",
    icon: Bot,
    display: "AI-Accelerated",
    label: "Delivery Workflows",
    detail: "Prototype → shipped, faster",
  },
  {
    id: "roi",
    icon: Target,
    value: 100,
    suffix: "%",
    label: "Focus on Business Conversion & ROI",
    detail: "Built to sell, not just look good",
  },
];

export function StatsBar() {
  return (
    <section
      aria-label="Key metrics"
      className="relative z-10 -mt-4 pb-2 pt-4 sm:-mt-6"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <RevealItem key={metric.id} className="h-full">
                <article className="group glass glass-hover relative h-full overflow-hidden rounded-3xl px-6 py-7 sm:px-7">
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition-all duration-700 group-hover:bg-brand/30" />

                  <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/25 to-accent/10 text-brand-light transition-all duration-500 group-hover:scale-110 group-hover:border-brand/50">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>

                  <p className="relative mt-5 font-display text-[2rem] font-bold leading-none tracking-tight text-ink sm:text-[2.2rem]">
                    {typeof metric.value === "number" ? (
                      <Counter value={metric.value} suffix={metric.suffix} />
                    ) : (
                      <span className="text-gradient">{metric.display}</span>
                    )}
                  </p>

                  <p className="relative mt-3 text-[14.5px] font-semibold leading-snug text-ink/85">
                    {metric.label}
                  </p>
                  <p className="relative mt-1 text-[12.5px] text-muted">
                    {metric.detail}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
