import {
  Atom,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  CircuitBoard,
  Code,
  Compass,
  Cpu,
  DollarSign,
  Factory,
  FlaskConical,
  GraduationCap,
  Hammer,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  Microscope,
  Network,
  Orbit,
  Package,
  Presentation,
  Rocket,
  Ruler,
  Satellite,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  Trophy,
  Users,
  Wallet,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files refer to icons by name so they stay free of UI imports.
 * Add a new entry here to make another Lucide icon available to content.
 */
export const icons = {
  atom: Atom,
  book: BookOpen,
  bot: Bot,
  briefcase: Briefcase,
  building: Building2,
  calendar: CalendarDays,
  circuit: CircuitBoard,
  code: Code,
  compass: Compass,
  cpu: Cpu,
  dollar: DollarSign,
  factory: Factory,
  flask: FlaskConical,
  graduation: GraduationCap,
  hammer: Hammer,
  handshake: Handshake,
  heartHandshake: HeartHandshake,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  microscope: Microscope,
  network: Network,
  orbit: Orbit,
  package: Package,
  presentation: Presentation,
  rocket: Rocket,
  ruler: Ruler,
  satellite: Satellite,
  scan: ScanEye,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  telescope: Telescope,
  trophy: Trophy,
  users: Users,
  wallet: Wallet,
  workflow: Workflow,
  wrench: Wrench,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
