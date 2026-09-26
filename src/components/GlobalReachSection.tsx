import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe2 } from 'lucide-react';

const DESTINATIONS = [
  { flag: '🇨🇦', label: 'Canada', top: '28%', left: '16%' },
  { flag: '🇬🇧', label: 'United Kingdom', top: '20%', left: '46%' },
  { flag: '🇪🇺', label: 'Europe', top: '42%', left: '54%' },
  { flag: '🇦🇺', label: 'Australia', top: '68%', left: '80%' },
];

function DestinationPin({
  destination,
  index,
  isInView,
}: {
  destination: (typeof DESTINATIONS)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="absolute flex flex-col items-start"
      style={{ top: destination.top, left: destination.left }}
    >
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-vlz-white px-3 py-1.5 text-xs font-semibold text-vlz-black shadow-sm sm:text-sm">
        <span className="text-base">{destination.flag}</span>
        {destination.label}
      </div>
      <span className="ml-4 mt-1.5 h-2 w-2 rounded-full bg-vlz-red" />
    </motion.div>
  );
}

export default function GlobalReachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-vlz-offwhite px-4 pb-6 sm:px-6 lg:px-[72px]">
      <div
        ref={ref}
        className="relative mx-auto max-w-[1296px] overflow-hidden rounded-[40px] bg-vlz-offgray/60 px-6 py-16 sm:px-10 sm:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 85%)',
          }}
          aria-hidden
        />

        <div className="relative mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
            <Globe2 size={14} className="text-vlz-red" />
            Worldwide Presence
          </div>
        </div>

        <h2
          className="relative mb-4 text-center text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          Expanding Our <span className="text-vlz-red">Reach</span>
        </h2>

        <p className="relative mx-auto mb-16 max-w-lg text-center text-sm leading-relaxed text-vlz-gray sm:text-base">
          Remote-first by design, we work with clients anywhere — and we&rsquo;re actively
          expanding into Canada, the UK, Australia, and Europe.
        </p>

        <div className="relative mx-auto h-[280px] max-w-[640px] sm:h-[320px]">
          {DESTINATIONS.map((destination, index) => (
            <DestinationPin
              key={destination.label}
              destination={destination}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
