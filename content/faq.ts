export interface FaqItem {
  question: string;
  answer: string;
}

/** TODO: Review the time-commitment answer once expectations are set. */
export const faqs: FaqItem[] = [
  {
    question: "Do I need previous experience?",
    answer:
      "No. Previous robotics or aerospace experience is not required. We run workshops and pair new members with more experienced teammates so you can learn as you contribute.",
  },
  {
    question: "Is STARY only for engineering students?",
    answer:
      "Not at all. We welcome students from engineering, computer science, physics, business, communications, design and any other program. Space projects need writers, designers, organizers and analysts as much as engineers.",
  },
  {
    question: "How much time do I need to commit?",
    answer:
      "Commitment is flexible and depends on your role and the project phase. We will go over expectations when you join, and you can scale your involvement around your course load.",
  },
  {
    question: "Can first-year students join?",
    answer:
      "Yes. First-year students are encouraged to join. Starting early gives you the most time to learn, take on responsibility and grow with the project.",
  },
  {
    question: "Can I join multiple subteams?",
    answer:
      "Yes. Many members contribute to more than one area. We recommend starting with one primary subteam and expanding once you have settled in.",
  },
  {
    question: "How do I become a member?",
    answer:
      "Complete the membership registration form on this page. We will follow up with next steps, including upcoming meetings and how to get involved with a subteam.",
  },
];
