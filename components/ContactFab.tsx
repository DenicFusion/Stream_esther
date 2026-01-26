import React from 'react';
import { SUPPORT_CONTACT, THEME_COLOR } from '../config';

export const ContactFab: React.FC = () => {
  if (!SUPPORT_CONTACT.showOnHome) return null;

  const isBlue = THEME_COLOR === 'BLUE';

  const handleClick = () => {
    if (SUPPORT_CONTACT.method === 'WHATSAPP') {
      const message = encodeURIComponent("Hello Admin, I need assistance with Stream Africa.");
      window.location.href = `https://wa.me/${SUPPORT_CONTACT.whatsappNumber}?text=${message}`;
    } else {
      window.location.href = SUPPORT_CONTACT.telegramUrl;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center group ${
        isBlue 
        ? 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/40' 
        : 'bg-gradient-to-br from-stream-green to-emerald-600 shadow-stream-green/40'
      }`}
      aria-label="Contact Admin"
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Message Icon */}
      <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        <path d="M7 9h10v2H7zm0-3h10v2H7z"/> 
      </svg>
    </button>
  );
};