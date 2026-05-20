"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShoppingBag, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

// Khariidadda sawirrada ee 10-ka shay ee rasmiga ah ee Home Collection
const homeImageMap = {
  "caga_saar_weyn": "/images/large-mat.png",
  "foodaraha_kuraasta": "/images/chair-cover.png",
  "caga_saar_yar": "/images/small-mat.png",
  "daah_curtain": "/images/curtain.png",
  "joodari": "/images/mattress.png",
  "maro_fadhi_full": "/images/sofa-cover-full.png",
  "maro_fadhi_haff": "/images/sofa-cover-half.png",
  "roog": "/images/carpet.png",
  "sali_salaad_weyn": "/images/large-prayer-mat.png",
  "sali_salaad_yar": "/images/small-prayer-mat.png",
  "default": "/images/home-item.png"
};

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  // 10-ka Agab ee rasmiga ah ee Home Care Collection (Fallback Items)
  const fallbackHomeProducts = [
    { id: "h1", name: "Roog", price: "15.00", groupKey: "roog" },
    { id: "h2", name: "Daah (Curtain)", price: "5.00", groupKey: "daah_curtain" },
    { id: "h3", name: "Maro Fadhi (Full)", price: "12.00", groupKey: "maro_fadhi_full" },
    { id: "h4", name: "Maro Fadhi Haff", price: "6.00", groupKey: "maro_fadhi_haff" },
    { id: "h5", name: "Joodari", price: "20.00", groupKey: "joodari" },
    { id: "h6", name: "Foodaraha Kuraasta", price: "2.50", groupKey: "foodaraha_kuraasta" },
    { id: "h7", name: "Caga-Saar Weyn", price: "3.00", groupKey: "caga_saar_weyn" },
    { id: "h8", name: "Caga-Saar Yar", price: "1.50", groupKey: "caga_saar_yar" },
    { id: "h9", name: "Sali Salaad Weyn", price: "2.00", groupKey: "sali_salaad_weyn" },
    { id: "h10", name: "Sali Salaad Yar", price: "1.00", groupKey: "sali_salaad_yar" }
  ];

  // ==========================================
  // FETCH SERVICES FROM CLEANCLOUD API
  // ==========================================
  useEffect(() => {
    const fetchHomeServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/services", { 
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        
        const data = await response.json();
        const productsList = data?.Products || data?.products || [];
        setRawProducts(productsList);
      } catch (e) {
        console.error("API Fetch Error, using fallback static items:", e);
        setRawProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeServices();
  }, []);

  // ==========================================
  // GET IMAGE & SPECIFIC HOME PRODUCT MATCHING
  // ==========================================
  const getHomeGroupKey = (name) => {
    if (!name) return "default";
    const pName = name.toLowerCase().trim();
    
    if (pName.includes("caga-saar weyn") || pName.includes("caga saar weyn") || pName.includes("cagasaar weyn")) return "caga_saar_weyn";
    if (pName.includes("foodaraha kuraasta") || pName.includes("foodare kursi")) return "foodaraha_kuraasta";
    if (pName.includes("caga-saar yar") || pName.includes("caga saar yar") || pName.includes("cagasaar yar")) return "caga_saar_yar";
    if (pName.includes("daah") || pName.includes("curtain") || pName.includes("ستارة")) return "daah_curtain";
    if (pName.includes("joodari")) return "joodari";
    if (pName.includes("maro fadhi (full)") || pName.includes("maro fadhi full")) return "maro_fadhi_full";
    if (pName.includes("maro fadhi haff") || pName.includes("maro fadhi haf") || pName.includes("haff")) return "maro_fadhi_haff";
    if (pName.includes("roog") || pName.includes("carpet")) return "roog";
    if (pName.includes("sali salaad weyn")) return "sali_salaad_weyn";
    if (pName.includes("sali salaad yar")) return "sali_salaad_yar";
    
    return "default";
  };

  // ==========================================
  // FILTER & PROCESS HOME PRODUCTS ONLY
  // ==========================================
  const processedProducts = useMemo(() => {
    const uniqueMap = new Map();
    
    // 1. Haddii API-gu faaruq yahay, isticmaal 10-ka shay ee Home Care Fallback-ga ah
    if (!rawProducts || rawProducts.length === 0) {
      fallbackHomeProducts.forEach(prod => {
        uniqueMap.set(prod.name.toLowerCase(), {
          id: prod.id,
          displayName: prod.name,
          price: prod.price,
          groupKey: prod.groupKey,
          section: "home"
        });
      });
      return Array.from(uniqueMap.values());
    }

    // 2. Haddii API xog laga helo, sifee alaabta guriga ee saxda ah
    const targetHomeItems = [
      "caga", "kuraasta", "daah", "curtain", "joodari", 
      "maro fadhi", "roog", "sali salaad", "haf", "full", "ستارة"
    ];

    rawProducts.forEach(prod => {
      if (!prod || !prod.name) return;
      
      const cleanName = prod.name.toLowerCase().trim();
      const isHomeItem = targetHomeItems.some(target => cleanName.includes(target));
      if (!isHomeItem) return;

      const groupKey = getHomeGroupKey(prod.name);
      if (groupKey === "default") return; 

      const prodId = prod.productID || prod.id || Math.random().toString();

      if (!uniqueMap.has(cleanName)) {
        uniqueMap.set(cleanName, {
          id: prodId,
          displayName: prod.name,
          price: prod.price || "0.00",
          groupKey: groupKey,
          section: prod.section || "home"
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [rawProducts]);

  // ==========================================
  // SEARCH FILTER
  // ==========================================
  const filteredProducts = useMemo(() => {
    return processedProducts.filter((item) =>
      (item.displayName || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, processedProducts]);

  // ==========================================
  // ADD TO CART WITH SERVICE TYPE
  // ==========================================
  const handleOrder = (item) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const newItem = {
        id: `${item.id}-${item.section}`,
        name: `${item.displayName} (Home Care)`,
        price: Number(item.price || 0), 
        image: homeImageMap[item.groupKey] || homeImageMap["default"],
        quantity: 1
      };

      const existingIndex = currentCart.findIndex(i => i.id === newItem.id);
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#2a5298] mb-4 mx-auto" size={48} />
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Home Collection...</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FAFAFC]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[420px] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a5298]/10 via-slate-950/80 to-slate-950 z-10" />
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            src="/images/home-hero.png" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6 shadow-xl"
          >
            <Star size={14} className="text-[#2a5298] fill-[#2a5298] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-200">LikeNew Luxury</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-3">
            HOME COLLECTION
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto tracking-wide font-medium opacity-90">
            Nadiifinta iyo daryeelka roogaga, daahyada, maro fadhiga, joodariyada iyo dhammaan agabka guriga.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-100 flex items-center px-6 group focus-within:ring-4 ring-[#2a5298]/10 transition-all">
          <Search className="text-slate-400 mr-3 group-focus-within:text-[#2a5298]" size={20} />
          <input 
            type="text"
            placeholder="Raadi agabka guriga (roog, daah, sali salaad...)"
            className="flex-1 py-5 outline-none font-bold text-slate-800 text-sm bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.value)}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-md mx-auto">
            <p className="text-slate-400 font-medium">Wax alaab ah lama helin qaybtan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div 
                  layout
                  key={`${item.id}-home`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -12 }}
                  className="group bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] bg-[#F9FAFB] rounded-[2.2rem] mb-6 flex items-center justify-center p-10 overflow-hidden">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        src={homeImageMap[item.groupKey] || homeImageMap["default"]} 
                        alt={item.displayName} 
                        className="max-h-full object-contain z-10 drop-shadow-xl" 
                      />
                    </div>

                    {/* Info Row */}
                    <div className="px-4 pb-2">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h3 className="font-black text-[11px] uppercase tracking-tight text-slate-800 flex-1 line-clamp-2 min-h-[32px] flex items-center">
                          {item.displayName}
                        </h3>
                        <span className="font-black text-sm text-[#2a5298] whitespace-nowrap">
                          ${Number(item.price || 0).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[9px] font-bold text-[#2a5298] uppercase tracking-widest mb-6">
                        Home Care Collection
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="px-4 pb-4">
                    <button 
                      onClick={() => handleOrder(item)}
                      className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 font-black text-[10px] uppercase tracking-widest shadow-lg ${
                        addedId === item.id 
                          ? "bg-emerald-500 text-white shadow-emerald-100" 
                          : "bg-slate-900 text-white hover:bg-[#2a5298]"
                      }`}
                    >
                      {addedId === item.id ? (
                        <>
                          <CheckCircle2 size={16} className="animate-bounce" />
                          Waa Lagu Daray
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          Dalbo Hada
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