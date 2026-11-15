/**
 * NEWS & EVENTS
 *
 * To publish a post, copy one entry below, give it a unique `slug`, and fill
 * in the fields. The newest `date` appears first. A detail page is generated
 * automatically at /news/<slug>.
 *
 * Body format (plain text, no code needed):
 *   - Separate paragraphs with a blank line.
 *   - Start a line with "## " for a sub-heading.
 *   - Start lines with "- " for a bullet list.
 *
 * Cover image: set `cover` to an image in /public/news/ (e.g. "/news/kickoff.jpg",
 * 1600×900 recommended). Leave it null to use a generated graphic.
 *
 * Every entry below is SAMPLE content (`sample: true`) and is labelled as such
 * on the site. Replace or delete them, and remove `sample: true` from real posts.
 */

export const newsCategories = [
  "Project Updates",
  "Competitions",
  "Workshops",
  "Club Events",
  "Research",
  "Community Outreach",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export interface NewsPost {
  slug: string;
  title: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  category: NewsCategory;
  excerpt: string;
  body: string;
  tags: string[];
  cover: string | null;
  coverAlt?: string;
  /** For events: when and where. Free text, e.g. "Thursday, 6:00 PM" or "TBA". */
  event?: { when: string; where: string };
  /** Marks placeholder content. Shown with a visible "Sample" label. */
  sample?: boolean;
}

export const newsPosts: NewsPost[] = [
  {
    slug: "why-robotic-satellite-servicing",
    title: "Why we're starting with robotic satellite servicing",
    date: "2026-11-15",
    category: "Project Updates",
    excerpt:
      "An introduction to STARY's flagship research direction and what makes robotic manipulation in microgravity such a rich engineering problem.",
    tags: ["Robotics", "Microgravity", "CAN-RGX"],
    cover: null,
    sample: true,
    body: `Satellites are among the most expensive machines humans build, yet most of them are launched with no way to be repaired, upgraded or refuelled. When a component fails, the mission often ends.

On-orbit servicing aims to change that. A servicing spacecraft equipped with a robotic manipulator could inspect a client satellite, grapple it, and carry out tasks that today are impossible.

## Why it is hard

In microgravity, a robot arm has nothing to push against except itself. Every motion of the arm moves its base. Objects drift when released, and contact forces behave differently than on the ground.

- Reaction forces couple the arm and its base
- Grasping a free-floating object requires careful timing and control
- Testing on the ground can only approximate the real environment

## What STARY is doing

We are studying these effects and working toward a robotic manipulation experiment suitable for reduced-gravity testing through the CAN-RGX challenge. The project is in its early stages, and we are recruiting students from every discipline to help shape it.

This is sample content. Edit or replace it in content/news.ts.`,
  },
  {
    slug: "general-interest-meeting",
    title: "General interest meeting",
    date: "2026-11-10",
    category: "Club Events",
    excerpt:
      "Meet the team, learn about our subteams and find out how to get involved, whatever your program or experience level.",
    tags: ["Recruitment", "Meeting"],
    cover: null,
    sample: true,
    event: { when: "Date and time to be announced", where: "Lassonde School of Engineering (room TBA)" },
    body: `Curious about STARY? Join us for a general interest meeting to learn about the club, our flagship project and the roles available across technical and non-technical subteams.

## What to expect

- A short introduction to robotic satellite servicing
- An overview of each subteam
- Time to ask questions and meet current members

No experience is required. Bring a friend.

This is a sample event. Edit or replace it in content/news.ts.`,
  },
  {
    slug: "intro-to-manipulator-kinematics-workshop",
    title: "Workshop: Introduction to robot arm kinematics",
    date: "2026-11-05",
    category: "Workshops",
    excerpt:
      "A beginner-friendly session on how robot arms describe position and motion, with hands-on examples.",
    tags: ["Workshop", "Controls", "Beginner friendly"],
    cover: null,
    sample: true,
    event: { when: "To be announced", where: "York University, Keele Campus" },
    body: `How does a robot arm know where its hand is? This workshop introduces forward kinematics, joint spaces and coordinate frames using simple, visual examples.

## Who it's for

Anyone. We start from first principles and assume no prior robotics background.

This is a sample workshop listing. Edit or replace it in content/news.ts.`,
  },
];

export function getSortedPosts() {
  return [...newsPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug) ?? null;
}
