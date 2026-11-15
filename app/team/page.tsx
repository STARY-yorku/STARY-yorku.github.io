import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/Cards";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ExecutiveCard } from "@/components/team/ExecutiveCard";
import { SubteamExplorer } from "@/components/team/SubteamExplorer";
import { Icon } from "@/lib/icons";
import { executives, subteams, supportRoles } from "@/content/team";
import { membershipHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet STARY's executive team and explore the technical, outreach and administrative subteams behind our satellite-servicing robotics project.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const allAnnounced = executives.every((e) => e.name);
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            Many disciplines. <span className="text-gradient">One mission.</span>
          </>
        }
        description="STARY is organized like an engineering program: an executive team, six technical subteams and the outreach and administrative roles that keep everything moving."
      />

      <Section labelledBy="exec-title">
        <SectionHeading
          id="exec-title"
          index="01"
          eyebrow="Executive leadership"
          title="The people steering STARY."
          description={
            !allAnnounced ? (
              <p>Executive profiles will be published here as the founding team is confirmed.</p>
            ) : undefined
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {executives.map((e, i) => (
            <ExecutiveCard key={e.role} exec={e} delay={i * 0.06} />
          ))}
        </ul>
      </Section>

      <Section labelledBy="subteams-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <SectionHeading
          id="subteams-title"
          index="02"
          eyebrow="Technical subteams"
          title="Explore the subteams."
          description={<p>Select a team to see what it works on, the tools it uses and how it feeds into the project.</p>}
        />
        <div className="mt-12">
          <SubteamExplorer subteams={subteams} />
        </div>
      </Section>

      {/* Integration diagram */}
      <Section labelledBy="integration-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <SectionHeading
            id="integration-title"
            index="03"
            eyebrow="How it fits together"
            title="Every team feeds one integrated experiment."
            className="lg:col-span-5"
            description={
              <p>
                No subteam works in isolation. Requirements flow out from systems engineering, hardware and software
                come together in integration, and testing closes the loop before anything flies.
              </p>
            }
          />
          <Reveal className="lg:col-span-7">
            <div className="panel relative p-6 sm:p-10">
              <div className="relative mx-auto grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
                {subteams.map((t, i) => (
                  <div
                    key={t.id}
                    className={`flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-space-950/60 p-3 text-center sm:p-4 ${i === 4 ? "col-start-2" : ""}`}
                  >
                    <Icon name={t.icon} className="size-5 text-cyan" />
                    <span className="text-[0.7rem] leading-tight text-muted sm:text-xs">{t.name}</span>
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="mx-auto my-5 h-10 w-px bg-gradient-to-b from-cyan/60 to-accent" />
              <div className="mx-auto max-w-sm rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/5 p-5 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-cyan">Integrated system</p>
                <p className="mt-1.5 font-display text-lg font-semibold">Reduced-gravity manipulator experiment</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="support-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <SectionHeading
          id="support-title"
          index="04"
          eyebrow="Administrative and outreach"
          title="The roles that keep us flying."
          description={<p>A technical project only succeeds with strong communication, partnerships and operations.</p>}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportRoles.map((r, i) => (
            <FeatureCard key={r.title} icon={r.icon} title={r.title} description={r.description} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      <CtaBanner title="There's a place for you on this team." description="Join a subteam, or try a few before you decide.">
        <ButtonLink href="/join">Explore roles</ButtonLink>
        <ButtonLink href={membershipHref} variant="secondary">
          Become a Member
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
