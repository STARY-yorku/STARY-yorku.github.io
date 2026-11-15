import type { ReactNode } from "react";
import { Icon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function IconTile({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-11 items-center justify-center rounded-xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-cyan",
        className,
      )}
    >
      <Icon name={name} className="size-5" />
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  index,
  delay = 0,
  className,
  children,
  headingLevel = "h3",
}: {
  icon: IconName;
  title: string;
  description: ReactNode;
  index?: string;
  delay?: number;
  className?: string;
  children?: ReactNode;
  headingLevel?: "h3" | "h4";
}) {
  const H = headingLevel;
  return (
    <Reveal delay={delay} className={cn("panel panel-interactive flex flex-col p-6 sm:p-7", className)}>
      <div className="flex items-start justify-between">
        <IconTile name={icon} />
        {index && <span className="font-mono text-xs text-subtle">{index}</span>}
      </div>
      <H className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">{title}</H>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{description}</p>
      {children}
    </Reveal>
  );
}

/** Inline notice used wherever information still needs to be supplied. */
export function PendingNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
