// Master Database for Tithi Soonya & Badhaka Sthana (திதி சூன்யம் & பாதக ஸ்தானம்)
// Sourced from Authentic Tamil Palm-Leaf Shastra & Nadi Astrological Manuscripts

export interface TithiSoonyaRule {
  tithiNumber: number; // 1 to 15 (Pratipada to Purnima/Amavasya)
  nameEn: string;
  nameTa: string;
  soonyaSignIds: number[]; // 0: Aries, 1: Taurus, ... 11: Pisces
  soonyaSignsEn: string[];
  soonyaSignsTa: string[];
  notesEn: string;
  notesTa: string;
}

export const TITHI_SOONYA_MAP: Record<number, TithiSoonyaRule> = {
  1: {
    tithiNumber: 1,
    nameEn: 'Pratipada (பிரதமை)',
    nameTa: 'பிரதமை',
    soonyaSignIds: [6, 9], // Libra, Capricorn
    soonyaSignsEn: ['Libra', 'Capricorn'],
    soonyaSignsTa: ['துலாம்', 'மகரம்'],
    notesEn: 'Libra (Venus) and Capricorn (Saturn) become Soonya (energy void) signs.',
    notesTa: 'துலாம் மற்றும் மகரம் ராசிகள் திதி சூன்யம் பெறுகின்றன. சுக்கிரன், சனி ஆதிபத்தியங்கள் ஆரம்பத்தில் சோதனை தரும்.',
  },
  2: {
    tithiNumber: 2,
    nameEn: 'Dwitiya (துவிதியை)',
    nameTa: 'துவிதியை',
    soonyaSignIds: [8, 11], // Sagittarius, Pisces
    soonyaSignsEn: ['Sagittarius', 'Pisces'],
    soonyaSignsTa: ['தனுசு', 'மீனம்'],
    notesEn: 'Both houses of Jupiter (Sagittarius & Pisces) become Soonya signs.',
    notesTa: 'குருவின் வீடுகளான தனுசு மற்றும் மீனம் திதி சூன்யம் பெறுகின்றன.',
  },
  3: {
    tithiNumber: 3,
    nameEn: 'Tritiya (திரிதியை)',
    nameTa: 'திரிதியை',
    soonyaSignIds: [9, 4], // Capricorn, Leo
    soonyaSignsEn: ['Capricorn', 'Leo'],
    soonyaSignsTa: ['மகரம்', 'சிம்மம்'],
    notesEn: 'Capricorn (Saturn) and Leo (Sun) become Soonya signs.',
    notesTa: 'மகரம் (சனி) மற்றும் சிம்மம் (சூரியன்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  4: {
    tithiNumber: 4,
    nameEn: 'Chaturthi (சதுர்த்தி)',
    nameTa: 'சதுர்த்தி',
    soonyaSignIds: [1, 10], // Taurus, Aquarius
    soonyaSignsEn: ['Taurus', 'Aquarius'],
    soonyaSignsTa: ['ரிஷபம்', 'கும்பம்'],
    notesEn: 'Taurus (Venus) and Aquarius (Saturn) become Soonya signs.',
    notesTa: 'ரிஷபம் (சுக்கிரன்) மற்றும் கும்பம் (சனி) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  5: {
    tithiNumber: 5,
    nameEn: 'Panchami (பஞ்சமி)',
    nameTa: 'பஞ்சமி',
    soonyaSignIds: [2, 5], // Gemini, Virgo
    soonyaSignsEn: ['Gemini', 'Virgo'],
    soonyaSignsTa: ['மிதுனம்', 'கன்னி'],
    notesEn: 'Both houses of Mercury (Gemini & Virgo) become Soonya signs.',
    notesTa: 'புதனின் வீடுகளான மிதுனம் மற்றும் கன்னி வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  6: {
    tithiNumber: 6,
    nameEn: 'Shashti (சஷ்டி)',
    nameTa: 'சஷ்டி',
    soonyaSignIds: [0, 4], // Aries, Leo
    soonyaSignsEn: ['Aries', 'Leo'],
    soonyaSignsTa: ['மேஷம்', 'சிம்மம்'],
    notesEn: 'Aries (Mars) and Leo (Sun) become Soonya signs.',
    notesTa: 'மேஷம் (செவ்வாய்) மற்றும் சிம்மம் (சூரியன்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  7: {
    tithiNumber: 7,
    nameEn: 'Saptami (சப்தமி)',
    nameTa: 'சப்தமி',
    soonyaSignIds: [8, 3], // Sagittarius, Cancer
    soonyaSignsEn: ['Sagittarius', 'Cancer'],
    soonyaSignsTa: ['தனுசு', 'கடகம்'],
    notesEn: 'Sagittarius (Jupiter) and Cancer (Moon) become Soonya signs.',
    notesTa: 'தனுசு (குரு) மற்றும் கடகம் (சந்திரன்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  8: {
    tithiNumber: 8,
    nameEn: 'Ashtami (அஷ்டமி)',
    nameTa: 'அஷ்டமி',
    soonyaSignIds: [2, 5], // Gemini, Virgo
    soonyaSignsEn: ['Gemini', 'Virgo'],
    soonyaSignsTa: ['மிதுனம்', 'கன்னி'],
    notesEn: 'Both houses of Mercury (Gemini & Virgo) become Soonya signs.',
    notesTa: 'புதனின் வீடுகளான மிதுனம் மற்றும் கன்னி வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  9: {
    tithiNumber: 9,
    nameEn: 'Navami (நவமி)',
    nameTa: 'நவமி',
    soonyaSignIds: [4, 7], // Leo, Scorpio
    soonyaSignsEn: ['Leo', 'Scorpio'],
    soonyaSignsTa: ['சிம்மம்', 'விருச்சிகம்'],
    notesEn: 'Leo (Sun) and Scorpio (Mars) become Soonya signs.',
    notesTa: 'சிம்மம் (சூரியன்) மற்றும் விருச்சிகம் (செவ்வாய்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  10: {
    tithiNumber: 10,
    nameEn: 'Dashami (தசமி)',
    nameTa: 'தசமி',
    soonyaSignIds: [4, 7], // Leo, Scorpio
    soonyaSignsEn: ['Leo', 'Scorpio'],
    soonyaSignsTa: ['சிம்மம்', 'விருச்சிகம்'],
    notesEn: 'Leo (Sun) and Scorpio (Mars) become Soonya signs.',
    notesTa: 'சிம்மம் (சூரியன்) மற்றும் விருச்சிகம் (செவ்வாய்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  11: {
    tithiNumber: 11,
    nameEn: 'Ekadashi (ஏகாதசி)',
    nameTa: 'ஏகாதசி',
    soonyaSignIds: [8, 11], // Sagittarius, Pisces
    soonyaSignsEn: ['Sagittarius', 'Pisces'],
    soonyaSignsTa: ['தனுசு', 'மீனம்'],
    notesEn: 'Both houses of Jupiter (Sagittarius & Pisces) become Soonya signs.',
    notesTa: 'குருவின் வீடுகளான தனுசு மற்றும் மீனம் திதி சூன்யம் பெறுகின்றன.',
  },
  12: {
    tithiNumber: 12,
    nameEn: 'Dwadashi (துவாதசி)',
    nameTa: 'துவாதசி',
    soonyaSignIds: [9, 6], // Capricorn, Libra
    soonyaSignsEn: ['Capricorn', 'Libra'],
    soonyaSignsTa: ['மகரம்', 'துலாம்'],
    notesEn: 'Capricorn (Saturn) and Libra (Venus) become Soonya signs.',
    notesTa: 'மகரம் (சனி) மற்றும் துலாம் (சுக்கிரன்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  13: {
    tithiNumber: 13,
    nameEn: 'Trayodashi (திரயோதசி)',
    nameTa: 'திரயோதசி',
    soonyaSignIds: [1, 4], // Taurus, Leo
    soonyaSignsEn: ['Taurus', 'Leo'],
    soonyaSignsTa: ['ரிஷபம்', 'சிம்மம்'],
    notesEn: 'Taurus (Venus) and Leo (Sun) become Soonya signs.',
    notesTa: 'ரிஷபம் (சுக்கிரன்) மற்றும் சிம்மம் (சூரியன்) வீடுகள் திதி சூன்யம் பெறுகின்றன.',
  },
  14: {
    tithiNumber: 14,
    nameEn: 'Chaturdashi (சதுர்தசி)',
    nameTa: 'சதுர்தசி',
    soonyaSignIds: [2, 5, 8, 11], // Gemini, Virgo, Sagittarius, Pisces (All 4 dual signs!)
    soonyaSignsEn: ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'],
    soonyaSignsTa: ['மிதுனம்', 'கன்னி', 'தனுசு', 'மீனம்'],
    notesEn: 'All four Ubhaya (Dual) signs become Soonya signs (Mercurial & Jovian houses).',
    notesTa: 'நான்கு உபய ராசிகளான மிதுனம், கன்னி, தனுசு, மீனம் ஆகிய அனைத்தும் திதி சூன்யம் பெறுகின்றன.',
  },
  15: {
    tithiNumber: 15,
    nameEn: 'Purnima / Amavasya (பௌர்ணமி / அமாவாசை)',
    nameTa: 'பௌர்ணமி / அமாவாசை',
    soonyaSignIds: [],
    soonyaSignsEn: ['None (Rahu-Ketu Axis)'],
    soonyaSignsTa: ['திதி சூன்ய ராசிகள் இல்லை'],
    notesEn: 'Full Moon and New Moon do not have conventional Tithi Soonya signs; Rahu-Ketu nodal axis acts as the karmic pivot.',
    notesTa: 'பௌர்ணமி மற்றும் அமாவாசை திதிகளுக்கு மரபுப்படி திதி சூன்ய ராசிகள் இல்லை. ராகு-கேது அச்சின் வழியாக கர்மா செயல்படுகிறது.',
  },
};

// Badhaka Sthana Rule based on Lagna (Page 3)
export interface BadhakaRule {
  lagnaType: 'Chara' | 'Sthira' | 'Ubhaya';
  lagnaTypeTa: string;
  badhakaHouseNum: number; // 11, 9, or 7
  signIds: number[];
  themeEn: string;
  themeTa: string;
  karmicRootEn: string;
  karmicRootTa: string;
}

export const BADHAKA_RULES: Record<'Chara' | 'Sthira' | 'Ubhaya', BadhakaRule> = {
  Chara: {
    lagnaType: 'Chara',
    lagnaTypeTa: 'சரம் (மேஷம், கடகம், துலாம், மகரம்)',
    badhakaHouseNum: 11,
    signIds: [0, 3, 6, 9],
    themeEn: '11th House is Badhaka: Excessive ambitions, desires, elder siblings, paternal uncle issues.',
    themeTa: '11-ஆம் பாவகமே பாதக ஸ்தானம்: அதிக ஆசைகள், அபிலாஷைகள், மூத்த சகோதரர் மற்றும் சித்தப்பா மூலம் சோதனைகள்.',
    karmicRootEn: 'Periyavargal Seitha Vinai (Karmic deeds done by ancestors/elders).',
    karmicRootTa: 'பெரியவர்கள் செய்த வினை (முன்னோர்கள் செய்த கர்மவினை).',
  },
  Sthira: {
    lagnaType: 'Sthira',
    lagnaTypeTa: 'ஸ்திரம் (ரிஷபம், சிம்மம், விருச்சிகம், கும்பம்)',
    badhakaHouseNum: 9,
    signIds: [1, 4, 7, 10],
    themeEn: '9th House is Badhaka: Father, higher lineage, ancestral assets, preceptor, temple karma.',
    themeTa: '9-ஆம் பாவகமே பாதக ஸ்தானம்: தந்தை, தந்தை வழி உறவுகள், பூர்வீகம், உயர்கல்வி, குலதெய்வ விவகாரங்கள்.',
    karmicRootEn: 'Naam Seitha Vinai (Karmic deeds accumulated by self in past incarnations).',
    karmicRootTa: 'நாம் செய்த வினை (ஜாதகர் சுயமாக முற்பிறவிகளில் சேர்த்த கர்மவினை).',
  },
  Ubhaya: {
    lagnaType: 'Ubhaya',
    lagnaTypeTa: 'உபயம் (மிதுனம், கன்னி, தனுசு, மீனம்)',
    badhakaHouseNum: 7,
    signIds: [2, 5, 8, 11],
    themeEn: '7th House is Badhaka: Spouse, partnerships, open allies/enemies, marital harmony.',
    themeTa: '7-ஆம் பாவகமே பாதக ஸ்தானம்: களத்திரம் (மனைவி/கணவன்), கூட்டாளிகள், பொதுத் தொடர்பு, மணவாழ்க்கை.',
    karmicRootEn: 'Pinnaadi Ethirkaala Santhathi (Karma impacting future posterity and progeny).',
    karmicRootTa: 'பின்னாடி எதிர்கால சந்ததி (வருங்கால சந்ததியை பாதிக்கும் கர்மவினை).',
  },
};

