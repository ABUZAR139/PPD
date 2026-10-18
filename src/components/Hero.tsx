"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, MapPin, Sparkles, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
          <div>
            <Reveal delay={0.05}>
              <span className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/80 backdrop-blur-md">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 text-emerald-400 pulse-dot" />
                Available for Contract &amp; Freelance
                <span className="hidden h-3 w-px bg-white/15 sm:block" />
                <span className="text-brand-light">Gulf &amp; Worldwide</span>
              </span>
            </Reveal>

            <Reveal delay={0.13}>
              <h1 className="mt-7 font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.25rem]">
                Syed Abuzar
              </h1>
            </Reveal>

            <Reveal delay={0.21}>
              <h2 className="mt-4 max-w-2xl font-display text-[1.4rem] font-semibold leading-[1.22] tracking-[-0.02em] text-ink/90 sm:text-[1.9rem] lg:text-[2.15rem]">
                Transforming Businesses with{" "}
                <span className="text-gradient text-shadow-glow">
                  Fast, Modern Next.js Web Platforms
                </span>{" "}
                &amp; AI Solutions
              </h2>
            </Reveal>

            <Reveal delay={0.29}>
              <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
                Frontend Engineer &amp; UI/UX Web Strategist specializing in
                High-Converting Landing Pages, Real-Time Dashboards, and
                Scalable Web Apps.
              </p>
            </Reveal>

            <Reveal delay={0.37}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <ButtonLink
                  href="#portfolio"
                  variant="primary"
                  icon={Sparkles}
                  showArrow
                  className="px-7 py-3.5 text-sm"
                >
                  Explore Portfolio
                </ButtonLink>

                <ButtonLink
                  href="#contact"
                  variant="glass"
                  icon={ArrowUpRight}
                  className="px-7 py-3.5 text-sm"
                >
                  Let&apos;s Work Together
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-muted">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-light" />
                  {site.location}
                </span>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400">
                    <span className="absolute inset-0 rounded-full bg-indigo-400/60 blur-sm" />
                  </span>
                  Gulf (KSA / UAE) &amp; Worldwide
                </span>
              </div>
            </Reveal>
          </div>

          <ProfileVisual />
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <SmartImage
        src="/images/office-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        fallbackClassName="bg-[radial-gradient(120%_90%_at_50%_0%,#171c31_0%,#0b0f19_48%,#070a12_100%)]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
      <div className="absolute inset-0 grid-overlay grid-fade opacity-70" />

      <div className="absolute left-1/2 top-[-17rem] h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[#7c3aed]/25 blur-[150px]" />
      <div className="absolute right-[-8%] top-44 h-[340px] w-[340px] rounded-full bg-[#6366f1]/20 blur-[130px]" />
      <div className="absolute bottom-[-7rem] left-[-7%] h-[320px] w-[320px] rounded-full bg-[#7c3aed]/15 blur-[125px]" />

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-slate-950" />
    </div>
  );
}

function ProfileVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal delay={0.24} y={40} className="relative mx-auto w-full max-w-[26rem] sm:max-w-md lg:max-w-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 34 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { y: -10, scale: 1.02 }}
        className="group relative"
      >
        <div className="pointer-events-none absolute -inset-10 rounded-[3.5rem] bg-gradient-to-br from-[#7c3aed]/45 via-[#6366f1]/20 to-transparent opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[3px] rounded-[2.4rem] bg-[conic-gradient(from_0deg,#7c3aed,#6366f1,#e879f9,#a78bfa,#7c3aed)] opacity-70 blur-[7px]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />

        <div className="glass brand-ring relative overflow-hidden rounded-[2.25rem] p-2.5">
          <div className="relative aspect-square overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-[#7c3aed]/35 via-[#6366f1]/15 to-[#0b0f19]">
            <SmartImage
              src="/images/syed-abuzar-profile.png"
              alt="Syed Abuzar — Frontend Engineer & UI/UX Web Strategist"
              fill
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              fallbackClassName="grid place-items-center"
              fallback={
                <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_32%_26%,rgba(124,58,244,0.4),transparent_62%)]">
                  <span className="font-display text-7xl font-bold text-gradient">
                    {site.shortName}
                  </span>
                </div>
              }
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 backdrop-blur-md">
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] font-bold text-ink">
                  {site.name}
                </p>
                <p className="truncate text-[11.5px] text-muted">{site.title}</p>
              </div>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-white shadow-[0_10px_24px_-12px_rgba(124,58,244,0.95)]">
                <BadgeCheck className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass absolute -left-5 top-16 hidden rounded-2xl px-4 py-3 sm:block"
        >
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted">
            Experience
          </p>
          <p className="inline-flex items-center gap-1.5 font-display text-xl font-bold text-emerald-300">
            <Zap className="h-4 w-4" />
            4+ years
          </p>
        </motion.div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="glass absolute -right-4 bottom-24 hidden rounded-2xl px-4 py-3 sm:block"
        >
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted">
            Delivery
          </p>
          <p className="font-display text-sm font-bold text-brand-light">
            AI-assisted · 2× faster
          </p>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}
