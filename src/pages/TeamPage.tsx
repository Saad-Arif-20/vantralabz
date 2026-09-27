import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PrimaryButton from '../components/PrimaryButton';
import TeamAvatar from '../components/TeamAvatar';
import { TEAM } from '../data/team';

export default function TeamPage() {
  return (
    <PageLayout>
      {(openIntake) => (
        <>
          <section className="bg-vlz-offwhite px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-[72px]">
            <div className="mx-auto max-w-[1296px]">
              <div className="mb-14 flex flex-col items-center text-center">
                <div className="mb-6 flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
                  <Users size={14} className="text-vlz-red" />
                  Who We Are
                </div>
                <h1
                  className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
                  style={{ fontFamily: 'var(--font-expanded)' }}
                >
                  The Faces of
                  <br />
                  <span className="text-vlz-red">Vantralabz</span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-vlz-gray sm:text-base">
                  A small, hands-on team — no account managers, no hand-offs, just the people
                  actually doing the work on every project.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {TEAM.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group overflow-hidden rounded-3xl border border-black/10 bg-vlz-dark"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]">
                      <TeamAvatar
                        name={member.name}
                        className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-vlz-dark to-vlz-black transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 50% 120%, #ffe9b3 0%, #ffb03c 15%, #ff6a1f 28%, #d5290f 42%, #5c0f08 62%, #000000 85%)',
                        }}
                      />
                      <span
                        className="absolute right-4 top-4 text-3xl font-bold text-white/20 transition-colors duration-500 group-hover:text-white/40"
                        style={{ fontFamily: 'var(--font-expanded)' }}
                      >
                        {member.number}
                      </span>
                    </div>
                    <div className="border-t border-white/10 bg-vlz-white px-5 py-5">
                      <h2 className="text-lg font-bold uppercase tracking-wide text-vlz-black sm:text-xl">
                        {member.name}
                      </h2>
                      <p className="mt-1 text-sm text-vlz-gray">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-vlz-offwhite px-4 pb-20 sm:px-6 lg:px-[72px]">
            <div className="mx-auto flex max-w-[1296px] flex-col items-center rounded-[40px] bg-vlz-black px-6 py-14 text-center sm:px-10 sm:py-20">
              <h2
                className="mb-4 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl"
                style={{ fontFamily: 'var(--font-expanded)' }}
              >
                Want to work with us?
              </h2>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-vlz-lightgray sm:text-base">
                Tell us about your project and we&rsquo;ll get back to you within one business day.
              </p>
              <PrimaryButton onClick={() => openIntake()}>BOOK A CALL</PrimaryButton>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
}
