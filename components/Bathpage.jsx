"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShoppingBag, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

// Khariidadda sawirrada ee 6-da shay ee rasmiga ah
const imageMap = {
  "go_sariir_1": "/images/single-bedsheet.png",
  "go_shaal": "/images/shaal.png",
  "go_sariir_2": "/images/double-bedsheet.png",
  "ixraam": "/images/ixraam.png",
  "shukumaan_weyn": "/images/large-towel.png",
  "shukumaan_yar": "/images/small-towel.png",
  "default": "/images/bed-bath-item.png" 
};

export default function BedBathServicesPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // URL Detector: '31' (Bed & Bath), '32' (Wash & Fold), '30' (Press Only), '29' (Clean & Press)
  const activeSection = searchParams.get("tab") || "31"; 

  // =========================
  // GET IMAGE & GENERAL MATCHING
  // =========================
  const getProductGroupKey = (name) => {
    const pName = (name || "").toLowerCase().trim().replace(/\s+/g, ' ');
    
    if (pName.includes("go' sariir hal nafar") || pName.includes("single bed")) return "go_sariir_1";
    if (pName.includes("go/shaal") || pName.includes("shaal")) return "go_shaal";
    if (pName.includes("go' sariir laba nafar") || pName.includes("bed sheet for 2") || pName.includes("غطاء سرير نفرين")) return "go_sariir_2";
    if (pName.includes("ixraam") || pName.includes("احرام")) return "ixraam";
    if (pName.includes("shukumaan weyn") || pName.includes("large towel") || pName.includes("منشفة كبيرة")) return "shukumaan_weyn";
    if (pName.includes("shukumaan yar") || pName.includes("small towel") || pName.includes("منشفة صغيرة")) return "shukumaan_yar";
    
    return null;
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
          headers: { "Content-Type": "application/json" }
        });
        
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
        
        const data = await response.json();
        const productsList = data?.Products || data?.products || [];
        setRawProducts(productsList);
      } catch (e) {
        console.error("Fetch error details:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // =========================
  // FILTER & PROCESS PRODUCTS BY TABS
  // =========================
  const processedProducts = useMemo(() => {
    const uniqueMap = new Map();
    
    rawProducts.forEach(prod => {
      if (!prod) return;
      
      const sectionId = String(prod.section || "").trim();
      const groupKey = getProductGroupKey(prod.name);
      
      // Haddii alaabtu aysan ku jirin 6-da shay ee rasmiga ah, iska dhaaf (ka saar)
      if (!groupKey) return;

      // Tab Management
      if (activeSection === "31" && sectionId !== "31") return;
      if (activeSection === "32" && sectionId !== "32") return;
      if (activeSection === "30" && sectionId !== "30") return;
      if (activeSection === "29" && (sectionId === "30" || sectionId === "31" || sectionId === "32")) return;

      const prodId = prod.productID || prod.id || Math.random().toString();

      if (!uniqueMap.has(groupKey)) {
        uniqueMap.set(groupKey, {
          id: prodId,
          displayName: prod.name, 
          price: prod.price || "0.00",
          groupKey: groupKey
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
  // ADD TO CART WITH SERVICE TYPE
  // =========================
  const handleOrder = (item) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      let serviceType = " (Bed & Bath)";
      if (activeSection === "32") serviceType = " (Wash & Fold)";
      if (activeSection === "30") serviceType = " (Press Only)";
      if (activeSection === "29") serviceType = " (Clean & Press)";

      const newItem = {
        id: `${item.id}-${activeSection}`,
        name: `${item.displayName}${serviceType}`,
        price: Number(item.price || 0), 
        image: imageMap[item.groupKey] || imageMap["default"],
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
        <Loader2 className="animate-spin text-[#6a3da1] mb-4 mx-auto" size={48} />
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Collection...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#6a3da1] text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#532e82] shadow-lg shadow-purple-500/20 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FAFAFC]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[420px] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-slate-950/80 to-slate-950 z-10" />
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            src="/images/towel-item.png" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6 shadow-xl"
          >
            <Star size={14} className="text-purple-400 fill-purple-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-200">LikeNew Care</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-3">
            {activeSection === "32" ? "WASH & FOLD" : "BED & BATH"}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto tracking-wide font-medium opacity-90">
            Premium laundry treatment for towels, luxury linens, sheets, and bath essentials.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-100 flex items-center px-6 group focus-within:ring-4 ring-purple-500/10 transition-all">
          <Search className="text-slate-400 mr-3 group-focus-within:text-[#6a3da1]" size={20} />
          <input 
            type="text"
            placeholder="Search items..."
            className="flex-1 py-5 outline-none font-bold text-slate-800 text-sm bg-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-md mx-auto">
            <p className="text-slate-400 font-medium">No items found for this service tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] bg-[#F9FAFB] rounded-[2.2rem] mb-6 flex items-center justify-center p-10 overflow-hidden">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        src={imageMap[item.groupKey] || imageMap["default"]} 
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
                        <span className="font-black text-sm text-[#6a3da1] whitespace-nowrap">
                          ${Number(item.price || 0).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[9px] font-bold text-purple-500 uppercase tracking-widest mb-6">
                        {activeSection === "31" ? "Bed & Bath Care" : "Wash & Fold Care"}
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
                          : "bg-slate-900 text-white hover:bg-[#6a3da1]"
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