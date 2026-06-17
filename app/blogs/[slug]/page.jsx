import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Likenew",
    };
  }

  return {
    title: `${blog.title} | Likenew`,
    description: blog.desc,
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-5 py-28">
      <article className="max-w-4xl mx-auto">
        <Link href="/blogs" className="text-sm font-bold text-[#662d8f]">
          ← Back to Blogs
        </Link>

        <div className="mt-8">
          <span className="rounded-full bg-[#662d8f]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#662d8f]">
            {blog.category}
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            {blog.title}
          </h1>

          <p className="mt-4 text-gray-400 text-sm">{blog.date}</p>
        </div>

        <div className="relative mt-10 h-[280px] md:h-[460px] w-full overflow-hidden rounded-[2rem]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-10 space-y-6 text-gray-600 text-base leading-8">
          {blog.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-[#fbf8ff] p-8 text-center">
          <h3 className="text-2xl font-black text-gray-900">
            Ready to try Likenew?
          </h3>

          <p className="mt-3 text-gray-500">
            Explore our laundry, delivery, and smart locker services.
          </p>

          <Link
            href="/services1page"
            className="mt-6 inline-flex rounded-full bg-[#662d8f] px-7 py-3 text-sm font-bold text-white hover:bg-[#825bac] transition-all"
          >
            View Services
          </Link>
        </div>
      </article>
    </main>
  );
}