import React, { useState } from 'react';
import type { TithiSoonyaReport, Language } from '../types/astrology';
import {
  Moon,
  Sun,
  Compass,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Zap,
  CheckCircle2,
  Flame,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { TITHI_SOONYA_DOCTRINES } from '../data/tithiSoonyaBadhakaData';

interface TithiPalangalViewProps {
  report: TithiSoonyaReport;
  language: Language;
}

export const TithiPalangalView: React.FC<TithiPalangalViewProps> = ({
  report,
  language,
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'bhavas' | 'grahas' | 'doctrines' | 'remedies'>('overview');
  const [selectedBhava, setSelectedBhava] = useState<number>(
    report.soonyaBhavas.length > 0 ? report.soonyaBhavas[0] : 1
  );
  const [selectedGraha, setSelectedGraha] = useState<string>('Sun');

  const currentBhavaAnalysis =
    report.bhavasAnalysis.find((b) => b.bhava === selectedBhava) || report.bhavasAnalysis[0];

  const currentGrahaAnalysis =
    report.grahasAnalysis.find((g) => g.planet === selectedGraha) || report.grahasAnalysis[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900/95 to-slate-950 border border-amber-500/40 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Authentic Palm-Leaf Shastra • ஏட்டுச் சுவடி திதி சூன்ய & பாதக ஆய்வு
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                {report.paksha === 'Shukla' ? 'வளர்பிறை (Shukla)' : 'தேய்பிறை (Krishna)'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-amber-200 font-serif flex items-center gap-2.5">
              <Moon className="w-6 h-6 text-indigo-400 animate-pulse" />
              {language === 'ta'
                ? 'திதி பலன்கள் & திதி சூன்யம், பாதக ஸ்தான முழு ஆய்வு'
                : 'Thithi Palangal – Thithi Soonya & Badhaka Sthana Manuscript Shastra'}
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {language === 'ta'
                ? 'நம் முன்னோர்களின் கர்மவினை நல்லது கெட்டது நாம் அனுபவித்தே தீரவேண்டும். சூன்ய வீட்டில் உங்கள் செல்வம் மறைந்து இருக்கும். முதலில் சோதனைகளும் பின்னர் வியத்தகு யோகமும் தரும் சுவடிப் பலன்கள்.'
                : 'Ancient Nadi manuscript revelations on Thithi Soonya (void signs) and Badhaka Sthana. Early struggles resolve ancestral debts, unlocking buried wealth and enduring triumph.'}
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-mono font-bold text-amber-200">
                {language === 'ta' ? report.tithiNameTa : report.tithiNameEn}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>{language === 'ta' ? 'பாதகம்:' : 'Badhaka:'}</span>
              <span className="text-rose-300 font-bold">
                {report.badhakaBhava}-ஆம் பாவம் ({report.badhakaSignNameTa})
              </span>
            </div>
          </div>
        </div>

        {/* 2. Four Key Blueprint Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          {/* Card 1: Tithi & Paksha */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-500/30 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {language === 'ta' ? 'ஜென்ம திதி & பக்ஷம்' : 'Birth Tithi & Paksha'}
              </span>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-sm font-bold text-indigo-200 font-serif">
              {language === 'ta' ? report.tithiNameTa : report.tithiNameEn}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">
              {language === 'ta'
                ? report.paksha === 'Shukla'
                  ? 'வளர்பிறை: 70% உயிர் காரக பாதிப்பு, 30% பொருளாதாரம்'
                  : 'தேய்பிறை: இளமையில் பணக்கஷ்டம், பிற்பகுதியில் யோகம்'
                : report.paksha === 'Shukla'
                  ? 'Waxing: 70% relational impact, 30% finance'
                  : 'Waning: Early financial trials, later riches'}
            </p>
          </div>

          {/* Card 2: Soonya Signs & Bhavas */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/30 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {language === 'ta' ? 'திதி சூன்ய ராசிகள் & பாவகங்கள்' : 'Soonya Signs & Bhavas'}
              </span>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-amber-300 font-serif">
              {report.soonyaSignsTa.length > 0 ? report.soonyaSignsTa.join(', ') : 'இல்லை'}
            </div>
            <div className="text-[10px] text-amber-400/90 font-mono mt-1">
              {language === 'ta'
                ? `லக்ன பாவகங்கள்: ${report.soonyaBhavas.map((b) => `${b}-ஆம் பாவம்`).join(', ')}`
                : `Houses from Lagna: ${report.soonyaBhavas.map((b) => `H${b}`).join(', ')}`}
            </div>
          </div>

          {/* Card 3: Badhaka Sthana */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-rose-500/30 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {language === 'ta' ? 'பாதக ஸ்தானம் & அதிபதி' : 'Badhaka House & Lord'}
              </span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-sm font-bold text-rose-300 font-serif">
              {language === 'ta'
                ? `${report.badhakaBhava}-ஆம் பாவம் (${report.badhakaSignNameTa})`
                : `House ${report.badhakaBhava} (${report.badhakaSignNameEn})`}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              {language === 'ta'
                ? `அதிபதி: ${report.badhakadhipatiTa} (${report.badhakadhipatiPlacementBhava}-ல் அமர்வு)`
                : `Lord: ${report.badhakadhipati} (in H${report.badhakadhipatiPlacementBhava})`}
            </div>
          </div>

          {/* Card 4: Occupancy & Mitigations */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-500/30 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {language === 'ta' ? 'சூன்ய/பாதக கிரகங்கள்' : 'Planets Occupying'}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xs font-bold text-emerald-300">
              {report.planetsInSoonya.length > 0
                ? report.planetsInSoonya.map((p) => p.name).join(', ')
                : language === 'ta'
                  ? 'கிரகங்கள் இல்லை'
                  : 'None in Soonya'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              {report.activeMitigationsTa.length > 0
                ? `${report.activeMitigationsTa.length} ${language === 'ta' ? 'விலக்குகள் செயல்படுகின்றன' : 'Mitigations Active'}`
                : language === 'ta'
                  ? 'நேரடி கர்மா'
                  : 'Direct Karma Active'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSection('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'overview'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{language === 'ta' ? 'சுருக்கம் & கர்ம விதி' : 'Overview & Karmic Blueprint'}</span>
        </button>

        <button
          onClick={() => setActiveSection('bhavas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'bhavas'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'ta' ? '12 பாவக முழு ஆய்வு' : '12 Bhavas Shastra Analysis'}</span>
        </button>

        <button
          onClick={() => setActiveSection('grahas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'grahas'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>{language === 'ta' ? '9 கிரக காரகத்துவ பாதிப்பு' : '9 Planetary Karakas Affected'}</span>
        </button>

        <button
          onClick={() => setActiveSection('doctrines')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'doctrines'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'ta' ? 'ஏட்டுச் சுவடி சூட்சும விதிகள்' : 'Palm-Leaf Shastra Doctrines'}</span>
        </button>

        <button
          onClick={() => setActiveSection('remedies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'remedies'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>{language === 'ta' ? 'வாழ்வியல் எச்சரிக்கைகளும் பரிகாரங்களும்' : 'Vital Cautions & Remedies'}</span>
        </button>
      </div>

      {/* 4. Section Content */}
      {/* SECTION 1: OVERVIEW & KARMIC BLUEPRINT */}
      {activeSection === 'overview' && (
        <div className="space-y-5">
          {/* Critical Warnings Banner */}
          {report.criticalWarningsTa.length > 0 && (
            <div className="bg-rose-950/60 border border-rose-500/40 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-3 text-rose-300 font-bold font-serif text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />
                <span>
                  {language === 'ta'
                    ? 'உங்கள் ஜாதகத்திற்குரிய அதிமுக்கிய வாழ்வியல் எச்சரிக்கைகள்'
                    : 'Critical Astrological Life Cautions for Your Horoscope'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(language === 'ta' ? report.criticalWarningsTa : report.criticalWarningsEn).map(
                  (warn, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 p-3 rounded-xl border border-rose-500/30 text-xs text-rose-100 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-rose-400 text-sm mt-0.5 font-bold">⚠</span>
                      <span>{warn}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Paksha Impact & Lagna Vinai Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-300 font-bold font-serif text-sm mb-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>{language === 'ta' ? report.pakshaTitleTa : report.pakshaTitleEn}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {language === 'ta' ? report.pakshaImpactTa : report.pakshaImpactEn}
              </p>
              <div className="mt-3 text-[11px] text-amber-300/90 font-mono">
                {report.paksha === 'Shukla'
                  ? 'உயிர் பாதிப்பு வரும் போது பொருளாதாரம் அதிகரிக்கும் சூட்சுமம்.'
                  : 'இளமை கஷ்டங்கள் முன்னோர்கள் வினையை முழுமையாக கழித்துவிடும்.'}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-serif text-sm mb-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'ta'
                    ? `லக்ன கர்மத் தொடர்பு: ${report.lagnaTypeTa}`
                    : `Lagna Karmic Root: ${report.lagnaType} Lagna`}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {report.lagnaType === 'Chara'
                  ? language === 'ta'
                    ? 'பெரியவர்கள் செய்த வினை: உங்கள் முன்னோர்கள், மூதாதையர்கள் சேர்த்த வினைகளை நீங்கள் அனுபவித்து சமன் செய்கிறீர்கள். 11-ஆம் இடமான சித்தப்பா, ஆசைகள் மூலம் கர்மப் பாடம் வரும்.'
                    : 'Ancestral Karma: Clearing karmic deeds performed by elders and ancestors. 11th house handles uncle, elder brother and strong ambitions.'
                  : report.lagnaType === 'Sthira'
                    ? language === 'ta'
                      ? 'நாம் செய்த வினை: முற்பிறவிகளில் நீங்கள் சுயமாக சேர்த்த வினைகளை இந்த ஜென்மத்தில் அனுபவிக்கிறீர்கள். 9-ஆம் பாவகமான தந்தை, பூர்வீகம், உயர்கல்வி மூலம் சோதனைகள் வரும்.'
                      : 'Self-Accumulated Karma: Resolving karma earned directly by you in past births. 9th house governs father, ancestral fortune, and mentors.'
                    : language === 'ta'
                      ? 'எதிர்கால சந்ததிக்குரிய வினை: உங்கள் வாழ்வின் செயல்கள் உங்கள் வருங்கால சந்ததியினரின் நல்வாழ்வை நேரடியாக பாதிக்கும். 7-ஆம் பாவ களத்திரம், கூட்டாளிகள் மூலம் பாடம் வரும்.'
                      : 'Posterity Karma: Actions directly influence the fortune of future generations. 7th house directs marital and partnership karma.'}
              </p>
              <div className="mt-3 text-[11px] text-emerald-300 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === 'ta'
                    ? 'சூன்ய வீட்டில் உங்கள் செல்வம் மறைந்திருக்கும் – முயற்சி கைவிடற்க.'
                    : 'Buried treasure lies in your Soonya sign – perseverance unlocks it.'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Mitigations Panel */}
          {report.activeMitigationsTa.length > 0 && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-3 text-emerald-300 font-bold font-serif text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>
                  {language === 'ta'
                    ? 'உங்கள் ஜாதகத்தில் செயல்படும் ஏட்டுச் சுவடி விலக்குகள் (நிவாரணங்கள்)'
                    : 'Active Shastra Exemptions & Mitigations in Your Chart'}
                </span>
              </div>
              <div className="space-y-2">
                {(language === 'ta' ? report.activeMitigationsTa : report.activeMitigationsEn).map(
                  (mit, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30 text-xs text-emerald-100 flex items-start gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{mit}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: 12 BHAVAS ANALYSIS */}
      {activeSection === 'bhavas' && (
        <div className="space-y-5">
          {/* Bhava Selector Grid */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
              <span>{language === 'ta' ? 'ஆய்வு செய்ய வேண்டிய பாவகத்தைத் தேர்ந்தெடுக்கவும்:' : 'Select Bhava to Examine:'}</span>
              <span className="text-[10px] text-amber-400 font-mono">
                {language === 'ta' ? '★ = உங்கள் சூன்ய/பாதக பாவகம்' : '★ = Your Soonya/Badhaka House'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {report.bhavasAnalysis.map((bAnalysis) => {
                const isSelected = bAnalysis.bhava === selectedBhava;
                const isSoonya = bAnalysis.isSoonya;
                const isBadhaka = bAnalysis.isBadhaka;

                return (
                  <button
                    key={bAnalysis.bhava}
                    onClick={() => setSelectedBhava(bAnalysis.bhava)}
                    className={`p-2.5 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-bold'
                        : isSoonya
                          ? 'bg-amber-950/40 text-amber-200 border-amber-500/50 hover:border-amber-400'
                          : isBadhaka
                            ? 'bg-rose-950/40 text-rose-200 border-rose-500/50 hover:border-rose-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono">
                        {bAnalysis.bhava} - {bAnalysis.signNameTa}
                      </span>
                      {(isSoonya || isBadhaka) && (
                        <span className="text-[10px] text-amber-400">★</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {isSoonya && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          isSelected ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          சூன்யம்
                        </span>
                      )}
                      {isBadhaka && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          isSelected ? 'bg-slate-950 text-rose-400' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          பாதகம்
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Bhava Detailed Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-amber-300 font-serif">
                    {language === 'ta' ? currentBhavaAnalysis.bhavaData.nameTa : currentBhavaAnalysis.bhavaData.nameEn}
                  </h3>
                  {currentBhavaAnalysis.isSoonya && (
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                      {language === 'ta' ? 'திதி சூன்ய பாவகம்' : 'Tithi Soonya Bhava'}
                    </span>
                  )}
                  {currentBhavaAnalysis.isBadhaka && (
                    <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold">
                      {language === 'ta' ? 'பாதக ஸ்தானம்' : 'Badhaka Sthana'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ta'
                    ? `ராசி: ${currentBhavaAnalysis.signNameTa} • அதிபதி: ${currentBhavaAnalysis.lordNameTa}`
                    : `Sign: ${currentBhavaAnalysis.signNameEn} • Lord: ${currentBhavaAnalysis.lordNameEn}`}
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                {language === 'ta' ? 'அமர்ந்துள்ள கிரகங்கள்:' : 'Planets:'}{' '}
                <span className="text-amber-300 font-bold">
                  {currentBhavaAnalysis.planetsInBhava.length > 0
                    ? currentBhavaAnalysis.planetsInBhava.map((p) => p.name).join(', ')
                    : language === 'ta' ? 'கிரகங்கள் இல்லை' : 'Empty'}
                </span>
              </div>
            </div>

            {/* Soonya Predictions */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {language === 'ta' ? 'திதி சூன்ய பாவகப் பலன்கள் (சுவடிப் பிரகடனம்)' : 'Soonya Bhava Shastra Declarations'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {(language === 'ta'
                  ? currentBhavaAnalysis.bhavaData.soonyaEffectTa
                  : currentBhavaAnalysis.bhavaData.soonyaEffectEn
                ).map((eff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 text-xs mt-0.5">◆</span>
                    <span className="leading-relaxed">{eff}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badhaka Predictions if applicable */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/20 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                {language === 'ta' ? 'பாதக ஸ்தான செயல்பாடுகள் & தடைகள்' : 'Badhaka Obstructions & Dynamic'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {(language === 'ta'
                  ? currentBhavaAnalysis.bhavaData.badhakaEffectTa
                  : currentBhavaAnalysis.bhavaData.badhakaEffectEn
                ).map((eff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-xs mt-0.5">◆</span>
                    <span className="leading-relaxed">{eff}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vital Warnings & Manuscript Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-rose-300 block flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'ta' ? 'அதிமுக்கிய எச்சரிக்கைகள்' : 'Vital Life Warnings'}
                </span>
                <ul className="space-y-1.5 text-xs text-rose-100/90">
                  {(language === 'ta'
                    ? currentBhavaAnalysis.bhavaData.vitalWarningsTa
                    : currentBhavaAnalysis.bhavaData.vitalWarningsEn
                  ).map((w, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-300 block flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'ta' ? 'ஏட்டுச் சுவடி நேரடி வாசகம்' : 'Original Palm-Leaf Shastra Text'}
                </span>
                <div className="text-xs text-amber-200/90 italic leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-amber-500/20">
                  {(language === 'ta'
                    ? currentBhavaAnalysis.bhavaData.specialManuscriptNotesTa
                    : currentBhavaAnalysis.bhavaData.specialManuscriptNotesEn
                  ).join(' ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: 9 GRAHAS KARAKATVA AFFECTED */}
      {activeSection === 'grahas' && (
        <div className="space-y-5">
          {/* Graha Tab Buttons */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-xl flex items-center gap-2 overflow-x-auto">
            {report.grahasAnalysis.map((g) => {
              const isSelected = g.planet === selectedGraha;
              return (
                <button
                  key={g.planet}
                  onClick={() => setSelectedGraha(g.planet)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : g.isPlacedInSoonya || g.isPlacedInBadhaka || g.isSoonyaLord || g.isBadhakaLord
                        ? 'bg-rose-950/30 text-rose-200 border-rose-500/40 hover:border-rose-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{language === 'ta' ? g.planetTa : g.planet}</span>
                  {(g.isPlacedInSoonya || g.isPlacedInBadhaka) && (
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Graha Detailed Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-amber-300 font-serif">
                  {language === 'ta' ? currentGrahaAnalysis.grahaData.planetTa : currentGrahaAnalysis.planet}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ta' ? currentGrahaAnalysis.grahaData.generalKarakatvaTa : currentGrahaAnalysis.grahaData.generalKarakatvaEn}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono bg-slate-950 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">
                  {language === 'ta' ? `அமர்ந்த இடம்: ${currentGrahaAnalysis.bhavaPlaced}-ஆம் பாவம்` : `In House ${currentGrahaAnalysis.bhavaPlaced}`}
                </span>
                {currentGrahaAnalysis.isPlacedInSoonya && (
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-xl border border-amber-500/40">
                    {language === 'ta' ? 'சூன்ய வீட்டில் அமர்வு' : 'Placed in Soonya'}
                  </span>
                )}
                {currentGrahaAnalysis.isPlacedInBadhaka && (
                  <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-xl border border-rose-500/40">
                    {language === 'ta' ? 'பாதகத்தில் அமர்வு' : 'Placed in Badhaka'}
                  </span>
                )}
                {currentGrahaAnalysis.isSoonyaLord && (
                  <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-xl border border-indigo-500/40">
                    {language === 'ta' ? 'திதி சூன்ய அதிபதி' : 'Soonya Lord'}
                  </span>
                )}
                {currentGrahaAnalysis.isBadhakaLord && (
                  <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-xl border border-purple-500/40">
                    {language === 'ta' ? 'பாதகாதிபதி' : 'Badhakadhipati'}
                  </span>
                )}
              </div>
            </div>

            {/* Afflictions */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/20 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                {language === 'ta'
                  ? 'திதி சூன்யம் / பாதகத்தால் இந்த கிரகத்திற்கு ஏற்படும் காரகத்துவ பாதிப்புகள்'
                  : 'Karakatva Afflictions When Impacted by Soonya / Badhaka'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {(language === 'ta'
                  ? currentGrahaAnalysis.grahaData.afflictionsTa
                  : currentGrahaAnalysis.grahaData.afflictionsEn
                ).map((aff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-xs mt-0.5">◆</span>
                    <span className="leading-relaxed">{aff}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Remedies & Cautions */}
            <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ta' ? 'பரிகாரங்கள் & பாதுகாப்பு வழிகாட்டல்கள்' : 'Prescribed Shastra Remedies & Safety Guidelines'}
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100">
                {(language === 'ta'
                  ? currentGrahaAnalysis.grahaData.remediesAndCautionsTa
                  : currentGrahaAnalysis.grahaData.remediesAndCautionsEn
                ).map((rem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span className="leading-relaxed">{rem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PALM-LEAF SHASTRA DOCTRINES */}
      {activeSection === 'doctrines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TITHI_SOONYA_DOCTRINES.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-3"
            >
              <div className="flex items-center gap-2 text-amber-300 font-bold font-serif text-sm border-b border-slate-800 pb-2">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{language === 'ta' ? doc.titleTa : doc.titleEn}</span>
              </div>
              <p className="text-xs text-amber-200/90 font-medium leading-relaxed bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                {language === 'ta' ? doc.summaryTa : doc.summaryEn}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(language === 'ta' ? doc.detailsTa : doc.detailsEn).map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 text-xs mt-0.5">◆</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 5: VITAL CAUTIONS & REMEDIES */}
      {activeSection === 'remedies' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Financial & Legal Protocols */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold font-serif text-sm border-b border-slate-800 pb-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>
                  {language === 'ta' ? 'நிதி & சட்ட ரீதியான கண்டிப்பான தடைகள்' : 'Financial & Legal Strict Prohibitions'}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>
                    {language === 'ta'
                      ? 'ஜாமீன் அல்லது உத்தரவாத கையெழுத்து போடக் கூடாது: புதன் அல்லது 2/3/11 சூன்யம் பெற்றால் நண்பர்கள்/உறவினர்களுக்காக கடன் உத்தரவாத கையெழுத்து போடுவதை அறவே தவிர்க்கவும்.'
                      : 'Never Provide Surety/Guarantee Signatures: If Mercury or 2nd/3rd/11th house is afflicted, signing as loan guarantor will force you to pay their debt.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>
                    {language === 'ta'
                      ? 'கூட்டுத் தொழில் (Partnership Business) அறவே கூடாது: பார்ட்னர்கள் துரோகம் செய்வார்கள் அல்லது முதலீட்டை விழுங்கி விடுவார்கள்.'
                      : 'Strictly No Partnership Business: Business partners are bound to betray trust or misappropriate capital.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>
                    {language === 'ta'
                      ? '10-ஆம் பாவம் சூன்யம் ஆனால் அதிக முதலீடு செய்யக் கூடாது; குழந்தையை தத்து எடுக்கக் கூடாது (தத்துக் கொடுக்கலாம்).'
                      : '10th House Soonya: Avoid heavy leveraged investments; NEVER adopt a child (symbolic giving away is beneficial).'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Environmental & Life Safety */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-serif text-sm border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'ta' ? 'இயற்கை சீற்றம் & உடல் பாதுகாப்பு' : 'Environmental & Ambient Safety'}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span>
                    {language === 'ta'
                      ? 'இடி மின்னல், புயல் பாதுகாப்பு: 4, 8, 12 அல்லது லக்னத்தில் செவ்வாய்/ராகு தொடர்பு உள்ளவர்கள் மழைக்காலத்தில் வெளியில் செல்லக் கூடாது; மரத்தடியில் நிற்கக் கூடாது.'
                      : 'Thunderstorm Safety: If Mars/Rahu connects to 4, 8, 12, or Lagna, do NOT venture outdoors during lightning storms; avoid sheltering under trees.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span>
                    {language === 'ta'
                      ? 'கூட்ட நெரிசல் & கலவரங்களைத் தவிர்த்தல்: கூட்ட நெரிசலான திருவிழாக்கள் மற்றும் சட்டம்-ஒழுங்கு பிரச்சனை உள்ள பகுதிகளில் மறைமுக தாக்குதல்கள் ஏற்படலாம்.'
                      : 'Avoid Stampedes & Riot Zones: Do not enter hyper-congested mob gatherings or civil unrest regions due to ambush vulnerability.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span>
                    {language === 'ta'
                      ? 'நீரில் கண்டம்: சந்திரன் அல்லது 4-ஆம் பாவம் பாதிக்கப்பட்டவர்கள் ஆழ்ந்த நீர்நிலைகள் மற்றும் கிணறுகளில் இறங்கக் கூடாது.'
                      : 'Water Peril: If Moon or 4th house is afflicted, avoid deep rivers, rapids, and unmonitored wells.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Spiritual Remedies Box */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-5 shadow-xl">
            <h4 className="text-sm font-bold text-amber-300 font-serif mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {language === 'ta' ? 'ஏட்டுச் சுவடி பரிந்துரைக்கும் முதன்மை கர்ம நிவாரணங்கள்' : 'Manuscript-Prescribed Core Karmic Pariharas'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-200 block font-serif">
                  1. பித்ரு தர்ப்பணம் & அமாவாசை வழிபாடு
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'முன்னோர்களின் வினையைத் தீர்க்க அமாவாசை தோறும் எள் தர்ப்பணம் கொடுத்து அன்னதானம் செய்யவும்.'
                    : 'Perform Thila Tharpana on Amavasya days and feed poor elders to clear ancestral debts.'}
                </p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-200 block font-serif">
                  2. குலதெய்வ வழிபாடு
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'ஆண்டுதோறும் சொந்த ஊரிலுள்ள குலதெய்வக் கோயிலுக்கு குடும்பத்துடன் சென்று பொங்கல் வைத்து அபிஷேகம் செய்யவும்.'
                    : 'Visit your ancestral Kuladeivam shrine annually with family to offer traditional Pongal and abhishekam.'}
                </p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-200 block font-serif">
                  3. தத்துபுத்திர பரிகாரம் (சுவடி ரகசியம்)
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {language === 'ta'
                    ? 'சூரியன், 5-ஆம் பாவம் பாதிக்கப்பட்டவர்கள் முதல் குழந்தையை மாமன் அல்லது அத்தைக்கு தத்துக் கொடுத்து வாங்குதல் விசேஷம்.'
                    : 'If Sun or 5th house is affected, symbolic adoption ritual (Thathu Koduthu Vaanguthal) for first child nullifies dosha.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
