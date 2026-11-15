import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard, IconTile } from "@/components/ui/Cards";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { differentiators, mission, pillars, story, values, vision } from "@/content/about";
import { membershipHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "About",
  description:
    "STARY's story, mission, vision and values: a student-led platform for hands-on aerospace engineering at York University.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About STARY"
        title={
          <>
            A launchpad for students who want to <span className="text-gradient">build space technology.</span>
          </>
        }
        description="Space Technology and Research at York is a student-led organization making aerospace engineering, space technology and scientific research accessible to students from every discipline."
      />

      {/* Story */}
      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="story-title" index="01" eyebrow="Our story" title={story.heading} />
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7 lg:col-start-6">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section labelledBy="mv-title" className="pt-0 sm:pt-0">
        <h2 id="mv-title" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { label: "Mission", icon: "target" as const, text: mission },
            { label: "Vision", icon: "telescope" as const, text: vision },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="panel relative overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 size-64 rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.18),transparent_70%)]"
              />
              <Eyebrow>{item.label}</Eyebrow>
              <p className="mt-6 font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pillars */}
      <Section labelledBy="pillars-title">
        <SectionHeading
          id="pillars-title"
          index="02"
          eyebrow="How we work"
          title="Learn. Build. Compete."
          description={<p>Three commitments shape everything we do, from a first workshop to a competition entry.</p>}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.description} index={`0${i + 1}`} delay={i * 0.08} />
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section labelledBy="values-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <SectionHeading id="values-title" index="03" eyebrow="Core values" title="What we hold ourselves to." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.05} className="bg-space-900 p-6 transition-colors hover:bg-space-800">
              <IconTile name={v.icon} />
              <h3 className="mt-6 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Differentiators */}
      <Section labelledBy="diff-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="diff-title"
              index="04"
              eyebrow="What makes STARY different"
              title="Real engineering, open to everyone."
              description={
                <p>
                  We are structured like an engineering program, not a social club, while staying welcoming to
                  students who have never touched a robot.
                </p>
              }
            />
            <Reveal delay={0.1} className="mt-8">
              <ButtonLink href="/projects" variant="secondary">
                See what we&apos;re building
              </ButtonLink>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {differentiators.map((d, i) => (
              <FeatureCard key={d.title} icon={d.icon} title={d.title} description={d.description} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Help build what comes next."
        description="STARY is new, and the people who join now will shape what it becomes."
      >
        <ButtonLink href={membershipHref}>Become a Member</ButtonLink>
        <ButtonLink href="/team" variant="secondary">
          Meet the team
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
