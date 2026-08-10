import type { BirthInput, PlanetPosition, PlanetName } from '../types/astrology';
import { ZODIAC_SIGNS, NAKSHATRAS, PLANET_TA } from '../data/constants';

// Helper: Normalize angle into [0, 360)
export function normalize360(deg: number): number {
  let val = deg % 360;
  if (val < 0) val += 360;
  return val;
}

const d2r = Math.PI / 180;
const r2d = 180 / Math.PI;

// Convert Date & UTC time to Julian Day (UT)
export function calculateJulianDay(dob: string, tob: string, timezone: number): number {
  const safeDob = (dob && dob.trim()) || '1992-04-14';
  const safeTob = (tob && tob.trim()) || '08:30:00';
  const safeTz = isNaN(timezone) || timezone === undefined ? 5.5 : timezone;

  const partsDob = safeDob.split('-').map(Number);
  const year = !isNaN(partsDob[0]) && partsDob[0] > 0 ? partsDob[0] : 1992;
  const month = !isNaN(partsDob[1]) && partsDob[1] >= 1 && partsDob[1] <= 12 ? partsDob[1] : 4;
  const day = !isNaN(partsDob[2]) && partsDob[2] >= 1 && partsDob[2] <= 31 ? partsDob[2] : 14;

  const partsTob = safeTob.split(':').map(Number);
  const hrs = !isNaN(partsTob[0]) && partsTob[0] >= 0 && partsTob[0] <= 23 ? partsTob[0] : 8;
  const mins = !isNaN(partsTob[1]) && partsTob[1] >= 0 && partsTob[1] <= 59 ? partsTob[1] : 30;
  const secs = !isNaN(partsTob[2]) && partsTob[2] >= 0 && partsTob[2] <= 59 ? partsTob[2] : 0;

  // Time in UTC hours
  const decimalHours = hrs + mins / 60 + secs / 3600 - safeTz;

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  const dayFraction = decimalHours / 24;
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + dayFraction + b - 1524.5;
  return jd;
}

// Calculate Lahiri Ayanamsa for Thirukkanitha System
export function calculateLahiriAyanamsa(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0; // Julian Centuries from J2000.0
  // Standard Thirukkanitha (Chitra Paksha / Lahiri Ayanamsa)
  const ayanamsa = 23.8530556 + 1.3969713 * t + 0.0003086 * t * t;
  return ayanamsa;
}

