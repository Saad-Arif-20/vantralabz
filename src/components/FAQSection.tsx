import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'What services does Vantralabz offer?',
    answer:
      'Five, and we scope every project around whichever mix you need: Brand Strategy, Web Design & Dev, Content & Copy, Long-Form Writing, and AI Chatbots & Workflow Automation. Most clients start with one and add another once they see how the pieces connect.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'It depends on scope, but as a rough guide: a brand identity runs 2–4 weeks, a full website build 4–8 weeks, and ongoing content or automation work runs on a retainer. You will get a firm timeline before anything is signed off.',
  },
  {
    question: "What's your pricing model?",
    answer:
      "Every project is scoped and quoted individually based on what you actually need — we don't believe in one-size-fits-all packages. Book a call and we'll give you a clear, honest quote before any work begins.",
  },
  {
    question: 'Do you only work with certain industries?',
    answer:
      "No — we work across industries. What matters more to us is fit: whether you're ready to invest in real strategy rather than a quick logo swap or a templated site.",
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      "Yes. Brand and web projects include a post-launch support window, and ongoing content, copy, or automation work can continue on a monthly retainer once the initial build is live.",
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a call through the button at the top of the page. We\'ll talk through what you need, follow up with a proposal and timeline, and kick off once you\'re ready to move forward.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="liquid-glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-white md:text-lg">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/60 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-white/50 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-white/40">
            FAQ
          </p>
          <h2 className="tracking-tight text-white text-4xl md:text-6xl">
            Frequently asked{' '}
            <span className="font-serif-display italic text-white/60">
              questions.
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
