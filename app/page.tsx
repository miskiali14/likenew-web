import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import AppShowcase from "@/components/AppShowcase";
import Lockers from "@/components/Lockers"; //r

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <AppShowcase />
      <Lockers />
       {/* Tani waa qeybtii cusbayd */}
    </main>
  );
}