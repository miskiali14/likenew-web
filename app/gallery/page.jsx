// import Image from "next/image";
// import Link from "next/link";
// import { galleryImages } from "@/data/gallery";

// export const metadata = {
//   title: "Gallery | Likenew",
//   description: "Likenew gallery showing laundry, lockers, delivery and customer experience.",
// };

// export default function GalleryPage() {
//   return (
//     <main className="min-h-screen bg-white px-5 py-28">
//       <div className="max-w-6xl mx-auto">
//         <Link
//           href="/"
//           className="inline-flex rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-[#662d8f] hover:bg-[#fbf8ff]"
//         >
//           ← Back to Home
//         </Link>

//         <div className="text-center my-14">
//           <span className="text-[#662d8f] text-xs font-bold uppercase tracking-[0.25em]">
//             Likenew Gallery
//           </span>

//           <h1 className="mt-4 text-4xl md:text-6xl font-black text-gray-900">
//             Laundry, Lockers & Delivery
//           </h1>

//           <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
//             A visual look at our services, smart lockers, delivery team and customer experience.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {galleryImages.map((item, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
//             >
//               <div className="relative h-72 w-full">
//                 <Image
//                   src={item.src}
//                   alt={item.title}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-5">
//                 <p className="text-xs font-bold text-[#662d8f]">
//                   {item.category}
//                 </p>

//                 <h2 className="mt-2 text-lg font-black text-gray-900">
//                   {item.title}
//                 </h2>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-16 rounded-[2rem] bg-[#fbf8ff] p-8 text-center">
//           <h3 className="text-2xl font-black text-gray-900">
//             Ready to Experience Likenew?
//           </h3>

//           <p className="mt-3 text-gray-500">
//             Explore our laundry, delivery and smart locker services.
//           </p>

//           <Link
//             href="/services1page"
//             className="mt-6 inline-flex rounded-full bg-[#662d8f] px-7 py-3 text-white text-sm font-bold hover:bg-[#825bac] transition"
//           >
//             View Services
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }