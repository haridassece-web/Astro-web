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

  // Find starting Andhraman (active at birthDate)
  const startingAndhramanObj = startingPuthiObj.pratyantarDasas?.find(
    (a) => new Date(a.startDate) <= birthDate && new Date(a.endDate) >= birthDate
  ) || startingPuthiObj.pratyantarDasas?.[0];

  // Find starting Suzisam (active at birthDate)
  const startingSuzisamObj = startingAndhramanObj?.sookshmaDasas?.find(
    (sz) => new Date(sz.startDate) <= birthDate && new Date(sz.endDate) >= birthDate
  ) || startingAndhramanObj?.sookshmaDasas?.[0];

  const startingDasaInfo: StartingDasaInfo = {
    mahadasa: birthDasaPlanetObj.planet,
    mahadasaTa: PLANET_TA[birthDasaPlanetObj.planet],
    puthi: startingPuthiObj.planet,
    puthiTa: PLANET_TA[startingPuthiObj.planet],
    andhraman: startingAndhramanObj?.planet,
    andhramanTa: startingAndhramanObj ? PLANET_TA[startingAndhramanObj.planet] : undefined,
    suzisam: startingSuzisamObj?.planet,
    suzisamTa: startingSuzisamObj ? PLANET_TA[startingSuzisamObj.planet] : undefined,
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
    pratyantara: startingAndhramanObj?.planet || 'Sun',
    pratyantaraTa: startingAndhramanObj ? PLANET_TA[startingAndhramanObj.planet] : 'சூரியன்',
    andhraman: startingAndhramanObj?.planet || 'Sun',
    andhramanTa: startingAndhramanObj ? PLANET_TA[startingAndhramanObj.planet] : 'சூரியன்',
    andhramanStartDate: startingAndhramanObj?.startDate || startingPuthiObj.startDate,
    andhramanEndDate: startingAndhramanObj?.endDate || startingPuthiObj.endDate,
    daysRemainingInAndhraman: 0,
    suzisam: startingSuzisamObj?.planet || 'Sun',
    suzisamTa: startingSuzisamObj ? PLANET_TA[startingSuzisamObj.planet] : 'சூரியன்',
    suzisamStartDate: startingSuzisamObj?.startDate || startingPuthiObj.startDate,
    suzisamEndDate: startingSuzisamObj?.endDate || startingPuthiObj.endDate,
    daysRemainingInSuzisam: 0,
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
    const subDasasBase = generateAntardasas(
      planetInfo.planet,
      i === 0 ? virtualMahadasaStartDate : currentDate,
      actualTotalYears
    );

    const subDasas: DasaPeriod[] = subDasasBase
      .filter((sub) => new Date(sub.endDate) >= birthDate)
      .map((sub) => {
        const subS = new Date(sub.startDate);
        const subE = new Date(sub.endDate);
        const isSubCurrent = now >= subS && now <= subE;
        const isSubFuture = now < subS;

        // Propagate current / starting status down to Andhraman and Suzisam
        const pratyantaras = sub.pratyantarDasas?.map((andhra) => {
          const aS = new Date(andhra.startDate);
          const aE = new Date(andhra.endDate);
          const isAndhraCurrent = now >= aS && now <= aE;
          const isAndhraBirth = aS <= birthDate && aE >= birthDate;
          const isAndhraFuture = now < aS;

          const suzisams = andhra.sookshmaDasas?.map((suz) => {
            const szS = new Date(suz.startDate);
            const szE = new Date(suz.endDate);
            const isSuzCurrent = now >= szS && now <= szE;
            const isSuzBirth = szS <= birthDate && szE >= birthDate;
            const isSuzFuture = now < szS;

            return {
              ...suz,
              isCurrent: isSuzCurrent,
              isStartingAtBirth: isSuzBirth,
              isFuture: isSuzFuture,
              level: 'suzisam' as const,
            };
          });

          return {
            ...andhra,
            isCurrent: isAndhraCurrent,
            isStartingAtBirth: isAndhraBirth,
            isFuture: isAndhraFuture,
            level: 'andhraman' as const,
            sookshmaDasas: suzisams,
          };
        }) || [];

        if (isSubCurrent) {
          const totalMs = Math.max(1, subE.getTime() - subS.getTime());
          const elapsedMs = now.getTime() - subS.getTime();
          const prog = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
          const remDays = Math.max(0, Math.ceil((subE.getTime() - now.getTime()) / (1000 * 3600 * 24)));

          const activeAndhraman = pratyantaras.find((p) => p.isCurrent) || pratyantaras[0];
          const activeSuzisam = activeAndhraman?.sookshmaDasas?.find((sz) => sz.isCurrent) || activeAndhraman?.sookshmaDasas?.[0];

          const remDaysAndhra = activeAndhraman
            ? Math.max(0, Math.ceil((new Date(activeAndhraman.endDate).getTime() - now.getTime()) / (1000 * 3600 * 24)))
            : 0;

          const remDaysSuzisam = activeSuzisam
            ? Math.max(0, Math.ceil((new Date(activeSuzisam.endDate).getTime() - now.getTime()) / (1000 * 3600 * 24)))
            : 0;

          presentDasaInfo = {
            mahadasa: planetInfo.planet,
            mahadasaTa: PLANET_TA[planetInfo.planet],
            puthi: sub.planet,
            puthiTa: PLANET_TA[sub.planet],
            pratyantara: activeAndhraman?.planet || 'Sun',
            pratyantaraTa: activeAndhraman ? PLANET_TA[activeAndhraman.planet] : 'சூரியன்',
            andhraman: activeAndhraman?.planet || 'Sun',
            andhramanTa: activeAndhraman ? PLANET_TA[activeAndhraman.planet] : 'சூரியன்',
            andhramanStartDate: activeAndhraman?.startDate || sub.startDate,
            andhramanEndDate: activeAndhraman?.endDate || sub.endDate,
            daysRemainingInAndhraman: remDaysAndhra,
            suzisam: activeSuzisam?.planet,
            suzisamTa: activeSuzisam ? PLANET_TA[activeSuzisam.planet] : undefined,
            suzisamStartDate: activeSuzisam?.startDate,
            suzisamEndDate: activeSuzisam?.endDate,
            daysRemainingInSuzisam: remDaysSuzisam,
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
          level: 'puthi' as const,
          pratyantarDasas: pratyantaras,
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
      durationDays: Math.round(duration * 365.25),
      isCurrent,
      isStartingAtBirth,
      isFuture,
      level: 'dasa',
      subDasas,
    });

    currentDate = nextDate;
    idx = (idx + 1) % 9;
  }

  return { dasaPeriods, startingDasaInfo, presentDasaInfo };
}

/**
 * Generates Level 2: Antardasas / Puthis (9 per Mahadasa)
 */
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

    // Generate Level 3: Andhramans (Antharam / Pratyantardasas)
    const pratyantaras = generatePratyantardasas(subPlanetObj.planet, curDate, antardasaYears);

    subDasas.push({
      planet: subPlanetObj.planet,
      planetTa: PLANET_TA[subPlanetObj.planet],
      startDate: sDate,
      endDate: eDate,
      durationYears: Number(antardasaYears.toFixed(3)),
      durationDays: Math.round(antardasaYears * 365.25),
      isCurrent,
      isFuture,
      level: 'puthi',
      pratyantarDasas: pratyantaras,
    });

    curDate = eDateObj;
  }

  return subDasas;
}

