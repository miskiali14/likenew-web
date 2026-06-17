import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Habka Lagu Qiimaynayo, Shuruudaha & Abaalmarinta | Likenew",
  description:
    "Likenew Content Creators Challenge rules, prizes and requirements.",
};

export default function ChallengeRulesPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-28">
      <article className="max-w-5xl mx-auto">
        <Link href="/blogs" className="text-sm font-bold text-[#662d8f]">
          ← Back to Blogs
        </Link>

        <div className="mt-8 text-center">
          <span className="text-[#662d8f] text-xs font-black uppercase tracking-[0.25em]">
            Content Creators Challenge
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            Habka Lagu Qiimaynayo,
            <br />
            Shuruudaha & Abaalmarinta
          </h1>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Likenew Content Creators Challenge waa tartan loogu talagalay
            hal-abuurayaasha, video editors iyo motion graphers si ay u muujiyaan
            xirfaddooda uguna guulaystaan abaalmarin gaaraysa $1,000.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Image
            src="/blogs/shuruudaha.png"
            alt="Likenew Challenge Rules"
            width={900}
            height={1200}
            priority
            className="w-full max-w-4xl h-auto rounded-[2rem] border border-gray-100 shadow-[0_25px_80px_rgba(102,45,143,0.10)]"
          />
        </div>

        <section className="mt-12 rounded-[2rem] bg-[#fbf8ff] p-6 md:p-10 border border-[#662d8f]/10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            LIKENEW CONTENT CREATORS CHALLENGE: Muuji Hal-abuurkaaga oo Ku
            Guulayso $1,000!
          </h2>

          <div className="mt-8 space-y-8 text-gray-600 text-base leading-8">
            <div>
              <p>
                Ma tahay hal-abuure, Video Editor, ama motion grapher jecel in
                xirfaddiisu saamayn yeelato?
              </p>

              <p className="mt-4">
                Shirkadda Likenew Smart Laundry waxay si rasmi ah ugu dhawaaqaysaa
                tartanka Likenew Content Creators Challenge! Waa madal aan ku
                dhiirrigelinaynno dhallinyarada Soomaaliyeed ee xirfadda leh, si
                ay u muujiyaan awooddooda, uguna guulaystaan abaalmarin lacageed
                gaaraysa Abaalmarin Qaali Ah Kun Doollar.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-[#662d8f]">
                Maxaa La Duubayaa? (The Challenge)
              </h3>

              <p className="mt-4">
                Hal-abuurayaasha la xusho waxay heli doonaan fursad gaar ah
                (Exclusive access) oo ay ku duubaan adeeg weyn oo cusub oo aan
                dhowaan ku dhawaaqi doonno (Wali lama shaacin!), xarumaheenna
                casriga ah, iyo Likenew App. Waa fursaddaadii aad ku muujin
                lahayd sida aad u gudbin karto hal-abuur sheeko.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-[#662d8f]">
                Sida Uu Tartanku U Dhacayo
              </h3>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-[1.5rem] bg-white p-5 border border-gray-100">
                  <h4 className="font-black text-gray-900">
                    Xulista Hordhaca ah
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    Waxaan tartankan u xulan doonnaa oo keliya 25 qof oo ah
                    hal-abuurayaasha ugu xirfadda wanaagsan ee soo codsada.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-white p-5 border border-gray-100">
                  <h4 className="font-black text-gray-900">
                    Habka Tartanka
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    Qof kasta oo ka mid ah 25-ka qof, muuqaalka uu duubo wuxuxu
                    soo gelin doonaa 2 ka mid ah barahiisa bulshada.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-white p-5 border border-gray-100">
                  <h4 className="font-black text-gray-900">
                    Sida Lagu Guulaysanayo
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    3-da qof ee muuqaalladoodu ay helaan Daawashada (Views) iyo
                    Falcelinta (Engagement) ugu badan ayaa noqon doona
                    guulaystayaasha rasmiga ah!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-[#662d8f]">
                Shuruudaha Codsiga (Is-diwaangelinta)
              </h3>

              <p className="mt-4">
                Si aad uga mid noqoto 25-ka qof ee nasiibka leh, waa inaad
                buuxisaa shuruudahan fudud marka uu furmo linkiga
                isdiiwaangelinta:
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-[1.5rem] bg-white p-5 border border-gray-100">
                  <h4 className="font-black text-gray-900">
                    Foomka Diiwaangelinta
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Waa inaad iska diiwaangelisaa Linkiga rasmiga ah ee tartanka
                    oo aan soo dhigi doonno baraha bulshada.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-white p-5 border border-gray-100">
                  <h4 className="font-black text-gray-900">
                    Tusaale Shaqo (Portfolio)
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Waa inanad nala wadaagtaa Link-ga muuqaal aad adigu horey u
                    samaysay si aan u qiimayno xirfaddaada.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-white p-5 border border-gray-100">
                  <h4 className="font-black text-gray-900">
                    Baraha Bulshada
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Waa inaad foomka ku soo dartaa linkiyada Barahaaga Bulshada
                    (Social Media Handles) ee aad isticmaasho.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-white border border-gray-100 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
          <h2 className="text-3xl font-black text-gray-900">
            Abaalmarinta (The Prizes)
          </h2>

          <p className="mt-4 text-gray-600 leading-8">
            Likenew waxay u diyaarisay $1,000 wadar ahaan si loo abaalmariyo
            3-da qof ee ugu dhibcaha sarreeya:
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-[#fbf8ff] p-6 text-center">
              <p className="text-4xl">🥇</p>
              <h3 className="mt-3 font-black text-[#662d8f]">
                Kaalinta 1aad
              </h3>
              <p className="mt-2 text-3xl font-black text-gray-900">$500</p>
            </div>

            <div className="rounded-2xl bg-[#fbf8ff] p-6 text-center">
              <p className="text-4xl">🥈</p>
              <h3 className="mt-3 font-black text-[#662d8f]">
                Kaalinta 2aad
              </h3>
              <p className="mt-2 text-3xl font-black text-gray-900">$300</p>
            </div>

            <div className="rounded-2xl bg-[#fbf8ff] p-6 text-center">
              <p className="text-4xl">🥉</p>
              <h3 className="mt-3 font-black text-[#662d8f]">
                Kaalinta 3aad
              </h3>
              <p className="mt-2 text-3xl font-black text-gray-900">$200</p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-[#662d8f] p-8 md:p-10 text-white text-center">
          <h2 className="text-3xl font-black">
            Xilliga Uu Furmayo (Isha Ku Hay!)
          </h2>

          <p className="mt-4 text-white/85 leading-8">
            June 18, 2:00 PM (Duhurnimo): Waxaan baraheenna bulshada soo dhigi
            doonnaa Linkiga isdiiwaangelinta.
          </p>

          <p className="mt-6 text-white/85 leading-8">
            U diyaargarow inaad duubto taariikh cusub. Isha ku hay baraheenna
            bulshada!
          </p>

          <p className="mt-6 font-black">
            Likenew — A New Concept for Laundry.
          </p>
        </section>

        {/* <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/blogs/likenew-creator-challenge"
            className="rounded-full bg-[#662d8f] px-8 py-4 text-sm font-bold text-white hover:bg-[#825bac] transition-all"
          >
            Apply Now
          </Link>

          <Link
            href="/blogs"
            className="rounded-full border border-gray-200 px-8 py-4 text-sm font-bold text-gray-600 hover:border-[#662d8f] hover:text-[#662d8f] transition-all"
          >
            View Blogs
          </Link>
        </div> */}
      </article>
    </main>
  );
}