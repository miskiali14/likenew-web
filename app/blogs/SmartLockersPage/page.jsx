import Link from "next/link";

export default function SmartLockersPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 md:px-8">
      <article className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#662d8f] p-8 md:p-16 text-white">
          <Link href="/blogs" className="text-xs font-bold uppercase tracking-widest hover:underline opacity-80">
            ← Back to Blogs
          </Link>
          <h1 className="mt-8 text-3xl md:text-5xl font-extrabold leading-tight">
            Likenew Smart Laundry Launches "Likenew Smart Lockers", Introducing a New Era in Somalia's Laundry Services
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-16 prose prose-lg prose-slate max-w-none text-slate-700 leading-9">
          <p className="text-xl text-slate-800 font-medium">
            Mogadishu, Somalia -- 25 June, 2026: Likenew Smart Laundry, a pioneer in modern laundry services in Somalia, has today officially launched the country's first service of its kind: Likenew 24/7 Smart Lockers.
          </p>

          <p>
            This innovative service enables customers to drop off or pick up their laundry at any time of day or night (24/7), without waiting in queues, searching for parking, or being restricted by the branch's operating hours. This step represents a major shift that directly addresses the challenges customers face in balancing busy work schedules with accessing quality laundry services.
          </p>

          <h2 className="text-[#662d8f] font-black text-3xl">Key Benefits of Likenew Smart Lockers</h2>
          <ul className="list-none pl-0 space-y-6">
            <li>
              <strong className="text-[#662d8f]">24/7 Access:</strong> 
              <br/> Customers can drop off or collect their laundry at any time, even late at night -- a true convenience.
            </li>
            <li>
              <strong className="text-[#662d8f]">Customer Comfort & Convenience:</strong> 
              <br/> This new service allows the company to place Lockers at convenient locations and areas far from its main branches, bringing quality service closer to customers without requiring them to travel long distances.
            </li>
            <li>
              <strong className="text-[#662d8f]">Security & Cleanliness:</strong> 
              <br/> Every item placed in the Lockers is protected by a digital security system. Customers receive a notification (via Notification & WhatsApp) when their laundry is ready, along with a personal PIN to collect it.
            </li>
          </ul>

          <h2 className="text-[#662d8f] font-black text-3xl">Official Statements</h2>
          <p>At the launch event, a keynote address was delivered by the Director General of the Data Protection Authority, Mr. Mohamed Nur Olow. Commending the company's modern approach and its protection of customer data, he stated:</p>
          <blockquote className="border-l-4 border-[#662d8f] pl-4 italic my-6">
            "Likenew has filled a major gap in the country namely the digitization and transformation of laundry services into a digital format. The Lockers system and its App were designed in full compliance with international data privacy standards, reinforcing our laws and regulations to safeguard public data privacy."
          </blockquote>

          <p>Ahmed Bashir Osman, General Manager of LIKENEW, speaking at the launch event, said:</p>
          <blockquote className="border-l-4 border-[#662d8f] pl-4 italic my-6">
            "Our goal is not only to wash clothes, but to introduce Somalia to a new concept -- A New Concept for Laundry -- that aligns with today's modern digital lifestyle."
          </blockquote>
          <p>He added: "Likenew Smart Lockers have removed the barriers of time and distance, enabling us to bring our service directly to our customers' doorsteps wherever they are in Mogadishu."</p>

          <h2 className="text-[#662d8f] font-black text-3xl">Commitment to Quality</h2>
          <p>Likenew is committed to making laundry services simple, safe, and comfortable for customers, combining high-quality workmanship with the power of technology.</p>

          <div className="bg-slate-100 p-6 rounded-xl mt-6">
            <p><strong>Email:</strong> info@likenew.so</p>
            <p><strong>Phone/WhatsApp:</strong> 252 615311877 or 2414</p>
            <p><strong>Website:</strong> www.likenew.so</p>
          </div>

          <p className="font-bold text-center mt-8">END</p>
        </div>

        {/* Footer */}
        <div className="p-12 text-center bg-slate-50">
          <Link
            href="/services1page"
            className="inline-flex rounded-full bg-[#662d8f] px-10 py-4 font-bold text-white shadow-lg shadow-[#662d8f]/30 hover:bg-[#825bac] transition-all"
          >
            View Services
          </Link>
        </div>
      </article>
    </main>
  );
}