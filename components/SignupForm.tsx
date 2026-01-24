import React, { useState } from 'react';
import { Button } from './Button';
import { UserData } from '../types';
import { CustomAlert } from './CustomAlert';
import { THEME_COLOR } from '../config';

interface SignupFormProps {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
  initialData?: UserData | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onBack, initialData }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isBlue = THEME_COLOR === 'BLUE';
  
  const [alertState, setAlertState] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, title: '', message: '', type: 'info' });

  const [formData, setFormData] = useState<UserData>(initialData || {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setAlertState({ show: true, title, message, type });
  };

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, show: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUserStr = localStorage.getItem('stream_user');
    
    if (!storedUserStr) {
      showAlert("Account Not Found", "Credentials not found. Please sign up first.", 'error');
      return;
    }

    try {
      const storedUser: UserData = JSON.parse(storedUserStr);
      if (
        (storedUser.username === formData.username || storedUser.email === formData.username) && 
        storedUser.password === formData.password
      ) {
        onSubmit(storedUser);
      } else {
        showAlert("Login Failed", "Invalid credentials. Please try again.", 'error');
      }
    } catch (err) {
      showAlert("System Error", "Error reading user data.", 'error');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.name && formData.username && formData.email && formData.phone && formData.password) {
        const newUser = { ...formData, isActivated: false };
        localStorage.setItem('stream_user', JSON.stringify(newUser));
        onSubmit(newUser);
    } else {
        showAlert("Incomplete Form", "Please fill in all fields.", 'error');
    }
  };

  // Restored Hide and Seek Toggle - Exact match of the second image (clean Eye-Off SVG)
  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-0 top-0 h-full w-14 flex items-center justify-center text-gray-500 hover:text-white transition-all cursor-pointer z-20 group"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <div className="p-2 rounded-lg transition-colors group-hover:bg-white/5 flex items-center justify-center">
        {showPassword ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943-9.543-7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-y-auto">
      <CustomAlert 
        isOpen={alertState.show}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={closeAlert}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${isBlue ? 'from-sky-900/30' : 'from-emerald-900/30'} to-transparent opacity-60`}></div>
      </div>
      
      <div className="w-full max-w-[420px] bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-white/5 relative z-10 overflow-hidden flex flex-col">
        <div className="px-6 pt-6 flex items-center">
            <button 
                onClick={onBack} 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-xl hover:bg-white/5"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back
            </button>
        </div>

        <div className="px-8 pb-10 pt-2">
            <div className="flex flex-col items-center text-center mb-10">
                <div className={`w-24 h-24 rounded-full p-1.5 border-2 ${isBlue ? 'border-sky-500/20' : 'border-emerald-500/20'} mb-5 bg-[#0f172a] shadow-inner relative`}>
                    <img className="w-full h-full rounded-full object-cover" src="logo.jpg" alt="Stream Africa" />
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">
                    {isLoginMode ? 'Welcome Back' : 'Join Stream'}
                </h2>
                <p className="mt-2 text-sm text-gray-400 font-medium tracking-wide">
                    {isLoginMode ? 'Access your streamer dashboard' : 'Start your earning journey today'}
                </p>
            </div>
            
            <form className="space-y-6" onSubmit={isLoginMode ? handleLogin : handleSignup}>
            
            {!isLoginMode && (
                <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        className="w-full h-14 px-6 bg-black/25 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Username</label>
                <input
                    name="username"
                    type="text"
                    required
                    className="w-full h-14 px-6 bg-black/25 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                    placeholder="streamer123"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>

            {!isLoginMode && (
                <>
                <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full h-14 px-6 bg-black/25 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                    <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full h-14 px-6 bg-black/25 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                </>
            )}

            <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full h-14 px-6 bg-black/25 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all pr-14"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <PasswordToggle />
                </div>
                {isLoginMode && (
                  <div className="flex justify-end pr-1">
                      <button type="button" onClick={() => showAlert("Info", "Contact support to reset password.", "info")} className="text-[10px] font-bold text-emerald-400 hover:opacity-80 transition-opacity uppercase tracking-widest">Forgot Password?</button>
                  </div>
                )}
            </div>

            <div className="pt-6">
                <Button 
                    type="submit" 
                    fullWidth 
                    className="h-16 text-lg font-bold !rounded-[1.25rem] border-0 !shadow-[0_12px_40px_rgba(0,0,0,0.5)] !bg-gradient-to-r !from-emerald-500 !to-green-600 hover:!from-emerald-400 hover:!to-green-500 !shadow-emerald-900/40 transition-all duration-300 transform active:scale-[0.97]"
                >
                {isLoginMode ? 'Sign In' : 'Create Account'}
                </Button>
            </div>

            <div className="text-center pt-4">
                <p className="text-gray-500 text-[13px] font-medium tracking-wide">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setShowPassword(false);
                        }}
                        className="ml-2 text-white font-bold hover:text-emerald-400 transition-all underline underline-offset-4 decoration-white/20"
                    >
                        {isLoginMode ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};