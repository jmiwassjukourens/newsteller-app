import HeroGrid from "./components/layouts/HeroGrid";
import TrendingRow from "./components/layouts/TrendingRow";
import BreakingSection from "./components/layouts/BreakingSection";
import CitySection from "./components/layouts/CitySection";
import SubscribeSection from "./components/layouts/SubscribeSection";

export default async function Home() {
  return (
    <main>
      <HeroGrid />
      <TrendingRow />
      <BreakingSection />
      
 
      <SubscribeSection
        title="Subscribe to New Posts"
        description="Join thousands of readers who stay informed with our most important stories every week."
      />

      <CitySection citySlug="los-angeles" title="Los Angeles City File" />
      <SubscribeSection
        variant="image"
        title="Subscribe to New Posts"
        description="Get premium insights, regional intelligence, and exclusive analysis."
        backgroundImageUrl="/assets/subscribe-bg.png" 
      />
      <br></br>
      <br></br>
      
    </main>
  );
}
