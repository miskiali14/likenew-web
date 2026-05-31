"use client";

import { Check, Truck, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutSection() {
  const router = useRouter();

  return (
    <section
      id="about"
      className="relative bg-[#fbf8ff] py-24 px-6 md:px-16 scroll-mt-20 overflow-hidden font-[Ubuntu]"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 w-64 h-64 bg-[#662d8f]/15 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 -ml-20 w-64 h-64 bg-[#825bac]/15 rounded-full blur-3xl opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(102,45,143,0.10)] overflow-hidden border border-[#825bac]/15"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 p-8 md:p-16">
          {/* LEFT IMAGE */}
          <div className="w-full md:w-[45%] relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="relative h-[300px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/delivery.png"
                  alt="LikeNew Fast Delivery"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-[#825bac]/15">
              <div className="bg-[#825bac]/20 p-3 rounded-2xl text-[#662d8f]">
                <Truck size={24} />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase text-[#825bac] tracking-widest leading-none">
                  Fastest
                </p>
                <p className="text-sm font-black text-[#662d8f] uppercase">
                  Delivery
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="w-full md:w-[55%] space-y-8">
            <div className="space-y-4">
              <span className="text-[#662d8f] text-xs font-black uppercase tracking-[0.4em]">
                Our Story
              </span>

              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.9] uppercase tracking-tighter">
                LikeNew began <br />
                <span className="text-[#662d8f] italic">
                  with a mission
                </span>
              </h2>
            </div>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg font-medium">
              To make laundry easy and reliable. Today, we provide fast,
              high-quality cleaning services focused on customer satisfaction
              and premium garment care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-4">
              {[
                "Transparency",
                "Excellence",
                "Sustainability",
                "Customer focus",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="bg-[#662d8f] group-hover:bg-[#825bac] transition-colors rounded-full p-1 text-white">
                    <Check size={14} strokeWidth={4} />
                  </div>

                  <span className="font-black text-gray-900 text-xs uppercase tracking-wider">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BAR */}
        <div className="bg-[#fbf8ff] backdrop-blur-sm border-t border-[#825bac]/15 p-8 flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="relative w-full lg:w-72">
            <MapPin
              size={16}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-[#825bac]"
            />

            <input
              type="text"
              placeholder="Your Address"
              className="w-full pl-14 pr-6 py-4 rounded-full border border-[#825bac]/20 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#662d8f] outline-none transition-all"
            />
          </div>

          <div className="relative w-full lg:w-72">
            <Phone
              size={16}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-[#825bac]"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full pl-14 pr-6 py-4 rounded-full border border-[#825bac]/20 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#662d8f] outline-none transition-all"
            />
          </div>

          <motion.button
            onClick={() => router.push("/services1page")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#662d8f] hover:bg-[#825bac] text-white font-black px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#825bac]/30 w-full lg:w-auto"
          >
            Place Order
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}