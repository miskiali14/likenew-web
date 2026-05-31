"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Phone,
  Clock,
  Globe,
  Shirt,
  Waves,
  Wind,
  Bed,
  Truck,
  Zap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "EN" | "SO";

export default function Navbar() {
  const [lang, setLang] = useState<Lang>("EN");
  const [showLang, setShowLang] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const translations = {
    EN: {
      home: "Home",
      about: "About",
      services: "Services",
      app: "App",
      lockers: "Lockers",
      open247: "Open 24/7",
      whatsapp: "WhatsApp",
    },
    SO: {
      home: "Bogga Hore",
      about: "Nagu Saabsan",
      services: "Adeegyada",
      app: "App-ka",
      lockers: "Lockers",
      open247: "Furan 24/7",
      whatsapp: "WhatsApp",
    },
  };

  const t = translations[lang];

  const languages: { code: Lang; name: string; flag: string }[] = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "SO", name: "Soomaali", flag: "🇸🇴" },
  ];

  const services = [
    { name: "Clean and Press", icon: <Shirt size={18} />, desc: "Professional dry cleaning", path: "/cleanandpress" },
    { name: "Press Only", icon: <Wind size={18} />, desc: "Expert steam ironing", path: "/pressonly" },
    { name: "Wash and Fold", icon: <Waves size={18} />, desc: "Daily laundry care", path: "/washfold" },
    { name: "Bed and Bath", icon: <Bed size={18} />, desc: "Linens & towel cleaning", path: "/bedbath" },
    { name: "Delivery", icon: <Truck size={18} />, desc: "Doorstep pickup & drop", path: "/delivery" },
    { name: "Express", icon: <Zap size={18} />, desc: "Same day fast service", path: "/express" },
  ];

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] font-[Ubuntu] transition-all duration-500 px-3 md:px-16 ${
        scrolled
          ? "py-2 bg-white/90 backdrop-blur-xl shadow-lg"
          : "py-3 md:py-5 bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden p-4 rounded-full border ${
              scrolled
                ? "bg-[#662d8f] text-white border-[#825bac]"
                : "bg-white text-gray-900 border-white/20"
            }`}
          >
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          <Link href="/">
            <img
              src="/logo.png"
              alt="LikeNew Logo"
              className="h-28 sm:h-32 md:h-40 lg:h-44 object-contain"
            />
          </Link>
        </div>

        <div
          className={`hidden xl:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.2em] ${
            scrolled ? "text-gray-600" : "text-white/90"
          }`}
        >
          <Link href="/" className="hover:text-[#662d8f]">
            {t.home}
          </Link>

          <Link href="/about" className="hover:text-[#662d8f]">
            {t.about}
          </Link>

          <div
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <div className="flex items-center gap-1.5 hover:text-[#662d8f]">
              <span>{t.services}</span>
              <ChevronDown
                size={14}
                className={showServices ? "rotate-180 text-[#662d8f]" : ""}
              />
            </div>

            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-[2.5rem] shadow-2xl border border-[#825bac]/15 p-6 grid grid-cols-2 gap-4"
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.path}
                      className="flex items-center gap-4 p-3.5 rounded-3xl hover:bg-[#825bac]/10"
                    >
                      <div className="bg-[#825bac]/15 p-3 rounded-2xl text-[#662d8f]">
                        {service.icon}
                      </div>

                      <div>
                        <div className="text-black text-[11px] font-black uppercase">
                          {service.name}
                        </div>
                        <div className="text-gray-400 text-[10px]">
                          {service.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/mobileapp" className="hover:text-[#662d8f]">
            {t.app}
          </Link>

          <Link href="/lockers" className="hover:text-[#662d8f]">
            {t.lockers}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <a
            href="https://wa.me/252617372514"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-3 font-black text-[11px] ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <Phone size={14} className="text-green-500" />
            {t.whatsapp}
          </a>

          <div
            className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-2xl border"
            style={{
              backgroundColor: scrolled
                ? "rgba(102,45,143,0.10)"
                : "rgba(255,255,255,0.10)",
              borderColor: scrolled
                ? "rgba(130,91,172,0.25)"
                : "rgba(255,255,255,0.12)",
            }}
          >
            <span
              className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                scrolled ? "text-[#662d8f]" : "text-white"
              }`}
            >
              {t.open247}
            </span>

            <div className="bg-[#662d8f] p-1.5 rounded-xl text-white">
              <Clock size={14} />
            </div>
          </div>

          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setShowLang(true)}
            onMouseLeave={() => setShowLang(false)}
          >
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                scrolled
                  ? "bg-gray-50 border-gray-200 text-gray-900"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <Globe size={14} className="text-[#662d8f]" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang}
              </span>
            </button>

            <AnimatePresence>
              {showLang && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[120]"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setShowLang(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#825bac]/10 text-black"
                    >
                      <span className="text-[10px] font-bold">{l.name}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/order">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`relative p-3 rounded-full shadow-xl border ${
                scrolled
                  ? "bg-[#662d8f] text-white border-[#825bac]"
                  : "bg-white text-gray-900 border-white/20"
              }`}
            >
              <ShoppingCart size={18} />

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="xl:hidden fixed inset-0 bg-black/45 z-[180]"
            />

            <motion.div
              initial={{ opacity: 0, x: -320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -320 }}
              className="xl:hidden fixed top-0 left-0 h-screen w-[82%] max-w-[360px] bg-white z-[200] shadow-2xl p-6 overflow-y-auto font-[Ubuntu]"
            >
              <div className="flex items-center justify-between mb-8">
                <img
                  src="/logo.png"
                  alt="LikeNew Logo"
                  className="h-24 object-contain"
                />

                <button
                  onClick={closeMobile}
                  className="p-4 rounded-full bg-[#662d8f] text-white"
                >
                  <X size={30} />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-black font-black text-[16px] uppercase tracking-[0.12em]">
                <Link
                  onClick={closeMobile}
                  href="/"
                  className="py-3 border-b border-gray-100"
                >
                  Home
                </Link>

                <Link
                  onClick={closeMobile}
                  href="/about"
                  className="py-3 border-b border-gray-100"
                >
                  About
                </Link>

                <div className="pt-4 text-[#662d8f] text-[12px] tracking-[0.25em]">
                  Services
                </div>

                {services.map((service, index) => (
                  <Link
                    key={index}
                    onClick={closeMobile}
                    href={service.path}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#825bac]/10 text-black"
                  >
                    <span className="text-[#662d8f]">{service.icon}</span>
                    <span>{service.name}</span>
                  </Link>
                ))}

                <Link
                  onClick={closeMobile}
                  href="/mobileapp"
                  className="py-3 border-b border-gray-100"
                >
                  App
                </Link>

                <Link
                  onClick={closeMobile}
                  href="/lockers"
                  className="py-3 border-b border-gray-100"
                >
                  Lockers
                </Link>

                <a
                  onClick={closeMobile}
                  href="https://wa.me/252617372514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-[#662d8f] text-white text-center py-4 rounded-2xl"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}