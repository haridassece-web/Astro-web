import React, { useState } from 'react';
import type { DasaPeriod, Language } from '../types/astrology';
import { Clock, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

interface DasaTimelineProps {
  dasaPeriods: DasaPeriod[];
  language: Language;
}

export const DasaTimeline: React.FC<DasaTimelineProps> = ({ dasaPeriods, language }) => {
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(
    dasaPeriods.find((d) => d.isCurrent)?.planet || dasaPeriods[0]?.planet || null
  );

  const toggleExpand = (planet: string) => {
    setExpandedPlanet(expandedPlanet === planet ? null : planet);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          {language === 'ta' ? 'விம்சொத்தரி மகா தசை & அந்தரக் காலவரிசை' : 'Vimshottari Dasa & Bukthi Timeline'}
        </h3>
        <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          120 Years Planetary Cycle
        </span>
      </div>

      <div className="space-y-2.5">
        {dasaPeriods.map((dasa) => {
          const isExpanded = expandedPlanet === dasa.planet;

          return (
            <div
              key={dasa.planet}
              className={`rounded-xl border transition-all overflow-hidden ${
                dasa.isCurrent
                  ? 'bg-slate-950 border-amber-500/50 shadow-lg shadow-amber-500/10'
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
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {language === 'ta' ? dasa.planetTa.slice(0, 3) : dasa.planet.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-100">
                        {language === 'ta' ? `${dasa.planetTa} மகா தசை` : `${dasa.planet} Mahadasa`}
                      </span>
                      {dasa.isCurrent && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                          {language === 'ta' ? 'தற்போது நடப்பில் உள்ளது' : 'Current Active Dasa'}
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
                    9 {language === 'ta' ? 'அந்தரங்கள்' : 'Antardasas'}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {isExpanded && dasa.subDasas && (
                <div className="bg-slate-900/90 border-t border-slate-800 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {dasa.subDasas.map((sub) => (
                    <div
                      key={sub.planet}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                        sub.isCurrent
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">
                          {language === 'ta' ? `${sub.planetTa} புக்தி` : `${sub.planet} Antardasa`}
                        </span>
                        {sub.isCurrent && (
                          <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">
                            {language === 'ta' ? 'நடப்பு புக்தி' : 'Active'}
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
