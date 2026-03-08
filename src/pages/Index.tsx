import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyInvest from "@/components/WhyInvest";
import InvestorReasons from "@/components/InvestorReasons";
import FeaturedProperties from "@/components/FeaturedProperties";
import ROICalculator from "@/components/ROICalculator";
import AIAdvisor from "@/components/AIAdvisor";
import InvestorForm from "@/components/InvestorForm";
import PopularAreas from "@/components/PopularAreas";
import Footer from "@/components/Footer";
import InvestorPopup from "@/components/InvestorPopup";

const Index = () => {

const schema = {
"@context": "https://schema.org",
"@type": "Organization",
"name": "ZanziInvest",
"url": "https://zanzi-invest.vercel.app",
"description": "Zanzibar property investment platform helping international investors discover villas, apartments, and real estate opportunities.",
"areaServed": "Zanzibar",
"sameAs": []
};

return ( <div className="min-h-screen">

```
  <InvestorPopup />

  <Navbar />
  <Hero />
  <WhyInvest />
  <InvestorReasons />
  <FeaturedProperties />
  <ROICalculator />
  <AIAdvisor />
  <InvestorForm />
  <PopularAreas />
  <Footer />

</div>
```

);
};

export default Index;
