import Nav2 from './components/Nav2';
import Hero2 from './components/Hero2';
import PainSection from './components/PainSection';
import PhotoGallery from './components/PhotoGallery';
import HowItWorks from './components/HowItWorks';
import BenefitsSection from './components/BenefitsSection';
import AppPreview from './components/AppPreview';
import CoachSection from './components/CoachSection';
import AISimple from './components/AISimple';
import AutoSimple from './components/AutoSimple';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import PricingSimple from './components/PricingSimple';
import CTAStrong from './components/CTAStrong';
import FAQSection from './components/FAQSection';
import Footer2 from './components/Footer2';

export const APP_URL = 'https://miguelggdev.github.io/speedskatetrack/';

export default function App() {
  return (
    <div className="landing-page min-h-screen">
      <Nav2 />
      <Hero2 />
      <PainSection />
      <PhotoGallery />
      <HowItWorks />
      <BenefitsSection />
      <AppPreview />
      <CoachSection />
      <AISimple />
      <AutoSimple />
      <BeforeAfter />
      <Testimonials />
      <PricingSimple />
      <CTAStrong />
      <FAQSection />
      <Footer2 />
    </div>
  );
}
