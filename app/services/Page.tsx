"use client";
// Navbar import-keedii waa laga saaray halkan
import ServiceGrid from "@/components/Services"; 
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Navbar />  <-- Halkan waa laga saaray */}

      {/* Header-ka Bogga Adeegyada */}
      <div className="bg-[#f8f9fa] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-500 hover:text-brand-purple transition-colors mb-8 w-fit group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-gray-500 max-w-2xl text-[18px] leading-relaxed">
            We provide a wide range of professional cleaning services tailored to your needs. 
            From business attire to delicate fabrics, we handle it all with care.
          </p>
        </div>
      </div>

      {/* Halkan waxaa ka soo baxaya Card-yadii adeegyada */}
      <div className="py-10">
        <ServiceGrid /> 
      </div>

      {/* Footer yar oo fudud */}
      <footer className="py-20 border-t border-gray-100 text-center bg-white">
        <p className="text-gray-400 text-sm">© 2026 LIKeNEW. All rights reserved.</p>
      </footer>
    </main>
  );
}