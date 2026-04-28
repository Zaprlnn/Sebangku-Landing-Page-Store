import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhySection } from "@/components/home/WhySection";
import { CTABanner } from "@/components/home/CTABanner";
import { BlogPreview } from "@/components/home/BlogPreview";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { MotionSection } from "@/components/motion/MotionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MotionSection>
        <CategorySection />
      </MotionSection>
      <MotionSection>
        <FeaturedProducts />
      </MotionSection>
      <MotionSection>
        <WhySection />
      </MotionSection>
      <MotionSection>
        <CTABanner />
      </MotionSection>
      <MotionSection>
        <BlogPreview />
      </MotionSection>
      <MotionSection>
        <TestimonialSection />
      </MotionSection>
    </>
  );
}
