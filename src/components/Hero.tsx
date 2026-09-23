import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const HERO_BG_URL = 'https://framerusercontent.com/images/K8og1bzjDjE9Wjd9V0wyFnNTuE.png';

interface HeroProps {
  onOpenIntake?: () => void;
}

export default function Hero({ onOpenIntake }: HeroProps) {
  return (
    <section id="top" className="relative bg-vlz-offwhite px-4 pb-6 pt-28 sm:px-6 sm:pt-32">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-vlz-black bg-cover bg-center px-6 pb-10 pt-8 sm:px-10 sm:pb-16 sm:pt-10"
        style={{ backgroundImage: `url(${HERO_BG_URL})` }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60"
          aria-hidden
        />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-vlz-black shadow-sm"
          >
            <Check size={14} className="text-vlz-red" />
            True Growth
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-right text-xs font-semibold uppercase tracking-widest text-white/90"
          >
            We&rsquo;re available
            <br />
            <span className="inline-flex items-center gap-1.5 normal-case">
              <span className="h-1.5 w-1.5 rounded-full bg-vlz-green" />
              for you
            </span>
          </motion.p>
        </div>

        <div className="relative z-10 mt-16 sm:mt-24">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-[13vw] font-semibold uppercase leading-[0.95] tracking-tight text-vlz-white sm:text-[9vw] md:text-[7vw] lg:text-[80px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Build Brands
            <br />
            That Lead
          </motion.h1>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2"
            >
              <span className="w-fit rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-vlz-lightgray backdrop-blur-sm">
                Available Now
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest text-white">
                AI Automation
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-sm sm:text-right"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                (About)
              </p>
              <p className="mb-6 text-sm leading-relaxed text-white/85 sm:text-base">
                We turn early-stage ideas into brand, web, and growth systems that make
                you the obvious choice in your market.
              </p>
              <div className="sm:flex sm:justify-end">
                <PrimaryButton onClick={onOpenIntake}>BOOK A CALL</PrimaryButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
