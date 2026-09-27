/**
 * PG ASTROLOGER - DYNAMIC NADI PREDICTION ENGINE (js/nadiPredictionEngine.js)
 * 
 * Generates dynamic Nadi Job & Business Predictions for any Jathagam
 */

const RASI_NAMES = {
  1: "மேஷம்", 2: "ரிஷபம்", 3: "மிதுனம்", 4: "கடகம்",
  5: "சிம்மம்", 6: "கன்னி", 7: "துலாம்", 8: "விருச்சிகம்",
  9: "தனுசு", 10: "மகரம்", 11: "கும்பம்", 12: "மீனம்"
};

const RASI_LORDS = {
  1: "செவ்வாய்", 2: "சுக்கிரன்", 3: "புதன்", 4: "சந்திரன்",
  5: "சூரியன்", 6: "புதன்", 7: "சுக்கிரன்", 8: "செவ்வாய்",
  9: "குரு", 10: "சனி", 11: "சனி", 12: "குரு"
};

const EXALTATION_RASI = {
  "சூரியன்": 1, "சந்திரன்": 2, "செவ்வாய்": 10,
  "புதன்": 6, "குரு": 4, "சுக்கிரன்": 12, "சனி": 7
};

// Get the ruling planet of any house (1-12) from Lagna (1-12)
function getHouseLord(lagnaRasi, houseNum) {
  const rasi = ((lagnaRasi + houseNum - 2) % 12) + 1;
  return RASI_LORDS[rasi];
}

// Calculate house number (1-12) of a planet from Lagna
function getHouseFromLagna(lagnaRasi, planetRasi) {
  return ((planetRasi - lagnaRasi + 12) % 12) + 1;
}

// Check if planet is in Own Sign (ஆட்சி) or Exalted (உச்சம்)
function getPlanetStatus(planetName, planetRasi) {
  if (EXALTATION_RASI[planetName] === planetRasi) return "உச்சம் பெற்று";
  if (RASI_LORDS[planetRasi] === planetName) return "ஆட்சி பெற்று";
  return "அமர்ந்து";
}

/**
 * Generates dynamic Nadi Job & Business Predictions for any Jathagam
 * @param {number} lagnaRasi - 1 (Mesham) to 12 (Meenam)
 * @param {Object} planetRasis - e.g. { "சூரியன்": 1, "சந்திரன்": 4, "செவ்வாய்": 10, ... }
 * @param {Array} dasaPeriods - Array of { dasa, bhukti, startDate, endDate }
 */
