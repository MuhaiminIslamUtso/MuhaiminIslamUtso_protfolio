"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GameStorage } from "@/app/lib/storage";
import {
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "cactus_small" | "cactus_large" | "cactus_double" | "bird";
  birdFrame?: number;
  birdHeightLevel?: "low" | "mid" | "high";
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  width: number;
}

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // React state for HUD
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => GameStorage.getDinoHighScore());
  const [isMuted, setIsMuted] = useState(false);

  // Mutable game state held in refs for 60fps canvas loop
  const gameStateRef = useRef({
    score: 0,
    highScore: 0,
    speed: 6.5,
    distance: 0,
    groundY: 195,
    dino: {
      x: 60,
      y: 195 - 46,
      width: 44,
      height: 46,
      vy: 0,
      jumpForce: -12.5,
      gravity: 0.68,
      isGrounded: true,
      isDucking: false,
      legFrame: 0,
      animTick: 0,
    },
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
    nextObstacleDistance: 280,
    groundOffset: 0,
    flashUntil: 0,
    audioCtx: null as AudioContext | null,
  });

  // Sound effects generator via Web Audio API
  const playSound = useCallback((type: "jump" | "score" | "hit") => {
    if (isMuted) return;
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!gameStateRef.current.audioCtx) {
        gameStateRef.current.audioCtx = new AudioCtxClass();
      }

      const ctx = gameStateRef.current.audioCtx;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "jump") {
        osc.type = "square";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "score") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(1050, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "hit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, [isMuted]);

  // Sync high score ref on mount
  useEffect(() => {
    gameStateRef.current.highScore = GameStorage.getDinoHighScore();
  }, []);

  // Jump trigger
  const triggerJump = useCallback(() => {
    const state = gameStateRef.current;
    if (state.dino.isGrounded) {
      state.dino.vy = state.dino.jumpForce;
      state.dino.isGrounded = false;
      playSound("jump");
    }
  }, [playSound]);

  // Duck triggers
  const setDucking = useCallback((ducking: boolean) => {
    const state = gameStateRef.current;
    state.dino.isDucking = ducking;
    if (ducking && !state.dino.isGrounded) {
      // Fast fall when ducking in mid-air
      state.dino.vy += 2.5;
    }
  }, []);

  // Reset and start new run
  const handleStartGame = useCallback(() => {
    const state = gameStateRef.current;
    state.score = 0;
    state.speed = 6.5;
    state.distance = 0;
    state.obstacles = [];
    state.nextObstacleDistance = 320;
    state.groundOffset = 0;
    state.dino.y = state.groundY - 46;
    state.dino.vy = 0;
    state.dino.isGrounded = true;
    state.dino.isDucking = false;
    state.dino.legFrame = 0;

    // Seed background clouds
    state.clouds = [
      { x: 150, y: 40, speed: 1.2, width: 48 },
      { x: 420, y: 70, speed: 0.9, width: 60 },
      { x: 680, y: 35, speed: 1.5, width: 52 },
    ];

    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        if (!isPlaying || isGameOver) {
          handleStartGame();
        } else if (!isPaused) {
          triggerJump();
        }
      } else if (e.code === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        if (isPlaying && !isPaused && !isGameOver) {
          setDucking(true);
        }
      } else if (e.key === "p" || e.key === "P") {
        if (isPlaying && !isGameOver) {
          setIsPaused((prev) => !prev);
        }
      } else if (e.key === "Enter") {
        if (!isPlaying || isGameOver) {
          handleStartGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        setDucking(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, isPaused, isGameOver, triggerJump, setDucking, handleStartGame]);

  // Main 60fps Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const state = gameStateRef.current;
      const { dino, groundY } = state;

      // Update game physics if playing and not paused
      if (isPlaying && !isPaused && !isGameOver) {
        state.distance += state.speed;
        state.groundOffset = (state.groundOffset + state.speed) % 24;

        // Score logic: 1 point per 8 distance ticks
        const currentScore = Math.floor(state.distance / 8);
        if (currentScore !== state.score) {
          state.score = currentScore;
          setScore(currentScore);

          // Milestone ding every 100 points
          if (currentScore > 0 && currentScore % 100 === 0) {
            playSound("score");
            state.flashUntil = Date.now() + 1500;
          }

          // Gradually speed up
          state.speed = Math.min(13, 6.5 + currentScore * 0.0035);
        }

        // Dino gravity & jump
        dino.vy += dino.gravity;
        dino.y += dino.vy;

        // Current height & width based on ducking state
        const currentHeight = dino.isDucking && dino.isGrounded ? 26 : 46;
        const currentWidth = dino.isDucking && dino.isGrounded ? 56 : 44;

        if (dino.y + currentHeight >= groundY) {
          dino.y = groundY - currentHeight;
          dino.vy = 0;
          dino.isGrounded = true;
        }

        // Animate legs while running on ground
        dino.animTick++;
        if (dino.animTick % 6 === 0) {
          dino.legFrame = dino.legFrame === 0 ? 1 : 0;
        }

        // Update clouds
        state.clouds.forEach((cloud) => {
          cloud.x -= cloud.speed;
          if (cloud.x + cloud.width < 0) {
            cloud.x = canvas.width + Math.random() * 80;
            cloud.y = 25 + Math.random() * 55;
          }
        });

        // Spawn obstacles
        state.nextObstacleDistance -= state.speed;
        if (state.nextObstacleDistance <= 0) {
          // Choose obstacle type
          const allowBirds = state.score >= 120;
          const rand = Math.random();

          if (allowBirds && rand < 0.32) {
            // Pterodactyl Bird
            const birdLevels: ("low" | "mid" | "high")[] = ["low", "mid", "high"];
            const level = birdLevels[Math.floor(Math.random() * birdLevels.length)];
            let birdY = groundY - 45; // low (jump over)
            if (level === "mid") birdY = groundY - 60; // mid (must duck)
            if (level === "high") birdY = groundY - 85; // high (can run under)

            state.obstacles.push({
              x: canvas.width + 20,
              y: birdY,
              width: 42,
              height: 28,
              type: "bird",
              birdFrame: 0,
              birdHeightLevel: level,
            });
          } else if (rand < 0.6) {
            // Small single/double cactus
            const isDouble = Math.random() > 0.5;
            state.obstacles.push({
              x: canvas.width + 20,
              y: groundY - 34,
              width: isDouble ? 34 : 18,
              height: 34,
              type: isDouble ? "cactus_double" : "cactus_small",
            });
          } else {
            // Large cactus
            state.obstacles.push({
              x: canvas.width + 20,
              y: groundY - 46,
              width: 24,
              height: 46,
              type: "cactus_large",
            });
          }

          // Spacing to next obstacle (fair distance scaling with speed)
          const minGap = 260 + state.speed * 12;
          const extraGap = Math.random() * 220;
          state.nextObstacleDistance = minGap + extraGap;
        }

        // Update obstacles & check collision
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= state.speed;

          if (obs.type === "bird" && dino.animTick % 10 === 0) {
            obs.birdFrame = obs.birdFrame === 0 ? 1 : 0;
          }

          // AABB Collision check with modest padding for fair hitboxes
          const padding = 5;
          const dinoBox = {
            left: dino.x + padding,
            right: dino.x + currentWidth - padding,
            top: dino.y + padding,
            bottom: dino.y + currentHeight - 2,
          };

          const obsBox = {
            left: obs.x + padding,
            right: obs.x + obs.width - padding,
            top: obs.y + padding,
            bottom: obs.y + obs.height - 2,
          };

          const isColliding =
            dinoBox.right > obsBox.left &&
            dinoBox.left < obsBox.right &&
            dinoBox.bottom > obsBox.top &&
            dinoBox.top < obsBox.bottom;

          if (isColliding) {
            playSound("hit");
            setIsGameOver(true);
            if (state.score > state.highScore) {
              state.highScore = state.score;
              setHighScore(state.score);
              GameStorage.setDinoHighScore(state.score);
            }
            break;
          }

          // Remove obstacles offscreen
          if (obs.x + obs.width < -50) {
            state.obstacles.splice(i, 1);
          }
        }
      }

      // ── DRAW FRAME ─────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#0D0D14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle cyber grid stars
      ctx.fillStyle = "#292536";
      for (let s = 20; s < canvas.width; s += 80) {
        ctx.fillRect(s, 20 + ((s * 7) % 60), 2, 2);
      }

      // Draw clouds
      ctx.fillStyle = "#252233";
      state.clouds.forEach((c) => {
        ctx.beginPath();
        ctx.roundRect(c.x, c.y, c.width, 14, 6);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(c.x + 8, c.y - 8, c.width * 0.5, 12, 5);
        ctx.fill();
      });

      // Ground Line (Terminal purple neon with dashes)
      ctx.strokeStyle = "#8B5CF6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Scrolling ground texture ticks
      ctx.fillStyle = "#4C1D95";
      for (let gx = -state.groundOffset; gx < canvas.width; gx += 20) {
        ctx.fillRect(gx, groundY + 4, 8, 2);
        if (gx % 40 === 0) {
          ctx.fillRect(gx + 12, groundY + 8, 4, 1.5);
        }
      }

      // Draw Obstacles
      state.obstacles.forEach((obs) => {
        if (obs.type === "cactus_small" || obs.type === "cactus_large" || obs.type === "cactus_double") {
          // Cyber Cactus (Neon emerald green)
          ctx.fillStyle = "#22C55E";

          // Main stem
          ctx.fillRect(obs.x + (obs.width / 2) - 4, obs.y, 8, obs.height);

          // Left arm
          ctx.fillRect(obs.x, obs.y + obs.height * 0.35, 6, 4);
          ctx.fillRect(obs.x, obs.y + obs.height * 0.15, 4, obs.height * 0.25);

          // Right arm
          ctx.fillRect(obs.x + obs.width - 6, obs.y + obs.height * 0.45, 6, 4);
          ctx.fillRect(obs.x + obs.width - 4, obs.y + obs.height * 0.25, 4, obs.height * 0.25);

          if (obs.type === "cactus_double") {
            // Secondary stem
            ctx.fillStyle = "#16A34A";
            ctx.fillRect(obs.x + 16, obs.y + 6, 6, obs.height - 6);
          }
        } else if (obs.type === "bird") {
          // Cyber Pterodactyl (Electric purple/rose)
          ctx.fillStyle = "#C084FC";

          // Bird body
          ctx.fillRect(obs.x + 10, obs.y + 10, 20, 8);
          // Beak/Head
          ctx.fillRect(obs.x + 2, obs.y + 8, 10, 6);
          ctx.fillRect(obs.x, obs.y + 10, 4, 2);
          // Eye
          ctx.fillStyle = "#F5F3FF";
          ctx.fillRect(obs.x + 6, obs.y + 9, 2, 2);

          // Flapping wings
          ctx.fillStyle = "#A855F7";
          if (obs.birdFrame === 0) {
            // Wings UP
            ctx.fillRect(obs.x + 14, obs.y - 2, 8, 12);
            ctx.fillRect(obs.x + 18, obs.y - 8, 6, 8);
          } else {
            // Wings DOWN
            ctx.fillRect(obs.x + 14, obs.y + 14, 8, 12);
            ctx.fillRect(obs.x + 18, obs.y + 20, 6, 6);
          }
        }
      });

      // Draw Dino (Pixel Style)
      ctx.save();
      ctx.translate(dino.x, dino.y);

      ctx.fillStyle = "#A78BFA"; // Primary Dino color

      if (dino.isDucking && dino.isGrounded) {
        // ── DUCKING DINO ──────────────────────────────────────────────
        // Low horizontal body
        ctx.fillRect(0, 8, 42, 14);
        // Low head & snout
        ctx.fillRect(36, 4, 18, 12);
        ctx.fillRect(50, 8, 6, 8);
        // Eye
        ctx.fillStyle = isGameOver ? "#EF4444" : "#171720";
        if (isGameOver) {
          ctx.fillRect(44, 6, 4, 4);
        } else {
          ctx.fillRect(44, 6, 3, 3);
        }
        // Legs (ducking run)
        ctx.fillStyle = "#8B5CF6";
        if (dino.legFrame === 0) {
          ctx.fillRect(8, 22, 6, 4);
          ctx.fillRect(26, 22, 4, 3);
        } else {
          ctx.fillRect(10, 22, 4, 3);
          ctx.fillRect(24, 22, 6, 4);
        }
      } else {
        // ── STANDING / JUMPING DINO ───────────────────────────────────
        // Head & snout
        ctx.fillRect(22, 0, 20, 16);
        ctx.fillRect(38, 4, 6, 12);
        // Eye (X on game over)
        ctx.fillStyle = isGameOver ? "#EF4444" : "#171720";
        if (isGameOver) {
          ctx.fillRect(28, 4, 4, 4);
        } else {
          ctx.fillRect(28, 4, 3, 3);
        }

        // Body
        ctx.fillStyle = "#A78BFA";
        ctx.fillRect(12, 16, 22, 18);
        // Tail
        ctx.fillRect(0, 20, 12, 10);
        ctx.fillRect(2, 16, 6, 6);
        // Tiny Arm
        ctx.fillRect(32, 22, 6, 4);

        // Legs
        ctx.fillStyle = "#8B5CF6";
        if (!dino.isGrounded) {
          // Mid-air tuck
          ctx.fillRect(16, 34, 4, 8);
          ctx.fillRect(26, 34, 4, 8);
        } else if (dino.legFrame === 0) {
          // Leg A down, Leg B back
          ctx.fillRect(16, 34, 5, 12);
          ctx.fillRect(16, 44, 8, 2);
          ctx.fillRect(26, 34, 4, 6);
        } else {
          // Leg A back, Leg B down
          ctx.fillRect(16, 34, 4, 6);
          ctx.fillRect(26, 34, 5, 12);
          ctx.fillRect(26, 44, 8, 2);
        }
      }

      ctx.restore();

      // HUD Score display inside canvas top right (Chrome Dino style)
      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";

      const padScore = (n: number) => n.toString().padStart(5, "0");
      const isFlashing = Date.now() < state.flashUntil && Math.floor(Date.now() / 150) % 2 === 0;

      // High Score label
      ctx.fillStyle = "#71717A";
      ctx.fillText(`HI ${padScore(state.highScore)}`, canvas.width - 95, 24);

      // Current Score
      ctx.fillStyle = isFlashing ? "#22C55E" : "#F5F3FF";
      ctx.fillText(padScore(state.score), canvas.width - 20, 24);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isPaused, isGameOver, playSound]);

  return (
    <div className="bg-[#171720] border border-[#292536] rounded-2xl p-4 sm:p-8 flex flex-col items-center">
      {/* Game Header Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-xl">
            🦖
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#F5F3FF]">Chrome Dino Runner</h3>
            <p className="text-xs text-[#A1A1AA]">
              Jump, duck, and dodge cyber obstacles at accelerating speeds.
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#292536] text-[#A78BFA]">
            <Trophy size={14} className="text-yellow-400" />
            <span>HI: {highScore.toString().padStart(5, "0")}</span>
          </div>

          <button
            onClick={() => setIsMuted((m) => !m)}
            className="p-2 rounded-lg bg-[#111118] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="relative w-full max-w-[800px] aspect-[80/26] bg-[#0D0D14] border-2 border-[#292536] rounded-xl overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={800}
          height={260}
          className="w-full h-full block cursor-pointer select-none"
          onClick={() => {
            if (!isPlaying || isGameOver) {
              handleStartGame();
            } else if (!isPaused) {
              triggerJump();
            }
          }}
        />

        {/* Ready Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
            <span className="text-4xl mb-3 animate-bounce">🦖</span>
            <h4 className="text-xl font-bold text-[#F5F3FF] mb-2">Chrome Dino T-Rex Runner</h4>
            <p className="text-xs text-[#A1A1AA] max-w-sm mb-6 leading-relaxed">
              Press <span className="font-mono text-[#8B5CF6]">SPACE</span> or click to jump.
              Use <span className="font-mono text-[#8B5CF6]">DOWN ARROW</span> to duck under high drones.
            </p>
            <button
              onClick={handleStartGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <Play size={16} />
              Start Running
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
            <h4 className="text-2xl font-bold text-red-400 mb-1">G A M E   O V E R</h4>
            <p className="font-mono text-sm text-[#F5F3FF] mb-1">
              Score: {score.toString().padStart(5, "0")}
            </p>
            <p className="text-xs text-[#A1A1AA] mb-5">
              {score >= highScore && score > 0 ? "🎉 New High Score Recorded!" : "Press Space or Play Again to retry"}
            </p>
            <button
              onClick={handleStartGame}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <RotateCcw size={15} />
              Play Again
            </button>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && !isGameOver && isPlaying && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
            <h4 className="text-xl font-bold text-[#A78BFA] mb-4">Run Paused</h4>
            <button
              onClick={() => setIsPaused(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <Play size={15} />
              Resume Run
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Controls & In-Game Controls */}
      <div className="w-full max-w-[800px] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* On-screen touch buttons for mobile */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={triggerJump}
            disabled={!isPlaying || isGameOver || isPaused}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] active:bg-[#8B5CF6] active:text-white rounded-xl font-mono text-sm font-bold transition-all disabled:opacity-40"
            aria-label="Jump"
          >
            <ArrowUp size={16} />
            JUMP [▲]
          </button>

          <button
            type="button"
            onMouseDown={() => setDucking(true)}
            onMouseUp={() => setDucking(false)}
            onTouchStart={() => setDucking(true)}
            onTouchEnd={() => setDucking(false)}
            disabled={!isPlaying || isGameOver || isPaused}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#171720] border border-[#292536] text-[#A1A1AA] active:bg-[#8B5CF6]/20 active:text-[#C4B5FD] rounded-xl font-mono text-sm font-bold transition-all disabled:opacity-40"
            aria-label="Duck / Crouch"
          >
            <ArrowDown size={16} />
            DUCK [▼]
          </button>
        </div>

        {/* Status / Pause Button */}
        <div className="flex items-center gap-2">
          {isPlaying && !isGameOver && (
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111118] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono"
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleStartGame}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111118] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono"
          >
            <RotateCcw size={14} />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Keyboard Controls Legend */}
      <div className="w-full max-w-[800px] mt-6 pt-5 border-t border-[#292536] flex flex-wrap items-center justify-between gap-3 text-xs text-[#A1A1AA] font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#111118] border border-[#292536] text-[#F5F3FF]">SPACE</kbd> /{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-[#111118] border border-[#292536] text-[#F5F3FF]">↑</kbd> Jump
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#111118] border border-[#292536] text-[#F5F3FF]">↓</kbd> Duck
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#111118] border border-[#292536] text-[#F5F3FF]">P</kbd> Pause
          </span>
        </div>
        <span className="text-[#8B5CF6]">T-Rex Offline Edition</span>
      </div>
    </div>
  );
}

