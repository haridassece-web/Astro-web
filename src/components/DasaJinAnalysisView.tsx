import React from 'react';
import type { DasaJinAnalysisReport } from '../engine/dasaJinEngine';
import type { Language } from '../types/astrology';
import {
  Flame,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  Heart,
  Baby,
  Coins,
  Eye,
  CheckCircle2,
  AlertOctagon,
  KeyRound,
  Compass,
} from 'lucide-react';

interface DasaJinAnalysisViewProps {
  report: DasaJinAnalysisReport;
  language: Language;
}

export const DasaJinAnalysisView: React.FC<DasaJinAnalysisViewProps> = ({
  report,
  language,
}) => {
  const { jinTaraInfo } = report;

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950 border border-purple-500/40 rounded-2xl p-4 md:p-6 shadow-2xl space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-amber-300 font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              {language === 'ta'
                ? 'தசா-புக்தி ஜின் & தார பலன் ஏட்டுச் சுவடி ஆய்வுகள்'
                : 'Dasa-Bhukti Jin & Tara Manuscript Analysis'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ta'
                ? `ஜென்ம நட்சத்திரம்: ${report.moonNakshatraNameTa} (${report.moonStarLordTa} அதிபதி)`
                : `Moon Nakshatra: ${report.moonNakshatraNameEn} (Lord ${report.moonStarLord})`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full border border-purple-500/40">
              {language === 'ta'
                ? `தசா: ${report.activeDasaLordTa} • புக்தி: ${report.activeBhuktiLordTa}`
                : `Dasa: ${report.activeDasaLord} • Bhukti: ${report.activeBhuktiLord}`}
            </span>
          </div>
        </div>

        {/* 3-Way Survival Linkage Status Banner */}
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-3 mt-3 text-xs md:text-sm font-sans ${
            report.isDeadEndWarning
              ? 'bg-rose-950/80 border-rose-500/60 text-rose-200'
              : report.hasJenmaLinkage
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/60 border-amber-500/40 text-amber-200'
          }`}
        >
          {report.isDeadEndWarning ? (
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : report.hasJenmaLinkage ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}

          <div>
            <strong className="block font-serif text-sm font-bold mb-0.5">
              {language === 'ta' ? '3 உயிர் ஆதாரத் தொடர்பு நிலை:' : '3-Way Survival Linkage Audit:'}
            </strong>
            <p className="leading-relaxed">
              {language === 'ta' ? report.linkageStatusTa : report.linkageStatusEn}
            </p>
          </div>
        </div>
      </div>

      {/* 2. 3, 5, 7 Jinn Taras Grid */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
        <h4 className="text-sm font-bold text-indigo-300 font-mono uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-2">
          <Flame className="w-4 h-4 text-amber-400" />
          {language === 'ta'
            ? '3, 5, 7 ஜின் தாரைகள் (வாழ்கையின் முக்கிய இயக்கு சக்திகள்)'
            : '3, 5, 7 Jinn Taras (Life Master Controllers)'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* 3rd Vipat Tara */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 space-y-2">
            <span className="font-bold text-amber-300 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              {language === 'ta' ? '3-வது விபத்து தாரை (Vipat Jinn):' : '3rd Vipat Tara (Vipat Jinn):'}
            </span>
            <div className="space-y-1">
              {jinTaraInfo.vipatStars.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-slate-900 px-2.5 py-1 rounded text-slate-200">
                  <span>{language === 'ta' ? s.nameTa : s.nameEn}</span>
                  <span className="font-bold text-amber-300 font-mono">({language === 'ta' ? s.lord : s.lord})</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-amber-200/80 pt-1">
              {language === 'ta' ? 'தடைகள், எதிர்பாராத அதிர்ச்சிகள் தரும்.' : 'Sudden hurdles & unexpected trials.'}
            </p>
          </div>

          {/* 5th Pratyak Tara */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-500/30 space-y-2">
            <span className="font-bold text-rose-300 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              {language === 'ta' ? '5-வது பிரத்யக் தாரை (Pratyak Jinn):' : '5th Pratyak Tara (Pratyak Jinn):'}
            </span>
            <div className="space-y-1">
              {jinTaraInfo.pratyakStars.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-slate-900 px-2.5 py-1 rounded text-slate-200">
                  <span>{language === 'ta' ? s.nameTa : s.nameEn}</span>
                  <span className="font-bold text-rose-300 font-mono">({language === 'ta' ? s.lord : s.lord})</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-rose-200/80 pt-1">
              {language === 'ta' ? 'எதிர்ப்புகள்; "5-வது நட்சத்திரம் உங்களை வீழ்த்தும்".' : 'Opposition & rival attacks.'}
            </p>
          </div>

          {/* 7th Vadhai Tara */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-red-500/40 space-y-2">
            <span className="font-bold text-red-400 font-mono flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              {language === 'ta' ? '7-வது வதை தாரை (Vadhai Jinn):' : '7th Vadhai Tara (Vadhai Jinn):'}
            </span>
            <div className="space-y-1">
              {jinTaraInfo.vadhaiStars.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-slate-900 px-2.5 py-1 rounded text-slate-200">
                  <span>{language === 'ta' ? s.nameTa : s.nameEn}</span>
                  <span className="font-bold text-red-400 font-mono">({language === 'ta' ? s.lord : s.lord})</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-red-200/80 pt-1">
              {language === 'ta' ? 'கடும் சோதனை; "7-வது நட்சத்திரம் உங்களை வதைக்கும்".' : 'Severe tests & physical agony.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Key-Point & Mid-Point Analysis Card */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
        <h4 className="text-sm font-bold text-indigo-200 font-mono uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-2">
          <KeyRound className="w-4 h-4 text-indigo-400" />
          {language === 'ta' ? 'கீ-பாயிண்ட் (Key-Point) & மிட்பாயிண்ட் (Mid-Point) ஆய்வு' : 'Key-Point & Mid-Point Analysis'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Key-Point Box */}
          <div className="bg-slate-950/90 p-4 rounded-xl border border-indigo-500/30 space-y-2 font-sans">
            <span className="font-bold text-amber-300 font-serif flex items-center gap-1.5 text-sm">
              🔑 {language === 'ta' ? 'கீ-பாயிண்ட் (Key-Point - அறுவடை காலம்):' : 'Key-Point (Harvest Period):'}
            </span>
            <div className="space-y-1 text-slate-300 font-mono">
              <p>• {language === 'ta' ? `தசா நாதன்: ${report.activeDasaLordTa}` : `Dasa Lord: ${report.activeDasaLord}`}</p>
              <p>• {language === 'ta' ? `வீடு கொடுத்தவர்: ${report.dasaHouseLordTa}` : `House Lord: ${report.dasaHouseLord}`}</p>
              <p>• {language === 'ta' ? `சாரம் கொடுத்தவர்: ${report.dasaStarLordTa}` : `Star Lord: ${report.dasaStarLord}`}</p>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px] pt-1">
              {language === 'ta' ? report.keyPointHarvestTextTa : report.keyPointHarvestTextEn}
            </p>
          </div>

          {/* Mid-Point Box */}
          <div className="bg-slate-950/90 p-4 rounded-xl border border-purple-500/30 space-y-2 font-sans">
            <span className="font-bold text-purple-300 font-serif flex items-center gap-1.5 text-sm">
              🧭 {language === 'ta' ? 'மிட்பாயிண்ட் (Mid-Point - திருப்புமுனை):' : 'Mid-Point (Turning Point):'}
            </span>
            <div className="space-y-1 text-slate-300 font-mono">
              <p>• {language === 'ta' ? `புக்தி நாதன்: ${report.activeBhuktiLordTa}` : `Bhukti Lord: ${report.activeBhuktiLord}`}</p>
              <p>• {language === 'ta' ? `புக்தி வீடு: ${report.bhuktiHouseLordTa}` : `Bhukti House Lord: ${report.bhuktiHouseLord}`}</p>
              <p>• {language === 'ta' ? `புக்தி சாரம்: ${report.bhuktiStarLordTa}` : `Bhukti Star Lord: ${report.bhuktiStarLord}`}</p>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px] pt-1">
              {language === 'ta' ? report.midPointTurningTextTa : report.midPointTurningTextEn}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Event Timing Predictions Grid */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-2xl space-y-4">
        <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2 border-b border-slate-800 pb-3">
          <Compass className="w-5 h-5 text-amber-400" />
          {language === 'ta' ? 'நிகழ்வு காலக் கணிப்புகள் (Timing of Events)' : 'Timing of Events Predictions'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
          {/* Marriage Prediction Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-pink-500/40 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-pink-300 font-serif flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-400" />
                {language === 'ta' ? 'திருமண காலம் (Marriage Timing):' : 'Marriage Timing:'}
              </span>
              <span className="font-mono font-bold text-xs bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full border border-pink-500/40">
                {report.marriageProbabilityPercent}%
              </span>
            </div>
            <p className="text-slate-200 leading-relaxed pt-1">
              {language === 'ta' ? report.marriagePredictionTa : report.marriagePredictionEn}
            </p>
          </div>

          {/* Children Prediction Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-300 font-serif flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-amber-400" />
                {language === 'ta' ? 'குழந்தைப் பேறு காலம் (Children Timing):' : 'Children Timing:'}
              </span>
            </div>
            <p className="text-slate-200 leading-relaxed pt-1">
              {language === 'ta' ? report.childrenPredictionTa : report.childrenPredictionEn}
            </p>
          </div>

          {/* Planetary Aspect Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 space-y-2 sm:col-span-2">
            <span className="font-bold text-indigo-300 font-serif flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              {language === 'ta' ? 'கிரக பார்வைகள் & சிறப்பு பலன்கள் (Aspects):' : 'Planetary Aspects & Special Insights:'}
            </span>
            <div className="space-y-1.5 pt-1">
              {(language === 'ta' ? report.aspectPredictionsTa : report.aspectPredictionsEn).map((asp, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2 text-slate-200">
                  <span className="text-amber-400 text-xs mt-0.5">☞</span>
                  <span>{asp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
