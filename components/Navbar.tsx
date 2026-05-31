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

export default function Navbar() {
  const [lang, setLang] = useState("EN");
  const [showLang, setShowLang] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const translations = {
    EN: {
      home: "Home",
      about: "About",
      services: "Services",
      app: "App",
      lockers: "Lockers",
      availability: "Availability",
      open247: "Open 24/7",
      whatsapp: "WhatsApp",
    },
    SO: {
      home: "Bogga Hore",
      about: "Nagu Saabsan",
      services: "Adeegyada",
      app: "App-ka",
      lockers: "Lockers",
      availability: "Furan",
      open247: "Furan 24/7",
      whatsapp: "WhatsApp",
    },
  };

  const t = translations[lang as keyof typeof translations];

  const languages = [
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-16 ${
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-b border-white/20"
          : "py-4 md:py-6 bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center cursor-pointer">
          <img
            src="/logo.png"
            alt="LikeNew Logo"
            className="h-20 md:h-32 lg:h-36 object-contain"
          />
        </Link>

        <div
          className={`hidden xl:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
            scrolled ? "text-gray-600" : "text-white/90"
          }`}
        >
          <Link href="/" className="hover:text-purple-600 transition-all">
            {t.home}
          </Link>

          <Link href="/about" className="hover:text-purple-600 transition-all">
            {t.about}
          </Link>

          <div
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <div className="flex items-center gap-1.5 hover:text-purple-600 transition-all">
              <span>{t.services}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-500 ${
                  showServices ? "rotate-180 text-purple-500" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 p-6 grid grid-cols-2 gap-4"
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.path}
                      className="flex items-center gap-4 p-3.5 rounded-3xl hover:bg-purple-50 transition-all group/item border border-transparent hover:border-purple-100"
                    >
                      <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-all">
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-black text-[11px] font-black uppercase tracking-tight">
                          {service.name}
                        </div>
                        <div className="text-gray-400 text-[10px] font-medium leading-tight">
                          {service.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/mobileapp" className="hover:text-purple-600 transition-all">
            {t.app}
          </Link>

          <Link href="/lockers" className="hover:text-purple-600 transition-all">
            {t.lockers}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div
            className={`hidden lg:flex items-center gap-3 font-black text-[11px] transition-colors duration-500 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <div className={`p-2 rounded-full ${scrolled ? "bg-green-100 text-green-600" : "bg-white/10 text-green-400"}`}>
              <Phone size={14} />
            </div>

            <a
              href="https://wa.me/252617372514"
              target="_blank"
              className="tracking-widest italic hover:text-green-500 transition"
            >
              {t.whatsapp}
            </a>
          </div>

          <div
            className="relative hidden md:flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all cursor-pointer"
            style={{
              backgroundColor: scrolled ? "rgba(124, 58, 237, 0.1)" : "rgba(255, 255, 255, 0.1)",
              borderColor: scrolled ? "rgba(124, 58, 237, 0.2)" : "rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={() => setShowHours(true)}
            onMouseLeave={() => setShowHours(false)}
          >
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${scrolled ? "text-purple-700" : "text-white"}`}>
              {t.open247}
            </span>

            <div className="bg-purple-600 p-1.5 rounded-xl shadow-lg shadow-purple-500/30 text-white">
              <Clock size={14} />
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setShowLang(true)}
            onMouseLeave={() => setShowLang(false)}
          >
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                scrolled
                  ? "bg-gray-50 border-gray-200 text-gray-900"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <Globe size={14} className="text-purple-500" />
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
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-50 transition-colors group text-black"
                    >
                      <span className="text-[10px] font-bold group-hover:text-purple-600">
                        {l.name}
                      </span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden p-3 rounded-full border transition-all ${
              scrolled
                ? "bg-purple-600 text-white border-purple-400"
                : "bg-white text-gray-900 border-white/20"
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/order">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`relative p-3 rounded-full transition-all duration-300 cursor-pointer shadow-xl border ${
                scrolled
                  ? "bg-purple-600 text-white border-purple-400"
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
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="xl:hidden absolute top-full left-4 right-4 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-5 z-[200] max-h-[75vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-3 text-black font-black text-[12px] uppercase tracking-widest">
              <Link onClick={closeMobile} href="/">Home</Link>
              <Link onClick={closeMobile} href="/about">About</Link>

              <div className="pt-2 text-purple-700 text-[10px]">Services</div>

              {services.map((service, index) => (
                <Link
                  key={index}
                  onClick={closeMobile}
                  href={service.path}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50 text-black"
                >
                  <span className="text-purple-700">{service.icon}</span>
                  <span>{service.name}</span>
                </Link>
              ))}

              <Link onClick={closeMobile} href="/mobileapp">App</Link>
              <Link onClick={closeMobile} href="/lockers">Lockers</Link>
              <a onClick={closeMobile} href="https://wa.me/252617372514" target="_blank">
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}