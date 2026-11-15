"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { newsCategories, type NewsCategory, type NewsPost } from "@/content/news";
import { NewsCard } from "./NewsCard";
import { cn } from "@/lib/utils";

export function NewsBrowser({ posts }: { posts: NewsPost[] }) {
  const [category, setCategory] = useState<NewsCategory | "All">("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    posts.forEach((p) => c.set(p.category, (c.get(p.category) ?? 0) + 1));
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))),
    );
  }, [posts, category, query]);

  const options: (NewsCategory | "All")[] = ["All", ...newsCategories];

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {options.map((c) => {
            const n = c === "All" ? posts.length : counts.get(c) ?? 0;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  category === c
                    ? "border-cyan/60 bg-cyan/10 text-ink"
                    : "border-white/10 text-muted hover:border-white/25 hover:text-ink",
                )}
              >
                {c}
                <span className="ml-1.5 font-mono text-xs text-subtle">{n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search news</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts and tags"
            className="h-11 w-full rounded-full border border-white/10 bg-space-900 pl-11 pr-4 text-sm text-ink placeholder:text-subtle focus:border-cyan/60 focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"} shown
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <li key={post.slug}>
              <NewsCard post={post} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel mt-10 flex flex-col items-center px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">Nothing here yet.</p>
          <p className="mt-2 max-w-md text-muted">
            {posts.length === 0
              ? "No updates have been published yet. Check back soon."
              : "No posts match this filter. Try another category or clear your search."}
          </p>
          {(category !== "All" || query) && (
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-ink hover:border-cyan/60"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
