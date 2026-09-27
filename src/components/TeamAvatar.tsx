function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TeamAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={
        className ??
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-vlz-dark to-vlz-black'
      }
    >
      <span
        className="text-4xl font-bold text-white/25"
        style={{ fontFamily: 'var(--font-expanded)' }}
      >
        {getInitials(name)}
      </span>
    </div>
  );
}