function computeRawTropicals(t: number) {
  const L0_Sun = normalize360(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
  const M_Sun = normalize360(357.52911 + 35999.05029 * t - 0.0001537 * t * t);
  const C_Sun =
    (1.914602 - 0.004817 * t) * Math.sin(M_Sun * d2r) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * M_Sun * d2r) +
    0.000289 * Math.sin(3 * M_Sun * d2r);
  const sunTropical = normalize360(L0_Sun + C_Sun);

  const R_Earth = 1.00014 - 0.01671 * Math.cos(M_Sun * d2r) - 0.00014 * Math.cos(2 * M_Sun * d2r);
  const L_Earth = normalize360(sunTropical + 180);

  const L_Moon = normalize360(218.3164477 + 481267.88123421 * t - 0.0015786 * t * t);
  const D_Moon = normalize360(297.8501921 + 445267.1114034 * t - 0.0018819 * t * t);
  const M_Moon = normalize360(134.9633964 + 477198.8675055 * t + 0.0087414 * t * t);
  const F_Moon = normalize360(93.272095 + 483202.0175233 * t - 0.0036539 * t * t);

  const moonPerturbations =
    6.288774 * Math.sin(M_Moon * d2r) +
    1.274027 * Math.sin((2 * D_Moon - M_Moon) * d2r) +
    0.658314 * Math.sin(2 * D_Moon * d2r) +
    0.213618 * Math.sin(2 * M_Moon * d2r) -
    0.185116 * Math.sin(M_Sun * d2r) -
    0.114332 * Math.sin(2 * F_Moon * d2r) +
    0.058793 * Math.sin((2 * D_Moon - 2 * M_Moon) * d2r) +
    0.057066 * Math.sin((2 * D_Moon - M_Sun - M_Moon) * d2r) +
    0.053322 * Math.sin((2 * D_Moon + M_Moon) * d2r) +
    0.045758 * Math.sin((2 * D_Moon - M_Sun) * d2r) -
    0.040923 * Math.sin((M_Sun - M_Moon) * d2r) -
    0.03472 * Math.sin(D_Moon * d2r) -
    0.030383 * Math.sin((M_Sun + M_Moon) * d2r);

  const moonTropical = normalize360(L_Moon + moonPerturbations);

  const L_Merc = normalize360(252.2509 + 149472.6747 * t);
  const M_Merc = normalize360(174.7948 + 149472.5153 * t);
  const l_Merc = normalize360(L_Merc + 23.44 * Math.sin(M_Merc * d2r) + 2.98 * Math.sin(2 * M_Merc * d2r));
  const r_Merc = 0.3871 - 0.0796 * Math.cos(M_Merc * d2r);
  const x_Merc = r_Merc * Math.cos(l_Merc * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Merc = r_Merc * Math.sin(l_Merc * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const mercuryTropical = normalize360(Math.atan2(y_Merc, x_Merc) * r2d);

  const L_Ven = normalize360(181.9798 + 58517.8156 * t);
  const M_Ven = normalize360(50.4082 + 58517.8039 * t);
  const l_Ven = normalize360(L_Ven + 0.7758 * Math.sin(M_Ven * d2r));
  const r_Ven = 0.7233 - 0.0049 * Math.cos(M_Ven * d2r);
  const x_Ven = r_Ven * Math.cos(l_Ven * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Ven = r_Ven * Math.sin(l_Ven * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const venusTropical = normalize360(Math.atan2(y_Ven, x_Ven) * r2d);

  const L_Mars = normalize360(355.433 + 19140.2993 * t);
  const M_Mars = normalize360(19.373 + 19140.2993 * t);
  const l_Mars = normalize360(L_Mars + 10.691 * Math.sin(M_Mars * d2r) + 0.623 * Math.sin(2 * M_Mars * d2r));
  const r_Mars = 1.52368 - 0.142 * Math.cos(M_Mars * d2r);
  const x_Mars = r_Mars * Math.cos(l_Mars * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Mars = r_Mars * Math.sin(l_Mars * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const marsTropical = normalize360(Math.atan2(y_Mars, x_Mars) * r2d);

  const L_Jup = normalize360(34.3515 + 3034.9057 * t);
  const M_Jup = normalize360(20.0202 + 3034.6057 * t);
  const l_Jup = normalize360(L_Jup + 5.555 * Math.sin(M_Jup * d2r) + 0.168 * Math.sin(2 * M_Jup * d2r));
  const r_Jup = 5.2026 - 0.252 * Math.cos(M_Jup * d2r);
  const x_Jup = r_Jup * Math.cos(l_Jup * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Jup = r_Jup * Math.sin(l_Jup * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const jupiterTropical = normalize360(Math.atan2(y_Jup, x_Jup) * r2d);

  const L_Sat = normalize360(50.0774 + 1222.1138 * t);
  const M_Sat = normalize360(317.0207 + 1221.5515 * t);
  const satInequality = 0.8 * Math.sin((2 * M_Jup - 5 * M_Sat - 67.6) * d2r);
  const l_Sat = normalize360(L_Sat + 6.358 * Math.sin(M_Sat * d2r) + 0.25 * Math.sin(2 * M_Sat * d2r) + satInequality);
  const r_Sat = 9.5549 - 0.531 * Math.cos(M_Sat * d2r);
  const x_Sat = r_Sat * Math.cos(l_Sat * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Sat = r_Sat * Math.sin(l_Sat * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const saturnTropical = normalize360(Math.atan2(y_Sat, x_Sat) * r2d);

  const rahuMean = normalize360(125.04452 - 1934.136261 * t + 0.0020708 * t * t);
  const rahuPerturb = -0.028 * Math.sin((2 * D_Moon - 2 * F_Moon) * d2r) - 0.0247 * Math.sin((2 * D_Moon - M_Sun - 2 * F_Moon) * d2r);
  const rahuTropical = normalize360(rahuMean + rahuPerturb);
  const ketuTropical = normalize360(rahuTropical + 180);

  return {
    Sun: sunTropical,
    Moon: moonTropical,
    Mars: marsTropical,
    Mercury: mercuryTropical,
    Jupiter: jupiterTropical,
    Venus: venusTropical,
    Saturn: saturnTropical,
    Rahu: rahuTropical,
    Ketu: ketuTropical,
  };
}

function normalize180(deg: number): number {
  let val = deg % 360;
  if (val > 180) val -= 360;
  if (val < -180) val += 360;
  return val;
}

// High Precision Thirukkanitha Planetary Calculation Engine
export function calculatePlanetaryPositions(
  birth: BirthInput,
  jd: number,
  ayanamsa: number
): { planets: PlanetPosition[]; lagnaSignId: number } {
  const t = (jd - 2451545.0) / 36525.0;
  const dt = 0.05 / 36525.0;
  const tNext = t + dt;

  const tropCurr = computeRawTropicals(t);
  const tropNext = computeRawTropicals(tNext);

  const siderealLongitudes: Record<PlanetName, number> = {
    Sun: normalize360(tropCurr.Sun - ayanamsa),
    Moon: normalize360(tropCurr.Moon - ayanamsa),
    Mars: normalize360(tropCurr.Mars - ayanamsa),
    Mercury: normalize360(tropCurr.Mercury - ayanamsa),
    Jupiter: normalize360(tropCurr.Jupiter - ayanamsa),
    Venus: normalize360(tropCurr.Venus - ayanamsa),
    Saturn: normalize360(tropCurr.Saturn - ayanamsa),
    Rahu: normalize360(tropCurr.Rahu - ayanamsa),
    Ketu: normalize360(tropCurr.Ketu - ayanamsa),
    Lagna: 0,
    Mandhi: 0,
  };

  const speeds: Record<PlanetName, number> = {
    Sun: Number((normalize180(tropNext.Sun - tropCurr.Sun) / 0.05).toFixed(4)),
    Moon: Number((normalize180(tropNext.Moon - tropCurr.Moon) / 0.05).toFixed(4)),
    Mars: Number((normalize180(tropNext.Mars - tropCurr.Mars) / 0.05).toFixed(4)),
    Mercury: Number((normalize180(tropNext.Mercury - tropCurr.Mercury) / 0.05).toFixed(4)),
    Jupiter: Number((normalize180(tropNext.Jupiter - tropCurr.Jupiter) / 0.05).toFixed(4)),
    Venus: Number((normalize180(tropNext.Venus - tropCurr.Venus) / 0.05).toFixed(4)),
    Saturn: Number((normalize180(tropNext.Saturn - tropCurr.Saturn) / 0.05).toFixed(4)),
    Rahu: Number((normalize180(tropNext.Rahu - tropCurr.Rahu) / 0.05).toFixed(4)),
    Ketu: Number((normalize180(tropNext.Ketu - tropCurr.Ketu) / 0.05).toFixed(4)),
    Lagna: 360 / 24,
    Mandhi: 0,
  };

  // 9. Ascendant (Lagna) Thirukkanitha Standard
  const safeLng = !isNaN(birth.lng) && birth.lng !== 0 ? birth.lng : 80.2707;
  const safeLat = !isNaN(birth.lat) && birth.lat !== 0 ? birth.lat : 13.0827;

  const gmst = normalize360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t);
  const lst = normalize360(gmst + safeLng);
  const eps = 23.439291 - 0.0130042 * t;

  const y_asc = Math.cos(lst * d2r);
  const x_asc = -Math.sin(lst * d2r) * Math.cos(eps * d2r) - Math.tan(safeLat * d2r) * Math.sin(eps * d2r);
  const ascDeg = normalize360(Math.atan2(y_asc, x_asc) * r2d);
  const siderealLagna = normalize360(ascDeg - ayanamsa);
  siderealLongitudes['Lagna'] = siderealLagna;

  // 10. Mandhi (Gulika) Longitude Calculation
  const siderealMandhi = calculateMandhiLongitude(birth, jd, ayanamsa, eps);
  siderealLongitudes['Mandhi'] = siderealMandhi;

  const lagnaSignId = Math.floor(siderealLagna / 30);

  const planetOrder: PlanetName[] = ['Lagna', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu', 'Mandhi'];

  const planets: PlanetPosition[] = planetOrder.map((name) => {
    const long = siderealLongitudes[name];
    const signId = Math.floor(long / 30);
    const sign = ZODIAC_SIGNS[signId];
    const signDegree = long % 30;

    const house = ((signId - lagnaSignId + 12) % 12) + 1;

    const nakshatraExact = long / (360 / 27);
    const nakshatraId = Math.floor(nakshatraExact) % 27;
    const nak = NAKSHATRAS[nakshatraId];
    const nakProgressInQuarter = (long % (360 / 27)) / (360 / 108);
    const pada = Math.floor(nakProgressInQuarter) + 1;

    const dignityInfo = getDignity(name, signId);

    // Speed < 0 means Retrograde (Vakram) for non-luminary planets
    const isRetro =
      name === 'Rahu' ||
      name === 'Ketu' ||
      (['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'].includes(name) && speeds[name] < 0);

    return {
      name,
      nameTa: PLANET_TA[name],
      longitude: long,
      signId,
      signNameEn: sign.nameEn,
      signNameTa: sign.nameTa,
      signDegree,
      house,
      nakshatraId,
      nakshatraEn: nak.nameEn,
      nakshatraTa: nak.nameTa,
      pada,
      lord: nak.lord,
      isRetrograde: isRetro,
      dignityEn: dignityInfo.en,
      dignityTa: dignityInfo.ta,
      speed: speeds[name],
    };
  });

  return { planets, lagnaSignId };
}

export function calculateSunriseSunset(
  jd: number,
  lat: number,
  lng: number,
  timezone: number
): { sunriseHrs: number; sunsetHrs: number } {
  const jd0 = Math.floor(jd - 0.5) + 0.5;
  const t0 = (jd0 - 2451545.0) / 36525.0;

  const M_Sun = normalize360(357.52911 + 35999.05029 * t0);
  const L0_Sun = normalize360(280.46646 + 36000.76983 * t0);
  const C_Sun = (1.914602 - 0.004817 * t0) * Math.sin(M_Sun * d2r) + 0.019993 * Math.sin(2 * M_Sun * d2r);
  const sunGeocentric = normalize360(L0_Sun + C_Sun);

  const epsRad = (23.439291 - 0.0130042 * t0) * d2r;

  const sinL = Math.sin(sunGeocentric * d2r);
  const cosL = Math.cos(sunGeocentric * d2r);
  const ra = normalize360(Math.atan2(Math.cos(epsRad) * sinL, cosL) * r2d);
  const dec = Math.asin(Math.sin(epsRad) * sinL);

  let eot = (L0_Sun - ra) / 15.0;
  if (eot > 12) eot -= 24;
  if (eot < -12) eot += 24;

  const solarNoonLocal = 12.0 - lng / 15.0 + timezone - eot;

  const latRad = lat * d2r;
  const cosH0 = (Math.sin(-0.8333 * d2r) - Math.sin(latRad) * Math.sin(dec)) / (Math.cos(latRad) * Math.cos(dec));

  let h0Deg = 90.0;
  if (cosH0 >= 1) {
    h0Deg = 0.0;
  } else if (cosH0 <= -1) {
    h0Deg = 180.0;
  } else {
    h0Deg = Math.acos(cosH0) * r2d;
  }

  const h0Hours = h0Deg / 15.0;
  const sunriseHrs = solarNoonLocal - h0Hours;
  const sunsetHrs = solarNoonLocal + h0Hours;

  return { sunriseHrs, sunsetHrs };
}

export function calculateMandhiLongitude(
  birth: BirthInput,
  jd: number,
  ayanamsa: number,
  eps: number
): number {
  const safeLng = !isNaN(birth.lng) && birth.lng !== 0 ? birth.lng : 80.2707;
  const safeLat = !isNaN(birth.lat) && birth.lat !== 0 ? birth.lat : 13.0827;
  const safeTz = isNaN(birth.timezone) || birth.timezone === undefined ? 5.5 : birth.timezone;

  const safeDob = (birth.dob && birth.dob.trim()) || '1992-04-14';
  const partsDob = safeDob.split('-').map(Number);
  const year = partsDob[0] || 1992;
  const month = partsDob[1] || 4;
  const day = partsDob[2] || 14;
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  const safeTob = (birth.tob && birth.tob.trim()) || '08:30:00';
  const partsTob = safeTob.split(':').map(Number);
  const hrs = partsTob[0] || 8;
  const mins = partsTob[1] || 30;
  const secs = partsTob[2] || 0;
  const birthHrs = hrs + mins / 60 + secs / 3600;

  // Astronomical Sunrise & Sunset for location
  const { sunriseHrs, sunsetHrs } = calculateSunriseSunset(jd, safeLat, safeLng, safeTz);

  // Daytime Mandhi Ghatikas from Sunrise (Sun=26, Mon=22, Tue=18, Wed=14, Thu=10, Fri=6, Sat=2)
  const dayGhatikas = [26, 22, 18, 14, 10, 6, 2];
  // Nighttime Mandhi Ghatikas from Sunset (Sun=10, Mon=6, Tue=26, Wed=22, Thu=18, Fri=14, Sat=15.5)
  const nightGhatikas = [10, 6, 26, 22, 18, 14, 15.5];

  const dayLengthHrs = sunsetHrs - sunriseHrs;
  const nightLengthHrs = 24.0 - dayLengthHrs;

  let mandhiTimeLocalHrs = 0;

  if (birthHrs >= sunriseHrs && birthHrs < sunsetHrs) {
    // Daytime birth
    const ghat = dayGhatikas[dayOfWeek];
    mandhiTimeLocalHrs = sunriseHrs + (ghat / 30.0) * dayLengthHrs;
  } else if (birthHrs >= sunsetHrs) {
    // Post-sunset birth (night of current date)
    const ghat = nightGhatikas[dayOfWeek];
    mandhiTimeLocalHrs = sunsetHrs + (ghat / 30.0) * nightLengthHrs;
  } else {
    // Pre-dawn birth (night of previous astrological day)
    const effectiveDay = (dayOfWeek + 6) % 7;
    const ghat = nightGhatikas[effectiveDay];
    const prevSunsetHrs = sunsetHrs - 24.0;
    mandhiTimeLocalHrs = prevSunsetHrs + (ghat / 30.0) * nightLengthHrs;
  }

  const diffHours = mandhiTimeLocalHrs - birthHrs;

  const jdMandhi = jd + diffHours / 24.0;
  const t_m = (jdMandhi - 2451545.0) / 36525.0;

  const gmst_m = normalize360(280.46061837 + 360.98564736629 * (jdMandhi - 2451545.0) + 0.000387933 * t_m * t_m);
  const lst_m = normalize360(gmst_m + safeLng);

  const y_asc_m = Math.cos(lst_m * d2r);
  const x_asc_m = -Math.sin(lst_m * d2r) * Math.cos(eps * d2r) - Math.tan(safeLat * d2r) * Math.sin(eps * d2r);
  const ascDegMandhi = normalize360(Math.atan2(y_asc_m, x_asc_m) * r2d);

  return normalize360(ascDegMandhi - ayanamsa);
}

function getDignity(planet: PlanetName, signId: number): { en: PlanetPosition['dignityEn']; ta: string } {
  if (planet === 'Lagna' || planet === 'Mandhi') return { en: 'Neutral', ta: 'சமம்' };

  const exaltationMap: Partial<Record<PlanetName, { signId: number; maxDeg: number }>> = {
    Sun: { signId: 0, maxDeg: 10 },
    Moon: { signId: 1, maxDeg: 3 },
    Mars: { signId: 9, maxDeg: 28 },
    Mercury: { signId: 5, maxDeg: 15 },
    Jupiter: { signId: 3, maxDeg: 5 },
    Venus: { signId: 11, maxDeg: 27 },
    Saturn: { signId: 6, maxDeg: 20 },
    Rahu: { signId: 1, maxDeg: 15 },
    Ketu: { signId: 7, maxDeg: 15 },
  };

  const debilitationMap: Partial<Record<PlanetName, number>> = {
    Sun: 6,
    Moon: 7,
    Mars: 3,
    Mercury: 11,
    Jupiter: 9,
    Venus: 5,
    Saturn: 0,
    Rahu: 7,
    Ketu: 1,
  };

  const ownHousesMap: Partial<Record<PlanetName, number[]>> = {
    Sun: [4],
    Moon: [3],
    Mars: [0, 7],
    Mercury: [2, 5],
    Jupiter: [8, 11],
    Venus: [1, 6],
    Saturn: [9, 10],
    Rahu: [10],
    Ketu: [7],
  };

  if (exaltationMap[planet]?.signId === signId) {
    return { en: 'Exalted', ta: 'உச்சம்' };
  }
  if (debilitationMap[planet] === signId) {
    return { en: 'Debilitated', ta: 'நீசம்' };
  }
  if (ownHousesMap[planet]?.includes(signId)) {
    return { en: 'Own House', ta: 'ஆட்சி' };
  }

  return { en: 'Neutral', ta: 'சமம்' };
}
