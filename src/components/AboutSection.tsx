import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AmbientBackground from './AmbientBackground';
import RevealHeading from './RevealHeading';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44"
    >
      <AmbientBackground variant="quiet" />

      <div className="relative mx-auto max-w-5xl">
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
    </section>
  );
}
