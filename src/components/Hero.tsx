import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Mail, X } from 'lucide-react';
import heroVideo from '../assets/video/hero.mp4';
import RevealHeading from './RevealHeading';
import MagneticButton from './MagneticButton';

const NEWSLETTER_ENDPOINT = 'https://formspree.io/f/xeajbjza';

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

interface HeroProps {
  onOpenIntake?: () => void;
}

export default function Hero({ onOpenIntake }: HeroProps) {
  const videoRef = useSeamlessVideoLoop();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-28 text-center md:pt-32">
        <RevealHeading
          as="h1"
          trigger="mount"
          className="font-serif-display mb-8 tracking-tight text-white text-5xl sm:text-6xl sm:whitespace-nowrap md:text-8xl lg:text-9xl"
          emphasisClassName="italic"
          segments={[
            { text: 'Build brands that' },
            { text: 'lead.', emphasis: true },
          ]}
        />

        <p className="mb-9 max-w-xl px-4 text-base leading-relaxed text-white/80 md:text-lg">
          We turn early-stage ideas into brand, web, and growth systems that
          make you the obvious choice in your market — not just another
          agency delivering deliverables.
        </p>

        <div className="mb-14 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton
            onClick={onOpenIntake}
            className="rounded-full px-8 py-3.5 text-sm font-medium text-white"
          >
            Book a Call
            <ArrowRight size={16} />
          </MagneticButton>
          <a
            href="#work"
            className="liquid-glass rounded-full px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            View our work
          </a>
        </div>

        <div className="w-full max-w-sm px-4">
          {status === 'sent' ? (
            <p className="text-center text-xs text-white/60">
              You're on the list — welcome aboard.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="liquid-glass flex items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Or get our thinking in your inbox"
                className="w-full bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                aria-label="Subscribe"
                className="shrink-0 rounded-full bg-white/90 p-2 text-black disabled:opacity-60"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-center text-xs text-red-400">
              Something went wrong — please try again in a moment.
            </p>
          )}
        </div>
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
