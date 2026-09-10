import React, { useState } from 'react';
import type { Language } from '../types/astrology';
import type { analyzeRahuTransitForHoroscope } from '../data/rahuTransitPredictions';
import {
  Compass, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2,
  Info, ArrowRight, Zap, BookOpen, Flame, Sun, Moon, Heart, Briefcase
} from 'lucide-react';

interface GocharaRahuViewProps {
  rahuAnalysis: ReturnType<typeof analyzeRahuTransitForHoroscope>;
  language: Language;
}

const PLANET_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sun,
  Moon,
  Mars: Flame,
  Mercury: BookOpen,
  Jupiter: Sparkles,
  Venus: Heart,
  Saturn: Briefcase,
  Rahu: Compass,
  Ketu: ShieldAlert,
  Mandhi: AlertTriangle,
};

const ZODIAC_NAMES_TA = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
  'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
  'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

const ZODIAC_NAMES_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const GocharaRahuView: React.FC<GocharaRahuViewProps> = ({ rahuAnalysis, language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'my_chart' | 'planets' | 'bhavas' | 'rules'>('my_chart');
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string>('Sun');
  const [selectedBhavaKey, setSelectedBhavaKey] = useState<number>(1);

  const currentSignName = language === 'ta'
    ? ZODIAC_NAMES_TA[rahuAnalysis.currentRahuSignId]
    : ZODIAC_NAMES_EN[rahuAnalysis.currentRahuSignId];

  const activatedSignsDisplay = rahuAnalysis.activatedSignIds
    .map((id) => (language === 'ta' ? ZODIAC_NAMES_TA[id] : ZODIAC_NAMES_EN[id]))
    .join(', ');

  const currentPlanetPred = rahuAnalysis.allPlanetPredictions[selectedPlanetKey] || rahuAnalysis.allPlanetPredictions['Sun'];
  const currentBhavaPred = rahuAnalysis.allBhavaPredictions[selectedBhavaKey] || rahuAnalysis.allBhavaPredictions[1];

  return (
    <div className="space-y-6">
      {/* Hero Banner: Gochara Rahu Dynamic Operation */}
      <div className="bg-gradient-to-br from-purple-950/90 via-slate-900/90 to-amber-950/60 border border-purple-500/40 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/50 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest">
                நாடி ஜோதிட ரகசியம் • Nadi Astrology Treatise
              </span>
              <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                1, 5, 7, 9 Aspect Rule
              </span>
            </div>
            <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
              {language === 'ta' ? 'கோள்சார ராகு பலன்கள் (Nadi Rahu Transit Predictions)' : 'Gochara Rahu: Nadi Transit Predictions'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {language === 'ta'
                ? 'கோள்சார ராகு தான் நின்ற வீட்டையும், அதன் திரிகோண வீடுகளையும் (5, 9), சமசப்தம வீட்டையும் (7) இயக்கி மனித வாழ்வில் வியக்கத்தக்க மாற்றங்களை நிகழ்த்துகிறார்.'
                : 'Transit Rahu actively triggers the house of placement (1st), its trines (5th, 9th), and opposite sign (7th), manifesting pivotal life milestones and inquiries.'}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 bg-slate-950/70 p-3 rounded-xl border border-purple-500/30">
            <span className="text-[10px] font-mono text-slate-400">
              {language === 'ta' ? 'தற்போது ராகு நிற்கும் ராசி' : 'Current Transit Rahu'}
            </span>
            <span className="text-base font-bold text-amber-300 font-serif">
              {currentSignName}
            </span>
            <span className="text-[11px] text-purple-300 font-mono">
              {language === 'ta' ? 'இயக்கும் வீடுகள் (1, 5, 7, 9):' : 'Active Trines & 7th:'}
            </span>
            <span className="text-xs text-slate-200 font-bold font-mono">
              {activatedSignsDisplay}
            </span>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('my_chart')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'my_chart'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>
              {language === 'ta'
                ? `என் ஜாதகத்தில் ராகு இயக்கும் கிரகங்கள் (${rahuAnalysis.activatedPlanets.length})`
                : `My Chart Rahu Triggers (${rahuAnalysis.activatedPlanets.length})`}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('planets')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'planets'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'கிரகங்கள் மீது ராகு (சூரியன் - மாந்தி)' : 'Rahu Over Natal Planets'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bhavas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'bhavas'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? '12 பாவகங்கள் மீது ராகு (1 - 12)' : 'Rahu Over 12 Bhavas'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === 'rules'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'நாடி சூத்திரங்கள் & முக்கிய எச்சரிக்கைகள்' : 'Nadi Rules & Precautions'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: My Chart Triggers */}
      {activeSubTab === 'my_chart' && (
        <div className="space-y-6">
          {/* Activated Natal Planets */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {language === 'ta'
                  ? 'தற்போது கோள்சார ராகுவால் இயக்கப்படும் உங்கள் பிறப்பு கிரகங்கள்'
                  : 'Your Natal Planets Currently Energized by Transit Rahu (1, 5, 7, 9)'}
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {rahuAnalysis.activatedPlanets.length} {language === 'ta' ? 'கிரகங்கள் தொடர்பு' : 'Planets Connected'}
              </span>
            </div>

            {rahuAnalysis.activatedPlanets.length === 0 ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center text-slate-400 text-xs">
                {language === 'ta'
                  ? 'தற்போது ராகு இயக்கும் ராசிகளில் (1, 5, 7, 9) உங்கள் பிறப்பு கிரகங்கள் அமையவில்லை. இருப்பினும் உங்கள் பாவகங்கள் தொடர்ந்து இயக்கத்தில் இருக்கும் (கீழே காண்க).'
                  : 'No natal planets currently reside in the 1st, 5th, 7th, or 9th signs from Transit Rahu. However, your corresponding Bhavas remain actively energized below.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rahuAnalysis.activatedPlanets.map((item, idx) => {
                  const IconC = PLANET_ICON_MAP[item.planet.name] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 hover:border-amber-400 transition-all shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                              <IconC className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-slate-100 font-serif">
                                {language === 'ta' ? item.planet.nameTa : item.planet.name}
                              </h5>
                              <span className="text-[11px] text-amber-400 font-mono block">
                                {language === 'ta' ? item.aspectTypeTa : item.aspectTypeEn}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-mono text-slate-300 block">
                              {language === 'ta' ? item.planet.signNameTa : item.planet.signNameEn} ({item.planet.signDegree.toFixed(1)}°)
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono">
                              {language === 'ta' ? `${item.planet.house}-ம் பாவம்` : `House ${item.planet.house}`}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-amber-200/90 font-medium mb-3 italic">
                          "{language === 'ta' ? item.prediction.summaryTa : item.prediction.summaryEn}"
                        </p>

                        <div className="space-y-1.5 mb-3">
                          <span className="text-[11px] font-bold text-emerald-400 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === 'ta' ? 'நடைபெறும் முக்கிய பலன்கள்:' : 'Manifesting Events:'}
                          </span>
                          <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc marker:text-emerald-400">
                            {(language === 'ta' ? item.prediction.predictionsTa : item.prediction.predictionsEn)
                              .slice(0, 4)
                              .map((point, pIdx) => (
                                <li key={pIdx} className="leading-relaxed">
                                  {point}
                                </li>
                              ))}
                          </ul>
                        </div>

                        {item.prediction.cautionsTa.length > 0 && (
                          <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-2.5 mt-2">
                            <span className="text-[10px] font-bold text-red-400 font-mono flex items-center gap-1 mb-1">
                              <AlertTriangle className="w-3 h-3" />
                              {language === 'ta' ? 'கவனிக்க வேண்டிய எச்சரிக்கைகள்:' : 'Precautions to Observe:'}
                            </span>
                            <p className="text-[11px] text-red-200/90 leading-relaxed">
                              {language === 'ta' ? item.prediction.cautionsTa[0] : item.prediction.cautionsEn[0]}
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPlanetKey(item.planet.name);
                          setActiveSubTab('planets');
                        }}
                        className="mt-3 w-full py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-lg text-[11px] text-amber-300 font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        <span>{language === 'ta' ? 'அனைத்து பலன்களையும் காண்க' : 'View Full Details & Warnings'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Activated Natal Bhavas from Lagna */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                {language === 'ta'
                  ? 'உங்கள் லக்னத்திற்கு ராகு இயக்கும் பாவகங்கள் (வீடுகள்)'
                  : 'Your Natal Bhavas (Houses) Activated by Transit Rahu'}
              </h4>
              <span className="text-[11px] font-mono text-purple-300">
                {language === 'ta' ? '4 வீடுகள் இயக்கத்தில் உள்ளன' : '4 Houses Under Impact'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {rahuAnalysis.activatedBhavas.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedBhavaKey(item.houseNumber);
                    setActiveSubTab('bhavas');
                  }}
                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 p-3.5 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {language === 'ta' ? `${item.houseNumber}-ஆம் பாவம்` : `House ${item.houseNumber}`}
                    </span>
                    <span className="text-[10px] text-purple-300 font-mono">
                      {language === 'ta' ? ZODIAC_NAMES_TA[item.signId] : ZODIAC_NAMES_EN[item.signId]}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-200 line-clamp-1 mb-1 font-serif">
                    {language === 'ta' ? item.prediction.significanceTa : item.prediction.significanceEn}
                  </h5>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'ta' ? item.prediction.predictionsTa[0] : item.prediction.predictionsEn[0]}
                  </p>

                  <div className="mt-2 text-[10px] text-amber-400/80 font-mono flex items-center gap-1">
                    <span>{language === 'ta' ? 'விவரம் பார்க்க' : 'Explore Bhava'}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Explore All Planets */}
      {activeSubTab === 'planets' && (
        <div className="space-y-5">
          {/* Planet Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {Object.keys(rahuAnalysis.allPlanetPredictions).map((pKey) => {
              const p = rahuAnalysis.allPlanetPredictions[pKey];
              const IconP = PLANET_ICON_MAP[pKey] || Sparkles;
              const isSelected = selectedPlanetKey === pKey;

              return (
                <button
                  key={pKey}
                  onClick={() => setSelectedPlanetKey(pKey)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <IconP className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? p.planetTa : p.planetEn}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Planet Full View */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-base font-bold text-amber-300 font-serif">
                  {language === 'ta' ? currentPlanetPred.titleTa : currentPlanetPred.titleEn}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ta' ? currentPlanetPred.summaryTa : currentPlanetPred.summaryEn}
                </p>
              </div>

              {currentPlanetPred.specialNoteTa && (
                <div className="bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl text-right max-w-sm">
                  <span className="text-[10px] font-bold font-mono text-purple-300 block">
                    {language === 'ta' ? 'விசேஷ விதி / Special Note:' : 'Special Nadi Rule:'}
                  </span>
                  <p className="text-[11px] text-purple-200">
                    {language === 'ta' ? currentPlanetPred.specialNoteTa : currentPlanetPred.specialNoteEn}
                  </p>
                </div>
              )}
            </div>

            {/* Predictions List */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ta' ? 'நிகழும் வாழ்க்கை பலன்கள் (Manifestations):' : 'Manifestations & Life Events:'}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(language === 'ta' ? currentPlanetPred.predictionsTa : currentPlanetPred.predictionsEn).map(
                  (text, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-200 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                      <span>{text}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Cautions List */}
            {currentPlanetPred.cautionsTa.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h5 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'ta' ? 'முக்கிய எச்சரிக்கைகள் & தவிர்ப்பவை (Cautions & Care):' : 'Crucial Cautions & Avoidance:'}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(language === 'ta' ? currentPlanetPred.cautionsTa : currentPlanetPred.cautionsEn).map(
                    (caution, i) => (
                      <div
                        key={i}
                        className="bg-rose-950/20 p-3 rounded-xl border border-rose-500/20 text-xs text-rose-200 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                        <span>{caution}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Explore All 12 Bhavas */}
      {activeSubTab === 'bhavas' && (
        <div className="space-y-5">
          {/* Bhava Selector Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hNum) => {
              const isSelected = selectedBhavaKey === hNum;
              return (
                <button
                  key={hNum}
                  onClick={() => setSelectedBhavaKey(hNum)}
                  className={`py-2 rounded-xl text-xs font-bold font-mono transition-all text-center ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{hNum}</span>
                  <span className="block text-[9px] font-sans opacity-75">
                    {language === 'ta' ? 'பாவம்' : 'House'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Bhava Details */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {language === 'ta' ? `${selectedBhavaKey}-ஆம் பாவம்` : `House ${selectedBhavaKey}`}
                </span>
                <h4 className="text-base font-bold text-slate-100 font-serif">
                  {language === 'ta' ? currentBhavaPred.titleTa : currentBhavaPred.titleEn}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ta' ? currentBhavaPred.significanceTa : currentBhavaPred.significanceEn}
              </p>
            </div>

            {/* Predictions */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {language === 'ta' ? 'பாவக பலன்கள் (House Manifestations):' : 'House Predictions:'}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(language === 'ta' ? currentBhavaPred.predictionsTa : currentBhavaPred.predictionsEn).map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cautions */}
            {currentBhavaPred.cautionsTa && currentBhavaPred.cautionsTa.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h5 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {language === 'ta' ? 'எச்சரிக்கைகள் & தடைகள் (Obstacles & Warnings):' : 'Cautions & Warnings:'}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(language === 'ta' ? currentBhavaPred.cautionsTa : currentBhavaPred.cautionsEn || []).map((caution, i) => (
                    <div
                      key={i}
                      className="bg-rose-950/20 p-3 rounded-xl border border-rose-500/20 text-xs text-rose-200 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                      <span>{caution}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Rules & Precautions Highlights */}
      {activeSubTab === 'rules' && (
        <div className="space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              {language === 'ta' ? 'கோள்சார ராகுவின் நாடி ஜோதிட அடிப்படை விதிகள்' : 'Nadi Astrology Principles of Transit Rahu'}
            </h4>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/20 text-xs text-slate-200 leading-relaxed">
              <p className="font-bold text-amber-300 mb-1">
                {language === 'ta' ? 'திரிகோண & சப்தம பார்வை இயக்கம் (1, 5, 7, 9 விதி):' : 'The 1st, 5th, 7th, 9th Activation Rule:'}
              </p>
              <p>{language === 'ta' ? rahuAnalysis.corePrinciple.ruleTa : rahuAnalysis.corePrinciple.ruleEn}</p>
              <p className="mt-2 text-slate-400 italic">
                {language === 'ta' ? rahuAnalysis.corePrinciple.exampleTa : rahuAnalysis.corePrinciple.exampleEn}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold font-mono text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {language === 'ta' ? 'விபத்துக்களை பார்த்தல் தவிர்த்தல்' : 'Accident Sighting Caution'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'செவ்வாய் மற்றும் சனி மீது ராகு செல்வது விபத்துகளை பார்க்க வைக்கும். இதை பார்ப்பதை தவிர்க்கவும்; நினைவில் வந்து தொந்தரவு செய்து கொண்டே இருக்கும்.'
                    : 'When Rahu transits over natal Mars and Saturn, it tends to make native witness accidents. Strongly avoid viewing road accidents directly as it lingers in the subconscious mind.'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold font-mono text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  {language === 'ta' ? 'பழைய தேன் பாட்டில் தோஷ நிவர்த்தி' : 'Honey Bottle Remedial Tip'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'குரு மற்றும் சனி சேர்ந்துள்ள ஜாதகர் வீட்டில் ராகு செல்லும்போது பழைய தேன் பாட்டில் இருக்கும். அது தோஷமுண்டாக்கும், அதை உடனே தூக்கி எறிந்து விடவும்.'
                    : 'If Jupiter and Saturn are conjunct in birth chart and transit Rahu passes over them, old forgotten honey bottles inside the home induce subtle affliction. Immediately discard them.'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold font-mono text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'ta' ? 'மின்சாரம் மற்றும் நீர் எச்சரிக்கைகள்' : 'Water & Electrical Precautions'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'சந்திரன் மீது செல்லும்போது மழையில் நனையக் கூடாது, காட்டாறுகளை கடக்கக் கூடாது. செவ்வாய் மீது செல்லும்போது ஈரக் கையால் மின்சாதனங்களை தொடக்கூடாது, ஷாக் அடிக்கும் அபாயம்.'
                    : 'When transiting Moon: avoid getting drenched in rain or crossing flooded streams. When transiting Mars: strictly avoid touching electrical items with wet hands to avoid electric shocks.'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold font-mono text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                  {language === 'ta' ? 'ஜாமீன் மற்றும் வாக்குறுதி தவிர்த்தல்' : 'No Financial Guarantor / Surety'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'புதன் அல்லது 2 மற்றும் 3-ஆம் பாவம் மீது ராகு சஞ்சரிக்கும் காலத்தில் யாருக்கும் வாக்குறுதி கொடுக்கக் கூடாது, கடன் ஜாமீன் போடக் கூடாது. மீறினால் பெருந்தொல்லை ஏற்படும்.'
                    : 'When Rahu transits over natal Mercury or 2nd/3rd houses, never issue oral commitments and strictly never sign as financial guarantor/bail surety for anyone.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
