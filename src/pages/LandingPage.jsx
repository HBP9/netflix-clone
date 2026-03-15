import FeatureCards from "../components/FeatureCards";
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
    </>
  );
};

export default LandingPage;
