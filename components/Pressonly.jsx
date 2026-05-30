"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function PressOnlyPage() {
  const [search, setSearch] = useState("");
  const [apiServices, setApiServices] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const groupMeta = {
    "Men Group": {
      icon: "👔",
      desc: "Crisp Shirt & Trouser Pressing",
      tag: "Sharp",
      route: "/menpage",
    },
    "Ladies Group": {
      icon: "👗",
      desc: "Expert Steam Ironing for Dresses",
      tag: "Gentle",
      route: "/ladiespage",
    },
    "Suit Group": {
      icon: "🧥",
      desc: "Professional Suit Finishing",
      tag: "Executive",
      route: "/suitpage",
    },
    "Dress Group": {
      icon: "💃",
      desc: "Evening Wear & Uniform Pressing",
      tag: "Elegant",
      route: "/dressgrouppage",
    },
    Traditional: {
      icon: "👳",
      desc: "Macawiis, Shaal & Traditional Pressing",
      tag: "Cultural",
      route: "/traditionalpage",
    },
    Underwear: {
      icon: "🩳",
      desc: "Flat Pressing for Innerwear",
      tag: "Basic",
      route: "/underwearpage",
    },
    Sportswear: {
      icon: "👕",
      desc: "Low Heat Sportswear Pressing",
      tag: "Fast",
      route: "/sportswearpage",
    },
    Shoes: {
      icon: "👟",
      desc: "Shoe care and finishing",
      tag: "Clean",
      route: "/shoespage",
    },
    Bags: {
      icon: "🎒",
      desc: "Bag care and finishing",
      tag: "Premium",
      route: "/bagspage",
    },
  };

  useEffect(() => {
    const fetchPressServices = async () => {
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

          // PRESS ONLY KALIYA
          if (sectionId !== "30") return;

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
            pName.includes("suit") ||
            pName.includes("suud") ||
            pName.includes("jacket") ||
            pName.includes("jaakad") ||
            pName.includes("blazer") ||
            pName.includes("garabaati") ||
            pName.includes("tie")
          ) {
            gName = "Suit Group";
          } else if (
            pName.includes("dress") ||
            pName.includes("uniform") ||
            pName.includes("gown") ||
            pName.includes("doctor") ||
            pName.includes("police") ||
            pName.includes("military") ||
            pName.includes("traffic") ||
            pName.includes("ixraam")
          ) {
            gName = "Dress Group";
          } else if (
            pName.includes("traditional") ||
            pName.includes("futashaari") ||
            pName.includes("macawiis") ||
            pName.includes("shaal") ||
            pName.includes("cimaamad") ||
            pName.includes("shemagh")
          ) {
            gName = "Traditional";
          } else if (
            pName.includes("underwear") ||
            pName.includes("nigis") ||
            pName.includes("buumo") ||
            pName.includes("funaanad hoose") ||
            pName.includes("surwaal hoose")
          ) {
            gName = "Underwear";
          } else if (
            pName.includes("sport") ||
            pName.includes("sportswear") ||
            pName.includes("jersey")
          ) {
            gName = "Sportswear";
          } else if (
            pName.includes("kabo") ||
            pName.includes("shoe") ||
            pName.includes("sneaker") ||
            pName.includes("saandal")
          ) {
            gName = "Shoes";
          } else if (
            pName.includes("boorso") ||
            pName.includes("bag") ||
            pName.includes("laptop")
          ) {
            gName = "Bags";
          }

          if (gName) {
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

    fetchPressServices();
  }, []);

  const serviceKeys = Object.keys(groupMeta).filter((key) => {
    const matchesSearch = key
      .toLowerCase()
      .includes(search.toLowerCase());

    const hasPressOnlyItems =
      apiServices[key]?.items?.length > 0;

    return matchesSearch && hasPressOnlyItems;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9FF]">
        <Loader2 className="animate-spin text-[#7047A8]" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FF]">
      <Navbar />

      <section className="pt-32 pb-40 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-8">
              Press{" "}
              <span className="text-[#7047A8] italic">Only</span>
            </h1>

            <p className="text-slate-500 text-sm max-w-xl mx-auto mb-10 font-medium">
              Choose a group to view Press Only services only.
            </p>

            <div className="max-w-xl mx-auto mb-16 relative">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search press only services..."
                className="w-full bg-white border border-slate-100 py-5 pl-16 pr-6 rounded-[1.8rem] focus:outline-none focus:border-[#7047A8]/30 shadow-xl shadow-purple-100/40 font-bold"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {serviceKeys.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-10 border border-slate-100">
                <p className="text-slate-400 font-bold text-sm">
                  No Press Only services found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceKeys.map((groupName, index) => (
                  <motion.div
                    key={groupName}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() =>
                      router.push(
                        `${groupMeta[groupName].route}?tab=30`
                      )
                    }
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-8 group cursor-pointer hover:shadow-2xl transition-all duration-500 text-left hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-[#7047A8] transition-all">
                        <span>{groupMeta[groupName].icon}</span>
                      </div>

                      <span className="text-[9px] font-black uppercase tracking-widest text-[#7047A8] bg-purple-50 px-3 py-1.5 rounded-full">
                        {groupMeta[groupName].tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 uppercase mb-2">
                      {groupName}
                    </h3>

                    <p className="text-slate-400 text-xs font-bold uppercase mb-4">
                      {groupMeta[groupName].desc}
                    </p>

                    <p className="text-[11px] font-black text-[#7047A8] mb-6">
                      {apiServices[groupName]?.items?.length || 0} Press Only Items
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#7047A8] opacity-0 group-hover:opacity-100 transition-all">
                      View Press Only Items <ChevronRight size={14} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100]">
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() => router.push("/cart")}
          className="w-full bg-[#7047A8] text-white py-6 rounded-[2.2rem] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7047A8] to-[#5E3B8C] opacity-0 group-hover:opacity-100 transition-opacity" />
          <ShoppingBag size={20} className="relative z-10" />
          <span className="relative z-10 text-sm">
            Review Order
          </span>
        </motion.button>
      </div>
    </main>
  );
}