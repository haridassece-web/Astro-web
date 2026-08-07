import type { PlanetPosition, DomainPrediction, Remedy } from '../types/astrology';

export function generateDomainPredictions(planets: PlanetPosition[]): DomainPrediction[] {
  const mercury = planets.find((p) => p.name === 'Mercury')!;
  const jupiter = planets.find((p) => p.name === 'Jupiter')!;
  const sun = planets.find((p) => p.name === 'Sun')!;
  const mars = planets.find((p) => p.name === 'Mars')!;
  const venus = planets.find((p) => p.name === 'Venus')!;
  const saturn = planets.find((p) => p.name === 'Saturn')!;
  const rahu = planets.find((p) => p.name === 'Rahu')!;

  const predictions: DomainPrediction[] = [
    // 1. Education
    {
      domainKey: 'education',
      domainEn: 'Education & Intellect',
      domainTa: 'கல்வி & அறிவுத்திறன்',
      iconName: 'GraduationCap',
      rating: mercury.dignityEn === 'Debilitated' ? 3 : 5,
      strengthScore: mercury.house === 5 || jupiter.house === 5 ? 92 : 82,
      summaryEn: 'Strong intellectual capacity, excellent memory, and aptitude for higher studies.',
      summaryTa: 'சிறந்த நினைவாற்றல், கூர்மையான அறிவு மற்றும் உயர்கல்வியில் சாதனை படைக்கும் அமைப்புகள் உள்ளன.',
      detailsEn: [
        `5th House indicators and Mercury placement in ${mercury.signNameEn} show high analytical thinking.`,
        `Jupiter aspecting learning houses promises wisdom, academic degrees, and competitive exam success.`,
        `Favorable periods of Mercury/Jupiter will bring scholarly accolades and research opportunities.`,
      ],
      detailsTa: [
        `புதன் பகவான் ${mercury.signNameTa} ராசியில் அமைந்து கூர்மையான பகுப்பாய்வு திறனை வழங்குகிறார்.`,
        `குருவின் சுபப் பார்வை கல்வி ஸ்தானத்தில் விழுவதால் உயர்கல்வி பட்டங்கள் மற்றும் போட்டித் தேர்வுகளில் வெற்றி பெறலாம்.`,
        `புதன்/குரு தசைக் காலங்களில் கல்வி விருதுகள் மற்றும் ஆராய்ச்சித் துறையில் மேன்மை உண்டாகும்.`,
      ],
    },
    // 2. Career & Business
    {
      domainKey: 'career',
      domainEn: 'Career & Profession',
      domainTa: 'வேலை & தொழில் வளர்ச்சி',
      iconName: 'Briefcase',
      rating: saturn.dignityEn === 'Debilitated' ? 3 : 5,
      strengthScore: saturn.house === 10 || sun.house === 10 ? 95 : 88,
      summaryEn: 'High leadership potential, administrative authority, and executive career growth.',
      summaryTa: 'தலைமைப் பொறுப்புகள், அரசு அல்லது பெருநிறுவனங்களில் உயர் பதவிகள் வகிக்கும் மேன்மையான யோகம்.',
      detailsEn: [
        `10th house associated with ${saturn.signNameEn} denotes steady career progression, endurance, and public authority.`,
        `Sun and Mars placement guarantees decision-making power and managerial respect.`,
        `Self-directed business or corporate leadership will yield massive prosperity after age 30.`,
      ],
      detailsTa: [
        `10-ஆம் தொழில் ஸ்தானத்தில் உள்ள கிரக அமைப்புகள் நிலையான வளர்ச்சி மற்றும் அதிகாரப் பதவிகளைத் தரும்.`,
        `சூரியன் மற்றும் செவ்வாயின் யோகப் பலத்தால் நிர்வாக முடிவுகள் எடுப்பதில் திறமை வெளிப்படும்.`,
        `30 வயதிற்கு மேல் சுய தொழில் அல்லது கார்ப்பரேட் துறையில் பிரம்மாண்டமான வளர்ச்சி சாத்தியம்.`,
      ],
    },
    // 3. Finance & Wealth
    {
      domainKey: 'finance',
      domainEn: 'Finance & Wealth',
      domainTa: 'தனம் & நிதி வளம்',
      iconName: 'Coins',
      rating: 5,
      strengthScore: 90,
      summaryEn: 'Multiple streams of income, steady capital accumulation, and strong financial stability.',
      summaryTa: 'பல வழிகளில் பணவரவு, சிறப்பான சேமிப்பு மற்றும் நிலையான தன வளம் கூடும்.',
      detailsEn: [
        `2nd house lord and 11th house gains indicate solid assets and prudent investments.`,
        `Chandra Mangala and Jupiter connections foster lucrative business deals and financial foresight.`,
      ],
      detailsTa: [
        `2-ஆம் இடத்து தன அதிபதியும் 11-ஆம் இடத்து லாப அதிபதியும் சுப பலம் பெற்றுள்ளதால் நிதி ஸ்திரத்தன்மை இருக்கும்.`,
        `குரு மற்றும் சந்திரனின் சுப இணைவு ரியல் எஸ்டேட் மற்றும் முதலீடுகளில் பெரும் லாபம் தரும்.`,
      ],
    },
    // 4. Marriage & Relationship
    {
      domainKey: 'marriage',
      domainEn: 'Marriage & Married Life',
      domainTa: 'திருமணம் & குடும்ப வாழ்க்கை',
      iconName: 'Heart',
      rating: venus.dignityEn === 'Debilitated' ? 3 : 4,
      strengthScore: venus.house === 7 ? 92 : 80,
      summaryEn: 'Harmonious relationship, supportive spouse with good cultural heritage, and family happiness.',
      summaryTa: 'அன்பான துணைவர், சுமுகமான குடும்ப உறவுகள் மற்றும் குடும்ப மகிழ்ச்சி பெருகும்.',
      detailsEn: [
        `7th house and Venus placement in ${venus.signNameEn} promise an understanding and educated partner.`,
        `Mutual respect and shared values will create enduring martial bliss.`,
      ],
      detailsTa: [
        `7-ஆம் இடத்து சுக்கிரன் மற்றும் சுப கிரக சேர்க்கை நல்ல பண்புள்ள வாழ்க்கைத்துணையைத் தரும்.`,
        `பரஸ்பர அன்பும் புரிதலும் குடும்ப வாழ்க்கையில் மகிழ்ச்சியையும் அமைதியையும் தக்கவைக்கும்.`,
      ],
    },
    // 5. Children & Progeny
    {
      domainKey: 'children',
      domainEn: 'Children & Progeny',
      domainTa: 'சந்தான பாக்கியம் (குழந்தைகள்)',
      iconName: 'Baby',
      rating: 5,
      strengthScore: 89,
      summaryEn: 'Blessed with dutiful, intelligent, and successful children who bring pride to the family.',
      summaryTa: 'அறிவும் நற்பண்புகளும் கொண்ட குழந்தைகள் அமைந்து குடும்பத்திற்கு பெருமை சேர்ப்பார்கள்.',
      detailsEn: [
        `Jupiter (Putrakaraka) in strong Dignity promises brilliant offspring and family lineage continuity.`,
        `D7 Saptamsa chart reflects high achievements for children in academics and arts.`,
      ],
      detailsTa: [
        `புத்திரகாரகன் குரு பகவானின் பூரண அருள் குழந்தைகளால் பெருமையும் நற்பெயரும் கிடைக்கச் செய்யும்.`,
        `D7 சப்தாம்ச சக்கர அமைப்புகள் குழந்தைகளின் கல்வி மற்றும் கலை சாதனைகளை உறுதிசெய்கின்றன.`,
      ],
    },
    // 6. Health & Vitality
    {
      domainKey: 'health',
      domainEn: 'Health & Energy',
      domainTa: 'ஆரோக்கியம் & நல்வாழ்வு',
      iconName: 'Activity',
      rating: 4,
      strengthScore: 82,
      summaryEn: 'Good physical stamina and vitality. Vital organs are protected with strong immunity.',
      summaryTa: 'நல்ல உடல் ஆற்றல் மற்றும் நோய் எதிர்ப்புச் சக்தி. சீரான உணவுமுறை ஆரோக்கியத்தை மேம்படுத்தும்.',
      detailsEn: [
        `Lagna lord strength bestows general immunity against chronic ailments.`,
        `Balanced diet and regular yoga/exercise will keep digestion and cardio health optimal.`,
      ],
      detailsTa: [
        `லக்னாதிபதியின் வலிமை உடலுக்கு இயல்பான நோய் எதிர்ப்புத் திறனை அளிக்கிறது.`,
        `மிதமான உணவுப் பழக்கம் மற்றும் யோகாசனங்கள் மூலம் நீண்ட ஆரோக்கியமான வாழ்வைப் பெறலாம்.`,
      ],
    },
    // 7. Foreign Travel
    {
      domainKey: 'foreign',
      domainEn: 'Foreign Travel & Settlement',
      domainTa: 'வெளிநாட்டு யோகம் & வாழ்வு',
      iconName: 'Globe',
      rating: rahu.house === 9 || rahu.house === 12 ? 5 : 4,
      strengthScore: 86,
      summaryEn: 'Prospects for overseas education, international career assignments, and cross-border gains.',
      summaryTa: 'வெளிநாட்டு பயணம், கல்வி அல்லது சர்வதேச நிறுவனங்களில் பணியாற்றிப் பெரும் பொருள் ஈட்டும் யோகம்.',
      detailsEn: [
        `9th and 12th house connections involving Rahu/Moon favor overseas residence and multicultural success.`,
        `Mundane travel for trade or tech consulting will bring recognition.`,
      ],
      detailsTa: [
        `9 மற்றும் 12-ஆம் இடத்து ராகு/சந்திர கிரக அமைப்புகள் வெளிநாட்டு பிரயாணங்கள் மற்றும் வசிப்பிடத்தை அனுகூலமாக்கும்.`,
        `சர்வதேச அளவில் தொழில் புரிவோருக்கு புதிய வாய்ப்புகளும் பெரும் புகழும் கிட்டும்.`,
      ],
    },
    // 8. Property & Vehicles
    {
      domainKey: 'property',
      domainEn: 'Assets, Property & Vehicles',
      domainTa: 'நிலம், வீடு & வாகன யோகம்',
      iconName: 'Home',
      rating: mars.house === 4 || venus.house === 4 ? 5 : 4,
      strengthScore: 91,
      summaryEn: 'Acquisition of residential real estate, luxury vehicles, and landed ancestral assets.',
      summaryTa: 'சொந்த வீடு, ரியல் எஸ்டேட் நிலங்கள் மற்றும் ஆடம்பர வாகனங்கள் வாங்கும் சுப யோகம்.',
      detailsEn: [
        `4th house indicators supported by Mars (Bhumi karaka) and Venus (Vehicle karaka) bring property expansion.`,
        `Construction of dream home or acquisition of prime commercial land is highlighted.`,
      ],
      detailsTa: [
        `4-ஆம் இடத்து செவ்வாய் மற்றும் சுக்கிரன் சேர்க்கை சொந்த மனை, வீடு மற்றும் புதிய வாகனம் வாங்கும் பாக்கியம் தரும்.`,
        `கட்டிட நிர்மாணம் மற்றும் ரியல் எஸ்டேட் தொழிலில் லாபகரமான முதலீடுகள் செய்யலாம்.`,
      ],
    },
    // 9. Spirituality
    {
      domainKey: 'spirituality',
      domainEn: 'Spirituality & Higher Truths',
      domainTa: 'ஆன்மீகம் & ஆத்ம ஞானம்',
      iconName: 'Sparkles',
      rating: jupiter.house === 9 || saturn.house === 9 ? 5 : 4,
      strengthScore: 88,
      summaryEn: 'Inclination towards ancient wisdom, temple pilgrimages, meditation, and inner peace.',
      summaryTa: 'தெய்வீக நம்பிக்கை, ஆன்மீக யாத்திரைகள், தியானம் மற்றும் ஆத்ம திருப்தி வாய்க்கும்.',
      detailsEn: [
        `9th Lord in strength fosters profound faith, respect for elders, and spiritual sadhana.`,
        `Ketu influence brings intuitive perception and interest in esoteric sciences.`,
      ],
      detailsTa: [
        `9-ஆம் இடத்து பாக்கிய சுப கிரகங்கள் ஆன்மீக நூல்களைப் படித்தல் மற்றும் திருப்பணிகளில் ஈடுபட வைக்கும்.`,
        `கேது பகவானின் அருள் உள்ளுணர்வை அதிகரித்து ஆன்மீகத் தெளிவைத் தரும்.`,
      ],
    },
    // 10. Longevity & Overall Fortune
    {
      domainKey: 'longevity',
      domainEn: 'Longevity & General Fortune',
      domainTa: 'ஆயுள் பாக்கியம் & பொது அதிர்ஷ்டம்',
      iconName: 'ShieldCheck',
      rating: 5,
      strengthScore: 93,
      summaryEn: 'Long life span (Dirghayu), protection during crises, and continuous grace of destiny.',
      summaryTa: 'நீண்ட ஆயுள் பாக்கியம் (தீர்க்காயுசு), விபத்துகளில் இருந்து காக்கும் யோகம் மற்றும் தெய்வீக அருள்.',
      detailsEn: [
        `Saturn (Ayushkaraka) in strong Dignity combined with 8th house benefic aspects guarantees long life.`,
        `Protection from sudden calamities and smooth peaceful golden years.`,
      ],
      detailsTa: [
        `ஆயுள்காரகன் சனி பகவான் சுப ஸ்தானத்தில் அமர்ந்துள்ளதால் தீர்க்காயுசு யோகம் உண்டாகும்.`,
        `திடீர் இக்கட்டுகளில் இருந்து தெய்வீகக் காவல் தற்காக்கும்.`,
      ],
    },
  ];

  return predictions;
}

