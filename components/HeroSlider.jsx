"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, MapPin, Phone, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_SLIDES = [
  { src: "/images/slide1.png", title: "Expert Care" },
  { src: "/images/slide2.png", title: "Fast Delivery" },
  { src: "/images/slide3.jpg", title: "Eco Friendly" },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowOrderPopup(true);
    }, 2500);
    return () => clearTimeout(popupTimer);
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-neutral-950 font-sans">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={HERO_SLIDES[currentSlide].src} 
              fill
              priority
              // XALKA: Background sawirku wuxuu markasta qaataa 100% ballaca shaashadda
              sizes="100vw"
              className="object-cover" 
              alt={HERO_SLIDES[currentSlide].title} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
        
        {/* LEFT: Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-center md:text-left"
        >
          <motion.span 
            initial={{ letterSpacing: "0.2em", opacity: 0 }}
            animate={{ letterSpacing: "0.5em", opacity: 1 }}
            className="text-[10px] md:text-xs font-black uppercase mb-4 block text-purple-400"
          >
            Laundry & Dry Cleaning
          </motion.span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-8">
            HIGHLY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-gray-500">
              PROFESSIONAL
            </span> <br />
            STAFF
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="h-[2px] w-12 bg-red-600"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Quality Guaranteed</span>
          </div>
        </motion.div>

        {/* RIGHT: Order Pop-up */}
        <AnimatePresence>
          {showOrderPopup && (
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl w-full max-w-[360px] overflow-hidden hidden lg:block border border-white/20 p-2"
            >
              <div className="relative h-44 w-full rounded-[1.8rem] overflow-hidden">
                <Image 
                  src="/images/pop.png" 
                  fill 
                  // XALKA: Pop-up sawirku waa yar yahay, qiyaas ahaan 360px desktop-ka
                  sizes="(max-width: 1024px) 0px, 360px"
                  className="object-cover" 
                  alt="Promo" 
                />
                <button 
                  onClick={() => setShowOrderPopup(false)} 
                  className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white rounded-full p-2 hover:bg-red-600 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-8 py-8 text-center text-white">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">Quick Order</h3>
                <div className="space-y-3 mb-6">
                  <input type="text" placeholder="Address" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-xs outline-none focus:bg-white/20 transition-all placeholder:text-white/30" />
                  <input type="text" placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-xs outline-none focus:bg-white/20 transition-all placeholder:text-white/30" />
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-purple-500/20 text-center flex justify-center items-center">
                  Send Request
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>

      {/* --- SLIDE NAVIGATION --- */}
      <div className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-4 text-center">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="group flex items-center gap-4 text-left"
          >
            <div className={`h-[2px] transition-all duration-500 ${i === currentSlide ? "w-12 bg-purple-500" : "w-6 bg-white/20 group-hover:bg-white/50"}`}></div>
            <span className={`text-[10px] font-black transition-opacity ${i === currentSlide ? "opacity-100 text-white" : "opacity-0"}`}>0{i + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}