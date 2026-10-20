"use client";
import Navbar from "@/components/Navbar";

// ---- Key link data (real — sourced from existing code) ----
// Icon-grid layout matching the social media section — 3-column grid.
const MAIN_LINKS = [
  {
    key: "order",
    title: "Place an Order",
    href: "/services1page",
    color: "#ffffff",
    icon: "order-icon",
  },
  {
    key: "app",
    title: "Download the App",
    href: "/app",
    color: "#ffffff",
    icon: "order-icon",
  },
  {
    key: "whatsapp",
    title: "WhatsApp Tracker",
    href: "https://wa.me/252610311877",
    color: "#25D366",
    icon: "whatsapp",
  },
  {
    key: "telegram",
    title: "Telegram Tracker",
    href: "https://t.me/likenew_order_bot",
    color: "#24A1DE",
    icon: "telegram",
  },
  {
    key: "lockers",
    title: "LikeNew Lockers",
    href: "/lockers",
    color: "#662d8f",
    icon: "locker-photo",
  },
];

// Social media — 3-column grid. "PENDING" means it needs a real
// link — just swap it in when available (no other code changes needed).
const SOCIAL_LINKS = [
  {
    key: "tiktok",
    title: "TikTok",
    href: "https://www.tiktok.com/@likenew.so?_r=1&_t=ZS-9AgcvCrb4TN",
    color: "#000000",
    icon: "tiktok",
  },
  {
    key: "facebook",
    title: "Facebook",
    href: "https://www.facebook.com/share/19jK3jPQd9/",
    color: "#1877F2",
    icon: "facebook",
  },
  {
    key: "instagram",
    title: "Instagram",
    href: "https://www.instagram.com/likenew.so?srtk=MTU0cTFwMGRoMDcwNQ==",
    color: "#E1306C",
    icon: "instagram",
  },
  {
    key: "linkedin",
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/likenew-so/",
    color: "#0A66C2",
    icon: "linkedin",
  },
  {
    key: "snapchat",
    title: "Snapchat",
    href: "https://snapchat.com/t/JK3uPtH9",
    color: "#FFFC00",
    icon: "snapchat",
  },
];

function Icon({ name, size = 22 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (name) {
    case "logo":
      return <img src="/images/logo-icon.png" alt="" className="w-full h-full object-contain p-1.5" />;
    case "locker-photo":
      return <img src="/images/locker-product.png" alt="" className="w-full h-full object-cover" />;
    case "order-icon":
      return <img src="/images/order-icon.png" alt="" className="w-full h-full object-contain" />;
    case "cart":
      return (
        <svg {...common}>
          <path d="M7 4h-2l-1 2H2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 8 21h11v-2H8l1.1-2h7.45a2 2 0 0 0 1.79-1.11L21.7 8H6.21l-.94-2H7V4zm1 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
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
    case "snapchat":
      return (
        <svg {...common}>
          <path d="M12 2.4c2.9 0 4.6 2.1 4.65 4.45.02.87-.03 1.76.08 2.1.1.3.63.5 1.1.5.5 0 .97-.27 1.33-.27.4 0 .9.26.9.76 0 .48-.47.7-1 .9-.3.11-.62.2-.72.42-.08.17-.03.4.1.74.28.73 1.02 2.08 2.57 2.5.2.05.32.25.3.44-.05.42-1.1.75-2.37.9-.1.26-.2.56-.28.86-.07.26-.33.4-.6.33-.52-.13-1.05-.18-1.56-.1-.83.13-1.5.74-2.5.74s-1.67-.61-2.5-.74c-.5-.08-1.03-.03-1.56.1-.27.07-.53-.07-.6-.33-.08-.3-.18-.6-.28-.86-1.26-.15-2.32-.48-2.37-.9-.02-.19.1-.4.3-.44 1.55-.42 2.3-1.77 2.57-2.5.13-.34.18-.57.1-.74-.1-.22-.42-.3-.72-.42-.53-.2-1-.42-1-.9 0-.5.5-.76.9-.76.36 0 .83.27 1.33.27.47 0 1-.2 1.1-.5.1-.33.06-1.22.08-2.1.05-2.35 1.75-4.45 4.65-4.45z" />
        </svg>
      );
  }
  return null;
}

// IconTile — shared component used by both sections (main links + social).
function IconTile({ item, size = "lg" }) {
  const isPending = item.href === "PENDING" || item.href === null;
  const external = item.href && item.href.startsWith("http");
  const boxSize = size === "lg" ? "w-16 h-16" : "w-14 h-14";
  const iconSize = size === "lg" ? 26 : 24;

  const content = (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={`${boxSize} rounded-2xl flex items-center justify-center shadow-sm overflow-hidden transition-transform group-hover:scale-105 ${
          item.color === "#ffffff" ? "border border-gray-200" : ""
        }`}
        style={{
          backgroundColor: item.color,
          color: item.key === "snapchat" ? "#000" : "#fff",
        }}
      >
        <Icon name={item.icon} size={iconSize} />
      </div>
      <span className="text-[11px] font-bold text-gray-700 leading-tight max-w-[72px]">
        {item.title}
      </span>
      {isPending && <span className="text-[9px] text-gray-400">Coming Soon</span>}
    </div>
  );

  if (isPending) {
    return <div className="group opacity-60 cursor-default">{content}</div>;
  }

  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group"
    >
      {content}
    </a>
  );
}

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-xl mx-auto px-5 pt-28 pb-20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md mb-4 overflow-hidden">
            <img src="/images/logo-icon.png" alt="LikeNew" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-gray-900 font-black text-2xl tracking-tight">LikeNew</h1>
          <p className="text-gray-500 text-sm mt-1 max-w-xs">
            Everywhere you can find us — all in one place
          </p>
        </div>

        <div>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
            Key Links
          </p>
          <div className="grid grid-cols-3 gap-y-7 place-items-center">
            {MAIN_LINKS.map((item) => (
              <IconTile key={item.key} item={item} size="lg" />
            ))}
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-100">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
            Follow Us on Social Media
          </p>
          <div className="grid grid-cols-3 gap-y-6 place-items-center">
            {SOCIAL_LINKS.map((item) => (
              <IconTile key={item.key} item={item} size="sm" />
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-12">
          © {new Date().getFullYear()} LikeNew Smart Laundry · likenew.so
        </p>
      </div>
    </main>
  );
}
