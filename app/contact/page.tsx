import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { IconTile } from "@/components/ui/Cards";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinksList } from "@/components/brand/SocialIcons";
import { emails, siteConfig } from "@/content/site";
import type { IconName } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact STARY at York University for general inquiries, membership questions, sponsorship and partnerships, or research collaboration.",
  alternates: { canonical: "/contact" },
};

const channels: { title: string; icon: IconName; description: string; email: string | null; type: string }[] = [
  {
    title: "General inquiries",
    icon: "satellite",
    description: "Questions about STARY, our work or upcoming events.",
    email: emails.general,
    type: "general",
  },
  {
    title: "Membership",
    icon: "users",
    description: "How to join, subteams, time commitment and onboarding.",
    email: emails.membership,
    type: "membership",
  },
  {
    title: "Sponsorship & partnerships",
    icon: "handshake",
    description: "Funding, equipment, manufacturing and mentorship support.",
    email: emails.sponsorship,
    type: "sponsorship",
  },
  {
    title: "Collaboration",
    icon: "microscope",
    description: "Research collaboration with faculty, labs, other teams or industry.",
    email: emails.general,
    type: "collaboration",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-gradient">talk.</span>
          </>
        }
        description="Whether you're a student, a researcher or an organization interested in supporting our work, we'd like to hear from you."
      />

      <Section className="pt-14 sm:pt-16" labelledBy="channels-title">
        <h2 id="channels-title" className="sr-only">
          Ways to reach us
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.05} className="panel panel-interactive flex flex-col p-6">
              <IconTile name={c.icon} />
              <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
              {c.email ? (
                <a href={`mailto:${c.email}`} className="mt-5 break-all text-sm font-medium text-[#9cc3ff] hover:text-ink">
                  {c.email}
                </a>
              ) : (
                <Link
                  href={`/contact?type=${c.type}#contact-form`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#9cc3ff] hover:text-ink"
                >
                  Use the contact form <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              )}
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="contact-form" labelledBy="form-title" className="pt-0 sm:pt-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="form-title" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Send us a message
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Choose the inquiry type that fits best so your message reaches the right people.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <p className="eyebrow">Find us</p>
                <p className="mt-3 flex gap-3 text-sm leading-relaxed text-muted">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                  {siteConfig.contact.location}
                </p>
              </div>
              <div>
                <p className="eyebrow">University affiliation</p>
                <p className="mt-3 flex gap-3 text-sm leading-relaxed text-muted">
                  <GraduationCap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                  <span>
                    A student-led organization at the{" "}
                    <a
                      href={siteConfig.university.facultyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      {siteConfig.university.faculty}
                    </a>
                    ,{" "}
                    <a
                      href={siteConfig.university.universityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      {siteConfig.university.name}
                    </a>
                    .
                  </span>
                </p>
              </div>
              <div>
                <p className="eyebrow">Follow STARY</p>
                <div className="mt-4">
                  <SocialLinksList social={siteConfig.social} />
                </div>
              </div>
            </div>
          </div>
          <Reveal className="lg:col-span-8">
            <Suspense fallback={<div className="panel h-[36rem]" aria-hidden="true" />}>
              <ContactForm endpoint={siteConfig.links.contactFormEndpoint} fallbackEmail={emails.general} />
            </Suspense>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
