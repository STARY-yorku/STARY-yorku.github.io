import Link from "next/link";
import { Check } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard, IconTile, PendingNotice } from "@/components/ui/Cards";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { NewsCard } from "@/components/news/NewsCard";
import { CornerMarks } from "@/components/visuals/Backdrops";
import { SatelliteSchematic } from "@/components/visuals/SatelliteSchematic";
import { pillars } from "@/content/about";
import { getSortedPosts } from "@/content/news";
import { featuredProject } from "@/content/projects";
import { recruitmentAreas } from "@/content/recruitment";
import { membershipHref } from "@/lib/links";

export default function HomePage() {
  const latest = getSortedPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Mission */}
      <Section id="mission" labelledBy="mission-title">
        <div>
          <SectionHeading
            id="mission-title"
            index="01"
            eyebrow="Mission"
            title="Space Innovation Starts Here."
            description={
              <p>
                STARY turns theoretical knowledge into hands-on engineering and research. Members take what they
                learn in lectures and apply it to a real space technology project, with the mentorship, structure
                and teammates to see it through.
              </p>
            }
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <FeatureCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                index={`0${i + 1}`}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Featured project */}
      <Section labelledBy="featured-title" className="overflow-hidden">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="relative order-2 lg:order-1 lg:col-span-7">
            <div className="panel relative overflow-hidden p-3 sm:p-5">
              <CornerMarks className="m-3" />
              <SatelliteSchematic id="home-sch" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeading
              id="featured-title"
              index="02"
              eyebrow="Featured project"
              title={featuredProject.title}
              description={<p>{featuredProject.summary}</p>}
            />
            <Reveal delay={0.1} className="mt-8">
              <Badge tone="cyan">{featuredProject.status}</Badge>
              <ul className="mt-6 space-y-3">
                {featuredProject.developmentAreas.slice(0, 4).map((a) => (
                  <li key={a.title} className="flex gap-3 text-[0.95rem] text-muted">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                    {a.title}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-subtle">
                Working toward the {featuredProject.competition.name}, organized by{" "}
                {featuredProject.competition.organizer}.
              </p>
              <div className="mt-8">
                <ButtonLink href="/projects" variant="secondary">
                  View the project
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Join */}
      <Section labelledBy="join-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="join-title"
              index="03"
              eyebrow="Join the team"
              title="Every discipline has a seat at the table."
              description={
                <p>
                  Space projects need engineers, programmers, scientists, writers, designers and organizers.
                  Whatever you study, there is meaningful work for you at STARY.
                </p>
              }
            />
            <Reveal delay={0.1} className="panel mt-8 flex items-start gap-4 p-6">
              <IconTile name="sparkles" />
              <div>
                <p className="font-display text-lg font-semibold">No experience required.</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  The purpose of STARY is not only to build technology, but to help students learn how to build it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/join">See open roles</ButtonLink>
              <ButtonLink href="/team" variant="ghost">
                Meet the subteams
              </ButtonLink>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {recruitmentAreas.map((r, i) => (
              <Reveal as="li" key={r.id} delay={(i % 4) * 0.05}>
                <Link
                  href={`/join#role-${r.id}`}
                  className="panel panel-interactive flex h-full items-start gap-4 p-5"
                >
                  <IconTile name={r.icon} className="size-10" />
                  <span>
                    <span className="block font-display font-semibold text-ink">{r.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{r.summary}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Latest updates */}
      <Section labelledBy="updates-title">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading id="updates-title" index="04" eyebrow="Latest updates" title="News, events and milestones." />
          <Reveal>
            <ButtonLink href="/news" variant="secondary" size="md">
              All news
            </ButtonLink>
          </Reveal>
        </div>
        {latest.length > 0 ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 0.08}>
                <NewsCard post={post} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <PendingNotice className="mt-12">No updates yet. Check back soon.</PendingNotice>
        )}
      </Section>

      <CtaBanner
        title="The Future of Space Won't Build Itself."
        description="Join a team of students designing real space technology at York University."
      >
        <ButtonLink href={membershipHref}>Become a Member</ButtonLink>
        <ButtonLink href="/about" variant="secondary">
          About STARY
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
