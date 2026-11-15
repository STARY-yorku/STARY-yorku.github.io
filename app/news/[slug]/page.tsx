import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { NewsCard } from "@/components/news/NewsCard";
import { PostBody } from "@/components/news/PostBody";
import { NewsCover } from "@/components/visuals/NewsCover";
import { Starfield } from "@/components/visuals/Backdrops";
import { getPost, getSortedPosts, newsPosts } from "@/content/news";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  // Static export needs at least one path; with no posts, a placeholder path renders the 404 page.
  return newsPosts.length > 0 ? newsPosts.map((p) => ({ slug: p.slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.coverAlt ?? post.title }] } : {}),
    },
    robots: post.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getSortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <article>
      <header className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
        <Starfield count={50} seed={post.slug.length} />
        <Container className="relative max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All news
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{post.category}</Badge>
            {post.sample && <Badge tone="sample">Sample content</Badge>}
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
            Published <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </Container>
      </header>

      <Container className="max-w-4xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-white/10">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ""}
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          ) : (
            <NewsCover slug={post.slug} category={post.category} />
          )}
        </div>

        {post.event && (
          <dl className="panel mt-8 grid gap-4 p-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <CalendarDays aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cyan" />
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">When</dt>
                <dd className="mt-1 text-ink">{post.event.when}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cyan" />
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">Where</dt>
                <dd className="mt-1 text-ink">{post.event.where}</dd>
              </div>
            </div>
          </dl>
        )}

        <div className="mx-auto max-w-2xl py-12 text-lg">
          <p className="font-display text-xl leading-relaxed text-ink">{post.excerpt}</p>
          <PostBody body={post.body} />
          {post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-white/[0.07] py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                More from STARY
              </h2>
              <ButtonLink href="/news" variant="ghost" size="md">
                All news
              </ButtonLink>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <NewsCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </article>
  );
}
