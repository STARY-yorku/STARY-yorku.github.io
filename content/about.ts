import type { IconName } from "@/lib/icons";

export interface Pillar {
  title: string;
  icon: IconName;
  description: string;
}

/** The three pillars shown on the home page and About page. */
export const pillars: Pillar[] = [
  {
    title: "Learn",
    icon: "book",
    description:
      "Gain practical knowledge through workshops, mentorship and collaborative problem-solving, whatever your starting point.",
  },
  {
    title: "Build",
    icon: "wrench",
    description:
      "Design, prototype, program and test real engineering systems, from first sketch to working hardware.",
  },
  {
    title: "Compete",
    icon: "trophy",
    description:
      "Take on technical challenges, enter competitions and represent York University on a national stage.",
  },
];

export const story = {
  heading: "Why STARY exists",
  paragraphs: [
    "Students at York learn the theory behind dynamics, controls, electronics and software in the classroom. What is often missing is a place to apply it to something hard, with real constraints, real deadlines and real hardware that has to work.",
    "STARY was founded to be that place. We bring together students who want to design, develop, test and demonstrate space-related engineering systems, and we give them the structure to do it: technical subteams, shared tools, mentorship and a clear project to build toward.",
    "We are a new organization, and we are building for the long term. The goal is a club that keeps developing space technology well after its founding members graduate, with each cohort taking on more ambitious work than the last.",
  ],
};

export const mission =
  "Empower students to explore aerospace engineering through collaborative research, practical development and technical competitions.";

export const vision =
  "Establish STARY as a lasting platform for student-driven space innovation, one that supports generations of students and increasingly ambitious projects.";

export interface Value {
  title: string;
  icon: IconName;
  description: string;
}

export const values: Value[] = [
  {
    title: "Curiosity",
    icon: "lightbulb",
    description: "We ask how things work and why they fail, and we treat every open question as something worth investigating.",
  },
  {
    title: "Collaboration",
    icon: "users",
    description: "Space systems are built by teams. We share knowledge openly and design across disciplines from day one.",
  },
  {
    title: "Innovation",
    icon: "sparkles",
    description: "We explore new approaches carefully, test our assumptions and learn from what the data tells us.",
  },
  {
    title: "Accessibility",
    icon: "heartHandshake",
    description: "Aerospace should not be gated by prior experience. We teach, mentor and make room for every background.",
  },
  {
    title: "Technical excellence",
    icon: "target",
    description: "We document our work, review our designs and hold ourselves to the standards of professional engineering.",
  },
];

export const differentiators: Pillar[] = [
  {
    title: "Multidisciplinary by design",
    icon: "network",
    description:
      "Engineering, computer science, physics, business, communications and design students all have a real role in the project.",
  },
  {
    title: "Practical engineering",
    icon: "hammer",
    description:
      "Members work on hardware and software that has to meet requirements, not on exercises with known answers.",
  },
  {
    title: "Leadership opportunities",
    icon: "compass",
    description:
      "As a young organization, members can step into subteam lead, project and executive roles early.",
  },
  {
    title: "The full development lifecycle",
    icon: "workflow",
    description:
      "From requirements and design reviews through prototyping, testing and integration, members see how a technical project is actually delivered.",
  },
];
