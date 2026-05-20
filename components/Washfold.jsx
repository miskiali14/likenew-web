"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, Waves, Wind, Search, 
  ChevronRight, ShoppingBag, Sparkles, 
  RefreshCw, Heart, Loader2, ArrowLeft 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function WashAndFoldPage() {
  const [search, setSearch] = useState("");
  const [apiServices, setApiServices] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. API Integration - Soo akhrinta xogta CleanCloud
  useEffect(() => {
    const fetchWashServices = async () => {
      try {
        const response = await fetch("/api/services", { method: "POST" });
        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        // Design-kaaga asalka ah (Icons & Tags)
        const groupMeta = {
          "Ladies Group": { icon: "👗", desc: "Gentle wash & cloud-soft folding", tag: "Soft" },
          "Men Group": { icon: "👕", desc: "Daily wear deep clean & fold", tag: "Daily" },
          "Underwear Group": { icon: "🩳", desc: "Hygienic high-temp deep wash", tag: "Hygiene" },
          "Bath Group": { icon: "🧼", desc: "Fluffy towel wash & softening", tag: "Fluffy" },
        };

        const grouped = {};
        rawProducts.forEach(prod => {
          const pName = (prod.name || "").toLowerCase();
          let gName = null;

          // Logic-ga kala saarista groups-ka (Saar "Other Services")
          if (pName.includes("men") || pName.includes("shaati")) gName = "Men Group";
          else if (pName.includes("ladi") || pName.includes("dirac")) gName = "Ladies Group";
          else if (pName.includes("underwear") || pName.includes("nigis")) gName = "Underwear Group";
          else if (pName.includes("bath") || pName.includes("shukumaan")) gName = "Bath Group";

          if (gName) {
            if (!grouped[gName]) {
              grouped[gName] = {
                details: groupMeta[gName] || { icon: "✨", desc: "Fresh & clean service", tag: "Quality" },
                items: []
              };
            }
            grouped[gName].items.push(prod);
          }
        });

        setApiServices(grouped);
      } catch (e) {
        console.error("Xogta API waa laga waayay:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchWashServices();
  }, []);

  const handleCardClick = (groupName) => {
    if (groupName === "Men Group") {
      router.push("/menpage");
    } else {
      setSelectedGroup(groupName);
    }
  };

  const serviceKeys = Object.keys(apiServices).filter(key => 
    key.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFE]">
      <Loader2 className="animate-spin text-purple-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFCFE]">
      <Navbar />

      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <AnimatePresence mode="wait">
            {!selectedGroup ? (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-lg shadow-purple-200"
                >
                  <Waves size={14} className="animate-bounce" /> Freshly Folded Daily
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-[0.8]">
                  Wash <span className="text-purple-600 italic">&</span> Fold
                </h1>

                {/* SEARCH BAR */}
                <div className="max-w-xl mx-auto relative group mb-16">
                  <div className="absolute -inset-1 bg-purple-300 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition"></div>
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input 
                      type="text"
                      placeholder="Find items to wash..."
                      className="w-full bg-white border-2 border-purple-50 py-5 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:border-purple-200 shadow-xl shadow-purple-900/5 font-bold"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {serviceKeys.map((groupName, index) => (
                    <motion.div
                      key={groupName}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -12, rotate: index % 2 === 0 ? 1 : -1 }}
                      onClick={() => handleCardClick(groupName)}
                      className="bg-white rounded-[3rem] p-10 border border-purple-50 group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-200/40 transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-purple-50/100 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 text-left">
                        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-4xl mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                          {apiServices[groupName].details.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600 bg-purple-50 px-3 py-1 rounded-lg mb-3 inline-block">
                          {apiServices[groupName].details.tag}
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">{groupName}</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{apiServices[groupName].details.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-purple-600 transition-colors">
                            <ChevronRight size={18} />
                          </div>
                          <Heart size={18} className="text-purple-100 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Qaybta muujinaysa alaabta (Items) ee group-ka la doortay */
              <motion.div key="items" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button 
                  onClick={() => setSelectedGroup(null)} 
                  className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] mb-8 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Services
                </button>
                <h2 className="text-4xl font-black text-slate-900 uppercase mb-12">{selectedGroup}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {apiServices[selectedGroup].items.map((item, idx) => (
                    <div key={idx} className="bg-white border-2 border-purple-50 p-6 rounded-[2.5rem] shadow-sm text-left">
                      <div className="text-2xl mb-4">{apiServices[selectedGroup].details.icon}</div>
                      <h4 className="font-bold text-slate-800 text-[10px] uppercase mb-1">{item.name}</h4>
                      <p className="text-purple-600 font-black text-xl">${item.price}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FLOATING ACTION BAR */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-8 left-0 w-full flex justify-center px-6 z-[100]">
        <div className="bg-white/80 backdrop-blur-xl border border-purple-100 px-8 py-4 rounded-[3rem] shadow-2xl flex items-center gap-6 max-w-lg w-full text-left">
          <div className="flex-1">
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Freshness Status</p>
            <p className="text-sm font-bold text-slate-900">
               {selectedGroup ? `Viewing ${selectedGroup}` : "Choose a group to start"}
            </p>
          </div>
          <button onClick={() => router.push("/menpage")} className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-all shadow-lg shadow-purple-200">
            <ShoppingBag size={20} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}