/**
 * Generates Level 3: Andhramans / Antharam / Pratyantardasas (9 per Puthi)
 */
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

    // Generate Level 4: Suzisams (Sookshma Dasas)
    const suzisams = generateSookshmaDasas(pratPlanetObj.planet, curDate, pratYears);

    pratyantaras.push({
      planet: pratPlanetObj.planet,
      planetTa: PLANET_TA[pratPlanetObj.planet],
      startDate: sDate,
      endDate: eDate,
      durationYears: Number(pratYears.toFixed(4)),
      durationDays: Math.round(pratYears * 365.25),
      isCurrent,
      isFuture,
      level: 'andhraman',
      sookshmaDasas: suzisams,
    });

    curDate = eDateObj;
  }

  return pratyantaras;
}

/**
 * Generates Level 4: Suzisams / Sookshma Dasas (9 per Andhraman)
 */
function generateSookshmaDasas(andhraPlanet: PlanetName, startDate: Date, andhraYears: number): DasaPeriod[] {
  const suzisams: DasaPeriod[] = [];
  const startIdx = VIMSHOTTARI_YEARS.findIndex((v) => v.planet === andhraPlanet);

  let curDate = new Date(startDate);
  const now = new Date();

  for (let i = 0; i < 9; i++) {
    const suzPlanetObj = VIMSHOTTARI_YEARS[(startIdx + i) % 9];
    const suzYears = (andhraYears * suzPlanetObj.years) / 120;

    const sDate = formatDate(curDate);
    const eDateObj = addYears(curDate, suzYears);
    const eDate = formatDate(eDateObj);
    const isCurrent = now >= curDate && now <= eDateObj;
    const isFuture = now < curDate;

    const daysFloat = suzYears * 365.25;
    const daysFormatted = daysFloat >= 1 ? Number(daysFloat.toFixed(1)) : Number(daysFloat.toFixed(2));

    suzisams.push({
      planet: suzPlanetObj.planet,
      planetTa: PLANET_TA[suzPlanetObj.planet],
      startDate: sDate,
      endDate: eDate,
      durationYears: Number(suzYears.toFixed(5)),
      durationDays: daysFormatted,
      isCurrent,
      isFuture,
      level: 'suzisam',
    });

    curDate = eDateObj;
  }

  return suzisams;
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
