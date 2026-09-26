import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Share2 } from 'lucide-react';

const STAGGER_CLASS = ['sm:ml-0', 'sm:ml-[12%]', 'sm:ml-[24%]'];

const STEPS = [
  {
    number: '01',
    week: 'Week 1',
    title: 'Research',
    tag: 'Brainstorming',
    description:
      "We dive into market trends, user behaviors, and industry insights to uncover opportunities that shape smarter strategies.",
  },
  {
    number: '02',
    week: 'Week 2',
    title: 'Prototype',
    tag: 'Test Before Build',
    description:
      'We build interactive prototypes to test ideas early, refine usability, and ensure the final product delivers real impact.',
  },
  {
    number: '03',
    week: 'Week 3',
    title: 'Presentation',
    tag: 'Ideas Made Clear',
    description:
      'We present clear design solutions, walking you through the vision, strategy, and flow before moving to final execution.',
  },
];

export default function ProcessSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="process" className="bg-vlz-offwhite px-4 pb-6 sm:px-6 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px] overflow-hidden rounded-[40px] bg-vlz-black px-6 py-16 text-center sm:px-10 sm:py-20">
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

        <div className="mx-auto mb-12 flex max-w-md items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.week} className="flex items-center">
              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                  openIndex === index
                    ? 'bg-vlz-red text-white'
                    : 'bg-white/5 text-vlz-lightgray'
                }`}
              >
                {step.week}
              </span>
              {index < STEPS.length - 1 && (
                <span className="h-px w-8 bg-white/15 sm:w-16" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-left">
          {STEPS.map((step, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={step.title}
                layout
                className={`max-w-md overflow-hidden rounded-2xl transition-colors sm:max-w-sm ${STAGGER_CLASS[index]} ${
                  isOpen ? 'bg-vlz-white text-vlz-black' : 'bg-white/[0.06] text-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4"
                >
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
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-vlz-black text-white' : 'bg-white/10 text-white'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pl-[3.75rem]">
                    <p className="mb-3 text-sm leading-relaxed text-vlz-gray sm:text-base">
                      {step.description}
                    </p>
                    <span className="inline-block rounded-full bg-vlz-red px-3 py-1 text-xs font-semibold text-white">
                      {step.tag}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