// 12 Bhavas Detailed Shastra Predictions (Pages 7 to 15)
export interface BhavaPalangalItem {
  bhava: number;
  nameTa: string;
  nameEn: string;
  significationsTa: string;
  significationsEn: string;
  soonyaEffectTa: string[];
  soonyaEffectEn: string[];
  badhakaEffectTa: string[];
  badhakaEffectEn: string[];
  vitalWarningsTa: string[];
  vitalWarningsEn: string[];
  specialManuscriptNotesTa: string[];
  specialManuscriptNotesEn: string[];
}

export const BHAVA_PALANGAL_MASTER: Record<number, BhavaPalangalItem> = {
  1: {
    bhava: 1,
    nameTa: '1-ஆம் பாவம் (ஜென்ம லக்னம் & லக்னாதிபதி)',
    nameEn: '1st House (Lagna & Lagna Lord)',
    significationsTa: 'உடல்வாகு, உயிர், தலை, ஆளுமை, பிறப்பு வரலாறு',
    significationsEn: 'Self, Physical Vitality, Head, Character, Birth History',
    soonyaEffectTa: [
      'லக்னம் அல்லது லக்னாதிபதி திதி சூன்யத்தில் தொடர்பு கொண்டால் வாழ்க்கையின் முற்பகுதியில் மிகக் கடுமையான போராட்டங்களும் கஷ்டங்களும் ஏற்படும்.',
      'கஷ்டப் பிரசவம், தொப்புள்கொடி உடலைச் சுற்றிய நிலையில் பிறப்பது (கொடிசுத்தி பிறப்பு), அல்லது சிசேரியன் மூலம் பிறப்பது நடக்கும்.',
      'சொந்த ஊர், பூர்வீகம் மற்றும் பாரம்பரிய இரத்த உறவுகளை விட்டு பிரிந்து தூர தேசங்களில் வாழ வேண்டிய சூழல் அமையும்.',
      'லக்னாதிபதி அமர்ந்த பாவகத்தின் உறவுக்கு அல்லது ஜாதகருக்கு தலையில் அடிபடுதல், தலை சார்ந்த உபாதைகள் ஏற்படும்.',
      'ராகு தொடர்பு ஏற்பட்டால் தலைமுடி, முகம் அல்லது தோற்றத்தில் விசித்திரமான மாறுபாடுகள் மற்றும் விபரீத சிந்தனைகள் எழும்.',
    ],
    soonyaEffectEn: [
      'If Lagna or Lagna lord is connected with Tithi Soonya, the first half of life undergoes extreme struggles and hardships.',
      'Complicated labor, born with umbilical cord wrapped around the body (Kodi Suthi Pirappu), or delivery via Caesarean section.',
      'Destined to live separated from birthplace, ancestral roots, and native kinship network.',
      'Head trauma, migraine/chronic headaches, or injury to the head corresponding to the bhava where Lagna Lord sits.',
      'Rahu connection causes eccentric styling, bizarre hair/facial features, or radical thought patterns.',
    ],
    badhakaEffectTa: [
      'பாதகாதிபதி லக்னத்தில் அமர்ந்தால் ஜாதகரின் உடலுக்கும் நல்வாழ்வுக்கும் நேரடியாக பாதிப்பு அல்லது தொடர் தடைகளை ஏற்படுத்துவார்.',
      'தன்னம்பிக்கை குறைவு, சரியான நேரத்தில் சரியான முடிவுகளை எடுக்க இயலாமை, முடிவெடுக்கும் போது தடுமாற்றம் உண்டாகும்.',
      'உடல் ஆரோக்கியத்தில் மருத்துவர்களால் எளிதில் கண்டறிய முடியாத மர்ம நோய்கள் அல்லது நரம்புத் தளர்ச்சி தோன்றும்.',
    ],
    badhakaEffectEn: [
      'When Badhakadhipati sits in Lagna, it creates direct bodily setbacks and persistent hurdles to the native’s vitality.',
      'Erosion of self-confidence, hesitation at crucial junctures, and difficulty executing firm life decisions.',
      'Susceptibility to mysterious ailments or nervous debility that are difficult for doctors to diagnose quickly.',
    ],
    vitalWarningsTa: [
      'லக்னம்/லக்னாதிபதிக்கு 6-ஆம் அதிபதி தொடர்பு ஏற்பட்டால் கடன், எதிரி, தீராத நோய் மற்றும் வேலைவாய்ப்பின்மையால் கடன் சுமை உண்டாகும்; நீதிமன்ற வழக்குகள் அல்லது விபத்துகளில் எச்சரிக்கை தேவை.',
      '12-ஆம் அதிபதி அல்லது புதன் தொடர்பு கொண்டால் தாய்மாமன் ஒருமுறையாவது காணாமல் போவார்; செவ்வாய் தொடர்பு கொண்டால் உடன் பிறந்த சகோதரன் காணாமல் போவார்.',
      'நீர் ராசி சம்பந்தப்பட்டால் பேச்சுத் திறன் பாதிப்பு (ஊமையாகுதல்/திக்குவாய்) ஏற்படலாம்.',
    ],
    vitalWarningsEn: [
      '6th lord association brings debt, litigations, unemployment-induced borrowing, or accidents; caution needed.',
      '12th lord with Mercury can cause maternal uncle to go missing at least once; with Mars, brother may go missing.',
      'Connection to watery signs can bring speech impediments or muteness in childhood.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி விதி: "லக்னம் திதி சூன்யத்தில் அமைந்து விட்டால் முற்பகுதியில் அனுபவிக்க மாட்டார்; ஆனால் பிற்பகுதியில் வியத்தகு செல்வாக்கு பெறுவார்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript dictum: "If Lagna falls in Soonya, early life is devoid of worldly enjoyment, but tremendous elevation manifests in later years."',
    ],
  },
  2: {
    bhava: 2,
    nameTa: '2-ஆம் பாவம் (தனம், வாக்கு, குடும்பம்)',
    nameEn: '2nd House (Dhana, Vak, Family)',
    significationsTa: 'பொருளாதாரம், குடும்ப வாழ்க்கை, கண் பார்வை, வாக்கு நாணயம்',
    significationsEn: 'Wealth Accumulation, Family Life, Eyesight, Speech & Integrity',
    soonyaEffectTa: [
      'பொருளாதார நிலைத்தன்மை அமைய மிகவும் தாமதமாகும்; இளமையில் வருமானம் வந்தாலும் சேமிக்க முடியாமல் கரையும்.',
      'குடும்பத்தில் அமைதியின்மை, கருத்து வேறுபாடுகள், பெரியம்மாவின் மணவாழ்க்கை கடுமையான சோதனைகளுக்கு ஆளாகும்.',
      'இதில் புதன் பலம் குறைந்தால் கொடுத்த வாக்கை காப்பாற்ற முடியாமல் போகும்; வாக்கு நாணயத்தில் அவப்பெயர் ஏற்படும்.',
      'சூரியன், சந்திரன் அல்லது சுக்கிரன் பாதிக்கப்பட்டால் வலது/இடது கண் பார்வை குறைபாடு அல்லது பார்வை இழப்பு ஏற்படும்.',
    ],
    soonyaEffectEn: [
      'Financial stability is heavily delayed; early income is easily squandered or drained by unforeseen obligations.',
      'Domestic discord, disputes within family, and marital trauma for native’s maternal elder aunt (Periyamma).',
      'If Mercury is weak here, native cannot keep their word, leading to breach of trust and loss of credibility.',
      'If Sun, Moon, or Venus is afflicted, eye defects, vision loss, or requirement of strong corrective glasses.',
    ],
    badhakaEffectTa: [
      'பாதகாதிபதி 2-ல் அமர்ந்தால் வருமானம் வர தொடர் தடைகள் உண்டாகும்; ஆனால் அயராது உழைத்தால் பிற்பகுதியில் அபரிமிதமான செல்வம் கிடைக்கும்.',
      'குடும்ப உறுப்பினர்களிடையே வாக்குவாதம், உறவினர்களால் பண இழப்பு, நாணயக் குறைவு ஏற்படும்.',
    ],
    badhakaEffectEn: [
      'Badhakadhipati in 2nd house blocks early cash inflows; however, sustained effort unlocks massive wealth in the latter half of life.',
      'Verbal clashes within household, financial betrayals by near relations, and monetary volatility.',
    ],
    vitalWarningsTa: [
      '2-ல் செவ்வாய் அமர்ந்து திதி சூன்யம் பெற்றால் பற்கள் பிரச்சனை, தவறான உணவு/போதை பழக்கங்கள், வழக்குகள் மற்றும் பலருக்கு கலப்புத் திருமணம் அமையும்.',
      'ராகு தொடர்பு பெற்றால் திருமணம் இல்லாது போதல் அல்லது பிரிந்து வாழ்தல்; பெரியம்மாவிற்கு கடுமையான கண்டம் ஏற்படும்.',
    ],
    vitalWarningsEn: [
      'Mars in 2nd with Soonya creates dental/tooth decay, risk of harmful addictions, litigations, and unconventional/inter-caste marriage.',
      'Rahu association can cause denial of marriage, separation from partner, or severe physical peril to maternal elder aunt.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி விதி: "சூன்ய வீட்டில் உங்கள் செல்வம் மறைந்து இருக்கும். முதலில் தீமை நடந்து முடிந்த பிறகே தன யோகம் பொங்கும்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript dictum: "Your real treasure is buried within the Soonya house; only after initial hurdles settle will true prosperity awaken."',
    ],
  },
  3: {
    bhava: 3,
    nameTa: '3-ஆம் பாவம் (தைரியம், இளைய சகோதரன், ஆயுள்)',
    nameEn: '3rd House (Courage, Siblings, Upayul)',
    significationsTa: 'தைரிய வீரியம், சகோதர உறவு, கை-தோள், ஒப்பந்தங்கள், ஆயுள் பலம்',
    significationsEn: 'Courage, Younger Siblings, Hands & Shoulders, Deeds, Vital Longevity',
    soonyaEffectTa: [
      'செவ்வாய் பலம் குறைந்தால் பயந்த சுபாவம், தைரியமின்மை; புதன் பலம் குறைந்தால் நரம்பு வீரிய குறைபாடு ஏற்படும்.',
      'இளைய சகோதரர்களுடன் சுமூக உறவு இருக்காது; உடன் பிறந்தவர்களால் சொத்து இழப்பு மற்றும் மனக்கசப்பு.',
      'E.N.T. சார்ந்த தொண்டை, காது, மூக்கு, கழுத்து மற்றும் தோள்பட்டை கடுமையான வலி அல்லது அறுவை சிகிச்சை.',
      'பத்திரப் பதிவுகள், சொத்துப் பாகப்பிரிவினைகளில் கடுமையான குளறுபடி, மோசடி மற்றும் வழக்குகள் தோன்றும்.',
      'விலைமதிப்பற்ற தங்க ஆபரணங்கள் தொலைந்து போதல்; அடமானம் வைத்தால் அதை சரியான நேரத்தில் மீட்க முடியாமல் மூழ்கிப் போதல்.',
    ],
    soonyaEffectEn: [
      'If Mars is weak: timidity and lack of courage; if Mercury is weak: nervous debility and lack of vitality.',
      'Hostility with younger siblings; property disputes and emotional rifts caused by brothers/sisters.',
      'E.N.T. afflictions: ear, nose, throat ailments, persistent neck/shoulder pain, or surgical intervention.',
      'Severe complications in document registrations, fraudulent land partition deeds, and property lawsuits.',
      'Loss of precious jewelry; pledged or mortgaged gold ornaments cannot be redeemed and are permanently forfeited.',
    ],
    badhakaEffectTa: [
      'உப ஆயுள் பாதிக்கப்படும்; மாமனாருக்கு உடல்நலக் குறைவு அல்லது அவருடன் உறவு முறிந்து போகும்.',
      'கையெழுத்து மற்றும் கைரேகை தொடர்பான பிரச்சினைகள், அரசு ஆவணங்களில் பிழைகள் உண்டாகும்.',
    ],
    badhakaEffectEn: [
      'Secondary longevity (Upayul) gets compromised; severe health setbacks or estrangement with father-in-law.',
      'Problems related to fingerprint identification, signatures, and biometric mismatch in official records.',
    ],
    vitalWarningsTa: [
      '3-ஆம் இடம் திதி சூன்யம் ஆனால் வாழ்க்கையில் ஒரு முறை கடுமையான மன உளைச்சலில் தற்கொலைக்கு முயற்சி செய்வார்கள்; தீவிர மனநல பாதுகாப்பு தேவை.',
      '30 வயதில் கடும் வறுமை ஏற்படும்; தற்கொலை எண்ணம் மேலோங்கும்.',
      'புதன் சம்பந்தப்பட்டால் இடது கையில் எழுதுவார்கள்; 11-ஆம் அதிபதி தொடர்பு பெற்றால் கையில் 6 விரல்கள் அமைய வாய்ப்புண்டு.',
      '12-ஆம் இடம், கெட்ட புதன் மற்றும் கேது தொடர்பு கொண்டால் கைவிரல் கட்டாகும் (துண்டிக்கப்படும்) ஆபத்து உண்டு.',
    ],
    vitalWarningsEn: [
      'Critical manuscript warning: If 3rd house is Soonya, the native will attempt suicide once during extreme despair; strong counseling required.',
      'Acute poverty surfaces around age 30, accompanied by a surge in self-harm ideation.',
      'If Mercury is connected: writing with left hand; if 11th lord is involved: polydactyly (6 fingers).',
      'If 12th house, afflicted Mercury, and Ketu combine: risk of accidental finger loss or surgical amputation.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி எச்சரிக்கை: "3-ம் இடம் திதி சூன்யம் ஆனால் ஒருமுறை தற்கொலைக்கு முயற்சி செய்வார்கள்... 30 வயதில் வறுமை உண்டு."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript quote: "If the 3rd house becomes Soonya, a suicide attempt will be made once in life... poverty strikes at age 30."',
    ],
  },
  4: {
    bhava: 4,
    nameTa: '4-ஆம் பாவம் (தாய், கல்வி, நிலம், வாகனம்)',
    nameEn: '4th House (Mother, Education, Property, Vehicles)',
    significationsTa: 'தாயன்பு, உயர்கல்வி, சொத்துக்கள், வீடு, சுகபோகம்',
    significationsEn: 'Maternal Care, Academic Pursuits, Real Estate, Vehicles, Domestic Peace',
    soonyaEffectTa: [
      'தாய் அன்பு கிடைக்காது; தாயைப் பிரிந்து விடுதியில் தங்கிப் படிப்பது அல்லது தாயாரின் உடல்நிலை மிக பலவீனமாக இருக்கும்.',
      'புதன் கெட்டால் பள்ளி அல்லது கல்லூரிக் கல்வி பாதியில் தடைபடும்; சூரியன் கெட்டால் இதய நோய் அல்லது படபடப்பு உண்டாகும்.',
      'தாய் வழி உறவில் காதல் திருமணம் அமையும்; தாயாரின் சொந்த மணவாழ்க்கை நிம்மதியற்றதாக இருக்கும்.',
      'சொத்துக்கள் காகிதத்தில் ஏராளமாக இருக்கும், ஆனால் அதனை அனுபவிக்க முடியாதபடி சட்டச் சிக்கல்கள் அல்லது முடக்கம் ஏற்படும்.',
      'வாகனம் திருட்டுப் போகும் (குறிப்பாக சனிபகவான் சம்பந்தப்பட்டால் வாகனம் களவு போகும்).',
    ],
    soonyaEffectEn: [
      'Deprivation of mother’s love; forced to study staying in boarding hostels away from home, or mother suffers chronic illness.',
      'If Mercury is afflicted: dropouts and interrupted academics; if Sun is spoiled: cardiac weakness and palpitations.',
      'Love marriage occurs within maternal relatives; the mother’s own married life lacks peace and harmony.',
      'Ample real estate on paper, but unable to enjoy or inhabit due to legal freezes, litigations, or tenant troubles.',
      'Vehicle theft occurs (especially if Saturn is connected to the 4th house/lord).',
    ],
    badhakaEffectTa: [
      'சொத்துக்களினால் தொடர் வழக்குகள், தாயாருடன் கடுமையான கருத்து வேறுபாடுகள் மற்றும் உறவு விரிசல்.',
      'நீண்ட நாள் உடல் உபாதைகள், மார்பு சளி, ஆஸ்துமா போன்ற நோய்களால் உடல் சுகம் கெடும்.',
    ],
    badhakaEffectEn: [
      'Continuous property litigation, deep philosophical and emotional clashes with mother.',
      'Chronic physical ailments, chest congestion, and respiratory distress impairing physical well-being.',
    ],
    vitalWarningsTa: [
      '4 வயதில் நீரில் கண்டம் உண்டு; நீர்நிலைகள், கிணறு, ஆற்றில் நீச்சல் போன்றவற்றில் அதீத எச்சரிக்கை தேவை.',
      '4 மற்றும் 6-ஆம் அதிபதிகள் சம்பந்தப்பட்டால் மாற்றாந்தாய் பால் குடித்து வளரும் நிலை (வளர்ப்புத் தாய்) உண்டாகும்.',
    ],
    vitalWarningsEn: [
      'Extreme peril of drowning in water at age 4; strict precautions required around rivers, wells, and waterbodies.',
      'If 4th and 6th lords associate, native is nursed by a foster mother or raised by a stepmother.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி குறிப்பு: "4 வயதில் நீரில் கண்டம்... சொத்து உண்டு ஆனால் அனுபவிக்க முடியாது... வண்டி திருட்டுப் போகும்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript note: "Drowning danger at age 4... Property exists but cannot be enjoyed... Vehicle gets stolen."',
    ],
  },
  5: {
    bhava: 5,
    nameTa: '5-ஆம் பாவம் (பூர்வீகம், புத்திரம், குலதெய்வம்)',
    nameEn: '5th House (Poorva Punya, Children, Ancestral Deity)',
    significationsTa: 'குழந்தை பாக்கியம், பூர்வ புண்ணியம், குலதெய்வ அருள், காதல், அறிவுத்திறன்',
    significationsEn: 'Progeny, Ancestral Merit, Kuladeivam Blessings, Romance, Intellect',
    soonyaEffectTa: [
      'புத்திர தோஷம் ஏற்படும்; ஆண் குழந்தைகள் பிறப்பது மிகவும் தாமதமாகும் அல்லது தத்துபுத்திர யோகம் உண்டாகும்.',
      'பூர்வீக சொத்துக்கள் பராமரிப்பின்றி வீணாதல், உறவினர்களால் அபகரிக்கப்படுதல் அல்லது வழக்குகளில் விரயமாதல்.',
      'குலதெய்வ வழிபாட்டில் பெரும் தடை; குலதெய்வம் எதுவென்றே தெரியாத நிலை அல்லது குலதெய்வத்தை மாற்றி வழிபடும் சூழல்.',
      'புதன் கெட்டால் படிப்பில் முட்டுக்கட்டை; ஆனால் சுப சேர்க்கை பெற்றால் 5-ஆம் பாவம் மூலமாக உயர் ஆராய்ச்சி கல்வி மற்றும் Ph.D. பட்டம் பெறுவார்கள்.',
      'அடிக்கடி காதல் வயப்படுதல், காதலில் ஏமாற்றம், காதல் தோல்வி காரணமாக மதம் மாறும் எண்ணம் உண்டாகும்.',
    ],
    soonyaEffectEn: [
      'Putra Dosha: Significant delay in fathering/bearing male progeny; adoption/foster parenting (Dattu Putra) often indicated.',
      'Ancestral properties squandered, encroached upon by relatives, or drained through partition litigations.',
      'Severe obstruction in Kuladeivam worship; ignorance of true family deity or worshiping an altered deity.',
      'If Mercury is weak: academic hurdles; if well-associated: exceptional research education leading to Ph.D. degree.',
      'Frequent infatuations, painful heartbreaks, and romantic failures prompting thoughts of religious conversion.',
    ],
    badhakaEffectTa: [
      'பூர்வீகத்தை விட்டு வெளியேறி தூர தேசத்தில் குடியேறுதல்; பூர்வீக வீட்டிலிருந்து குடும்பத்தினர் அனைவரும் வெளியேறும் நிலை.',
      'தாத்தாவின் முகம் காணாத நிலை (ஜாதகருக்கு விவரம் தெரியும் முன்பே தாத்தா காலமாதல்).',
      'தாய்மாமனுக்கு குழந்தை பாக்கியம் தடைபடுதல்; தாய்மாமனின் இல்லற வாழ்வில் விரிசல்.',
    ],
    badhakaEffectEn: [
      'Complete exodus from ancestral homeland; family members deserting the ancestral home.',
      'Never seeing grandfather’s face, or grandfather passing away before native gains cognitive awareness.',
      'Obstacles in childbirth for maternal uncle; severe matrimonial fractures in maternal uncle’s family.',
    ],
    vitalWarningsTa: [
      'ராகு தொடர்பு கொண்டால் குலதெய்வ அருள் முடங்கும்; குடும்பத்தில் மதம் மாறுதல் அல்லது மதம் மாறியவருடன் உறவு ஏற்படும்.',
      'வயிறு சார்ந்த தீவிர நோய்கள், குடல் புண், ஜீரணக் கோளாறுகள் ஏற்படும்.',
      'தாய்மாமன் உறவில் 2 திருமணங்கள் அல்லது தாத்தாவிற்கு 2 திருமணங்கள் நடக்கும் பரம்பரை கர்மா வெளிப்படும்.',
    ],
    vitalWarningsEn: [
      'Rahu association severely blocks Kuladeivam grace; triggers religious conversion within family or marrying outside faith.',
      'Chronic abdominal diseases, ulcerations, and stubborn digestive disorders.',
      'Ancestral karma manifests as two marriages for maternal uncle or two marriages for grandfather.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி உரை: "தாத்தாவின் முகம் காணாதவர்... தாய்மாமனுக்கு குழந்தை பாக்கியத்திற்கு தடை... பூர்வீக சொத்துக்களினால் விரயம்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript quote: "Never sees the grandfather’s face... Obstacles to maternal uncle having children... Ancestral property drained."',
    ],
  },
  6: {
    bhava: 6,
    nameTa: '6-ஆம் பாவம் (நோய், கடன், எதிரி, உத்தியோகம்)',
    nameEn: '6th House (Disease, Debt, Enemies, Service)',
    significationsTa: 'உத்தியோகப் போராட்டம், பணக்கடன், நாள்பட்ட நோய், வழக்குகள்',
    significationsEn: 'Job Battles, Financial Debts, Chronic Diseases, Litigations',
    soonyaEffectTa: [
      'உத்தியோகப் பிரச்சனை, கட்டுக்கடங்காத கடன் தொல்லை, எதிரி தொந்தரவு, தீராத நோய் தொந்தரவு — இந்த மூன்றில் ஒன்று சாகும் வரை கண்டிப்பாக இருக்கும்!',
      'தகுதிக்குரிய உத்தியோகம் தொடக்கத்தில் அமைந்தாலும், ஒரு கட்டத்தில் பணிச்சுமையையும் அவமானங்களையும் தாக்குப் பிடிக்க முடியாமல் வேலையை விட்டு ஓடி வருவார்கள்.',
      'இரண்யா (ஹெர்னியா) பிரச்சனை, குடல் சார்ந்த நோய்கள், மலக்குடல் கோளாறுகள் தோன்றும்.',
      'உழைப்புக்கு ஏற்ற ஊதியமும் அங்கீகாரமும் கிடைக்காது; உணவுப் பழக்கங்களில் எப்போதுமே மனத்திருப்தி இருக்காது.',
      'சிலருக்கு மறைமுக திருட்டு குணம் அல்லது தவறான ஏமாற்றுப் பழக்கங்கள் இயல்பாக மேலோங்கும்.',
    ],
    soonyaEffectEn: [
      'The Manuscript Triad: Career crisis, unmanageable debts, or chronic incurable disease — ONE OF THESE THREE WILL PERSIST LIFELONG!',
      'Though a qualified job may be obtained early, at a critical juncture the native cannot bear the stress and abruptly quits.',
      'Hernia (Iranya), intestinal disorders, colorectal ailments, and severe gut inflammation.',
      'Hard labor without proportionate compensation or recognition; perpetual lack of satisfaction with food habits.',
      'Subtle deceitful tendencies, stealthy habits, or dishonesty may uncharacteristically surge in some natives.',
    ],
    badhakaEffectTa: [
      'எதிர்பாராத கடன் சுமை, கடன் வாங்கியவர்கள் பணத்தைத் திருப்பித் தராமல் ஏமாற்றுவது.',
      'வாயுத் தொல்லை, கடுமையான முதுகுத்தண்டு வலி, உணவு நஞ்சாதல் (Food Poisoning) மற்றும் அடிக்கடி சிறு விபத்துகள்.',
    ],
    badhakaEffectEn: [
      'Unexpected mountainous debts, being duped by borrowers who default on loans.',
      'Chronic flatulence/gastric trouble, severe spinal/backache, food poisoning incidents, and recurring minor accidents.',
    ],
    vitalWarningsTa: [
      '6-ஆம் இடம் உபஜெய ஸ்தானம் என்பதால், தொடக்கத்தில் பேரழிவு தந்தாலும் பின்னாளில் எதிரிகளை வென்று சாதனை படைப்பார்கள்.',
      'சித்தியின் மணவாழ்க்கை கடுமையான போராட்டங்களுக்கு ஆளாகும்.',
    ],
    vitalWarningsEn: [
      'Being an Upachaya house, though it inflicts brutal trials early, the native ultimately triumphs over all foes.',
      'Maternal younger aunt or stepmother’s married life faces severe turmoil.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி ஆணித்தரமான விதி: "உத்தியோகத்தினால் பிரச்சனை, கடன் தொந்தரவு, எதிரி தொந்தரவு, தீராத நோய் — இந்த மூன்றில் ஒன்று சாகும் வரை அனுபவிக்க வேண்டும்."',
    ],
    specialManuscriptNotesEn: [
      'Definitive Manuscript Dictum: "Trouble through service, torment of debt, harassment by enemies, incurable disease — one of these three must be borne until death."',
    ],
  },
  7: {
    bhava: 7,
    nameTa: '7-ஆம் பாவம் (களத்திரம், திருமணம், கூட்டாண்மை)',
    nameEn: '7th House (Kalathra, Marriage, Partnerships)',
    significationsTa: 'மணவாழ்க்கை, தாம்பத்தியம், கூட்டாளிகள், வாடிக்கையாளர்கள், வெளியூர் பயணம்',
    significationsEn: 'Spousal Dynamics, Intimacy, Business Partners, Clients, Overseas Travel',
    soonyaEffectTa: [
      '7-ஆம் அதிபதியும் 7-ஆம் பாவமும் திதி சூன்யமானால் இல்லறத்தில் நிம்மதி இருக்காது; மனைவியுடன்/கணவனுடன் தீராத சண்டை சச்சரவுகள்.',
      'திருமணம் மிகக் காலதாமதமாகும்; தாம்பத்திய சுகம் பெருமளவில் குறையும்; நிச்சயதார்த்தம் வரை சென்று திருமணப் பேச்சுவார்த்தை பாதியில் நிற்கும்.',
      'முதல் திருமணம் விவாகரத்து (Divorce) ஆகுதல் அல்லது முதல் வரன் கடைசி நேரத்தில் தடைபட்டு நிற்பது.',
      'காதல் திருமணம், கலப்புத் திருமணம், வயது மிகவும் மூத்த பெண் அல்லது மிகக் குறைந்த வயது உடையவரை திருமணம் செய்தல்.',
      'இரண்டாவது குழந்தை பிறக்க தாமதமாதல் அல்லது சிசேரியன் பிரசவம்; இரண்டாவது குழந்தை சம்பந்தம் பண்ணுவது மிகக் கடினம்.',
      'கணவன்-மனைவி இருவரும் கருத்து வேறுபாட்டால் அல்லது வேலை நிமித்தமாக பிரிந்து வாழும் சூழல் அமையும்.',
    ],
    soonyaEffectEn: [
      'If both 7th house & lord are in Soonya, domestic bliss is ruined; unending altercations and friction with spouse.',
      'Severe delay in solemnizing marriage; reduced conjugal intimacy; formal engagements broken off at the eleventh hour.',
      'Divorce in first marriage, or initial matrimonial alliance collapsing right before the ceremony.',
      'Love marriage, inter-caste alliance, marrying a partner significantly older or substantially younger.',
      'Protracted delay in conceiving second child, Caesarean section delivery, and immense difficulty fixing marriage for second child.',
      'Spouses living geographically separated due to discord, careers, or mutual incompatibility.',
    ],
    badhakaEffectTa: [
      'யூரினரி (சிறுநீரக பாதை) நோய்கள், சிறுநீரக கல் அடைப்பு மற்றும் உடல் சுகபோகங்கள் அனுபவிக்கத் தடை.',
      'கூட்டுத் தொழில் (Partnership Business) அறவே கூடாது! கூட்டாளிகள் ஏமாற்றி மோசடி செய்வார்கள்.',
      'வாடிக்கையாளர் திருப்தியின்மை; வெளிநாடு செல்லும் போது கடுமையான சோதனைகளும் பிரச்சனைகளும் உண்டாகும்.',
    ],
    badhakaEffectEn: [
      'Urinary tract infections, kidney stones (lithiasis), and chronic obstructions to physical pleasure/comfort.',
      'PARTNERSHIP BUSINESS IS STRICTLY PROHIBITED! Business partners will betray and inflict grievous losses.',
      'Erratic client satisfaction; severe logistical, legal, or health complications when attempting overseas travel.',
    ],
    vitalWarningsTa: [
      'கடுமையான எச்சரிக்கை: எந்தக் காரணம் கொண்டும் பார்ட்னர்ஷிப் கூட்டுத் தொழில் வைக்கக் கூடாது.',
      '3, 7, 11-ஆம் பாவகங்களில் சனி மற்றும் புதன் சம்பந்தப்பட்டால் ஓரினச்சேர்க்கை (Homosexuality/Non-traditional sexuality) நாட்டம் ஏற்படலாம்.',
      '7-ல் ராகு/கேது திதி சூன்யம் பெற்றால் தாத்தாவிற்கு இரண்டு திருமணம் அல்லது பாட்டிக்கு இரண்டாவது திருமணம் நடந்த வம்சாவழி கர்மா வெளிப்படும்.',
    ],
    vitalWarningsEn: [
      'Absolute manuscript prohibition: Never enter into any partnership business under any pretext.',
      'If Saturn and Mercury connect to houses 3, 7, and 11, inclination toward non-traditional/homosexual relationships may occur.',
      'Rahu/Ketu in 7th with Soonya/Badhaka surfaces ancestral dual marriages (grandfather had two wives or grandmother had two marriages).',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி எச்சரிக்கை: "கூட்டுத் தொழில் கூடாது... நிச்சயதார்த்தம் வரை சென்று நிற்பது... முதல் திருமணம் டைவர்ஸ்... யூரினரி பிரச்சனை."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript warning: "Partnership business prohibited... Calling off at engagement stage... Divorce in first marriage... Urinary stones."',
    ],
  },
  8: {
    bhava: 8,
    nameTa: '8-ஆம் பாவம் (ஆயுள், திடீர் விபத்து, அவமானம், வழக்கு)',
    nameEn: '8th House (Longevity, Scandals, Calamities, Litigation)',
    significationsTa: 'திடீர் நஷ்டம், களவு, கோர்ட் வழக்கு, அவப்பெயர், இயற்கை சீற்றம்',
    significationsEn: 'Sudden Disgrace, Theft, Court Cases, Hidden Attacks, Natural Disasters',
    soonyaEffectTa: [
      'களவு போகுதல், வீண் வம்பு வழக்குகள், நீதிமன்ற வழக்குகள், கடுமையான பொது அவமானம் மற்றும் எதிர்பாராத திடீர் அசிங்கங்கள்.',
      'பெண் ஜாதகத்தில் மாங்கல்ய தோஷம் உண்டாகும்; திருமணம் கைகூடி வரும் நேரத்தில் விவாகப் பேச்சுவார்த்தை தடையாகும்.',
      'பெற்றோர்களுக்கு இறுதிக் கடன் (கர்மம்) செய்வதில் தடைகளும் இடையூறுகளும் உண்டாகும்.',
      'மறைமுகத் தாக்குதல்கள் உண்டு; உங்களை யார் ஏமாற்றினார்கள் அல்லது அடித்தார்கள் என்றே தெரியாதபடி எதிரிகள் செயல்படுவார்கள்.',
      '8-ஆம் அதிபதி திதி/பாதகம் தொடர்பு பெற்று எந்த கிரகத்தைப் பார்க்கிறாரோ, அந்த கிரக உறவுக்கு பெரிய சர்ஜரி (அறுவை சிகிச்சை) நடக்கும்.',
    ],
    soonyaEffectEn: [
      'Theft, malicious disputes, court litigations, acute public humiliation, and shocking sudden scandals.',
      'In female horoscopes, Mangalya Dosha; marriage talks suddenly freeze whenever an alliance approaches finalization.',
      'Severe impediments in performing the final funeral and annual karmic rites (Pithru Karma) for parents.',
      'Covert ambush attacks; native will not even know who undermined, defrauded, or struck them.',
      'Whichever planet the 8th lord (linked with Soonya/Badhaka) aspects, that corresponding biological relative will undergo major surgery.',
    ],
    badhakaEffectTa: [
      '8-ஆம் அதிபதி லக்னத்தில் தொடர்பு கொண்டால் ஜாதகருக்கு கடுமையான விபத்து மற்றும் அவப்பெயர் உண்டாகும்.',
      '8-ஆம் அதிபதி 2-ல் அமர்ந்தால் கண்ணில் நீர் வடிதல், கடுமையான கோர்ட் வழக்குகள் மற்றும் அறுவை சிகிச்சைகள்.',
      '8-ஆம் அதிபதி 4-ல் செவ்வாயுடன் சேர்ந்தால் வாகனம் திருட்டுப் போகும்; தாயாருடன் தகராறு மற்றும் கல்வி தடைபடும்.',
      '8-ஆம் அதிபதி 5-ல் அமர்ந்தால் குழந்தைகளுக்கு கடுமையான உடல்நலக் குறைவு அல்லது கண்டம் உண்டாகும்.',
    ],
    badhakaEffectEn: [
      '8th lord connecting with Lagna creates major road/industrial accidents and stained reputation for the native.',
      '8th lord in 2nd house causes watering of eyes/ocular surgery, painful lawsuits, and surgical interventions.',
      '8th lord in 4th with Mars: vehicle stolen, intense friction with mother, and sudden disruption of studies.',
      '8th lord in 5th house brings severe illnesses, distress, or peril to the native’s children.',
    ],
    vitalWarningsTa: [
      'இயற்கை சீற்ற எச்சரிக்கை: 4, 8, 12 அல்லது லக்னத்துடன் செவ்வாய்-ராகு தொடர்பு உள்ளவர்கள் இடி, மின்னல், புயல் வரும் போது எக்காரணம் கொண்டும் வெளியில் செல்லக் கூடாது!',
      'கூட்ட நெரிசல், திருவிழா நெரிசல் மற்றும் கலவரப் பகுதிகளுக்கு செல்லக் கூடாது; அங்கு மறைமுக ஆபத்து காத்திருக்கிறது.',
      'தசா புத்திகளில் இயற்கை சீற்றங்கள் அல்லது விபத்துகளால் பாதிப்புகள் ஏற்பட வாய்ப்புண்டு.',
    ],
    vitalWarningsEn: [
      'Life Safety Warning: Those with Mars/Rahu connected to 4, 8, 12, or Lagna MUST NEVER GO OUTDOORS during lightning, thunder, and torrential storms!',
      'Strictly avoid stampede-prone crowds, congested temple mobs, and civil riot zones; ambush risks exist.',
      'Dasa-Bhuktis of afflicted 8th lord can unleash natural calamities, flash floods, or vehicular crashes.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி அதிரடி எச்சரிக்கை: "இடி மின்னல் ஆகாது... 4, 8, 12 லக்னத்துடன் செவ்வாய் ராகு தொடர்பு உள்ளவர்கள் இடி மின்னல் வரும் போது வெளியில் போகக் கூடாது... கலவர பகுதியில் போகக்கூடாது."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript decree: "Lightning/thunder strictly harmful... If Mars-Rahu touch 4, 8, 12 or Lagna, do not step outside during thunderbolts... Stay away from riot zones."',
    ],
  },
  9: {
    bhava: 9,
    nameTa: '9-ஆம் பாவம் (தந்தை, பூர்வீகம், உயர்கல்வி, இருதாரம்)',
    nameEn: '9th House (Father, Fortune, Higher Knowledge, Dual Marriage)',
    significationsTa: 'தந்தை வழி, தந்தை பாசம், உயர்கல்வி, தத்து புத்திர யோகம், இரண்டாம் திருமணம்',
    significationsEn: 'Paternal Bonds, Higher Education, Fortune, Adoption, Dual Marriage Karma',
    soonyaEffectTa: [
      'ஜாதகர் தந்தையைப் பிரிந்து வாழ்வார்; அல்லது சரியான பருவத்தில் தந்தையின் பாசமும் அரவணைப்பும் கிடைக்காது.',
      'அப்பா வெளிநாடு சென்று தனிமையில் வாழ்வது அல்லது தந்தை-மகன் இடையே கருத்து வேறுபாடு.',
      '8-ஆம் அதிபதி தொடர்பு பெற்றால் சிறு வயதிலேயே தந்தையை பிரிந்து வாழ்தல்; 9 வயதில் தந்தைக்கு ஒரு கடுமையான கண்டம் ஏற்படும்.',
      'உயர்கல்வி படிப்பதில் தொடர் தடைகள், தேர்வுகள் எழுதுவதில் தாமதம் உண்டாகும்.',
      'பெண் ஜாதகத்தில் குரு பலம் குறைந்தால் கருத்தரிப்பதில் சிக்கல், கர்ப்பப்பை பாதிப்பு மற்றும் குழந்தை பாக்கிய தாமதம்.',
    ],
    soonyaEffectEn: [
      'Native lives separated from father; or is deprived of father’s warm affection and guidance at vital life stages.',
      'Father works overseas living away from family, or generational coldness and alienation with father.',
      'If 8th lord is connected: separation from father in early childhood; danger/peril to father at native’s age 9.',
      'Severe bottlenecks in pursuing higher education, degrees, and academic milestones.',
      'In female horoscopes, if Jupiter is weak: conception hurdles, uterine vulnerabilities, and delayed progeny.',
    ],
    badhakaEffectTa: [
      'ஆண் ஜாதகம் எனில் இருதார யோகம்; 9-ஆம் அதிபதி 7 மற்றும் 12-உடன் தொடர்பு கொண்டால் ஆண்-பெண் இருவருக்குமே இருதார யோகம்.',
      '9-ஆம் அதிபதி திதி சூன்யம் அடைந்தால் பெண்களுக்கு குழந்தை பிறப்பதில் மிகுந்த காலதாமதம் உண்டாகும்.',
      'ஆண் ஜாதகத்தில் தத்துபுத்திர யோகம் (Dattu Putra Yoga) உண்டாகும்; குழந்தை தாமதம் 3 தலைமுறையாக தொடரும் (தாத்தா, அப்பா, ஜாதகர்).',
    ],
    badhakaEffectEn: [
      'In male charts, Dwi-Kalatra Yoga (two marriages); if 9th lord links with 7th and 12th, dual marriage for both genders.',
      'If 9th lord is in Soonya, women face inordinate delay in conceiving or carrying a pregnancy to term.',
      'In male charts, Adoption Yoga (Dattu Putra); childbearing delay persists across three generations (grandfather, father, native).',
    ],
    vitalWarningsTa: [
      '9-ஆம் வீட்டில் அமரும் கிரகத்தின் அடிப்படையில் பரம்பரை இருதார யோகம் வெளிப்படும்:',
      '• புதன் இருந்தால்: தாய்மாமனுக்கு 2 திருமணம்',
      '• சுக்கிரன் இருந்தால்: அத்தைக்கு 2 திருமணம்',
      '• லக்னாதிபதி இருந்தால்: ஜாதகருக்கு 2 திருமணம்',
      '• சூரியன் இருந்தால்: தந்தைக்கு 2 திருமணம்',
      '• சந்திரன் இருந்தால்: தாயாருக்கு 2 திருமணம் அல்லது இரண்டாம் தாரமாக போவது',
      '• ராகு + சந்திரன்: தாய், தந்தை இருவருக்குமே இருதாரம்',
      '• கேது + சந்திரன்: தாய் மற்றும் பாட்டிக்கு இரண்டு திருமணம்',
    ],
    vitalWarningsEn: [
      'The Manuscript Formula for Dual Marriage depending on the planet seated in 9th Soonya house:',
      '• Mercury seated: Maternal uncle has two marriages',
      '• Venus seated: Paternal aunt (Athai) has two marriages',
      '• Lagna Lord seated: Native himself/herself has two marriages',
      '• Sun seated: Father has two marriages',
      '• Moon seated: Mother has two marriages or becomes second wife',
      '• Rahu + Moon: Both father and mother have dual marriages',
      '• Ketu + Moon: Both mother and grandmother had two marriages',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி குறிப்பு: "9-ம் அதிபதி எங்கு போய் உட்கார்ந்தாலும் அங்கு இரண்டு திருமணம் உண்டு... ஆண் ஜாதகம் தத்துபுத்திர யோகம்... ஜாதகருக்கு அவர் அப்பா, மகன் குழந்தை தாமதம் உண்டு."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript note: "Wherever the 9th lord sits, dual marriage pattern recurs... Male chart gets adoption yoga... Child delay runs in 3 generations."',
    ],
  },
  10: {
    bhava: 10,
    nameTa: '10-ஆம் பாவம் (தொழில், கர்மம், அதிகாரம், மாமியார்)',
    nameEn: '10th House (Profession, Karma, Authority, Mother-in-law)',
    significationsTa: 'ஜீவனம், தொழில் வெற்றி, பெற்றோர்க்கு கர்மம் செய்தல், அதிகாரம்',
    significationsEn: 'Career, Enterprise, Ancestral Karma Rites, Executive Authority',
    soonyaEffectTa: [
      'மனதில் தேவையற்ற இனம் புரியாத பயம், தன்னம்பிக்கையின்மை மற்றும் உத்தியோக இழப்பு பயம் எழும்.',
      'தொழிலில் எதிர்பாராத நஷ்டங்கள் ஏற்படும்; முதல் தொழில் அல்லது முதல் வியாபார முயற்சியை முற்றிலும் இழப்பார்கள்.',
      'அதிக அளவில் கடன் வாங்கி தொழில் முதலீடு செய்யவே கூடாது; ஊக வணிகம், பங்குச்சந்தையில் பேரழிவு ஏற்படும்.',
      'கர்மம் செய்ய தடை: பெற்றோர்களுக்கு செய்ய வேண்டிய இறுதி ஈமக்கடன்களை செய்ய முடியாமல் போவது, அல்லது இவருக்கு கர்மம் செய்ய வாரிசு இல்லாத நிலை.',
      'அரசு அல்லது தனியார் துறையில் விருப்ப ஓய்வு (VRS) கொடுத்து முன்கூட்டியே பணியிலிருந்து வெளியேற நேரிடும்.',
    ],
    soonyaEffectEn: [
      'Unwarranted internal anxiety, imposter syndrome, and chronic dread of professional collapse.',
      'Crushing business losses; the native will definitively forfeit their maiden enterprise or first major venture.',
      'HEAVY CAPITAL INVESTMENTS STRICTLY PROHIBITED; speculative ventures and day trading will lead to catastrophe.',
      'Karmic rites obstruction: Unable to perform final funeral rites for parents, or no progeny available to perform rites for the native.',
      'Forced early retirement, voluntary retirement schemes (VRS), or premature termination from service.',
    ],
    badhakaEffectTa: [
      'மாமியாருடன் இணக்கமின்மை; மாமியார் மூலம் கடுமையான குடும்ப சண்டைகளும் மன உளைச்சலும்.',
      'சனி பகவானின் தாக்கம் ஏற்பட்டு மன அமைதியின்மை, சுகபோகங்களை முழுமையாக அனுபவிக்க இயலாமை உண்டாகும்.',
      '10-ஆம் பாவம் உபஜெய ஸ்தானம் என்பதால், ஆரம்ப கால நஷ்டங்களுக்குப் பிறகு அனுபவத்தால் பெரிய நிபுணராக மாறுவார்கள்.',
    ],
    badhakaEffectEn: [
      'Hostility with mother-in-law; relentless friction, interference, and distress from in-laws.',
      'Saturnine affliction causing restlessness, insomnia, and an inability to relish physical luxuries.',
      'Being an Upachaya house, following initial entrepreneurial ruin, the native emerges as a hardened veteran and succeeds later.',
    ],
    vitalWarningsTa: [
      'குழந்தையை தத்து எடுக்கக் கூடாது! 10-ஆம் இடம் திதி சூன்யம்/பாதகம் ஆனால் குழந்தையை தத்து எடுக்கக் கூடாது; கொடுத்தால் மட்டுமே தோஷம் தீரும்.',
      '5, 8, 10-ஆம் பாவங்கள் தொடர்பு கொண்டால் குழந்தையை பரிகாரத்திற்காக தத்துக் கொடுத்து வாங்குவது நல்லது.',
    ],
    vitalWarningsEn: [
      'Adoption Rule: NEVER ADOPT A CHILD! If the 10th house is Soonya or Badhaka, adopting a child brings severe ruin; giving in adoption only mitigates.',
      'If houses 5, 8, and 10 connect, symbolic adoption ritual (Thathu Koduthu Vaanguthal) brings relief.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி கட்டளை: "முதலீடு செய்யக் கூடாது... V.R.S கொடுப்பார்கள்... மாமியார் பிரச்சனை... குழந்தையை தத்து எடுக்கக் கூடாது... முதல் தொழிலை இழப்பார்கள்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript decree: "Do not invest capital... Forced VRS... Mother-in-law discord... Never adopt a child... Loses first business venture."',
    ],
  },
  11: {
    bhava: 11,
    nameTa: '11-ஆம் பாவம் (லாபம், மூத்த சகோதரன், நண்பர்கள், மறுமணம்)',
    nameEn: '11th House (Gains, Elder Sibling, Friendships, Remarriage)',
    significationsTa: 'வருமான லாபம், மூத்த சகோதரர், நட்பு வட்டம், பேரவா, வெளிநாட்டு பெண்கள்',
    significationsEn: 'Net Profits, Elder Siblings, Social Circle, Over-ambition, Foreign Romance',
    soonyaEffectTa: [
      'நண்பர்கள் வட்டம் மிகவும் குறைவாக இருக்கும்; அல்லது நண்பர்களினால் பெருத்த நஷ்டமும் துரோகமும் ஏற்படும்.',
      'நண்பர்களினால் எந்த ஒரு லாபமும் கிடைக்காது; நம்பிய தோழர்கள் ஆபத்துக் காலத்தில் கைவிடுவார்கள்.',
      'மூத்த சகோதரர் அமையாது போதல்; அல்லது மூத்த சகோதரருடன் தீராத சொத்து விரோதமும் மனக்கசப்பும்.',
      'அளவுக்கு மீறிய பேராசை மற்றும் அவசர பண ஆசையால் பெரிய அளவில் முதலீடுகளை இழந்து நஷ்டப்படுதல்.',
      'தொழிலில் நிலையான லாபம் இல்லாமல் ஏற்ற இறக்கங்கள்; திறமைக்கு ஏற்ற ஊதியம் கிடைக்காது.',
      'இருதார யோகம் உண்டாகும்; இரண்டாவது திருமணம் செய்தால் அதிலும் பிரச்சனைகள் தொடரும்.',
    ],
    soonyaEffectEn: [
      'Extremely small friend circle; or friendships that systematically inflict betrayal and monetary devastation.',
      'Zero financial gains from acquaintances; trusted companions abandon the native during dire crises.',
      'Absence of elder brother; or severe estrangement and property litigation with senior siblings.',
      'Unbridled greed and get-rich-quick gambles resulting in staggering collapses.',
      'Volatile profit margins; the native’s earnings remain chronically unreflective of their genius and hard work.',
      'Dual marriage yoga manifests; entering into a second alliance also introduces tangled legal disputes.',
    ],
    badhakaEffectTa: [
      'உயர்கல்வி பயில்வதில் தடைகள்; வெளிநாட்டு தொடர்புகளால் ஆரம்பத்தில் பண இழப்பு.',
      'ஆரம்ப காலத்தில் மிகக் கடுமையான வறுமையும் போராட்டமும்; ஆனால் உபஜெய ஸ்தானம் என்பதால் பின்னாளில் அசுர வளர்ச்சி அடைவார்கள்.',
    ],
    badhakaEffectEn: [
      'Stumbling blocks in acquiring higher master’s/doctoral degrees; early financial drain through foreign connections.',
      'Early life marked by grinding austerity and hardship; however, as an Upachaya house, tremendous power and elevation arrive later.',
    ],
    vitalWarningsTa: [
      '11-ல் ராகு அல்லது கேது திதி சூன்யம்/பாதகம் பெற்று 5-ஆம் இடத்தைப் பார்த்தால்: மதம் மாறும் எண்ணம் வரும் அல்லது மதம் மாறிய பரம்பரையாக இருக்கும்.',
      'வெளிநாட்டு தொடர்புடைய நபர்கள் அல்லது வெளிநாட்டுப் பெண்களுடன் காதல் தொடர்பு ஏற்படும்.',
      'நண்பர்களோடு பிறந்த பெண்ணை அல்லது நண்பரின் குடும்பத்தைச் சேர்ந்த பெண்ணை திருமணம் செய்யும் நிலை உண்டாகும்.',
    ],
    vitalWarningsEn: [
      'If Rahu or Ketu in 11th is in Soonya/Badhaka and aspects 5th: intense urge for religious conversion or ancestral interfaith roots.',
      'Intense romantic involvement with foreigners or partners with international backgrounds.',
      'Marrying a woman born in a friend’s peer circle or from a foreign overseas environment.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி ரகசியம்: "நண்பர்களினால் லாபம் இல்லை... அதிக ஆசை அதனால் இழப்புகள்... திறமைக்கு ஏற்ற ஊதியம் இல்லை... ஆரம்ப காலத்தில் பிரச்சனை பின்னாடி நன்றாக இருக்கும்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript secret: "No gain from friends... Greed triggers downfall... Salary does not match talent... Early agony, supreme prosperity later."',
    ],
  },
  12: {
    bhava: 12,
    nameTa: '12-ஆம் பாவம் (விரயம், அயன சயன சுகம், மோட்சம், மறைவு)',
    nameEn: '12th House (Expenditures, Sleep, Secret Domains, Foreign)',
    significationsTa: 'விரயங்கள், தூக்கமின்மை, காணாமல் போதல், மருத்துவ செலவுகள், ஆன்மீகம்',
    significationsEn: 'Expenditures, Insomnia, Going Missing, Hospitalization, Liberation',
    soonyaEffectTa: [
      'அதிகப்படியான சுப/அசுப விரயங்கள்; சம்பாதித்த பணம் கையில் தங்காமல் மருத்துவ மற்றும் எதிர்பாராத வழிகளில் கரையும்.',
      'கடுமையான தூக்கமின்மை (Insomnia), இரவில் அமைதியற்ற மனநிலை மற்றும் படுக்கை சுகம் குறைவு.',
      'வாழ்நாளில் ஒரு முறையாவது ஜாதகர் அல்லது உறவினர் வீட்டை விட்டு வெளியேறி காணாமல் போவார்.',
      'புதன் சம்பந்தப்பட்டால் தாய்மாமன் காணாமல் போவார்; செவ்வாய் சம்பந்தப்பட்டால் உடன் பிறந்த சகோதரன் காணாமல் போவார்.',
      'நீரில் கண்டம், வெளிநாட்டுப் பயணங்களில் தடைகள் மற்றும் சட்டச் சிக்கல்கள்.',
    ],
    soonyaEffectEn: [
      'Relentless drain of finances; hard-earned wealth dissipates into medical bills, penalties, and unforeseen emergencies.',
      'Severe chronic insomnia, nocturnal anxieties, and denial of tranquil bedroom rest.',
      'At least once in a lifetime, the native or a core family member will mysteriously go missing from home.',
      'If Mercury is linked: maternal uncle goes missing; if Mars is linked: biological brother goes missing.',
      'Water hazard, logistical deadlocks during overseas relocation, and passport/visa entanglements.',
    ],
    badhakaEffectTa: [
      'மருத்துவமனையில் தங்கி சிகிச்சை பெறுதல் (Hospitalization), அறுவை சிகிச்சைகள் மற்றும் தனிமை வாசம்.',
      'பொதுமக்களோடு பழகும் போது சாக்கடை, கழிவுநீர் (Drainage) தொடர்பான குடியிருப்பு பிரச்சனைகள்.',
    ],
    badhakaEffectEn: [
      'Protracted hospital confinements, surgeries, and involuntary seclusion/isolation.',
      'Residential drainage, sewage, and sanitary public nuisances at domestic property.',
    ],
    vitalWarningsTa: [
      '12-ஆம் அதிபதி திதி சூன்யம் ஆனால் கடன் தீர்த்து இறை வழிபாட்டில் ஈடுபட்டால் மட்டுமே மோட்ச யோகம் கைகூடும்.',
      'நீர் ராசி சம்பந்தப்பட்டால் தண்ணீரில் கண்டம் மற்றும் பேச்சுத் திறன் குறைபாடு ஏற்படும்.',
    ],
    vitalWarningsEn: [
      'If 12th lord is Soonya, only settling all debts and surrendering to spiritual penance unlocks spiritual liberation (Moksha).',
      'Affliction in watery signs warns against deep oceans, ponds, and brings potential speech impairments.',
    ],
    specialManuscriptNotesTa: [
      'ஏட்டுச் சுவடி வாசகம்: "12-ம் அதிபதி ஒருநாளாவது காணாமல் போவார்... தூக்கமின்மை... அதிக விரயம்... புதன் சம்பந்தப்பட்டால் தாய்மாமன் காணாமல் போவார்."',
    ],
    specialManuscriptNotesEn: [
      'Manuscript quote: "12th lord causes someone to go missing once... Insomnia... Heavy expenses... If Mercury links, maternal uncle goes missing."',
    ],
  },
};

