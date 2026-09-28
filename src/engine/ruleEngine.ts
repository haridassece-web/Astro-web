import type { PlanetPosition, AstrologyRule } from '../types/astrology';
import { ASTROLOGY_RULES_DB } from '../data/rules';

export function evaluateAstrologyRules(planets: PlanetPosition[], lagnaSignId: number): AstrologyRule[] {
  const matchedRules: AstrologyRule[] = [];

  const sun = planets.find((p) => p.name === 'Sun')!;
  const moon = planets.find((p) => p.name === 'Moon')!;
  const mars = planets.find((p) => p.name === 'Mars')!;
  const mercury = planets.find((p) => p.name === 'Mercury')!;
  const jupiter = planets.find((p) => p.name === 'Jupiter')!;
  const venus = planets.find((p) => p.name === 'Venus')!;
  const saturn = planets.find((p) => p.name === 'Saturn')!;

  const kendraHouses = [1, 4, 7, 10];
  const trikonaHouses = [1, 5, 9];
  const dusthanaHouses = [6, 8, 12];

  // 1. Gaja Kesari Yoga: Jupiter in Kendra from Moon
  const jupiterFromMoonHouse = ((jupiter.signId - moon.signId + 12) % 12) + 1;
  if (kendraHouses.includes(jupiterFromMoonHouse)) {
    matchedRules.push(getRule('gaja_kesari_yoga'));
  }

  // 2. Budhaditya Yoga: Sun & Mercury in same sign
  if (sun.signId === mercury.signId) {
    matchedRules.push(getRule('budhaditya_yoga'));
  }

  // 3. Pancha Mahapurusha Yogas
  if (kendraHouses.includes(mars.house) && (mars.dignityEn === 'Exalted' || mars.dignityEn === 'Own House')) {
    matchedRules.push(getRule('ruchaka_yoga'));
  }

  if (kendraHouses.includes(mercury.house) && (mercury.dignityEn === 'Exalted' || mercury.dignityEn === 'Own House')) {
    matchedRules.push(getRule('bhadra_yoga'));
  }

  if (kendraHouses.includes(jupiter.house) && (jupiter.dignityEn === 'Exalted' || jupiter.dignityEn === 'Own House')) {
    matchedRules.push(getRule('hamsa_yoga'));
  }

  if (kendraHouses.includes(venus.house) && (venus.dignityEn === 'Exalted' || venus.dignityEn === 'Own House')) {
    matchedRules.push(getRule('malavya_yoga'));
  }

  if (kendraHouses.includes(saturn.house) && (saturn.dignityEn === 'Exalted' || saturn.dignityEn === 'Own House')) {
    matchedRules.push(getRule('sasa_yoga'));
  }

  // 4. Chandra Mangala Yoga
  const marsFromMoonHouse = ((mars.signId - moon.signId + 12) % 12) + 1;
  if (moon.signId === mars.signId || kendraHouses.includes(marsFromMoonHouse)) {
    matchedRules.push(getRule('chandra_mangala_yoga'));
  }

  // 5. Dhana Yoga
  const lordOf2 = getHouseLord(lagnaSignId, 2);
  const lordOf11 = getHouseLord(lagnaSignId, 11);
  const p2 = planets.find((p) => p.name === lordOf2);
  const p11 = planets.find((p) => p.name === lordOf11);
  if (p2 && p11 && p2.signId === p11.signId) {
    matchedRules.push(getRule('dhana_yoga_2_11'));
  }

  // 6. Neecha Bhanga Raja Yoga
  const debilitatedPlanets = planets.filter((p) => p.dignityEn === 'Debilitated');
  if (debilitatedPlanets.length > 0) {
    matchedRules.push(getRule('neecha_bhanga_raja_yoga'));
  }

  // 7. Viparita Raja Yogas
  const lordOf6 = getHouseLord(lagnaSignId, 6);
  const p6 = planets.find((p) => p.name === lordOf6);
  if (p6 && dusthanaHouses.includes(p6.house)) {
    matchedRules.push(getRule('harsha_viparita_raja_yoga'));
  }

  const lordOf12 = getHouseLord(lagnaSignId, 12);
  const p12 = planets.find((p) => p.name === lordOf12);
  if (p12 && dusthanaHouses.includes(p12.house)) {
    matchedRules.push(getRule('vimala_viparita_raja_yoga'));
  }

  // 8. Raja Yoga (Lagna & 9th Lords)
  const lordOf1 = getHouseLord(lagnaSignId, 1);
  const lordOf9 = getHouseLord(lagnaSignId, 9);
  const p1 = planets.find((p) => p.name === lordOf1);
  const p9 = planets.find((p) => p.name === lordOf9);
  if (p1 && p9 && p1.signId === p9.signId) {
    matchedRules.push(getRule('raja_yoga_1_9'));
  }

  // 9. Dharma Karmadhipati Yoga
  const lordOf10 = getHouseLord(lagnaSignId, 10);
  const p10 = planets.find((p) => p.name === lordOf10);
  if (p9 && p10 && p9.signId === p10.signId) {
    matchedRules.push(getRule('dharma_karmadhipati_yoga'));
  }

  // 10. Saraswati & Lakshmi Yogas
  if ([1, 2, 4, 5, 7, 9, 10].includes(jupiter.house) && [1, 2, 4, 5, 7, 9, 10].includes(venus.house) && [1, 2, 4, 5, 7, 9, 10].includes(mercury.house)) {
    matchedRules.push(getRule('saraswati_yoga'));
  }

  if (p9 && (kendraHouses.includes(p9.house) || trikonaHouses.includes(p9.house)) && (p9.dignityEn === 'Exalted' || p9.dignityEn === 'Own House')) {
    matchedRules.push(getRule('lakshmi_yoga'));
  }

  // 11. Sun Nakshatra Nadi Rules (1-9 Navatara count from Lagna Star)
  const lagnaPos = planets.find((p) => p.name === 'Lagna');
  const lagnaNakshatraId = lagnaPos ? lagnaPos.nakshatraId : Math.floor((lagnaSignId * 30) / (360 / 27));

  const sunNakDist = ((sun.nakshatraId - lagnaNakshatraId + 27) % 27) + 1;
  const sunStarCount = ((sunNakDist - 1) % 9) + 1;
  matchedRules.push(getRule(`suriyan_nakshatra_${sunStarCount}`));

  // 12. Moon Nakshatra Nadi Rules (1-9 Navatara count / placement from Lagna)
  const moonNakDist = ((moon.nakshatraId - lagnaNakshatraId + 27) % 27) + 1;
  const moonStarCount = ((moonNakDist - 1) % 9) + 1;

  if (moonStarCount === 8) {
    const diffSunMoon = (moon.longitude - sun.longitude + 360) % 360;
    const isWaxing = diffSunMoon < 180;
    if (isWaxing) {
      matchedRules.push(getRule('chandran_nakshatra_8_valarpirai'));
    } else {
      matchedRules.push(getRule('chandran_nakshatra_8_theypirai'));
    }
  } else {
    matchedRules.push(getRule(`chandran_nakshatra_${moonStarCount}`));
  }

  // 13. Mudakku Lord Moon Special Rules (Page 6)
  // Check if Moon is Mudakku Lord (for Sun stars: Bharani, Krittika, Mrigashira, Magha, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha)
  const isMoonMudakkuLord = [1, 2, 4, 9, 10, 11, 19, 20].includes(sun.nakshatraId);
  if (isMoonMudakkuLord && moon.house === 3) {
    if (p6 && p6.house === 3) {
      matchedRules.push(getRule('mudakku_lord_moon_3rd_house6'));
    } else if (p12 && p12.house === 3) {
      matchedRules.push(getRule('mudakku_lord_moon_3rd_house12'));
    } else {
      matchedRules.push(getRule('mudakku_lord_moon_3rd_house8'));
    }
  }

  // 14. 11th Lord, Yogathipathi & Karma Lord Connection to Lagna
  if (p11 && p1 && (p11.house === 1 || p11.signId === p1.signId || (p10 && p10.signId === p11.signId))) {
    matchedRules.push(getRule('eleventh_lord_yoga_connection'));
  }

  // 15. Sun & Moon Special Nakshatra Career/Income Combinations
  if (sun.nakshatraId === 23 && moon.nakshatraId === 14) {
    matchedRules.push(getRule('sun_shatabhisha_moon_swati'));
  }
  if (sun.nakshatraId === 13 && moon.nakshatraId === 22) {
    matchedRules.push(getRule('sun_chitra_moon_dhanishta'));
  }
  if (sun.nakshatraId === 8 && moon.nakshatraId === 8) {
    matchedRules.push(getRule('sun_ashlesha_moon_ashlesha'));
  }

  const moonFromSunNakDist = ((moon.nakshatraId - sun.nakshatraId + 27) % 27) + 1;
  const moonFromSunCount = ((moonFromSunNakDist - 1) % 9) + 1;

  if (moonFromSunCount === 2) {
    matchedRules.push(getRule('sun_moon_star_count_2_family_biz'));
  } else if (moonFromSunCount === 3) {
    matchedRules.push(getRule('sun_moon_star_count_3_changing_biz'));
  } else if (moonFromSunCount === 5) {
    matchedRules.push(getRule('sun_moon_star_count_5_millionaire'));
  } else if (moonFromSunCount === 6) {
    matchedRules.push(getRule('sun_moon_star_count_6_rivalry'));
  } else if (moonFromSunCount === 7) {
    matchedRules.push(getRule('sun_moon_star_count_7_ethical_biz'));
    matchedRules.push(getRule('sun_moon_star_count_7_8_struggle_until_52'));
  } else if (moonFromSunCount === 8) {
    matchedRules.push(getRule('sun_moon_star_count_7_8_struggle_until_52'));
  } else if (moonFromSunCount === 9) {
    matchedRules.push(getRule('sun_moon_star_count_9_loss_then_pinnacle'));
  }

  return matchedRules;
}

function getRule(id: string): AstrologyRule {
  return ASTROLOGY_RULES_DB.find((r) => r.id === id) || {
    id,
    nameEn: id,
    nameTa: id,
    category: 'General',
    descriptionEn: '',
    descriptionTa: '',
    score: 70,
    predictionEn: '',
    predictionTa: '',
  };
}

function getHouseLord(lagnaSignId: number, houseNum: number): string {
  const targetSignId = (lagnaSignId + houseNum - 1) % 12;
  const signLords: Record<number, string> = {
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
  return signLords[targetSignId];
}
