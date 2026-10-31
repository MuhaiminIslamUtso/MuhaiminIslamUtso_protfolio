import Link from "next/link";
import MainLayout from "@/app/components/layout/MainLayout";
import { Terminal, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full bg-[#171720] border border-[#292536] rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto mb-6">
            <Terminal size={32} className="text-[#8B5CF6]" />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8B5CF6] mb-2">
            Error 404
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF] mb-3">
            Route Not Found
          </h1>

          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 font-mono">
            $ cd /destination<br />
            bash: cd: no such file or directory
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            >
              <Home size={16} />
              Return Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent text-[#A78BFA] border border-[#8B5CF6]/40 rounded-lg hover:bg-[#8B5CF6]/10 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            >
              <ArrowLeft size={16} />
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

