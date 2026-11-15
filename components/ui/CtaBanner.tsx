import type { ReactNode } from "react";
import { Container } from "./Section";
import { Reveal } from "./Reveal";
import { OrbitRings, Starfield } from "@/components/visuals/Backdrops";

export function CtaBanner({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,rgb(37_99_235/0.35),transparent_60%),linear-gradient(180deg,#111B2B,#0B1322)] px-6 py-16 text-center sm:px-12 sm:py-24">
          <Starfield count={50} seed={42} />
          <OrbitRings className="left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
              {title}
            </h2>
            {description && <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{description}</p>}
            <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
