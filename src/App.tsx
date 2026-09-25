import React from 'react';
import { RealEstateProvider, useRealEstate } from './context/RealEstateContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PropertyCategories } from './components/PropertyCategories';
import { BuyRentSections } from './components/BuyRentSections';
import { SellPropertySection } from './components/SellPropertySection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { InvestmentSection } from './components/InvestmentSection';
import { LocationsSection } from './components/LocationsSection';
import { AgentsSection } from './components/AgentsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogGuidesSection } from './components/BlogGuidesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { SeoViewerModal } from './components/SeoViewerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { AiAssistant } from './components/AiAssistant';

const MainLayout: React.FC = () => {
  const { activeTab } = useRealEstate();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      <Header />

      <main className="flex-1">
        {activeTab === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            <HeroSection />
            <FeaturedProperties />
            <PropertyCategories />
            <BuyRentSections />
            <SellPropertySection />
            <ServicesSection />
            <WhyChooseUs />
            <InvestmentSection />
            <LocationsSection />
            <AgentsSection />
            <TestimonialsSection />
            <BlogGuidesSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
      
      {/* Overlays and Modals */}
      <PropertyDetailsModal />
      <ScheduleVisitModal />
      <SeoViewerModal />
      <AiAssistant />
      <FloatingMobileBar />
    </div>
  );
};

export default function App() {
  return (
    <RealEstateProvider>
      <MainLayout />
    </RealEstateProvider>
  );
}
