import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { Globe, type GlobeMarker } from './ui/globe';
import FlagIcon from './FlagIcon';

const DESTINATIONS = [
  { flag: 'US' as const, label: 'United States' },
  { flag: 'CA' as const, label: 'Canada' },
  { flag: 'GB' as const, label: 'United Kingdom' },
  { flag: 'EU' as const, label: 'Europe' },
  { flag: 'AU' as const, label: 'Australia' },
];

const GLOBE_MARKERS: GlobeMarker[] = [
  { id: 'US', location: [40.7128, -74.006], size: 0.018 },
  { id: 'CA', location: [43.6532, -79.3832], size: 0.018 },
  { id: 'GB', location: [51.5074, -0.1278], size: 0.018 },
  { id: 'EU', location: [52.52, 13.405], size: 0.018 },
  { id: 'AU', location: [-33.8688, 151.2093], size: 0.018 },
];

function DestinationChip({
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
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      className="flex items-center gap-2 rounded-full border border-black/10 bg-vlz-white px-4 py-2 text-xs font-semibold text-vlz-black shadow-sm sm:text-sm"
    >
      <FlagIcon code={destination.flag} />
      {destination.label}
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

        <p className="relative mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-vlz-gray sm:text-base">
          Remote-first by design, we work with clients anywhere — and we&rsquo;re actively
          expanding into the US, Canada, the UK, Australia, and Europe.
        </p>

        <div className="relative mx-auto w-full max-w-[1100px] aspect-[2/1] overflow-hidden">
          <div className="absolute inset-x-0 top-0 aspect-square w-full">
            <Globe
              markers={GLOBE_MARKERS}
              renderMarkerOverlay={(marker) => (
                <FlagIcon
                  code={marker.id as 'CA' | 'GB' | 'EU' | 'AU' | 'US'}
                  className="h-5 w-7 border border-black/10"
                />
              )}
            />
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          {DESTINATIONS.map((destination, index) => (
            <DestinationChip
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
