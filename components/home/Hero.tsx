"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Glow, OrbitRings, Starfield } from "@/components/visuals/Backdrops";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { siteConfig } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.2]);

  // MotionConfig (reducedMotion="user") drops the movement for visitors who prefer reduced motion.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 lg:pt-28"
    >
      <motion.div aria-hidden="true" style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0" />
        <Starfield count={140} seed={3} />
        <Glow className="-left-40 top-10 h-[600px] w-[700px]" />
        <Glow className="-right-20 bottom-0 h-[500px] w-[600px] opacity-70" />
        <OrbitRings className="-right-[22rem] top-1/2 h-[1000px] w-[1000px] -translate-y-1/2 opacity-80" />
        {/* Horizon */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-space-950 to-transparent" />
      </motion.div>

      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ opacity: fade }} className="lg:col-span-6 xl:col-span-6">
          <motion.p {...enter(0)} className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            {siteConfig.university.name} · {siteConfig.university.faculty}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...enter(0.08)}
            className="mt-7 font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.03em] text-balance sm:text-7xl xl:text-[5.4rem]"
          >
            Engineering the <span className="text-gradient">Next Frontier.</span>
          </motion.h1>

          <motion.p {...enter(0.18)} className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            From the classroom to the cosmos, STARY brings students together to design, build, and explore the
            technologies shaping the future of space.
          </motion.p>

          <motion.div {...enter(0.28)} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/join">Join STARY</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Explore Our Projects
            </ButtonLink>
          </motion.div>

          <motion.dl
            {...enter(0.38)}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.08] pt-6"
          >
            {[
              ["Focus", "Microgravity robotics"],
              ["Target", "CAN-RGX"],
              ["Open to", "All programs"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">{k}</dt>
                <dd className="mt-1.5 text-sm text-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div style={{ y: visualY }} className="relative lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual className="aspect-[4/3] w-full lg:aspect-square lg:scale-110" />
          </motion.div>
        </motion.div>
      </Container>

      <a
        href="#mission"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-ink md:flex"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown aria-hidden="true" className="size-4 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
