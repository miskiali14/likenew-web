"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Zap,
  ShieldCheck,
  Trash2,
  Loader2,
  ShoppingBag,
  PhoneCall,
  MessageSquareQuote,
  MapPin,
  User,
  Phone,
  AlertCircle,
  WifiOff,
} from "lucide-react";
import Link from "next/link";

function OrderContent() {
  const [cartItems, setCartItems] = useState([]);
  const [isExpress, setIsExpress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInternetPopup, setShowInternetPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const expressCharge = isExpress ? subTotal * 0.5 : 0;
  const totalAmount = subTotal + expressCharge;

  const handlePlaceOrder = async () => {
    setErrorMessage("");

    if (cartItems.length === 0) {
      setErrorMessage(
        "Your basket is empty. Please add items before placing an order."
      );
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage("Please fill in your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("Please fill in your phone number.");
      return;
    }

    if (!formData.address.trim()) {
      setErrorMessage("Please fill in your full address or location.");
      return;
    }

    setLoading(true);

    const productsForAPI = cartItems.map((item) => {
      const cleanCloudPrice = isExpress
        ? (Number(item.price) * 1.5).toFixed(2)
        : Number(item.price).toFixed(2);

      return {
        id: "0",
        name: item.name,
        price: cleanCloudPrice.toString(),
        quantity: item.quantity.toString(),
        pieces: item.quantity.toString(),
        is_express: isExpress ? 1 : 0,
        express: isExpress ? true : false,
        service_type: isExpress ? "express" : "regular",
      };
    });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          address: formData.address,
          total: totalAmount.toFixed(2),
          is_express: isExpress,
          products: productsForAPI,
          customer_note: formData.note
            ? `${formData.note}${isExpress ? " [EXPRESS ORDER]" : ""}`
            : isExpress
            ? "[EXPRESS ORDER]"
            : "No special instructions",
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setShowSuccess(true);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        setErrorMessage(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setShowInternetPopup(true);
      setErrorMessage("No internet connection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-10 max-w-xl w-full text-center border border-[#7047A8]/10 shadow-[0_25px_70px_rgba(15,23,42,0.08)]"
        >
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#7047A8] to-[#8A63C2] flex items-center justify-center mb-8 shadow-[0_20px_45px_rgba(112,71,168,0.25)]">
            <ShoppingBag size={50} className="text-white" />
          </div>

          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Your Basket Is Empty
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Start adding your laundry items to continue your order with LikeNew.
          </p>

          <Link
            href="/services1page"
            className="bg-[#7047A8] hover:bg-[#5E3B8C] text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all duration-300 inline-flex"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      <AnimatePresence>
        {showInternetPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-[2rem] p-7 text-center shadow-[0_30px_80px_rgba(15,23,42,0.25)] border border-red-100"
            >
              <div className="w-20 h-20 mx-auto rounded-[1.7rem] bg-red-50 text-red-500 flex items-center justify-center mb-5">
                <WifiOff size={38} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No Internet Connection
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Please connect to the internet and try placing your LikeNew
                order again.
              </p>

              <button
                onClick={() => setShowInternetPopup(false)}
                className="w-full bg-[#7047A8] hover:bg-[#5E3B8C] text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] transition-all"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-[#F7F7FB] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] p-8 md:p-10 border border-[#7047A8]/10 overflow-hidden shadow-[0_35px_90px_rgba(15,23,42,0.12)]"
            >
              <div className="absolute top-[-120px] right-[-120px] w-72 h-72 bg-[#7047A8]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-[-120px] left-[-120px] w-72 h-72 bg-violet-300/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br from-[#7047A8] to-[#8A63C2] flex items-center justify-center shadow-[0_20px_45px_rgba(112,71,168,0.35)] mb-7">
                  <ShieldCheck size={48} className="text-white" />
                </div>

                <div className="inline-flex items-center gap-2 bg-[#7047A8]/8 border border-[#7047A8]/10 px-5 py-2 rounded-full mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#7047A8] text-[10px] font-black uppercase tracking-[0.25em]">
                    LikeNew Order Confirmed
                  </span>
                </div>

                <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                  Your Order
                  <br />
                  Has Been Successfully Sent
                </h2>

                <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto mb-8 font-medium">
                  Thank you for choosing LikeNew Laundry. Your order has been
                  received successfully and our support team will contact you
                  shortly to confirm pickup and delivery details.
                </p>

                <div className="bg-[#FAFAFC] border border-slate-100 rounded-[2rem] p-6 text-left mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#7047A8] text-white flex items-center justify-center shrink-0 shadow-lg">
                      <PhoneCall size={22} />
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#7047A8] block mb-2">
                        Customer Contact
                      </span>

                      <p className="text-slate-600 text-xs font-bold leading-relaxed">
                        Our LikeNew support team will call you on:
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <div className="px-4 py-3 bg-white rounded-xl border border-slate-100 text-[#7047A8] font-black text-sm tracking-wide">
                          {formData.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="flex-1 bg-[#7047A8] hover:bg-[#5E3B8C] text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.18em] transition-all duration-300 shadow-[0_12px_30px_rgba(112,71,168,0.28)]"
                  >
                    Back To Home
                  </Link>

                  <Link
                    href="/services1page"
                    className="flex-1 border border-[#7047A8]/15 text-[#7047A8] hover:bg-[#7047A8]/5 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.18em] transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#7047A8]/10 shadow-[0_15px_50px_rgba(15,23,42,0.04)]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-black uppercase text-slate-900">
                  Your Basket
                </h1>

                <p className="text-xs text-slate-400 mt-1">
                  Review your selected items
                </p>
              </div>

              <Link
                href="/services1page"
                className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <X size={18} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="flex items-center gap-4 py-5"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt=""
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm truncate">
                      {item.name}
                    </h3>

                    <p className="text-[#7047A8] font-black text-xs mt-1">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-slate-400 hover:text-[#7047A8]"
                    >
                      <Minus size={12} />
                    </button>

                    <span className="font-black text-xs text-slate-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-slate-400 hover:text-[#7047A8]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-[#7047A8]/10 space-y-5 shadow-[0_15px_50px_rgba(15,23,42,0.04)]">
            <div>
              <h2 className="text-lg font-black uppercase text-slate-900">
                Delivery Details
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Enter your correct contact information
              </p>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-xl text-sm font-bold border border-slate-100 outline-none focus:border-[#7047A8] focus:bg-white transition-all"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    });
                    setErrorMessage("");
                  }}
                />
              </div>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-xl text-sm font-bold border border-slate-100 outline-none focus:border-[#7047A8] focus:bg-white transition-all"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    });
                    setErrorMessage("");
                  }}
                />
              </div>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-4 top-5 text-slate-400"
                />

                <textarea
                  placeholder="Full Address / Location"
                  value={formData.address}
                  className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-xl h-24 resize-none text-sm font-bold border border-slate-100 outline-none focus:border-[#7047A8] focus:bg-white transition-all"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    });
                    setErrorMessage("");
                  }}
                ></textarea>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Special Instructions"
                  value={formData.note}
                  className="w-full bg-purple-50/30 p-4 pr-12 rounded-xl h-20 resize-none text-sm font-bold border border-purple-100 outline-none focus:border-[#7047A8] focus:bg-white transition-all"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      note: e.target.value,
                    })
                  }
                ></textarea>

                <MessageSquareQuote
                  size={16}
                  className="absolute right-4 top-4 text-purple-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div
            className={`p-5 rounded-[2rem] border flex items-center justify-between transition-all ${
              isExpress
                ? "bg-[#7047A8] border-[#7047A8] text-white"
                : "bg-white border-[#7047A8]/10 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${
                  isExpress
                    ? "bg-white/10 text-yellow-300"
                    : "bg-purple-50 text-[#7047A8]"
                }`}
              >
                <Zap size={20} />
              </div>

              <div>
                <p className="text-xs font-black uppercase">
                  Express Service
                </p>

                <p className="text-[10px] opacity-70">
                  6-Hour Delivery (+50%)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpress(!isExpress)}
              className={`w-12 h-6 rounded-full flex items-center px-0.5 transition-all ${
                isExpress ? "bg-white" : "bg-slate-200"
              }`}
            >
              <motion.div
                animate={{ x: isExpress ? 24 : 0 }}
                className={`w-5 h-5 rounded-full ${
                  isExpress ? "bg-[#7047A8]" : "bg-white"
                }`}
              />
            </button>
          </div>

          <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
            <h3 className="text-sm uppercase tracking-widest text-slate-400 font-black mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Express Charge</span>
                <span>${expressCharge.toFixed(2)}</span>
              </div>

              <div className="h-[1px] bg-slate-800 my-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-wide text-slate-400 font-black">
                  Total
                </span>

                <span className="text-3xl font-black text-purple-400">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-[#7047A8] hover:bg-[#5E3B8C] disabled:bg-slate-800 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Confirm & Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] py-16 px-4 md:px-8">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#7047A8]" size={32} />
          </div>
        }
      >
        <OrderContent />
      </Suspense>
    </main>
  );
}