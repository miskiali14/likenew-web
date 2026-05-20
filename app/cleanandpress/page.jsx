"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ChevronRight, Loader2, ArrowLeft 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function CleanAndPressPage() {
  const router = useRouter(); 
  const [hoveredId, setHoveredId] = useState(null); 
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [servicesData, setServicesData] = useState({}); 
  const [loading, setLoading] = useState(true);

  // 1. Nidaamka rasmiga ah siday isugu xigaan 9-ka Card iyo macluumaadkooda
  const groupMeta = {
    "Men Group": { icon: "👕", desc: "Formal Shirts & Trousers", route: "/menpage" },
    "Ladies Group": { icon: "👗", desc: "Dresses, Blouses & Evening Wear", route: "/ladiespage" },
    "Suit Group": { icon: "🧥", desc: "Full Suits, Blazers & Coats", route: "/suitpage" },
    "Dress Group": { icon: "💃", desc: "Party, Bridal & Maxi Dresses", route: "/dressgrouppage" },
    "Traditional": { icon: "👳", desc: "Khamis, Macawiis & Koofiyad", route: "/traditionalpage" },
    "Bags Group": { icon: "👜", desc: "Leather Handbags & Backpacks", route: "/bagsgrouppage" },
    "Shoes Group": { icon: "👟", desc: "Sneakers, Heels & Leather Shoes", route: "/shoesgrouppage" },
    "Underwear": { icon: "🩳", desc: "Vests & Briefs (Deep Clean)", route: "/underwearpage" },
    "Sportswear": { icon: "🏋️", desc: "Gym Wear & Active Apparel", route: "/sportswearpage" }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", { method: "POST" });
        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        const grouped = {};
        rawProducts.forEach(prod => {
          const pName = (prod.name || "").toLowerCase();
          let gName = "Other Services";

          if (pName.includes("men") || pName.includes("shaati")) gName = "Men Group";
          else if (pName.includes("ladi") || pName.includes("dirac")) gName = "Ladies Group";
          else if (pName.includes("suit") || pName.includes("suud")) gName = "Suit Group";
          else if (pName.includes("shoe") || pName.includes("kabo")) gName = "Shoes Group";
          else if (pName.includes("bag") || pName.includes("boorso")) gName = "Bags Group";
          else if (pName.includes("underwear") || pName.includes("nigis")) gName = "Underwear";
          else if (pName.includes("traditional")) gName = "Traditional";
          else if (pName.includes("sport")) gName = "Sportswear";
          else if (pName.includes("dress")) gName = "Dress Group";

          if (!grouped[gName]) grouped[gName] = [];
          grouped[gName].push(prod);
        });

        Object.keys(groupMeta).forEach(key => {
          if (!grouped[key]) grouped[key] = [];
        });

        setServicesData(grouped);
      } catch (e) {
        console.error("API Error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // 2. Halkan waxaa lagu xiriiriyay in xog kasta loo rixo page-keeda gaarka ah
  const handleCardClick = (groupName) => {
    const targetRoute = groupMeta[groupName]?.route;
    if (targetRoute) {
      router.push(targetRoute);
    } else {
      setSelectedGroup(groupName);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <Loader2 className="animate-spin text-[#2a5298]" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fafafa] selection:bg-[#2a5298]/10">
      <Navbar />

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedGroup ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex flex-col items-center text-center mb-16">
                  <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-[0.9]">
                    Clean <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2a5298] to-indigo-500 italic">&</span> Press
                  </h1>
                </div>

                {/* Grid-ka 9-ka Card siday isugu xigaan oo mid kasta uu page u go'an yahay */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                  {Object.keys(groupMeta).map((groupName, index) => {
                    const meta = groupMeta[groupName];

                    return (
                      <motion.div
                        key={groupName}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setHoveredId(groupName)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleCardClick(groupName)}
                        className="group relative bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
                      >
                        <div className="relative z-10">
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 transition-all duration-500 ${
                            hoveredId === groupName ? "bg-[#2a5298]/10 rotate-6 scale-105" : "bg-gray-50"
                          }`}>
                            <span>{meta.icon}</span>
                          </div>
                          <h3 className="text-2xl font-black text-gray-900 uppercase mb-3">{groupName}</h3>
                          <p className="text-gray-400 font-medium text-sm mb-8">{meta.desc}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-widest group-hover:text-[#2a5298] flex items-center gap-2">
                              Go to Page <ChevronRight size={14} />
                            </span>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-[#2a5298] transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key="items" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <button onClick={() => setSelectedGroup(null)} className="flex items-center gap-2 text-gray-500 font-black uppercase text-[10px] mb-8 hover:text-[#2a5298]">
                  <ArrowLeft size={16} /> Back to Services
                </button>
                <h2 className="text-4xl font-black text-gray-900 uppercase mb-12">{selectedGroup}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {servicesData[selectedGroup]?.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-gray-100">
                      <p className="text-gray-400 font-medium">No items found in this section.</p>
                    </div>
                  ) : (
                    servicesData[selectedGroup]?.map((item, idx) => (
                      <div key={idx} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all text-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
                          {groupMeta[selectedGroup]?.icon || "✨"}
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm uppercase mb-2">{item.name}</h4>
                        <span className="text-[#2a5298] font-black text-lg">${item.price}</span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}