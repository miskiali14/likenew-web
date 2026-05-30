"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const HERO_SLIDES = [
  { src: "/images/her.png", title: "Expert Care" },
  { src: "/images/machine.png", title: "Fast Delivery" },
  { src: "/images/collage.png", title: "Eco Friendly" },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPhone = localStorage.getItem("likenew_phone");
      const savedAddress = localStorage.getItem("likenew_address");

      if (savedPhone) setPhone(savedPhone);
      if (savedAddress) setAddress(savedAddress);
    }
  }, []);

  const triggerError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const handleOrderSubmit = async () => {
    if (!phone || !address) {
      triggerError("Fadlan buuxi phone-ka iyo address-ka");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://cleancloudapp.com/api/addCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_token: process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN,
          customerName: phone,
          customerTel: phone,
          customerAddress: address,
          customerEmail: `${phone}@likenew.com`,
          noEmail: 0,
        }),
      });

      const data = await response.json();
      const isClient = typeof window !== "undefined";

      if (data.Success === "True") {
        if (isClient) {
          localStorage.setItem("likenew_phone", phone);
          localStorage.setItem("likenew_address", address);
          localStorage.setItem("user_status", "new");

          if (data.customerID) {
            localStorage.setItem("cleancloud_customer_id", data.customerID);
          }
        }

        router.push("/services1page");
      } else if (
        data.Error &&
        (data.Error.includes("exists") || data.Error.includes("already"))
      ) {
        if (isClient) {
          localStorage.setItem("likenew_phone", phone);
          localStorage.setItem("likenew_address", address);
          localStorage.setItem("user_status", "returning");
        }

        router.push("/services1page");
      } else {
        triggerError(data.Error || "Nidaamka CleanCloud waa uu diiday dalabka.");
      }
    } catch (error) {
      triggerError("Xiriirka server-ka waa go'an yahay. Fadlan dib u tijaabi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowOrderPopup(true);
    }, 2500);

    return () => clearTimeout(popupTimer);
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black font-sans">
      {/* ERROR */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <AlertCircle size={18} />

            <p className="text-xs font-black uppercase">
              {errorMessage}
            </p>

            <button onClick={() => setErrorMessage("")}>
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLEAN PROFESSIONAL SLIDER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0.92 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.92 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].src}
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105 transition-transform duration-[5000ms]"
              alt={HERO_SLIDES[currentSlide].title}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/25"></div>
<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="text-white text-center md:text-left drop-shadow-[0_10px_35px_rgba(0,0,0,1)]"
        >
          <motion.span
            initial={{
              letterSpacing: "0.2em",
              opacity: 0,
            }}
            animate={{
              letterSpacing: "0.5em",
              opacity: 1,
            }}
            className="text-[10px] md:text-xs font-black uppercase mb-4 block text-white drop-shadow-[0_6px_20px_rgba(0,0,0,1)]"
          >
            Laundry & Dry Cleaning
          </motion.span>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-8 drop-shadow-[0_12px_40px_rgba(0,0,0,1)]">
            HIGHLY <br />
            <span className="text-white">
              PROFESSIONAL
            </span>
            <br />
            STAFF
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4 drop-shadow-[0_8px_25px_rgba(0,0,0,1)]">
            <div className="h-[2px] w-12 bg-white"></div>

            <span className="text-[10px] uppercase font-bold tracking-widest text-white">
              Quality Guaranteed
            </span>
          </div>
        </motion.div>

        {/* RIGHT POPUP */}
        <AnimatePresence>
          {showOrderPopup && (
            <motion.div
              initial={{
                x: 50,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: 50,
                opacity: 0,
              }}
              className="bg-black/35 backdrop-blur-2xl rounded-[2.5rem] w-full max-w-[360px] overflow-hidden hidden lg:block border border-white/25 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-44 w-full rounded-[1.8rem] overflow-hidden">
                <Image
                  src="/images/pops.png"
                  fill
                  sizes="(max-width: 1024px) 0px, 360px"
                  className="object-cover"
                  alt="Promo"
                />

                <button
                  onClick={() => setShowOrderPopup(false)}
                  className="absolute top-4 right-4 bg-black/55 text-white rounded-full p-2 shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-8 py-8 text-center text-white">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6 drop-shadow-[0_8px_25px_rgba(0,0,0,1)]">
                  Quick Order
                </h3>

                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-black/30 border border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.4)] rounded-full px-6 py-3 text-xs outline-none placeholder:text-white/70 text-white focus:border-white/70 transition-all"
                  />

                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/30 border border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.4)] rounded-full px-6 py-3 text-xs outline-none placeholder:text-white/70 text-white focus:border-white/70 transition-all"
                  />
                </div>

                <button
                  disabled={loading}
                  onClick={handleOrderSubmit}
                  className="w-full bg-white text-black font-black py-4 rounded-full text-[10px] uppercase tracking-[0.2em] flex justify-center items-center disabled:opacity-50 shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    "Send Request"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CLEAN PROFESSIONAL WHITE DOTS */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "w-8 h-[3px] bg-white"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}