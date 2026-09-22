import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AmbientBackground from './AmbientBackground';
import RevealHeading from './RevealHeading';

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Idea-first, not template-first',
    description: 'We start with strategy and a point of view, not a stock layout.',
  },
  {
    number: '02',
    title: 'One team, every discipline',
    description: 'Brand, web, copy, and automation under one roof — not four vendors.',
  },
  {
    number: '03',
    title: 'Built to be owned',
    description: 'You walk away with assets and code you actually control.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <AmbientBackground variant="quiet" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-widest text-white/50"
          >
            About Us
          </motion.p>

          <RevealHeading
            as="h2"
            className="mt-6 text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
            segments={[
              { text: 'Pioneering' },
              { text: 'ideas', emphasis: true },
              { text: 'for brands that' },
              { text: 'grow, evolve, and lead.', emphasis: true },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4 lg:pt-16">
          {DIFFERENTIATORS.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
              className="liquid-glass flex gap-4 rounded-2xl p-5"
            >
              <span className="font-serif-display shrink-0 text-2xl italic text-white/30">
                {item.number}
              </span>
              <div>
                <h3 className="mb-1 text-sm font-medium text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
