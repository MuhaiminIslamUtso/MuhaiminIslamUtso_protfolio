interface SectionHeadingProps {
  label?: string;     // small monospace label above
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
          <span aria-hidden="true">{"// "}</span>
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3FF] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

