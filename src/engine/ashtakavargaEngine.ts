import type {
  PlanetPosition,
  PlanetAshtakavargaData,
  RasiPindamItem,
  GrahaPindamItem,
  AshtakavargaReport,
} from '../types/astrology';

export const RASI_INFO = [
  { en: 'Aries', ta: 'மேஷம்', gunakaram: 7 },
  { en: 'Taurus', ta: 'ரிஷபம்', gunakaram: 10 },
  { en: 'Gemini', ta: 'மிதுனம்', gunakaram: 8 },
  { en: 'Cancer', ta: 'கடகம்', gunakaram: 4 },
  { en: 'Leo', ta: 'சிம்மம்', gunakaram: 10 },
  { en: 'Virgo', ta: 'கன்னி', gunakaram: 5 },
  { en: 'Libra', ta: 'துலாம்', gunakaram: 7 },
  { en: 'Scorpio', ta: 'விருச்சிகம்', gunakaram: 8 },
  { en: 'Sagittarius', ta: 'தனுசு', gunakaram: 9 },
  { en: 'Capricorn', ta: 'மகரம்', gunakaram: 5 },
  { en: 'Aquarius', ta: 'கும்பம்', gunakaram: 11 },
  { en: 'Pisces', ta: 'மீனம்', gunakaram: 12 },
];

export const GRAHA_GUNAKARAMS: { [planet: string]: { en: string; ta: string; gunakaram: number } } = {
  Sun: { en: 'Sun', ta: 'சூரியன்', gunakaram: 5 },
  Moon: { en: 'Moon', ta: 'சந்திரன்', gunakaram: 5 },
  Mars: { en: 'Mars', ta: 'செவ்வாய்', gunakaram: 8 },
  Mercury: { en: 'Mercury', ta: 'புதன்', gunakaram: 5 },
  Jupiter: { en: 'Jupiter', ta: 'குரு', gunakaram: 10 },
  Venus: { en: 'Venus', ta: 'சுக்கிரன்', gunakaram: 7 },
  Saturn: { en: 'Saturn', ta: 'சனி', gunakaram: 5 },
};

