import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { ButtonLink, ButtonUnavailable } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/join/Faq";
import { RoleCards } from "@/components/join/RoleCards";
import { OrbitRings } from "@/components/visuals/Backdrops";
import { faqs } from "@/content/faq";
import { benefits, recruitmentAreas } from "@/content/recruitment";
import { siteConfig } from "@/content/site";
import { contactHref, emails, mailto } from "@/lib/links";

export const metadata: Metadata = {
  title: "Join STARY",
  description:
    "Join STARY at York University. No aerospace or robotics experience required: explore software, electrical, mechanical, controls, space systems, communications and outreach roles.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  const formUrl = siteConfig.links.membershipFormUrl;
  const membershipMail = mailto(emails.membership, "STARY membership");

  return (
    <>
      <PageHero
        eyebrow="Join STARY"
        title={
          <>
            Your Journey Into Space <span className="text-gradient">Starts Here.</span>
          </>
        }
        description="You do not need previous robotics or aerospace experience. Bring curiosity and a willingness to learn; we will help with the rest."
      >
        <ButtonLink href="#register">Register now</ButtonLink>
        <ButtonLink href="#roles" variant="secondary">
          Explore roles
        </ButtonLink>
      </PageHero>

      <Section id="roles" labelledBy="roles-title">
        <SectionHeading
          id="roles-title"
          index="01"
          eyebrow="Recruitment areas"
          title="Find where you fit."
          description={<p>Open a card to see what you could learn and contribute in each area. You can join more than one.</p>}
        />
        <div className="mt-12">
          <RoleCards areas={recruitmentAreas} />
        </div>
      </Section>

      <Section labelledBy="why-title">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <SectionHeading id="why-title" index="02" eyebrow="Why join STARY" title="What you'll take with you." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <FeatureCard key={b.title} icon={b.icon} title={b.title} description={b.description} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-title"
              index="03"
              eyebrow="FAQ"
              title="Questions, answered."
              description={<p>Still unsure? Reach out and we&apos;ll be happy to help.</p>}
            />
            <Reveal delay={0.1} className="mt-8">
              <ButtonLink href={contactHref("membership")} variant="secondary" size="md">
                Ask a question
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </Section>

      <Section id="register" labelledBy="register-title">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-[radial-gradient(ellipse_at_top_left,rgb(37_99_235/0.35),transparent_55%),linear-gradient(180deg,#111B2B,#0B1322)] p-8 sm:p-14">
          <OrbitRings className="-bottom-80 -right-80 h-[800px] w-[800px] opacity-60" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <ClipboardList aria-hidden="true" className="size-8 text-cyan" strokeWidth={1.5} />
              <h2 id="register-title" className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                Membership registration
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Fill out a short form to tell us about your interests. We&apos;ll follow up with upcoming meetings and
                how to get started with a subteam.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
              {formUrl ? (
                <>
                  <ButtonLink href={formUrl}>Open the registration form</ButtonLink>
                  <p className="text-sm text-subtle">Opens Google Forms in a new tab.</p>
                </>
              ) : (
                <>
                  <ButtonUnavailable note="Registration opens soon.">Registration form coming soon</ButtonUnavailable>
                  {membershipMail ? (
                    <ButtonLink href={membershipMail} variant="secondary" size="md">
                      Email us to join
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={contactHref("membership")} variant="secondary" size="md">
                      Contact us to join
                    </ButtonLink>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
