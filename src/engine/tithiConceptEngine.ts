import type {
  BirthInput,
  Panchanga,
  PlanetPosition,
  TithiAgeTimelineDetail,
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
  const sun = planets.find((p) => p.name === 'Sun')!;
  const moon = planets.find((p) => p.name === 'Moon')!;

  const diffDeg = (moon.longitude - sun.longitude + 360) % 360;
  const tithiIndexRaw = Math.floor(diffDeg / 12); // 0 to 29
  const tithiSubIndex = tithiIndexRaw % 15; // 0 to 14
  const tithiNumber = tithiSubIndex + 1; // 1 to 15

  // Tithi Balance Degrees (0° to 12°)
  const tithiProgressDeg = diffDeg % 12;
  const tithiBalanceDeg = 12 - tithiProgressDeg;

  const deg = Math.floor(tithiBalanceDeg);
  const remMin = (tithiBalanceDeg - deg) * 60;
  const min = Math.floor(remMin);
  const sec = Math.round((remMin - min) * 60);
  const tithiBalanceDegStr = `${deg}°${String(min).padStart(2, '0')}'${String(sec).padStart(2, '0')}"`;

  // Exact Tithi Elapsed (0.0 to 15.0) & Exact Karma Start Age
  const tithiElapsedFraction = tithiProgressDeg / 12.0;
  const tithiElapsedExact = tithiSubIndex + tithiElapsedFraction;
  const karmaStartTotalYears = tithiElapsedExact * 4.0;

  const karmaStartAgeYears = Math.floor(karmaStartTotalYears);
  const karmaMonthsDecimal = (karmaStartTotalYears - karmaStartAgeYears) * 12.0;
  const karmaStartAgeMonths = Math.floor(karmaMonthsDecimal);
  const karmaStartAgeDays = Math.round((karmaMonthsDecimal - karmaStartAgeMonths) * 30.0);

  // Virayathipathi (12th Lord from Lagna)
  const virayathipathiSignId = (lagnaSignId + 11) % 12;
  const virayathipathiPlanet = SIGN_LORDS[virayathipathiSignId];
  const virayathipathiPlanetTa = PLANET_TAMIL_NAMES[virayathipathiPlanet] || virayathipathiPlanet;

  const vPlanetPos = planets.find((p) => p.name === virayathipathiPlanet);
  const vHouse = vPlanetPos ? vPlanetPos.house : 12;

  // Determine Virayathipathi Grant Percentage (Uyir vs Porul)
  let uyirPercent = 66;
  let porulPercent = 33;
  let typeEn = 'Wealth & Financial Stability (பொருள்)';
  let typeTa = 'பொருள்(₹)';

  if (virayathipathiPlanet === 'Moon') {
    uyirPercent = 0;
    porulPercent = 99;
    typeTa = 'பொருள்(₹)';
  } else if ([1, 2, 4, 10, 11].includes(vHouse)) {
    uyirPercent = 33;
    porulPercent = 67;
    typeTa = 'பொருள்(₹)';
  } else if ([3, 5, 7, 9].includes(vHouse)) {
    uyirPercent = 75;
    porulPercent = 25;
    typeTa = 'பொருள்(₹)';
  } else if ([6, 8, 12].includes(vHouse)) {
    uyirPercent = 40;
    porulPercent = 60;
    typeTa = 'பொருள்(₹) & தொழில் சவால்';
  }

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

  // Astronomical Age Timeline Breakpoints Helper
  const formatAge = (totalYears: number) => {
    const y = Math.floor(totalYears);
    const remM = (totalYears - y) * 12.0;
    const m = Math.floor(remM);
    const remD = (remM - m) * 30.0;
    const d = Math.round(remD);
    return {
      totalYears,
      ta: `வயது: ${String(y).padStart(2, '0')} வருடம், ${String(m).padStart(2, '0')} மாதம், ${String(d).padStart(2, '0')} நாள் வரை`,
      en: `Up to Age ${String(y).padStart(2, '0')} Y, ${String(m).padStart(2, '0')} M, ${String(d).padStart(2, '0')} D`,
    };
  };

  const remainingYearsInCycle = (15.0 - tithiElapsedExact) * 4.0;

  let timelineItems: WealthTimelineItem[] = [];

  const mirrorSymmetricTotalYears = 60.0 - karmaStartTotalYears;

  if (karmaStartTotalYears <= 30.0) {
    // When Karma Start Settlement Age K <= 30.0 (e.g. 21.27 yrs for Panchami)
    const st1Age = formatAge(karmaStartTotalYears * 0.33);
    const st2Age = formatAge(karmaStartTotalYears * 0.67);
    const st3Age = formatAge(karmaStartTotalYears); // Primary Settlement Age: 21.27 yrs
    const st4Age = formatAge(30.0); // Center Midpoint: 30.0 yrs
    const st5Age = formatAge(mirrorSymmetricTotalYears); // Mirror Symmetric Age: 38.73 yrs
    const st6Age = formatAge(mirrorSymmetricTotalYears + (60.0 - mirrorSymmetricTotalYears) * 0.5);
    const st7Age = formatAge(60.0); // 60.0 yrs

    timelineItems = [
      {
        ageTitleTa: st1Age.ta,
        ageTitleEn: st1Age.en,
        ageYearsMax: st1Age.totalYears,
        statusIcon: '++',
        statusColor: 'emerald',
        notesTa: ['ஆரம்ப பாலியப் பருவ சுப பலன்கள் மற்றும் குடும்ப பாதுகாப்பு உண்டு.'],
        notesEn: ['Early childhood prosperity, family affection, and protective growth.'],
      },
      {
        ageTitleTa: st2Age.ta,
        ageTitleEn: st2Age.en,
        ageYearsMax: st2Age.totalYears,
        statusIcon: '+',
        statusColor: 'green',
        notesTa: ['கல்வித் தொடக்கம் மற்றும் நல் ஆரோக்கிய அமைப்புகள்.'],
        notesEn: ['Primary education start and general physical well-being.'],
      },
      {
        ageTitleTa: st3Age.ta,
        ageTitleEn: st3Age.en,
        ageYearsMax: st3Age.totalYears,
        statusIcon: '++',
        statusColor: 'emerald',
        notesTa: [
          'இந்த வயது முடிவதற்குள் முதல் கட்ட பொருளாதார நிறைவு (settlement) உண்டு.',
          'இந்த காலகட்டத்தில் 6 / 8 / 12-ம் பாவகத்தின் தொடர்பு திசா நடந்தாலும் பொருளாதார ஏற்றம் உண்டு.',
          'இந்த வயதிற்குமேல் புதிய முதலீடுகளில் விவேகம் தேவை.',
        ],
        notesEn: [
          `Primary financial settlement and security achieved before age ${karmaStartAgeYears}.`,
          'Economic elevation persists even if transiting 6 / 8 / 12 dusthana Dasa operates.',
          'After this age milestone, financial caution and asset protection are advised.',
        ],
      },
      {
        ageTitleTa: st4Age.ta,
        ageTitleEn: st4Age.en,
        ageYearsMax: st4Age.totalYears,
        statusIcon: '+',
        statusColor: 'green',
        notesTa: ['7.5 மையப்புள்ளி 30 வயது திருப்புமுனை; நிலையான தொழில் மற்றும் குடும்ப ஸ்திரத்தன்மை.'],
        notesEn: ['Center 7.5 midpoint turning point at Age 30; sustained career stability.'],
      },
      {
        ageTitleTa: st5Age.ta,
        ageTitleEn: st5Age.en,
        ageYearsMax: st5Age.totalYears,
        statusIcon: '++',
        statusColor: 'emerald',
        notesTa: [
          'எதிர் சமச்சீர் திதி வயது மைல்கல்: இரண்டாம் கட்ட அசுர பொருளாதார வளர்ச்சி மற்றும் தன சேர்க்கை.',
          'சுவடி சமச்சீர் விதிப்படி தொழிலில் மிகப்பெரிய சொத்து சேர்க்கை யோகம் அமையும்.',
        ],
        notesEn: [
          `Mirror Symmetric Tithi Milestone: Secondary peak wealth expansion & asset consolidation.`,
          'Manuscript symmetry rule yields high property acquisition & financial elevation.',
        ],
      },
      {
        ageTitleTa: st6Age.ta,
        ageTitleEn: st6Age.en,
        ageYearsMax: st6Age.totalYears,
        statusIcon: '-',
        statusColor: 'amber',
        notesTa: ['பொருளாதார பராமரிப்பு, முதலீடுகளில் எச்சரிக்கை மற்றும் விவேகம் தேவை.'],
        notesEn: ['Prudence required in major asset reinvestments and debt avoidance.'],
      },
      {
        ageTitleTa: st7Age.ta,
        ageTitleEn: st7Age.en,
        ageYearsMax: st7Age.totalYears,
        statusIcon: '--',
        statusColor: 'rose',
        notesTa: ['60 வயது பூரண கர்ம நிறைவு; ஓய்வுக்கால அமைதி மற்றும் ஆரோக்கிய பராமரிப்பில் கவனம்.'],
        notesEn: ['Full 60-year karma loop completion; focus on health and spiritual peace.'],
      },
    ];
  } else {
    // When Karma Start Settlement Age K > 30.0 (e.g. 56.0 yrs as in Chaturdashi 14)
    const st1Age = formatAge(mirrorSymmetricTotalYears);
    const st2Age = formatAge(mirrorSymmetricTotalYears + (30.0 - mirrorSymmetricTotalYears) * 0.5);
    const st3Age = formatAge(30.0);
    const st4Age = formatAge(30.0 + (karmaStartTotalYears - 30.0) * 0.5);
    const st5Age = formatAge(karmaStartTotalYears);
    const st6Age = formatAge(60.0);

    timelineItems = [
      {
        ageTitleTa: st1Age.ta,
        ageTitleEn: st1Age.en,
        ageYearsMax: st1Age.totalYears,
        statusIcon: '++',
        statusColor: 'emerald',
        notesTa: ['எதிர் சமச்சீர் விதை பருவம்: பாலிய சுப பலன்கள் மற்றும் குடும்ப பாதுகாப்பு.'],
        notesEn: ['Mirror symmetric seed period: Early childhood prosperity and support.'],
      },
      {
        ageTitleTa: st2Age.ta,
        ageTitleEn: st2Age.en,
        ageYearsMax: st2Age.totalYears,
        statusIcon: '+',
        statusColor: 'green',
        notesTa: ['கல்வித் தொடக்கம் மற்றும் அடிப்படை உழைப்பு.'],
        notesEn: ['Education start and foundational career groundwork.'],
      },
      {
        ageTitleTa: st3Age.ta,
        ageTitleEn: st3Age.en,
        ageYearsMax: st3Age.totalYears,
        statusIcon: '-',
        statusColor: 'amber',
        notesTa: ['30 வயது மையப்புள்ளி வரை கடுமையான வாழ்க்கைப் போராட்டம்; பொறுமை அவசியம்.'],
        notesEn: ['Struggles until age 30 midpoint; patience required.'],
      },
      {
        ageTitleTa: st4Age.ta,
        ageTitleEn: st4Age.en,
        ageYearsMax: st4Age.totalYears,
        statusIcon: '+',
        statusColor: 'green',
        notesTa: ['பொருளாதாரம் ஏறுமுகமாக மாறும்.'],
        notesEn: ['Financial trajectory turns upwards.'],
      },
      {
        ageTitleTa: st5Age.ta,
        ageTitleEn: st5Age.en,
        ageYearsMax: st5Age.totalYears,
        statusIcon: '++',
        statusColor: 'emerald',
        notesTa: [
          'இந்த வயது முடிவதற்குள் பொருளாதார நிறைவு (settlement) உண்டு.',
          '6/8/12-ம் பாவகத்தின் தொடர்பு திசா நடந்தாலும் பொருளாதார ஏற்றம் நிலைக்கும்.',
        ],
        notesEn: [
          `Complete financial settlement achieved before age ${karmaStartAgeYears}.`,
          'Economic progress holds strong even during 6/8/12 Dasa periods.',
        ],
      },
      {
        ageTitleTa: st6Age.ta,
        ageTitleEn: st6Age.en,
        ageYearsMax: st6Age.totalYears,
        statusIcon: '--',
        statusColor: 'rose',
        notesTa: ['60 வயது பூரண கர்ம நிறைவு; ஓய்வுக்கால அமைதி மற்றும் ஆரோக்கிய பராமரிப்பில் கவனம்.'],
        notesEn: ['Full 60-year karma loop completion; focus on health and spiritual peace.'],
      },
    ];
  }

  const primaryAgeStart = tithiNumber * 4;
  const primaryAgeEnd = primaryAgeStart + 4;

  const mirrorTithiNumber = Math.round((15 - tithiNumber) * 10) / 10;
  const mirrorAgeStart = Math.round(mirrorTithiNumber * 4 * 10) / 10;
  const mirrorAgeEnd = mirrorAgeStart + 4;

  const deltaTithi = Math.round(Math.abs(7.5 - tithiNumber) * 10) / 10;
  const deltaYears = Math.round(deltaTithi * 4 * 10) / 10;
  const totalSpanTithis = Math.round(deltaTithi * 2 * 10) / 10;
  const totalSpanYears = Math.round(totalSpanTithis * 4 * 10) / 10;

  const isFirstHalf = tithiNumber <= 7.5;

  const upperPolarityFirstHalf: '+' | '-' = isFirstHalf ? '+' : '-';
  const lowerPolarityFirstHalf: '+' | '-' = isFirstHalf ? '-' : '+';
  const upperPolaritySecondHalf: '+' | '-' = isFirstHalf ? '-' : '+';
  const lowerPolaritySecondHalf: '+' | '-' = isFirstHalf ? '+' : '-';

  const explanationTa = isFirstHalf
    ? `திதி ${tithiNumber} (வயது ${primaryAgeStart}-${primaryAgeEnd}) 7.5 திதிக்கு (30 வயது) முந்தைய முதல் பாதியில் உள்ளது. இதிலிருந்து 7.5 மையப் புள்ளிக்கு இடைப்பட்ட தூரம் ${deltaTithi} திதி (${deltaYears} ஆண்டுகள்). இதற்க இணையான எதிரெதிர் சமச்சீர் திதி ${mirrorTithiNumber} (வயது ${mirrorAgeStart}-${mirrorAgeEnd}). இந்த இரு புள்ளிக்கும் இடையேயான மொத்த இடைவெளி ${totalSpanTithis} திதிகள் (${totalSpanYears} ஆண்டுகள்).`
    : `திதி ${tithiNumber} (வயது ${primaryAgeStart}-${primaryAgeEnd}) 7.5 திதிக்கு (30 வயது) பிந்தைய இரண்டாம் பாதியில் உள்ளது. இதிலிருந்து 7.5 மையப் புள்ளிக்கு இடைப்பட்ட தூரம் ${deltaTithi} திதி (${deltaYears} ஆண்டுகள்). இதற்க இணையான எதிரெதிர் சமச்சீர் திதி ${mirrorTithiNumber} (வயது ${mirrorAgeStart}-${mirrorAgeEnd}).`;

  const explanationEn = isFirstHalf
    ? `Tithi ${tithiNumber} (Age ${primaryAgeStart}-${primaryAgeEnd}) falls in the first half before 7.5 (Age 30). Distance to center 7.5 is ${deltaTithi} Tithis (${deltaYears} years). Mirrored symmetric Tithi is ${mirrorTithiNumber} (Age ${mirrorAgeStart}-${mirrorAgeEnd}) with a total span of ${totalSpanTithis} Tithis (${totalSpanYears} years).`
    : `Tithi ${tithiNumber} (Age ${primaryAgeStart}-${primaryAgeEnd}) falls in the second half after 7.5 (Age 30). Distance to center 7.5 is ${deltaTithi} Tithis (${deltaYears} years). Mirrored symmetric Tithi is ${mirrorTithiNumber} (Age ${mirrorAgeStart}-${mirrorAgeEnd}).`;

  const tithiAgeTimeline: TithiAgeTimelineDetail = {
    tithiNumber,
    primaryAgeStart,
    primaryAgeEnd,
    mirrorTithiNumber,
    mirrorAgeStart,
    mirrorAgeEnd,
const TITHI_CONCEPT_MASTER_PREDICTIONS: Record<
  number,
  {
    generalTa: string;
    generalEn: string;
    deityTa: string;
    deityEn: string;
    remedyTa: string;
    remedyEn: string;
  }
> = {
  1: {
    generalTa: 'பிரதமை திதி: சுயமாக சிந்தித்து உழைத்து முன்னுக்கு வரும் திறன் கொண்டவர். 4 முதல் 8 வயதில் கர்மா விழிப்புணர்வு அடைந்து, 56-60 வயதில் பெருஞ்செல்வம் மற்றும் சமூக அந்தஸ்து உருவாகும்.',
    generalEn: 'Pratipat Tithi: Independent spirit driven by self-effort. Karma activates around age 4-8, leading to high social status and financial peak at age 56-60.',
    deityTa: 'சூரிய பகவான் & அக்னி தேவன்',
    deityEn: 'Lord Surya & Agni Deva',
    remedyTa: 'ஞாயிற்றுக்கிழமைகளில் சூரிய நமஸ்காரம் செய்து செம்பருத்தி மலரால் அர்ச்சனை செய்யவும்.',
    remedyEn: 'Perform Surya Namaskar on Sundays and offer red hibiscus flowers.',
  },
  2: {
    generalTa: 'துவிதியை திதி: குடும்ப பலம் மற்றும் திரண்ட தனச் சேர்க்கை அமையும். 8 முதல் 12 வயதில் கர்ம துவக்கமும், 52-56 வயதில் வாக்குச் செல்வாக்கு மற்றும் சொத்துக்கள் யோகமும் கிடைக்கும்.',
    generalEn: 'Dwitiya Tithi: Family prosperity and sound financial savings. Karma activates at age 8-12, reaching peak oratorical influence and property acquisition at age 52-56.',
    deityTa: 'பிரம்ம தேவன் & கலைமகள்',
    deityEn: 'Lord Brahma & Goddess Saraswati',
    remedyTa: 'புதன்கிழமைகளில் சரஸ்வதி தேவிக்கு வெண்மலர்கள் சாற்றி வழிபாடு செய்யவும்.',
    remedyEn: 'Offer white flowers to Goddess Saraswati on Wednesdays.',
  },
  3: {
    generalTa: 'திரிதியை திதி: தைரிய வீரிய விகசிதம், இளைய சகோதர யோகம் மற்றும் கலைத் துறை வெற்றி தருவது. 12 முதல் 16 வயதில் கர்ம அதிர்வுகள் தொடங்கி, 48-52 வயதில் தொழில் நிலைத்தன்மை உருவாகும்.',
    generalEn: 'Tritiya Tithi: Courage, artistic brilliance, and sibling support. Karma starts at age 12-16, reaching stable enterprise and position at age 48-52.',
    deityTa: 'கௌரி அம்மன் & குபேரன்',
    deityEn: 'Goddess Gauri & Lord Kubera',
    remedyTa: 'வெள்ளிக்கிழமைகளில் ஸ்ரீலக்ஷ்மி குபேர வழிபாடு செய்து நெய் தீபம் ஏற்றவும்.',
    remedyEn: 'Worship Lord Kubera and Goddess Lakshmi with ghee lamps on Fridays.',
  },
  4: {
    generalTa: 'சதுர்த்தி திதி: ஆரம்ப தடைகளைத் தாண்டி விஸ்வரூப வெற்றி பெறும் அமைப்பு. 16 முதல் 20 வயதில் கடின உழைப்பும், 44-48 வயதில் வினாயக பெருமான் அருளால் நிரந்தர சொத்து மற்றும் அதிகார யோகம் அமையும்.',
    generalEn: 'Chaturthi Tithi: Triumph over initial hurdles leading to monumental success. Challenges at age 16-20 culminate in solid real estate and authority at age 44-48.',
    deityTa: 'ஸ்ரீ மகா கணபதி',
    deityEn: 'Lord Maha Ganapati',
    remedyTa: 'சங்கடஹர சதுர்த்தி தோறும் விநாயகருக்கு அருகம்புல் சாற்றி சிதறுகாய் உடைக்கவும்.',
    remedyEn: 'Offer Bermuda grass (Arugampul) and break coconuts for Lord Ganesha on Sankatahara Chaturthi.',
  },
  5: {
    generalTa: 'பஞ்சமி திதி: புத்தி கூர்மை, பூர்வ புண்ணிய பலன்கள் மற்றும் சிறந்த சந்தான அபிவிருத்தி தருவது. 20 முதல் 24 வயதில் திருப்புமுனை ஏற்பட்டு, 40-44 வயதில் மிகப்பெரிய ராஜயோக தனச் சேர்க்கை கிடைக்கும்.',
    generalEn: 'Panchami Tithi: Intellectual sharpness, purva punya merits, and family bliss. Turning point at age 20-24 unlocks peak fortune at age 40-44.',
    deityTa: 'நாகதேவதை & வராஹி அம்மன்',
    deityEn: 'Naga Devatas & Goddess Varahi',
    remedyTa: 'பஞ்சமி திதியன்று வராஹி அம்மனுக்கு பஞ்ச தீபம் ஏற்றி நெய்வேத்தியம் செய்து வழிபடவும்.',
    remedyEn: 'Offer ghee lamps to Goddess Varahi on Panchami Tithi for swift financial elevation.',
  },
  6: {
    generalTa: 'சஷ்டி திதி: பகை வெற்றி, உத்தியோக வளர்ச்சி மற்றும் கடன் நிவர்த்தி தரும் திதி. 24 முதல் 28 வயதில் கர்ம யோகம் சுடரத் தொடங்கி, 36-40 வயதில் முருகப்பெருமான் அருளால் பெரும் யோகsettlement உருவாகும்.',
    generalEn: 'Sashti Tithi: Overcoming adversaries, career ascension, and debt freedom. Major karma activation at age 24-28 brings full financial settlement at age 36-40.',
    deityTa: 'ஸ்ரீ சுப்பிரமணிய சுவாமி (முருகன்)',
    deityEn: 'Lord Subramanya (Murugan)',
    remedyTa: 'செவ்வாய்க்கிழமைகளில் திருச்செந்தூர் அல்லது உள்ளூர் முருகன் கோவிலில் செவ்வரளி பூ சாற்றி வேல் வழிபாடு செய்ய வேண்டும்.',
    remedyEn: 'Offer red oleander flowers to Lord Murugan and worship His sacred Vel on Tuesdays.',
  },
  7: {
    generalTa: 'சப்தமி திதி: களத்திர யோகம், கூட்டுத் தொழில் வெற்றி மற்றும் தூரதேசப் பயணம் தரும். 28 முதல் 30 வயதில் கர்ம சுழற்சி உச்சமடைந்து, 32-36 வயதில் வியாபார மற்றும் குடும்ப வாழ்க்கை நிலைபெறும்.',
    generalEn: 'Saptami Tithi: Strong marital harmony, business partnership prosperity, and foreign ties. Peak karma cycle at age 28-30 yields stable growth at age 32-36.',
    deityTa: 'சூரிய நாராயணன் & சப்த மாதர்கள்',
    deityEn: 'Surya Narayana & Saptha Mathrikas',
    remedyTa: 'ஞாயிற்றுக்கிழமைகளில் சூரியனார் கோவில் அல்லது சூரிய பகவானுக்கு கோதுமை தானம் செய்ய வேண்டும்.',
    remedyEn: 'Donate wheat grains at Lord Surya temples on Sundays.',
  },
  8: {
    generalTa: 'அஷ்டமி திதி: ஆன்மீக பலம், ஆத்ம விழிப்புணர்வு மற்றும் எதிர்பாராத தனவரவு தரும். 30 முதல் 32 வயதில் கர்ம மையம் கடந்து, 50 வயதிற்குமேல் அஷ்டலட்சுமி யோகம் சித்திக்கும்.',
    generalEn: 'Ashtami Tithi: Deep spiritual stamina, occult mastery, and windfall gains. Crosses karma center point at age 30-32, unlocking Ashta Lakshmi wealth after age 50.',
    deityTa: 'ஸ்ரீ பைரவர் & துர்க்கை அம்மன்',
    deityEn: 'Lord Bhairava & Goddess Durga',
    remedyTa: 'தேய்பிறை அஷ்டமியில் சொர்ண ஆகர்ஷண பைரவருக்கு வடமாலை சாற்றி நெய் தீபம் ஏற்றவும்.',
    remedyEn: 'Worship Swarna Akarshana Bhairava with vada garlands and ghee lamps on Krishna Ashtami.',
  },
  9: {
    generalTa: 'நவமி திதி: தர்ம சிந்தனை, தந்தைவழி ஆசி மற்றும் உன்னத தலைமைப் பதவி தருவது. 36 முதல் 40 வயதில் ஸ்ரீராமபிரான் அருளால் மிகப்பெரிய நிர்வாக உயர்வு மற்றும் கௌரவம் கிடைக்கும்.',
    generalEn: 'Navami Tithi: Righteous virtues, fatherly grace, and supreme leadership. Achieves executive authority and honors at age 36-40 by Lord Rama’s grace.',
    deityTa: 'ஸ்ரீ ராமபிரான் & ஆஞ்சநேயர்',
    deityEn: 'Lord Rama & Lord Hanuman',
    remedyTa: 'வியாழக்கிழமை அல்லது சனிக்கிழமைகளில் ஆஞ்சநேயருக்கு வெண்ணெய் காப்பு சாற்றி துளசி அர்ச்சனை செய்யவும்.',
    remedyEn: 'Offer butter alankaram and Tulsi garlands to Lord Hanuman on Thursdays/Saturdays.',
  },
  10: {
    generalTa: 'தசமி திதி: ஜீவன ஸ்தான யோகம், புதிய தொழில் விரிவாக்கம் மற்றும் புகழைத் தரும். 40 முதல் 44 வயதில் கர்ம பலன் முழுமையாகக் கை கூடி, சமுதாயத்தில் முதன்மை அந்தஸ்தைப் பெற்றுத் தரும்.',
    generalEn: 'Dasami Tithi: Professional supremacy, expansion of enterprises, and public renown. Full karma fruit manifests at age 40-44, bestowing high social standing.',
    deityTa: 'அஷ்ட திக் பாலகர்கள் & தர்ம சாஸ்தா',
    deityEn: 'Ashta Dikpalakas & Lord Dharma Sastha',
    remedyTa: 'சனிக்கிழமைகளில் சாஸ்தா (ஐயப்பன்) கோவிலில் எள் தீபம் ஏற்றி வழிபாடு செய்ய வேண்டும்.',
    remedyEn: 'Light sesame oil lamps at Lord Ayyappa (Sastha) temples on Saturdays.',
  },
  11: {
    generalTa: 'ஏகாதசி திதி: அபரிமிதமான லாப யோகம், எடுத்த காரியங்களில் பூரண வெற்றி மற்றும் விஷ்ணு கடாட்சம் தருவது. 44 முதல் 48 வயதில் பங்குச்சந்தை / தொழில் லாபம் நிலைபெறும்.',
    generalEn: 'Ekadashi Tithi: Unstoppable wealth inflow, fulfillment of noble ambitions, and Lord Vishnu’s grace. Massive financial security consolidates at age 44-48.',
    deityTa: 'ஸ்ரீ மகா விஷ்ணு & ஸ்ரீதேவி',
    deityEn: 'Lord Maha Vishnu & Goddess Sridevi',
    remedyTa: 'ஏகாதசி விரதமிருந்து பெருமாளுக்கு துளசி மாலை சாற்றி விஷ்ணு சகஸ்ரநாமம் பாராயணம் செய்யவும்.',
    remedyEn: 'Observe Ekadashi vrata and recite Vishnu Sahasranamam with Tulsi offerings.',
  },
  12: {
    generalTa: 'துவாதசி திதி: தர்ம காரியங்கள், அன்னதான யோகம் மற்றும் வெளிநாட்டு தனவரவு தருவது. 48 முதல் 52 வயதில் ஆன்மீக தர்ம சொத்துக்கள் மற்றும் பெரிய முதலீடுகளின் பலன்கள் கிடைக்கும்.',
    generalEn: 'Dwadashi Tithi: Philanthropic virtues, noble deeds, and overseas fortune. Yields major returns from large capital investments at age 48-52.',
    deityTa: 'ஸ்ரீ தனுவந்திரி பகவான்',
    deityEn: 'Lord Dhanvantari',
    remedyTa: 'துவாதசி நாளில் அன்னதானம் அளித்து தனுவந்திரி மந்திரம் ஜபித்து ஆரோக்கியம் பெறவும்.',
    remedyEn: 'Provide food donation (Annadhanam) on Dwadashi days for health and longevity.',
  },
  13: {
    generalTa: 'திரயோதசி திதி: பிரதோஷ சுப யோகம், நீண்ட ஆயுள் மற்றும் ஆரோக்கிய மேன்மை தருவது. 52 முதல் 56 வயதில் சிவபெருமானின் அருளால் சகல தடைகளும் விலகி நிலையான நிம்மதி உருவாகும்.',
    generalEn: 'Trayodashi Tithi: Pradosha divine shield, health robustness, and long life. All life obstacles dissolve at age 52-56 by Lord Shiva’s blessing.',
    deityTa: 'ஸ்ரீ நடராஜ பெருமான் & நந்தீஸ்வரர்',
    deityEn: 'Lord Nataraja & Nandi Deva',
    remedyTa: 'பிரதோஷ காலத்தில் நந்தீஸ்வரருக்கு அருகம்புல், வில்வ மாலை சாற்றி பிரதோஷ வழிபாடு செய்ய வேண்டும்.',
    remedyEn: 'Participate in Pradosham prayers and offer Bilva leaves to Nandi Deva.',
  },
  14: {
    generalTa: 'சதுர்தசி திதி: உக்கிர சக்திகளின் பாதுகாப்பு, எதிரிகள் வீழ்ச்சி மற்றும் பெரும் சொத்து யோகம் தருவது. 56 முதல் 60 வயதில் வாழ்நாளின் உச்சகட்ட நிதி பாதுகாப்பு உருவாகும்.',
    generalEn: 'Chaturdashi Tithi: Divine protection shield against enemies and financial vulnerability. Lifetime peak asset security manifests at age 56-60.',
    deityTa: 'ஸ்ரீ காளி தேவி & ஸ்ரீ நரசிம்மர்',
    deityEn: 'Goddess Kali & Lord Narasimha',
    remedyTa: 'நரசிம்மருக்கு பானகம் நிவேதனம் செய்து மாலை நேரத்தில் தீபமேற்றி வழிபட வேண்டும்.',
    remedyEn: 'Offer Panakam drink to Lord Narasimha during dusk hours.',
  },
  15: {
    generalTa: 'பூர்ணிமா / அமாவாசை திதி: பூரண சந்திர கடாட்சம் அல்லது பித்ருக்கள் பூரண ஆசி தருவது. 60 வயதில் கர்ம சுழற்சி நிறைவடைந்து வம்ச விருத்தி மற்றும் ஆன்மீக முக்தி யோகம் தரும்.',
    generalEn: 'Purnima / Amavasya Tithi: Full Lunar radiance or supreme Pitru ancestral blessings. Completes the 60-year karma loop, bestowing lineage expansion and peace.',
    deityTa: 'ஸ்ரீ லலிதா மகா திரிபுரசுந்தரி (பூர்ணிமா) / பித்ருக்கள் (அமாவாசை)',
    deityEn: 'Goddess Lalitha Tripura Sundari (Purnima) / Pitrus (Amavasya)',
    remedyTa: 'பௌர்ணமியில் ஸ்ரீசக்ர நவாபரண பூஜை அல்லது அமாவாசையில் பித்ரு தர்ப்பணம் செய்வது நலம்.',
    remedyEn: 'Perform Sri Chakra worship on Purnima or ancestral Pitru Tharpana on Amavasya.',
  },
};

  // Generate Tithi Predictions
  const masterPred = TITHI_CONCEPT_MASTER_PREDICTIONS[tithiNumber] || TITHI_CONCEPT_MASTER_PREDICTIONS[1];

  const karmaAgePredictionTa = `தாங்களின் கர்ம விழிப்புணர்வு வயது ${karmaStartAgeYears} வருடம், ${karmaStartAgeMonths} மாதம், ${karmaStartAgeDays} நாளில் துவங்கும். இந்த வயதுக்கு முன் செய்யப்படும் முயற்சிகள் விதை விதைப்பது போன்றது; இந்த வயதிற்கு பின் பலன்கள் அறுவடையாகும்.`;
  const karmaAgePredictionEn = `Your Karma operation starts at Age ${karmaStartAgeYears} Years, ${karmaStartAgeMonths} Months, ${karmaStartAgeDays} Days. Efforts prior to this age lay the foundation, while full fruits manifest post this milestone.`;

  const virayathipathiPredictionTa =
    virayathipathiPlanet === 'Moon'
      ? '12-ம் அதிபதி சந்திரன் என்பதால், பூரண பொருள் (99%) யோகம் உண்டு. தாய்வழி அல்லது நீர்வழி வரவு சிறப்பாக அமையும்.'
      : [1, 2, 4, 10, 11].includes(vHouse)
      ? `12-ம் அதிபதி ${virayathipathiPlanetTa} தன/சுப ஸ்தானத்தில் (${vHouse}-ம் பாவம்) நிற்பதால் 67% பொருள் (₹) மற்றும் 33% உயிர் யோகம் தருவார். அசையாச் சொத்துக்கள் மற்றும் தொழில் மூலமாக பெரும் தன சேர்க்கை அமையும்.`
      : [3, 5, 7, 9].includes(vHouse)
      ? `12-ம் அதிபதி ${virayathipathiPlanetTa} தர்ம/திரிகோண ஸ்தானத்தில் (${vHouse}-ம் பாவம்) நிற்பதால் 75% உயிர் மற்றும் 25% பொருள் யோகம் தருவார். ஆன்மீகம், புகழ்பெறுதல் மற்றும் கலை வழியில் மேன்மை கிடைக்கும்.`
      : `12-ம் அதிபதி ${virayathipathiPlanetTa} மறைவு ஸ்தானத்தில் (${vHouse}-ம் பாவம்) நிற்பதால் 60% பொருள் மற்றும் 40% உயிர் யோகம் தருவார். ஆரம்ப தொழில் சவால்கள் வந்தாலும், திடீர் யோகம் மற்றும் கடன்களை வெல்லும் திறன் உருவாகும்.`;

  const virayathipathiPredictionEn =
    virayathipathiPlanet === 'Moon'
      ? '12th Lord is Moon, bestowing 99% Material wealth (Porul). Maternal or liquid assets bring high prosperity.'
      : [1, 2, 4, 10, 11].includes(vHouse)
      ? `12th Lord ${virayathipathiPlanet} placed in benefic House ${vHouse}, granting 67% Material (₹) & 33% Vitality (Uyir). Accumulates real estate & trade gains.`
      : [3, 5, 7, 9].includes(vHouse)
      ? `12th Lord ${virayathipathiPlanet} placed in Dharma House ${vHouse}, granting 75% Vitality & 25% Material wealth. Renown, arts & spiritual satisfaction peak.`
      : `12th Lord ${virayathipathiPlanet} placed in Dusthana House ${vHouse}, granting 60% Material & 40% Vitality. Overcomes initial business hurdles to secure windfall profits.`;

  const polarityPhasePredictionTa = isFirstHalf
    ? `தாங்கள் 7.5 திதிக்கு முந்தைய முதல் பாதியில் (0-30 வயது) பிறந்துள்ளீர்கள். பாலியப் பருவத்தில் குடும்பப் பாதுகாப்பு மேலோங்கும். 30 வயதிற்குப் பின் தொழில் முதலீடுகளில் கூடுதல் விவேகம் தேவை.`
    : `தாங்கள் 7.5 திதிக்கு பிந்தைய இரண்டாம் பாதியில் (30-60 வயது) பிறந்துள்ளீர்கள். இளமைப் பருவத்தில் கடுமையான போராட்டங்கள் இருந்தாலும், 30 வயதிற்குமேல் அசுர வளர்ச்சி மற்றும் நிலையான நிதி நிறைவு (Settlement) அமையும்.`;

  const polarityPhasePredictionEn = isFirstHalf
    ? `Born in the first half (0.01 - 7.5 Tithi / Age 0-30). Youth enjoys family protection. Post Age 30, financial caution and asset protection are advised.`
    : `Born in the second half (7.5 - 15 Tithi / Age 30-60). Youth brings rigorous effort, but post Age 30 yields massive career expansion and financial settlement.`;

  const tithiPredictions: TithiConceptPredictions = {
    generalPredictionTa: masterPred.generalTa,
    generalPredictionEn: masterPred.generalEn,
    karmaAgePredictionTa,
    karmaAgePredictionEn,
    virayathipathiPredictionTa,
    virayathipathiPredictionEn,
    polarityPhasePredictionTa,
    polarityPhasePredictionEn,
    keyDeityTa: masterPred.deityTa,
    keyDeityEn: masterPred.deityEn,
    specialRemedyTa: masterPred.remedyTa,
    specialRemedyEn: masterPred.remedyEn,
  };

  return {
    tithiNameTa: panchanga.tithiTa,
    tithiNameEn: panchanga.tithiEn,
    tithiNumber,
    tithiBalanceDegStr,
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
    tithiAgeTimeline,
    tithiPredictions,
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
