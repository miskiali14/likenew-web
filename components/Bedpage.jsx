"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle2, Star, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

const homeImageMap = {
  kubeerto_yar: "/images/small-duvet.png",
  buste_hal: "/images/small-blanket.png",
  buste_laba: "/images/large-blanket.png",
  foodare_kubeerto: "/images/pillow-duvet.png",
  pillowcase: "/images/pillow-case.png",
  go_sariir_hal: "/images/single-bedsheet.png",
  go_sariir_laba: "/images/double-bedsheet.png",
  kubeerto_weyn: "/images/duvet.png",
  default: "/images/bed.png",
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchHomeServices = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setRawProducts(data?.Products || data?.products || []);
      } catch (e) {
        console.error("API Fetch Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeServices();
  }, []);

  const getHomeGroupKey = (name) => {
  const pName = (name || "").toLowerCase().trim();

  if (
    pName.includes("kubeerto yar")
  )
    return "kubeerto_yar";

  if (
    pName.includes("buste hal nafar")
  )
    return "buste_hal";

  if (
    pName.includes("buste laba nafar")
  )
    return "buste_laba";

  if (
    pName.includes("foodare kubeerto")
  )
    return "foodare_kubeerto";

  if (
    pName.includes("foodare") ||
    pName.includes("pillowcase") ||
    pName.includes("غطاء الوسادة")
  )
    return "pillowcase";

  if (
    pName.includes("go sariir hal nafar") ||
    pName.includes("go' sariir hal nafar")
  )
    return "go_sariir_hal";

  if (
    pName.includes("go sariir laba nafar") ||
    pName.includes("go' sariir laba nafar") ||
    pName.includes("bed sheet for 2") ||
    pName.includes("غطاء سرير نفرين")
  )
    return "go_sariir_laba";

  if (
    pName.includes("kubeerto weyn")
  )
    return "kubeerto_weyn";

  return null;
};

  const processedProducts = useMemo(() => {
    const uniqueMap = new Map();

    rawProducts.forEach((prod) => {
      if (!prod || !prod.name) return;

      const groupKey = getHomeGroupKey(prod.name);
      if (!groupKey) return;

      const productId = prod.productID || prod.id || groupKey;

      if (!uniqueMap.has(groupKey)) {
        uniqueMap.set(groupKey, {
          id: productId,
          displayName: prod.name,
          price: prod.price || "0.00",
          groupKey,
          section: prod.section || "home",
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [rawProducts]);

  const filteredProducts = useMemo(() => {
    return processedProducts.filter((item) =>
      (item.displayName || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, processedProducts]);

  const handleOrder = (item) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: `${item.id}-${item.section}`,
      name: `${item.displayName} (Home Care)`,
      price: Number(item.price || 0),
      image: homeImageMap[item.groupKey] || homeImageMap.default,
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
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#7047A8]" size={48} />
      </div>
    );
  }

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
                          src="/images/bed.png"
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
          BED <span className="text-[#7047A8] italic font-serif">CARE</span>
          </h1>

          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto tracking-wide font-medium opacity-90">
            Premium cleaning for carpets, curtains, prayer mats, sofa covers and home essentials.
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
              placeholder="Search bed services..."
              className="w-full bg-[#F3F3F3] border border-transparent py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7047A8]/20 focus:border-[#7047A8] transition-all font-medium text-slate-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#F3F3F3] rounded-[14px] max-w-md mx-auto">
            <p className="text-slate-400 font-medium">
              bed services lama helin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div
                  layout
                  key={`${item.id}-home`}
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
                      Professional home cleaning and care
                    </p>

                    <p className="text-[11px] text-gray-500 leading-tight">
                      Ready in:{" "}
                      <span className="text-black font-bold">  Premium cleaning service</span>
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
                    <img
                      src={homeImageMap[item.groupKey] || homeImageMap.default}
                      alt={item.displayName}
                      className="max-h-[135px] object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = homeImageMap.default;
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