import type { DasaPeriod, PlanetName, PlanetPosition } from '../types/astrology';
import { VIMSHOTTARI_YEARS, PLANET_TA } from '../data/constants';

export function calculateVimshottariDasa(dob: string, planets: PlanetPosition[]): DasaPeriod[] {
  const moon = planets.find((p) => p.name === 'Moon')!;
  const moonLong = moon.longitude;

  const nakshatraExact = moonLong / (360 / 27);
  const nakshatraIndex = Math.floor(nakshatraExact) % 27;
  const fractionSpent = nakshatraExact - nakshatraIndex;

  const lordIndex = nakshatraIndex % 9;
  const birthDasaPlanetObj = VIMSHOTTARI_YEARS[lordIndex];
  
  const balanceYears = birthDasaPlanetObj.years * (1 - fractionSpent);

  const birthDate = new Date(dob);
  const dasaPeriods: DasaPeriod[] = [];

  let currentDate = new Date(birthDate);

  let idx = lordIndex;
  let isFirst = true;

  for (let i = 0; i < 9; i++) {
    const planetInfo = VIMSHOTTARI_YEARS[idx];
    const duration = isFirst ? balanceYears : planetInfo.years;
    isFirst = false;

    const startDateStr = formatDate(currentDate);
    const nextDate = addYears(currentDate, duration);
    const endDateStr = formatDate(nextDate);

    const isCurrent = birthDate <= nextDate && new Date() >= currentDate && new Date() <= nextDate;

    const subDasas = generateAntardasas(planetInfo.planet, currentDate, duration);

    dasaPeriods.push({
      planet: planetInfo.planet,
      planetTa: PLANET_TA[planetInfo.planet],
      startDate: startDateStr,
      endDate: endDateStr,
      startYear: currentDate.getFullYear(),
      endYear: nextDate.getFullYear(),
      durationYears: Number(duration.toFixed(2)),
      isCurrent,
      subDasas,
    });

    currentDate = nextDate;
    idx = (idx + 1) % 9;
  }

  return dasaPeriods;
}

function generateAntardasas(mahadasaPlanet: PlanetName, startDate: Date, mahadasaYears: number): DasaPeriod[] {
  const subDasas: DasaPeriod[] = [];
  const startIdx = VIMSHOTTARI_YEARS.findIndex((v) => v.planet === mahadasaPlanet);

  let curDate = new Date(startDate);
  const now = new Date();

  for (let i = 0; i < 9; i++) {
    const subPlanetObj = VIMSHOTTARI_YEARS[(startIdx + i) % 9];
    const antardasaYears = (mahadasaYears * subPlanetObj.years) / 120;

    const sDate = formatDate(curDate);
    const eDateObj = addYears(curDate, antardasaYears);
    const eDate = formatDate(eDateObj);
    const isCurrent = now >= curDate && now <= eDateObj;

    subDasas.push({
      planet: subPlanetObj.planet,
      planetTa: PLANET_TA[subPlanetObj.planet],
      startDate: sDate,
      endDate: eDate,
      durationYears: Number(antardasaYears.toFixed(2)),
      isCurrent,
    });

    curDate = eDateObj;
  }

  return subDasas;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  const msToAdd = years * 365.25 * 24 * 60 * 60 * 1000;
  result.setTime(result.getTime() + msToAdd);
  return result;
}
