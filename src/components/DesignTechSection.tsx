import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { SERVICES, type Service } from './ServicesSection';
import ServiceModal from './ServiceModal';

const STICK_OFFSET = 84; // must match the header's exact bottom edge (lg:top-[84px]) so no gap exists for an outgoing image to peek through

interface DesignTechSectionProps {
  onOpenIntake?: (serviceTitle?: string) => void;
}

function ImagePane({
  service,
  onSelect,
  setRef,
  index,
  isLast,
}: {
  service: Service;
  onSelect: () => void;
  setRef: (el: HTMLButtonElement | null) => void;
  index: number;
  isLast: boolean;
}) {
  return (
    <div
      className={`relative aspect-video lg:aspect-auto lg:h-[920px] ${isLast ? '' : 'mb-6 lg:mb-0'} ${index === 0 ? '' : 'lg:-mt-[440px]'}`}
    >
      <button
        ref={setRef}
        type="button"
        onClick={onSelect}
        style={{ zIndex: index + 1 }}
        className="group relative block w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] lg:sticky lg:top-[84px] lg:h-[380px]"
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight size={18} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {service.tag}
          </span>
        </div>
      </button>
    </div>
  );
}

function ActivePanel({
  service,
  number,
  onViewMore,
}: {
  service: Service;
  number: string;
  onViewMore: () => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">
          {number}
        </span>
        <span className="h-2 w-2 shrink-0 rounded-full bg-vlz-red" />
      </div>
      <h3
        className="mb-4 text-2xl font-semibold text-vlz-white sm:text-3xl"
        style={{ fontFamily: 'var(--font-expanded)' }}
      >
        {service.title}
      </h3>
      <div className="mb-4 border-t border-white/10" />
      <p className="mb-6 text-sm leading-relaxed text-vlz-lightgray sm:text-base">
        {service.description}
      </p>
      <button
        type="button"
        onClick={onViewMore}
        className="inline-flex items-center gap-2 rounded-full bg-vlz-white px-5 py-2.5 text-xs font-semibold text-vlz-black"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
        VIEW MORE
        <span className="grid h-6 w-6 place-items-center rounded-full bg-vlz-black text-white">
          <ArrowUpRight size={12} />
        </span>
      </button>
    </div>
  );
}

export default function DesignTechSection({ onOpenIntake }: DesignTechSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let active = 0;
      for (let i = 0; i < imageRefs.current.length; i += 1) {
        const el = imageRefs.current[i];
        if (el && el.getBoundingClientRect().top <= STICK_OFFSET + 1) {
          active = i;
        }
      }
      setActiveIndex(active);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="bg-vlz-offwhite px-4 pb-10 pt-4 sm:px-6 lg:px-[72px]">
        <div
          ref={headerRef}
          className="mx-auto flex max-w-[1296px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex w-fit items-center gap-2 rounded-full bg-vlz-offgray/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-gray"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
            Creativity Meets Tech
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-expanded)' }}
          >
            Design &amp; Tech
            <br />
            <span className="text-vlz-red">Solutions</span>
          </motion.h2>
        </div>
      </section>

      <section className="bg-vlz-offwhite px-4 pb-6 sm:px-6 lg:px-[72px]">
        <div className="mx-auto max-w-[1296px] rounded-[40px] bg-vlz-black px-6 py-16 sm:px-10 sm:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              {SERVICES.map((service, index) => (
                <ImagePane
                  key={service.title}
                  service={service}
                  index={index}
                  isLast={index === SERVICES.length - 1}
                  onSelect={() => setSelected(service)}
                  setRef={(el) => {
                    imageRefs.current[index] = el;
                  }}
                />
              ))}
            </div>

            <div className="lg:sticky lg:top-[84px] lg:self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <ActivePanel
                    service={SERVICES[activeIndex]}
                    number={String(activeIndex + 1).padStart(2, '0')}
                    onViewMore={() => setSelected(SERVICES[activeIndex])}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ServiceModal
            service={selected}
            onClose={() => setSelected(null)}
            onOpenIntake={onOpenIntake}
          />
        )}
      </AnimatePresence>
    </>
  );
}
