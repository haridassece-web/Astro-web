import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Sparkles, LogIn, UserPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Language, UserUser } from '../types/astrology';

interface AuthModalProps {
  language: Language;
  onClose: () => void;
  onLoginSuccess: (user: UserUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ language, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg(language === 'ta' ? 'மின்னஞ்சல் மற்றும் கடவுச்சொல் அவசியம்' : 'Email and Password are required');
      return;
    }

    // Check existing stored users or create active session
    const storedUsersJson = localStorage.getItem('astro_registered_users');
    const registeredUsers: UserUser[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];

    const matchedUser = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    const userToLogin: UserUser = matchedUser || {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0] || (language === 'ta' ? 'ஜோதிட பயனர்' : 'Astro User'),
      email,
      phone: phone || '',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('astro_engine_user', JSON.stringify(userToLogin));
    setSuccessMsg(language === 'ta' ? 'வெற்றிகரமாக உள்நுழைந்தீர்கள்!' : 'Logged in successfully!');

    setTimeout(() => {
      onLoginSuccess(userToLogin);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password) {
      setErrorMsg(language === 'ta' ? 'அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்' : 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(language === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match');
      return;
    }

    const newUser: UserUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };

    // Store in registered users array
    const storedUsersJson = localStorage.getItem('astro_registered_users');
    const registeredUsers: UserUser[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];
    registeredUsers.push(newUser);
    localStorage.setItem('astro_registered_users', JSON.stringify(registeredUsers));

    // Set active session
    localStorage.setItem('astro_engine_user', JSON.stringify(newUser));

    setSuccessMsg(language === 'ta' ? 'பதிவு வெற்றி! கணக்கு உருவாக்கப்பட்டது.' : 'Registration successful! Account created.');

    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleGuestLogin = () => {
    const guestUser: UserUser = {
      id: 'usr_guest_' + Date.now(),
      name: language === 'ta' ? 'விருந்தினர் பயனர்' : 'Guest Astrologer',
      email: 'guest@astroengine.com',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('astro_engine_user', JSON.stringify(guestUser));
    setSuccessMsg(language === 'ta' ? 'விருந்தினராக உள்நுழைந்தீர்கள்!' : 'Logged in as Guest!');

    setTimeout(() => {
      onLoginSuccess(guestUser);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden relative">
        {/* Glow decoration */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-200 font-serif">
                {language === 'ta' ? 'பயனர் கணக்கு முனையம்' : 'AstroEngine Account Portal'}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                {language === 'ta' ? 'பாதுகாப்பான ஜோதிட சேவைகள்' : 'Secure Personalized Astrologer Hub'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-2 bg-slate-950/50 border-b border-slate-800/60 flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'உள்நுழைக (Sign In)' : 'Sign In'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'புதிய கணக்கு பதிவு' : 'Register Account'}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-3 py-2 rounded-xl flex items-center gap-2">
              <X className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-2 rounded-xl flex items-center gap-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                  {language === 'ta' ? 'மின்னஞ்சல் (Email)' : 'Email Address'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2.5 text-xs text-slate-100 pl-9 outline-none transition-all placeholder:text-slate-600"
                    required
                  />
                  <Mail className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                  {language === 'ta' ? 'கடவுச்சொல் (Password)' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2.5 text-xs text-slate-100 pl-9 outline-none transition-all placeholder:text-slate-600"
                    required
                  />
                  <Lock className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black tracking-wide py-2.5 px-4 rounded-xl text-xs uppercase shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'ta' ? 'உள்நுழைக' : 'Sign In Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ta' ? 'நேரடி விருந்தினர் அனுமதி (Fast Guest Login)' : 'Continue as Guest'}</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                  {language === 'ta' ? 'முழுப் பெயர்' : 'Full Name'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ta' ? 'உங்கள் பெயர்...' : 'John Doe'}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2.5 text-xs text-slate-100 pl-9 outline-none transition-all placeholder:text-slate-600"
                    required
                  />
                  <User className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                  {language === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2.5 text-xs text-slate-100 pl-9 outline-none transition-all placeholder:text-slate-600"
                    required
                  />
                  <Mail className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                  {language === 'ta' ? 'தொலைபேசி எண் (விருப்பத்தேர்வு)' : 'Phone Number (Optional)'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2.5 text-xs text-slate-100 pl-9 outline-none transition-all placeholder:text-slate-600"
                  />
                  <Phone className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                    {language === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono font-bold text-amber-300/80 block mb-1">
                    {language === 'ta' ? 'உறுதிசெய்க' : 'Confirm'}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black tracking-wide py-2.5 px-4 rounded-xl text-xs uppercase shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{language === 'ta' ? 'பதிவுசெய்க (Register)' : 'Create Account Now'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
