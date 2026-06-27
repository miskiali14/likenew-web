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
            Kacaanka Daryeelka Dharka ee Soomaaliya: Wax Kasta Oo Aad U Baahan Tahay Inaad Ka Ogaato "Likenew Smart Lockers"
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-16 prose prose-lg prose-slate max-w-none text-slate-700 leading-9">
          <p className="text-xl text-slate-800 font-medium">
            Waqtigu waa hantida ugu qaalisan ee aynu haysanno. Nolol-maalmeedka mashquulka badan ee magaalada Muqdisho dhexdeeda ka jira, iswaafajinta shaqada, qoyska iyo hawlaha shakhsiga ah sida dhardhaqista waxay noqon kartaa culeys weyn. Si looga jawaabo baahidaas, shirkadda Likenew Smart Laundry waxay dalka keentay fikir cusub (A New Concept for Laundry), oo gebi ahaan beddelaya qaabkii hore ee dhaqidda dharka.
          </p>

          <p>
            Haddaba, maxay yihiin Likenew 24/7 Smart Lockers, sidee ayayse noloshaada u fududayn karaan? Maqaalkan waxaan kuugu soo bandhigaynaa wax kasta oo aad u baahan tahay inaad ka ogaato nidaamkan taariikhiga ah.
          </p>

          <div className="relative my-12 h-[400px] md:h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/blogs/Locker3DRender.png"
              alt="Likenew Smart Lockers"
              fill
              className="object-contain bg-slate-100"
            />
          </div>

          <h2 className="text-[#662d8f] font-black text-3xl">Waa Maxay Likenew Smart Lockers?</h2>
          <p>
            Likenew Smart Lockers waa khaanado ama armaajooyin casri ah oo ku shaqeeya tignoolajiyad heersare ah, looguna talagalay in macaamiishu ay dharkooda ku ritaan amaba kala baxaan. Khaanadahan waxay si toos ah ugu xiran yihiin Likenew App, taas oo ka dhigan in hawsha oo dhan aad ka maamulan karto taleefankaaga gacanta, adigoon u baahnayn in cidna ku caawiso ama aad la kulanto shaqaalaha xarunta.
          </p>
          <p>Waxa ugu weyn ee ay kaga duwan yihiin nidaamkii hore ayaa ah in ay shaqeeyaan 24 saacadood maalintii, 7da maalmood ee usbuuca (24/7).</p>

          <h2 className="text-[#662d8f] font-black text-3xl">Caqabadaha Ay Xallinayaan Likenew Lockers</h2>
          <p>Nidaamkan cusub ma ahan oo keliya ismuujin tignoolajiyadeed, balse waa xal dhab ah oo loogu talagalay dhibaatooyinka ay macaamiisheennu la kulmi jireen:</p>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-[#662d8f] mb-2">Waqti Xaddidan</h4>
              <p className="text-sm">Berigii hore, haddii aad shaqada ka soo daahdo, waxaad weynaysay fursad aad dharkaaga ku qaadato. Hadda, xitaa saqdhexe (Midnight) ayaad imaan kartaa oo aad dharkaaga qaadan kartaa!</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-[#662d8f] mb-2">Saxmadda</h4>
              <p className="text-sm">Sugitaanka dadka kaa horreeya si aad dharkaaga u dhiibto ama u qaadato waxay qaadataa waqti. Lockers-ka waxaad ku dhammaynaysaa ilbiriqsiyo gudahood.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-[#662d8f] mb-2">Asturnaanta</h4>
              <p className="text-sm">Dadka qaar waxay jecel yihiin in dharkooda aysan cidna isdhaafsan. Nidaamkani wuxuu ku siinayaa asturnaan buuxda adigoo si toos ah khaanad u gelinaya.</p>
            </div>
          </div>

          <h2 className="text-[#662d8f] font-black text-3xl">Sida Loo Isticmaalo Likenew Smart Lockers</h2>
          <p>Daawo muuqaalkan si dhammaystiran kuugu sharraxaya isticmaalka iyo adeegsiga Likenew Smart Lockers (<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/1-q7FAcPvAE?si=HgPbzWkgJ5rmNfrt" 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
  allowFullScreen
></iframe>).</p>

          <h2 className="text-[#662d8f] font-black text-3xl">Goobaha Ay Hadda Yaallaan Lockers-ka</h2>
          <p>Si aan kuugu soo dhawayno adeegga, wajiga koowaad waxaan Lockers-ka casriga ah ka hirgelinnay labo xarumood oo muhiim ah:</p>
          <div className="bg-[#662d8f] text-white p-8 rounded-2xl my-6">
            <p className="mb-2"><strong>Xarunta Dhexe (HQ):</strong> Wadada Waaberi, ka soo horjeedka dugsiga 21 ka October.</p>
            <p><strong>Xarunta KM5:</strong> KM5, banaadir ama ka soo horjeedka Hotel Jowhara.</p>
          </div>
          <p className="italic text-sm text-slate-500">* F.G: Qorshaheena xiga waa in aan Lockers-kan geyno degmooyinka kale iyo xarumaha laga adeegto ee magaalada, si adeeggu u noqdo mid u dhow qof kasta!</p>

          <h2 className="text-[#662d8f] font-black text-3xl">Ammaan iyo Kalsooni Buuxda</h2>
          <p>Aammin ma tahay inaan dharkayga khaanad uga tago? Likenew Smart Lockers waxaa lagu dhisay nidaam difaac dijitaal ah.</p>
          <ul className="list-disc pl-6">
            <li>Khaanad kasta waxay leedahay quful casri ah oo aan la jabin karin.</li>
            <li>Dharkaaga waxaa furi kara keliya shaqaalaha loo xilsaaray marka la shaqaynayo, iyo adiga adeegsanaya Likenew app.</li>
            <li>Sidoo kale, waxaad tallaabo-tallaabo ugala socon kartaa halka ay shaqadu marayso (Track your order) adigoo isticmaalaya Likenew App.</li>
          </ul>

          {/* Call Center Section */}
          <div className="bg-purple-100 border-2 border-purple-400 p-8 rounded-2xl text-center my-10 shadow-inner">
            <h3 className="text-2xl font-black text-purple-900">Ma u baahan tahay caawimaad?</h3>
            <p className="text-purple-800 mt-2">Wixii caawimaad dheeri ah, la xiriir qaybteenna daryeelka macaamiisha adigoo wacaya:</p>
            <p className="text-5xl font-black text-[#662d8f] mt-4 tracking-tighter">2414</p>
          </div>

          <h2 className="text-[#662d8f] font-black text-3xl">Gunaanad</h2>
          <p>Imaanshaha Likenew Smart Lockers waxay astaan u tahay isbeddel iyo horumar weyn oo dalkeennu gaaray. Uma baahnid inaad mar dambe saf gasho ama aad isku mashquuliso saacadaha shaqada xarumaha.</p>
          <p>Diyaar ma u tahay inaad tijaabiso? Kala soo deg Likenew App maanta App Store ama Google Play oo billaw isticmaalka Likenew lockers. Likenew - A New Concept for Laundry.</p>
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