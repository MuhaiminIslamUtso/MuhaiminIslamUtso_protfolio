"use client";

import { useEffect, useRef, useState } from "react";
import { GameStorage } from "@/app/lib/storage";
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight, Heart, Trophy } from "lucide-react";

export default function AdventureGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Virtual inputs for touch controls
  const virtualControlsRef = useRef({
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    let isMounted = true;

    // Load Phaser dynamically on client-side only
    const initPhaser = async () => {
      if (typeof window === "undefined" || !containerRef.current) return;

      const Phaser = (await import("phaser")).default;

      // Ensure no existing game is running
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }

      const WIDTH = 640;
      const HEIGHT = 360;

      class MainScene extends Phaser.Scene {
        private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        private platforms!: Phaser.Physics.Arcade.StaticGroup;
        private collectibles!: Phaser.Physics.Arcade.Group;
        private obstacles!: Phaser.Physics.Arcade.StaticGroup;
        private goal!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        private currentLvl: number = 1;

        constructor() {
          super("MainScene");
        }

        init(data: { level?: number }) {
          this.currentLvl = data.level || 1;
        }

        preload() {
          // Generate procedural textures so no external copyrighted assets needed
          const g = this.add.graphics();

          // Player (Hero: purple robot / developer)
          g.fillStyle(0xa78bfa, 1);
          g.fillRoundedRect(0, 0, 24, 30, 4);
          g.fillStyle(0x8b5cf6, 1);
          g.fillCircle(12, 10, 6); // Head/visor
          g.fillStyle(0x22c55e, 1);
          g.fillRect(8, 8, 8, 3); // Glow visor
          g.generateTexture("player", 24, 30);
          g.clear();

          // Ground / Platform
          g.fillStyle(0x292536, 1);
          g.fillRect(0, 0, 32, 16);
          g.fillStyle(0x8b5cf6, 1);
          g.fillRect(0, 0, 32, 3); // Neon top border
          g.generateTexture("platform", 32, 16);
          g.clear();

          // Collectible (Code crystal)
          g.fillStyle(0x22c55e, 1);
          g.fillCircle(8, 8, 6);
          g.fillStyle(0xffffff, 1);
          g.fillCircle(6, 6, 2);
          g.generateTexture("crystal", 16, 16);
          g.clear();

          // Obstacle (Spike hazard)
          g.fillStyle(0xef4444, 1);
          g.fillTriangle(0, 16, 8, 0, 16, 16);
          g.generateTexture("spike", 16, 16);
          g.clear();

          // Goal (Terminal portal)
          g.fillStyle(0x8b5cf6, 0.4);
          g.fillCircle(16, 20, 16);
          g.fillStyle(0xa78bfa, 1);
          g.fillRoundedRect(6, 4, 20, 32, 4);
          g.fillStyle(0x22c55e, 1);
          g.fillRect(10, 10, 12, 10);
          g.generateTexture("portal", 32, 40);
          g.destroy();
        }

        create() {
          // Level titles & colors
          const levelBgs: Record<number, number> = {
            1: 0x0e0e14, // Beginner Village
            2: 0x091410, // Skill Forest
            3: 0x120c1f, // Project City
          };

          this.cameras.main.setBackgroundColor(levelBgs[this.currentLvl] || 0x09090d);

          // World boundaries
          this.physics.world.setBounds(0, 0, 1200, HEIGHT);
          this.cameras.main.setBounds(0, 0, 1200, HEIGHT);

          // Static platforms
          this.platforms = this.physics.add.staticGroup();

          // Ground floor
          for (let x = 0; x < 1200; x += 32) {
            // Gap in level 2 & 3
            if (this.currentLvl === 2 && x > 400 && x < 500) continue;
            if (this.currentLvl === 3 && ((x > 320 && x < 420) || (x > 700 && x < 800))) continue;

            this.platforms.create(x + 16, HEIGHT - 8, "platform");
          }

          // Build Level Platforms
          if (this.currentLvl === 1) {
            // Beginner Village: Simple stepping stones
            [
              [200, 270],
              [350, 220],
              [500, 260],
              [680, 200],
              [850, 240],
              [980, 190],
            ].forEach(([px, py]) => {
              this.platforms.create(px, py, "platform").setScale(2, 1).refreshBody();
            });
          } else if (this.currentLvl === 2) {
            // Skill Forest: Taller jumps, moving challenge
            [
              [160, 270],
              [280, 210],
              [440, 170],
              [460, 280],
              [620, 230],
              [780, 180],
              [920, 220],
              [1050, 160],
            ].forEach(([px, py]) => {
              this.platforms.create(px, py, "platform").setScale(2, 1).refreshBody();
            });
          } else {
            // Project City: Advanced multi-tiered platforms
            [
              [180, 280],
              [300, 220],
              [370, 160],
              [520, 210],
              [650, 270],
              [750, 200],
              [880, 160],
              [1020, 210],
            ].forEach(([px, py]) => {
              this.platforms.create(px, py, "platform").setScale(1.8, 1).refreshBody();
            });
          }

          // Obstacles (Spikes)
          this.obstacles = this.physics.add.staticGroup();
          if (this.currentLvl >= 2) {
            this.obstacles.create(300, HEIGHT - 16, "spike");
            this.obstacles.create(600, HEIGHT - 16, "spike");
          }
          if (this.currentLvl === 3) {
            this.obstacles.create(550, HEIGHT - 16, "spike");
            this.obstacles.create(850, HEIGHT - 16, "spike");
          }

          // Collectibles
          this.collectibles = this.physics.add.group();
          const itemXs = [150, 250, 350, 480, 600, 720, 850, 950, 1050];
          itemXs.forEach((ix) => {
            const item = this.collectibles.create(ix, 100, "crystal");
            item.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
            item.setCollideWorldBounds(true);
          });

          // Player
          this.player = this.physics.add.sprite(50, HEIGHT - 60, "player");
          this.player.setCollideWorldBounds(true);
          this.player.setBounce(0.05);

          // Goal Portal
          this.goal = this.physics.add.sprite(1140, HEIGHT - 60, "portal");
          this.goal.body.setAllowGravity(false);

          // Colliders
          this.physics.add.collider(this.player, this.platforms);
          this.physics.add.collider(this.collectibles, this.platforms);
          this.physics.add.collider(this.goal, this.platforms);

          // Collect item overlap
          this.physics.add.overlap(
            this.player,
            this.collectibles,
            (_p, c) => {
              const item = c as Phaser.Physics.Arcade.Sprite;
              item.disableBody(true, true);
              if (isMounted) {
                setScore((s) => s + 25);
              }
            },
            undefined,
            this
          );

          // Hazard overlap
          this.physics.add.overlap(
            this.player,
            this.obstacles,
            () => {
              this.handlePlayerDeath();
            },
            undefined,
            this
          );

          // Portal overlap (Level complete)
          this.physics.add.overlap(
            this.player,
            this.goal,
            () => {
              this.handleLevelComplete();
            },
            undefined,
            this
          );

          // Camera follow
          this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

          // Keyboard input
          this.cursors = this.input.keyboard!.createCursorKeys();
        }

        update() {
          if (!this.player || !this.player.body) return;

          // Check falling into void
          if (this.player.y > HEIGHT - 15) {
            this.handlePlayerDeath();
            return;
          }

          const onGround = this.player.body.touching.down;

          // Horizontal movement (desktop cursors OR virtual controls)
          const moveLeft = this.cursors.left.isDown || virtualControlsRef.current.left;
          const moveRight = this.cursors.right.isDown || virtualControlsRef.current.right;
          const doJump =
            this.cursors.up.isDown ||
            this.cursors.space.isDown ||
            virtualControlsRef.current.jump;

          if (moveLeft) {
            this.player.setVelocityX(-160);
          } else if (moveRight) {
            this.player.setVelocityX(160);
          } else {
            this.player.setVelocityX(0);
          }

          // Jump only if on ground
          if (doJump && onGround) {
            this.player.setVelocityY(-330);
          }
        }

        handlePlayerDeath() {
          if (!isMounted) return;

          setLives((l) => {
            const nextLives = l - 1;
            if (nextLives <= 0) {
              setIsGameOver(true);
              this.scene.pause();
            } else {
              // Respawn at level start
              this.player.setPosition(50, HEIGHT - 60);
              this.player.setVelocity(0, 0);
            }
            return nextLives;
          });
        }

        handleLevelComplete() {
          if (!isMounted) return;

          if (this.currentLvl < 3) {
            const nextLvl = this.currentLvl + 1;
            setLevel(nextLvl);
            GameStorage.setPlatformerProgress(nextLvl);
            this.scene.restart({ level: nextLvl });
          } else {
            setIsVictory(true);
            this.scene.pause();
          }
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#09090D",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 650, x: 0 },
            debug: false,
          },
        },
        scene: MainScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      gameRef.current = new Phaser.Game(config);
    };

    initPhaser();

    return () => {
      isMounted = false;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setIsGameOver(false);
    setIsVictory(false);
    setIsPaused(false);

    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene("MainScene");
      if (scene) {
        scene.scene.restart({ level: 1 });
        scene.scene.resume();
      }
    }
  };

  const togglePause = () => {
    if (!gameRef.current) return;
    const scene = gameRef.current.scene.getScene("MainScene");
    if (!scene) return;

    if (isPaused) {
      scene.scene.resume();
      setIsPaused(false);
    } else {
      scene.scene.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto w-full bg-[#111118] border border-[#292536] rounded-2xl p-6 shadow-2xl">
      {/* Header info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#F5F3FF]">Platform Adventure</h3>
          <p className="text-xs text-[#A1A1AA] font-mono">
            Level {level}:{" "}
            {level === 1
              ? "Beginner Village"
              : level === 2
              ? "Skill Forest"
              : "Project City"}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg">
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span className="text-sm font-bold text-[#F5F3FF] font-mono">{lives}</span>
          </div>
          <div className="bg-[#171720] border border-[#292536] px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Trophy size={16} className="text-[#8B5CF6]" />
            <span className="text-sm font-bold text-[#8B5CF6] font-mono">{score}</span>
          </div>
        </div>
      </div>

      {/* Phaser Canvas Container */}
      <div className="relative w-full aspect-[16/9] max-w-[640px] bg-[#09090D] border-2 border-[#292536] rounded-xl overflow-hidden shadow-inner">
        <div ref={containerRef} className="w-full h-full phaser-container" />

        {/* Overlays */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
            <h4 className="text-2xl font-bold text-red-500 mb-2">Game Over!</h4>
            <p className="text-sm text-[#F5F3FF] mb-1">Score: {score}</p>
            <p className="text-xs text-[#A1A1AA] mb-6">
              You lost all your lives. Try again to reach Project City!
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        )}

        {isVictory && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
            <h4 className="text-3xl font-bold text-[#22C55E] mb-2">Victory! 🏆</h4>
            <p className="text-base text-[#F5F3FF] mb-1">
              You completed all 3 levels with {score} points!
            </p>
            <p className="text-xs text-[#A1A1AA] mb-6">
              Welcome to Project City — portfolio unlocked!
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <RotateCcw size={16} />
              Play Again
            </button>
          </div>
        )}

        {isPaused && !isGameOver && !isVictory && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
            <h4 className="text-xl font-bold text-[#A78BFA] mb-4">Game Paused</h4>
            <button
              onClick={togglePause}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium text-sm"
            >
              <Play size={16} />
              Resume
            </button>
          </div>
        )}
      </div>

      {/* Control Buttons & Mobile Touch Buttons */}
      <div className="w-full mt-4 space-y-4">
        {/* Pause & Restart Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={togglePause}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono transition-colors"
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171720] border border-[#292536] text-[#A1A1AA] hover:text-[#F5F3FF] rounded-lg text-xs font-mono transition-colors"
          >
            <RotateCcw size={12} />
            Restart
          </button>
        </div>

        {/* Desktop Help Instructions */}
        <p className="hidden sm:block text-center text-xs font-mono text-[#A1A1AA]">
          Controls: <span className="text-[#8B5CF6]">Left / Right Arrows</span> to move,{" "}
          <span className="text-[#8B5CF6]">Space or Up</span> to jump.
        </p>

        {/* Mobile On-Screen Touch Controls */}
        <div className="block sm:hidden pt-2">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {/* Left / Right */}
            <div className="flex gap-2">
              <button
                onTouchStart={() => (virtualControlsRef.current.left = true)}
                onTouchEnd={() => (virtualControlsRef.current.left = false)}
                onMouseDown={() => (virtualControlsRef.current.left = true)}
                onMouseUp={() => (virtualControlsRef.current.left = false)}
                aria-label="Move Left"
                className="w-12 h-12 bg-[#171720] active:bg-[#8B5CF6] border border-[#292536] rounded-xl flex items-center justify-center text-[#F5F3FF]"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onTouchStart={() => (virtualControlsRef.current.right = true)}
                onTouchEnd={() => (virtualControlsRef.current.right = false)}
                onMouseDown={() => (virtualControlsRef.current.right = true)}
                onMouseUp={() => (virtualControlsRef.current.right = false)}
                aria-label="Move Right"
                className="w-12 h-12 bg-[#171720] active:bg-[#8B5CF6] border border-[#292536] rounded-xl flex items-center justify-center text-[#F5F3FF]"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Jump */}
            <button
              onTouchStart={() => (virtualControlsRef.current.jump = true)}
              onTouchEnd={() => (virtualControlsRef.current.jump = false)}
              onMouseDown={() => (virtualControlsRef.current.jump = true)}
              onMouseUp={() => (virtualControlsRef.current.jump = false)}
              aria-label="Jump"
              className="w-16 h-12 bg-[#8B5CF6]/20 active:bg-[#8B5CF6] border border-[#8B5CF6]/50 rounded-xl flex items-center justify-center text-[#A78BFA] font-bold text-xs font-mono"
            >
              JUMP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
