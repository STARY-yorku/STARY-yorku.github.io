import type { MetadataRoute } from "next";
import { mainNav } from "@/content/navigation";
import { newsPosts } from "@/content/news";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const pages = mainNav.map((item) => ({
    url: `${base}${item.href === "/" ? "/" : `${item.href}/`}`,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));
  const posts = newsPosts
    .filter((p) => !p.sample)
    .map((p) => ({
      url: `${base}/news/${p.slug}/`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));
  return [...pages, ...posts];
}
