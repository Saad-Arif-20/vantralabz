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
        'grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-vlz-red to-[rgb(255,140,80)] text-2xl font-bold text-white shadow-lg sm:h-24 sm:w-24 sm:text-3xl'
      }
      style={{ fontFamily: 'var(--font-expanded)' }}
    >
      {getInitials(name)}
    </div>
  );
}
