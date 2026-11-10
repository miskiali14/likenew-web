import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "We're Hiring: Marketing Manager | Likenew",
  description:
    "Likenew Smart Laundry is hiring a Marketing Manager in Mogadishu. Read the requirements, responsibilities and how to apply.",
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

const APPLY_EMAIL = "info@likenew.so";
const APPLY_WHATSAPP = "252610311877";

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
            ← Back to Careers
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/70">
            Open Position
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

          <h3 className="text-slate-900 font-black text-xl">How to Apply</h3>
          <p>
            Fill in the application form:{" "}
            <Link
              href="/careers/marketing-manager/apply"
              className="font-bold text-[#662d8f] underline"
            >
              Apply Now
            </Link>
            . Deadline: <strong>20 November, 2026</strong>. Only shortlisted candidates will be
            contacted.
          </p>
        </div>

        {/* Footer Info */}
        <div className="bg-[#662d8f] text-slate-300 p-8 md:p-12 text-sm">
          <p className="font-bold text-white mb-4">
            For more information, please contact us:
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
