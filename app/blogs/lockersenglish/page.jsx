import Image from "next/image";
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
            Somalia's Laundry Revolution: Everything You Need to Know About Likenew Smart Lockers
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-16 prose prose-lg prose-slate max-w-none text-slate-700 leading-9">
          <p className="text-xl text-slate-800 font-medium">
            Time is the most valuable asset we have. In the fast-paced daily life of Mogadishu — juggling work, family, and personal errands -- something as routine as laundry can quietly become a real burden. Likenew Smart Laundry has answered that challenge head-on, introducing a concept entirely new to Somalia: 24/7 Smart Lockers.
          </p>

          <p>
            On 25 June 2026, the company officially launched this service at a public event attended by government officials, business leaders, and guests of honour — marking what many described as a genuine turning point in how Somalis access everyday services.
          </p>

          <h2 className="text-[#662d8f] font-black text-3xl">What Are Likenew Smart Lockers?</h2>
          <p>
            Likenew Smart Lockers are high-tech digital cabinets designed for one purpose: to put you fully in control of when and how you handle your laundry. Each locker connects directly to the Likenew App, meaning you manage the entire process from your phone -- no waiting for staff, no fixed hours, no queues.
          </p>
          <p>The defining feature is simple but transformative: they operate 24 hours a day, 7 days a week.</p>

          <h2 className="text-[#662d8f] font-black text-3xl">The Problems They Solve</h2>
          <p>This is not a technology showcase. It is a practical solution to real frustrations Likenew's customers had long faced.</p>
          
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Time constraints.</strong> In the past, if you finished work late, you simply missed your chance to drop off or collect your laundry. Now, you can walk in at midnight and collect your clothes — no questions asked.</li>
            <li><strong>Queuing.</strong> Waiting behind other customers to hand over or pick up laundry wastes time. With the Lockers, the entire transaction takes seconds.</li>
            <li><strong>Privacy.</strong> Some customers prefer that their clothing not pass through multiple hands. The Smart Locker system gives you complete privacy — your items go directly into a cabinet only you and assigned staff can access.</li>
          </ul>

          <h2 className="text-[#662d8f] font-black text-3xl">How It Works</h2>
          <p>Once you drop your laundry into a locker using the Likenew App, the system handles everything. You receive step-by-step order tracking through the app, and when your laundry is ready, you get a WhatsApp notification to open your locker. No handovers. No phone calls. No guesswork.
            </p>
             <p>Watch this video for a complete explanation on how to use and operate Likenew Smart Lockers.
            <iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/1-q7FAcPvAE?si=HgPbzWkgJ5rmNfrt" 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
  allowFullScreen
></iframe>

          </p>
           

          <h2 className="text-[#662d8f] font-black text-3xl">Where the Lockers Are Now</h2>
          <p>Likenew has launched the first phase at two key locations in Mogadishu:</p>
          <div className="bg-[#662d8f] text-white p-8 rounded-2xl my-6">
            <p className="mb-2"><strong>HQ -- Waaberi:</strong> Waaberi Road, opposite 21 October School.</p>
            <p><strong>KM5:</strong> KM5, Banadir — opposite Hotel Jowhara.</p>
          </div>
          <p>The next phase will expand Lockers to additional districts and service points across the city, with the goal of bringing the service within reach of every neighbourhood.</p>

          <h2 className="text-[#662d8f] font-black text-3xl">Built on Security</h2>
          <p>A common question: Is it safe to leave my clothes in a locker? The answer is yes—by design. Each cabinet has a tamper-proof digital lock. Your laundry can only be accessed by you via the app, or by specifically assigned Likenew staff during the processing stage. Every step is trackable in real time.</p>

          <p>At the launch, the Director General of the Data Protection Authority, Mr. Mohamed Nur Olow, offered his endorsement directly:</p>
          <blockquote className="border-l-4 border-[#662d8f] pl-4 italic my-6">
            "Likenew has filled a major gap in the country—the digitisation and transformation of laundry care into a digital format. The Lockers system and its App were built in full compliance with international data privacy standards, reinforcing our regulations to safeguard public data."
          </blockquote>

          <h2 className="text-[#662d8f] font-black text-3xl">The Vision Behind It</h2>
          <p>Ahmed Bashir Osman, General Manager of Likenew, framed the launch not just as a product release but as a cultural shift:</p>
          <p>"Our goal is not only to wash clothes. We want to introduce Somalia to a new concept—A New Concept for Laundry—one that matches the modern lifestyle of our people."</p>
          <p>He added: "Likenew Smart Lockers remove the barriers of time and distance. We are bringing our service directly to our customers' doorsteps, wherever they are in Mogadishu."</p>

          <h2 className="text-[#662d8f] font-black text-3xl">Ready to Try It?</h2>
          <p>Download the Likenew App on the App Store or Google Play and start using Smart Lockers today.</p>
          
          <div className="bg-slate-100 p-6 rounded-xl mt-6">
            <p><strong>Email:</strong> info@likenew.so</p>
            <p><strong>Phone/WhatsApp:</strong> 252 615311877 or 2414</p>
            <p><strong>Website:</strong> www.likenew.so</p>
          </div>

          <p className="font-bold text-center mt-8">Likenew—A New Concept for Laundry.</p>
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