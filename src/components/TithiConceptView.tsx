import React, { useState } from 'react';
import type { TithiConceptReport, VadhaiVainasikamReport, Language } from '../types/astrology';
import {
  Moon,
  Clock,
  Coins,
  ShieldAlert,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface TithiConceptViewProps {
  tithiConcept?: TithiConceptReport;
  vadhaiVainasikam?: VadhaiVainasikamReport;
  language: Language;
}

export const TithiConceptView: React.FC<TithiConceptViewProps> = ({
  tithiConcept,
  vadhaiVainasikam,
  language,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'concept' | 'vadhai'>('concept');

  if (!tithiConcept || !vadhaiVainasikam) {
    return null;
  }

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* 1. Header Navigation Bar (Matches Mobile Screenshot) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-md flex items-center justify-around gap-1">
        <button
          onClick={() => setActiveSubTab('concept')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'concept'
              ? 'bg-indigo-600 text-white shadow-lg border border-indigo-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Moon className="w-4 h-4 text-amber-300" />
          <span>{language === 'ta' ? 'திதி கான்செப்ட்' : 'Tithi Concept'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('vadhai')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'vadhai'
              ? 'bg-rose-900/80 text-rose-200 shadow-lg border border-rose-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{language === 'ta' ? 'வதை-வைநாசிகம்' : 'Vadhai-Vainasikam'}</span>
        </button>
      </div>

      {/* 2. Sub-tab 1: Tithi Concept (திதி கான்செப்ட்) */}
      {activeSubTab === 'concept' && (
        <div className="space-y-4">
          {/* Card 1: Tithi Basic Info & Virayathipathi */}
          <div className="bg-slate-900/95 border border-indigo-500/30 rounded-2xl p-4 md:p-5 shadow-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">
                  {language === 'ta' ? 'திதி:' : 'Tithi:'}
                </span>
                <span className="font-bold text-amber-300 font-serif">
                  {language === 'ta' ? tithiConcept.tithiNameTa : tithiConcept.tithiNameEn} ({tithiConcept.tithiNumber})
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">
                  {language === 'ta' ? 'திதி இருப்பு:' : 'Tithi Balance:'}
                </span>
                <span className="font-mono font-bold text-indigo-300">
                  {tithiConcept.tithiBalanceDegStr}
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">
                  {language === 'ta' ? 'விரயாதிபதி:' : '12th Lord (Virayathipathi):'}
                </span>
                <span className="font-bold text-emerald-300">
                  {language === 'ta' ? tithiConcept.virayathipathiPlanetTa : tithiConcept.virayathipathiPlanet}
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">
                  {language === 'ta' ? 'விரயாதிபதி கொடுப்பது:' : 'Grants:'}
                </span>
                <div className="text-right">
                  <span className="font-bold text-amber-400 block">
                    {tithiConcept.virayathipathiGives.typeTa}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ( உயிர்: {tithiConcept.virayathipathiGives.uyirPercent}%, பொருள்: {tithiConcept.virayathipathiGives.porulPercent}% )
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* New Card: Handwritten Tithi Timeline & Symmetry Diagram */}
          {tithiConcept.tithiAgeTimeline && (() => {
            const tm = tithiConcept.tithiAgeTimeline;
            const getPct = (val: number) => Math.min(100, Math.max(0, (val / 15.0) * 100));

            const primaryPct = getPct(tm.tithiNumber);
            const mirrorPct = getPct(tm.mirrorTithiNumber);
            const centerPct = getPct(7.5);

            const startPct = Math.min(primaryPct, mirrorPct);
            const endPct = Math.max(primaryPct, mirrorPct);

            return (
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-950 border border-indigo-500/40 rounded-2xl p-4 md:p-6 shadow-2xl space-y-5">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                      {language === 'ta' ? 'திதிகள் சமச்சீர் வயதுக் கோட்டு வரைபடம்' : 'Tithi Lifespan & Symmetry Timeline Diagram'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {language === 'ta' ? 'ஏட்டுச்சுவடி விதி: 1 திதி = 4 ஆண்டுகள் (15 திதி = 60 ஆண்டுகள், மையம் = 7.5 திதி / 30 வயது)' : 'Manuscript Formula: 1 Tithi = 4 Years (15 Tithis = 60 Years, Center = 7.5 Tithi / 30 Yrs)'}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                    {language === 'ta' ? `திதி #${tm.tithiNumber}` : `Tithi #${tm.tithiNumber}`}
                  </span>
                </div>

                {/* Main Visual Number Line & Arc SVG */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-4">
                  {/* Upper Tier Polarity Banner */}
                  <div className="flex justify-between items-center text-xs font-mono font-bold gap-2">
                    <div className="flex-1 flex items-center justify-between text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                      <span>0.01 – 7.5 (0-30 வயது):</span>
                      <span className="text-base font-black px-2 py-0.5 bg-emerald-500/20 rounded">{tm.upperPolarityFirstHalf}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between text-rose-400 bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-500/30">
                      <span>7.5 – 15 (30-60 வயது):</span>
                      <span className="text-base font-black px-2 py-0.5 bg-rose-500/20 rounded">{tm.upperPolaritySecondHalf}</span>
                    </div>
                  </div>

                  {/* SVG Arc & Axis */}
                  <div className="relative pt-6 pb-2">
                    <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                      <defs>
                        <linearGradient id="tithiArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="50%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>

                      {/* Main axis line */}
                      <line x1="0" y1="40" x2="100" y2="40" stroke="#475569" strokeWidth="2" strokeDasharray="2 2" />

                      {/* End ticks 0.01 and 15 */}
                      <line x1="0" y1="32" x2="0" y2="48" stroke="#94a3b8" strokeWidth="2.5" />
                      <line x1="100" y1="32" x2="100" y2="48" stroke="#94a3b8" strokeWidth="2.5" />

                      {/* Midpoint tick 7.5 */}
                      <line x1="50" y1="28" x2="50" y2="48" stroke="#818cf8" strokeWidth="3" />

                      {/* Symmetric Arc */}
                      {startPct !== endPct && (
                        <path
                          d={`M ${startPct} 40 Q ${centerPct} 5, ${endPct} 40`}
                          fill="none"
                          stroke="url(#tithiArcGradient)"
                          strokeWidth="3"
                          strokeDasharray="3 2"
                        />
                      )}

                      {/* Birth Tithi Circle */}
                      <circle cx={primaryPct} cy="40" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                      {/* Mirror Tithi Circle */}
                      {tm.tithiNumber !== tm.mirrorTithiNumber && (
                        <circle cx={mirrorPct} cy="40" r="5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                      )}
                    </svg>

                    {/* Scale Labels */}
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold -mt-2 px-0.5">
                      <span>0.01 (0 வயது)</span>
                      <span className="text-indigo-300 font-black">7.5 மையம் (30 வயது)</span>
                      <span>15 (60 வயது)</span>
                    </div>

                    {/* Interactive Marker Badges */}
                    <div className="mt-4 flex flex-wrap items-center justify-around gap-2 text-xs font-mono">
                      <div className="bg-amber-500/20 text-amber-200 border border-amber-500/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span>
                          {language === 'ta' ? `பிறப்பு திதி #${tm.tithiNumber}` : `Birth Tithi #${tm.tithiNumber}`}:{' '}
                          <strong className="text-amber-300">{tm.primaryAgeStart}-{tm.primaryAgeEnd} வயது</strong>
                        </span>
                      </div>

                      {tm.tithiNumber !== tm.mirrorTithiNumber && (
                        <div className="bg-pink-500/20 text-pink-200 border border-pink-500/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
                          <span>
                            {language === 'ta' ? `எதிர் சமச்சீர் திதி #${tm.mirrorTithiNumber}` : `Mirror Tithi #${tm.mirrorTithiNumber}`}:{' '}
                            <strong className="text-pink-300">{tm.mirrorAgeStart}-{tm.mirrorAgeEnd} வயது</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lower Tier Polarity Banner */}
                  <div className="flex justify-between items-center text-xs font-mono font-bold gap-2 pt-1">
                    <div className="flex-1 flex items-center justify-between text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      <span>0.01 – 7.5:</span>
                      <span className="text-sm font-black text-rose-400 px-2 bg-slate-950 rounded">{tm.lowerPolarityFirstHalf}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      <span>7.5 – 15:</span>
                      <span className="text-sm font-black text-emerald-400 px-2 bg-slate-950 rounded">{tm.lowerPolaritySecondHalf}</span>
                    </div>
                  </div>
                </div>

                {/* Formulas & Notes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <span>📌</span> {language === 'ta' ? 'பிறந்த திதி வயது:' : 'Primary Tithi Age:'}
                    </span>
                    <p className="text-slate-200 text-sm font-bold pt-0.5">
                      {tm.tithiNumber} × 4 = <span className="text-amber-300">{tm.primaryAgeStart} வயது</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      ({tm.primaryAgeStart} முதல் {tm.primaryAgeEnd} வயது வரை)
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                    <span className="text-pink-400 font-bold flex items-center gap-1">
                      <span>🔄</span> {language === 'ta' ? 'சமச்சீர் திதி வயது:' : 'Symmetric Mirror Age:'}
                    </span>
                    <p className="text-slate-200 text-sm font-bold pt-0.5">
                      {tm.mirrorTithiNumber} × 4 = <span className="text-pink-300">{tm.mirrorAgeStart} வயது</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      ({tm.mirrorAgeStart} முதல் {tm.mirrorAgeEnd} வயது வரை)
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                    <span className="text-indigo-400 font-bold flex items-center gap-1">
                      <span>📏</span> {language === 'ta' ? '7.5 மைய இடைவெளி:' : 'Center Distance:'}
                    </span>
                    <p className="text-slate-200 font-bold pt-0.5">
                      |7.5 - {tm.tithiNumber}| = <span className="text-indigo-300">{tm.deltaTithi} திதி</span> ({tm.deltaYears} ஆண்டுகள்)
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span>🌐</span> {language === 'ta' ? 'மொத்த வில் அளவு (Span):' : 'Total Arc Span:'}
                    </span>
                    <p className="text-slate-200 font-bold pt-0.5">
                      {tm.deltaTithi} × 2 = <span className="text-emerald-300">{tm.totalSpanTithis} திதி</span> ({tm.totalSpanYears} ஆண்டுகள்)
                    </p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs text-amber-200 leading-relaxed font-serif">
                  <span className="font-bold text-amber-300 block mb-1">📜 சுவடி விளக்கவுரை (Manuscript Commentary):</span>
                  {language === 'ta' ? tm.explanationTa : tm.explanationEn}
                </div>
              </div>
            );
          })()}

          {/* New Card: Tithi Concept Predictions (திதி கான்செப்ட் விரிவான பலன்கள்) */}
          {tithiConcept.tithiPredictions && (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-amber-500/40 rounded-2xl p-4 md:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                  <span className="text-lg">🔮</span>
                  {language === 'ta' ? 'திதி கான்செப்ட் சிறப்பு ஜோதிட பலன்கள்' : 'Tithi Concept Detailed Astrological Predictions'}
                </h3>
                <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-300 px-3 py-1 rounded-lg border border-amber-500/30">
                  {language === 'ta' ? tithiConcept.tithiNameTa : tithiConcept.tithiNameEn} ({tithiConcept.tithiNumber})
                </span>
              </div>

              {/* Grid of Predictions */}
              <div className="space-y-3 text-xs md:text-sm">
                {/* 1. General Tithi Life Prediction */}
                <div className="bg-slate-950/80 border border-indigo-500/30 p-3.5 rounded-xl space-y-1">
                  <h4 className="font-bold text-amber-300 font-serif flex items-center gap-1.5">
                    <span>🌟</span>
                    {language === 'ta' ? 'பிறந்த திதி பொதுப் பலன்:' : 'Birth Tithi General Life Prediction:'}
                  </h4>
                  <p className="text-slate-200 leading-relaxed pl-5 font-serif">
                    {language === 'ta'
                      ? tithiConcept.tithiPredictions.generalPredictionTa
                      : tithiConcept.tithiPredictions.generalPredictionEn}
                  </p>
                </div>

                {/* 2. Karma Start Age Prediction */}
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <h4 className="font-bold text-indigo-300 font-mono flex items-center gap-1.5">
                    <span>⏳</span>
                    {language === 'ta' ? 'கர்மா இயக்க வயது பலன்:' : 'Karma Activation Milestone:'}
                  </h4>
                  <p className="text-slate-300 leading-relaxed pl-5 font-sans">
                    {language === 'ta'
                      ? tithiConcept.tithiPredictions.karmaAgePredictionTa
                      : tithiConcept.tithiPredictions.karmaAgePredictionEn}
                  </p>
                </div>

                {/* 3. Virayathipathi Prediction */}
                <div className="bg-slate-950/80 border border-emerald-500/30 p-3.5 rounded-xl space-y-1">
                  <h4 className="font-bold text-emerald-300 font-serif flex items-center gap-1.5">
                    <span>💰</span>
                    {language === 'ta' ? 'விரயாதிபதி (12-ம் அதிபதி) நிதிப் பலன்:' : '12th Lord Financial & Vitality Grant:'}
                  </h4>
                  <p className="text-slate-200 leading-relaxed pl-5 font-sans">
                    {language === 'ta'
                      ? tithiConcept.tithiPredictions.virayathipathiPredictionTa
                      : tithiConcept.tithiPredictions.virayathipathiPredictionEn}
                  </p>
                </div>

                {/* 4. Polarity Phase Prediction */}
                <div className="bg-slate-950/80 border border-pink-500/30 p-3.5 rounded-xl space-y-1">
                  <h4 className="font-bold text-pink-300 font-serif flex items-center gap-1.5">
                    <span>🔄</span>
                    {language === 'ta' ? 'திதி பருவ சுழற்சி & 30 வயது திருப்புமுனை:' : 'Tithi Polarity & Age 30 Turning Point:'}
                  </h4>
                  <p className="text-slate-200 leading-relaxed pl-5 font-sans">
                    {language === 'ta'
                      ? tithiConcept.tithiPredictions.polarityPhasePredictionTa
                      : tithiConcept.tithiPredictions.polarityPhasePredictionEn}
                  </p>
                </div>

                {/* 5. Key Deity & Special Remedy */}
                <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-indigo-950/40 border border-amber-500/40 p-4 rounded-xl space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-amber-300 font-serif flex items-center gap-1.5 text-xs">
                      <span>🛕</span>
                      {language === 'ta' ? 'திதி அதிதேவதை:' : 'Key Tithi Deity:'}
                    </span>
                    <span className="font-bold text-white bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-500/40 text-xs">
                      {language === 'ta'
                        ? tithiConcept.tithiPredictions.keyDeityTa
                        : tithiConcept.tithiPredictions.keyDeityEn}
                    </span>
                  </div>

                  <div className="border-t border-slate-800 pt-2 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-emerald-300 flex items-center gap-1">
                      <span>✨</span>
                      {language === 'ta' ? 'சுவடிப் பரிகார வழிபாடுகள்:' : 'Sacred Manuscript Remedy:'}
                    </span>
                    <p className="pl-4 text-emerald-200">
                      {language === 'ta'
                        ? tithiConcept.tithiPredictions.specialRemedyTa
                        : tithiConcept.tithiPredictions.specialRemedyEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Karma Age Calculation */}
          <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-2xl p-4 md:p-5 shadow-xl space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs md:text-sm font-bold text-indigo-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                {language === 'ta' ? 'கர்மா வேலை செய்யத் துவங்கும் வயது' : 'Karma Operation Start Age'}
              </span>
              <span className="text-xs md:text-sm font-bold font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                {tithiConcept.karmaStartAgeYears} வருடம், {tithiConcept.karmaStartAgeMonths} மாதம், {tithiConcept.karmaStartAgeDays} நாள்
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">
                {language === 'ta' ? 'தற்போதைய வயது:' : 'Current Age:'}
              </span>
              <span className="text-xs font-mono text-slate-200 font-semibold">
                {tithiConcept.currentAgeYears} வருடம், {tithiConcept.currentAgeMonths} மாதம், {tithiConcept.currentAgeDays} நாள்
              </span>
            </div>
          </div>

          {/* Card 3: Wealth Timeline (செல்வ நிலை - Reference Mobile Design) */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-2xl backdrop-blur-md">
            <h3 className="text-base font-bold text-indigo-300 font-serif mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Coins className="w-5 h-5 text-amber-400" />
              {language === 'ta' ? 'செல்வ நிலை (வயது வாரியான நிதி நிலவரம்)' : 'Financial Wealth Timeline by Age'}
            </h3>

            <div className="space-y-3">
              {tithiConcept.timelineItems.map((item, index) => {
                const isPositive = item.statusIcon === '++' || item.statusIcon === '+';
                const isHighlight = item.statusIcon === '++';

                return (
                  <div
                    key={index}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isHighlight
                        ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg'
                        : isPositive
                        ? 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/30'
                        : 'bg-slate-950/80 border-slate-800 hover:border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs md:text-sm font-bold text-slate-100">
                        {language === 'ta' ? item.ageTitleTa : item.ageTitleEn}
                      </span>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                            item.statusIcon === '++'
                              ? 'bg-emerald-500 text-slate-950'
                              : item.statusIcon === '+'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : item.statusIcon === '-'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {item.statusIcon}
                        </span>
                      </div>
                    </div>

                    {item.notesTa.length > 0 && (
                      <div className="space-y-1 text-xs text-slate-300 pl-1 border-l-2 border-slate-700 mt-2">
                        {(language === 'ta' ? item.notesTa : item.notesEn).map((note, nIdx) => (
                          <p key={nIdx} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-amber-400 shrink-0">☞</span>
                            <span>{note}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Sub-tab 2: Vadhai-Vainasikam (வதை-வைநாசிகம்) */}
      {activeSubTab === 'vadhai' && (
        <div className="space-y-4">
          <div className="bg-slate-900/95 border border-rose-500/30 rounded-2xl p-4 md:p-5 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-rose-300 font-serif flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                {language === 'ta' ? 'வதை & வைநாசிக நட்சத்திர ஆய்வுகள்' : 'Vadhai & Vainasikam Star Analysis'}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                7-வது வதை • 22-வது வைநாசிகம்
              </span>
            </div>

            {/* Stars Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Vadhai Stars (7, 16, 25) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wide flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'ta' ? '7-வது வதை தாரை நட்சத்திரங்கள்:' : '7th Vadhai Tara Stars:'}
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {vadhaiVainasikam.vadhaiStars.map((s) => (
                    <span
                      key={s.id}
                      className="bg-amber-500/10 text-amber-200 border border-amber-500/30 text-xs px-2.5 py-1 rounded-lg font-bold"
                    >
                      {language === 'ta' ? s.nameTa : s.nameEn}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vainasikam Stars (4, 13, 22) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'ta' ? '22-வது வைநாசிக தாரை நட்சத்திரங்கள்:' : '22nd Vainasikam Tara Stars:'}
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {vadhaiVainasikam.vainasikamStars.map((s) => (
                    <span
                      key={s.id}
                      className="bg-rose-500/10 text-rose-200 border border-rose-500/30 text-xs px-2.5 py-1 rounded-lg font-bold"
                    >
                      {language === 'ta' ? s.nameTa : s.nameEn}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 88th Pada Point Highlight */}
            <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-950 border border-rose-500/40 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block font-bold">
                  88-வது பாதகப் புள்ளி (88th Pada Sensitive Point)
                </span>
                <p className="text-sm font-bold text-amber-200 font-serif mt-0.5">
                  {language === 'ta'
                    ? `${vadhaiVainasikam.marakaPada88StarNameTa} ${vadhaiVainasikam.marakaPada88Pada}-ஆம் பாதம்`
                    : `${vadhaiVainasikam.marakaPada88StarNameEn} Pada ${vadhaiVainasikam.marakaPada88Pada}`}
                </p>
              </div>
              <span className="text-xs text-slate-300 max-w-md">
                {language === 'ta'
                  ? 'இந்த நட்சத்திர பாதத்தில் கிரக சஞ்சாரம் அல்லது திசா புக்தி நடக்கும் போது அதிக கவனம் தேவை.'
                  : 'Requires special spiritual remedial prayers during planetary transits.'}
              </span>
            </div>

            {/* Manuscript Warnings List */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase font-mono">
                {language === 'ta' ? 'ஏட்டுச் சுவடி எச்சரிக்கைகள்:' : 'Manuscript Declarations:'}
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                {(language === 'ta'
                  ? vadhaiVainasikam.activeWarningsTa
                  : vadhaiVainasikam.activeWarningsEn
                ).map((warn, wIdx) => (
                  <div
                    key={wIdx}
                    className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800"
                  >
                    <span className="text-rose-400 text-xs mt-0.5">⚠️</span>
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remedial Solutions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-emerald-300 uppercase font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'ta' ? 'சுவடி பரிகாரங்கள்:' : 'Remedial Actions:'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(language === 'ta'
                  ? vadhaiVainasikam.remediesTa
                  : vadhaiVainasikam.remediesEn
                ).map((rem, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                    <span className="text-emerald-400">✓</span>
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
