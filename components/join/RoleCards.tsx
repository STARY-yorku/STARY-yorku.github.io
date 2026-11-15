"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ChevronDown } from "lucide-react";
import type { RecruitmentArea } from "@/content/recruitment";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Expandable recruitment cards. A link to /join#role-<id> opens that card. */
export function RoleCards({ areas }: { areas: RecruitmentArea[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#role-(.+)$/);
      if (m && areas.some((a) => a.id === m[1])) setOpen(m[1]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [areas]);

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {areas.map((a) => {
        const expanded = open === a.id;
        const panelId = `role-panel-${a.id}`;
        return (
          <li key={a.id} id={`role-${a.id}`} className="scroll-mt-28">
            <div
              className={cn(
                "panel panel-interactive h-full overflow-hidden",
                expanded && "border-accent/45 shadow-[0_20px_60px_-30px_rgb(34_211_238/0.4)]",
              )}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : a.id)}
                  className="flex w-full items-start gap-4 p-6 text-left"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-cyan">
                    <Icon name={a.icon} className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg font-semibold text-ink">{a.title}</span>
                      {a.open ? <Badge tone="success">Open</Badge> : <Badge>Not currently recruiting</Badge>}
                    </span>
                    <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-muted">{a.summary}</span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("mt-1 size-5 shrink-0 text-subtle transition-transform", expanded && "rotate-180 text-cyan")}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    id={panelId}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 border-t border-white/[0.07] px-6 pb-6 pt-5 sm:grid-cols-2">
                      <div>
                        <h4 className="eyebrow">What you could learn</h4>
                        <ul className="mt-3 space-y-2">
                          {a.learn.map((l) => (
                            <li key={l} className="flex gap-2.5 text-sm text-ink">
                              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" />
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="eyebrow">How you could contribute</h4>
                        <ul className="mt-3 space-y-2">
                          {a.contribute.map((l) => (
                            <li key={l} className="flex gap-2.5 text-sm text-ink">
                              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm text-muted sm:col-span-2">
                        <span className="text-subtle">Good fit for: </span>
                        {a.goodFitFor}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
