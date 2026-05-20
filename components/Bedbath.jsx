"use client";
import React, { useState, useEffect } from "react"; // Lagu daray useEffect
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronRight, ShoppingBag, Moon, 
  CheckCircle, Star, Sparkles, Loader2, ArrowLeft 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function BedAndBathPage() {
  const [search, setSearch] = useState("");
  const [apiServices, setApiServices] = useState({}); // Lagu daray xogta API
  const [selectedGroup, setSelectedGroup] = useState(null); // Inaad dhex gasho Group-ka
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- API FETCH LOGIC ---
  useEffect(() => {
    const fetchHomeServices = async () => {
      try {
        const response = await fetch("/api/services", { method: "POST" });
        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        // Muuqaalka Group-yada siday ahaan lahaayeen
        const groupMeta = {
          "Bath Group": { icon: "🛁", desc: "Towels, Robes & Bath Mats. Deep cleaned.", tag: "Sanitized" },
          "Bed Group": { icon: "🛏️", desc: "Bed sheets, Duvet covers & Pillows. Fresh.", tag: "Comfort" },
          "Home Items": { icon: "🏠", desc: "Curtains, Tablecloths & Sofa covers.", tag: "Pristine" },
          "Guest Linens": { icon: "🏨", desc: "Premium treatment for guest sheets.", tag: "Luxury" }
        };

        const grouped = {};
        rawProducts.forEach(prod => {
          const pName = (prod.name || "").toLowerCase();
          let gName = null;

          if (pName.includes("bath") || pName.includes("shukumaan")) gName = "Bath Group";
          else if (pName.includes("bed") || pName.includes("go'") || pName.includes("buste")) gName = "Bed Group";
          else if (pName.includes("curtain") || pName.includes("daah")) gName = "Home Items";
          else if (pName.includes("guest") || pName.includes("luxury")) gName = "Guest Linens";

          if (gName) {
            if (!grouped[gName]) {
              grouped[gName] = {
                details: groupMeta[gName] || { icon: "✨", desc: "Home essentials care", tag: "Quality" },
                items: []
              };
            }
            grouped[gName].items.push(prod);
          }
        });
        setApiServices(grouped);
      } catch (e) {
        console.error("API Error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeServices();
  }, []);

  const serviceKeys = Object.keys(apiServices).filter(key => 
    key.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9]">
      <Loader2 className="animate-spin text-purple-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FBFBF9] selection:bg-purple-100">
      <Navbar />

      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <AnimatePresence mode="wait">
            {!selectedGroup ? (
              <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-purple-100">
                  <Sparkles size={12} className="animate-pulse" /> Luxury Home Care
                </motion.div>

                <motion.h1 className="text-6xl md:text-8xl font-black text-purple-950 uppercase tracking-tighter mb-8 leading-[0.8]">
                  Bed <span className="text-purple-400 font-light italic text-7xl md:text-9xl">&</span> Bath
                </motion.h1>

                <div className="max-w-xl mx-auto relative group mb-16">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400" size={22} />
                    <input 
                      type="text"
                      placeholder="Find your home essentials..."
                      className="w-full bg-white/80 backdrop-blur-md border border-purple-100 py-6 pl-16 pr-6 rounded-2xl focus:outline-none shadow-xl font-bold text-purple-900"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* GRID DHAMMAAN GROUPS KA */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                  {serviceKeys.map((groupName) => (
                    <motion.div
                      key={groupName}
                      whileHover={{ y: -10 }}
                      onClick={() => setSelectedGroup(groupName)}
                      className="group bg-white rounded-[2.5rem] p-10 border border-purple-50 shadow-sm hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden text-left"
                    >
                      <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center text-5xl mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all">
                        {apiServices[groupName].details.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">{apiServices[groupName].details.tag}</span>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">{groupName}</h3>
                      <p className="text-slate-400 font-medium mb-8">{apiServices[groupName].details.desc}</p>
                      <div className="flex items-center gap-3 font-black text-[11px] uppercase tracking-widest text-purple-950">
                        View Items <ChevronRight size={16} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="items" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={() => setSelectedGroup(null)} className="flex items-center gap-2 text-purple-600 font-black uppercase text-[10px] mb-8">
                  <ArrowLeft size={16} /> Back to Groups
                </button>
                <h2 className="text-5xl font-black text-purple-950 uppercase mb-12 text-left">{selectedGroup}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apiServices[selectedGroup].items.map((item, idx) => (
                    <div key={idx} className="bg-white border border-purple-50 p-8 rounded-[2rem] shadow-sm text-left">
                      <div className="text-3xl mb-4">{apiServices[selectedGroup].details.icon}</div>
                      <h4 className="font-bold text-slate-800 uppercase text-sm mb-2">{item.name}</h4>
                      <p className="text-purple-600 font-black text-2xl">${item.price}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FLOATING ACTION BUTTON */}
      <motion.div className="fixed bottom-10 left-0 w-full flex justify-center px-6 z-50">
        <button 
          onClick={() => router.push("/menpage")}
          className="bg-purple-900 text-white px-14 py-7 rounded-full font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl flex items-center gap-8"
        >
          <span>Start Booking</span>
          <ShoppingBag size={20} />
        </button>
      </motion.div>
    </main>
  );
}