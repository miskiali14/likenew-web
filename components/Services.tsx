"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link"; // 1. Tani waa muhiim si aad u dhex gashid boggaga

const services = [
  {
    title: "Business Attire",
    image: "/images/bg.png",
    href: "/services/business", // 2. Waa in href walba lagu daraa halkaan
  },
  {
    title: "Outerwear Dry Cleaning",
    image: "/images/beero.png",
    href: "/services/outerwear", 
  },
  {
    title: "Casual Clothing Dry Cleaning",
    image: "/images/sariir.png",
    href: "/services/casual",
  },
  {
    title: "Folding Services",
    image: "/images/lalaabid.png",
    href: "/services/folding",
  },
  {
    title: "Washing Services",
    image: "/images/dhaqid.png",
    href: "/services/washing",
  },
];

export default function ServiceGrid() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP TEXT SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gray-500 text-sm leading-relaxed">
            Experience our professional dry cleaning and laundry services for clothing, shoes, accessories, and home textiles. 
            LIKeNEW has extensive experience working with various items.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            /* 3. Link ayaan u beddelay div-tii si uu click-ku u shaqeeyo */
            <Link 
              key={index}
              href={service.href} 
              className="group bg-brand-gray-light rounded-[32px] p-8 h-[450px] flex flex-col justify-between items-center transition-all duration-500 hover:shadow-2xl hover:bg-white cursor-pointer relative border border-transparent hover:border-gray-100"
            >
              {/* IMAGE CONTAINER */}
              <div className="flex-1 flex items-center justify-center w-full">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="max-h-64 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                />
              </div>

              {/* BOTTOM TEXT & BUTTON */}
              <div className="w-full flex justify-between items-end">
                <h3 className="text-gray-900 font-bold text-lg leading-tight max-w-[150px]">
                  {service.title}
                </h3>
                
                <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}