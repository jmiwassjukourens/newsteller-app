import HeroGrid from "./components/layouts/HeroGrid";
import TrendingRow from "./components/layouts/TrendingRow";
import BreakingSection from "./components/layouts/BreakingSection";
import CitySection from "./components/layouts/CitySection";

export default async function Home() {
  return (
    <main>
      <HeroGrid />
      <TrendingRow />
      <BreakingSection />
      <CitySection citySlug="los-angeles" title="Los Angeles City File" />
    </main>
  );
}
