"use client";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import { motion, useScroll, useSpring } from "framer-motion";
import { Users, Sparkles, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  // Progress bar oo xagga sare ka muuqanaya marka qofku scroll sameeyo
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-[#fcfcfc] selection:bg-purple-200 selection:text-purple-900">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-purple-600 z-[100] origin-left" style={{ scaleX }} />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/images/xarunta.jpeg" 
            alt="About Hero" 
            className="w-full h-full object-cover"
          />
          {/* Overlay ka sii qurux badan */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block"
          >
            Since 2026
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]"
          >
            Like<span className="text-purple-500">New</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-xs md:text-sm mt-8 max-w-lg mx-auto uppercase tracking-widest leading-relaxed font-medium"
          >
            We don't just wash clothes; we restore confidence through premium fabric care and innovation.
          </motion.p>
        </div>
      </section>

      {/* --- ABOUT SECTION (OVERLAP) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-20 -mt-24"
      >
        <AboutSection />
      </motion.div>

      {/* --- CUSUB: Why Choose Us (Icon-yada oo leh Hover Effect) --- */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                title: "Eco-Friendly", 
                desc: "We use biodegradable detergents that are safe for your skin and the planet.",
                icon: <Sparkles className="w-8 h-8" />
              },
              { 
                title: "Expert Handling", 
                desc: "Our team is trained to handle delicate fabrics with specialized care.",
                icon: <ShieldCheck className="w-8 h-8" />
              },
              { 
                title: "Swift Delivery", 
                desc: "Get your clothes back in as little as 24 hours with our express service.",
                icon: <Clock className="w-8 h-8" />
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="space-y-4 border-l-2 border-purple-100 pl-6"
              >
                <div className="text-purple-600">{feature.icon}</div>
                <h3 className="text-xl font-black uppercase text-gray-900 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (CTA) - Modern Design --- */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#4c1d95] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <h2 className="relative z-10 text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              Your clothes deserve <br /> a fresh start.
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 bg-white text-purple-900 px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] inline-flex items-center gap-3 group"
            >
              Start Your Order <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-black uppercase tracking-tighter text-gray-900">
            Like<span className="text-purple-600">New</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            © 2026 Crafted with Passion.
          </p>
        </div>
      </footer>
    </main>
  );
}