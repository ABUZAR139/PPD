/**
 * Central site configuration.
 * UPDATE the `links` block below with your real profiles before deploying.
 */
export const site = {
  name: "Syed Abuzar",
  shortName: "SA.",
  title: "Senior Frontend Engineer & UI/UX Web Strategist",
  location: "Chakdara, Khyber Pakhtunkhwa, Pakistan",
  timezone: "PKT (UTC+5)",
  tagline:
    "Building High-Converting Web Platforms, Real-Time Dashboards & AI-Accelerated Frontend Solutions.",
  audience:
    "E-commerce brands, service platforms, and enterprise startups across Saudi Arabia (KSA), Dubai (UAE), and Globally.",
  availability: "Available for Remote & Contract Work | Gulf & Worldwide",
  email: "hello@syedabuzar.dev",
  links: {
    // REPLACE with your real handles
    linkedin: "https://www.linkedin.com/in/syed-abuzar",
    github: "https://github.com/syedabuzar",
    portfolio: "https://syedabuzar.vercel.app",
    calendar: "",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-abuzar" },
    { label: "GitHub", href: "https://github.com/syedabuzar" },
    { label: "Portfolio", href: "https://syedabuzar.vercel.app" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;
