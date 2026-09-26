import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { SERVICES, type Service } from './ServicesSection';
import ServiceModal from './ServiceModal';

interface DesignTechSectionProps {
  onOpenIntake?: (serviceTitle?: string) => void;
}

function ServiceRow({
  service,
  number,
  onViewMore,
}: {
  service: Service;
  number: string;
  onViewMore: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="grid grid-cols-1 gap-8 border-t border-white/10 pt-10 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <button
        type="button"
        onClick={onViewMore}
        className="group relative aspect-video overflow-hidden rounded-2xl"
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight size={18} />
        </span>
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
    </motion.div>
  );
}

export default function DesignTechSection({ onOpenIntake }: DesignTechSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Service | null>(null);

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
        <div className="mx-auto max-w-[1296px] overflow-hidden rounded-[40px] bg-vlz-black px-6 py-16 sm:px-10 sm:py-20">
          <div className="flex flex-col gap-10 lg:gap-16">
            {SERVICES.map((service, index) => (
              <ServiceRow
                key={service.title}
                service={service}
                number={String(index + 1).padStart(2, '0')}
                onViewMore={() => setSelected(service)}
              />
            ))}
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
