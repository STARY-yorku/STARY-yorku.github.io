import type { ReactNode } from "react";

/**
 * Renders the simple plain-text post format used in content/news.ts:
 * blank-line separated paragraphs, "## " headings and "- " bullet lists.
 */
export function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  const out: ReactNode[] = [];

  blocks.forEach((block, i) => {
    const lines = block.split("\n").map((l) => l.trim());
    if (lines.length === 1 && lines[0].startsWith("## ")) {
      out.push(<h2 key={i}>{lines[0].slice(3)}</h2>);
    } else if (lines.every((l) => l.startsWith("- "))) {
      out.push(
        <ul key={i}>
          {lines.map((l) => (
            <li key={l}>{l.slice(2)}</li>
          ))}
        </ul>,
      );
    } else {
      out.push(<p key={i}>{lines.join(" ")}</p>);
    }
  });

  return <div className="prose-stary">{out}</div>;
}
