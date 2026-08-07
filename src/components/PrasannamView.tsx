import React, { useState } from 'react';
import { calculatePrasannam, type PrasannamResult } from '../engine/prasannamEngine';
import type { Language } from '../types/astrology';
import { Compass, CheckCircle2, RefreshCw } from 'lucide-react';

interface PrasannamViewProps {
  language: Language;
}

export const PrasannamView: React.FC<PrasannamViewProps> = ({ language }) => {
  const [category, setCategory] = useState<'career' | 'health' | 'marriage' | 'business' | 'general'>('general');
  const [seedNumber, setSeedNumber] = useState<number>(77);
  const [prasannam, setPrasannam] = useState<PrasannamResult>(() => calculatePrasannam('general', 77, language));

  const handleCalculate = () => {
    const res = calculatePrasannam(category, seedNumber, language);
    setPrasannam(res);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-400"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              {language === 'ta' ? 'ஜாமக்கோள் பிரசன்னம் & ஆருடக் கணிப்பு' : 'Jamakkol Prasannam & Horary Divination Engine'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ta'
                ? 'உதய லக்னம், ஆருட லக்னம், கவிப்பு மற்றும் ஜாமக்கோள் கிரகக் கணிப்பு மூலம் உடனடி கேள்விப் பலன்கள்.'
                : 'Real-time Horary Prasannam calculations based on Udaya, Arudha, Kavippu and Jamak Planets.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              Prasannam Accuracy: {prasannam.successProbability}%
            </span>
          </div>
        </div>

        {/* Input Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {language === 'ta' ? 'பிரசன்னக் கேள்வி வகை' : 'Query Domain Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-200 outline-none"
            >
              <option value="general">{language === 'ta' ? 'பொதுக் கேள்வி (General Query)' : 'General Query'}</option>
              <option value="career">{language === 'ta' ? 'தொழில் & வேலை (Career)' : 'Career & Job'}</option>
              <option value="marriage">{language === 'ta' ? 'திருமணம் (Marriage)' : 'Marriage Alliance'}</option>
              <option value="business">{language === 'ta' ? 'வியாபாரம் (Business)' : 'Business Venture'}</option>
              <option value="health">{language === 'ta' ? 'ஆரோக்கியம் (Health)' : 'Health Recovery'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {language === 'ta' ? 'ஆருட எண் (1-108 Seed Number)' : 'Seed Number (1-108)'}
            </label>
            <input
              type="number"
              min="1"
              max="108"
              value={seedNumber}
              onChange={(e) => setSeedNumber(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-300 font-mono outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'பிரசன்னம் கணக்கிடுக' : 'Calculate Prasannam'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prasannam Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">உதய லக்னம் (Udaya)</span>
          <p className="text-base font-bold text-amber-300 font-serif">{language === 'ta' ? prasannam.udayaLagnaTa : prasannam.udayaLagnaEn}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">ஆருட லக்னம் (Arudha)</span>
          <p className="text-base font-bold text-amber-300 font-serif">{language === 'ta' ? prasannam.arudhaLagnaTa : prasannam.arudhaLagnaEn}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">கவிப்பு ஸ்தானம் (Kavippu)</span>
          <p className="text-base font-bold text-amber-300 font-serif">{language === 'ta' ? prasannam.kavippuTa : prasannam.kavippuEn}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">ஜாமக் கிரகம் (Jamak Planet)</span>
          <p className="text-base font-bold text-amber-300 font-serif">{language === 'ta' ? prasannam.jamakkolPlanetTa : prasannam.jamakkolPlanet}</p>
        </div>
      </div>

      {/* Verdict & Recommendation */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-base font-bold text-slate-100 font-serif">
            {language === 'ta' ? prasannam.queryVerdictTa : prasannam.queryVerdictEn}
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 mt-2">
          {language === 'ta' ? prasannam.recommendationTa : prasannam.recommendationEn}
        </p>
      </div>
    </div>
  );
};
