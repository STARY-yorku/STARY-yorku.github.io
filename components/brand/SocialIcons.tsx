import type { SocialLinks } from "@/content/site";
import { cn } from "@/lib/utils";

/* Lucide no longer ships brand marks, so simple monochrome glyphs live here. */
const paths: Record<keyof SocialLinks, { label: string; d: string }> = {
  instagram: {
    label: "Instagram",
    d: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  linkedin: {
    label: "LinkedIn",
    d: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5Z",
  },
  github: {
    label: "GitHub",
    d: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  },
  discord: {
    label: "Discord",
    d: "M19.5 5.3A16.5 16.5 0 0 0 15.4 4l-.5 1a15.3 15.3 0 0 0-5.8 0l-.5-1a16.5 16.5 0 0 0-4.1 1.3C1.9 9.2 1.2 13 1.6 16.7a16.6 16.6 0 0 0 5 2.5l1.1-1.7a10.7 10.7 0 0 1-1.7-.8l.4-.3a11.8 11.8 0 0 0 11.2 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.7a16.5 16.5 0 0 0 5-2.5c.4-4.3-.7-8.1-2.9-11.4ZM8.5 14.4c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z",
  },
  youtube: {
    label: "YouTube",
    d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.8 3-5.8 3Z",
  },
  x: {
    label: "X",
    d: "M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.2L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z",
  },
};

export function SocialLinksList({
  social,
  className,
  showEmpty = true,
}: {
  social: SocialLinks;
  className?: string;
  showEmpty?: boolean;
}) {
  const entries = (Object.keys(paths) as (keyof SocialLinks)[]).filter((k) => social[k]);

  if (entries.length === 0) {
    return showEmpty ? <p className="text-sm text-subtle">Social channels coming soon.</p> : null;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {entries.map((key) => (
        <li key={key}>
          <a
            href={social[key] as string}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-cyan/60 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d={paths[key].d} />
            </svg>
            <span className="sr-only">STARY on {paths[key].label} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
