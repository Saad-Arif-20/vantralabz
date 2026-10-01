import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Handshake, Lightbulb, TrendingUp, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PrimaryButton from '../components/PrimaryButton';
import RevealHeading from '../components/RevealHeading';
import TeamAvatar from '../components/TeamAvatar';
import { TEAM } from '../data/team';

const STORY_PARAGRAPHS = [
  "Vantralabz isn't an agency that hired a bunch of freelancers and called it a team. It's the other way around — four friends who'd each already spent years deep in our own lane (design and automation, sales, finance and operations, closing and building) decided to stop working in separate corners and build together instead.",
  'That’s still exactly how we work today. No account managers relaying messages, no outsourced work passed down a chain, no hand-off between the person who sold the project and the person who actually does it — you work with the same people the whole way through.',
  'We built this because helping other businesses grow is genuinely the work we enjoy, and every project pushes the four of us to get sharper at our own craft too. Growth that only runs one direction was never the point.',
];

const STORY_PILLARS = [
  {
    icon: Lightbulb,
    title: 'Real Expertise, Not Generalists',
    desc: 'Each of us was already deep in our craft before Vantralabz existed — we teamed up, we didn’t start from scratch.',
  },
  {
    icon: Handshake,
    title: 'No Middlemen',
    desc: 'You work directly with whoever is actually doing the work — no account managers, no hand-offs in between.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Goes Both Ways',
    desc: 'Helping your business grow is how we grow ours too — it’s the whole reason we started this.',
  },
];

function StoryPillar({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof Lightbulb;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex items-start gap-4 rounded-2xl border border-black/10 bg-vlz-offgray/60 p-5"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-vlz-black text-vlz-red">
        <Icon size={20} />
      </span>
      <div>
        <h3 className="text-base font-bold text-vlz-black sm:text-lg">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-vlz-gray">{desc}</p>
      </div>
    </motion.div>
  );
}

function OurStorySection() {
  const paraRef = useRef(null);
  const paraInView = useInView(paraRef, { once: true, margin: '-100px' });

  return (
    <section className="bg-vlz-offwhite px-4 pb-16 sm:px-6 md:pb-20 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex w-fit items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
            >
              <Lightbulb size={14} className="text-vlz-red" />
              Our Story
            </motion.div>

            <RevealHeading
              segments={[
                { text: 'We started as friends who happened to already be' },
                { text: 'experts.', emphasis: true },
              ]}
              className="mb-6 font-[var(--font-expanded)] text-3xl font-bold leading-[1.1] tracking-tight text-vlz-black sm:text-4xl md:text-5xl"
              emphasisClassName="text-vlz-red"
            />

            <div ref={paraRef} className="flex flex-col gap-4">
              {STORY_PARAGRAPHS.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={paraInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="text-sm leading-relaxed text-vlz-gray sm:text-base"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {STORY_PILLARS.map((pillar, index) => (
              <StoryPillar key={pillar.title} index={index} {...pillar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' });

  return (
    <PageLayout>
      {(openIntake) => (
        <>
          <section className="bg-vlz-offwhite px-4 pb-10 pt-32 sm:px-6 sm:pt-40 lg:px-[72px]">
            <div className="mx-auto max-w-[1296px]">
              <div className="flex flex-col items-center text-center">
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
            </div>
          </section>

          <OurStorySection />

          <section className="bg-vlz-offwhite px-4 pb-16 sm:px-6 lg:px-[72px]">
            <div ref={gridRef} className="mx-auto max-w-[1296px]">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {TEAM.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group overflow-hidden rounded-3xl border border-black/10 bg-vlz-dark"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ objectPosition: member.facePosition }}
                          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      ) : (
                        <TeamAvatar
                          name={member.name}
                          className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-vlz-dark to-vlz-black"
                        />
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-70 transition-opacity duration-500 group-hover:opacity-30"
                      />
                      <span
                        className="absolute right-4 top-4 text-3xl font-bold text-white/30 drop-shadow-md transition-colors duration-500 group-hover:text-white/50"
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
