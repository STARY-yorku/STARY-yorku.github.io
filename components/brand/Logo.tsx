import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official STARY emblem (planet, orbit, satellite and star).
 * Source artwork: public/brand/stary-logo-original.png. The cropped files in
 * public/brand/ are generated from it.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/stary-emblem.png"
      alt=""
      aria-hidden="true"
      width={300}
      height={236}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
}

/** Full logo lockup: emblem, STARY wordmark and tagline. */
export function FullLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/stary-logo.png"
      alt="STARY — Space Technology and Research at York"
      width={1200}
      height={982}
      className={cn("h-auto", className ?? "w-full")}
    />
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
