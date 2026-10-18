"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { budgetOptions, projectTypeOptions } from "@/lib/contact";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  company: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  company: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[14px] text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-brand/60 focus:bg-white/[0.06] focus:outline-none";

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const mountedAt = useRef<number>(0);
  const [leadId, setLeadId] = useState("");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          formTime: Date.now() - mountedAt.current,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        id?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setServerError(
          data.errors?.form ??
            "Something went wrong. Please email me directly instead.",
        );
        setStatus("error");
        return;
      }

      setLeadId(data.id ?? "");
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setServerError(
        "Network error. Please check your connection or email me directly.",
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-overlay grid-fade opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-brand/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something"
          accent="high-converting."
          description="Share your goals, project type and budget range — you'll get a scoped reply within 24 hours."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[11.5px] font-semibold text-emerald-300">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 text-emerald-400 pulse-dot" />
                Available — 2 project slots
              </span>

              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {site.name}
              </h3>
              <p className="mt-1 text-[13.5px] text-muted">{site.title}</p>

              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition-colors duration-300 hover:border-brand/35 hover:bg-white/[0.06]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                      Email
                    </span>
                    <span className="block truncate text-[13.5px] font-medium text-ink">
                      {site.email}
                    </span>
                  </span>
                </a>

                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition-colors duration-300 hover:border-brand/35 hover:bg-white/[0.06]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300">
                    <FaLinkedinIn className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                      LinkedIn
                    </span>
                    <span className="block truncate text-[13.5px] font-medium text-ink">
                      /in/syed-abuzar
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted" />
                </a>

                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition-colors duration-300 hover:border-brand/35 hover:bg-white/[0.06]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-ink">
                    <FaGithub className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                      GitHub
                    </span>
                    <span className="block truncate text-[13.5px] font-medium text-ink">
                      /syedabuzar
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted" />
                </a>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-[12.5px] text-muted">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brand-light" />
                  {site.location}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-brand-light" />
                  Replies within 24h · {site.timezone}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative py-10 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    >
                      <CheckCircle2 className="h-7 w-7" />
                    </motion.span>
                    <h3 className="mt-5 font-display text-xl font-bold text-ink">
                      Message received — thank you!
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted">
                      I&apos;ll review your project details and reply within 24
                      hours with next steps.
                    </p>
                    {leadId ? (
                      <p className="mt-3 text-[12px] text-muted/80">
                        Reference:{" "}
                        <span className="font-mono text-brand-light">{leadId}</span>
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-[13px] font-semibold text-brand-light underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative space-y-4"
                    noValidate
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" error={errors.name}>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={(event) => update("name", event.target.value)}
                          placeholder="e.g. Faisal Al-Harbi"
                          className={inputClass}
                          autoComplete="name"
                        />
                      </Field>

                      <Field label="Email" error={errors.email}>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={(event) => update("email", event.target.value)}
                          placeholder="you@company.com"
                          className={inputClass}
                          autoComplete="email"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Project type" error={errors.projectType}>
                        <select
                          name="projectType"
                          value={form.projectType}
                          onChange={(event) =>
                            update("projectType", event.target.value)
                          }
                          className={`${inputClass} appearance-none bg-[#0d1322] ${form.projectType ? "" : "text-muted/70"}`}
                        >
                          <option value="">Select project type…</option>
                          {projectTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Budget range" error={errors.budget}>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={(event) => update("budget", event.target.value)}
                          className={`${inputClass} appearance-none bg-[#0d1322] ${form.budget ? "" : "text-muted/70"}`}
                        >
                          <option value="">Select budget…</option>
                          {budgetOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field
                      label="Project details"
                      error={errors.message}
                      hint="Goals, timeline, pages or dashboard scope."
                    >
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={(event) => update("message", event.target.value)}
                        rows={5}
                        placeholder="I need a bilingual booking landing page for our Riyadh service brand…"
                        className={`${inputClass} resize-none`}
                      />
                    </Field>

                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={(event) => update("company", event.target.value)}
                      />
                    </div>

                    <AnimatePresence>
                      {serverError ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-[13px] text-rose-200"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {serverError}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] bg-left px-7 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_20px_44px_-20px_rgba(124,58,244,0.95)] transition-all duration-500 hover:bg-right disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-[12px] text-muted">
                        No spam. Your details stay private.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[12px] font-medium text-ink/80">
        {label}
        {hint ? <span className="text-[11px] text-muted/80">{hint}</span> : null}
      </span>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-[11.5px] text-rose-300"
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </label>
  );
}
