import { LandingHeader } from "./LandingHeader";
import { HeroSection } from "./HeroSection";
import { TrustStrip } from "./TrustStrip";
import { AssessmentSection } from "./AssessmentSection";
import { EvaluationProcess } from "./EvaluationProcess";
import { BenefitsSection } from "./BenefitsSection";
import { WhyParisiSection } from "./WhyParisiSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "./FAQSection";
import { FormSection } from "./FormSection";
import { LocationSection } from "./LocationSection";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { LandingFooter } from "./LandingFooter";

export function FreeEvaluationPage() {
  return (
    <div id="top" className="min-h-svh bg-canvas pb-16 lg:pb-0">
      <LandingHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <AssessmentSection />
        <EvaluationProcess />
        <BenefitsSection />
        <WhyParisiSection />
        <Testimonials />
        <FAQSection />
        <FormSection />
        <LocationSection />
      </main>
      <LandingFooter />
      <MobileStickyCTA />
    </div>
  );
}
