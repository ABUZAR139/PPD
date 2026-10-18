"use client";

import { ArrowUp, Globe, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { navLinks, site } from "@/lib/site";
import { services } from "@/lib/data";

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Portfolio: Globe,
} as const;

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-white/[0.07] pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-sm font-bold text-white">
                SA
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight text-ink">
                {site.name}
                <span className="text-brand-light">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {site.social.map((item) => {
                const Icon = socialIcons[item.label as keyof typeof socialIcons] ?? Globe;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/45 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/45 hover:text-ink"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Navigate">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13.5px] text-muted transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="text-[13.5px] leading-relaxed text-muted transition-colors duration-300 hover:text-ink"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Work With Me">
            <li>
              <a
                href="#contact"
                className="text-[13.5px] text-muted transition-colors duration-300 hover:text-ink"
              >
                Start a project
              </a>
            </li>
            <li>
              <a
                href="/api/resume"
                className="text-[13.5px] text-muted transition-colors duration-300 hover:text-ink"
              >
                Download résumé
              </a>
            </li>
            <li>
              <a
                href="/api/resume?format=json"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13.5px] text-muted transition-colors duration-300 hover:text-ink"
              >
                Résumé API (JSON)
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 sm:flex-row">
          <p className="text-[12.5px] text-muted">
            © 2026 {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-[12px] text-muted/80">
              Built with Next.js · Tailwind CSS · Framer Motion
            </p>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/45 hover:text-ink"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-ink/85">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}
