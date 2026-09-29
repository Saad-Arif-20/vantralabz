import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bot,
  Check,
  CheckCircle2,
  Clock,
  Globe,
  PenTool,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import PrimaryButton from './PrimaryButton';

const SERVICES_OPTIONS = [
  {
    id: 'web-design',
    title: 'Web Design & Dev',
    desc: 'High-converting custom website or complete revamp',
    icon: Globe,
  },
  {
    id: 'ai-automation',
    title: 'AI Chatbots & Automation',
    desc: 'Intelligent assistants & automated workflows that save hours',
    icon: Bot,
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy & Identity',
    desc: 'Positioning, logo, visual guidelines & asset suite',
    icon: Sparkles,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Shopify',
    desc: 'Store design, checkout optimization & sales funnels',
    icon: ShoppingBag,
  },
  {
    id: 'content-copy',
    title: 'Content & Copywriting',
    desc: 'High-converting landing page copy, emails & long-form',
    icon: PenTool,
  },
];

const TIMELINE_OPTIONS = [
  'Immediately (ASAP)',
  'Within 2–4 Weeks',
  '1–2 Months',
  'Exploring / Planning',
];

const SITUATION_OPTIONS = [
  'Need a brand new website / project from scratch',
  'Want to redesign & modernize our existing website',
  'Our current site has low conversion / speed issues',
  'Looking strictly for AI chatbots & workflow automation',
];

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
  initialService?: string;
}

