import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import logoMark from '../assets/brand/logo-mark.webp';

interface HeaderProps {
  onOpenIntake?: () => void;
}

export default function Header({ onOpenIntake }: HeaderProps) {
  const isTeamPage = window.location.pathname.includes('team');
  const homeHref = isTeamPage ? '/index.html#top' : '#top';

  const NAV_LINKS = [
    { label: 'HOME', href: homeHref },
    { label: 'SERVICES', href: isTeamPage ? '/index.html#services' : '#services' },
    { label: 'ABOUT US', href: '/team.html' },
    { label: 'FAQ', href: isTeamPage ? '/index.html#faq' : '#faq' },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState(isTeamPage ? 'ABOUT US' : 'HOME');

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-[72px]"
    >
      <div className="mx-auto flex max-w-[1296px] items-center justify-between rounded-[28px] bg-vlz-white px-5 py-3 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_12px_30px_-14px_rgba(0,0,0,0.25)] sm:px-6">
        <a href={homeHref} className="flex items-center gap-2" aria-label="Vantralabz home">
          <img src={logoMark} alt="" className="h-6 w-auto sm:h-7" />
          <span
            className="text-[22px] font-semibold tracking-tight text-vlz-black sm:text-[26px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            VANTRALABZ
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full bg-vlz-offwhite p-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'bg-vlz-black text-vlz-white'
                    : 'text-vlz-gray hover:text-vlz-black'
                }`}
                style={{ fontFamily: 'var(--font-expanded)' }}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-vlz-green" aria-hidden />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <PrimaryButton
            className="hidden sm:inline-flex"
            onClick={() => {
              if (onOpenIntake) {
                onOpenIntake();
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            CONTACT US
          </PrimaryButton>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="grid h-10 w-10 place-items-center rounded-full bg-vlz-offwhite text-vlz-black lg:hidden"
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
            className="mx-auto mt-3 flex max-w-[1296px] flex-col gap-1 rounded-2xl bg-vlz-white p-3 shadow-lg lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-vlz-gray transition-colors hover:bg-vlz-offwhite hover:text-vlz-black"
                style={{ fontFamily: 'var(--font-expanded)' }}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntake?.();
              }}
              className="mt-1 rounded-xl bg-vlz-red px-4 py-3 text-left text-sm font-semibold tracking-wide text-vlz-white"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              CONTACT US
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
