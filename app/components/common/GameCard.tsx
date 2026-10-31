import Link from "next/link";
import { Gamepad2, ArrowRight } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  color?: string; // accent color class
}

export default function GameCard({
  id,
  title,
  description,
  emoji = "🎮",
  color = "text-[#8B5CF6]",
}: GameCardProps) {
  return (
    <article className="group flex flex-col h-full bg-[#171720] border border-[#292536] rounded-xl p-6 transition-all duration-300 hover:border-[#8B5CF6]/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-4 text-2xl">
        <span role="img" aria-hidden="true">{emoji}</span>
      </div>

      <h3 className={`text-lg font-semibold mb-2 ${color} group-hover:text-[#C4B5FD] transition-colors`}>
        {title}
      </h3>

      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <Link
        href={`/arcade#${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] hover:text-[#C4B5FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
      >
        <Gamepad2 size={15} />
        Play Now
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}

