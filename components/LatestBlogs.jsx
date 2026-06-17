import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";

export default function LatestBlogs() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-[#662d8f] text-xs font-bold uppercase tracking-[0.25em]">
              Likenew Blog
            </span>

            <h2 className="mt-3 text-3xl md:text-5xl font-black text-gray-900">
              Latest News & Articles
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl leading-relaxed">
              Read updates, smart locker guides, laundry tips, and service news
              from Likenew.
            </p>
          </div>

          <Link
            href="/blogs"
            className="w-fit rounded-full bg-[#662d8f] px-6 py-3 text-sm font-bold text-white hover:bg-[#825bac] transition-all"
          >
            View All Blogs
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog.slug}
              className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(102,45,143,0.12)]"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#662d8f]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#662d8f]">
                    {blog.category}
                  </span>

                  <span className="text-xs text-gray-400">{blog.date}</span>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {blog.desc}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-sm font-bold text-[#662d8f]"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}