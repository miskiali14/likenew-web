import Link from "next/link";

export const metadata = {
  title: "Shaqooyinka | Likenew",
  description:
    "Ka eeg shaqooyinka bannaan ee Likenew Smart Laundry oo ku yaal Muqdisho, Soomaaliya.",
};

const jobs = [
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    location: "Mogadishu, Somalia",
    type: "Full-time, on-site",
    desc: "Hoggaami marketing-ka, adeegga macaamiisha iyo shaqada dijital-ka ee Likenew Smart Laundry. 3+ sano oo khibrad ah, isticmaal joogto ah oo AI tools ah.",
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
            Shaqooyinka Bannaan
          </h1>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Ku biir kooxda Likenew Smart Laundry oo casriyeysa daryeelka dharka ee Soomaaliya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article
              key={job.slug}
              className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
            >
              <div className="relative h-40 w-full bg-[#662d8f] flex items-center justify-center">
                <span className="text-5xl">💼</span>
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
                  Eeg Faahfaahinta →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
