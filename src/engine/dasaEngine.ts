import type { DasaPeriod, PlanetName, PlanetPosition, StartingDasaInfo, PresentDasaInfo } from '../types/astrology';
import { VIMSHOTTARI_YEARS, PLANET_TA } from '../data/constants';

export interface VimshottariDasaResult {
  dasaPeriods: DasaPeriod[];
  startingDasaInfo: StartingDasaInfo;
  presentDasaInfo: PresentDasaInfo;
}

export function calculateVimshottariDasa(dob: string, planets: PlanetPosition[]): VimshottariDasaResult {
  const moon = planets.find((p) => p.name === 'Moon')!;
  const moonLong = moon.longitude;

  const nakshatraExact = moonLong / (360 / 27);
  const nakshatraIndex = Math.floor(nakshatraExact) % 27;
  const fractionSpent = nakshatraExact - nakshatraIndex;

  const lordIndex = nakshatraIndex % 9;
  const birthDasaPlanetObj = VIMSHOTTARI_YEARS[lordIndex];
  
  // Remaining duration of first Mahadasa at birth
  const balanceYears = birthDasaPlanetObj.years * (1 - fractionSpent);
  const elapsedYears = birthDasaPlanetObj.years * fractionSpent;

  const balanceYearsInt = Math.floor(balanceYears);
  const remMonthsFloat = (balanceYears - balanceYearsInt) * 12;
  const balanceMonthsInt = Math.floor(remMonthsFloat);
  const balanceDaysInt = Math.round((remMonthsFloat - balanceMonthsInt) * 30);

  const birthDate = new Date(dob);
  const now = new Date();

  // Virtual start date of birth Mahadasa
  const virtualMahadasaStartDate = subtractYears(birthDate, elapsedYears);

  // Generate 9 Puthis (Antardasas) for the birth Mahadasa starting from virtualMahadasaStartDate
  const birthMahadasaSubDasas = generateAntardasas(birthDasaPlanetObj.planet, virtualMahadasaStartDate, birthDasaPlanetObj.years);

  // Find starting Puthi (active at birthDate)
  const startingPuthiObj = birthMahadasaSubDasas.find(
    (s) => new Date(s.startDate) <= birthDate && new Date(s.endDate) >= birthDate
  ) || birthMahadasaSubDasas[0];

  const startingDasaInfo: StartingDasaInfo = {
    mahadasa: birthDasaPlanetObj.planet,
    mahadasaTa: PLANET_TA[birthDasaPlanetObj.planet],
    puthi: startingPuthiObj.planet,
    puthiTa: PLANET_TA[startingPuthiObj.planet],
    balanceYears: balanceYearsInt,
    balanceMonths: balanceMonthsInt,
    balanceDays: balanceDaysInt,
    startDate: formatDate(virtualMahadasaStartDate),
    endDate: formatDate(addYears(virtualMahadasaStartDate, birthDasaPlanetObj.years)),
  };

  const dasaPeriods: DasaPeriod[] = [];
  let currentDate = new Date(birthDate);

  let idx = lordIndex;
  let isFirst = true;

  let presentDasaInfo: PresentDasaInfo = {
    mahadasa: birthDasaPlanetObj.planet,
    mahadasaTa: PLANET_TA[birthDasaPlanetObj.planet],
    puthi: startingPuthiObj.planet,
    puthiTa: PLANET_TA[startingPuthiObj.planet],
    pratyantara: 'Sun',
    pratyantaraTa: 'சூரியன்',
    startDate: formatDate(birthDate),
    endDate: formatDate(addYears(birthDate, balanceYears)),
    puthiStartDate: startingPuthiObj.startDate,
    puthiEndDate: startingPuthiObj.endDate,
    daysRemainingInPuthi: 0,
    progressPercent: 100,
  };

  for (let i = 0; i < 9; i++) {
    const planetInfo = VIMSHOTTARI_YEARS[idx];
    const duration = isFirst ? balanceYears : planetInfo.years;
    const actualTotalYears = planetInfo.years;
    const isStartingAtBirth = isFirst;
    isFirst = false;

    const startDateStr = formatDate(currentDate);
    const nextDate = addYears(currentDate, duration);
    const endDateStr = formatDate(nextDate);

    const isCurrent = now >= currentDate && now <= nextDate;
    const isFuture = now < currentDate;

    // Generate subDasas (Puthis) for this Mahadasa
    const subDasasBase = generateAntardasas(planetInfo.planet, i === 0 ? virtualMahadasaStartDate : currentDate, actualTotalYears);

    const subDasas: DasaPeriod[] = subDasasBase
      .filter((sub) => new Date(sub.endDate) >= birthDate)
      .map((sub) => {
        const subS = new Date(sub.startDate);
        const subE = new Date(sub.endDate);
        const isSubCurrent = now >= subS && now <= subE;
        const isSubFuture = now < subS;

        if (isSubCurrent) {
          const totalMs = Math.max(1, subE.getTime() - subS.getTime());
          const elapsedMs = now.getTime() - subS.getTime();
          const prog = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
          const remDays = Math.max(0, Math.ceil((subE.getTime() - now.getTime()) / (1000 * 3600 * 24)));

          const pratyantaras = generatePratyantardasas(sub.planet, subS, sub.durationYears);
          const activePratyantara = pratyantaras.find((p) => p.isCurrent) || pratyantaras[0];

          presentDasaInfo = {
            mahadasa: planetInfo.planet,
            mahadasaTa: PLANET_TA[planetInfo.planet],
            puthi: sub.planet,
            puthiTa: PLANET_TA[sub.planet],
            pratyantara: activePratyantara.planet,
            pratyantaraTa: PLANET_TA[activePratyantara.planet],
            startDate: startDateStr,
            endDate: endDateStr,
            puthiStartDate: sub.startDate,
            puthiEndDate: sub.endDate,
            daysRemainingInPuthi: remDays,
            progressPercent: Number(prog.toFixed(1)),
          };
        }

        return {
          ...sub,
          isCurrent: isSubCurrent,
          isFuture: isSubFuture,
          isStartingAtBirth: new Date(sub.startDate) <= birthDate && new Date(sub.endDate) >= birthDate,
        };
      });

    dasaPeriods.push({
      planet: planetInfo.planet,
      planetTa: PLANET_TA[planetInfo.planet],
      startDate: startDateStr,
      endDate: endDateStr,
      startYear: currentDate.getFullYear(),
      endYear: nextDate.getFullYear(),
      durationYears: Number(duration.toFixed(2)),
      isCurrent,
      isStartingAtBirth,
      isFuture,
      subDasas,
    });

    currentDate = nextDate;
    idx = (idx + 1) % 9;
  }

  return { dasaPeriods, startingDasaInfo, presentDasaInfo };
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
    const isFuture = now < curDate;

    const pratyantaras = generatePratyantardasas(subPlanetObj.planet, curDate, antardasaYears);

    subDasas.push({
      planet: subPlanetObj.planet,
      planetTa: PLANET_TA[subPlanetObj.planet],
      startDate: sDate,
      endDate: eDate,
      durationYears: Number(antardasaYears.toFixed(2)),
      isCurrent,
      isFuture,
      pratyantarDasas: pratyantaras,
    });

    curDate = eDateObj;
  }

  return subDasas;
}

