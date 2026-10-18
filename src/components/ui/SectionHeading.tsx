import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
      id={id}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-light">
        {eyebrow}
      </span>

      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
        {accent ? <span className="text-gradient"> {accent}</span> : null}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
