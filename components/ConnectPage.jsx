"use client";
import Navbar from "@/components/Navbar";

// ---- Xogta links-ka (xaqiiqo ah — ka soo qaatay koodhka jira) ----
// Erayada "PENDING" waxay u baahan yihiin link dhab ah — beddel marka la
// helo (looma baahna wax kale oo koodh ah in la taabto).
const LINKS = [
  {
    key: "order",
    title: "Samee Dalab Website-ka",
    subtitle: "Dooro adeegga aad rabto, dalab si fudud u samee",
    href: "/services1page",
    color: "#4421a3",
    icon: "cart",
  },
  {
    key: "app",
    title: "Soo Dejiso LikeNew App",
    subtitle: "App Store · Google Play",
    href: null, // laba link oo gaar ah, eeg AppLinks hoose
    color: "#1a1a2e",
    icon: "smartphone",
  },
  {
    key: "whatsapp",
    title: "La Socod Dalabkaaga — WhatsApp",
    subtitle: "Bot-ka WhatsApp ee degdega ah",
    href: "https://wa.me/252610311877",
    color: "#25D366",
    icon: "whatsapp",
  },
  {
    key: "telegram",
    title: "La Socod Dalabkaaga — Telegram",
    subtitle: "Bot-ka Telegram",
    href: "https://t.me/likenew_order_bot",
    color: "#24A1DE",
    icon: "telegram",
  },
  {
    key: "lockers",
    title: "LikeNew Lockers",
    subtitle: "Xarumaha 24/7 ee Muqdisho",
    href: "/lockers",
    color: "#662d8f",
    icon: "pin",
  },
  {
    key: "tiktok",
    title: "LikeNew — TikTok",
    subtitle: "PENDING",
    href: "PENDING",
    color: "#000000",
    icon: "tiktok",
  },
  {
    key: "facebook",
    title: "LikeNew — Facebook",
    subtitle: "PENDING",
    href: "PENDING",
    color: "#1877F2",
    icon: "facebook",
  },
  {
    key: "instagram",
    title: "LikeNew — Instagram",
    subtitle: "PENDING",
    href: "PENDING",
    color: "#E1306C",
    icon: "instagram",
  },
  {
    key: "linkedin",
    title: "LikeNew — LinkedIn",
    subtitle: "PENDING",
    href: "PENDING",
    color: "#0A66C2",
    icon: "linkedin",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/likenew-laundry-and-dryclean/id6746805480";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cleancloudapp.likenew";

function Icon({ name, size = 22 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (name) {
    case "cart":
      return (
        <svg {...common}>
          <path d="M7 4h-2l-1 2H2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 8 21h11v-2H8l1.1-2h7.45a2 2 0 0 0 1.79-1.11L21.7 8H6.21l-.94-2H7V4zm1 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      );
    case "smartphone":
      return (
        <svg {...common}>
          <rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.34 3.53-.51.35-.97.52-1.37.51-.44-.01-1.29-.25-1.92-.45-.77-.25-1.38-.38-1.33-.81.03-.22.33-.45.92-.69 3.59-1.56 5.99-2.59 7.2-3.09 3.42-1.42 4.13-1.67 4.6-.17.07.24.08.5.06.69z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47a4.92 4.92 0 0 1 1.78 1.16 4.92 4.92 0 0 1 1.16 1.78c.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.92 4.92 0 0 1-1.16 1.78 4.92 4.92 0 0 1-1.78 1.16c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.92 4.92 0 0 1-1.78-1.16 4.92 4.92 0 0 1-1.16-1.78c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43a4.92 4.92 0 0 1 1.16-1.78A4.92 4.92 0 0 1 5.47 2.5c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.3-1.65a2.76 2.76 0 0 0-.66-1.02 2.76 2.76 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3-1.05-.05-1.37-.06-4.04-.06zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-2.05a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      );
    case "apple":
      return (
        <svg {...common}>
          <path d="M16.37 1.43c.09 1.04-.3 2.05-.93 2.8-.65.76-1.72 1.35-2.76 1.27-.1-1 .36-2.05 1-2.76.7-.78 1.87-1.37 2.69-1.31zM20.5 17.1c-.56 1.27-.82 1.83-1.54 2.95-1 1.56-2.4 3.5-4.14 3.52-1.54.02-1.94-1-4.03-1-2.1 0-2.54.98-4.07 1.02-1.73.05-3.05-1.68-4.05-3.24C.5 16.9-.4 12.7 1.1 9.9c.76-1.4 2.12-2.28 3.6-2.3 1.47-.03 2.86 1 3.76 1 .9 0 2.58-1.23 4.35-1.05.74.03 2.82.3 4.16 2.25-.1.07-2.48 1.46-2.46 4.33.03 3.43 3.04 4.57 3.07 4.57-.03.08-.48 1.63-1.08 3.3z" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="M3.6 2.6c-.35.35-.6.85-.6 1.4v16c0 .55.25 1.05.6 1.4l.1.08L13.5 12 3.7 2.52l-.1.08zM16.8 9.3l-2.6-1.5-2.9 2.9 2.9 2.9 2.65-1.53c.8-.46.8-1.6 0-2.07zM4.3 21.4l9.2-5.3-2.5-2.5-6.7 7.8zM4.3 2.6l6.7 7.8 2.5-2.5-9.2-5.3z" />
        </svg>
      );
  }
  return null;
}

function PendingBadge() {
  return (
    <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wide text-white/90 bg-white/25 px-2.5 py-1 rounded-full">
      Dhawaan
    </span>
  );
}

function LinkCard({ item }) {
  const isPending = item.href === "PENDING" || item.href === null;
  const external = item.href && item.href.startsWith("http");

  const inner = (
    <>
      <div
        className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
        style={{ backgroundColor: item.color }}
      >
        <Icon name={item.icon} size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-extrabold text-white text-[15px] leading-tight truncate">
          {item.title}
        </p>
        {item.key !== "app" && (
          <p className="text-white/70 text-xs mt-0.5 truncate">
            {isPending ? "Link-ka dhawaan ayaa la dari doonaa" : item.subtitle}
          </p>
        )}
      </div>
      {isPending && <PendingBadge />}
    </>
  );

  const baseClass =
    "group flex items-center gap-4 w-full rounded-2xl p-4 bg-white/10 backdrop-blur-sm border border-white/15 transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-xl";

  // App download card -> laba badhan oo gaar ah (App Store / Play Store)
  if (item.key === "app") {
    return (
      <div className={baseClass}>
        {inner}
        <div className="flex gap-2 ml-2 shrink-0">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="App Store"
          >
            <Icon name="apple" size={18} />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Google Play"
          >
            <Icon name="play" size={18} />
          </a>
        </div>
      </div>
    );
  }

  if (isPending) {
    return <div className={baseClass + " opacity-70 cursor-default"}>{inner}</div>;
  }

  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={baseClass}
    >
      {inner}
    </a>
  );
}

export default function ConnectPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, #6a3fc4 0%, #4421a3 45%, #2c1468 100%)",
      }}
    >
      <Navbar />

      <div className="max-w-xl mx-auto px-5 pt-28 pb-20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl mb-4 overflow-hidden">
            <img src="/Logo.png" alt="LikeNew" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight">LikeNew</h1>
          <p className="text-white/70 text-sm mt-1 max-w-xs">
            Dhammaan goobaha aad naga heli karto — hal meel oo kaliya 🧺
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {LINKS.map((item) => (
            <LinkCard key={item.key} item={item} />
          ))}
        </div>

        <p className="text-center text-white/50 text-xs mt-10">
          © {new Date().getFullYear()} LikeNew Smart Laundry · likenew.so
        </p>
      </div>
    </main>
  );
}
