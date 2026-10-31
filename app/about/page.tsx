import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import { profile } from "@/app/data/profile";
import { BookOpen, Code2, Target, Lightbulb } from "lucide-react";
import { Github, Linkedin, Facebook } from "@/app/components/common/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Muhaimin Islam Utso – his journey, interests, and goals as an aspiring full-stack developer.",
};

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>about me
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Muhaimin Islam Utso</span>
          </h1>
          <p className="text-[#A1A1AA] text-xl leading-relaxed">
            {profile.identity}
          </p>
        </div>

        {/* Bio */}
        <section className="mb-12" aria-labelledby="introduction-heading">
          <div className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                <BookOpen size={16} className="text-[#8B5CF6]" />
              </div>
              <h2 id="introduction-heading" className="text-lg font-semibold text-[#F5F3FF]">
                Introduction
              </h2>
            </div>
            <div className="prose prose-invert max-w-none">
              {profile.longBio.split("\n\n").map((para, i) => (
                <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="mb-12" aria-labelledby="interests-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
              <Lightbulb size={16} className="text-[#8B5CF6]" />
            </div>
            <h2 id="interests-heading" className="text-xl font-semibold text-[#F5F3FF]">
              Development Interests
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.interests.map((interest) => (
              <div
                key={interest}
                className="flex items-center gap-3 p-4 bg-[#171720] border border-[#292536] rounded-lg"
              >
                <span className="text-[#8B5CF6]" aria-hidden="true">→</span>
                <span className="text-[#F5F3FF] text-sm">{interest}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Currently learning */}
        <section className="mb-12" aria-labelledby="learning-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
              <Code2 size={16} className="text-[#8B5CF6]" />
            </div>
            <h2 id="learning-heading" className="text-xl font-semibold text-[#F5F3FF]">
              Currently Learning
            </h2>
          </div>
          <div className="bg-[#171720] border border-[#292536] rounded-xl p-6">
            <ul className="space-y-3">
              {profile.currentlyLearning.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#A1A1AA] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Goals */}
        <section aria-labelledby="goals-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
              <Target size={16} className="text-[#8B5CF6]" />
            </div>
            <h2 id="goals-heading" className="text-xl font-semibold text-[#F5F3FF]">
              Personal Development Goals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.goals.map((goal, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-[#171720] border border-[#292536] rounded-lg"
              >
                <span className="font-mono text-[#8B5CF6] text-xs mt-0.5 flex-shrink-0">
                  0{i + 1}
                </span>
                <span className="text-[#A1A1AA] text-sm leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Connect Channels */}
        <section className="mt-12" aria-labelledby="connect-heading">
          <div className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 id="connect-heading" className="text-lg font-semibold text-[#F5F3FF] mb-1">
                Let&apos;s Connect
              </h2>
              <p className="text-sm text-[#A1A1AA]">
                Find me across my active developer and professional profiles.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111118] border border-[#292536] hover:border-[#8B5CF6]/50 rounded-lg text-sm text-[#F5F3FF] hover:text-[#A78BFA] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111118] border border-[#292536] hover:border-[#8B5CF6]/50 rounded-lg text-sm text-[#F5F3FF] hover:text-[#A78BFA] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111118] border border-[#292536] hover:border-[#8B5CF6]/50 rounded-lg text-sm text-[#F5F3FF] hover:text-[#A78BFA] transition-colors"
                aria-label="Facebook Profile"
              >
                <Facebook size={16} />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

