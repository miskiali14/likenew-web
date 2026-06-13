import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import AppShowcase from "@/components/AppShowcase";
import Lockers from "@/components/Lockers";
import Services1page from "@/components/Services1page";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <Services1page />
      <AppShowcase />
      <Lockers />
    </main>
  );
}