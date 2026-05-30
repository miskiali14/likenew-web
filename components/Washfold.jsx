"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, ShoppingBag, Loader2, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function WashAndFoldPage() {
  const [search, setSearch] = useState("");
  const [apiServices, setApiServices] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const groupMeta = {
    "Ladies Group": {
      icon: "👗",
      desc: "Gentle wash & cloud-soft folding",
      tag: "Soft",
      route: "/ladiespage",
    },
    "Men Group": {
      icon: "👕",
      desc: "Daily wear deep clean & fold",
      tag: "Daily",
      route: "/menpage",
    },
    "Underwear Group": {
      icon: "🩳",
      desc: "Hygienic high-temp deep wash",
      tag: "Hygiene",
      route: "/underwearpage",
    },
    Sportswear: {
      icon: "👟",
      desc: "Fresh sportswear wash & fold",
      tag: "Fresh",
      route: "/sportswearpage",
    },
    "Bath Group": {
      icon: "🧼",
      desc: "Go' sariir, shukumaan, ixraam & bath items",
      tag: "Bath",
      route: "/bathpage",
    },
    "Dress Group": {
      icon: "💃",
      desc: "Dress & uniform wash care",
      tag: "Clean",
      route: "/dresspage",
    },
  };

  useEffect(() => {
    const fetchWashServices = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/services", {
          method: "POST",
        });

        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        const finalGroupedData = {};

        Object.keys(groupMeta).forEach((key) => {
          finalGroupedData[key] = {
            details: groupMeta[key],
            items: [],
          };
        });

        rawProducts.forEach((prod) => {
          const pName = (prod.name || "").toLowerCase();

          const sectionId = String(
            prod.sectionId ||
              prod.section_id ||
              prod.section ||
              ""
          ).trim();

          // WASH & FOLD KALIYA
          if (sectionId !== "32") return;

          let gName = null;

          if (
            pName.includes("men") ||
            pName.includes("shaati") ||
            pName.includes("shirt") ||
            pName.includes("trouser") ||
            pName.includes("surwaal") ||
            pName.includes("jeans") ||
            pName.includes("jiinis") ||
            pName.includes("qamiis") ||
            pName.includes("funaanad")
          ) {
            gName = "Men Group";
          } else if (
            pName.includes("ladi") ||
            pName.includes("lady") ||
            pName.includes("dirac") ||
            pName.includes("baati") ||
            pName.includes("abaya") ||
            pName.includes("cabayaa") ||
            pName.includes("goono") ||
            pName.includes("garbasaar") ||
            pName.includes("xijaab") ||
            pName.includes("qamaar")
          ) {
            gName = "Ladies Group";
          } else if (
            pName.includes("underwear") ||
            pName.includes("nigis") ||
            pName.includes("buumo") ||
            pName.includes("funaanad hoose") ||
            pName.includes("surwaal hoose")
          ) {
            gName = "Underwear Group";
          } else if (
            pName.includes("sport") ||
            pName.includes("sportswear") ||
            pName.includes("jersey")
          ) {
            gName = "Sportswear";
          } else if (
            pName.includes("go' sariir") ||
            pName.includes("go sariir") ||
            pName.includes("go/shaal") ||
            pName.includes("shaal") ||
            pName.includes("ixraam") ||
            pName.includes("shukumaan") ||
            pName.includes("towel") ||
            pName.includes("bed sheet") ||
            pName.includes("sheet") ||
            pName.includes("blanket") ||
            pName.includes("منشفة") ||
            pName.includes("غطاء سرير")
          ) {
            gName = "Bath Group";
          } else if (
            pName.includes("dress") ||
            pName.includes("uniform") ||
            pName.includes("doctor") ||
            pName.includes("police") ||
            pName.includes("military")
          ) {
            gName = "Dress Group";
          }

          if (gName && finalGroupedData[gName]) {
            finalGroupedData[gName].items.push(prod);
          }
        });

        setApiServices(finalGroupedData);
      } catch (e) {
        console.error("API Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchWashServices();
  }, []);

  const serviceKeys = Object.keys(groupMeta).filter((key) => {
    const matchesSearch = key.toLowerCase().includes(search.toLowerCase());
    const hasWashItems = apiServices[key]?.items?.length > 0;
    return matchesSearch && hasWashItems;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFE]">
        <Loader2 className="animate-spin text-[#7047A8]" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCFE]">
      <Navbar />

      <section className="pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="inline-flex items-center gap-2 bg-[#7047A8] text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
              <Waves size={14} className="animate-bounce" />
              Wash & Fold Only
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-[0.8]">
              Wash <span className="text-[#7047A8] italic">&</span> Fold
            </h1>

            <p className="text-slate-500 text-sm max-w-xl mx-auto mb-10 font-medium">
              Choose a group to view Wash & Fold services only.
            </p>

            <div className="max-w-xl mx-auto relative group mb-16">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7047A8]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search wash & fold services..."
                className="w-full bg-white border border-purple-50 py-5 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:border-[#7047A8]/30 font-bold"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {serviceKeys.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-10 border border-slate-100">
                <p className="text-slate-400 font-bold text-sm">
                  No Wash & Fold services found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceKeys.map((groupName, index) => (
                  <motion.div
                    key={groupName}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    onClick={() =>
                      router.push(`${groupMeta[groupName].route}?tab=32`)
                    }
                    className="bg-white rounded-[3rem] p-10 border border-purple-50 group cursor-pointer relative overflow-hidden transition-all duration-500 text-left"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-purple-50/100 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-4xl mb-8 group-hover:bg-[#7047A8] transition-all duration-500">
                        {groupMeta[groupName].icon}
                      </div>

                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7047A8] bg-purple-50 px-3 py-1 rounded-lg mb-3 inline-block">
                        {groupMeta[groupName].tag}
                      </span>

                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                        {groupName}
                      </h3>

                      <p className="text-slate-400 text-sm font-medium leading-relaxed mb-4">
                        {groupMeta[groupName].desc}
                      </p>

                      <p className="text-[11px] font-black text-[#7047A8] mb-8">
                        {apiServices[groupName]?.items?.length || 0} Wash & Fold Items
                      </p>

                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#7047A8] opacity-0 group-hover:opacity-100 transition-all">
                        View Wash & Fold Items <ChevronRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-0 w-full flex justify-center px-6 z-[100]"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-purple-100 px-8 py-4 rounded-[3rem] flex items-center gap-6 max-w-lg w-full text-left">
          <div className="flex-1">
            <p className="text-[10px] font-black text-[#7047A8] uppercase tracking-widest">
              Wash & Fold
            </p>
            <p className="text-sm font-bold text-slate-900">
              Choose a group to start
            </p>
          </div>

          <button
            onClick={() => router.push("/cart")}
            className="bg-[#7047A8] hover:bg-[#5E3B8C] text-white p-4 rounded-full transition-all"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}