function buildDynamicNadiReport(lagnaRasi, planetRasis, dasaPeriods = []) {
  if (!lagnaRasi || !planetRasis) return null;

  const lord1 = getHouseLord(lagnaRasi, 1);
  const lord6 = getHouseLord(lagnaRasi, 6);
  const lord7 = getHouseLord(lagnaRasi, 7);
  const lord9 = getHouseLord(lagnaRasi, 9);
  const lord10 = getHouseLord(lagnaRasi, 10);

  const house1 = getHouseFromLagna(lagnaRasi, planetRasis[lord1] || lagnaRasi);
  const house6 = getHouseFromLagna(lagnaRasi, planetRasis[lord6] || lagnaRasi);
  const house7 = getHouseFromLagna(lagnaRasi, planetRasis[lord7] || lagnaRasi);
  const house10 = getHouseFromLagna(lagnaRasi, planetRasis[lord10] || lagnaRasi);

  const status6 = getPlanetStatus(lord6, planetRasis[lord6]);
  const status10 = getPlanetStatus(lord10, planetRasis[lord10]);

  // Pick favorable Bhuktis dynamically from the user's Dasa-Bhukti list
  const jobPeriod = dasaPeriods.find(
    (p) => p.bhukti === lord6 || p.bhukti === lord10
  ) || dasaPeriods[0] || {
    dasa: lord10,
    bhukti: lord6,
    startDate: "நடப்பு புக்தி ஆரம்பம்",
    endDate: "நடப்பு புக்தி முடிவு"
  };

  const servicePeriod = dasaPeriods.find(
    (p) => p.bhukti === lord1 || p.bhukti === lord9 || p.bhukti === "குரு"
  ) || dasaPeriods[1] || jobPeriod;

  // Determine Job vs Business suitability based on 6th vs 7th house strength
  const goodHouses = [1, 2, 4, 5, 7, 9, 10, 11];
  const isJobStronger = goodHouses.includes(house6) || status6 !== "அமர்ந்து";
  const isBusinessFavorable = goodHouses.includes(house7) && ![6, 8, 12].includes(house7);

  return {
    newJobRule: `நாடி ஜோதிட கோச்சார ராகு விதிப்படி: உத்தியோக ஸ்தான அதிபதி ${lord6} ${house6}-ல் ${status6} உள்ளதால், கோச்சார ராகு 6-ஆம் அதிபதி ${lord6} மற்றும் 10-ஆம் அதிபதி ${lord10}-ன் 1, 5, 9 திரிகோண வீடுகளில் சஞ்சரிக்கும் ${jobPeriod.dasa} தசை - ${jobPeriod.bhukti} புக்தி (${jobPeriod.startDate} முதல் ${jobPeriod.endDate} வரை) காலகட்டத்தில் புதிய வேலை வாய்ப்பு ஆணை (Appointment Order) நிச்சயமாகக் கைக்கு வரும்.`,

    peakOfferWindow: `${jobPeriod.startDate} முதல் ${jobPeriod.endDate} வரை காலகட்டத்தில் நல்ல சம்பளத்தில் புதிய உத்தியோகத்தில் அமரும் யோகம் உறுதியாகிறது.`,

    jobRecommendation: isJobStronger
      ? `100% முதன்மைப் பரிந்துரை! 6-ஆம் அதிபதி ${lord6} ${house6}-ல் ${status6} உள்ளதால், நிறுவனங்களில் பணிபுரிந்து மாதச் சம்பளம் பெறுவதே நிலையான தனலாபத்தையும் பொருளாதார பாதுகாப்பையும் தரும்.`
      : `6-ஆம் அதிபதி ${lord6} ${house6}-ல் உள்ளதால், நிதானமாக முயற்சி செய்து நிலையான உத்தியோகத்தைத் தேர்ந்தெடுப்பது நன்மை தரும்.`,

    businessRecommendation: isBusinessFavorable
      ? `7-ஆம் அதிபதி ${lord7} ${house7}-ஆம் பாவகத்தில் பலமாக உள்ளதால், அனுபவத்திற்குப் பிறகு சொந்த தொழில் தொடங்குவது முன்னேற்றம் தரும்.`
      : `தற்போது வேண்டாம் (Avoid Heavy Capital Business). 7-ஆம் அதிபதி ${lord7} (${house7}-ல்) அமைப்பால் இப்போது அதிக முதலீடு செய்து சொந்த வர்த்தகம் தொடங்கினால் சிரமங்கள் வரலாம்.`,

    consultancyRecommendation: `10-ஆம் அதிபதி ${lord10} (${house10}-ல் ${status10}) + 9-ஆம் அதிபதி ${lord9} + லக்னாதிபதி ${lord1} (${house1}-ல்) தொடர்பு இருப்பதால், ${servicePeriod.startDate} முதல் ${servicePeriod.endDate} வரை (${servicePeriod.dasa} தசை - ${servicePeriod.bhukti} புக்தி) காலகட்டத்தில் பகுதி நேர ஆலோசனை / சேவை சார்ந்த தொழில் (Freelance/Consultancy) செய்யலாம்.`
  };
}

// Browser & Node Export Compatibility
if (typeof window !== 'undefined') {
  window.PGAstroNadi = {
    RASI_NAMES,
    RASI_LORDS,
    EXALTATION_RASI,
    getHouseLord,
    getHouseFromLagna,
    getPlanetStatus,
    buildDynamicNadiReport
  };
  window.buildDynamicNadiReport = buildDynamicNadiReport;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RASI_NAMES,
    RASI_LORDS,
    EXALTATION_RASI,
    getHouseLord,
    getHouseFromLagna,
    getPlanetStatus,
    buildDynamicNadiReport
  };
}
