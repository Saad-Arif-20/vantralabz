import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://framerusercontent.com/images/paKFVD9xwLTk3BGcoEACtLEeTWs.svg';

const TEAM = [
  { number: '01', name: 'Saad Arif', role: 'Design, Dev & Automation' },
  { number: '02', name: 'Muhammad Atta', role: 'Finance & Operations' },
  { number: '03', name: 'Hamza Ghouri', role: 'Turns Strangers Into Clients' },
  { number: '04', name: 'Humayun', role: 'Closer & Builder' },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="bg-vlz-offwhite px-4 py-16 sm:px-6 md:py-20">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
            <Users size={14} className="text-vlz-red" />
            Who We Are
          </div>
          <h2
            className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-expanded)' }}
          >
            The Faces of
            <br />
            <span className="text-vlz-red">Vantralabz</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="overflow-hidden rounded-3xl border border-black/10 bg-vlz-dark"
            >
              <div className="relative flex aspect-[4/5] items-start justify-end p-4">
                <img
                  src={PLACEHOLDER_IMAGE}
                  alt="Photo placeholder — to be replaced"
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <span
                  className="relative text-3xl font-bold text-white/20"
                  style={{ fontFamily: 'var(--font-expanded)' }}
                >
                  {member.number}
                </span>
              </div>
              <div className="border-t border-white/10 bg-vlz-white px-4 py-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-vlz-black sm:text-base">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-vlz-gray sm:text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
