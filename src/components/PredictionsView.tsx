import React, { useState } from 'react';
import type { DomainPrediction, Language, MudakkuIndividualPrediction, TithiSoonyaReport } from '../types/astrology';
import {
  GraduationCap, Briefcase, Coins, Heart, Baby,
  Activity, Globe, Home, Sparkles, ShieldCheck, Star, Compass, ArrowRight, Moon
} from 'lucide-react';

interface PredictionsViewProps {
  predictions: DomainPrediction[];
  mudakkuPrediction?: MudakkuIndividualPrediction;
  onNavigateToMudakku?: () => void;
  tithiSoonyaReport?: TithiSoonyaReport;
  onNavigateToTithi?: () => void;
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

export const PredictionsView: React.FC<PredictionsViewProps> = ({
  predictions,
  mudakkuPrediction,
  onNavigateToMudakku,
  tithiSoonyaReport,
  onNavigateToTithi,
  language,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const filtered = selectedDomain === 'all'
    ? predictions
    : predictions.filter((p) => p.domainKey === selectedDomain);

  return (
    <div className="space-y-4">
      {/* Individual Native Tithi Soonya Highlight Banner */}
      {tithiSoonyaReport && (
        <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900/95 to-slate-950 border border-indigo-500/40 rounded-2xl p-4 md:p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-wide">
                திதி பலன்கள் & சூன்ய ஆய்வு • Palm-leaf Shastra
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {language === 'ta' ? tithiSoonyaReport.tithiNameTa : tithiSoonyaReport.tithiNameEn}
              </span>
            </div>
            <h4 className="text-sm md:text-base font-bold text-amber-200 font-serif flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              {language === 'ta'
                ? `திதி சூன்ய ராசிகள்: ${tithiSoonyaReport.soonyaSignsTa.join(', ') || 'இல்லை'} • பாதக ஸ்தானம்: ${tithiSoonyaReport.badhakaBhava}-ஆம் பாவம்`
                : `Soonya Signs: ${tithiSoonyaReport.soonyaSignsEn.join(', ') || 'None'} • Badhaka: House ${tithiSoonyaReport.badhakaBhava}`}
            </h4>
            <p className="text-xs text-slate-300">
              {language === 'ta'
                ? `சூன்ய வீட்டில் உங்கள் செல்வம் மறைந்து இருக்கும். முதலில் வினைகள் கழிந்து பின்னர் பெரும் வெற்றி கிட்டும். 12 பாவக முழு சுவடி ஆய்வு தயாராக உள்ளது.`
                : `Hidden wealth is concealed within your Soonya house. Initial karmic clearance yields great victory. Complete 12 Bhavas Shastra report is ready.`}
            </p>
          </div>

          {onNavigateToTithi && (
            <button
              onClick={onNavigateToTithi}
              className="shrink-0 bg-indigo-500 hover:bg-indigo-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md group"
            >
              <span>{language === 'ta' ? 'திதி பலன்களைப் பார்க்க' : 'View Thithi Palangal'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      )}

      {/* Individual Native Mudakku Highlight Banner */}
      {mudakkuPrediction && (
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900/95 to-slate-950 border border-amber-500/40 rounded-2xl p-4 md:p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-wide">
                தனிநபர் முடக்கு பாவக ஆய்வு • Palm-leaf Shastra
              </span>
            </div>
            <h4 className="text-sm md:text-base font-bold text-amber-200 font-serif flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              {language === 'ta'
                ? `உங்கள் ஜாதக முடக்கு: ${mudakkuPrediction.mudakkuBhavaTitleTa} – அதிபதி: ${mudakkuPrediction.mudakkuLordNameTa}`
                : `Your Native Mudakku: ${mudakkuPrediction.mudakkuBhavaTitleEn} – Lord: ${mudakkuPrediction.mudakkuLordNameEn}`}
            </h4>
            <p className="text-xs text-slate-300">
              {language === 'ta'
                ? `சூரியன் நின்ற ${mudakkuPrediction.sunStarTa} நட்சத்திரத்திற்குரிய முடக்கு நட்சத்திரங்கள்: ${mudakkuPrediction.mudakkuStarTa}. 12 பாவக முழுமையான சுவடிப் பலன்கள் தயாராக உள்ளன.`
                : `Sun is in ${mudakkuPrediction.sunStarEn} yielding Mudakku stars ${mudakkuPrediction.mudakkuStarEn}. Detailed manuscript declarations and cautions ready.`}
            </p>
          </div>

          {onNavigateToMudakku && (
            <button
              onClick={onNavigateToMudakku}
              className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md group"
            >
              <span>{language === 'ta' ? 'முடக்கு பலன்களைப் பார்க்க' : 'View Mudakku Report'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      )}

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
  </div>
  );
};
