"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShoppingBag, CheckCircle2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function BathWashFoldPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  // --- 1. IMAGE MAPPING FOR BATH ITEMS ---
  const imageMap = {
    "hal nafar": "/images/bedsheet1.png",
    "laba nafar": "/images/bedsheet2.png",
    "shaal": "/images/shaal.png",
    "ixraam": "/images/ixraam.png",
    "weyn": "/images/largetowel.png",
    "yar": "/images/smalltowel.png",
    "default": "/images/TSHIRT.png" 
  };

  const getProductImage = (name) => {
    const pName = (name || "").toLowerCase().trim();
    const key = Object.keys(imageMap).find(k => pName.includes(k));
    return imageMap[key] || imageMap["default"];
  };

  // --- 2. CLEANCLOUD API PRICE EXTRACTOR ---
  const extractPrice = (item) => {
    if (!item) return "0.00";
    if (typeof item.price === 'object' && item.price !== null) {
      return item.price.standard || item.price.price || item.price.amount || "0.00";
    }
    if (item.amount) return item.amount;
    if (Array.isArray(item.price) && item.price.length > 0) {
      const firstPrice = item.price[0];
      return typeof firstPrice === 'object' ? (firstPrice.standard || firstPrice.price || "0.00") : firstPrice;
    }
    return item.price || "0.00";
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", { method: "POST" });
        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        // ⚠️ CONSOLE LOG: Tani waxay ku tusaysaa dhammaan alaabta ka timid API-ga qaabka ay u qoran tahay
        console.log("--- DHAMMAAN ALAABTA API-GA KASOO DHACDAY ---", rawProducts);

        // --- 3. STRICT FILTRATION (6 SHAY OO KALIYA) ---
        const filteredBath = rawProducts.filter(prod => {
          if (!prod) return false;
          
          const rawName = prod.name || "";
          const pName = rawName.toLowerCase().replace(/['’\/]/g, "").trim();
          const currentPrice = extractPrice(prod);

          // ⚠️ CONSOLE LOG: Mid-mid u fiiri magaca asalka ah iyo qiimaha uu la soo baxo
          console.log(`Shayga la baarayo -> Magaca rasmiga ah: "${rawName}" | Qiimaha: ${currentPrice}`);
          
          // Qaybta (Category-ga) si loo xaqiijiyo adeegga Wash & Fold
          const category = (prod.categoryName || prod.serviceName || prod.category || "").toLowerCase();
          const isWashFoldService = category.includes("wash") || category.includes("fold") || pName.includes("wash") || 
                                   (!category.includes("clean") && !category.includes("iron") && !category.includes("press"));

          // --- HAB ADAG OO LAGU REEBAJO KUWA KALE (EXCLUSION) ---
          // Waxaan hubinaa in magaca uu dhab ahaan u yahay 6-daas shay midkood, isla markaana uusan wadan erayada adeegyada kale (Clean/Press)
          const isCleanOrPress = pName.includes("clean") || pName.includes("press") || pName.includes("iron") || pName.includes("dry");

          const isHalNafar = (pName.includes("hal nafar") || pName.includes("sariir hal")) && !isCleanOrPress;
          const isLabaNafar = (pName.includes("laba nafar") || pName.includes("sheet for 2") || pName.includes("نفرين")) && !isCleanOrPress;
          const isGoShaal = pName.includes("shaal") && !isCleanOrPress;
          const isIxraam = (pName.includes("ixraam") || pName.includes("احram") || pName.includes("احرام")) && !isCleanOrPress;
          const isShukumaanWeyn = (pName.includes("weyn") || pName.includes("large towel") || pName.includes("كبيرة")) && !isCleanOrPress;
          const isShukumaanYar = pName.includes("yar") && !pName.includes("weyn") && !isCleanOrPress;

          const isExact6Item = isHalNafar || isGoShaal || isLabaNafar || isIxraam || isShukumaanWeyn || isShukumaanYar;

          // Wuxuu soo celinayaa oo kaliya haddii uu yahay mid ka mid ah 6-daas shay, uuna yahay Wash & Fold
          return isExact6Item && isWashFoldService;
        });

        // Hubi inta shay ee gudubtay miirista (filtration)
        console.log("--- ALAABTA GUDUBTAY FILTERS-KA (6 SHAY KALIYA) ---", filteredBath);

        // Ka saar wixii double ah adoo raacaya magaca
        const uniqueItems = Array.from(new Map(filteredBath.map(item => [item.name, item])).values());
        setProducts(uniqueItems);
      } catch (e) {
        console.error("API Error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleOrder = (item) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const finalPrice = extractPrice(item);

    const newItem = {
      id: item.productID || item.id,
      name: item.name || item.productName,
      price: finalPrice,
      image: getProductImage(item.name || item.productName),
      quantity: 1
    };

    const isExist = currentCart.find(i => i.id === newItem.id);
    const updatedCart = isExist 
      ? currentCart.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...currentCart, newItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setAddedId(newItem.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredProducts = products.filter((item) =>
    (item.name || item.productName).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="animate-spin text-purple-600 mb-4 mx-auto" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Bath Collection...</p>
      </div>
    </div>
  );

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
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="/images/heromen.png" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Wash & Fold Service</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            BATH <span className="text-purple-500 italic">COLLECTION</span>
          </h1>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-100 flex items-center px-6 group focus-within:ring-4 ring-purple-500/10 transition-all">
          <Search className="text-slate-400 mr-3 group-focus-within:text-purple-600" size={20} />
          <input 
            type="text" 
            placeholder="Search go' sariir, shukumaan, ixraam..."
            className="flex-1 py-5 outline-none font-bold text-slate-800 text-sm bg-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 font-bold text-sm">No items found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatePresence>
              {filteredProducts.map((item) => {
                const finalPrice = extractPrice(item);

                return (
                  <motion.div 
                    layout
                    key={item.productID || item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -12 }}
                    className="group bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative aspect-[4/5] bg-[#F9FAFB] rounded-[2.2rem] mb-6 flex items-center justify-center p-10 overflow-hidden">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        src={getProductImage(item.name || item.productName)} 
                        alt={item.name} 
                        className="max-h-full object-contain z-10 drop-shadow-xl" 
                      />
                    </div>

                    <div className="px-4 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-[11px] uppercase tracking-tight text-slate-800 flex-1 pr-2 line-clamp-1">
                          {item.name || item.productName}
                        </h3>
                        <span className="font-black text-sm text-purple-600">${finalPrice}</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">Wash & Fold</p>
                      
                      <button 
                        onClick={() => handleOrder(item)}
                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 font-black text-[10px] uppercase tracking-widest shadow-lg ${
                          addedId === (item.productID || item.id) 
                          ? "bg-green-500 text-white" 
                          : "bg-slate-900 text-white hover:bg-purple-600"
                        }`}
                      >
                        {addedId === (item.productID || item.id) ? (
                          <><CheckCircle2 size={16} /> Added</>
                        ) : (
                          <><ShoppingBag size={14} /> Add To Order</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}