import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const description = `${site.tagline} ${site.audience} Senior Frontend Engineer based in ${site.location}, delivering Next.js landing pages, real-time dashboards and AI-accelerated web apps.`;

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "Syed Abuzar",
    "Senior Frontend Engineer",
    "Next.js Developer Pakistan",
    "React Developer KSA",
    "UI UX Web Strategist",
    "Freelance Frontend Developer UAE",
    "Real-Time Dashboard Developer",
    "Landing Page Developer Saudi Arabia",
    "E-commerce Frontend Developer",
    "AI Accelerated Web Development",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} — ${site.title}`,
    title: `${site.name} — ${site.title}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.title}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#090d16",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chakdara",
    addressRegion: "Khyber Pakhtunkhwa",
    addressCountry: "PK",
  },
  sameAs: [site.links.linkedin, site.links.github, site.links.portfolio],
  knowsAbout: [
    "Next.js",
    "React",
    "Frontend Architecture",
    "UI/UX Design",
    "Real-Time Dashboards",
    "Web Performance",
    "E-Commerce Development",
  ],
  description: site.tagline,
};

const professionalJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} — Frontend Engineering & UI Strategy`,
  description,
  areaServed: ["SA", "AE", "PK", "Worldwide"],
  provider: { "@type": "Person", name: site.name },
  email: `mailto:${site.email}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
