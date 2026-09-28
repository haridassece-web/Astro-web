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
