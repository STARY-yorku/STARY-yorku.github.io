import { cn } from "@/lib/utils";

/**
 * Temporary original STARY mark: a star point inside a tilted orbit.
 * Replace with the official logo by swapping this component's SVG.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <linearGradient id="stary-mark" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="20" rx="17" ry="8" transform="rotate(-28 20 20)" stroke="url(#stary-mark)" strokeWidth="1.6" />
      <path
        d="M20 8.5 L22.3 17.7 L31.5 20 L22.3 22.3 L20 31.5 L17.7 22.3 L8.5 20 L17.7 17.7 Z"
        fill="#F5F7FA"
      />
      <circle cx="34.4" cy="12.6" r="2" fill="#22D3EE" />
    </svg>
  );
}

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-[0.22em] text-ink">STARY</span>
        {!compact && (
          <span className="mt-1 hidden font-mono text-[0.58rem] uppercase tracking-[0.2em] text-subtle sm:block">
            Space Technology &amp; Research at York
          </span>
        )}
      </span>
    </span>
  );
}
