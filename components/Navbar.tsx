"use client";
import { useState } from "react";
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

  const services = [
    { name: "Clean and Press", icon: <Shirt size={18} />, desc: "Professional dry cleaning" },
    { name: "Press Only", icon: <Wind size={18} />, desc: "Expert steam ironing" },
    { name: "Wash and Fold", icon: <Waves size={18} />, desc: "Daily laundry care" },
    { name: "Bed and Bath", icon: <Bed size={18} />, desc: "Linens & towel cleaning" },
    { name: "Delivery", icon: <Truck size={18} />, desc: "Doorstep pickup & drop" },
    { name: "Express", icon: <Zap size={18} />, desc: "Same day fast service" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full px-6 md:px-16 py-6 flex items-center justify-between z-[100] bg-gradient-to-b from-black/80 via-black/20 to-transparent border-none">
      
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-2 rounded-2xl shadow-2xl shadow-white/10"
        >
             <img 
               src="/logo.png" 
               className="h-9 w-9 object-contain" 
               alt="LikeNew Logo" 
             />
        </motion.div>
        <span className="text-white text-2xl font-black tracking-[ -0.05em] uppercase group-hover:text-purple-400 transition-colors">
            Like<span className="text-purple-500 italic">New</span>
        </span>
      </Link>

      {/* CENTER MENU */}
      <div className="hidden xl:flex items-center gap-10 text-white/90 font-black text-[10px] uppercase tracking-[0.2em]">
        <Link href="/" className="hover:text-purple-400 transition-all duration-300 relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/about" className="hover:text-purple-400 transition-all duration-300 relative group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
        </Link>
        
        {/* SERVICES DROPDOWN */}
        <div 
          className="relative py-2 cursor-pointer group"
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <div className="flex items-center gap-1.5 group-hover:text-purple-400 transition-all">
            <span>Services</span>
            <ChevronDown size={14} className={`transition-transform duration-500 ${showServices ? "rotate-180 text-purple-500" : ""}`} />
          </div>

          <AnimatePresence>
            {showServices && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 p-6 grid grid-cols-2 gap-4"
              >
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    href="/services"
                    className="flex items-center gap-4 p-3.5 rounded-3xl hover:bg-purple-50 transition-all group/item border border-transparent hover:border-purple-100"
                  >
                    <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-all shadow-sm">
                      {service.icon}
                    </div>
                    <div>
                      <div className="text-black text-[11px] font-black uppercase tracking-tight">{service.name}</div>
                      <div className="text-gray-400 text-[10px] font-medium leading-tight">{service.desc}</div>
                    </div>
                  </Link>
                ))}
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        <Link href="/mobileapp" className="hover:text-purple-400 transition-all relative group">App</Link>
        <Link href="#" className="hover:text-purple-400 transition-all relative group">Lockers</Link>
      </div>

      {/* RIGHT SIDE TOOLS */}
      <div className="flex items-center gap-8">
        
        {/* Phone */}
        <div className="hidden lg:flex items-center gap-3 text-white font-black text-[11px] cursor-pointer group hover:text-purple-400 transition-all">
          <div className="p-2 bg-white/10 rounded-full group-hover:bg-purple-500 transition-all">
            <Phone size={14} className="text-purple-400 group-hover:text-white" />
          </div>
          <span className="tracking-widest">+252 617 372514</span>
        </div>

        {/* WORKING HOURS */}
        <div 
          className="relative hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 text-white cursor-pointer transition-all hover:bg-white/20"
          onMouseEnter={() => setShowHours(true)}
          onMouseLeave={() => setShowHours(false)}
        >
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Hours</span>
          <div className="bg-purple-600 p-1.5 rounded-xl shadow-lg shadow-purple-500/30">
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
                <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-100"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language & Cart */}
        <div className="flex items-center gap-2 text-white font-black text-[11px] cursor-pointer hover:text-purple-400 transition-colors">
          <Globe size={16} className="text-purple-500" />
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none outline-none text-white font-black cursor-pointer">
            <option value="EN" className="text-black">EN</option>
            <option value="SO" className="text-black">SO</option>
          </select>
        </div>

        <motion.div 
          whileTap={{ scale: 0.9 }}
          className="relative bg-white text-gray-900 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer group shadow-xl border border-white/20"
        >
          <ShoppingCart size={18} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">1</span>
        </motion.div>
      </div>
    </nav>
  );
}