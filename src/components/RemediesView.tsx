import React, { useState } from 'react';
import type { Remedy, TempleRemedy, Language, TraditionalPariharaReport } from '../types/astrology';
import {
  ShieldCheck, Sparkles, Compass, BookOpen, Clock,
  Flame, Tag, CheckCircle2, MapPin, AlertTriangle, Layers
} from 'lucide-react';
import {
  DHUMAKETU_VINAYAGAR_TEMPLES,
  MANDI_DOSHA_STAR_MAP,
  BHAVA_MUDAKKU_RAHU_KETU_MAP,
  MUDAKKU_LAGNA_BHAVA_MAP,
  LAGNA_MUDAKKU_CHHAYA_TEMPLES,
} from '../data/traditionalPariharaData';

interface RemediesViewProps {
  remedies: Remedy[];
  templeRemedies?: TempleRemedy[];
  traditionalParihara?: TraditionalPariharaReport;
  language: Language;
}

export const RemediesView: React.FC<RemediesViewProps> = ({
  remedies: _remedies,
  templeRemedies = [],
  traditionalParihara,
  language,
}) => {
  const [activeRemedyTab, setActiveRemedyTab] = useState<
    'core' | 'mudakku_bhavas' | 'dhumaketu' | 'mandi_stars' | 'master_temples'
  >('core');

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [selectedMudakkuBhava, setSelectedMudakkuBhava] = useState<number>(1);

  const CATEGORY_MAP: { id: string; nameTa: string; nameEn: string }[] = [
    { id: 'All', nameTa: 'அனைத்து பரிகாரங்கள்', nameEn: 'All Remedies' },
    { id: 'Tithi', nameTa: '1. திதி பரிகாரம்', nameEn: '1. Tithi Remedy' },
    { id: 'Nakshatra', nameTa: '2. நட்சத்திர பரிகாரம்', nameEn: '2. Nakshatra Remedy' },
    { id: 'Yoga', nameTa: '3. யோக பரிகாரம்', nameEn: '3. Yoga Remedy' },
    { id: 'Karana', nameTa: '4. கரண பரிகாரம்', nameEn: '4. Karana Remedy' },
    { id: 'RahuKetu', nameTa: '5. ராகு/கேது பரிகாரம்', nameEn: '5. Rahu/Ketu Remedy' },
    { id: 'Lagna', nameTa: '6. லக்ன பரிகாரம்', nameEn: '6. Lagna Remedy' },
    { id: 'Dosha', nameTa: '7. தோஷ பரிகாரம்', nameEn: '7. Dosha Remedy' },
  ];

  const filteredTemples = templeRemedies.filter((item) => {
    if (activeCategoryFilter === 'All') return true;
    return item.category === activeCategoryFilter || (activeCategoryFilter === 'Dosha' && item.category === 'Dasa');
  });

  const bhavaRahuKetu = BHAVA_MUDAKKU_RAHU_KETU_MAP[selectedMudakkuBhava] || BHAVA_MUDAKKU_RAHU_KETU_MAP[1];

  const LAGNA_GROUP_LABELS_TA: Record<string, string> = {
    'Aries_Scorpio': 'மேஷம் / விருச்சிகம் (செவ்வாய் வீடுகள்)',
    'Taurus_Libra': 'ரிஷபம் / துலாம் (சுக்கிரன் வீடுகள்)',
    'Gemini_Virgo': 'மிதுனம் / கன்னி (புதன் வீடுகள்)',
    'Cancer': 'கடகம் (சந்திரன் வீடு)',
    'Leo': 'சிம்மம் (சூரியன் வீடு)',
    'Sagittarius_Pisces': 'தனுசு / மீனம் (குரு வீடுகள்)',
    'Capricorn_Aquarius': 'மகரம் / கும்பம் (சனி வீடுகள்)',
  };

  const LAGNA_GROUP_LABELS_EN: Record<string, string> = {
    'Aries_Scorpio': 'Aries / Scorpio (Mars Signs)',
    'Taurus_Libra': 'Taurus / Libra (Venus Signs)',
    'Gemini_Virgo': 'Gemini / Virgo (Mercury Signs)',
    'Cancer': 'Cancer (Moon Sign)',
    'Leo': 'Leo (Sun Sign)',
    'Sagittarius_Pisces': 'Sagittarius / Pisces (Jupiter Signs)',
    'Capricorn_Aquarius': 'Capricorn / Aquarius (Saturn Signs)',
  };

  return (
    <div className="space-y-6">
      {/* Top Module Header with Sub-Tabs */}
      <div className="bg-gradient-to-br from-amber-950/70 via-slate-900/95 to-slate-950 border border-amber-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-wider">
                Guruarul Traditional Parihara & Tiruppur Thanikasalam Research
              </span>
            </div>
            <h3 className="text-xl font-bold text-amber-200 font-serif flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              {language === 'ta' ? 'பாரம்பரிய ஜோதிட அதிமுக்கிய பரிகார ஆய்வு மையம்' : 'Sacred Traditional Parihara & Remedies Hub'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {language === 'ta'
                ? 'திதி, யோகம், கரணம், அவயோகி, வைநாசிகம், முடக்கு ராசி, மாந்தி தோஷம் மற்றும் 16 தூமகேது விநாயகர் பரிகாரத் திருத்தலங்கள்.'
                : 'Complete traditional astrological remedy sanctums: Tithi, Karana, Nitya Yoga, Avayogi, Vainasika, Mudakku Bhavas, Mandi Dosha, and 16 Dhumaketu Vinayagars.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {language === 'ta' ? 'ஜாதகத்துடன் இணைக்கப்பட்டது' : 'Chart Synchronized'}
            </span>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveRemedyTab('core')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeRemedyTab === 'core'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'ஜாதக 8 முக்கிய பரிகாரங்கள்' : 'Core 8 Chart Remedies'}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('mudakku_bhavas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeRemedyTab === 'mudakku_bhavas'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'முடக்கு 12 பாவக ஸ்தலங்கள்' : 'Mudakku 12 Bhavas Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('mandi_stars')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeRemedyTab === 'mandi_stars'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'மாந்தி தோஷ நிவர்த்தி (27 நட்சத்திரங்கள்)' : 'Mandi Dosha (27 Stars)'}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('dhumaketu')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeRemedyTab === 'dhumaketu'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? '16 தூமகேது விநாயகர் ஆலயங்கள்' : '16 Dhumaketu Vinayagar'}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('master_temples')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeRemedyTab === 'master_temples'
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? '20-அம்ச விரிவான கோயில்கள்' : 'Master 20-Attribute Temples'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CORE 8 CHART REMEDIES */}
      {activeRemedyTab === 'core' && traditionalParihara && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {language === 'ta'
                ? 'உங்கள் ஜாதகத்திற்குரிய 8 அதிமுக்கிய பாரம்பரிய பரிகாரக் கோயில்கள்'
                : 'Your Personal Chart Synchronized 8 Core Traditional Parihara Sanctums'}
            </h4>
            <span className="text-[11px] font-mono text-slate-400">8 Pillars of Astro Remedy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Tithi Temple */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  1. {traditionalParihara.tithiParihara.typeTa}
                </span>
                <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                  {traditionalParihara.tithiParihara.templeNameTa}
                </h5>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.tithiParihara.deityTa}` : `Deity: ${traditionalParihara.tithiParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {traditionalParihara.tithiParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 2. Karana Temple */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  2. {traditionalParihara.karanaParihara.typeTa}
                </span>
                <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                  {traditionalParihara.karanaParihara.templeNameTa}
                </h5>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {traditionalParihara.karanaParihara.deityTa}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {traditionalParihara.karanaParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 3. Yoga Temple */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  3. {traditionalParihara.yogaParihara.typeTa}
                </span>
                <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                  {traditionalParihara.yogaParihara.templeNameTa}
                </h5>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.yogaParihara.deityTa}` : `Deity: ${traditionalParihara.yogaParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {traditionalParihara.yogaParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 4. Avayogi Temple */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  4. {traditionalParihara.avayogiParihara.typeTa}
                </span>
                <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                  {traditionalParihara.avayogiParihara.templeNameTa}
                </h5>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.avayogiParihara.deityTa}` : `Deity: ${traditionalParihara.avayogiParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {traditionalParihara.avayogiParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 5. Vainasika Temple */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  5. {traditionalParihara.vainasikaParihara.typeTa}
                </span>
                <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                  {traditionalParihara.vainasikaParihara.templeNameTa}
                </h5>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.vainasikaParihara.deityTa}` : `Deity: ${traditionalParihara.vainasikaParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {traditionalParihara.vainasikaParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 6. Mudakku Temple */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  6. {traditionalParihara.mudakkuParihara.typeTa}
                </span>
                <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                  {traditionalParihara.mudakkuParihara.templeNameTa}
                </h5>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.mudakkuParihara.deityTa}` : `Deity: ${traditionalParihara.mudakkuParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {traditionalParihara.mudakkuParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 7. Mandi Dosha Temple (NEW) */}
            {traditionalParihara.mandiParihara && (
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between hover:border-amber-400 transition-all shadow-lg">
                <div>
                  <span className="text-[10px] font-bold font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 block mb-1">
                    7. {traditionalParihara.mandiParihara.typeTa}
                  </span>
                  <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                    {traditionalParihara.mandiParihara.templeNameTa}
                  </h5>
                  <p className="text-xs text-amber-300 font-semibold mb-2">
                    {traditionalParihara.mandiParihara.deityTa}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {traditionalParihara.mandiParihara.detailsTa}
                  </p>
                </div>
              </div>
            )}

            {/* 8. Mudakku Chhaya Graha Temple (NEW) */}
            {traditionalParihara.mudakkuChhayaParihara && (
              <div className="bg-slate-900/90 border border-purple-500/40 rounded-xl p-4 flex flex-col justify-between hover:border-purple-400 transition-all shadow-lg">
                <div>
                  <span className="text-[10px] font-bold font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30 block mb-1">
                    8. {traditionalParihara.mudakkuChhayaParihara.typeTa}
                  </span>
                  <h5 className="text-sm font-bold text-slate-100 font-serif mb-1 line-clamp-2">
                    {traditionalParihara.mudakkuChhayaParihara.templeNameTa}
                  </h5>
                  <p className="text-xs text-purple-300 font-semibold mb-2">
                    {traditionalParihara.mudakkuChhayaParihara.deityTa}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {traditionalParihara.mudakkuChhayaParihara.detailsTa}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MUDAKKU 12 BHAVAS DIRECTORY (TIRUPPUR THANIKASALAM) */}
      {activeRemedyTab === 'mudakku_bhavas' && (
        <div className="space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  {language === 'ta'
                    ? 'முடக்கு ராசி லக்னம் முதல் 12 பாவகங்களுக்கும் அமைந்தால் கோயில்கள்'
                    : 'Mudakku Rasi in 12 Bhavas & Temples (Researcher Tiruppur Thanikasalam)'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ta'
                    ? 'லக்னத்திலிருந்து முடக்கு ராசி எந்தப் பாவகத்தில் அமைகிறதோ, அதற்கான ராசி ஸ்தலங்கள் மற்றும் ராகு/கேது நின்றால் விசேஷ கோயில்கள்.'
                    : 'Authentic temple recommendations by researcher Tiruppur Thanikasalam for each Bhava where Mudakku falls, including specific temples if Rahu or Ketu occupies the house.'}
                </p>
              </div>
            </div>

            {/* Bhava Selector Pills */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hNum) => {
                const isSelected = selectedMudakkuBhava === hNum;
                return (
                  <button
                    key={hNum}
                    onClick={() => setSelectedMudakkuBhava(hNum)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition-all text-center ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                        : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{hNum}</span>
                    <span className="block text-[9px] font-sans opacity-75">
                      {language === 'ta' ? 'பாவம்' : 'Bhava'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Bhava Details */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-amber-500/20">
                <span className="text-xs font-bold text-amber-300 font-mono">
                  {language === 'ta'
                    ? `முடக்கு ராசி ${selectedMudakkuBhava}-ஆம் பாவகமாக அமைந்தால் வழிபாடு செய்ய வேண்டிய திருத்தலங்கள்`
                    : `Temples for Mudakku Rasi falling in House ${selectedMudakkuBhava}`}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  ஆராய்ச்சியாளர் திருப்பூர் தணிகாசலம்
                </span>
              </div>

              {/* Special Rahu & Ketu Temples for this Bhava */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-purple-950/20 border border-purple-500/30 p-3.5 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-purple-300 block mb-0.5 uppercase">
                      {language === 'ta' ? `முடக்கு ${selectedMudakkuBhava}-ல் ராகு இருந்தால்:` : `If Rahu is in Mudakku House ${selectedMudakkuBhava}:`}
                    </span>
                    <h6 className="text-xs font-bold text-slate-100 font-serif">
                      {language === 'ta' ? bhavaRahuKetu.rahuTempleTa : bhavaRahuKetu.rahuTempleEn}
                    </h6>
                  </div>
                </div>

                <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-amber-300 block mb-0.5 uppercase">
                      {language === 'ta' ? `முடக்கு ${selectedMudakkuBhava}-ல் கேது இருந்தால்:` : `If Ketu is in Mudakku House ${selectedMudakkuBhava}:`}
                    </span>
                    <h6 className="text-xs font-bold text-slate-100 font-serif">
                      {language === 'ta' ? bhavaRahuKetu.ketuTempleTa : bhavaRahuKetu.ketuTempleEn}
                    </h6>
                  </div>
                </div>
              </div>

              {/* 7 Sign Groups for this Bhava */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                  {language === 'ta' ? 'ராசி வாரியாக வழிபட வேண்டிய கோயில்கள்:' : 'Temples by Mudakku Zodiac Sign Group:'}
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {Object.keys(MUDAKKU_LAGNA_BHAVA_MAP).map((groupKey) => {
                    const groupMatrix = MUDAKKU_LAGNA_BHAVA_MAP[groupKey];
                    const templeData = groupMatrix[selectedMudakkuBhava] || groupMatrix[1];
                    const groupName = language === 'ta' ? LAGNA_GROUP_LABELS_TA[groupKey] : LAGNA_GROUP_LABELS_EN[groupKey];

                    return (
                      <div
                        key={groupKey}
                        className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold font-mono text-amber-400 block mb-1">
                            {groupName}
                          </span>
                          <h6 className="text-xs font-bold text-slate-100 font-serif mb-1">
                            {language === 'ta' ? templeData.templeTa : templeData.templeEn}
                          </h6>
                          <p className="text-[11px] text-slate-400">
                            {language === 'ta' ? `தெய்வம்: ${templeData.deityTa}` : `Deity: ${templeData.deityEn}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lagna Mudakku with Chhaya Graha (Rahu / Ketu) Presence (PDF 1 Page 16) */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-purple-300 font-mono uppercase tracking-wider">
                    {language === 'ta'
                      ? 'லக்கினம் முடக்காகி சாயாகிரகங்கள் (இராகு / கேது) நின்றால் வழிபடவேண்டிய கோயில்கள்'
                      : 'Temples when Shadow Planets (Rahu / Ketu) occupy Mudakku Lagna:'}
                  </h5>
                  <span className="text-[10px] font-mono text-slate-500">PDF 1 - பக்கம் 16</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {LAGNA_MUDAKKU_CHHAYA_TEMPLES.map((cItem, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-slate-950/80 p-3 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold font-mono text-amber-400 block mb-1">
                          {language === 'ta' ? cItem.signsTa : cItem.signsEn}
                        </span>
                        <div className="space-y-1 text-xs">
                          <p className="text-slate-200">
                            <span className="text-purple-300 font-bold font-mono">இராகு: </span>
                            {language === 'ta' ? cItem.rahuTempleTa : cItem.rahuTempleEn}
                          </p>
                          <p className="text-slate-200">
                            <span className="text-amber-300 font-bold font-mono">கேது: </span>
                            {language === 'ta' ? cItem.ketuTempleTa : cItem.ketuTempleEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANDI DOSHA NIVARANA (27 NAKSHATRAS) */}
      {activeRemedyTab === 'mandi_stars' && (
        <div className="space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  {language === 'ta'
                    ? 'மாந்தி தோஷ நிவர்த்திக் கோவில்கள் (27 நட்சத்திரங்கள்)'
                    : 'Mandi Dosha Nivarana Temples for 27 Birth Stars'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ta'
                    ? 'மாந்தியினால் உண்டாகும் உடல் உபாதைகள், விபத்து பயம் மற்றும் தடைகள் நீங்க 27 நட்சத்திரக்காரர்களும் வழிபட வேண்டிய சிறப்புத் தலங்கள்.'
                    : 'Authentic temples for all 27 stars to alleviate Mandi/Gulika afflictions, acute anxieties, and recurring setbacks.'}
                </p>
              </div>
            </div>

            {/* 27 Stars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.keys(MANDI_DOSHA_STAR_MAP).map((k) => {
                const sIdx = Number(k);
                const item = MANDI_DOSHA_STAR_MAP[sIdx];
                return (
                  <div
                    key={sIdx}
                    className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {sIdx + 1}. {language === 'ta' ? item.starTa : item.starEn}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">மாந்தி நிவர்த்தி</span>
                      </div>
                      <h6 className="text-xs font-bold text-slate-100 font-serif leading-relaxed mt-1">
                        {language === 'ta' ? item.templeTa : item.templeEn}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 16 DHUMAKETU VINAYAGAR TEMPLES */}
      {activeRemedyTab === 'dhumaketu' && (
        <div className="space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  {language === 'ta'
                    ? '16 தூமகேது விநாயகர் ஆலயங்கள் (தோஷ நிவர்த்தி திருத்தலங்கள்)'
                    : '16 Sacred Dhumaketu Vinayagar Temples (Astro Remedy)'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ta'
                    ? 'கேது மற்றும் சர்ப்ப தோஷங்களை போக்கும் 16 பிரசித்தி பெற்ற தூமகேது விநாயகர் ஆலயங்கள்.'
                    : 'The sacred 16 Dhumaketu Vinayagar shrines that dissolve Ketu doshas, fears, and health crises.'}
                </p>
              </div>
            </div>

            {/* Special Life Saver Highlight Card */}
            <div className="bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-950 border border-amber-500/40 p-4 rounded-xl shadow-lg flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                    அதிசய உயிர்காக்கும் ஸ்தலம் • Miraculous Sthalam
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-100 font-serif">
                  நன்னிலம் பாடைகட்டி மாரியம்மன் கோவில் உயிர்காக்கும் விநாயகர்
                </h5>
                <p className="text-xs text-amber-200 mt-1 leading-relaxed">
                  {language === 'ta'
                    ? 'கோமா நிலையில் உள்ளவர்கள் கூட இத்தலத்து உயிர்காக்கும் விநாயகரின் அருளால் மீண்டும் உயிர்ப்பிழைத்து நலம் பெறுவர் என்பது பாரம்பரிய நாடி ஜோதிட வாக்கு.'
                    : 'Revered in traditional Nadi astrology as a supreme life-saving shrine where critically ill and coma patients receive miraculous recovery by divine grace.'}
                </p>
              </div>
            </div>

            {/* 16 Temples Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {DHUMAKETU_VINAYAGAR_TEMPLES.slice(0, 16).map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        #{item.id}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">தூமகேது விநாயகர்</span>
                    </div>
                    <h6 className="text-xs font-bold text-slate-100 font-serif mb-1">
                      {language === 'ta' ? item.nameTa : item.nameEn}
                    </h6>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-amber-400/80" />
                      <span>{language === 'ta' ? item.locationTa : item.locationEn}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MASTER 20-ATTRIBUTE TEMPLE REMEDIES */}
      {activeRemedyTab === 'master_temples' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  {language === 'ta' ? '20-அம்ச பரிகாரத் திருத்தலப் பரிந்துரைகள்' : 'Master 20-Attribute Temple Remedies Database'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ta'
                    ? 'திருக்கணிதப் பஞ்சாங்க அடிப்படையில் திதி, நட்சத்திரம், யோகம், கரணம், லக்னம், தோஷம் மற்றும் ராகு/கேது பரிகாரங்கள்.'
                    : 'Thirukkanitha Ephemeris calculated temple remedies with full 20-attribute astrological metadata.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 flex items-center gap-1.5 whitespace-nowrap">
                  <Compass className="w-4 h-4 text-amber-400" />
                  {templeRemedies.length} {language === 'ta' ? 'பரிகாரத் தலங்கள்' : 'Active Temples'}
                </span>
              </div>
            </div>

            {/* Category Navigation Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORY_MAP.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeCategoryFilter === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold'
                      : 'bg-slate-950 text-slate-400 hover:text-amber-200 border border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? cat.nameTa : cat.nameEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 20-Field Temple Cards */}
          <div className="grid grid-cols-1 gap-6">
            {filteredTemples.map((temple) => (
              <div
                key={temple.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-950" />
                      ID: {temple.id}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {temple.category} • {temple.sub_category}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {temple.condition}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-slate-100 font-serif mb-1 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      {temple.temple_name}
                    </h4>
                    <p className="text-sm font-serif text-amber-300 flex items-center gap-1.5 mb-2">
                      <span>மூலவர் / பிரதான தெய்வம்:</span>
                      <span className="font-bold text-amber-200">{temple.deity}</span>
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span>{temple.district}, {temple.state}</span>
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block mb-1">வழிபாட்டுக்கு உகந்த நாள்:</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono block">
                        {language === 'ta' ? temple.auspicious_day_ta : temple.auspicious_day_en}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">தரிசன நேரம்:</span>
                      <span className="text-[11px] font-mono text-slate-300">{temple.opening_hours}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs font-bold text-amber-300 font-mono block mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      வழிபாட்டு முறை (Worship Method)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {language === 'ta' ? temple.worship_method_ta : temple.worship_method_en}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-300 font-mono block mb-1 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        முக்கிய பரிகார மந்திரம் (Parihara Mantra)
                      </span>
                      <p className="text-xs text-amber-200 font-mono italic leading-relaxed">
                        {temple.mantra}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono text-slate-400 block">சமர்ப்பிக்க வேண்டியவை:</span>
                      <span className="text-xs text-emerald-300 font-sans">{temple.offerings}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {language === 'ta' ? temple.description_ta : temple.description_en}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1 whitespace-nowrap">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    {temple.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
