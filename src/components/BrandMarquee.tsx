import logoMark from '../assets/brand/logo-mark.webp';

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
            <img src={logoMark} alt="" className="h-10 w-auto shrink-0 sm:h-14" />
          </span>
        ))}
      </div>
    </div>
  );
}
