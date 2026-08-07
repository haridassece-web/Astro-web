import type { Panchanga, PlanetPosition } from '../types/astrology';
import { normalize360 } from './astronomy';

export const VARA_LIST = [
  { en: 'Sunday', ta: 'ஞாயிற்றுக்கிழமை', lord: 'Sun' },
  { en: 'Monday', ta: 'திங்கட்கிழமை', lord: 'Moon' },
  { en: 'Tuesday', ta: 'செவ்வாய்க்கிழமை', lord: 'Mars' },
  { en: 'Wednesday', ta: 'புதன்கிழமை', lord: 'Mercury' },
  { en: 'Thursday', ta: 'வியாழக்கிழமை', lord: 'Jupiter' },
  { en: 'Friday', ta: 'வெள்ளிக்கிழமை', lord: 'Venus' },
  { en: 'Saturday', ta: 'சனிக்கிழமை', lord: 'Saturn' },
];

export const TITHI_NAMES = [
  { en: 'Pratipada', ta: 'பிரதமை' },
  { en: 'Dwitiya', ta: 'திதியை' },
  { en: 'Tritiya', ta: 'திரிதியை' },
  { en: 'Chaturthi', ta: 'சதுர்த்தி' },
  { en: 'Panchami', ta: 'பஞ்சமி' },
  { en: 'Shasthi', ta: 'சஷ்டி' },
  { en: 'Saptami', ta: 'சப்தமி' },
  { en: 'Ashtami', ta: 'அஷ்டமி' },
  { en: 'Navami', ta: 'நவமி' },
  { en: 'Dashami', ta: 'தசமி' },
  { en: 'Ekadashi', ta: 'ஏகாதசி' },
  { en: 'Dwadashi', ta: 'துவாடசி' },
  { en: 'Trayodashi', ta: 'திரயோதசி' },
  { en: 'Chaturdashi', ta: 'சதுர்தசி' },
  { en: 'Purnima / Amavasya', ta: 'பௌர்ணமி / அமாவாசை' },
];

export const YOGA_NAMES = [
  { en: 'Vishkumbha', ta: 'விஷ்கம்பம்' },
  { en: 'Priti', ta: 'ப்ரீதி' },
  { en: 'Ayushman', ta: 'ஆயுஷ்மான்' },
  { en: 'Saubhagya', ta: 'சௌபாக்கியம்' },
  { en: 'Sobhana', ta: 'சோபனம்' },
  { en: 'Atiganda', ta: 'அதிகண்டம்' },
  { en: 'Sukarma', ta: 'சுகர்மம்' },
  { en: 'Dhriti', ta: 'திருதி' },
  { en: 'Shoola', ta: 'சூலம்' },
  { en: 'Ganda', ta: 'கண்டம்' },
  { en: 'Vriddhi', ta: 'விருத்தி' },
  { en: 'Dhruva', ta: 'துருவம்' },
  { en: 'Vyaghata', ta: 'வியாகாதம்' },
  { en: 'Harshana', ta: 'ஹர்ஷணம்' },
  { en: 'Vajra', ta: 'வஜ்ரம்' },
  { en: 'Siddhi', ta: 'சித்தி' },
  { en: 'Vyatipata', ta: 'வியதீபாதம்' },
  { en: 'Variyan', ta: 'வாரியான்' },
  { en: 'Parigha', ta: 'பரிகம்' },
  { en: 'Shiva', ta: 'சிவம்' },
  { en: 'Siddha', ta: 'சித்த' },
  { en: 'Sadhya', ta: 'சாத்தியம்' },
  { en: 'Shubha', ta: 'சுபம்' },
  { en: 'Shukla', ta: 'சுப்பிரம்' },
  { en: 'Brahma', ta: 'பிரம்மம்' },
  { en: 'Indra', ta: 'இந்திரம்' },
  { en: 'Vaidhriti', ta: 'வைதிருதி' },
];

