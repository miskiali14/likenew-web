'use client';
import { useState } from 'react';

export default function TelegramWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-black">
      
      {/* 1. Button-ka Fixed ah ee Telegram-ka (Had iyo jeer muuqda) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#24A1DE] hover:bg-[#208ebd] text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
      >
        {/* Telegram SVG Icon */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.34 3.53-.51.35-.97.52-1.37.51-.44-.01-1.29-.25-1.92-.45-.77-.25-1.38-.38-1.33-.81.03-.22.33-.45.92-.69 3.59-1.56 5.99-2.59 7.2-3.09 3.42-1.42 4.13-1.67 4.6-.17.07.24.08.5.06.69z"/>
        </svg>
        <span>Track Order</span>
      </button>

      {/* 2. Popup-ka (Wuxuu soo baxayaa marka badhanka la gujiyo) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
          
          {/* Badhanka Xiritaanka (Close Icon) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            &times;
          </button>

          {/* Dhexda Popup-ka */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-800 mb-2">LikeNew Tracker 🧺</h4>
            <p className="text-sm text-gray-600 mb-5">
              Si aad u la socoto heerka dalabkaaga oo aad ogeysiis toos ah u hesho marka uu diyaaro, ku xir bot-kayaga.
            </p>
            
            {/* Link-ga saxda ah ee Telegram Bot-kaaga */}
            <a
              href="https://t.me/likenew_order_bot" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#24A1DE] hover:bg-[#208ebd] text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md"
            >
              Ku Furi Telegram
            </a>
          </div>

        </div>
      )}
    </div>
  );
}