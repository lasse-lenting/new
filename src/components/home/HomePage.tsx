import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import SalonCTA from "./SalonCTA";
import TestimonialsSection from "./TestimonialsSection";

export default function HomePage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
      <SalonCTA />
      <TestimonialsSection />
    </div>
  );
}
