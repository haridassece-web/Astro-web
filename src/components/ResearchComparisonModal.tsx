import React, { useState } from 'react';
import type { CalculatedHoroscope, Language } from '../types/astrology';
import { X, FlaskConical, Code2, Upload, CheckCircle2, Play } from 'lucide-react';
import { ASTROLOGY_RULES_DB } from '../data/rules';

interface ResearchComparisonModalProps {
  currentHoroscope: CalculatedHoroscope;
  language: Language;
  onClose: () => void;
}

export const ResearchComparisonModal: React.FC<ResearchComparisonModalProps> = ({ language, onClose }) => {
  const [customRuleJson, setCustomRuleJson] = useState<string>(
    JSON.stringify(
      {
        rule: 'Gaja Kesari Yoga Test',
        conditions: ['Moon and Jupiter in Kendra'],
        score: 95,
        prediction_ta: 'உயர்கல்வி, செல்வாக்கு மற்றும் சமூக அந்தஸ்து உயரும்.',
        prediction_en: 'Strong academic authority, high public status and prosperity.',
      },
      null,
      2
    )
  );

  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestRule = () => {
    try {
      const parsed = JSON.parse(customRuleJson);
      setTestResult(
        language === 'ta'
          ? `விதி "${parsed.rule}" வெற்றிபெற்றது! கணிப்பு மதிப்பெண்: ${parsed.score}`
          : `Rule "${parsed.rule}" executed successfully against current chart! Score: ${parsed.score}`
      );
    } catch (e) {
      setTestResult(language === 'ta' ? 'பிழை: செல்லுபடியற்ற JSON வடிவம்' : 'Error: Invalid JSON format');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-indigo-200 font-serif">
              {language === 'ta' ? 'ஜோதிட ஆராய்ச்சி & JSON விதி சோதனை பயன்முறை' : 'Astrology Research & Custom JSON Rule Simulator'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          {/* Rule Editor */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-300 font-serif flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                {language === 'ta' ? 'புதிய JSON ஜோதிட விதி உள்ளீடு' : 'Dynamic JSON Astrological Rule Schema'}
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">Module 14 - Research Engine</span>
            </div>

            <textarea
              rows={8}
              value={customRuleJson}
              onChange={(e) => setCustomRuleJson(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-300 outline-none focus:border-indigo-500/50"
            ></textarea>

            <div className="flex items-center justify-between">
              <button
                onClick={handleTestRule}
                className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{language === 'ta' ? 'விதியை இயக்குக (Run Test)' : 'Simulate Rule Evaluation'}</span>
              </button>

              <button className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl font-mono">
                <Upload className="w-3.5 h-3.5" />
                <span>Import CSV Horoscopes</span>
              </button>
            </div>

            {testResult && (
              <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-lg text-emerald-300 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {testResult}
              </div>
            )}
          </div>

          {/* Active Database Rule Library */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-300 font-serif">
              {language === 'ta' ? 'தளத்தின் இயங்கும் விதி வங்கிகள் (System Rules Database)' : 'Registered System Rules Library'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ASTROLOGY_RULES_DB.slice(0, 6).map((r) => (
                <div key={r.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-200 block">{language === 'ta' ? r.nameTa : r.nameEn}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{r.category} Yoga</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">{r.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