export const KARANA_NAMES = [
  { en: 'Bava', ta: 'பவ' },
  { en: 'Balava', ta: 'பாலவ' },
  { en: 'Kaulava', ta: 'கௌலவ' },
  { en: 'Taitila', ta: 'தைதுலை' },
  { en: 'Garaja', ta: 'கரசை' },
  { en: 'Vanija', ta: 'வணிஜை' },
  { en: 'Vishti (Bhadra)', ta: 'பத்ரை (விஷ்டி)' },
  { en: 'Shakuni', ta: 'சகுனி' },
  { en: 'Chatushpada', ta: 'சதுஷ்பாதம்' },
  { en: 'Naga', ta: 'நாகவம்' },
  { en: 'Kintughna', ta: 'கிமஸ்துக்னம்' },
];

export function calculatePanchanga(dob: string, planets: PlanetPosition[], ayanamsa: number, system: 'thirukkanitham' | 'vakkiyam' = 'thirukkanitham'): Panchanga {
  const dateObj = new Date(dob);
  const dayOfWeek = dateObj.getDay();
  const vara = VARA_LIST[dayOfWeek];

  const sun = planets.find((p) => p.name === 'Sun')!;
  const moon = planets.find((p) => p.name === 'Moon')!;

  const diff = normalize360(moon.longitude - sun.longitude);
  const tithiIndexRaw = Math.floor(diff / 12);
  const tithiType: 'Shukla' | 'Krishna' = tithiIndexRaw < 15 ? 'Shukla' : 'Krishna';
  const tithiSubIndex = tithiIndexRaw % 15;
  const tithiName = TITHI_NAMES[tithiSubIndex];

  let tithiEn = `${tithiType} ${tithiName.en}`;
  let tithiTa = `${tithiType === 'Shukla' ? 'வளர்பிறை' : 'தேய்பிறை'} ${tithiName.ta}`;
  if (tithiIndexRaw === 14) {
    tithiEn = 'Purnima (Full Moon)';
    tithiTa = 'பௌர்ணமி (முழு நிலவு)';
  } else if (tithiIndexRaw === 29) {
    tithiEn = 'Amavasya (New Moon)';
    tithiTa = 'அமாவாசை (அமாவாசை)';
  }

  const nakshatraIndex = moon.nakshatraId;
  const nakshatraEn = moon.nakshatraEn;
  const nakshatraTa = moon.nakshatraTa;

  const sum = normalize360(sun.longitude + moon.longitude);
  const yogaIndex = Math.floor(sum / (360 / 27)) % 27;
  const yoga = YOGA_NAMES[yogaIndex];

  const karanaIndexRaw = Math.floor(diff / 6);
  let karanaObj: { en: string; ta: string };
  if (karanaIndexRaw === 0) {
    karanaObj = KARANA_NAMES[10]; // Kintughna (0°-6°)
  } else if (karanaIndexRaw === 57) {
    karanaObj = KARANA_NAMES[7];  // Shakuni (342°-348°)
  } else if (karanaIndexRaw === 58) {
    karanaObj = KARANA_NAMES[8];  // Chatushpada (348°-354°)
  } else if (karanaIndexRaw === 59) {
    karanaObj = KARANA_NAMES[9];  // Naga (354°-360°)
  } else {
    // Slots 1 to 56 repeat 7 movable Karanas starting from Bava (0)
    karanaObj = KARANA_NAMES[(karanaIndexRaw - 1) % 7];
  }

  const taraRating = (nakshatraIndex % 9) + 1;
  const taraNames = [
    { en: 'Janma Tara (Neutral)', ta: 'ஜென்ம தாரை', rating: 3 },
    { en: 'Sampat Tara (Excellent)', ta: 'சம்பத்து தாரை', rating: 5 },
    { en: 'Vipat Tara (Obstacles)', ta: 'விபத்து தாரை', rating: 1 },
    { en: 'Kshema Tara (Favorable)', ta: 'க்ஷேம தாரை', rating: 4 },
    { en: 'Pratyak Tara (Challenges)', ta: 'பிரத்யக் தாரை', rating: 2 },
    { en: 'Sadhana Tara (Success)', ta: 'சாதன தாரை', rating: 5 },
    { en: 'Naidhana Tara (Critical)', ta: 'நைதன தாரை', rating: 1 },
    { en: 'Mitra Tara (Friendly)', ta: 'மித்ர தாரை', rating: 4 },
    { en: 'Parama Mitra Tara (Great Friend)', ta: 'பரம மித்ர தாரை', rating: 5 },
  ];
  const taraInfo = taraNames[taraRating - 1];

  // Comprehensive Vedic Chandra Balam Calculation
  const moonSunAngle = normalize360(moon.longitude - sun.longitude);
  const isBrightMoon = moonSunAngle >= 90 && moonSunAngle <= 270;
  const isWaxing = moonSunAngle >= 0 && moonSunAngle < 180;

  const isExaltedMoon = moon.signId === 1; // Taurus
  const isOwnMoon = moon.signId === 3;     // Cancer
  const isDebilitatedMoon = moon.signId === 7; // Scorpio

  const moonHouse = moon.house;
  const favorableHouses = [1, 3, 5, 7, 9, 10, 11];

  let chandraRating = 3;
  let chandraStatusTa = 'மத்திம சந்திர பலம்';
  let chandraStatusEn = 'Moderate Chandra Balam';

  if (moonHouse === 8 || isDebilitatedMoon) {
    chandraRating = 1;
    chandraStatusTa = isDebilitatedMoon
      ? 'நீசச் சந்திர தோஷம் (விருச்சிகம் - பலவீனம்)'
      : 'சந்திராஷ்டம பாவம் (8-ஆம் பாவம் - மறைவு தோஷம்)';
    chandraStatusEn = isDebilitatedMoon
      ? 'Debilitated Moon in Scorpio (Afflicted)'
      : 'Chandrashtama Placement (8th House)';
  } else if (isExaltedMoon) {
    chandraRating = 5;
    chandraStatusTa = 'உச்சச் சந்திர பலம் (ரிஷபம் - உன்னத பலன்)';
    chandraStatusEn = 'Exalted Moon in Taurus (Supreme Strength)';
  } else if (isOwnMoon) {
    chandraRating = 5;
    chandraStatusTa = 'ஆட்சிச் சந்திர பலம் (கடகம் - உன்னத சுபம்)';
    chandraStatusEn = 'Own House Moon in Cancer (High Strength)';
  } else if (isBrightMoon && favorableHouses.includes(moonHouse)) {
    chandraRating = 5;
    chandraStatusTa = 'பூரண வளர்பிறை சுப சந்திர பலம் (உன்னதம்)';
    chandraStatusEn = 'Bright Waxing Moon in Favorable House (Excellent)';
  } else if (favorableHouses.includes(moonHouse) || isWaxing) {
    chandraRating = 4;
    chandraStatusTa = 'நன்மையான சந்திர பலம்';
    chandraStatusEn = 'Favorable Chandra Balam';
  } else if (moonHouse === 6 || moonHouse === 12) {
    chandraRating = 2;
    chandraStatusTa = 'மறைவுச் சந்திர பலம் (6/12-ஆம் பாவம்)';
    chandraStatusEn = 'Hidden House Moon (6th/12th House)';
  }

  return {
    systemEn: system === 'thirukkanitham' ? 'Thirukkanitha Ephemeris' : 'Vakkiya Panchangam',
    systemTa: system === 'thirukkanitham' ? 'திருக்கணித முறை' : 'வாக்கிய முறை',
    varaEn: vara.en,
    varaTa: vara.ta,
    varaLord: vara.lord,
    tithiEn,
    tithiTa,
    tithiType,
    tithiIndex: tithiIndexRaw + 1,
    nakshatraEn,
    nakshatraTa,
    nakshatraIndex: nakshatraIndex + 1,
    yogaEn: yoga.en,
    yogaTa: yoga.ta,
    yogaIndex: yogaIndex + 1,
    karanaEn: karanaObj.en,
    karanaTa: karanaObj.ta,
    karanaIndex: karanaIndexRaw + 1,
    taraBalam: { statusEn: taraInfo.en, statusTa: taraInfo.ta, rating: taraInfo.rating },
    chandraBalam: {
      statusEn: chandraStatusEn,
      statusTa: chandraStatusTa,
      rating: chandraRating,
    },
    ayanamsaDegree: `${Math.floor(ayanamsa)}° ${Math.floor((ayanamsa % 1) * 60)}'`,
  };
}
