import { ModeProvider } from "@/contexts/ModeContext";
import CrystalBackground from "@/components/CrystalBackground";
import HeroSection from "@/components/HeroSection";
import EmotionRelease from "@/components/EmotionRelease";
import IntegrationSection from "@/components/IntegrationSection";

const Index = () => {
  return (
    <ModeProvider>
      <div className="relative min-h-screen bg-crystal-gradient overflow-x-hidden">
        <CrystalBackground />
        <HeroSection />
        <EmotionRelease />
        <IntegrationSection />
      </div>
    </ModeProvider>
  );
};

export default Index;
