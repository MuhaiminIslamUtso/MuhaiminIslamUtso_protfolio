"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GameStorage } from "@/app/lib/storage";
import { Play, Pause, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Difficulty = "easy" | "normal" | "hard";

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20;

const SPEEDS: Record<Difficulty, number> = {
  easy: 150,
  normal: 100,
  hard: 70,
};

export default function SnakeGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>("UP");
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => GameStorage.getSnakeHighScore("normal"));

  // Direction queue to prevent reverse-direction suicides in same tick
  const nextDirectionRef = useRef<Direction>("UP");
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleDifficultySelect = (d: Difficulty) => {
    if (!hasStarted || isGameOver) {
      setDifficulty(d);
      setHighScore(GameStorage.getSnakeHighScore(d));
    }
  };

  // Generate food in empty cell
  const generateFood = useCallback((currentSnake: Point[]): Point => {
    while (true) {
      const rx = Math.floor(Math.random() * GRID_SIZE);
      const ry = Math.floor(Math.random() * GRID_SIZE);
      const onSnake = currentSnake.some((seg) => seg.x === rx && seg.y === ry);
      if (!onSnake) {
        return { x: rx, y: ry };
      }
    }
  }, []);

  // Reset Game
  const resetGame = useCallback(() => {
    const initSnake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    setSnake(initSnake);
    setDirection("UP");
    nextDirectionRef.current = "UP";
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood(initSnake));
  }, [generateFood]);

  const handleStart = () => {
    resetGame();
    setHasStarted(true);
  };

  // Direction handler
  const handleDirectionChange = useCallback(
    (newDir: Direction) => {
      const current = direction;
      if (newDir === "UP" && current !== "DOWN") nextDirectionRef.current = "UP";
      if (newDir === "DOWN" && current !== "UP") nextDirectionRef.current = "DOWN";
      if (newDir === "LEFT" && current !== "RIGHT") nextDirectionRef.current = "LEFT";
      if (newDir === "RIGHT" && current !== "LEFT") nextDirectionRef.current = "RIGHT";
    },
    [direction]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted || isGameOver) return;

      if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

      if (isPaused) return;

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        handleDirectionChange("UP");
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleDirectionChange("DOWN");
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        handleDirectionChange("LEFT");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        handleDirectionChange("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted, isGameOver, isPaused, handleDirectionChange]);

  // Main game loop
  useEffect(() => {
    if (!hasStarted || isPaused || isGameOver) {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
      return;
    }

    moveIntervalRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const dir = nextDirectionRef.current;
        setDirection(dir);

        const head = prevSnake[0];
        const newHead: Point = { ...head };

        if (dir === "UP") newHead.y -= 1;
        if (dir === "DOWN") newHead.y += 1;
        if (dir === "LEFT") newHead.x -= 1;
        if (dir === "RIGHT") newHead.x += 1;

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              GameStorage.setSnakeHighScore(difficulty, nextScore);
            }
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    }, SPEEDS[difficulty]);

    return () => {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    };
  }, [hasStarted, isPaused, isGameOver, difficulty, food, highScore, generateFood]);

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full bg-[#111118] border border-[#292536] rounded-2xl p-6 shadow-2xl">
      {/* Top Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#F5F3FF]">Snake Classic</h3>
          <p className="text-xs text-[#A1A1AA] font-mono">Use Arrow Keys or WASD</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#A1A1AA] block uppercase">Score</span>
            <span className="text-lg font-bold text-[#8B5CF6]">{score}</span>
          </div>
          <div className="bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg text-center flex items-center gap-2">
            <Trophy size={16} className="text-yellow-400" />
            <div>
              <span className="text-[10px] font-mono text-[#A1A1AA] block uppercase">High</span>
              <span className="text-lg font-bold text-yellow-400">{highScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 pb-4 border-b border-[#292536]">
        <span className="text-xs font-mono text-[#A1A1AA]">Difficulty:</span>
        <div className="flex gap-1.5">
          {(["easy", "normal", "hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => handleDifficultySelect(d)}
              disabled={hasStarted && !isGameOver}
              className={`px-3 py-1 rounded text-xs font-mono uppercase transition-colors ${
                difficulty === d
                  ? "bg-[#8B5CF6] text-white font-bold"
                  : "bg-[#171720] text-[#A1A1AA] hover:text-[#F5F3FF]"
              } disabled:opacity-50`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Playfield Canvas/Grid */}
      <div className="relative w-full aspect-square max-w-[400px] bg-[#09090D] border-2 border-[#292536] rounded-xl overflow-hidden shadow-inner">
        {/* Render grid cells */}
        <div
          className="w-full h-full grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);

            const isHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`transition-colors duration-75 ${
                  isHead
                    ? "bg-[#A78BFA] rounded-sm scale-95 shadow-sm"
                    : isBody
                    ? "bg-[#8B5CF6] rounded-sm scale-90"
                    : isFood
                    ? "bg-[#22C55E] rounded-full scale-75 animate-pulse shadow-sm"
                    : ""
                }`}
              />
            );
          })}
        </div>

        {/* Start / Game Over / Paused Overlays */}
        {!hasStarted && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
            <h4 className="text-xl font-bold text-[#F5F3FF] mb-2">Ready to Play?</h4>
            <p className="text-xs text-[#A1A1AA] max-w-xs mb-6">
              Collect green pellets to grow your snake. Avoid running into boundaries or yourself!
            </p>
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <Play size={16} />
              Start Game
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
            <h4 className="text-2xl font-bold text-red-500 mb-2">Game Over!</h4>
            <p className="text-sm text-[#F5F3FF] mb-1">Final Score: {score}</p>
            <p className="text-xs text-[#A1A1AA] mb-6">
              {score >= highScore && score > 0 ? "🎉 New High Score!" : "Good effort!"}
            </p>
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <RotateCcw size={16} />
              Play Again
            </button>
          </div>
        )}

        {isPaused && !isGameOver && hasStarted && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
            <h4 className="text-xl font-bold text-[#A78BFA] mb-4">Game Paused</h4>
            <button
              onClick={() => setIsPaused(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <Play size={16} />
              Resume
            </button>
          </div>
        )}
      </div>

      {/* Control Actions & Mobile D-pad */}
      <div className="w-full mt-6 space-y-4">
        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3">
          {hasStarted && !isGameOver && (
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono transition-colors"
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              {isPaused ? "Resume (P)" : "Pause (P)"}
            </button>
          )}
          {hasStarted && (
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono transition-colors"
            >
              <RotateCcw size={14} />
              Restart
            </button>
          )}
        </div>

        {/* Mobile On-Screen D-Pad Controls */}
        <div className="block sm:hidden pt-2">
          <p className="text-[11px] font-mono text-center text-[#A1A1AA] mb-2">
            Touch Controls
          </p>
          <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
            <div />
            <button
              onClick={() => handleDirectionChange("UP")}
              aria-label="Move Up"
              className="p-3 bg-[#171720] active:bg-[#8B5CF6] border border-[#292536] rounded-xl flex items-center justify-center text-[#F5F3FF]"
            >
              <ArrowUp size={20} />
            </button>
            <div />

            <button
              onClick={() => handleDirectionChange("LEFT")}
              aria-label="Move Left"
              className="p-3 bg-[#171720] active:bg-[#8B5CF6] border border-[#292536] rounded-xl flex items-center justify-center text-[#F5F3FF]"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => handleDirectionChange("DOWN")}
              aria-label="Move Down"
              className="p-3 bg-[#171720] active:bg-[#8B5CF6] border border-[#292536] rounded-xl flex items-center justify-center text-[#F5F3FF]"
            >
              <ArrowDown size={20} />
            </button>
            <button
              onClick={() => handleDirectionChange("RIGHT")}
              aria-label="Move Right"
              className="p-3 bg-[#171720] active:bg-[#8B5CF6] border border-[#292536] rounded-xl flex items-center justify-center text-[#F5F3FF]"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
