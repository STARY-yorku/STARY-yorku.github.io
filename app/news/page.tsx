import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { NewsBrowser } from "@/components/news/NewsBrowser";
import { getSortedPosts } from "@/content/news";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Project updates, competitions, workshops, club events, research and outreach from STARY at York University.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const posts = getSortedPosts();
  const hasSamples = posts.some((p) => p.sample);

  return (
    <>
      <PageHero
        eyebrow="News & events"
        title={
          <>
            Updates from <span className="text-gradient">the build.</span>
          </>
        }
        description="Project progress, competitions, workshops and events. Follow along as STARY grows."
      />
      <Section className="pt-14 sm:pt-16">
        <h2 className="sr-only">All posts</h2>
        {hasSamples && (
          <p className="mb-8 rounded-xl border border-dashed border-warning/40 bg-warning/[0.05] px-4 py-3 text-sm text-warning">
            Posts marked “Sample” are placeholder content and will be replaced with real updates.
          </p>
        )}
        <NewsBrowser posts={posts} />
      </Section>
    </>
  );
}
