"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation, Globe } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "Waaberi Locker",
    address: "21 Oct Street, Waaberi",
    image: "/images/locker1.png",
    status: "24/7 Open",
    link: "https://maps.app.goo.gl/tTvbmD63yowVTdz69",
  },
  {
    id: 2,
    name: "Hodan Locker",
    address: "KM4 Street, Hodan",
    image: "/images/locker2.png",
    status: "24/7 Open",
    link: "https://maps.app.goo.gl/EoL4JyeiVgUq5aYQ7",
  },
];

export default function LockerPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locations.filter((locker) => {
    const query = searchTerm.toLowerCase();
    return (
      locker.name.toLowerCase().includes(query) ||
      locker.address.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      <section className="relative min-h-[520px] md:min-h-[560px] flex items-end pb-14 md:pb-16 pt-32 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/locker2.png"
            fill
            className="object-cover brightness-[0.35]"
            alt="Likenew Lockers"
            priority
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/25" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-9 w-full text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-4">
                <Globe size={12} />
                Global Standard Laundry
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88] mb-5">
                Laundry <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#662d8f] to-[#825bac]">
                  Simplified.
                </span>
              </h1>

              <p className="text-gray-300 text-sm md:text-lg font-medium max-w-md leading-relaxed">
                Experience the convenience of 24/7 smart lockers. We wash, you
                enjoy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 max-w-7xl mx-auto px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[10px] md:text-[11px] font-black text-[#662d8f] uppercase tracking-[0.3em] mb-3">
            Available Locations
          </h2>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Find Your Nearest{" "}
            <span className="italic text-[#662d8f]">Hub</span>
          </h3>

          <div className="mt-8 md:mt-10 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#662d8f] to-[#825bac] rounded-[2rem] blur opacity-20" />

            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by address or locker name..."
                className="w-full pl-14 pr-5 py-5 md:py-6 bg-white border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-[#662d8f]/50 transition-all font-bold shadow-xl shadow-gray-200/50 text-gray-900 text-sm"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {filteredLocations.map((locker, index) => (
            <motion.div
              key={locker.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-700"
            >
              <div className="relative h-[240px] sm:h-[300px] md:h-[350px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={locker.image}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={locker.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    e.currentTarget.src = "/images/hero.png";
                  }}
                />

                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-md text-gray-900 px-4 md:px-5 py-2 rounded-2xl text-[9px] md:text-[10px] font-black uppercase flex items-center gap-2 shadow-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {locker.status}
                </div>
              </div>

              <div className="p-6 md:p-10 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                    {locker.name}
                  </h4>

                  <div className="flex items-center gap-2 text-gray-400 font-bold italic text-sm">
                    <MapPin size={18} className="text-[#662d8f]" />
                    {locker.address}
                  </div>
                </div>

                <motion.a
                  href={locker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-900 text-white w-full sm:w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-[#662d8f] transition-all shadow-lg"
                >
                  <Navigation size={24} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-400 font-bold">
              No locker location found.
            </p>
          </div>
        )}
      </section>

      <section className="bg-gray-900 py-20 md:py-32 rounded-[2.5rem] md:rounded-[5rem] mx-4 md:mx-6 mb-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter mb-16 md:mb-20">
            How It <span className="text-[#825bac]">Works</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16">
            {[
              {
                step: "01",
                title: "Drop",
                desc: "Simply drop your laundry in any available locker.",
              },
              {
                step: "02",
                title: "Process",
                desc: "We track, wash, and fold with premium care.",
              },
              {
                step: "03",
                title: "Collect",
                desc: "Get notified and pick up your fresh clothes.",
              },
            ].map((s, i) => (
              <motion.div key={i} className="relative">
                <div className="text-7xl md:text-8xl font-black text-white/5 absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 select-none">
                  {s.step}
                </div>

                <div className="relative pt-8">
                  <h4 className="font-black uppercase text-xl text-white mb-4 tracking-widest">
                    {s.title}
                  </h4>

                  <p className="text-gray-400 font-medium text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}