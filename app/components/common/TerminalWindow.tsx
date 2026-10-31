"use client";

interface TerminalWindowProps {
  lines: string[];
  title?: string;
  className?: string;
  /** If true, renders the last line with a blinking cursor */
  showCursor?: boolean;
}

export default function TerminalWindow({
  lines,
  title = "terminal",
  className = "",
  showCursor = true,
}: TerminalWindowProps) {
  return (
    <div
      className={`bg-[#111118] border border-[#292536] rounded-xl overflow-hidden font-mono text-sm ${className}`}
      role="region"
      aria-label="Terminal window"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#171720] border-b border-[#292536]">
        <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
        <span className="ml-2 text-[#A1A1AA] text-xs">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-1" aria-live="polite">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <div key={i} className="leading-relaxed">
              {line.startsWith("$") ? (
                <span>
                  <span className="text-[#8B5CF6]">$</span>
                  <span className="text-[#F5F3FF]">{line.slice(1)}</span>
                </span>
              ) : line.startsWith("#") ? (
                <span className="text-[#A1A1AA]">{line.slice(1).trim()}</span>
              ) : line.startsWith(">>") ? (
                <span className="text-[#22C55E]">{line.slice(2).trim()}</span>
              ) : (
                <span className="text-[#C4B5FD]">{line}</span>
              )}
              {showCursor && isLast && <span className="terminal-cursor" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

