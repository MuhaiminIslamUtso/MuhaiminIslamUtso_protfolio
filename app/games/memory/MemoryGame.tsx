"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GameStorage } from "@/app/lib/storage";
import { RotateCcw, Trophy, Clock, Award } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

interface CardItem {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const ALL_CARDS: Omit<CardItem, "id">[] = [
  { name: "JavaScript", icon: "JS", color: "from-amber-500 to-yellow-600" },
  { name: "TypeScript", icon: "TS", color: "from-blue-500 to-indigo-600" },
  { name: "React", icon: "⚛", color: "from-cyan-400 to-blue-500" },
  { name: "Node.js", icon: "Node", color: "from-emerald-500 to-green-600" },
  { name: "C#", icon: "C#", color: "from-purple-500 to-violet-600" },
  { name: "Python", icon: "Py", color: "from-sky-400 to-yellow-500" },
  { name: "SQL", icon: "SQL", color: "from-orange-500 to-red-600" },
  { name: "Git", icon: "Git", color: "from-rose-500 to-pink-600" },
];

const DIFFICULTY_PAIRS: Record<Difficulty, number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

function generateDeck(difficulty: Difficulty): CardItem[] {
  const pairCount = DIFFICULTY_PAIRS[difficulty];
  const selected = ALL_CARDS.slice(0, pairCount);

  const deck: CardItem[] = [];
  selected.forEach((card, idx) => {
    deck.push({ ...card, id: idx * 2 });
    deck.push({ ...card, id: idx * 2 + 1 });
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cards, setCards] = useState<CardItem[]>(() => generateDeck("medium"));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedNames, setMatchedNames] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<number>(() => {
    const m = GameStorage.getMemoryBestMoves("medium");
    return m === Infinity ? 0 : m;
  });
  const [bestTime, setBestTime] = useState<number>(() => {
    const t = GameStorage.getMemoryBestTime("medium");
    return t === Infinity ? 0 : t;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart current game
  const setupGame = useCallback(() => {
    setCards(generateDeck(difficulty));
    setFlippedIndices([]);
    setMatchedNames([]);
    setMoves(0);
    setTime(0);
    setIsActive(false);
    setIsWon(false);

    if (timerRef.current) clearInterval(timerRef.current);
  }, [difficulty]);

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    setCards(generateDeck(d));
    setFlippedIndices([]);
    setMatchedNames([]);
    setMoves(0);
    setTime(0);
    setIsActive(false);
    setIsWon(false);

    const savedMoves = GameStorage.getMemoryBestMoves(d);
    const savedTime = GameStorage.getMemoryBestTime(d);
    setBestMoves(savedMoves === Infinity ? 0 : savedMoves);
    setBestTime(savedTime === Infinity ? 0 : savedTime);

    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Timer loop
  useEffect(() => {
    if (isActive && !isWon) {
      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isWon]);

  // Handle Card Click
  const handleCardClick = (index: number) => {
    if (!isActive && !isWon) {
      setIsActive(true);
    }

    // Prevent clicking already flipped, matched, or 2 cards currently locking
    if (
      flippedIndices.length >= 2 ||
      flippedIndices.includes(index) ||
      matchedNames.includes(cards[index].name) ||
      isWon
    ) {
      return;
    }

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    // If 2 cards are flipped, check for match
    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);

      const firstCard = cards[nextFlipped[0]];
      const secondCard = cards[nextFlipped[1]];

      if (firstCard.name === secondCard.name) {
        // Matched!
        const nextMatched = [...matchedNames, firstCard.name];
        setMatchedNames(nextMatched);
        setFlippedIndices([]);

        // Check if all matched
        if (nextMatched.length === DIFFICULTY_PAIRS[difficulty]) {
          setIsWon(true);
          setIsActive(false);

          // Update storage
          const finalMoves = moves + 1;
          const finalTime = time;

          if (bestMoves === 0 || finalMoves < bestMoves) {
            setBestMoves(finalMoves);
            GameStorage.setMemoryBestMoves(difficulty, finalMoves);
          }

          if (bestTime === 0 || finalTime < bestTime) {
            setBestTime(finalTime);
            GameStorage.setMemoryBestTime(difficulty, finalTime);
          }
        }
      } else {
        // Mismatch: delay and flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full bg-[#111118] border border-[#292536] rounded-2xl p-6 shadow-2xl">
      {/* Top Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#F5F3FF]">Tech Memory Match</h3>
          <p className="text-xs text-[#A1A1AA] font-mono">Find matching technology pairs</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg text-center flex items-center gap-2">
            <Clock size={16} className="text-[#8B5CF6]" />
            <div>
              <span className="text-[10px] font-mono text-[#A1A1AA] block uppercase">Time</span>
              <span className="text-sm font-bold text-[#F5F3FF] font-mono">{formatTime(time)}</span>
            </div>
          </div>
          <div className="bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#A1A1AA] block uppercase">Moves</span>
            <span className="text-sm font-bold text-[#A78BFA] font-mono">{moves}</span>
          </div>
          {bestMoves > 0 && (
            <div className="bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg text-center flex items-center gap-1.5">
              <Trophy size={14} className="text-yellow-400" />
              <div>
                <span className="text-[10px] font-mono text-[#A1A1AA] block uppercase">Best</span>
                <span className="text-xs font-bold text-yellow-400 font-mono">
                  {bestMoves}m / {formatTime(bestTime)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Difficulty Selector & Controls */}
      <div className="w-full flex items-center justify-between gap-2 mb-6 pb-4 border-b border-[#292536]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#A1A1AA]">Pairs:</span>
          <div className="flex gap-1">
            {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => handleDifficultyChange(d)}
                className={`px-3 py-1 rounded text-xs font-mono uppercase transition-colors ${
                  difficulty === d
                    ? "bg-[#8B5CF6] text-white font-bold"
                    : "bg-[#171720] text-[#A1A1AA] hover:text-[#F5F3FF]"
                }`}
              >
                {d} ({DIFFICULTY_PAIRS[d]})
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={setupGame}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Cards Grid */}
      <div
        className={`w-full grid gap-3 ${
          difficulty === "easy"
            ? "grid-cols-4 max-w-md"
            : difficulty === "medium"
            ? "grid-cols-3 sm:grid-cols-4 max-w-lg"
            : "grid-cols-4 max-w-xl"
        }`}
      >
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedNames.includes(card.name);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              disabled={isMatched || isFlipped}
              aria-label={`Card ${idx + 1}: ${isFlipped || isMatched ? card.name : "Hidden"}`}
              className={`aspect-square relative rounded-xl border transition-all duration-300 transform perspective-1000 ${
                isMatched
                  ? "border-[#22C55E]/50 bg-[#22C55E]/10 cursor-default"
                  : isFlipped
                  ? "border-[#8B5CF6] bg-[#171720] scale-95 shadow-md shadow-[#8B5CF6]/20"
                  : "border-[#292536] bg-[#171720] hover:border-[#8B5CF6]/50 hover:bg-[#1A1A26] active:scale-95"
              }`}
            >
              {isFlipped || isMatched ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-bold text-base shadow-sm mb-1`}
                  >
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-mono text-[#F5F3FF] font-medium truncate max-w-full">
                    {card.name}
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-[#09090D] border border-[#292536] flex items-center justify-center font-mono text-xs text-[#8B5CF6]">
                    ?
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="w-full mt-6 p-6 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl text-center space-y-3 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-[#22C55E]">
            <Award size={24} />
            Congratulations! You Won!
          </div>
          <p className="text-sm text-[#F5F3FF]">
            Solved in <span className="font-bold text-[#A78BFA]">{moves} moves</span> and{" "}
            <span className="font-bold text-[#A78BFA]">{formatTime(time)}</span>.
          </p>
          <button
            onClick={setupGame}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
