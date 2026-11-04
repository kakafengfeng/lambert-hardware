import { Header } from "@/components/lambert/Header";
import { Hero } from "@/components/lambert/Hero";
import { SeriesSection } from "@/components/lambert/SeriesSection";
import { FeaturedProducts } from "@/components/lambert/FeaturedProducts";
import { WhyLambert } from "@/components/lambert/WhyLambert";
import { CtaBand } from "@/components/lambert/CtaBand";
import { Footer } from "@/components/lambert/Footer";

/** LAMBERT homepage — Phase 1 style preview. Standalone pages arrive in Phase 2. */
export default function Home() {
  return (
    <main className="w-full overflow-x-clip bg-paper">
      <Header />
      <Hero />
      <SeriesSection />
      <FeaturedProducts />
      <WhyLambert />
      <CtaBand />
      <Footer />
    </main>
  );
}
