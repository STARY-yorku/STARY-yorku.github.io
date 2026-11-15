import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "accent" | "cyan" | "success" | "warning" | "sample";

const tones: Record<Tone, string> = {
  default: "border-white/12 bg-white/[0.04] text-muted",
  accent: "border-accent/40 bg-accent/10 text-[#9cc3ff]",
  cyan: "border-cyan/40 bg-cyan/10 text-cyan",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  sample: "border-dashed border-warning/50 bg-warning/[0.06] text-warning",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
