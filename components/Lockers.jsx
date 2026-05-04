"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Search, Clock, Navigation, Phone, Globe } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "Waaberi Locker",
    address: "21 Oct Street, Waaberi",
    image: "/images/locker1.png",
    status: "24/7 Open",
  },
  {
    id: 2,
    name: "Hodan Locker",
    address: "KM4 Street, Hodan",
    image: "/images/locker2.png",
    status: "24/7 Open",
  },
];

export default function LockerPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-purple-100 selection:text-purple-600">
      
      

      {/* 2. HERO SECTION */}
      <section className="relative h-[50vh] min-h-[450px] flex items-end pb-16 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero.png"
            fill
            className="object-cover brightness-[0.35]"
            alt="Likenew Lockers"
            priority
          />
        </motion.div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* QORAALKA HOOS LOO DHIGAY (mb-2 ayaa ku dhoweeyay H1) */}
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-2">
                <Globe size={12} className="animate-spin-slow" /> Global Standard Laundry
              </span>
              
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                Laundry <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Simplified.</span>
              </h1>
              <p className="text-gray-300 text-lg font-medium max-w-md leading-relaxed">
                Experience the convenience of 24/7 smart lockers. We wash, you enjoy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SEARCH SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[11px] font-black text-purple-600 uppercase tracking-[0.3em] mb-3">Available Locations</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Find Your Nearest <span className="italic text-purple-600">Hub</span>
          </h3>
          
          <div className="mt-10 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search by address or locker name..."
                  className="w-full pl-16 pr-8 py-6 bg-white border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold shadow-xl shadow-gray-200/50"
                />
            </div>
          </div>
        </motion.div>

        {/* 4. LOCKERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {locations.map((locker, index) => (
            <motion.div
              key={locker.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(124,58,237,0.1)] transition-all duration-700"
            >
              <div className="relative h-[350px] w-full overflow-hidden">
                <Image src={locker.image} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" alt={locker.name} />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-gray-900 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 shadow-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {locker.status}
                </div>
              </div>

              <div className="p-10 flex justify-between items-center">
                <div>
                  <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">{locker.name}</h4>
                  <div className="flex items-center gap-2 text-gray-400 font-bold italic text-sm">
                    <MapPin size={18} className="text-purple-500" /> {locker.address}
                  </div>
                </div>
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-purple-600 transition-all group-hover:rotate-[360deg] duration-700 shadow-lg"
                >
                  <Navigation size={24} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-gray-900 py-32 rounded-[5rem] mx-6 mb-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <h3 className="text-4xl font-black uppercase text-white tracking-tighter mb-20">How It <span className="text-purple-500">Works</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Drop", desc: "Simply drop your laundry in any available locker." },
              { step: "02", title: "Process", desc: "We track, wash, and fold with premium care." },
              { step: "03", title: "Collect", desc: "Get notified and pick up your fresh clothes." },
            ].map((s, i) => (
              <motion.div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-12 left-1/2 -translate-x-1/2 select-none">{s.step}</div>
                <div className="relative pt-8">
                    <h4 className="font-black uppercase text-xl text-white mb-4 tracking-widest">{s.title}</h4>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}