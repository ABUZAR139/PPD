"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(query.matches ? 2 : 1);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);
  const active = Math.min(index, maxIndex);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, maxIndex]);

  const go = (direction: 1 | -1) =>
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });

  return (
    <section className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[300px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Client Testimonials"
            title="Trusted for speed,"
            accent="precision & results."
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition-all duration-300 hover:border-brand/45 hover:bg-white/[0.08]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition-all duration-300 hover:border-brand/45 hover:bg-white/[0.08]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex"
            animate={{ x: `-${active * (100 / perView)}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 32 }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
              >
                <article className="glass h-full rounded-3xl p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-4 w-4 fill-amber-300 text-amber-300"
                        />
                      ))}
                    </div>
                    <Quote className="h-7 w-7 text-brand/40" />
                  </div>

                  <p className="mt-6 text-[15px] leading-relaxed text-ink/85">
                    “{item.quote}”
                  </p>

                  <div className="mt-7 flex items-center gap-3.5 border-t border-white/[0.07] pt-6">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-[13px] font-bold text-white">
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold text-ink">
                        {item.name}
                      </span>
                      <span className="block text-[12.5px] text-muted">
                        {item.role} · {item.company}
                      </span>
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Go to testimonial group ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === active
                  ? "w-8 bg-gradient-to-r from-brand to-accent"
                  : "w-4 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="glass grid gap-6 rounded-3xl px-6 py-7 sm:grid-cols-3 sm:px-8">
            {[
              {
                icon: ShieldCheck,
                title: "99% Satisfaction",
                detail: "Measured across 20+ delivered projects",
              },
              {
                icon: Star,
                title: "KSA · UAE · Global",
                detail: "Bilingual, region-aware builds",
              },
              {
                icon: Quote,
                title: "Repeat Clients",
                detail: "Most work comes from referrals",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand-light">
                  <item.icon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-ink">
                    {item.title}
                  </span>
                  <span className="block text-[12.5px] text-muted">
                    {item.detail}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
