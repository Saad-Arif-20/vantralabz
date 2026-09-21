import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import IntakeModal from './components/IntakeModal';

function App() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

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
    if (window.location.hash === '#intake') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="relative bg-black">
      <Hero onOpenIntake={() => setIsIntakeOpen(true)} />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <FAQSection />
      <ContactSection />
      <Footer />

      {/* Floating Schedule / Intake Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="liquid-glass group flex cursor-pointer items-center gap-2.5 rounded-full border border-white/20 bg-neutral-900/80 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-white/40 hover:bg-neutral-800"
        >
          <Calendar size={16} className="text-white/80 transition-transform group-hover:rotate-12" />
          <span>Book a Call</span>
        </button>
      </div>

      {/* Multi-step Intake & Calendly Scheduler Modal */}
      <IntakeModal isOpen={isIntakeOpen} onClose={handleCloseIntake} />
    </div>
  );
}

export default App;
