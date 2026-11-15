import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard, IconTile } from "@/components/ui/Cards";
import { Badge } from "@/components/ui/Badge";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Timeline } from "@/components/projects/Timeline";
import { CornerMarks } from "@/components/visuals/Backdrops";
import { SatelliteSchematic } from "@/components/visuals/SatelliteSchematic";
import { featuredProject, futureProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { contactHref, membershipHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "STARY's flagship project studies robotic satellite servicing in microgravity, working toward the CAN-RGX reduced-gravity experiment challenge.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const p = featuredProject;
  const { competition } = p;

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Robotic satellite servicing, <span className="text-gradient">in microgravity.</span>
          </>
        }
        description={p.summary}
      >
        <Badge tone="cyan">{p.status}</Badge>
        <Badge>Target: CAN-RGX</Badge>
      </PageHero>

      {/* Problem & approach */}
      <Section labelledBy="problem-title">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-5">
            <div>
              <Eyebrow index="01">The problem</Eyebrow>
              <h2 id="problem-title" className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Satellites can&apos;t be fixed.
              </h2>
              <Reveal className="mt-5 space-y-4 text-muted">
                {p.problem.map((t) => (
                  <p key={t.slice(0, 20)} className="leading-relaxed">
                    {t}
                  </p>
                ))}
              </Reveal>
            </div>
            <div>
              <Eyebrow index="02">Our approach</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Learn how robots move when nothing holds them down.
              </h2>
              <Reveal className="mt-5 space-y-4 text-muted">
                {p.approach.map((t) => (
                  <p key={t.slice(0, 20)} className="leading-relaxed">
                    {t}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
          <Reveal className="lg:sticky lg:top-28 lg:col-span-7">
            <figure className="panel relative overflow-hidden p-3 sm:p-5">
              <CornerMarks className="m-3" />
              <SatelliteSchematic id="proj-sch" />
              <figcaption className="px-2 pb-1 pt-3 text-xs text-subtle">
                Concept illustration of a manipulator approaching a grapple fixture. Not a representation of
                completed STARY hardware.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Development areas */}
      <Section labelledBy="areas-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <SectionHeading
          id="areas-title"
          index="03"
          eyebrow="Technical development areas"
          title="Seven disciplines, one experiment."
          description={<p>Each area maps to work that subteams will carry out as the project matures.</p>}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.developmentAreas.map((a, i) => (
            <FeatureCard
              key={a.title}
              icon={a.icon}
              title={a.title}
              description={a.description}
              index={String(i + 1).padStart(2, "0")}
              delay={(i % 4) * 0.06}
            />
          ))}
          <Reveal delay={0.2} className="panel flex flex-col justify-between border-dashed p-6 sm:p-7">
            <p className="text-[0.95rem] leading-relaxed text-muted">
              Interested in one of these areas? Every one of them is open to new members.
            </p>
            <div className="mt-6">
              <ButtonLink href="/join" size="md" variant="secondary">
                Find your role
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Competition */}
      <Section labelledBy="comp-title">
        <Reveal className="panel relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-32 size-96 rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.25),transparent_70%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="04">Competition objective</Eyebrow>
              <h2 id="comp-title" className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {competition.name}
              </h2>
              <p className="mt-3 text-sm text-subtle">Organized by {competition.organizer}</p>
            </div>
            <div className="space-y-4 leading-relaxed text-muted lg:col-span-7">
              {competition.description.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
              <p className="flex gap-3 rounded-xl border border-warning/30 bg-warning/[0.06] p-4 text-sm text-ink">
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warning" />
                {competition.note}
              </p>
              {siteConfig.links.canRgxUrl && (
                <div className="pt-2">
                  <ButtonLink href={siteConfig.links.canRgxUrl} variant="secondary" size="md">
                    About {competition.organizer}
                  </ButtonLink>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Status */}
      <Section labelledBy="status-title" id="status">
        <SectionHeading
          id="status-title"
          index="05"
          eyebrow="Project status"
          title="Where we are, honestly."
          description={
            <p>
              Only confirmed milestones are marked complete. Everything else is planned work or a long-term goal.
            </p>
          }
        />
        <div className="mt-12">
          <Timeline milestones={p.milestones} />
        </div>
      </Section>

      {/* Future */}
      <Section labelledBy="future-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <SectionHeading
          id="future-title"
          index="06"
          eyebrow="Future projects"
          title="Room to grow."
          description={
            <p>
              STARY is built to take on more ambitious work over time. New initiatives will appear here once they
              are approved and underway.
            </p>
          }
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {futureProjects.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.06} className="panel p-6">
              <Badge tone="sample">Idea · not started</Badge>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
            </Reveal>
          ))}
          <Reveal as="li" className="panel flex flex-col border-dashed p-6 md:col-span-2 lg:col-span-1">
            <IconTile name="lightbulb" />
            <h3 className="mt-5 font-display text-lg font-semibold">
              Have a project idea?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Members can propose future research and development initiatives. Tell us what you would like to build.
            </p>
            <div className="mt-6">
              <ButtonLink href={contactHref("collaboration")} size="md" variant="secondary">
                Propose an idea
              </ButtonLink>
            </div>
          </Reveal>
        </ul>
      </Section>

      <CtaBanner title="Help build the experiment." description="No prior aerospace or robotics experience required.">
        <ButtonLink href={membershipHref}>Become a Member</ButtonLink>
        <ButtonLink href="/sponsors" variant="secondary">
          Support the project
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
