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

// High Precision Thirukkanitha Planetary Calculation Engine
export function calculatePlanetaryPositions(
  birth: BirthInput,
  jd: number,
  ayanamsa: number
): { planets: PlanetPosition[]; lagnaSignId: number } {
  const t = (jd - 2451545.0) / 36525.0;

  // 1. Sun (Thirukkanitha True Position)
  const L0_Sun = normalize360(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
  const M_Sun = normalize360(357.52911 + 35999.05029 * t - 0.0001537 * t * t);
  const C_Sun =
    (1.914602 - 0.004817 * t) * Math.sin(M_Sun * d2r) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * M_Sun * d2r) +
    0.000289 * Math.sin(3 * M_Sun * d2r);
  const sunTropical = normalize360(L0_Sun + C_Sun);

  // Earth Distance & Tropical Longitude for Geocentric Conversions
  const R_Earth = 1.00014 - 0.01671 * Math.cos(M_Sun * d2r) - 0.00014 * Math.cos(2 * M_Sun * d2r);
  const L_Earth = normalize360(sunTropical + 180);

  // 2. Moon (Thirukkanitha Perturbed True Longitude)
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

  // 3. Mercury (Heliocentric -> Geocentric)
  const L_Merc = normalize360(252.2509 + 149472.6747 * t);
  const M_Merc = normalize360(174.7948 + 149472.5153 * t);
  const l_Merc = normalize360(L_Merc + 23.44 * Math.sin(M_Merc * d2r) + 2.98 * Math.sin(2 * M_Merc * d2r));
  const r_Merc = 0.3871 - 0.0796 * Math.cos(M_Merc * d2r);
  const x_Merc = r_Merc * Math.cos(l_Merc * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Merc = r_Merc * Math.sin(l_Merc * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const mercuryTropical = normalize360(Math.atan2(y_Merc, x_Merc) * r2d);

  // 4. Venus (Heliocentric -> Geocentric)
  const L_Ven = normalize360(181.9798 + 58517.8156 * t);
  const M_Ven = normalize360(50.4082 + 58517.8039 * t);
  const l_Ven = normalize360(L_Ven + 0.7758 * Math.sin(M_Ven * d2r));
  const r_Ven = 0.7233 - 0.0049 * Math.cos(M_Ven * d2r);
  const x_Ven = r_Ven * Math.cos(l_Ven * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Ven = r_Ven * Math.sin(l_Ven * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const venusTropical = normalize360(Math.atan2(y_Ven, x_Ven) * r2d);

  // 5. Mars (Heliocentric -> Geocentric)
  const L_Mars = normalize360(355.433 + 19140.2993 * t);
  const M_Mars = normalize360(19.373 + 19140.2993 * t);
  const l_Mars = normalize360(L_Mars + 10.691 * Math.sin(M_Mars * d2r) + 0.623 * Math.sin(2 * M_Mars * d2r));
  const r_Mars = 1.52368 - 0.142 * Math.cos(M_Mars * d2r);
  const x_Mars = r_Mars * Math.cos(l_Mars * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Mars = r_Mars * Math.sin(l_Mars * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const marsTropical = normalize360(Math.atan2(y_Mars, x_Mars) * r2d);

  // 6. Jupiter (Heliocentric -> Geocentric)
  const L_Jup = normalize360(34.3515 + 3034.9057 * t);
  const M_Jup = normalize360(20.0202 + 3034.6057 * t);
  const l_Jup = normalize360(L_Jup + 5.555 * Math.sin(M_Jup * d2r) + 0.168 * Math.sin(2 * M_Jup * d2r));
  const r_Jup = 5.2026 - 0.252 * Math.cos(M_Jup * d2r);
  const x_Jup = r_Jup * Math.cos(l_Jup * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Jup = r_Jup * Math.sin(l_Jup * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const jupiterTropical = normalize360(Math.atan2(y_Jup, x_Jup) * r2d);

  // 7. Saturn (Heliocentric -> Geocentric + Great Inequality)
  const L_Sat = normalize360(50.0774 + 1222.1138 * t);
  const M_Sat = normalize360(317.0207 + 1221.5515 * t);
  const satInequality = 0.8 * Math.sin((2 * M_Jup - 5 * M_Sat - 67.6) * d2r);
  const l_Sat = normalize360(L_Sat + 6.358 * Math.sin(M_Sat * d2r) + 0.25 * Math.sin(2 * M_Sat * d2r) + satInequality);
  const r_Sat = 9.5549 - 0.531 * Math.cos(M_Sat * d2r);
  const x_Sat = r_Sat * Math.cos(l_Sat * d2r) - R_Earth * Math.cos(L_Earth * d2r);
  const y_Sat = r_Sat * Math.sin(l_Sat * d2r) - R_Earth * Math.sin(L_Earth * d2r);
  const saturnTropical = normalize360(Math.atan2(y_Sat, x_Sat) * r2d);

  // 8. Rahu (True Node Thirukkanitha)
  const rahuMean = normalize360(125.04452 - 1934.136261 * t + 0.0020708 * t * t);
  const rahuPerturb = -0.028 * Math.sin((2 * D_Moon - 2 * F_Moon) * d2r) - 0.0247 * Math.sin((2 * D_Moon - M_Sun - 2 * F_Moon) * d2r);
  const rahuTropical = normalize360(rahuMean + rahuPerturb);
  const ketuTropical = normalize360(rahuTropical + 180);

  // Apply Thirukkanitha Ayanamsa Adjustment
  const siderealLongitudes: Record<PlanetName, number> = {
    Sun: normalize360(sunTropical - ayanamsa),
    Moon: normalize360(moonTropical - ayanamsa),
    Mars: normalize360(marsTropical - ayanamsa),
    Mercury: normalize360(mercuryTropical - ayanamsa),
    Jupiter: normalize360(jupiterTropical - ayanamsa),
    Venus: normalize360(venusTropical - ayanamsa),
    Saturn: normalize360(saturnTropical - ayanamsa),
    Rahu: normalize360(rahuTropical - ayanamsa),
    Ketu: normalize360(ketuTropical - ayanamsa),
    Lagna: 0,
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

  // Apparent Speeds
  const speeds: Record<PlanetName, number> = {
    Sun: 0.9856,
    Moon: 13.176,
    Mars: 0.524,
    Mercury: 1.2,
    Jupiter: 0.083,
    Venus: 1.6,
    Saturn: 0.033,
    Rahu: -0.052,
    Ketu: -0.052,
    Lagna: 360 / 24,
    Mandhi: 0,
  };

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
      isRetrograde: name === 'Rahu' || name === 'Ketu',
      dignityEn: dignityInfo.en,
      dignityTa: dignityInfo.ta,
      speed: speeds[name],
    };
  });

  return { planets, lagnaSignId };
}

export function calculateMandhiLongitude(
  birth: BirthInput,
  jd: number,
  ayanamsa: number,
  eps: number
): number {
  const safeLng = !isNaN(birth.lng) && birth.lng !== 0 ? birth.lng : 80.2707;
  const safeLat = !isNaN(birth.lat) && birth.lat !== 0 ? birth.lat : 13.0827;

  const safeDob = (birth.dob && birth.dob.trim()) || '1992-04-14';
  const partsDob = safeDob.split('-').map(Number);
  const year = partsDob[0] || 1992;
  const month = partsDob[1] || 4;
  const day = partsDob[2] || 14;
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay();

  const safeTob = (birth.tob && birth.tob.trim()) || '08:30:00';
  const partsTob = safeTob.split(':').map(Number);
  const hrs = partsTob[0] || 8;
  const mins = partsTob[1] || 30;
  const secs = partsTob[2] || 0;
  const birthHrs = hrs + mins / 60 + secs / 3600;

  // Daytime Mandhi Ghatikas from Sunrise (Sun=26, Mon=22, Tue=18, Wed=14, Thu=10, Fri=6, Sat=2)
  const dayGhatikas = [26, 22, 18, 14, 10, 6, 2];
  // Nighttime Mandhi Ghatikas from Sunset (Sun=10, Mon=6, Tue=26, Wed=22, Thu=18, Fri=14, Sat=14.5)
  const nightGhatikas = [10, 6, 26, 22, 18, 14, 14.5];

  const sunriseHrs = 6.0;
  const sunsetHrs = 18.0;
  const dayLengthHrs = sunsetHrs - sunriseHrs;
  const nightLengthHrs = 24.0 - dayLengthHrs;

  const isDaytime = birthHrs >= sunriseHrs && birthHrs < sunsetHrs;
  let mandhiTimeLocalHrs = 0;

  if (isDaytime) {
    const ghat = dayGhatikas[dayOfWeek];
    mandhiTimeLocalHrs = sunriseHrs + (ghat / 30.0) * dayLengthHrs;
  } else {
    let effectiveDay = dayOfWeek;
    let baseHrs = sunsetHrs;
    if (birthHrs < sunriseHrs) {
      effectiveDay = (dayOfWeek + 6) % 7;
      baseHrs = sunsetHrs - 24.0;
    }
    const ghat = nightGhatikas[effectiveDay];
    mandhiTimeLocalHrs = baseHrs + (ghat / 30.0) * nightLengthHrs;
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
