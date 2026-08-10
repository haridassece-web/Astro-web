import React from 'react';
import type { DivisionalChart, Language } from '../types/astrology';

interface HoroscopeChartProps {
  chart: DivisionalChart;
  format: 'south' | 'north';
  language: Language;
  compact?: boolean;
}

const PLANET_SHORT_TA: Record<string, string> = {
  Lagna: 'லக்',
  Sun: 'சூரி',
  Moon: 'சந்',
  Mars: 'செவ்',
  Mercury: 'புத',
  Jupiter: 'குரு',
  Venus: 'சுக்',
  Saturn: 'சனி',
  Rahu: 'ரா',
  Ketu: 'கே',
  Mandhi: 'மாந்',
};

const PLANET_SHORT_EN: Record<string, string> = {
  Lagna: 'Lg',
  Sun: 'Su',
  Moon: 'Mo',
  Mars: 'Ma',
  Mercury: 'Me',
  Jupiter: 'Ju',
  Venus: 'Ve',
  Saturn: 'Sa',
  Rahu: 'Ra',
  Ketu: 'Ke',
  Mandhi: 'Md',
};

export const HoroscopeChart: React.FC<HoroscopeChartProps> = ({ chart, format, language, compact = false }) => {
  const southGridMap: Record<number, { row: number; col: number }> = {
    11: { row: 1, col: 1 },
    0: { row: 1, col: 2 },
    1: { row: 1, col: 3 },
    2: { row: 1, col: 4 },
    3: { row: 2, col: 4 },
    4: { row: 3, col: 4 },
    5: { row: 4, col: 4 },
    6: { row: 4, col: 3 },
    7: { row: 4, col: 2 },
    8: { row: 4, col: 1 },
    9: { row: 3, col: 1 },
    10: { row: 2, col: 1 },
  };

  const getHouseForSign = (signId: number) => {
    return chart.houses.find((h) => h.signId === signId);
  };

  if (format === 'south') {
    return (
      <div className={`bg-slate-950 rounded-2xl border border-amber-500/30 shadow-2xl ${compact ? 'p-2' : 'p-3 md:p-4'}`}>
        {!compact && (
          <div className="text-center mb-3">
            <h3 className="text-base font-bold text-amber-300 font-serif tracking-wide">
              {language === 'ta' ? chart.titleTa : chart.titleEn}
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              {language === 'ta' ? 'தென்னிந்திய ராசி கட்ட அமைப்பு' : 'South Indian Style Chart'}
            </span>
          </div>
        )}

        <div className={`grid grid-cols-4 grid-rows-4 gap-1 bg-slate-900/80 rounded-xl border border-slate-800 aspect-square mx-auto ${compact ? 'p-1 max-w-[260px]' : 'p-1.5 max-w-md'}`}>
          {Array.from({ length: 16 }).map((_, idx) => {
            const row = Math.floor(idx / 4) + 1;
            const col = (idx % 4) + 1;

            if ((row === 2 || row === 3) && (col === 2 || col === 3)) {
              if (row === 2 && col === 2) {
                return (
                  <div
                    key={idx}
                    className="col-span-2 row-span-2 bg-slate-950/90 rounded-xl border border-amber-500/20 flex flex-col items-center justify-center p-2 text-center"
                  >
                    <span className="text-sm font-serif font-bold text-amber-400">
                      {chart.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {language === 'ta' ? 'அஸ்ட்ரோ எஞ்சின்' : 'AstroEngine Pro'}
                    </span>
                  </div>
                );
              }
              return null;
            }

            const signId = Number(
              Object.keys(southGridMap).find(
                (key) => southGridMap[Number(key)].row === row && southGridMap[Number(key)].col === col
              )
            );
            const house = getHouseForSign(signId);

            if (!house) return <div key={idx} className="bg-slate-950/50 rounded-lg"></div>;

            const isLagnaHouse = house.planets.some((p) => p.name === 'Lagna');
            const planetCount = house.planets.length;

            return (
              <div
                key={idx}
                className={`relative bg-slate-950 p-1 md:p-1.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-h-[60px] md:min-h-[75px] ${
                  isLagnaHouse ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header: Sign name & House number */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-0.5 mb-0.5">
                  <span className="text-[9.5px] md:text-[10px] font-bold text-slate-300 truncate">
                    {language === 'ta' ? house.signNameTa : house.signNameEn.slice(0, 3)}
                  </span>
                  <span className="text-[8.5px] md:text-[9px] font-mono text-amber-400/90 font-bold">H{house.houseNum}</span>
                </div>

                {/* Planets Grid: Multi-planet adaptive sizing */}
                <div className="flex flex-wrap gap-0.5 my-auto items-center">
                  {house.planets.map((p) => {
                    const shortName = language === 'ta' ? PLANET_SHORT_TA[p.name] || p.nameTa.slice(0, 2) : PLANET_SHORT_EN[p.name] || p.name.slice(0, 2);
                    const degLabel = p.signDegree !== undefined ? `${Math.floor(p.signDegree)}°` : '';
                    const textSize = planetCount >= 5 ? 'text-[7.5px] px-0.5 py-0' : planetCount >= 3 ? 'text-[8.5px] px-1 py-0.2' : 'text-[9px] px-1.5 py-0.5';
                    const isRetro = p.isRetrograde && p.name !== 'Lagna' && p.name !== 'Mandhi';

                    return (
                      <span
                        key={p.name}
                        title={`${language === 'ta' ? p.nameTa : p.name}${isRetro ? (language === 'ta' ? ' (வக்ரம்)' : ' (Retrograde)') : ''}: ${Math.floor(p.signDegree || 0)}° ${Math.floor(((p.signDegree || 0) % 1) * 60)}'`}
                        className={`${textSize} font-bold rounded flex items-center gap-0.5 leading-tight ${
                          p.name === 'Lagna'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                            : p.name === 'Mandhi'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black'
                            : p.dignityEn === 'Exalted'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : p.dignityEn === 'Debilitated'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30'
                        }`}
                      >
                        <span>{shortName}</span>
                        {isRetro && (
                          <span className="text-amber-300 font-black text-[8px] bg-amber-500/30 px-0.5 rounded border border-amber-400/40">
                            {language === 'ta' ? '(வ)' : '(R)'}
                          </span>
                        )}
                        {degLabel && <span className="opacity-80 text-[7.5px] font-mono">{degLabel}</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Bar */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-300 font-bold px-1 rounded bg-amber-500/20 border border-amber-500/40 text-[9px]">
              {language === 'ta' ? '(வ)' : '(R)'}
            </span>
            <span>{language === 'ta' ? '= கிரக வக்ரம் (Graha Vakram)' : '= Retrograde Planet'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-purple-300 font-bold px-1 rounded bg-purple-500/20 border border-purple-500/30 text-[9px]">
              {language === 'ta' ? 'மாந்' : 'Md'}
            </span>
            <span>{language === 'ta' ? '= மாந்தி (Gulika)' : '= Mandhi / Gulika'}</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 shadow-2xl">
      <div className="text-center mb-3">
        <h3 className="text-base font-bold text-amber-300 font-serif tracking-wide">
          {language === 'ta' ? chart.titleTa : chart.titleEn}
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">
          {language === 'ta' ? 'வடஇந்திய வைரம் வடிவ அமைப்பு' : 'North Indian Diamond Style Chart'}
        </span>
      </div>

      <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-900 rounded-xl border border-slate-800 p-2 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full text-slate-700">
          <rect x="10" y="10" width="380" height="380" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="1.5" />
          <line x1="390" y1="10" x2="10" y2="390" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="absolute inset-0 p-4 grid grid-cols-3 grid-rows-3 text-center text-xs">
          {chart.houses.map((house) => (
            <div key={house.houseNum} className="flex flex-col items-center justify-center p-1">
              <span className="text-[10px] text-amber-400 font-mono font-bold">H{house.houseNum}</span>
              <div className="flex flex-wrap justify-center gap-0.5 mt-0.5">
                {house.planets.map((p) => {
                  const shortName = language === 'ta' ? PLANET_SHORT_TA[p.name] || p.nameTa.slice(0, 2) : PLANET_SHORT_EN[p.name] || p.name.slice(0, 2);
                  const degLabel = p.signDegree !== undefined ? `${Math.floor(p.signDegree)}°` : '';
                  const isRetro = p.isRetrograde && p.name !== 'Lagna' && p.name !== 'Mandhi';

                  return (
                    <span key={p.name} className="text-[8.5px] bg-indigo-900/80 text-amber-200 px-1 py-0.5 rounded font-bold flex items-center gap-0.5">
                      <span>{shortName}</span>
                      {isRetro && (
                        <span className="text-amber-300 font-black text-[7.5px]">
                          {language === 'ta' ? '(வ)' : '(R)'}
                        </span>
                      )}
                      {degLabel && <span className="text-[7.5px] opacity-80 font-mono">{degLabel}</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend Bar */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
        <span className="flex items-center gap-1.5">
          <span className="text-amber-300 font-bold px-1 rounded bg-amber-500/20 border border-amber-500/40 text-[9px]">
            {language === 'ta' ? '(வ)' : '(R)'}
          </span>
          <span>{language === 'ta' ? '= கிரக வக்ரம் (Graha Vakram)' : '= Retrograde Planet'}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-purple-300 font-bold px-1 rounded bg-purple-500/20 border border-purple-500/30 text-[9px]">
            {language === 'ta' ? 'மாந்' : 'Md'}
          </span>
          <span>{language === 'ta' ? '= மாந்தி (Gulika)' : '= Mandhi / Gulika'}</span>
        </span>
      </div>
    </div>
  );
};

