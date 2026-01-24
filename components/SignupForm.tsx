import React, { useState } from 'react';
import { Button } from './Button';
import { UserData } from '../types';

interface SignupFormProps {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
  initialData?: UserData | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onBack, initialData }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<UserData>(initialData || {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Retrieve user from Local Storage
    const storedUserStr = localStorage.getItem('stream_user');
    
    if (!storedUserStr) {
      alert("Credentials not found. Please sign up first.");
      return;
    }

    try {
      const storedUser: UserData = JSON.parse(storedUserStr);
      
      // 2. Validate Credentials
      if (
        (storedUser.username === formData.username || storedUser.email === formData.username) && 
        storedUser.password === formData.password
      ) {
        // Success
        onSubmit(storedUser);
      } else {
        alert("Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      alert("Error reading user data. Please register again.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if(formData.name && formData.username && formData.email && formData.phone && formData.password) {
        // 1. Save to Local Storage
        const newUser = { ...formData, isActivated: false };
        localStorage.setItem('stream_user', JSON.stringify(newUser));
        
        // 2. Proceed
        onSubmit(newUser);
    } else {
        alert("Please fill in all fields to continue.");
    }
  };

  // Mock "Forgot Password" behavior: Redirect to Signup
  const handleForgotPassword = () => {
    alert("Redirecting to account creation...");
    setIsLoginMode(false);
  };

  return (
    <div className="min-h-screen bg-stream-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-stream-dark to-slate-900"></div>
          <img src="image1.jpg" className="w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Background" />
      </div>
      
      <div className="max-w-md w-full bg-stream-card p-8 rounded-2xl shadow-2xl border border-white/10 relative z-10 backdrop-blur-xl">
        
        {/* Header Section */}
        <div className="text-center mb-8 relative">
            <button 
                onClick={onBack} 
                className="absolute -top-2 left-0 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back
            </button>

            <div className="inline-block p-1 rounded-full border-2 border-stream-green mb-4 mt-6">
                <img className="h-16 w-16 rounded-full object-cover" src="logo.jpg" alt="Stream Africa" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {isLoginMode ? 'Welcome Back' : 'Join Stream'}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
                {isLoginMode ? 'Enter your credentials to access your dashboard' : 'Start your earning journey today'}
            </p>
        </div>
        
        <form className="space-y-5" onSubmit={isLoginMode ? handleLogin : handleSignup}>
          
          {/* LOGIN FORM STRUCTURE */}
          {isLoginMode && (
            <>
              <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-300 ml-1">Username or Email</label>
                 <input
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
              </div>

              <div className="space-y-1">
                 <label className="block text-sm font-medium text-gray-300 ml-1">Password</label>
                 <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all pr-10"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                 </div>
                 <div className="flex justify-end pt-1">
                     <button 
                       type="button" 
                       onClick={handleForgotPassword}
                       className="text-sm text-stream-green hover:text-emerald-400 font-medium transition-colors"
                     >
                       Forgot Password?
                     </button>
                 </div>
              </div>
            </>
          )}

          {/* SIGNUP FORM STRUCTURE */}
          {!isLoginMode && (
             <>
                <div className="space-y-1 animate-slideDown">
                  <label className="block text-sm font-medium text-gray-300 ml-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-300 ml-1">Username</label>
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all"
                    placeholder="streamer123"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1 animate-slideDown" style={{animationDelay: '0.1s'}}>
                  <label className="block text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1 animate-slideDown" style={{animationDelay: '0.2s'}}>
                  <label className="block text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-300 ml-1">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stream-green focus:border-transparent transition-all pr-10"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
             </>
          )}

          <div className="pt-4">
            <Button type="submit" fullWidth className="py-3.5 text-lg font-bold shadow-lg shadow-emerald-500/20">
              {isLoginMode ? 'Login' : 'Create Account'}
            </Button>
          </div>

          <div className="text-center pt-2">
            <span className="text-gray-400 text-sm">
              {isLoginMode ? "New to Stream?" : "Already have an account?"}
            </span>
            <button 
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setFormData(prev => ({ ...prev, password: '' }));
              }}
              className="ml-2 text-stream-green font-bold hover:text-emerald-400 text-sm transition-colors"
            >
              {isLoginMode ? 'Create Account' : 'Login Here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};