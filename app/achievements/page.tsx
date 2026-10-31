import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Achievements and milestones of Muhaimin Islam Utso.",
};

export default function AchievementsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>achievements
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Achievements &amp; Milestones
          </h1>
        </div>

        {/* Honest empty state */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-6">
            <Trophy size={28} className="text-[#8B5CF6]" />
          </div>

          <h2 className="text-xl font-semibold text-[#F5F3FF] mb-3">
            Building Towards New Milestones
          </h2>
          <p className="text-[#A1A1AA] max-w-md leading-relaxed">
            New milestones are being built. This section will be updated as new
            achievements, certificates, competition results, and recognition
            are earned.
          </p>

          <div className="mt-8 p-4 bg-[#171720] border border-dashed border-[#292536] rounded-lg max-w-sm w-full">
            <p className="font-mono text-xs text-[#A1A1AA]">
              <span className="text-[#8B5CF6]">$ </span>
              status: actively working on it
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

