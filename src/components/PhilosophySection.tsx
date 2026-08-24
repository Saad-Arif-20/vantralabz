import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import philosophyVideo from '../assets/video/philosophy.mp4';

export default function PhilosophySection() {
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const leftInView = useInView(leftRef, { once: true, margin: '-100px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-100px' });

  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 tracking-tight text-white text-5xl md:mb-24 md:text-7xl lg:text-8xl"
        >
          Innovation{' '}
          <span className="font-serif-display italic text-white/50">x</span>{' '}
          Vision
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] overflow-hidden rounded-3xl"
          >
            {leftInView && (
              <video
                className="h-full w-full object-cover"
                src={philosophyVideo}
                muted
                autoPlay
                loop
                playsInline
                preload="none"
              />
            )}
          </motion.div>

          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-10"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
                Strategy meets creativity
              </p>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                The best work lives where sharp strategy meets bold creative
                instinct. That's the intersection we work from — turning
                early ideas into brands, sites, and campaigns that people
                actually remember.
              </p>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
                Shape the future
              </p>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Our best ideas rarely come from following trends — they come
                from staying curious. We dig until we find the angle no one
                else has tried, then build it into something your audience
                can't ignore.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
