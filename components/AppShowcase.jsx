"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ShieldCheck, Zap, Bell, Star } from "lucide-react";

export default function AppShowcase() {
  const features = [
    {
      icon: <Zap size={20} className="text-purple-500" />,
      title: "Fast Ordering",
      desc: "Order your laundry in less than 30 seconds."
    },
    {
      icon: <Bell size={20} className="text-purple-500" />,
      title: "Real-time Tracking",
      desc: "Get notified at every step of the cleaning process."
    },
    {
      icon: <ShieldCheck size={20} className="text-purple-500" />,
      title: "Secure Payment",
      desc: "Multiple safe payment options integrated."
    }
  ];

  return (
    <section id="mobile-app" className="relative bg-white pt-32 pb-24 overflow-hidden">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-50/60 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <Star size={12} fill="currentColor" /> Coming Soon to App Store
              </span>
              
              <h2 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.85] uppercase tracking-tighter">
                Laundry at <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 italic">Your Fingertips</span>
              </h2>
              
              <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the future of garment care. Manage orders, track deliveries in real-time, 
                and unlock premium loyalty rewards—all from the LikeNew app.
              </p>
            </motion.div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-[2rem] bg-gray-50/50 border border-gray-100 text-center lg:text-left hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500"
                >
                  <div className="mb-4 flex justify-center lg:justify-start bg-white w-10 h-10 items-center rounded-xl shadow-sm">{f.icon}</div>
                  <h4 className="text-[11px] font-black uppercase text-gray-900 mb-1.5 tracking-tight">{f.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold leading-snug">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black p-[1px] rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="px-6 py-3 flex items-center gap-2">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    className="h-10 w-auto" 
                    alt="App Store" 
                  />
                </div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black p-[1px] rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="px-6 py-3 flex items-center gap-2">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    className="h-10 w-auto" 
                    alt="Play Store" 
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* RIGHT CONTENT: PHONE MOCKUP */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            <div className="absolute w-[450px] h-[450px] bg-purple-200/40 rounded-full blur-[120px] -z-10 animate-pulse" />
            
            <motion.div 
              initial={{ opacity: 0, rotate: 5, y: 40 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-[290px] md:w-[320px]"
            >
              <div className="relative border-[10px] border-gray-900 rounded-[3.2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] aspect-[9/19] bg-gray-900">
                <div className="relative h-full w-full rounded-[2.2rem] overflow-hidden bg-white">
                  <Image 
                    src="/images/appscreen.jpeg" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px" // Halkan ayaa lagu saxay
                    className="object-cover"
                    alt="LikeNew App Interface"
                    priority
                  />
                </div>
                
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-full z-30" />
              </div>

              {/* Status Badge (Floating) */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-16 top-24 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-3 z-20"
              >
                <div className="bg-green-500 p-2 rounded-2xl text-white shadow-lg shadow-green-200">
                  <Download size={18} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Live Order</p>
                  <p className="text-[11px] font-black text-gray-900 uppercase">Laundry Ready</p>
                </div>
              </motion.div>

              {/* User Welcome (Floating) */}
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-16 bottom-28 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-3 z-20"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-200">
                  L
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Welcome back</p>
                  <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Premium Member</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}