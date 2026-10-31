"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/app/components/layout/MainLayout";
import SnakeGame from "@/app/games/snake/SnakeGame";
import MemoryGame from "@/app/games/memory/MemoryGame";
import AdventureGame from "@/app/games/adventure/AdventureGame";
import { Gamepad2 } from "lucide-react";

type GameTab = "adventure" | "snake" | "memory";

export default function ArcadePage() {
  const [activeGame, setActiveGame] = useState<GameTab>("adventure");

  // Read URL hash on mount or hashchange (e.g. #snake, #memory)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") as GameTab;
      if (hash === "adventure" || hash === "snake" || hash === "memory") {
        setActiveGame(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleSelectGame = (game: GameTab) => {
    setActiveGame(game);
    window.location.hash = game;
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full mb-4">
            <Gamepad2 size={15} className="text-[#8B5CF6]" />
            <span className="font-mono text-xs text-[#A78BFA] uppercase tracking-wider">
              Interactive Arcade
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Developer Mini-Games
          </h1>
          <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
            Take a break from looking through code. Enjoy three complete, custom-built
            mini-games with local score persistence.
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => handleSelectGame("adventure")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeGame === "adventure"
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25 border border-[#8B5CF6]"
                : "bg-[#171720] text-[#A1A1AA] hover:text-[#F5F3FF] border border-[#292536]"
            }`}
          >
            <span role="img" aria-hidden="true">🏃</span>
            Platform Adventure (Phaser)
          </button>

          <button
            onClick={() => handleSelectGame("snake")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeGame === "snake"
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25 border border-[#8B5CF6]"
                : "bg-[#171720] text-[#A1A1AA] hover:text-[#F5F3FF] border border-[#292536]"
            }`}
          >
            <span role="img" aria-hidden="true">🐍</span>
            Snake Classic
          </button>

          <button
            onClick={() => handleSelectGame("memory")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeGame === "memory"
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25 border border-[#8B5CF6]"
                : "bg-[#171720] text-[#A1A1AA] hover:text-[#F5F3FF] border border-[#292536]"
            }`}
          >
            <span role="img" aria-hidden="true">🃏</span>
            Tech Memory Match
          </button>
        </div>

        {/* Active Game Area */}
        <div className="mb-16">
          {activeGame === "adventure" && <AdventureGame />}
          {activeGame === "snake" && <SnakeGame />}
          {activeGame === "memory" && <MemoryGame />}
        </div>

        {/* Game Feature Cards / Rules Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#292536]">
          <div className="bg-[#171720] border border-[#292536] rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F3FF] mb-2">
              <span className="text-xl">🏃</span>
              Platform Adventure
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
              Built using Phaser 3 Arcade physics. Features 3 distinct progressive
              levels: Beginner Village, Skill Forest, and Project City with hazards,
              collectibles, and responsive touch controls.
            </p>
            <div className="font-mono text-[11px] text-[#8B5CF6]">
              Arrow Keys / Space / Mobile buttons
            </div>
          </div>

          <div className="bg-[#171720] border border-[#292536] rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F3FF] mb-2">
              <span className="text-xl">🐍</span>
              Snake Classic
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
              Grid-based game loop with custom speeds, food generation with empty
              cell validation, high score persistence in browser LocalStorage, and
              suicide-lock prevention.
            </p>
            <div className="font-mono text-[11px] text-[#8B5CF6]">
              WASD / Arrow Keys / On-screen D-Pad
            </div>
          </div>

          <div className="bg-[#171720] border border-[#292536] rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F3FF] mb-2">
              <span className="text-xl">🃏</span>
              Tech Memory Match
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
              Pure React &amp; TypeScript state machine with timer, move counter,
              difficulty-scaling card pairs, and LocalStorage records.
            </p>
            <div className="font-mono text-[11px] text-[#8B5CF6]">
              Mouse Click / Touch / Keyboard
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
