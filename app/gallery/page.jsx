"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", ...new Set(galleryImages.map((item) => item.category))];

  const filteredImages = activeTab === "All" 
    ? galleryImages 
    : galleryImages.filter((item) => item.category === activeTab);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 py-24">
        <Link href="/" className="inline-flex mb-10 rounded-full border px-5 py-2 text-sm font-semibold text-[#662d8f]">
          ← Back Home
        </Link>
        <h1 className="text-5xl font-black text-center text-gray-900">Likenew Gallery</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                activeTab === cat ? "bg-[#662d8f] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-[24px] shadow-lg"
              >
                <div className="relative h-72">
                  <Image src={item.src} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#662d8f] font-bold uppercase">{item.category}</p>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}