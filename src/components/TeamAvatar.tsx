function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TeamAvatar({
  name,
  image,
  facePosition,
  className,
}: {
  name: string;
  image?: string;
  facePosition?: string;
  className?: string;
}) {
  const baseClassName =
    className ?? 'h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-lg sm:h-24 sm:w-24';

  if (image) {
    return (
      <div className={`${baseClassName} relative`}>
        <img
          src={image}
          alt={name}
          style={{ objectPosition: facePosition ?? '50% 20%' }}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`${baseClassName} grid place-items-center bg-gradient-to-br from-vlz-red to-[rgb(255,140,80)] text-2xl font-bold text-white sm:text-3xl`}
      style={{ fontFamily: 'var(--font-expanded)' }}
    >
      {getInitials(name)}
    </div>
  );
}
