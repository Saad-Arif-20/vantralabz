import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers } from 'lucide-react';

import webDesignImg from '../assets/services/web-design.webp';
import contentCopyImg from '../assets/services/content-copy.webp';
import aiAutomationImg from '../assets/services/ai-automation.webp';
import PrimaryButton from './PrimaryButton';

const IMAGES = [webDesignImg, contentCopyImg, aiAutomationImg];

export default function WorkThatSpeaksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="bg-vlz-offwhite px-4 pb-6 sm:px-6">
      <div ref={ref} className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-vlz-black px-6 py-16 sm:px-10 sm:py-20">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-lightgray w-fit">
              <Layers size={14} className="text-vlz-red" />
              Our Work
            </div>
            <h2
              className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              Work That
              <br />
              Speaks
            </h2>
          </div>
          <PrimaryButton variant="secondary" href="/work">
            EXPLORE ALL WORKS
          </PrimaryButton>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {IMAGES.slice(0, 2).map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="aspect-square overflow-hidden rounded-2xl"
              >
                <img src={image} alt="Vantralabz work sample" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="aspect-[21/9] overflow-hidden rounded-2xl"
          >
            <img src={IMAGES[2]} alt="Vantralabz work sample" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
