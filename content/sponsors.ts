/**
 * SPONSORS & PARTNERS
 *
 * Add a sponsor only after the relationship is confirmed and they have
 * approved use of their logo. Put logos (SVG or transparent PNG) in
 * /public/sponsors/ and reference them as "/sponsors/company.svg".
 *
 * While `sponsors` is empty, the page shows open placeholder slots.
 * Do not publish tier names or benefits until they are approved.
 */

import type { IconName } from "@/lib/icons";

export interface Sponsor {
  name: string;
  logo: string;
  url: string | null;
  /** Optional, e.g. "Equipment partner". Leave undefined if not agreed. */
  label?: string;
}

export const sponsors: Sponsor[] = [];

/** Number of placeholder slots shown while there are no sponsors. */
export const placeholderSlots = 6;

export interface SupportItem {
  title: string;
  icon: IconName;
  description: string;
}

export const whySupport: SupportItem[] = [
  { title: "Student talent development", icon: "graduation", description: "Help students become engineers who have built and tested real systems before they graduate." },
  { title: "Technical mentorship", icon: "users", description: "Share your team's expertise and shape how the next generation approaches hard problems." },
  { title: "Research collaboration", icon: "microscope", description: "Explore questions in microgravity robotics and on-orbit servicing alongside motivated students." },
  { title: "Outreach and education", icon: "presentation", description: "Support workshops and events that make aerospace accessible to students from every background." },
  { title: "Brand visibility", icon: "sparkles", description: "Be recognized by York students and the Canadian student space community as a supporter of their work." },
  { title: "Experiential learning", icon: "hammer", description: "Fund the hands-on experience that classrooms alone cannot provide." },
];

export const waysToSupport: SupportItem[] = [
  { title: "Financial contributions", icon: "dollar", description: "Fund materials, components, testing and competition costs." },
  { title: "Equipment and components", icon: "package", description: "Donate or loan motors, sensors, electronics, tools or test equipment." },
  { title: "Manufacturing and prototyping", icon: "factory", description: "Provide machining, PCB fabrication, 3D printing or other production support." },
  { title: "Technical mentorship", icon: "compass", description: "Advise subteams, join design reviews or answer questions from your area of expertise." },
  { title: "Workshops and presentations", icon: "presentation", description: "Present to members about your work, your industry and career paths." },
  { title: "R&D collaboration", icon: "flask", description: "Co-develop experiments or explore research questions of shared interest." },
];
