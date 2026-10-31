interface SkillCardProps {
  name: string;
  description?: string;
  icon?: string;
}

export default function SkillCard({ name, description, icon }: SkillCardProps) {
  return (
    <div className="group flex items-start gap-3 p-4 bg-[#171720] border border-[#292536] rounded-lg transition-all duration-200 hover:border-[#8B5CF6]/50 hover:bg-[#1A1A26]">
      {/* Icon badge */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="font-mono text-[#8B5CF6] text-xs font-bold leading-none">
          {icon ?? name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Text */}
      <div>
        <p className="text-sm font-semibold text-[#F5F3FF] group-hover:text-[#A78BFA] transition-colors">
          {name}
        </p>
        {description && (
          <p className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

