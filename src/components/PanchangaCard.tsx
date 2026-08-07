import React from 'react';
import type { Panchanga, Language } from '../types/astrology';
import { Moon, Sun, Star, Compass, ShieldCheck, Sparkles } from 'lucide-react';

interface PanchangaCardProps {
  panchanga: Panchanga;
  language: Language;
}

export const PanchangaCard: React.FC<PanchangaCardProps> = ({ panchanga, language }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          {language === 'ta' ? 'பஞ்சாங்கம் & தாராபலம் அங்கங்கள்' : 'Panchanga & Astrological Elements'}
        </h3>
        <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Ayanamsa: {panchanga.ayanamsaDegree}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Vara */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">{language === 'ta' ? 'வாரம்' : 'Vara (Day)'}</span>
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-slate-100">
            {language === 'ta' ? panchanga.varaTa : panchanga.varaEn}
          </p>
          <span className="text-[10px] text-amber-400/80 font-mono block mt-1">
            Lord: {panchanga.varaLord}
          </span>
        </div>

        {/* 2. Tithi */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">{language === 'ta' ? 'திதி' : 'Tithi (Phase)'}</span>
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <p className="text-sm font-bold text-slate-100">
            {language === 'ta' ? panchanga.tithiTa : panchanga.tithiEn}
          </p>
          <span className="text-[10px] text-indigo-400/80 font-mono block mt-1">
            #{panchanga.tithiIndex} ({panchanga.tithiType})
          </span>
        </div>

        {/* 3. Nakshatra */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">{language === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra (Star)'}</span>
            <Star className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <p className="text-sm font-bold text-amber-300">
            {language === 'ta' ? panchanga.nakshatraTa : panchanga.nakshatraEn}
          </p>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">
            Star #{panchanga.nakshatraIndex}
          </span>
        </div>

        {/* 4. Yoga */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">{language === 'ta' ? 'யோகம்' : 'Yoga'}</span>
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-slate-100">
            {language === 'ta' ? panchanga.yogaTa : panchanga.yogaEn}
          </p>
          <span className="text-[10px] text-emerald-400/80 font-mono block mt-1">
            Yoga #{panchanga.yogaIndex}
          </span>
        </div>

        {/* 5. Karana */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">{language === 'ta' ? 'கரணம்' : 'Karana'}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-sm font-bold text-slate-100">
            {language === 'ta' ? panchanga.karanaTa : panchanga.karanaEn}
          </p>
          <span className="text-[10px] text-cyan-400/80 font-mono block mt-1">
            Karana #{panchanga.karanaIndex}
          </span>
        </div>
      </div>

      {/* Tara Balam & Chandra Balam Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">
              {language === 'ta' ? 'தாராகணம் (Tara Balam)' : 'Tara Balam (Star Strength)'}
            </span>
            <span className="text-xs font-semibold text-amber-300">
              {language === 'ta' ? panchanga.taraBalam.statusTa : panchanga.taraBalam.statusEn}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < panchanga.taraBalam.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-indigo-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">
              {language === 'ta' ? 'சந்திரபலம் (Chandra Balam)' : 'Chandra Balam (Lunar Strength)'}
            </span>
            <span className="text-xs font-semibold text-indigo-300">
              {language === 'ta' ? panchanga.chandraBalam.statusTa : panchanga.chandraBalam.statusEn}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < panchanga.chandraBalam.rating ? 'fill-indigo-400 text-indigo-400' : 'text-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
