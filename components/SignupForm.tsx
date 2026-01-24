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
  
  // Alert State
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
      showAlert("Account Not Found", "Credentials not found. Please sign up first to create an account.", 'error');
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
        showAlert("Login Failed", "Invalid username or password. Please try again.", 'error');
      }
    } catch (err) {
      console.error(err);
      showAlert("System Error", "Error reading user data. Please register again.", 'error');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.name && formData.username && formData.email && formData.phone && formData.password) {
        const newUser = { ...formData, isActivated: false };
        localStorage.setItem('stream_user', JSON.stringify(newUser));
        onSubmit(newUser);
    } else {
        showAlert("Incomplete Form", "Please fill in all fields to continue.", 'error');
    }
  };

  const handleForgotPassword = () => {
    showAlert("Notice", "Redirecting to account creation...", 'info');
    setTimeout(() => {
        setIsLoginMode(false);
    }, 1500);
  };

  // Password Toggle Component for re-use
  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-white flex items-center justify-center transition-colors group"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <svg className={`h-5 w-5 ${isBlue ? 'group-hover:text-sky-400' : 'group-hover:text-stream-green'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943-9.543-7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className={`h-5 w-5 ${isBlue ? 'group-hover:text-sky-400' : 'group-hover:text-stream-green'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-stream-dark flex items-center justify-center p-4 relative overflow-y-auto">
      <CustomAlert 
        isOpen={alertState.show}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={closeAlert}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#0f172a]"></div>
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${isBlue ? 'from-sky-900/20' : 'from-emerald-900/20'} to-transparent`}></div>
      </div>
      
      <div className="w-full max-w-md bg-[#1e293b] rounded-3xl shadow-2xl border border-white/10 relative z-10 overflow-hidden flex flex-col">
        <div className="px-6 pt-6 flex items-center justify-between">
            <button 
                onClick={onBack} 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/5"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back
            </button>
        </div>

        <div className="px-8 pb-8 pt-2">
            <div className="flex flex-col items-center text-center mb-8">
                <div className={`w-20 h-20 rounded-full p-1 border-2 ${isBlue ? 'border-sky-500/30' : 'border-stream-green/30'} mb-4 bg-[#0f172a]`}>
                    <img className="w-full h-full rounded-full object-cover" src="logo.jpg" alt="Stream Africa" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    {isLoginMode ? 'Welcome Back' : 'Join Stream'}
                </h2>
                <p className="mt-2 text-sm text-gray-400 max-w-xs mx-auto">
                    {isLoginMode ? 'Access your dashboard' : 'Start your earning journey today'}
                </p>
            </div>
            
            <form className="flex flex-col gap-5" onSubmit={isLoginMode ? handleLogin : handleSignup}>
            {isLoginMode && (
                <>
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Username or Email</label>
                    <input
                        name="username"
                        type="text"
                        required
                        className={`w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all`}
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className={`w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all pr-12`}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <PasswordToggle />
                    </div>
                    <div className="flex justify-end mt-1">
                         <button 
                           type="button" 
                           onClick={handleForgotPassword}
                           className={`text-xs font-medium ${isBlue ? 'text-sky-400 hover:text-sky-300' : 'text-stream-green hover:opacity-80'} transition-colors`}
                         >
                           Forgot Password?
                         </button>
                    </div>
                </div>
                </>
            )}

            {!isLoginMode && (
                <>
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                    <input
                        name="username"
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="streamer123"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all"
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full h-12 px-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-stream-green focus:ring-1 focus:ring-stream-green transition-all pr-12"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <PasswordToggle />
                    </div>
                </div>
                </>
            )}

            <div className="pt-2">
                <Button 
                    type="submit" 
                    fullWidth 
                    className={`py-4 text-lg font-bold !shadow-2xl border-0 ${
                        isBlue 
                        ? '!bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 !shadow-sky-900/30' 
                        : '!bg-gradient-to-r from-stream-green to-emerald-600 hover:from-accent hover:to-emerald-500 !shadow-emerald-900/30'
                    }`}
                >
                {isLoginMode ? 'Sign In' : 'Create Account'}
                </Button>
            </div>

            <div className="text-center">
                <p className="text-gray-400 text-sm">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setFormData(prev => ({ ...prev, password: '' }));
                            setShowPassword(false);
                        }}
                        className={`ml-2 text-white font-bold hover:${isBlue ? 'text-sky-400' : 'text-stream-green'} hover:underline transition-all`}
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