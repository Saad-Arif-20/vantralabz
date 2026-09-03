import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Globe, Mail, Menu, X } from 'lucide-react';
import heroVideo from '../assets/video/hero.mp4';

const NEWSLETTER_ENDPOINT = 'https://formspree.io/f/xeajbjza';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

function useSeamlessVideoLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    const startedRef = { current: false };
    const fadingOutRef = { current: false };

    const animateOpacity = (from: number, to: number, duration: number) => {
      cancelAnimationFrame(rafId);
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        video.style.opacity = String(from + (to - from) * t);
        if (t < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && remaining >= 0) {
        fadingOutRef.current = true;
        const current = parseFloat(video.style.opacity || '1');
        animateOpacity(current, 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      window.setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        video.play().catch(() => {});
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return videoRef;
}

export default function Hero() {
  const videoRef = useSeamlessVideoLoop();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('sent');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        style={{ opacity: 0 }}
        src={heroVideo}
        muted
        autoPlay
        playsInline
        preload="auto"
      />

      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center">
            <Globe className="text-white" size={24} />
            <span className="ml-2 text-lg font-semibold text-white">
              Vantralabz
            </span>
            <div className="ml-8 hidden items-center gap-8 md:flex">
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
            <a
              href="#contact"
              className="liquid-glass rounded-full px-4 py-2 text-sm font-medium text-white sm:px-6"
            >
              Book a Call
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="liquid-glass rounded-full p-2.5 text-white md:hidden"
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
              className="liquid-glass mx-auto mt-3 flex max-w-5xl flex-col gap-1 rounded-2xl p-3 md:hidden"
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
      </nav>

      <div className="relative z-10 flex flex-1 translate-y-0 flex-col items-center justify-center px-6 py-12 text-center md:-translate-y-[20%]">
        <h1
          className="font-serif-display mb-8 tracking-tight text-white text-5xl sm:text-6xl sm:whitespace-nowrap md:text-8xl lg:text-9xl"
        >
          Build brands that <em className="italic">lead</em>.
        </h1>

        {status === 'sent' ? (
          <div className="liquid-glass mb-6 flex w-full max-w-xl items-center justify-center rounded-full px-6 py-3">
            <p className="text-sm font-medium text-white">
              You're on the list — welcome aboard.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="liquid-glass mb-6 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-6 pr-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              aria-label="Subscribe"
              className="rounded-full bg-white p-3 text-black disabled:opacity-60"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mb-4 max-w-xl px-4 text-sm text-red-400">
            Something went wrong — please try again in a moment.
          </p>
        )}

        <p className="max-w-xl px-4 text-sm leading-relaxed text-white">
          Get fresh brand, design, and growth ideas from Vantralabz — straight
          to your inbox. No fluff, just thinking that moves the needle.
        </p>

        <a
          href="#about"
          className="liquid-glass mt-8 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          Manifesto
        </a>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[
          { icon: Mail, label: 'Email' },
          { icon: X, label: 'X (Twitter)' },
          { icon: Globe, label: 'Website' },
        ].map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}
