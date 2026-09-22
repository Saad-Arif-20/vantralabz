import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import WorkflowMockup from './WorkflowMockup';

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="work"
      className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-6xl"
      >
        <WorkflowMockup />

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-white/60">
              Our Approach
            </p>
            <p className="text-sm leading-relaxed text-white md:text-base">
              We believe every brand is carrying an idea it hasn't said out
              loud yet. Every engagement starts with a question, and every
              answer we uncover becomes the strategy that sets you apart.
            </p>
          </div>

          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="liquid-glass w-fit rounded-full px-8 py-3 text-sm font-medium text-white"
          >
            View our services
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
