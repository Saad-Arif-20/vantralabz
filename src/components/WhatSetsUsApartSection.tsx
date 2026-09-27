import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GlobeHemisphereWest, Key, Lightbulb, Sparkle, UsersThree } from '@phosphor-icons/react';
import { RollingList, type RollingListItem } from './ui/rolling-list';

const ICON_SIZE = 34;
const ICON_COLOR = '#F9452D';
const ICON_WEIGHT = 'duotone' as const;

const DIFFERENTIATORS: RollingListItem[] = [
  {
    id: 1,
    title: 'Idea-First',
    category: 'Not Templates',
    icon: <Lightbulb size={ICON_SIZE} color={ICON_COLOR} weight={ICON_WEIGHT} />,
  },
  {
    id: 2,
    title: 'One Team',
    category: 'Every Discipline',
    icon: <UsersThree size={ICON_SIZE} color={ICON_COLOR} weight={ICON_WEIGHT} />,
  },
  {
    id: 3,
    title: 'Built To Own',
    category: 'Not To Rent',
    icon: <Key size={ICON_SIZE} color={ICON_COLOR} weight={ICON_WEIGHT} />,
  },
  {
    id: 4,
    title: 'Remote-First',
    category: 'Global Clients',
    icon: <GlobeHemisphereWest size={ICON_SIZE} color={ICON_COLOR} weight={ICON_WEIGHT} />,
  },
  {
    id: 5,
    title: 'AI-Native',
    category: 'By Design',
    icon: <Sparkle size={ICON_SIZE} color={ICON_COLOR} weight={ICON_WEIGHT} />,
  },
];

export default function WhatSetsUsApartSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-vlz-offwhite px-4 pb-6 sm:px-6 lg:px-[72px]">
      <div
        ref={ref}
        className="mx-auto max-w-[1296px] overflow-hidden rounded-[40px] bg-vlz-offgray/60 px-6 py-16 sm:px-10 sm:py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 flex w-fit items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white"
        >
          <Sparkles size={14} className="text-vlz-red" />
          Our Edge
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          What Sets <span className="text-vlz-red">Us</span>
          <br />
          <span className="text-vlz-red">Apart</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RollingList items={DIFFERENTIATORS} />
        </motion.div>
      </div>
    </section>
  );
}
