import { motion } from 'framer-motion';
import PrimaryButton from './PrimaryButton';

interface HeroProps {
  onOpenIntake?: () => void;
}

export default function Hero({ onOpenIntake }: HeroProps) {
  return (
    <section id="top" className="relative bg-vlz-offwhite px-4 pb-6 pt-28 sm:px-6 sm:pt-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-vlz-black px-6 pb-14 pt-8 sm:px-10 sm:pb-20 sm:pt-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(80% 60% at 50% 0%, rgba(249,69,45,0.25) 0%, transparent 60%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-vlz-lightgray"
          >
            <span className="h-2 w-2 rounded-full bg-vlz-green" />
            AVAILABLE NOW
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-vlz-lightgray"
          >
            AI AUTOMATION
            <span className="text-vlz-red">·</span>
            2025
          </motion.div>
        </div>

        <div className="relative z-10 mt-14 flex flex-col items-center text-center sm:mt-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-vlz-lightgray"
          >
            We're available for you <span className="align-super text-[0.6em]">®</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-[13vw] font-semibold uppercase leading-[0.95] tracking-tight text-vlz-white sm:text-[9vw] md:text-[7vw] lg:text-[92px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Build Brands
            <br />
            <span className="text-vlz-red">That Lead</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-7 max-w-xl px-2 text-sm leading-relaxed text-vlz-lightgray sm:text-base"
          >
            We turn early-stage ideas into brand, web, and growth systems that make you
            the obvious choice in your market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <PrimaryButton onClick={onOpenIntake}>BOOK A CALL</PrimaryButton>
            <PrimaryButton variant="secondary" href="#work">
              VIEW OUR WORK
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
