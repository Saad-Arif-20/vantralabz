import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AmbientBackground from './AmbientBackground';
import RevealHeading from './RevealHeading';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      "We start by understanding your business, your audience, and the idea you haven't said out loud yet — the one your brand should actually be built around.",
  },
  {
    number: '02',
    title: 'Strategize',
    description:
      "We shape that idea into a clear plan: positioning, messaging, and the specific mix of services that gets you from where you are to where you're going.",
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Design, code, copy, or automation — whatever the plan calls for, built to a standard we would put our own name on.',
  },
  {
    number: '04',
    title: 'Grow',
    description:
      "Launch is the start, not the finish. We stay close, refine what's working, and keep pushing the idea forward.",
  },
];

function ProcessStep({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="liquid-glass relative flex flex-1 flex-col gap-4 rounded-3xl p-6 md:p-8"
    >
      <span className="font-serif-display text-4xl italic text-white/30 md:text-5xl">
        {step.number}
      </span>
      <h3 className="tracking-tight text-white text-xl md:text-2xl">
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed text-white/60">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <AmbientBackground variant="quiet" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-sm uppercase tracking-widest text-white/50">
            How We Work
          </p>
          <RevealHeading
            as="h2"
            className="tracking-tight text-white text-4xl md:text-6xl"
            segments={[
              { text: 'A clear path from' },
              { text: 'idea', emphasis: true },
              { text: 'to' },
              { text: 'impact.', emphasis: true },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
