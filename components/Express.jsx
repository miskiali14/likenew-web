"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // 1. Tani waa muhiim
import { 
  Phone, ChevronRight, Truck, 
  Zap, PackageCheck, MousePointerClick,
  Smartphone, Apple, Play
} from "lucide-react";
import Navbar from "@/components/Navbar";

const steps = [
  { 
    id: 1, 
    title: "Place Your Order", 
    desc: "Call or order online", 
    icon: <MousePointerClick size={24} /> 
  },
  { 
    id: 2, 
    title: "We Pick Up", 
    desc: "Free pickup from your door", 
    icon: <Truck size={24} /> 
  },
  { 
    id: 3, 
    title: "Express Cleaning", 
    desc: "Done in ~24 hours", 
    icon: <Zap size={24} /> 
  },
  { 
    id: 4, 
    title: "We Deliver", 
    desc: "Next day delivery", 
    icon: <PackageCheck size={24} /> 
  }
];

export default function ExpressCleaningPage() {
  const router = useRouter(); // 2. Qeex router halkan

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* --- PREMIUM HERO SECTION --- */}
      <section className="bg-gradient-to-br from-[#6B448A] to-[#4C2F63] pt-40 pb-24 px-6 text-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest"
            >
              ✨ Ready in 24 Hours
            </motion.span>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
              EXPRESS <br /> 
              <span className="text-purple-200">CLEANING</span>
            </h1>
            
            <p className="text-lg opacity-80 max-w-md leading-relaxed font-medium">
              Need it fast? Our premium express service returns your garments crisp and clean in just 24 hours.
            </p>
            
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-black/10 transition-all flex items-center gap-3"
              >
                <Phone size={18} /> Call Us Now
              </motion.button>

              {/* 3. Badhanka view services hadda wuu shaqaynayaa */}
              <button 
                onClick={() => router.push("/services1page")}
                className="group text-white border border-white/30 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white/10 transition-all"
              >
                View Services <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Side Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="bg-black/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Smartphone size={150} />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-black uppercase mb-2 italic">Need it fast?</h2>
                <h3 className="text-2xl font-bold text-purple-200 mb-6">READY IN 1 DAY</h3>
                <div className="flex gap-2 mb-8 text-white">
                  {["Express", "Cleaning", "24 Hours"].map((tag, i) => (
                    <span key={i} className="text-[10px] bg-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-[10px] text-gray-400 mb-8 font-black uppercase tracking-[0.2em]">Available with double charge</p>
                
                <motion.button 
                  whileHover={{ backgroundColor: "#fff", color: "#000" }}
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm w-full mb-8 transition-colors"
                >
                  Get Started
                </motion.button>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-black/60 transition-all text-white">
                    <Apple size={16} /> <span className="text-[10px] font-bold">App Store</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-black/60 transition-all text-white">
                    <Play size={16} fill="white" /> <span className="text-[10px] font-bold">Google Play</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic border-l-8 border-purple-700 pl-6 text-slate-900">
              How It Works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            <div className="hidden lg:block absolute top-12 left-20 right-20 h-0.5 bg-slate-100 -z-10" />
            
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="w-24 h-24 bg-white border border-slate-100 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-sm group-hover:shadow-2xl group-hover:bg-purple-700 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                  <div className="transition-colors duration-500 text-purple-700 group-hover:text-white">
                    {step.icon}
                  </div>
                </div>
                <h4 className="font-black uppercase text-sm tracking-tight mb-2 text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Action Notification Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-24 bg-purple-50/50 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 border border-purple-100/50 shadow-sm"
          >
            <div className="w-16 h-16 bg-purple-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-200 shrink-0">
              <Phone size={24} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-purple-950 uppercase text-sm mb-2 tracking-widest">Place Your Order Seamlessly</h4>
              <p className="text-sm text-purple-800/70 font-medium leading-relaxed max-w-3xl">
                Ready to experience speed? Call our priority line at <span className="font-black text-purple-950">+252 617372514</span> or use the mobile app. Select "Express VIP" to ensure your order gets 24-hour priority.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}