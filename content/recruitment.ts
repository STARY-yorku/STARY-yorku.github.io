/**
 * RECRUITMENT
 *
 * Toggle `open` to show whether a role is currently recruiting. The page
 * displays an "Open" or "Not currently recruiting" badge accordingly.
 */

import type { IconName } from "@/lib/icons";

export interface RecruitmentArea {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  learn: string[];
  contribute: string[];
  goodFitFor: string;
  open: boolean;
}

export const recruitmentAreas: RecruitmentArea[] = [
  {
    id: "general",
    title: "General Member",
    icon: "users",
    summary: "Not sure where you fit yet? Join as a general member, attend workshops and try different teams.",
    learn: ["How an aerospace project is organized", "Foundational skills through workshops", "Where your interests lie"],
    contribute: ["Help across subteams", "Take part in design discussions", "Support events and testing days"],
    goodFitFor: "Anyone curious about space technology, from any program or year.",
    open: true,
  },
  {
    id: "software",
    title: "Software",
    icon: "code",
    summary: "Write the firmware, tools and data pipelines that run the experiment.",
    learn: ["Embedded programming", "Real-time data logging", "Professional Git workflows"],
    contribute: ["Firmware for motors and sensors", "Ground-station and analysis tools", "Testing and code review"],
    goodFitFor: "Computer science, software and computer engineering students, or self-taught programmers.",
    open: true,
  },
  {
    id: "electrical",
    title: "Electrical",
    icon: "circuit",
    summary: "Design the power and electronics that drive the manipulator.",
    learn: ["Circuit and PCB design", "Motor drivers and power systems", "Lab equipment and debugging"],
    contribute: ["Schematics and boards", "Wiring harnesses", "Electrical testing"],
    goodFitFor: "Electrical and computer engineering students, physics students, hobbyists.",
    open: true,
  },
  {
    id: "mechanical",
    title: "Mechanical",
    icon: "ruler",
    summary: "Design and build the arm, its joints and the experiment structure.",
    learn: ["CAD and design for manufacture", "Prototyping and fabrication", "Basic structural analysis"],
    contribute: ["Mechanism and part design", "3D-printed and machined prototypes", "Assembly and fit checks"],
    goodFitFor: "Mechanical, space and mechatronics engineering students, and makers.",
    open: true,
  },
  {
    id: "controls",
    title: "Controls",
    icon: "bot",
    summary: "Model the robot and design how it moves in reduced gravity.",
    learn: ["Robot kinematics and dynamics", "Control design and tuning", "Simulation tools"],
    contribute: ["Models and simulations", "Control algorithms", "Analysis of test results"],
    goodFitFor: "Engineering, math and physics students who enjoy modelling and analysis.",
    open: true,
  },
  {
    id: "space-systems",
    title: "Space Systems",
    icon: "satellite",
    summary: "Connect the pieces: requirements, interfaces, documentation and mission design.",
    learn: ["Systems engineering practice", "Requirements and design reviews", "Technical writing"],
    contribute: ["Requirements and interface documents", "Competition proposal and reports", "Trade studies"],
    goodFitFor: "Students who like the big picture, from engineering, science or any detail-oriented program.",
    open: true,
  },
  {
    id: "communications",
    title: "Social Media and Communications",
    icon: "megaphone",
    summary: "Share STARY's work with students, the university and industry.",
    learn: ["Science communication", "Content strategy and design", "Photography and video"],
    contribute: ["Social posts and articles", "Graphics and brand assets", "Documenting the project"],
    goodFitFor: "Communications, design, media and marketing students, or engineers who like to write.",
    open: true,
  },
  {
    id: "outreach-admin",
    title: "Outreach and Administration",
    icon: "presentation",
    summary: "Run events, manage operations and build partnerships.",
    learn: ["Event planning", "Budgeting and operations", "Professional outreach"],
    contribute: ["Workshops and info sessions", "Sponsor communication", "Club logistics and records"],
    goodFitFor: "Business, administration and any student who likes organizing people and projects.",
    open: true,
  },
];

export interface Benefit {
  title: string;
  icon: IconName;
  description: string;
}

export const benefits: Benefit[] = [
  { title: "Hands-on projects", icon: "wrench", description: "Work on real hardware and software with real requirements." },
  { title: "Technical and leadership experience", icon: "compass", description: "Grow into subteam and project leadership as the club grows." },
  { title: "Research and competitions", icon: "trophy", description: "Exposure to reduced-gravity research and national competitions." },
  { title: "Portfolio building", icon: "briefcase", description: "Leave with designs, code and documentation you can show employers." },
  { title: "Motivated teammates", icon: "users", description: "Work alongside students who care about building things well." },
  { title: "Professional development", icon: "graduation", description: "Networking, workshops and contact with industry and researchers." },
];
