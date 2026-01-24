import React, { useState, useEffect } from 'react';
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
import { Dashboard } from './components/Dashboard';
import { NotificationToast } from './components/NotificationToast';
import { ViewState, UserData } from './types';
import { Button } from './components/Button';
import { SHOW_DASHBOARD_BEFORE_PAYMENT } from './config';

// CONFIGURATION FOR REDIRECT
const REDIRECT_CONFIG = {
  useWhatsApp: false, 
  whatsAppNumber: "2349012345678", 
  telegramUrl: "https://t.me/Stream_African"
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
  const [paymentRef, setPaymentRef] = useState<string>('');
  const [paymentBank, setPaymentBank] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Browser History Handling for Mobile Back Button
  useEffect(() => {
    // Push initial state
    window.history.replaceState({ view: 'HOME' }, '');

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        // Default to home if no state
        setCurrentView('HOME');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Helper to handle navigation with 1.5s loader
  const transitionTo = (view: ViewState) => {
    setIsLoading(true);
    
    // Update history
    window.history.pushState({ view }, '', `#${view.toLowerCase()}`);

    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1500); 
  };

  const handleAuthSubmit = (data: UserData) => {
    setUserData(data);
    
    if (data.isActivated) {
        transitionTo('DASHBOARD');
        return;
    }

    if (SHOW_DASHBOARD_BEFORE_PAYMENT) {
       transitionTo('DASHBOARD');
    } else {
       transitionTo('PAYMENT');
    }
  };

  const handlePaymentSuccess = (reference: string, bankInfo?: string) => {
    setPaymentRef(reference);
    setPaymentBank(bankInfo || '');
    
    if (userData) {
        const updatedUser = { ...userData, isActivated: true };
        setUserData(updatedUser);
        localStorage.setItem('stream_user', JSON.stringify(updatedUser));
    }

    transitionTo('SUCCESS');
  };

  const handleRedirect = () => {
    if (userData) {
      const isManual = !!paymentBank && !paymentRef;
      
      let message = `Hello Stream Africa,%0A%0AI have just completed my payment and registration.`;
      
      if (isManual) {
          message += `%0A%0A*Method:* Manual Bank Transfer%0A*Paid to:* ${paymentBank}`;
      } else {
          message += `%0A%0A*Method:* Instant Online Payment%0A*Ref:* ${paymentRef}`;
      }

      message += `%0A%0A*Details:*%0AName: ${userData.name}%0AUsername: ${userData.username}%0APhone: ${userData.phone}%0A%0APlease verify my account activation.`;
      
      if (REDIRECT_CONFIG.useWhatsApp) {
        const url = `https://wa.me/${REDIRECT_CONFIG.whatsAppNumber}?text=${message}`;
        window.location.href = url;
      } else {
        const baseUrl = REDIRECT_CONFIG.telegramUrl;
        const separator = baseUrl.includes('?') ? '&' : '?';
        const url = `${baseUrl}${separator}text=${message}`;
        window.location.href = url;
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <>
            <NotificationToast type="REGISTER" />
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
            onSubmit={handleAuthSubmit} 
            onBack={() => window.history.back()} 
            initialData={userData}
          />
        );
      case 'DASHBOARD':
        if (!userData) return <SignupForm onSubmit={handleAuthSubmit} onBack={() => window.history.back()} />;
        return (
           <Dashboard 
              userData={userData} 
              onActivate={() => transitionTo('PAYMENT')} 
           />
        );
      case 'PAYMENT':
        if (!userData) return <SignupForm onSubmit={handleAuthSubmit} onBack={() => window.history.back()} />;
        return (
          <PaymentPage 
            userData={userData} 
            onSuccess={handlePaymentSuccess} 
            onBack={() => window.history.back()} 
          />
        );
      case 'SUCCESS':
        const isManual = !!paymentBank && !paymentRef;
        return (
          <div className="min-h-screen bg-stream-dark flex items-center justify-center p-4">
            <div className="text-center max-w-lg w-full bg-stream-card p-10 rounded-3xl border border-stream-green/20 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 bg-stream-green/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <svg className="w-10 h-10 text-stream-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 relative z-10">
                 {isManual ? 'Transaction pending!' : 'Activation Success!'}
              </h2>
              <p className="text-xl text-gray-300 mb-6 relative z-10">
                {isManual 
                  ? 'Your transfer notification has been received. Our team will verify your payment shortly.Kindly proceed with the botton below.' 
                  : 'Your payment was successful. Your account is now fully active and verified. click the botton below for approval.'}
              </p>
              
              <div className="bg-white/5 p-4 rounded-xl mb-8 border border-white/5 relative z-10">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest font-bold">
                  {isManual ? 'Chosen Bank Account' : 'Payment Reference'}
                </p>
                <div className="font-mono text-white text-sm break-all select-all font-bold">
                  {isManual ? paymentBank : paymentRef}
                </div>
              </div>

              <div className="mb-6 relative z-10">
                 <p className="text-stream-green font-semibold animate-pulse text-sm uppercase tracking-wide">
                   ⚠️ Kindly click the button below to continue
                 </p>
              </div>
              <div className="relative group z-10">
                <div className="absolute -inset-1 bg-stream-green rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button 
                    onClick={handleRedirect} 
                    fullWidth 
                    className="relative text-lg py-4 !shadow-[0_0_20px_rgba(14,165,233,0.4)] !border-none"
                >
                  {REDIRECT_CONFIG.useWhatsApp ? 'Finalize on WhatsApp' : 'Finalize on Telegram'}
                </Button>
              </div>
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
