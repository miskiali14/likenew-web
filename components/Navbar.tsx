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

  const t = translations[lang as keyof typeof translations];

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "SO", name: "Soomaali", flag: "🇸🇴" },
  ];

  const services = [
    {
      name: "Clean and Press",
      icon: <Shirt size={18} />,
      desc: "Professional dry cleaning",
      path: "/cleanandpress",
    },
    {
      name: "Press Only",
      icon: <Wind size={18} />,
      desc: "Expert steam ironing",
      path: "/pressonly",
    },
    {
      name: "Wash and Fold",
      icon: <Waves size={18} />,
      desc: "Daily laundry care",
      path: "/washfold",
    },
    {
      name: "Bed and Bath",
      icon: <Bed size={18} />,
      desc: "Linens & towel cleaning",
      path: "/bedbath",
    },
    {
      name: "Delivery",
      icon: <Truck size={18} />,
      desc: "Doorstep pickup & drop",
      path: "/delivery",
    },
    {
      name: "Express",
      icon: <Zap size={18} />,
      desc: "Same day fast service",
      path: "/express",
    },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] font-[Ubuntu] transition-all duration-500 px-3 md:px-8 lg:px-14 ${
        scrolled
          ? "py-2 bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-b border-white/20"
          : "py-3 bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2">
        {/* LOGO + MOBILE MENU */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="LikeNew Logo"
              className="h-24 sm:h-28 md:h-32 lg:h-40 object-contain"
            />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-3 rounded-full border transition-all ${
              scrolled
                ? "bg-purple-600 text-white border-purple-400"
                : "bg-white text-gray-900 border-white/20"
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* TABLET + DESKTOP MENU */}
        <div
          className={`hidden md:flex items-center gap-5 lg:gap-8 font-black text-[9px] lg:text-[10px] uppercase tracking-[0.16em] lg:tracking-[0.2em] transition-colors duration-500 ${
            scrolled ? "text-gray-700" : "text-white/90"
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[440px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-5 grid grid-cols-2 gap-3"
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.path}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-purple-50 transition-all group/item"
                    >
                      <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-all">
                        {service.icon}
                      </div>

                      <div>
                        <div className="text-black text-[10px] font-black uppercase">
                          {service.name}
                        </div>
                        <div className="text-gray-400 text-[9px] font-medium leading-tight">
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-5 shrink-0">
          <a
            href="https://wa.me/252617372514"
            target="_blank"
            className={`hidden lg:flex items-center gap-2 font-black text-[10px] tracking-widest italic transition ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <Phone size={14} className="text-green-500" />
            {t.whatsapp}
          </a>

          <div
            className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl border ${
              scrolled
                ? "bg-purple-50 border-purple-100 text-purple-700"
                : "bg-white/10 border-white/20 text-white"
            }`}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.18em]">
              {t.open247}
            </span>
            <Clock size={14} className="text-purple-500" />
          </div>

          <div
            className="relative hidden sm:block"
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
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-50 text-black"
                    >
                      <span className="text-[10px] font-bold">
                        {l.name}
                      </span>
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="md:hidden absolute top-full left-4 right-4 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-5 z-[200] max-h-[75vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-3 text-black font-black text-[12px] uppercase tracking-widest">
              <Link onClick={closeMobile} href="/">
                Home
              </Link>

              <Link onClick={closeMobile} href="/about">
                About
              </Link>

              <div className="pt-2 text-purple-700 text-[10px]">
                Services
              </div>

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

              <Link onClick={closeMobile} href="/mobileapp">
                App
              </Link>

              <Link onClick={closeMobile} href="/lockers">
                Lockers
              </Link>

              <a
                onClick={closeMobile}
                href="https://wa.me/252617372514"
                target="_blank"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}