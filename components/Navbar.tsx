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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const translations = {
    EN: {
      home: "Home",
      about: "About",
      services: "Services",
      app: "App",
      lockers: "Lockers",
      express: "Express",
      delivery: "Delivery",
      open247: "Open 24/7",
    },
    SO: {
      home: "Bogga Hore",
      about: "Nagu Saabsan",
      services: "Adeegyada",
      app: "App-ka",
      lockers: "Lockers",
      express: "Express",
      delivery: "Delivery",
      open247: "Furan 24/7",
    },
  };

  const t = translations[lang];

  const languages: { code: Lang; name: string; flag: string }[] = [
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

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    setMounted(true);

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav
      suppressHydrationWarning
      className={`fixed top-0 left-0 w-full z-[100] font-[Ubuntu] transition-all duration-300 px-4 md:px-16 ${
        mounted && scrolled
          ? "h-[64px] bg-white/95 backdrop-blur-xl shadow-sm"
          : "h-[64px] bg-white"
      }`}
    >
      <div className="max-w-[1180px] h-full mx-auto flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="xl:hidden text-black p-1"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="LikeNew Logo"
              className="h-14 sm:h-16 md:h-20 lg:h-24 object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex items-center gap-10 font-black text-[10px] uppercase tracking-[0.2em] text-gray-700">
          <Link href="/" className="hover:text-[#662d8f] transition-colors">
            {t.home}
          </Link>

          <Link href="/about" className="hover:text-[#662d8f] transition-colors">
            {t.about}
          </Link>

          <div
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <div className="flex items-center gap-1.5 hover:text-[#662d8f] transition-colors">
              <span>{t.services}</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  showServices ? "rotate-180 text-[#662d8f]" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-white rounded-[2rem] shadow-2xl border border-[#825bac]/15 p-5 grid grid-cols-2 gap-3"
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.path}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#825bac]/10 transition-all"
                    >
                      <div className="bg-[#825bac]/15 p-3 rounded-2xl text-[#662d8f]">
                        {service.icon}
                      </div>

                      <div>
                        <div className="text-black text-[11px] font-black uppercase">
                          {service.name}
                        </div>
                        <div className="text-gray-400 text-[10px] normal-case">
                          {service.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/mobileapp" className="hover:text-[#662d8f] transition-colors">
            {t.app}
          </Link>

          <Link href="/lockers" className="hover:text-[#662d8f] transition-colors">
            {t.lockers}
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="https://wa.me/252617372514"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-[12px] font-semibold text-black hover:text-[#662d8f] transition-colors"
          >
            <Phone size={14} className="text-[#662d8f]" />
            <span>+252 61 737 2514</span>
          </a>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-black text-[#662d8f] uppercase tracking-[0.16em]">
            <Clock size={14} />
            <span>{t.open247}</span>
          </div>

          {/* LANGUAGE */}
          <div
            className="relative block"
            onMouseEnter={() => setShowLang(true)}
            onMouseLeave={() => setShowLang(false)}
          >
            <button
              type="button"
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl bg-white text-black hover:text-[#662d8f] transition-colors"
            >
              <Globe size={16} className="text-[#662d8f]" />
              <span className="text-[11px] font-black uppercase tracking-widest">
                {lang}
              </span>
              <ChevronDown
                size={12}
                className={`transition-transform ${showLang ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {showLang && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[120]"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
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

          {/* CART */}
          <Link href="/order">
            <motion.div
              whileTap={{ scale: 0.92 }}
              className="relative w-11 h-11 rounded-full bg-[#662d8f] text-white flex items-center justify-center"
            >
              <ShoppingCart size={18} />

              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="xl:hidden fixed inset-0 bg-black/55 z-[180]"
            />

            <motion.div
              initial={{ x: -360 }}
              animate={{ x: 0 }}
              exit={{ x: -360 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden fixed top-0 left-0 h-screen w-[78%] max-w-[330px] bg-white z-[200] shadow-2xl font-[Ubuntu] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                <h2 className="text-xl font-black text-black">Menu</h2>

                <button
                  type="button"
                  onClick={closeMobile}
                  className="text-gray-500 hover:text-[#662d8f] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <Link
                  onClick={closeMobile}
                  href="/"
                  className="block px-5 py-4 text-lg font-medium text-black border-b border-gray-100"
                >
                  {t.home}
                </Link>

                <Link
                  onClick={closeMobile}
                  href="/about"
                  className="block px-5 py-4 text-lg font-medium text-black border-b border-gray-100"
                >
                  {t.about}
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-5 py-5 text-left border-b border-gray-100"
                >
                  <span className="text-lg font-semibold text-black">
                    {t.services}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      mobileServicesOpen ? "rotate-180 text-[#662d8f]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#fbfbfb]"
                    >
                      <div className="px-5 py-5">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                          Clothing Care
                        </p>

                        {services.slice(0, 4).map((service, index) => (
                          <Link
                            key={index}
                            onClick={closeMobile}
                            href={service.path}
                            className="flex items-center gap-4 py-3 text-[15px] font-medium text-black"
                          >
                            <span className="text-[#662d8f]">
                              {service.icon}
                            </span>
                            <span>{service.name}</span>
                          </Link>
                        ))}

                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-5 mb-4">
                          Pickup & Delivery
                        </p>

                        {services.slice(4).map((service, index) => (
                          <Link
                            key={index}
                            onClick={closeMobile}
                            href={service.path}
                            className="flex items-center gap-4 py-3 text-[15px] font-medium text-black"
                          >
                            <span className="text-[#662d8f]">
                              {service.icon}
                            </span>
                            <span>{service.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  onClick={closeMobile}
                  href="/mobileapp"
                  className="block px-5 py-4 text-lg font-medium text-black border-b border-gray-100"
                >
                  {t.app}
                </Link>

                <Link
                  onClick={closeMobile}
                  href="/lockers"
                  className="block px-5 py-4 text-lg font-medium text-black border-b border-gray-100"
                >
                  {t.lockers}
                </Link>

                <Link
                  onClick={closeMobile}
                  href="/express"
                  className="block px-5 py-4 text-lg font-medium text-black border-b border-gray-100"
                >
                  {t.express}
                </Link>

                <Link
                  onClick={closeMobile}
                  href="/delivery"
                  className="block px-5 py-4 text-lg font-medium text-black border-b border-gray-100"
                >
                  {t.delivery}
                </Link>
              </div>

              <div className="border-t border-gray-100 px-5 py-4 bg-white">
                <a
                  href="https://wa.me/252617372514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] font-semibold text-black mb-2"
                >
                  <Phone size={14} className="text-[#662d8f]" />
                  <span>+252 61 737 2514</span>
                </a>

                <div className="flex items-center gap-2 text-[11px] font-black text-[#662d8f] uppercase tracking-[0.14em]">
                  <Clock size={13} />
                  <span>Open 24/7</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}