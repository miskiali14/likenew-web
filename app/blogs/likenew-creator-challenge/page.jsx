import Image from "next/image";

export default function CreatorChallengePage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28">
      <article className="max-w-5xl mx-auto">
        <Link href="/blogs" className="text-sm font-bold text-[#662d8f]">
          ← Back to Blogs
        </Link>

        <div className="text-center mb-12">
          <span className="text-[#662d8f] text-xs font-black uppercase tracking-[0.25em]">
            Likenew Creator Challenge
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
    </article>
    </main>
  );
}