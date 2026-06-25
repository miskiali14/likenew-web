import Link from "next/link";
import Image from "next/image";

export default function SaxafadPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 md:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#662d8f] p-8 md:p-12 text-white">
          <Link href="/blogs" className="text-xs font-bold uppercase tracking-widest hover:underline opacity-80">
            ← Ku noqo Blogs
          </Link>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight">
            Shirkadda Likenew Smart Laundry oo daahfurtay "24/7 Smart Lockers"
          </h1>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium opacity-90">
            <span className="bg-white/20 px-3 py-1 rounded-full">25 June, 2026</span>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="/blogs/Locker3DRender.png" // Halkan ku beddel halka sawirkaagu yaallo
            alt="Likenew Smart Lockers"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 prose prose-lg prose-slate max-w-none text-slate-700 leading-9">
          <p className="lead text-xl text-slate-900 font-semibold">
            Muqdisho, Soomaaliya – 25 June, 2026: Shirkadda Likenew Smart Laundry ayaa maanta si rasmi ah u daahfurtay nidaamkii ugu horreeyay ee noociisa ah oo dalka laga hirgeliyl: <strong>Likenew 24/7 Smart Lockers</strong>.
          </p>

          <p>
            Adeeggan casriga ah ayaa macaamiisha awood u siinaya in ay dharkooda geeyaan ama kala baxaan xarunta xilli kasta oo ay doonaan, habeen iyo maalin (24/7), iyagoon saf u gelin, cidna sugayn, amaba ka walaacayn in xaruntu ay xirmayso xilliyada dambe.
          </p>

          {/* Feature Highlight Box */}
          <div className="my-10 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
            <h3 className="text-indigo-900 font-black text-xl mb-4">Faa'iidooyinka Muhiimka ah:</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 font-bold text-lg">✓</span> Helitaan 24/7 ah: Macaamiishu waxay dharkooda dhigan karaan ama qaadan karaan xilli kasta, xitaa saqdhexe, taas oo xorriyad buuxda siinaysa dadka mashquulka ah.

              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 font-bold text-lg">✓</span> Fidin & U-dhowaansho Macaamiil: Adeeggan cusub wuxuu shirkadda u sahlayaa in ay Lockers-ka geyso degmooyinka durugsan iyo meelaha ka fog xarumaheenna waaweyn, si adeegga tayada leh loogu soo dhaweeyo macaamiisheenna iyagoon masaafo dheer soo jarin.

              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 font-bold text-lg">✓</span> Ammaan & Kalsooni: Dhar kasta oo la dhigo Lockers-ka wuxuu ku jiraa nidaam ammaan ah oo dijitaal ah. Macmiilku wuxuu farriin (Notification & WhatsApp) ku helayaa marka dharkiisu diyaar yahay iyo furaha sirta ah (PIN) ee uu kula baxayo.

              </li>
            </ul>
          </div>

          <blockquote className="my-10 py-6 border-l-4 border-indigo-500 pl-8 italic text-slate-600 bg-slate-50 text-lg">
            "Hadafkeennu ma ahan oo keliya inaan dhar dhaqno, balse waa inaan Soomaaliya keenno fikir cusub (A New Concept for Laundry) oo la jaanqaadaya qaab-nololeedka casriga ah ee dadkeenna," ayuu yiri Axmed Bashiir Osman oo ah maamulaha guud ee LIKENEW, isagoo ka hadlayay madasha daahfurka. Wuxuu sii raaciyey: "Likenew Smart Lockers waxay meesha ka saarayaan sugitaankii iyo saxmaddii, waxayna noo suuragelinayaan inaan adeeggeenna geyno albaabka macaamiisheenna meel kasta oo ay Muqdisho ka joogaan."
          </blockquote>

          <p>
            Si loo xuso daahfurkan taariikhiga ah, maamulka shirkaddu waxay ku dhawaaqeen in qof kasta oo isticmaala adeegga Smart Lockers-ka maalmaha soo socda uu heli doono haddiyad gaar ah. Sidoo kale, waxaa dhawaan la shaacin doonaa qiimodhimis weyn oo ku beegan xuska 1-da Luulyo.
          </p>
        </div>

        {/* Footer Info */}
        <div className="bg-[#662d8f] text-slate-300 p-8 md:p-12 text-sm">
          <p className="font-bold text-white mb-4">Wixii faahfaahin dheeri ah, fadlan nagala soo xiriir:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>Email: <span className="text-white">info@likenew.so</span></p>
            <p>Tel/WhatsApp: <span className="text-white">252 615311877 / 2414</span></p>
          </div>
        </div>
      </article>
    </main>
  );
}