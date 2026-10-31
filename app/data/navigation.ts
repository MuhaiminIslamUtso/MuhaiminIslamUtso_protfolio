// ─────────────────────────────────────────────────
// Navigation data
// ─────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Skills",       href: "/skills" },
  { label: "Projects",     href: "/projects" },
  { label: "Education",    href: "/education" },
  { label: "Experience",   href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Arcade",       href: "/arcade" },
  { label: "Resume",       href: "/resume" },
  { label: "Contact",      href: "/contact" },
];

