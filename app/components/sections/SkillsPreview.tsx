import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skillCategories } from "@/app/data/skills";
import SkillCard from "@/app/components/common/SkillCard";

export default function SkillsPreview() {
  // Show only the first 3 categories on home
  const previewCategories = skillCategories.slice(0, 3);

  return (
    <section className="py-20 bg-[#111118]" aria-labelledby="skills-preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
              <span aria-hidden="true">{"// "}</span>skills
            </p>
            <h2
              id="skills-preview-heading"
              className="text-3xl sm:text-4xl font-bold text-[#F5F3FF]"
            >
              Technologies I Work With
            </h2>
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded flex-shrink-0"
          >
            View All Skills
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {previewCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider mb-4">
                {category.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

