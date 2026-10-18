import {
  Bot,
  Code2,
  LayoutDashboard,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "landing",
    number: "01",
    title: "Landing & Booking Pages for Service & E-Commerce Brands",
    description:
      "High-converting landing and booking pages for service and e-commerce brands across the Gulf (KSA, UAE) and worldwide.",
    icon: Rocket,
    deliverables: [
      "Conversion-first page architecture",
      "Bilingual EN / AR-ready layouts",
      "Booking, enquiry & WhatsApp flows",
      "Core Web Vitals tuned for mobile ads",
    ],
  },
  {
    id: "dashboards",
    number: "02",
    title: "Real-Time Interactive Data Dashboards",
    description:
      "Complex datasets translated into clean, responsive, and actionable real-time UI components.",
    icon: LayoutDashboard,
    deliverables: [
      "Live metric, chart & table systems",
      "Role-based data visualization",
      "Filterable, sortable data tables",
      "Empty, loading & error states",
    ],
  },
  {
    id: "architecture",
    number: "03",
    title: "Next.js / React Modern Frontend Architecture",
    description:
      "Ultra-fast, SEO-friendly, scalable, and accessible web apps built with Next.js and React.",
    icon: Code2,
    deliverables: [
      "App Router + Server Components",
      "Design systems & component libraries",
      "SEO, schema & performance budgets",
      "WCAG-minded accessible UI",
    ],
  },
  {
    id: "ai",
    number: "04",
    title: "AI-Assisted Rapid UI Development",
    description:
      "AI-driven UI prototyping and automated testing for rapid, high-speed delivery without cutting quality.",
    icon: Bot,
    deliverables: [
      "AI-assisted UI prototyping (Cursor, V0)",
      "Automated visual regression checks",
      "Component generation pipelines",
      "Faster scope → shipped iterations",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  sourceUrl: string;
  metric: string;
  category: string;
  accent: "violet" | "indigo" | "fuchsia";
};

export const projects: Project[] = [
  {
    id: "analytics-dashboard",
    title: "Real-Time Enterprise Analytics Dashboard",
    description:
      "Live data visualization interface for business metrics and tracking.",
    tech: ["Next.js 14", "Tailwind CSS", "Recharts", "Framer Motion"],
    liveUrl: "https://analytics-demo.vercel.app",
    sourceUrl: "https://github.com/syedabuzar",
    metric: "12 live widgets",
    category: "Enterprise SaaS",
    accent: "violet",
  },
  {
    id: "gulf-booking",
    title: "Gulf Service Brand Booking & Landing Platform",
    description:
      "High-conversion bilingual booking portal optimized for Saudi/UAE clients.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "i18n"],
    liveUrl: "https://gulf-booking-demo.vercel.app",
    sourceUrl: "https://github.com/syedabuzar",
    metric: "+42% enquiries",
    category: "Service Brand — KSA / UAE",
    accent: "indigo",
  },
  {
    id: "ecommerce-showcase",
    title: "E-Commerce Frontend & Product Showcase",
    description:
      "Lightning-fast shopping web app focused on mobile conversion and micro-interactions.",
    tech: ["React.js", "Tailwind CSS", "Zustand", "REST APIs"],
    liveUrl: "https://shop-demo.vercel.app",
    sourceUrl: "https://github.com/syedabuzar",
    metric: "0.9s LCP",
    category: "E-Commerce",
    accent: "fuchsia",
  },
  {
    id: "saas-landing-system",
    title: "SaaS Marketing Site & Landing Page System",
    description:
      "Modular landing page system with reusable campaign blocks, built for rapid A/B iteration.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://saas-landing-demo.vercel.app",
    sourceUrl: "https://github.com/syedabuzar",
    metric: "1.1s LCP",
    category: "Landing Pages",
    accent: "violet",
  },
  {
    id: "ops-control-dashboard",
    title: "Operations Control Tower Dashboard",
    description:
      "Real-time operations dashboard unifying live KPIs, alerts and filterable performance tables.",
    tech: ["Next.js", "React", "Tailwind CSS", "Recharts"],
    liveUrl: "https://ops-dashboard-demo.vercel.app",
    sourceUrl: "https://github.com/syedabuzar",
    metric: "9 live widgets",
    category: "Real-Time Dashboard",
    accent: "indigo",
  },
  {
    id: "ai-ui-studio",
    title: "AI-Assisted UI Prototyping Studio",
    description:
      "Prompt-to-component workspace pairing AI generation with a live React preview canvas.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ai-ui-studio-demo.vercel.app",
    sourceUrl: "https://github.com/syedabuzar",
    metric: "2× faster ships",
    category: "AI Tooling",
    accent: "fuchsia",
  },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    id: "digitalhujra",
    role: "Senior Frontend Developer",
    company: "DigitalHujra — Software & Marketing Agency",
    period: "Jan 2025 — Present",
    type: "Full-time · Remote",
    highlights: [
      "Leading frontend architecture, Next.js optimization, and client UI strategy.",
      "Owning component systems that ship landing pages and dashboards faster.",
      "Translating marketing goals into measurable, conversion-focused UI.",
    ],
  },
  {
    id: "freelance",
    role: "Web Solution Consultant & Freelance Developer",
    company: "Independent · KSA, UAE & Global Clients",
    period: "Feb 2020 — Present",
    type: "Freelance · Contract",
    highlights: [
      "Delivered 20+ custom web platforms and landing pages for regional and global clients.",
      "Advised brands on frontend stack, performance budgets and UI/UX direction.",
      "Maintained 99% client satisfaction across long-term retainers.",
    ],
  },
];

