import Image from "next/image";
import Link from "next/link";

export default function CreatorChallengePage() {
  return (
    <main className="min-h-screen bg-white py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <Link
  href="/blogs"
  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#662d8f] transition-all hover:border-[#662d8f] hover:bg-[#fbf8ff]"
>
  ← Back to Blogs
</Link>

        <div className="text-center mb-12">
          <span className="text-[#662d8f] text-xs font-black uppercase tracking-[0.25em]">
            Likenew  Contant Creator Challenge
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black text-gray-900">
            Become A Likenew
            <br />
            Content Creator
          </h1>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
            We are looking for talented creators in Motion Graphics,
            Video Editing and Storytelling.
          </p>
        </div>

        <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden mb-12">
          <Image
            src="/blogs/EVENT.png"
            alt="Likenew Creator Challenge"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScSDZ8Jn2nebGaNg7a6bnj-6BMt1DorjnscYM4P49pgi6MU1A/viewform?embedded=true"
            className="w-full h-[1350px] border-0"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </main>
  );
}