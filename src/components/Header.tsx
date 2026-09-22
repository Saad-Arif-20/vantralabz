import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

interface HeaderProps {
  onOpenIntake?: () => void;
}

export default function Header({ onOpenIntake }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const barPadding = useTransform(scrollY, [0, 120], [24, 12]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      style={{ paddingTop: barPadding, paddingBottom: barPadding }}
      className="fixed inset-x-0 top-0 z-50 px-6 transition-[background,backdrop-filter] duration-300"
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3 transition-colors duration-300 ${
          scrolled
            ? 'liquid-glass bg-black/50 backdrop-blur-xl'
            : 'liquid-glass'
        }`}
      >
        <div className="flex items-center">
          <a href="#" className="flex items-center" aria-label="Vantralabz home">
            <Globe className="text-white" size={24} />
            <span className="ml-2 text-lg font-semibold text-white">
              Vantralabz
            </span>
          </a>
          <div className="ml-8 hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            className="hidden text-sm font-medium text-white transition-colors hover:text-white/80 sm:inline"
          >
            Contact
          </a>
          <MagneticButton
            onClick={() => {
              if (onOpenIntake) {
                onOpenIntake();
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="rounded-full px-4 py-2 text-sm font-medium text-white sm:px-6"
          >
            Book a Call
          </MagneticButton>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="liquid-glass rounded-full p-2.5 text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="liquid-glass mx-auto mt-3 flex max-w-5xl flex-col gap-1 rounded-2xl bg-black/70 p-3 backdrop-blur-xl lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
