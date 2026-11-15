import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { Glow, OrbitRings, Starfield } from "@/components/visuals/Backdrops";

/** Shared hero for interior pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
      <Starfield count={60} seed={eyebrow.length * 13} />
      <Glow className="-top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2" />
      <OrbitRings className="-right-64 -top-40 hidden h-[760px] w-[760px] opacity-70 md:block" />
      <Container className="relative">
        <Reveal className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{description}</div>
          )}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
      <div aria-hidden="true" className="hairline absolute inset-x-0 bottom-0" />
    </section>
  );
}
