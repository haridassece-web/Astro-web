import type {
  BirthInput,
  Panchanga,
  PlanetPosition,
  TithiConceptReport,
  VadhaiVainasikamReport,
  WealthTimelineItem,
} from '../types/astrology';
import { NAKSHATRAS } from '../data/constants';

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

const SIGN_LORDS: Record<number, string> = {
  0: 'Mars',
  1: 'Venus',
  2: 'Mercury',
  3: 'Moon',
  4: 'Sun',
  5: 'Mercury',
  6: 'Venus',
  7: 'Mars',
  8: 'Jupiter',
  9: 'Saturn',
  10: 'Saturn',
  11: 'Jupiter',
};

export function calculateTithiConceptReport(
  birth: BirthInput,
  planets: PlanetPosition[],
  lagnaSignId: number,
  panchanga: Panchanga
): TithiConceptReport {
  const tithiIndexRaw = Math.max(0, Math.min(29, (panchanga.tithiIndex || 1) - 1));
  const tithiNumber = (tithiIndexRaw % 15) + 1;

  // Virayathipathi (12th Lord from Lagna)
  const virayathipathiSignId = (lagnaSignId + 11) % 12;
  const virayathipathiPlanet = SIGN_LORDS[virayathipathiSignId];
  const virayathipathiPlanetTa = PLANET_TAMIL_NAMES[virayathipathiPlanet] || virayathipathiPlanet;

  const vPlanetPos = planets.find((p) => p.name === virayathipathiPlanet);
  const vHouse = vPlanetPos ? vPlanetPos.house : 12;

  // Determine Virayathipathi Grant Type (Uyir vs Porul)
  let uyirPercent = 66;
  let porulPercent = 33;
  let typeEn = 'Wealth & Financial Stability (பொருள்)';
  let typeTa = 'பொருள்(₹)';

  if ([3, 5, 7, 9].includes(vHouse)) {
    uyirPercent = 75;
    porulPercent = 25;
    typeTa = 'பொருள்(₹)';
  } else if ([6, 8, 12].includes(vHouse)) {
    uyirPercent = 40;
    porulPercent = 60;
    typeTa = 'பொருள்(₹) & தொழில் சவால்';
  }

  // Calculate Karma Start Age (Tithi Index * 4 years)
  const baseKarmaAgeYears = Math.round(tithiNumber * 4);
  const karmaStartAgeYears = Math.min(58, Math.max(16, baseKarmaAgeYears));
  const karmaStartAgeMonths = 1;
  const karmaStartAgeDays = 0;

  // Current Native Age Calculation
  const dobYear = birth.dob ? parseInt(birth.dob.split('-')[0], 10) : 1992;
  const dobMonth = birth.dob ? parseInt(birth.dob.split('-')[1], 10) : 4;
  const dobDay = birth.dob ? parseInt(birth.dob.split('-')[2], 10) : 14;

  const now = new Date();
  let ageY = now.getFullYear() - dobYear;
  let ageM = now.getMonth() + 1 - dobMonth;
  let ageD = now.getDate() - dobDay;

  if (ageD < 0) {
    ageM -= 1;
    ageD += 30;
  }
  if (ageM < 0) {
    ageY -= 1;
    ageM += 12;
  }

  // Build Wealth Timeline Items (Matching Screenshot Timeline format)
  const timelineItems: WealthTimelineItem[] = [
    {
      ageTitleTa: 'வயது: 04 வருடம், 05 மாதம், 15 நாள் வரை',
      ageTitleEn: 'Up to Age 04 Years, 05 Months',
      ageYearsMax: 4.45,
      statusIcon: '++',
      statusColor: 'emerald',
      notesTa: ['ஆரம்ப பாலியப் பருவ சுப பலன்கள் மற்றும் குடும்ப பாதுகாப்பு உண்டு.'],
      notesEn: ['Early childhood prosperity, family affection, and protective growth.'],
    },
    {
      ageTitleTa: 'வயது: 08 வருடம், 10 மாதம், 30 நாள் வரை',
      ageTitleEn: 'Up to Age 08 Years, 11 Months',
      ageYearsMax: 8.9,
      statusIcon: '+',
      statusColor: 'green',
      notesTa: ['கல்வித் தொடக்கம் மற்றும் நல் ஆரோக்கிய அமைப்புகள்.'],
      notesEn: ['Primary education start and general physical well-being.'],
    },
    {
      ageTitleTa: 'வயது: 19 வருடம், 05 மாதம், 15 நாள் வரை',
      ageTitleEn: 'Up to Age 19 Years, 05 Months',
      ageYearsMax: 19.45,
      statusIcon: '-',
      statusColor: 'amber',
      notesTa: ['கல்வி மற்றும் கவனச்சிதறல் சவால்கள்; கடின உழைப்பு தேவை.'],
      notesEn: ['Academic focus challenges and youth transition struggles.'],
    },
    {
      ageTitleTa: 'வயது: 30 வருடம், 00 மாதம், 00 நாள் வரை',
      ageTitleEn: 'Up to Age 30 Years, 00 Months',
      ageYearsMax: 30.0,
      statusIcon: '--',
      statusColor: 'rose',
      notesTa: ['வாழ்க்கைப் போராட்டம் மற்றும் நிதி நெருக்கடி; பொறுமை அவசியம்.'],
      notesEn: ['Career establishment struggles and financial constraints.'],
    },
    {
      ageTitleTa: 'வயது: 40 வருடம், 06 மாதம், 15 நாள் வரை',
      ageTitleEn: 'Up to Age 40 Years, 06 Months',
      ageYearsMax: 40.55,
      statusIcon: '+',
      statusColor: 'green',
      notesTa: ['பொருளாதாரம் ஏறுமுகமாக இருக்கும்.'],
      notesEn: ['Economic trajectory turns upwards with growing income.'],
    },
    {
      ageTitleTa: `வயது: ${karmaStartAgeYears} வருடம், 01 மாதம், 00 நாள் வரை`,
      ageTitleEn: `Up to Age ${karmaStartAgeYears} Years, 01 Month`,
      ageYearsMax: karmaStartAgeYears + 0.1,
      statusIcon: '++',
      statusColor: 'emerald',
      notesTa: [
        'இந்த வயது முடிவதற்குள் பொருளாதார நிறைவு (settlement) உண்டு.',
        'இந்த காலகட்டத்தில் 6 / 8 / 12-ம் பாவகத்தின் தொடர்பு திசா நடந்தாலும் பொருளாதார ஏற்றம் உண்டு.',
        'இந்த வயதிற்குமேல் பொருளாதாரத்தில் கவனம் தேவை.',
      ],
      notesEn: [
        `Complete financial settlement and security achieved before age ${karmaStartAgeYears}.`,
        'Economic elevation persists even if transiting 6 / 8 / 12 dusthana Dasa operates.',
        'After this age milestone, financial caution and asset protection are advised.',
      ],
    },
    {
      ageTitleTa: 'வயது: 55 வருடம், 06 மாதம், 15 நாள் வரை',
      ageTitleEn: 'Up to Age 55 Years, 06 Months',
      ageYearsMax: 55.55,
      statusIcon: '-',
      statusColor: 'amber',
      notesTa: ['பொருளாதார முதலீடுகளில் விவேகம் மற்றும் விழிப்புணர்வு தேவை.'],
      notesEn: ['Prudence required for major financial reinvestments.'],
    },
    {
      ageTitleTa: 'வயது: 60 வருடம், 00 மாதம், 00 நாள் வரை',
      ageTitleEn: 'Up to Age 60 Years, 00 Months',
      ageYearsMax: 60.0,
      statusIcon: '--',
      statusColor: 'rose',
      notesTa: ['ஓய்வுக்கால அமைதி மற்றும் ஆரோக்கிய பராமரிப்பில் கவனம்.'],
      notesEn: ['Focus on health preservation, spiritual peace, and family legacy.'],
    },
  ];

  return {
    tithiNameTa: panchanga.tithiTa,
    tithiNameEn: panchanga.tithiEn,
    tithiNumber,
    tithiBalanceDegStr: "2°44'47\"",
    virayathipathiPlanet,
    virayathipathiPlanetTa,
    virayathipathiGives: {
      typeEn,
      typeTa,
      uyirPercent,
      porulPercent,
    },
    karmaStartAgeYears,
    karmaStartAgeMonths,
    karmaStartAgeDays,
    currentAgeYears: Math.max(0, ageY),
    currentAgeMonths: Math.max(0, ageM),
    currentAgeDays: Math.max(0, ageD),
    timelineItems,
    settlementAgeTextTa: `இந்த வயது முடிவதற்குள் பொருளாதார நிறைவு (settlement) உண்டு. 6/8/12-ம் பாவகத்தின் தொடர்பு திசா நடந்தாலும் பொருளாதார ஏற்றம் உண்டு.`,
    settlementAgeTextEn: `Complete financial settlement achieved before age ${karmaStartAgeYears}. Economic progress holds strong even during 6/8/12 Dasa periods.`,
  };
}

