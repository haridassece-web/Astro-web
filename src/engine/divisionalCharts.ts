import type { PlanetPosition, DivisionalChart, ChartHouse } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/constants';

function buildHouses(divisionalLagnaSignId: number, divisionalPlanets: PlanetPosition[]): ChartHouse[] {
  const houses: ChartHouse[] = [];

  for (let i = 0; i < 12; i++) {
    const signId = (divisionalLagnaSignId + i) % 12;
    const sign = ZODIAC_SIGNS[signId];
    const houseNum = i + 1;

    const planetsInHouse = divisionalPlanets.filter((p) => p.signId === signId);

    houses.push({
      houseNum,
      signId,
      signNameEn: sign.nameEn,
      signNameTa: sign.nameTa,
      planets: planetsInHouse,
    });
  }

  return houses;
}

export function computeD1Chart(planets: PlanetPosition[], lagnaSignId: number): DivisionalChart {
  return {
    id: 'D1',
    titleEn: 'D1 - Rasi Chart (Primary Natal)',
    titleTa: 'D1 - ராசி சக்கரம் (முதன்மை)',
    houses: buildHouses(lagnaSignId, planets),
  };
}

export function computeD9Chart(planets: PlanetPosition[]): DivisionalChart {
  const d9Planets: PlanetPosition[] = planets.map((p) => {
    const totalLong = p.longitude;
    const rasiIndex = Math.floor(totalLong / 30);
    
    const elementStart: Record<number, number> = {
      0: 0, 4: 0, 8: 0,
      1: 9, 5: 9, 9: 9,
      2: 6, 6: 6, 10: 6,
      3: 3, 7: 3, 11: 3,
    };
    const startSign = elementStart[rasiIndex];
    const posInSign = Math.floor((totalLong % 30) / (30 / 9));
    const d9SignId = (startSign + posInSign) % 12;
    const sign = ZODIAC_SIGNS[d9SignId];

    return {
      ...p,
      signId: d9SignId,
      signNameEn: sign.nameEn,
      signNameTa: sign.nameTa,
      signDegree: (totalLong % (30 / 9)) * 9,
    };
  });

  const lagnaPlanet = planets.find((p) => p.name === 'Lagna')!;
  const lagnaLong = lagnaPlanet.longitude;
  const lagnaRasi = Math.floor(lagnaLong / 30);
  const elementStart: Record<number, number> = { 0: 0, 4: 0, 8: 0, 1: 9, 5: 9, 9: 9, 2: 6, 6: 6, 10: 6, 3: 3, 7: 3, 11: 3 };
  const d9LagnaSignId = (elementStart[lagnaRasi] + Math.floor((lagnaLong % 30) / (30 / 9))) % 12;

  return {
    id: 'D9',
    titleEn: 'D9 - Navamsa Chart (Marriage & Destiny)',
    titleTa: 'D9 - நவாம்ச சக்கரம் (திருமணம் & தர்மம்)',
    houses: buildHouses(d9LagnaSignId, d9Planets),
  };
}

export function computeD10Chart(planets: PlanetPosition[]): DivisionalChart {
  const d10Planets: PlanetPosition[] = planets.map((p) => {
    const long = p.longitude;
    const rasiIndex = Math.floor(long / 30);
    const posInSign = Math.floor((long % 30) / 3);
    const isOdd = rasiIndex % 2 === 0;

    const startSign = isOdd ? rasiIndex : (rasiIndex + 9) % 12;
    const d10SignId = (startSign + posInSign) % 12;
    const sign = ZODIAC_SIGNS[d10SignId];

    return {
      ...p,
      signId: d10SignId,
      signNameEn: sign.nameEn,
      signNameTa: sign.nameTa,
    };
  });

  const lagnaLong = planets.find((p) => p.name === 'Lagna')!.longitude;
  const lagnaRasi = Math.floor(lagnaLong / 30);
  const isOddLagna = lagnaRasi % 2 === 0;
  const startSignLagna = isOddLagna ? lagnaRasi : (lagnaRasi + 9) % 12;
  const d10LagnaSignId = (startSignLagna + Math.floor((lagnaLong % 30) / 3)) % 12;

  return {
    id: 'D10',
    titleEn: 'D10 - Dasamsa Chart (Career & Status)',
    titleTa: 'D10 - தசாம்ச சக்கரம் (தொழில் & அந்தஸ்து)',
    houses: buildHouses(d10LagnaSignId, d10Planets),
  };
}

