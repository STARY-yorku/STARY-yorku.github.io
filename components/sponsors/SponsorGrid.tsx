"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { Sponsor } from "@/content/sponsors";
import { contactHref } from "@/lib/links";

const INITIAL = 8;

/** Responsive logo grid. Shows placeholder slots until real sponsors are added. */
export function SponsorGrid({ sponsors, placeholderSlots }: { sponsors: Sponsor[]; placeholderSlots: number }) {
  const [expanded, setExpanded] = useState(false);

  if (sponsors.length === 0) {
    return (
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: placeholderSlots }, (_, i) => (
          <li key={i}>
            <Link
              href={contactHref("sponsorship")}
              className="group flex aspect-[3/2] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.015] text-center transition-colors hover:border-cyan/50 hover:bg-white/[0.03]"
            >
              <Plus aria-hidden="true" className="size-5 text-subtle transition-colors group-hover:text-cyan" />
              <span className="text-sm text-subtle group-hover:text-ink">Your organization here</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  const shown = expanded ? sponsors : sponsors.slice(0, INITIAL);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((s) => {
          const inner = (
            <>
              <span className="relative h-14 w-full">
                <Image src={s.logo} alt={`${s.name} logo`} fill sizes="200px" className="object-contain" />
              </span>
              {s.label && <span className="mt-3 text-xs text-subtle">{s.label}</span>}
            </>
          );
          const cls =
            "flex aspect-[3/2] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-cyan/50";
          return (
            <li key={s.name}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      {sponsors.length > INITIAL && (
        <div className="mt-8 text-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-ink hover:border-cyan/60"
          >
            {expanded ? "Show fewer" : `Show all ${sponsors.length} partners`}
          </button>
        </div>
      )}
    </div>
  );
}
