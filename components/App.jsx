"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function App() {
  return (
    <section
      id="app"
      className="relative bg-white pt-24 md:pt-32 pb-20 md:pb-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#825bac]/20 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* flex-col wuxuu u habaysan yahay inuu si sax ah u dul saaro download-ka sawirka mobile-ka */}
        <div className="flex flex-col items-center justify-center gap-10">
          
          {/* 1. DOWNLOAD BUTTONS (Badhamada oo kor loo soo mariyay) */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 z-20">
            <motion.a
              href="https://apps.apple.com/us/app/likenew-laundry-and-dryclean/id6746805480"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black p-[1px] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="px-5 md:px-6 py-3 flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  className="h-10 w-auto"
                  alt="Download on the App Store"
                />
              </div>
            </motion.a>

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.cleancloudapp.likenew"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black p-[1px] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="px-5 md:px-6 py-3 flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  className="h-10 w-auto"
                  alt="Get it on Google Play"
                />
              </div>
            </motion.a>
          </div>

          {/* 2. APP INTERFACE (Taleefanka oo hoos loo dhigay) */}
          <div className="w-full lg:w-1/2 relative flex flex-col justify-center items-center mt-6">
            <div className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] bg-[#825bac]/30 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse" />

            <motion.div
              initial={{ opacity: 0, rotate: 5, y: 40 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-[230px] sm:w-[260px] md:w-[320px]"
            >
              <div className="relative border-[8px] md:border-[10px] border-gray-900 rounded-[2.6rem] md:rounded-[3.2rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] aspect-[9/19] bg-gray-900">
                <div className="relative h-full w-full rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden bg-white">
                  <Image
                    src="/images/appscreen.jpeg"
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover"
                    alt="LikeNew App Interface"
                    priority
                  />
                </div>

                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 md:w-28 h-6 md:h-7 bg-gray-900 rounded-full z-30" />
              </div>

              {/* FLOAT CARD 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-6 sm:-right-10 lg:-right-16 top-20 md:top-24 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-2 md:gap-3 z-20"
              >
                <div className="bg-green-500 p-2 rounded-xl md:rounded-2xl text-white shadow-lg shadow-green-200">
                  <Download size={16} strokeWidth={3} />
                </div>

                <div>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase leading-none mb-1">
                    Live Order
                  </p>
                  <p className="text-[9px] md:text-[11px] font-black text-gray-900 uppercase">
                    Laundry Ready
                  </p>
                </div>
              </motion.div>

              {/* FLOAT CARD 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -left-6 sm:-left-10 lg:-left-16 bottom-20 md:bottom-28 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-2 md:gap-3 z-20"
              >
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#662d8f] to-[#825bac] flex items-center justify-center text-white font-black text-base md:text-lg shadow-lg shadow-[#825bac]/30">
                  L
                </div>

                <div>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase leading-none mb-1">
                    Welcome back
                  </p>
                  <p className="text-[9px] md:text-[11px] font-black text-gray-900 uppercase tracking-tight">
                    Premium Member
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}