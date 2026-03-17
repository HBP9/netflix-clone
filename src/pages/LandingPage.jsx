import FAQ from "../components/FAQ";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TrendingRow from "../components/TrendingRow";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrendingRow />
      <FeatureCards />
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;
