const SEGMENTS = ['BUILD BRANDS', 'THAT LEAD'];

export default function BrandMarquee() {
  const loop = [...SEGMENTS, ...SEGMENTS, ...SEGMENTS, ...SEGMENTS];

  return (
    <div className="overflow-hidden bg-vlz-offwhite py-10">
      <div className="animate-marquee flex w-max items-center gap-8">
        {loop.map((segment, index) => (
          <span key={`${segment}-${index}`} className="flex items-center gap-8">
            <span
              className="text-5xl font-bold uppercase tracking-tight text-vlz-black sm:text-7xl"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              {segment}
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-vlz-black sm:h-20 sm:w-20">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-vlz-red text-lg font-bold text-white sm:h-12 sm:w-12">
                V
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
