// ─────────────────────────────────────────────────
// Storage utilities – safe LocalStorage wrappers
// ─────────────────────────────────────────────────

const STORAGE_VERSION = "v1";

function key(name: string): string {
  return `utso-portfolio-${STORAGE_VERSION}-${name}`;
}

/**
 * Safely read a JSON value from LocalStorage.
 * Returns the fallback if the key is missing, the data is
 * corrupt, or LocalStorage is unavailable.
 */
export function storageGet<T>(name: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key(name));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Safely write a JSON value to LocalStorage.
 * Silently ignores errors (e.g. private browsing, full storage).
 */
export function storageSet<T>(name: string, value: T): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key(name), JSON.stringify(value));
  } catch {
    // Ignore storage errors silently
  }
}

/**
 * Safely remove a single key from LocalStorage.
 */
export function storageRemove(name: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key(name));
  } catch {
    // Ignore
  }
}

// ─────────────────────────────────────────────────
// Typed accessors for game data
// ─────────────────────────────────────────────────

export const GameStorage = {
  // Dino Runner
  getDinoHighScore: (): number =>
    storageGet<number>("dino-highscore", 0),
  setDinoHighScore: (score: number): void =>
    storageSet("dino-highscore", score),

  // Snake
  getSnakeHighScore: (difficulty: string): number =>
    storageGet<number>(`snake-highscore-${difficulty}`, 0),
  setSnakeHighScore: (difficulty: string, score: number): void =>
    storageSet(`snake-highscore-${difficulty}`, score),

  // Memory
  getMemoryBestMoves: (difficulty: string): number =>
    storageGet<number>(`memory-best-moves-${difficulty}`, Infinity),
  setMemoryBestMoves: (difficulty: string, moves: number): void =>
    storageSet(`memory-best-moves-${difficulty}`, moves),
  getMemoryBestTime: (difficulty: string): number =>
    storageGet<number>(`memory-best-time-${difficulty}`, Infinity),
  setMemoryBestTime: (difficulty: string, time: number): void =>
    storageSet(`memory-best-time-${difficulty}`, time),

  // Platformer
  getPlatformerProgress: (): number =>
    storageGet<number>("platformer-level", 1),
  setPlatformerProgress: (level: number): void =>
    storageSet("platformer-level", level),

  // Preferences
  getLastGame: (): string => storageGet<string>("last-game", ""),
  setLastGame: (game: string): void => storageSet("last-game", game),
};

