import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";

const games = [
  {
    id: "dino",
    title: "Chrome Dino Runner",
    description:
      "The classic T-Rex runner. Jump over cyber obstacles, duck under flying drones, and beat your distance high score.",
    emoji: "🦖",
    color: "text-[#8B5CF6]",
  },
  {
    id: "snake",
    title: "Snake Classic",
    description:
      "The retro arcade Snake game with selectable speeds. Eat food, grow longer, and avoid colliding with boundaries or yourself.",
    emoji: "🐍",
    color: "text-[#22C55E]",
  },
  {
    id: "memory",
    title: "Memory Match",
    description:
      "A card-matching memory game featuring tech stack icons. Flip pairs, test your recall, and minimize moves.",
    emoji: "🃏",
    color: "text-yellow-400",
  },
  {
    id: "adventure",
    title: "Platform Adventure",
    description:
      "A 2D platformer with 3 levels built with Phaser 3. Jump across platforms, defeat enemies, and collect power-ups.",
    emoji: "🏃",
    color: "text-[#A78BFA]",
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
              Take a Break &amp; Play
            </h2>
            <p className="text-[#A1A1AA] mt-2">
              Four fully playable games built directly into this portfolio.
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

        {/* Game cards (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