export function computeD7Chart(planets: PlanetPosition[]): DivisionalChart {
  const d7Planets: PlanetPosition[] = planets.map((p) => {
    const long = p.longitude;
    const rasiIndex = Math.floor(long / 30);
    const posInSign = Math.floor((long % 30) / (30 / 7));
    const isOdd = rasiIndex % 2 === 0;

    const startSign = isOdd ? rasiIndex : (rasiIndex + 6) % 12;
    const d7SignId = (startSign + posInSign) % 12;
    const sign = ZODIAC_SIGNS[d7SignId];

    return { ...p, signId: d7SignId, signNameEn: sign.nameEn, signNameTa: sign.nameTa };
  });

  const lagnaLong = planets.find((p) => p.name === 'Lagna')!.longitude;
  const lagnaRasi = Math.floor(lagnaLong / 30);
  const isOddLagna = lagnaRasi % 2 === 0;
  const startLagna = isOddLagna ? lagnaRasi : (lagnaRasi + 6) % 12;
  const d7LagnaSignId = (startLagna + Math.floor((lagnaLong % 30) / (30 / 7))) % 12;

  return {
    id: 'D7',
    titleEn: 'D7 - Saptamsa Chart (Children & Lineage)',
    titleTa: 'D7 - சப்தாம்ச சக்கரம் (குழந்தைகள் & வம்சம்)',
    houses: buildHouses(d7LagnaSignId, d7Planets),
  };
}

export function computeD12Chart(planets: PlanetPosition[]): DivisionalChart {
  const d12Planets: PlanetPosition[] = planets.map((p) => {
    const long = p.longitude;
    const rasiIndex = Math.floor(long / 30);
    const posInSign = Math.floor((long % 30) / 2.5);
    const d12SignId = (rasiIndex + posInSign) % 12;
    const sign = ZODIAC_SIGNS[d12SignId];

    return { ...p, signId: d12SignId, signNameEn: sign.nameEn, signNameTa: sign.nameTa };
  });

  const lagnaLong = planets.find((p) => p.name === 'Lagna')!.longitude;
  const lagnaRasi = Math.floor(lagnaLong / 30);
  const d12LagnaSignId = (lagnaRasi + Math.floor((lagnaLong % 30) / 2.5)) % 12;

  return {
    id: 'D12',
    titleEn: 'D12 - Dwadasamsa Chart (Parents & Ancestral Karma)',
    titleTa: 'D12 - துவாடசாம்ச சக்கரம் (பெற்றோர்கள் & முன்னோர்கள்)',
    houses: buildHouses(d12LagnaSignId, d12Planets),
  };
}

export function computeD60Chart(planets: PlanetPosition[]): DivisionalChart {
  const d60Planets: PlanetPosition[] = planets.map((p) => {
    const long = p.longitude;
    const rasiIndex = Math.floor(long / 30);
    const posInSign = Math.floor((long % 30) / 0.5);
    const d60SignId = (rasiIndex + posInSign) % 12;
    const sign = ZODIAC_SIGNS[d60SignId];

    return { ...p, signId: d60SignId, signNameEn: sign.nameEn, signNameTa: sign.nameTa };
  });

  const lagnaLong = planets.find((p) => p.name === 'Lagna')!.longitude;
  const lagnaRasi = Math.floor(lagnaLong / 30);
  const d60LagnaSignId = (lagnaRasi + Math.floor((lagnaLong % 30) / 0.5)) % 12;

  return {
    id: 'D60',
    titleEn: 'D60 - Shashtiamsa Chart (Past Karma & Fine Tuning)',
    titleTa: 'D60 - ஷஷ்டியாம்ச சக்கரம் (பூர்வ புண்ணியம்)',
    houses: buildHouses(d60LagnaSignId, d60Planets),
  };
}

export function computeAllDivisionalCharts(planets: PlanetPosition[], lagnaSignId: number): Record<string, DivisionalChart> {
  return {
    D1: computeD1Chart(planets, lagnaSignId),
    D9: computeD9Chart(planets),
    D10: computeD10Chart(planets),
    D7: computeD7Chart(planets),
    D12: computeD12Chart(planets),
    D60: computeD60Chart(planets),
  };
}
