"use client";

import { useState } from "react";
import Link from "next/link";

const ROLE = "Marketing Manager";
const FEEDBACK_API = "https://www.haadlinks.com/api/public/job-applications";

const EDUCATION_OPTIONS = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Other",
];

const EXPERIENCE_OPTIONS = ["Less than 2", "2–3", "3–5", "5+"];

const AI_TOOLS_OPTIONS = ["ChatGPT", "Claude", "Gemini", "Midjourney", "Other"];

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  educationLevel: "",
  yearsExperience: "",
  lastTitle: "",
  lastCompany: "",
  ledTeam: false,
  teamSize: "",
  portfolioLinks: "",
  cvLink: "",
  aiTools: [],
  thirtyDayPlan: "",
  whyFit: "",
};

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#662d8f]/30 focus:border-[#662d8f] transition";

export default function ApplyMarketingManagerPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleAiTool = (tool) => {
    setForm((f) => {
      const has = f.aiTools.includes(tool);
      return {
        ...f,
        aiTools: has ? f.aiTools.filter((t) => t !== tool) : [...f.aiTools, tool],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(FEEDBACK_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: ROLE, ...form }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 p-10 text-center">
          <div className="text-5xl">✅</div>
          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Codsigaaga waa la helay!
          </h1>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Mahadsanid codsigaaga jagada {ROLE}. Kaliya musharraxiinta la xushay ayaa lala soo
            xiriiri doonaa.
          </p>
          <Link
            href="/careers"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#4421a3] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#662d8f]"
          >
            Ku noqo Shaqooyinka
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#662d8f] p-8 md:p-12 text-white">
          <Link
            href="/careers/marketing-manager"
            className="text-xs font-bold uppercase tracking-widest hover:underline opacity-80"
          >
            ← Ku noqo Jagada
          </Link>
          <h1 className="mt-6 text-2xl md:text-4xl font-extrabold leading-tight">
            Foomka Codsiga: {ROLE}
          </h1>
          <p className="mt-3 text-white/80 text-sm">
            Deadline: 20 November, 2026 — Likenew Smart Laundry, Mogadishu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          {/* A. Personal Details */}
          <section className="space-y-5">
            <h2 className="text-lg font-black text-slate-900">A. Personal Details</h2>
            <Field label="Full name" required>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Phone number (WhatsApp)" required>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="2526..."
                className={inputClass}
              />
            </Field>
            <Field label="Email address" required>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Current location" required>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Mogadishu"
                className={inputClass}
              />
            </Field>
            <Field label="Highest education level and field of study" required>
              <select
                required
                value={form.educationLevel}
                onChange={(e) => update("educationLevel", e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select...
                </option>
                {EDUCATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
          </section>

          {/* B. Experience */}
          <section className="space-y-5">
            <h2 className="text-lg font-black text-slate-900">B. Experience</h2>
            <Field label="How many years of marketing experience do you have?" required>
              <select
                required
                value={form.yearsExperience}
                onChange={(e) => update("yearsExperience", e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select...
                </option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Current or last job title">
                <input
                  type="text"
                  value={form.lastTitle}
                  onChange={(e) => update("lastTitle", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Company">
                <input
                  type="text"
                  value={form.lastCompany}
                  onChange={(e) => update("lastCompany", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Have you led a team before?">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.ledTeam}
                    onChange={(e) => update("ledTeam", e.target.checked)}
                    className="h-4 w-4 accent-[#662d8f]"
                  />
                  Yes, I have led a team
                </label>
                {form.ledTeam && (
                  <input
                    type="text"
                    value={form.teamSize}
                    onChange={(e) => update("teamSize", e.target.value)}
                    placeholder="How many people?"
                    className={`${inputClass} max-w-xs`}
                  />
                )}
              </div>
            </Field>
            <Field label="Links to your best work (social pages, campaigns, designs or portfolio)">
              <input
                type="text"
                value={form.portfolioLinks}
                onChange={(e) => update("portfolioLinks", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </Field>
            <Field label="CV link (PDF — Google Drive, Dropbox, or similar)" required>
              <input
                type="url"
                required
                value={form.cvLink}
                onChange={(e) => update("cvLink", e.target.value)}
                placeholder="https://drive.google.com/..."
                className={inputClass}
              />
            </Field>
          </section>

          {/* C. AI & Digital Skills */}
          <section className="space-y-5">
            <h2 className="text-lg font-black text-slate-900">C. AI & Digital Skills</h2>
            <Field label="Which AI tools do you use every week? (select all that apply)">
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS_OPTIONS.map((tool) => {
                  const active = form.aiTools.includes(tool);
                  return (
                    <button
                      type="button"
                      key={tool}
                      onClick={() => toggleAiTool(tool)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        active
                          ? "bg-[#662d8f] border-[#662d8f] text-white"
                          : "bg-white border-gray-200 text-slate-600 hover:border-[#662d8f]"
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </Field>
          </section>

          {/* D. Short Practical Questions */}
          <section className="space-y-5">
            <h2 className="text-lg font-black text-slate-900">D. Short Practical Questions</h2>
            <Field
              label="A new service launches next month. Describe your first 30 day marketing plan in 5 lines or less."
              required
            >
              <textarea
                required
                rows={4}
                value={form.thirtyDayPlan}
                onChange={(e) => update("thirtyDayPlan", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Why are you the right person for this role? (Max 100 words)" required>
              <textarea
                required
                rows={4}
                value={form.whyFit}
                onChange={(e) => update("whyFit", e.target.value)}
                className={inputClass}
              />
            </Field>
          </section>

          {status === "error" && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center rounded-full bg-[#4421a3] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#662d8f] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Diraya..." : "Gudbi Codsiga"}
          </button>
        </form>
      </div>
    </main>
  );
}
