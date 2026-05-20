"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Zap, ShieldCheck, Trash2, Loader2, ShoppingBag, PhoneCall, MessageSquareQuote, ArrowLeft, MapPin, User, Phone } from "lucide-react";
import Link from "next/link";

function OrderContent() {
  const [cartItems, setCartItems] = useState([]);
  const [isExpress, setIsExpress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", note: "" });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item => {
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
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const expressCharge = isExpress ? (subTotal * 0.5) : 0;
  const totalAmount = subTotal + expressCharge;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return alert("Dambiishaadu waa madhan tahay!");
    if (!formData.name || !formData.phone || !formData.address) return alert("Fadlan buuxi xogtaada!");

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
        service_type: isExpress ? "express" : "regular"
      };
    });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          address: formData.address,
          total: totalAmount.toFixed(2),
          is_express: isExpress,
          products: productsForAPI, 
          customer_note: formData.note ? `${formData.note}${isExpress ? " [EXPRESS ORDER - RUSH]" : ""}` : (isExpress ? "[EXPRESS ORDER - RUSH]" : "No special instructions")
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setShowSuccess(true);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert("API Error: " + (result.message || "Dalabka lama aqbalin."));
      }
    } catch (error) {
      alert("Xiriirka server-ka waa go'an yahay.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="max-w-md mx-auto text-center p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm my-12">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">Dambiishaadu waa madhan tahay</h2>
        <p className="text-slate-400 text-xs mb-8">U kuur-gal adeegyadeena si aad u dooratid dhar la dhaqo ama la istiriixeeyo.</p>
        <Link href="/menpage" className="inline-flex items-center gap-2 bg-slate-950 text-white px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-purple-600 transition-all shadow-md">
          <ArrowLeft size={14} /> Ku Noqo Dukaanka
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/10">
              <ShieldCheck size={50} />
            </motion.div>
            <h2 className="text-slate-900 font-black uppercase text-3xl mb-2 tracking-tight">Dalabka waa la helay!</h2>
            <p className="text-slate-500 text-sm max-w-sm mb-8 font-medium">Waad ku mahadsantahay doorashada LikeNew. Nidaamkayaga ayaa si toos ah u xaqiijiyey.</p>
            
            <div className="bg-purple-50/50 border border-purple-100 p-6 rounded-[2rem] max-w-md mb-10 w-full text-left flex gap-4 items-start">
              <div className="p-3 bg-purple-600 rounded-2xl text-white shrink-0">
                <PhoneCall size={20} className="animate-pulse" />
              </div>
              <div>
                <span className="font-black text-[10px] uppercase tracking-widest text-purple-600 block mb-1">LikeNew Service System</span>
                <p className="text-slate-700 font-bold text-xs leading-relaxed">
                  Dalabkaagu wuxuu si guul leh u gaaray CleanCloud. Kooxdayada ayaa kugu soo wici doonta lambarkan: <span className="text-purple-600 font-black">{formData.phone}</span>
                </p>
              </div>
            </div>

            <Link href="/" className="bg-slate-950 hover:bg-purple-600 text-white px-10 py-4.5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg transition-all duration-300">
              Hagaag, Waan Sugayaa
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Cart Items & Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase text-slate-900">Your Basket</h1>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Review items before final confirmation</p>
              </div>
              <Link href="/menpage" className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"><X size={18} /></Link>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <motion.div layout key={item.id} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 flex items-center justify-center border border-slate-100 shrink-0">
                    <img src={item.image} alt="" className="max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-[13px] uppercase tracking-wide truncate">{item.name}</h3>
                    <p className="text-[11px] font-black text-purple-600 mt-0.5">${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-xl">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-purple-600 p-0.5 transition-colors"><Minus size={12} /></button>
                    <span className="font-black text-slate-900 text-xs w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-purple-600 p-0.5 transition-colors"><Plus size={12} /></button>
                  </div>
                  
                  <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Delivery Form */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Delivery Details</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Please fill in your valid contact info</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-xl text-xs font-bold outline-none border border-slate-100 focus:border-purple-500 focus:bg-white transition-all text-slate-800" onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Phone Number" className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-xl text-xs font-bold outline-none border border-slate-100 focus:border-purple-500 focus:bg-white transition-all text-slate-800" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-5 text-slate-400" />
                <textarea placeholder="Full Address / Location" className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-xl text-xs font-bold outline-none border border-slate-100 focus:border-purple-500 focus:bg-white h-24 transition-all text-slate-800 resize-none" onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
              </div>
              
              <div className="relative group">
                <textarea 
                  placeholder="Special instructions? (e.g. Fold shirts, use less perfume)" 
                  className="w-full bg-purple-50/20 p-4 pr-12 rounded-xl text-xs font-bold outline-none border border-purple-100/60 focus:border-purple-500 focus:bg-white h-20 transition-all text-slate-800 placeholder:text-purple-300 resize-none" 
                  onChange={e => setFormData({...formData, note: e.target.value})}
                ></textarea>
                <div className="absolute right-4 top-4 text-purple-300 group-focus-within:text-purple-500 transition-colors">
                  <MessageSquareQuote size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Summary & Order CTA (Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          {/* Express Toggle Tweak */}
          <div className={`p-5 rounded-[2rem] border transition-all duration-300 flex items-center justify-between shadow-sm ${isExpress ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-100 text-slate-700'}`}>
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl ${isExpress ? 'bg-white/10 text-yellow-300' : 'bg-purple-50 text-purple-600'}`}>
                <Zap size={20} fill={isExpress ? "currentColor" : "none"} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide">Express Service</p>
                <p className={`text-[10px] font-bold mt-0.5 ${isExpress ? 'text-purple-200' : 'text-slate-400'}`}>6-Hour Delivery (+50% Fee)</p>
              </div>
            </div>
            <button onClick={() => setIsExpress(!isExpress)} className={`w-12 h-6 rounded-full flex items-center px-0.5 transition-all duration-300 ${isExpress ? 'bg-white' : 'bg-slate-200'}`}>
              <motion.div animate={{ x: isExpress ? 24 : 0 }} className={`w-5 h-5 rounded-full shadow-sm transition-colors ${isExpress ? 'bg-purple-600' : 'bg-white'}`} />
            </button>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-950/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>Subtotal</span> 
                <span className="text-white">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>Express Surcharge</span> 
                <span className={isExpress ? "text-purple-400 font-black" : "text-white"}>${expressCharge.toFixed(2)}</span>
              </div>
              
              <div className="h-[1px] bg-slate-800/80 my-2" />
              
              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Total Amount</span>
                  <span className="text-[10px] text-slate-500 font-medium">VAT & Taxes included</span>
                </div>
                <span className="text-3xl font-black text-purple-400 tracking-tight">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button 
              disabled={loading}
              onClick={handlePlaceOrder}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white py-4.5 rounded-xl font-black uppercase text-[11px] tracking-[0.15em] transition-all mt-8 flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-purple-600/10"
            >
              {loading ? <Loader2 className="animate-spin text-white" size={16} /> : "Confirm & Place Order"}
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
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-purple-600" size={32} />
        </div>
      }>
        <OrderContent />
      </Suspense>
    </main>
  );
}