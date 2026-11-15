import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { emails, siteConfig } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { SocialLinksList } from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui/Section";

export function Footer() {
  const year = new Date().getFullYear();
  const half = Math.ceil(mainNav.length / 2);

  return (
    <footer className="relative mt-auto border-t border-white/[0.07] bg-space-950">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hairline" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark />
            <p className="mt-5 font-display text-2xl tracking-tight text-ink">{siteConfig.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              A student-led aerospace engineering organization at York University&apos;s{" "}
              {siteConfig.university.faculty}.
            </p>
            <div className="mt-6">
              <SocialLinksList social={siteConfig.social} />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
            {[mainNav.slice(0, half), mainNav.slice(half)].map((group, i) => (
              <ul key={i} className="space-y-3">
                {group.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>

          <div className="space-y-4 text-sm lg:col-span-3">
            <p className="eyebrow">Affiliation</p>
            <p className="flex gap-2.5 text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
              <span>
                <a
                  href={siteConfig.university.facultyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  {siteConfig.university.faculty}
                </a>
                <br />
                <a
                  href={siteConfig.university.universityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  {siteConfig.university.name}
                </a>
                , {siteConfig.university.city}
              </span>
            </p>
            {emails.general && (
              <p className="flex gap-2.5 text-muted">
                <Mail className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
                <a href={`mailto:${emails.general}`} className="hover:text-ink">
                  {emails.general}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-8 text-xs leading-relaxed text-subtle md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">
            STARY is a student-led organization at York University. Views, projects and activities described on
            this site are those of the student organization and do not imply official endorsement by York
            University or the Lassonde School of Engineering. Visualizations of spacecraft and robotic systems are
            conceptual.
          </p>
          <p className="shrink-0">© {year} {siteConfig.shortName}</p>
        </div>
      </Container>
    </footer>
  );
}