export default function IntakeModal({
  isOpen,
  onClose,
  initialStep = 1,
  initialService,
}: IntakeModalProps) {
  const [step, setStep] = useState(initialStep);
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-design']);
  const [situation, setSituation] = useState(SITUATION_OPTIONS[0]);
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(initialStep);
      if (initialService) {
        setSelectedServices([initialService]);
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialStep, initialService]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email) return;

    setSubmitting(true);

    const payload = {
      name: contact.name,
      email: contact.email,
      whatsapp: contact.whatsapp,
      company: contact.company,
      notes: contact.notes,
      services: selectedServices.join(', '),
      situation,
      currentWebsite: currentWebsite || 'None provided',
      timeline,
      leadSource: 'Interactive Intake & Calendly Flow',
    };

    try {
      await fetch(SITE_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      setStep(3);
    } catch {
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
      >
        <div
          ref={containerRef}
          className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-black/10 bg-vlz-white text-vlz-black shadow-2xl"
        >
          {/* Brand accent stripe across the top */}
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background: 'linear-gradient(90deg, rgb(249,69,45), rgb(255,140,80), rgb(249,69,45))',
            }}
            aria-hidden
          />

          {/* Top Bar / Progress */}
          <div className="relative flex items-center justify-between border-b border-black/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xl tracking-wide text-vlz-black"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                VANTRALABZ
              </span>
              <span className="hidden text-xs text-vlz-lightgray sm:inline">•</span>
              <span className="text-xs font-medium uppercase tracking-widest text-vlz-gray">
                {step === 1 && 'Step 1 of 3: About Your Project'}
                {step === 2 && 'Step 2 of 3: Contact Info'}
                {step === 3 && 'Step 3 of 3: Schedule Meeting'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Step indicator pills */}
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === i
                        ? 'w-6 bg-vlz-red'
                        : step > i
                        ? 'w-3 bg-vlz-red/50'
                        : 'w-2 bg-black/10'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={onClose}
                aria-label="Close intake"
                className="rounded-full p-1.5 text-vlz-gray transition-colors hover:bg-vlz-black hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="themed-scrollbar flex-1 overflow-y-auto p-6 sm:p-8">
            {/* STEP 1: Services + Project Scope */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-vlz-black sm:text-3xl">
                    Let's scope out your project
                  </h2>
                  <p className="mt-1 text-sm text-vlz-gray">
                    Takes about a minute — this helps us prepare specific insights before our call.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                    What can we help you build?
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {SERVICES_OPTIONS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedServices.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleService(item.id)}
                          className={`group relative flex cursor-pointer items-start gap-4 rounded-2xl p-4 transition-all ${
                            isSelected
                              ? 'border border-vlz-red/50 bg-vlz-red/10 shadow-lg'
                              : 'border border-black/10 bg-vlz-offwhite hover:border-vlz-red/30 hover:bg-[rgba(249,69,45,0.05)]'
                          }`}
                        >
                          <div
                            className={`rounded-xl p-2.5 transition-colors ${
                              isSelected ? 'bg-vlz-red text-white' : 'bg-[rgba(249,69,45,0.1)] text-vlz-red'
                            }`}
                          >
                            <Icon size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-medium text-vlz-black">{item.title}</h3>
                              {isSelected && (
                                <span className="rounded-full bg-vlz-red p-1 text-white">
                                  <Check size={12} />
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-vlz-gray">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Situation radio cards */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                    Where are you currently at?
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SITUATION_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSituation(opt)}
                        className={`rounded-xl p-3.5 text-left text-xs sm:text-sm transition-all ${
                          situation === opt
                            ? 'border border-vlz-red/50 bg-vlz-red/10 text-vlz-black'
                            : 'border border-black/10 bg-vlz-offwhite text-vlz-gray hover:border-vlz-red/30 hover:bg-[rgba(249,69,45,0.05)]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Existing Website Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                    Existing Website or Store URL (Optional)
                  </label>
                  <div className="rounded-xl border border-black/10 bg-vlz-offwhite transition-colors focus-within:border-vlz-red/40 focus-within:ring-2 focus-within:ring-vlz-red/20">
                    <input
                      type="text"
                      value={currentWebsite}
                      onChange={(e) => setCurrentWebsite(e.target.value)}
                      placeholder="e.g. yourcompany.com"
                      className="w-full bg-transparent px-4 py-3 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none"
                    />
                  </div>
                </div>

                {/* Timeline selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                    Expected Timeline
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setTimeline(opt)}
                        className={`rounded-xl p-2.5 text-center text-xs transition-all ${
                          timeline === opt
                            ? 'border border-vlz-red/50 bg-vlz-red/10 text-vlz-black'
                            : 'border border-black/10 bg-vlz-offwhite text-vlz-gray hover:border-vlz-red/30 hover:bg-[rgba(249,69,45,0.05)]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <PrimaryButton onClick={() => setStep(2)}>CONTINUE</PrimaryButton>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Contact Info */}
            {step === 2 && (
              <motion.form
                key="step2"
                onSubmit={handleSubmitContact}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-vlz-black sm:text-3xl">
                    Who should Hamza connect with?
                  </h2>
                  <p className="mt-1 text-sm text-vlz-gray">
                    We'll use this to send confirmation details and prepare your project breakdown.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                      Your Name *
                    </label>
                    <div className="rounded-xl border border-black/10 bg-vlz-offwhite transition-colors focus-within:border-vlz-red/40 focus-within:ring-2 focus-within:ring-vlz-red/20">
                      <input
                        type="text"
                        required
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full bg-transparent px-4 py-3 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                      Work Email *
                    </label>
                    <div className="rounded-xl border border-black/10 bg-vlz-offwhite transition-colors focus-within:border-vlz-red/40 focus-within:ring-2 focus-within:ring-vlz-red/20">
                      <input
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-transparent px-4 py-3 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                      <span>WhatsApp / Phone Number</span>
                      <span className="text-[10px] text-emerald-600 lowercase">for instant callback</span>
                    </label>
                    <div className="rounded-xl border border-black/10 bg-vlz-offwhite transition-colors focus-within:border-vlz-red/40 focus-within:ring-2 focus-within:ring-vlz-red/20">
                      <input
                        type="tel"
                        value={contact.whatsapp}
                        onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-transparent px-4 py-3 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                      Company / Organization
                    </label>
                    <div className="rounded-xl border border-black/10 bg-vlz-offwhite transition-colors focus-within:border-vlz-red/40 focus-within:ring-2 focus-within:ring-vlz-red/20">
                      <input
                        type="text"
                        value={contact.company}
                        onChange={(e) => setContact({ ...contact, company: e.target.value })}
                        placeholder="Acme Inc."
                        className="w-full bg-transparent px-4 py-3 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-vlz-gray">
                    Brief Notes on what you'd like to achieve
                  </label>
                  <div className="rounded-xl border border-black/10 bg-vlz-offwhite transition-colors focus-within:border-vlz-red/40 focus-within:ring-2 focus-within:ring-vlz-red/20">
                    <textarea
                      rows={3}
                      value={contact.notes}
                      onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                      placeholder="e.g. Need a modern website with clean booking flow and automated customer onboarding..."
                      className="w-full resize-none bg-transparent px-4 py-2.5 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs text-vlz-gray transition-colors hover:text-vlz-black"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  <PrimaryButton type="submit" disabled={submitting}>
                    {submitting ? 'SAVING...' : 'NEXT: PICK MEETING TIME'}
                  </PrimaryButton>
                </div>
              </motion.form>
            )}

            {/* STEP 3: Calendly Embed */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Compact confirmation banner */}
                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <p className="text-sm leading-snug text-vlz-gray">
                      <strong className="font-semibold text-vlz-black">
                        Thanks{contact.name ? `, ${contact.name}` : ''} — your inquiry is in!
                      </strong>{' '}
                      <span className="text-vlz-gray">
                        Pick a time below, or finish now — totally optional.
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-vlz-black px-5 py-2 text-xs font-medium text-white transition-all hover:bg-vlz-black/85"
                  >
                    <Check size={14} />
                    Done & Return
                  </button>
                </div>

                {/* Embedded Calendly Scheduling Widget with Prefilled Info */}
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-vlz-white">
                  <iframe
                    src={`${SITE_CONFIG.calendlyUrl}?embed_domain=${encodeURIComponent(
                      window.location.hostname
                    )}&embed_type=Inline&background_color=ffffff&text_color=111111&primary_color=f9452d&name=${encodeURIComponent(
                      contact.name
                    )}&email=${encodeURIComponent(contact.email)}&a1=${encodeURIComponent(
                      contact.whatsapp
                    )}`}
                    width="100%"
                    height="620"
                    frameBorder="0"
                    title="Schedule with Hamza Ghouri"
                    className="w-full"
                  />
                </div>

                <span className="flex items-center justify-center gap-1.5 text-center text-xs text-vlz-lightgray">
                  <Clock size={13} />
                  Your name & email are pre-filled automatically on the calendar.
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
