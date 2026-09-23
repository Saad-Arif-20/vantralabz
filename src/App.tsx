import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WordmarkDivider from './components/WordmarkDivider';
import DesignTechSection from './components/DesignTechSection';
import WhatSetsUsApartSection from './components/WhatSetsUsApartSection';
import WorkThatSpeaksSection from './components/WorkThatSpeaksSection';
import ProcessSection from './components/ProcessSection';
import TeamSection from './components/TeamSection';
import FAQSection from './components/FAQSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import IntakeModal from './components/IntakeModal';
import PrimaryButton from './components/PrimaryButton';

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
      <WordmarkDivider />
      <DesignTechSection />
      <SectionDivider label="SELECTED CLIENTS" />
      <WhatSetsUsApartSection />
      <WorkThatSpeaksSection />
      <SectionDivider label="THE PROCESS" />
      <ProcessSection />
      <SectionDivider label="TEAM MEMBERS" />
      <TeamSection />
      <SectionDivider label="FAQ" />
      <FAQSection />
      <SectionDivider label="PRICING $ PLAN" />
      <PricingSection />
      <SectionDivider label="CONTACT" />
      <ContactSection />
      <Footer />

      {/* Floating Schedule / Intake Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <PrimaryButton onClick={() => handleOpenIntake()} className="shadow-2xl">
          BOOK A CALL
        </PrimaryButton>
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
