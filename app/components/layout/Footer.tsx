"use client";

import Link from "next/link";
import { Terminal, Mail } from "lucide-react";
import { Github, Linkedin, Facebook } from "@/app/components/common/Icons";
import { profile } from "@/app/data/profile";
import { navItems } from "@/app/data/navigation";

export default function Footer() {
  const year = 2026;

  // Split nav for two columns
  const half = Math.ceil(navItems.length / 2);
  const col1 = navItems.slice(0, half);
  const col2 = navItems.slice(half);

  return (
    <footer
      className="bg-[#09090D] border-t border-[#292536] mt-auto"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center">
                <Terminal size={16} className="text-[#8B5CF6]" />
              </div>
              <span className="font-mono text-lg font-bold text-[#F5F3FF]">
                UTSO
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xs">
              {profile.identity}. Building practical software and learning every day.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#8B5CF6]/50 transition-colors"
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#8B5CF6]/50 transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#8B5CF6]/50 transition-colors"
                aria-label="Facebook profile"
              >
                <Facebook size={18} />
              </a>
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 rounded-md bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#A78BFA] hover:border-[#8B5CF6]/50 transition-colors"
                  aria-label="Send email"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                {col1.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest mb-4">
                &nbsp;
              </h3>
              <ul className="space-y-2 mt-0">
                {col2.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#292536] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#A1A1AA]">
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#A1A1AA]">
            <span className="text-[#8B5CF6]">$</span> built with{" "}
            <span className="text-[#A78BFA]">Next.js</span> &{" "}
            <span className="text-[#A78BFA]">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