export function generateRemedies(): Remedy[] {
  return [
    {
      titleEn: 'Worship of Lord Shiva & Abhishekam',
      titleTa: 'சிவபெருமான் வழிபாடு & ருத்ர அபிஷேகம்',
      categoryEn: 'Temple',
      categoryTa: 'கோயில் வழிபாடு',
      descriptionEn: 'Perform Somavara (Monday) Shiva Puja and chant Om Namah Shivaya 108 times for mental clarity and peace.',
      descriptionTa: 'திங்கட்கிழமைகளில் சிவபெருமானுக்கு பால் அபிஷேகம் செய்து, "ஓம் நமசிவாய" மந்திரத்தை 108 முறை ஜபிக்கவும்.',
    },
    {
      titleEn: 'Chanting Kanakadhara Stotram',
      titleTa: 'கனகதாரா ஸ்தோத்திரம் பாராயணம்',
      categoryEn: 'Mantra',
      categoryTa: 'மந்திரம்',
      descriptionEn: 'Recite Kanakadhara Stotram on Fridays to enhance Venusian wealth blessings and business prosperity.',
      descriptionTa: 'வெள்ளிக்கிழமைகளில் மகாலட்சுமி தாயாருக்கு நெய்தீபம் ஏற்றி கனகதாரா ஸ்தோத்திரம் பாராயணம் செய்யவும்.',
    },
    {
      titleEn: 'Feeding Cows & Bird Charity',
      titleTa: 'கோ பூஜை & பறவைகளுக்கு தானம்',
      categoryEn: 'Charity',
      categoryTa: 'தானம்',
      descriptionEn: 'Feed green grass to cows on Wednesdays to nullify Mercury afflictions and bolster education.',
      descriptionTa: 'புதன்கிழமைகளில் பசுமாட்டிற்கு அகத்திக்கீரை அல்லது பச்சைப்பயறு தானமாக அளிப்பது புதன் தோஷம் நீக்கும்.',
    },
    {
      titleEn: 'Yellow Sapphire (Pushparagam) Gemstone',
      titleTa: 'மஞ்சள் புஷ்பராக ரத்தினக் கல் அணிதல்',
      categoryEn: 'Gemstone',
      categoryTa: 'ரத்தினக் கல்',
      descriptionEn: 'Wear a 5-carat unheated Yellow Sapphire in gold ring on index finger on Thursday morning.',
      descriptionTa: 'வியாழக்கிழமை காலையில் தங்க மோதிரத்தில் சுத்தமான மஞ்சள் புஷ்பராகக் கல் பதித்து ஆள்காட்டி விரலில் அணியவும்.',
    },
  ];
}
