import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Careers | Likenew",
  description:
    "See the open positions at Likenew Smart Laundry in Mogadishu, Somalia.",
};

const jobs = [
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    location: "Mogadishu, Somalia",
    type: "Full-time, on-site",
    desc: "Lead marketing, customer experience and digital work at Likenew Smart Laundry. 3+ years of experience, daily use of AI tools.",
    image: "/careers/marketing-manager-hiring.jpg",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#662d8f] transition-all hover:border-[#662d8f] hover:bg-[#fbf8ff]"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-14">
          <span className="text-[#662d8f] text-xs font-bold uppercase tracking-[0.25em]">
            Likenew Careers
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black text-gray-900">
            Open Positions
          </h1>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Join the Likenew Smart Laundry team as we modernize laundry care in Somalia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article
              key={job.slug}
              className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
            >
              <div className="relative h-40 w-full bg-[#0d0b1a]">
                <Image
                  src={job.image}
                  alt={job.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-bold text-[#662d8f]">
                  {job.location} · {job.type}
                </span>

                <h2 className="mt-3 text-xl font-black text-gray-900">
                  {job.title}
                </h2>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {job.desc}
                </p>

                <Link
                  href={`/careers/${job.slug}`}
                  className="mt-6 inline-flex text-sm font-bold text-[#662d8f]"
                >
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
