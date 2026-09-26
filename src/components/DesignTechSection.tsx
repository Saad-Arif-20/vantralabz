import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

import brandStrategyImg from '../assets/services/brand-strategy.webp';
import webDesignImg from '../assets/services/web-design.webp';
import contentCopyImg from '../assets/services/content-copy.webp';
import writingImg from '../assets/services/writing.webp';
import aiAutomationImg from '../assets/services/ai-automation.webp';

const ITEMS = [
  {
    number: '01',
    title: 'Brand Strategy',
    tag1: '#Positioning',
    tag2: '#Identity',
    description:
      'We research your market, sharpen your positioning, and build a visual identity that makes you the obvious choice.',
    image: brandStrategyImg,
  },
  {
    number: '02',
    title: 'Web Design & Dev',
    tag1: '#ConversionFocused',
    tag2: '#ModernStack',
    description:
      'Fast, focused websites built to convert, with conversion-minded UX, custom responsive design, and a codebase you own.',
    image: webDesignImg,
  },
  {
    number: '03',
    title: 'Content & Copy',
    tag1: '#WordsThatSell',
    tag2: '#BrandVoice',
    description:
      'Words that sell while you sleep. We turn your expertise into copy and content that builds trust and moves people to act.',
    image: contentCopyImg,
  },
  {
    number: '04',
    title: 'Long-Form Writing',
    tag1: '#Authority',
    tag2: '#LeadMagnets',
    description:
      'Ebooks, guides, and signature pieces that position you as the expert people remember and keep generating leads.',
    image: writingImg,
  },
  {
    number: '05',
    title: 'AI Chatbots & Workflow Automation',
    tag1: '#Automation',
    tag2: '#AIChatbots',
    description:
      'We design intelligent chatbots and automated workflows that take repetitive work off your plate.',
    image: aiAutomationImg,
  },
];

export default function DesignTechSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-vlz-offwhite px-4 pb-6 sm:px-6">
      <div
        ref={ref}
        className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-vlz-black px-6 py-16 sm:px-10 sm:py-20"
      >
        <div className="mb-4 flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-lightgray w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
          Creativity Meets Tech
        </div>

        <h2
          className="mb-12 text-4xl font-bold leading-[1.05] tracking-tight text-vlz-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          Design &amp; Tech
          <br />
          <span className="text-vlz-red">Solutions</span>
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[16/7]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                    {item.tag1}
                  </span>
                  <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                    {item.tag2}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
                  className={`overflow-hidden rounded-2xl transition-colors ${
                    isOpen ? 'bg-vlz-white text-vlz-black' : 'bg-white/[0.04] text-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${
                          isOpen ? 'bg-vlz-red text-white' : 'bg-white/10 text-vlz-lightgray'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span
                        className="text-lg font-semibold sm:text-xl"
                        style={{ fontFamily: 'var(--font-expanded)' }}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        isOpen ? 'bg-vlz-black text-white' : 'bg-white/10 text-white'
                      }`}
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[3.75rem]">
                      <p className="mb-4 text-sm leading-relaxed text-vlz-gray sm:text-base">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center gap-3 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
                        <span>{item.tag1}</span>
                        <span>{item.tag2}</span>
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
