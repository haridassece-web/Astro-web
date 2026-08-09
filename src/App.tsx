import { useState, useMemo } from 'react';
import type { BirthInput, Language, CalculatedHoroscope, UserUser } from './types/astrology';
import { calculateFullHoroscope } from './engine/horoscopeEngine';
import { calculateCurrentTransits } from './engine/transitEngine';
import { LOCATION_PRESETS } from './data/constants';

import { Navbar } from './components/Navbar';
import { BirthDetailsForm } from './components/BirthDetailsForm';
import { HoroscopeChart } from './components/HoroscopeChart';
import { PanchangaCard } from './components/PanchangaCard';
import { PlanetaryTable } from './components/PlanetaryTable';
import { DasaTimeline } from './components/DasaTimeline';
import { YogaAnalysisView } from './components/YogaAnalysisView';
import { PredictionsView } from './components/PredictionsView';
import { RemediesView } from './components/RemediesView';
import { TransitView } from './components/TransitView';
import { PrasannamView } from './components/PrasannamView';
import { ReportGeneratorModal } from './components/ReportGeneratorModal';
import { ResearchComparisonModal } from './components/ResearchComparisonModal';
import { AuthModal } from './components/AuthModal';

import {
  Compass, LayoutGrid, Clock, Award, Sparkles, ShieldCheck,
  Brain, ChevronRight, HelpCircle
} from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState<Language>('ta');
  const [chartFormat, setChartFormat] = useState<'south' | 'north'>('south');
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'panchanga' | 'dasa' | 'transit' | 'prasannam' | 'yogas' | 'predictions' | 'remedies'>('overview');

  const [activeChartId, setActiveChartId] = useState<string>('D1');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showResearchModal, setShowResearchModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'pro' | 'research'>('pro');

  const [currentUser, setCurrentUser] = useState<UserUser | null>(() => {
    try {
      const saved = localStorage.getItem('astro_engine_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [birthData, setBirthData] = useState<BirthInput>({
    name: '',
    gender: 'male',
    dob: '1992-04-14',
    tob: '08:30:00',
    lat: LOCATION_PRESETS[0].lat,
    lng: LOCATION_PRESETS[0].lng,
    timezone: LOCATION_PRESETS[0].timezone,
    locationName: '',
  });

  const horoscope: CalculatedHoroscope = useMemo(() => {
    return calculateFullHoroscope(birthData);
  }, [birthData]);

  const transitData = useMemo(() => {
    return calculateCurrentTransits(horoscope.planets, horoscope.lagnaSignId);
  }, [horoscope]);

  const activeDivisionalChart = horoscope.divisionalCharts[activeChartId] || horoscope.divisionalCharts['D1'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar
        language={language}
        onToggleLanguage={setLanguage}
        chartFormat={chartFormat}
        onToggleChartFormat={setChartFormat}
        onOpenReport={() => setShowReportModal(true)}
        onOpenResearch={() => setShowResearchModal(true)}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        currentUser={currentUser}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onLogout={() => {
          localStorage.removeItem('astro_engine_user');
          setCurrentUser(null);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {/* Divine Somaskanda Highlight Banner (Vinayagar, Murugar, Parvathi, Sivan) */}
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md relative flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-6">
          <div className="flex-1 space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest inline-block">
              Somaskanda Divine Grace • சிவகுடும்ப அருளாசி
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-amber-200 font-serif leading-tight">
              {language === 'ta'
                ? 'ஸ்ரீ விநாயகர், ஸ்ரீ முருகன், அருள்மிகு பார்வதி சிவபெருமான் திருவருள் மங்களம்'
                : 'Divine Blessings of Lord Vinayagar, Lord Murugan, Goddess Parvati & Lord Shiva'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {language === 'ta'
                ? 'ஓம் சிவாய நம: • ஓம் விநாயகரே நம: • ஓம் சரவணபவ முருகா போற்றி • சகல தோஷ நிவர்த்தி மற்றும் பரிகார பலன்கள்.'
                : 'Om Namah Shivaya • Om Vinayagaya Namaha • Om Saravanabhavaya Namaha • Divine Cosmic Astro Remedies.'}
            </p>
          </div>
          <div className="w-full md:w-64 h-36 rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-xl relative group">
            <img
              src="/shiva_family_bg.png"
              alt="Lord Shiva, Parvati, Vinayagar, Murugan"
              className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            <span className="absolute bottom-2 left-2 text-[10px] font-bold text-amber-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
              ஸ்ரீ சிவ குடும்பம்
            </span>
          </div>
        </div>

        <BirthDetailsForm
          initialValues={birthData}
          onSubmit={(newData) => setBirthData(newData)}
          language={language}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-mono block">
              {language === 'ta' ? 'ஜென்ம லக்னம்' : 'Ascendant (Lagna)'}
            </span>
            <span className="text-sm font-bold text-amber-300 font-serif">
              {language === 'ta'
                ? horoscope.planets.find((p) => p.name === 'Lagna')?.signNameTa
                : horoscope.planets.find((p) => p.name === 'Lagna')?.signNameEn}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-mono block">
              {language === 'ta' ? 'ஜென்ம ராசி' : 'Moon Sign (Rasi)'}
            </span>
            <span className="text-sm font-bold text-indigo-300 font-serif">
              {language === 'ta'
                ? horoscope.planets.find((p) => p.name === 'Moon')?.signNameTa
                : horoscope.planets.find((p) => p.name === 'Moon')?.signNameEn}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-mono block">
              {language === 'ta' ? 'ஜென்ம நட்சத்திரம்' : 'Birth Star (Nakshatra)'}
            </span>
            <span className="text-sm font-bold text-amber-400 font-serif">
              {language === 'ta' ? horoscope.panchanga.nakshatraTa : horoscope.panchanga.nakshatraEn}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-mono block">
              {language === 'ta' ? 'திதி' : 'Tithi'}
            </span>
            <span className="text-xs font-bold text-slate-200 truncate">
              {language === 'ta' ? horoscope.panchanga.tithiTa : horoscope.panchanga.tithiEn}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-mono block">
              {language === 'ta' ? 'நடப்பு மகா தசை' : 'Active Dasa'}
            </span>
            <span className="text-xs font-bold text-emerald-400">
              {horoscope.dasaPeriods.find((d) => d.isCurrent)
                ? language === 'ta'
                  ? `${horoscope.dasaPeriods.find((d) => d.isCurrent)?.planetTa} தசை`
                  : `${horoscope.dasaPeriods.find((d) => d.isCurrent)?.planet} Dasa`
                : 'Vimshottari'}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-mono block">
              {language === 'ta' ? 'ஜாதக பலம்' : 'Horoscope Score'}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-bold text-amber-300 font-mono">
                {horoscope.overallScore}/100
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{language === 'ta' ? 'பொது மேலோட்டம்' : 'General Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('charts')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'charts'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{language === 'ta' ? 'வர்க்கச் சக்கரங்கள் (D1 - D60)' : 'Divisional Charts (D1 - D60)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('panchanga')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'panchanga'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ta' ? 'பஞ்சாங்கம் & கிரக அட்டவணை' : 'Panchanga & Planets Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('dasa')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'dasa'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'ta' ? 'விம்சொத்தரி தசை' : 'Vimshottari Dasa'}</span>
          </button>

          <button
            onClick={() => setActiveTab('transit')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'transit'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{language === 'ta' ? 'கோசாரப் பலன்கள்' : 'Transit Engine (Gochara)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('prasannam')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'prasannam'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'ta' ? 'ஜாமக்கோள் பிரசன்னம்' : 'Prasannam Engine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('yogas')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'yogas'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{language === 'ta' ? 'யோகங்கள் & விதிகள்' : 'Yogas & JSON Rules'}</span>
          </button>

          <button
            onClick={() => setActiveTab('predictions')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'predictions'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>{language === 'ta' ? 'வாழ்க்கைப் பலன்கள்' : 'Domain Predictions'}</span>
          </button>

          <button
            onClick={() => setActiveTab('remedies')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'remedies'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ta' ? 'பரிகாரங்கள்' : 'Remedies'}</span>
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <HoroscopeChart
                chart={horoscope.divisionalCharts['D1']}
                format={chartFormat}
                language={language}
              />

              <HoroscopeChart
                chart={horoscope.divisionalCharts['D9']}
                format={chartFormat}
                language={language}
              />

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {language === 'ta' ? 'ஜாதக சுருக்கம் & யோக பலம்' : 'Horoscope Executive Summary'}
                    </h3>
                    <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Score: {horoscope.overallScore}/100
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <p className="leading-relaxed">
                      {language === 'ta'
                        ? `லக்னம்: ${horoscope.planets.find((p) => p.name === 'Lagna')?.signNameTa} | நட்சத்திரம்: ${horoscope.panchanga.nakshatraTa} | திதி: ${horoscope.panchanga.tithiTa}`
                        : `Lagna: ${horoscope.planets.find((p) => p.name === 'Lagna')?.signNameEn} | Star: ${horoscope.panchanga.nakshatraEn} | Tithi: ${horoscope.panchanga.tithiEn}`}
                    </p>
                    <p className="text-emerald-400 font-semibold">
                      {language === 'ta'
                        ? `${horoscope.yogasMatched.length} சுப ராஜ யோகங்கள் கண்டறியப்பட்டுள்ளன.`
                        : `${horoscope.yogasMatched.length} Auspicious Raja Yogas Matched.`}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">
                      {language === 'ta' ? 'முக்கிய யோகங்கள்:' : 'Key Yogas:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {horoscope.yogasMatched.map((y) => (
                        <span
                          key={y.id}
                          className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold"
                        >
                          {language === 'ta' ? y.nameTa : y.nameEn}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowReportModal(true)}
                  className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
                >
                  <span>{language === 'ta' ? 'முழு அறிக்கையைப் பார்க்க (AI Report)' : 'View Full AI Report'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <PanchangaCard panchanga={horoscope.panchanga} language={language} />
            <PlanetaryTable planets={horoscope.planets} language={language} />
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {Object.keys(horoscope.divisionalCharts).map((chartId) => (
                <button
                  key={chartId}
                  onClick={() => setActiveChartId(chartId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeChartId === chartId
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {chartId} - {language === 'ta' ? horoscope.divisionalCharts[chartId].titleTa.split(' ')[2] : horoscope.divisionalCharts[chartId].titleEn.split(' ')[2]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HoroscopeChart chart={activeDivisionalChart} format={chartFormat} language={language} />
              <HoroscopeChart chart={horoscope.divisionalCharts['D1']} format={chartFormat} language={language} />
            </div>
          </div>
        )}

        {activeTab === 'panchanga' && (
          <div className="space-y-6">
            <PanchangaCard panchanga={horoscope.panchanga} language={language} />
            <PlanetaryTable planets={horoscope.planets} language={language} />
          </div>
        )}

        {activeTab === 'dasa' && (
          <DasaTimeline
            dasaPeriods={horoscope.dasaPeriods}
            startingDasaInfo={horoscope.startingDasaInfo}
            presentDasaInfo={horoscope.presentDasaInfo}
            language={language}
          />
        )}

        {activeTab === 'transit' && (
          <TransitView transit={transitData} language={language} />
        )}

        {activeTab === 'prasannam' && (
          <PrasannamView language={language} />
        )}

        {activeTab === 'yogas' && (
          <YogaAnalysisView yogasMatched={horoscope.yogasMatched} language={language} />
        )}

        {activeTab === 'predictions' && (
          <PredictionsView predictions={horoscope.domainPredictions} language={language} />
        )}

        {activeTab === 'remedies' && (
          <RemediesView
            remedies={horoscope.remedies}
            templeRemedies={horoscope.templeRemedies}
            traditionalParihara={horoscope.traditionalParihara}
            language={language}
          />
        )}
      </main>

      {showReportModal && (
        <ReportGeneratorModal
          horoscope={horoscope}
          language={language}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {showResearchModal && (
        <ResearchComparisonModal
          currentHoroscope={horoscope}
          language={language}
          onClose={() => setShowResearchModal(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          language={language}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}

      <footer className="bg-slate-950 border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500 font-mono">
        Astrology Prediction Platform Engine • Swiss Ephemeris Standard & Parashari / Jaimini Rule Engines
      </footer>
    </div>
  );
}

export default App;