// 9 Planetary Karakatvas afflicted by Tithi Soonya or Badhaka (Pages 4 to 6)
export interface GrahaKarakatvaItem {
  planet: string;
  planetTa: string;
  generalKarakatvaTa: string;
  generalKarakatvaEn: string;
  afflictionsTa: string[];
  afflictionsEn: string[];
  remediesAndCautionsTa: string[];
  remediesAndCautionsEn: string[];
}

export const GRAHA_KARAKATVA_MASTER: Record<string, GrahaKarakatvaItem> = {
  Sun: {
    planet: 'Sun',
    planetTa: 'சூரியன் (பித்ரு காரகன் & ஆத்ம காரகன்)',
    generalKarakatvaTa: 'தந்தை, அரசு உத்தியோகம், ஆளுமை, கௌரவம், வலது கண், இதயம், எலும்பு',
    generalKarakatvaEn: 'Father, Government Service, Authority, Honor, Right Eye, Heart, Bones',
    afflictionsTa: [
      'தந்தையின் அன்பு கிடைக்காது; தந்தையை பிரிந்து வாழ்தல் அல்லது தந்தையுடன் நிரந்தர மனக்கசப்பு.',
      'வலது கண் பார்வை பிரச்சனை, இளம் வயதிலேயே கண் கண்ணாடி அணியும் நிலை தோன்றும்.',
      'இதயத்தில் இனம் புரியாத பயம், படபடப்பு மற்றும் இதயம் சார்ந்த உபாதைகள்.',
      'முதல் குழந்தை ஆண் குழந்தையாக பிறப்பது மிகக் கடினம்; பிறந்தாலும் மருத்துவப் போராட்டம் உண்டாகும்.',
      'பதவி உயர்வு தேடி வந்தாலும் அதனை முழுமையாக அனுபவிக்க இயலாதபடி முட்டுக்கட்டைகள் எழும்.',
      'அரசாங்க வேலை எதிர்பார்த்து கடைசி கட்டத்தில் ஆணை கிடைக்காமல் கைநழுவிப் போவது.',
      'தலை சார்ந்த நோய்கள், கண் கோளாறுகள்; விலைமதிப்பற்ற தங்க ஆபரணங்கள் தொலைந்து போதல் அல்லது அடகு வைத்தால் மீட்க முடியாமல் போவது.',
      'மாடி வீடு கட்டும் போது கடுமையான பிரச்சனைகளும் வழக்குகளும் முளைக்கும்.',
      'ஆண் வாரிசுகளால் தீராத தொல்லைகள்; 6-ஆம் பாவ தொடர்பு பெற்றால் தந்தையின் பெருங்கடன் ஜாதகர் தலைமேல் விழும்.',
    ],
    afflictionsEn: [
      'Deprived of father’s warm affection; living alienated from father or enduring lifelong paternal discord.',
      'Right eye vision defects, requiring spectacles from young childhood.',
      'Cardiac palpitations, unprovoked dread, and cardiovascular vulnerabilities.',
      'Conceiving a firstborn male child is extraordinarily difficult; if born, survival/health battles follow.',
      'Promotions and authority manifest on paper, but bureaucratic impediments prevent native from enjoying power.',
      'Anticipating a coveted government position which abruptly slips away at the final interview/order stage.',
      'Head-related diseases, chronic ophthalmic issues; precious gold jewelry pawned and never redeemed.',
      'Severe obstacles, builder disputes, or accidents emerge specifically when constructing an upper floor/terrace.',
      'Torment through male progeny; 6th house link forces father’s unpaid debts onto the native’s shoulders.',
    ],
    remediesAndCautionsTa: [
      'முதல் குழந்தை ஆண் குழந்தையாக பிறந்தால் முறைப்படி உறவினருக்கு தத்துக் கொடுத்து வாங்குவது (தத்துபுத்திர பரிகாரம்) விசேஷம்.',
      'மாடி வீடு கட்டும் போது சூரியனுக்குரிய காயத்ரி ஹோமமும் வாஸ்து சாந்தியும் தவறாமல் செய்தல் வேண்டும்.',
      'ஞாயிற்றுக்கிழமைகளில் ஆதித்ய ஹிருதய ஸ்தோத்திரம் பாராயணம் செய்து கோதுமை தானம் செய்யவும்.',
    ],
    remediesAndCautionsEn: [
      'If the first child is a boy, performing the traditional symbolic adoption ceremony (Thathu Koduthu Vaanguthal) nullifies danger.',
      'When constructing an upper floor, perform Surya Gayatri Homa and Vastu Shanti prior to roofing.',
      'Recite Aditya Hridaya Stotram on Sundays and donate whole wheat to needy priests.',
    ],
  },
  Moon: {
    planet: 'Moon',
    planetTa: 'சந்திரன் (மாத்ரு காரகன் & மனோ காரகன்)',
    generalKarakatvaTa: 'தாய், மனநிலை, நீர்நிலைகள், நுரையீரல், இடது கண், பயணம்',
    generalKarakatvaEn: 'Mother, Mind, Fluids, Lungs, Left Eye, Travel & Emotional Peace',
    afflictionsTa: [
      'தாயின் அன்பு கிடைக்காது; தாயைப் பிரிந்த வாழ்க்கை அல்லது தாய்ப்பால் அருந்த முடியாத நிலை.',
      'அடிக்கடி ஜலதோஷம், நுரையீரல் பாதிப்பு, மூக்கடைப்பு, சைனஸ் மற்றும் வீஸிங் (ஆஸ்துமா) தொல்லை.',
      'நீரில் கண்டம் உண்டு; அல்லது அம்மா வழியில் ஒருவருக்கு நீர்நிலைகளில் கண்டம் நிகழ்ந்திருக்கும்.',
      'மழைக்காலத்தில் கடுமையான உடல் உபாதைகளும் மன உளைச்சலும் உண்டாகும்.',
      'பயணங்களின் போது அதிக அளவிலான பண விரயமும் ஏமாற்றமும் ஏற்படும்; தாயாரின் சொந்த வாழ்வில் ஏமாற்றங்கள்.',
      '6-ஆம் அதிபதி அல்லது சனியுடன் தொடர்பு ஏற்பட்டால் பாய் உறவுகளுக்கு ஆகாது; கடும் மன அழுத்த நோய் தோன்றும்.',
    ],
    afflictionsEn: [
      'Deprivation of mother’s love; life separated from mother, or denied breast milk during infancy.',
      'Chronic pulmonary congestion, recurrent sinusitis, blocked nasal passages, asthma, and wheezing.',
      'Peril of drowning in water; or an ancestral drowning tragedy on the maternal lineage.',
      'Acute physical and psychological distress triggered specifically during rainy seasons and monsoons.',
      'Heavy financial loss and frustration during travels; tragic disappointments in mother’s personal life.',
      'Connection with 6th lord or Saturn causes severe psychosomatic trauma, clinical depression, and estrangement from bed-relations.',
    ],
    remediesAndCautionsTa: [
      'நீர்நிலைகள், ஆழமான கடல், குளம், கிணறுகளில் இறங்கக் கூடாது; படகுப் பயணங்களில் மிகுந்த கவனம் தேவை.',
      'மழைக்காலத்தில் குளிர்ந்த உணவுகளைத் தவிர்த்து சுடுநீர் அருந்துதல்; திங்கட்கிழமை சிவபெருமானுக்கு பால் அபிஷேகம் செய்தல்.',
      'பௌர்ணமி தோறும் அம்பிகைக்கு நெய்தீபம் ஏற்றி வழிபடவும்.',
    ],
    remediesAndCautionsEn: [
      'Never swim in deep waterbodies, wells, or rapid rivers; exercise extreme safety during boat travels.',
      'Avoid refrigerated food during monsoon; drink boiled herbal water; perform milk abhishekam to Lord Shiva on Mondays.',
      'Light pure ghee lamps to Goddess Parvati on every Pournami (Full Moon).',
    ],
  },
  Mars: {
    planet: 'Mars',
    planetTa: 'செவ்வாய் (பூமி காரகன் & சகோதர காரகன்)',
    generalKarakatvaTa: 'உடன்பிறப்புகள், நிலம், சொத்து, வீரம், ரத்தம், மைத்துனர்',
    generalKarakatvaEn: 'Siblings, Real Estate, Land, Courage, Blood, Brother-in-law',
    afflictionsTa: [
      'உடன்பிறந்த சகோதரர்களினால் தீராத பிரச்சனைகள்; மைத்துனர் (Brother-in-law) மூலம் கடுமையான மனக்கசப்பு.',
      'ஏராளமான பூமி, நிலபுலன்கள் இருந்தாலும் பல தொந்தரவுகள்; சொத்தை முழுமையாக அனுபவிக்க முடியாது.',
      'ரத்த அழுத்தம், ரத்தம் சார்ந்த அசுத்தங்கள், ரத்த சோகை அல்லது மூல வியாதி உண்டாகும்.',
      'பெண் ஜாதகம் எனில் கணவனால் மணவாழ்க்கை பிரச்சனை, அல்லது திருமணம் தாமதமாதல், காதல் தோல்வி.',
      'செவ்வாய் தசா-புத்திகளில் திடீர் விபத்துகள், வீண் வம்பு, காவல்துறை வழக்குகள் ஏற்படும்.',
    ],
    afflictionsEn: [
      'Endless animosity and disputes with siblings; severe grief and friction inflicted by brother-in-law.',
      'Even with extensive landed estates, persistent legal hurdles prevent native from enjoying or monetizing property.',
      'Blood disorders, high blood pressure, hematological impurities, anemia, or hemorrhoids.',
      'In female horoscopes: spousal incompatibility, denial of marital harmony, or agonizing romantic betrayal.',
      'Sudden vehicular accidents, violent altercations, and police/court litigations during Mars Dasa/Bhukti.',
    ],
    remediesAndCautionsTa: [
      'சொத்து வாங்கும் போது பூர்வாங்க வில்லங்கச் சான்றுகளை மிகக் கவனமாக பரிசீலிக்கவும்; சகோதரர்களுடன் நில விவகாரங்களில் விட்டுக் கொடுக்கவும்.',
      'செவ்வாய்க்கிழமைகளில் முருகப்பெருமானுக்கு செவ்வரளி மாலை சாற்றி நெய்தீபம் ஏற்றுதல் விசேஷம்.',
      'வாகனங்களை ஓட்டும் போது அதீத வேகத்தைத் தவிர்க்கவும்; ரத்த தானம் செய்வது செவ்வாய் தோஷத்தைக் குறைக்கும்.',
    ],
    remediesAndCautionsEn: [
      'Conduct rigorous legal scrutiny before acquiring land; maintain peaceful compromise with siblings over property.',
      'Offer red oleander garlands and light ghee lamps to Lord Murugan on Tuesdays.',
      'Avoid high-speed driving; donating blood periodically significantly neutralizes Mars affliction.',
    ],
  },
  Mercury: {
    planet: 'Mercury',
    planetTa: 'புதன் (வித்யா காரகன் & வியாபார காரகன்)',
    generalKarakatvaTa: 'கல்வி, புத்தி, கைரேகை, கையெழுத்து, மாமன், நரம்பு, வியாபாரம்',
    generalKarakatvaEn: 'Intellect, Education, Signatures, Maternal Uncle, Nerves, Commerce',
    afflictionsTa: [
      'கைரேகை மற்றும் கையெழுத்து மூலம் கடுமையான பிரச்சனைகள், ஆவண மோசடிகள் மற்றும் செக் மோசடிகள்.',
      'நண்பர்கள் நயவஞ்சகமாக ஏமாற்றுவார்கள்; நண்பர்களினால் நிதி இழப்பும் காதல் தோல்வியும் ஏற்படும்.',
      'ஜாமீன் கையெழுத்து எக்காரணம் கொண்டும் போடக் கூடாது! போட்டால் மொத்த கடனையும் ஜாதகர் அடைக்க நேரிடும்.',
      'தாய்மாமன் உறவு சிறப்பு இல்லை; தாய்மாமனின் மணவாழ்க்கை மிக மோசமாக பாதிக்கப்படும்.',
      'கூட்டுத் தொழில் (Partnership Business) அறவே ஆகாது; கூட்டாளிகளால் பெரும் ஏமாற்றம்.',
      'நரம்பு சம்பந்தப்பட்ட வியாதிகள், வீரியக் குறைவு, புத்தி தடுமாற்றம் மற்றும் நினைவாற்றல் குறைபாடு.',
      'புதன் 6-ஆம் அதிபதியானால் நோய்கள் தீவிரமாகும்; கடன்கள் கட்டுக்கடங்காமல் பெருகும்.',
      'முக்கிய பத்திரங்கள் மற்றும் சொத்து ஆவணங்கள் களவு போகுதல் அல்லது தொலைந்து போகுதல்.',
    ],
    afflictionsEn: [
      'Severe complications through fingerprints and signatures; document frauds, forged agreements, and cheque bouncing.',
      'Friends deceive deceitfully; financial wreckage and heartbreaking betrayal caused by intimate peer groups.',
      'ABSOLUTELY NEVER SIGN A SURETY/GUARANTEE BOND! Doing so forces the native to settle the debtor’s entire liability.',
      'Maternal uncle relationship is bitterly strained; the maternal uncle’s own married life collapses.',
      'PARTNERSHIP BUSINESS IS STRICTLY PROHIBITED; business allies inflict financial ruin.',
      'Nervous system disorders, loss of vigor/vitality, erratic intellectual focus, and memory lapses.',
      'If Mercury becomes 6th lord: diseases become intractable; debts spiral completely out of control.',
      'Loss, theft, or misplacement of title deeds and critical property documentation.',
    ],
    remediesAndCautionsTa: [
      'முக்கியமான எச்சரிக்கை: யாருக்கும் கடன் உத்தரவாத கையெழுத்தோ, ஜாமீன் கையெழுத்தோ போடக் கூடாது!',
      'கூட்டுத் தொழில் தொடங்காமல் சொந்த உழைப்பை மட்டும் நம்பி தொழில் செய்தல் நலம்.',
      'புதன்கிழமைகளில் ஸ்ரீ மகாவிஷ்ணுவை துளசி மாலை சாற்றி வழிபட்டு, பச்சைப்பயறு தானம் செய்யவும்.',
    ],
    remediesAndCautionsEn: [
      'Vital Life Rule: NEVER PROVIDE SURETY/GUARANTEE SIGNATURE FOR ANYONE UNDER ANY CIRCUMSTANCES!',
      'Avoid partnership ventures entirely; operate sole-proprietorship businesses anchored in personal integrity.',
      'Worship Lord Maha Vishnu with Tulsi garlands on Wednesdays and donate green gram (Moong dal).',
    ],
  },
  Jupiter: {
    planet: 'Jupiter',
    planetTa: 'குரு (புத்திர காரகன் & தன காரகன்)',
    generalKarakatvaTa: 'குழந்தைகள், செல்வம், ஞானம், கல்லீரல், கொழுப்பு, ஆன்மீகம், மரங்கள்',
    generalKarakatvaEn: 'Children, Wealth, Higher Wisdom, Liver, Lipids, Preceptors, Trees',
    afflictionsTa: [
      'குழந்தை பாக்கியம் அமைவதில் மிகுந்த காலதாமதம்; குழந்தைகளின் அன்பு மற்றும் அரவணைப்பு கிடைக்காது போவது.',
      'கொழுப்பு சார்ந்த பிரச்சனைகள் (Cholesterol), கல்லீரல் பாதிப்பு (Fatty liver/Cirrhosis), வயிறு கோளாறுகள்.',
      'வெளிநாட்டுக்கு செல்ல முடியாதபடி முட்டுக்கட்டை; வெளிநாடு சென்றாலும் அங்கு கடுமையான சோதனைகள்.',
      'மரம் ஆகாது; மழைக்காலத்திலும் இடி மின்னல் வரும் போதும் பெரிய மரங்களின் கீழ் நிற்கக் கூடாது! (6-8 தொடர்பு கொண்டால் மரத்தடியில் இடி தாக்கும் அபாயம் உண்டு).',
      'குலதெய்வ அருள் பெறுவதில் தடை; மூத்த குருமார்களின் அதிருப்தி.',
    ],
    afflictionsEn: [
      'Inordinate delay in progeny; emotional alienation and lack of affection from children.',
      'Lipid/cholesterol abnormalities, liver diseases (fatty liver/jaundice), and chronic gastrointestinal upsets.',
      'Bottlenecks preventing foreign journeys; if going abroad, facing gruelling legal or job predicaments.',
      'Danger from trees: Never stand under large trees during rain or thunderstorms! (6-8 link risks fatal lightning strikes under trees).',
      'Hurdles in securing ancestral guru grace; friction with spiritual mentors.',
    ],
    remediesAndCautionsTa: [
      'மழை மற்றும் இடி மின்னலின் போது அடர்ந்த மரங்களின் கீழ் ஒதுங்குவதை அறவே தவிர்க்கவும்.',
      'குழந்தை தாமதத்திற்கு திருச்செந்தூர் அல்லது திருக்கடவூர் தலங்களில் புத்திர தோஷ நிவர்த்தி ஹோமம் செய்தல்.',
      'வியாழக்கிழமைகளில் தட்சிணாமூர்த்திக்கு கொண்டைக்கடலை மாலை சாற்றி நெய்தீபம் ஏற்றுதல்.',
    ],
    remediesAndCautionsEn: [
      'Strict safety protocol: Never seek shelter under tall trees during thunderstorms.',
      'For delayed progeny, perform Santhana Gopala Homa at sacred shrines like Tiruchendur.',
      'Worship Lord Dakshinamurthy on Thursdays with yellow chickpeas (Kondaikadalai) and pure ghee lamps.',
    ],
  },
  Venus: {
    planet: 'Venus',
    planetTa: 'சுக்கிரன் (களத்திர காரகன் & சுகபோக காரகன்)',
    generalKarakatvaTa: 'களத்திரம், காதல், விந்தணு, கருப்பை, கண் பார்வை, ஆடம்பரம், வாகனம்',
    generalKarakatvaEn: 'Spouse, Romance, Sperm Count, Uterus, Eye Retina, Luxury, Vehicles',
    afflictionsTa: [
      'திருமணத்தில் தொடர் தடைகள்; காதல் திருமணத்தில் ஏமாற்றங்கள் மற்றும் விவாகரத்து சோதனைகள்.',
      'ஆண் ஜாதகத்தில் விந்தணு குறைபாடு (Low Sperm Count/Motility); பெண் ஜாதகத்தில் யூட்ரஸ் (கர்ப்பப்பை) கோளாறுகள்.',
      'பெண்களுக்கு கடுமையான மென்சஸ் (மாதவிடாய்) பிரச்சனைகள், கர்ப்பக் கோளாறுகள்.',
      'ஆடம்பர வாழ்க்கைக்கு ஆசைப்பட்டு அளவுக்கு மீறிய கடன் தொல்லைகளில் சிக்கித் தவிப்பது.',
      'கண் பார்வை குறைபாடு, ரெட்டினா (விழித்திரை) பாதிப்பு, சர்க்கரை நோய் (Diabetes), சிறுநீரகத் தொந்தரவுகள்.',
    ],
    afflictionsEn: [
      'Relentless impediments to marriage; tragic love failures, broken engagements, or divorce trauma.',
      'In males: low sperm count and motility issues; in females: uterine fibroids and gynecological ailments.',
      'Severe menstrual irregularities, PCOS/PCOD, and complicated pregnancy cycles for women.',
      'Craving ostentatious luxury, falling into suffocating credit card debts and financial traps.',
      'Retinal degeneration, ophthalmic complications, diabetes mellitus, and chronic renal vulnerabilities.',
    ],
    remediesAndCautionsTa: [
      'ஆடம்பர செலவுகளைக் கட்டுப்படுத்தி சேமிப்பில் கவனம் செலுத்தவும்; கடன் வாங்கி சொகுசுப் பொருட்கள் வாங்குவதை தவிர்க்கவும்.',
      'வெள்ளிக்கிழமைகளில் மகாலட்சுமிக்கு மல்லிகைப் பூ சாற்றி நெய்தீபம் ஏற்றி வழிபடவும்.',
      'கஞ்சனூர் சுக்கிரன் ஸ்தலத்திற்கு சென்று தம்பதி சமேதராக பரிகார அர்ச்சனை செய்தல் நலம்.',
    ],
    remediesAndCautionsEn: [
      'Exercise strict fiscal discipline; never borrow money to finance luxury lifestyles or ostentatious status symbols.',
      'Worship Goddess Mahalakshmi on Fridays with jasmine flowers and light white ghee lamps.',
      'Visit the Kanjanur Sukra Sthalam for specialized planetary remedy rituals with spouse.',
    ],
  },
  Saturn: {
    planet: 'Saturn',
    planetTa: 'சனி (ஆயுள் காரகன் & ஜீவன காரகன்)',
    generalKarakatvaTa: 'தொழில், நரம்பு, சித்தப்பா, உழைப்பாளர்கள், சாக்கடை, ஆயுள் பலம்',
    generalKarakatvaEn: 'Profession, Nerves, Paternal Uncle, Laborers, Sewage/Drainage, Longevity',
    afflictionsTa: [
      'தொழிலில் தொடர் பிரச்சனைகள், நரம்புத் தளர்ச்சி, உடல் வீரியக் குறைபாடு மற்றும் சோம்பல்.',
      'சித்தப்பாவினால் கடுமையான பிரச்சனைகள்; மூத்த கோத்திரம் ஆகாது; சித்தப்பா வழியில் ஒருவருக்கு உடல் ஊனம் உண்டாகும் (12-ஆம் அதிபதி தொடர்பு).',
      'தொழிற்சாலைகளில் தொழிலாளர்களினால் கலவரம் (Labor Strikes/Unrest) மற்றும் தொழிலாளர் சங்க (Union) பாதிப்புகள்.',
      'பொதுமக்கள் பிரச்சனைகள்; வீட்டைச் சுற்றி டைனேஜ் (சாக்கடை கழிவுநீர்) தொடர்பான சங்கடங்கள்.',
      'ஆயுள் பலத்தில் சோதனைகள்; ஜாதகருக்கு அல்லது அந்த பாவக உறவுக்கு கடுமையான கண்டங்கள்.',
    ],
    afflictionsEn: [
      'Perpetual occupational hurdles, nervous debility, physical lethargy, and lack of sustained stamina.',
      'Turmoil through paternal uncle; ancestral clan friction; a physical disability on paternal uncle’s side (if 12th lord connects).',
      'Factory floor revolts, industrial worker strikes, and destructive trade union confrontations.',
      'Sanitary public nuisances; chronic drainage, sewage, and septic tank blockages at dwelling places.',
      'Critical threats to longevity; physical hazards affecting the native or the relative represented by that bhava.',
    ],
    remediesAndCautionsTa: [
      'தொழிலாளர்களிடமும் பணியாளர்களிடமும் கனிவாக நடந்து கொண்டு ஊதியத்தை குறித்த நேரத்தில் வழங்கவும்.',
      'சனிக்கிழமைகளில் சனீஸ்வர பகவானுக்கு எள்தீபம் ஏற்றி, மாற்றுத்திறனாளிகள் மற்றும் முதியவர்களுக்கு உணவு தானம் செய்யவும்.',
      'திருநள்ளாறு அல்லது திருக்கொள்ளிக்காடு தலத்தில் திலஹோமம் செய்தல் விசேஷம்.',
    ],
    remediesAndCautionsEn: [
      'Treat employees and blue-collar workers with utmost empathy; pay fair wages without delay.',
      'Light sesame oil lamps (Ellu Deepam) for Lord Saturn on Saturdays and donate wholesome meals to disabled and senior citizens.',
      'Perform specialized Thila Homa at sacred Saturn shrines like Thirunallar or Thirukkollikadu.',
    ],
  },
  RahuKetu: {
    planet: 'RahuKetu',
    planetTa: 'ராகு & கேது (நிழல் கிரகங்கள் & வம்சாவழி கர்மா)',
    generalKarakatvaTa: 'வம்சாவழி முன்னோர்கள் கர்மா, தாத்தா-பாட்டி, மறுமணம், ரகசியங்கள்',
    generalKarakatvaEn: 'Ancestral Lineage Karma, Grandparents, Dual Marriages, Occult',
    afflictionsTa: [
      'ராகு-கேது அமர்ந்த வீடு முன்னோர்களின் வம்சாவழி கர்மாவை மட்டுமே அப்பட்டமாக சுட்டிக்காட்டும்.',
      '7-ல் ராகு அல்லது திதி சூன்யத்தில் ராகு: தாத்தாவிற்கு இரண்டு கல்யாணம் நடந்த வம்சாவழி கர்மா.',
      '7-ல் கேது அல்லது திதி சூன்யத்தில் கேது: பாட்டிக்கு இரண்டாவது திருமணம் நடந்த வம்சாவழி கர்மா.',
      'திதி சூன்யம் மற்றும் பாதகம் 7-ஆம் பாவம் ஆனால் பரம்பரை பரம்பரையாக இருதார யோகம் தொடரும்.',
      'குலதெய்வ அருள் குறைபாடு, குடும்பத்தில் மதம் மாறுதல் அல்லது வெளிநாட்டு நபர்களுடன் தொடர்பு.',
    ],
    afflictionsEn: [
      'The zodiac houses occupied by Rahu and Ketu exclusively decode recurring ancestral lineage karma.',
      'Rahu in 7th or in Tithi Soonya: Ancestral marker that the grandfather had two marriages.',
      'Ketu in 7th or in Tithi Soonya: Ancestral marker that the grandmother had two marriages.',
      'If Tithi Soonya and Badhaka afflict 7th house, the dual marriage karma echoes across generations.',
      'Erosion of ancestral deity grace, interfaith conversions, or unconventional marital links with foreigners.',
    ],
    remediesAndCautionsTa: [
      'அமாவாசை மற்றும் மகாளய அமாவாசை நாட்களில் முன்னோர்களுக்கு தவறாமல் திலதர்ப்பணம் செய்தல்.',
      'திருநாகேஸ்வரம் அல்லது திருப்பாம்புரம் சென்று ராகு-கேது ப்ரீதி மற்றும் சர்ப்ப தோஷ சாந்தி செய்தல்.',
      'குலதெய்வக் கோயிலுக்கு ஆண்டுதோறும் சென்று பொங்கல் வைத்து வழிபாடு செய்தல்.',
    ],
    remediesAndCautionsEn: [
      'Offer reverent Thila Tharpana to ancestors on every Amavasya and Mahalaya Amavasya.',
      'Perform Rahu-Ketu Preethi and Sarpa Dosha Shanti at Tirunageswaram or Thirupaamburam.',
      'Visit native Kuladeivam temple annually to cook Pongal and offer traditional ancestral prayers.',
    ],
  },
};

