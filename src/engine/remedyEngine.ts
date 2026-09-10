import type { Panchanga, PlanetPosition, DasaPeriod, TempleRemedy, TraditionalPariharaReport, TraditionalPariharaItem } from '../types/astrology';
import { NAKSHATRA_TEMPLES_DB, LAGNA_TEMPLES_DB } from '../data/templeMasterData';
import { TITHI_TEMPLES_DB } from '../data/tithiTemplesData';
import { getKaranaTempleRemedy } from '../data/karanaTemplesData';
import { getYogaTempleRemedy } from '../data/yogaTemplesData';
import { TEMPLE_REMEDIES_DATABASE } from '../data/templeRemedies';
import {
  TITHI_PARIHARA_MAP,
  getKaranaPariharaInfo,
  NITYA_YOGA_PARIHARA_MAP,
  VAINASIKA_STAR_MAP,
  SURYA_MUDAKKU_STAR_TABLE,
  MUDAKKU_LAGNA_BHAVA_MAP,
  MANDI_DOSHA_STAR_MAP,
  BHAVA_MUDAKKU_RAHU_KETU_MAP,
} from '../data/traditionalPariharaData';

export function calculateTraditionalPariharaReport(
  panchanga: Panchanga,
  planets: PlanetPosition[],
  lagnaSignId: number
): TraditionalPariharaReport {
  const moon = planets.find((p) => p.name === 'Moon')!;
  const sun = planets.find((p) => p.name === 'Sun')!;

  // 1. Tithi Parihara Temple (வளர்பிறை அல்லது தேய்பிறை திதி பரிகார கோவில்)
  const tithiSubIndex = ((panchanga.tithiIndex - 1) % 15) + 1;
  const isShukla = panchanga.tithiType === 'Shukla' || panchanga.tithiIndex <= 15;
  const tithiData = TITHI_PARIHARA_MAP[tithiSubIndex] || TITHI_PARIHARA_MAP[1];

  const pakshaLabelTa = isShukla ? 'வளர்பிறை' : 'தேய்பிறை';
  const pakshaLabelEn = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';

  const tithiCleanTa = panchanga.tithiTa.includes(pakshaLabelTa)
    ? panchanga.tithiTa
    : `${pakshaLabelTa} ${panchanga.tithiTa}`;
  const tithiCleanEn = panchanga.tithiEn.includes('Shukla') || panchanga.tithiEn.includes('Krishna')
    ? panchanga.tithiEn
    : `${pakshaLabelEn} ${panchanga.tithiEn}`;

  const tithiItem: TraditionalPariharaItem = {
    typeEn: `Tithi Parihara (${tithiCleanEn})`,
    typeTa: `திதி பரிகாரம் (${tithiCleanTa})`,
    nameEn: tithiCleanEn,
    nameTa: tithiCleanTa,
    templeNameEn: isShukla ? tithiData.shuklaTempleEn : tithiData.krishnaTempleEn,
    templeNameTa: isShukla ? tithiData.shuklaTempleTa : tithiData.krishnaTempleTa,
    deityEn: isShukla ? tithiData.shuklaDeityEn : tithiData.krishnaDeityEn,
    deityTa: isShukla ? tithiData.shuklaDeityTa : tithiData.krishnaDeityTa,
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(isShukla ? tithiData.shuklaTempleEn : tithiData.krishnaTempleEn)}`,
    detailsTa: `${tithiCleanTa} திதியில் பிறந்தவர்கள் இத்தலத்தில் வழிபாடு செய்ய திதி சூன்ய தோஷங்கள் நீங்கி வம்ச அபிவிருத்தி உண்டாகும்.`,
    detailsEn: `Worshipping at this ${tithiCleanEn} temple removes Tithi Sunya afflictions and grants family lineage prosperity.`,
  };

  // 2. Karana Parihara Temple (கரண பரிகார கோவில் - Exact 11 Karana Name Matching)
  const karanaData = getKaranaPariharaInfo(panchanga.karanaEn, panchanga.karanaTa);

  const karanaItem: TraditionalPariharaItem = {
    typeEn: `Karana Parihara (${panchanga.karanaEn})`,
    typeTa: `கரண பரிகாரம் (${panchanga.karanaTa})`,
    nameEn: panchanga.karanaEn,
    nameTa: panchanga.karanaTa,
    templeNameEn: karanaData.templeEn,
    templeNameTa: karanaData.templeTa,
    deityEn: `Karana Animal: ${karanaData.animalTa} • Planet: ${karanaData.planetTa}`,
    deityTa: `கரண மிருகம்: ${karanaData.animalTa} | கிரகம்: ${karanaData.planetTa}`,
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(karanaData.templeEn)}`,
    detailsTa: `${panchanga.karanaTa} கரணத்தில் பிறந்தவர்கள் இத்தலத்தில் வழிபட கரண தோஷம் விலகி காரிய சித்தி அடையும்.`,
    detailsEn: `Worshipping at this Karana Parihara Sthalam removes elemental obstacles and secures action success.`,
  };

  // 3. Nitya Yoga Yogi Parihara Temple (யோகி பரிகார கோவில் - Exact Table Match)
  const yogaIndex = ((panchanga.yogaIndex - 1) % 27) + 1;
  const yogaData = NITYA_YOGA_PARIHARA_MAP[yogaIndex] || NITYA_YOGA_PARIHARA_MAP[1];

  const yogaItem: TraditionalPariharaItem = {
    typeEn: `Nitya Yoga Yogi Parihara (${panchanga.yogaEn})`,
    typeTa: `யோகி நட்சத்திர பரிகாரம் (${panchanga.yogaTa})`,
    nameEn: panchanga.yogaEn,
    nameTa: panchanga.yogaTa,
    templeNameEn: yogaData.yogiTempleEn,
    templeNameTa: yogaData.yogiTempleTa,
    deityEn: 'Nitya Yoga Yogi Devata & Lord Shiva',
    deityTa: 'யோகி அதிதேவதை & சிவபெருமான்',
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(yogaData.yogiTempleEn)}`,
    detailsTa: `${panchanga.yogaTa} யோகத்தில் பிறந்தவர்கள் யோகி ஸ்தலமான இத்தலத்தில் வழிபட சுப யோக பாக்கியங்கள் உன்னதமாகக் கூடும்.`,
    detailsEn: `Worshipping at the Yogi Parihara Sthalam activates the supreme fortune of your birth Nitya Yoga.`,
  };

  // 4. Nitya Yoga Avayogi Parihara Temple (அவயோகி பரிகார கோவில் - Exact Table Match)
  const avayogiItem: TraditionalPariharaItem = {
    typeEn: `Nitya Yoga Avayogi Parihara (${panchanga.yogaEn})`,
    typeTa: `அவயோகி நட்சத்திர பரிகாரம் (${panchanga.yogaTa})`,
    nameEn: `${panchanga.yogaEn} Avayogi Sthalam`,
    nameTa: `${panchanga.yogaTa} அவயோகி தலம்`,
    templeNameEn: yogaData.avayogiTempleEn,
    templeNameTa: yogaData.avayogiTempleTa,
    deityEn: 'Avayogi Planet & Lord Shiva',
    deityTa: 'அவயோகி கிரக சந்நிதி & சிவபெருமான்',
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(yogaData.avayogiTempleEn)}`,
    detailsTa: `${panchanga.yogaTa} யோகத்தின் அவயோகி தோஷம் தீர இத்தலத்தில் தீபமேற்றி அர்ச்சனை செய்து வழிபடுதல் நலம்.`,
    detailsEn: `Worshipping at the Avayogi Parihara Sthalam neutralizes period setbacks and health/financial obstacles.`,
  };

  // 5. Vainasika Parihara Temple (வைநாசிக பரிகார கோவில் - Exact Table Match)
  const starId = moon.nakshatraId; // 0 to 26
  const vainasikaData = VAINASIKA_STAR_MAP[starId] || VAINASIKA_STAR_MAP[0];

  const vainasikaItem: TraditionalPariharaItem = {
    typeEn: `Vainasika Star Parihara (${panchanga.nakshatraEn})`,
    typeTa: `வைநாசிக நட்சத்திர பரிகாரம் (${panchanga.nakshatraTa})`,
    nameEn: panchanga.nakshatraEn,
    nameTa: panchanga.nakshatraTa,
    templeNameEn: vainasikaData.templeEn,
    templeNameTa: vainasikaData.templeTa,
    deityEn: 'Vainasika Devata & Perumal / Shiva',
    deityTa: 'வைநாசிக அதிதேவதை & பெருமாள் / சிவன்',
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(vainasikaData.templeEn)}`,
    detailsTa: `${panchanga.nakshatraTa} நட்சத்திரத்திற்குரிய வைநாசிக ஸ்தலமான இத்தலத்தில் வழிபட திடீர் விபத்துக்கள், தொழில் தடைகள் மற்றும் கவலைகள் தீரும்.`,
    detailsEn: `Worshipping at the Vainasika Parihara Sthalam for ${panchanga.nakshatraEn} destroys sudden catastrophes and anxieties.`,
  };

  // 6. Mudakku Parihara Temple (சூரியன் நின்ற நட்சத்திரம் ➔ முடக்கு நட்சத்திரம் ➔ லக்னம் பாவம்)
  const sunStarId = sun.nakshatraId;
  const suryaStarInfo = SURYA_MUDAKKU_STAR_TABLE[sunStarId] || SURYA_MUDAKKU_STAR_TABLE[0];
  const mudakkuSignId = suryaStarInfo.mudakkuSignId;

  let mudakkuBhava = ((mudakkuSignId - lagnaSignId + 12) % 12) + 1;
  if (mudakkuBhava < 2 || mudakkuBhava > 12) {
    mudakkuBhava = (sun.house && sun.house >= 2 && sun.house <= 12) ? sun.house : 9;
  }

  // Determine Mudakku Rasi Group Key (treatise categorizes by the Zodiac sign of the Mudakku Rasi itself)
  let groupKey = 'Capricorn_Aquarius';
  if (mudakkuSignId === 0 || mudakkuSignId === 7) groupKey = 'Aries_Scorpio';
  else if (mudakkuSignId === 1 || mudakkuSignId === 6) groupKey = 'Taurus_Libra';
  else if (mudakkuSignId === 2 || mudakkuSignId === 5) groupKey = 'Gemini_Virgo';
  else if (mudakkuSignId === 3) groupKey = 'Cancer';
  else if (mudakkuSignId === 4) groupKey = 'Leo';
  else if (mudakkuSignId === 8 || mudakkuSignId === 11) groupKey = 'Sagittarius_Pisces';
  else if (mudakkuSignId === 9 || mudakkuSignId === 10) groupKey = 'Capricorn_Aquarius';

  const groupMatrix = MUDAKKU_LAGNA_BHAVA_MAP[groupKey] || MUDAKKU_LAGNA_BHAVA_MAP['Capricorn_Aquarius'];
  const mudakkuData = groupMatrix[mudakkuBhava] || groupMatrix[9] || groupMatrix[3] || MUDAKKU_LAGNA_BHAVA_MAP['Capricorn_Aquarius'][12];

  const mudakkuItem: TraditionalPariharaItem = {
    typeEn: `Mudakku Star Parihara (Sun: ${suryaStarInfo.sunStarEn} ➔ Mudakku: ${suryaStarInfo.mudakkuStarEn}, ${mudakkuBhava}th House)`,
    typeTa: `முடக்கு நட்சத்திர பரிகாரம் (சூரியன்: ${suryaStarInfo.sunStarTa} ➔ முடக்கு: ${suryaStarInfo.mudakkuStarTa}, ${mudakkuBhava}-ஆம் பாவம்)`,
    nameEn: `Sun in ${suryaStarInfo.sunStarEn} ➔ Mudakku Star: ${suryaStarInfo.mudakkuStarEn}`,
    nameTa: `சூரியன்: ${suryaStarInfo.sunStarTa} ➔ முடக்கு நட்சத்திரம்: ${suryaStarInfo.mudakkuStarTa}`,
    templeNameEn: mudakkuData.templeEn,
    templeNameTa: mudakkuData.templeTa,
    deityEn: mudakkuData.deityEn,
    deityTa: mudakkuData.deityTa,
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(mudakkuData.templeEn)}`,
    detailsTa: `சூரியன் நின்ற ${suryaStarInfo.sunStarTa} நட்சத்திரத்திற்கு முடக்கு நட்சத்திரம் ${suryaStarInfo.mudakkuStarTa} ஆகும். லக்னத்திற்கு இது ${mudakkuBhava}-ஆம் பாவம் என்பதால், ${mudakkuData.templeTa} தலத்தில் வழிபாடு செய்வதும் நெய்தீபமேற்றி அர்ச்சனை செய்வதும் உன்னதமான முடக்கு நிவர்த்தியாகும்.`,
    detailsEn: `Sun is in ${suryaStarInfo.sunStarEn} star whose Mudakku stars are ${suryaStarInfo.mudakkuStarEn} (${mudakkuBhava}th House from Lagna). Worshipping at ${mudakkuData.templeEn} dissolves this Mudakku affliction.`,
  };

  // 7. Mandi Dosha Nivarana Temple (PDF 1 Pages 7-9)
  const birthStarIdx = panchanga.nakshatraIndex >= 1 && panchanga.nakshatraIndex <= 27
    ? panchanga.nakshatraIndex - 1
    : moon.nakshatraId;
  const mandiStarData = MANDI_DOSHA_STAR_MAP[birthStarIdx] || MANDI_DOSHA_STAR_MAP[0];
  const mandiItem: TraditionalPariharaItem = {
    typeEn: `Mandi Dosha Nivarana (${mandiStarData.starEn})`,
    typeTa: `மாந்தி தோஷ நிவர்த்தி (${mandiStarData.starTa})`,
    nameEn: mandiStarData.starEn,
    nameTa: mandiStarData.starTa,
    templeNameEn: mandiStarData.templeEn,
    templeNameTa: mandiStarData.templeTa,
    deityEn: 'Shiva / Perumal / Murugan (Mandi Nivarthi)',
    deityTa: 'மாந்தி தோஷ நிவர்த்தி மூர்த்தி',
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(mandiStarData.templeEn)}`,
    detailsTa: `${mandiStarData.starTa} நட்சத்திரத்தில் பிறந்தவர்களுக்கு மாந்தி தோஷம், மரண பயம், தீராத உடல் உபாதைகள் மற்றும் தடைகள் விலக ${mandiStarData.templeTa} தலத்தில் வழிபாடு செய்வது உன்னதமான பலன் தரும்.`,
    detailsEn: `For natives born in ${mandiStarData.starEn} star, worshipping at ${mandiStarData.templeEn} dissolves Mandi dosha, acute anxieties, and health obstacles.`,
  };

  // 8. Chhaya Graha (Rahu / Ketu) in Mudakku Bhava (Tiruppur Thanikasalam Treatise)
  const rahu = planets.find((p) => p.name === 'Rahu');
  const ketu = planets.find((p) => p.name === 'Ketu');
  const rahuHouse = rahu?.house;
  const ketuHouse = ketu?.house;

  let chhayaTempleTa = '';
  let chhayaTempleEn = '';
  let chhayaGrahaTa = '';
  let chhayaGrahaEn = '';

  const bhavaRahuKetu = BHAVA_MUDAKKU_RAHU_KETU_MAP[mudakkuBhava] || BHAVA_MUDAKKU_RAHU_KETU_MAP[1];

  if (rahuHouse === mudakkuBhava) {
    chhayaGrahaTa = 'முடக்கு வீட்டில் ராகு';
    chhayaGrahaEn = 'Rahu in Mudakku Bhava';
    chhayaTempleTa = bhavaRahuKetu.rahuTempleTa;
    chhayaTempleEn = bhavaRahuKetu.rahuTempleEn;
  } else if (ketuHouse === mudakkuBhava) {
    chhayaGrahaTa = 'முடக்கு வீட்டில் கேது';
    chhayaGrahaEn = 'Ketu in Mudakku Bhava';
    chhayaTempleTa = bhavaRahuKetu.ketuTempleTa;
    chhayaTempleEn = bhavaRahuKetu.ketuTempleEn;
  } else {
    chhayaGrahaTa = `${mudakkuBhava}-ஆம் முடக்கு பாவக ராகு/கேது ஸ்தலம்`;
    chhayaGrahaEn = `House ${mudakkuBhava} Mudakku Node Sthalam`;
    chhayaTempleTa = `${bhavaRahuKetu.rahuTempleTa} / ${bhavaRahuKetu.ketuTempleTa}`;
    chhayaTempleEn = `${bhavaRahuKetu.rahuTempleEn} / ${bhavaRahuKetu.ketuTempleEn}`;
  }

  const mudakkuChhayaItem: TraditionalPariharaItem = {
    typeEn: `Mudakku Chhaya Node Sthalam (${chhayaGrahaEn})`,
    typeTa: `முடக்கு சாயாகிரக நிவர்த்தி (${chhayaGrahaTa})`,
    nameEn: chhayaGrahaEn,
    nameTa: chhayaGrahaTa,
    templeNameEn: chhayaTempleEn,
    templeNameTa: chhayaTempleTa,
    deityEn: 'Rahu / Ketu / Vinayagar / Shiva',
    deityTa: 'ராகு / கேது / விநாயகர் / சிவன்',
    googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(chhayaTempleEn.split('/')[0].trim())}`,
    detailsTa: `முடக்கு ஸ்தானமான ${mudakkuBhava}-ஆம் பாவத்தில் சாயாகிரகங்கள் (ராகு/கேது) அமைந்தால் ஏற்படும் தீவிர முடக்கு தோஷ நிவர்த்திக்கான சிறப்பு தலம்.`,
    detailsEn: `Special remedy temple prescribed by researcher Tiruppur Thanikasalam when shadow planets (Rahu/Ketu) occupy the Mudakku Bhava.`,
  };

  return {
    tithiParihara: tithiItem,
    karanaParihara: karanaItem,
    yogaParihara: yogaItem,
    avayogiParihara: avayogiItem,
    vainasikaParihara: vainasikaItem,
    mudakkuParihara: mudakkuItem,
    mandiParihara: mandiItem,
    mudakkuChhayaParihara: mudakkuChhayaItem,
  };
}

