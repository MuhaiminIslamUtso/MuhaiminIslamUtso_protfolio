import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import { Code2, BookOpen, Layers, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Learning journey and practical development experience of Muhaimin Islam Utso.",
};

const experiences = [
  {
    icon: Code2,
    title: "AIUB Sports Event Management System",
    type: "Academic Project",
    period: "Academic",
    description:
      "Developed a full desktop application for managing university sports events using C# Windows Forms and Microsoft SQL Server. Gained practical experience in OOP design, database integration, and building complete end-to-end applications.",
    highlights: [
      "Object-oriented C# design with multiple interconnected modules",
      "Relational database design and SQL Server integration",
      "Windows Forms UI development",
      "Academic project planning and execution",
    ],
  },
  {
    icon: Layers,
    title: "Hospital Management System",
    type: "Academic Project",
    period: "Academic",
    description:
      "Built a desktop hospital management system using C# and Windows Forms, managing patients, doctors, and appointments. Applied software design patterns learned in coursework to a real-world domain.",
    highlights: [
      "Multi-entity domain modeling",
      "Database-backed desktop application",
      "Multi-form Windows application architecture",
      "Practical experience with C# class design",
    ],
  },
  {
    icon: Tag,
    title: "CampusRide – Mobile App Development",
    type: "Personal/In Development",
    period: "Current",
    description:
      "Currently developing a university-focused ride-sharing mobile application using React Native with Expo and a planned NestJS backend. Learning full-stack mobile development from design to implementation.",
    highlights: [
      "React Native and Expo framework exploration",
      "TypeScript across frontend and backend",
      "NestJS backend API architecture",
      "Mobile UX design and component structure",
    ],
  },
  {
    icon: BookOpen,
    title: "Continuous Technical Learning",
    type: "Self-directed",
    period: "Ongoing",
    description:
      "Actively expanding skills through coursework, personal projects, and hands-on experimentation with modern technologies. Focused on becoming a competent full-stack developer.",
    highlights: [
      "Web development with React and TypeScript",
      "Backend development with Node.js and NestJS",
      "Database design (SQL Server, PostgreSQL)",
      "Version control with Git and GitHub",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>experience
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Learning Journey &amp; Practical Development
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-relaxed">
            My development experience through academic projects, personal initiatives,
            and hands-on learning.
          </p>
        </div>

        {/* Note */}
        <div className="mb-10 p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-lg">
          <p className="font-mono text-xs text-[#A78BFA]">
            <span aria-hidden="true">$ </span>
            No professional employment yet. This section will be updated when professional experience is gained.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6" role="list" aria-label="Experience timeline">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5CF6] via-[#292536] to-transparent"
            aria-hidden="true"
          />

          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <article key={i} className="relative pl-16" role="listitem">
                {/* Dot */}
                <div
                  className="absolute left-4 top-5 w-4 h-4 rounded-full bg-[#8B5CF6] border-2 border-[#09090D] z-10"
                  aria-hidden="true"
                />

                <div className="bg-[#171720] border border-[#292536] rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#8B5CF6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-base font-semibold text-[#F5F3FF]">
                          {exp.title}
                        </h2>
                        <span className="font-mono text-xs text-[#A78BFA] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2 py-0.5 rounded">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#A1A1AA]">{exp.period}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                        <span className="text-[#8B5CF6] text-xs" aria-hidden="true">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

