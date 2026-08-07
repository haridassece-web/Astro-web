import React from 'react';
import type { AstrologyRule, Language } from '../types/astrology';
import { Award, BookOpen, CheckCircle2 } from 'lucide-react';

interface YogaAnalysisViewProps {
  yogasMatched: AstrologyRule[];
  language: Language;
}

export const YogaAnalysisView: React.FC<YogaAnalysisViewProps> = ({ yogasMatched, language }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          {language === 'ta'
            ? 'JSON விதி எஞ்சின் மூலம் கண்டறியப்பட்ட யோகங்கள்'
            : 'JSON Astrology Engine Detected Yogas & Combinations'}
        </h3>
        <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          {yogasMatched.length} {language === 'ta' ? 'விதிகள் பொருந்தியுள்ளன' : 'Rules Triggered'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {yogasMatched.map((yoga) => (
          <div
            key={yoga.id}
            className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {language === 'ta' ? yoga.nameTa : yoga.nameEn}
                  </h4>
                  <span className="text-[10px] font-mono text-indigo-400 block mt-0.5">
                    Category: {yoga.category} Yoga
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {yoga.score}/100
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <strong className="text-amber-400 font-mono block text-[10px] uppercase mb-0.5">
                  {language === 'ta' ? 'ஜோதிட விதி அcondition:' : 'Astrological Condition:'}
                </strong>
                {language === 'ta' ? yoga.descriptionTa : yoga.descriptionEn}
              </p>

              <p className="text-xs text-amber-200/90 leading-relaxed font-serif">
                <strong className="text-slate-400 text-[10px] uppercase block mb-0.5 font-sans">
                  {language === 'ta' ? 'பலன் அளிப்பு:' : 'Prediction Impact:'}
                </strong>
                {language === 'ta' ? yoga.predictionTa : yoga.predictionEn}
              </p>
            </div>

            {yoga.sourceText && (
              <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-slate-400" />
                  {yoga.sourceText}
                </span>
                <span className="text-emerald-400 font-bold">Rule Verified</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
