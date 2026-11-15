import type { NewsCategory } from "@/content/news";
import { cn, seededRandom } from "@/lib/utils";

const palette: Record<NewsCategory, [string, string]> = {
  "Project Updates": ["#3B82F6", "#22D3EE"],
  Competitions: ["#6366F1", "#3B82F6"],
  Workshops: ["#22D3EE", "#34D399"],
  "Club Events": ["#3B82F6", "#A78BFA"],
  Research: ["#0EA5E9", "#22D3EE"],
  "Community Outreach": ["#22D3EE", "#3B82F6"],
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) + 1;
}

/** Generated cover graphic for posts without a photo. Unique per slug. */
export function NewsCover({
  slug,
  category,
  className,
}: {
  slug: string;
  category: NewsCategory;
  className?: string;
}) {
  const [a, b] = palette[category];
  const rand = seededRandom(hash(slug));
  const gid = `nc-${hash(slug)}`;
  const cx = 30 + rand() * 40;
  const cy = 35 + rand() * 30;
  const tilt = -35 + rand() * 70;
  const stars = Array.from({ length: 26 }, () => [rand() * 400, rand() * 225, rand() * 0.8 + 0.3] as const);

  return (
    <svg viewBox="0 0 400 225" aria-hidden="true" className={cn("h-full w-full", className)} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${gid}-g`} cx={`${cx}%`} cy={`${cy}%`} r="70%">
          <stop offset="0" stopColor={a} stopOpacity="0.45" />
          <stop offset="0.55" stopColor={b} stopOpacity="0.08" />
          <stop offset="1" stopColor="#080D18" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill="#0B1322" />
      <rect width="400" height="225" fill={`url(#${gid}-g)`} />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#F5F7FA" opacity={0.5} />
      ))}
      <g transform={`rotate(${tilt} ${cx * 4} ${cy * 2.25})`} fill="none">
        <ellipse cx={cx * 4} cy={cy * 2.25} rx="150" ry="40" stroke={b} strokeOpacity="0.5" />
        <ellipse cx={cx * 4} cy={cy * 2.25} rx="95" ry="25" stroke={a} strokeOpacity="0.4" strokeDasharray="2 6" />
        <circle cx={cx * 4 + 150} cy={cy * 2.25} r="3.5" fill={b} />
      </g>
      <circle cx={cx * 4} cy={cy * 2.25} r="10" fill="#F5F7FA" opacity="0.9" />
      <circle cx={cx * 4} cy={cy * 2.25} r="22" fill={a} opacity="0.15" />
    </svg>
  );
}
