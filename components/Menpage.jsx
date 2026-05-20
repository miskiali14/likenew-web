"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShoppingBag, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function MenServicesPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  // URL Detector: '30' (Press Only), '32' (Wash & Fold), '29' (Clean & Press)
  const activeSection = searchParams.get("tab") || "29"; 

  // =========================
  // IMAGE MAP
  // =========================
  const imageMap = {
    "funaanad caadi": "/images/funanadxa.png",
    "funaanad xarago": "/images/funanadcaadi.png",
    "shaati": "/images/shirts.png",
    "shirt": "/images/shirts.png",
    "qamiis baakistaani": "/images/qamis.png",
    "thobe": "/images/thobe.png",
    "qamiis": "/images/surawlaqamisbagstani.png",
    "surwaal": "/images/trousers.png",
    "trouser": "/images/short.png",
    "jiinis": "/images/jean.png",
    "jeans": "/images/jean.png",
    "cimaamad": "/images/limamad.png",
    "shemagh": "/images/limamad.png",
    "koofi": "/images/hat.png",
    "hat": "/images/hat.png",
    "طاقية": "/images/hat.png",
    "sigsaan": "/images/socks.png",
    "socks": "/images/socks.png",
    "جوارب": "/images/socks.png",
    "daba gaab": "/images/short.png",
    default: "/images/TSHIRT.png",
  };

  // =========================
  // GET IMAGE
  // =========================
  const getProductImage = (name) => {
    const pName = (name || "").toLowerCase().trim();
    const key = Object.keys(imageMap).find((k) => pName.includes(k));
    return imageMap[key] || imageMap.default;
  };

  // =========================
  // FETCH SERVICES
  // =========================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/services", {
          method: "POST",
        });

        const data = await response.json();
        const productsList = data.Products || data.products || [];
        setRawProducts(productsList);
      } catch (e) {
        console.error("API Fetch Error on Frontend:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // =========================
  // FILTER & PROCESS PRODUCTS
  // =========================
  const processedProducts = useMemo(() => {
    // 1. LIISKA WASH & FOLD (TAB=32) - KOOFI IYO SIGSAAN AYAA LAGU XADIDAL HADDA
    const strictWashFoldItems = [
      "funaanad caadi",
      "funaanad xarago",
      "jiinis",
      "daba gaab",
      // Koofi / Hat / طاقية
      "koofi",
      "hat",
      "طاقية",
      // Sigsaan / Socks / جوارب
      "sigsaan",
      "socks",
      "جوارب"
    ];

    // 2. LIISKA PRESS ONLY (TAB=30)
    const strictPressOnlyItems = [
      "cimaamad",
      "funaanad xarago",
      "surwaal",
      "daba gaab",
      "funaanad caadi",
      "jiinis",
      "qamiis",
      "shaati"
    ];

    // 3. LIISKA GUUD EE MEN'S CLEAN & PRESS (TAB=29)
    const strictMenItems = [
      "cimaamad",
      "daba gaab",
      "funaanad caadi",
      "funaanad xarago",
      "jiinis",
      "qamiis & surwaal baakistaani",
      "qamiis baakistaani",
      "qamiis",
      "shaati",
      "surwaal",
      // Koofi
      "koofi",
      "hat",
      "طاقية",
      // Sigsaan
      "sigsaan",
      "socks",
      "جوارب"
    ];

    const uniqueMap = new Map();

    rawProducts.forEach(prod => {
      if (!prod) return;

      const sectionId = String(prod.section || "").trim();
      const pName = (prod.name || "").toLowerCase().trim().replace(/\s+/g, ' ');

      const isExplicitExcluded = 
        pName.includes("hoos gashi") || 
        pName.includes("surwaal hoose") || 
        pName.includes("sports") || 
        pName.includes("futashaa") || 
        pName.includes("futo-shaa");

      if (isExplicitExcluded) return;

      // A. HADDII LA JOOGO PRESS ONLY (TAB=30)
      if (activeSection === "30") {
        if (sectionId !== "30") return;
        const isStrictMatch = strictPressOnlyItems.some(allowedItem => pName.includes(allowedItem));
        if (!isStrictMatch) return;
      } 
      
      // B. HADDII LA JOOGO WASH & FOLD (TAB=32)
      else if (activeSection === "32") {
        if (sectionId !== "32") return;
        const isWashFoldMatch = strictWashFoldItems.some(allowedItem => pName.includes(allowedItem));
        if (!isWashFoldMatch) return;
      } 
      
      // C. HADDII LA JOOGO CLEAN & PRESS (TAB=29)
      else {
        if (activeSection === "31" && sectionId !== "31") return;
        if (activeSection === "29" && (sectionId === "30" || sectionId === "31" || sectionId === "32")) return;

        const isStrictMenItem = strictMenItems.some(keyword => pName.includes(keyword));
        if (!isStrictMenItem) return;
      }

      const prodId = prod.productID || prod.id || Math.random().toString();

      if (!uniqueMap.has(prodId)) {
        uniqueMap.set(prodId, {
          id: prodId,
          displayName: prod.name,
          price: prod.price || "0.00"
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [rawProducts, activeSection]);

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredProducts = useMemo(() => {
    return processedProducts.filter((item) =>
      (item.displayName || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, processedProducts]);

  // =========================
  // ADD TO CART
  // =========================
  const handleOrder = (item) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      let serviceType = " (Dry Clean)";
      if (activeSection === "30") serviceType = " (Press Only)";
      if (activeSection === "32") serviceType = " (Wash & Fold)";
      if (activeSection === "31") serviceType = " (Bed & Bath)";

      const newItem = {
        id: `${item.id}-${activeSection}`,
        name: `${item.displayName}${serviceType}`,
        price: Number(item.price || 0),
        image: getProductImage(item.displayName),
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
      setTimeout(() => {
        setAddedId(null);
      }, 1500);
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="animate-spin text-purple-600 mb-4 mx-auto" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Loading Men's Collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src="/images/heromen.png"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6"
          >
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
              LikeNew Men's Care
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            WARDROBE <span className="text-purple-500 italic">FRESH</span>
          </h1>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-100 flex items-center px-6 group focus-within:ring-4 ring-purple-500/10 transition-all">
          <Search className="text-slate-400 mr-3 group-focus-within:text-purple-600" size={20} />
          <input
            type="text"
            placeholder="Search clothes..."
            className="flex-1 py-5 outline-none font-bold text-slate-800 text-sm bg-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 font-bold text-sm">
              No items found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div
                  layout
                  key={`${item.id}-${activeSection}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -12 }}
                  className="group bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/5] bg-[#F9FAFB] rounded-[2.2rem] mb-6 flex items-center justify-center p-10 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={getProductImage(item.displayName)}
                        alt={item.displayName}
                        className="max-h-full object-contain z-10 drop-shadow-xl"
                      />
                    </div>

                    <div className="px-4 pb-2">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h3 className="font-black text-[11px] uppercase tracking-tight text-slate-800 flex-1 line-clamp-2 min-h-[32px] flex items-center">
                          {item.displayName}
                        </h3>
                        <span className="font-black text-sm text-purple-600 whitespace-nowrap">
                          ${Number(item.price || 0).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[9px] font-bold text-purple-500 uppercase tracking-widest mb-6">
                        {activeSection === "30" ? "Istirin Kaliya" : activeSection === "32" ? "Dhaqis & Laabid" : "Nadiifin & Istirin"}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      onClick={() => handleOrder(item)}
                      className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 font-black text-[10px] uppercase tracking-widest shadow-lg ${
                        addedId === item.id
                          ? "bg-emerald-500 text-white shadow-emerald-100"
                          : "bg-slate-900 text-white hover:bg-purple-600"
                      }`}
                    >
                      {addedId === item.id ? (
                        <>
                          <CheckCircle2 size={16} className="animate-bounce" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          Add To Order
                        </>
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