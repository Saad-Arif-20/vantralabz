import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import IntakeModal from './components/IntakeModal';
import MagneticButton from './components/MagneticButton';

const mapServiceToId = (title?: string): string | undefined => {
  if (!title) return undefined;
  const lower = title.toLowerCase();
  if (lower.includes('brand')) return 'brand-strategy';
  if (lower.includes('web')) return 'web-design';
  if (lower.includes('copy') || lower.includes('writing') || lower.includes('content')) return 'content-copy';
  if (lower.includes('ai') || lower.includes('bot') || lower.includes('automation')) return 'ai-automation';
  return undefined;
};

function App() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

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
      <Hero onOpenIntake={() => handleOpenIntake()} />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection onOpenIntake={(serviceTitle) => handleOpenIntake(serviceTitle)} />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <Footer />

      {/* Floating Schedule / Intake Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <MagneticButton
          onClick={() => handleOpenIntake()}
          className="group flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-white shadow-2xl"
        >
          <Calendar size={16} className="text-white/80 transition-transform group-hover:rotate-12" />
          <span>Book a Call</span>
        </MagneticButton>
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

export default App;
