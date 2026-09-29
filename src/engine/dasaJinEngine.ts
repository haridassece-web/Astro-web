import type {
  PlanetName,
  PlanetPosition,
  Panchanga,
} from '../types/astrology';
import { NAKSHATRAS, ZODIAC_SIGNS } from '../data/constants';

export interface JinTaraInfo {
  vipatStars: { id: number; nameTa: string; nameEn: string; lord: PlanetName }[];
  pratyakStars: { id: number; nameTa: string; nameEn: string; lord: PlanetName }[];
  vadhaiStars: { id: number; nameTa: string; nameEn: string; lord: PlanetName }[];
  jinnPlanets: PlanetName[];
  jinnPlanetsTa: string[];
}

export interface DasaJinAnalysisReport {
  moonNakshatraNameTa: string;
  moonNakshatraNameEn: string;
  moonStarLord: PlanetName;
  moonStarLordTa: string;
  jinTaraInfo: JinTaraInfo;
  activeDasaLord: PlanetName;
  activeDasaLordTa: string;
  activeBhuktiLord: PlanetName;
  activeBhuktiLordTa: string;
  
  // Key-Point & Mid-Point Analysis
  dasaHouseLord: PlanetName;
  dasaHouseLordTa: string;
  dasaStarLord: PlanetName;
  dasaStarLordTa: string;
  
  bhuktiHouseLord: PlanetName;
  bhuktiHouseLordTa: string;
  bhuktiStarLord: PlanetName;
  bhuktiStarLordTa: string;

  // 3-Way Linkage Status
  hasJenmaLinkage: boolean;
  linkageStatusTa: string;
  linkageStatusEn: string;
  isDeadEndWarning: boolean;

  // Event Manifestation Predictions
  is357Active: boolean;
  activeJinnType?: 'Vipat (3)' | 'Pratyak (5)' | 'Vadhai (7)';
  activeJinnTypeTa?: string;

  eventPredictionsTa: string[];
  eventPredictionsEn: string[];

  marriageProbabilityPercent: number;
  marriagePredictionTa: string;
  marriagePredictionEn: string;

  childrenPredictionTa: string;
  childrenPredictionEn: string;

  aspectPredictionsTa: string[];
  aspectPredictionsEn: string[];

  keyPointHarvestTextTa: string;
  keyPointHarvestTextEn: string;

  midPointTurningTextTa: string;
  midPointTurningTextEn: string;
}

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

