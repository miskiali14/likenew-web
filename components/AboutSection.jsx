"use client";
import { Check, Truck, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-white py-24 px-6 md:px-16 scroll-mt-20 overflow-hidden">
      
      {/* Background Decor (Circles) */}
      <div className="absolute top-0 right-0 -mr-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 p-8 md:p-16">
          
          {/* BIDIX: Sawirka Gaariga oo leh Animation */}
          <div className="w-full md:w-[45%] relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="relative h-[300px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/images/delivery.png" 
                  alt="LikeNew Fast Delivery" 
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            {/* Badge yar oo sawirka dushiisa ah */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-gray-50">
              <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Fastest</p>
                <p className="text-sm font-black text-gray-900 uppercase">Delivery</p>
              </div>
            </div>
          </div>

          {/* MIDIG: Qoraalka */}
          <div className="w-full md:w-[55%] space-y-8">
            <div className="space-y-4">
              <span className="text-purple-600 text-xs font-black uppercase tracking-[0.4em]">Our Story</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.9] uppercase tracking-tighter">
                LikeNew began <br />
                <span className="text-purple-600 italic">with a mission</span>
              </h2>
            </div>
            
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg font-medium">
              To make laundry easy and reliable. Today, we provide fast, high-quality cleaning 
              services focused on customer satisfaction and premium garment care.
            </p>

            {/* Liiska Checkmark-yada - 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-4">
              {[
                "Transparency", "Excellence", 
                "Sustainability", "Customer focus"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="bg-gray-900 group-hover:bg-purple-600 transition-colors rounded-full p-1 text-white">
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <span className="font-black text-gray-900 text-xs uppercase tracking-wider">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOMKA HOOSE (Modern CTA Bar) */}
        <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-100 p-8 flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="relative w-full lg:w-72">
            <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Your Address" 
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>
          
          <div className="relative w-full lg:w-72">
            <Phone size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#7e3af2] hover:bg-black text-white font-black px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-purple-200 w-full lg:w-auto"
          >
            Place Order
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}