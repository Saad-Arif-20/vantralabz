import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Users } from 'lucide-react';
import { TEAM } from '../data/team';
import TeamAvatar from './TeamAvatar';

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="bg-vlz-offwhite px-4 py-16 sm:px-6 md:py-20 lg:px-[72px]">
      <div ref={ref} className="mx-auto max-w-[1296px]">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
            <Users size={14} className="text-vlz-red" />
            Who We Are
          </div>
          <h2
            className="mb-4 text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-expanded)' }}
          >
            The Faces of
            <br />
            <span className="text-vlz-red">Vantralabz</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-vlz-gray sm:text-base">
            A small, hands-on team — no account managers, no hand-offs, just the people actually
            doing the work.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <TeamAvatar name={member.name} />
              </div>
              <span className="text-xs font-semibold text-vlz-black sm:text-sm">{member.name}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <a
            href="/team.html"
            className="inline-flex items-center gap-2 rounded-full bg-vlz-black px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-vlz-red"
          >
            MEET THE FULL TEAM
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-vlz-black">
              <ArrowUpRight size={12} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
