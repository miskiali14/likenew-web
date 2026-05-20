import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import AppShowcase from "@/components/AppShowcase";
import Lockers from "@/components/Lockers"; //r
import Services1page from "@/components/Services1page";
import Express from "@/components/Express"; 
import Delivery from "@/components/Delivery"; 
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />

      <AboutSection />
      <Services1page />
      <AppShowcase />
      
       < Express/>
       <Delivery />
       <Lockers />
       {/* Tani waa qeybtii cusbayd */}
    </main>
  );
}