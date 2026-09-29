import { useEffect, useRef, useState, type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import IntakeModal from './IntakeModal';
import PrimaryButton from './PrimaryButton';
import WhatsAppButton from './WhatsAppButton';

const mapServiceToId = (title?: string): string | undefined => {
  if (!title) return undefined;
  const lower = title.toLowerCase();
  if (lower.includes('brand')) return 'brand-strategy';
  if (lower.includes('web')) return 'web-design';
  if (lower.includes('copy') || lower.includes('writing') || lower.includes('content')) return 'content-copy';
  if (lower.includes('ai') || lower.includes('bot') || lower.includes('automation')) return 'ai-automation';
  return undefined;
};

interface PageLayoutProps {
  children: (openIntake: (serviceTitle?: string) => void) => ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [hideFloatingCta, setHideFloatingCta] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHideFloatingCta(entry.isIntersecting),
      { rootMargin: '0px 0px -100px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOpenIntake = (serviceTitle?: string) => {
    setSelectedServiceId(mapServiceToId(serviceTitle));
    setIsIntakeOpen(true);
  };

  useEffect(() => {
    const checkRoute = () => {
      const isIntakeRoute =
        window.location.pathname.toLowerCase().includes('/intake') ||
        window.location.hash === '#intake';
      if (isIntakeRoute) {
        setIsIntakeOpen(true);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === '#intake') return;

    // The browser's native "scroll to fragment on load" fires before React
    // has painted anything (the initial HTML is just an empty #root), so it
    // finds nothing to scroll to and silently gives up - landing every
    // cross-page #anchor link at the very top of the page instead. Once
    // mounted, do it ourselves.
    const id = hash.slice(1);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 'auto' (instant), not 'smooth': ProcessSection's scroll-linked
        // accordion resizes the page mid-flight for any target past it,
        // which derails an animated scroll before it reaches the target.
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleCloseIntake = () => {
    setIsIntakeOpen(false);
    setSelectedServiceId(undefined);
    if (window.location.hash === '#intake') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="relative bg-vlz-offwhite">
      <Header onOpenIntake={() => handleOpenIntake()} />
      {children(handleOpenIntake)}
      <div ref={footerRef}>
        <Footer />
      </div>

      {/* Floating Schedule / Intake Quick Action Button */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-opacity duration-300 ${
          hideFloatingCta ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <PrimaryButton onClick={() => handleOpenIntake()} className="shadow-2xl">
          BOOK A CALL
        </PrimaryButton>
      </div>

      {/* Floating WhatsApp direct-message button - no form, just opens a chat */}
      <div
        className={`fixed bottom-6 left-6 z-40 transition-opacity duration-300 ${
          hideFloatingCta ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <WhatsAppButton />
      </div>

      {/* Multi-step Intake & Calendly Scheduler Modal */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={handleCloseIntake}
        initialService={selectedServiceId}
      />
    </div>
  );
}
