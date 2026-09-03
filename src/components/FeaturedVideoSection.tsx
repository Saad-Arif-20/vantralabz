import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import featuredVideo from '../assets/video/featured.mp4';

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
        className="relative mx-auto aspect-[3/4] max-w-6xl overflow-hidden rounded-3xl sm:aspect-[16/10] md:aspect-video"
      >
        {isInView && (
          <video
            className="h-full w-full object-cover"
            src={featuredVideo}
            muted
            autoPlay
            loop
            playsInline
            preload="none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
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
