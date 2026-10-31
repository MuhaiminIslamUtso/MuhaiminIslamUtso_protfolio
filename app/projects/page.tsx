"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/app/components/layout/MainLayout";
import ProjectCard from "@/app/components/common/ProjectCard";
import { projects } from "@/app/data/projects";
import { Search, Filter, RotateCcw } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Collect all unique technologies
  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter projects based on query, technology, and status
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTech =
        selectedTech === "ALL" || project.technologies.includes(selectedTech);

      const matchesStatus =
        selectedStatus === "ALL" || project.status === selectedStatus;

      return matchesSearch && matchesTech && matchesStatus;
    });
  }, [searchQuery, selectedTech, selectedStatus]);

  const hasActiveFilters =
    searchQuery !== "" || selectedTech !== "ALL" || selectedStatus !== "ALL";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTech("ALL");
    setSelectedStatus("ALL");
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>projects
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Projects &amp; Work
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
            A portfolio of academic desktop applications, software engineering
            projects, and ongoing mobile development.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-[#171720] border border-[#292536] rounded-xl p-6 mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or technologies..."
                className="w-full bg-[#111118] border border-[#292536] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F5F3FF] placeholder-[#A1A1AA]/60 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                aria-label="Search projects by name or technology"
              />
            </div>

            {/* Filter by Technology */}
            <div className="relative">
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-[#111118] border border-[#292536] rounded-lg px-4 py-2.5 text-sm text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] transition-colors appearance-none cursor-pointer"
                aria-label="Filter by technology"
              >
                <option value="ALL">All Technologies</option>
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              <Filter
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] pointer-events-none"
              />
            </div>

            {/* Filter by Status */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#111118] border border-[#292536] rounded-lg px-4 py-2.5 text-sm text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] transition-colors appearance-none cursor-pointer"
                aria-label="Filter by status"
              >
                <option value="ALL">All Project Statuses</option>
                <option value="academic">Academic Projects</option>
                <option value="in-development">In Development</option>
                <option value="completed">Completed</option>
              </select>
              <Filter
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] pointer-events-none"
              />
            </div>
          </div>

          {/* Active filter count & Reset */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-[#292536]">
              <span className="text-xs font-mono text-[#A1A1AA]">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A78BFA] hover:text-[#C4B5FD] transition-colors"
              >
                <RotateCcw size={12} />
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-[#171720] border border-[#292536] rounded-xl p-8">
            <p className="text-lg font-semibold text-[#F5F3FF] mb-2">
              No matching projects found
            </p>
            <p className="text-sm text-[#A1A1AA] max-w-md mb-6">
              We couldn&apos;t find any projects matching your current search query or
              filters. Try adjusting your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-sm font-medium"
            >
              <RotateCcw size={14} />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
