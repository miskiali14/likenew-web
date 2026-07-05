import "./globals.css";
import { Ubuntu } from "next/font/google";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import TelegramWidget from "@/components/TelegramWidget"; 

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata = {
  title: "Likenew Laundry",
  description: "Likenew Smart Laundry & Dry Cleaning Services",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${ubuntu.className}
          bg-[var(--secondary)]
          text-white
          antialiased
        `}
      >
        {/* Koodkii Meta Pixel ee errorka keenayay halkan waa laga saaray */}

        {children}

        <Footer />
        
        <Analytics />
        
        <TelegramWidget /> 
      </body>
    </html>
  );
}