import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education history of Muhaimin Islam Utso – Computer Science and Engineering at AIUB.",
};

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
            My formal education in Computer Science and Engineering.
          </p>
        </div>

        {/* Education card */}
        <section aria-labelledby="aiub-heading">
          <div className="relative bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8">
            {/* Accent line */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#8B5CF6] to-[#A78BFA] rounded-l-xl" aria-hidden="true" />

            <div className="pl-4">
              {/* Institution header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={22} className="text-[#8B5CF6]" />
                </div>
                <div>
                  <h2
                    id="aiub-heading"
                    className="text-xl font-bold text-[#F5F3FF]"
                  >
                    American International University-Bangladesh
                  </h2>
                  <p className="text-[#A78BFA] font-medium mt-0.5">
                    Bachelor of Science in Computer Science and Engineering
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <MapPin size={15} className="text-[#8B5CF6] flex-shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <Calendar size={15} className="text-[#8B5CF6] flex-shrink-0" />
                  <span>Currently Enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <BookOpen size={15} className="text-[#8B5CF6] flex-shrink-0" />
                  <span>CSE Department</span>
                </div>
              </div>

              {/* Status note */}
              <div className="p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-lg mb-6">
                <p className="text-xs font-mono text-[#A78BFA]">
                  <span aria-hidden="true">$ </span>
                  Status: Active student. Graduation date and GPA will be updated upon completion.
                </p>
              </div>

              {/* About AIUB */}
              <div>
                <h3 className="text-sm font-semibold text-[#F5F3FF] mb-2">About the Program</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  The CSE program at AIUB covers core computer science fundamentals,
                  software engineering principles, programming, databases, algorithms,
                  and systems design. The curriculum emphasizes practical application
                  through hands-on projects and academic software development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder note */}
        <div className="mt-8 p-4 bg-[#171720] border border-dashed border-[#292536] rounded-lg">
          <p className="text-xs text-[#A1A1AA] text-center">
            Additional academic details, courses, and results will be added here as they are confirmed.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

