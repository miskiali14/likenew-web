"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  ShoppingBag,
  CheckCircle2,
  Plus,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const bathImageMap = {
  "go_sariir_hal": "/images/single-bedsheet.png",
  "go_shaal": "/images/shaal.png",
  "go_sariir_laba": "/images/double-bedsheet.png",
  ixraam: "/images/ixraam.png",
  shukumaan_weyn: "/images/large-towel.png",
  shukumaan_yar: "/images/small-towel.png",
  default: "/images/home-item.png",
};

export default function Bathpage() {
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchBathServices = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        const products = data?.Products || data?.products || [];

        setRawProducts(products);
      } catch (e) {
        console.error("Error fetching bath items:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBathServices();
  }, []);

  const getBathKey = (name) => {
    const pName = (name || "").toLowerCase().trim();

    if (
      pName.includes("go' sariir hal") ||
      pName.includes("go sariir hal") ||
      pName.includes("bed sheet for 1")
    ) {
      return "go_sariir_hal";
    }

    if (
      pName.includes("go/shaal") ||
      pName.includes("go shaal") ||
      pName.includes("shaal")
    ) {
      return "go_shaal";
    }

    if (
      pName.includes("go' sariir laba") ||
      pName.includes("go sariir laba") ||
      pName.includes("bed sheet for 2") ||
      pName.includes("غطاء سرير نفرين")
    ) {
      return "go_sariir_laba";
    }

    if (pName.includes("ixraam") || pName.includes("احرام")) {
      return "ixraam";
    }

    if (
      pName.includes("shukumaan weyn") ||
      pName.includes("large towel") ||
      pName.includes("منشفة كبيرة")
    ) {
      return "shukumaan_weyn";
    }

    if (
      pName.includes("shukumaan yar") ||
      pName.includes("small towel")
    ) {
      return "shukumaan_yar";
    }

    return null;
  };

  const bathProducts = useMemo(() => {
    const uniqueMap = new Map();

    rawProducts.forEach((prod) => {
      if (!prod || !prod.name) return;

      const key = getBathKey(prod.name);
      if (!key) return;

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          id: prod.productID || prod.id || key,
          displayName: prod.name,
          price: prod.price || "0.00",
          groupKey: key,
          section: prod.section || "bath",
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [rawProducts]);

  const filteredProducts = useMemo(() => {
    return bathProducts.filter((item) =>
      item.displayName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, bathProducts]);

  const handleOrder = (item) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const newItem = {
        id: `${item.id}-${item.section}`,
        name: `${item.displayName} (Bath Care)`,
        price: Number(item.price || 0),
        image: bathImageMap[item.groupKey] || bathImageMap.default,
        quantity: 1,
      };

      const existingIndex = currentCart.findIndex((i) => i.id === newItem.id);

      if (existingIndex > -1) {
        currentCart[existingIndex].quantity += 1;
      } else {
        currentCart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cartUpdated"));

      setAddedId(item.id);
      setTimeout(() => setAddedId(null), 1500);
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[420px] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7047A8]/10 via-black/40 to-black/50 z-10" />
                            
                                <motion.img
                                  initial={{ scale: 1.08 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                  }}
                                  src="/images/bath.png"
                                  className="w-full h-full object-cover opacity-90"
                                />
                              </div>
        

        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6"
          >
            <Star
              size={14}
              className="text-[#7047A8] fill-[#7047A8] animate-pulse"
            />

            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-100">
              LikeNew Premium
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-3">
            BATH <span className="text-[#7047A8] italic font-serif">CARE</span>
          </h1>

          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto tracking-wide font-medium opacity-90">
            Bed sheets, towels, ixraam and bath essentials cleaned with care.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 pb-40">
        <div className="mb-16 max-w-md mx-auto">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7047A8] transition-colors"
              size={18}
            />

            <input
              type="text"
              placeholder="Search bath services..."
              className="w-full bg-[#F3F3F3] border border-transparent py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7047A8]/20 focus:border-[#7047A8] transition-all font-medium text-slate-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#7047A8]" size={40} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#F3F3F3] rounded-[14px] max-w-md mx-auto">
            <p className="text-slate-400 font-medium">
              No Bath services found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#F3F3F3] rounded-[14px] min-h-[318px] p-6 flex flex-col justify-between transition-all duration-300 border border-[#7047A8]/10 hover:-translate-y-1"
                >
                  <div className="text-center">
                    <h3 className="font-bold text-[14px] text-black leading-tight mb-2">
                      {item.displayName}
                    </h3>

                    <p className="text-[11px] text-gray-500 leading-tight">
                      Professional bath and bedding cleaning
                    </p>

                    <p className="text-[11px] text-gray-500 leading-tight">
                      Ready in:{" "}
                      <span className="text-black font-bold">  Premium cleaning service</span>
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
                    <img
                      src={bathImageMap[item.groupKey] || bathImageMap.default}
                      alt={item.displayName}
                      className="max-h-[135px] object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = bathImageMap.default;
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-[18px] text-black">
                      ${Number(item.price || 0).toLocaleString()}
                    </span>

                    <button
                      onClick={() => handleOrder(item)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(112,71,168,0.25)] ${
                        addedId === item.id
                          ? "bg-[#7047A8] text-white"
                          : "bg-[#7047A8] text-white hover:bg-[#5E3B8C]"
                      }`}
                    >
                      {addedId === item.id ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}