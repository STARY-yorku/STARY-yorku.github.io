import { cn, seededRandom } from "@/lib/utils";

/** Static, deterministic star field rendered as a single SVG. */
export function Starfield({ count = 90, seed = 7, className }: { count?: number; seed?: number; className?: string }) {
  const rand = seededRandom(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 0.9 + 0.25,
    o: rand() * 0.6 + 0.2,
    twinkle: i % 9 === 0,
    delay: rand() * 5,
  }));
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.r}
          fill="#F5F7FA"
          opacity={s.o}
          className={s.twinkle ? "animate-twinkle" : undefined}
          style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
        />
      ))}
    </svg>
  );
}

/** Concentric orbital ellipses with tick marks, slowly rotating. */
export function OrbitRings({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 800"
      fill="none"
      className={cn("pointer-events-none absolute", className)}
    >
      <g className="origin-center animate-orbit" style={{ transformBox: "fill-box" }}>
        <circle cx="400" cy="400" r="390" stroke="rgb(164 178 198 / 0.08)" />
        <circle cx="400" cy="400" r="390" stroke="rgb(34 211 238 / 0.35)" strokeDasharray="2 14" />
        <circle cx="400" cy="10" r="3.5" fill="#22D3EE" />
      </g>
      <g className="origin-center animate-orbit-reverse" style={{ transformBox: "fill-box" }}>
        <circle cx="400" cy="400" r="290" stroke="rgb(164 178 198 / 0.1)" />
        <circle cx="400" cy="400" r="290" stroke="rgb(59 130 246 / 0.3)" strokeDasharray="1 8" />
        <rect x="686" y="396" width="8" height="8" fill="#3B82F6" transform="rotate(45 690 400)" />
      </g>
      <circle cx="400" cy="400" r="190" stroke="rgb(164 178 198 / 0.07)" />
      <path d="M400 0 V800 M0 400 H800" stroke="rgb(164 178 198 / 0.05)" />
    </svg>
  );
}

/** Soft atmospheric glow for section backgrounds. */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.22),transparent_65%)] blur-2xl",
        className,
      )}
    />
  );
}

/** Corner registration marks, like a technical drawing frame. */
export function CornerMarks({ className }: { className?: string }) {
  const mark = "absolute size-3 border-cyan/50";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(mark, "left-0 top-0 border-l border-t")} />
      <span className={cn(mark, "right-0 top-0 border-r border-t")} />
      <span className={cn(mark, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(mark, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}