export function calculateDasaJinReport(
  planets: PlanetPosition[],
  _lagnaSignId: number,
  _panchanga: Panchanga,
  activeDasaName: PlanetName = 'Saturn',
  activeBhuktiName: PlanetName = 'Mercury'
): DasaJinAnalysisReport {
  const moon = planets.find((p) => p.name === 'Moon')!;
  const moonStarId = moon.nakshatraId;
  const moonStarInfo = NAKSHATRAS[moonStarId];

  // 1. Calculate 3, 5, 7 Tara Nakshatras from Moon Nakshatra
  // 3rd Vipat Tara (3, 12, 21)
  const vipatIds = [
    (moonStarId + 2) % 27,
    (moonStarId + 11) % 27,
    (moonStarId + 20) % 27,
  ];
  // 5th Pratyak Tara (5, 14, 23)
  const pratyakIds = [
    (moonStarId + 4) % 27,
    (moonStarId + 13) % 27,
    (moonStarId + 22) % 27,
  ];
  // 7th Vadhai Tara (7, 16, 25)
  const vadhaiIds = [
    (moonStarId + 6) % 27,
    (moonStarId + 15) % 27,
    (moonStarId + 24) % 27,
  ];

  const vipatStars = vipatIds.map((id) => ({
    id,
    nameTa: NAKSHATRAS[id].nameTa,
    nameEn: NAKSHATRAS[id].nameEn,
    lord: NAKSHATRAS[id].lord as PlanetName,
  }));

  const pratyakStars = pratyakIds.map((id) => ({
    id,
    nameTa: NAKSHATRAS[id].nameTa,
    nameEn: NAKSHATRAS[id].nameEn,
    lord: NAKSHATRAS[id].lord as PlanetName,
  }));

  const vadhaiStars = vadhaiIds.map((id) => ({
    id,
    nameTa: NAKSHATRAS[id].nameTa,
    nameEn: NAKSHATRAS[id].nameEn,
    lord: NAKSHATRAS[id].lord as PlanetName,
  }));

  const jinnPlanetsRaw = [
    vipatStars[0].lord,
    pratyakStars[0].lord,
    vadhaiStars[0].lord,
  ];
  const jinnPlanets = Array.from(new Set(jinnPlanetsRaw));
  const jinnPlanetsTa = jinnPlanets.map((p) => PLANET_TAMIL_NAMES[p] || p);

  const jinTaraInfo: JinTaraInfo = {
    vipatStars,
    pratyakStars,
    vadhaiStars,
    jinnPlanets,
    jinnPlanetsTa,
  };

  // 2. Active Dasa & Bhukti Lords Analysis
  const dasaPos = planets.find((p) => p.name === activeDasaName) || planets[0];
  const bhuktiPos = planets.find((p) => p.name === activeBhuktiName) || planets[1];

  const dasaHouseLord = ZODIAC_SIGNS[dasaPos.signId].lord as PlanetName;
  const dasaStarLord = NAKSHATRAS[dasaPos.nakshatraId].lord as PlanetName;

  const bhuktiHouseLord = ZODIAC_SIGNS[bhuktiPos.signId].lord as PlanetName;
  const bhuktiStarLord = NAKSHATRAS[bhuktiPos.nakshatraId].lord as PlanetName;

  // 3. Evaluate 3-Way Survival Linkage (Dasa Lord, House Lord, Star Lord)
  const isDasaDirectLinked = dasaPos.nakshatraId === moonStarId;
  const isHouseLordLinked = NAKSHATRAS[moonStarId].lord === dasaHouseLord;
  const isStarLordLinked = dasaStarLord === NAKSHATRAS[moonStarId].lord;

  const hasJenmaLinkage = isDasaDirectLinked || isHouseLordLinked || isStarLordLinked;

  let linkageStatusTa = 'உயிர் ஆதாரத் தொடர்பு உள்ளது: இந்த தசா ஜாதகருக்கு பிரச்சினைகளில் இருந்து மீண்டு வர பாதுகாப்பு அளிக்கும்.';
  let linkageStatusEn = 'Life Support Connected: Dasa provides protective energy to overcome trials.';
  let isDeadEndWarning = false;

  if (!hasJenmaLinkage) {
    if ([6, 8, 12].includes(dasaPos.house)) {
      isDeadEndWarning = true;
      linkageStatusTa = '⚠️ ஆபத்தான நிலை (Dead End): தசா நாதன், வீடு கொடுத்தவர், சாரம் கொடுத்தவர் மூன்றும் ஜென்ம நட்சத்திரத்துடன் தொடர்பில்லை. 6/8/12-ம் பாவகத்தில் உள்ளதால் பொருளாதார & ஆரோக்கிய சவால்கள் தரும்.';
      linkageStatusEn = '⚠️ Critical Warning (Dead End): Neither Dasa Lord, House Lord, nor Star Lord links to Moon star. Dusthana placement demands high caution.';
    } else {
      linkageStatusTa = 'மத்தியமான தொடர்பு: நேரடியாக ஜாதகரை பாதிக்காது; குடும்பத்தார் அல்லது பிற உறவுகளுக்கு மாற்றங்களை உருவாக்கும்.';
      linkageStatusEn = 'Moderate Linkage: Does not impact native directly; creates shifts for family or relatives.';
    }
  }

  // 4. Jinn 3, 5, 7 Active Evaluation
  const isDasa357 = jinnPlanets.includes(activeDasaName);
  const isBhukti357 = jinnPlanets.includes(activeBhuktiName);
  const isDasaStar357 = jinnPlanets.includes(dasaStarLord);
  const isBhuktiStar357 = jinnPlanets.includes(bhuktiStarLord);

  const is357Active = isDasa357 || isBhukti357 || isDasaStar357 || isBhuktiStar357;

  let activeJinnType: 'Vipat (3)' | 'Pratyak (5)' | 'Vadhai (7)' | undefined;
  let activeJinnTypeTa: string | undefined;

  if (vadhaiStars.some((s) => s.lord === activeBhuktiName || s.lord === bhuktiStarLord)) {
    activeJinnType = 'Vadhai (7)';
    activeJinnTypeTa = '7-வது வதை தாரை (வதை ஜின் இயக்கம்)';
  } else if (pratyakStars.some((s) => s.lord === activeBhuktiName || s.lord === bhuktiStarLord)) {
    activeJinnType = 'Pratyak (5)';
    activeJinnTypeTa = '5-வது பிரத்யக் தாரை (பிரத்யக் ஜின் இயக்கம்)';
  } else if (vipatStars.some((s) => s.lord === activeBhuktiName || s.lord === bhuktiStarLord)) {
    activeJinnType = 'Vipat (3)';
    activeJinnTypeTa = '3-வது விபத்து தாரை (விபத்து ஜின் இயக்கம்)';
  }

  // Event Predictions Array
  const eventPredictionsTa: string[] = [];
  const eventPredictionsEn: string[] = [];

  if (is357Active) {
    eventPredictionsTa.push(
      `இந்த தசா/புக்தியில் ${activeJinnTypeTa || '3/5/7 ஜின் தொடர்பு'} வேலை செய்வதால், 100% பலன் (நன்மையோ கெடுதலோ) உறுதியாக வெளிப்படும்.`,
      `விதை விதைப்பது அறுவடை செய்வது போல, இந்த காலகட்டத்தில் செய்த வினைகளின் அறுவடை காலம் (Harvest Period) துவங்கும்.`
    );
    eventPredictionsEn.push(
      `Active 3, 5, 7 Jinn connection triggers 100% manifestation of karmic results during this Dasa/Bhukti.`,
      `Functioning as a Harvest Period, karmic debts and efforts yield exact fruits.`
    );
  } else {
    eventPredictionsTa.push(
      'இந்த தசா/புக்தி நியூட்ரல் (Neutral) அமைப்பில் உள்ளது. பெரிய அசாத்திய பாதிப்புகள் இன்றி இயல்பாகக் கடக்கும்.'
    );
    eventPredictionsEn.push(
      'Neutral Dasa/Bhukti phase; passes smoothly without disruptive life upheavals.'
    );
  }

  // 5. Marriage Predictions Calculation
  let marriageProbabilityPercent = 33;
  let marriagePredictionTa = 'திருமண பேச்சுவார்த்தைகள் தொடங்கும், ஆனால் சுக்கிரன் / 7-ம் அதிபதி தொடர்பில் கூடுதல் கவனம் தேவை.';
  let marriagePredictionEn = 'Marriage discussions initiate; requires 7th house and Venus Dasa alignment.';

  if (vadhaiStars.some((s) => s.lord === activeBhuktiName) || bhuktiPos.house === 7) {
    marriageProbabilityPercent = 66;
    marriagePredictionTa = `நடப்பு ${PLANET_TAMIL_NAMES[activeBhuktiName]} புக்தி 7-வது தாரையாக அல்லது 7-ம் பாவகமாக வருவதால் 66% திருமணம் நடக்கும் வாய்ப்பு உறுதி செய்யப்பட்டுள்ளது.`;
    marriagePredictionEn = `Active ${activeBhuktiName} Bhukti acts as 7th Tara / 7th house, ensuring 66% strong marriage timing!`;
  }
  if (['Venus', 'Jupiter', 'Mars', 'Rahu'].includes(activeBhuktiName) && (bhuktiPos.house === 7 || bhuktiPos.house === 2)) {
    marriageProbabilityPercent = 90;
    marriagePredictionTa = `குரு/சுக்கிரன்/ராகு சேர்க்கை 7-ம் பாவகத்தில் அமைவதால் 90% மிக விரைவாகக் மாங்கல்ய பாக்கியம் கைகூடும்!`;
    marriagePredictionEn = `Jupiter/Venus/Rahu alignment in 7th house ensures 90% imminent marriage perfection!`;
  }

  // 6. Children Prediction Calculation
  let childrenPredictionTa = 'குரு திசை - குரு புக்தியில் 1-வது குழந்தையும், சுக்கிர / குரு புக்திகளில் 2-வது குழந்தைப் பேறும் சாத்தியமாகும்.';
  let childrenPredictionEn = 'Jupiter Dasa -> Jupiter Bhukti yields 1st child; Venus/Jupiter Bhukti yields 2nd child.';

  if (activeDasaName === 'Jupiter') {
    if (activeBhuktiName === 'Jupiter') {
      childrenPredictionTa = 'குரு திசை - குரு புக்தி நடப்பதால் 1-வது குழந்தை பாக்கியம் பெற உன்னதமான காலகட்டம்!';
      childrenPredictionEn = 'Jupiter Dasa - Jupiter Bhukti operating: Golden timing for 1st child blessing!';
    } else if (activeBhuktiName === 'Venus') {
      childrenPredictionTa = 'குரு திசை - சுக்கிர புக்தி நடப்பதால் 2-வது குழந்தை பாக்கியம் மற்றும் குடும்ப சந்தோஷம் பெருகும்!';
      childrenPredictionEn = 'Jupiter Dasa - Venus Bhukti operating: Perfect timing for 2nd child blessing!';
    }
  }

  // 7. Planetary Aspects Calculation
  const sunPos = planets.find((p) => p.name === 'Sun')!;
  const jupPos = planets.find((p) => p.name === 'Jupiter')!;

  const sunAspectHouse = ((sunPos.house + 5) % 12) + 1; // 7th aspect house
  const jupAspectHouses = [
    ((jupPos.house + 4) % 12) + 1,
    ((jupPos.house + 6) % 12) + 1,
    ((jupPos.house + 8) % 12) + 1,
  ];

  const aspectPredictionsTa: string[] = [
    `சூரியன் ${sunPos.house}-ல் இருந்து ${sunAspectHouse}-ம் பாவத்தைப் பார்ப்பதால், அந்த பாவகத்தில் அபரிமிதமான வளர்ச்சியும் தன விருத்தியும் உண்டாகும்.`,
  ];
  const aspectPredictionsEn: string[] = [
    `Sun in House ${sunPos.house} aspects House ${sunAspectHouse}, bringing rapid growth and financial surge to that domain.`,
  ];

  if (jupAspectHouses.includes(8)) {
    aspectPredictionsTa.push(
      `குரு பகவான் 8-ம் பாவத்தைப் பார்ப்பதால், 8-ம் பாவத்து பிரச்சினைகள் (கோர்ட் வழக்கு, வம்பு, வழக்குகள்) வெளிப்பட்டு பின் தீர்வு அடையும்.`
    );
    aspectPredictionsEn.push(
      `Jupiter aspects 8th House: Triggers pending court litigation/legal disputes, leading to final favorable resolution.`
    );
  } else {
    aspectPredictionsTa.push(
      `குரு பகவானின் சுப பார்வை பாவகங்களை புனிதப்படுத்தி பொருளாதார மற்றும் குடும்ப சுப பலன்களை அளிக்கும்.`
    );
    aspectPredictionsEn.push(
      `Jupiter's auspicious aspect sanctifies houses, bestowing family harmony and financial prosperity.`
    );
  }

  // 8. Key-Point & Mid-Point Texts
  const keyPointHarvestTextTa = `கீ-பாயிண்ட் (அறுவடை காலம்): திசை நாதன் ${PLANET_TAMIL_NAMES[activeDasaName]} வாங்கிய சாரம் ${PLANET_TAMIL_NAMES[dasaStarLord]} மற்றும் வீடு ${PLANET_TAMIL_NAMES[dasaHouseLord]}. இந்த இரு கிரகங்களின் பாவக பலன்களே இக்காலகட்டத்தில் 100% அறுவடை செய்யப்படும்.`;
  const keyPointHarvestTextEn = `Key-Point (Harvest Time): Dasa Lord ${activeDasaName} holds Star ${dasaStarLord} and House ${dasaHouseLord}. Results of these two lords are 100% harvested now.`;

  const midPointTurningTextTa = `மிட்பாயிண்ட் (திருப்புமுனை): திசை/புக்தி மத்தியில் நன்மை தீமையாக மாறுவதும், தீமை நன்மையாக மாறுவதும் நிகழும். தார பலன் மற்றும் ஜின் சேர்க்கை மேட்ச் ஆகும் புள்ளியில் திருப்புமுனை அமையும்.`;
  const midPointTurningTextEn = `Mid-Point (Turning Point): Mid-phase shifts negative trends to positive or vice-versa at the exact Jinn-Tara convergence point.`;

  return {
    moonNakshatraNameTa: moonStarInfo.nameTa,
    moonNakshatraNameEn: moonStarInfo.nameEn,
    moonStarLord: moonStarInfo.lord as PlanetName,
    moonStarLordTa: PLANET_TAMIL_NAMES[moonStarInfo.lord] || moonStarInfo.lord,
    jinTaraInfo,
    activeDasaLord: activeDasaName,
    activeDasaLordTa: PLANET_TAMIL_NAMES[activeDasaName] || activeDasaName,
    activeBhuktiLord: activeBhuktiName,
    activeBhuktiLordTa: PLANET_TAMIL_NAMES[activeBhuktiName] || activeBhuktiName,
    dasaHouseLord,
    dasaHouseLordTa: PLANET_TAMIL_NAMES[dasaHouseLord] || dasaHouseLord,
    dasaStarLord,
    dasaStarLordTa: PLANET_TAMIL_NAMES[dasaStarLord] || dasaStarLord,
    bhuktiHouseLord,
    bhuktiHouseLordTa: PLANET_TAMIL_NAMES[bhuktiHouseLord] || bhuktiHouseLord,
    bhuktiStarLord,
    bhuktiStarLordTa: PLANET_TAMIL_NAMES[bhuktiStarLord] || bhuktiStarLord,
    hasJenmaLinkage,
    linkageStatusTa,
    linkageStatusEn,
    isDeadEndWarning,
    is357Active,
    activeJinnType,
    activeJinnTypeTa,
    eventPredictionsTa,
    eventPredictionsEn,
    marriageProbabilityPercent,
    marriagePredictionTa,
    marriagePredictionEn,
    childrenPredictionTa,
    childrenPredictionEn,
    aspectPredictionsTa,
    aspectPredictionsEn,
    keyPointHarvestTextTa,
    keyPointHarvestTextEn,
    midPointTurningTextTa,
    midPointTurningTextEn,
  };
}
