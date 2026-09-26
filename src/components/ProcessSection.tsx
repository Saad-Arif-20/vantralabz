import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronUp, Share2 } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    week: 'Week 1',
    title: 'Research',
    tag: 'Brainstorming',
    variant: 'primary' as const,
    offset: 'sm:ml-0 sm:mt-0',
    description:
      'We dive into market trends, user behaviors, and industry insights to uncover opportunities that shape smarter strategies.',
  },
  {
    number: '02',
    week: 'Week 2',
    title: 'Prototype',
    tag: 'Test Before Build',
    variant: 'secondary' as const,
    offset: 'sm:ml-[22%] sm:-mt-16',
    description:
      'We build interactive prototypes to test ideas early, refine usability, and ensure the final product delivers real impact.',
  },
  {
    number: '03',
    week: 'Week 3',
    title: 'Presentation',
    tag: 'Ideas Made Clear',
    variant: 'secondary' as const,
    offset: 'sm:ml-[44%] sm:-mt-16',
    description:
      'We present clear design solutions, walking you through the vision, strategy, and flow before moving to final execution.',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="bg-vlz-offwhite px-4 pb-6 sm:px-6 lg:px-[72px]">
      <div
        ref={ref}
        className="mx-auto max-w-[1296px] overflow-hidden rounded-[40px] bg-vlz-black px-6 py-16 text-center sm:px-10 sm:py-20"
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-lightgray">
          <Share2 size={14} className="text-vlz-red" />
          Our Approach
        </div>

        <h2
          className="mb-12 text-4xl font-bold tracking-tight text-vlz-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-expanded)' }}
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

        <div className="flex flex-col gap-16 text-left sm:gap-0">
          {STEPS.map((step, index) => {
            const isPrimary = step.variant === 'primary';
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ zIndex: STEPS.length - index }}
                className={`relative max-w-md sm:max-w-sm ${step.offset}`}
              >
                <div
                  className={`overflow-hidden rounded-2xl ${
                    isPrimary ? 'bg-vlz-white text-vlz-black' : 'bg-vlz-dark text-white'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-4 px-5 py-4">
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
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        isPrimary ? 'bg-vlz-black text-white' : 'bg-white/10 text-white'
                      }`}
                    >
                      <ChevronUp size={16} />
                    </span>
                  </div>

                  <div className="px-5 pb-5 pl-[3.75rem]">
                    <p
                      className={`text-sm leading-relaxed sm:text-base ${
                        isPrimary ? 'text-vlz-gray' : 'text-vlz-lightgray'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

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
            );
          })}
        </div>
      </div>
    </section>
  );
}
