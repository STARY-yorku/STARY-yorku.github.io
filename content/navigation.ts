export interface NavItem {
  label: string;
  href: string;
}

/** Main navigation, in display order. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Join", href: "/join" },
  { label: "News", href: "/news" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];
