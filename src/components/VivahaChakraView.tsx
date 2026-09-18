import React, { useState, useMemo } from 'react';
import type { Language, PlanetPosition } from '../types/astrology';
import { calculateVivahaChakra } from '../engine/vivahaChakraEngine';
import { NAKSHATRAS } from '../data/constants';
import {
  Compass,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  Info,
  BookOpen,
  Calendar,
  Heart,
  Home,
  Flame,
  User,
  ShieldCheck,
} from 'lucide-react';

interface VivahaChakraViewProps {
  language: Language;
  sunNakshatraIndex?: number;
  moonNakshatraIndex?: number;
  planets?: PlanetPosition[];
}

export const VivahaChakraView: React.FC<VivahaChakraViewProps> = ({
  language,
  sunNakshatraIndex,
  moonNakshatraIndex,
  planets,
}) => {
  // Determine Sun Nakshatra index from props or default to Avittam (#23, idx 22)
  const defaultSunIdx = useMemo(() => {
    if (typeof sunNakshatraIndex === 'number' && sunNakshatraIndex >= 0 && sunNakshatraIndex <= 26) {
      return sunNakshatraIndex;
    }
    if (planets) {
      const sunPlanet = planets.find((p) => p.name === 'Sun');
      if (sunPlanet) return sunPlanet.nakshatraId;
    }
    return 22; // Avittam / Dhanishta
  }, [sunNakshatraIndex, planets]);

  // Determine Candidate Nakshatra index (Bride / Groom / Moon star)
  const defaultCandIdx = useMemo(() => {
    if (typeof moonNakshatraIndex === 'number' && moonNakshatraIndex >= 0 && moonNakshatraIndex <= 26) {
      return moonNakshatraIndex;
    }
    if (planets) {
      const moonPlanet = planets.find((p) => p.name === 'Moon');
      if (moonPlanet) return moonPlanet.nakshatraId;
    }
    return 13; // Chitra / Chittirai
  }, [moonNakshatraIndex, planets]);

  const [selectedSunIdx, setSelectedSunIdx] = useState<number>(defaultSunIdx);
  const [selectedCandIdx, setSelectedCandIdx] = useState<number>(defaultCandIdx);
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'marriage' | 'valaikaappu' | 'grihapravesam' | 'upanayanam'>('marriage');
  const [highlightedBoxId, setHighlightedBoxId] = useState<number | null>(null);

  const analysis = useMemo(() => {
    return calculateVivahaChakra(selectedSunIdx, selectedCandIdx);
  }, [selectedSunIdx, selectedCandIdx]);

  const activeDetailBox = useMemo(() => {
    if (highlightedBoxId !== null) {
      return analysis.boxes.find((b) => b.id === highlightedBoxId) || analysis.candidateBox;
    }
    return analysis.candidateBox;
  }, [highlightedBoxId, analysis]);

  return (
    <div className="space-y-6">
      {/* 1. Executive Top Banner */}
      <div className="bg-gradient-to-br from-amber-950/90 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Gowri Panchangam & Manuscript Research • விவாக சக்கர முகூர்த்தக் காண்டம்
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-amber-200 font-serif flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-amber-400 animate-spin-slow" />
              {language === 'ta'
                ? 'விவாக சக்கரம் & திசை முகூர்த்த சூத்திரங்கள்'
                : 'Vivaha Chakra & Directional Muhurtha Rules'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {language === 'ta'
                ? 'சூரியன் சஞ்சரிக்கும் நட்சத்திரத்தை அடிப்படையாகக் கொண்டு 9 திசைகளில் 27 நட்சத்திரங்களை அடைத்து, சுப காரியங்களுக்கான நன்மைகளையும் (12 சுப நட்சத்திரங்கள்) தீமைகளையும் (15 விலக்க நட்சத்திரங்கள்) துல்லியமாகக் கணிக்கும் ஏட்டுச் சுவடி முறை.'
                : 'Ancient astrological system mapping all 27 Nakshatras into a 9-directional grid based on the transit Sun Nakshatra, revealing 12 Auspicious stars (✓) and 15 Inauspicious stars (X) for marriage and sacred ceremonies.'}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-amber-500/30">
              <span className="text-xs font-mono font-bold text-amber-300">
                {language === 'ta' ? 'சுப நட்சத்திரங்கள் (✓): 12' : 'Auspicious Stars (✓): 12'}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-xs font-mono font-bold text-rose-400">
                {language === 'ta' ? 'விலக்க நட்சத்திரங்கள் (X): 15' : 'Avoid Stars (X): 15'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {language === 'ta'
                ? `சூரியன் நட்சத்திரம்: ${analysis.sunNakshatraTa}`
                : `Sun Nakshatra: ${analysis.sunNakshatraEn}`}
            </span>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'கோசார சூரிய நட்சத்திரம்' : 'Transit Sun Nakshatra'}
            </span>
            <div className="text-sm font-bold text-amber-300 font-serif">
              {language === 'ta' ? analysis.sunNakshatraTa : analysis.sunNakshatraEn}
            </div>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">
              {language === 'ta' ? 'மையக் கட்டத்தில் (நடு) தொடக்கம்' : 'Placed at Center Box (Box 1)'}
            </span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட நட்சத்திரம்' : 'Selected Candidate Star'}
            </span>
            <div className="text-sm font-bold text-indigo-300 font-serif">
              {language === 'ta' ? analysis.candidateNakshatraTa : analysis.candidateNakshatraEn}
            </div>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">
              {language === 'ta'
                ? `சூரியனிலிருந்து ${analysis.starDistance}-வது நட்சத்திரம்`
                : `${analysis.starDistance}th star from Sun`}
            </span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'சக்கர திசை அமைவு' : 'Vivaha Grid Placement'}
            </span>
            <div className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
              <span>{language === 'ta' ? analysis.candidateBox.directionTa : analysis.candidateBox.directionEn}</span>
              {analysis.isCandidateAuspicious ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ✓ சுபம்
                </span>
              ) : (
                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> X தவிர்
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">
              {language === 'ta' ? `கட்டம் #${analysis.candidateBox.id}` : `Box #${analysis.candidateBox.id}`}
            </span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 shadow-md">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">
              {language === 'ta' ? 'முகூர்த்த யோக மதிப்பெண்' : 'Muhurtha Rating Score'}
            </span>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold font-mono ${analysis.isCandidateAuspicious ? 'text-emerald-400' : 'text-rose-400'}`}>
                {analysis.score}/100
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                analysis.isCandidateAuspicious ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {analysis.isCandidateAuspicious ? (language === 'ta' ? 'உகந்தது' : 'Favorable') : (language === 'ta' ? 'தடை' : 'Unfavorable')}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">
              {language === 'ta' ? 'ஏட்டுச் சுவடி கணிப்பு' : 'Manuscript Standard'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Controls & Star Selectors */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 font-serif">
              {language === 'ta'
                ? 'கோசார சூரியன் & சுபகாரிய நட்சத்திரத் தேர்வு'
                : 'Select Gochara Sun Star & Candidate Muhurtha Star'}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {language === 'ta'
              ? '*சூரியன் ஒரு நட்சத்திரத்தில் ~13-14 நாட்கள் பயணிப்பார்'
              : '*Sun transits a Nakshatra for ~13-14 days'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Select Sun Nakshatra */}
          <div>
            <label className="block text-xs font-mono font-semibold text-amber-300 mb-1.5">
              {language === 'ta' ? '1. கோசார சூரியன் நின்ற நட்சத்திரம்:' : '1. Transit Sun Nakshatra:'}
            </label>
            <select
              value={selectedSunIdx}
              onChange={(e) => setSelectedSunIdx(Number(e.target.value))}
              className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs font-semibold text-amber-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
            >
              {NAKSHATRAS.map((nak) => (
                <option key={nak.id} value={nak.id}>
                  #{nak.id + 1} - {language === 'ta' ? nak.nameTa : nak.nameEn} ({nak.lord})
                </option>
              ))}
            </select>
          </div>

          {/* Select Candidate Nakshatra */}
          <div>
            <label className="block text-xs font-mono font-semibold text-indigo-300 mb-1.5">
              {language === 'ta' ? '2. முகூர்த்தம் / ஜாதகர் நட்சத்திரம்:' : '2. Candidate / Event Star:'}
            </label>
            <select
              value={selectedCandIdx}
              onChange={(e) => setSelectedCandIdx(Number(e.target.value))}
              className="w-full bg-slate-950 border border-indigo-500/30 rounded-xl px-3 py-2 text-xs font-semibold text-indigo-100 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-inner"
            >
              {NAKSHATRAS.map((nak) => (
                <option key={nak.id} value={nak.id}>
                  #{nak.id + 1} - {language === 'ta' ? nak.nameTa : nak.nameEn} ({nak.lord})
                </option>
              ))}
            </select>
          </div>

          {/* Select Event Type */}
          <div>
            <label className="block text-xs font-mono font-semibold text-emerald-300 mb-1.5">
              {language === 'ta' ? '3. சுபகாரிய சடங்கு வகை:' : '3. Auspicious Ceremony Type:'}
            </label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value as any)}
              className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs font-semibold text-emerald-100 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 shadow-inner"
            >
              <option value="marriage">
                {language === 'ta' ? 'ஶ்ரீ திருமண முகூர்த்தம் (Marriage)' : 'Marriage Ceremony'}
              </option>
              <option value="grihapravesam">
                {language === 'ta' ? 'கிரஹப்பிரவேசம் (Housewarming)' : 'Grihapravesam / Housewarming'}
              </option>
              <option value="valaikaappu">
                {language === 'ta' ? 'வளைகாப்பு / சீமந்தம் (Baby Shower)' : 'Valaikaappu / Baby Shower'}
              </option>
              <option value="upanayanam">
                {language === 'ta' ? 'உபநயனம் / பூநூல் சடங்கு (Thread Ceremony)' : 'Upanayanam Sacred Thread'}
              </option>
              <option value="all">
                {language === 'ta' ? 'அனைத்து சுபகாரியங்களும் (General Events)' : 'All Auspicious Deeds'}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Interactive 3x3 Vivaha Chakra Grid Visualizer */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-amber-200 font-serif flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              {language === 'ta' ? 'விவாக சக்கர 9 திசைக் கட்ட அட்டவணை' : 'Vivaha Chakra 9-Direction Grid Matrix'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'ta'
                ? 'சூரியன் நின்ற நட்சத்திரத்தில் இருந்து தொடங்கி வரிசையாக 9 கட்டங்களில் 27 நட்சத்திரங்கள் அடைக்கப்பட்டுள்ளன. கட்டத்தைக் கிளிக் செய்து அதன் பலன்களைக் காணலாம்.'
                : 'Click any direction cell below to inspect its 3 assigned stars and directional phalan.'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              {language === 'ta' ? '✓ சுப கட்டம் (4 திசைகள்)' : '✓ Auspicious (4 Boxes)'}
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              {language === 'ta' ? 'X விலக்க கட்டம் (5 திசைகள்)' : 'X Avoid (5 Boxes)'}
            </span>
          </div>
        </div>

        {/* 3x3 Grid Display */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto p-2 bg-slate-950/60 rounded-2xl border border-slate-800">
          {/* We render 9 boxes in 3 rows:
              Row 1: NW (7), N (8), NE (9)
              Row 2: W (6), Center (1), E (2)
              Row 3: SW (5), S (4), SE (3)
          */}
          {[
            // Row 1
            analysis.boxes.find((b) => b.id === 7)!, // NW
            analysis.boxes.find((b) => b.id === 8)!, // N
            analysis.boxes.find((b) => b.id === 9)!, // NE
            // Row 2
            analysis.boxes.find((b) => b.id === 6)!, // W
            analysis.boxes.find((b) => b.id === 1)!, // Center
            analysis.boxes.find((b) => b.id === 2)!, // E
            // Row 3
            analysis.boxes.find((b) => b.id === 5)!, // SW
            analysis.boxes.find((b) => b.id === 4)!, // S
            analysis.boxes.find((b) => b.id === 3)!, // SE
          ].map((box) => {
            const isSelectedCandidateBox = box.id === analysis.candidateBox.id;
            const isHoveredOrActive = activeDetailBox.id === box.id;
            const isAuspicious = box.status === 'auspicious';

            return (
              <button
                key={box.id}
                onClick={() => setHighlightedBoxId(box.id)}
                className={`relative min-h-[120px] md:min-h-[140px] p-3 rounded-xl border-2 transition-all duration-300 flex flex-col justify-between text-left group overflow-hidden ${
                  isSelectedCandidateBox
                    ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-[1.02] shadow-2xl z-10'
                    : ''
                } ${
                  isAuspicious
                    ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 border-emerald-500/50 hover:border-emerald-400 shadow-emerald-950/50'
                    : 'bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-slate-950 border-rose-500/40 hover:border-rose-400 shadow-rose-950/50'
                } ${isHoveredOrActive ? 'border-amber-400 shadow-xl' : ''}`}
              >
                {/* Active Indicator Badge */}
                {isSelectedCandidateBox && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-bold font-mono px-2 py-0.5 rounded-bl-lg shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {language === 'ta' ? 'உங்களின் நட்சத்திரம்' : 'Your Star'}
                  </div>
                )}

                {/* Box Header: Direction & Status */}
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      #{box.id} • {language === 'ta' ? box.directionTa : box.directionEn}
                    </span>
                  </div>

                  {isAuspicious ? (
                    <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ✓ சுபம்
                    </span>
                  ) : (
                    <span className="text-xs font-bold font-mono text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40 flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-rose-400" />
                      X தவிர்
                    </span>
                  )}
                </div>

                {/* 3 Nakshatras List inside Box */}
                <div className="my-2 space-y-1">
                  {box.nakshatraIndices.map((nakIdx) => {
                    const nak = NAKSHATRAS[nakIdx];
                    const isTargetStar = nakIdx === selectedCandIdx;
                    const isSunStar = nakIdx === selectedSunIdx;

                    return (
                      <div
                        key={nakIdx}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded flex items-center justify-between font-serif transition-colors ${
                          isTargetStar
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                            : isSunStar
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                            : 'bg-slate-900/60 text-slate-200 group-hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">
                          {language === 'ta' ? nak.nameTa : nak.nameEn}
                        </span>
                        {isSunStar && (
                          <span className="text-[8px] font-mono bg-amber-500 text-slate-950 px-1 rounded ml-1 font-bold">
                            சூரியன்
                          </span>
                        )}
                        {isTargetStar && (
                          <span className="text-[8px] font-mono bg-slate-950 text-amber-300 px-1 rounded ml-1 font-bold">
                            தேர்வு
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer preview */}
                <div className="text-[10px] text-slate-400 truncate font-mono">
                  {language === 'ta' ? box.predictionTa : box.predictionEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Box Directional Phalan Details & Gaja Yoga Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Detailed Direction Phalan Card */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-200 font-serif">
                {language === 'ta'
                  ? `திசை #${activeDetailBox.id}: ${activeDetailBox.directionTa} (${activeDetailBox.directionEn}) பலன்கள்`
                  : `Direction #${activeDetailBox.id}: ${activeDetailBox.directionEn} Detailed Phalan`}
              </h3>
            </div>
            {activeDetailBox.status === 'auspicious' ? (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'ta' ? '✓ சுப காரியத்திற்கு உகந்த கட்டம்' : '✓ Highly Auspicious Box'}
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/40 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                {language === 'ta' ? 'X தவிர்க்கப்படவேண்டிய கட்டம்' : 'X Inauspicious Box'}
              </span>
            )}
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              {language === 'ta' ? 'ஏட்டுச் சுவடி திசைப்பலன் விளக்கம்:' : 'Manuscript Directional Prediction:'}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-serif">
              {language === 'ta' ? activeDetailBox.predictionTa : activeDetailBox.predictionEn}
            </p>
          </div>

          {/* 3 Nakshatras Breakdown inside active box */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-300">
              {language === 'ta' ? 'இந்த கட்டத்தில் அடங்கும் 3 நட்சத்திரங்கள்:' : '3 Nakshatras Mapped in this Box:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeDetailBox.nakshatraIndices.map((nakIdx) => {
                const nak = NAKSHATRAS[nakIdx];
                const isSun = nakIdx === selectedSunIdx;
                const isCand = nakIdx === selectedCandIdx;

                return (
                  <div
                    key={nakIdx}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      isCand
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                        : isSun
                        ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">#{nak.id + 1}</span>
                        {isCand && (
                          <span className="text-[9px] font-bold font-mono bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                            தேர்வு (Your Star)
                          </span>
                        )}
                        {isSun && !isCand && (
                          <span className="text-[9px] font-bold font-mono bg-indigo-500 text-white px-1.5 py-0.5 rounded">
                            சூரியன் (Sun)
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold font-serif mt-1">
                        {language === 'ta' ? nak.nameTa : nak.nameEn}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-2">
                      {language === 'ta' ? `அதிபதி: ${nak.lord}` : `Lord: ${nak.lord}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Gaja Yoga Event Prohibitions Alert Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-amber-200 font-serif">
                {language === 'ta' ? 'கஜயோக சுபகாரியத் தடை விதிகளின் நிலை' : 'Gaja Yoga Prohibitions Status'}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ta'
                ? `சூரியன் நின்ற நட்சத்திரத்திலிருந்து எண்ணும் போது (தற்போது ${analysis.starDistance}-வது நட்சத்திரம்), குறிப்பிட்ட சடங்குகளுக்குச் சுவடியில் உள்ள தடை விதிகள்:`
                : `Counting from Sun Nakshatra (currently Star #${analysis.starDistance}), specific ceremonial prohibitions apply:`}
            </p>

            <div className="space-y-2.5">
              {analysis.eventProhibitions.map((rule) => {
                const isMatchesSelected =
                  selectedEventType === 'all' || selectedEventType === rule.targetEvent;

                return (
                  <div
                    key={rule.targetEvent}
                    className={`p-3 rounded-xl border transition-all ${
                      rule.isProhibited
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 opacity-80'
                    } ${isMatchesSelected ? 'ring-1 ring-amber-400/50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {rule.targetEvent === 'marriage' && <Heart className="w-4 h-4 text-rose-400" />}
                        {rule.targetEvent === 'grihapravesam' && <Home className="w-4 h-4 text-amber-400" />}
                        {rule.targetEvent === 'valaikaappu' && <User className="w-4 h-4 text-purple-400" />}
                        {rule.targetEvent === 'upanayanam' && <Flame className="w-4 h-4 text-amber-400" />}
                        <span className="text-xs font-bold font-serif">
                          {language === 'ta' ? rule.titleTa : rule.titleEn}
                        </span>
                      </div>
                      {rule.isProhibited ? (
                        <span className="text-[9px] font-bold font-mono bg-rose-500 text-white px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                          {language === 'ta' ? 'தடை!' : 'PROHIBITED!'}
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                          {language === 'ta' ? 'அனுமதி' : 'ALLOWED'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] mt-1.5 leading-relaxed text-slate-300">
                      {language === 'ta' ? rule.descriptionTa : rule.descriptionEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-300">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {language === 'ta'
                ? 'திருமண முகூர்த்தத்திற்கு 60% ஜாதகப் பொருத்தமும் 40% இந்த விவாக சக்கர பொருத்தமும் அவசியமாகும்.'
                : 'Wedding Muhurtha requires 60% Horoscope Match + 40% Vivaha Chakra Alignment.'}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Shastra Manuscript Ancient Guidelines */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-amber-200 font-serif">
            {language === 'ta'
              ? 'ஏட்டுச் சுவடி விவாக சக்கர முக்கிய விதிகளும் விளக்கங்களும்'
              : 'Ancient Manuscript Vivaha Chakra Principles & Guidelines'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              1. கௌரி பஞ்சாங்கம் & வாஸ்து தொடர்பு:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ta'
                ? 'விவாக சக்கரம் என்பது கௌரி பஞ்சாங்கம், யாமக்கோள் ஆருடம், பஞ்சபட்சி சாஸ்திரம் மற்றும் வாஸ்து சாஸ்திரத்தின் அடிப்படை அங்கம் ஆகும். வட இந்தியாவில் பயன்படுத்தப்படும் கோட்டை சக்கரத்திற்கு இணையான தென்னிந்திய முறையே இந்த விவாக சக்கரம்.'
                : 'Vivaha Chakra forms the foundational matrix of Gowri Panchanga, Yamakkol Arudha, Panchapakshi Shastra, and Vastu. It serves as the Southern Indian counterpart to North India’s Kottai Chakra.'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              2. சித்திரை மாத முகூர்த்த எச்சரிக்கை:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ta'
                ? 'பொதுவாக சித்திரை மாதத்தில் திருமணம் செய்யக்கூடாது என்பார்கள். அதற்கு முக்கிய காரணம் இந்த விவாக சக்கரத்தில் சித்திரை மாத சூரிய சஞ்சாரத்தின் போது திருமண நட்சத்திரங்கள் X (விலக்க) கட்டத்தில் வருவதே ஆகும்.'
                : 'Chithirai month weddings are traditionally cautioned because during Sun transit in Chithirai, key marriage stars fall into the X (Inauspicious) boxes of Vivaha Chakra.'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              3. ஜாதகம் இல்லாதவர்களுக்கான முகூர்த்தத் தேர்வு:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ta'
                ? 'ஜாதகம் இல்லாதவர்கள் அல்லது பிறந்த நேரம் துல்லியமாக தெரியாதவர்களுக்கு இந்த விவாக சக்கரத்தை மட்டுமே பயன்படுத்தி சுப முகூர்த்த நாட்களைத் தேர்வு செய்து தரலாம்.'
                : 'For individuals lacking accurate birth charts or birth times, the Vivaha Chakra system provides an infallible, standalone framework for selecting auspicious Muhurtha dates.'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              4. 60% - 40% முகூர்த்த விதி:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ta'
                ? 'ஒரு சுப நிகழ்வுக்கு ஜாதகப் பொருத்தம் 60% பங்களிக்கிறது என்றால், விவாக சக்கரத்தின் சுப திசை பொருத்தம் 40% பங்களிக்கிறது. இரண்டிலும் X கெடுதல் வந்தால் 100% பிரச்சனை நிச்சயமாக நடக்கும்.'
                : 'Horoscope alignment accounts for 60% of event success, while Vivaha Chakra alignment accounts for 40%. If both show negative markers, challenges are 100% guaranteed.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
