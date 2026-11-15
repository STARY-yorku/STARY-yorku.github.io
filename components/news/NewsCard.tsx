import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { NewsPost } from "@/content/news";
import { Badge } from "@/components/ui/Badge";
import { NewsCover } from "@/components/visuals/NewsCover";
import { formatDate } from "@/lib/utils";

export function NewsCard({ post, headingLevel = "h3" }: { post: NewsPost; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="panel panel-interactive group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.07]">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <NewsCover
            slug={post.slug}
            category={post.category}
            className="transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge tone="accent" className="bg-space-950/70 backdrop-blur">
            {post.category}
          </Badge>
          {post.sample && (
            <Badge tone="sample" className="bg-space-950/70 backdrop-blur">
              Sample
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <H className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{post.excerpt}</p>
        {post.event && (
          <dl className="mt-4 space-y-1.5 text-sm text-muted">
            <div className="flex gap-2">
              <dt className="sr-only">When</dt>
              <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
              <dd>{post.event.when}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="sr-only">Where</dt>
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
              <dd>{post.event.where}</dd>
            </div>
          </dl>
        )}
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-[#9cc3ff]">
          Read more
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