// Classical BPHS Benefic Houses Table from 7 Planets + Lagna (1 to 12)
const BAV_RULES: { [planet: string]: { [contributor: string]: number[] } } = {
  Sun: {
    Sun: [1, 2, 4, 7, 8, 9, 10, 11],
    Moon: [3, 6, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [3, 5, 6, 9, 10, 11, 12],
    Jupiter: [5, 6, 9, 11],
    Venus: [6, 7, 12],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Lagna: [3, 4, 6, 10, 11, 12],
  },
  Moon: {
    Sun: [3, 6, 7, 8, 10, 11],
    Moon: [1, 3, 6, 7, 10, 11],
    Mars: [2, 3, 5, 6, 9, 10, 11],
    Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    Jupiter: [1, 4, 7, 8, 10, 11, 12],
    Venus: [3, 4, 5, 7, 9, 10, 11],
    Saturn: [3, 5, 6, 11],
    Lagna: [3, 6, 10, 11],
  },
  Mars: {
    Sun: [3, 5, 6, 10, 11],
    Moon: [3, 6, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [3, 5, 6, 11],
    Jupiter: [6, 10, 11, 12],
    Venus: [6, 8, 11, 12],
    Saturn: [1, 4, 7, 8, 9, 10, 11],
    Lagna: [1, 3, 6, 10, 11],
  },
  Mercury: {
    Sun: [5, 6, 9, 11, 12],
    Moon: [2, 4, 6, 8, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    Jupiter: [6, 8, 11, 12],
    Venus: [1, 2, 3, 4, 5, 8, 9, 11],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Lagna: [1, 2, 4, 6, 8, 10, 11],
  },
  Jupiter: {
    Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    Moon: [2, 5, 7, 9, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    Venus: [2, 5, 6, 9, 10, 11],
    Saturn: [3, 5, 6, 12],
    Lagna: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  Venus: {
    Sun: [8, 11, 12],
    Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    Mars: [3, 5, 6, 9, 11, 12],
    Mercury: [3, 5, 6, 9, 11],
    Jupiter: [5, 8, 9, 10, 11],
    Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    Saturn: [3, 4, 5, 8, 9, 10, 11],
    Lagna: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  Saturn: {
    Sun: [1, 2, 4, 7, 8, 10, 11],
    Moon: [3, 6, 11],
    Mars: [3, 5, 10, 11, 12],
    Mercury: [6, 8, 9, 10, 11, 12],
    Jupiter: [5, 6, 11, 12],
    Venus: [6, 11, 12],
    Saturn: [3, 5, 6, 11],
    Lagna: [1, 3, 4, 6, 10, 11],
  },
};

// 1. Calculate Raw Bhinnashtakavarga (BAV) for a given planet
export function calculateRawBAV(
  planetName: string,
  planets: PlanetPosition[],
  lagnaSignId: number
): number[] {
  const rawBindus = new Array(12).fill(0);
  const planetRules = BAV_RULES[planetName];
  if (!planetRules) return rawBindus;

  // Build a map of contributor positions
  const contributorSigns: { [c: string]: number } = {
    Lagna: lagnaSignId,
  };
  planets.forEach((p) => {
    contributorSigns[p.name] = p.signId;
  });

  for (let sign = 0; sign < 12; sign++) {
    let binduCount = 0;
    for (const [contrib, beneficHouses] of Object.entries(planetRules)) {
      const contribSign = contributorSigns[contrib];
      if (contribSign !== undefined) {
        const houseFromContrib = ((sign - contribSign + 12) % 12) + 1;
        if (beneficHouses.includes(houseFromContrib)) {
          binduCount++;
        }
      }
    }
    rawBindus[sign] = binduCount;
  }

  return rawBindus;
}

// 2. Trikona Shodhana (திரிகோண சோதனை)
export function calculateTrikonaShodhana(bindus: number[]): number[] {
  const result = [...bindus];
  const trikonas = [
    [0, 4, 8],   // Aries, Leo, Sagittarius
    [1, 5, 9],   // Taurus, Virgo, Capricorn
    [2, 6, 10],  // Gemini, Libra, Aquarius
    [3, 7, 11],  // Cancer, Scorpio, Pisces
  ];

  trikonas.forEach(([s1, s2, s3]) => {
    const minVal = Math.min(result[s1], result[s2], result[s3]);
    result[s1] -= minVal;
    result[s2] -= minVal;
    result[s3] -= minVal;
  });

  return result;
}

// 3. Ekadhipatya Shodhana (ஏகாதிபத்திய சோதனை)
export function calculateEkadhipatyaShodhana(
  trikonaBindus: number[],
  planets: PlanetPosition[]
): number[] {
  const result = [...trikonaBindus];

  // Signs occupied by any of the 7 planets
  const occupiedSigns = new Set<number>();
  const sevenPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  planets.forEach((p) => {
    if (sevenPlanets.includes(p.name)) {
      occupiedSigns.add(p.signId);
    }
  });

  // Pairs of signs ruled by common lord
  const pairs = [
    { name: 'Mars', signs: [0, 7] },       // Aries & Scorpio
    { name: 'Venus', signs: [1, 6] },      // Taurus & Libra
    { name: 'Mercury', signs: [2, 5] },    // Gemini & Virgo
    { name: 'Jupiter', signs: [8, 11] },   // Sagittarius & Pisces
    { name: 'Saturn', signs: [9, 10] },    // Capricorn & Aquarius
  ];

  pairs.forEach(({ signs: [s1, s2] }) => {
    const b1 = result[s1];
    const b2 = result[s2];
    const occ1 = occupiedSigns.has(s1);
    const occ2 = occupiedSigns.has(s2);

    if (b1 === 0 && b2 === 0) return;

    // Both occupied: No reduction
    if (occ1 && occ2) return;

    // Neither occupied
    if (!occ1 && !occ2) {
      if (b1 === b2) {
        result[s1] = 0;
        result[s2] = 0;
      } else if (b1 > b2) {
        if (b2 === 0) {
          result[s1] = 0;
        } else {
          result[s1] = b2; // Made equal to smaller
        }
      } else {
        if (b1 === 0) {
          result[s2] = 0;
        } else {
          result[s2] = b1; // Made equal to smaller
        }
      }
      return;
    }

    // One occupied, one unoccupied
    const occSign = occ1 ? s1 : s2;
    const unoccSign = occ1 ? s2 : s1;
    const bOcc = result[occSign];
    const bUnocc = result[unoccSign];

    if (bUnocc <= bOcc) {
      result[unoccSign] = 0;
    } else {
      result[unoccSign] = bOcc; // Reduce to occupied sign's bindus
    }
  });

  return result;
}

// 4. Calculate Rasi Pindam, Graha Pindam, and Sodhya Pindam
export function calculatePindams(
  shodhitaBindus: number[],
  planets: PlanetPosition[]
): {
  rasiPindamItems: RasiPindamItem[];
  rasiPindamTotal: number;
  grahaPindamItems: GrahaPindamItem[];
  grahaPindamTotal: number;
  sodhyaPindam: number;
} {
  // Rasi Pindam
  const rasiPindamItems: RasiPindamItem[] = RASI_INFO.map((info, signIdx) => {
    const b = shodhitaBindus[signIdx] || 0;
    const subtotal = b * info.gunakaram;
    return {
      signIndex: signIdx,
      signNameTa: info.ta,
      signNameEn: info.en,
      gunakaram: info.gunakaram,
      shodhitaBindus: b,
      subtotal,
    };
  });
  const rasiPindamTotal = rasiPindamItems.reduce((acc, item) => acc + item.subtotal, 0);

  // Graha Pindam
  const sevenPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const grahaPindamItems: GrahaPindamItem[] = [];

  sevenPlanets.forEach((pName) => {
    const planet = planets.find((p) => p.name === pName);
    const signIdx = planet ? planet.signId : 0;
    const signInfo = RASI_INFO[signIdx] || RASI_INFO[0];
    const gunakaramInfo = GRAHA_GUNAKARAMS[pName] || { en: pName, ta: pName, gunakaram: 5 };

    const b = shodhitaBindus[signIdx] || 0;
    const subtotal = b * gunakaramInfo.gunakaram;

    grahaPindamItems.push({
      planetNameEn: gunakaramInfo.en,
      planetNameTa: gunakaramInfo.ta,
      occupiedSignIndex: signIdx,
      occupiedSignTa: signInfo.ta,
      occupiedSignEn: signInfo.en,
      gunakaram: gunakaramInfo.gunakaram,
      shodhitaBindus: b,
      subtotal,
    });
  });

  const grahaPindamTotal = grahaPindamItems.reduce((acc, item) => acc + item.subtotal, 0);
  const sodhyaPindam = rasiPindamTotal + grahaPindamTotal;

  return {
    rasiPindamItems,
    rasiPindamTotal,
    grahaPindamItems,
    grahaPindamTotal,
    sodhyaPindam,
  };
}

// 5. Master Ashtakavarga Report Generator
export function calculateAshtakavargaReport(
  planets: PlanetPosition[],
  lagnaSignId: number
): AshtakavargaReport {
  const sevenPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const planetsData: { [planetName: string]: PlanetAshtakavargaData } = {};
  const sarvashtakavarga = new Array(12).fill(0);

  sevenPlanets.forEach((pName) => {
    const rawBindus = calculateRawBAV(pName, planets, lagnaSignId);
    const rawTotal = rawBindus.reduce((a, b) => a + b, 0);

    // Accumulate into Sarvashtakavarga
    for (let i = 0; i < 12; i++) {
      sarvashtakavarga[i] += rawBindus[i];
    }

    const trikonaBindus = calculateTrikonaShodhana(rawBindus);
    const trikonaTotal = trikonaBindus.reduce((a, b) => a + b, 0);

    const ekadhipatyaBindus = calculateEkadhipatyaShodhana(trikonaBindus, planets);
    const ekadhipatyaTotal = ekadhipatyaBindus.reduce((a, b) => a + b, 0);

    const pindams = calculatePindams(ekadhipatyaBindus, planets);

    planetsData[pName] = {
      planetNameEn: GRAHA_GUNAKARAMS[pName]?.en || pName,
      planetNameTa: GRAHA_GUNAKARAMS[pName]?.ta || pName,
      rawBindus,
      rawTotal,
      trikonaBindus,
      trikonaTotal,
      ekadhipatyaBindus,
      ekadhipatyaTotal,
      rasiPindamItems: pindams.rasiPindamItems,
      rasiPindamTotal: pindams.rasiPindamTotal,
      grahaPindamItems: pindams.grahaPindamItems,
      grahaPindamTotal: pindams.grahaPindamTotal,
      sodhyaPindam: pindams.sodhyaPindam,
    };
  });

  const sarvashtakavargaTotal = sarvashtakavarga.reduce((a, b) => a + b, 0);

  return {
    planetsData,
    sarvashtakavarga,
    sarvashtakavargaTotal,
  };
}
