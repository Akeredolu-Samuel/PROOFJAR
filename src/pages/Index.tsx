import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import LiveChallengesSection from '@/components/landing/LiveChallengesSection';
import ActivityFeedSection from '@/components/landing/ActivityFeedSection';
import CTASection from '@/components/landing/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <StatsSection />
        <LiveChallengesSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ActivityFeedSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
