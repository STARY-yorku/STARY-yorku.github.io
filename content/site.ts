/**
 * ============================================================================
 *  STARY — CENTRAL SITE CONFIGURATION
 * ============================================================================
 *
 *  This is the one file executives edit for links, contact details and social
 *  accounts. Anything set to `null` is UNKNOWN and is marked `TODO`. The site
 *  handles every `null` gracefully: it hides the link or shows a clear
 *  "coming soon" state, so nothing breaks while details are missing.
 *
 *  Several values can also be set with environment variables (see
 *  `.env.example`). An environment variable always overrides the value here.
 * ============================================================================
 */

function env(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value.trim() : null;
}

export interface SocialLinks {
  instagram: string | null;
  linkedin: string | null;
  github: string | null;
  discord: string | null;
  youtube: string | null;
  x: string | null;
}

export const siteConfig = {
  name: "Space Technology and Research at York",
  shortName: "STARY",
  tagline: "Learn. Build. Compete.",
  description:
    "STARY is a student-led aerospace engineering organization at York University's Lassonde School of Engineering. Students from every discipline design, build and test space technology, starting with robotic satellite servicing in microgravity.",

  /** Public URL of the deployed site. Used for SEO, sitemap and Open Graph. */
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://stary-yorku.github.io",

  university: {
    name: "York University",
    faculty: "Lassonde School of Engineering",
    city: "Toronto, Ontario, Canada",
    universityUrl: "https://www.yorku.ca",
    facultyUrl: "https://lassonde.yorku.ca",
  },

  links: {
    /** TODO: Google Forms membership registration URL. */
    membershipFormUrl: env(process.env.NEXT_PUBLIC_MEMBERSHIP_FORM_URL) ?? (null as string | null),

    /** TODO: Link to the approved sponsorship package (PDF on Drive, or "/files/stary-sponsorship.pdf" placed in /public/files). */
    sponsorshipPackageUrl:
      env(process.env.NEXT_PUBLIC_SPONSORSHIP_PACKAGE_URL) ?? (null as string | null),

    /**
     * TODO: Contact form backend endpoint. Any service that accepts a JSON POST
     * and returns 2xx works, e.g. Formspree ("https://formspree.io/f/abcdwxyz").
     * While this is null the contact form tells visitors it is not yet
     * connected and offers email instead. It never pretends to send.
     */
    contactFormEndpoint:
      env(process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT) ?? (null as string | null),

    /** Official CAN-RGX / SEDS-Canada page. Verify before launch. */
    canRgxUrl: "https://seds.ca" as string | null,
  },

  contact: {
    /** TODO: Club email for general inquiries, e.g. "stary@yorku.ca". */
    generalEmail: null as string | null,
    /** TODO: Optional separate inbox for membership questions. Falls back to generalEmail. */
    membershipEmail: null as string | null,
    /** TODO: Optional separate inbox for sponsorship. Falls back to generalEmail. */
    sponsorshipEmail: null as string | null,
    /** TODO: Confirm building / room for meetings once assigned. */
    location: "Lassonde School of Engineering, York University, Keele Campus, Toronto, ON",
  },

  /** TODO: Add each account URL when it exists. Empty ones are hidden. */
  social: {
    instagram: null,
    linkedin: null,
    github: "https://github.com/STARY-yorku",
    discord: null,
    youtube: null,
    x: null,
  } satisfies SocialLinks as SocialLinks,
} as const;

export type SiteConfig = typeof siteConfig;

/** Email helpers that fall back to the general inbox. */
export const emails = {
  general: siteConfig.contact.generalEmail,
  membership: siteConfig.contact.membershipEmail ?? siteConfig.contact.generalEmail,
  sponsorship: siteConfig.contact.sponsorshipEmail ?? siteConfig.contact.generalEmail,
};
