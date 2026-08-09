import React, { useState } from 'react';
import type { Remedy, TempleRemedy, Language, TraditionalPariharaReport } from '../types/astrology';
import { ShieldCheck, Sparkles, Calendar, Compass, BookOpen, Clock, Flame, Tag, CheckCircle2 } from 'lucide-react';

interface RemediesViewProps {
  remedies: Remedy[];
  templeRemedies?: TempleRemedy[];
  traditionalParihara?: TraditionalPariharaReport;
  language: Language;
}

export const RemediesView: React.FC<RemediesViewProps> = ({ remedies: _remedies, templeRemedies = [], traditionalParihara, language }) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

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

  return (
    <div className="space-y-6">
      {/* Traditional Parihara Sthalams Section */}
      {traditionalParihara && (
        <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-wider block mb-1">
                Guruarul Traditional Parihara System
              </span>
              <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {language === 'ta' ? 'பாரம்பரிய ஜாதக அதிமுக்கிய பரிகாரக் கோவில்கள்' : 'Traditional Core Parihara Temples Matrix'}
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'ta' ? 'தனிப்பட்ட ஜாதகப் பொருத்தம்' : 'Individual Chart Synchronized'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Tithi Temple */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  1. {traditionalParihara.tithiParihara.typeTa}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
                  {traditionalParihara.tithiParihara.templeNameTa}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.tithiParihara.deityTa}` : `Deity: ${traditionalParihara.tithiParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {traditionalParihara.tithiParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 2. Karana Temple */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  2. {traditionalParihara.karanaParihara.typeTa}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
                  {traditionalParihara.karanaParihara.templeNameTa}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {traditionalParihara.karanaParihara.deityTa}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {traditionalParihara.karanaParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 3. Yoga Temple */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  3. {traditionalParihara.yogaParihara.typeTa}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
                  {traditionalParihara.yogaParihara.templeNameTa}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.yogaParihara.deityTa}` : `Deity: ${traditionalParihara.yogaParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {traditionalParihara.yogaParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 4. Avayogi Temple */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  4. {traditionalParihara.avayogiParihara.typeTa}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
                  {traditionalParihara.avayogiParihara.templeNameTa}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.avayogiParihara.deityTa}` : `Deity: ${traditionalParihara.avayogiParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {traditionalParihara.avayogiParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 5. Vainasika Temple */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  5. {traditionalParihara.vainasikaParihara.typeTa}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
                  {traditionalParihara.vainasikaParihara.templeNameTa}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.vainasikaParihara.deityTa}` : `Deity: ${traditionalParihara.vainasikaParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {traditionalParihara.vainasikaParihara.detailsTa}
                </p>
              </div>
            </div>

            {/* 6. Mudakku Temple */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-1">
                  6. {traditionalParihara.mudakkuParihara.typeTa}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-serif mb-1">
                  {traditionalParihara.mudakkuParihara.templeNameTa}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'ta' ? `தெய்வம்: ${traditionalParihara.mudakkuParihara.deityTa}` : `Deity: ${traditionalParihara.mudakkuParihara.deityEn}`}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {traditionalParihara.mudakkuParihara.detailsTa}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-400"></div>

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
            {/* Header row with Temple ID & Category */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-950" />
                  ID: {temple.id}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {temple.category} • {temple.sub_category}
                </span>
                <span className="text-xs text-slate-300 font-medium bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  {temple.condition}
                </span>
              </div>
            </div>

            {/* Title & Main Deity */}
            <div className="mb-4">
              <h4 className="text-lg font-bold text-slate-100 font-serif mb-1">{temple.temple_name}</h4>
              <p className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {language === 'ta' ? `மூலவர் / தெய்வம்: ${temple.deity}` : `Main Deity: ${temple.deity}`}
              </p>
            </div>

            {/* 20 Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* District & State */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-0.5">
                  District & State
                </span>
                <p className="text-xs text-slate-200 font-medium">{temple.district}, {temple.state}</p>
              </div>

              {/* Latitude & Longitude */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-0.5 flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  GPS Coordinates
                </span>
                <p className="text-xs text-amber-300 font-mono">{temple.latitude.toFixed(4)}° N, {temple.longitude.toFixed(4)}° E</p>
              </div>

              {/* Opening Hours */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Opening Hours
                </span>
                <p className="text-xs text-slate-200 font-mono">{temple.opening_hours}</p>
              </div>

              {/* Best Day to Visit */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Best Day to Visit
                </span>
                <p className="text-xs font-semibold text-emerald-400">{language === 'ta' ? temple.auspicious_day_ta : temple.auspicious_day_en}</p>
              </div>

              {/* Astrological Alignments (Planet, Nakshatra, Tithi, Yoga, Karana, Dosha) */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 md:col-span-2">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-1 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  Astrological Correlations
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {temple.related_planet && <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-mono">Planet: {temple.related_planet}</span>}
                  {temple.related_nakshatra && <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">Star: {temple.related_nakshatra}</span>}
                  {temple.related_tithi && <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">Tithi: {temple.related_tithi}</span>}
                  {temple.related_yoga && <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded font-mono">Yoga: {temple.related_yoga}</span>}
                  {temple.related_karana && <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">Karana: {temple.related_karana}</span>}
                  {temple.related_dosha && <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded font-mono">Dosha: {temple.related_dosha}</span>}
                </div>
              </div>

              {/* Puja Method */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 md:col-span-3">
                <span className="text-[11px] font-bold text-amber-400 font-mono block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Puja Method & Worship Rituals
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">{language === 'ta' ? temple.worship_method_ta : temple.worship_method_en}</p>
              </div>

              {/* Mantra */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 md:col-span-2">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Key Parihara Mantra
                </span>
                <p className="text-xs text-amber-200 font-mono italic">{temple.mantra}</p>
              </div>

              {/* Offerings */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-amber-400 font-mono block mb-0.5 flex items-center gap-1">
                  <GiftIcon className="w-3 h-3" />
                  Sacred Offerings
                </span>
                <p className="text-xs text-emerald-300 font-sans">{temple.offerings}</p>
              </div>
            </div>

            {/* Description & Source */}
            <div className="mt-3 bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <p className="text-xs text-amber-200/90 leading-relaxed">{language === 'ta' ? temple.description_ta : temple.description_en}</p>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1 whitespace-nowrap">
                <BookOpen className="w-3 h-3 text-amber-400" />
                {temple.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
