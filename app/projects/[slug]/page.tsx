import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import ProjectCard from "@/app/components/common/ProjectCard";
import { getProjectBySlug, getRelatedProjects, projects } from "@/app/data/projects";
import { ArrowLeft, ExternalLink, Code2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Github } from "@/app/components/common/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project.slug);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
        >
          <ArrowLeft size={16} />
          Back to all projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full border border-[#8B5CF6]/40 text-[#A78BFA] bg-[#8B5CF6]/10">
              {project.status === "academic"
                ? "Academic Project"
                : project.status === "in-development"
                ? "In Development"
                : "Completed"}
            </span>
            <span className="text-xs font-mono text-[#A1A1AA] bg-[#171720] px-2.5 py-1 rounded">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F3FF] mb-4">
            {project.title}
          </h1>

          <p className="text-[#A1A1AA] text-lg sm:text-xl leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Action Links & Tech Stack Bar */}
        <div className="bg-[#171720] border border-[#292536] rounded-xl p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 px-3 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                <Github size={16} />
                View Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-[#A78BFA] border border-[#8B5CF6]/50 rounded-lg hover:bg-[#8B5CF6]/10 transition-colors text-sm font-medium"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 mb-16">
          {/* Overview */}
          <section className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#F5F3FF] mb-4 flex items-center gap-2.5">
              <Code2 size={20} className="text-[#8B5CF6]" />
              Project Overview &amp; Context
            </h2>
            <p className="text-[#A1A1AA] leading-relaxed text-base">
              {project.description}
            </p>
          </section>

          {/* Features */}
          <section className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#F5F3FF] mb-6 flex items-center gap-2.5">
              <CheckCircle2 size={20} className="text-[#22C55E]" />
              Core Functionality &amp; Implemented Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-[#111118] border border-[#292536] rounded-lg"
                >
                  <span className="text-[#8B5CF6] text-sm mt-0.5" aria-hidden="true">✔</span>
                  <span className="text-sm text-[#F5F3FF] leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges & Learning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges && project.challenges.length > 0 && (
              <section className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8 flex flex-col">
                <h2 className="text-lg font-bold text-[#F5F3FF] mb-4 flex items-center gap-2.5">
                  <AlertCircle size={18} className="text-yellow-400" />
                  Engineering Challenges
                </h2>
                <ul className="space-y-3 flex-1">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                      <span className="text-[#8B5CF6] text-xs mt-1" aria-hidden="true">▹</span>
                      <span className="leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.learningOutcomes && project.learningOutcomes.length > 0 && (
              <section className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8 flex flex-col">
                <h2 className="text-lg font-bold text-[#F5F3FF] mb-4 flex items-center gap-2.5">
                  <Sparkles size={18} className="text-[#A78BFA]" />
                  Key Learning Outcomes
                </h2>
                <ul className="space-y-3 flex-1">
                  {project.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                      <span className="text-[#22C55E] text-xs mt-1" aria-hidden="true">▹</span>
                      <span className="leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-[#292536]">
            <h2 className="text-xl font-bold text-[#F5F3FF] mb-6">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <ProjectCard key={rel.id} project={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

