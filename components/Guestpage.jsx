"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation"; // Halkan ayaa laga saxay khalkhalkii 'navigation'
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShoppingBag, CheckCircle2, Star, UserPlus } from "lucide-react";

// Khariidadda sawirrada ee 4-ta shay oo af-Ingiriisi ah (English Image Maps)
const guestImageMap = {
  "large_quilt": "/images/large-quilt.png",
  "small_quilt": "/images/small-quilt.png",
  "large_tablecloth": "/images/large-tablecloth.png",
  "small_tablecloth": "/images/small-tablecloth.png",
  "default": "/images/guest-item.png"
};

export default function Guestpage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [rawProducts, setRawProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  // 4-ta Agab ee rasmiga ah ee Guest Page (Fallback Items)
  const fallbackGuestProducts = [
    { id: "g1", name: "Istiraasho Weyn", price: "5.00", groupKey: "large_quilt" },
    { id: "g2", name: "Istiraasho Yar", price: "3.00", groupKey: "small_quilt" },
    { id: "g3", name: "Maro Miis Weyn", price: "4.00", groupKey: "large_tablecloth" },
    { id: "g4", name: "Maro Miis Yar", price: "2.00", groupKey: "small_tablecloth" }
  ];

  useEffect(() => {
    const fetchGuestServices = async () => {
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
        console.error("API Fetch Error, using guest fallback items:", e);
        setRawProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGuestServices();
  }, []);

  const getGuestGroupKey = (name) => {
    if (!name) return "default";
    const pName = name.toLowerCase().trim();
    
    if (pName.includes("istiraasho weyn") || pName.includes("istiraashoweyn")) return "large_quilt";
    if (pName.includes("istiraasho yar") || pName.includes("istiraashoyar")) return "small_quilt";
    if (pName.includes("maro miis weyn") || pName.includes("maromiis weyn")) return "large_tablecloth";
    if (pName.includes("maro miis yar") || pName.includes("maromiis yar")) return "small_tablecloth";
    
    return "default";
  };

  const processedProducts = useMemo(() => {
    const uniqueMap = new Map();
    
    if (!rawProducts || rawProducts.length === 0) {
      fallbackGuestProducts.forEach(prod => {
        uniqueMap.set(prod.name.toLowerCase(), {
          id: prod.id,
          displayName: prod.name,
          price: prod.price,
          groupKey: prod.groupKey,
          section: "guest"
        });
      });
      return Array.from(uniqueMap.values());
    }

    const targetGuestItems = ["istiraasho", "maro miis", "maromiis"];

    rawProducts.forEach(prod => {
      if (!prod || !prod.name) return;
      
      const cleanName = prod.name.toLowerCase().trim();
      const isGuestItem = targetGuestItems.some(target => cleanName.includes(target));
      if (!isGuestItem) return;

      const groupKey = getGuestGroupKey(prod.name);
      if (groupKey === "default") return; 

      const prodId = prod.productID || prod.id || Math.random().toString();

      if (!uniqueMap.has(cleanName)) {
        uniqueMap.set(cleanName, {
          id: prodId,
          displayName: prod.name,
          price: prod.price || "0.00",
          groupKey: groupKey,
          section: prod.section || "guest"
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
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const newItem = {
        id: `${item.id}-${item.section}`,
        name: item.displayName,
        price: Number(item.price || 0), 
        image: guestImageMap[item.groupKey] || guestImageMap["default"],
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
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Guest Collection...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
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
        
        <div className="absolute top-6 right-6 z-30">
          <button 
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white font-bold text-xs transition-all shadow-lg"
          >
            <UserPlus size={14} />
            Sign In / Register
          </button>
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6 shadow-xl"
          >
            <Star size={14} className="text-[#2a5298] fill-[#2a5298] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-200">LikeNew Guest Mode</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-3">
            GUEST COLLECTION
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto tracking-wide font-medium opacity-90">
            Nadiifinta iyo daryeelka istiraashooyinka iyo maryaha miiska ee agabka rasmiga ah ee LikeNew.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-100 flex items-center px-6 group focus-within:ring-4 ring-[#2a5298]/10 transition-all">
          <Search className="text-slate-400 mr-3 group-focus-within:text-[#2a5298]" size={20} />
          <input 
            type="text"
            placeholder="Raadi (istiraasho, maro miis...)"
            className="flex-1 py-5 outline-none font-bold text-slate-800 text-sm bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                  key={`${item.id}-guest`}
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
                        src={guestImageMap[item.groupKey] || guestImageMap["default"]} 
                        alt={item.displayName} 
                        className="max-h-full object-contain z-10 drop-shadow-xl" 
                      />
                    </div>

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
                        Guest Care Collection
                      </p>
                    </div>
                  </div>
                  
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
    </div>
  );
}