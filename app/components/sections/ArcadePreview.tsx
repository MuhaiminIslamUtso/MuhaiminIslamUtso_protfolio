import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";

const games = [
  {
    id: "adventure",
    title: "Platform Adventure",
    description:
      "A 2D side-scrolling platformer with 3 levels. Jump across platforms, collect items, and defeat enemies on your way to victory.",
    emoji: "🏃",
    color: "text-[#22C55E]",
  },
  {
    id: "snake",
    title: "Snake",
    description:
      "The classic Snake game with multiple difficulty levels. Eat food, grow longer, and avoid hitting walls or yourself.",
    emoji: "🐍",
    color: "text-[#A78BFA]",
  },
  {
    id: "memory",
    title: "Memory Match",
    description:
      "A card-matching memory game featuring technology icons. Flip pairs, use your memory, and beat your best move count.",
    emoji: "🃏",
    color: "text-yellow-400",
  },
];

export default function ArcadePreview() {
  return (
    <section className="py-20" aria-labelledby="arcade-preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
              <span aria-hidden="true">{"// "}</span>mini-game arcade
            </p>
            <h2
              id="arcade-preview-heading"
              className="text-3xl sm:text-4xl font-bold text-[#F5F3FF]"
            >
              Take a Break & Play
            </h2>
            <p className="text-[#A1A1AA] mt-2">
              Three fully playable games built into this portfolio.
            </p>
          </div>
          <Link
            href="/arcade"
            className="inline-flex items-center gap-2 text-sm text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded flex-shrink-0"
          >
            Open Arcade
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Game cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <article
              key={game.id}
              className="group flex flex-col h-full bg-[#171720] border border-[#292536] rounded-xl p-6 transition-all duration-300 hover:border-[#8B5CF6]/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/10"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-4 text-2xl">
                <span role="img" aria-label={game.title}>{game.emoji}</span>
              </div>

              <h3 className={`text-lg font-semibold mb-2 ${game.color} group-hover:text-[#C4B5FD] transition-colors`}>
                {game.title}
              </h3>

              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5 flex-1">
                {game.description}
              </p>

              <Link
                href={`/arcade#${game.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] hover:text-[#C4B5FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
              >
                <Gamepad2 size={15} />
                Play Now
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

