import { cn } from "@/lib/utils";

/**
 * Technical line drawing of a satellite-servicing concept: a 3-joint
 * manipulator approaching a grapple fixture on a client spacecraft.
 * Lightweight SVG used on mobile, for reduced motion, and in content sections.
 */
export function SatelliteSchematic({
  className,
  titleBlock = true,
  animated = true,
  id = "sch",
}: {
  id?: string;
  className?: string;
  titleBlock?: boolean;
  animated?: boolean;
}) {
  const label = "font-mono text-[9px] tracking-[0.14em]";
  const linkOuter = { stroke: "rgb(59 130 246 / 0.6)", strokeWidth: 18, strokeLinecap: "round" as const };
  const linkInner = { stroke: "#0d1626", strokeWidth: 15, strokeLinecap: "round" as const };

  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <title id={`${id}-title`}>Concept illustration of robotic satellite servicing</title>
      <desc id={`${id}-desc`}>
        A line drawing of a three-joint robotic arm reaching toward a grapple fixture on a client satellite with a
        solar array and antenna. This is a conceptual illustration, not STARY flight hardware.
      </desc>

      <defs>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" stroke="rgb(164 178 198 / 0.06)" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2740" />
          <stop offset="1" stopColor="#0f1828" />
        </linearGradient>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14306a" />
          <stop offset="1" stopColor="#0c1b3d" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgb(34 211 238 / 0.35)" />
          <stop offset="1" stopColor="rgb(34 211 238 / 0)" />
        </radialGradient>
      </defs>

      <rect width="640" height="480" fill={`url(#${id}-grid)`} />

      {/* Orbit arcs */}
      <path d="M-20 400 C 160 250, 420 120, 680 70" stroke="rgb(34 211 238 / 0.22)" strokeDasharray="3 9" />
      <path d="M-20 460 C 200 330, 460 210, 680 170" stroke="rgb(164 178 198 / 0.1)" />

      {/* Coordinate triad */}
      <g transform="translate(44 70)" stroke="rgb(164 178 198 / 0.55)" strokeWidth="1.2">
        <path d="M0 0 H34" />
        <path d="M0 0 V-34" />
        <path d="M0 0 L-18 18" />
        <text x="40" y="4" className={label} fill="#A4B2C6" stroke="none">X</text>
        <text x="-4" y="-40" className={label} fill="#A4B2C6" stroke="none">Y</text>
        <text x="-30" y="30" className={label} fill="#A4B2C6" stroke="none">Z</text>
      </g>

      {/* ---------- Client spacecraft ---------- */}
      <g strokeLinejoin="round">
        {/* Solar array boom + panel */}
        <path d="M502 181 H530" stroke="#A4B2C6" strokeWidth="2" />
        <rect x="530" y="106" width="88" height="150" fill={`url(#${id}-panel)`} stroke="#3B82F6" strokeWidth="1.4" />
        <g stroke="rgb(59 130 246 / 0.55)" strokeWidth="0.8">
          <path d="M559.3 106V256M588.6 106V256" />
          <path d="M530 136H618M530 166H618M530 196H618M530 226H618" />
        </g>

        {/* Bus */}
        <path d="M360 150 L392 126 H502 L470 150 Z" fill="#1d2b45" stroke="#3B82F6" strokeWidth="1.4" />
        <path d="M470 150 L502 126 V236 L470 260 Z" fill="#0b1322" stroke="#3B82F6" strokeWidth="1.4" />
        <rect x="360" y="150" width="110" height="110" fill={`url(#${id}-front)`} stroke="#3B82F6" strokeWidth="1.4" />
        <rect x="373" y="163" width="84" height="84" stroke="rgb(164 178 198 / 0.18)" strokeDasharray="4 4" />
        <path d="M373 205 H457 M415 163 V247" stroke="rgb(164 178 198 / 0.1)" />

        {/* Antenna */}
        <path d="M430 138 V120" stroke="#A4B2C6" strokeWidth="1.6" />
        <ellipse cx="430" cy="113" rx="22" ry="7" fill="#111B2B" stroke="#22D3EE" strokeWidth="1.3" />

        {/* Thrusters */}
        <path d="M380 260 l-5 10 h14 l-5 -10 M450 260 l-5 10 h14 l-5 -10" stroke="#A4B2C6" strokeWidth="1.1" />

        {/* Grapple fixture */}
        <rect x="340" y="194" width="20" height="22" fill="#111B2B" stroke="#22D3EE" strokeWidth="1.4" />
        <circle cx="346" cy="205" r="4" fill="#22D3EE" />
        <circle cx="346" cy="205" r="16" fill={`url(#${id}-glow)`} />
      </g>

      {/* Dimension line */}
      <g stroke="rgb(164 178 198 / 0.45)" strokeWidth="1">
        <path d="M360 282 H470 M360 276 V288 M470 276 V288" />
      </g>
      <text x="415" y="300" textAnchor="middle" className={label} fill="#7F8EA5">
        BUS ENVELOPE · TBD
      </text>

      {/* Approach trajectory */}
      <path
        d="M334 208 Q 340 206 346 205"
        stroke="#22D3EE"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        className={animated ? "animate-dash" : undefined}
      />

      {/* ---------- Manipulator (concept) ---------- */}
      <path d="M70 424 L80 402 H140 L150 424 Z" fill="#111B2B" stroke="#A4B2C6" strokeWidth="1.3" />
      <path d="M60 424 H160" stroke="#A4B2C6" strokeWidth="1.3" />

      <g
        className={animated ? "animate-sway" : undefined}
        style={{ transformOrigin: "110px 392px", transformBox: "view-box" }}
      >
        <path d="M110 392 L190 282" {...linkOuter} />
        <path d="M110 392 L190 282" {...linkInner} />
        <path d="M190 282 L288 234" {...linkOuter} />
        <path d="M190 282 L288 234" {...linkInner} />
        <path d="M110 392 L190 282 L288 234" stroke="rgb(34 211 238 / 0.45)" strokeDasharray="2 5" />

        {/* Wrist and end effector */}
        <path d="M288 234 L318 214" stroke="#A4B2C6" strokeWidth="5" strokeLinecap="round" />
        <path d="M316 206 L330 198 M318 222 L334 214" stroke="#F5F7FA" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M316 206 L318 222" stroke="#F5F7FA" strokeWidth="2.4" strokeLinecap="round" />

        {[
          [110, 392],
          [190, 282],
          [288, 234],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="13" fill="#0b1322" stroke="#22D3EE" strokeWidth="1.5" />
            <path d={`M${cx - 6} ${cy} H${cx + 6} M${cx} ${cy - 6} V${cy + 6}`} stroke="rgb(34 211 238 / 0.6)" />
            <circle cx={cx} cy={cy} r="2.5" fill="#22D3EE" />
          </g>
        ))}
      </g>

      {/* Callouts */}
      <g stroke="rgb(164 178 198 / 0.5)" strokeWidth="0.9">
        <path d="M322 200 L282 160 H200" />
        <path d="M346 189 L370 92 H330" />
        <path d="M574 106 V84 H600" />
        <path d="M190 268 L230 330 H262" />
      </g>
      <g className={label} fill="#A4B2C6">
        <text x="200" y="152">END EFFECTOR</text>
        <text x="268" y="88">GRAPPLE FIXTURE</text>
        <text x="540" y="76">SOLAR ARRAY</text>
        <text x="236" y="346">J1 · ELBOW</text>
        <text x="102" y="448">MANIPULATOR · CONCEPT</text>
      </g>

      {titleBlock && (
        <g transform="translate(464 384)">
          <rect width="160" height="80" fill="#080D18" stroke="rgb(164 178 198 / 0.3)" />
          <path d="M0 26 H160 M0 53 H160 M80 26 V80" stroke="rgb(164 178 198 / 0.2)" />
          <text x="10" y="17" className="font-mono text-[8.5px] tracking-[0.06em]" fill="#F5F7FA">
            STARY · CONCEPT STUDY
          </text>
          <text x="10" y="43" className={label} fill="#7F8EA5">SAT-SERV</text>
          <text x="88" y="43" className={label} fill="#7F8EA5">REV 0</text>
          <text x="10" y="70" className={label} fill="#FBBF24">NOT FLIGHT</text>
          <text x="88" y="70" className={label} fill="#FBBF24">HARDWARE</text>
        </g>
      )}
    </svg>
  );
}
