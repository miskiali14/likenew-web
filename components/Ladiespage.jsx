"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShoppingBag, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

// IMAGE MAP-KA WAA INUU DHAMMAAN WADA HAYSTAA SI BOGGAGA KALE AYNA U BURBURIN
const imageMap = {
  "bijaamo": "/images/bijaamo.png",
  "cabaya": "/images/abaya.png",
  "abaya": "/images/abaya.png",
  "dirac": "/images/dirac.png",
  "baati": "/images/baati.png",
  "garbasaar": "/images/garbasaar.png",
  "goono": "/images/gono.png",
  "gorgorad": "/images/gorgorad.png",
  "shareer": "/images/indhosharer.png",
  "indha-shareer": "/images/indhosharer.png",
  "iskudays": "/images/iskudays.png",
  "istiriij": "/images/stiriij.png",
  "qamaar": "/images/qamaar.png",
  "headscarf": "/images/qamaar.png",
  "rajabeeto": "/images/rajabeeto.png",
  "aroos": "/images/saaako.png",
  "saako aroos": "/images/saaako.png", 
  "saako": "/images/sako2.png",            
  "taash": "/images/tash.png",
  "xijaab": "/images/hijab.png",
  "hijab": "/images/hijab.png",
  "default": "/images/itemladies.png" 
};

export default function LadiesServicesPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  
  // URL Detector: '30' (Press Only), '32' (Wash & Fold), '29' (Clean & Press)
  const activeSection = searchParams.get("tab") || "29"; 

  // =========================
  // GET PRODUCT IMAGE
  // =========================
  const getProductImage = (name) => {
    const pName = (name || "").toLowerCase().trim().replace(/\s+/g, ' ');
    if (pName.includes("aroos") || pName.includes("saako aroos") || pName.includes("saako-aroos")) {
      return imageMap["saako aroos"];
    }
    const key = Object.keys(imageMap).find(k => pName.includes(k));
    return imageMap[key] || imageMap["default"];
  };

  // =========================
  // FETCH SERVICES
  // =========================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
  // FILTER & PROCESS PRODUCTS
  // =========================
  const processedProducts = useMemo(() => {
    // 1. KALIYA KAN AYAA LOO OGOL-YAHAY WASH & FOLD (TAB=32)
    const strictWashFoldItems = [
      "gorgorad",
      "indha-shareer",
      "shareer",
      "istiriij",
      "qamaar",
      "headscarf",
      "rajabeeto"
    ];

    // 2. KALIYA KAN AYAA LOO OGOL-YAHAY PRESS ONLY (TAB=30)
    const strictPressOnlyItems = [
      "qamaar-headscarf-خمار",
      "dirac baati",
      "dirac xariir",
      "indha-shareer",
      "iskudays",
      "istiriij",
      "saako",
      "saako aroos",
      "taash",
      "xijaab"
    ];

    // 3. DHAMMAAN DHARKA DUMARKA EE CLEAN & PRESS (TAB=29)
    const allLadiesItems = [
      "bijaamo", "cabaya", "abaya", "dirac", "baati", "garbasaar", 
      "goono", "gorgorad", "shareer", "indha-shareer", "iskudays", "istiriij", 
      "qamaar", "headscarf", "rajabeeto", "saako", "taash", "xijaab", "hijab"
    ];

    const uniqueMap = new Map();

    rawProducts.forEach(prod => {
      if (!prod) return;
      
      const sectionId = String(prod.section || "").trim();
      const pName = (prod.name || "").toLowerCase().trim().replace(/\s+/g, ' ');

      // A. HADDII LA JOOGO PRESS ONLY (TAB=30)
      if (activeSection === "30") {
        if (sectionId !== "30") return; 
        const isStrictMatch = strictPressOnlyItems.some(allowedItem => {
          return pName === allowedItem || pName.includes(allowedItem);
        });
        if (!isStrictMatch) return;
      } 
      
      // B. HADDII LA JOOGO WASH & FOLD (TAB=32) - Halkan ayay ku koobantahay xaddidaaddu!
      else if (activeSection === "32") {
        if (sectionId !== "32") return; 
        const isWashFoldMatch = strictWashFoldItems.some(allowedItem => {
          return pName === allowedItem || pName.includes(allowedItem);
        });
        if (!isWashFoldMatch) return; 
      }
      
      // C. HADDII LA JOOGO CLEAN & PRESS (TAB=29)
      else {
        if (activeSection === "31" && sectionId !== "31") return;
        if (activeSection === "29" && (sectionId === "30" || sectionId === "31" || sectionId === "32")) return;

        const isLadiesItem = allLadiesItems.some(target => pName.includes(target)) || pName.includes("ladi");
        if (!isLadiesItem) return;
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
        <Loader2 className="animate-spin text-purple-600 mb-4 mx-auto" size={48} />
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Ladies Collection...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all duration-300"
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
            src="/images/itemladies.png" 
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
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-200">LikeNew Premium</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-3">
            LADIES <span className="text-purple-500 italic font-serif">CARE</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto tracking-wide font-medium opacity-90">
            Premium eco-friendly care and premium cleaning tailored for your finest garments.
          </p>
        </div>
      </section>

      {/* Search & Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-40">
        
        {/* SEARCH BAR */}
        <div className="mb-16 max-w-md mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder={`Search services...`}
              className="w-full bg-white border border-slate-200 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium text-slate-600 shadow-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-md mx-auto">
            <p className="text-slate-400 font-medium">No services found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div 
                  layout
                  key={`${item.id}-${activeSection}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-[2rem] p-4 border border-slate-100/80 shadow-sm hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] bg-gradient-to-b from-[#F9F7FC] to-[#F3EDFA] rounded-[1.6rem] mb-5 flex items-center justify-center p-8 overflow-hidden">
                      <img 
                        src={getProductImage(item.displayName)} 
                        alt={item.displayName} 
                        className="max-h-full object-contain z-10 group-hover:scale-105 transition-transform duration-500 ease-out" 
                        onError={(e) => { 
                          e.currentTarget.src = imageMap.default; 
                        }}
                      />
                      <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Info Row */}
                    <div className="px-1 mb-5 flex justify-between items-start gap-2">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-bold text-[13px] uppercase tracking-wide text-slate-800 line-clamp-2 min-h-[38px] flex items-center">
                          {item.displayName}
                        </h3>
                        <span className="text-[9px] font-bold text-purple-500 uppercase tracking-wider">
                          {activeSection === "30" ? "Istirin Kaliya" : activeSection === "32" ? "Dhaqis & Laabid" : "Nadiifin & Istirin"}
                        </span>
                      </div>
                      <span className="font-black text-base text-purple-600 whitespace-nowrap">
                        ${Number(item.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button 
                    onClick={() => handleOrder(item)}
                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] ${
                      addedId === item.id 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" 
                      : "bg-slate-950 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
                    }`}
                  >
                    {addedId === item.id ? <CheckCircle2 size={15} className="animate-bounce" /> : <ShoppingBag size={13} />}
                    {addedId === item.id ? "Added" : "Add To Order"}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}