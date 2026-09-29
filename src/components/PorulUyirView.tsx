import React from 'react';
import type { PorulUyirReport, Language } from '../types/astrology';
import {
  ShieldAlert,
  Coins,
  HeartPulse,
  Flame,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  UserX,
  BookOpen,
} from 'lucide-react';

interface PorulUyirViewProps {
  report: PorulUyirReport;
  language: Language;
}

export const PorulUyirView: React.FC<PorulUyirViewProps> = ({ report, language }) => {
  const isTa = language === 'ta';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isTa ? 'வேத ஜாதக விசேஷ விதி பகுப்பாய்வு' : 'Vedic Horoscope Core Rule Engine'}
              </span>
              <span className="text-xs font-bold font-mono text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {report.lagnaNameTa} ({report.lagnaNameEn} Lagna)
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-300">
              {isTa ? 'பொருள் - உயிர் & 6-ம் பாவ கடன்/பாதக பகுப்பாய்வு' : 'Porul (Material) vs Uyir (Vitality) & 6th House Badhaka Engine'}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {isTa
                ? 'ஒவ்வொரு ஜாதகத்திலும் பொருளாதாரம் (Porul) மற்றும் உயிர் ஆரோக்கியம் (Uyir) தரும் கிரகங்களின் இயல்பு, 6-ம் பாவகத்தின் கடன்/நோய் இயக்கம் மற்றும் 60 ஆண்டு கர்ம வாழ்க்கை வழிகாட்டி.'
                : 'Decodes material wealth (Porul) vs vitality/life (Uyir) lords, 6th house debt conversion dynamics, and paternal badhaka patterns across life phases.'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-indigo-500/30 text-center min-w-[160px]">
            <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
              {isTa ? 'அயனக் காலம்' : 'Solstice Ayana'}
            </span>
            <span className="text-sm font-bold text-cyan-300 block mt-0.5">
              {report.solsticeAyana.ayanaTa.split(' ')[0]}
            </span>
            <span className="text-[10px] text-amber-400 block font-mono mt-1">
              {report.solsticeAyana.natureTa}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 1. Uyir Planets & 2. Porul Planets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Uyir Planets Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-emerald-300">
                {isTa ? 'உயிர்காரக கிரகங்கள் (Life & Vitality Lords)' : 'Uyirkaraga Planets (Life & Vitality)'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isTa ? '1, 5, 9-ம் திரிகோணாதிபதிகள் - ஆரோக்கியம் & வம்சம்' : '1, 5, 9 Trikona Lords - Health & Soul Vitality'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.uyirPlanets.map((p) => (
              <div
                key={p.planetEn}
                className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-300 shrink-0 mt-0.5">
                  {isTa ? p.planetTa.slice(0, 3) : p.planetEn.slice(0, 3)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-200">{isTa ? p.planetTa : p.planetEn}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {p.placedHouse}-ம் பாவம் ({p.placedSignTa})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    {isTa ? p.effectTa : p.effectEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Porul Planets Card */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <Coins className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-amber-300">
                {isTa ? 'பொருள்காரக கிரகங்கள் (Material Wealth Lords)' : 'Porulkaraga Planets (Financial Wealth)'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isTa ? 'தனம், உத்தியோகம் & தொழில் வளம் தருபவர்கள்' : 'Wealth Accumulation, Career & Commercial Lords'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.porulPlanets.map((p) => (
              <div
                key={p.planetEn}
                className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-3 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-xs text-amber-300 shrink-0 mt-0.5">
                  {isTa ? p.planetTa.slice(0, 3) : p.planetEn.slice(0, 3)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-200">{isTa ? p.planetTa : p.planetEn}</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {p.placedHouse}-ம் பாவம் ({p.placedSignTa})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    {isTa ? p.effectTa : p.effectEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6th House & Badhaka Deep Dive */}
      <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
            <h3 className="text-base font-bold text-rose-300">
              {isTa ? '6-ம் பாவம் கடன்/பாதக & தந்தை கர்ம பகுப்பாய்வு' : '6th House Debt Trap & Badhaka Father Dynamics'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-rose-300 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
            {isTa ? `6-ம் ராசி: ${report.sixthHouseBadhaka.sixthHouseSignTa}` : `6th Sign: ${report.sixthHouseBadhaka.sixthHouseSignEn}`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Planets in 6th House impact */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/20 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-mono">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              {isTa ? '6-ம் பாவத்தில் அமர்ந்த கிரகங்களின் தாக்கம்' : 'Impact of Planets Occupying 6th House'}
            </h4>

            {report.sixthHouseBadhaka.planetsIn6thHouse.length > 0 ? (
              <div className="space-y-2">
                {report.sixthHouseBadhaka.planetsIn6thHouse.map((p) => (
                  <div key={p.planetEn} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                    <span className="font-bold text-rose-300 block mb-0.5">{p.planetTa} ({p.planetEn})</span>
                    <p className="text-[11px] text-slate-300">{isTa ? p.impactTa : p.impactEn}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                {isTa ? '6-ம் பாவத்தில் கிரகங்கள் ஏதும் இல்லை. கடன் ஆபத்துக்கள் கட்டுக்குள் இருக்கும்.' : 'No planets occupying 6th house directly. Debt vulnerability remains minimal.'}
              </p>
            )}

            <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 text-xs text-rose-200">
              <span className="font-bold block mb-1 font-mono text-rose-400">
                {isTa ? '⚠️ கடன் எச்சரிக்கை Rule:' : '⚠️ Debt Warning Rule:'}
              </span>
              {isTa ? report.sixthHouseBadhaka.sixthHouseDebtWarningTa : report.sixthHouseBadhaka.sixthHouseDebtWarningEn}
            </div>
          </div>

          {/* Father (9th Lord in 6th) analysis */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/20 space-y-3">
            <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
              <UserX className="w-4 h-4 text-indigo-400" />
              {isTa ? 'தந்தை (9-ம் அதிபதி) கர்ம சூழல்' : 'Father (9th Lord) & 6th House Alignment'}
            </h4>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{isTa ? 'பாதகாதிபதி:' : 'Badhakatipathi:'} {report.sixthHouseBadhaka.badhakaLordTa}</span>
                <span>{isTa ? 'அமர்ந்த பாவம்:' : 'Placed House:'} H{report.sixthHouseBadhaka.badhakaPlacedHouse}</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {isTa ? report.sixthHouseBadhaka.fatherAnalysisTa : report.sixthHouseBadhaka.fatherAnalysisEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 60-Year Karma Age Phase Timeline */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-amber-300 font-serif">
              {isTa ? '60 ஆண்டு கர்ம வாழ்க்கை கால அட்டவணை (Porul vs Uyir Timeline)' : '60-Year Karma & Financial Age Phase Map'}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">0 to 60+ Years</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {report.agePhases.map((phase) => (
            <div
              key={phase.ageRange}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                phase.statusIndicator === '++'
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : phase.statusIndicator === '+'
                  ? 'bg-slate-950 border-amber-500/40'
                  : phase.statusIndicator === '-'
                  ? 'bg-slate-950 border-rose-500/40'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {phase.ageRange}
                  </span>
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                      phase.statusIndicator === '++'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : phase.statusIndicator === '+'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    ({phase.statusIndicator})
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100 mb-1">{isTa ? phase.titleTa : phase.titleEn}</h4>
                <p className="text-[11px] text-slate-300 leading-normal">{isTa ? phase.summaryTa : phase.summaryEn}</p>
              </div>

              {phase.keyWarningTa && (
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-rose-300 font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                  <span>{isTa ? phase.keyWarningTa : phase.keyWarningEn}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Remedies & Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-3">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2 border-b border-slate-800 pb-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            {isTa ? 'முக்கிய பலன் வழிகாட்டல்' : 'Key Astrological Guidance'}
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {(isTa ? report.keyAdviceTa : report.keyAdviceEn).map((advice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-3">
          <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Flame className="w-4 h-4 text-emerald-400" />
            {isTa ? 'சிறப்பு பரிகாரம் & வழிபாடுகள்' : 'Special Remedies & Worship'}
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {(isTa ? report.specialRemediesTa : report.specialRemediesEn).map((remedy, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{remedy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
