import HeroSection from "@/components/HeroSection/HeroSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Insta from "@/components/Insta/Insta";
import { ProductCard } from "@/components/ProductCard3/ProductCard";
import { products } from "@/constants/products";

const MainPage = () => {
  return (
    <>
     
      <HeroSection />
      <FeaturesSection />
      <ProductCard products={products} />
      <Insta />
      <FeedbackSection />
    </>
  );
};

export default MainPage;