function generatePratyantardasas(puthiPlanet: PlanetName, startDate: Date, puthiYears: number): DasaPeriod[] {
  const pratyantaras: DasaPeriod[] = [];
  const startIdx = VIMSHOTTARI_YEARS.findIndex((v) => v.planet === puthiPlanet);

  let curDate = new Date(startDate);
  const now = new Date();

  for (let i = 0; i < 9; i++) {
    const pratPlanetObj = VIMSHOTTARI_YEARS[(startIdx + i) % 9];
    const pratYears = (puthiYears * pratPlanetObj.years) / 120;

    const sDate = formatDate(curDate);
    const eDateObj = addYears(curDate, pratYears);
    const eDate = formatDate(eDateObj);
    const isCurrent = now >= curDate && now <= eDateObj;
    const isFuture = now < curDate;

    pratyantaras.push({
      planet: pratPlanetObj.planet,
      planetTa: PLANET_TA[pratPlanetObj.planet],
      startDate: sDate,
      endDate: eDate,
      durationYears: Number(pratYears.toFixed(3)),
      isCurrent,
      isFuture,
    });

    curDate = eDateObj;
  }

  return pratyantaras;
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

function subtractYears(date: Date, years: number): Date {
  const result = new Date(date);
  const msToSub = years * 365.25 * 24 * 60 * 60 * 1000;
  result.setTime(result.getTime() - msToSub);
  return result;
}
