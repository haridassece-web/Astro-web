import React from 'react';
import type { TransitAnalysis } from '../engine/transitEngine';
import type { Language } from '../types/astrology';
import { Compass, AlertCircle, Award } from 'lucide-react';

interface TransitViewProps {
  transit: TransitAnalysis;
  language: Language;
}

export const TransitView: React.FC<TransitViewProps> = ({ transit, language }) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-400"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              {language === 'ta' ? 'கோசாரப் பலன்கள் (Gochara Planetary Transits)' : 'Real-time Planetary Transit Engine (Gochara)'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ta'
                ? `தற்போதைய கிரக நகர்வு பலன்கள் (தேதி: ${transit.transitDate}) - சந்திரன் மற்றும் லக்னத்திற்கு ஒப்பிடப்பட்டது.`
                : `Current planetary transit analysis as of ${transit.transitDate} relative to Natal Moon and Lagna.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              Transit Score: {transit.overallTransitScore}%
            </span>
          </div>
        </div>

        {/* Ezharai Sani & Guru Transit Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold font-mono text-amber-400 block mb-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {language === 'ta' ? 'சனி கோசாரம் (Saturn Status)' : 'Saturn Gochara Status'}
            </span>
            <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
              {language === 'ta' ? transit.ezharaiSaniStatusTa : transit.ezharaiSaniStatusEn}
            </h4>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold font-mono text-emerald-400 block mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {language === 'ta' ? 'குரு கோசாரம் (Jupiter Status)' : 'Jupiter Gochara Status'}
            </span>
            <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
              {language === 'ta' ? transit.guruTransitStatusTa : transit.guruTransitStatusEn}
            </h4>
          </div>
        </div>
      </div>

      {/* Planetary Transit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transit.transitResults.map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-mono text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                {language === 'ta' ? item.planetTa : item.planet}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {language === 'ta' ? item.currentSignTa : item.currentSignEn}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono mb-2 flex items-center gap-3">
              <span>Moon: {item.houseFromMoon}th House</span>
              <span>Lagna: {item.houseFromLagna}th House</span>
            </div>

            {item.specialStatusTa && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mb-2">
                {language === 'ta' ? item.specialStatusTa : item.specialStatusEn}
              </span>
            )}

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              {language === 'ta' ? item.effectTa : item.effectEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
