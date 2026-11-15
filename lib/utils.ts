import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Formats an ISO date (YYYY-MM-DD) without timezone drift. */
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    ...opts,
  }).format(new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1)));
}

export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** Deterministic pseudo-random generator, so decorative stars render identically on server and client. */
export function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
