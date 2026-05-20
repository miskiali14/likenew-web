"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wind, Zap, ShieldCheck, Search, 
  ChevronRight, ShoppingBag, SlidersHorizontal, Loader2, ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function PressOnlyPage() {
  const [search, setSearch] = useState("");
  const [apiServices, setApiServices] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Nidaamka rasmiga ah siday isugu xigaan 7-ka Card iyo routes-kooda saxda ah
  const groupMeta = {
    "Men Group": { icon: "👔", desc: "Crisp Shirt & Trouser Pressing", tag: "Sharp", route: "/menpage" },
    "Ladies Group": { icon: "👗", desc: "Expert Steam Ironing for Dresses", tag: "Gentle", route: "/ladiespage" },
    "Suit Group": { icon: "🧥", desc: "Professional Suit Finishing", tag: "Executive", route: "/suitpage" },
    "Dress Group": { icon: "💃", desc: "Evening Wear & Gown Pressing", tag: "Elegant", route: "/dresspage" },
    "Traditional": { icon: "👳", desc: "Khamis, Macawiis & Koofiyad Pressing", tag: "Cultural", route: "/traditionalpage" },
    "Underwear": { icon: "🩳", desc: "Flat Pressing for Innerwear", tag: "Basic", route: "/underwearpage" },
    "Sportswear": { icon: "👕", desc: "Low Heat Synthetic Pressing", tag: "Fast", route: "/sportswearpage" },
  };

  useEffect(() => {
    const fetchPressServices = async () => {
      try {
        const response = await fetch("/api/services", { method: "POST" });
        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        // SETUP DATA BY TABS
        const formatted = {
          "Press Only": {},
          "Bed & Bath": {},
          "Wash & Fold": {},
          "Clean & Press": {}
        };

        // Diyaarinta kooxaha hoos yimaada tab kasta
        Object.keys(groupMeta).forEach(key => {
          formatted["Press Only"][key] = [];
          formatted["Bed & Bath"][key] = [];
          formatted["Wash & Fold"][key] = [];
          formatted["Clean & Press"][key] = [];
        });

        rawProducts.forEach(prod => {
          const pName = (prod.name || "").toLowerCase();
          // Halkan waxaa loo beddelay Number si looga fogaado khaladaadka String-ka iyo Number-ka API-ga
          const sectionId = Number(prod.sectionId || prod.section_id || 0);
          let gName = null;

          if (pName.includes("men") || pName.includes("shaati")) gName = "Men Group";
          else if (pName.includes("ladi") || pName.includes("dirac")) gName = "Ladies Group";
          else if (pName.includes("suit") || pName.includes("suud")) gName = "Suit Group";
          else if (pName.includes("underwear") || pName.includes("nigis")) gName = "Underwear";
          else if (pName.includes("sport")) gName = "Sportswear";
          else if (pName.includes("dress")) gName = "Dress Group";
          else if (pName.includes("traditional")) gName = "Traditional";

          // QAABKA TIXRAACA EE LAGU SAXAY NUMBER-KA
          if (gName) {
            if (sectionId === 30) {
              if (!formatted["Press Only"][gName]) formatted["Press Only"][gName] = [];
              formatted["Press Only"][gName].push(prod);
            } 
            else if (sectionId === 31) {
              if (!formatted["Bed & Bath"][gName]) formatted["Bed & Bath"][gName] = [];
              formatted["Bed & Bath"][gName].push(prod);
            } 
            else if (sectionId === 32) {
              if (!formatted["Wash & Fold"][gName]) formatted["Wash & Fold"][gName] = [];
              formatted["Wash & Fold"][gName].push(prod);
            } 
            else {
              if (!formatted["Clean & Press"][gName]) formatted["Clean & Press"][gName] = [];
              formatted["Clean & Press"][gName].push(prod);
            }
          }
        });

        // Halkan waxaan si toos ah ugu xiraynaa xogta laga soo sifeeyay tabka "Press Only"
        const finalGroupedData = {};
        Object.keys(groupMeta).forEach(key => {
          finalGroupedData[key] = {
            details: groupMeta[key],
            items: formatted["Press Only"][key] || []
          };
        });

        setApiServices(finalGroupedData);
      } catch (e) {
        console.error("API Error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPressServices();
  }, []);

  const handleCardClick = (groupName) => {
    const targetRoute = groupMeta[groupName]?.route;
    if (targetRoute) {
      router.push(targetRoute);
    } else {
      setSelectedGroup(groupName);
    }
  };

  const serviceKeys = Object.keys(groupMeta).filter(key => 
    key.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9FF]">
      <Loader2 className="animate-spin text-[#2a5298]" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FAF9FF]">
      <Navbar />

      <section className="pt-32 pb-16 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatePresence mode="wait">
            {!selectedGroup ? (
              <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-8">
                  Press <span className="text-[#2a5298] italic">Only</span>
                </h1>

                <div className="max-w-xl mx-auto mb-16 relative">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                   <input 
                    type="text"
                    placeholder="Search pressing services..."
                    className="w-full bg-white border border-slate-100 py-5 pl-16 pr-6 rounded-[1.8rem] focus:outline-none focus:border-purple-200 shadow-xl shadow-purple-100/40 font-bold"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceKeys.map((groupName, index) => (
                    <motion.div
                      key={groupName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCardClick(groupName)}
                      className="bg-white border border-slate-100 rounded-[2.5rem] p-8 group cursor-pointer hover:shadow-2xl transition-all duration-500 text-left"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-[#2a5298] transition-all text-[#2a5298]">
                          <span className="group-hover:text-white">{groupMeta[groupName].icon}</span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#2a5298] bg-purple-50 px-3 py-1.5 rounded-full">
                          {groupMeta[groupName].tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase mb-2">{groupName}</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase mb-6">{groupMeta[groupName].desc}</p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#2a5298] opacity-0 group-hover:opacity-100 transition-all">
                        Go to Page <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="items" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={() => setSelectedGroup(null)} className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] mb-8 hover:text-[#2a5298] transition-colors">
                  <ArrowLeft size={16} /> Back to Services
                </button>
                <h2 className="text-4xl font-black text-slate-900 uppercase mb-12">{selectedGroup}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {!apiServices[selectedGroup]?.items || apiServices[selectedGroup].items.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100">
                      <p className="text-slate-400 font-medium">No items found in this section.</p>
                    </div>
                  ) : (
                    apiServices[selectedGroup].items.map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm text-left">
                        <div className="text-2xl mb-3">{apiServices[selectedGroup].details.icon}</div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">{item.name}</h4>
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

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100]">
        <motion.button 
          whileHover={{ scale: 1.03 }}
          onClick={() => router.push("/cart")} 
          className="w-full bg-[#2a5298] text-white py-6 rounded-[2.2rem] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a5298] to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          <ShoppingBag size={20} className="relative z-10" />
          <span className="relative z-10 text-sm">Review Order</span>
        </motion.button>
      </div>
    </main>
  );
}