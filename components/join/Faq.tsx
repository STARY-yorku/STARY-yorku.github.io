import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/** Native <details> accordion: keyboard accessible and works without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium tracking-tight text-ink transition-colors hover:text-cyan [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-subtle transition-transform duration-300 group-open:rotate-45 group-open:text-cyan"
            />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
