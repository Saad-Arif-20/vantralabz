import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { Service } from './ServicesSection';
import PrimaryButton from './PrimaryButton';

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
        className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-vlz-dark"
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
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur-sm"
            >
              <X size={18} />
            </button>
            <span className="absolute bottom-4 left-6 text-xs font-semibold uppercase tracking-widest text-vlz-red">
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-vlz-red">
                What's included
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {service.detail.included.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-vlz-red" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-vlz-red">
                You'll walk away with
              </p>
              <div className="flex flex-col gap-2">
                {service.detail.walkAway.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vlz-red" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-vlz-red">
                This is for you if —
              </p>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                {service.detail.forYou}
              </p>
            </div>

            <PrimaryButton onClick={handleBookCall}>BOOK A CALL</PrimaryButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
