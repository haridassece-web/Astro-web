import React, { useState } from 'react';
import type { MudakkuIndividualPrediction, Language } from '../types/astrology';
import {
  Compass,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Flame,
  Clock,
  Heart,
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface MudakkuPredictionViewProps {
  mudakkuPrediction: MudakkuIndividualPrediction;
  language: Language;
}

export const MudakkuPredictionView: React.FC<MudakkuPredictionViewProps> = ({
  mudakkuPrediction,
  language,
}) => {
  const [selectedBhava, setSelectedBhava] = useState<number>(mudakkuPrediction.mudakkuBhava);

  const activeBhavaData =
    mudakkuPrediction.allBhavas[selectedBhava] || mudakkuPrediction.nativeBhavaData;

  const isNativeBhava = selectedBhava === mudakkuPrediction.mudakkuBhava;

  return (
    <div className="space-y-6">
      {/* 1. Top Executive Banner */}
      <div className="bg-gradient-to-br from-amber-950/80 via-slate-900/95 to-slate-950 border border-amber-500/40 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Authentic Palm-Leaf Manuscript & Shastra Research • ஏட்டுச் சுவடி முடக்கு ஆய்வு
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-amber-200 font-serif flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-amber-400 animate-spin-slow" />
              {language === 'ta'
                ? 'தனிநபர் ஜாதக முடக்கு பாவக பலன்கள் & விதிகள்'
                : 'Individual Horoscope Mudakku Bhava Predictions & Shastra Rules'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {language === 'ta'
                ? 'சூரியன் நின்ற நட்சத்திரத்தின் முடக்கு ராசி, லக்ன பாவகப் பலன்கள், முடக்கு அதிபதி சஞ்சார எச்சரிக்கைகள், 12 பாவக முழு ஆய்வு மற்றும் திருப்பூர் தணிகாசலம் ஏட்டுச் சுவடி வழிகாட்டுதல்கள்.'
                : 'Deep astrological synthesis of the native’s Sun Nakshatra, Mudakku Zodiac Sign, Bhava from Lagna, Mudakku Lord placement, transit cautions, and complete 12 Bhavas analysis based on ancient Tamil astrological manuscripts.'}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {language === 'ta'
                ? `உங்கள் முடக்கு: ${mudakkuPrediction.mudakkuBhava}-ஆம் பாவம் (${mudakkuPrediction.mudakkuSignNameTa})`
                : `Your Mudakku: House ${mudakkuPrediction.mudakkuBhava} (${mudakkuPrediction.mudakkuSignNameEn})`}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {language === 'ta'
                ? `முடக்கு அதிபதி: ${mudakkuPrediction.mudakkuLordNameTa}`
                : `Mudakku Lord: ${mudakkuPrediction.mudakkuLordNameEn}`}
            </span>
          </div>
        </div>

        {/* 2. Four Vital Native Astrological Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          {/* Card 1: Surya Star ➔ Mudakku Star */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'சூரியன் ➔ முடக்கு நட்சத்திரம்' : 'Sun Star ➔ Mudakku Stars'}
            </span>
            <div>
              <div className="text-xs font-bold text-amber-300 font-serif">
                {language === 'ta' ? mudakkuPrediction.sunStarTa : mudakkuPrediction.sunStarEn}
                <span className="text-slate-400 mx-1.5">➔</span>
                <span className="text-amber-100">
                  {language === 'ta' ? mudakkuPrediction.mudakkuStarTa : mudakkuPrediction.mudakkuStarEn}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                {language === 'ta' ? 'சூரியனின் பாதசாரம்' : 'Sun Nakshatra Root'}
              </span>
            </div>
          </div>

          {/* Card 2: Mudakku Sign & Bhava */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'முடக்கு ராசி & லக்ன பாவம்' : 'Mudakku Sign & Bhava'}
            </span>
            <div>
              <div className="text-xs font-bold text-amber-300 font-serif">
                {language === 'ta' ? mudakkuPrediction.mudakkuSignNameTa : mudakkuPrediction.mudakkuSignNameEn}
                <span className="text-slate-400 mx-1.5">•</span>
                <span className="text-emerald-300">
                  {language === 'ta'
                    ? `${mudakkuPrediction.mudakkuBhava}-ஆம் பாவம்`
                    : `House ${mudakkuPrediction.mudakkuBhava}`}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                {language === 'ta' ? 'லக்னத்திலிருந்து கணக்கீடு' : 'Counted from Birth Lagna'}
              </span>
            </div>
          </div>

          {/* Card 3: Mudakku Lord & Placement */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'முடக்கு அதிபதி & நின்ற இடம்' : 'Mudakku Lord & Placement'}
            </span>
            <div>
              <div className="text-xs font-bold text-amber-300 font-serif">
                {language === 'ta' ? mudakkuPrediction.mudakkuLordNameTa : mudakkuPrediction.mudakkuLordNameEn}
                <span className="text-slate-400 mx-1">➔</span>
                <span className="text-amber-100">
                  {language === 'ta'
                    ? `${mudakkuPrediction.mudakkuLordPlacementHouse}-ல் (${mudakkuPrediction.mudakkuLordPlacementSignTa})`
                    : `H${mudakkuPrediction.mudakkuLordPlacementHouse} in ${mudakkuPrediction.mudakkuLordPlacementSignEn}`}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                {mudakkuPrediction.mudakkuLordDignityEn ? (
                  <span className="text-amber-400 font-bold">{mudakkuPrediction.mudakkuLordDignityEn}</span>
                ) : (
                  language === 'ta' ? 'ஜாதக நிலை' : 'Horoscope State'
                )}
              </span>
            </div>
          </div>

          {/* Card 4: Planets in Mudakku Sign */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'முடக்கு ராசியில் நின்ற கிரகங்கள்' : 'Planets in Mudakku Sign'}
            </span>
            <div>
              {mudakkuPrediction.planetsInMudakkuSign.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {mudakkuPrediction.planetsInMudakkuSign.map((p, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        p.isChhaya
                          ? 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                          : 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {language === 'ta' ? p.nameTa : p.nameEn}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-400 italic">
                  {language === 'ta' ? 'கிரகங்கள் இல்லை (சுத்த ராசி)' : 'No planets (Clean sign)'}
                </span>
              )}
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                {mudakkuPrediction.planetsInMudakkuSign.some((p) => p.isChhaya)
                  ? (language === 'ta' ? 'சாயாகிரக தாக்கம் உள்ளது' : 'Shadow node presence')
                  : (language === 'ta' ? 'முடக்கு ஸ்தான அமர்வு' : 'House occupation')}
              </span>
            </div>
          </div>
        </div>

        {/* 3. High-Priority Astrological Alert Badges */}
        <div className="mt-4 space-y-2">
          {mudakkuPrediction.bornInMudakkuDasa && (
            <div className="bg-red-950/40 border border-red-500/40 p-3 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-red-300 font-serif block">
                  {language === 'ta' ? 'முடக்கு அதிபதி திசையில் பிறப்பு எச்சரிக்கை!' : 'Born in Mudakku Lord Dasa Alert!'}
                </span>
                <p className="text-xs text-red-200 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.bornInMudakkuDasaDetailsTa
                    : mudakkuPrediction.bornInMudakkuDasaDetailsEn}
                </p>
              </div>
            </div>
          )}

          {mudakkuPrediction.runningMudakkuDasa && (
            <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-300 font-serif block">
                  {language === 'ta' ? 'நடப்பு தசை / புத்தியில் முடக்கு அதிபதி ஆதிக்கம்!' : 'Active Dasa/Bhukti Ruled by Mudakku Lord!'}
                </span>
                <p className="text-xs text-amber-200 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.runningMudakkuDasaDetailsTa
                    : mudakkuPrediction.runningMudakkuDasaDetailsEn}
                </p>
              </div>
            </div>
          )}

          {mudakkuPrediction.sunInRohini && (
            <div className="bg-purple-950/40 border border-purple-500/40 p-3 rounded-xl flex items-start gap-2.5">
              <BookOpen className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-purple-200 font-serif block">
                  {language === 'ta' ? 'ரோகிணியில் சூரிய பகவான் - விசேஷ சாஸ்திர விதி' : 'Sun in Rohini - Sacred Shastra Injunction'}
                </span>
                <p className="text-xs text-purple-300 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.sunInRohiniDetailsTa
                    : mudakkuPrediction.sunInRohiniDetailsEn}
                </p>
              </div>
            </div>
          )}

          {mudakkuPrediction.hasSaturnRahuAssociation && (
            <div className="bg-slate-900/80 border border-indigo-500/40 p-3 rounded-xl flex items-start gap-2.5">
              <Flame className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-indigo-300 font-serif block">
                  {language === 'ta' ? 'சனி + ராகு ஜீவன போராட்ட இணைப்பு & பிரம்ம தோஷம்' : 'Saturn + Rahu Livelihood Struggle & Brahma Dosha'}
                </span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.hasSaturnRahuDetailsTa
                    : mudakkuPrediction.hasSaturnRahuDetailsEn}
                </p>
              </div>
            </div>
          )}

          {mudakkuPrediction.hasPunarphooDosha && (
            <div className="bg-slate-900/80 border border-pink-500/40 p-3 rounded-xl flex items-start gap-2.5">
              <Heart className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-pink-300 font-serif block">
                  {language === 'ta' ? 'சனி + சந்திரன் புணர்ப்பு விவாக தோஷம்' : 'Saturn + Moon Punarphoo Marital Delay Dosha'}
                </span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.hasPunarphooDetailsTa
                    : mudakkuPrediction.hasPunarphooDetailsEn}
                </p>
              </div>
            </div>
          )}

          {mudakkuPrediction.hasLoveFailureCaution && (
            <div className="bg-rose-950/30 border border-rose-500/40 p-3 rounded-xl flex items-start gap-2.5">
              <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-rose-300 font-serif block">
                  {language === 'ta' ? '12-ஆம் பாவம் / செவ்வாய் முடக்கு - காதல் தோல்வி & குடும்ப எச்சரிக்கை' : '12th House / Mars Mudakku - Love Failure & Marital Vigilance'}
                </span>
                <p className="text-xs text-rose-200 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.hasLoveFailureDetailsTa
                    : mudakkuPrediction.hasLoveFailureDetailsEn}
                </p>
              </div>
            </div>
          )}

          {mudakkuPrediction.hasJalliyaDoshaCaution && (
            <div className="bg-amber-950/30 border border-amber-600/40 p-3 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-400 font-serif block">
                  {language === 'ta' ? 'ஜல்லிய தோஷம் - கடன்/வழக்கு உள்ள பூமி வாங்குவதில் எச்சரிக்கை!' : 'Jalliya Dosha - Caution on Disputed / Debt-Ridden Land!'}
                </span>
                <p className="text-xs text-amber-200 mt-0.5 leading-relaxed">
                  {language === 'ta'
                    ? mudakkuPrediction.hasJalliyaDoshaDetailsTa
                    : mudakkuPrediction.hasJalliyaDoshaDetailsEn}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Universal Astrological Manuscript Rules & Transit Cautions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            {language === 'ta'
              ? 'ஏட்டுச் சுவடியின் 5 பொதுவான முடக்கு & சஞ்சார சாஸ்திர விதிகள்'
              : '5 Universal Astrological Manuscript Rules & Transit Cautions'}
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {language === 'ta' ? 'அனைத்து ஜாதகர்களுக்கும் பொதுவானது' : 'Universal Principles'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mudakkuPrediction.generalRules.map((rule) => {
            const isHigh = rule.severity === 'high';
            const isMedium = rule.severity === 'medium';
            return (
              <div
                key={rule.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isHigh
                    ? 'bg-red-950/20 border-red-500/30 hover:border-red-500/60'
                    : isMedium
                    ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60'
                    : 'bg-indigo-950/20 border-indigo-500/30 hover:border-indigo-500/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        isHigh
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : isMedium
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                      }`}
                    >
                      {rule.severity}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 font-serif mb-1.5">
                    {language === 'ta' ? rule.titleTa : rule.titleEn}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'ta' ? rule.instructionTa : rule.instructionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 12 Bhavas Interactive Explorer Navigation Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 font-serif">
              {language === 'ta' ? '12 பாவக முடக்கு பலன்கள் அட்டவணை' : '12 Bhavas Mudakku Explorer'}
            </h3>
          </div>
          <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            {language === 'ta'
              ? `உங்கள் பாவம்: ${mudakkuPrediction.mudakkuBhava}-ஆம் பாவம்`
              : `Your Native Bhava: House ${mudakkuPrediction.mudakkuBhava}`}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hNum) => {
            const isNative = hNum === mudakkuPrediction.mudakkuBhava;
            const isSelected = hNum === selectedBhava;

            return (
              <button
                key={hNum}
                onClick={() => setSelectedBhava(hNum)}
                className={`py-2 px-1 rounded-xl text-center transition-all relative ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 scale-105 z-10'
                    : isNative
                    ? 'bg-slate-900 text-amber-300 border-2 border-amber-500/70 hover:bg-slate-800'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-900'
                }`}
              >
                {isNative && (
                  <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950"></span>
                )}
                <span className="text-xs font-mono font-bold block">{hNum}</span>
                <span className="text-[9px] font-sans opacity-80 block truncate">
                  {language === 'ta' ? 'பாவம்' : 'House'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Selected Bhava Full In-Depth Manuscript Prediction Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl space-y-5 relative">
        {isNativeBhava && (
          <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'ta' ? 'உங்களுடைய ஜாதக பாவம்' : 'Your Native Horoscope Bhava'}
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              {language === 'ta' ? `${activeBhavaData.bhava}-ஆம் பாவக ஆய்வு` : `House ${activeBhavaData.bhava} Analysis`}
            </span>
            {isNativeBhava && (
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 sm:hidden">
                {language === 'ta' ? 'உங்கள் ஜாதகம்' : 'Your Chart'}
              </span>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-amber-200 font-serif">
            {language === 'ta' ? activeBhavaData.nameTa : activeBhavaData.nameEn}
          </h3>
          <p className="text-xs text-amber-400/90 font-mono mt-0.5">
            {language === 'ta' ? activeBhavaData.themeTa : activeBhavaData.themeEn}
          </p>
        </div>

        {/* Core Manuscript Revelations */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <span className="text-xs font-bold font-mono text-amber-300 block uppercase tracking-wider">
            {language === 'ta' ? 'ஏட்டுச் சுவடியின் நேரடிப் பலன்கள் & விதிகள்:' : 'Direct Manuscript Declarations:'}
          </span>
          <ul className="space-y-2 text-xs text-slate-200">
            {(language === 'ta' ? activeBhavaData.corePredictionsTa : activeBhavaData.corePredictionsEn).map(
              (pred, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-amber-400 font-bold text-sm mt-[-1px]">◆</span>
                  <span>{pred}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Do's & Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Do's */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl space-y-2.5">
            <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5 uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {language === 'ta' ? 'கண்டிப்பாக செய்ய வேண்டியவை (Do’s)' : 'Essential Recommendations (Do’s)'}
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {(language === 'ta' ? activeBhavaData.doAndDontsTa.dos : activeBhavaData.doAndDontsEn.dos).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-400 font-bold text-xs mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-xl space-y-2.5">
            <span className="text-xs font-bold font-mono text-rose-400 flex items-center gap-1.5 uppercase">
              <XCircle className="w-4 h-4 text-rose-400" />
              {language === 'ta' ? 'அறவே செய்யக் கூடாதவை (Don’ts)' : 'Strict Prohibitions (Don’ts)'}
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {(language === 'ta' ? activeBhavaData.doAndDontsTa.donts : activeBhavaData.doAndDontsEn.donts).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-400 font-bold text-xs mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Career & Wealth and Family & Relationships */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold font-mono text-amber-300 flex items-center gap-1.5 uppercase">
              <Briefcase className="w-4 h-4 text-amber-400" />
              {language === 'ta' ? 'தொழில், வேலை & தன வரவு' : 'Career, Profession & Wealth'}
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {(language === 'ta' ? activeBhavaData.careerFinanceTa : activeBhavaData.careerFinanceEn).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 text-xs mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold font-mono text-indigo-300 flex items-center gap-1.5 uppercase">
              <Users className="w-4 h-4 text-indigo-400" />
              {language === 'ta' ? 'குடும்பம், உறவுகள் & திருமணம்' : 'Family, Marriage & Kinship'}
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {(language === 'ta' ? activeBhavaData.familyRelationshipsTa : activeBhavaData.familyRelationshipsEn).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-indigo-400 text-xs mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Doshas & Temple Pariharam */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 font-mono uppercase">
                {language === 'ta' ? 'முடக்கு நிவர்த்தி பரிகாரத் தலம்:' : 'Mudakku Dissolution Temple:'}
              </span>
            </div>
            <h5 className="text-sm font-bold text-slate-100 font-serif">
              {language === 'ta'
                ? isNativeBhava
                  ? mudakkuPrediction.recommendedTempleTa
                  : activeBhavaData.pariharamTa
                : isNativeBhava
                ? mudakkuPrediction.recommendedTempleEn
                : activeBhavaData.pariharamEn}
            </h5>
            <p className="text-xs text-slate-300">
              {language === 'ta'
                ? isNativeBhava
                  ? `பிரதான தெய்வம்: ${mudakkuPrediction.recommendedDeityTa} • நெய்தீபமேற்றி அர்ச்சனை செய்வதும், இயன்ற தானம் செய்வதும் தோஷத்தை நீக்கும்.`
                  : activeBhavaData.pariharamTa
                : isNativeBhava
                ? `Deity: ${mudakkuPrediction.recommendedDeityEn} • Offering ghee lamps and charitable deeds dissolves this house affliction.`
                : activeBhavaData.pariharamEn}
            </p>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              isNativeBhava ? mudakkuPrediction.recommendedTempleEn : activeBhavaData.pariharamEn
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'வரைபடம் / வழித்தடம்' : 'Google Maps'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
