import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";

export const metadata = {
  title: "Blogs | Likenew",
  description: "Likenew blogs, laundry tips, smart locker guides and service updates.",
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#662d8f] text-xs font-bold uppercase tracking-[0.25em]">
            Likenew Blog
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black text-gray-900">
            Laundry Tips & Updates
          </h1>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything about Likenew services, smart lockers, delivery,
            campaigns, and laundry care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-bold text-[#662d8f]">
                  {blog.category}
                </span>

                <h2 className="mt-3 text-xl font-black text-gray-900">
                  {blog.title}
                </h2>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {blog.desc}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="mt-6 inline-flex text-sm font-bold text-[#662d8f]"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}