export function generatePersonalizedTempleRemedies(
  panchanga: Panchanga,
  planets: PlanetPosition[],
  lagnaSignId: number,
  dasaPeriods: DasaPeriod[]
): TempleRemedy[] {
  const matchedRemedies: TempleRemedy[] = [];
  const addedIds = new Set<string>();

  const addRemedy = (rem: TempleRemedy) => {
    if (!addedIds.has(rem.id)) {
      addedIds.add(rem.id);
      matchedRemedies.push(rem);
    }
  };

  // 1. DYNAMIC NAKSHATRA TEMPLE (Specific to Birth Star 0 to 26)
  const moon = planets.find((p) => p.name === 'Moon')!;
  const starId = moon.nakshatraId;

  if (NAKSHATRA_TEMPLES_DB[starId]) {
    addRemedy(NAKSHATRA_TEMPLES_DB[starId]);
  } else {
    addRemedy({
      id: `TPL-NAK-DYN-${starId}`,
      category: 'Nakshatra',
      sub_category: `${panchanga.nakshatraEn} (${panchanga.nakshatraTa})`,
      condition: `Birth Star is ${panchanga.nakshatraEn} (${panchanga.nakshatraTa} நட்சத்திரம்)`,
      temple_name: `Sri Mahalingaswamy Temple (${panchanga.nakshatraTa} Sthalam)`,
      deity: 'Lord Shiva & Birth Star Deity',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      latitude: 11.0021,
      longitude: 79.4510,
      google_map_url: `https://maps.google.com/?q=${encodeURIComponent(panchanga.nakshatraEn)}+Temple+Tamilnadu`,
      opening_hours: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
      auspicious_day_ta: `${panchanga.nakshatraTa} நட்சத்திர நாள் & பிரதோஷம்`,
      auspicious_day_en: `${panchanga.nakshatraEn} Star Days & Pradosham`,
      related_planet: moon.lord,
      related_nakshatra: panchanga.nakshatraEn,
      worship_method_ta: `${panchanga.nakshatraTa} நட்சத்திர நாளில் சுவாமிக்கு பாலாபிஷேகம் செய்து, நெய்தீபம் ஏற்றி வழிபடுதல்.`,
      worship_method_en: `Performing Milk Abhishekam and lighting Ghee lamps on ${panchanga.nakshatraEn} star days.`,
      mantra: 'Om Namah Shivaya • Om Star Devataya Namaha',
      offerings: 'Vilva Leaves, Ghee lamps, Honey, Prasadam',
      description_ta: `${panchanga.nakshatraTa} நட்சத்திரத்தில் பிறந்தவர்கள் இத்தலத்தில் வழிபட ஆயுள் பலம், தொழில் மேன்மை மற்றும் மன அமைதி கூடும்.`,
      description_en: `${panchanga.nakshatraEn} born natives worshipping here attain career stability, health rejuvenation, and peace.`,
      source: 'Nakshatra Sthala Mahatmyam',
    });
  }

  // 2. DYNAMIC LAGNA TEMPLE (Specific to Ascendant 0 to 11)
  if (LAGNA_TEMPLES_DB[lagnaSignId]) {
    addRemedy(LAGNA_TEMPLES_DB[lagnaSignId]);
  } else {
    const lagnaPlanet = planets.find((p) => p.name === 'Lagna');
    addRemedy({
      id: `TPL-LAGNA-DYN-${lagnaSignId}`,
      category: 'Lagna',
      sub_category: `${lagnaPlanet?.signNameEn || 'Lagna'} Ascendant`,
      condition: `Lagna is ${lagnaPlanet?.signNameEn} (${lagnaPlanet?.signNameTa})`,
      temple_name: `Sri Suryanar Kovil / Lagna Sthalam (${lagnaPlanet?.signNameTa})`,
      deity: 'Lord Shiva & Lagna Lord',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      latitude: 11.0120,
      longitude: 79.4310,
      google_map_url: `https://maps.google.com/?q=${encodeURIComponent(lagnaPlanet?.signNameEn || '')}+Lagna+Temple`,
      opening_hours: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
      auspicious_day_ta: 'லக்னாதிபதி கிழமை & ஞாயிற்றுக்கிழமை',
      auspicious_day_en: 'Ascendant Lord Day & Sundays',
      related_planet: lagnaPlanet?.lord,
      worship_method_ta: 'லக்ன அதிபதி சந்நிதியில் தீபமேற்றி அர்ச்சனை செய்து தானம் அளித்தல்.',
      worship_method_en: 'Offering Archana and lamps at the Ascendant Lord sanctum.',
      mantra: 'Om Lagna Devataya Namaha',
      offerings: 'Ghee lamps, Silk Cloth, Fruits',
      description_ta: `${lagnaPlanet?.signNameTa} லக்னத்தில் பிறந்தவர்கள் இத்தலத்தில் வழிபட ஆளுமைத் திறன், உடல் ஆரோக்கியம் மற்றும் காரிய வெற்றி உண்டாகும்.`,
      description_en: `${lagnaPlanet?.signNameEn} Lagna natives praying here solidify executive stature and overall fortune.`,
      source: 'Navagraha Sthala Mahatmyam',
    });
  }

  // 3. DYNAMIC TITHI TEMPLE (Exact classical temple from 30 Tithis Master Database)
  const tithiTemple = TITHI_TEMPLES_DB[panchanga.tithiIndex];
  if (tithiTemple) {
    addRemedy(tithiTemple);
  }

  // 4. DYNAMIC KARANA TEMPLE (Exact classical temple from 11 Karanas Master Database)
  const karanaTemple = getKaranaTempleRemedy(panchanga.karanaEn, panchanga.karanaTa);
  if (karanaTemple) {
    addRemedy(karanaTemple);
  }

  // 5. DYNAMIC NITYA YOGA TEMPLE (Exact Yogi temple from 27 Yogas Master Database)
  const yogaTemple = getYogaTempleRemedy(panchanga.yogaIndex, panchanga.yogaEn, panchanga.yogaTa);
  if (yogaTemple) {
    addRemedy(yogaTemple);
  }

  // 5. DYNAMIC DASA LORD TEMPLE (Active Vimshottari Dasa)
  const currentDasa = dasaPeriods.find((d) => d.isCurrent) || dasaPeriods[0];
  if (currentDasa) {
    const dasaPlanet = currentDasa.planet;
    if (dasaPlanet === 'Saturn') {
      const thirunallar = TEMPLE_REMEDIES_DATABASE.find((t) => t.id === 'TPL-DOSHA-002');
      if (thirunallar) addRemedy(thirunallar);
    } else if (dasaPlanet === 'Rahu') {
      const rahuTpl = TEMPLE_REMEDIES_DATABASE.find((t) => t.id === 'TPL-RAHU-001');
      if (rahuTpl) addRemedy(rahuTpl);
    } else if (dasaPlanet === 'Ketu') {
      const ketuTpl = TEMPLE_REMEDIES_DATABASE.find((t) => t.id === 'TPL-KETU-001');
      if (ketuTpl) addRemedy(ketuTpl);
    } else {
      addRemedy({
        id: `TPL-DASA-DYN-${dasaPlanet}`,
        category: 'Dasa',
        sub_category: `${dasaPlanet} Dasa Active (${currentDasa.planetTa} தசை)`,
        condition: `Current Active Dasa is ${currentDasa.planetTa} (${currentDasa.durationYears} Years)`,
        temple_name: `Sri Suryanar Kovil / ${dasaPlanet} Navagraha Sthalam`,
        deity: `Lord Shiva & ${currentDasa.planetTa} Bhagavan`,
        district: 'Thanjavur',
        state: 'Tamil Nadu',
        latitude: 11.0120,
        longitude: 79.4310,
        google_map_url: `https://maps.google.com/?q=${encodeURIComponent(dasaPlanet)}+Temple+Tamilnadu`,
        opening_hours: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
        auspicious_day_ta: `${currentDasa.planetTa} கிழமை (Dasa Lord Day)`,
        auspicious_day_en: `${dasaPlanet} Days`,
        related_planet: dasaPlanet,
        worship_method_ta: `${currentDasa.planetTa} தசை காலத்தில் கிரக சந்நிதியில் தீபமேற்றி அர்ச்சனை செய்து வழிபட தசா பலன் பெருகும்.`,
        worship_method_en: `Worshipping ${dasaPlanet} Bhagavan sanctum during active Dasa period maximizes positive period returns.`,
        mantra: `Om ${dasaPlanet} Devataya Namaha`,
        offerings: 'Ghee lamps, Specific Grain, Flowers',
        description_ta: `தற்போது நடக்கும் ${currentDasa.planetTa} தசையில் இத்தலத்தில் வழிபட யோக பலன்கள் அதிகரிக்கும்.`,
        description_en: `Worshipping at ${dasaPlanet} Sthalam during current Dasa enhances overall planetary fortune.`,
        source: 'Navagraha Dasa Sthala Puranam',
      });
    }
  }

  // 6. DOSHA TEMPLES (Sevvai Dosha / Rahu-Ketu Sarpadosha)
  const mars = planets.find((p) => p.name === 'Mars');
  if (mars && [1, 2, 4, 7, 8, 12].includes(mars.house)) {
    const chevvaiTpl = TEMPLE_REMEDIES_DATABASE.find((t) => t.id === 'TPL-DOSHA-001');
    if (chevvaiTpl) addRemedy(chevvaiTpl);
  }

  const rahu = planets.find((p) => p.name === 'Rahu');
  if (rahu && [1, 2, 7, 8].includes(rahu.house)) {
    const rahuTpl = TEMPLE_REMEDIES_DATABASE.find((t) => t.id === 'TPL-RAHU-001');
    if (rahuTpl) addRemedy(rahuTpl);
  }

  if (matchedRemedies.length < 4) {
    TEMPLE_REMEDIES_DATABASE.forEach((t) => {
      if (matchedRemedies.length < 6) addRemedy(t);
    });
  }

  return matchedRemedies;
}
