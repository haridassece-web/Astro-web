import React, { useState } from 'react';
import type { AshtakavargaReport, Language, PlanetPosition } from '../types/astrology';
import { RASI_INFO } from '../engine/ashtakavargaEngine';
import { Sparkles, Calculator, Layers, Award, CheckCircle2, ChevronRight, Hash } from 'lucide-react';

interface AshtakavargaViewProps {
  ashtakavarga: AshtakavargaReport;
  planets: PlanetPosition[];
  language: Language;
  chartFormat?: 'south' | 'north';
}

const southGridMap: Record<number, { row: number; col: number }> = {
  11: { row: 1, col: 1 }, // Pisces
  0: { row: 1, col: 2 },  // Aries
  1: { row: 1, col: 3 },  // Taurus
  2: { row: 1, col: 4 },  // Gemini
  3: { row: 2, col: 4 },  // Cancer
  4: { row: 3, col: 4 },  // Leo
  5: { row: 4, col: 4 },  // Virgo
  6: { row: 4, col: 3 },  // Libra
  7: { row: 4, col: 2 },  // Scorpio
  8: { row: 4, col: 1 },  // Sagittarius
  9: { row: 3, col: 1 },  // Capricorn
  10: { row: 2, col: 1 }, // Aquarius
};

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

export const AshtakavargaView: React.FC<AshtakavargaViewProps> = ({
  ashtakavarga,
  planets,
  language,
}) => {
  const planetList = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const [selectedPlanet, setSelectedPlanet] = useState<string>('Mars'); // Defaults to Mars as on whiteboard

  const currentData = ashtakavarga.planetsData[selectedPlanet] || ashtakavarga.planetsData['Mars'];

  // Helper to render South Indian Chart Grid
  const renderSouthGrid = (bindus: number[], titleTa: string, titleEn: string, totalCount: number) => {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800 px-1">
          <span className="text-xs font-bold font-serif text-amber-300">
            {language === 'ta' ? titleTa : titleEn}
          </span>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {language === 'ta' ? `மொத்தம்: ${totalCount}` : `Total: ${totalCount}`}
          </span>
        </div>

        <div className="w-full max-w-[280px] aspect-square grid grid-cols-4 grid-rows-4 gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl relative">
          {/* 12 Rasi Boxes */}
          {Array.from({ length: 12 }, (_, signIdx) => {
            const pos = southGridMap[signIdx];
            const info = RASI_INFO[signIdx];
            const val = bindus[signIdx] ?? 0;
            const planetsInSign = planets.filter((p) => p.signId === signIdx && planetList.includes(p.name));

            return (
              <div
                key={signIdx}
                style={{ gridRow: pos.row, gridColumn: pos.col }}
                className="bg-slate-950 border border-slate-800/80 rounded-lg p-1 flex flex-col justify-between items-center relative overflow-hidden transition-all hover:border-amber-500/50"
              >
                <div className="w-full flex justify-between items-center text-[9px] text-slate-400 font-medium px-0.5">
                  <span className="truncate">{language === 'ta' ? info.ta : info.en}</span>
                </div>
                <div className="text-base font-bold font-mono text-amber-300">
                  {val}
                </div>
                {planetsInSign.length > 0 && (
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {planetsInSign.map((p) => (
                      <span key={p.name} className="text-[8px] font-bold text-slate-300 bg-slate-800 px-1 rounded">
                        {language === 'ta' ? (PLANET_SHORT_TA[p.name] || p.nameTa.slice(0, 2)) : p.name.slice(0, 2)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Center Info Box */}
          <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-slate-950/80 border border-amber-500/20 rounded-xl flex flex-col items-center justify-center p-2 text-center">
            <span className="text-[10px] font-bold text-amber-400 font-serif">
              {language === 'ta' ? currentData.planetNameTa : currentData.planetNameEn}
            </span>
            <span className="text-[11px] text-slate-300 font-sans font-medium">
              {language === 'ta' ? titleTa : titleEn}
            </span>
            <span className="text-lg font-mono font-extrabold text-amber-300 mt-0.5">
              {totalCount}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-wider block mb-1">
              Parashara Ashtakavarga Shodhana & Pindam
            </span>
            <h3 className="text-xl font-bold text-amber-300 font-serif flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              {language === 'ta'
                ? 'அஷ்டவர்க்க சோதனைகள் & சோத்திய பிண்டம் கணிப்பு'
                : 'Ashtakavarga Shodhana & Sodhya Pindam Calculator'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {language === 'ta' ? 'பாரம்பரிய கணித முறை' : 'BPHS Standard System'}
            </span>
          </div>
        </div>

        {/* Planet Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {planetList.map((pName) => {
            const isSel = selectedPlanet === pName;
            const pData = ashtakavarga.planetsData[pName];
            return (
              <button
                key={pName}
                onClick={() => setSelectedPlanet(pName)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:text-amber-200 border border-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? pData?.planetNameTa : pData?.planetNameEn}</span>
                <span className="text-[10px] font-mono opacity-80 ml-1">
                  ({pData?.sodhyaPindam ?? 0})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Step Charts (Whiteboard View) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderSouthGrid(
          currentData.rawBindus,
          'ஆதிப்பரல் (Initial Bindus)',
          'Initial BAV Bindus',
          currentData.rawTotal
        )}
        {renderSouthGrid(
          currentData.trikonaBindus,
          'திரிகோண சோதனை',
          'Trikona Shodhana',
          currentData.trikonaTotal
        )}
        {renderSouthGrid(
          currentData.ekadhipatyaBindus,
          'ஏகாதிபத்திய சோதனை',
          'Ekadhipatya Shodhana',
          currentData.ekadhipatyaTotal
        )}
      </div>

      {/* Sodhya Pindam Grand Summary Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border border-amber-500/40 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
              {language === 'ta' ? `${currentData.planetNameTa} சோத்திய பிண்டம்` : `${currentData.planetNameEn} Sodhya Pindam`}
            </span>
            <div className="flex items-center gap-2 text-sm text-slate-200 font-sans">
              <span>{language === 'ta' ? 'இராசி பிண்டம்' : 'Rasi Pindam'}: <strong className="text-amber-300 font-mono text-base">{currentData.rasiPindamTotal}</strong></span>
              <span>+</span>
              <span>{language === 'ta' ? 'கிரக பிண்டம்' : 'Graha Pindam'}: <strong className="text-amber-300 font-mono text-base">{currentData.grahaPindamTotal}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/90 border border-amber-500/40 px-5 py-2.5 rounded-xl">
          <span className="text-xs text-slate-300 font-semibold font-serif">
            {language === 'ta' ? 'சோத்திய பிண்டம்:' : 'Sodhya Pindam:'}
          </span>
          <span className="text-2xl font-mono font-extrabold text-amber-400">
            {currentData.sodhyaPindam}
          </span>
        </div>
      </div>

      {/* 2 Detailed Breakdown Grids matching Whiteboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Rasi Pindam Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                {language === 'ta' ? '1. இராசி பிண்டம் கணக்கீடு' : '1. Rasi Pindam Calculation'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ta'
                  ? 'ஏகாதிபத்திய சோதனை பரல் × இராசி எண் (குணகாரம்)'
                  : 'Shodhita Bindus × Rasi Multipliers (Gunakaram)'}
              </p>
            </div>
            <span className="text-sm font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              {currentData.rasiPindamTotal}
            </span>
          </div>

          <div className="space-y-1.5 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="pb-2 font-medium">{language === 'ta' ? 'ராசி' : 'Rasi'}</th>
                  <th className="pb-2 font-mono text-center">{language === 'ta' ? 'குணகாரம்' : 'Multiplier'}</th>
                  <th className="pb-2 font-mono text-center">×</th>
                  <th className="pb-2 font-mono text-center">{language === 'ta' ? 'பரல்' : 'Bindus'}</th>
                  <th className="pb-2 font-mono text-right">{language === 'ta' ? 'கூடுதல்' : 'Subtotal'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {currentData.rasiPindamItems.map((item) => (
                  <tr key={item.signIndex} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-1.5 font-medium text-slate-200">
                      {language === 'ta' ? item.signNameTa : item.signNameEn}
                    </td>
                    <td className="py-1.5 font-mono text-center text-amber-300">{item.gunakaram}</td>
                    <td className="py-1.5 font-mono text-center text-slate-500">×</td>
                    <td className="py-1.5 font-mono text-center text-slate-300">{item.shodhitaBindus}</td>
                    <td className="py-1.5 font-mono text-right font-bold text-amber-400">{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-700 font-bold">
                  <td colSpan={4} className="pt-2 text-slate-200">
                    {language === 'ta' ? 'இராசி பிண்டம் மொத்தம்:' : 'Total Rasi Pindam:'}
                  </td>
                  <td className="pt-2 font-mono text-right text-sm text-amber-300">
                    {currentData.rasiPindamTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 2. Graha Pindam Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-400" />
                {language === 'ta' ? '2. கிரக பிண்டம் கணக்கீடு' : '2. Graha Pindam Calculation'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ta'
                  ? 'கிரகம் நின்ற ராசி பரல் × கிரக எண் (குணகாரம்)'
                  : 'Occupied Sign Bindus × Planetary Multipliers'}
              </p>
            </div>
            <span className="text-sm font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              {currentData.grahaPindamTotal}
            </span>
          </div>

          <div className="space-y-1.5 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="pb-2 font-medium">{language === 'ta' ? 'கிரகம்' : 'Planet'}</th>
                  <th className="pb-2 font-medium">{language === 'ta' ? 'நின்ற ராசி' : 'Occupied Sign'}</th>
                  <th className="pb-2 font-mono text-center">{language === 'ta' ? 'குணகாரம்' : 'Multiplier'}</th>
                  <th className="pb-2 font-mono text-center">{language === 'ta' ? 'பரல்' : 'Bindus'}</th>
                  <th className="pb-2 font-mono text-right">{language === 'ta' ? 'கூடுதல்' : 'Subtotal'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {currentData.grahaPindamItems.map((item) => (
                  <tr key={item.planetNameEn} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2 font-medium text-slate-200">
                      {language === 'ta' ? item.planetNameTa : item.planetNameEn}
                    </td>
                    <td className="py-2 text-slate-400">
                      {language === 'ta' ? item.occupiedSignTa : item.occupiedSignEn}
                    </td>
                    <td className="py-2 font-mono text-center text-amber-300">{item.gunakaram}</td>
                    <td className="py-2 font-mono text-center text-slate-300">{item.shodhitaBindus}</td>
                    <td className="py-2 font-mono text-right font-bold text-amber-400">{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-700 font-bold">
                  <td colSpan={4} className="pt-2 text-slate-200">
                    {language === 'ta' ? 'கிரக பிண்டம் மொத்தம்:' : 'Total Graha Pindam:'}
                  </td>
                  <td className="pt-2 font-mono text-right text-sm text-amber-300">
                    {currentData.grahaPindamTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Master 7 Planets Consolidated Matrix */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h4 className="text-base font-bold text-slate-100 font-serif mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-amber-400" />
          {language === 'ta' ? '7 கிரகங்களின் அஷ்டவர்க்க சோத்திய பிண்ட தொகுப்பு' : '7 Planets Master Ashtakavarga Sodhya Pindam Matrix'}
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-950 text-amber-400 border-b border-slate-800">
                <th className="p-2.5 rounded-l-lg">{language === 'ta' ? 'கிரகம்' : 'Planet'}</th>
                <th className="p-2.5 font-mono text-center">{language === 'ta' ? 'ஆதிப்பரல்' : 'Initial Bindus'}</th>
                <th className="p-2.5 font-mono text-center">{language === 'ta' ? 'திரிகோணம்' : 'Trikona'}</th>
                <th className="p-2.5 font-mono text-center">{language === 'ta' ? 'ஏகாதிபத்தியம்' : 'Ekadhipatya'}</th>
                <th className="p-2.5 font-mono text-center">{language === 'ta' ? 'இராசி பிண்டம்' : 'Rasi Pindam'}</th>
                <th className="p-2.5 font-mono text-center">{language === 'ta' ? 'கிரக பிண்டம்' : 'Graha Pindam'}</th>
                <th className="p-2.5 font-mono text-right rounded-r-lg">{language === 'ta' ? 'சோத்திய பிண்டம்' : 'Sodhya Pindam'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {planetList.map((pName) => {
                const item = ashtakavarga.planetsData[pName];
                const isSelected = selectedPlanet === pName;
                return (
                  <tr
                    key={pName}
                    onClick={() => setSelectedPlanet(pName)}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'bg-amber-500/10 font-semibold' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-2.5 text-slate-100 font-medium flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-600'}`} />
                      {language === 'ta' ? item.planetNameTa : item.planetNameEn}
                    </td>
                    <td className="p-2.5 font-mono text-center text-slate-300">{item.rawTotal}</td>
                    <td className="p-2.5 font-mono text-center text-slate-300">{item.trikonaTotal}</td>
                    <td className="p-2.5 font-mono text-center text-slate-300">{item.ekadhipatyaTotal}</td>
                    <td className="p-2.5 font-mono text-center text-amber-300">{item.rasiPindamTotal}</td>
                    <td className="p-2.5 font-mono text-center text-amber-300">{item.grahaPindamTotal}</td>
                    <td className="p-2.5 font-mono text-right font-bold text-amber-400 text-sm">
                      {item.sodhyaPindam}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-700 bg-slate-950 font-bold">
                <td className="p-2.5 text-slate-200">
                  {language === 'ta' ? 'சர்வாஷ்டகவர்க்கம் (SAV):' : 'Sarvashtakavarga (SAV):'}
                </td>
                <td className="p-2.5 font-mono text-center text-amber-400 text-sm">
                  {ashtakavarga.sarvashtakavargaTotal}
                </td>
                <td colSpan={5} className="p-2.5 text-slate-400 text-[11px] text-right font-normal">
                  {language === 'ta' ? 'அனைத்து 7 கிரகங்களின் கூட்டுத்தொகை (337 பரல்கள்)' : 'Sum total of all 7 planetary bindus (337)'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
