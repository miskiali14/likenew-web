"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Loader2, ArrowLeft } from "lucide-react";

export default function PremiumServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Clean & Press");
  const [servicesData, setServicesData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const collections = [
    { name: "Ladies Group", icon: "👗", color: "bg-[#825bac]/10" },
    { name: "Men Group", icon: "👕", color: "bg-[#662d8f]/10" },
    { name: "Traditional Group", icon: "👳", color: "bg-[#825bac]/10" },
    { name: "Suit Group", icon: "🧥", color: "bg-[#662d8f]/10" },
    { name: "Underwear Group", icon: "🩲", color: "bg-[#825bac]/10" },
    { name: "Sportswear Group", icon: "👟", color: "bg-[#662d8f]/10" },
    { name: "Dress Group", icon: "💃", color: "bg-[#825bac]/10" },
    { name: "Bags Group", icon: "👜", color: "bg-[#662d8f]/10" },
    { name: "Shoes Group", icon: "👟", color: "bg-[#825bac]/10" },
    { name: "Bath", icon: "🛁", color: "bg-[#662d8f]/10" },
    { name: "Bed", icon: "🛏️", color: "bg-[#825bac]/10" },
    { name: "Home", icon: "🏠", color: "bg-[#662d8f]/10" },
    { name: "Guest", icon: "🛎️", color: "bg-[#825bac]/10" },
  ];

  const handleGroupClick = (groupName) => {
    const isPressOnly = activeTab === "Press Only";
    const isWashFold = activeTab === "Wash & Fold";
    const isBedBath = activeTab === "Bed & Bath";

    let sectionParam = "?tab=29";
    if (isPressOnly) sectionParam = "?tab=30";
    if (isWashFold) sectionParam = "?tab=32";
    if (isBedBath) sectionParam = "?tab=31";

    if (groupName === "Ladies Group") router.push(`/ladiespage${sectionParam}`);
    else if (groupName === "Men Group") router.push(`/menpage${sectionParam}`);
    else if (groupName === "Underwear Group") router.push(`/underwearpage${sectionParam}`);
    else if (groupName === "Traditional Group") router.push(`/traditionalpage${sectionParam}`);
    else if (groupName === "Suit Group") router.push(`/suitpage${sectionParam}`);
    else if (groupName === "Sportswear Group") router.push(`/sportswearpage${sectionParam}`);
    else if (groupName === "Dress Group") router.push(`/dressgrouppage${sectionParam}`);
    else if (groupName === "Bags Group") router.push(`/bagsgrouppage${sectionParam}`);
    else if (groupName === "Shoes Group") router.push(`/shoesgrouppage${sectionParam}`);
    else if (groupName === "Bath") router.push(`/bathpage${sectionParam}`);
    else if (groupName === "Bed") router.push(`/bedpage${sectionParam}`);
    else if (groupName === "Home") router.push(`/homepage${sectionParam}`);
    else if (groupName === "Guest") router.push(`/guestpage${sectionParam}`);
    else setSelectedGroup(groupName);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", { method: "POST" });

        if (!response.ok) {
          setServicesData({
            "Clean & Press": {},
            "Press Only": {},
            "Wash & Fold": {},
            "Bed & Bath": {},
          });
          return;
        }

        const data = await response.json();
        const rawProducts = data.Products || data.products || [];

        const formatted = {
          "Clean & Press": {},
          "Press Only": {},
          "Wash & Fold": {},
          "Bed & Bath": {},
        };

        const targetDressItems = [
          "african dress", "زي افريقي", "aviation dress", "زي طيران مدني",
          "isku-joga xirfadlayasha", "زي المحترفين", "isku-joog waxbarasho",
          "uniform", "زي مدرسي", "ixraam", "احرام", "jaakada dhaqaatiirta",
          "doctor jacket", "جاكيت طبيب", "military dress", "زي عسكري",
          "police dress", "زي شرطي", "traffic dress", "زي مرور",
        ];

        rawProducts.forEach((prod) => {
          if (!prod) return;

          const pName = (prod.name || "").toLowerCase().trim().replace(/\s+/g, " ");
          const sectionId = String(prod.section || "").trim();
          let gName = null;

          if (pName.includes("bag") || pName.includes("boorso")) gName = "Bags Group";
          else if (pName.includes("shoe") || pName.includes("kab")) gName = "Shoes Group";
          else if (targetDressItems.some((target) => pName.includes(target))) gName = "Dress Group";
          else if (
            pName.includes("ladi") || pName.includes("dirac") || pName.includes("gorgorad") ||
            pName.includes("baati") || pName.includes("abaya") || pName.includes("cabaya") ||
            pName.includes("taash") || pName.includes("xijaab") || pName.includes("indha-shareer") ||
            pName.includes("qamaar") || pName.includes("headscarf") || pName.includes("rajabeeto") ||
            pName.includes("istiriij")
          ) gName = "Ladies Group";
          else if (
            pName.includes("underwear") || pName.includes("nigis") || pName.includes("buumo") ||
            pName.includes("garan") || pName.includes("funaanad hoose") || pName.includes("shukumaan") ||
            pName.includes("socks") || pName.includes("sigsaan") || pName.includes("towel")
          ) gName = pName.includes("shukumaan") || pName.includes("towel") ? "Bath" : "Underwear Group";
          else if (pName.includes("suit") || pName.includes("suud") || pName.includes("traffic dress")) gName = "Suit Group";
          else if (pName.includes("sport") || pName.includes("sports")) gName = "Sportswear Group";
          else if (
            pName.includes("bed") || pName.includes("sariir") || pName.includes("buste") ||
            pName.includes("go'") || pName.includes("kubeerto") || pName.includes("foodare")
          ) gName = "Bed";
          else if (
            pName.includes("daah") || pName.includes("roog") || pName.includes("maro fadhi") ||
            pName.includes("maro miis") || pName.includes("sali salaad") || pName.includes("caga-saar")
          ) gName = "Home";
          else if (pName.includes("guest") || pName.includes("marti")) gName = "Guest";
          else if (sectionId === "31") gName = "Bath";
          else if (
            pName.includes("traditional") || pName.includes("futashaari") ||
            pName.includes("macawiis") || pName.includes("sarong") ||
            pName.includes("shaal") || pName.includes("go/shaal") || pName.includes("ixraam") ||
            pName.includes("بدلة") || pName.includes("شال") || pName.includes("fوطه") ||
            pName.includes("koofi")
          ) gName = sectionId === "32" ? "Men Group" : "Traditional Group";
          else if (pName.includes("men") || (pName.includes("shaati") && !pName.includes("futashaari"))) gName = "Men Group";

          if (gName) {
            if (sectionId === "30") {
              if (!formatted["Press Only"][gName]) formatted["Press Only"][gName] = [];
              formatted["Press Only"][gName].push(prod);
            } else if (sectionId === "31") {
              if (!formatted["Bed & Bath"][gName]) formatted["Bed & Bath"][gName] = [];
              formatted["Bed & Bath"][gName].push(prod);
            } else if (sectionId === "32") {
              if (!formatted["Wash & Fold"][gName]) formatted["Wash & Fold"][gName] = [];
              formatted["Wash & Fold"][gName].push(prod);
            } else {
              if (!formatted["Clean & Press"][gName]) formatted["Clean & Press"][gName] = [];
              formatted["Clean & Press"][gName].push(prod);
            }
          }
        });

        ["Bath", "Bed", "Home", "Guest"].forEach((key) => {
          if (!formatted["Bed & Bath"][key]) {
            formatted["Bed & Bath"][key] = [{ name: "Placeholder", price: 0 }];
          }
        });

        setServicesData(formatted);
      } catch (e) {
        console.error("Error fetching services:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-[Ubuntu]">
        <Loader2 className="animate-spin text-[#662d8f]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8ff] pt-24 pb-20 px-4 md:px-6 font-[Ubuntu]">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedGroup ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8 md:mb-12 w-full">
                <div className="grid grid-cols-2 md:flex md:justify-center gap-2 bg-white p-2 rounded-[2rem] md:rounded-full border border-[#825bac]/20 shadow-sm">
                  {Object.keys(servicesData).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedGroup(null);
                      }}
                      className={`w-full md:w-auto px-3 md:px-8 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wide md:tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-[#662d8f] text-white shadow-lg shadow-[#825bac]/30"
                          : "text-gray-500 hover:text-[#662d8f] bg-[#fbf8ff] md:bg-transparent"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections
                  .filter((col) => {
                    if (activeTab === "Wash & Fold") {
                      if (col.name === "Traditional Group" || col.name === "Dress Group") return false;
                    }
                    if (activeTab === "Bed & Bath" && col.name === "Underwear Group") return false;
                    return true;
                  })
                  .map((col) => {
                    const groupName = col.name;
                    const groupItems = servicesData[activeTab]?.[groupName];

                    if (!groupItems || groupItems.length === 0) return null;

                    return (
                      <button
                        key={groupName}
                        onClick={() => handleGroupClick(groupName)}
                        className="group bg-white border border-[#825bac]/15 p-8 rounded-[2.5rem] transition-all text-left relative hover:bg-[#fbf8ff] hover:shadow-xl hover:shadow-[#825bac]/10"
                      >
                        <div
                          className={`${col.color} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500`}
                        >
                          {col.icon}
                        </div>

                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                          {groupName}
                        </h3>

                        <p className="text-[#825bac] text-xs mt-1 font-bold uppercase tracking-widest">
                          View Services
                        </p>

                        <ChevronRight className="absolute right-8 bottom-8 text-[#825bac] group-hover:text-[#662d8f] group-hover:translate-x-2 transition-all" />
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="items"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                onClick={() => setSelectedGroup(null)}
                className="flex items-center gap-2 text-gray-500 font-black uppercase text-[10px] mb-8 hover:text-[#662d8f]"
              >
                <ArrowLeft size={16} /> Back to {activeTab}
              </button>

              <h2 className="text-3xl font-black text-gray-900 uppercase mb-10">
                {selectedGroup}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesData[activeTab]?.[selectedGroup]?.map((item, idx) => {
                  if (item.name === "Placeholder") return null;

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-[#825bac]/15 p-6 rounded-[2rem] text-center shadow-sm"
                    >
                      <h4 className="font-bold text-gray-900 text-xs uppercase mb-2">
                        {item.name}
                      </h4>

                      <span className="text-[#662d8f] font-black text-lg">
                        ${Number(item.price || 0).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}