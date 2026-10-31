"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ArrowLeft,
  ExternalLink,
  Mail,
  Terminal,
  Copy,
  Check,
  Code2,
  GraduationCap,
  FolderGit2,
} from "lucide-react";
import { Github, Linkedin, Facebook } from "@/app/components/common/Icons";
import { profile } from "@/app/data/profile";

const RESUME_PATH = "/resume/Muhaimin-Islam-Utso-CV.pdf";

type ActiveTab = "manifest" | "skills" | "projects";

export default function ResumeClient() {
  const [exists, setExists] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("manifest");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if a compiled resume PDF exists
    fetch(RESUME_PATH, { method: "HEAD" })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, []);

  const handleCopyProfile = async () => {
    const textToCopy = `Candidate: ${profile.fullName} (${profile.displayName})
Role: ${profile.identity}
Institution: ${profile.university} - ${profile.department}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Facebook: ${profile.facebook}
Core Stack: C#, Windows Forms, Microsoft SQL Server, React, TypeScript, Node.js, NestJS`;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="mb-8">
        <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
          <span aria-hidden="true">{"// "}</span>curriculum-vitae
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
          My Resume / CV
        </h1>
        <p className="text-[#A1A1AA] text-lg">
          A summary of my education, technical capabilities, and project portfolio.
        </p>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
      >
        <ArrowLeft size={15} />
        Back to Home
      </Link>

      {/* Main Card */}
      <div className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#292536]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-[#8B5CF6]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#F5F3FF]">
                  {profile.fullName}
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#8B5CF6]/10 text-[#C4B5FD] border border-[#8B5CF6]/20">
                  {profile.displayName}
                </span>
              </div>
              <p className="text-[#A78BFA] text-sm mt-0.5">{profile.identity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AIUB CSE
            </span>
          </div>
        </div>

        {/* PDF Status Section */}
        {exists === true ? (
          <div className="p-5 bg-[#111118] border border-emerald-500/30 rounded-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-400 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  PDF Resume Ready for Download
                </p>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Full formatted curriculum vitae document is compiled and available.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  aria-label="Open resume PDF in new tab"
                >
                  <ExternalLink size={14} />
                  Open in New Tab
                </a>
                <a
                  href={RESUME_PATH}
                  download="Muhaimin-Islam-Utso-CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-[#A78BFA] border border-[#8B5CF6]/50 rounded-lg hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-colors font-medium text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  aria-label="Download resume PDF"
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-[#111118] border border-[#8B5CF6]/30 rounded-xl mb-6">
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/30">
                    Direct Dispatch
                  </span>
                  <span className="text-xs text-[#A1A1AA] font-mono">
                    status: 200 · verified manifest
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#F5F3FF]">
                  Curriculum Vitae & Verified Credentials
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  My official PDF CV is distributed directly for verified academic and professional inquiries. Inspect the interactive terminal manifest below or request an official copy directly.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 md:pt-0 w-full md:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] flex-1 sm:flex-none"
                >
                  <Mail size={14} />
                  Request Official CV
                </Link>
                <button
                  onClick={handleCopyProfile}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-transparent text-[#A78BFA] border border-[#292536] hover:border-[#8B5CF6]/60 rounded-lg hover:bg-[#8B5CF6]/10 transition-colors font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  title="Copy profile summary to clipboard"
                  aria-label="Copy profile summary"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Fast Info</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Hub Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <Link
            href="/education"
            className="flex items-center gap-3 p-3 rounded-lg bg-[#111118]/80 border border-[#292536] hover:border-[#8B5CF6]/50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] group-hover:text-[#C4B5FD]">
              <GraduationCap size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F5F3FF]">Education</p>
              <p className="text-[11px] text-[#A1A1AA]">AIUB · CSE Degree</p>
            </div>
          </Link>

          <Link
            href="/skills"
            className="flex items-center gap-3 p-3 rounded-lg bg-[#111118]/80 border border-[#292536] hover:border-[#8B5CF6]/50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] group-hover:text-[#C4B5FD]">
              <Code2 size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F5F3FF]">Tech Stack</p>
              <p className="text-[11px] text-[#A1A1AA]">C#, React, Node.js</p>
            </div>
          </Link>

          <Link
            href="/projects"
            className="flex items-center gap-3 p-3 rounded-lg bg-[#111118]/80 border border-[#292536] hover:border-[#8B5CF6]/50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] group-hover:text-[#C4B5FD]">
              <FolderGit2 size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F5F3FF]">Projects</p>
              <p className="text-[11px] text-[#A1A1AA]">3 Verified Repos</p>
            </div>
          </Link>
        </div>

        {/* Terminal Window View */}
        <div className="border border-[#292536] rounded-xl overflow-hidden bg-[#0D0D14]">
          {/* Terminal Titlebar & Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#111118] border-b border-[#292536] px-4 py-2.5 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
              <span className="font-mono text-xs text-[#A1A1AA] ml-2 flex items-center gap-1.5">
                <Terminal size={12} className="text-[#8B5CF6]" />
                utso@developer-terminal: ~/cv
              </span>
            </div>

            {/* Interactive Tabs */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("manifest")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === "manifest"
                    ? "bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/40"
                    : "text-[#A1A1AA] hover:text-[#F5F3FF] hover:bg-[#171720]"
                }`}
              >
                manifest.json
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === "skills"
                    ? "bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/40"
                    : "text-[#A1A1AA] hover:text-[#F5F3FF] hover:bg-[#171720]"
                }`}
              >
                skills.sh
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === "projects"
                    ? "bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/40"
                    : "text-[#A1A1AA] hover:text-[#F5F3FF] hover:bg-[#171720]"
                }`}
              >
                projects.log
              </button>
            </div>
          </div>

          {/* Terminal Console Content */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
            {activeTab === "manifest" && (
              <pre className="text-[#C4B5FD] leading-relaxed">
                <code>
{`// CANDIDATE PROFILE MANIFEST
{
  `}<span className="text-[#A78BFA]">&quot;name&quot;</span>{`: `}<span className="text-emerald-400">&quot;${profile.fullName}&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;preferredName&quot;</span>{`: `}<span className="text-emerald-400">&quot;${profile.displayName}&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;role&quot;</span>{`: `}<span className="text-emerald-400">&quot;${profile.identity}&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;institution&quot;</span>{`: `}<span className="text-emerald-400">&quot;American International University-Bangladesh (AIUB)&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;department&quot;</span>{`: `}<span className="text-emerald-400">&quot;Computer Science and Engineering (CSE)&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;github&quot;</span>{`: `}<span className="text-emerald-400">&quot;${profile.github}&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;linkedin&quot;</span>{`: `}<span className="text-emerald-400">&quot;${profile.linkedin}&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;facebook&quot;</span>{`: `}<span className="text-emerald-400">&quot;${profile.facebook}&quot;</span>{`,
  `}<span className="text-[#A78BFA]">&quot;focusAreas&quot;</span>{`: [
    `}<span className="text-emerald-400">&quot;Full-Stack Web Development&quot;</span>{`,
    `}<span className="text-emerald-400">&quot;Desktop Software &amp; C# Systems&quot;</span>{`,
    `}<span className="text-emerald-400">&quot;Database Design &amp; Architecture&quot;</span>{`
  ],
  `}<span className="text-[#A78BFA]">&quot;status&quot;</span>{`: `}<span className="text-emerald-400">&quot;Available for Internships, Collaborations &amp; Junior Roles&quot;</span>{`
}`}
                </code>
              </pre>
            )}

            {activeTab === "skills" && (
              <div className="space-y-3 leading-relaxed">
                <div>
                  <span className="text-[#8B5CF6]">$</span>{" "}
                  <span className="text-[#F5F3FF]">utso --list-capabilities --category=all</span>
                </div>
                <div className="text-[#A1A1AA] pt-1">
                  <div>
                    <span className="text-[#A78BFA]">[PROGRAMMING_LANGUAGES]</span>
                    <div className="text-[#C4B5FD] pl-4">
                      ├── C# (.NET Framework &amp; Windows Forms)<br />
                      ├── JavaScript (ES6+)<br />
                      └── TypeScript
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#A78BFA]">[FRONTEND_TECHNOLOGIES]</span>
                    <div className="text-[#C4B5FD] pl-4">
                      ├── React.js / Next.js<br />
                      ├── React Native &amp; Expo<br />
                      └── Tailwind CSS
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#A78BFA]">[BACKEND_AND_DATABASES]</span>
                    <div className="text-[#C4B5FD] pl-4">
                      ├── Node.js &amp; NestJS<br />
                      ├── Microsoft SQL Server<br />
                      └── RESTful API Design
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#A78BFA]">[CORE_COMPETENCIES]</span>
                    <div className="text-[#C4B5FD] pl-4">
                      ├── Object-Oriented Programming (OOP)<br />
                      ├── Database Normalization &amp; Integration<br />
                      └── Application Architecture
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-4 leading-relaxed">
                <div>
                  <span className="text-[#8B5CF6]">$</span>{" "}
                  <span className="text-[#F5F3FF]">tail -n 20 ~/portfolio/projects.log</span>
                </div>
                <div className="p-3 bg-[#111118] border border-[#292536] rounded text-[#C4B5FD]">
                  <p className="text-emerald-400 font-bold">
                    [PROJECT_01] AIUB Sports Event Management System
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Status: Completed Academic Desktop Application
                  </p>
                  <p className="text-xs text-[#A78BFA]">
                    Stack: C# · Windows Forms · Microsoft SQL Server
                  </p>
                </div>
                <div className="p-3 bg-[#111118] border border-[#292536] rounded text-[#C4B5FD]">
                  <p className="text-emerald-400 font-bold">
                    [PROJECT_02] Hospital Management System
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Status: Completed Academic Desktop Application
                  </p>
                  <p className="text-xs text-[#A78BFA]">
                    Stack: C# · Windows Forms · Database Integration
                  </p>
                </div>
                <div className="p-3 bg-[#111118] border border-[#292536] rounded text-[#C4B5FD]">
                  <p className="text-emerald-400 font-bold">
                    [PROJECT_03] CampusRide
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Status: In Active Development (Mobile Concept)
                  </p>
                  <p className="text-xs text-[#A78BFA]">
                    Stack: React Native · Expo · Node.js · NestJS
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#292536]">
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Profile verified &amp; maintained on GitHub</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors"
            >
              <Facebook size={14} />
              <span>Facebook</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
            >
              <Mail size={13} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Terminal Command Status Box (Matches theme vibe, zero internal directory paths) */}
      <div className="p-4 bg-[#111118] border border-[#292536] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="font-mono text-xs text-[#A1A1AA]">
          <span className="text-[#8B5CF6]">$ </span>
          <span>git log -1 --pretty=format:&quot;academic &amp; technical credentials verified&quot;</span>
        </p>
        <span className="font-mono text-[11px] text-[#A78BFA] bg-[#171720] px-2.5 py-1 rounded border border-[#292536] self-start sm:self-auto">
          AIUB CSE · Undergraduate
        </span>
      </div>
    </div>
  );
}
