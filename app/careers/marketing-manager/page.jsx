import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Shaqo Bannaan: Marketing Manager | Likenew",
  description:
    "Likenew Smart Laundry waxay raadinaysaa Marketing Manager ku fadhiya Muqdisho. Akhri shuruudaha, waajibaadka iyo sida loo codsan karo.",
};

const responsibilities = [
  "Plan and run monthly marketing campaigns, offers and content calendars.",
  "Lead the content, design and video team, and approve all creative work.",
  "Manage social media pages, ads and monthly performance reports.",
  "Oversee customer care and call center quality.",
  "Use AI tools to write copy, design, analyse data, and automate daily tasks.",
  "Set team KPIs, track results, and report to management every month.",
];

const requirements = [
  "Bachelor's degree in Marketing, Business, IT or a related field.",
  "3+ years of marketing experience, with at least 1 year leading a team.",
  "Strong, daily use of AI tools (ChatGPT, Claude, Gemini, or similar).",
  "Hands on skills in social media, Meta Ads and content planning.",
  "Good knowledge of design tools (Adobe Illustrator or Photoshop).",
  "Good at data: reading analytics and building clear reports.",
  "Fluent in Somali and English, written and spoken.",
];

const applicationSections = [
  {
    title: "A. Personal Details",
    items: [
      "Full name",
      "Phone number (WhatsApp)",
      "Email address",
      "Current location",
      "Highest education level and field of study",
    ],
  },
  {
    title: "B. Experience",
    items: [
      "How many years of marketing experience do you have? (Less than 2 / 2–3 / 3–5 / 5+)",
      "Current or last job title and company",
      "Have you led a team before? If yes, how many people?",
      "Share links to your best work (social pages, campaigns, designs or portfolio).",
      "Upload your CV (PDF).",
    ],
  },
  {
    title: "C. AI & Digital Skills",
    items: [
      "Which AI tools do you use every week? (ChatGPT, Claude, Gemini, Midjourney, other)",
    ],
  },
  {
    title: "D. Short Practical Questions",
    items: [
      "A new service launches next month. Describe your first 30 day marketing plan in 5 lines or less.",
      "Why are you the right person for this role? (Max 100 words)",
    ],
  },
];

const APPLY_EMAIL = "info@likenew.so";
const APPLY_WHATSAPP = "252610311877";
const APPLY_SUBJECT = "Application: Marketing Manager";
const APPLY_BODY = `Full name:
Phone number (WhatsApp):
Email address:
Current location:
Highest education level and field of study:

Years of marketing experience:
Current or last job title and company:
Have you led a team before? If yes, how many people?:
Links to your best work:

Which AI tools do you use every week?:

30-day marketing plan (5 lines or less):

Why are you the right person for this role? (max 100 words):

(Please attach your CV as a PDF)`;

const mailtoHref = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
  APPLY_SUBJECT
)}&body=${encodeURIComponent(APPLY_BODY)}`;

const waHref = `https://wa.me/${APPLY_WHATSAPP}?text=${encodeURIComponent(
  "Salaan, waxaan rabaa inaan u codsado jagada Marketing Manager ee Likenew Smart Laundry."
)}`;

export default function MarketingManagerJobPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 md:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#662d8f] p-8 md:p-12 text-white">
          <Link
            href="/careers"
            className="text-xs font-bold uppercase tracking-widest hover:underline opacity-80"
          >
            ← Ku noqo Shaqooyinka
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/70">
            Shaqo Bannaan
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Marketing Manager
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-medium">
            <span className="bg-white/20 px-3 py-1 rounded-full">📍 Mogadishu, Somalia</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🕑 Full-time, on-site</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🏢 Likenew Smart Laundry</span>
          </div>
        </div>

        {/* Poster */}
        <div className="relative w-full aspect-[1600/1204] bg-[#0d0b1a]">
          <Image
            src="/careers/marketing-manager-hiring.jpg"
            alt="We are Hiring: Marketing Manager — Likenew Smart Laundry"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 prose prose-lg prose-slate max-w-none text-slate-700 leading-8">
          <h3 className="text-slate-900 font-black text-xl">About the Role</h3>
          <p>
            A fast growing, tech driven company in Mogadishu is looking for a Marketing Manager. You
            will lead marketing, customer experience and digital work across several teams. You will
            use AI tools every day to plan, create, automate and report faster.
          </p>

          <h3 className="text-slate-900 font-black text-xl">Key Responsibilities</h3>
          <ul>
            {responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="text-slate-900 font-black text-xl">Requirements</h3>
          <ul>
            {requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {/* Deadline callout */}
          <div className="my-10 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 not-prose">
            <h3 className="text-indigo-900 font-black text-xl mb-2">Deadline</h3>
            <p className="text-slate-700">
              Fadlan codsigaaga soo dir ugu dambeyn <strong>20 November, 2026</strong>. Kaliya
              musharraxiinta la xushay ayaa lala soo xiriiri doonaa.
            </p>
          </div>

          <h3 className="text-slate-900 font-black text-xl">Sida Loo Codsan Karo</h3>
          <p>
            Fadlan noo soo dir magacaaga, CV-gaaga (PDF) iyo jawaabaha su&apos;aalaha hoose iyadoo loo
            marayo email ama WhatsApp. Waxaad isticmaali kartaa badhanka hoose si aad u furto fariin
            diyaar u ah.
          </p>

          {applicationSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-slate-900 font-bold">{section.title}</h4>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Apply buttons */}
          <div className="not-prose mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center rounded-full bg-[#4421a3] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#662d8f]"
            >
              Ku Codso WhatsApp
            </a>
            <a
              href={mailtoHref}
              className="flex-1 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-4 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-[#662d8f] hover:text-[#662d8f]"
            >
              Ku Codso Email
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-[#662d8f] text-slate-300 p-8 md:p-12 text-sm">
          <p className="font-bold text-white mb-4">
            Wixii faahfaahin dheeri ah, fadlan nagala soo xiriir:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              Email: <span className="text-white">{APPLY_EMAIL}</span>
            </p>
            <p>
              WhatsApp:{" "}
              <span className="text-white">+{APPLY_WHATSAPP}</span>
            </p>
            <p>
              Website: <span className="text-white">www.likenew.so</span>
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
