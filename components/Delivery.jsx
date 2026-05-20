"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // 1. Soo dhoweyso Router-ka
import { 
  Phone, ChevronRight, Truck, 
  CheckCircle2, Star, Home
} from "lucide-react";
import Navbar from "@/components/Navbar";

const deliveryProcess = [
  { 
    id: 1, 
    title: "order", 
    desc: "Order via website, app", 
    icon: <CheckCircle2 className="text-white" size={24} />,
    bgColor: "bg-[#6B448A]" 
  },
  { 
    id: 2, 
    title: "Clean & Care", 
    desc: "Professional fabric", 
    icon: <Star className="text-white" size={24} />,
    bgColor: "bg-[#6B448A]" 
  },
  { 
    id: 3, 
    title: "pick up", 
    desc: "Convenient doorstep", 
    icon: <Truck className="text-white" size={24} />,
    bgColor: "bg-[#6B448A]" 
  },
  { 
    id: 4, 
    title: "Delivery", 
    desc: "Return to your door", 
    icon: <Home className="text-white" size={24} />,
    bgColor: "bg-[#6B448A]" 
  }
];

export default function DeliveryPage() {
  const router = useRouter(); // 2. Qeex router-ka gudaha component-ga

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#6B448A] pt-36 pb-20 px-6 text-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="bg-white/20 border border-white/30 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              Free Delivery
            </span>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
              FRESHNESS DELIVERED <br /> 
              <span className="text-purple-200">TO YOUR DOOR</span>
            </h1>
            
            <p className="text-xs opacity-80 max-w-sm leading-relaxed font-bold uppercase">
              Free pickup and delivery from 9:00 to 22:00 for all services handled with care from door to door.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button className="bg-white text-purple-900 px-8 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                <Phone size={14} /> call us
              </button >

              {/* 3. Bedel badhanka halkan */}
              <button 
                onClick={() => router.push("/services1page")}
                className="text-white border border-white/50 px-8 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white hover:text-purple-900 transition-all"
              >
                View Services <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.img 
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              src="images/delivery.png" 
              alt="Delivery Service"
              className="w-full max-w-lg drop-shadow-2xl object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* ... Qaybaha kale sidoodii u daa ... */}
      <section className="px-6 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto bg-purple-50 border border-purple-100 p-5 rounded-2xl flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 bg-purple-700 rounded-xl flex items-center justify-center text-white shrink-0">
            <Truck size={24} />
          </div>
          <div>
            <h4 className="font-black text-purple-900 uppercase text-[10px] mb-0.5">We Pick Up</h4>
            <p className="text-[10px] text-purple-700 font-medium">
              We'll arrive within a 2-hour window between 10 AM and 10 PM to collect your items.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 italic font-black uppercase tracking-widest text-purple-900">
            <h2 className="text-3xl">Process</h2>
          </div>
          
          <div className="bg-purple-50/50 rounded-[3rem] p-12 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 border border-purple-100">
            {deliveryProcess.map((step) => (
              <div key={step.id} className="flex items-center gap-6 group">
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0`}>
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}