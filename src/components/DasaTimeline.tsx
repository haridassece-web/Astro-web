import React, { useState } from 'react';
import type { DasaPeriod, StartingDasaInfo, PresentDasaInfo, Language } from '../types/astrology';
import {
  Clock, ChevronDown, ChevronRight, Sparkles, Calendar,
  Zap, Compass, Baby, Layers, ChevronUp
} from 'lucide-react';

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
  const [expandedPuthi, setExpandedPuthi] = useState<string | null>(
    presentDasaInfo ? `${presentDasaInfo.mahadasa}_${presentDasaInfo.puthi}` : null
  );
  const [expandedAndhraman, setExpandedAndhraman] = useState<string | null>(
    presentDasaInfo ? `${presentDasaInfo.mahadasa}_${presentDasaInfo.puthi}_${presentDasaInfo.andhraman}` : null
  );

  const toggleExpand = (planet: string) => {
    setExpandedPlanet(expandedPlanet === planet ? null : planet);
  };

  const togglePuthiExpand = (puthiKey: string) => {
    setExpandedPuthi(expandedPuthi === puthiKey ? null : puthiKey);
  };

  const toggleAndhramanExpand = (andhraKey: string) => {
    setExpandedAndhraman(expandedAndhraman === andhraKey ? null : andhraKey);
  };

  const handleExpandActiveChain = () => {
    if (!presentDasaInfo) return;
    setExpandedPlanet(presentDasaInfo.mahadasa);
    setExpandedPuthi(`${presentDasaInfo.mahadasa}_${presentDasaInfo.puthi}`);
    setExpandedAndhraman(`${presentDasaInfo.mahadasa}_${presentDasaInfo.puthi}_${presentDasaInfo.andhraman}`);
    setFilterMode('all');
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
              ? 'விம்சொத்தரி மகா தசா, புக்தி, அந்தரம் & சூட்சும கால அட்டவணை'
              : 'Vimshottari Dasa, Puthi, Antharam & Sookshmam Engine'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'ta'
              ? 'மகா தசை (Level 1) ➔ புக்தி (Level 2) ➔ அந்தரம் (Level 3) ➔ சூட்சுமம் (Level 4) முழுமையான 120 ஆண்டு வேத காலக்கணிப்பு'
              : 'Comprehensive 4-Tier Vedic Cycle: Mahadasa (L1) ➔ Puthi (L2) ➔ Antharam (L3) ➔ Sookshmam (L4)'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {presentDasaInfo && (
            <button
              onClick={handleExpandActiveChain}
              className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/40 font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Expand Active Dasa -> Puthi -> Antharam -> Sookshmam"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{language === 'ta' ? 'நடப்பு சங்கிலியை விரி' : 'Open Active Chain'}</span>
            </button>
          )}
          <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 font-bold whitespace-nowrap hidden sm:inline">
            4 Levels • 120 Years
          </span>
        </div>
      </div>

      {/* Hero Feature Cards: Starting 4-Tier & Present 4-Tier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Starting Dasa Puthi Antharam Sookshmam Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20 flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5 text-indigo-400" />
                {language === 'ta' ? 'பிறப்பு தசா புக்தி அந்தரம் சூட்சும இருப்பு' : 'Starting Dasa Chain At Birth'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Birth Epoch</span>
            </div>

            <div className="mt-2 space-y-2">
              {/* 4-Tier Chain Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">
                    {language === 'ta' ? '1. மகா தசை' : '1. Dasa'}
                  </span>
                  <span className="text-xs font-bold text-amber-300 truncate block">
                    {startingDasaInfo ? startingDasaInfo.mahadasaTa : startingDasa.planetTa}
                  </span>
                </div>

                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">
                    {language === 'ta' ? '2. புக்தி' : '2. Puthi'}
                  </span>
                  <span className="text-xs font-bold text-indigo-300 truncate block">
                    {startingDasaInfo ? startingDasaInfo.puthiTa : startingDasa.subDasas?.[0]?.planetTa || '-'}
                  </span>
                </div>

                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-cyan-400 block font-mono">
                    {language === 'ta' ? '3. அந்தரம்' : '3. Antharam'}
                  </span>
                  <span className="text-xs font-bold text-cyan-300 truncate block">
                    {startingDasaInfo?.andhramanTa || '-'}
                  </span>
                </div>

                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400 block font-mono">
                    {language === 'ta' ? '4. சூட்சுமம்' : '4. Sookshmam'}
                  </span>
                  <span className="text-xs font-bold text-emerald-300 truncate block">
                    {startingDasaInfo?.suzisamTa || '-'}
                  </span>
                </div>
              </div>

              {startingDasaInfo && (
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1.5 mt-2">
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

        {/* 2. Present Active Dasa Puthi Antharam Sookshmam Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 shadow-lg shadow-amber-500/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-mono text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {language === 'ta' ? 'தற்போது நடப்பு தசா புக்தி அந்தரம் சூட்சுமம்' : 'Present Active 4-Tier Chain'}
              </span>
              {presentDasaInfo && (
                <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {presentDasaInfo.daysRemainingInPuthi} {language === 'ta' ? 'நாட்கள் பாக்கி' : 'Days Left'}
                </span>
              )}
            </div>

            <div className="mt-2 space-y-2">
              {presentDasaInfo ? (
                <div>
                  {/* 4-Tier Interactive Chain Ribbon */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {/* Mahadasa */}
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-amber-500/30 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">
                        {language === 'ta' ? '1. மகா தசை' : '1. Dasa'}
                      </span>
                      <span className="text-xs font-bold text-amber-300 truncate block">
                        {presentDasaInfo.mahadasaTa}
                      </span>
                      <span className="text-[9px] text-amber-400/80 font-mono block">
                        {presentDasaInfo.startDate?.slice(0, 4)}~{presentDasaInfo.endDate?.slice(0, 4)}
                      </span>
                    </div>

                    {/* Puthi */}
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-amber-400/40 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">
                        {language === 'ta' ? '2. புக்தி' : '2. Puthi'}
                      </span>
                      <span className="text-xs font-bold text-amber-200 truncate block">
                        {presentDasaInfo.puthiTa}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-mono block">
                        {presentDasaInfo.daysRemainingInPuthi}d {language === 'ta' ? 'பாக்கி' : 'rem'}
                      </span>
                    </div>

                    {/* Antharam */}
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-cyan-500/40 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-400 block font-mono">
                        {language === 'ta' ? '3. அந்தரம்' : '3. Antharam'}
                      </span>
                      <span className="text-xs font-bold text-cyan-200 truncate block">
                        {presentDasaInfo.andhramanTa}
                      </span>
                      <span className="text-[9px] text-cyan-400 font-mono block">
                        {presentDasaInfo.daysRemainingInAndhraman ?? 0}d {language === 'ta' ? 'பாக்கி' : 'rem'}
                      </span>
                    </div>

                    {/* Sookshmam */}
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-emerald-500/40 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 block font-mono">
                        {language === 'ta' ? '4. சூட்சுமம்' : '4. Sookshmam'}
                      </span>
                      <span className="text-xs font-bold text-emerald-200 truncate block">
                        {presentDasaInfo.suzisamTa || '-'}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-mono block">
                        {presentDasaInfo.daysRemainingInSuzisam ?? 0}d {language === 'ta' ? 'பாக்கி' : 'rem'}
                      </span>
                    </div>
                  </div>

                  {/* Dates & Progress Bar */}
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1.5 mt-2">
                    <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                      <span>
                        {language === 'ta' ? 'அந்தர காலம்: ' : 'Antharam Span: '}
                        {presentDasaInfo.andhramanStartDate} ~ {presentDasaInfo.andhramanEndDate}
                      </span>
                      <span className="text-amber-300 font-bold">{presentDasaInfo.progressPercent}%</span>
                    </div>

                    {presentDasaInfo.suzisamStartDate && (
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>
                          {language === 'ta' ? 'சூட்சும காலம்: ' : 'Sookshma Span: '}
                          {presentDasaInfo.suzisamStartDate} ~ {presentDasaInfo.suzisamEndDate}
                        </span>
                        <span className="text-emerald-400">
                          {presentDasaInfo.suzisamTa} {language === 'ta' ? 'சூட்சுமம்' : 'Sookshmam'}
                        </span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-cyan-400 rounded-full transition-all duration-500"
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

      {/* Dasa Periods Accordion Listing with Nested 4-Level Drilldown */}
      <div className="space-y-3">
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
              {/* Level 1: Mahadasa Header */}
              <button
                onClick={() => toggleExpand(dasa.planet)}
                className="w-full p-3.5 flex items-center justify-between text-left outline-none hover:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
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
                      <span className="text-sm font-bold text-slate-100 font-serif">
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
                  <span className="text-xs text-amber-400/90 hidden sm:inline font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {dasa.subDasas?.length || 9} {language === 'ta' ? 'புக்திகள்' : 'Puthis'}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-amber-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Level 2: Sub-Dasas / Puthis Grid */}
              {isExpanded && dasa.subDasas && (
                <div className="bg-slate-900/80 border-t border-slate-800 p-3 sm:p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      {language === 'ta'
                        ? `${dasa.planetTa} மகா தசையின் 9 புக்திகள் (அந்தரம் & சூட்சுமங்களை பார்க்க கிளிக் செய்க)`
                        : `${dasa.planet} Puthis (Click any Puthi to view Antharam & Sookshmam)`}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Level 2: Puthi ➔ Level 3: Antharam ➔ Level 4: Sookshmam
                    </span>
                  </div>

                  <div className="space-y-2">
                    {dasa.subDasas.map((puthi) => {
                      const puthiKey = `${dasa.planet}_${puthi.planet}`;
                      const isPuthiExpanded = expandedPuthi === puthiKey;

                      return (
                        <div
                          key={puthiKey}
                          className={`rounded-xl border transition-all overflow-hidden ${
                            puthi.isCurrent
                              ? 'bg-amber-950/20 border-amber-500/50 shadow-md'
                              : puthi.isStartingAtBirth
                              ? 'bg-indigo-950/30 border-indigo-500/40'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {/* Puthi Header Button */}
                          <button
                            onClick={() => togglePuthiExpand(puthiKey)}
                            className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left outline-none hover:bg-slate-900/60 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-7 h-7 rounded flex items-center justify-center font-bold text-[11px] ${
                                  puthi.isCurrent
                                    ? 'bg-amber-400 text-slate-950'
                                    : puthi.isStartingAtBirth
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {language === 'ta' ? puthi.planetTa.slice(0, 2) : puthi.planet.slice(0, 2)}
                              </div>

                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs sm:text-sm font-bold text-slate-200">
                                    {language === 'ta' ? `${puthi.planetTa} புக்தி` : `${puthi.planet} Puthi`}
                                  </span>

                                  {puthi.isCurrent && (
                                    <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold flex items-center gap-1">
                                      <Sparkles className="w-2.5 h-2.5" />
                                      {language === 'ta' ? 'நடப்பு புக்தி' : 'Active Puthi'}
                                    </span>
                                  )}

                                  {puthi.isStartingAtBirth && !puthi.isCurrent && (
                                    <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded font-bold">
                                      {language === 'ta' ? 'பிறப்பு புக்தி' : 'Birth Puthi'}
                                    </span>
                                  )}
                                </div>

                                <span className="text-[11px] text-slate-400 font-mono">
                                  {puthi.startDate} ~ {puthi.endDate} ({puthi.durationDays || Math.round(puthi.durationYears * 365.25)} {language === 'ta' ? 'நாட்கள்' : 'days'})
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30 hidden sm:inline">
                                9 {language === 'ta' ? 'அந்தரம்' : 'Antharam'}
                              </span>
                              {isPuthiExpanded ? (
                                <ChevronUp className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                          </button>

                          {/* Level 3: Antharam (Pratyantardasa) Listing */}
                          {isPuthiExpanded && puthi.pratyantarDasas && (
                            <div className="bg-slate-950/90 border-t border-slate-800 p-3 sm:p-4 space-y-3">
                              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                                <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-cyan-400" />
                                  {language === 'ta'
                                    ? `${puthi.planetTa} புக்தியின் 9 அந்தரங்கள் (சூட்சுமங்களை பார்க்க கிளிக் செய்க)`
                                    : `${puthi.planet} Antharam Periods (Click any to view Sookshmam)`}
                                </span>
                                <span className="text-[10px] font-mono text-cyan-400/80">
                                  Level 3: Antharam ➔ Level 4: Sookshmam
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {puthi.pratyantarDasas.map((andhra) => {
                                  const andhraKey = `${dasa.planet}_${puthi.planet}_${andhra.planet}`;
                                  const isAndhraExpanded = expandedAndhraman === andhraKey;

                                  return (
                                    <div
                                      key={andhraKey}
                                      className={`rounded-lg border transition-all overflow-hidden ${
                                        andhra.isCurrent
                                          ? 'bg-cyan-950/40 border-cyan-400/60 shadow-md ring-1 ring-cyan-500/30'
                                          : andhra.isStartingAtBirth
                                          ? 'bg-indigo-950/30 border-indigo-500/40'
                                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                                      }`}
                                    >
                                      {/* Antharam Header Button */}
                                      <button
                                        onClick={() => toggleAndhramanExpand(andhraKey)}
                                        className="w-full p-2.5 text-left outline-none hover:bg-slate-900 transition-colors flex items-start justify-between"
                                      >
                                        <div>
                                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                                            <span className="text-xs font-bold text-slate-100">
                                              {language === 'ta' ? `${andhra.planetTa} அந்தரம்` : `${andhra.planet} Antharam`}
                                            </span>

                                            {andhra.isCurrent && (
                                              <span className="text-[9px] bg-cyan-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                                                {language === 'ta' ? 'நடப்பு' : 'Active'}
                                              </span>
                                            )}

                                            {andhra.isStartingAtBirth && !andhra.isCurrent && (
                                              <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1 py-0.2 rounded font-bold">
                                                {language === 'ta' ? 'பிறப்பு' : 'Birth'}
                                              </span>
                                            )}
                                          </div>

                                          <div className="text-[10px] text-slate-400 font-mono">
                                            {andhra.startDate} ~ {andhra.endDate}
                                          </div>
                                          <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                                            {andhra.durationDays || Math.round(andhra.durationYears * 365.25)} {language === 'ta' ? 'நாட்கள்' : 'days'}
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0 ml-2">
                                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                            9 {language === 'ta' ? 'சூட்சுமம்' : 'Sookshmam'}
                                          </span>
                                          {isAndhraExpanded ? (
                                            <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                                          ) : (
                                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                                          )}
                                        </div>
                                      </button>

                                      {/* Level 4: Sookshmam (Sookshma Dasa) Listing */}
                                      {isAndhraExpanded && andhra.sookshmaDasas && (
                                        <div className="bg-slate-950 border-t border-slate-800/80 p-2.5 space-y-1.5">
                                          <div className="flex items-center justify-between text-[10px] text-emerald-300 font-semibold border-b border-slate-800 pb-1">
                                            <span>
                                              {language === 'ta'
                                                ? `${andhra.planetTa} அந்தரத்தின் 9 சூட்சுமங்கள்:`
                                                : `${andhra.planet} 9 Sookshmam Periods:`}
                                            </span>
                                            <span className="text-slate-400 font-mono">Level 4</span>
                                          </div>

                                          <div className="space-y-1">
                                            {andhra.sookshmaDasas.map((suz) => (
                                              <div
                                                key={suz.planet}
                                                className={`p-1.5 rounded text-[11px] flex items-center justify-between border ${
                                                  suz.isCurrent
                                                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                                                    : suz.isStartingAtBirth
                                                    ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200'
                                                    : 'bg-slate-900 border-slate-800/80 text-slate-300'
                                                }`}
                                              >
                                                <div className="flex items-center gap-1.5">
                                                  <span className="font-semibold">
                                                    {language === 'ta' ? `${suz.planetTa} சூட்சுமம்` : `${suz.planet} Sookshmam`}
                                                  </span>
                                                  {suz.isCurrent && (
                                                    <span className="text-[8px] bg-emerald-400 text-slate-950 px-1 py-0.2 rounded font-extrabold">
                                                      {language === 'ta' ? 'நடப்பு' : 'Active'}
                                                    </span>
                                                  )}
                                                  {suz.isStartingAtBirth && !suz.isCurrent && (
                                                    <span className="text-[8px] bg-indigo-500/30 text-indigo-300 px-1 py-0.2 rounded">
                                                      {language === 'ta' ? 'பிறப்பு' : 'Birth'}
                                                    </span>
                                                  )}
                                                </div>

                                                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                                                  <span>
                                                    {suz.startDate} to {suz.endDate}
                                                  </span>
                                                  <span className="text-amber-300 font-semibold">
                                                    {suz.durationDays}d
                                                  </span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

