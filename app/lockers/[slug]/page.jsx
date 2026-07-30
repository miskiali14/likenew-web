"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Navigation, Globe, Clock, ArrowLeft } from "lucide-react";

const locationsData = {
  waaberi: {
    name: "Waaberi Locker",
    address: "21 Oct Street, Waaberi",
    image: "/images/qanad1.jpeg",
    status: "24/7 Open",
    link: "https://maps.app.goo.gl/tTvbmD63yowVTdz69",
    mapEmbed: "https://www.google.com/maps/d/embed?mid=1KJNyM9hECO2RjQ-OyZrYQHuhaXtDp1Q&ehbc=2E312F",
    gallery: ["/images/qanad1.jpeg", "/images/qanad2.jpeg", "/images/DSC09353.jpg"],
  },
  hodan: {
    name: "Hodan Locker",
    address: "KM4 Street, Hodan",
    image: "/images/qanad1.jpeg",
    status: "24/7 Open",
    link: "https://maps.app.goo.gl/EoL4JyeiVgUq5aYQ7",
    mapEmbed: "https://www.google.com/maps/d/embed?mid=1KJNyM9hECO2RjQ-OyZrYQHuhaXtDp1Q&ehbc=2E312F",
    gallery: ["/images/qanad1.jpeg", "/images/qanad2.jpeg", "/images/DSC09353.jpg"],
  },
};

export default function LockerDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const activeLocker = locationsData[slug];

  if (!activeLocker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
        <h1 className="text-3xl font-black mb-4">Locker Not Found</h1>
        <Link href="/lockers" className="bg-[#662d8f] text-white px-6 py-3 rounded-xl font-bold">
          Back to Lockers
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* BACK BUTTON TO LIST */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link
          href="/lockers"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft size={16} /> Back to Hubs
        </Link>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activeLocker.name} Details</span>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[520px] md:min-h-[560px] flex items-end pb-14 md:pb-16 pt-20 overflow-hidden">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image src={activeLocker.image} fill className="object-cover brightness-[0.35]" alt={activeLocker.name} priority />
        </motion.div>
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-9 w-full text-white">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-4">
                <Globe size={12} /> Global Standard Laundry
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88] mb-8">
                {activeLocker.name}
              </h1>

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

      {/* MAP SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-5 md:px-6">
        <h3 className="text-3xl font-black uppercase text-gray-900 tracking-tighter mb-6">
          How to Get <span className="text-[#662d8f]">There</span>
        </h3>
        <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
          <iframe title="Map Location" src={activeLocker.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-12 max-w-7xl mx-auto px-5 md:px-6 mb-20">
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