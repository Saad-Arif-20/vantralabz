interface SectionDividerProps {
  label: string;
  className?: string;
}

export default function SectionDivider({ label, className = '' }: SectionDividerProps) {
  return (
    <div
      className={`mx-auto flex max-w-6xl items-center justify-between border-t border-black/10 px-4 py-4 text-xs font-semibold uppercase tracking-widest text-vlz-gray sm:px-6 ${className}`}
    >
      <span>
        EST <span className="text-vlz-lightgray">2019</span>
      </span>
      <span>{label}</span>
    </div>
  );
}
