import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

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
    <div className="overflow-hidden rounded-2xl bg-vlz-offgray/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vlz-red" />
          <span className="text-base font-medium text-vlz-black md:text-lg">
            {question}
          </span>
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
            isOpen ? 'rotate-180 bg-vlz-black text-white' : 'bg-white text-vlz-black'
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 pl-[2.25rem] text-sm leading-relaxed text-vlz-gray md:text-base">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="bg-vlz-offwhite px-4 py-16 sm:px-6 md:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div ref={headerRef} className="lg:sticky lg:top-32 lg:self-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-expanded)' }}
          >
            Clarifying the
            <br />
            <span className="text-vlz-red">Details</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-sm text-vlz-gray"
          >
            Do you have any more questions?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 inline-block"
          >
            <PrimaryButton href="#contact">CALL US</PrimaryButton>
          </motion.div>
        </div>

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
