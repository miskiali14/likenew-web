import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    
    <footer className="bg-white border-t border-gray-100 px-6 py-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Likenew Logo"
          width={500}
          height={160}
          className="h-24 md:h-28 lg:h-32 w-auto object-contain"
        />

        <p className="mt-5 max-w-lg text-center text-sm md:text-base text-gray-500 leading-relaxed">
          Laundry, Dry Cleaning, Smart Lockers & Delivery Services.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
  <Link
    href="/privacy-policy"
    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-[#662d8f] hover:text-[#662d8f]"
  >
    Privacy Policy
  </Link>

  <Link
    href="/blogs"
    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-[#662d8f] hover:text-[#662d8f]"
  >
    Blogs
  </Link>
</div>

        <div className="mt-12 w-full border-t border-gray-100 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-xs md:text-sm text-gray-400">
              © 2026 Likenew. All rights reserved.
            </p>

            <p className="text-xs md:text-sm text-gray-400">
              Website:
              <span className="ml-1 font-semibold text-[#662d8f]">
                likenew.so
              </span>
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}