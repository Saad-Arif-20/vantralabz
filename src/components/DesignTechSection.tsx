import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { SERVICES, type Service } from './ServicesSection';
import ServiceModal from './ServiceModal';

interface DesignTechSectionProps {
  onOpenIntake?: (serviceTitle?: string) => void;
}

function ServiceSlide({
  service,
  number,
  onViewMore,
}: {
  service: Service;
  number: string;
  onViewMore: () => void;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <button
        type="button"
        onClick={onViewMore}
        className="group relative aspect-video w-full overflow-hidden rounded-2xl"
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
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {service.tag}
          </span>
        </div>
      </button>

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
    </div>
  );
}

export default function DesignTechSection({ onOpenIntake }: DesignTechSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computeActiveIndex = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = total > 0 ? Math.min(Math.max(scrolled / total, 0), 0.999) : 0;
      const idx = Math.floor(progress * SERVICES.length);
      setActiveIndex((prev) => {
        const next = Math.min(SERVICES.length - 1, Math.max(0, idx));
        return next === prev ? prev : next;
      });
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActiveIndex();
        ticking = false;
      });
    };

    computeActiveIndex();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <section id="services" className="bg-vlz-offwhite px-4 pb-10 pt-4 sm:px-6 lg:px-[72px]">
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
        <div
          ref={scrollerRef}
          className="mx-auto max-w-[1296px] lg:h-[400vh]"
        >
          <div className="rounded-[40px] bg-vlz-black px-6 py-16 sm:px-10 sm:py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden lg:py-0">
            <div className="lg:hidden">
              {/* Mobile: plain stacked list, no scroll-driven crossfade */}
              <div className="flex flex-col gap-16">
                {SERVICES.map((service, index) => (
                  <ServiceSlide
                    key={service.title}
                    service={service}
                    number={String(index + 1).padStart(2, '0')}
                    onViewMore={() => setSelected(service)}
                  />
                ))}
              </div>
            </div>

            <div className="hidden w-full lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <ServiceSlide
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
