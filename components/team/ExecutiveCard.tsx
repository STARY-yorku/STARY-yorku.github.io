import Image from "next/image";
import { UserRound } from "lucide-react";
import type { Executive } from "@/content/team";
import { Reveal } from "@/components/ui/Reveal";

export function ExecutiveCard({ exec, delay = 0 }: { exec: Executive; delay?: number }) {
  const announced = Boolean(exec.name);
  return (
    <Reveal as="li" delay={delay} className="panel panel-interactive group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-white/[0.07] bg-space-800">
        {exec.image && exec.name ? (
          <Image
            src={exec.image}
            alt={`Portrait of ${exec.name}, ${exec.role} of STARY`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid-backdrop absolute inset-0 flex items-center justify-center [mask-image:none]">
            <span className="flex size-24 items-center justify-center rounded-full border border-dashed border-white/20 bg-space-900">
              <UserRound aria-hidden="true" className="size-10 text-subtle" strokeWidth={1.3} />
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-space-950/70 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-cyan backdrop-blur">
          {exec.role}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {exec.name ?? <span className="text-muted">To be announced</span>}
        </h3>
        <p className="mt-1 text-sm text-subtle">{exec.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{exec.bio ?? exec.responsibility}</p>
        {announced && exec.linkedin && (
          <a
            href={exec.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-[#9cc3ff] hover:text-ink"
          >
            LinkedIn profile
            <span className="sr-only"> for {exec.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </Reveal>
  );
}
