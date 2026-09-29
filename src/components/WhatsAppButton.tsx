import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE_CONFIG } from '../config/site';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
      <path d="M16.04 4C9.4 4 4 9.37 4 15.98c0 2.11.56 4.16 1.62 5.98L4 28l6.24-1.6a12.1 12.1 0 0 0 5.8 1.47h.01c6.64 0 12.03-5.37 12.03-11.98A11.9 11.9 0 0 0 16.04 4Zm0 21.9h-.01a10 10 0 0 1-5.09-1.39l-.36-.21-3.7.95.99-3.57-.24-.37a9.86 9.86 0 0 1-1.52-5.32c0-5.47 4.48-9.92 9.95-9.92a9.9 9.9 0 0 1 9.94 9.93c0 5.47-4.48 9.92-9.96 9.92Zm5.46-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.37-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default function WhatsAppButton({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-full ml-4 hidden whitespace-nowrap rounded-xl bg-vlz-black px-4 py-2.5 shadow-xl sm:block"
            role="tooltip"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-vlz-green" aria-hidden />
              Talk to us on WhatsApp!
            </span>
            <span
              className="absolute right-full top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-vlz-black"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 ${className ?? ''}`}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