// Shastra Handling Rules & Exceptions (Pages 1, 2, 3)
export interface ShastraDoctrine {
  id: string;
  titleTa: string;
  titleEn: string;
  summaryTa: string;
  summaryEn: string;
  detailsTa: string[];
  detailsEn: string[];
}

export const TITHI_SOONYA_DOCTRINES: ShastraDoctrine[] = [
  {
    id: 'karmic_law',
    titleTa: 'முன்னோர்களின் வினை & கர்ம கடன் விதி',
    titleEn: 'Ancestral Debt & Karmic Balance Principle',
    summaryTa: 'திதி சூன்யம் என்பது முன்னோர்களின் புண்ணிய பாவ வினைகளை நாம் அனுபவித்து தீர்க்கும் தெய்வீக நியதியாகும்.',
    summaryEn: 'Tithi Soonya represents the karmic balance sheet inherited from ancestors that must be experienced.',
    detailsTa: [
      'நம் முன்னோர்களின் பாவம் மற்றும் வினை நல்லது கெட்டது எதுவாயினும் நாம் அனுபவித்தே தீரவேண்டும்.',
      'திதி சூன்யத்தில் கிரகங்களும் பாவகங்களும் பாதிக்கப்படுவது நாம் அனுபவிக்க வேண்டிய வினைகளின் தன்மையை அப்பட்டமாக காட்டுகிறது.',
      'சரம் லக்னத்தில் பிறந்தவர்களுக்கு பெரியவர்கள் செய்த வினை; ஸ்திரம் லக்னத்திற்கு நாம் செய்த வினை; உபயம் லக்னத்திற்கு எதிர்கால சந்ததிக்குரிய வினை.',
    ],
    detailsEn: [
      'Whether good or adverse, ancestral karma must be cleared through conscious life experiences.',
      'The specific planets and houses caught in Soonya reveal the precise karmic lessons slated for resolution.',
      'Movable Lagnas resolve karma of ancestors; Fixed Lagnas clear self-created past karma; Dual Lagnas influence future progeny.',
    ],
  },
  {
    id: 'first_pain_then_gain',
    titleTa: 'முதலில் தீமை, பின்பே நன்மை (மறைந்திருக்கும் செல்வம்)',
    titleEn: 'First Adversity, Then Prosperity (Hidden Wealth)',
    summaryTa: 'திதி சூன்யத்தில் முதலில் சோதனைகள் நடந்து முடிந்த பிறகே வியத்தகு யோகமும் செல்வமும் வெளிப்படும்.',
    summaryEn: 'Tithi Soonya mandates early trials; once exhausted, magnificent prosperity unlocks from the Soonya house.',
    detailsTa: [
      'திதி சூன்யம் என்றால் நன்மை உண்டு, தீமை உண்டு. முதலில் தீமை நடந்து முடிந்து பிறகு நன்மை உண்டாகும்.',
      'சூன்ய வீட்டில் உங்கள் செல்வம் மறைந்து இருக்கும். கிரகங்கள் இரண்டு முகங்களையும் காட்டும்.',
      'யோகம் தரும் கிரகம் திதி சூன்ய வீட்டில் அமர்ந்தால் ஆரம்ப கால வாழ்வு கஷ்டப்பட்டு பின்னாடி வாழ்க்கை மிகச் சிறப்பாகும்.',
    ],
    detailsEn: [
      'Tithi Soonya carries both hardship and fortune: adversity transpires first, followed by grand blessings.',
      'Your true wealth is concealed within the Soonya house; the planets operate with dual personas.',
      'If a Yoga-karaka planet sits in Soonya, early life struggles yield to astonishing prosperity and elevation later.',
    ],
  },
  {
    id: 'paksha_rule',
    titleTa: 'வளர்பிறை vs தேய்பிறை சூட்சும விதி (70% vs 30%)',
    titleEn: 'Shukla vs Krishna Paksha Secret Law (70% vs 30%)',
    summaryTa: 'வளர்பிறையில் உயிர் காரகங்களும், தேய்பிறையில் பொருளாதாரமும் முதன்மையாக பாதிக்கப்படும்.',
    summaryEn: 'Shukla Paksha impacts living relations (Uyir Karakas 70%), while Krishna Paksha directly tests finances.',
    detailsTa: [
      'தேய்பிறையில் பிறந்தவர்களுக்கு திதி சூன்யம் முதலில் பொருளாதார கஷ்டங்களைக் கொடுக்கும்; பிற்பகுதியில் நன்மையை செய்யும்.',
      'வளர்பிறையில் பிறந்தவர்களுக்கு ஆரம்பத்தில் நன்மையும் பிற்பகுதியில் தீமையும் செய்யும்.',
      'வளர்பிறையில் உயிர் பாதிப்பு 70%, பொருளாதார பாதிப்பு 30%; உயிர் பாதிப்பு வரும் போது பொருளாதார வளர்ச்சி வரும்.',
    ],
    detailsEn: [
      'Krishna Paksha births face early financial bottlenecks, followed by economic triumphs in the second half.',
      'Shukla Paksha births enjoy favorable early conditions, with deeper challenges emerging in later stages.',
      'In Shukla Paksha, 70% of affliction falls on bodily health/relations and 30% on finance; monetary influx often arrives alongside bodily tests.',
    ],
  },
  {
    id: 'upachaya_mitigation',
    titleTa: '3, 6, 10, 11 உபஜெய ஸ்தான விலக்கு',
    titleEn: 'Upachaya Houses (3, 6, 10, 11) Special Exemption',
    summaryTa: 'திதி சூன்ய வீடுகள் உபஜெய ஸ்தானங்களில் விழுந்தால் பாதிப்பு மிகக் குறைவு; பின்னாளில் பெரும் வெற்றி கிட்டும்.',
    summaryEn: 'When Soonya falls in Upachaya houses (3, 6, 10, 11), damage is neutralized and ultimate victory is assured.',
    detailsTa: [
      '3, 6, 10, 11 உபஜெய ஸ்தானத்தில் திதி சூன்ய வீடுகள் அமைந்தால் அதன் தீய பாதிப்புகள் மிகக் குறைவாகவே இருக்கும்.',
      'துவக்கத்தில் கடுமையான சவால்களை சந்தித்தாலும் முடிவில் ஜாதகர் எதிர்ப்புகளை வென்று சாதனையாளராக ஜெயிப்பார்கள்.',
    ],
    detailsEn: [
      'Tithi Soonya in houses 3, 6, 10, and 11 drastically reduces the destructive sting of the affliction.',
      'Though severe endurance tests occur at inception, the native is guaranteed to overcome all odds and triumph.',
    ],
  },
  {
    id: 'guru_sun_moon_relief',
    titleTa: 'குரு பார்வை & சூரிய-சந்திர தீர்வு விதி',
    titleEn: 'Jupiter Aspect & Luminaries Relief Doctrine',
    summaryTa: 'குரு பார்த்தாலோ அல்லது சூரியன், சந்திரன் வீடுகள் சூன்யமானாலோ உடனடியாக தெய்வீகத் தீர்வு உண்டு.',
    summaryEn: 'Aspect of Jupiter or involvement of the Sun/Moon ensures divine resolution and remedies to the affliction.',
    detailsTa: [
      'திதி சூன்ய வீட்டினை சூரியன் பார்த்தாலும், சந்திரன் பார்த்தாலும், ராகு-கேது அங்கு இருந்தாலும் சூன்யம் வேலை செய்யும் ஆனால் தீர்வு உண்டு.',
      'குரு பகவான் பார்த்தாலோ, சூரியன் அல்லது சந்திரன் அந்த வீட்டில் நின்றாலோ விரைவான நிவாரணமும் தெய்வீகத் தீர்வும் கிடைக்கும்.',
      'சிம்மம் (சூரியன் வீடு) மற்றும் தனுசு (குரு வீடு) திதி சூன்ய வீடுகள் ஆனால் பாதிப்பு மிகக் குறைவு.',
    ],
    detailsEn: [
      'If Sun or Moon aspects the Soonya house, or Rahu/Ketu resides there, Soonya operates but carries a natural resolution.',
      'Aspect of divine Jupiter, or occupancy of Sun/Moon, delivers swift redemption and miraculous mitigation.',
      'If Leo (Sun’s home) or Sagittarius (Jupiter’s home) becomes Soonya, negative impact is minimal due to royal sattvic grace.',
    ],
  },
];
