"use client";
import { useState, useEffect } from "react";
import { 
  ShoppingCart, Phone, Clock, Globe, 
  Shirt, Waves, Wind, Bed, Truck, Zap, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [lang, setLang] = useState("EN");
  const [showHours, setShowHours] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "Clean and Press", icon: <Shirt size={18} />, desc: "Professional dry cleaning" },
    { name: "Press Only", icon: <Wind size={18} />, desc: "Expert steam ironing" },
    { name: "Wash and Fold", icon: <Waves size={18} />, desc: "Daily laundry care" },
    { name: "Bed and Bath", icon: <Bed size={18} />, desc: "Linens & towel cleaning" },
    { name: "Delivery", icon: <Truck size={18} />, desc: "Doorstep pickup & drop" },
    { name: "Express", icon: <Zap size={18} />, desc: "Same day fast service" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-16 ${
      scrolled 
        ? "py-3 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-b border-white/20" 
        : "py-6 bg-gradient-to-b from-black/60 to-transparent"
    }`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            className={`${scrolled ? "bg-purple-600 shadow-purple-200" : "bg-white"} p-2 rounded-2xl shadow-2xl transition-colors duration-500`}
          >
               <img 
                 src="/logo.png" 
                 className={`h-8 w-8 object-contain ${scrolled ? "brightness-0 invert" : ""}`} 
                 alt="LikeNew Logo" 
               />
          </motion.div>
          <span className={`text-2xl font-black tracking-tighter uppercase transition-colors duration-500 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}>
              Like<span className="text-purple-500 italic font-black">New</span>
          </span>
        </Link>

        {/* CENTER MENU */}
        <div className={`hidden xl:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
          scrolled ? "text-gray-600" : "text-white/90"
        }`}>
          {['Home', 'About'].map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-purple-600 transition-all relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* SERVICES DROPDOWN */}
          <div 
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <div className="flex items-center gap-1.5 hover:text-purple-600 transition-all">
              <span>Services</span>
              <ChevronDown size={14} className={`transition-transform duration-500 ${showServices ? "rotate-180 text-purple-500" : ""}`} />
            </div>

            <AnimatePresence>
              {showServices && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 p-6 grid grid-cols-2 gap-4"
                >
                  {services.map((service, index) => (
                    <Link key={index} href="/services" className="flex items-center gap-4 p-3.5 rounded-3xl hover:bg-purple-50 transition-all group/item border border-transparent hover:border-purple-100">
                      <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-all">
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-black text-[11px] font-black uppercase tracking-tight">{service.name}</div>
                        <div className="text-gray-400 text-[10px] font-medium leading-tight">{service.desc}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/mobileapp" className="hover:text-purple-600 transition-all">App</Link>
          <Link href="/lockers" className="hover:text-purple-600 transition-all">Lockers</Link>
        </div>

        {/* RIGHT SIDE TOOLS */}
        <div className="flex items-center gap-6">
          
          {/* Phone */}
          <div className={`hidden lg:flex items-center gap-3 font-black text-[11px] transition-colors duration-500 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}>
            <div className={`p-2 rounded-full transition-all ${scrolled ? "bg-purple-100 text-purple-600" : "bg-white/10 text-purple-400"}`}>
              <Phone size={14} />
            </div>
            <span className="tracking-widest italic">+252 617 372514</span>
          </div>

          {/* WORKING HOURS */}
          <div 
            className="relative hidden md:flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all cursor-pointer"
            style={{ 
              backgroundColor: scrolled ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              borderColor: scrolled ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.1)' 
            }}
            onMouseEnter={() => setShowHours(true)}
            onMouseLeave={() => setShowHours(false)}
          >
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${scrolled ? "text-purple-700" : "text-white"}`}>Hours</span>
            <div className="bg-purple-600 p-1.5 rounded-xl shadow-lg shadow-purple-500/30 text-white">
               <Clock size={14} />
            </div>

            <AnimatePresence>
              {showHours && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-full mt-4 right-0 bg-white text-black p-6 rounded-[2rem] shadow-2xl w-60 border border-gray-100"
                >
                  <div className="text-[10px] font-black text-purple-600 uppercase mb-4 tracking-widest border-b border-gray-50 pb-2">Availability</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-gray-400 font-bold uppercase text-[9px]">Sat - Thu:</span>
                      <span className="font-black text-gray-900">8AM - 9PM</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-gray-400 font-bold uppercase text-[9px]">Friday:</span>
                      <span className="text-red-500 font-black px-3 py-1 bg-red-50 rounded-full text-[9px] uppercase">Closed</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className={`relative p-3 rounded-full transition-all duration-300 cursor-pointer shadow-xl border ${
              scrolled ? "bg-purple-600 text-white border-purple-400" : "bg-white text-gray-900 border-white/20"
            }`}
          >
            <ShoppingCart size={18} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">1</span>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}