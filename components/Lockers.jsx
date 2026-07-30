"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation, Globe, Clock, ArrowLeft } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "Waaberi Locker",
    address: "21 Oct Street, Waaberi",
    image: "/images/qanad1.jpeg",
    status: "24/7 Open",
    link: "https://maps.app.goo.gl/tTvbmD63yowVTdz69",
    mapEmbed: "https://www.google.com/maps/d/embed?mid=1KJNyM9hECO2RjQ-OyZrYQHuhaXtDp1Q&ehbc=2E312F",
    gallery: [
      "/images/qanad1.jpeg",
      "/images/qanad2.jpeg",
      "/images/DSC09353.jpg",
    ],
  },
  {
    id: 2,
    name: "Hodan Locker",
    address: "KM4 Street, Hodan",
    image: "/images/qanad1.jpeg",
    status: "24/7 Open",
    link: "https://maps.app.goo.gl/EoL4JyeiVgUq5aYQ7",
    mapEmbed: "https://www.google.com/maps/d/embed?mid=1KJNyM9hECO2RjQ-OyZrYQHuhaXtDp1Q&ehbc=2E312F",
    gallery: [
      "/images/qanad1.jpeg",
      "/images/qanad2.jpeg",
      "/images/DSC09353.jpg",
    ],
  },
];

export default function LockerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLocker, setActiveLocker] = useState(null);
  const locationsRef = useRef(null);

  // Marka la doorto locker-ka, boggu wuxuu kor u laabayaa xagga sare si uu Hero-ga ugu billowdo
  useEffect(() => {
    if (activeLocker) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeLocker]);

  // Marka laga soo laabto detail-ka oo la gujiyo Back, wuxuu si toos ah u soo celinayaa meesha ay list-ka lockers-ka ku yaalliin
  const handleBackToHubs = () => {
    setActiveLocker(null);
    setTimeout(() => {
      locationsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const filteredLocations = locations.filter((locker) => {
    const query = searchTerm.toLowerCase();
    return (
      locker.name.toLowerCase().includes(query) ||
      locker.address.toLowerCase().includes(query)
    );
  });

  // HADDII LOCKER LA DOORTO (DETAILS VIEW)
  if (activeLocker) {
    return (
      <div className="bg-white min-h-screen font-sans overflow-x-hidden">
        {/* BACK BUTTON TO LIST */}
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <button
            onClick={handleBackToHubs}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Hubs
          </button>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activeLocker.name} Details</span>
        </div>

        {/* HERO SECTION - MAQOOR STYLE */}
        <section className="relative min-h-[520px] md:min-h-[560px] flex items-end pb-14 md:pb-16 pt-20 overflow-hidden">
          <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
            <Image src={activeLocker.image} fill className="object-cover brightness-[0.35]" alt={activeLocker.name} priority sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-black/25" />

          <div className="relative max-w-7xl mx-auto px-5 md:px-9 w-full text-white">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-4">
                  <Globe size={12} /> Global Standard Laundry
                </span>

                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88] mb-8">
                  {activeLocker.name}
                </h1>

                {/* Floating Info Pill */}
                <div className="bg-white text-gray-900 rounded-[2rem] p-4 md:p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#662d8f]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Address</p>
                      <p className="text-sm font-extrabold text-gray-900">{activeLocker.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#662d8f]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Status</p>
                      <p className="text-sm font-extrabold text-gray-900">{activeLocker.status}</p>
                    </div>
                  </div>

                  <a
                    href={activeLocker.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#ff5722] text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#e0481b] transition-all shadow-lg"
                  >
                    <Navigation size={16} /> How to Get There
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW TO GET THERE (MAP) */}
        <section className="py-16 max-w-7xl mx-auto px-5 md:px-6">
          <h3 className="text-3xl font-black uppercase text-gray-900 tracking-tighter mb-6">
            How to Get <span className="text-[#662d8f]">There</span>
          </h3>
          <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
            <iframe
              title="Map Location"
              src={activeLocker.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* LOCATION PHOTOS GALLERY */}
        <section className="py-12 max-w-7xl mx-auto px-5 md:px-6">
          <h3 className="text-3xl font-black uppercase text-gray-900 tracking-tighter mb-6">
            Location <span className="text-[#662d8f]">Photos</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activeLocker.gallery.map((photo, pIdx) => (
              <div key={pIdx} className="relative h-72 rounded-[2.5rem] overflow-hidden shadow-lg group">
                <Image src={photo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt="Locker photo" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // DEFAULT VIEW (LIST OF LOCKERS WITH SEARCH)
  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      <section className="relative min-h-[520px] md:min-h-[560px] flex items-end pb-14 md:pb-16 pt-32 overflow-hidden">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image src="/images/qanad2.jpeg" fill className="object-cover brightness-[0.35]" alt="Likenew Lockers" priority sizes="100vw" />
        </motion.div>

        <div className="absolute inset-0 bg-black/25" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-9 w-full text-white">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-4">
                <Globe size={12} /> Global Standard Laundry
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88] mb-5">
                Laundry <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#662d8f] to-[#825bac]">
                  Simplified.
                </span>
              </h1>

              <p className="text-gray-300 text-sm md:text-lg font-medium max-w-md leading-relaxed">
                Experience the convenience of 24/7 smart lockers. We wash, you enjoy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RAKIIBAADAN REF-KA HQAADAYO MEESHA LOCKERS-KA KU YAALLAAN */}
      <section ref={locationsRef} className="py-16 md:py-20 max-w-7xl mx-auto px-5 md:px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <h2 className="text-[10px] md:text-[11px] font-black text-[#662d8f] uppercase tracking-[0.3em] mb-3">
            Available Locations
          </h2>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Find Your Nearest <span className="italic text-[#662d8f]">Hub</span>
          </h3>

          <div className="mt-8 md:mt-10 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#662d8f] to-[#825bac] rounded-[2rem] blur opacity-20" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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

        {/* LIST OF LOCKERS - CLICK TO OPEN DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {filteredLocations.map((locker, index) => (
            <motion.div
              key={locker.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setActiveLocker(locker)}
              className="cursor-pointer group relative bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-700 hover:border-[#662d8f]"
            >
              <div className="relative h-[240px] sm:h-[300px] md:h-[350px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={locker.image}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={locker.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
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

                <div className="bg-gray-900 text-white w-full sm:w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-[#662d8f] transition-all shadow-lg">
                  <Navigation size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-400 font-bold">No locker location found.</p>
          </div>
        )}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-gray-900 py-20 md:py-32 rounded-[2.5rem] md:rounded-[5rem] mx-4 md:mx-6 mb-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter mb-16 md:mb-20">
            How It <span className="text-[#825bac]">Works</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16">
            {[
              { step: "01", title: "Drop", desc: "Simply drop your laundry in any available locker." },
              { step: "02", title: "Process", desc: "We track, wash, and fold with premium care." },
              { step: "03", title: "Collect", desc: "Get notified and pick up your fresh clothes." },
            ].map((s, i) => (
              <motion.div key={i} className="relative">
                <div className="text-7xl md:text-8xl font-black text-white/5 absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 select-none">
                  {s.step}
                </div>
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