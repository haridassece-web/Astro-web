import type { VivahaChakraAnalysis, VivahaChakraBox, VivahaChakraProhibition } from '../types/astrology';
import { NAKSHATRAS } from '../data/constants';

// Direction metadata according to 6 Handwritten Manuscript Pages
const VIVAHA_BOX_CONFIG: {
  id: number;
  directionEn: VivahaChakraBox['directionEn'];
  directionTa: VivahaChakraBox['directionTa'];
  gridRow: number;
  gridCol: number;
  status: 'auspicious' | 'inauspicious';
  predictionTa: string;
  predictionEn: string;
}[] = [
  {
    id: 1,
    directionEn: 'Center',
    directionTa: 'நடு',
    gridRow: 2,
    gridCol: 2,
    status: 'inauspicious',
    predictionTa: 'வளர்ச்சி குறைவு, மன வேதனை, கடுமையான சோதனைகள் ஏற்படும், தம்பதிகளிடையே பிரிவினை உண்டாக்கும் (தவிர்க்கவும்).',
    predictionEn: 'Growth reduction, agony, testing period, causes marital friction & separation (Avoid).',
  },
  {
    id: 2,
    directionEn: 'East',
    directionTa: 'கிழக்கு',
    gridRow: 2,
    gridCol: 3,
    status: 'auspicious',
    predictionTa: 'லக்ஷ்மி கடாட்சம், தெளிவான சுப பலன்கள், குடும்பத்தில் செல்வமும் மன அமைதியும் பெருகும் (மிகச் சிறப்பு).',
    predictionEn: 'Lakshmi Kataksham, supreme mental clarity, immense prosperity & divine peace (Highly Auspicious).',
  },
  {
    id: 3,
    directionEn: 'South-East',
    directionTa: 'தென்கிழக்கு',
    gridRow: 3,
    gridCol: 3,
    status: 'inauspicious',
    predictionTa: 'வறுமை, கடுமையான கஷ்டங்கள், கடன் சுமை அதிகரிக்கும், நற்பெயரும் புகழும் கெட்டுப்போகும் (தவிர்க்கவும்).',
    predictionEn: 'Poverty, acute hardships, mounting debts, damage to reputation & honor (Avoid).',
  },
  {
    id: 4,
    directionEn: 'South',
    directionTa: 'தெற்கு',
    gridRow: 3,
    gridCol: 2,
    status: 'inauspicious',
    predictionTa: 'மரண பயம், தீ விபத்துக்கள், கடுமையான விபத்துக்கள் மற்றும் பெரும் இழப்புகள் ஏற்படும் (தவிர்க்கவும்).',
    predictionEn: 'Fear of mortality, fire accidents, severe hazards & destructive losses (Avoid).',
  },
  {
    id: 5,
    directionEn: 'South-West',
    directionTa: 'தென்மேற்கு',
    gridRow: 3,
    gridCol: 1,
    status: 'auspicious',
    predictionTa: 'சர்வ சௌக்கியம், பூரண ஆரோக்கியம், அனைத்து வசதிகளும் யோகங்களும் பெருகும் (மிகச் சிறப்பு).',
    predictionEn: 'Sarva Soukhyam, complete health, physical comfort & divine luxury (Highly Auspicious).',
  },
  {
    id: 6,
    directionEn: 'West',
    directionTa: 'மேற்கு',
    gridRow: 2,
    gridCol: 1,
    status: 'inauspicious',
    predictionTa: 'அவமானம், பங்கம், மனதில் தீராத பயம், காரியத் தடைகள் ஏற்படும் (தவிர்க்கவும்).',
    predictionEn: 'Humiliation, dishonor, mental paranoia & severe functional blockages (Avoid).',
  },
  {
    id: 7,
    directionEn: 'North-West',
    directionTa: 'வடமேற்கு',
    gridRow: 1,
    gridCol: 1,
    status: 'inauspicious',
    predictionTa: 'வளர்ச்சித் தடை, தம்பதிகள் பிரிந்து வாழ்தல், வீட்டை விட்டு ஓடிப் போதல் போன்ற சோதனைகள் (தவிர்க்கவும்).',
    predictionEn: 'Stunted growth, spouse living apart, risk of elopement & emotional distance (Avoid).',
  },
  {
    id: 8,
    directionEn: 'North',
    directionTa: 'வடக்கு',
    gridRow: 1,
    gridCol: 2,
    status: 'auspicious',
    predictionTa: 'சர்வ சௌக்கியம், தொழில் மற்றும் வியாபாரத்தில் அனைத்து விதமான லாபங்களும் யோகமும் (மிகச் சிறப்பு).',
    predictionEn: 'Sarva Soukhyam, massive gains in business, career advancement & prosperity (Highly Auspicious).',
  },
  {
    id: 9,
    directionEn: 'North-East',
    directionTa: 'வடகிழக்கு',
    gridRow: 1,
    gridCol: 3,
    status: 'auspicious',
    predictionTa: 'சர்வ சௌக்கியம், மகா வெற்றி, மிகப்பெரிய பொருளாதார வளர்ச்சி, தம்பதி இணைந்து முன்னேறுதல், சுப கல்யாணம் மற்றும் சந்தான பாக்கியம் (உன்னத யோகம்).',
    predictionEn: 'Sarva Soukhyam, supreme victory, extraordinary financial elevation, joyous wedding & progeny blessings (Utmost Divine Blessing).',
  },
];

