import { LandingHeader } from "./LandingHeader";
import { HeroSection } from "./HeroSection";
import { TrustStrip } from "./TrustStrip";
import { AssessmentSection } from "./AssessmentSection";
import { EvaluationProcess } from "./EvaluationProcess";
import { BenefitsSection } from "./BenefitsSection";
import { WhyParisiSection } from "./WhyParisiSection";
import { ParentResultsSection } from "./ParentResultsSection";
import { FAQSection } from "./FAQSection";
import { BookingSection } from "./BookingSection";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { LandingFooter } from "./LandingFooter";

export function FreeEvaluationPage() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <AssessmentSection />
        <EvaluationProcess />
        <BenefitsSection />
        <WhyParisiSection />
        <ParentResultsSection />
        <FAQSection />
        <BookingSection />
      </main>
      <LandingFooter />
      <MobileStickyCTA />
    </div>
  );
}
