import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers } from 'lucide-react';

const DIFFERENTIATORS = [
  { label: 'Idea-First', note: 'Not Templates' },
  { label: 'One Team', note: 'Every Discipline' },
  { label: 'Built To Own', note: 'Not To Rent' },
  { label: 'Remote-First', note: 'Global Clients' },
  { label: 'AI-Native', note: 'By Design' },
];

export default function WhatSetsUsApartSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-vlz-offwhite px-4 pb-6 sm:px-6">
      <div ref={ref} className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-vlz-offgray/60 px-6 py-16 sm:px-10 sm:py-20">
        <div className="mb-6 flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white w-fit">
          <Layers size={14} className="text-vlz-red" />
          Awards
        </div>

        <h2
          className="mb-12 text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          What Sets <span className="text-vlz-red">Us</span>
          <br />
          <span className="text-vlz-red">Apart</span>
        </h2>

        <div className="flex flex-col">
          {DIFFERENTIATORS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-center justify-between border-b border-black/10 py-5 first:border-t"
            >
              <span
                className="text-xl font-semibold text-vlz-gray sm:text-2xl"
                style={{ fontFamily: 'var(--font-expanded)' }}
              >
                {item.label}
              </span>
              <span className="text-sm text-vlz-lightgray sm:text-base">
                ({item.note})
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
