"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ArrowRight } from "lucide-react";
import type { Subteam } from "@/content/team";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Accessible tab interface (WAI-ARIA tabs pattern) for exploring subteams. */
export function SubteamExplorer({ subteams }: { subteams: Subteam[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionSafe();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (subteams.length === 0) return null;
  const team = subteams[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = subteams.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div
        role="tablist"
        aria-label="Technical subteams"
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {subteams.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={cn(
                "group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                selected
                  ? "border-accent/50 bg-gradient-to-r from-accent/15 to-transparent text-ink"
                  : "border-white/[0.07] bg-space-900/60 text-muted hover:border-white/20 hover:text-ink",
              )}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border transition-colors",
                  selected ? "border-cyan/50 text-cyan" : "border-white/10 text-subtle group-hover:text-muted",
                )}
              >
                <Icon name={t.icon} className="size-4" />
              </span>
              <span className="whitespace-nowrap font-medium lg:whitespace-normal">{t.name}</span>
              <ArrowRight
                aria-hidden="true"
                className={cn("ml-auto hidden size-4 transition-opacity lg:block", selected ? "opacity-100" : "opacity-0")}
              />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${team.id}`}
        tabIndex={0}
        className="panel relative min-h-[26rem] overflow-hidden p-7 sm:p-10 lg:col-span-8"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 size-80 rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.14),transparent_70%)]"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={team.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl border border-cyan/40 bg-cyan/10 text-cyan">
                <Icon name={team.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{team.name}</h3>
                <p className="mt-0.5 text-sm text-subtle">Lead: {team.lead ?? "To be announced"}</p>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{team.summary}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="eyebrow">Focus areas</h4>
                <ul className="mt-4 space-y-2.5">
                  {team.focus.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] text-ink">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="eyebrow">Tools and skills</h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {team.tools.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-accent/25 bg-accent/[0.06] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#9cc3ff]">
                Contribution to the flagship project
              </p>
              <p className="mt-2 text-ink">{team.contribution}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
