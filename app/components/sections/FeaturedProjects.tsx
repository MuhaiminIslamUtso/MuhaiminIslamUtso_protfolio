import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/app/data/projects";
import ProjectCard from "@/app/components/common/ProjectCard";

export default function FeaturedProjects() {
  return (
    <section className="py-20" aria-labelledby="featured-projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
              <span aria-hidden="true">{"// "}</span>featured projects
            </p>
            <h2
              id="featured-projects-heading"
              className="text-3xl sm:text-4xl font-bold text-[#F5F3FF]"
            >
              What I&apos;ve Built
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded flex-shrink-0"
          >
            View All Projects
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

