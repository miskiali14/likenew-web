import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import AppShowcase from "@/components/AppShowcase";
import Lockers from "@/components/Lockers";
import Services1page from "@/components/Services1page";
import LatestBlogs from "@/components/LatestBlogs";
import GallerySection from "@/components/GallerySection";
import App from "@/components/App";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <Services1page />
      <AppShowcase />
      <Lockers />
       <App />
      <GallerySection />
       <LatestBlogs />
       
    </main>
  );
}