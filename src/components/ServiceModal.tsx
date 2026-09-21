import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import type { Service } from './ServicesSection';

export default function ServiceModal({
  service,
  onClose,
  onOpenIntake,
}: {
  service: Service;
  onClose: () => void;
  onOpenIntake?: (serviceTitle?: string) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const handleBookCall = () => {
    onClose();
    if (onOpenIntake) {
      setTimeout(() => {
        onOpenIntake(service.title);
      }, 50);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="liquid-glass w-full max-w-3xl overflow-hidden rounded-3xl"
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="liquid-glass absolute right-4 top-4 rounded-full p-2 text-white"
            >
              <X size={18} />
            </button>
            <span className="absolute bottom-4 left-6 text-xs uppercase tracking-widest text-white/70">
              {service.tag}
            </span>
          </div>

          <div className="p-6 md:p-10">
            <h3
              id="service-modal-title"
              className="mb-4 tracking-tight text-white text-2xl md:text-4xl"
            >
              {service.title}
            </h3>

            <p className="font-serif-display mb-4 text-xl italic text-white/80 md:text-2xl">
              {service.detail.hook}
            </p>

            <p className="mb-8 text-sm leading-relaxed text-white/70 md:text-base">
              {service.detail.intro}
            </p>

            <div className="mb-8">
              <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
                What's included
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {service.detail.included.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-white/60" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
                You'll walk away with
              </p>
              <div className="flex flex-col gap-2">
                {service.detail.walkAway.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/50">
                This is for you if —
              </p>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                {service.detail.forYou}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBookCall}
              className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Book a Call
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
