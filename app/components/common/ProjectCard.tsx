import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Github } from "@/app/components/common/Icons";
import type { Project } from "@/app/data/projects";

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  completed: { label: "Completed", color: "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30" },
  academic: { label: "Academic", color: "text-[#A78BFA] bg-[#8B5CF6]/10 border-[#8B5CF6]/30" },
  "in-development": { label: "In Development", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
  concept: { label: "Concept", color: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <article className="group relative flex flex-col h-full bg-[#171720] border border-[#292536] rounded-xl p-6 transition-all duration-300 hover:border-[#8B5CF6]/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
      {/* Status badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-full border ${status.color}`}
        >
          {status.label}
        </span>
        <span className="text-xs text-[#A1A1AA] font-mono bg-[#111118] px-2 py-1 rounded">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#F5F3FF] mb-2 group-hover:text-[#A78BFA] transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4 flex-1">
        {project.shortDescription}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="text-xs text-[#A1A1AA] px-2 py-0.5">
            +{project.technologies.length - 5} more
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A78BFA] hover:text-[#C4B5FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
        >
          View Details
          <ArrowRight size={14} />
        </Link>

        {project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={15} />
            <span className="sr-only">GitHub</span>
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink size={15} />
            <span className="sr-only">Live Demo</span>
          </a>
        )}
      </div>
    </article>
  );
}

