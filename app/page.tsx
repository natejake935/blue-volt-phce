import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AreaAvailability from "@/components/home/AreaAvailability";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";
import TrustBand from "@/components/home/TrustBand";
import TeamSection from "@/components/home/TeamSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
import BottomCTA from "@/components/home/BottomCTA";
import MobileStickyBar from "@/components/home/MobileStickyBar";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <AreaAvailability />
        <TrustBand />
        <ServicesSection />
        <ReviewsSection />
        <TeamSection />
        <ServiceAreaSection />
        <BottomCTA />
      </main>
      <Footer />
      {/* Mobile sticky bottom CTA bar */}
      <MobileStickyBar />
      {/* Bottom padding on mobile to clear sticky bar */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
