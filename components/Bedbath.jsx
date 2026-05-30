"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  ShoppingBag,
  Loader2,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function BedAndBathPage() {
  const [search, setSearch] = useState("");
  const [apiServices, setApiServices] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const groupMeta = {
    "Home Items": {
      icon: "🏠",
      desc: "Curtains, carpets, sofa covers and home essentials",
      tag: "Home",
      route: "/homepage",
    },
    "Bed Group": {
      icon: "🛏️",
      desc: "Bed sheets, blankets, pillows and bedding items",
      tag: "Bed",
      route: "/bedpage",
    },
    "Bath Group": {
      icon: "🛁",
      desc: "Towels, ixraam and bath essentials",
      tag: "Bath",
      route: "/bathpage",
    },
    "Guest Group": {
      icon: "🏨",
      desc: "Guest linens and luxury room essentials",
      tag: "Guest",
      route: "/guestpage",
    },
  };

  useEffect(() => {
    const fetchBedBathServices = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        const grouped = {};

        Object.keys(groupMeta).forEach((key) => {
          grouped[key] = {
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

          // BED & BATH TAB SAX AH = 31
          if (sectionId !== "31") return;

          let gName = null;

          if (
            pName.includes("guest") ||
            pName.includes("hotel") ||
            pName.includes("luxury") ||
            pName.includes("marti") ||
            pName.includes("guest room") ||
            pName.includes("guest sheet") ||
            pName.includes("guest towel")
          ) {
            gName = "Guest Group";
          } else if (
            pName.includes("shukumaan") ||
            pName.includes("towel") ||
            pName.includes("ixraam") ||
            pName.includes("احرام") ||
            pName.includes("منشفة")
          ) {
            gName = "Bath Group";
          } else if (
            pName.includes("go' sariir") ||
            pName.includes("go sariir") ||
            pName.includes("bed") ||
            pName.includes("bedsheet") ||
            pName.includes("bed sheet") ||
            pName.includes("buste") ||
            pName.includes("blanket") ||
            pName.includes("sheet") ||
            pName.includes("pillow") ||
            pName.includes("duvet") ||
            pName.includes("comforter") ||
            pName.includes("غطاء سرير")
          ) {
            gName = "Bed Group";
          } else if (
            pName.includes("curtain") ||
            pName.includes("daah") ||
            pName.includes("roog") ||
            pName.includes("carpet") ||
            pName.includes("maro fadhi") ||
            pName.includes("sofa") ||
            pName.includes("joodari") ||
            pName.includes("caga") ||
            pName.includes("sali salaad") ||
            pName.includes("tablecloth")
          ) {
            gName = "Home Items";
          }

          if (gName && grouped[gName]) {
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

    fetchBedBathServices();
  }, []);

  const serviceKeys = Object.keys(groupMeta).filter((key) => {
    const matchesSearch = key
      .toLowerCase()
      .includes(search.toLowerCase());

    const hasItems = apiServices[key]?.items?.length > 0;

    return matchesSearch && hasItems;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9]">
        <Loader2 className="animate-spin text-[#7047A8]" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFBF9]">
      <Navbar />

      <section className="pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="inline-flex items-center gap-2 bg-purple-50 text-[#7047A8] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-purple-100">
              <Sparkles size={12} className="animate-pulse" />
              Bed & Bath Only
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-purple-950 uppercase tracking-tighter mb-8 leading-[0.8]">
              Bed{" "}
              <span className="text-[#7047A8] font-light italic text-7xl md:text-9xl">
                &
              </span>{" "}
              Bath
            </h1>

            <p className="text-slate-500 text-sm max-w-xl mx-auto mb-10 font-medium">
              Choose a group to view Bed & Bath services only.
            </p>

            <div className="max-w-xl mx-auto relative group mb-16">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7047A8]"
                size={22}
              />

              <input
                type="text"
                placeholder="Search bed & bath groups..."
                className="w-full bg-white border border-purple-100 py-6 pl-16 pr-6 rounded-2xl focus:outline-none focus:border-[#7047A8]/30 font-bold text-purple-900"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {serviceKeys.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-10 border border-slate-100">
                <p className="text-slate-400 font-bold text-sm">
                  No Bed & Bath services found.
                </p>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceKeys.map((groupName) => (
                  <motion.div
                    key={groupName}
                    whileHover={{ y: -6 }}
                    onClick={() =>
                      router.push(`${groupMeta[groupName].route}?tab=31`)
                    }
                    className="group bg-white rounded-[2.5rem] p-10 border border-purple-50 transition-all cursor-pointer relative overflow-hidden text-left"
                  >
                    <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center text-5xl mb-8 group-hover:bg-[#7047A8] transition-all">
                      {groupMeta[groupName].icon}
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-widest text-[#7047A8] mb-2 block">
                      {groupMeta[groupName].tag}
                    </span>

                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
                      {groupName}
                    </h3>

                    <p className="text-slate-400 font-medium mb-4">
                      {groupMeta[groupName].desc}
                    </p>

                    <p className="text-[11px] font-black text-[#7047A8] mb-8">
                      {apiServices[groupName]?.items?.length || 0} Bed & Bath Items
                    </p>

                    <div className="flex items-center gap-3 font-black text-[11px] uppercase tracking-widest text-purple-950">
                      View Items <ChevronRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <motion.div className="fixed bottom-10 left-0 w-full flex justify-center px-6 z-50">
        <button
          onClick={() => router.push("/cart")}
          className="bg-[#7047A8] text-white px-14 py-7 rounded-full font-black uppercase tracking-[0.3em] text-[12px] flex items-center gap-8"
        >
          <span>Review Order</span>
          <ShoppingBag size={20} />
        </button>
      </motion.div>
    </main>
  );
}