export const education = [
  {
    id: "vu",
    degree: "B.S. Computer Software Engineering",
    school: "Virtual University of Pakistan (VU)",
    period: "Software Engineering",
  },
  {
    id: "uom",
    degree: "Web Development & Software Engineering",
    school: "University of Malakand",
    period: "Professional Studies",
  },
];

export type TechIconName =
  | "SiNextdotjs"
  | "SiReact"
  | "SiTailwindcss"
  | "SiJavascript"
  | "SiTypescript"
  | "SiFramer"
  | "SiHtml5"
  | "SiCss"
  | "SiGit"
  | "SiGithub"
  | "SiCursor"
  | "SiVercel"
  | "SiPostman";

export type TechItem = {
  name: string;
  icon: TechIconName;
  note: string;
};

export type TechGroup = {
  id: string;
  label: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    id: "frameworks",
    label: "Frameworks",
    items: [
      { name: "Next.js", icon: "SiNextdotjs", note: "App Router · RSC · SEO" },
      { name: "React.js", icon: "SiReact", note: "Hooks · Composition" },
      { name: "Framer Motion", icon: "SiFramer", note: "Micro-interactions" },
    ],
  },
  {
    id: "ui",
    label: "Styling & UI",
    items: [
      { name: "Tailwind CSS", icon: "SiTailwindcss", note: "Design tokens" },
      { name: "HTML5", icon: "SiHtml5", note: "Semantic markup" },
      { name: "CSS3", icon: "SiCss", note: "Layout & animation" },
    ],
  },
  {
    id: "language",
    label: "Language & Data",
    items: [
      { name: "JavaScript (ES6+)", icon: "SiJavascript", note: "Modern JS" },
      { name: "TypeScript", icon: "SiTypescript", note: "Type-safe UI" },
      { name: "REST APIs", icon: "SiPostman", note: "Data contracts" },
    ],
  },
  {
    id: "tooling",
    label: "Tooling & AI",
    items: [
      { name: "Git / GitHub", icon: "SiGit", note: "CI & versioning" },
      { name: "AI Dev Tools", icon: "SiCursor", note: "Cursor · V0" },
      { name: "Vercel Deploy", icon: "SiVercel", note: "Edge delivery" },
    ],
  },
];

/** Sample placeholder reviews — replace with real client quotes before launch. */
export const testimonials = [
  {
    id: "t1",
    quote:
      "Abuzar rebuilt our booking funnel in under three weeks. The page is fast, bilingual, and our enquiry rate jumped almost immediately.",
    name: "Faisal Al-Harbi",
    role: "Growth Lead",
    company: "Service Brand — Riyadh, KSA",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The dashboard he shipped turned a messy spreadsheet into something our team actually opens every morning. Clean UI, zero lag.",
    name: "Mariam Al Suwaidi",
    role: "Operations Manager",
    company: "Enterprise Startup — Dubai, UAE",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Rare combination of engineering depth and design taste. Our storefront loads instantly on mobile and conversions prove it.",
    name: "Hamza Iqbal",
    role: "E-Commerce Director",
    company: "Retail Group — Karachi, PK",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Fast turnaround without cutting corners. His AI-assisted workflow meant we saw polished UI in days, not months.",
    name: "Sara Whitfield",
    role: "Product Owner",
    company: "SaaS Platform — London, UK",
    rating: 5,
  },
];

export const skillsSummary = [
  "Next.js",
  "React.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "Tailwind CSS",
  "Framer Motion",
  "Recharts",
  "Zustand",
  "REST APIs",
  "HTML5 / CSS3",
  "Git / GitHub",
  "AI Dev Tools (Cursor, V0)",
];

export const stats = [
  { value: 4, suffix: "+", label: "Years Experience", detail: "Since 2020" },
  { value: 20, suffix: "+", label: "Web Projects Completed", detail: "KSA · UAE · Global" },
  { value: 99, suffix: "%", label: "Client Satisfaction", detail: "Repeat & referral work" },
  { value: 48, suffix: "h", label: "Fast AI Turnaround", detail: "Prototype → delivery" },
];
