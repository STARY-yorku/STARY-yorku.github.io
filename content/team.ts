/**
 * TEAM
 *
 * Executives: fill in `name`, `bio`, `image` and `linkedin` once confirmed.
 * Leave `name: null` and the card shows "To be announced" with a placeholder
 * avatar. Never add a person without their consent.
 *
 * Images: put square photos (min 600×600) in /public/team/ and reference
 * them as "/team/first-last.jpg".
 */

import type { IconName } from "@/lib/icons";

export interface Executive {
  role: string;
  name: string | null;
  bio: string | null;
  image: string | null;
  linkedin: string | null;
  /** Short line describing what this role is responsible for. */
  responsibility: string;
}

export const executives: Executive[] = [
  {
    role: "President",
    name: null,
    bio: null,
    image: null,
    linkedin: null,
    responsibility: "Sets direction, leads the executive team and represents STARY to the university and partners.",
  },
  {
    role: "Vice President",
    name: null,
    bio: null,
    image: null,
    linkedin: null,
    responsibility: "Coordinates subteams, tracks project progress and supports the President across operations.",
  },
  {
    role: "Treasurer",
    name: null,
    bio: null,
    image: null,
    linkedin: null,
    responsibility: "Manages budgets, purchasing and financial reporting, and supports sponsorship planning.",
  },
  {
    role: "Safety Officer",
    name: null,
    bio: null,
    image: null,
    linkedin: null,
    responsibility: "Owns lab and workshop safety, hazard reviews and the safety documentation competitions require.",
  },
];

export interface Subteam {
  id: string;
  name: string;
  icon: IconName;
  summary: string;
  focus: string[];
  tools: string[];
  /** How this team contributes to the flagship project. */
  contribution: string;
  /** TODO: subteam lead name once confirmed (null = not yet assigned). */
  lead: string | null;
}

export const subteams: Subteam[] = [
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    icon: "ruler",
    summary: "Designs the manipulator structure, joints, end-effector and experiment enclosure.",
    focus: ["CAD and mechanism design", "Structural analysis", "Rapid prototyping and fabrication", "Fasteners, tolerances and assembly"],
    tools: ["SolidWorks / Fusion", "3D printing", "FEA basics", "Machine shop practice"],
    contribution: "Turns requirements into physical hardware that is light, stiff and safe to operate in flight.",
    lead: null,
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    icon: "circuit",
    summary: "Builds the power, motor-drive and sensor electronics that bring the arm to life.",
    focus: ["Power distribution", "Motor drivers", "Sensor interfaces", "PCB design and wiring harnesses"],
    tools: ["KiCad", "Oscilloscopes and multimeters", "Soldering", "Microcontrollers"],
    contribution: "Delivers reliable, safe electronics that survive vibration and run from a self-contained power supply.",
    lead: null,
  },
  {
    id: "software",
    name: "Software Development",
    icon: "code",
    summary: "Writes the firmware, data logging and tools that run and analyze the experiment.",
    focus: ["Embedded firmware", "Data acquisition and logging", "Ground tools and visualization", "Version control and code review"],
    tools: ["C / C++", "Python", "Git", "Linux"],
    contribution: "Makes the experiment run autonomously and records the data that tells us whether it worked.",
    lead: null,
  },
  {
    id: "controls",
    name: "Controls and Robotics",
    icon: "bot",
    summary: "Models the manipulator and designs how it moves when its base is free to float.",
    focus: ["Kinematics and dynamics", "Trajectory planning", "Feedback control", "Simulation"],
    tools: ["MATLAB / Simulink", "Python", "ROS", "Physics simulators"],
    contribution: "Develops the control strategies at the heart of the research question.",
    lead: null,
  },
  {
    id: "space-systems",
    name: "Space Systems Engineering",
    icon: "satellite",
    summary: "Holds the big picture: requirements, interfaces, mission context and documentation.",
    focus: ["Requirements and traceability", "Interface definition", "Mission and concept of operations", "Design reviews"],
    tools: ["Systems diagrams", "Requirements tracking", "Technical writing", "Trade studies"],
    contribution: "Keeps every subteam building toward one coherent, competition-ready experiment.",
    lead: null,
  },
  {
    id: "testing",
    name: "Testing and Integration",
    icon: "flask",
    summary: "Plans and runs the tests that prove each subsystem, and the whole experiment, works.",
    focus: ["Test planning and procedures", "Integration sequencing", "Data review", "Safety and risk tracking"],
    tools: ["Test rigs and fixtures", "Checklists", "Measurement equipment", "Issue tracking"],
    contribution: "Finds problems on the ground, where they are cheap to fix, instead of in the air.",
    lead: null,
  },
];

export interface SupportRole {
  title: string;
  icon: IconName;
  description: string;
}

export const supportRoles: SupportRole[] = [
  {
    title: "Social Media and Communications",
    icon: "megaphone",
    description: "Tells STARY's story through social channels, photography, writing and design.",
  },
  {
    title: "Sponsorship and Partnerships",
    icon: "handshake",
    description: "Builds relationships with companies, labs and organizations that support our work.",
  },
  {
    title: "Events and Outreach",
    icon: "presentation",
    description: "Runs workshops, info sessions and outreach that bring space technology to more students.",
  },
  {
    title: "Finance and Administration",
    icon: "wallet",
    description: "Keeps budgets, purchasing, records and club operations running smoothly.",
  },
];
