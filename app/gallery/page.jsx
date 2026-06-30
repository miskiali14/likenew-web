import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 py-24">
        <Link
          href="/"
          className="inline-flex mb-10 rounded-full border px-5 py-2 text-sm font-semibold text-[#662d8f]"
        >
          ← Back Home
        </Link>

        <h1 className="text-5xl font-black text-center text-gray-900">
          Likenew Gallery
        </h1>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Explore all photos from our laundry, lockers and delivery services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[24px] shadow-lg"
            >
              <div className="relative h-72">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <p className="text-xs text-[#662d8f] font-bold">
                  {item.category}
                </p>

                <h3 className="font-bold text-gray-900 mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}