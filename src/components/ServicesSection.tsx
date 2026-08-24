import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import brandStrategyImg from '../assets/services/brand-strategy.webp';
import webDesignImg from '../assets/services/web-design.webp';
import contentCopyImg from '../assets/services/content-copy.webp';
import writingImg from '../assets/services/writing.webp';
import aiAutomationImg from '../assets/services/ai-automation.webp';
import ServiceModal from './ServiceModal';

export type Service = {
  tag: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  detail: {
    hook: string;
    intro: string;
    included: string[];
    walkAway: string[];
    forYou: string;
  };
};

const SERVICES: Service[] = [
  {
    tag: 'Strategy',
    title: 'Brand Strategy',
    description:
      'We research your market, sharpen your positioning, and build a visual identity that makes you the obvious choice before you say a word.',
    image: brandStrategyImg,
    detail: {
      hook: 'Your brand is the reason people choose you over someone cheaper.',
      intro:
        "Without a clear brand, you compete on price — and that's a race to the bottom. We build brands that make you the obvious choice in your market, before you even say a word.",
      included: [
        'Market & competitor research',
        'Brand positioning & messaging framework',
        'Logo & full visual identity system',
        'Brand voice & tone guidelines',
        'Brand style guide (PDF + Figma)',
      ],
      walkAway: [
        'Clarity on exactly who you serve and why they pick you',
        'A visual identity that works across every channel',
        'A message that resonates and converts',
        'Confidence to show up consistently everywhere',
      ],
      forYou:
        "You're launching a new business, rebranding an existing one, or you've been operating without a clear identity and feel like your brand doesn't match the quality of your work.",
    },
  },
  {
    tag: 'Digital',
    title: 'Web Design & Dev',
    description:
      'Fast, focused websites built to convert — conversion-minded UX, custom responsive design, and a modern codebase you actually own.',
    image: webDesignImg,
    detail: {
      hook: 'A website should print customers, not just collect impressions.',
      intro:
        'Most sites look nice and convert nothing. We design and build fast, focused websites that guide the right visitor to the right action — so your traffic actually turns into revenue.',
      included: [
        'UX strategy & conversion-focused wireframes',
        'Custom, responsive design (desktop + mobile)',
        'Development in a modern, fast stack',
        'On-page SEO & performance optimization',
        'Analytics & launch support',
      ],
      walkAway: [
        'A site that loads fast and works on every device',
        'Clear paths that move visitors toward buying',
        'A codebase you actually own and can grow',
        'Measurable lift in leads and conversions',
      ],
      forYou:
        "You have an outdated or underperforming site, you're launching something new, or you're getting traffic that never turns into customers.",
    },
  },
  {
    tag: 'Voice',
    title: 'Content & Copy',
    description:
      'Words that sell while you sleep. We turn your expertise into copy and content that builds trust and moves people to act.',
    image: contentCopyImg,
    detail: {
      hook: 'Great copy sells while you sleep. Bad copy costs you every day.',
      intro:
        'The words on your site, emails, and posts do the selling long after the meeting ends. We turn your expertise into clear, persuasive content that builds trust and moves people to act.',
      included: [
        'Messaging & content strategy',
        'Website & landing page copy',
        'Email sequences & campaigns',
        'Blog, social & long-form content',
        'Editing & tone-of-voice consistency',
      ],
      walkAway: [
        'Copy that speaks directly to your buyer',
        'A consistent voice across every touchpoint',
        'Content that ranks, resonates, and converts',
        'More time back — we handle the writing',
      ],
      forYou:
        'You struggle to put your value into words, your content feels generic, or you simply never have time to write consistently.',
    },
  },
  {
    tag: 'Authority',
    title: 'Long-Form Writing',
    description:
      'Ebooks, guides, and signature pieces that position you as the expert people remember — and keep generating leads for years.',
    image: writingImg,
    detail: {
      hook: 'Long-form writing that turns your knowledge into authority.',
      intro:
        'Ebooks, guides, and signature pieces position you as the expert and generate leads for years. We research, structure, and write long-form assets that people actually finish and remember.',
      included: [
        'Topic research & outline',
        'Full ghostwriting or co-writing',
        'Structural & line editing',
        'Lead magnets & downloadable guides',
        'Formatting for print or digital',
      ],
      walkAway: [
        'A polished asset you can use for years',
        'Authority content that generates leads',
        'A clear, engaging narrative from start to finish',
        'A repeatable process for future pieces',
      ],
      forYou:
        'You have deep expertise but no time to write it down, or you want a flagship ebook or guide that sets you apart from competitors.',
    },
  },
  {
    tag: 'Innovation',
    title: 'AI Chatbots & Workflow Automation',
    description:
      'We design intelligent chatbots and automated workflows that take repetitive work off your plate — so your team can focus on growth, not busywork.',
    image: aiAutomationImg,
    featured: true,
    detail: {
      hook: "Your team's time is worth more than repetitive busywork.",
      intro:
        "Every follow-up, form, and FAQ that eats up your team's day is an hour not spent growing the business. We design AI chatbots and automated workflows that quietly take that work off your plate.",
      included: [
        'Workflow & process audit',
        'Custom AI chatbot design & training',
        'Integration with your existing tools (CRM, email, calendar)',
        'Automated task & notification workflows',
        'Testing, launch & handoff documentation',
      ],
      walkAway: [
        'A chatbot that actually understands your business and customers',
        'Hours back every week from work that no longer needs a human',
        "Systems that keep running whether you're online or not",
        "A clear map of what's automated and how it works",
      ],
      forYou:
        "You're buried in repetitive requests, your team is stretched thin, or you keep saying \"we should really automate this\" and never get to it.",
    },
  },
];

function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: Service;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen();
      }}
      className={`liquid-glass group cursor-pointer overflow-hidden rounded-3xl ${
        service.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-white/50">
            {service.tag}
          </span>
          <span className="liquid-glass rounded-full p-2 transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={16} className="text-white" />
          </span>
        </div>
        <h3 className="mb-3 tracking-tight text-white text-xl md:text-2xl">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/60">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<Service | null>(
    null,
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between md:mb-16"
        >
          <h2 className="tracking-tight text-white text-3xl md:text-5xl">
            What we do
          </h2>
          <span className="hidden text-sm text-white/50 md:inline">
            Our services
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onOpen={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
