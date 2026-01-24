import React, { useState } from 'react';
import { Button } from './Button';
import { ViewState } from '../types';
import { THEME_COLOR } from '../config';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isBlue = THEME_COLOR === 'BLUE';

  // Logo Component
  const Logo = () => (
    <div className="flex items-center gap-3">
       <img 
        src="logo.jpg" 
        alt="Stream Africa" 
        className="w-10 h-10 rounded-full border border-white/10 object-cover"
      />
      <span className="text-2xl font-bold text-white tracking-tighter">Stream</span>
    </div>
  );

  const handleScroll = (id: string) => {
    if (currentView !== 'HOME') {
      onNavigate('HOME');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-stream-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('HOME')}>
            <Logo />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => onNavigate('HOME')} className={`text-gray-300 hover:${isBlue ? 'text-sky-400' : 'text-stream-green'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Home</button>
              <button onClick={() => handleScroll('features')} className={`text-gray-300 hover:${isBlue ? 'text-sky-400' : 'text-stream-green'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Features</button>
              <button onClick={() => handleScroll('faq')} className={`text-gray-300 hover:${isBlue ? 'text-sky-400' : 'text-stream-green'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>FAQs</button>
              {currentView === 'HOME' && (
                <Button 
                  onClick={() => onNavigate('SIGNUP')} 
                  className={`ml-4 !rounded-full !px-8 !py-2.5 !border-0 ${isBlue ? '!bg-gradient-to-r !from-sky-500 !to-blue-600' : '!bg-gradient-to-r !from-stream-green !to-emerald-600'} hover:scale-105 transition-transform !shadow-lg`}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isOpen ? (isBlue ? 'text-sky-400' : 'text-stream-green') : 'text-gray-400'} hover:text-white hover:bg-white/5 focus:outline-none transition-colors`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-stream-card border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => { onNavigate('HOME'); setIsOpen(false); }} 
              className={`text-gray-300 hover:${isBlue ? 'text-sky-400 bg-sky-400/10' : 'text-stream-green bg-stream-green/10'} block px-3 py-3 rounded-xl text-base font-semibold w-full text-left transition-all`}
            >
              Home
            </button>
            <button 
              onClick={() => handleScroll('features')} 
              className={`text-gray-300 hover:${isBlue ? 'text-sky-400 bg-sky-400/10' : 'text-stream-green bg-stream-green/10'} block px-3 py-3 rounded-xl text-base font-semibold w-full text-left transition-all`}
            >
              Features
            </button>
             <button 
              onClick={() => handleScroll('faq')} 
              className={`text-gray-300 hover:${isBlue ? 'text-sky-400 bg-sky-400/10' : 'text-stream-green bg-stream-green/10'} block px-3 py-3 rounded-xl text-base font-semibold w-full text-left transition-all`}
            >
              FAQs
            </button>
            {currentView === 'HOME' && (
              <div className="px-3 pt-4 pb-2">
                <Button 
                  onClick={() => { onNavigate('SIGNUP'); setIsOpen(false); }} 
                  fullWidth 
                  className={`!rounded-xl !py-4 !text-lg !border-0 ${isBlue ? '!bg-gradient-to-r !from-sky-500 !to-blue-600' : '!bg-gradient-to-r !from-stream-green !to-emerald-600'} shadow-xl`}
                >
                  Sign Up Now
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};