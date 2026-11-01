import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import { GraduationCap, MapPin, BookOpen, Award, School } from "lucide-react";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education history of Muhaimin Islam Utso – AIUB, Khulna Model School and College, and Khulna Zilla School.",
};

const educationHistory = [
  {
    id: "aiub",
    level: "Undergraduate Degree",
    institution: "American International University-Bangladesh (AIUB)",
    degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
    location: "Dhaka, Bangladesh",
    statusBadge: "Currently Enrolled",
    statusNote: "Status: Active student. Graduation date and CGPA will be updated upon completion.",
    description:
      "The CSE curriculum at AIUB focuses on core computer science foundations, object-oriented programming, data structures, algorithms, database management systems, software engineering methodologies, and hands-on system development.",
    icon: GraduationCap,
    accent: "from-[#8B5CF6] to-[#A78BFA]",
  },
  {
    id: "hsc",
    level: "Higher Secondary Certificate (HSC)",
    institution: "Khulna Model School and College",
    degree: "Higher Secondary Certificate (HSC)",
    location: "Khulna, Bangladesh",
    statusBadge: "Completed",
    statusNote: "Discipline: Science Group (Physics, Chemistry, Higher Mathematics, ICT)",
    description:
      "Completed higher secondary education in the Science stream with a focus on analytical thinking, advanced mathematics, and foundational computer science principles.",
    icon: School,
    accent: "from-[#8B5CF6]/80 to-[#C4B5FD]",
  },
  {
    id: "ssc",
    level: "Secondary School Certificate (SSC)",
    institution: "Khulna Zilla School",
    degree: "Secondary School Certificate (SSC)",
    location: "Khulna, Bangladesh",
    statusBadge: "Completed",
    statusNote: "Discipline: Science Group (General Science & Mathematics)",
    description:
      "Completed secondary school certificate at Khulna Zilla School, building a strong academic foundation in mathematics, physical sciences, and logical problem solving.",
    icon: Award,
    accent: "from-[#8B5CF6]/60 to-[#8B5CF6]",
  },
];

export default function EducationPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>education
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Academic Background
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-relaxed">
            My educational journey from school foundations to university-level computer science.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {educationHistory.map((item) => {
            const Icon = item.icon;
            return (
              <section key={item.id} aria-labelledby={`${item.id}-heading`}>
                <div className="relative bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8 hover:border-[#8B5CF6]/40 transition-colors">
                  {/* Left accent bar */}
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${item.accent} rounded-l-xl`}
                    aria-hidden="true"
                  />

                  <div className="pl-3 sm:pl-4">
                    {/* Header: Level & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider">
                        {item.level}
                      </span>
                      <span
                        className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                          item.statusBadge === "Currently Enrolled"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-[#8B5CF6]/10 text-[#C4B5FD] border-[#8B5CF6]/20"
                        }`}
                      >
                        {item.statusBadge}
                      </span>
                    </div>

                    {/* Institution title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0 text-[#8B5CF6]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h2
                          id={`${item.id}-heading`}
                          className="text-xl sm:text-2xl font-bold text-[#F5F3FF]"
                        >
                          {item.institution}
                        </h2>
                        <p className="text-[#A78BFA] font-medium text-sm sm:text-base mt-0.5">
                          {item.degree}
                        </p>
                      </div>
                    </div>

                    {/* Details row */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 text-xs sm:text-sm text-[#A1A1AA]">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#8B5CF6]" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-[#8B5CF6]" />
                        <span>Science Track</span>
                      </div>
                    </div>

                    {/* Terminal Status / Discipline Note */}
                    <div className="p-3.5 bg-[#111118] border border-[#292536] rounded-lg mb-4">
                      <p className="text-xs font-mono text-[#A78BFA] leading-relaxed">
                        <span aria-hidden="true" className="text-[#8B5CF6]">$ </span>
                        {item.statusNote}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-10 p-4 bg-[#111118] border border-[#292536] rounded-xl flex items-center justify-between gap-3 text-xs text-[#A1A1AA] font-mono">
          <span><span aria-hidden="true">{"// "}</span>Verified academic records: AIUB · Khulna Model School &amp; College · Khulna Zilla School</span>
          <span className="text-emerald-400">● VERIFIED</span>
        </div>
      </div>
    </MainLayout>
  );
}
