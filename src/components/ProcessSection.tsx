import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ChevronUp, Share2 } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    week: 'Week 1',
    title: 'Research',
    tag: 'Brainstorming',
    offset: 'lg:ml-0',
    description:
      'We dive into market trends, user behaviors, and industry insights to uncover opportunities that shape smarter strategies.',
  },
  {
    number: '02',
    week: 'Week 2',
    title: 'Prototype',
    tag: 'Test Before Build',
    offset: 'lg:ml-[calc(50%_-_12rem)]',
    description:
      'We build interactive prototypes to test ideas early, refine usability, and ensure the final product delivers real impact.',
  },
  {
    number: '03',
    week: 'Week 3',
    title: 'Presentation',
    tag: 'Ideas Made Clear',
    offset: 'lg:ml-[calc(100%_-_24rem)]',
    description:
      'We present clear design solutions, walking you through the vision, strategy, and flow before moving to final execution.',
  },
];

type Step = (typeof STEPS)[number];

function ProcessStepCard({
  step,
  isOpen,
  onToggle,
}: {
  step: Step;
  isOpen: boolean;
  onToggle?: () => void;
}) {
  const header = (
    <>
      <span className="flex items-center gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-vlz-red text-sm font-bold text-white">
          {step.number}
        </span>
        <span
          className="text-base font-semibold uppercase tracking-widest sm:text-lg"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          {step.title}
        </span>
      </span>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
          isOpen ? 'bg-vlz-black text-white' : 'bg-white/10 text-white'
        } ${isOpen ? '' : 'rotate-180'}`}
      >
        <ChevronUp size={16} />
      </span>
    </>
  );

  return (
    <div className={`relative max-w-md sm:max-w-sm ${step.offset}`}>
      <div
        className={`overflow-hidden rounded-2xl transition-colors duration-300 ${
          isOpen ? 'bg-vlz-white text-vlz-black' : 'bg-vlz-dark text-white'
        }`}
      >
        {onToggle ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            {header}
          </button>
        ) : (
          <div className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
            {header}
          </div>
        )}

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pl-[3.75rem]">
                <p className="text-sm leading-relaxed text-vlz-gray sm:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="tag"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="relative ml-8 mt-3 w-fit">
              <span
                className="absolute -top-1.5 left-3 h-3 w-3 rotate-45 bg-gradient-to-br from-vlz-red to-[rgb(255,140,80)]"
                aria-hidden
              />
              <span className="relative inline-block rounded-full bg-gradient-to-r from-vlz-red to-[rgb(255,140,80)] px-4 py-2 text-xs font-semibold text-white">
                {step.tag}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const computeIndex = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = total > 0 ? Math.min(Math.max(scrolled / total, 0), 0.999) : 0;
      const idx = Math.floor(progress * STEPS.length);
      setScrollIndex((prev) => {
        const next = Math.min(STEPS.length - 1, Math.max(0, idx));
        return next === prev ? prev : next;
      });
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeIndex();
        ticking = false;
      });
    };

    computeIndex();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleMobile = (index: number) => {
    setMobileOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="process" className="bg-vlz-offwhite px-4 pb-6 sm:px-6 lg:px-[72px]">
      <div ref={scrollerRef} className="mx-auto max-w-[1296px] lg:h-[240vh]">
        <div className="overflow-hidden rounded-[40px] bg-vlz-black px-6 py-16 text-center sm:px-10 sm:py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-20">
          <div className="w-full">
            <div
              ref={headerRef}
              className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-lightgray"
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? 'none' : 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <Share2 size={14} className="text-vlz-red" />
              Our Approach
            </div>

            <h2
              className="mb-12 text-4xl font-bold tracking-tight text-vlz-white sm:text-5xl md:text-6xl"
              style={{
                fontFamily: 'var(--font-expanded)',
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? 'none' : 'translateY(16px)',
                transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
              }}
            >
              How We Work
            </h2>

            <div className="mx-auto mb-16 flex max-w-md items-center justify-between sm:mb-24">
              {STEPS.map((step, index) => (
                <div key={step.week} className="flex items-center">
                  <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-lightgray">
                    {step.week}
                  </span>
                  {index < STEPS.length - 1 && (
                    <span className="h-px w-8 bg-white/15 sm:w-16" aria-hidden />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: click-to-toggle accordion (no scroll-pinning on small screens) */}
            <div className="flex flex-col gap-3 text-left sm:gap-4 lg:hidden">
              {STEPS.map((step, index) => (
                <ProcessStepCard
                  key={step.title}
                  step={step}
                  isOpen={mobileOpenIndex === index}
                  onToggle={() => toggleMobile(index)}
                />
              ))}
            </div>

            {/* Desktop: scroll progress through the tall wrapper drives which step is open */}
            <div className="hidden flex-col gap-3 text-left sm:gap-4 lg:flex">
              {STEPS.map((step, index) => (
                <ProcessStepCard key={step.title} step={step} isOpen={scrollIndex === index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
