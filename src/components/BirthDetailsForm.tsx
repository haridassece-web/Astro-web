import React, { useState } from 'react';
import {
  Calendar, Clock, MapPin, User, Sparkles, Compass, Search,
  Sliders, Navigation, CheckCircle2, ChevronDown, RefreshCw,
  Bookmark, Trash2, FolderHeart
} from 'lucide-react';
import type { BirthInput, Language } from '../types/astrology';
import { LOCATION_PRESETS } from '../data/constants';

interface BirthDetailsFormProps {
  initialValues: BirthInput;
  onSubmit: (data: BirthInput) => void;
  language: Language;
}

export const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({ initialValues, onSubmit, language }) => {
  const [formData, setFormData] = useState<BirthInput>(initialValues);
  const [selectedPreset, setSelectedPreset] = useState<string>(initialValues.locationName || '');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isManualMode, setIsManualMode] = useState<'dropdown' | 'direct' | 'native'>('dropdown');
  const [showAdvancedGeo, setShowAdvancedGeo] = useState<boolean>(false);

  const [savedProfiles, setSavedProfiles] = useState<BirthInput[]>(() => {
    try {
      const raw = localStorage.getItem('astro_saved_horoscopes');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [saveToast, setSaveToast] = useState<string>('');

  const handleSaveCurrentProfile = () => {
    if (!formData.name && !formData.locationName) {
      setSaveToast(language === 'ta' ? 'பெயர் அல்லது நகரத்தை உள்ளிடவும்' : 'Please enter name or location first');
      setTimeout(() => setSaveToast(''), 2500);
      return;
    }

    const profileName = formData.name || formData.locationName || 'Horoscope';
    const newProfile: BirthInput = { ...formData, name: profileName };

    setSavedProfiles((prev) => {
      const filtered = prev.filter((p) => p.name.toLowerCase() !== profileName.toLowerCase());
      const updated = [newProfile, ...filtered];
      localStorage.setItem('astro_saved_horoscopes', JSON.stringify(updated));
      return updated;
    });

    setSaveToast(language === 'ta' ? 'ஜாதக விவரங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!' : 'Birth details saved successfully!');
    setTimeout(() => setSaveToast(''), 2500);
  };

  const handleDeleteSavedProfile = (nameToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedProfiles((prev) => {
      const updated = prev.filter((p) => p.name !== nameToDelete);
      localStorage.setItem('astro_saved_horoscopes', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLoadSavedProfile = (profile: BirthInput) => {
    setFormData(profile);
    onSubmit(profile);
    setSelectedPreset(profile.locationName || '');
  };

  const filteredPresets = LOCATION_PRESETS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.nameTa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract DD, MM, YYYY from formData.dob (YYYY-MM-DD)
  const dobParts = formData.dob.split('-');
  const currentYear = dobParts[0] || '1992';
  const currentMonth = dobParts[1] || '04';
  const currentDay = dobParts[2] || '14';

  // Extract HH, MM, SS from formData.tob (HH:mm:ss)
  const tobParts = formData.tob.split(':');
  const currentHour = tobParts[0] || '08';
  const currentMinute = tobParts[1] || '30';
  const currentSecond = tobParts[2] || '00';

  const updateAndSubmit = (updates: Partial<BirthInput>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      onSubmit(next);
      return next;
    });
  };

  const updateDob = (day: string, month: string, year: string) => {
    updateAndSubmit({ dob: `${year}-${month}-${day}` });
  };

  const updateTob = (hour: string, minute: string, second: string) => {
    updateAndSubmit({ tob: `${hour}:${minute}:${second}` });
  };

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    const found = LOCATION_PRESETS.find((p) => p.name === presetName);
    if (found) {
      updateAndSubmit({
        locationName: found.name,
        lat: found.lat,
        lng: found.lng,
        timezone: found.timezone,
      });
    } else {
      updateAndSubmit({ locationName: '' });
    }
  };

  const setNowTime = () => {
    const now = new Date();
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    updateAndSubmit({
      dob: `${yyyy}-${mm}-${dd}`,
      tob: `${hh}:${min}:${ss}`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const MONTHS = language === 'ta'
    ? [
        { val: '01', label: '01 - ஜனவரி (Jan)' },
        { val: '02', label: '02 - பிப்ரவரி (Feb)' },
        { val: '03', label: '03 - மார்ச் (Mar)' },
        { val: '04', label: '04 - ஏப்ரல் (Apr)' },
        { val: '05', label: '05 - மே (May)' },
        { val: '06', label: '06 - ஜூன் (Jun)' },
        { val: '07', label: '07 - ஜூலை (Jul)' },
        { val: '08', label: '08 - ஆகஸ்ட் (Aug)' },
        { val: '09', label: '09 - செப்டம்பர் (Sep)' },
        { val: '10', label: '10 - அக்டோபர் (Oct)' },
        { val: '11', label: '11 - நவம்பர் (Nov)' },
        { val: '12', label: '12 - டிசம்பர் (Dec)' },
      ]
    : [
        { val: '01', label: '01 - Jan' },
        { val: '02', label: '02 - Feb' },
        { val: '03', label: '03 - Mar' },
        { val: '04', label: '04 - Apr' },
        { val: '05', label: '05 - May' },
        { val: '06', label: '06 - Jun' },
        { val: '07', label: '07 - Jul' },
        { val: '08', label: '08 - Aug' },
        { val: '09', label: '09 - Sep' },
        { val: '10', label: '10 - Oct' },
        { val: '11', label: '11 - Nov' },
        { val: '12', label: '12 - Dec' },
      ];

  const YEARS = Array.from({ length: 150 }, (_, i) => String(2030 - i));
  const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const SECONDS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const popularCities = LOCATION_PRESETS.slice(0, 6);

  // Time AM/PM display helper
  const hourNum = parseInt(currentHour, 10);
  const isPm = hourNum >= 12;
  const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
  const formattedTime12 = `${String(hour12).padStart(2, '0')}:${currentMinute}:${currentSecond} ${isPm ? 'PM' : 'AM'}`;

  return (
    <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-amber-500/30 rounded-3xl p-5 md:p-7 shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)] backdrop-blur-xl relative overflow-hidden transition-all duration-300">
      {/* Decorative Cosmic Radial Highlights */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-indigo-500/20 border border-amber-500/40 flex items-center justify-center shadow-inner">
            <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent font-serif tracking-tight">
                {language === 'ta' ? 'பிறந்த விவரங்கள் உள்ளீடு' : 'Birth Details Input'}
              </h2>
              <span className="text-[10px] font-mono font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                {language === 'ta' ? 'திருக்கணிதம்' : 'Thirukkanitham'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ta'
                ? 'துல்லியமான லக்னம், ராசி & நவாம்ச ஜாதக கணிப்பு'
                : 'Precise planetary ephemeris, Lagna & divisional chart calculations'}
            </p>
          </div>
        </div>

        {/* Input Mode Switch Tabs & Reset to Now */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={setNowTime}
            className="text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-amber-300 px-3 py-1.5 rounded-xl border border-slate-700/80 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ta' ? 'இப்போது' : 'Current Time'}</span>
          </button>

          <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsManualMode('dropdown')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                isManualMode === 'dropdown'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ta' ? 'Dropdown' : 'Dropdown'}
            </button>
            <button
              type="button"
              onClick={() => setIsManualMode('direct')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                isManualMode === 'direct'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ta' ? 'நேரடி தட்டச்சு' : 'Direct Type'}
            </button>
            <button
              type="button"
              onClick={() => setIsManualMode('native')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                isManualMode === 'native'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'ta' ? 'Calendar' : 'Native Picker'}
            </button>
          </div>
        </div>
      </div>

      {/* Saved Profiles Quick Chips Bar */}
      {savedProfiles.length > 0 && (
        <div className="mb-4 p-3 bg-slate-950/80 border border-slate-800/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10 shadow-inner">
          <div className="flex items-center space-x-2">
            <FolderHeart className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-300">
              {language === 'ta' ? 'சேமிக்கப்பட்ட ஜாதகங்கள்:' : 'Saved Horoscopes:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {savedProfiles.map((prof) => (
              <div
                key={prof.name}
                onClick={() => handleLoadSavedProfile(prof)}
                className="group text-xs bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-slate-200 px-2.5 py-1 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="font-semibold text-amber-200">{prof.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{prof.dob}</span>
                <button
                  type="button"
                  onClick={(e) => handleDeleteSavedProfile(prof.name, e)}
                  className="text-slate-500 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Main Grid: Name & Gender, Date of Birth, Time of Birth, Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Box 1: Full Name & Gender */}
          <div className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-300/80 flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'ta' ? 'பெயர்' : 'Full Name'}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Optional</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  placeholder={language === 'ta' ? 'உங்கள் பெயர் உள்ளிடுக...' : 'Enter full name...'}
                  onChange={(e) => updateAndSubmit({ name: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-2.5 text-sm text-slate-100 pl-9 outline-none transition-all placeholder:text-slate-600 font-medium"
                />
                <User className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
              </div>
            </div>

            {/* Gender Selection Pills */}
            <div className="mt-3 pt-3 border-t border-slate-800/60">
              <span className="text-[10px] font-mono text-slate-400 block mb-1.5">
                {language === 'ta' ? 'பாலினம் (Gender)' : 'Gender'}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'male', ta: 'ஆண்', en: 'Male' },
                  { id: 'female', ta: 'பெண்', en: 'Female' },
                  { id: 'other', ta: 'மற்றவை', en: 'Other' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => updateAndSubmit({ gender: g.id as any })}
                    className={`py-1 px-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                      formData.gender === g.id
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {language === 'ta' ? g.ta : g.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box 2: Date of Birth */}
          <div className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-300/80 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'ta' ? 'பிறந்த தேதி' : 'Date of Birth'}
                </label>
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                  {currentDay}/{currentMonth}/{currentYear}
                </span>
              </div>

              {isManualMode === 'direct' ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.dob}
                    placeholder="YYYY-MM-DD (e.g. 1992-04-14)"
                    onChange={(e) => updateAndSubmit({ dob: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-mono pl-9 outline-none transition-all"
                    required
                  />
                  <Calendar className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              ) : isManualMode === 'native' ? (
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateAndSubmit({ dob: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono outline-none transition-all"
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {/* Day */}
                  <select
                    value={currentDay}
                    onChange={(e) => updateDob(e.target.value, currentMonth, currentYear)}
                    className="bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-2 py-2 text-xs text-amber-200 font-mono outline-none cursor-pointer hover:border-slate-700"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d} className="bg-slate-950 text-slate-100">
                        {d}
                      </option>
                    ))}
                  </select>

                  {/* Month */}
                  <select
                    value={currentMonth}
                    onChange={(e) => updateDob(currentDay, e.target.value, currentYear)}
                    className="bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-1.5 py-2 text-xs text-amber-200 outline-none cursor-pointer truncate hover:border-slate-700"
                  >
                    {MONTHS.map((m) => (
                      <option key={m.val} value={m.val} className="bg-slate-950 text-slate-100">
                        {m.label}
                      </option>
                    ))}
                  </select>

                  {/* Year */}
                  <select
                    value={currentYear}
                    onChange={(e) => updateDob(currentDay, currentMonth, e.target.value)}
                    className="bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-2 py-2 text-xs text-amber-200 font-mono outline-none cursor-pointer hover:border-slate-700"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-slate-950 text-slate-100">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{language === 'ta' ? 'தேதி வடிவமைப்பு:' : 'Format:'}</span>
              <span className="text-amber-400/80 font-bold">YYYY-MM-DD</span>
            </div>
          </div>

          {/* Box 3: Time of Birth */}
          <div className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-300/80 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'ta' ? 'பிறந்த நேரம்' : 'Time of Birth'}
                </label>
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                  {formattedTime12}
                </span>
              </div>

              {isManualMode === 'direct' ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.tob}
                    placeholder="HH:MM:SS (e.g. 08:30:00)"
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-mono pl-9 outline-none transition-all"
                    required
                  />
                  <Clock className="w-4 h-4 text-amber-500/60 absolute left-3 top-3" />
                </div>
              ) : isManualMode === 'native' ? (
                <div className="relative">
                  <input
                    type="time"
                    step="1"
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono outline-none transition-all"
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {/* Hours */}
                  <select
                    value={currentHour}
                    onChange={(e) => updateTob(e.target.value, currentMinute, currentSecond)}
                    className="bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-2 py-2 text-xs text-amber-200 font-mono outline-none cursor-pointer hover:border-slate-700"
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h} className="bg-slate-950 text-slate-100">
                        {h} Hr
                      </option>
                    ))}
                  </select>

                  {/* Minutes */}
                  <select
                    value={currentMinute}
                    onChange={(e) => updateTob(currentHour, e.target.value, currentSecond)}
                    className="bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-2 py-2 text-xs text-amber-200 font-mono outline-none cursor-pointer hover:border-slate-700"
                  >
                    {MINUTES.map((m) => (
                      <option key={m} value={m} className="bg-slate-950 text-slate-100">
                        {m} Min
                      </option>
                    ))}
                  </select>

                  {/* Seconds */}
                  <select
                    value={currentSecond}
                    onChange={(e) => updateTob(currentHour, currentMinute, e.target.value)}
                    className="bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-2 py-2 text-xs text-amber-200 font-mono outline-none cursor-pointer hover:border-slate-700"
                  >
                    {SECONDS.map((s) => (
                      <option key={s} value={s} className="bg-slate-950 text-slate-100">
                        {s} Sec
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{language === 'ta' ? '24-மணி நேரம்:' : '24-Hr Mode:'}</span>
              <span className="text-amber-400/80 font-bold">{formData.tob}</span>
            </div>
          </div>

          {/* Box 4: Birth Location Presets & Search */}
          <div className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-300/80 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'ta' ? 'பிறந்த நகரம்' : 'Location Preset'}
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {LOCATION_PRESETS.length} {language === 'ta' ? 'நகரங்கள்' : 'cities'}
                </span>
              </div>

              <div className="space-y-2">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={language === 'ta' ? 'தேடுக...' : 'Search city...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-2.5 py-1.5 text-xs text-amber-200 pl-8 outline-none transition-all placeholder:text-slate-600"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>

                {/* Preset Selector */}
                <div className="relative">
                  <select
                    value={selectedPreset}
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500/70 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 pl-8 pr-7 outline-none transition-all cursor-pointer hover:border-slate-700 appearance-none"
                  >
                    <option value="" className="bg-slate-950 text-slate-400">
                      {language === 'ta' ? '-- பிறந்த நகரைத் தேர்ந்தெடுக்கவும் --' : '-- Select Birth Location --'}
                    </option>
                    {filteredPresets.map((loc) => (
                      <option key={loc.name} value={loc.name} className="bg-slate-950 text-slate-100">
                        {language === 'ta' ? loc.nameTa : loc.name}
                      </option>
                    ))}
                    {filteredPresets.length === 0 && (
                      <option disabled value="">
                        {language === 'ta' ? 'நகரம் இல்லை' : 'No city found'}
                      </option>
                    )}
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-amber-500/60 absolute left-2.5 top-3" />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quick Popular City Chips */}
            <div className="mt-3 pt-3 border-t border-slate-800/60">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">
                {language === 'ta' ? 'முக்கிய நகரங்கள்:' : 'Quick Selection:'}
              </span>
              <div className="flex flex-wrap gap-1">
                {popularCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handlePresetChange(city.name)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                      selectedPreset === city.name
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {language === 'ta' ? city.nameTa.split(',')[0] : city.name.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Bar: Advanced Geographic Coordinates & System Selector */}
        <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Panchanga Calculation Engine Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[11px] font-mono uppercase font-bold text-amber-300/80 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              {language === 'ta' ? 'கணிப்பு முறை:' : 'Engine System:'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => updateAndSubmit({ panchangaSystem: 'thirukkanitham' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  (formData.panchangaSystem || 'thirukkanitham') === 'thirukkanitham'
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ta' ? 'திருக்கணிதம்' : 'Thirukkanitham (Ephemeris)'}</span>
              </button>

              <button
                type="button"
                onClick={() => updateAndSubmit({ panchangaSystem: 'vakkiyam' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  formData.panchangaSystem === 'vakkiyam'
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{language === 'ta' ? 'வாக்கிய முறை' : 'Vakkiyam'}</span>
              </button>
            </div>
          </div>

          {/* Coordinates Summary & Toggle Button */}
          <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="text-slate-400">
                Lat: <strong className="text-amber-300">{formData.lat}°</strong>
              </span>
              <span className="text-slate-400">
                Lng: <strong className="text-amber-300">{formData.lng}°</strong>
              </span>
              <span className="text-slate-400">
                TZ: <strong className="text-amber-300">+{formData.timezone}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowAdvancedGeo(!showAdvancedGeo)}
              className="text-[11px] font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-800 transition-all flex items-center gap-1"
            >
              <Navigation className="w-3 h-3 text-amber-400" />
              <span>{showAdvancedGeo ? (language === 'ta' ? 'மறைக்கவும்' : 'Hide Geo') : (language === 'ta' ? 'மாற்றுக' : 'Edit Geo')}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Coordinates Form */}
        {showAdvancedGeo && (
          <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">
                Latitude (அட்சரேகை)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.lat}
                onChange={(e) => updateAndSubmit({ lat: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">
                Longitude (தீர்க்கரேகை)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.lng}
                onChange={(e) => updateAndSubmit({ lng: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">
                Timezone Offset (மணி)
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.timezone}
                onChange={(e) => updateAndSubmit({ timezone: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {/* Submit & Save Dual Hero Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black tracking-wide py-3.5 px-6 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center space-x-2 text-sm uppercase cursor-pointer relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></span>
            <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
            <span className="font-serif font-bold text-slate-950 text-sm md:text-base">
              {language === 'ta' ? 'திருக்கணித ஜாதகம் கணக்கிடுக' : 'Calculate Thirukkanitha Horoscope'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleSaveCurrentProfile}
            className="bg-slate-950 hover:bg-slate-900 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold py-3.5 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs uppercase active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>{language === 'ta' ? 'ஜாதகத்தைச் சேமி' : 'Save Data'}</span>
          </button>
        </div>

        {saveToast && (
          <div className="text-center text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl animate-fadeIn">
            {saveToast}
          </div>
        )}
      </form>
    </div>
  );
};

