import PageLayout from './components/PageLayout';
import Hero from './components/Hero';
import WordmarkDivider from './components/WordmarkDivider';
import DesignTechSection from './components/DesignTechSection';
import BrandMarquee from './components/BrandMarquee';
import WhatSetsUsApartSection from './components/WhatSetsUsApartSection';
import ProcessSection from './components/ProcessSection';
import TeamSection from './components/TeamSection';
import FAQSection from './components/FAQSection';
import PricingSection from './components/PricingSection';
import GlobalReachSection from './components/GlobalReachSection';
import ContactSection from './components/ContactSection';
import SectionDivider from './components/SectionDivider';

function App() {
  return (
    <PageLayout>
      {(openIntake) => (
        <>
          <Hero onOpenIntake={() => openIntake()} />
          <WordmarkDivider />
          <DesignTechSection onOpenIntake={(serviceTitle) => openIntake(serviceTitle)} />
          <BrandMarquee />
          <WhatSetsUsApartSection />
          <SectionDivider label="THE PROCESS" />
          <ProcessSection />
          <SectionDivider label="TEAM MEMBERS" />
          <TeamSection />
          <SectionDivider label="FAQ" />
          <FAQSection />
          <SectionDivider label="PRICING $ PLAN" />
          <PricingSection />
          <GlobalReachSection />
          <SectionDivider label="CONTACT" />
          <ContactSection />
        </>
      )}
    </PageLayout>
  );
}

export default App;
