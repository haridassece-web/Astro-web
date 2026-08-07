import type { Language } from '../types/astrology';

export interface PrasannamResult {
  udayaLagnaEn: string;
  udayaLagnaTa: string;
  arudhaLagnaEn: string;
  arudhaLagnaTa: string;
  kavippuEn: string;
  kavippuTa: string;
  jamakkolPlanet: string;
  jamakkolPlanetTa: string;
  queryVerdictEn: string;
  queryVerdictTa: string;
  recommendationEn: string;
  recommendationTa: string;
  successProbability: number;
}

export function calculatePrasannam(queryCategory: 'career' | 'health' | 'marriage' | 'business' | 'general' = 'general', seedNumber: number = 77, _language: Language = 'ta'): PrasannamResult {
  const zodiacEn = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const zodiacTa = ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'];

  const now = new Date();
  const currentHour = now.getHours();

  const udayaIndex = (currentHour * 2 + Math.floor(now.getMinutes() / 30)) % 12;
  const arudhaIndex = (seedNumber + udayaIndex) % 12;
  const kavippuIndex = (11 - arudhaIndex + 12) % 12;

  const jamakkolPlanets = [
    { en: 'Sun (Surya)', ta: 'சூரியன்' },
    { en: 'Jupiter (Guru)', ta: 'குரு' },
    { en: 'Venus (Sukra)', ta: 'சுக்கிரன்' },
    { en: 'Mars (Chevvai)', ta: 'செவ்வாய்' },
  ];
  const activeJamakPlanet = jamakkolPlanets[seedNumber % 4];

  let verdictEn = 'Highly Favorable Auspicious Prasannam Outcome';
  let verdictTa = 'மிகவும் சாதகமான சுப பலன் கிட்டும்';
  let recommendationEn = 'Proceed with full confidence. Divine grace and planetary alignment favor your initiative.';
  let recommendationTa = 'முழு நம்பிக்கையுடன் முயற்சியைத் தொடரலாம். காரிய சித்தி நிச்சயம் உண்டாகும்.';
  let successProbability = 88;

  if (queryCategory === 'career') {
    verdictEn = 'Career Elevation & Professional Victory Indicated';
    verdictTa = 'உயர் பதவி மற்றும் தொழில் வெற்றி நிச்சயம்';
    recommendationEn = 'The Arudha-Udaya alignment guarantees favorable decisions from management and interviewers.';
    recommendationTa = 'ஆருட-உதய லக்னச் சேர்க்கை அதிகாரிகளின் ஆதரவையும் உயர் பதவியையும் பெற்றுத் தரும்.';
    successProbability = 92;
  } else if (queryCategory === 'marriage') {
    verdictEn = 'Marital Harmony & Auspicious Proposal Union';
    verdictTa = 'சுப மங்கல்யம் & திருமணப் பேச்சுவார்த்தை வெற்றி';
    recommendationEn = 'Venusian Arudha aspect ensures smooth alliance finalization within upcoming fortnight.';
    recommendationTa = 'சுக்கிர பகவானின் சுபப்பார்வை திருமணப் பேச்சை விரைந்து சுபமாக முடித்து வைக்கும்.';
    successProbability = 85;
  }

  return {
    udayaLagnaEn: zodiacEn[udayaIndex],
    udayaLagnaTa: zodiacTa[udayaIndex],
    arudhaLagnaEn: zodiacEn[arudhaIndex],
    arudhaLagnaTa: zodiacTa[arudhaIndex],
    kavippuEn: zodiacEn[kavippuIndex],
    kavippuTa: zodiacTa[kavippuIndex],
    jamakkolPlanet: activeJamakPlanet.en,
    jamakkolPlanetTa: activeJamakPlanet.ta,
    queryVerdictEn: verdictEn,
    queryVerdictTa: verdictTa,
    recommendationEn,
    recommendationTa,
    successProbability,
  };
}
