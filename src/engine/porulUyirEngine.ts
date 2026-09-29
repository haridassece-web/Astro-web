import type {
  BirthInput,
  Panchanga,
  PlanetPosition,
  PorulUyirPlanetClassification,
  SixthHouseBadhakaAnalysis,
  SolsticeAyanaAnalysis,
  PorulUyirAgePhase,
  PorulUyirReport,
} from '../types/astrology';

const SIGN_NAMES_TA = [
  'மேஷம்',
  'ரிஷபம்',
  'மிதுனம்',
  'கடகம்',
  'சிம்மம்',
  'கன்னி',
  'துலாம்',
  'விருச்சிகம்',
  'தனுசு',
  'மகரம்',
  'கும்பம்',
  'மீனம்',
];

const SIGN_NAMES_EN = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

const PLANET_LORDS_BY_SIGN: Record<number, string> = {
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

/**
 * Lagna-wise classification of Porul (Material Wealth) vs Uyir (Life/Vitality) Planets
 */
const LAGNA_PORUL_UYIR_CONFIG: Record<
  number,
  {
    uyirPlanets: string[];
    porulPlanets: string[];
  }
> = {
  // 0: Aries
  0: {
    uyirPlanets: ['Mars', 'Sun', 'Jupiter'],
    porulPlanets: ['Venus', 'Saturn', 'Rahu', 'Mercury'],
  },
  // 1: Taurus
  1: {
    uyirPlanets: ['Venus', 'Mercury', 'Saturn'],
    porulPlanets: ['Mars', 'Sun', 'Jupiter', 'Rahu'],
  },
  // 2: Gemini
  2: {
    uyirPlanets: ['Mercury', 'Venus', 'Saturn'],
    porulPlanets: ['Moon', 'Mars', 'Jupiter', 'Rahu'],
  },
  // 3: Cancer
  3: {
    uyirPlanets: ['Moon', 'Mars', 'Jupiter'],
    porulPlanets: ['Saturn', 'Rahu', 'Sun', 'Mercury'],
  },
  // 4: Leo
  4: {
    uyirPlanets: ['Sun', 'Jupiter', 'Mars'],
    porulPlanets: ['Saturn', 'Rahu', 'Venus', 'Mercury'],
  },
  // 5: Virgo
  5: {
    uyirPlanets: ['Mercury', 'Saturn', 'Venus'],
    porulPlanets: ['Sun', 'Mars', 'Jupiter', 'Rahu'],
  },
  // 6: Libra
  6: {
    uyirPlanets: ['Venus', 'Saturn', 'Mercury'],
    porulPlanets: ['Mars', 'Sun', 'Jupiter', 'Rahu'],
  },
  // 7: Scorpio (Matches attached handwritten notes explicitly)
  7: {
    uyirPlanets: ['Mars', 'Jupiter', 'Moon'],
    porulPlanets: ['Saturn', 'Rahu', 'Venus', 'Mercury'],
  },
  // 8: Sagittarius
  8: {
    uyirPlanets: ['Jupiter', 'Mars', 'Sun'],
    porulPlanets: ['Saturn', 'Rahu', 'Venus', 'Mercury'],
  },
  // 9: Capricorn
  9: {
    uyirPlanets: ['Saturn', 'Venus', 'Mercury'],
    porulPlanets: ['Mars', 'Sun', 'Jupiter', 'Rahu'],
  },
  // 10: Aquarius
  10: {
    uyirPlanets: ['Saturn', 'Mercury', 'Venus'],
    porulPlanets: ['Mars', 'Sun', 'Jupiter', 'Rahu'],
  },
  // 11: Pisces
  11: {
    uyirPlanets: ['Jupiter', 'Moon', 'Mars'],
    porulPlanets: ['Saturn', 'Rahu', 'Venus', 'Mercury'],
  },
};

export function calculatePorulUyirReport(
  _birth: BirthInput,
  planets: PlanetPosition[],
  lagnaSignId: number,
  _panchanga: Panchanga
): PorulUyirReport {
  const lagnaNameTa = SIGN_NAMES_TA[lagnaSignId];
  const lagnaNameEn = SIGN_NAMES_EN[lagnaSignId];

  const sun = planets.find((p) => p.name === 'Sun') || planets[0];

  // 1. Lagna Configuration
  const config = LAGNA_PORUL_UYIR_CONFIG[lagnaSignId] || LAGNA_PORUL_UYIR_CONFIG[7];

  // 2. Classify All Planets as Uyir vs Porul
  const uyirPlanetsList: PorulUyirPlanetClassification[] = [];
  const porulPlanetsList: PorulUyirPlanetClassification[] = [];

  planets.forEach((p) => {
    if (p.name === 'Lagna' || p.name === 'Ketu') return;

    const currentSignId = Math.floor(p.longitude / 30);
    const placedHouse = ((currentSignId - lagnaSignId + 12) % 12) + 1;
    const isUyir = config.uyirPlanets.includes(p.name);
    const isPorul = config.porulPlanets.includes(p.name);

    const housesOwned: number[] = [];
    Object.entries(PLANET_LORDS_BY_SIGN).forEach(([sIdStr, lord]) => {
      if (lord === p.name) {
        const sId = Number(sIdStr);
        const h = ((sId - lagnaSignId + 12) % 12) + 1;
        housesOwned.push(h);
      }
    });

    const classification: PorulUyirPlanetClassification = {
      planetEn: p.name,
      planetTa: PLANET_TAMIL_NAMES[p.name] || p.name,
      role: isUyir ? 'uyir' : isPorul ? 'porul' : 'neutral',
      housesOwned,
      placedHouse,
      placedSignTa: SIGN_NAMES_TA[currentSignId],
      placedSignEn: SIGN_NAMES_EN[currentSignId],
      effectTa: isUyir
        ? `${PLANET_TAMIL_NAMES[p.name] || p.name} உயிர்காரக கிரகம் (${housesOwned.join(
            ', '
          )}-ம் பாவாதிபதி). ஆரோக்கியம், ஆத்ம பலம் மற்றும் வம்ச விருத்தியைக் காக்கும்.`
        : `${PLANET_TAMIL_NAMES[p.name] || p.name} பொருள்காரக கிரகம். தனச் சேர்க்கை, உத்தியோகம் மற்றும் தொழில் பொருளாதார மேன்மை தருவார்.`,
      effectEn: isUyir
        ? `${p.name} is an Uyir (Vitality) planet (Lord of H${housesOwned.join(
            ', '
          )}). Protects health, soul strength, and longevity.`
        : `${p.name} is a Porul (Wealth) planet. Bestows financial accumulation, career growth, and commercial profits.`,
    };

    if (isUyir) {
      uyirPlanetsList.push(classification);
    } else {
      porulPlanetsList.push(classification);
    }
  });

  // 3. Badhakasthanam & Badhakatipathi Calculation
  // 0: Movable (11th house badhaka)
  // 1: Fixed (9th house badhaka)
  // 2: Dual (7th house badhaka)
  const signType = lagnaSignId % 3;
  const badhakaHouseNumber = signType === 1 ? 9 : signType === 0 ? 11 : 7;
  const badhakaSignId = (lagnaSignId + badhakaHouseNumber - 1) % 12;
  const badhakaLordEn = PLANET_LORDS_BY_SIGN[badhakaSignId];
  const badhakaLordTa = PLANET_TAMIL_NAMES[badhakaLordEn] || badhakaLordEn;

  const badhakaPlanetObj = planets.find((p) => p.name === badhakaLordEn);
  const badhakaPlacedSignId = badhakaPlanetObj ? Math.floor(badhakaPlanetObj.longitude / 30) : 0;
  const badhakaPlacedHouse = ((badhakaPlacedSignId - lagnaSignId + 12) % 12) + 1;

  // 4. 6th House & Father (9th Lord) Analysis
  const sixthHouseSignId = (lagnaSignId + 5) % 12;
  const sixthHouseLordEn = PLANET_LORDS_BY_SIGN[sixthHouseSignId];
  const sixthHouseLordTa = PLANET_TAMIL_NAMES[sixthHouseLordEn] || sixthHouseLordEn;

  const ninthHouseSignId = (lagnaSignId + 8) % 12;
  const ninthHouseLordEn = PLANET_LORDS_BY_SIGN[ninthHouseSignId];
  const ninthHouseLordObj = planets.find((p) => p.name === ninthHouseLordEn);
  const ninthHouseLordPlacedSignId = ninthHouseLordObj ? Math.floor(ninthHouseLordObj.longitude / 30) : -1;

  const is9thLordIn6th = ninthHouseLordPlacedSignId === sixthHouseSignId;

  const planetsIn6thHouse = planets
    .filter((p) => p.name !== 'Lagna' && Math.floor(p.longitude / 30) === sixthHouseSignId)
    .map((p) => {
      const isBadhaka = p.name === badhakaLordEn;
      const isUyir = config.uyirPlanets.includes(p.name);
      const isPorul = config.porulPlanets.includes(p.name);

      let impactTa = '';
      let impactEn = '';

      if (isBadhaka) {
        impactTa = `${PLANET_TAMIL_NAMES[p.name]} 6-ம் பாவத்தில் பாதகாதிபதியாக அமர்ந்துள்ளார். தொழில்/உத்தியோகத்தில் தனவரவு தந்தாலும், கடன் (Debt), நோய் (Disease) மற்றும் எதிரி/வழக்கு (Litigation) தொல்லைகளைத் தருவார்.`;
        impactEn = `${p.name} as Badhakatipathi in 6th house grants money via career, but converts earnings into heavy debts, health issues, or legal litigation.`;
      } else if (isPorul) {
        impactTa = `${PLANET_TAMIL_NAMES[p.name]} பொருள்காரகமாக 6-ம் இடத்தில் அமர்ந்துள்ளார். தொழில் மூலம் பணப்புழக்கம் தரும், ஆனால் அப் பணத்தை கடனாக மாற்றிக் கடன் வலையில் சிக்க வைப்பார்.`;
        impactEn = `${p.name} as a Porul planet in 6th house yields money, but locks cash flow into debt repayment and loan obligations.`;
      } else if (isUyir) {
        impactTa = `${PLANET_TAMIL_NAMES[p.name]} உயிர்காரகமாக 6-ல் உள்ளார். உடல் ஆரோக்கியம் மற்றும் மன அமைதியில் கவனம் தேவை. கடன்களைத் தவிர்ப்பது நல்லது.`;
        impactEn = `${p.name} as an Uyir planet in 6th house tests physical vitality and inner peace. Avoid taking optional debts.`;
      } else {
        impactTa = `${PLANET_TAMIL_NAMES[p.name]} 6-ம் பாவத்தில் அமர்ந்து உத்தியோக மற்றும் கடன் சார்ந்த சவால்களைத் தருவார்.`;
        impactEn = `${p.name} placed in 6th house influences job stability and debt dynamics.`;
      }

      return {
        planetEn: p.name,
        planetTa: PLANET_TAMIL_NAMES[p.name] || p.name,
        role: isBadhaka ? ('badhaka' as const) : isUyir ? ('uyir' as const) : ('porul' as const),
        impactTa,
        impactEn,
      };
    });

  const fatherAnalysisTa = is9thLordIn6th
    ? `9-ம் அதிபதி (${PLANET_TAMIL_NAMES[ninthHouseLordEn]}) 6-ம் இடத்தில் அமர்ந்துள்ளார். லக்னத்திற்கு 6-ம் இடம் தந்தையின் லக்னத்திற்கு (9-ம் இடம்) 10-ம் பாவமாக (ஜீவன ஸ்தானம்) வருவதால், தந்தை தொழில் செய்து வந்தாலும், கடன் பிரச்சனைகள், நோய் உபாதைகள் அல்லது நஷ்டங்களை சந்திக்க வேண்டியிருக்கும்.`
    : `9-ம் அதிபதி (${PLANET_TAMIL_NAMES[ninthHouseLordEn]}) 6-ம் இடத்தில் அமரவில்லை. தந்தையின் கர்ம மற்றும் ஆரோக்கிய சுழற்சி லக்ன பலத்திற்கு ஏற்ப சுபத்துவமாக அமையும்.`;

  const fatherAnalysisEn = is9thLordIn6th
    ? `9th Lord (${ninthHouseLordEn}) is placed in 6th house. Though 6th from Lagna acts as 10th (Karma/Profession) for Father, being 6th Rina/Roga/Satru sthanam from natal Lagna, Father faces business debts, health ailments, or court disputes.`
    : `9th Lord (${ninthHouseLordEn}) is not in 6th house, ensuring normal paternal stability aligned with general house dignity.`;

  const sixthHouseDebtWarningTa =
    planetsIn6thHouse.length > 0
      ? `6-ம் பாவத்தில் ${planetsIn6thHouse.map((p) => p.planetTa).join(', ')} அமர்ந்துள்ளதால், "பொருளாதாரம் 6-ல் வந்தால் கடனாக மாறும்" என்ற விதியின்படி, அவசியமற்ற வங்கி / தனிநபர் கடன்கள் வாங்குவதைக் தவிர்க்க வேண்டும்.`
      : `6-ம் பாவத்தில் கிரகங்கள் ஏதும் இல்லை. கடன் பாரங்கள் கட்டுக்குள் இருக்கும்.`;

  const sixthHouseDebtWarningEn =
    planetsIn6thHouse.length > 0
      ? `Planets (${planetsIn6thHouse.map((p) => p.planetEn).join(', ')}) placed in 6th house trigger the core rule: "Wealth in 6th house converts into debt." Avoid speculative borrowing.`
      : `No planets occupying 6th house directly. Debt exposure remains easily manageable.`;

  const sixthHouseBadhaka: SixthHouseBadhakaAnalysis = {
    sixthHouseSignId,
    sixthHouseSignTa: SIGN_NAMES_TA[sixthHouseSignId],
    sixthHouseSignEn: SIGN_NAMES_EN[sixthHouseSignId],
    sixthHouseLordEn,
    sixthHouseLordTa,
    planetsIn6thHouse,
    badhakaSignId,
    badhakaSignTa: SIGN_NAMES_TA[badhakaSignId],
    badhakaSignEn: SIGN_NAMES_EN[badhakaSignId],
    badhakaLordEn,
    badhakaLordTa,
    badhakaPlacedHouse,
    is9thLordIn6th,
    fatherAnalysisTa,
    fatherAnalysisEn,
    sixthHouseDebtWarningTa,
    sixthHouseDebtWarningEn,
  };

  // 5. Solstice Ayana Analysis (Uttarayanam / Dakshinayanam)
  // Sun in Capricorn (270°) to Gemini (90°) = Uttarayanam (Deva Period / Uyir Focus)
  // Sun in Cancer (90°) to Sagittarius (270°) = Dakshinayanam (Manushya Period / Porul Focus)
  const sunDeg = sun.longitude;
  const isUttarayanam = sunDeg >= 270 || sunDeg < 90;

  const solsticeAyana: SolsticeAyanaAnalysis = {
    ayana: isUttarayanam ? 'uttarayanam' : 'dakshinayanam',
    ayanaTa: isUttarayanam ? 'உத்தராயணம் (தேவ காலம் - தை முதல் ஆனி)' : 'தக்ஷிணாயனம் (மனித காலம் - ஆடி முதல் மார்கழி)',
    ayanaEn: isUttarayanam ? 'Uttarayanam (Deva Epoch - Jan to Jul)' : 'Dakshinayanam (Manushya Epoch - Jul to Jan)',
    natureTa: isUttarayanam ? 'தேவர்களுக்கு உயிர்காரகம் (Uyir Dominance)' : 'மனிதர்களுக்கு பொருள்காரகம் (Porul Dominance)',
    natureEn: isUttarayanam ? 'Deva Alignment: Dominance of Uyir (Life/Spirituality)' : 'Manushya Alignment: Dominance of Porul (Material Effort)',
    focusType: isUttarayanam ? 'uyir' : 'porul',
    impactTa: isUttarayanam
      ? 'தாங்கள் உத்தராயண காலத்தில் பிறந்துள்ளதால், உயிர்காரக பலங்கள் (ஆரோக்கியம், ஆன்மீகம், வம்ச ஆசி) மேலோங்கும். உழைப்பிற்கு ஏற்ற பொருள் தாமதமாகக் கிடைத்தாலும் நிலையான புகழைத் தரும்.'
      : 'தாங்கள் தக்ஷிணாயன காலத்தில் பிறந்துள்ளதால், பொருள்காரக பலங்கள் (பொருளாதார முயற்சி, தொழில் தனச் சேர்க்கை, சுபச் செலவுகள்) முதன்மை பெறும்.',
    impactEn: isUttarayanam
      ? 'Born during Uttarayanam. Spiritual alignment and Uyir vitality take precedence. Material rewards manifest steadily with lasting repute.'
      : 'Born during Dakshinayanam. Drive for material prosperity (Porul) and financial advancement is exceptionally high.',
  };

  // 6. Age Phase Map (0 to 60+ Years Timeline)
  const agePhases: PorulUyirAgePhase[] = [
    {
      ageRange: 'Age 00 - 12 Y',
      titleTa: 'பாலிய & கல்வி தொடக்கம் (Childhood & Growth)',
      titleEn: 'Childhood & Educational Foundation',
      statusIndicator: '+',
      porulScore: 60,
      uyirScore: 85,
      summaryTa: 'பாலிய பருவத்தில் குடும்ப பாதுகாப்பு மேலோங்கும். உயிர்காரக தேவதைகளின் பூரண அருளால் ஆரோக்கியமும் கல்வியும் சுபிட்சமாக அமையும்.',
      summaryEn: 'Youth enjoys family nurture. Uyir protection ensures steady health and basic education.',
    },
    {
      ageRange: 'Age 12 - 21 Y',
      titleTa: 'இளமை & தொழில் ஆயத்தம் (Youth & Skill Building)',
      titleEn: 'Youth & Higher Education',
      statusIndicator: '+',
      porulScore: 65,
      uyirScore: 80,
      summaryTa: 'கல்வி மற்றும் தொழில் நுட்பத் திறன்கள் வளரும் பருவம். கர்ம விழிப்புணர்வின் முதல் அதிர்வுகள் துவங்கி அடித்தளம் அமைக்கும்.',
      summaryEn: 'Focus on academic credentials and skill mastery. Initial karma triggers set baseline foundations.',
    },
    {
      ageRange: 'Age 21 - 30 Y',
      titleTa: 'தொழில் நுழைவு & கர்ம போராட்டம் (Career Entry & Early Karma)',
      titleEn: 'Career Entry & Foundation Building',
      statusIndicator: '-',
      porulScore: 50,
      uyirScore: 70,
      summaryTa: 'ஆரம்ப உத்தியோகம் மற்றும் தொழில் சவால்கள் நிறையும் பருவம். விதை விதைப்பது போன்ற காலம்; உழைப்புக்குரிய உடனடி தன பலன் குறையலாம்.',
      summaryEn: 'Initial job stabilization phase. Demands hard labor with delayed immediate financial windfalls.',
      keyWarningTa: 'புதிய தொழில் முதலீடுகளில் கூடுதல் கவனம் தேவை.',
      keyWarningEn: 'Exercise high prudence in initial business ventures.',
    },
    {
      ageRange: 'Age 30 - 38 Y',
      titleTa: 'பொருளாதார வளர்ச்சி & உயர்வு (Financial Elevation)',
      titleEn: 'Financial Elevation & Settlement',
      statusIndicator: '+',
      porulScore: 85,
      uyirScore: 75,
      summaryTa: '30 வயதிற்குப் பின் பொருள்காரக கிரகங்களின் யோகம் சுடரத் தொடங்கும். உத்தியோக உயர்வு, புதிய தன வரவு மற்றும் குடும்ப நிலைத்தன்மை உருவாகும்.',
      summaryEn: 'Post age 30 unlocks peak Porul activation. Executive promotions and steady income streams consolidate.',
    },
    {
      ageRange: 'Age 38 - 47 Y',
      titleTa: 'தனச் சேர்க்கை & உச்சகட்ட யோகம் (Peak Wealth Accumulation)',
      titleEn: 'Peak Wealth & Asset Consolidation',
      statusIndicator: '++',
      porulScore: 95,
      uyirScore: 70,
      summaryTa: 'வாழ்நாளின் பொற்காலம். 6/8/12-ம் பாவத் தொடர்பு இருந்தாலும் பொருளாதார ஏற்றம் அமையும். சொத்துக்கள் மற்றும் வாகன சேர்க்கை உண்டாகும்.',
      summaryEn: 'Golden financial window. High wealth generation and real estate acquisitions materialize.',
    },
    {
      ageRange: 'Age 47 - 53 Y',
      titleTa: 'பொருளாதார விழிப்புணர்வு & திருப்புமுனை (Financial Caution Phase)',
      titleEn: 'Financial Caution & Transition',
      statusIndicator: '-',
      porulScore: 55,
      uyirScore: 80,
      summaryTa: '47 வயதிற்குமேல் "பொருளாதாரத்தில் கவனம் தேவை" என்ற விதி செயல்படும். புதிய கடன் வாங்குவது அல்லது ஜாமீன் கையெழுத்திடுவதைத் தவிர்க்க வேண்டும்.',
      summaryEn: 'Crucial transition milestone. Requires high caution regarding loans, guarantees, and speculative outlays.',
      keyWarningTa: '6/8/12-ம் பாவாதிபதிகளின் திசைகளில் கடன்கள் வாங்க வேண்டாம்.',
      keyWarningEn: 'Refrain from taking unnecessary loans during 6/8/12 Dasa periods.',
    },
    {
      ageRange: 'Age 53 - 60+ Y',
      titleTa: 'பூரண கர்ம நிறைவு & ஆன்மீக அமைதி (Spiritual & Health Focus)',
      titleEn: 'Karma Loop Completion & Spiritual Peace',
      statusIndicator: '--',
      porulScore: 45,
      uyirScore: 90,
      summaryTa: '60 வயது பூர்த்தி நோக்கி செல்லும் காலம். பொருள்காரகத் தேடல்கள் குறைந்து உயிர்காரக அமைதி, குடும்ப நலம் மற்றும் ஆன்மீகப் தொண்டில் மனம் நாடும்.',
      summaryEn: 'Completes the 60-year karma loop. Focus shifts gracefully from monetary competition to health and spiritual tranquility.',
    },
  ];

  // 7. Key Guidance & Remedies
  const keyAdviceTa = [
    `லக்னம்: ${lagnaNameTa} - உயிர்காரக கிரகங்கள் (${config.uyirPlanets
      .map((p) => PLANET_TAMIL_NAMES[p])
      .join(', ')}) ஆரோக்கியம் மற்றும் வம்சவழியை நல்வழிப்படுத்தும்.`,
    `பொருளாதார கிரகங்கள் (${config.porulPlanets
      .map((p) => PLANET_TAMIL_NAMES[p])
      .join(', ')}) மூலம் தனச் சேர்க்கை உண்டாகும்.`,
    sixthHouseBadhaka.planetsIn6thHouse.length > 0
      ? `6-ம் பாவத்தில் கிரகங்கள் அமைந்துள்ளதால், கடன் வாங்குவதைக் குறைத்து சுபச் செலவுகள் செய்வது கடன் தோஷத்தை நீக்கும்.`
      : `6-ம் பாவ தூய்மையால் நிதி ஸ்திரத்தன்மை சிறப்பாக இருக்கும்.`,
    is9thLordIn6th
      ? `தந்தையின் தொழில் அல்லது ஆரோக்கியத்தில் கவனம் செலுத்த வேண்டும்.`
      : `தந்தைவழி ஆதரவு சுபமாக அமையும்.`,
  ];

  const keyAdviceEn = [
    `Lagna: ${lagnaNameEn} - Uyir Planets (${config.uyirPlanets.join(
      ', '
    )}) safeguard health and lineage purity.`,
    `Porul Planets (${config.porulPlanets.join(
      ', '
    )}) govern business wealth and professional elevation.`,
    sixthHouseBadhaka.planetsIn6thHouse.length > 0
      ? `Planets in 6th house urge strict containment of unwanted debts to prevent wealth erosion.`
      : `Clean 6th house promotes smooth financial management.`,
    is9thLordIn6th
      ? `Father's health and business investments require careful oversight.`
      : `Paternal blessings support overall growth.`,
  ];

  const specialRemediesTa = [
    '6-ம் பாவ கடன்/எதிரி தோஷம் விலக பிரதோஷ நாளில் ஸ்ரீ சுப்பிரமணியர் அல்லது ஸ்ரீ வராஹி அம்மனுக்கு பஞ்ச தீபம் ஏற்றி வழிபடவும்.',
    'உயிர்காரக பலம் பெற தினமும் காலையில் சூரிய நமஸ்காரம் செய்து காயத்ரி மந்திரம் ஜபிக்கவும்.',
    'தந்தைவழி ஆசி பெற ஏழை எளியோருக்கு அன்னதானம் அல்லது ஆடை தானம் வழங்கவும்.',
  ];

  const specialRemediesEn = [
    'Light ghee lamps for Lord Murugan or Goddess Varahi on Pradosham days to alleviate 6th house debt traps.',
    'Perform morning Surya Namaskar and chant Gayatri Mantra to boost Uyir vitality.',
    'Offer Annadhanam (food donation) to secure fatherly grace and Pitru ancestral blessings.',
  ];

  return {
    lagnaNameTa,
    lagnaNameEn,
    uyirPlanets: uyirPlanetsList,
    porulPlanets: porulPlanetsList,
    sixthHouseBadhaka,
    solsticeAyana,
    agePhases,
    keyAdviceTa,
    keyAdviceEn,
    specialRemediesTa,
    specialRemediesEn,
  };
}