/**
 * Calculate Vivaha Chakra (விவாக சக்கரம்) Analysis based on Transit Sun Nakshatra & Candidate Star
 * @param sunNakshatraIdx 0 to 26 (Index of Sun's Nakshatra on target/transit day)
 * @param candidateNakshatraIdx 0 to 26 (Index of Candidate/Event/Birth Nakshatra)
 */
export function calculateVivahaChakra(
  sunNakshatraIdx: number = 22, // Default: Dhanishta / Avittam (#23 in 1-based, index 22)
  candidateNakshatraIdx: number = 13 // Default: Chitra / Chittirai (#14 in 1-based, index 13)
): VivahaChakraAnalysis {
  const safeSunIdx = Math.max(0, Math.min(26, Math.floor(sunNakshatraIdx)));
  const safeCandIdx = Math.max(0, Math.min(26, Math.floor(candidateNakshatraIdx)));

  const sunStar = NAKSHATRAS[safeSunIdx];
  const candStar = NAKSHATRAS[safeCandIdx];

  const boxes: VivahaChakraBox[] = VIVAHA_BOX_CONFIG.map((cfg) => {
    let nakIndices: number[] = [];

    if (cfg.id === 1) {
      // Center (Box 1): [Sun - 1, Sun, Sun + 1]
      nakIndices = [
        (safeSunIdx - 1 + 27) % 27,
        safeSunIdx,
        (safeSunIdx + 1) % 27,
      ];
    } else {
      // Boxes 2 to 9: Each gets 3 sequential stars starting after Box 1's last star
      // Box 2 starts at safeSunIdx + 2
      const offset = 2 + (cfg.id - 2) * 3;
      nakIndices = [
        (safeSunIdx + offset) % 27,
        (safeSunIdx + offset + 1) % 27,
        (safeSunIdx + offset + 2) % 27,
      ];
    }

    const naksTa = nakIndices.map((idx) => NAKSHATRAS[idx].nameTa);
    const naksEn = nakIndices.map((idx) => NAKSHATRAS[idx].nameEn);

    return {
      ...cfg,
      nakshatraIndices: nakIndices,
      nakshatrasTa: naksTa,
      nakshatrasEn: naksEn,
    };
  });

  // Find candidate box
  const candidateBox = boxes.find((b) => b.nakshatraIndices.includes(safeCandIdx)) || boxes[0];

  // Inclusive count from Sun Star to Candidate Star (1 to 27)
  const starDistance = ((safeCandIdx - safeSunIdx + 27) % 27) + 1;

  // Gaja Yoga Event Prohibitions (Page 1 manuscript rule)
  const eventProhibitions: VivahaChakraProhibition[] = [
    {
      targetEvent: 'marriage',
      starCount: 3,
      isProhibited: starDistance === 3,
      titleTa: 'திருமண முகூர்த்தத் தடை (3-வது நட்சத்திர விதி)',
      titleEn: 'Marriage Muhurtha Prohibition (3rd Star Rule)',
      descriptionTa:
        'சூரியன் நின்ற நட்சத்திரத்தில் இருந்து எண்ணி 3-வது நட்சத்திரமாக வருவதால் இந்த நாளில் திருமணம் செய்யக்கூடாது! தம்பதிகளிடையே கருத்து வேறுபாடும் பிரிவும் உண்டாகும்.',
      descriptionEn:
        'Counting 3rd star from Sun Nakshatra strictly prohibits marriage! Causes marital discord and emotional separation.',
    },
    {
      targetEvent: 'valaikaappu',
      starCount: 4,
      isProhibited: starDistance === 4,
      titleTa: 'வளைகாப்புச் சடங்குத் தடை (4-வது நட்சத்திர விதி)',
      titleEn: 'Valaikaappu Bangle Ceremony Prohibition (4th Star Rule)',
      descriptionTa:
        'சூரியன் நின்ற நட்சத்திரத்தில் இருந்து 4-வது நட்சத்திரமாக வருவதால் கர்ப்பிணி பெண்களுக்கு வளைகாப்பு / சீமந்தம் செய்யக்கூடாது.',
      descriptionEn:
        '4th star from Sun Nakshatra strictly prohibits baby shower / Valaikaappu / Seemantham ceremonies.',
    },
    {
      targetEvent: 'grihapravesam',
      starCount: 5,
      isProhibited: starDistance === 5,
      titleTa: 'கிரஹப்பிரவேசத் தடை (5-வது நட்சத்திர விதி)',
      titleEn: 'Grihapravesam Housewarming Prohibition (5th Star Rule)',
      descriptionTa:
        'சூரியன் நின்ற நட்சத்திரத்தில் இருந்து 5-வது நட்சத்திரமாக வருவதால் புதுமனை புகுவிழா / கிரகப்பிரவேசம் செய்யக்கூடாது.',
      descriptionEn:
        '5th star from Sun Nakshatra prohibits housewarming / Grihapravesam inaugurations.',
    },
    {
      targetEvent: 'upanayanam',
      starCount: 9,
      isProhibited: starDistance === 9,
      titleTa: 'உபநயன பூநூல் சடங்குத் தடை (9-வது நட்சத்திர விதி)',
      titleEn: 'Upanayanam Thread Ceremony Prohibition (9th Star Rule)',
      descriptionTa:
        'சூரியன் நின்ற நட்சத்திரத்தில் இருந்து 9-வது நட்சத்திரமாக வருவதால் முதன்முதலில் உபநயனம் / பூநூல் அணியக்கூடாது.',
      descriptionEn:
        '9th star from Sun Nakshatra prohibits first-time Upanayanam sacred thread ceremony.',
    },
  ];

  const isCandidateAuspicious = candidateBox.status === 'auspicious';
  
  // Calculate compatibility score (0 to 100)
  let score = isCandidateAuspicious ? 85 : 30;
  if (starDistance === 3 || starDistance === 4 || starDistance === 5 || starDistance === 9) {
    score = Math.max(10, score - 35);
  }

  const summaryTa = isCandidateAuspicious
    ? `நட்சத்திரம் "${candStar.nameTa}" விவாக சக்கரத்தில் "${candidateBox.directionTa}" (${candidateBox.directionEn}) திசையில் நல்வகை (✓) கட்டத்தில் அமைந்துள்ளது. சுபகாரியத்திற்கு உகந்தது.`
    : `நட்சத்திரம் "${candStar.nameTa}" விவாக சக்கரத்தில் "${candidateBox.directionTa}" (${candidateBox.directionEn}) திசையில் தவிர்க்கப்படவேண்டிய (X) கட்டத்தில் அமைந்துள்ளது. சுபகாரியங்களைத் தவிர்க்கவும்.`;

  const summaryEn = isCandidateAuspicious
    ? `Star "${candStar.nameEn}" is situated in the Auspicious (✓) "${candidateBox.directionEn}" direction box of Vivaha Chakra. Favorable for ceremonies.`
    : `Star "${candStar.nameEn}" falls in the Inauspicious (X) "${candidateBox.directionEn}" direction box of Vivaha Chakra. Ceremonies should be avoided.`;

  return {
    sunNakshatraIndex: safeSunIdx,
    sunNakshatraTa: sunStar.nameTa,
    sunNakshatraEn: sunStar.nameEn,
    boxes,
    candidateNakshatraIndex: safeCandIdx,
    candidateNakshatraTa: candStar.nameTa,
    candidateNakshatraEn: candStar.nameEn,
    candidateBox,
    starDistance,
    eventProhibitions,
    isCandidateAuspicious,
    score,
    summaryTa,
    summaryEn,
  };
}