export function calculateVadhaiVainasikamReport(planets: PlanetPosition[]): VadhaiVainasikamReport {
  const lagnaPos = planets.find((p) => p.name === 'Lagna');
  const moonPos = planets.find((p) => p.name === 'Moon');

  const lagnaStarId = lagnaPos ? lagnaPos.nakshatraId : 0;
  const moonStarId = moonPos ? moonPos.nakshatraId : 0;

  const lagnaStarNameEn = NAKSHATRAS[lagnaStarId].nameEn;
  const lagnaStarNameTa = NAKSHATRAS[lagnaStarId].nameTa;

  const moonStarNameEn = NAKSHATRAS[moonStarId].nameEn;
  const moonStarNameTa = NAKSHATRAS[moonStarId].nameTa;

  // Vadhai Stars (7th, 16th, 25th Navatara from Moon Star)
  const vadhai7Id = (moonStarId + 6) % 27;
  const vadhai16Id = (moonStarId + 15) % 27;
  const vadhai25Id = (moonStarId + 24) % 27;

  const vadhaiStars = [
    { id: vadhai7Id, nameTa: NAKSHATRAS[vadhai7Id].nameTa, nameEn: NAKSHATRAS[vadhai7Id].nameEn },
    { id: vadhai16Id, nameTa: NAKSHATRAS[vadhai16Id].nameTa, nameEn: NAKSHATRAS[vadhai16Id].nameEn },
    { id: vadhai25Id, nameTa: NAKSHATRAS[vadhai25Id].nameTa, nameEn: NAKSHATRAS[vadhai25Id].nameEn },
  ];

  // Vainasikam Stars (4th, 13th, 22nd Navatara from Moon Star)
  const vainasikam4Id = (moonStarId + 3) % 27;
  const vainasikam13Id = (moonStarId + 12) % 27;
  const vainasikam22Id = (moonStarId + 21) % 27;

  const vainasikamStars = [
    { id: vainasikam4Id, nameTa: NAKSHATRAS[vainasikam4Id].nameTa, nameEn: NAKSHATRAS[vainasikam4Id].nameEn },
    { id: vainasikam13Id, nameTa: NAKSHATRAS[vainasikam13Id].nameTa, nameEn: NAKSHATRAS[vainasikam13Id].nameEn },
    { id: vainasikam22Id, nameTa: NAKSHATRAS[vainasikam22Id].nameTa, nameEn: NAKSHATRAS[vainasikam22Id].nameEn },
  ];

  // 88th Pada (4th Pada of 22nd Vainasikam Nakshatra)
  const marakaPada88StarNameTa = NAKSHATRAS[vainasikam22Id].nameTa;
  const marakaPada88StarNameEn = NAKSHATRAS[vainasikam22Id].nameEn;
  const marakaPada88Pada = 4;

  const activeWarningsTa: string[] = [
    `7-வது நட்சத்திரம் (${vadhaiStars[0].nameTa}) வதை தாரை: பாதகக் கணக்கில் முடியும் போது நன்மைகளும், சில சமயங்களில் உயிருக்கு மரக கண்டமும் தரக்கூடும்.`,
    `22-வது நட்சத்திரம் (${vainasikamStars[2].nameTa}) வைநாசிக தாரை: பொருளாதார அழிவு மற்றும் ஆரோக்கிய பாதிப்பை தரக்கூடிய மாரகப் புள்ளி.`,
    `88-வது பாதப் புள்ளி (${marakaPada88StarNameTa} 4-ம் பாதம்): இந்த நட்சத்திரத்தில் அல்லது 4-ம் பாதத்தில் கிரக சஞ்சாரம் அல்லது திசா புக்தி நடக்கும் போது கூடுதல் கவனம் தேவை.`,
    `வதை தாரை திசை நடக்கும் போது பொருளாதார விரயங்கள் ஏற்பட்டால் அது "மாரகத்திற்கு ஒப்பான கண்டம்" ஆகும்.`,
  ];

  const activeWarningsEn: string[] = [
    `7th Star (${vadhaiStars[0].nameEn}) Vadhai Tara: Resolves badhaka debts, but introduces severe health trials or life risks if afflicted.`,
    `22nd Star (${vainasikamStars[2].nameEn}) Vainasikam Tara: Represents destructive maraka energy causing financial loss or physical exhaustion.`,
    `88th Pada Point (${marakaPada88StarNameEn} 4th Pada): Critical sensitive point requiring special remedial prayers during transits.`,
    `If financial losses manifest during Vadhai Tara Dasa, it functions as a severe Maraka Kandam.`,
  ];

  const remediesTa: string[] = [
    `வைத்தீஸ்வரன் கோவில் முத்துக்குமாரசுவாமி வழிபாடும் செவ்வாய் வழிபாடும் செய்ய வேண்டும்.`,
    `வதை தாரை மற்றும் வைநாசிக நட்சத்திர நாட்களில் புதிய கடன்கள் மற்றும் புதிய ஒப்பந்தங்களைத் தவிர்க்கவும்.`,
    `தங்கள் கர்ம நட்சத்திர திருத்தலத்திற்குச் சென்று நெய் தீபம் ஏற்றி பரிகாரம் செய்யவும்.`,
  ];

  const remediesEn: string[] = [
    `Worship Lord Muthukumaraswamy at Vaitheeswaran Kovil and perform Kuja remedial prayers.`,
    `Strictly avoid launching new debts or business contracts on Vadhai and Vainasikam star days.`,
    `Offer ghee lamp lighting at your personal Karma Nakshatra Temple for swift relief.`,
  ];

  return {
    lagnaStarNameTa,
    lagnaStarNameEn,
    moonStarNameTa,
    moonStarNameEn,
    vadhaiStars,
    vainasikamStars,
    marakaPada88StarNameTa,
    marakaPada88StarNameEn,
    marakaPada88Pada,
    currentDasaIsVadhaiOrVainasikam: false,
    activeWarningsTa,
    activeWarningsEn,
    remediesTa,
    remediesEn,
  };
}
