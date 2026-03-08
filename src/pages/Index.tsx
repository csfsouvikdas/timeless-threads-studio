import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomDesignCTA from "@/components/CustomDesignCTA";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BrandStory />
      <HowItWorks />
      <FeaturedProducts />
      <CustomDesignCTA />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
