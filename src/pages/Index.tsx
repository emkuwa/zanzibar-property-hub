import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyInvest from "@/components/WhyInvest";
import FeaturedProperties from "@/components/FeaturedProperties";
import ROICalculator from "@/components/ROICalculator";
import AIAdvisor from "@/components/AIAdvisor";
import InvestorForm from "@/components/InvestorForm";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyInvest />
      <FeaturedProperties />
      <ROICalculator />
      <AIAdvisor />
      <InvestorForm />
      <DeveloperSection />
      <Footer />
    </div>
  );
};

export default Index;
