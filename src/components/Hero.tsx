import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import heroLoopVideo from '../assets/video/hero-loop.mp4';

interface HeroProps {
  onOpenIntake?: () => void;
}

export default function Hero({ onOpenIntake }: HeroProps) {
  return (
    <section
      id="top"
      className="relative bg-vlz-offwhite px-4 pb-6 pt-28 sm:px-6 sm:pt-32 lg:flex lg:h-[100dvh] lg:flex-col lg:px-[72px] lg:pb-6 lg:pt-24"
    >
      <div className="relative mx-auto flex h-[560px] w-full max-w-[1296px] flex-col overflow-hidden rounded-[40px] bg-vlz-black px-6 pb-10 pt-8 sm:h-[640px] sm:px-10 sm:pb-16 sm:pt-10 lg:h-auto lg:min-h-0 lg:flex-1">
        <video
          src={heroLoopVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex flex-wrap items-start justify-between gap-3">
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

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden max-w-[220px] lg:block"
            >
              <div className="w-fit rounded-2xl bg-black/35 px-3 py-2.5 backdrop-blur-sm">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
                  (About)
                </p>
                <p className="text-sm leading-relaxed text-white">
                  Web design, automation, and growth systems.
                </p>
              </div>
              <span className="mt-4 inline-block w-fit rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-vlz-lightgray backdrop-blur-sm">
                Remote-First
              </span>
            </motion.div>

            <div className="text-right">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="ml-auto max-w-[85%] text-[13vw] font-semibold uppercase leading-[0.95] tracking-tight text-vlz-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:max-w-[70%] sm:text-[9vw] md:max-w-[55%] md:text-[7vw] lg:max-w-[480px] lg:text-[clamp(40px,5vw,72px)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Build Brands
                <br />
                That Lead
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 flex justify-end"
              >
                <PrimaryButton onClick={onOpenIntake}>BOOK A CALL</PrimaryButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
