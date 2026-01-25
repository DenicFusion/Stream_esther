import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { Button } from './Button';
import { NotificationToast } from './NotificationToast';
import { THEME_COLOR } from '../config';

interface DashboardProps {
  userData: UserData;
  onActivate: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userData, onActivate }) => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'EARN' | 'BAZAAR' | 'ACADEMY' | 'PROFILE'>('HOME');
  const [showActivateModal, setShowActivateModal] = useState(false);
  const isActivated = userData.isActivated || false;
  const isBlue = THEME_COLOR === 'BLUE';

  // Auto-trigger Activation Modal after 5 seconds if not activated
  useEffect(() => {
    if (!isActivated) {
      const timer = setTimeout(() => {
        setShowActivateModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isActivated]);

  const handleProtectedAction = () => {
    if (!isActivated) {
      setShowActivateModal(true);
    }
  };

  const NavItem = ({ id, icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center gap-1 p-2 ${activeTab === id ? 'text-stream-green' : 'text-gray-500 hover:text-gray-300'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050A18] pb-24 relative overflow-hidden font-sans">
      <NotificationToast type="ACTIVATE" />
      
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-[#050A18]/95 backdrop-blur-sm sticky top-0 z-40 border-b border-white/5">
        <div>
          <h1 className="text-white text-lg font-bold">Hello, {userData.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-400 text-xs flex items-center gap-1">
             Status: 
             {isActivated ? (
               <span className={`${isBlue ? 'text-sky-400' : 'text-emerald-400'} font-bold flex items-center gap-1`}>
                 Verified <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
               </span>
             ) : (
               <span className="text-yellow-500 font-bold">Demo Mode</span>
             )}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
            <span className="text-white font-bold">{userData.username.charAt(0).toUpperCase()}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 space-y-6">
        
        {/* Wallet Card */}
        <div className={`bg-gradient-to-br ${isBlue ? 'from-blue-900/40 to-[#0f172a]' : 'from-slate-900 to-[#0f172a]'} rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-32 h-32 ${isBlue ? 'bg-sky-500/10' : 'bg-stream-green/10'} rounded-full blur-3xl -mr-10 -mt-10`}></div>
          <p className="text-gray-400 text-sm mb-1">Total Balance</p>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-bold text-white">₦</span>
            <span className="text-4xl font-extrabold text-white tracking-tight">0.00</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleProtectedAction} className={`${isBlue ? 'bg-sky-500 shadow-sky-900/20' : 'bg-stream-green shadow-emerald-900/20'} text-white py-3 rounded-xl font-semibold text-sm shadow-lg active:scale-95 transition-transform`}>
              Top Up
            </button>
            <button onClick={handleProtectedAction} className="bg-white/10 text-white py-3 rounded-xl font-semibold text-sm border border-white/10 hover:bg-white/20 active:scale-95 transition-transform">
              Withdraw
            </button>
          </div>
        </div>

        {/* Earning Hub Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">Earning Hub</h2>
            <span className={`text-xs ${isBlue ? 'text-sky-400' : 'text-stream-green'} font-medium`}>View All</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div onClick={handleProtectedAction} className="bg-[#0f172a] p-4 rounded-xl border border-white/5 relative group cursor-pointer overflow-hidden">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3 text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
              </div>
              <h3 className="text-white font-semibold">Stream Yield</h3>
              <p className="text-gray-500 text-xs mt-1">Earn from music</p>
              {!isActivated && <div className="absolute top-2 right-2"><svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6a5 5 0 00-10 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zM9 6a3 3 0 116 0v2H9V6z"/></svg></div>}
            </div>
            
            <div onClick={handleProtectedAction} className="bg-[#0f172a] p-4 rounded-xl border border-white/5 relative group cursor-pointer">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center mb-3 text-pink-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>
              </div>
              <h3 className="text-white font-semibold">TCN Salary</h3>
              <p className="text-gray-500 text-xs mt-1">TikTok Earnings</p>
            </div>

            <div onClick={handleProtectedAction} className="bg-[#0f172a] p-4 rounded-xl border border-white/5 relative group cursor-pointer">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3 text-orange-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </div>
              <h3 className="text-white font-semibold">Bazaar</h3>
              <p className="text-gray-500 text-xs mt-1">Sell Products</p>
            </div>

            <div onClick={handleProtectedAction} className="bg-[#0f172a] p-4 rounded-xl border border-white/5 relative group cursor-pointer">
              <div className={`w-10 h-10 ${isBlue ? 'bg-sky-500/10 text-sky-400' : 'bg-blue-500/10 text-blue-400'} rounded-lg flex items-center justify-center mb-3`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/></svg>
              </div>
              <h3 className="text-white font-semibold">Academy</h3>
              <p className="text-gray-500 text-xs mt-1">Learn Skills</p>
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/5">
           <h3 className="text-white font-semibold mb-4">Daily Activity</h3>
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                 <div className={`absolute inset-0 rounded-full border-4 ${isBlue ? 'border-sky-500' : 'border-stream-green'} border-t-transparent animate-spin`} style={{ animationDuration: '3s' }}></div>
                 <span className="text-white text-xs font-bold">0%</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Task Progress</p>
                <p className="text-white font-bold">0 / 5 Tasks</p>
              </div>
           </div>
        </div>

         {/* Referral Mock */}
         <div onClick={handleProtectedAction} className={`bg-gradient-to-r ${isBlue ? 'from-sky-900/40' : 'from-emerald-900/40'} to-slate-900 p-4 rounded-xl border ${isBlue ? 'border-sky-500/20' : 'border-emerald-500/20'} cursor-pointer`}>
            <div className="flex justify-between items-center">
                <div>
                   <h3 className={`${isBlue ? 'text-sky-400' : 'text-emerald-400'} font-bold text-sm`}>Invite Friends</h3>
                   <p className="text-gray-400 text-xs">Earn ₦5,000 per invite</p>
                </div>
                <div className={`${isBlue ? 'bg-sky-500/20' : 'bg-emerald-500/20'} p-2 rounded-lg`}>
                    <svg className={`w-5 h-5 ${isBlue ? 'text-sky-400' : 'text-emerald-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                </div>
            </div>
         </div>
      </main>

      {/* Activation Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowActivateModal(false)}></div>
           <div className={`bg-stream-card w-full max-w-sm rounded-2xl p-6 border ${isBlue ? 'border-sky-500/30' : 'border-emerald-500/30'} shadow-2xl relative animate-in fade-in zoom-in duration-300`}>
              <button onClick={() => setShowActivateModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
              <div className={`w-16 h-16 ${isBlue ? 'bg-sky-500/10 border-sky-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} rounded-full flex items-center justify-center mx-auto mb-4 border`}>
                 <svg className={`w-8 h-8 ${isBlue ? 'text-sky-500' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">Activate Lifetime Access</h3>
              <p className="text-gray-400 text-center text-sm mb-6">
                You are currently in Demo Mode. To unlock earning features, withdraw funds, and access the Bazaar, please complete your one-time activation.
              </p>
              <Button onClick={onActivate} fullWidth className={`py-3 shadow-lg ${isBlue ? 'shadow-sky-500/20' : 'shadow-emerald-500/20'}`}>
                Activate Now - ₦12,000
              </Button>
           </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-[#050A18] border-t border-white/10 flex justify-around items-center pb-safe pt-2 z-50 h-20">
        <NavItem id="HOME" label="Home" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} />
        <NavItem id="EARN" label="Earn" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} />
        <NavItem id="BAZAAR" label="Bazaar" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>} />
        <NavItem id="ACADEMY" label="Academy" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/></svg>} />
        <NavItem id="PROFILE" label="Profile" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>} />
      </nav>
    </div>
  );
};
