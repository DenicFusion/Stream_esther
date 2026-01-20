import React, { useState } from 'react';
import { Button } from './Button';
import { UserData } from '../types';

interface SignupFormProps {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields are present
    if(formData.name && formData.username && formData.email && formData.phone && formData.password) {
        onSubmit(formData);
    } else {
        alert("Please fill in all fields to continue.");
    }
  };

  return (
    <div className="min-h-screen bg-stream-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0">
          <img src="image1.jpg" className="w-full h-full object-cover opacity-5" alt="Background" />
      </div>
      
      <div className="max-w-md w-full space-y-8 bg-stream-card p-8 rounded-2xl shadow-2xl border border-stream-green/20 relative z-10">
        <div>
          <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
            ← Back
          </button>
          <img className="mx-auto h-16 w-16 rounded-full border-2 border-stream-green object-cover" src="logo.jpg" alt="Stream Africa" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Join the movement. Start your earning journey.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-stream-green focus:border-stream-green sm:text-sm"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-stream-green focus:border-stream-green sm:text-sm"
                placeholder="streamer123"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-stream-green focus:border-stream-green sm:text-sm"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-stream-green focus:border-stream-green sm:text-sm"
                placeholder="+234..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-stream-green focus:border-stream-green sm:text-sm pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
          </div>

          <div>
            <Button type="submit" fullWidth>
              Proceed to Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};