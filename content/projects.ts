/**
 * PROJECTS & MILESTONES
 *
 * Milestone status rules (please keep these honest):
 *   - "completed"   → only when the milestone is confirmed done.
 *   - "in-progress" → work has actually started.
 *   - "planned"     → intended, not yet started.
 *   - "goal"        → long-term objective that depends on outside factors
 *                     (e.g. selection by competition organizers).
 *
 * Dates are free text so you can write "Fall 2026", "TBD", etc.
 */

import type { IconName } from "@/lib/icons";

export type MilestoneStatus = "completed" | "in-progress" | "planned" | "goal";

export interface Milestone {
  title: string;
  description: string;
  status: MilestoneStatus;
  /** Free text, e.g. "Fall 2026". Use null for "To be determined". */
  date: string | null;
}

export interface DevelopmentArea {
  title: string;
  icon: IconName;
  description: string;
}

export const featuredProject = {
  slug: "robotic-satellite-servicing",
  title: "Robotic Satellite Servicing in Microgravity",
  shortTitle: "Satellite Servicing Robotics",
  status: "In development",
  summary:
    "Our flagship initiative studies how a robotic manipulator can perform controlled tasks in reduced gravity, the core capability behind inspecting, repairing and refuelling satellites in orbit.",

  problem: [
    "Most satellites are launched with no way to be maintained. A failed component, an exhausted propellant supply or simple wear can end a mission that is otherwise healthy, and the spacecraft becomes debris.",
    "Technologies for on-orbit inspection and servicing could make future space operations more sustainable and more flexible: extending mission lifetimes, recovering from failures and reducing the need to launch replacements.",
  ],

  approach: [
    "STARY is investigating robotic manipulation technology and how robotic systems can carry out controlled tasks when gravity no longer holds parts, tools or the robot itself in place.",
    "In microgravity, every motion of the arm pushes back on its base, objects drift when released, and contact forces behave differently than on the ground. Understanding these effects and designing control strategies around them is the focus of our work.",
  ],

  developmentAreas: [
    {
      title: "Manipulator mechanical design",
      icon: "ruler",
      description: "Link geometry, joints, end-effector concepts and lightweight structures suited to a flight-test environment.",
    },
    {
      title: "Motor control and actuation",
      icon: "zap",
      description: "Actuator selection, drive electronics and closed-loop joint control for smooth, repeatable motion.",
    },
    {
      title: "Embedded electronics",
      icon: "circuit",
      description: "Microcontrollers, power distribution, sensor interfaces and reliable wiring for a self-contained experiment.",
    },
    {
      title: "Computer vision and sensing",
      icon: "scan",
      description: "Cameras, encoders and inertial sensing to measure what the arm and its target are actually doing.",
    },
    {
      title: "Motion planning and autonomous control",
      icon: "cpu",
      description: "Trajectory generation and control strategies that account for reaction forces on a free-floating base.",
    },
    {
      title: "Systems integration and testing",
      icon: "workflow",
      description: "Bringing subsystems together, writing test procedures and verifying performance before any flight.",
    },
    {
      title: "Space environment considerations",
      icon: "orbit",
      description: "How microgravity, thermal conditions and safety requirements shape design decisions.",
    },
  ] satisfies DevelopmentArea[],

  competition: {
    name: "Canadian Reduced Gravity Experiment Design Challenge (CAN-RGX)",
    organizer: "SEDS-Canada",
    description: [
      "CAN-RGX is a national student competition organized by SEDS-Canada. Teams propose, design and build an experiment that is flown during parabolic flights, which create short periods of reduced gravity.",
      "STARY intends to design a robotic manipulation experiment suitable for reduced-gravity testing and to submit it to the challenge. Participating would mark York University's first attempt at CAN-RGX.",
    ],
    note: "STARY has not yet been selected for or flown in CAN-RGX. This section describes our objective.",
  },

  /** Keep in chronological order. */
  milestones: [
    {
      title: "Club founded and technical focus defined",
      description: "STARY established at York with robotic satellite servicing in microgravity as its flagship research direction.",
      status: "completed",
      date: null, // TODO: add founding date, e.g. "Fall 2026"
    },
    {
      title: "Founding team recruitment",
      description: "Building the first technical subteams and filling executive and outreach roles.",
      status: "in-progress",
      date: null,
    },
    {
      title: "Concept studies and requirements",
      description: "Literature review, experiment concepts, and initial requirements for a reduced-gravity manipulator experiment.",
      status: "planned",
      date: null,
    },
    {
      title: "CAN-RGX proposal",
      description: "Prepare and submit an experiment proposal to the CAN-RGX challenge.",
      status: "planned",
      date: null,
    },
    {
      title: "Prototype design and bench testing",
      description: "First manipulator prototype, control software and ground testing of key behaviours.",
      status: "planned",
      date: null,
    },
    {
      title: "Integration, safety review and ground testing",
      description: "Integrate the full experiment, complete safety documentation and verify performance on the ground.",
      status: "planned",
      date: null,
    },
    {
      title: "Reduced-gravity flight campaign",
      description: "Fly the experiment during parabolic flights, if selected by the competition organizers.",
      status: "goal",
      date: null,
    },
  ] satisfies Milestone[] as Milestone[],
};

export interface FutureProject {
  title: string;
  description: string;
  /** Always "idea" until the project has actually started. */
  status: "idea";
}

/**
 * FUTURE PROJECTS
 * Leave this empty until ideas are agreed on. The page shows an inviting
 * "propose a project" card either way. Do not list a project here as active.
 */
export const futureProjects: FutureProject[] = [];

export const statusLabels: Record<MilestoneStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
  goal: "Long-term goal",
};
