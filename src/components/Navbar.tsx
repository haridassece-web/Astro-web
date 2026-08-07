import React from 'react';
import { Sparkles, Languages, Printer, Compass, FlaskConical, User, LogOut, LogIn } from 'lucide-react';
import type { Language, UserUser } from '../types/astrology';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  chartFormat: 'south' | 'north';
  onToggleChartFormat: (format: 'south' | 'north') => void;
  onOpenReport: () => void;
  onOpenResearch: () => void;
  activeMode: 'pro' | 'research';
  setActiveMode: (mode: 'pro' | 'research') => void;
  currentUser: UserUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  chartFormat,
  onToggleChartFormat,
  onOpenReport,
  onOpenResearch,
  activeMode,
  setActiveMode,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  return (
    <header className="bg-slate-950/90 border-b border-amber-500/20 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-indigo-600 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent font-serif tracking-wide">
                AstroEngine Enterprise Pro
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
                v2.5 Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'ta'
                ? 'தொழில்முறை ஜோதிட முன்கணிப்பு இயங்குதளம்'
                : 'Professional Astrologer Prediction Engine & AI Platform'}
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActiveMode('pro')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMode === 'pro'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'ஜோதிட மையம்' : 'Pro Engine'}</span>
            </button>
            <button
              onClick={() => {
                setActiveMode('research');
                onOpenResearch();
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMode === 'research'
                  ? 'bg-indigo-600 text-white shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'ஆராய்ச்சி பயன்முறை' : 'Research Mode'}</span>
            </button>
          </div>

          <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex items-center text-xs">
            <button
              onClick={() => onToggleChartFormat('south')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                chartFormat === 'south' ? 'bg-slate-800 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ta' ? 'தென்னிந்தியா' : 'South Chart'}
            </button>
            <button
              onClick={() => onToggleChartFormat('north')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                chartFormat === 'north' ? 'bg-slate-800 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ta' ? 'வடஇந்தியா' : 'North Chart'}
            </button>
          </div>

          <button
            onClick={() => onToggleLanguage(language === 'ta' ? 'en' : 'ta')}
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            <Languages className="w-4 h-4 text-amber-400" />
            <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
          </button>

          {/* User Account / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-amber-500/30">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-bold text-amber-300">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
              </div>
              <button
                onClick={onLogout}
                title={language === 'ta' ? 'வெளியேறுக' : 'Sign Out'}
                className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>{language === 'ta' ? 'உள்நுழைக / பதிவு' : 'Login / Register'}</span>
            </button>
          )}

          <button
            onClick={onOpenReport}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'ta' ? 'அறிக்கை உருவாக்கல்' : 'PDF Report'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
