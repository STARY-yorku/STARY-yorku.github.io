"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Check, Circle, CircleDashed, Flag, LoaderCircle } from "lucide-react";
import { statusLabels, type Milestone, type MilestoneStatus } from "@/content/projects";
import { cn } from "@/lib/utils";

const statusStyle: Record<MilestoneStatus, { icon: typeof Check; ring: string; text: string }> = {
  completed: { icon: Check, ring: "border-success/60 bg-success/15 text-success", text: "text-success" },
  "in-progress": { icon: LoaderCircle, ring: "border-cyan/60 bg-cyan/15 text-cyan", text: "text-cyan" },
  planned: { icon: Circle, ring: "border-white/20 bg-space-900 text-subtle", text: "text-subtle" },
  goal: { icon: Flag, ring: "border-accent/50 bg-accent/10 text-[#9cc3ff]", text: "text-[#9cc3ff]" },
};

type Filter = "all" | MilestoneStatus;

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const counts = useMemo(() => {
    const c: Record<MilestoneStatus, number> = { completed: 0, "in-progress": 0, planned: 0, goal: 0 };
    milestones.forEach((m) => (c[m.status] += 1));
    return c;
  }, [milestones]);

  const progress = milestones.length ? Math.round((counts.completed / milestones.length) * 100) : 0;
  const filters: Filter[] = ["all", "completed", "in-progress", "planned", "goal"];
  const visible = milestones.filter((m) => filter === "all" || m.status === filter);

  if (milestones.length === 0) {
    return <p className="text-muted">Milestones will be published here as the project plan is finalized.</p>;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="panel p-6 lg:sticky lg:top-28">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Confirmed progress</p>
          <p className="mt-3 font-display text-5xl font-semibold tracking-tight">
            {counts.completed}
            <span className="text-2xl text-subtle"> / {milestones.length}</span>
          </p>
          <div
            className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
            role="progressbar"
            aria-label="Milestones completed"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-cyan" style={{ width: `${progress}%` }} />
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {(Object.keys(counts) as MilestoneStatus[]).map((s) => (
              <div key={s}>
                <dt className={cn("font-mono text-[0.65rem] uppercase tracking-[0.14em]", statusStyle[s].text)}>
                  {statusLabels[s]}
                </dt>
                <dd className="mt-0.5 text-ink">{counts[s]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-t border-white/[0.07] pt-5">
            <p id="timeline-filter" className="mb-3 text-xs text-subtle">
              Filter milestones
            </p>
            <div role="group" aria-labelledby="timeline-filter" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    filter === f
                      ? "border-cyan/60 bg-cyan/10 text-ink"
                      : "border-white/10 text-muted hover:border-white/25 hover:text-ink",
                  )}
                >
                  {f === "all" ? "All" : statusLabels[f]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ol ref={ref} className="relative lg:col-span-8" aria-label="Project milestones">
        <div aria-hidden="true" className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-white/[0.08]" />
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-4 left-[1.1rem] top-4 w-px origin-top bg-gradient-to-b from-cyan to-accent"
          />
        )}
        {visible.length === 0 && (
          <li className="pl-14 text-muted">
            <CircleDashed aria-hidden="true" className="mb-2 size-5 text-subtle" />
            No milestones with this status yet.
          </li>
        )}
        {visible.map((m, i) => {
          const s = statusStyle[m.status];
          const StatusIcon = s.icon;
          return (
            <motion.li
              key={m.title}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="relative pb-6 pl-14 last:pb-0"
            >
              <span
                className={cn(
                  "absolute left-0 top-5 flex size-9 items-center justify-center rounded-full border",
                  s.ring,
                )}
              >
                <StatusIcon aria-hidden="true" className="size-4" />
              </span>
              <div className="panel panel-interactive p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className={cn("font-mono text-[0.68rem] uppercase tracking-[0.14em]", s.text)}>
                    {statusLabels[m.status]}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">
                    {m.date ?? "Date TBD"}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{m.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
