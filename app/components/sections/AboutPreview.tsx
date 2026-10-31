import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/app/data/profile";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-[#111118]" aria-labelledby="about-preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
              <span aria-hidden="true">{"// "}</span>about me
            </p>
            <h2
              id="about-preview-heading"
              className="text-3xl sm:text-4xl font-bold text-[#F5F3FF] mb-4"
            >
              Who is UTSO?
            </h2>
            <p className="text-[#A1A1AA] text-lg leading-relaxed mb-6">
              {profile.bio}
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-8">
              I&apos;m studying Computer Science and Engineering at AIUB, building
              practical projects, and continuously expanding my skill set through
              hands-on development.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
            >
              Read More About Me
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats/highlights */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Projects Built", value: "3+", sub: "Academic & personal" },
              { label: "Technologies", value: "10+", sub: "Languages & frameworks" },
              { label: "University", value: "AIUB", sub: "CSE Department" },
              { label: "Status", value: "Active", sub: "Learning & building" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#171720] border border-[#292536] rounded-xl p-5"
              >
                <p className="text-2xl font-bold text-[#A78BFA] mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-[#F5F3FF] mb-0.5">{stat.label}</p>
                <p className="text-xs text-[#A1A1AA]">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

