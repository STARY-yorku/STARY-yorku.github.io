import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-2 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-accent-strong to-accent-deep text-white shadow-[0_0_0_1px_rgb(59_130_246/0.5),0_10px_30px_-10px_rgb(59_130_246/0.7)] hover:shadow-[0_0_0_1px_rgb(34_211_238/0.7),0_14px_40px_-10px_rgb(34_211_238/0.55)] hover:from-accent hover:to-accent-strong",
  secondary:
    "border border-white/15 bg-white/[0.03] text-ink backdrop-blur hover:border-cyan/60 hover:bg-white/[0.06]",
  ghost: "text-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Show a trailing arrow. External links get a diagonal arrow. */
  arrow?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  arrow = true,
  ariaLabel,
}: ButtonLinkProps) {
  const external = isExternal(href);
  const classes = cn(base, variants[variant], sizes[size], className);
  const ArrowIcon = external && !href.startsWith("mailto:") ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowIcon
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (external) {
    const newTab = !href.startsWith("mailto:") && !href.startsWith("tel:");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** A visibly unavailable action, for links that have not been configured yet. */
export function ButtonUnavailable({
  children,
  note,
  size = "lg",
  className,
}: {
  children: ReactNode;
  note?: string;
  size?: Size;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col items-start gap-1.5", className)}>
      <span
        aria-disabled="true"
        className={cn(
          base,
          sizes[size],
          "cursor-not-allowed border border-dashed border-white/20 text-subtle",
        )}
      >
        {children}
      </span>
      {note && <span className="text-xs text-subtle">{note}</span>}
    </span>
  );
}
