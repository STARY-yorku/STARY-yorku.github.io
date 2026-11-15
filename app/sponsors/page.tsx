import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ButtonLink, ButtonUnavailable } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/Cards";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SponsorGrid } from "@/components/sponsors/SponsorGrid";
import { siteConfig } from "@/content/site";
import { placeholderSlots, sponsors, waysToSupport, whySupport } from "@/content/sponsors";
import { contactHref, emails, mailto } from "@/lib/links";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description:
    "Partner with STARY to support student-led aerospace engineering at York University through funding, equipment, manufacturing, mentorship and research collaboration.",
  alternates: { canonical: "/sponsors" },
};

export default function SponsorsPage() {
  const packageUrl = siteConfig.links.sponsorshipPackageUrl;
  const sponsorMail = mailto(emails.sponsorship, "STARY partnership inquiry");

  return (
    <>
      <PageHero
        eyebrow="Sponsors & partners"
        title={
          <>
            Partner With the Next Generation of <span className="text-gradient">Space Engineers.</span>
          </>
        }
        description="Partnerships make hands-on aerospace engineering possible for students. They fund the components, tools and testing a real project needs, open doors to mentorship and help more students take part."
      >
        <ButtonLink href={contactHref("sponsorship")}>Become a partner</ButtonLink>
        {packageUrl && (
          <ButtonLink href={packageUrl} variant="secondary">
            Sponsorship package
          </ButtonLink>
        )}
      </PageHero>

      <Section labelledBy="why-support-title">
        <SectionHeading
          id="why-support-title"
          index="01"
          eyebrow="Why support STARY"
          title="Invest in engineers who have built something real."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whySupport.map((w, i) => (
            <FeatureCard key={w.title} icon={w.icon} title={w.title} description={w.description} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </Section>

      <Section labelledBy="ways-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="ways-title"
              index="02"
              eyebrow="Ways to support"
              title="Every contribution moves the project forward."
              description={<p>Support can take many forms. We are happy to discuss what works for your organization.</p>}
            />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:col-span-8">
            {waysToSupport.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 2) * 0.05} className="bg-space-900 p-6 transition-colors hover:bg-space-800 sm:p-7">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="showcase-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="showcase-title"
              index="03"
              eyebrow="Our partners"
              title={sponsors.length ? "Thank you to our partners." : "Be one of our first partners."}
              description={
                <p>
                  {sponsors.length
                    ? "STARY's work is made possible by the organizations below."
                    : "STARY is a new organization. Founding partners will be recognized here."}
                </p>
              }
            />
          </div>
          <Reveal className="lg:col-span-8">
            <SponsorGrid sponsors={sponsors} placeholderSlots={placeholderSlots} />
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="package-title">
        <Reveal className="panel flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-5">
            <FileText aria-hidden="true" className="size-10 shrink-0 text-cyan" strokeWidth={1.4} />
            <div>
              <h2 id="package-title" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Sponsorship package
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                Our package outlines the project, our goals and how partners can get involved.
              </p>
            </div>
          </div>
          {packageUrl ? (
            <ButtonLink href={packageUrl}>View the package</ButtonLink>
          ) : (
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <ButtonUnavailable note="The package is being finalized.">Package coming soon</ButtonUnavailable>
              <ButtonLink href={contactHref("sponsorship")} variant="ghost" size="md">
                Request it directly
              </ButtonLink>
            </div>
          )}
        </Reveal>
      </Section>

      <CtaBanner
        title="Let's build something together."
        description="Tell us about your organization and how you'd like to be involved. We'll get back to you."
      >
        <ButtonLink href={contactHref("sponsorship")}>Contact our partnerships team</ButtonLink>
        {sponsorMail && (
          <ButtonLink href={sponsorMail} variant="secondary">
            {emails.sponsorship}
          </ButtonLink>
        )}
      </CtaBanner>
    </>
  );
}
