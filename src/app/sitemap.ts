import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.links.portfolio;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#services`, lastModified: now, priority: 0.8 },
    { url: `${base}/#portfolio`, lastModified: now, priority: 0.8 },
    { url: `${base}/#experience`, lastModified: now, priority: 0.6 },
    { url: `${base}/#contact`, lastModified: now, priority: 0.7 },
  ];
}
