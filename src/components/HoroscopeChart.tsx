import React from 'react';
import type { DivisionalChart, Language } from '../types/astrology';

interface HoroscopeChartProps {
  chart: DivisionalChart;
  format: 'south' | 'north';
  language: Language;
  compact?: boolean;
  theme?: 'dark' | 'light';
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

export const HoroscopeChart: React.FC<HoroscopeChartProps> = ({
  chart,
  format,
  language,
  compact = false,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

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
      <div
        className={`rounded-2xl shadow-sm transition-all ${
          isLight
            ? 'bg-white border-2 border-amber-600/40 text-slate-900'
            : 'bg-slate-950 border border-amber-500/30 shadow-2xl text-slate-100'
        } ${compact ? 'p-1.5' : 'p-3 md:p-4'}`}
      >
        {!compact && (
          <div className="text-center mb-3">
            <h3
              className={`text-base font-bold font-serif tracking-wide ${
                isLight ? 'text-amber-900' : 'text-amber-300'
              }`}
            >
              {language === 'ta' ? chart.titleTa : chart.titleEn}
            </h3>
            <span
              className={`text-[11px] font-mono ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {language === 'ta' ? 'தென்னிந்திய ராசி கட்ட அமைப்பு' : 'South Indian Style Chart'}
            </span>
          </div>
        )}

        <div
          className={`grid grid-cols-4 grid-rows-4 gap-1 rounded-xl border aspect-square mx-auto ${
            isLight
              ? 'bg-amber-50/40 border-amber-700/30'
              : 'bg-slate-900/80 border-slate-800'
          } ${compact ? 'p-1 max-w-[260px]' : 'p-1.5 max-w-md'}`}
        >
          {Array.from({ length: 16 }).map((_, idx) => {
            const row = Math.floor(idx / 4) + 1;
            const col = (idx % 4) + 1;

            if ((row === 2 || row === 3) && (col === 2 || col === 3)) {
              if (row === 2 && col === 2) {
                return (
                  <div
                    key={idx}
                    className={`col-span-2 row-span-2 rounded-xl border flex flex-col items-center justify-center p-2 text-center ${
                      isLight
                        ? 'bg-amber-100/70 border-amber-600/30 text-amber-950'
                        : 'bg-slate-950/90 border-amber-500/20'
                    }`}
                  >
                    <span
                      className={`text-sm font-serif font-bold ${
                        isLight ? 'text-amber-900' : 'text-amber-400'
                      }`}
                    >
                      {chart.id === 'D1'
                        ? language === 'ta'
                          ? 'இராசி (D1)'
                          : 'Rasi (D1)'
                        : chart.id === 'D9'
                        ? language === 'ta'
                          ? 'நவாம்சம் (D9)'
                          : 'Navamsa (D9)'
                        : chart.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono mt-0.5 ${
                        isLight ? 'text-amber-800 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {language === 'ta' ? 'அஸ்ட்ரோ அறிக்கை' : 'AstroEngine'}
                    </span>
                  </div>
                );
              }
              return null;
            }

            const signId = Number(
              Object.keys(southGridMap).find(
                (key) =>
                  southGridMap[Number(key)].row === row &&
                  southGridMap[Number(key)].col === col
              )
            );
            const house = getHouseForSign(signId);

            if (!house) {
              return (
                <div
                  key={idx}
                  className={`rounded-lg ${isLight ? 'bg-white/60' : 'bg-slate-950/50'}`}
                ></div>
              );
            }

            const isLagnaHouse = house.planets.some((p) => p.name === 'Lagna');
            const planetCount = house.planets.length;

            return (
              <div
                key={idx}
                className={`relative p-1 md:p-1.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-h-[60px] md:min-h-[75px] ${
                  isLight
                    ? isLagnaHouse
                      ? 'border-amber-600 bg-amber-50 shadow-sm'
                      : 'border-slate-300 bg-white hover:border-slate-400'
                    : isLagnaHouse
                    ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/10'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                {/* Header: Sign name & House number */}
                <div
                  className={`flex items-center justify-between border-b pb-0.5 mb-0.5 ${
                    isLight ? 'border-slate-200' : 'border-slate-800/60'
                  }`}
                >
                  <span
                    className={`text-[9.5px] md:text-[10px] font-bold truncate ${
                      isLight ? 'text-slate-800' : 'text-slate-300'
                    }`}
                  >
                    {language === 'ta' ? house.signNameTa : house.signNameEn.slice(0, 3)}
                  </span>
                  <span
                    className={`text-[8.5px] md:text-[9px] font-mono font-bold ${
                      isLight ? 'text-amber-800' : 'text-amber-400/90'
                    }`}
                  >
                    H{house.houseNum}
                  </span>
                </div>

                {/* Planets Grid: Multi-planet adaptive sizing */}
                <div className="flex flex-wrap gap-0.5 my-auto items-center">
                  {house.planets.map((p) => {
                    const shortName =
                      language === 'ta'
                        ? PLANET_SHORT_TA[p.name] || p.nameTa.slice(0, 2)
                        : PLANET_SHORT_EN[p.name] || p.name.slice(0, 2);
                    const degLabel =
                      p.signDegree !== undefined ? `${Math.floor(p.signDegree)}°` : '';
                    const textSize =
                      planetCount >= 5
                        ? 'text-[7.5px] px-0.5 py-0'
                        : planetCount >= 3
                        ? 'text-[8.5px] px-1 py-0.2'
                        : 'text-[9px] px-1.5 py-0.5';
                    const isRetro =
                      p.isRetrograde && p.name !== 'Lagna' && p.name !== 'Mandhi';

                    let planetColorStyle = '';
                    if (isLight) {
                      if (p.name === 'Lagna') {
                        planetColorStyle = 'bg-amber-600 text-white font-extrabold shadow-sm';
                      } else if (p.name === 'Mandhi') {
                        planetColorStyle = 'bg-purple-100 text-purple-900 border border-purple-300 font-extrabold';
                      } else if (p.dignityEn === 'Exalted') {
                        planetColorStyle = 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold';
                      } else if (p.dignityEn === 'Debilitated') {
                        planetColorStyle = 'bg-rose-100 text-rose-900 border border-rose-300 font-bold';
                      } else {
                        planetColorStyle = 'bg-blue-50 text-blue-950 border border-blue-200 font-bold';
                      }
                    } else {
                      if (p.name === 'Lagna') {
                        planetColorStyle = 'bg-amber-500 text-slate-950 font-black shadow-sm';
                      } else if (p.name === 'Mandhi') {
                        planetColorStyle = 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black';
                      } else if (p.dignityEn === 'Exalted') {
                        planetColorStyle = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                      } else if (p.dignityEn === 'Debilitated') {
                        planetColorStyle = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
                      } else {
                        planetColorStyle = 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30';
                      }
                    }

                    return (
                      <span
                        key={p.name}
                        title={`${language === 'ta' ? p.nameTa : p.name}${
                          isRetro ? (language === 'ta' ? ' (வக்ரம்)' : ' (Retrograde)') : ''
                        }: ${Math.floor(p.signDegree || 0)}° ${Math.floor(
                          ((p.signDegree || 0) % 1) * 60
                        )}'`}
                        className={`${textSize} rounded flex items-center gap-0.5 leading-tight ${planetColorStyle}`}
                      >
                        <span>{shortName}</span>
                        {isRetro && (
                          <span
                            className={`font-black text-[8px] px-0.5 rounded ${
                              isLight
                                ? 'bg-amber-200 text-amber-950 border border-amber-400'
                                : 'bg-amber-500/30 text-amber-300 border border-amber-400/40'
                            }`}
                          >
                            {language === 'ta' ? '(வ)' : '(R)'}
                          </span>
                        )}
                        {degLabel && (
                          <span
                            className={`text-[7.5px] font-mono ${
                              isLight ? 'opacity-90 text-slate-700' : 'opacity-80'
                            }`}
                          >
                            {degLabel}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Bar */}
        <div
          className={`mt-2 pt-1.5 border-t flex items-center justify-between text-[10px] font-mono px-1 ${
            isLight
              ? 'border-slate-200 text-slate-600'
              : 'border-slate-800/80 text-slate-400'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span
              className={`font-bold px-1 rounded text-[9px] ${
                isLight
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {language === 'ta' ? '(வ)' : '(R)'}
            </span>
            <span>{language === 'ta' ? '= கிரக வக்ரம்' : '= Retrograde'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className={`font-bold px-1 rounded text-[9px] ${
                isLight
                  ? 'bg-purple-100 text-purple-900 border border-purple-300'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}
            >
              {language === 'ta' ? 'மாந்' : 'Md'}
            </span>
            <span>{language === 'ta' ? '= மாந்தி (குளிகன்)' : '= Mandhi'}</span>
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

