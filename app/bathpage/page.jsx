"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  Loader2, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "LikeNew Home Collection",
      subtitle: "Nadiifinta Roogaga, Daahyada, Maro Fadhiga iyo Agabka Guriga",
      icon: <BookOpen size={24} className="text-white" />,
      bg: "from-[#1a3668] via-slate-900 to-slate-950"
    },
    {
      title: "Kitaabka Nadiifinta Casriga Ah",
      subtitle: "Daryeel gaar ah oo loo fidiyo joodariyada iyo saliyada salaadda",
      icon: <BookOpen size={24} className="text-white" />,
      bg: "from-[#2a5298] via-slate-900 to-slate-950"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // API Fetcher oo wata Console.log si loo arko dhibka meesha uu jiro
  useEffect(() => {
    const fetchHomeServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/services", { 
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
          const data = await response.json();
          const products = data?.Products || data?.products || [];
          
          // Tani waxay kuu soo daabici doontaa dhammaan alaabta API-ga si aad Inspect u tiraahdo
          console.log("Dhammaan alaabta ka timid API-ga:", products);
          
          setRawProducts(products);
        }
      } catch (e) {
        console.error("Error fetching home items:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeServices();
  }, []);

  // Helper canbaareysan oo si ka jilicsan u gogol-xaaraya magacyada API-ga
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
    if (pName.includes("sali salaad weyn") || pName.includes("sali salaad weyn")) return "sali_salaad_weyn";
    if (pName.includes("sali salaad yar") || pName.includes("sali salaad yar")) return "sali_salaad_yar";
    
    return "default";
  };

  // Habka Sifaynta oo la roray si uu u soo saaro 10-kaas shay oo kaliya si dammaanad ah
  const homeProducts = useMemo(() => {
    const uniqueMap = new Map();
    
    // Erayada furaha u ah 10-ka shay ee aad soo qortay
    const targetHomeItems = [
      "caga", "kuraasta", "daah", "curtain", "joodari", 
      "maro fadhi", "roog", "sali salaad", "haf", "full", "ستارة"
    ];

    rawProducts.forEach(prod => {
      if (!prod || !prod.name) return;
      const cleanName = prod.name.toLowerCase().trim();

      // Hubi haddii magaca alaabta uu ka mid yahay 10-ka shay
      const isHomeItem = targetHomeItems.some(target => cleanName.includes(target));
      if (!isHomeItem) return;

      const groupKey = getHomeGroupKey(prod.name);
      if (groupKey === "default") return; 

      if (!uniqueMap.has(cleanName)) {
        uniqueMap.set(cleanName, {
          id: prod.productID || prod.id,
          displayName: prod.name,
          price: prod.price || "0.00",
          groupKey: groupKey,
          section: prod.section || "home"
        });
      }
    });

    const finalItems = Array.from(uniqueMap.values());
    console.log("Alaabta Home Care ee la sifeeyay:", finalItems);
    return finalItems;
  }, [rawProducts]);

  const filteredProducts = useMemo(() => {
    return homeProducts.filter(item => 
      item.displayName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, homeProducts]);

  const handleOrder = (item) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newItem = {
        id: `${item.id}-${item.section}`, 
        name: `${item.displayName} (Home Care)`,
        price: Number(item.price || 0),
        image: homeImageMap[item.groupKey],
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
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-slate-800">
      <Navbar />

      {/* Hero Carousel Slider */}
      <section className="relative h-[560px] flex items-center justify-center overflow-hidden bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].bg} opacity-95 z-0`}
          />
        </AnimatePresence>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-14 h-14 bg-[#2a5298] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-900/30 border border-white/10"
          >
            {slides[currentSlide].icon}
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl mx-auto mb-8 tracking-wide">
            {slides[currentSlide].subtitle}
          </p>

          <button 
            onClick={() => router.push("/services")}
            className="inline-flex items-center gap-3 bg-[#2a5298] hover:bg-[#1a3668] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20 transition-all duration-300"
          >
            Eeg Adeegyada Guriga
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="absolute bottom-6 flex gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-[#2a5298]" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 -mt-16 relative z-40">
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#2a5298]">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-800">Premium Home Care</h4>
            <p className="text-slate-400 text-xs">Nadiifinta roogaga iyo daahyada ee ugu tayada sarreeya.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#2a5298]">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-800">Fast Turnaround</h4>
            <p className="text-slate-400 text-xs">Agabka gurigaaga oo laguugu soo celiyo si degdeg ah.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#2a5298]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-800">Safe & Eco Care</h4>
            <p className="text-slate-400 text-xs">Dammaanad buuxda iyo kiimikooyin ammaan ah.</p>
          </div>
        </div>
      </section>

      {/* Search & Dynamic Items Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2a5298]">Home Collection</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mt-1">Agabka Guryaha</h2>
          </div>
          
          <div className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm flex items-center px-4 w-full md:w-80 group focus-within:ring-2 ring-purple-500/20 transition-all">
            <Search className="text-slate-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Raadi roog, daah, sali salaad..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 text-xs font-bold outline-none text-slate-800 bg-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#2a5298]" size={36} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 max-w-md mx-auto">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Wax alaab ah lama helin!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  whileHover={{ y: -8 }}
                  className="group bg-white p-3 rounded-[2.2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/5] bg-[#F8F9FA] rounded-[1.8rem] mb-4 flex items-center justify-center p-8 overflow-hidden relative">
                      <img 
                        src={homeImageMap[item.groupKey]} 
                        alt={item.displayName} 
                        className="max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-3 pb-2">
                      <h3 className="font-black text-[11px] uppercase tracking-tight text-slate-800 line-clamp-2 min-h-[32px] flex items-center">
                        {item.displayName}
                      </h3>
                      <p className="text-[12px] font-black text-[#2a5298] mt-1">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="px-3 pb-3 pt-2">
                    <button
                      onClick={() => handleOrder(item)}
                      className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest transition-all ${
                        addedId === item.id 
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/10" 
                          : "bg-slate-900 text-white hover:bg-[#2a5298]"
                      }`}
                    >
                      {addedId === item.id ? (
                        <>
                          <CheckCircle2 size={12} className="animate-pulse" />
                          Waa Lagu Daray
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={12} />
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