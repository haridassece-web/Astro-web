import React, { useState } from 'react';
import type { DasaPeriod, StartingDasaInfo, PresentDasaInfo, Language } from '../types/astrology';
import { Clock, ChevronDown, ChevronRight, Sparkles, Calendar, Zap, Compass, Baby } from 'lucide-react';

interface DasaTimelineProps {
  dasaPeriods: DasaPeriod[];
  startingDasaInfo?: StartingDasaInfo;
  presentDasaInfo?: PresentDasaInfo;
  language: Language;
}

export const DasaTimeline: React.FC<DasaTimelineProps> = ({
  dasaPeriods,
  startingDasaInfo,
  presentDasaInfo,
  language,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'present' | 'starting' | 'future'>('all');
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(
    dasaPeriods.find((d) => d.isCurrent)?.planet || dasaPeriods[0]?.planet || null
  );

  const toggleExpand = (planet: string) => {
    setExpandedPlanet(expandedPlanet === planet ? null : planet);
  };

  const currentDasa = dasaPeriods.find((d) => d.isCurrent) || dasaPeriods[0];
  const startingDasa = dasaPeriods.find((d) => d.isStartingAtBirth) || dasaPeriods[0];

  const filteredPeriods = dasaPeriods.filter((d) => {
    if (filterMode === 'present') return d.isCurrent;
    if (filterMode === 'starting') return d.isStartingAtBirth;
    if (filterMode === 'future') return d.isFuture;
    return true;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            {language === 'ta'
              ? 'விம்சொத்தரி மகா தசா புக்தி கால அட்டவணை'
              : 'Vimshottari Dasa & Puthi (Bhukti) Timeline Engine'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'ta'
              ? 'பிறப்பு தசை, நடப்பு தசை புக்தி மற்றும் எதிர்கால தசா புக்தி காலங்களின் துல்லியமான கணிப்பு'
              : 'Comprehensive 120-Year Vedic Cycle tracking Birth, Present & Future Dasa-Puthi periods'}
          </p>
        </div>

        <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-bold whitespace-nowrap">
          120 Years Vimshottari
        </span>
      </div>

      {/* Hero Feature Cards: Starting Dasa Puthi & Present Dasa Puthi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Starting Dasa Puthi (Birth Dasa Puthi) Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20 flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5 text-indigo-400" />
                {language === 'ta' ? 'பிறப்பு தசா புக்தி இருப்பு' : 'Starting Dasa & Puthi At Birth'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Birth Epoch</span>
            </div>

            <div className="mt-2 space-y-1">
              <h4 className="text-base font-bold text-slate-100 font-serif flex items-center gap-2">
                <span className="text-amber-300">
                  {startingDasaInfo
                    ? `${startingDasaInfo.mahadasaTa} தசை`
                    : `${startingDasa.planetTa} தசை`}
                </span>
                <span className="text-slate-400 text-xs font-normal">→</span>
                <span className="text-indigo-300 font-bold">
                  {startingDasaInfo
                    ? `${startingDasaInfo.puthiTa} புக்தி`
                    : `${startingDasa.subDasas?.[0]?.planetTa || ''} புக்தி`}
                </span>
              </h4>

              {startingDasaInfo && (
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1 mt-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{language === 'ta' ? 'பிறப்பு தசா இருப்பு:' : 'Dasa Balance at Birth:'}</span>
                    <span className="font-bold text-amber-400 font-mono">
                      {startingDasaInfo.balanceYears} {language === 'ta' ? 'ஆண்டு' : 'Y'}, {startingDasaInfo.balanceMonths} {language === 'ta' ? 'மாதம்' : 'M'}, {startingDasaInfo.balanceDays} {language === 'ta' ? 'நாள்' : 'D'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{language === 'ta' ? 'மகா தசை காலம்:' : 'Mahadasa Span:'}</span>
                    <span>{startingDasaInfo.startDate} ~ {startingDasaInfo.endDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Present Dasa Puthi (Current Active) Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 shadow-lg shadow-amber-500/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-mono text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {language === 'ta' ? 'தற்போது நடப்பு தசா புக்தி' : 'Present Active Dasa & Puthi'}
              </span>
              {presentDasaInfo && (
                <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {presentDasaInfo.daysRemainingInPuthi} {language === 'ta' ? 'நாட்கள் பாக்கி' : 'Days Left'}
                </span>
              )}
            </div>

            <div className="mt-2 space-y-1">
              {presentDasaInfo ? (
                <div>
                  <h4 className="text-base font-bold text-slate-100 font-serif flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{presentDasaInfo.mahadasaTa} தசை</span>
                    <span className="text-slate-400 text-xs font-normal">→</span>
                    <span className="text-amber-300 font-bold">{presentDasaInfo.puthiTa} புக்தி</span>
                    {presentDasaInfo.pratyantaraTa && (
                      <>
                        <span className="text-slate-400 text-xs font-normal">→</span>
                        <span className="text-indigo-300 text-xs font-semibold">({presentDasaInfo.pratyantaraTa} அந்தரம்)</span>
                      </>
                    )}
                  </h4>

                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs space-y-2 mt-2">
                    <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                      <span>{presentDasaInfo.puthiStartDate} ~ {presentDasaInfo.puthiEndDate}</span>
                      <span className="text-amber-300 font-bold">{presentDasaInfo.progressPercent}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${presentDasaInfo.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-sm font-bold text-amber-300">{currentDasa.planetTa} மகா தசை</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setFilterMode('all')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            filterMode === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'அனைத்து மகா தசைகளும் (120 Years)' : 'All 120-Year Timeline'}</span>
        </button>

        <button
          onClick={() => setFilterMode('present')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            filterMode === 'present'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'நடப்பு தசா புக்தி (Present)' : 'Present Dasa Puthi'}</span>
        </button>

        <button
          onClick={() => setFilterMode('starting')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            filterMode === 'starting'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Baby className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'ஆரம்ப பிறப்பு தசை (Starting)' : 'Starting Dasa Puthi'}</span>
        </button>

        <button
          onClick={() => setFilterMode('future')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            filterMode === 'future'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'எதிர்கால தசா புக்தி (Future)' : 'Future Dasa Puthi'}</span>
        </button>
      </div>

      {/* Dasa Periods Accordion Listing */}
      <div className="space-y-2.5">
        {filteredPeriods.map((dasa) => {
          const isExpanded = expandedPlanet === dasa.planet;

          return (
            <div
              key={dasa.planet}
              className={`rounded-xl border transition-all overflow-hidden ${
                dasa.isCurrent
                  ? 'bg-slate-950 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : dasa.isStartingAtBirth
                  ? 'bg-slate-950 border-indigo-500/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleExpand(dasa.planet)}
                className="w-full p-3.5 flex items-center justify-between text-left outline-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                      dasa.isCurrent
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : dasa.isStartingAtBirth
                        ? 'bg-indigo-600 text-slate-100'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {language === 'ta' ? dasa.planetTa.slice(0, 3) : dasa.planet.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-100">
                        {language === 'ta' ? `${dasa.planetTa} மகா தசை` : `${dasa.planet} Mahadasa`}
                      </span>

                      {dasa.isCurrent && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                          {language === 'ta' ? 'நடப்பு தசை' : 'Current Active'}
                        </span>
                      )}

                      {dasa.isStartingAtBirth && (
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
                          {language === 'ta' ? 'ஆரம்ப தசை' : 'Starting Dasa'}
                        </span>
                      )}

                      {dasa.isFuture && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
                          {language === 'ta' ? 'எதிர்காலம்' : 'Future'}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {dasa.startDate} ~ {dasa.endDate} ({dasa.durationYears} {language === 'ta' ? 'ஆண்டுகள்' : 'Years'})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                    {dasa.subDasas?.length || 9} {language === 'ta' ? 'புக்திகள்' : 'Puthis'}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Sub-Dasas / Puthis Grid */}
              {isExpanded && dasa.subDasas && (
                <div className="bg-slate-900/90 border-t border-slate-800 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {dasa.subDasas.map((sub) => (
                    <div
                      key={sub.planet}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                        sub.isCurrent
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 font-semibold'
                          : sub.isStartingAtBirth
                          ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold flex items-center gap-1.5">
                          <span>{language === 'ta' ? `${sub.planetTa} புக்தி` : `${sub.planet} Puthi`}</span>
                        </span>

                        {sub.isCurrent && (
                          <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">
                            {language === 'ta' ? 'நடப்பு புக்தி' : 'Active Puthi'}
                          </span>
                        )}

                        {sub.isStartingAtBirth && !sub.isCurrent && (
                          <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded font-bold">
                            {language === 'ta' ? 'ஆரம்ப புக்தி' : 'Birth Puthi'}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-slate-400 font-mono">
                        {sub.startDate} to {sub.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
