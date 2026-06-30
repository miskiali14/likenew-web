import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";

export default function GallerySection() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#662d8f] text-xs font-bold uppercase tracking-[0.25em]">
            Likenew Gallery
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
            Our Work In Pictures
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore our laundry care, smart lockers, delivery service and customer experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="relative h-44 md:h-56 rounded-[1.5rem] overflow-hidden group"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex rounded-full bg-[#662d8f] px-7 py-3 text-white text-sm font-bold hover:bg-[#825bac] transition"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}