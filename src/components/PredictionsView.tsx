import React, { useState } from 'react';
import type { DomainPrediction, Language } from '../types/astrology';
import {
  GraduationCap, Briefcase, Coins, Heart, Baby,
  Activity, Globe, Home, Sparkles, ShieldCheck, Star
} from 'lucide-react';

interface PredictionsViewProps {
  predictions: DomainPrediction[];
  language: Language;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  Briefcase,
  Coins,
  Heart,
  Baby,
  Activity,
  Globe,
  Home,
  Sparkles,
  ShieldCheck,
};

export const PredictionsView: React.FC<PredictionsViewProps> = ({ predictions, language }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const filtered = selectedDomain === 'all'
    ? predictions
    : predictions.filter((p) => p.domainKey === selectedDomain);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {language === 'ta' ? 'வாழ்க்கைப் பலன்கள் (பிரிவு வாரியாக)' : 'Domain Life Predictions Engine'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'ta'
              ? 'பராசரர் மற்றும் ஜெய்மினி விதிகளின் அடிப்படையில் தயாரிக்கப்பட்ட துல்லியமான பலன்கள்'
              : 'Synthesizing Parashari and Jaimini rules into multi-domain forecasts'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDomain === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {language === 'ta' ? 'அனைத்து பிரிவுகளும்' : 'All Domains'}
          </button>
          {predictions.map((p) => (
            <button
              key={p.domainKey}
              onClick={() => setSelectedDomain(p.domainKey)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDomain === p.domainKey
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {language === 'ta' ? p.domainTa.split(' ')[0] : p.domainEn.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Predictions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((pred) => {
          const IconComp = ICON_MAP[pred.iconName] || Sparkles;

          return (
            <div
              key={pred.domainKey}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 font-serif">
                        {language === 'ta' ? pred.domainTa : pred.domainEn}
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Power Index: {pred.strengthScore}%
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < pred.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-amber-200 font-medium mb-3 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                  {language === 'ta' ? pred.summaryTa : pred.summaryEn}
                </p>

                {/* Bullet details */}
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(language === 'ta' ? pred.detailsTa : pred.detailsEn).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 text-[10px] mt-0.5">◆</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
