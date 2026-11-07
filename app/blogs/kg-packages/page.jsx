import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Dooro Xirmada Kugu Habboon | Likenew",
  description:
    "Likenew Smart Laundry waxay soo bandhigtay KG Packages, hannaan bille ah oo macaamiisha u sahlaya in dharka lagu xisaabiyo miisaan.",
};

export default function KgPackagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 md:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#662d8f] p-8 md:p-12 text-white">
          <Link href="/blogs" className="text-xs font-bold uppercase tracking-widest hover:underline opacity-80">
            ← Ku noqo Blogs
          </Link>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight">
            Dooro Xirmada Kugu Habboon
          </h1>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium opacity-90">
            <span className="bg-white/20 px-3 py-1 rounded-full">1 November, 2026</span>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-[500px] md:h-[640px] bg-white">
          <Image
            src="/blogs/kg-packages-hero.jpg"
            alt="Dooro Xirmada Kugu Habboon: Dhaqnaan 8KG $30, Xarago 15KG $50, Riish 35KG $100"
            fill
            className="object-contain"
          />
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 prose prose-lg prose-slate max-w-none text-slate-700 leading-9">
          <p className="lead text-xl text-slate-900 font-semibold">
            Muqdisho, Soomaaliya – 1 November, 2026: Annagoo tixgelinayna baahida iyo codsiyada
            macaamiisheenna ah inay helaan adeeg rukun ah haddana qiimo jaban, waxaan maanta si
            rasmi ah u shaacinaynaa in Shirkadda <strong>Likenew Smart Laundry</strong>, oo hormuud
            u ah casriyeynta adeegyada daryeelka dharka ee Soomaaliya, ay soo kordhisay xirmooyin
            bille ah oo cusub oo lagu magacaabo <strong>Likenew KG Packages</strong>.
          </p>

          <p>
            Adeeggan cusub wuxuu macaamiisha u oggolaanayaa inay hal mar iibsadaan xirmo ka kooban
            xaddi miisaan (KG) ah, kadibna ay isticmaalaan mar kasta oo ay u baahdaan. Tallaabadan
            waxay macaamiisheenna u keenaysaa qiimo ka jaban kii caadiga ahaa, iyadoo siinaysa
            adeeg joogto ah oo aan kala go' lahayn.
          </p>

          <p>
            Nidaamkan cusub ayaa ah mid si gaar ah ugu habboon qoysaska iyo dadka shaqada ku
            mashquulsan ee toddobaad kasta u baahan inay dhar dhaqdaan, isla markaana doonaya adeeg
            tayo sare leh oo qiimo jaban, kaas oo siinaya qaab fudud oo ay dhar badan ku dhaqan
            karaan iyagoo bixinaya qiimo macquul ah.
          </p>

          {/* Fiiro Gaar ah */}
          <div className="my-10 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
            <h3 className="text-indigo-900 font-black text-xl mb-4">Fiiro Gaar ah:</h3>
            <p className="text-slate-700">
              Xirmo kasta waxay ka kooban tahay adeeg dhammaystiran oo isugu jira dhaqmo iyo feero,
              waxayna khuseeyaan keliya dharka la xirto. Adeegyada kale sida nadiifinta kabaha,
              roogagga iyo daahyada waxay ku socon doonaan nidaamkoodii caadiga ahaa.
            </p>
          </div>

          <p>
            Likenew waxay mar kasta u taagan tahay in ay daryeelka dharka ka dhigto mid hufan oo
            casri ah, u danaynaya macmiilka, iyadoo isku xiraysa tayada sare ee shaqada iyo
            awoodda tignoolajiyadda.
          </p>
        </div>

        {/* Additional Images */}
        <div className="p-8 md:p-12 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden border border-slate-100">
            <Image
              src="/blogs/kg-packages-storefront.jpg"
              alt="Likenew KG Packages"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden border border-slate-100">
            <Image
              src="/blogs/kg-packages-pricing.jpg"
              alt="Saddexda Xirmo (Package) ee la heli karo: Dhaqnaan 8KG $30, Xarago 15KG $50, Riish 35KG $100"
              fill
              className="object-contain bg-white"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-[#662d8f] text-slate-300 p-8 md:p-12 text-sm">
          <p className="font-bold text-white mb-4">Wixii faahfaahin dheeri ah, fadlan nagala soo xiriir:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>Email: <span className="text-white">info@likenew.so</span></p>
            <p>Taleefan/WhatsApp: <span className="text-white">+252 615311877 ama 2414</span></p>
          </div>
        </div>
      </article>
    </main>
  );
}
