import Hero from "@/components/Hero";
import PremiumShowcase from "@/components/PremiumShowcase";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ProductLisitng from "@/components/ProductLisitng";
import BathroomGallery from "@/components/BathroomGallery";
import CanvasOfLuxuryCollage from "@/components/CanvasOfluxury";

const Home = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Hero />
      <PremiumShowcase />
      <BathroomGallery />
      <ProductLisitng />
      <CanvasOfLuxuryCollage />
      <CustomerTestimonials />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default Home;
