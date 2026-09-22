import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AmbientBackground from './AmbientBackground';
import RevealHeading from './RevealHeading';

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <AmbientBackground variant="quiet" />

      <div className="relative mx-auto max-w-5xl">
        <RevealHeading
          as="h2"
          className="mb-6 tracking-tight text-white text-5xl md:text-7xl lg:text-8xl"
          emphasisClassName="font-serif-display italic text-white/50"
          segments={[{ text: 'Innovation' }, { text: 'x', emphasis: true }, { text: 'Vision' }]}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif-display mb-20 max-w-2xl text-xl italic leading-snug text-white/70 md:mb-28 md:text-2xl"
        >
          The best work lives where sharp strategy meets bold creative
          instinct.
        </motion.p>

        <div
          ref={ref}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="border-t border-white/10 pt-8"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
              Strategy meets creativity
            </p>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              That's the intersection we work from — turning early ideas into
              brands, sites, and campaigns that people actually remember.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="border-t border-white/10 pt-8"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
              Shape the future
            </p>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              Our best ideas rarely come from following trends — they come
              from staying curious. We dig until we find the angle no one
              else has tried, then build it into something your audience
              can't ignore.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
