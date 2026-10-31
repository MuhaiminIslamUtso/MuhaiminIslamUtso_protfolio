"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Github, Linkedin, Facebook } from "@/app/components/common/Icons";
import { profile } from "@/app/data/profile";
import TerminalWindow from "@/app/components/common/TerminalWindow";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced-motion preference
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ctx: { revert?: () => void } = {};

    // Dynamically import GSAP to avoid SSR issues
    import("gsap").then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            descRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            btnsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            termRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.8 },
            "-=0.6"
          );
      }, heroRef);
    });

    return () => {
      ctx.revert?.();
    };
  }, []);

  const terminalLines = [
    "$ whoami",
    ">> Muhaimin Islam Utso",
    "$ cat role.txt",
    ">> AIUB Student | Aspiring Full-Stack Developer",
    "$ ls ./skills/",
    "  C#  JavaScript  TypeScript",
    "  React  React Native  Node.js",
    "$ git status",
    ">> Always learning, always building",
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, #8B5CF620 0%, transparent 50%),
                            radial-gradient(circle at 75% 20%, #A78BFA15 0%, transparent 40%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(#292536 1px, transparent 1px),
                            linear-gradient(90deg, #292536 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            {/* Greeting label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs text-[#A78BFA]">
                HELLO, WORLD! I&apos;M
              </span>
            </div>

            {/* Main heading */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F3FF] leading-tight"
            >
              Muhaimin{" "}
              <span className="gradient-text">Islam Utso</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subRef}
              className="font-mono text-[#8B5CF6] text-lg font-medium"
            >
              {profile.identity}
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-[#A1A1AA] text-lg leading-relaxed max-w-lg"
            >
              {profile.bio}
            </p>

            {/* Buttons */}
            <div
              ref={btnsRef}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090D]"
              >
                Explore My Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[#A78BFA] border border-[#8B5CF6]/50 rounded-lg hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090D]"
              >
                About Me
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[#A1A1AA] border border-[#292536] rounded-lg hover:text-[#F5F3FF] hover:bg-[#171720] transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090D]"
              >
                Contact Me
              </Link>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-transparent text-[#A1A1AA] border border-[#292536] rounded-lg hover:text-[#F5F3FF] hover:bg-[#171720] transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090D]"
                aria-label="View GitHub profile (opens in new tab)"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-transparent text-[#A1A1AA] border border-[#292536] rounded-lg hover:text-[#F5F3FF] hover:bg-[#171720] transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090D]"
                aria-label="View LinkedIn profile (opens in new tab)"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-transparent text-[#A1A1AA] border border-[#292536] rounded-lg hover:text-[#F5F3FF] hover:bg-[#171720] transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090D]"
                aria-label="View Facebook profile (opens in new tab)"
              >
                <Facebook size={16} />
                Facebook
              </a>
            </div>

            {/* University badge */}
            <div className="flex items-center gap-2 pt-2">
              <span className="font-mono text-xs text-[#A1A1AA]">
                <span className="text-[#8B5CF6]">@</span> {profile.university}
              </span>
            </div>
          </div>

          {/* Right: Terminal */}
          <div ref={termRef} className="hidden lg:block">
            <TerminalWindow
              lines={terminalLines}
              title="bash — utso@portfolio"
              showCursor
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        aria-hidden="true"
      >
        <span className="text-[#A1A1AA] text-xs font-mono">scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#8B5CF6] to-transparent" />
      </div>
    </section>
  );
}

