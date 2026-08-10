import React from 'react';
import type { PlanetPosition, Language } from '../types/astrology';
import { Layers } from 'lucide-react';

interface PlanetaryTableProps {
  planets: PlanetPosition[];
  language: Language;
}

export const PlanetaryTable: React.FC<PlanetaryTableProps> = ({ planets, language }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          {language === 'ta' ? 'கிரக நிலைகள் & ஆட்சி நிலைகள் அட்டவணை' : 'Planetary Positions & Dignity Matrix'}
        </h3>
        <span className="text-xs text-slate-400 font-mono">Lahiri Sidereal Coordinates</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950 text-amber-400 border-b border-slate-800">
              <th className="p-2.5 font-bold">{language === 'ta' ? 'கிரகம்' : 'Planet'}</th>
              <th className="p-2.5 font-bold">{language === 'ta' ? 'பாகை (Long)' : 'Longitude'}</th>
              <th className="p-2.5 font-bold">{language === 'ta' ? 'ராசி' : 'Rasi / Sign'}</th>
              <th className="p-2.5 font-bold">{language === 'ta' ? 'பாவம்' : 'House'}</th>
              <th className="p-2.5 font-bold">{language === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra'}</th>
              <th className="p-2.5 font-bold">{language === 'ta' ? 'பாதம்' : 'Pada'}</th>
              <th className="p-2.5 font-bold">{language === 'ta' ? 'ஆட்சி நிலை' : 'Dignity'}</th>
              <th className="p-2.5 font-bold text-center">{language === 'ta' ? 'வக்கிரம்' : 'Retrograde'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {planets.map((p) => {
              const degInSign = p.signDegree;
              const degFormatted = `${Math.floor(degInSign)}° ${Math.floor((degInSign % 1) * 60)}'`;

              return (
                <tr
                  key={p.name}
                  className={`hover:bg-slate-950/70 transition-all ${
                    p.name === 'Lagna' ? 'bg-amber-500/10 font-semibold' : ''
                  }`}
                >
                  <td className="p-2.5 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        p.name === 'Lagna'
                          ? 'bg-amber-400 animate-ping'
                          : p.dignityEn === 'Exalted'
                          ? 'bg-emerald-400'
                          : p.dignityEn === 'Debilitated'
                          ? 'bg-rose-400'
                          : 'bg-indigo-400'
                      }`}
                    ></span>
                    <span className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{language === 'ta' ? p.nameTa : p.name}</span>
                      {p.isRetrograde && p.name !== 'Lagna' && p.name !== 'Mandhi' && (
                        <span
                          className="text-amber-300 font-bold text-[10px] bg-amber-500/25 px-1 py-0.2 rounded border border-amber-400/40"
                          title={language === 'ta' ? 'கிரக வக்ரம் (Graha Vakram / Retrograde)' : 'Graha Vakram (Retrograde)'}
                        >
                          {language === 'ta' ? '(வ)' : '(R)'}
                        </span>
                      )}
                    </span>
                  </td>

                  <td className="p-2.5 font-mono text-amber-300">{degFormatted}</td>

                  <td className="p-2.5 text-slate-200">
                    {language === 'ta' ? p.signNameTa : p.signNameEn}
                  </td>

                  <td className="p-2.5 font-mono font-bold text-indigo-300">H{p.house}</td>

                  <td className="p-2.5 text-slate-300">
                    {language === 'ta' ? p.nakshatraTa : p.nakshatraEn}
                  </td>

                  <td className="p-2.5 font-mono font-bold text-slate-400">{p.pada}</td>

                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.dignityEn === 'Exalted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : p.dignityEn === 'Own House'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : p.dignityEn === 'Debilitated'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {language === 'ta' ? p.dignityTa : p.dignityEn}
                    </span>
                  </td>

                  <td className="p-2.5 text-center font-mono font-bold">
                    {p.isRetrograde && p.name !== 'Lagna' && p.name !== 'Mandhi' ? (
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/40 inline-flex items-center gap-1 text-[11px]">
                        <span className="text-amber-400">↺</span>
                        <span>{language === 'ta' ? 'வக்ரம் (Vakram)' : 'Retrograde (R)'}</span>
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
