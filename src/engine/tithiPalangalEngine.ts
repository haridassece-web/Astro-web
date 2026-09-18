import type {
  Panchanga,
  PlanetPosition,
  TithiSoonyaReport,
  IndividualBhavaAnalysis,
  IndividualGrahaAnalysis,
  PlanetName,
} from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/constants';
import {
  TITHI_SOONYA_MAP,
  BADHAKA_RULES,
  BHAVA_PALANGAL_MASTER,
  GRAHA_KARAKATVA_MASTER,
} from '../data/tithiSoonyaBadhakaData';

const PLANET_TAMIL_NAMES: Record<string, string> = {
  Sun: 'சூரியன்',
  Moon: 'சந்திரன்',
  Mars: 'செவ்வாய்',
  Mercury: 'புதன்',
  Jupiter: 'குரு',
  Venus: 'சுக்கிரன்',
  Saturn: 'சனி',
  Rahu: 'ராகு',
  Ketu: 'கேது',
  Lagna: 'லக்னம்',
};

export function calculateTithiSoonyaReport(
  planets: PlanetPosition[],
  lagnaSignId: number,
  panchanga: Panchanga
): TithiSoonyaReport {
  // 1. Determine Tithi details
  // panchanga.tithiIndex is 1 to 30
  const tithiIndexRaw = Math.max(0, Math.min(29, (panchanga.tithiIndex || 1) - 1));
  const tithiNumber = (tithiIndexRaw % 15) + 1; // 1 to 15
  const paksha: 'Shukla' | 'Krishna' = tithiIndexRaw < 15 ? 'Shukla' : 'Krishna';

  const tithiRule = TITHI_SOONYA_MAP[tithiNumber] || TITHI_SOONYA_MAP[1];
  const soonyaSignIds = tithiRule.soonyaSignIds;
  const soonyaSignsEn = tithiRule.soonyaSignsEn;
  const soonyaSignsTa = tithiRule.soonyaSignsTa;

  // 2. Soonya Bhavas from Lagna (1 to 12)
  const soonyaBhavas = soonyaSignIds.map((sId) => ((sId - lagnaSignId + 12) % 12) + 1);

  // 3. Soonya Lords
  const soonyaLords = Array.from(new Set(soonyaSignIds.map((sId) => ZODIAC_SIGNS[sId].lord)));
  const soonyaLordsTa = soonyaLords.map((l) => PLANET_TAMIL_NAMES[l] || l);

  // 4. Badhaka Sthana based on Lagna Type (Chara: 11, Sthira: 9, Ubhaya: 7)
  let lagnaType: 'Chara' | 'Sthira' | 'Ubhaya' = 'Chara';
  if ([0, 3, 6, 9].includes(lagnaSignId)) {
    lagnaType = 'Chara';
  } else if ([1, 4, 7, 10].includes(lagnaSignId)) {
    lagnaType = 'Sthira';
  } else {
    lagnaType = 'Ubhaya';
  }

  const badhakaRule = BADHAKA_RULES[lagnaType];
  const badhakaBhava = badhakaRule.badhakaHouseNum;
  const badhakaSignId = (lagnaSignId + badhakaBhava - 1) % 12;
  const badhakaSignInfo = ZODIAC_SIGNS[badhakaSignId];
  const badhakaSignNameEn = badhakaSignInfo.nameEn;
  const badhakaSignNameTa = badhakaSignInfo.nameTa;
  const badhakadhipati = badhakaSignInfo.lord;
  const badhakadhipatiTa = PLANET_TAMIL_NAMES[badhakadhipati] || badhakadhipati;

  const badhakaPlanetPos = planets.find((p) => p.name === badhakadhipati);
  const badhakadhipatiPlacementBhava = badhakaPlanetPos
    ? ((badhakaPlanetPos.signId - lagnaSignId + 12) % 12) + 1
    : badhakaBhava;

  // 5. Planetary Occupancy in Soonya & Badhaka
  const planetsInSoonya = planets.filter(
    (p) => p.name !== 'Lagna' && soonyaSignIds.includes(p.signId)
  );
  const planetsInBadhaka = planets.filter(
    (p) => p.name !== 'Lagna' && p.signId === badhakaSignId
  );

  // 6. Mitigations Evaluation
  const hasUpachayaMitigation = soonyaBhavas.some((b) => [3, 6, 10, 11].includes(b));
  const hasLeoSagittariusMitigation = soonyaSignIds.some((sId) => sId === 4 || sId === 8);

  const jupiter = planets.find((p) => p.name === 'Jupiter');
  let hasGuruAspectMitigation = false;
  if (jupiter) {
    // Jupiter aspects 5th (signId + 4), 7th (signId + 6), 9th (signId + 8) and sits in signId
    const jupAspectSigns = [
      jupiter.signId,
      (jupiter.signId + 4) % 12,
      (jupiter.signId + 6) % 12,
      (jupiter.signId + 8) % 12,
    ];
    hasGuruAspectMitigation = soonyaSignIds.some((sId) => jupAspectSigns.includes(sId));
  }

  const sun = planets.find((p) => p.name === 'Sun');
  const moon = planets.find((p) => p.name === 'Moon');
  let hasSunMoonMitigation = false;
  if (sun && soonyaSignIds.includes(sun.signId)) hasSunMoonMitigation = true;
  if (moon && soonyaSignIds.includes(moon.signId)) hasSunMoonMitigation = true;
  if (sun && soonyaSignIds.includes((sun.signId + 6) % 12)) hasSunMoonMitigation = true;
  if (moon && soonyaSignIds.includes((moon.signId + 6) % 12)) hasSunMoonMitigation = true;

  const activeMitigationsTa: string[] = [];
  const activeMitigationsEn: string[] = [];

  if (hasUpachayaMitigation) {
    activeMitigationsTa.push(
      'உபஜெய ஸ்தான விலக்கு: திதி சூன்ய பாவகங்கள் 3, 6, 10, 11-ல் அமைந்திருப்பதால் ஆரம்பப் போராட்டங்களுக்குப் பின் மகத்தான வெற்றி உண்டு.'
    );
    activeMitigationsEn.push(
      'Upachaya Exemption: Soonya falls in 3, 6, 10, or 11, mitigating core dosha and assuring ultimate triumph.'
    );
  }
  if (hasLeoSagittariusMitigation) {
    activeMitigationsTa.push(
      'சூரிய-குரு வீடுகளின் விலக்கு: சிம்மம் அல்லது தனுசு திதி சூன்யமானதால் தோஷ வீரியம் பெருமளவில் குறைகிறது.'
    );
    activeMitigationsEn.push(
      'Royal Sign Immunity: Leo or Sagittarius being Soonya drastically minimizes negative impact due to Solar/Jovian sanctity.'
    );
  }
  if (hasGuruAspectMitigation) {
    activeMitigationsTa.push(
      'குரு பார்வை தீர்வு: குரு பகவானின் சுபப் பார்வை திதி சூன்ய வீட்டின் மீது விழுவதால் தெய்வீக நிவாரணமும் வழிநடத்துதலும் கிடைக்கும்.'
    );
    activeMitigationsEn.push(
      'Jupiter Aspect Mitigation: Holy drishti of Jupiter illuminates the Soonya sign, unlocking divine redemption.'
    );
  }
  if (hasSunMoonMitigation) {
    activeMitigationsTa.push(
      'ராஜ கிரகங்களின் தீர்வு: சூரியன் அல்லது சந்திரன் திதி சூன்யத்தில் இணைந்தோ பார்த்தோ உள்ளதால் கர்ம வினைகள் சமன் செய்யப்படும்.'
    );
    activeMitigationsEn.push(
      'Luminary Alignment: Sun or Moon presence/aspect in the Soonya sign accelerates karmic clearance.'
    );
  }

  // 7. Paksha Impact Analysis (Page 2 & 3)
  const pakshaTitleTa =
    paksha === 'Shukla'
      ? 'வளர்பிறை (சுக்ல பக்ஷம்) – 70% உயிர் காரக பாதிப்பு, 30% பொருளாதார பாதிப்பு'
      : 'தேய்பிறை (கிருஷ்ண பக்ஷம்) – பொருளாதார சோதனைகள் முற்பகுதி, வியத்தகு வளர்ச்சி பிற்பகுதி';

  const pakshaTitleEn =
    paksha === 'Shukla'
      ? 'Shukla Paksha (Waxing Phase) – 70% Relational/Vital Impact, 30% Financial Impact'
      : 'Krishna Paksha (Waning Phase) – Early Financial Battles, Solid Elevation in Later Years';

  const pakshaImpactTa =
    paksha === 'Shukla'
      ? 'வளர்பிறையில் பிறந்த உங்களுக்கு ஆரம்ப வாழ்க்கை நன்மைகளுடன் தொடங்கும்; பிற்பகுதியில் உயிர் காரகங்கள் மற்றும் உறவுமுறைகளில் அதிக சோதனைகள் எழும். உயிர் பாதிப்புகள் வரும் காலங்களில் பொருளாதார வரவு அதிகரிக்கும்.'
      : 'தேய்பிறையில் பிறந்த உங்களுக்கு இளமையில் கடுமையான பொருளாதார நெருக்கடிகளும் பணத் தடைகளும் தோன்றும்; ஆனால் அந்த வினைகள் கழிந்த பிறகு பிற்பகுதியில் அசைக்க முடியாத செல்வமும் நன்மையும் உண்டாகும்.';

  const pakshaImpactEn =
    paksha === 'Shukla'
      ? 'Born in Shukla Paksha, your early life starts on a pleasant footing; later years test relationships and physical vitality (70% impact). Ironically, financial gains surge alongside life tests.'
      : 'Born in Krishna Paksha, early years impose financial scarcity and liquidity hurdles; once this karmic debt is paid, the latter half of life unlocks enduring wealth and prosperity.';

  // 8. Individual Tailored Critical Warnings
  const criticalWarningsTa: string[] = [];
  const criticalWarningsEn: string[] = [];

  // Mercury check
  const isMercuryAfflicted =
    soonyaLords.includes('Mercury') ||
    badhakadhipati === 'Mercury' ||
    planetsInSoonya.some((p) => p.name === 'Mercury') ||
    planetsInBadhaka.some((p) => p.name === 'Mercury');

  if (isMercuryAfflicted) {
    criticalWarningsTa.push(
      'புதன் சூன்யம்/பாதக எச்சரிக்கை: யாருக்கும் ஜாமீன் அல்லது உத்தரவாத கையெழுத்து போடக் கூடாது! கூட்டுத் தொழில் (Partnership Business) அறவே கூடாது; கையெழுத்து, காசோலைகளில் மிகுந்த விழிப்புணர்வு தேவை.'
    );
    criticalWarningsEn.push(
      'Mercury Affliction Caution: NEVER provide surety/guarantee signatures for anyone! Strictly avoid partnership businesses; verify all contracts and cheque payments diligently.'
    );
  }

  // 8th House or Mars/Rahu storm check
  const hasEighthSoonya = soonyaBhavas.includes(8) || badhakaBhava === 8;
  const mars = planets.find((p) => p.name === 'Mars');
  const rahu = planets.find((p) => p.name === 'Rahu');
  const isStormSensitive =
    hasEighthSoonya ||
    (mars && [1, 4, 8, 12].includes(((mars.signId - lagnaSignId + 12) % 12) + 1)) ||
    (rahu && [1, 4, 8, 12].includes(((rahu.signId - lagnaSignId + 12) % 12) + 1));

  if (isStormSensitive) {
    criticalWarningsTa.push(
      'இயற்கை சீற்ற பாதுகாப்பு: இடி, மின்னல், மழைக்கால புயல்களின் போது எக்காரணம் கொண்டும் வெளியில் அல்லது மரங்களின் கீழ் செல்லக் கூடாது. கூட்ட நெரிசல் மற்றும் கலவரப் பகுதிகளைத் தவிர்க்கவும்.'
    );
    criticalWarningsEn.push(
      'Thunderstorm & Ambient Warning: Avoid stepping outdoors or sheltering under tall trees during lightning and thunderstorms. Strictly stay away from violent crowd mobs and riot zones.'
    );
  }

  // 10th House check
  const hasTenthSoonya = soonyaBhavas.includes(10) || badhakaBhava === 10;
  if (hasTenthSoonya) {
    criticalWarningsTa.push(
      '10-ஆம் பாவக சூன்ய விதி: குழந்தையை தத்து எடுக்கக் கூடாது! அதிக கடன் வாங்கி தொழிலில் பெரிய அளவில் முதலீடு செய்யக் கூடாது; முதல் தொழிலில் நஷ்டம் ஏற்பட வாய்ப்புள்ளதால் கவனமாக இருக்கவும்.'
    );
    criticalWarningsEn.push(
      '10th House Dictum: NEVER ADOPT A CHILD! Avoid heavy leveraged capital investments or speculation; the first commercial venture is prone to dissolution.'
    );
  }

  // 7th House check
  const hasSeventhSoonya = soonyaBhavas.includes(7) || badhakaBhava === 7;
  if (hasSeventhSoonya) {
    criticalWarningsTa.push(
      '7-ஆம் பாவக மணவாழ்க்கை எச்சரிக்கை: திருமணப் பேச்சுவார்த்தைகள் நிச்சயதார்த்தம் வரை சென்று தடைபட வாய்ப்புண்டு; கூட்டுத் தொழில் கூடாது; களத்திரத்துடன் விட்டுக் கொடுத்துச் செல்வது மிக அவசியம்.'
    );
    criticalWarningsEn.push(
      '7th House Conjugal Alert: Matrimonial talks may stall at the engagement stage; partnership enterprises are prohibited; patience and compromise with spouse are mandatory.'
    );
  }

  // 3rd House check
  const hasThirdSoonya = soonyaBhavas.includes(3) || badhakaBhava === 3;
  if (hasThirdSoonya) {
    criticalWarningsTa.push(
      '3-ஆம் பாவக மனோநிலை எச்சரிக்கை: 30 வயதில் பொருளாதார வறுமையும் தீவிர விரக்தியும் ஏற்படலாம்; எக்காரணம் கொண்டும் தற்கொலை எண்ணங்களுக்கு இடம் தராமல் ஆன்மீக ஆற்றுப்படுத்தல் பெறவும்.'
    );
    criticalWarningsEn.push(
      '3rd House Psychological Warning: Grinding poverty and acute despair may crest around age 30; reject all self-harm thoughts and anchor in spiritual counseling.'
    );
  }

  // 5th House check
  const hasFifthSoonya = soonyaBhavas.includes(5) || badhakaBhava === 5;
  if (hasFifthSoonya) {
    criticalWarningsTa.push(
      '5-ஆம் பாவக புத்திர/குலதெய்வ வழிகாட்டல்: ஆண் குழந்தை பிறப்பது தாமதமாகலாம்; குலதெய்வத்தை தவறாமல் ஆண்டுதோறும் வழிபட்டு வரவும். முதல் குழந்தையை பரிகார ரீதியாக தத்துக் கொடுத்து வாங்குதல் விசேஷம்.'
    );
    criticalWarningsEn.push(
      '5th House Progeny & Ancestral Advisory: Male progeny may be delayed; Kuladeivam shrine must be visited annually; symbolic adoption ritual (Thathu Koduthu Vaanguthal) brings auspicious results.'
    );
  }

  // 9. Bhavas Analysis (1 to 12)
  const bhavasAnalysis: IndividualBhavaAnalysis[] = [];
  for (let b = 1; b <= 12; b++) {
    const sId = (lagnaSignId + b - 1) % 12;
    const signInfo = ZODIAC_SIGNS[sId];
    const isSoonya = soonyaSignIds.includes(sId);
    const isBadhaka = b === badhakaBhava;
    const isUpachaya = [3, 6, 10, 11].includes(b);
    const planetsInThisBhava = planets.filter((p) => p.name !== 'Lagna' && p.signId === sId);

    bhavasAnalysis.push({
      bhava: b,
      signId: sId,
      signNameEn: signInfo.nameEn,
      signNameTa: signInfo.nameTa,
      lordNameEn: signInfo.lord,
      lordNameTa: PLANET_TAMIL_NAMES[signInfo.lord] || signInfo.lord,
      isSoonya,
      isBadhaka,
      isUpachaya,
      planetsInBhava: planetsInThisBhava,
      bhavaData: BHAVA_PALANGAL_MASTER[b] || BHAVA_PALANGAL_MASTER[1],
    });
  }

  // 10. Grahas Analysis (9 Planets)
  const grahasAnalysis: IndividualGrahaAnalysis[] = [];
  const targetPlanets: PlanetName[] = [
    'Sun',
    'Moon',
    'Mars',
    'Mercury',
    'Jupiter',
    'Venus',
    'Saturn',
    'Rahu',
    'Ketu',
  ];

  for (const pName of targetPlanets) {
    const pPos = planets.find((p) => p.name === pName);
    const pSignId = pPos ? pPos.signId : 0;
    const bhavaPlaced = pPos ? ((pSignId - lagnaSignId + 12) % 12) + 1 : 1;

    const isPlacedInSoonya = soonyaSignIds.includes(pSignId);
    const isPlacedInBadhaka = pSignId === badhakaSignId;
    const isSoonyaLord = soonyaLords.includes(pName);
    const isBadhakaLord = badhakadhipati === pName;

    const masterKey = pName === 'Rahu' || pName === 'Ketu' ? 'RahuKetu' : pName;
    const grahaData = GRAHA_KARAKATVA_MASTER[masterKey] || GRAHA_KARAKATVA_MASTER['Sun'];

    grahasAnalysis.push({
      planet: pName,
      planetTa: PLANET_TAMIL_NAMES[pName] || pName,
      isPlacedInSoonya,
      isPlacedInBadhaka,
      isSoonyaLord,
      isBadhakaLord,
      bhavaPlaced,
      signId: pSignId,
      grahaData,
    });
  }

  const lagnaSignInfo = ZODIAC_SIGNS[lagnaSignId];

  return {
    tithiNumber,
    tithiIndexRaw,
    tithiNameEn: tithiRule.nameEn,
    tithiNameTa: tithiRule.nameTa,
    paksha,
    pakshaTitleTa,
    pakshaTitleEn,
    pakshaImpactTa,
    pakshaImpactEn,
    soonyaSignIds,
    soonyaSignsEn,
    soonyaSignsTa,
    soonyaBhavas,
    soonyaLords,
    soonyaLordsTa,
    lagnaSignId,
    lagnaSignNameEn: lagnaSignInfo.nameEn,
    lagnaSignNameTa: lagnaSignInfo.nameTa,
    lagnaType,
    lagnaTypeTa: badhakaRule.lagnaTypeTa,
    badhakaBhava,
    badhakaSignId,
    badhakaSignNameEn,
    badhakaSignNameTa,
    badhakadhipati,
    badhakadhipatiTa,
    badhakadhipatiPlacementBhava,
    planetsInSoonya,
    planetsInBadhaka,
    hasUpachayaMitigation,
    hasGuruAspectMitigation,
    hasSunMoonMitigation,
    hasLeoSagittariusMitigation,
    activeMitigationsTa,
    activeMitigationsEn,
    criticalWarningsTa,
    criticalWarningsEn,
    bhavasAnalysis,
    grahasAnalysis,
  };
}
