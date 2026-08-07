import React, { useRef } from 'react';
import type { CalculatedHoroscope, Language } from '../types/astrology';
import { X, Printer, Download, Sparkles, FileText, Clock, Award, CheckCircle2 } from 'lucide-react';
import { HoroscopeChart } from './HoroscopeChart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportGeneratorModalProps {
  horoscope: CalculatedHoroscope;
  language: Language;
  onClose: () => void;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({ horoscope, language, onClose }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#020617',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const margin = 4; // 4mm margin
      const availWidth = pdfWidth - margin * 2;
      const availHeight = pdfHeight - margin * 2;

      let finalW = availWidth;
      let finalH = (canvas.height * finalW) / canvas.width;

      // Force scale down so it fits completely within single A4 page height
      if (finalH > availHeight) {
        finalH = availHeight;
        finalW = (canvas.width * finalH) / canvas.height;
      }

      const xPos = (pdfWidth - finalW) / 2;
      const yPos = (pdfHeight - finalH) / 2;

      pdf.addImage(imgData, 'PNG', xPos, yPos, finalW, finalH);
      const safeName = (horoscope.birthDetails.name || 'Horoscope').trim().replace(/\s+/g, '_');
      pdf.save(`Horoscope_Report_${safeName}_${language}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
      window.print();
    }
  };

  const currentDasa = horoscope.dasaPeriods.find((d) => d.isCurrent) || horoscope.dasaPeriods[0];
  const lagnaPlanet = horoscope.planets.find((p) => p.name === 'Lagna');
  const moonPlanet = horoscope.planets.find((p) => p.name === 'Moon');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-200 font-serif">
              {language === 'ta' ? 'ஒரு பக்க ஜாதக கணிப்பு அறிக்கை (Simple One-Pager PDF)' : 'One-Page Printable Horoscope History & Report'}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ta' ? 'அச்சிடுக' : 'Print'}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'ta' ? 'PDF பதிவிறக்கு (Single Page)' : 'Download PDF'}</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Container */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-950">
          {/* SINGLE-PAGE PRINTABLE CONTAINER (Unclipped for html2canvas) */}
          <div
            ref={reportRef}
            className="w-full max-w-[780px] mx-auto p-5 bg-slate-950 text-slate-100 font-sans space-y-3 printable-page border border-amber-500/30 rounded-xl shadow-2xl"
          >
            {/* Header & Title */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-base font-bold text-amber-300 font-serif leading-none">
                    {language === 'ta' ? 'ஸ்ரீ மகா ஜாதகக் கணிப்பு வரலாற்று அறிக்கை' : 'Master Vedic Horoscope History & Prediction Sheet'}
                  </h1>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {language === 'ta' ? 'திருக்கணித நவகிரக திருத்தலப் பரிகார முறை' : 'Thirukkanitham Ephemeris & Temple Remedies Engine'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block">
                  Score: {horoscope.overallScore}/100
                </span>
                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                  Date: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* 1. Birth Details & Panchanga Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'பெயர்' : 'Name'}</span>
                <strong className="text-amber-300 font-bold truncate block">{horoscope.birthDetails.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'தேதி & நேரம்' : 'DOB & TOB'}</span>
                <strong className="text-slate-200 block">{horoscope.birthDetails.dob} {horoscope.birthDetails.tob.slice(0, 5)}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'லக்னம்' : 'Lagna'}</span>
                <strong className="text-amber-300 font-serif block">{language === 'ta' ? lagnaPlanet?.signNameTa : lagnaPlanet?.signNameEn}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'ராசி' : 'Rasi'}</span>
                <strong className="text-indigo-300 font-serif block">{language === 'ta' ? moonPlanet?.signNameTa : moonPlanet?.signNameEn}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'நட்சத்திரம்' : 'Nakshatra'}</span>
                <strong className="text-amber-300 block">{language === 'ta' ? horoscope.panchanga.nakshatraTa : horoscope.panchanga.nakshatraEn}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'திதி' : 'Tithi'}</span>
                <strong className="text-slate-200 truncate block">{language === 'ta' ? horoscope.panchanga.tithiTa : horoscope.panchanga.tithiEn}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[9px]">{language === 'ta' ? 'நடப்பு தசை' : 'Current Dasa'}</span>
                <strong className="text-emerald-400 block">{language === 'ta' ? currentDasa.planetTa : currentDasa.planet} Dasa</strong>
              </div>
            </div>

            {/* 2. Rasi (D1) & Navamsa (D9) Side-by-Side Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <h3 className="text-[11px] font-bold text-amber-300 font-serif mb-1.5 text-center flex items-center justify-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  {language === 'ta' ? '1. இராசிச் சக்கரம் (D1 Rasi)' : '1. Natal Rasi Chart (D1)'}
                </h3>
                <HoroscopeChart chart={horoscope.divisionalCharts['D1']} format="south" language={language} compact={true} />
              </div>

              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <h3 className="text-[11px] font-bold text-amber-300 font-serif mb-1.5 text-center flex items-center justify-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  {language === 'ta' ? '2. நவாம்சச் சக்கரம் (D9 Navamsa)' : '2. Navamsa Chart (D9)'}
                </h3>
                <HoroscopeChart chart={horoscope.divisionalCharts['D9']} format="south" language={language} compact={true} />
              </div>
            </div>

            {/* 3. Vimshottari Dasa & Bhukti Periods Compact Table */}
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <h3 className="text-[11px] font-bold text-amber-400 font-mono uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {language === 'ta' ? 'விம்சொத்தரி மகா தசா புத்தி கால அட்டவணை (Dasa Timeline)' : 'Vimshottari Dasa & Bhukti Timeline Table'}
              </h3>

              <div className="grid grid-cols-9 gap-1 text-[9px] text-center font-mono">
                {horoscope.dasaPeriods.map((d) => (
                  <div
                    key={d.planet}
                    className={`p-1 rounded border transition-all ${
                      d.isCurrent
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block font-serif text-[10px]">
                      {language === 'ta' ? d.planetTa : d.planet}
                    </span>
                    <span className="block text-[8px] text-slate-400">{d.durationYears}Y</span>
                    <span className="block text-[8px] text-slate-400">
                      {d.startYear}-{d.endYear}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Core Parihara Temples Matrix */}
            {horoscope.traditionalParihara && (
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <h3 className="text-[11px] font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  {language === 'ta' ? 'அதிமுக்கிய பரிகாரக் கோவில்கள் சுருக்கம்' : 'Core Parihara Temples Summary'}
                </h3>

                <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block text-[9px]">1. திதி பரிகாரம்</span>
                    <span className="text-slate-100 font-semibold truncate block">{horoscope.traditionalParihara.tithiParihara.templeNameTa}</span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block text-[9px]">2. கரண பரிகாரம்</span>
                    <span className="text-slate-100 font-semibold truncate block">{horoscope.traditionalParihara.karanaParihara.templeNameTa}</span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block text-[9px]">3. யோக பரிகாரம்</span>
                    <span className="text-slate-100 font-semibold truncate block">{horoscope.traditionalParihara.yogaParihara.templeNameTa}</span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block text-[9px]">4. வைநாசிக பரிகாரம்</span>
                    <span className="text-slate-100 font-semibold truncate block">{horoscope.traditionalParihara.vainasikaParihara.templeNameTa}</span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800 col-span-2">
                    <span className="text-amber-400 font-bold block text-[9px]">5. முடக்கு பாவம் பரிகாரம்</span>
                    <span className="text-slate-100 font-semibold truncate block">{horoscope.traditionalParihara.mudakkuParihara.templeNameTa}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Signature */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[8px] text-slate-500 font-mono">
              <span>AstroEngine Enterprise Pro • Thirukkanitham Ephemeris Engine</span>
              <span>Single-Page Verification Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
