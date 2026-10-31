"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { navItems } from "@/app/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Track scroll position to add backdrop blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("mobile-nav-open");
    }
    return () => document.body.classList.remove("mobile-nav-open");
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090D]/95 backdrop-blur-md border-b border-[#292536]"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-md"
              aria-label="UTSO – go to homepage"
            >
              <div className="w-8 h-8 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center group-hover:bg-[#8B5CF6]/30 transition-colors">
                <Terminal size={16} className="text-[#8B5CF6]" />
              </div>
              <span className="font-mono text-lg font-bold text-[#F5F3FF] group-hover:text-[#A78BFA] transition-colors">
                UTSO
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                      isActive(item.href)
                        ? "text-[#A78BFA] bg-[#8B5CF6]/10"
                        : "text-[#A1A1AA] hover:text-[#F5F3FF] hover:bg-[#171720]"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-[#A1A1AA] hover:text-[#F5F3FF] hover:bg-[#171720] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="absolute top-0 right-0 w-72 h-full bg-[#111118] border-l border-[#292536] shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#292536]">
              <span className="font-mono text-[#A78BFA] font-bold">Navigation</span>
              <button
                type="button"
                className="p-1 rounded text-[#A1A1AA] hover:text-[#F5F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <ul className="py-2" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:bg-[#8B5CF6]/10 ${
                      isActive(item.href)
                        ? "text-[#A78BFA] bg-[#8B5CF6]/10 border-r-2 border-[#8B5CF6]"
                        : "text-[#A1A1AA] hover:text-[#F5F3FF] hover:bg-[#171720]"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#292536]">
              <p className="font-mono text-xs text-[#A1A1AA] text-center">
                <span className="text-[#8B5CF6]">~/</span>utso-portfolio
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

