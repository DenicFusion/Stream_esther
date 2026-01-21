import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { Verification } from './components/Verification';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { SignupForm } from './components/SignupForm';
import { PaymentPage } from './components/PaymentPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ViewState, UserData } from './types';
import { Button } from './components/Button';

// CONFIGURATION FOR REDIRECT
const REDIRECT_CONFIG = {
  useWhatsApp: true, // Set to true to use WhatsApp, false for Telegram
  whatsAppNumber: "2349136339293", // Your WhatsApp number without '+'
  telegramUrl: "https://t.me/streamafrica_official" // Your Telegram Channel/Group link
};

const Loader: React.FC = () => (
  <div className="fixed inset-0 z-[100] bg-stream-dark/95 backdrop-blur-md flex flex-col items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-stream-green animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-stream-green rounded-full"></div>
      </div>
    </div>
    <p className="mt-4 text-white font-medium animate-pulse tracking-wider">LOADING...</p>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to handle navigation with 3s loader
  const transitionTo = (view: ViewState) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);
  };

  const handleSignupSubmit = (data: UserData) => {
    setUserData(data);
    transitionTo('PAYMENT');
  };

  const handlePaymentSuccess = () => {
    transitionTo('SUCCESS');
  };

  const handleRedirect = () => {
    if (REDIRECT_CONFIG.useWhatsApp && userData) {
      // Create a pre-filled message with user details
      const message = `Hello Stream Africa,%0A%0AI have just completed my payment and registration.%0A%0A*Here are my details:*%0AName: ${userData.name}%0AUsername: ${userData.username}%0AEmail: ${userData.email}%0APhone: ${userData.phone}%0A%0APlease verify my account.`;
      
      const url = `https://wa.me/${REDIRECT_CONFIG.whatsAppNumber}?text=${message}`;
      window.location.href = url;
    } else {
      // Telegram does not support pre-filled messages via URL in the same way for channels
      window.location.href = REDIRECT_CONFIG.telegramUrl;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <>
            <Navbar onNavigate={transitionTo} currentView="HOME" />
            <Hero onSignup={() => transitionTo('SIGNUP')} />
            <About />
            <Features />
            <Verification />
            <FAQ />
            <Footer />
            <ScrollToTop />
          </>
        );
      case 'SIGNUP':
        return (
          <SignupForm 
            onSubmit={handleSignupSubmit} 
            onBack={() => transitionTo('HOME')} 
          />
        );
      case 'PAYMENT':
        if (!userData) return <SignupForm onSubmit={handleSignupSubmit} onBack={() => transitionTo('HOME')} />;
        return (
          <PaymentPage 
            userData={userData} 
            onSuccess={handlePaymentSuccess} 
            onBack={() => transitionTo('SIGNUP')} 
          />
        );
      case 'SUCCESS':
        return (
          <div className="min-h-screen bg-stream-dark flex items-center justify-center p-4">
            <div className="text-center max-w-lg w-full bg-stream-card p-10 rounded-3xl border border-stream-green/20 shadow-2xl">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to STREAM!</h2>
              <p className="text-xl text-gray-300 mb-8">
                Your payment was successful. Your account is now active. Please join our official community to complete your onboarding.
              </p>
              <div className="bg-white/5 p-4 rounded-xl mb-8 border border-white/5">
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  ACTIVE & VERIFIED
                </div>
              </div>
              <Button onClick={handleRedirect} fullWidth className="text-lg py-4">
                {REDIRECT_CONFIG.useWhatsApp ? 'Complete Registration on WhatsApp' : 'Join Telegram Channel'}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {isLoading && <Loader />}
      {renderContent()}
    </div>
  );
};

export default App;
