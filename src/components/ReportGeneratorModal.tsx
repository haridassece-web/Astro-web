import React, { useRef, useState } from 'react';
import type { CalculatedHoroscope, Language, PlanetName } from '../types/astrology';
import { X, Printer, Download, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { HoroscopeChart } from './HoroscopeChart';
import { NAKSHATRAS, PLANET_TA } from '../data/constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportGeneratorModalProps {
  horoscope: CalculatedHoroscope;
  language: Language;
  onClose: () => void;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({ horoscope, language = 'ta', onClose }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [viewScope, setViewScope] = useState<'standard' | 'full'>('standard');
  const [selectedDasaPlanet, setSelectedDasaPlanet] = useState<PlanetName>(
    horoscope.presentDasaInfo?.mahadasa || horoscope.dasaPeriods.find((d) => d.isCurrent)?.planet || horoscope.dasaPeriods[0]?.planet || 'Jupiter'
  );

  const handlePrint = () => {
    if (!reportRef.current) {
      window.print();
      return;
    }

    // Create isolated print iframe to ensure every single page prints without modal clipping
    const printIframe = document.createElement('iframe');
    printIframe.style.position = 'fixed';
    printIframe.style.right = '0';
    printIframe.style.bottom = '0';
    printIframe.style.width = '100%';
    printIframe.style.height = '100%';
    printIframe.style.border = '0';
    printIframe.style.opacity = '0';
    printIframe.style.pointerEvents = 'none';
    printIframe.style.zIndex = '-9999';
    document.body.appendChild(printIframe);

    let allExtractedStyles = '';
    try {
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          Array.from(sheet.cssRules || []).forEach((rule) => {
            allExtractedStyles += rule.cssText + '\n';
          });
        } catch {
          // cross-origin protection fallback
        }
      });
    } catch {
      // ignore
    }

    const doc = printIframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((s) => s.outerHTML)
      .join('\n');

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base href="${window.location.origin}/" />
          <title>${horoscope.birthDetails.name || 'ஜாதக அறிக்கை'} - Horoscope Report</title>
          ${styles}
          <style>
            ${allExtractedStyles}
          </style>
          <style>
            @page {
              size: A4 portrait;
              margin: 8mm 6mm;
            }
            * {
              visibility: visible !important;
              box-sizing: border-box !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              visibility: visible !important;
              background: #ffffff !important;
              color: #0f172a !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
              height: auto !important;
              font-family: 'Noto Sans Tamil', 'Noto Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }
            body, body * {
              visibility: visible !important;
            }
            .printable-page,
            .printable-page *,
            .report-page-block,
            .report-page-block * {
              visibility: visible !important;
            }
            .report-page-block {
              width: 100% !important;
              max-width: 100% !important;
              page-break-after: always !important;
              break-after: page !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              margin-bottom: 0 !important;
              border: none !important;
              box-shadow: none !important;
              padding: 6mm !important;
              background: #ffffff !important;
            }
            .report-page-block:last-child {
              page-break-after: auto !important;
              break-after: auto !important;
            }
            .no-print {
              display: none !important;
            }
            /* Explicit layout guarantees for print */
            .grid { display: grid !important; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
            .grid-rows-4 { grid-template-rows: repeat(4, minmax(0, 1fr)) !important; }
            .col-span-2 { grid-column: span 2 / span 2 !important; }
            .row-span-2 { grid-row: span 2 / span 2 !important; }
            .aspect-square { aspect-ratio: 1 / 1 !important; width: 100% !important; }
            .flex { display: flex !important; }
            .flex-col { flex-direction: column !important; }
            .flex-row { flex-direction: row !important; }
            .items-center { align-items: center !important; }
            .justify-between { justify-content: space-between !important; }
            .justify-center { justify-content: center !important; }
            .text-center { text-align: center !important; }
            .border { border: 1px solid #cbd5e1 !important; }
            .border-2 { border: 2px solid #b45309 !important; }
            .border-b { border-bottom: 1px solid #cbd5e1 !important; }
            .border-b-2 { border-bottom: 2px solid #b45309 !important; }
            .border-t { border-top: 1px solid #cbd5e1 !important; }
            .border-r { border-right: 1px solid #cbd5e1 !important; }
            .border-amber-600\\/40, .border-amber-600\\/30 { border-color: rgba(217, 119, 6, 0.4) !important; }
            .border-amber-700\\/60, .border-amber-700\\/30 { border-color: rgba(180, 83, 9, 0.5) !important; }
            .border-slate-200 { border-color: #e2e8f0 !important; }
            .border-slate-300 { border-color: #cbd5e1 !important; }
            .bg-amber-50\\/20, .bg-amber-50\\/40, .bg-amber-50 { background-color: #fffbeb !important; }
            .bg-amber-100\\/70, .bg-amber-100\\/60, .bg-amber-100 { background-color: #fef3c7 !important; }
            .bg-slate-50\\/40, .bg-slate-50 { background-color: #f8fafc !important; }
            .bg-slate-100 { background-color: #f1f5f9 !important; }
            .bg-white { background-color: #ffffff !important; }
            .rounded-lg { border-radius: 8px !important; }
            .rounded-xl { border-radius: 12px !important; }
            .rounded-2xl { border-radius: 16px !important; }
            table { width: 100% !important; border-collapse: collapse !important; }
            th, td { border: 1px solid #cbd5e1 !important; padding: 4px 6px !important; }
            /* South Indian chart layout guarantee */
            .grid.grid-cols-4.grid-rows-4 > div {
              min-height: 55px !important;
              border: 1px solid #cbd5e1 !important;
              background-color: #ffffff !important;
            }
          </style>
        </head>
        <body class="bg-white text-slate-900 p-0 m-0">
          <div class="printable-page">
            ${reportRef.current.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    let isPrinted = false;
    const triggerPrint = () => {
      if (isPrinted) return;
      isPrinted = true;
      try {
        printIframe.contentWindow?.focus();
        printIframe.contentWindow?.print();
      } catch {
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(printIframe)) {
            document.body.removeChild(printIframe);
          }
        }, 3000);
      }
    };

    printIframe.onload = () => {
      setTimeout(triggerPrint, 300);
    };

    // Fallback timeout in case onload event does not fire on doc.write
    setTimeout(triggerPrint, 600);
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);

    try {
      const pageBlocks = reportRef.current.querySelectorAll<HTMLElement>('.report-page-block');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      for (let i = 0; i < pageBlocks.length; i++) {
        const block = pageBlocks[i];
        const canvas = await html2canvas(block, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 1200,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        let renderWidth = pdfWidth;
        let renderHeight = (canvas.height * pdfWidth) / canvas.width;
        let xOffset = 0;
        let yOffset = 0;

        if (renderHeight > pdfHeight) {
          const scale = (pdfHeight - 8) / renderHeight;
          renderWidth = pdfWidth * scale;
          renderHeight = renderHeight * scale;
          xOffset = (pdfWidth - renderWidth) / 2;
          yOffset = 4;
        }

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, renderWidth, renderHeight, undefined, 'FAST');
      }

      const safeName = (horoscope.birthDetails.name || 'Jathagam').trim().replace(/\s+/g, '_');
      pdf.save(`Jathaga_Arikkai_${safeName}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
      handlePrint();
    } finally {
      setIsExporting(false);
    }
  };

  const lagnaPlanet = horoscope.planets.find((p) => p.name === 'Lagna');
  const moonPlanet = horoscope.planets.find((p) => p.name === 'Moon');
  const moonNakshatra = NAKSHATRAS[horoscope.panchanga.nakshatraIndex - 1];
  const starLordTa = moonNakshatra ? PLANET_TA[moonNakshatra.lord] : '';

  const startingDasa = horoscope.startingDasaInfo;
  const presentDasa = horoscope.presentDasaInfo;

  // Dignity Tamil mapping
  const getDignityTamil = (dignityEn: string) => {
    switch (dignityEn) {
      case 'Exalted':
        return 'உச்சம்';
      case 'Moolatrikona':
        return 'மூலத்திரிகோணம்';
      case 'Own House':
        return 'ஆட்சி';
      case 'Great Friend':
        return 'அதிநட்பு';
      case 'Friend':
        return 'நட்பு';
      case 'Neutral':
        return 'சமம்';
      case 'Enemy':
        return 'பகை';
      case 'Great Enemy':
        return 'அதிபகை';
      case 'Debilitated':
        return 'நீசம்';
      default:
        return 'சமம்';
    }
  };

  const getPlanetStarLordTa = (nakshatraId: number) => {
    const nak = NAKSHATRAS[nakshatraId];
    return nak ? PLANET_TA[nak.lord] : '-';
  };

  return (
    <div className="report-modal-backdrop fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="report-modal-dialog bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-5xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Control Bar (Non-Printable) */}
        <div className="p-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950 no-print">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-200 font-serif">
                {language === 'ta' ? 'ஸ்ரீ மகா ஜாதக அறிக்கை (Horoscope Report)' : 'Horoscope Report (Print & PDF)'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'ta' ? '5 முக்கிய பகுதிகள் கொண்ட முழுமையான ஜோதிட அறிக்கை' : '5-Section Comprehensive Astrological Report'}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* View Scope Toggle */}
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex items-center text-xs">
              <button
                onClick={() => setViewScope('standard')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  viewScope === 'standard'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'ta' ? 'சுருக்க அறிக்கை' : 'Standard Report'}
              </button>
              <button
                onClick={() => setViewScope('full')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  viewScope === 'full'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'ta' ? 'முழு தசா-புக்தி புத்தகம்' : 'Full Dasa Book'}
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-amber-500/30 transition-all shadow-sm"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>அச்சிடுக (Print)</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? (language === 'ta' ? 'உருவாகிறது...' : 'Generating...') : (language === 'ta' ? 'PDF பதிவிறக்கு' : 'Download PDF')}</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Container */}
        <div className="report-modal-body flex-1 p-3 sm:p-6 overflow-y-auto bg-slate-950 flex flex-col items-center">
          {/* PRINTABLE CONTAINER */}
          <div ref={reportRef} className="printable-page w-full flex flex-col items-center space-y-6">
            {/* =========================================================================
                PAGE 1: 1. பிறப்பு விவரங்கள் | 2. ராசி கட்டம் | 3. நவாம்ச கட்டம் | 4. கிரக நிலைகள்
                ========================================================================= */}
            <div className="report-page-block w-full max-w-4xl bg-white text-slate-900 font-sans p-6 sm:p-8 flex flex-col justify-between rounded-xl shadow-lg border border-slate-200 box-border relative">
              <div className="space-y-3.5">
                {/* Header & Divine Invocation */}
                <div className="border-b-2 border-amber-700/60 pb-2 text-center relative">
                  <div className="text-amber-800 text-[11px] font-serif font-bold tracking-wider mb-0.5">
                    ஸ்ரீ கணபதி துணை • ஸ்ரீ சிவ குடும்பம் திருவடி போற்றி
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold font-serif text-amber-950 tracking-wide">
                    ஸ்ரீ மகா ஜாதகக் கணிப்பு அறிக்கை
                  </h1>
                  <div className="text-xs font-serif font-bold text-amber-900 mt-1 flex items-center justify-center gap-2">
                    <span className="bg-amber-100 border border-amber-300 px-3 py-0.5 rounded-full text-amber-950 font-bold shadow-xs">
                      ஜோதிடர் பெயர் (Astrologer): Jayanthi M
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono mt-1 px-1">
                    <span>திருக்கணித நவகிரக பஞ்சாங்க கணித முறை</span>
                    <span>கணித்தவர்: ஜோதிடர் Jayanthi M</span>
                    <span>கணித்த நாள்: {new Date().toLocaleDateString('ta-IN')}</span>
                  </div>
                </div>

                {/* 1. பிறப்பு விவரங்கள் (Birth Details) */}
                <div className="border border-amber-600/40 rounded-lg overflow-hidden bg-amber-50/20">
                  <div className="bg-amber-100/70 px-3 py-1 border-b border-amber-600/30 flex items-center justify-between">
                    <h2 className="text-xs font-bold font-serif text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>1. ஜாதகர் பிறப்பு விவரங்கள் & பஞ்சாங்கம் (Birth Details)</span>
                    </h2>
                    <span className="text-[10px] font-mono text-amber-900 font-bold">
                      ஜோதிடர்: Jayanthi M • லேஹிரி ({horoscope.panchanga.ayanamsaDegree || `${horoscope.ayanamsa}°`})
                    </span>
                  </div>

                  <div className="p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-1 sm:pb-0 pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">பெயர் (Name):</span>
                      <strong className="text-amber-900 text-sm font-serif truncate block">
                        {horoscope.birthDetails.name || 'ஜாதகர்'}
                      </strong>
                    </div>

                    <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-1 sm:pb-0 pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">பாலினம் (Gender):</span>
                      <strong className="text-slate-800 block">
                        {horoscope.birthDetails.gender === 'female'
                          ? 'பெண்'
                          : horoscope.birthDetails.gender === 'male'
                          ? 'ஆண்'
                          : 'மற்றவை'}
                      </strong>
                    </div>

                    <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-1 sm:pb-0 pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">பிறந்த தேதி & நேரம்:</span>
                      <strong className="text-slate-800 font-mono block">
                        {horoscope.birthDetails.dob} • {horoscope.birthDetails.tob.slice(0, 5)}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">பிறந்த இடம்:</span>
                      <strong className="text-slate-800 truncate block text-[11px]">
                        {horoscope.birthDetails.locationName || 'சென்னை, தமிழ்நாடு'}
                      </strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 sm:border-r pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">ஜென்ம லக்னம்:</span>
                      <strong className="text-amber-800 font-serif block">
                        {lagnaPlanet?.signNameTa || 'லக்னம்'}
                      </strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 sm:border-r pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">ஜென்ம ராசி:</span>
                      <strong className="text-indigo-900 font-serif block">
                        {moonPlanet?.signNameTa || 'ராசி'}
                      </strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 sm:border-r pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">ஜென்ம நட்சத்திரம்:</span>
                      <strong className="text-amber-900 font-serif block">
                        {horoscope.panchanga.nakshatraTa} ({moonPlanet?.pada}-ஆம் பாதம்)
                      </strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5">
                      <span className="text-[10px] text-slate-500 block font-medium">நட்சத்திர அதிபதி:</span>
                      <strong className="text-slate-800 block">{starLordTa} பகவான்</strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 sm:border-r pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">திதி:</span>
                      <strong className="text-slate-800 block truncate">{horoscope.panchanga.tithiTa}</strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 sm:border-r pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">நித்ய யோகம்:</span>
                      <strong className="text-slate-800 block truncate">{horoscope.panchanga.yogaTa}</strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 sm:border-r pr-1">
                      <span className="text-[10px] text-slate-500 block font-medium">கரணம்:</span>
                      <strong className="text-slate-800 block truncate">{horoscope.panchanga.karanaTa}</strong>
                    </div>

                    <div className="border-t border-slate-200 pt-1.5">
                      <span className="text-[10px] text-slate-500 block font-medium">கிழமை (வாரம்):</span>
                      <strong className="text-slate-800 block">{horoscope.panchanga.varaTa}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. ராசி கட்டம் (D1) & 3. நவாம்ச கட்டம் (D9) Side-by-Side */}
                <div className="grid grid-cols-2 gap-3 pt-0.5">
                  <div className="border border-slate-300 rounded-lg p-2 bg-slate-50/40">
                    <div className="text-center mb-1 pb-1 border-b border-slate-200">
                      <h3 className="text-xs font-bold font-serif text-amber-900">
                        2. ராசி கட்டம் (D1 Natal Chart)
                      </h3>
                      <span className="text-[9px] text-slate-500 font-mono">லக்னம் & கிரக அமர்வுகள்</span>
                    </div>
                    <HoroscopeChart
                      chart={horoscope.divisionalCharts['D1']}
                      format="south"
                      language="ta"
                      compact={true}
                      theme="light"
                    />
                  </div>

                  <div className="border border-slate-300 rounded-lg p-2 bg-slate-50/40">
                    <div className="text-center mb-1 pb-1 border-b border-slate-200">
                      <h3 className="text-xs font-bold font-serif text-amber-900">
                        3. நவாம்ச கட்டம் (D9 Navamsa Chart)
                      </h3>
                      <span className="text-[9px] text-slate-500 font-mono">சூட்சும பலன் & களத்திர நிலை</span>
                    </div>
                    <HoroscopeChart
                      chart={horoscope.divisionalCharts['D9']}
                      format="south"
                      language="ta"
                      compact={true}
                      theme="light"
                    />
                  </div>
                </div>

                {/* 4. கிரக நிலைகள் – முழுமையாக தமிழில் (Planetary Positions Table) */}
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1 border-b border-slate-300 flex items-center justify-between">
                    <h3 className="text-xs font-bold font-serif text-slate-900 flex items-center gap-1.5">
                      <span>4. கிரக நிலைகள் – முழுமையான தமிழ் அட்டவணை (Planetary Positions)</span>
                    </h3>
                    <span className="text-[10px] text-slate-600 font-mono">
                      நிராயன முறை (Sidereal System)
                    </span>
                  </div>

                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-amber-50/60 text-amber-950 font-bold border-b border-slate-300">
                        <th className="p-1.5 border-r border-slate-200">கிரகம்</th>
                        <th className="p-1.5 border-r border-slate-200">பாகை & கலை</th>
                        <th className="p-1.5 border-r border-slate-200">ராசி</th>
                        <th className="p-1.5 border-r border-slate-200 text-center">பாவம்</th>
                        <th className="p-1.5 border-r border-slate-200">நட்சத்திரம்</th>
                        <th className="p-1.5 border-r border-slate-200 text-center">பாதம்</th>
                        <th className="p-1.5 border-r border-slate-200">நட்சத்திர நாதன்</th>
                        <th className="p-1.5 border-r border-slate-200">ஆட்சி நிலை</th>
                        <th className="p-1.5 text-center">இயக்கம்</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {horoscope.planets.map((p) => {
                        const degInSign = p.signDegree;
                        const degFormatted = `${Math.floor(degInSign)}° ${Math.floor(
                          (degInSign % 1) * 60
                        )}'`;
                        const isLagna = p.name === 'Lagna';
                        const isRetro = p.isRetrograde && p.name !== 'Lagna' && p.name !== 'Mandhi';
                        const starLord = getPlanetStarLordTa(p.nakshatraId);
                        const dignityTa = getDignityTamil(p.dignityEn);

                        return (
                          <tr
                            key={p.name}
                            className={`hover:bg-amber-50/30 transition-all ${
                              isLagna ? 'bg-amber-100/40 font-semibold' : ''
                            }`}
                          >
                            <td className="p-1.5 border-r border-slate-200 font-bold text-slate-900 flex items-center gap-1">
                              <span>{p.nameTa}</span>
                              {isRetro && (
                                <span className="text-[9px] bg-amber-100 text-amber-900 px-1 py-0.2 rounded border border-amber-300 font-black">
                                  (வ)
                                </span>
                              )}
                            </td>
                            <td className="p-1.5 border-r border-slate-200 font-mono font-bold text-amber-900">
                              {degFormatted}
                            </td>
                            <td className="p-1.5 border-r border-slate-200 text-slate-800 font-serif">
                              {p.signNameTa}
                            </td>
                            <td className="p-1.5 border-r border-slate-200 text-center font-mono font-bold text-indigo-900">
                              {p.house}
                            </td>
                            <td className="p-1.5 border-r border-slate-200 text-slate-800">
                              {p.nakshatraTa}
                            </td>
                            <td className="p-1.5 border-r border-slate-200 text-center font-mono font-bold text-slate-700">
                              {p.pada}
                            </td>
                            <td className="p-1.5 border-r border-slate-200 text-slate-700">
                              {starLord}
                            </td>
                            <td className="p-1.5 border-r border-slate-200">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  dignityTa === 'உச்சம்'
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : dignityTa === 'ஆட்சி'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                    : dignityTa === 'நீசம்'
                                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {dignityTa}
                              </span>
                            </td>
                            <td className="p-1.5 text-center font-semibold">
                              {isLagna ? (
                                <span className="text-slate-400">-</span>
                              ) : isRetro ? (
                                <span className="text-amber-800 font-bold">வக்ரம்</span>
                              ) : (
                                <span className="text-slate-600">நேர்கதி</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Page 1 Footer */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                <span>ஸ்ரீ மகா ஜாதகக் கணிப்பு அறிக்கை • ஜோதிடர்: Jayanthi M • பக்கம் 1 / {viewScope === 'standard' ? '2' : '10'}</span>
                <span>AstroEngine Enterprise Pro • Thirukkanitham Ephemeris</span>
              </div>
            </div>

            {/* =========================================================================
                PAGE 2: 5. விம்சோத்தரி தசா–புத்தி – தொடக்கம், முடிவு மற்றும் பலன்களுடன்
                ========================================================================= */}
            <div className="report-page-block w-full max-w-4xl bg-white text-slate-900 font-sans p-6 sm:p-8 flex flex-col justify-between rounded-xl shadow-lg border border-slate-200 box-border relative">
              <div className="space-y-3.5">
                {/* Section 5 Header */}
                <div className="border-b-2 border-amber-700/60 pb-2 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-amber-950 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>5. விம்சோத்தரி தசா–புத்தி – தொடக்கம் மற்றும் முடிவு விவரங்கள்</span>
                    </h2>
                    <p className="text-[11px] text-slate-600 font-serif">
                      120 வருட பரம ஆயுள் விம்சோத்தரி முறைப்படி கணிக்கப்பட்ட தசா-புக்தி கால அட்டவணை • ஜோதிடர்: Jayanthi M
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
                    Vimshottari 120Y
                  </span>
                </div>

                {/* Sub-Card: Birth Dasa Balance & Current Active Dasa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Birth Dasa Balance */}
                  <div className="border border-indigo-300 rounded-lg p-3 bg-indigo-50/30">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 font-mono">
                        பிறப்பு தசா இருப்பு (At Birth)
                      </span>
                      <span className="text-[9px] text-indigo-700 font-mono">ஜன்ம காலம்</span>
                    </div>

                    {startingDasa ? (
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-indigo-950 font-serif">
                          {startingDasa.mahadasaTa} தசை → {startingDasa.puthiTa} புக்தி
                        </div>
                        <div className="text-slate-700 font-medium">
                          பிறப்பின் போது தசா இருப்பு:{' '}
                          <strong className="text-indigo-900 font-mono font-bold">
                            {startingDasa.balanceYears} வருடம், {startingDasa.balanceMonths} மாதம், {startingDasa.balanceDays} நாள்
                          </strong>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          மகா தசை காலம்: {startingDasa.startDate} முதல் {startingDasa.endDate} வரை
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-500">விவரங்கள் கணிக்கப்படுகிறது...</span>
                    )}
                  </div>

                  {/* Current Active Dasa */}
                  <div className="border border-amber-400 rounded-lg p-3 bg-amber-50/40">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        தற்போது நடக்கும் தசா–புக்தி (Present Active)
                      </span>
                      {presentDasa && (
                        <span className="text-[10px] font-bold font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                          {presentDasa.daysRemainingInPuthi} நாட்கள் பாக்கி
                        </span>
                      )}
                    </div>

                    {presentDasa ? (
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-amber-950 font-serif">
                          {presentDasa.mahadasaTa} தசை → {presentDasa.puthiTa} புக்தி
                          {presentDasa.pratyantaraTa && (
                            <span className="text-slate-600 text-xs font-normal">
                              {' '}
                              ({presentDasa.pratyantaraTa} அந்தரம்)
                            </span>
                          )}
                        </div>
                        <div className="text-slate-700 font-medium">
                          புக்தி நடப்பு காலம்:{' '}
                          <strong className="text-amber-900 font-mono">
                            {presentDasa.puthiStartDate} முதல் {presentDasa.puthiEndDate} வரை
                          </strong>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          மகா தசை காலம்: {presentDasa.startDate} முதல் {presentDasa.endDate} வரை
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-500">விவரங்கள் கணிக்கப்படுகிறது...</span>
                    )}
                  </div>
                </div>

                {/* 9 Mahadasas Overview Table */}
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1 border-b border-slate-300 flex items-center justify-between">
                    <h3 className="text-xs font-bold font-serif text-slate-900">
                      அனைத்து 9 விம்சோத்தரி மகா தசைகளின் கால அட்டவணை (Dasa Timeline)
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">120 Years Cycle</span>
                  </div>

                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-amber-50/50 text-amber-950 font-bold border-b border-slate-300">
                        <th className="p-2 border-r border-slate-200">மகா தசை</th>
                        <th className="p-2 border-r border-slate-200 text-center">கால அளவு</th>
                        <th className="p-2 border-r border-slate-200 font-mono">தொடக்க தேதி</th>
                        <th className="p-2 border-r border-slate-200 font-mono">முடிவு தேதி</th>
                        <th className="p-2 text-center">நிலை</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {horoscope.dasaPeriods.map((d) => {
                        return (
                          <tr
                            key={d.planet}
                            onClick={() => setSelectedDasaPlanet(d.planet)}
                            className={`cursor-pointer transition-all ${
                              d.isCurrent
                                ? 'bg-amber-100/60 font-semibold'
                                : d.isStartingAtBirth
                                ? 'bg-indigo-50/50'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="p-2 border-r border-slate-200 font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{d.planetTa} தசை</span>
                              {d.isCurrent && (
                                <span className="text-[8px] bg-amber-500 text-slate-950 px-1 rounded font-black">
                                  நடப்பு
                                </span>
                              )}
                            </td>
                            <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-700">
                              {d.durationYears} வருடம்
                            </td>
                            <td className="p-2 border-r border-slate-200 font-mono text-slate-800">
                              {d.startDate}
                            </td>
                            <td className="p-2 border-r border-slate-200 font-mono text-slate-800">
                              {d.endDate}
                            </td>
                            <td className="p-2 text-center">
                              {d.isCurrent ? (
                                <span className="text-emerald-700 font-bold text-[10px]">நடப்பில்</span>
                              ) : d.isStartingAtBirth ? (
                                <span className="text-indigo-700 font-bold text-[10px]">ஆரம்பம்</span>
                              ) : d.isFuture ? (
                                <span className="text-slate-500 text-[10px]">எதிர்காலம்</span>
                              ) : (
                                <span className="text-slate-400 text-[10px]">முடிந்தது</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Detailed Bhuktis (Puthis) for Active / Selected Dasa */}
                {(() => {
                  const activeDasaObj =
                    horoscope.dasaPeriods.find((d) => d.planet === selectedDasaPlanet) ||
                    horoscope.dasaPeriods.find((d) => d.isCurrent) ||
                    horoscope.dasaPeriods[0];

                  if (!activeDasaObj || !activeDasaObj.subDasas) return null;

                  return (
                    <div className="border border-amber-600/40 rounded-lg overflow-hidden bg-amber-50/10">
                      <div className="bg-amber-100/60 px-3 py-1.5 border-b border-amber-600/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-serif text-amber-950">
                            விரிவான புக்தி கால அட்டவணை: {activeDasaObj.planetTa} மகா தசை ({activeDasaObj.durationYears} வருடங்கள்)
                          </span>
                          {activeDasaObj.isCurrent && (
                            <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                              தற்போது நடப்பில் உள்ளது
                            </span>
                          )}
                        </div>

                        {/* Interactive Dasa Switcher (non-print) */}
                        <div className="flex items-center gap-1 no-print">
                          <span className="text-[10px] text-slate-500 font-serif">தசையை மாற்றுக:</span>
                          <select
                            value={selectedDasaPlanet}
                            onChange={(e) => setSelectedDasaPlanet(e.target.value as PlanetName)}
                            className="text-[10px] bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-800 font-serif outline-none"
                          >
                            {horoscope.dasaPeriods.map((d) => (
                              <option key={d.planet} value={d.planet}>
                                {d.planetTa} தசை {d.isCurrent ? '(நடப்பு)' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <table className="w-full text-left text-[11px] border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                            <th className="p-2 border-r border-slate-200">புக்தி கிரகம்</th>
                            <th className="p-2 border-r border-slate-200 font-mono">தொடக்க தேதி</th>
                            <th className="p-2 border-r border-slate-200 font-mono">முடிவு தேதி</th>
                            <th className="p-2 border-r border-slate-200 text-center">கால அளவு</th>
                            <th className="p-2 text-center">நிலை</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {activeDasaObj.subDasas.map((sub) => {
                            return (
                              <tr
                                key={sub.planet}
                                className={`hover:bg-amber-50/40 transition-all ${
                                  sub.isCurrent ? 'bg-amber-100/70 font-semibold' : ''
                                }`}
                              >
                                <td className="p-2 border-r border-slate-200 font-bold text-slate-900">
                                  {sub.planetTa} புக்தி
                                </td>
                                <td className="p-2 border-r border-slate-200 font-mono text-slate-700">
                                  {sub.startDate}
                                </td>
                                <td className="p-2 border-r border-slate-200 font-mono text-slate-700">
                                  {sub.endDate}
                                </td>
                                <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-700">
                                  {sub.durationYears} வருடம்
                                </td>
                                <td className="p-2 text-center">
                                  {sub.isCurrent ? (
                                    <span className="text-amber-900 bg-amber-200 px-2 py-0.5 rounded font-bold text-[10px]">
                                      நடப்பு புக்தி
                                    </span>
                                  ) : sub.isFuture ? (
                                    <span className="text-slate-500 text-[10px]">எதிர்காலம்</span>
                                  ) : (
                                    <span className="text-slate-400 text-[10px]">முடிந்தது</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}

                {/* Classical Astrology Note */}
                <div className="bg-amber-50/40 border border-amber-200 rounded p-2 text-[10px] text-amber-950 font-serif leading-relaxed">
                  <strong>குறிப்பு:</strong> விம்சோத்தரி தசா-புக்தி காலங்கள் ஜாதகரின் லக்னம், ராசி மற்றும் கிரக அமைப்புகளுக்கு ஏற்ப துல்லியமாக கணிக்கப்பட்டுள்ளன. ஜோதிட ஆலோசனைக்கு: ஜெயந்தி M.
                </div>
              </div>

              {/* Page 2 Footer */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                <span>ஸ்ரீ மகா ஜாதகக் கணிப்பு அறிக்கை • கணித்தவர்: ஜோதிடர் Jayanthi M • பக்கம் 2 / {viewScope === 'standard' ? '2' : '10'}</span>
                <span>AstroEngine Enterprise Pro • Thirukkanitham Ephemeris</span>
              </div>
            </div>

            {/* =========================================================================
                OPTIONAL ADDITIONAL PAGES FOR "FULL" SCOPE (All 9 Dasas Detailed Bhuktis)
                ========================================================================= */}
            {viewScope === 'full' && (
              <div className="w-full space-y-6">
                {horoscope.dasaPeriods
                  .filter((d) => d.planet !== selectedDasaPlanet)
                  .map((dasa, dasaIndex) => (
                    <div
                      key={dasa.planet}
                      className="report-page-block w-full max-w-4xl bg-white text-slate-900 font-sans p-6 sm:p-8 flex flex-col justify-between rounded-xl shadow-lg border border-slate-200 box-border relative"
                    >
                      <div className="space-y-4">
                        <div className="border-b-2 border-amber-700/60 pb-2 flex items-center justify-between">
                          <div>
                            <h2 className="text-base font-bold font-serif text-amber-950 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-700" />
                              <span>
                                {dasa.planetTa} மகா தசை – விரிவான 9 புக்தி கால அட்டவணை
                              </span>
                            </h2>
                            <p className="text-[11px] text-slate-600 font-mono">
                              காலம்: {dasa.startDate} முதல் {dasa.endDate} வரை ({dasa.durationYears} வருடங்கள்) • ஜோதிடர்: Jayanthi M
                            </p>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded">
                            பக்கம் {dasaIndex + 3}
                          </span>
                        </div>

                        {/* 9 Bhuktis Table */}
                        {dasa.subDasas && (
                          <div className="border border-slate-300 rounded-lg overflow-hidden">
                            <table className="w-full text-left text-[11px] border-collapse">
                              <thead>
                                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                                  <th className="p-2 border-r border-slate-200">புக்தி கிரகம்</th>
                                  <th className="p-2 border-r border-slate-200 font-mono">தொடக்க தேதி</th>
                                  <th className="p-2 border-r border-slate-200 font-mono">முடிவு தேதி</th>
                                  <th className="p-2 border-r border-slate-200 text-center">கால அளவு</th>
                                  <th className="p-2 text-center">நிலை</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {dasa.subDasas.map((sub) => (
                                  <tr
                                    key={sub.planet}
                                    className={`hover:bg-slate-50 transition-all ${
                                      sub.isCurrent ? 'bg-amber-100/60 font-semibold' : ''
                                    }`}
                                  >
                                    <td className="p-2 border-r border-slate-200 font-bold text-slate-900">
                                      {sub.planetTa} புக்தி
                                    </td>
                                    <td className="p-2 border-r border-slate-200 font-mono text-slate-700">
                                      {sub.startDate}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 font-mono text-slate-700">
                                      {sub.endDate}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-700">
                                      {sub.durationYears} வருடம்
                                    </td>
                                    <td className="p-2 text-center">
                                      {sub.isCurrent ? (
                                        <span className="text-amber-900 bg-amber-200 px-2 py-0.5 rounded font-bold text-[10px]">
                                          நடப்பு புக்தி
                                        </span>
                                      ) : sub.isFuture ? (
                                        <span className="text-slate-500 text-[10px]">எதிர்காலம்</span>
                                      ) : (
                                        <span className="text-slate-400 text-[10px]">முடிந்தது</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                        <span>ஸ்ரீ மகா ஜாதகக் கணிப்பு அறிக்கை • கணித்தவர்: ஜோதிடர் Jayanthi M • பக்கம் {dasaIndex + 3}</span>
                        <span>AstroEngine Enterprise Pro • Thirukkanitham Ephemeris</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
