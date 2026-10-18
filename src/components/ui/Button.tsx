"use client";

import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "text-white bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] bg-left hover:bg-right shadow-[0_18px_40px_-18px_rgba(124,58,244,0.9)] hover:shadow-[0_22px_50px_-16px_rgba(99,102,241,0.95)]",
  glass:
    "text-ink glass hover:border-white/25 hover:bg-white/[0.09] hover:shadow-[0_18px_40px_-24px_rgba(124,58,244,0.8)]",
  ghost:
    "text-muted hover:text-ink hover:bg-white/[0.06]",
} as const;

type Common = {
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
};

function inner(
  { children, icon: Icon, showArrow }: Pick<Common, "icon" | "showArrow" | "children">,
  Arrow: LucideIcon,
) {
  return (
    <>
      {Icon ? <Icon className="h-4 w-4" strokeWidth={2} /> : null}
      <span>{children}</span>
      {showArrow ? (
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  icon,
  showArrow,
  className = "",
  type = "button",
  disabled,
  onClick,
}: Common & {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {inner({ children, icon, showArrow }, ArrowRight)}
    </motion.button>
  );
}

function smoothScrollToHash(href: string) {
  if (!href.startsWith("#") || href.length < 2) return;

  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  history.replaceState(null, "", href);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  showArrow,
  className = "",
  external,
}: Common & { href: string; external?: boolean }) {
  const isHash = !external && href.startsWith("#");
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const classes = `${base} ${variants[variant]} ${className}`;

  return (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      {isHash ? (
        <a
          href={href}
          onClick={(event) => {
            event.preventDefault();
            smoothScrollToHash(href);
          }}
          className={classes}
        >
          {inner({ children, icon, showArrow }, ArrowRight)}
        </a>
      ) : (
        <Link href={href} {...externalProps} className={classes}>
          {inner({ children, icon, showArrow }, ArrowRight)}
        </Link>
      )}
    </motion.span>
  );
}
