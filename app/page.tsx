import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import AppShowcase from "@/components/AppShowcase"; //r

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <AppShowcase /> {/* Tani waa qeybtii cusbayd */}
    </main>
  );
}