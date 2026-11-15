/**
 * Post-build fix for Next.js static export.
 *
 * `next build` with `output: "export"` writes per-segment prefetch files in
 * nested folders, e.g. `out/join/__next.join/__PAGE__.txt`, while the client
 * router requests flat names, e.g. `out/join/__next.join.__PAGE__.txt`.
 * On static hosts (GitHub Pages, any CDN) those requests 404 and navigation
 * falls back to full page loads. This script writes the flat copies.
 *
 * Runs automatically after `npm run build` (the "postbuild" script).
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");
if (!fs.existsSync(outDir)) {
  console.log(`[flatten-prefetch] ${outDir} not found, skipping.`);
  process.exit(0);
}

let created = 0;

function collectFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? collectFiles(p) : [p];
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name === "_next") continue; // static assets
    if (entry.name.startsWith("__next.")) {
      for (const file of collectFiles(full)) {
        const rel = path.relative(full, file).split(path.sep).join(".");
        const target = path.join(dir, `${entry.name}.${rel}`);
        if (!fs.existsSync(target)) {
          fs.copyFileSync(file, target);
          created += 1;
        }
      }
      continue;
    }
    walk(full);
  }
}

walk(outDir);
console.log(`[flatten-prefetch] wrote ${created} flat prefetch file(s).`);
