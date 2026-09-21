import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Clock,
  Globe,
  MessageCircle,
  PenTool,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

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

  const handleNextToStep4 = async (e: React.FormEvent) => {
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
      setStep(4);
    } catch {
      setStep(4);
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
          className="liquid-glass relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 text-white shadow-2xl"
        >
          {/* Top Bar / Progress */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-serif-display text-xl tracking-wide text-white">
                Vantralabz
              </span>
              <span className="hidden text-xs text-white/40 sm:inline">•</span>
              <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                {step === 1 && 'Step 1 of 4: Select Services'}
                {step === 2 && 'Step 2 of 4: Project Scope'}
                {step === 3 && 'Step 3 of 4: Contact Info'}
                {step === 4 && 'Step 4 of 4: Schedule Meeting'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Step indicator pills */}
              <div className="hidden gap-1.5 sm:flex">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === i
                        ? 'w-6 bg-white'
                        : step > i
                        ? 'w-3 bg-white/60'
                        : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={onClose}
                aria-label="Close intake"
                className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {/* STEP 1: Services */}
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
                  <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    What can we help you build?
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Select all services that align with your current goals.
                  </p>
                </div>

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
                            ? 'border border-white/40 bg-white/10 shadow-lg'
                            : 'border border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div
                          className={`rounded-xl p-2.5 transition-colors ${
                            isSelected ? 'bg-white text-black' : 'bg-white/5 text-white/70'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-white">{item.title}</h3>
                            {isSelected && (
                              <span className="rounded-full bg-white/20 p-1 text-white">
                                <Check size={12} />
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-white/50">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Project Scope & Situation */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    Tell us about your current status
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    This helps us prepare specific insights before our call.
                  </p>
                </div>

                {/* Situation radio cards */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
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
                            ? 'border border-white/40 bg-white/10 text-white'
                            : 'border border-white/5 bg-white/[0.02] text-white/70 hover:bg-white/5'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Existing Website Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    Existing Website or Store URL (Optional)
                  </label>
                  <div className="liquid-glass rounded-xl">
                    <input
                      type="text"
                      value={currentWebsite}
                      onChange={(e) => setCurrentWebsite(e.target.value)}
                      placeholder="e.g. yourcompany.com"
                      className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Timeline selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
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
                            ? 'border border-white/40 bg-white/10 text-white'
                            : 'border border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-white"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact Info */}
            {step === 3 && (
              <motion.form
                key="step3"
                onSubmit={handleNextToStep4}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    Who should Hamza connect with?
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    We'll use this to send confirmation details and prepare your project breakdown.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      Your Name *
                    </label>
                    <div className="liquid-glass rounded-xl">
                      <input
                        type="text"
                        required
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      Work Email *
                    </label>
                    <div className="liquid-glass rounded-xl">
                      <input
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-white/50">
                      <span>WhatsApp / Phone Number</span>
                      <span className="text-[10px] text-emerald-400 lowercase">for instant callback</span>
                    </label>
                    <div className="liquid-glass rounded-xl">
                      <input
                        type="tel"
                        value={contact.whatsapp}
                        onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      Company / Organization
                    </label>
                    <div className="liquid-glass rounded-xl">
                      <input
                        type="text"
                        value={contact.company}
                        onChange={(e) => setContact({ ...contact, company: e.target.value })}
                        placeholder="Acme Inc."
                        className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    Brief Notes on what you'd like to achieve
                  </label>
                  <div className="liquid-glass rounded-xl">
                    <textarea
                      rows={3}
                      value={contact.notes}
                      onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                      placeholder="e.g. Need a modern website with clean booking flow and automated customer onboarding..."
                      className="w-full resize-none bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-white"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-white/90 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Next: Pick Meeting Time'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 4: Calendly Embed + WhatsApp Callback */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Big, Clear Confirmation Banner */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-white">
                            Your Project Inquiry Has Been Received!
                          </h3>
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                            Sent to Team
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-white/70">
                          Thanks, <strong className="text-white">{contact.name || 'there'}</strong>. We’ve sent your details to Hamza & the team.
                          <br />
                          <span className="text-white/50">
                            <strong>Optional:</strong> Pick a calendar slot below (we pre-filled your name & email), ping Hamza on WhatsApp, or finish now.
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:self-center">
                      <a
                        href={`https://wa.me/15550192834?text=${encodeURIComponent(
                          `Hi Hamza, I'm ${contact.name}. I just submitted my project inquiry on Vantralabz and wanted to connect here.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20"
                      >
                        <MessageCircle size={15} className="text-emerald-400" />
                        Ping on WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-medium text-black transition-all hover:bg-white/90"
                      >
                        <Check size={14} />
                        Done & Return
                      </button>
                    </div>
                  </div>
                </div>

                {/* Embedded Calendly Scheduling Widget with Prefilled Info */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-inner">
                  <iframe
                    src={`${SITE_CONFIG.calendlyUrl}?embed_domain=${encodeURIComponent(
                      window.location.hostname
                    )}&embed_type=Inline&background_color=0a0a0a&text_color=ffffff&primary_color=10b981&name=${encodeURIComponent(
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

                <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    Your name & email are pre-filled automatically on the calendar.
                  </span>

                  <button
                    onClick={onClose}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Done / Return to Website
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
