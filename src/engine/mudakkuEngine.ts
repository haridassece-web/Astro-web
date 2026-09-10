import type {
  PlanetPosition,
  StartingDasaInfo,
  PresentDasaInfo,
  Panchanga,
  MudakkuIndividualPrediction,
  MudakkuBhavaData,
  MudakkuGeneralRule,
} from '../types/astrology';
import {
  SURYA_MUDAKKU_STAR_TABLE,
  MUDAKKU_LAGNA_BHAVA_MAP,
  BHAVA_MUDAKKU_RAHU_KETU_MAP,
} from '../data/traditionalPariharaData';

// Sign Names in Tamil & English
const SIGN_NAMES_TA = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
  'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
  'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்',
];

const SIGN_NAMES_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

// Planet Lords for Signs 0..11
const SIGN_LORDS: { en: string; ta: string }[] = [
  { en: 'Mars', ta: 'செவ்வாய்' },       // 0: Aries
  { en: 'Venus', ta: 'சுக்கிரன்' },     // 1: Taurus
  { en: 'Mercury', ta: 'புதன்' },       // 2: Gemini
  { en: 'Moon', ta: 'சந்திரன்' },       // 3: Cancer
  { en: 'Sun', ta: 'சூரியன்' },         // 4: Leo
  { en: 'Mercury', ta: 'புதன்' },       // 5: Virgo
  { en: 'Venus', ta: 'சுக்கிரன்' },     // 6: Libra
  { en: 'Mars', ta: 'செவ்வாய்' },       // 7: Scorpio
  { en: 'Jupiter', ta: 'குரு' },         // 8: Sagittarius
  { en: 'Saturn', ta: 'சனி' },          // 9: Capricorn
  { en: 'Saturn', ta: 'சனி' },          // 10: Aquarius
  { en: 'Jupiter', ta: 'குரு' },         // 11: Pisces
];

// 5 Universal Manuscript Rules
export const MUDAKKU_GENERAL_RULES: MudakkuGeneralRule[] = [
  {
    id: 'aani_gemini_transit',
    titleTa: 'ஆனி மாத மிதுன சூரிய சஞ்சாரத் தடை',
    titleEn: 'Aani Month Sun in Gemini Prohibition',
    instructionTa:
      'ஆனி மாதத்தில் மிதுன ராசியில் சூரியன் பயணிக்கும் போது எந்த வித சுபகாரியங்களையும் செய்யக்கூடாது.',
    instructionEn:
      'When the Sun transits Gemini during the month of Aani (mid-June to mid-July), strictly avoid commencing auspicious ceremonies (marriages, housewarming, launching new businesses).',
    severity: 'high',
  },
  {
    id: 'mudakku_lord_gemini_transit',
    titleTa: 'முடக்கு அதிபதி மிதுன ராசி சஞ்சார எச்சரிக்கை',
    titleEn: 'Mudakku Lord Gemini Transit Crisis Alert',
    instructionTa:
      'ஜாதகரின் முடக்கு அதிபதி கோசாரத்தில் மிதுன ராசியில் பயணிக்கும் போது மிகக் கடுமையான பாதிப்புகளும் சோதனைகளும் ஏற்படும். அமைதி காப்பது அவசியம்.',
    instructionEn:
      'When your personal Mudakku Lord transits Gemini in Gochara, severe crisis, financial strain, or emotional setbacks can occur. Utmost caution and remedial prayers are advised.',
    severity: 'high',
  },
  {
    id: 'aani_kuladeivam_remedy',
    titleTa: 'ஆனி மாத குலதெய்வம் & பிதுர் தோஷ நெய் தீப நிவர்த்தி',
    titleEn: 'Aani Month Kuladeivam & Pitru Ghee Earth Offering',
    instructionTa:
      'ஆனி மாதத்தில் குலதெய்வ வழிபாடு, பிதுர் தோஷம் நிவர்த்தி போன்ற நெய் பூமியின் மீது பட்ட பரிகாரங்களை மட்டுமே தாராளமாக செய்யலாம்.',
    instructionEn:
      'During Aani month, propitiations for Kuladeivam and Pitru Dosha remedies, specifically where ghee touches the sacred earth, can be beneficially performed.',
    severity: 'info',
  },
  {
    id: 'panguni_yama_soothiram',
    titleTa: 'பங்குனி மாத யமசூத்திர விதி',
    titleEn: 'Panguni Month Yama Soothiram Alert',
    instructionTa:
      'பங்குனி மாதம் யமசூத்திரம் என்பதால் அந்த மாதத்தில் எந்த நற்காரியங்களையும் புதிதாக தொடங்கக்கூடாது.',
    instructionEn:
      'Panguni month functions as Yama Soothiram; hence new auspicious deeds and investments should be put on hold.',
    severity: 'medium',
  },
  {
    id: 'born_in_mudakku_dasa',
    titleTa: 'முடக்கு அதிபதி திசையில் பிறப்பு பாதிப்பு',
    titleEn: 'Birth During Mudakku Lord Dasa Rule',
    instructionTa:
      'முடக்கு அதிபதியின் திசையில் ஒருவர் பிறந்தால் பால பருவத்தில் கடுமையான பாதிப்பும் தீவிர போராட்டங்களும் ஏற்படும்.',
    instructionEn:
      'If a native is born in the Dasa period of the Mudakku Lord, severe health ailments, family separation, or acute early childhood struggles manifest.',
    severity: 'high',
  },
];

// Complete 12 Bhavas Prediction Database from 5 Handwritten Manuscript Pages
export const MUDAKKU_BHAVAS_DATA: Record<number, MudakkuBhavaData> = {
  1: {
    bhava: 1,
    nameTa: '1-ம் பாவம் (லக்னம் - சுய சிந்தனை, தேகம் & தலைமை)',
    nameEn: '1st Bhava (Lagna - Self, Ego & Solitary Actions)',
    themeTa: 'சுய முடிவு தோல்வி & பிறர் ஆலோசனை எச்சரிக்கை',
    themeEn: 'Failure in Isolated Decisions & Reliance on Shared Wisdom',
    corePredictionsTa: [
      'யாருடைய ஆலோசனையையும் கண்மூடித்தனமாக கேட்கக்கூடாது; கேட்டால் தோல்வி ஏற்படும்.',
      'தன்னுடைய சுய சிந்தனையும் எளிதில் வெற்றி பெறாது; முரட்டுப் பிடிவாதம் நஷ்டத்தை தரும்.',
      'முன்னேற்றத்திற்கு மிகக் கடுமையாகப் பாடுபட வேண்டியிருக்கும்.',
      'எந்த ஒரு காரியத்தையும் தனியாக முடிவெடுத்து செய்யக்கூடாது; அப்படி செய்தால் அது தோல்வியில் முடியும்.',
    ],
    corePredictionsEn: [
      'Blindly accepting others’ advice leads to setbacks and regrets.',
      'One’s own solitary ego-driven thinking will also struggle to gain success.',
      'Must toil and struggle with intense perseverance for every single milestone.',
      'Never take major life decisions completely alone in isolation; unilateral moves bring failure.',
    ],
    doAndDontsTa: {
      dos: [
        'எந்த ஒரு முக்கிய முடிவுக்கும் நம்பகமான இருவர் அல்லது அனுபவமிக்க பெரியோர்களின் ஆலோசனை பெற்று கூட்டாகச் செயல்படவும்.',
        'பொறுமையையும் பணிவையும் வளர்த்துக் கொண்டு தினசரி இறைவழிபாட்டை தொடரவும்.',
      ],
      donts: [
        'தனித்து முடிவெடுப்பது கூடாது.',
        'மற்றவர்களின் தவறான வாக்குறுதிகளை உடனே நம்பி இறங்குவது கூடாது.',
        'முரட்டுத்தனமாக புதிய துறைகளில் தனியொருவராக முதலீடு செய்வது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Always consult two trusted confidants or seasoned mentors before executing any plan.',
        'Cultivate patience, humility, and grounded teamwork.',
      ],
      donts: [
        'Do not take unilateral executive decisions in isolation.',
        'Do not plunge into major commitments based on hasty impulsive thoughts.',
      ],
    },
    careerFinanceTa: [
      'சுய தொழில் தொடங்கும்போது தனியொருவராக களமிறங்காமல், நம்பகமான கூட்டாண்மை அல்லது ஆலோசகர் துணையுடன் செயல்படுவது நஷ்டத்தைத் தடுக்கும்.',
      'தலைமைப் பொறுப்புகளில் இருக்கும் போது அனைவரையும் அரவணைத்துச் செல்ல வேண்டும்.',
    ],
    careerFinanceEn: [
      'In business, avoid sole-proprietor isolation; operate with advisory checks and balances.',
      'In professional leadership, autocratic behavior will backfire.',
    ],
    familyRelationshipsTa: [
      'சுய பிடிவாதத்தால் குடும்பத்தில் வீண் வாக்குவாதங்கள் வரலாம்; கூட்டு முடிவுகளே அமைதியைத் தரும்.',
    ],
    familyRelationshipsEn: [
      'Ego-clashes can create friction in marital and domestic life; practice consensus.',
    ],
    doshaAlertsTa: [
      'சுய கவுரவத்தால் நல்ல வாய்ப்புகளை நழுவவிடும் லக்ன முடக்கு தோஷம்.',
    ],
    doshaAlertsEn: [
      'Affliction of isolated pride causing loss of timely opportunities.',
    ],
    pariharamTa:
      'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில் சென்று நெய்தீபமேற்றி வழிபடவும்.',
    pariharamEn:
      'Worship at Madurai Immayilum Nanmai Tharuvar Shiva Temple with pure ghee lamps.',
  },

  2: {
    bhava: 2,
    nameTa: '2-ம் பாவம் (தனம், வாக்கு, குடும்பம் & இரண்டாம் நபர் உதவி)',
    nameEn: '2nd Bhava (Wealth, Speech, Family & Indirect Operations)',
    themeTa: 'மறைமுக இயக்கம், நிதிச் சேதாரம் & இரு நபர் உதவி முறை',
    themeEn: 'Indirect Operations, Guarding Wealth & Dual-Assistant Protocol',
    corePredictionsTa: [
      'குடும்பம், தொழில், பொதுமக்கள், அரசியல் ஆகியவற்றில் நேரடியாக முன்வந்து இன்வால்வ் ஆகக்கூடாது.',
      'எந்த ஒரு காரியத்தையும் தனக்கு என்று இரு நபர்களின் உதவி மூலம் மட்டுமே செய்ய வேண்டும்.',
      'செய்யும் வேலையை மீண்டும் மீண்டும் திரும்பச் செய்ய வேண்டி வரும் (Rework).',
      'அரசியல் ஆலோசகர் போல திரைக்குப் பின்னணியில் இருந்து மட்டுமே இயங்க வேண்டும்.',
      'பணம் சம்பாதிக்க மிகவும் சிரமப்படுவார்; கவனக்குறைவால் கடனை அதிகமாக சேர்ப்பார்.',
      'மறைமுக அல்லது தவறான வழியில் இறங்கினால் கடுமையான அவமானங்களை சந்திக்க நேரிடும்; பொருளாதாரம் எப்பொழுதும் சேதாரமாகும்.',
    ],
    corePredictionsEn: [
      'Never get directly/visibly involved in front-facing political disputes, controversial family debates, or upfront guarantees.',
      'Always operate through two trusted deputies or intermediaries.',
      'Tasks frequently require repeated attempts and reworks before succeeding.',
      'Excels brilliantly as a backstage strategist or political advisor, not a front-line speaker.',
      'Struggles to retain wealth; prone to accumulating liabilities if financial prudence is lax.',
      'Underhand or illicit schemes bring deep public humiliation; financial leakages occur regularly.',
    ],
    doAndDontsTa: {
      dos: [
        'இரண்டு நம்பகமான உதவியாளர்களை முன்னிறுத்தி தொழிலை நடத்தவும்.',
        'அரசியல் மற்றும் நிறுவன ஆலோசகராக பின்னணியில் இயங்கி பெருமை பெறவும்.',
        'வரவு செலவு கணக்குகளை துல்லியமாக தணிக்கை செய்து பராமரிக்கவும்.',
      ],
      donts: [
        'நேரடி பொது வாக்குறுதிகள் தருவது, முன்வரிசையில் நின்று வாக்குவாதம் செய்வது கூடாது.',
        'அதிக வட்டிக்கு கடன் வாங்குவது மற்றும் நிதி மோசடி அபாயங்களில் ஈடுபடுவது கூடாது.',
        'முன்கோபமான பேச்சுகளால் குடும்பத்தில் பகையை வளர்ப்பது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Front two capable trusted associates to handle public facing transactions.',
        'Function as an astute backroom strategist or confidential advisor.',
        'Audit cashflow meticulously to avoid insidious wealth drain.',
      ],
      donts: [
        'Do not make direct open-ended public promises or upfront vocal pledges.',
        'Do not indulge in speculative borrowings or questionable financial schemes.',
      ],
    },
    careerFinanceTa: [
      'அரசியல் ஆலோசகர் (Political Strategist), திரைமறைவு உத்தி வகுப்பாளர், வரவு-செலவு தணிக்கையாளர் போன்ற பணிகள் இவருக்கு மிகுந்த வெற்றியளிக்கும்.',
      'நேரடி வியாபாரத்தில் இறங்கினால் நிதி விரயங்கள் வரும்; நம்பகமான மேலாளர்கள் மூலம் இயக்க வேண்டும்.',
    ],
    careerFinanceEn: [
      'Ideal for backroom policy advisors, strategic consultants, and executive analysts.',
      'Direct retail exposure leads to wealth leakages unless managed by dependable lieutenants.',
    ],
    familyRelationshipsTa: [
      'பேசும் வார்த்தைகளில் எப்போதும் நிதானம் தேவை; வாக்கு ஸ்தான முடக்கத்தால் தவறான புரிதல்கள் உருவாகலாம்.',
    ],
    familyRelationshipsEn: [
      'Speech can be misinterpreted by immediate kin; exercise verbal restraint.',
    ],
    doshaAlertsTa: [
      'வாக்கு தோஷம், மறைமுக அவமான தோஷம் மற்றும் தொடர் தன சேதார தோஷம்.',
    ],
    doshaAlertsEn: [
      'Speech dosha, hidden humiliation risk, and recurring wealth erosion affliction.',
    ],
    pariharamTa:
      'சிறுகுடி மங்களேஸ்வரர் கோயில் அல்லது ஸ்ரீரங்கம் ரங்கநாதர் கருடாழ்வார் சந்நிதியில் துளசி மாலை சாற்றி வழிபடவும்.',
    pariharamEn:
      'Worship at Sirugudi Mangaleswarar Temple or Srirangam Garuda Alwar Sannidhi.',
  },

  3: {
    bhava: 3,
    nameTa: '3-ம் பாவம் (வீரியம், தைரியம், இளைய சகோதரம் & ஆவணங்கள்)',
    nameEn: '3rd Bhava (Courage, Siblings, Real Estate & Documents)',
    themeTa: 'வீரபராக்கிரமத் தடை, தெரு சண்டை தவிர்த்தல் & ஜல்லிய தோஷ நிவர்த்தி',
    themeEn: 'Restraint of Bravado, Avoiding Street Disputes & Jalliya Dosha',
    corePredictionsTa: [
      'வீரபராக்கிரமம் எங்கும் காட்டக்கூடாது; வீண் தற்பெருமை பேசக்கூடாது.',
      'ரோட்டில், தெருவில் சண்டை போடக்கூடாது. தெருவில் சண்டை போடுபவர்களுக்கு 3-ம் பாவம் முடக்கமாக இருக்கும்.',
      'வெளிப்படையாக தன்னுடைய குடும்ப உறவுகளை அல்லது நட்புகளை வெளியில் பகிரங்கமாக காட்டக்கூடாது.',
      'தன்னுடைய தாய் மற்றும் உடன் பிறந்த சகோதரர்களுடன் கருத்து உடன்பாடு இருக்காது; மனக்கசப்பு வரும்.',
      'பூமி சம்பந்தப்பட்ட பாதிப்புகள் இருக்கும்; அப்படி வந்தால் "ஜல்லிய தோஷம்" நிவர்த்தி செய்ய வேண்டும்.',
      'ஆண்களாக இருந்தாலும் பெண்களாக இருந்தாலும் எதையும் பொறுப்பில் முழுமையாக ஒப்படைக்கக்கூடாது.',
      'நகை, சொத்து ஆவணங்கள் (Documents), பத்திரங்கள் போன்றவற்றை மற்றவர்களிடம் கஸ்டடியில் கொடுக்கக்கூடாது.',
      'உடன்பிறந்த சகோதரர் பிரிவு, மனக்கஷ்டம், பணம் நஷ்டம் ஏற்படும்.',
      '3-ம் பாவக முடக்கு அமைபவர்கள் திருச்செந்தூர் அல்லது திருப்பரங்குன்றம் சென்று வணங்க உருப்படுவர். ராகு தோஷ பாதிப்பு ஏற்படும்.',
    ],
    corePredictionsEn: [
      'Never show off physical bravado or aggressive displays of heroic strength.',
      'Strictly avoid street fights or public brawls; individuals who brawl in public usually carry 3rd house Mudakku.',
      'Do not publicly broadcast your personal family ties, romances, or private relationships.',
      'Frequent disagreements and lack of emotional concord with mother and co-born siblings.',
      'Property and landed real estate will suffer complications; if afflicted, "Jalliya Dosha" parihara must be done.',
      'Never entrust gold, promissory notes, land deeds, or core responsibilities completely to anyone, male or female.',
      'Risk of sibling estrangement, intense mental sorrow, and financial loss through trusting others with documents.',
      'Natives with 3rd house Mudakku must worship at Tiruchendur or Thiruparankundram to prosper; Rahu afflictions lurk.',
    ],
    doAndDontsTa: {
      dos: [
        'திருச்செந்தூர் மற்றும் திருப்பரங்குன்றம் முருகப்பெருமானை தொடர்ந்து நெய்தீபமேற்றி வழிபடவும்.',
        'நகைகளையும் பூர்வீக சொத்து ஆவணங்களையும் சொந்த வங்கி லாக்கரில் மட்டுமே பத்திரப்படுத்தவும்.',
      ],
      donts: [
        'தெருவில் சண்டை போடுவது, பொது இடங்களில் வீரம் பேசுவது அறவே கூடாது.',
        'சொத்து பத்திரங்கள், காசோலைகள், நகைகளை பிறர் பொறுப்பில் ஒப்படைக்கக்கூடாது.',
        'சகோதரர்களுடன் கூட்டு சொத்து விவகாரங்களில் உணர்ச்சிவசப்படக்கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Regularly offer ghee lamps at Tiruchendur or Thiruparankundram Murugan temples.',
        'Keep all original deeds, titles, and precious jewelry exclusively in safe bank custody.',
      ],
      donts: [
        'Never participate in roadside altercations or provocative arguments.',
        'Never hand over property documents or jewelry into others’ custody.',
      ],
    },
    careerFinanceTa: [
      'நிலம், சொத்து மற்றும் ஆவணங்கள் கையாளும் தொழில்களில் மிகுந்த சட்ட விழிப்புணர்வு தேவை; சகோதரர்களுடன் கூட்டாக வணிகம் செய்யக்கூடாது.',
    ],
    careerFinanceEn: [
      'Exercise immense legal vigilance in real estate and documentation; avoid joint businesses with siblings.',
    ],
    familyRelationshipsTa: [
      'சகோதரர்களுடன் பிரிவு அல்லது மனக்கசப்பு ஏற்பட வாய்ப்புண்டு; தாய்வழி உறவுகளிடம் அமைதி காப்பது நலம்.',
    ],
    familyRelationshipsEn: [
      'Estrangement or coldness with younger siblings; maintain peaceful boundaries.',
    ],
    doshaAlertsTa: [
      'ஜல்லிய தோஷம் (பூமித் தகராறு தோஷம்) மற்றும் ராகு பந்த தோஷம்.',
    ],
    doshaAlertsEn: [
      'Jalliya Dosha (land dispute affliction) and Rahu shadow node vulnerability.',
    ],
    pariharamTa:
      'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில் அல்லது திருப்பரங்குன்றம் சண்முகர் சந்நிதியில் வழிபாடு செய்வது.',
    pariharamEn:
      'Worship Lord Murugan at Thiruchendur or Thiruparankundram Temple.',
  },

  4: {
    bhava: 4,
    nameTa: '4-ம் பாவம் (சுகஸ்தானம், தாய், நிலம், வாகனம் - மிக முக்கிய பாவம்!)',
    nameEn: '4th Bhava (Sukhastanam, Mother, Real Estate & Vehicles - Pivotal Bhava!)',
    themeTa: 'நவகோள்களின் மூல மையம், பேராசை அழிவு, பிரம்ம தோஷம் & வாகன எச்சரிக்கை',
    themeEn: 'Axis of All 9 Planets, Overcoming Greed, Brahma Dosha & Vehicle Care',
    corePredictionsTa: [
      '9 நவ கோள்களும் மிக முக்கியமாக 4-ம் பாவத்தில் மட்டுமே இயங்கும். மிக, மிக, மிக முக்கியம். 12 பாவங்களும் 4-ம் பாவத்தில் அடங்கும்.',
      'நிலையான ஒரு இடத்தில் இல்லாமை; அடிக்கடி இடமாற்றம் மற்றும் மன அமைதியின்மை ஏற்படும்.',
      'பொன், பொருள் அழிதல்; அதிவேகத்தால் வாகன விபத்துகள் ஏற்படும் அபாயம்.',
      'முன்னோர்களின் பஞ்ச மகா புருஷ தோஷம் உண்டானால் சுகஸ்தானம் பாதிக்கப்படும்; பிரம்ம தோஷம் உண்டு.',
      'இவரால் என்ன விதைக்கப்பட்டதோ எல்லாவற்றையும் அவனே அழித்து விடுவான் (அ) இயல்பாக அழிந்துவிடும்.',
      'குடும்பம், உற்றார் உறவினர், தாய், தனவரவுகள், வாகனங்கள் விஷயத்தில் அதிகப்படியான பேராசையால் தோல்வி அடைதல்.',
    ],
    corePredictionsEn: [
      'All 9 planets operate fundamentally through the 4th house axis; all 12 bhavas converge here (critically important house).',
      'Instability in dwelling; unable to stay permanently in one home, frequent relocations and unrest.',
      'Destruction of gold and assets; high hazard of vehicular accidents if reckless.',
      'If ancestors incurred Pancha Maha Purusha Dosha, personal happiness and health are severely hit; Brahma Dosha manifests.',
      'Whatever has been painstakingly cultivated or built by the native risks being dismantled by their own hand or circumstances.',
      'Excessive greed regarding family, maternal assets, wealth influx, and vehicles directly precipitates total downfall.',
    ],
    doAndDontsTa: {
      dos: [
        'போதுமென்ற மனதுடன் வாழப் பழகவும்; தாய் மற்றும் முதியோர்களை அன்போடு ஆதரிக்கவும்.',
        'வாகனங்களை மிக நிதானமாக ஓட்டவும்; புதுக்கோட்டை செவலூர் பூமிநாதசுவாமியை வழிபடவும்.',
      ],
      donts: [
        'பேராசையுடன் சொத்துக்களை வாங்கிக் குவிப்பது, ரியல் எஸ்டேட்டில் குறுக்கு வழியை நாடுவது கூடாது.',
        'தாய் மற்றும் குடும்பத்தினரை அலட்சியம் செய்வது கூடாது.',
        'அதிவேகமாகவோ கவனக்குறைவாகவோ வாகனம் ஓட்டுவது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Cultivate contentment; treat mother and family matriarchs with deep reverence.',
        'Drive vehicles with extreme care and defensive caution.',
      ],
      donts: [
        'Do not amass land or properties out of rampant greed.',
        'Never disrespect or neglect mother’s emotional well-being.',
      ],
    },
    careerFinanceTa: [
      'ரியல் எஸ்டேட் மற்றும் வாகனத் தொழிலில் பேராசைப்பட்டால் பெரும் வீழ்ச்சி ஏற்படும்; நியாயமான முதலீடுகளே பலன் தரும்.',
    ],
    careerFinanceEn: [
      'Greed in property development or automobile trading leads to ruin; stick to disciplined ethical ventures.',
    ],
    familyRelationshipsTa: [
      'தாயாரின் ஆரோக்கியத்தில் அதிக கவனம் தேவை; பூர்வீக இல்லத்தில் தொடர்ந்து தங்குவதில் தடைகள் வரலாம்.',
    ],
    familyRelationshipsEn: [
      'Mother’s health requires watchful care; frequent changes of residence.',
    ],
    doshaAlertsTa: [
      'பிரம்ம தோஷம், பஞ்ச மகா புருஷ சாப தோஷம் மற்றும் வாகன கண்ட தோஷம்.',
    ],
    doshaAlertsEn: [
      'Brahma Dosha, ancestral Pancha Maha Purusha curse, and vehicular accident hazard.',
    ],
    pariharamTa:
      'செவலூர் பூமிநாதசுவாமி திருக்கோயில் (புதுக்கோட்டை) அல்லது மணச்சநல்லூர் பூமிநாதசுவாமி கோயிலில் நெய்தீபமேற்றுதல்.',
    pariharamEn:
      'Worship at Sevalur Boominathaswamy Temple (Pudukkottai) or Manachanallur Boominathaswamy Temple.',
  },

  5: {
    bhava: 5,
    nameTa: '5-ம் பாவம் (பூர்வ புண்ணியம், குலதெய்வம், புத்திர பாக்கியம் & சந்ததி)',
    nameEn: '5th Bhava (Purva Punya, Kuladeivam, Progeny & Lineage)',
    themeTa: 'குலதெய்வ அருள் குறைவு, தாய்மாமன் ஊழ்வினை, புத்திர சாபம் & ஜல்லிய தோஷம்',
    themeEn: 'Kuladeivam Grace Deficit, Maternal Uncle Karma, Child Affliction & Jalliya Dosha',
    corePredictionsTa: [
      'குலதெய்வத்தின் அனுகிரகம் குறைவாக இருக்கும் அல்லது தடைபடும்.',
      'தாய்வழி உடன்பிறந்த சகோதரர் (தாய் மாமன்) மூலமாக ஊழ்வினை கர்ம தோஷம் உண்டு.',
      'தொழில் மற்றும் குடும்பத்தில் அபிவிருத்தி குறைதல்; தாய் மாமன் உறவில் விரிசல் ஏற்படும்.',
      'குலதெய்வ சாபம் மற்றும் கற்ற கல்வியினால் பெறக்கூடிய யோகம் முழுமையாக பயன்படாமல் போதல்.',
      'குழந்தைகள் சாபம் உண்டு; குழந்தைகள் வழியில் உடல், மனம், பண ரீதியான பாதிப்புகள் ஏற்படுதல்.',
      'குரு, சுக்கிரன் இணைவுகள் உள்ள ஜாதகங்களில் இதன் தாக்கம் அதிகமாக இருக்கும்.',
      'தன்னுடைய பின் சந்ததிக்கு இனவிருத்தி குறைவு, நரம்பு மற்றும் தோல் சம்பந்தப்பட்ட பாதிப்புகள் ஏற்படும்; குடும்ப வாழ்க்கையில் திருமணம் பாதிப்பு.',
      'கடுமையான கடன்பட்டவன் பூமி, தோண்டப்பட்ட பூமி, தீர்மானம், தீராத கோர்ட் கேஸ் வம்பு வழக்குகள் உள்ள பூமியை வாங்குவதால் வரும் "ஜல்லிய தோஷம்"!',
    ],
    corePredictionsEn: [
      'Kuladeivam (ancestral guardian deity) blessings are diminished or obstructed due to past neglect.',
      'Heavy karmic baggage flows through maternal uncles (mother’s co-born brothers).',
      'Stagnation in business and domestic expansion; souring of relationships with maternal uncles.',
      'Curse of Kuladeivam; inability to reap the fruitful benefits of one’s academic degrees.',
      'Santhana / child-related afflictions; emotional and financial distress experienced through children.',
      'Affliction is amplified if Jupiter-Venus mutual connections or conjunctions exist.',
      'Posterity / lineage struggles, nervous debility, or skin ailments in descendants; marital strain.',
      'Dangerous warning: Buying heavily debt-ridden land, excavated/dug-up earth, or property trapped in bitter court litigation inflicts severe "Jalliya Dosha"!',
    ],
    doAndDontsTa: {
      dos: [
        'வருடந்தோறும் குடும்பத்துடன் குலதெய்வம் கோயிலுக்குச் சென்று நெய்பூமி பரிகாரம் மற்றும் பொங்கலிடுதல்.',
        'ஆதரவற்ற குழந்தைகளுக்கு கல்வி உதவி மற்றும் உணவு வழங்குதல்.',
      ],
      donts: [
        'குலதெய்வ வழிபாட்டை மறப்பது அல்லது அலட்சியம் செய்வது கூடாது.',
        'தாய் மாமனை பகைத்துக் கொள்வது கூடாது.',
        'கடன் தீர்க்க முடியாமல் தவிக்கும் நபர்களின் நிலத்தையோ, கோர்ட் கேஸ் உள்ள நிலத்தையோ அற்ப விலைக்கு வாங்குவது கூடாது (ஜல்லிய தோஷம்).',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Perform annual Kuladeivam pilgrimage and make sacred ghee offerings to the earth.',
        'Sponsor education and meals for underprivileged children.',
      ],
      donts: [
        'Never ignore or postpone ancestral Kuladeivam rituals.',
        'Never buy distressed, debt-ridden, or litigant properties (avoids Jalliya Dosha).',
      ],
    },
    careerFinanceTa: [
      'கற்ற படிப்பு ஒரு துறையாகவும், செய்யும் வேலை முற்றிலும் வேறொரு துறையாகவும் இருக்கும்; ஸ்பெகுலேஷன் சூதாட்டங்களைத் தவிர்க்கவும்.',
    ],
    careerFinanceEn: [
      'Career will deviate widely from academic credentials; strictly avoid speculative trading.',
    ],
    familyRelationshipsTa: [
      'குழந்தைகளின் ஆரோக்கியம் மற்றும் எதிர்காலத்தில் கூடுதல் கவனம் தேவை; தாய் மாமனுடன் சுமுகமான உறவைப் பேணவும்.',
    ],
    familyRelationshipsEn: [
      'Childhood health of offspring and lineage continuation need spiritual remediation.',
    ],
    doshaAlertsTa: [
      'குலதெய்வ சாபம், புத்திர சாபம், தாய்மாமன் ஊழ்வினை தோஷம் மற்றும் ஜல்லிய தோஷம்.',
    ],
    doshaAlertsEn: [
      'Kuladeivam curse, child-karma dosha, maternal uncle karmic debt, and Jalliya Dosha.',
    ],
    pariharamTa:
      'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில் அல்லது சீயாத்தமங்கை அயவந்தீஸ்வரர் திருக்கோயில் வழிபாடு.',
    pariharamEn:
      'Worship Lord Murugan at Thiruchendur or Shiva at Seeyathamangai Ayavantheeswarar Temple.',
  },

  6: {
    bhava: 6,
    nameTa: '6-ம் பாவம் (ருணம், ரோகம், சத்ரு, கோபம் & பிறருக்காக வாழ்தல்)',
    nameEn: '6th Bhava (Debts, Disease, Enemies, Temper & Altruism)',
    themeTa: 'ஊருக்கு உபதேசம், ஆவாளி கோபம், கடன்/ஜாமீன் தவிர்த்தல் & பிறருக்காக வாழ்தல்',
    themeEn: 'Universal Counsel, Uncontrolled Anger, Avoiding Guarantees & Living for Others',
    corePredictionsTa: [
      'ருணம் (கடன்), ரோகம் (நோய்), சத்ரு (எதிரி) சம்பந்தப்பட்ட தாக்கங்கள் அதிகமாக இருக்கும்.',
      'இயல்பில் மிகுந்த வீரதீர பராக்கிரமசாலி.',
      'அடிக்கடி கோபம் வரும்; வருவது பலவீனமான ஆவாளி கோபம். தேவையான நேரத்தில் நிதானமாகவும், தகுந்த நேரத்தில் மட்டுமே கோபம் வெளிப்பட வேண்டும்.',
      'பூர்விக சொத்து மற்றும் டாக்குமெண்ட் (பத்திரங்கள்) பிரச்சனைகள் தலைதூக்கும்.',
      'சீட்டுப் போடுதல், ஜாமீன் போடுதல், கைமாத்து லோன் வாங்குவது கொடுப்பது எதுவும் சரிவராது; கடுமையான நஷ்டத்தில் முடியும்.',
      'ஊருக்கு உபதேசம் செய்பவர்கள்; பலசாலிகள்; செங்கோட்டு கடன் தீர்க்க விழுந்தவர்கள். பிறருக்காக தன்னுடைய வாழ்க்கையையே தொலைப்பவர்கள்!',
      'அனைத்து துறைகளிலும் விஷயம் தெரிந்த நபர்; ஆனால் அவருடைய அறிவு அவருக்குப் பயன்படாது, அடுத்தவர்களுக்குப் பயன்படும்.',
      'அடுத்தவர்கள் செய்யும் தவறுக்கு இவர்கள் மாட்டிக் கொள்வார்கள்!',
    ],
    corePredictionsEn: [
      'Entanglements with debts (Runa), recurring illness (Roga), and hidden enemies (Satru).',
      'Possesses innate valor, physical bravery, and a fighting warrior spirit.',
      'Frequent flare-ups of explosive, impulsive anger that weakens personal standing; must learn emotional equilibrium.',
      'Ancestral properties and document titles will encounter legal or ownership disputes.',
      'Chit funds, signing loan guarantees, informal lendings, or borrowing heavily will trigger disastrous losses.',
      'Preaches brilliant advice to the entire world; strong-willed, yet born to pay others’ karmic debts; sacrifices own life for others!',
      'A polymath knowledgeable in every field; however, their vast wisdom benefits others while they struggle personally.',
      'Frequently ends up taking the blame or bearing the penalty for misdeeds committed by others!',
    ],
    doAndDontsTa: {
      dos: [
        'ஆவாளி கோபத்தை அடக்கி நிதானத்தை பழகவும்; தியானம் மற்றும் யோகா செய்யவும்.',
        'எந்த ஒரு சொத்து வாங்கும்போதும் சட்ட வல்லுநர்களைக் கொண்டு பத்திரங்களை முழுமையாக ஆய்வு செய்யவும்.',
      ],
      donts: [
        'யாருக்கும் கடன் ஜாமீன் கையெழுத்து போடக்கூடாது.',
        'சீட்டுப் பிடிக்கவோ, சீட்டில் சேரவோ, கந்துவட்டி வாங்கவோ கூடாது.',
        'அடுத்தவர்களின் குடும்ப அல்லது பண விவகாரங்களில் தேவையின்றி பஞ்சாயத்து செய்து தலையிடக்கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Master anger management and emotional equanimity through meditation.',
        'Thoroughly vet property titles and legal deeds through independent jurists.',
      ],
      donts: [
        'Never sign as loan guarantor or surety for anyone under any circumstance.',
        'Never engage in chit funds, informal usurious money-lending, or unverified loans.',
        'Avoid arbitrating other people’s financial or domestic squabbles.',
      ],
    },
    careerFinanceTa: [
      'சட்டம், மருத்துவம், ஆலோசனை, சேவைத் துறைகளில் பிறருக்கு வெற்றிகரமாக வழிகாட்டுவார்; ஆனால் சொந்த நிதியில் கடன் சுமை கூடாமல் விழிப்புடன் இருக்க வேண்டும்.',
    ],
    careerFinanceEn: [
      'Excels in legal, medical, dispute-resolution, and advisory professions; must guard own balance sheet.',
    ],
    familyRelationshipsTa: [
      'அடுத்தவர்களுக்கு உதவும் அளவுக்கு சொந்த குடும்பத்தினருக்கு உதவ முடியாமல் போகலாம்; குடும்பத்தாரிடம் பரிவு காட்டவும்.',
    ],
    familyRelationshipsEn: [
      'May end up sacrificing personal family comforts for external acquaintances; keep family first.',
    ],
    doshaAlertsTa: [
      'ருண ரோக சத்ரு தோஷம், ஜாமீன் நஷ்ட தோஷம் மற்றும் ஆவாளி கோப தோஷம்.',
    ],
    doshaAlertsEn: [
      'Debt-disease-enemy affliction, loan surety penalty dosha, and volatile temper risk.',
    ],
    pariharamTa:
      'கும்பகோணம் மகாமககுளம் அருகில் உள்ள வீரபத்திரர் திருக்கோயிலில் வழிபாடு செய்வது உன்னத நிவர்த்தியாகும்.',
    pariharamEn:
      'Worship at Kumbakonam Mahamaham Tank Veera Bhathrar Temple.',
  },

  7: {
    bhava: 7,
    nameTa: '7-ம் பாவம் (களத்திரம், கூட்டாண்மை, திருமணம் & பொதுஜன ஆதரவு)',
    nameEn: '7th Bhava (Spouse, Partnerships, Marriage & Public Relations)',
    themeTa: 'பொதுமக்கள் சப்போர்ட் இன்மை, நம்பிக்கை துரோகம், தாமத திருமணம் & அவசர நஷ்டம்',
    themeEn: 'Lack of Public Support, Betrayal in Trust, Delayed Marriage & Hasty Losses',
    corePredictionsTa: [
      'உறவினர்கள், பொதுமக்கள், வாடிக்கையாளர்கள், துணை, தொழில் பங்குதாரர்கள் வழியில் சோதனைகள் வரும்.',
      'பொதுமக்கள் சப்போர்ட் (Public Support) எளிதில் கிடைக்காது.',
      'குடும்பம், தொழில், பொதுசபை போன்ற பொறுப்புகளை மற்றவர்களிடம் முழுமையாக ஒப்படைக்கக்கூடாது.',
      'தாய், தகப்பன் பகை உண்டாகும்; சொந்தங்களும் நண்பர்களும் பகையாவார்கள்; அவர்களிடம் ஏமாறுவார்கள்.',
      'அதிகமாக மற்றவர்களை நம்பி கடுமையான நம்பிக்கை துரோகம் அனுபவிப்பார்கள்.',
      'குடும்ப வாழ்க்கையில் மிகுந்த கவனமும் பொறுமையும் தேவை.',
      'திருமணம் தாமதமாகும்; திருமணத்திற்குப் பிறகும் பிரச்சனைகள் தொடர வாய்ப்புண்டு.',
      'அவசரத்தினால் பெரும் பொருள் இழப்பு ஏற்படும்.',
    ],
    corePredictionsEn: [
      'Vulnerabilities in dealings with relatives, public clients, spouse, and business partners.',
      'Public support and popular acclaim will be elusive or unstable.',
      'Never delegate complete authority over family, enterprise, or public duties to others.',
      'Friction with parents; close relatives and friends turn antagonistic, leading to deceit.',
      'Suffers severe betrayals by trusting acquaintances and associates blindly.',
      'Domestic married life demands supreme emotional maturity and endurance.',
      'Marriage experiences delays; relationship challenges persist unless properly matched.',
      'Hasty, impulsive actions lead to major monetary and asset depletions.',
    ],
    doAndDontsTa: {
      dos: [
        'வாழ்க்கைத் துணையுடன் எப்போதும் வெளிப்படையான மனத்திறந்த உரையாடலை வைக்கவும்.',
        'தொழிலில் வரவு செலவு மற்றும் முக்கிய அதிகாரங்களை தானே வைத்துக்கொள்ளவும்.',
      ],
      donts: [
        'நண்பர்களையும் உறவினர்களையும் கண்மூடித்தனமாக நம்பி தொழில் பங்காளியாக சேர்க்கக்கூடாது.',
        'குடும்ப மற்றும் நிறுவன முடிவுகளை மற்றவர்களின் கையில் தாரைவார்க்கக்கூடாது.',
        'அவசரப்பட்டு திருமண முடிவுகளையோ தொழில் ஒப்பந்தங்களையோ செய்யக்கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Maintain open, transparent communication with your spouse.',
        'Retain executive and financial control directly in your own hands.',
      ],
      donts: [
        'Never enter equal business partnerships with close relatives or friends.',
        'Never surrender core authority over family affairs to outsiders.',
      ],
    },
    careerFinanceTa: [
      'கூட்டுத் தொழில் (Partnership) அறவே கூடாது; தனி உரிமையாளராகவோ அல்லது முழுமையான கட்டுப்பாடு கொண்ட நிறுவனமாகவோ மட்டுமே நடத்த வேண்டும்.',
    ],
    careerFinanceEn: [
      'Strictly avoid 50-50 business partnerships; operate exclusively as sole proprietor or majority holder.',
    ],
    familyRelationshipsTa: [
      'திருமணத்திற்குப் பின் மாமியார் மற்றும் உறவினர் தலையீடுகளை தவிர்ப்பது குடும்ப அமைதியைக் காக்கும்.',
    ],
    familyRelationshipsEn: [
      'Keep in-laws and external relatives at a healthy respectful distance to preserve marital peace.',
    ],
    doshaAlertsTa: [
      'களத்திர தோஷம், கூட்டாளி துரோக தோஷம் மற்றும் பொதுஜன விரோத தோஷம்.',
    ],
    doshaAlertsEn: [
      'Kalathra (spouse) affliction, partner betrayal karma, and public antipathy dosha.',
    ],
    pariharamTa:
      'திருப்பரங்குன்றம் சுப்பிரமணியசுவாமி மற்றும் சென்னை சித்துக்காடு தாத்திரீஸ்வரர் திருக்கோயிலில் வழிபாடு செய்தல்.',
    pariharamEn:
      'Worship at Thiruparankundram Murugan Temple and Sithukadu Thathreeswarar Temple.',
  },

  8: {
    bhava: 8,
    nameTa: '8-ம் பாவம் (ஆயுள், ரகசியம், சுழற்சி நஷ்டம் & ராகு தோஷம்)',
    nameEn: '8th Bhava (Longevity, Secrets, Recurring Cycles & Rahu Affliction)',
    themeTa: 'ரகசியங்கள் வெளிப்படுதல், தொடங்கிய இடத்திற்கே திரும்புதல் & வீழ்ச்சி தடுப்பு',
    themeEn: 'Unearthing Hidden Truths, Cyclic Reversals & Fall Prevention',
    corePredictionsTa: [
      'ரகசியங்களை வெளிக்கொணரக்கூடிய பாவகம்; புதைக்கப்பட்ட உண்மைகள் பகிரங்கமாகும்.',
      'இழந்ததை மீண்டும் பெறக்கூடிய பாவகம்; ஆனால் தொடங்கிய இடத்திலேயே ஆரம்பித்து மீண்டும் அதே இடத்திற்குத் திரும்பும் விசித்திர சுழற்சி.',
      'புதையல் போன்ற மறைமுக அதிர்ஷ்டங்களை தேடி துன்பம் அடைவர்; இழந்து திரும்ப இழந்து கடுமையான ராகு தோஷம் உண்டாகும்.',
      '8-ம் இடம் பாதிக்கப்பட்டவர்கள் உச்சத்திற்கு வளர்ந்த பிறகும் மீண்டும் கீழ்மட்டத்திற்கு வந்துவிடுவார்கள்; எனவே எப்போதும் அடக்கமும் விழிப்புணர்வும் அவசியம்.',
    ],
    corePredictionsEn: [
      'Deep capacity to expose closely guarded secrets and occult mysteries.',
      'Capacity to regain what was lost; however, life often moves in a peculiar cycle returning to square one.',
      'Chasing buried treasure or overnight windfalls brings suffering; recurrent losses akin to severe Rahu dosha.',
      'Individuals with afflicted 8th house Mudakku can rise to great pinnacles only to slide back down if arrogance takes over.',
    ],
    doAndDontsTa: {
      dos: [
        'எளிமையான, நேர்மையான வாழ்க்கை முறையைக் கடைப்பிடிக்கவும்; ஆன்மீக தியானம் மற்றும் ஆயுள் வழிபாடு செய்யவும்.',
        'செல்வம் கூடும் போது தர்ம காரியங்கள் செய்து புண்ணியத்தை சேமிக்கவும்.',
      ],
      donts: [
        'புதையல், லாட்டரி, போலி ஆன்லைன் முதலீடுகள் போன்ற குறுக்கு வழிகளில் பணத்தை போடக்கூடாது.',
        'ரகசிய விவகாரங்கள் மற்றும் சட்டவிரோத செயல்களில் ஈடுபடக்கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Anchor yourself in spiritual sadhana, humility, and altruistic charity.',
        'Bank savings conservatively during periods of peak wealth to cushion cyclical dips.',
      ],
      donts: [
        'Never pursue lottery, underground treasure schemes, or shadowy speculative bubbles.',
        'Never participate in clandestine or illegal transactions.',
      ],
    },
    careerFinanceTa: [
      'ஆராய்ச்சி, புலனாய்வு, காப்பீடு, சுரங்கம், மருந்து மற்றும் மறைபொருள் ஆய்வுகளில் உச்சம் பெறலாம்; ஊக வணிகத்தில் மொத்தமும் அழியும்.',
    ],
    careerFinanceEn: [
      'Excels in forensics, scientific research, insurance, mining, and esoteric occult sciences.',
    ],
    familyRelationshipsTa: [
      'குடும்ப ரகசியங்கள் பிறரிடம் பகிரப்படாமல் காக்கவும்; மன அழுத்தங்களைத் தணிக்க இறைவழிபாடு துணை நிற்கும்.',
    ],
    familyRelationshipsEn: [
      'Shield confidential family matters from gossip; turn to spiritual meditation during emotional storms.',
    ],
    doshaAlertsTa: [
      'தீவிர ராகு தோஷம், அஷ்டம முடக்கு தோஷம் மற்றும் சுழற்சி நஷ்ட தோஷம்.',
    ],
    doshaAlertsEn: [
      'Acute Rahu node affliction, Ashtama Mudakku dosha, and cyclic reversal affliction.',
    ],
    pariharamTa:
      'திருக்கடையூர் அமிர்தகடேஸ்வரர் அபிராமி அம்மன் திருக்கோயில் சென்று மிருத்யுஞ்சய ஹோமம் மற்றும் நெய்தீப வழிபாடு.',
    pariharamEn:
      'Perform Mrityunjaya Homam and ghee lamp worship at Thirukadaiyur Abirami Temple.',
  },

  9: {
    bhava: 9,
    nameTa: '9-ம் பாவம் (பாக்கியம், தந்தை, தர்மம், வெளிநாடு & தியாக வாழ்க்கை)',
    nameEn: '9th Bhava (Fortune, Father, Dharma, Relocation & Selfless Sacrifice)',
    themeTa: 'வாழ்க்கைத் தியாகி, வெளிநாட்டு யோகம், கடன் ஏமாற்றம் & பெண்களுக்கு முதல் குழந்தை தாமதம்',
    themeEn: 'Lifelong Sacrificer, Foreign Relocation, Loan Deceit & Female Progeny Challenges',
    corePredictionsTa: [
      'ஆண்களுக்கு வாழ்க்கையில் மிகப்பெரிய தியாகி! குடும்பம், தொழில், சொந்த ஆசைகள் அனைத்தையும் பிறருக்காக விட்டுக் கொடுப்பார்கள்.',
      '9-ம் பாவம் முடக்கு ஆனவர்கள் வெளிநாடு, வெளிமாவட்டம் சென்று இடம் மாறி வாழ்ந்தால் மேன்மை அடைவர்.',
      'இயல்பிலேயே விட்டுக் கொடுக்கும் உன்னத தாராள குணம் கொண்டவர்கள்.',
      'மற்றவர்களுக்கு பணம் கடன் கொடுத்து ஏமாற்றங்களை அடைவர்.',
      'பெண்களுக்கு: முதல் குழந்தை விஷயத்தில் அடிக்கடி இழப்பு (அ) மிகுந்த தாமதம் ஏற்படும்; கரு தங்காமல் போகும் அபாயம்.',
      'குழந்தைகளை அடுத்தவர்களிடம் (காப்பகம் அல்லது தாத்தா பாட்டியிடம்) விட்டுவிட்டு வேலைக்குச் செல்லும் சூழ்நிலை பெண்களுக்கு உருவாகும்.',
    ],
    corePredictionsEn: [
      'Men become ultimate lifelong martyrs/sacrificers, surrendering their own comforts and dreams for family.',
      'Natives with 9th house Mudakku flourish exceptionally by relocating abroad, to other districts, or far from birthplace.',
      'Innate magnanimity and noble forgiving disposition.',
      'Lending money to others results in deceit and unrecoverable capital losses.',
      'For women: frequent challenges, delays, or miscarriages regarding the first pregnancy; difficulty carrying to term.',
      'Working mothers frequently face situations where they must leave children in daycares or grandparents’ care.',
    ],
    doAndDontsTa: {
      dos: [
        'பிறந்த ஊரை விட்டு வெளிமாவட்டம் அல்லது வெளிநாட்டில் பணி/தொழில் செய்ய முன்வரவும்.',
        'பெண்கள் கர்ப்ப காலத்தில் மருத்துவ ஆலோசனையையும் விசேஷ அம்பாள் வழிபாட்டையும் தவறாமல் கடைப்பிடிக்கவும்.',
      ],
      donts: [
        'நண்பர்களுக்கோ உறவினர்களுக்கோ கைமாத்தாகவோ அல்லது வட்டிக்கோ பணம் கடன் கொடுக்கக்கூடாது.',
        'பிறந்த ஊரிலேயே தங்கி வாய்ப்புகளை வீணடிப்பது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Embrace relocation overseas or to distant economic hubs for career flourishing.',
        'Women expecting first child must observe strict prenatal medical guidance and Devi prayers.',
      ],
      donts: [
        'Never lend personal savings on verbal goodwill; money will not return.',
        'Avoid clinging rigidly to native town if growth stagnates.',
      ],
    },
    careerFinanceTa: [
      'பன்னாட்டு நிறுவனங்கள், வெளிநாட்டு வர்த்தகம், ஏற்றுமதி-இறக்குமதி, தூர தேசப் பயணங்கள் மூலம் பெரும் தனலாபம் கிட்டும்.',
    ],
    careerFinanceEn: [
      'Cross-border enterprises, multinational tech firms, and international exports yield supreme fortune.',
    ],
    familyRelationshipsTa: [
      'தந்தையுடன் கருத்து வேறுபாடுகள் வரலாம்; மற்றவர்களுக்காக தன் ஆசைகளை தியாகம் செய்யும் நிலை உருவாகும்.',
    ],
    familyRelationshipsEn: [
      'Philosophical differences with father; persistent inclination to sacrifice personal joy for dependents.',
    ],
    doshaAlertsTa: [
      'பிதுர் பாக்கிய தடை தோஷம், புத்திர கர்ப்ப தோஷம் (பெண்களுக்கு) மற்றும் தியாக மன உளைச்சல் தோஷம்.',
    ],
    doshaAlertsEn: [
      'Pitru fortune obstacle, first pregnancy vulnerability (females), and martyrdom fatigue.',
    ],
    pariharamTa:
      'விராலிமலை முருகன் திருக்கோயில் அல்லது திருவிடைமருதூர் மகாலிங்கசுவாமி கோயிலில் தரிசனம் செய்தல்.',
    pariharamEn:
      'Worship at Viralimalai Murugan Temple or Thiruvidaimarudur Mahalingaswamy Temple.',
  },

  10: {
    bhava: 10,
    nameTa: '10-ம் பாவம் (ஜீவனம், தொழில் போராட்டம், சனி+ராகு & பிரம்ம தோஷம்)',
    nameEn: '10th Bhava (Career, Livelihood Struggle, Saturn+Rahu & Brahma Dosha)',
    themeTa: 'உறவினர் இழப்பு, சனி-ராகு ஜீவன போராட்டம், தொழில் நிலைப்பின்மை & பிரம்ம தோஷம்',
    themeEn: 'Bereavement of Kin, Saturn-Rahu Livelihood Battle, Career Instability & Brahma Dosha',
    corePredictionsTa: [
      'தன்னுடைய வாழ்விலே நெருங்கிய உறவினர்களின் இழப்பை (அ) மரணத்தை மிக அருகில் சந்திப்பார்கள்.',
      'சனி + ராகு சம்பந்தப்பட்டு இருக்கும் (இணைப்பு அல்லது பார்வை); ஜீவனத்திற்கு இடைவிடாது போராடக்கூடிய ஜீவன்.',
      'தன்னுடைய தொழில் நிலையாக, நிரந்தரமாக அமைய கடுமையாகப் போராடுவார்கள்; அடிக்கடி வேலை அல்லது தொழில் மாற்றம் ஏற்படும்.',
      'அடிக்கடி கடன்படுபவர்கள் இவர்களே. தொடக்கத்தில் தொழில், குடும்பம், குழந்தைகளில் வளர்ச்சி மந்தமாக இருக்கும்.',
      'சனி + ராகு இணைப்பு கண்டிப்பாக இருக்கும். சமுதாய அந்தஸ்து, வெற்றி, வாழ்வு, கௌரவம் ஆகியவற்றுக்கு பெரும் போராட்டத்திற்குப் பிறகே நிலைக்கும்.',
      'ஜாதகரின் முன்னோர்களின் பாவத்தின் விளைவாக தொழில் பாதிக்கக்கூடிய பாவகம்.',
      'வாழ்வில் அனைத்து விதமான வசதிகள் இருந்தும் அதை அனுபவித்து பயன்படுத்த முடியாத நிலை; இவர்களுக்கு "பிரம்ம தோஷம்" உண்டு.',
    ],
    corePredictionsEn: [
      'Experiences profound bereavement or untimely loss of close beloved relatives during lifetime.',
      'Direct connection with Saturn + Rahu (by conjunction or aspect); native wages a ceaseless battle for livelihood.',
      'Struggles immensely to establish career permanence; plagued by recurring occupational disruptions.',
      'Prone to recurrent debt burdens; early life sees slow progress in business, domestic joy, and progeny.',
      'Social prestige, victory, honor, and prosperity are cemented only after enduring protracted battles.',
      'Ancestral karmic sins directly impact professional stability in this incarnation.',
      'Possesses all worldly comforts around them, yet cannot enjoy them in peace; afflicted by "Brahma Dosha".',
    ],
    doAndDontsTa: {
      dos: [
        'எந்தத் தொழில் செய்தாலும் நேர்மையும் கடும் உழைப்பும் தவறாமல் இருக்க வேண்டும்.',
        'தினசரி சிவபுராணம் அல்லது திருவாசகம் ஓதுதல்; ஆதரவற்ற முதியோர்களுக்கு அன்னதானம் செய்தல்.',
      ],
      donts: [
        'மனம் சோர்ந்து தொழிலை அடிக்கடி மாற்றிக்கொண்டே இருப்பது கூடாது.',
        'அநாவசிய கடன் வாங்குவது மற்றும் குறுக்கு வழிகளில் அந்தஸ்தைத் தேடுவது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Anchor career in absolute ethical integrity, relentless grit, and unshakeable stamina.',
        'Provide food charity and support to aged destitute elders regularly.',
      ],
      donts: [
        'Do not impulsively quit vocations during temporary downturns.',
        'Avoid taking debt upon debt to maintain false social appearances.',
      ],
    },
    careerFinanceTa: [
      'வயது 36-40 வரை தொழிலில் கடும் சோதனைகள் இருக்கும்; அதன் பிறகு அனுபவ முதிர்ச்சியால் அசைக்க முடியாத சமுதாய அந்தஸ்தைப் பெறுவர்.',
    ],
    careerFinanceEn: [
      'Career stabilizes substantially after age 36-40; persistence crowns them with profound authority.',
    ],
    familyRelationshipsTa: [
      'குடும்பத்தின் முழு பாரத்தையும் தனியொருவராக சுமக்க வேண்டி வரும்; மூத்தவர்களின் இழப்பு மனதை பாதிக்கும்.',
    ],
    familyRelationshipsEn: [
      'Carries heavy family responsibilities alone; bereavement of patriarchs leaves deep marks.',
    ],
    doshaAlertsTa: [
      'பிரம்ம தோஷம், முன்னோர்களின் பாவகர்ம தோஷம் மற்றும் சனி-ராகு ஜீவன சாப தோஷம்.',
    ],
    doshaAlertsEn: [
      'Brahma Dosha, ancestral lineage karmic debt, and Saturn-Rahu livelihood struggle dosha.',
    ],
    pariharamTa:
      'பழனி தண்டாயுதபாணி திருக்கோயில் (ராஜ தரிசனம்) அல்லது திருநாகேஸ்வரம் ராகு பகவான் சந்நிதியில் வழிபாடு.',
    pariharamEn:
      'Worship at Palani Dhandayuthapani Murugan Temple (Raja Darsanam) or Thirunageswaram Rahu Sannidhi.',
  },

  11: {
    bhava: 11,
    nameTa: '11-ம் பாவம் (லாபம், ஆசை நிறைவேற்றம், இரண்டாம் காரிய வெற்றி & அந்தரங்கம்)',
    nameEn: '11th Bhava (Gains, Desires, Secondary Effort Success & Intimacy)',
    themeTa: 'பயன்படுத்த முடியாத வசதிகள், முதல் காரியத் தோல்வி & 2-வது முயற்சியில் பெருவெற்றி',
    themeEn: 'Unusable Amenities, Initial Disruptions & Triumphant Secondary Breakthrough',
    corePredictionsTa: [
      'அனைத்து விதமான விஷயங்களும் வசதிகளும் இருக்கும்; ஆனால் சரியான நேரத்தில் பயன்படுத்த முடியாது.',
      'எல்லாமே இருக்கும்; ஆனால் அவனுக்கு உடனடியாகப் பயன் இருக்காது.',
      'எந்த காரியமும் முதலில் உள்ளது நிலைக்காது; 2-வது தான் நிலைக்கும் / கிடைக்கும்!',
      'தாய், தகப்பன், மனைவி, குழந்தை அனைத்தும் முதலில் கிடைக்காது; 2-வது தான் கிடைக்கும்.',
      'வெளியில் சொல்ல முடியாத பல அந்தரங்கச் செயல்களும் மனச்சுமைகளும் இருக்கும்.',
      'பிறப்பு முதல் இறப்பு வரை முதலில் கிடைக்கும் அனைத்தையும் இழந்து, இரண்டாவது காரியம் போராடியே வெல்வார்கள் (வேலை வாய்ப்பு இழப்பு, வியாபாரத்தில் பிரச்சனை, சம்பளக் குறைவு போன்றவை ஏற்பட்டு பின்னர் மீண்டெழுவர்).',
    ],
    corePredictionsEn: [
      'Blessed with abundant amenities and opportunities, yet unable to utilize them at the right time.',
      'Everything surrounds the native, yet direct personal satisfaction is elusive.',
      'Golden Rule: Initial ventures or first-time arrangements do not sustain; the 2nd attempt will succeed and endure!',
      'Deep family bonds, partners, or assets face early ruptures; the secondary phase brings stability and fulfillment.',
      'Harbors unexpressed inner burdens and private dilemmas that cannot be shared openly.',
      'From birth to sunset years, first undertakings face disruption; victory is achieved through resilient struggle in round two.',
    ],
    doAndDontsTa: {
      dos: [
        'முதல் முறை ஏதேனும் காரியம் தோல்வியுற்றால் மனம் தளராமல் உடனடியாக 2-வது முயற்சியில் தீவிரமாக இறங்குங்கள்; வெற்றி நிச்சயம்.',
        'தனது திட்டங்களையும் சொத்து விவரங்களையும் ரகசியமாக வைக்கவும்.',
      ],
      donts: [
        'முதல் முயற்சியிலேயே மொத்த மூலதனத்தையும் முதலீடு செய்து விடுவது கூடாது.',
        'அந்தரங்கப் பிரச்சனைகளை பொது வெளியில் விவாதிப்பது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Never lose heart after a first setback; launch the secondary endeavor immediately with learned wisdom.',
        'Keep financial portfolios and strategic roadmaps confidential.',
      ],
      donts: [
        'Never gamble entire capital on a premiere first venture.',
        'Never broadcast sensitive personal dilemmas publicly.',
      ],
    },
    careerFinanceTa: [
      'முதல் வேலை அல்லது முதல் தொழில் நஷ்டம் தரலாம்; ஆனால் இரண்டாவது முறையாக தொடங்கும் நிறுவனம் அல்லது பணி பிரம்மாண்ட லாபத்தை தரும்.',
    ],
    careerFinanceEn: [
      'First job or enterprise may face disruption or pay cuts; the second career shift yields massive affluence.',
    ],
    familyRelationshipsTa: [
      'தொடக்க கால குடும்ப உறவுகளில் மனக்கசப்புகள் இருக்கலாம்; காலப்போக்கில் பக்குவமான புரிதல் நிலைக்கும்.',
    ],
    familyRelationshipsEn: [
      'Early relationships undergo testing; maturity in subsequent phases restores domestic bliss.',
    ],
    doshaAlertsTa: [
      'ஆரம்ப காரிய பங்கம் தோஷம் மற்றும் லாப முடக்க தோஷம்.',
    ],
    doshaAlertsEn: [
      'Initial-venture impediment dosha and blocked gains affliction.',
    ],
    pariharamTa:
      'வீரக்குடி கரைமேல் அழகர் முருகன் கோயில் (பார்த்திபனூர், பரமக்குடி) சென்று வழிபாடு செய்தல்.',
    pariharamEn:
      'Worship at Veerakkudi Karaimel Azhagar Murugan Temple (Parthibanur, Paramakudi).',
  },

  12: {
    bhava: 12,
    nameTa: '12-ம் பாவம் (விரயம், மோட்சம், தனிமை, காதல் தோல்வி & செவ்வாய் முடக்கு)',
    nameEn: '12th Bhava (Moksha, Solitude, Love Failure, Mars Affliction & Karmic Mirror)',
    themeTa: 'செவ்வாய் முடக்கு, காதல் தோல்வி (Love Failure), புணர்ப்பு தோஷம் & கர்மாவின் மறு பிரதிபலிப்பு',
    themeEn: 'Mars Affliction, Love Failure, Punarphoo Marital Dosha & Karmic Mirror',
    corePredictionsTa: [
      'கல்வி, திருமணம், தொழில், குழந்தை இந்த விஷயங்களில் மிகப்பெரிய ஏக்கத்தை உண்டு பண்ணும்.',
      '12-ம் பாவகம் செவ்வாய் பகவான் முடக்கு அதிபதியானால் திருமண வாழ்வில் அவமானம், வாழ்க்கை முறிவு ஏற்படும்.',
      'வம்பு, வழக்குகள் மூலம் அவமானம் ஏற்படும்.',
      'இவர்களுக்கு தான் சனி + சந்திரன் சேர்க்கை ஏற்பட்டு "புணர்ப்பு விவாக தோஷம்" உண்டாகிறது.',
      'லக்னத்திற்கு 12-ம் இடம் முடக்கினால் / செவ்வாய் முடக்கு ஆனால்: "லவ் பெயிலியர்" (காதல் தோல்வி) ஏற்படும்.',
      'கர்மாவின் மறு பிரதிபலிப்பு இந்த 12-ம் பாவம் முடக்கு!',
      'குழந்தை, பால்யம், மத்திமம், இந்திரா, வயோதிக பருவம் என அனைத்துப் பருவங்களிலும் குடும்பத்தை விட்டுத் தனியாக வாழும் சூழ்நிலை; உறவுகள் எட்ட நின்று தனிமை ஏற்படும்.',
      'சேர்த்து வைத்த சொத்துக்களும் புண்ணியங்களும் தக்க சமயத்தில் பயன்படாமல் போய்விடும் அபாயம்.',
    ],
    corePredictionsEn: [
      'Generates intense longings and unfulfilled yearning regarding education, marriage, career, and children.',
      'If Mars is Mudakku Lord in 12th: humiliation in wedlock, acute marital discord, and risk of marriage breakdown.',
      'Humiliation through unnecessary court litigation and frivolous disputes.',
      'Saturn + Moon conjunction forms Punarphoo Marital Dosha in these natives.',
      'When 12th house is Mudakku / Mars is Mudakku: acute heartbreak and Love Failure.',
      '12th Bhava Mudakku serves as the exact photographic mirror of past life karma!',
      'Across childhood, youth, middle age, and twilight years, conditions force solitary living apart from family; isolated existence.',
      'Risk of accumulated wealth and merits lying underutilized; spiritual surrender and charity are vital remedies.',
    ],
    doAndDontsTa: {
      dos: [
        'ஆன்மீகம், யோகா, தியானம் மற்றும் தர்ம காரியங்களில் ஈடுபடவும்.',
        'திருமணப் பொருத்தத்தில் செவ்வாய் தோஷம் மற்றும் புணர்ப்பு தோஷ சாந்திகளை முழுமையாகச் செய்யவும்.',
      ],
      donts: [
        'கண்மூடித்தனமான காதல் விவகாரங்களில் சிக்குவது கூடாது.',
        'நீதிமன்ற வம்பு வழக்குகளை அவசரப்பட்டு தொடர்வது கூடாது.',
        'தனிமையில் விரக்தி அடைந்து சுயம் இழப்பது கூடாது.',
      ],
    },
    doAndDontsEn: {
      dos: [
        'Immerse in spiritual philanthropy, meditation, and temple renovations.',
        'Ensure rigorous astrological compatibility checks to neutralize Mars/Punarphoo friction.',
      ],
      donts: [
        'Never plunge blindly into impulsive romances (avoids love failure).',
        'Avoid triggering unnecessary court litigations or frivolous disputes.',
      ],
    },
    careerFinanceTa: [
      'வெளிநாட்டு ஏற்றுமதி, ஆன்மீக அறக்கட்டளைகள், மருத்துவமனைகள், சேவை நிறுவனங்களில் மேன்மை; தவறான முதலீடுகளில் விரயம்.',
    ],
    careerFinanceEn: [
      'Thrives in foreign exports, healthcare, charitable foundations, and spiritual institutions.',
    ],
    familyRelationshipsTa: [
      'குடும்பத்தை விட்டு தூர தேசங்களில் தனியாக வாழும் சூழ்நிலை ஏற்படும்; உறவுகளிடம் எதிர்பார்ப்புகளைக் குறைத்துக் கொள்வது அமைதியைத் தரும்.',
    ],
    familyRelationshipsEn: [
      'Circumstances enforce living separated from family across different life chapters.',
    ],
    doshaAlertsTa: [
      'செவ்வாய் 12-ம் முடக்கு தோஷம், புணர்ப்பு விவாக தோஷம், காதல் தோல்வி தோஷம் மற்றும் கர்ம விரய தோஷம்.',
    ],
    doshaAlertsEn: [
      'Mars 12th Mudakku dosha, Punarphoo marital delay dosha, love failure affliction, and karmic loss dosha.',
    ],
    pariharamTa:
      'மயிலம் சுப்பிரமணியசுவாமி திருக்கோயில் சென்று செவ்வாய் பகவானுக்கு விசேஷ அர்ச்சனையும் நெய்தீபமும் ஏற்றுவது.',
    pariharamEn:
      'Worship at Mailam Subramanyaswamy Temple with special ghee lamps and Murugan archana.',
  },
};

/**
 * Main Engine: Calculates the Individual Mudakku Prediction based on native's Horoscope
 */
export function calculateMudakkuPrediction(
  planets: PlanetPosition[],
  lagnaSignId: number,
  startingDasaInfo?: StartingDasaInfo,
  presentDasaInfo?: PresentDasaInfo,
  _panchanga?: Panchanga
): MudakkuIndividualPrediction {
  const sun = planets.find((p) => p.name === 'Sun') || planets[0];
  const saturn = planets.find((p) => p.name === 'Saturn');
  const rahu = planets.find((p) => p.name === 'Rahu');
  const moon = planets.find((p) => p.name === 'Moon');
  const mars = planets.find((p) => p.name === 'Mars');

  const sunStarId = sun.nakshatraId ?? 0;
  const suryaStarInfo = SURYA_MUDAKKU_STAR_TABLE[sunStarId] || SURYA_MUDAKKU_STAR_TABLE[0];

  const mudakkuSignId = suryaStarInfo.mudakkuSignId;
  const mudakkuSignNameTa = SIGN_NAMES_TA[mudakkuSignId] || 'மேஷம்';
  const mudakkuSignNameEn = SIGN_NAMES_EN[mudakkuSignId] || 'Aries';

  // Mudakku Bhava from Lagna (1 to 12)
  let mudakkuBhava = ((mudakkuSignId - lagnaSignId + 12) % 12) + 1;
  if (mudakkuBhava < 1 || mudakkuBhava > 12) {
    mudakkuBhava = 1;
  }

  // Mudakku Lord
  const mudakkuLord = SIGN_LORDS[mudakkuSignId] || { en: 'Mars', ta: 'செவ்வாய்' };
  const mudakkuLordNameEn = mudakkuLord.en;
  const mudakkuLordNameTa = mudakkuLord.ta;

  // Find where Mudakku Lord is placed in native's chart
  const lordPlanet = planets.find((p) => p.name === mudakkuLordNameEn);
  const mudakkuLordPlacementHouse = lordPlanet?.house ?? 1;
  const mudakkuLordPlacementSignTa = lordPlanet?.signNameTa ?? mudakkuSignNameTa;
  const mudakkuLordPlacementSignEn = lordPlanet?.signNameEn ?? mudakkuSignNameEn;
  const mudakkuLordDignityEn = lordPlanet?.dignityEn;

  // Planets residing in the native's Mudakku Sign
  const planetsInMudakkuSign = planets
    .filter((p) => p.signId === mudakkuSignId && p.name !== 'Lagna')
    .map((p) => ({
      nameEn: p.name,
      nameTa: p.nameTa,
      isChhaya: p.name === 'Rahu' || p.name === 'Ketu',
    }));

  // Check 1: Born in Mudakku Lord's Dasa
  const startingMahadasa = startingDasaInfo?.mahadasa?.trim();
  const bornInMudakkuDasa = !!(
    startingMahadasa &&
    (startingMahadasa.toLowerCase() === mudakkuLordNameEn.toLowerCase() ||
      startingDasaInfo?.mahadasaTa?.trim() === mudakkuLordNameTa.trim())
  );
  const bornInMudakkuDasaDetailsTa = bornInMudakkuDasa
    ? `ஜாதகர் பிறக்கும் போது முடக்கு அதிபதியான ${mudakkuLordNameTa} திசையில் பிறந்ததால் குழந்தை பருவத்தில் தீவிர போராட்டங்கள், உடல்நல பாதிப்புகள் அல்லது குடும்பப் பிரிவுகள் ஏற்பட்டிருக்க வாய்ப்புண்டு. சிறப்பு பரிகாரம் தேவை.`
    : undefined;
  const bornInMudakkuDasaDetailsEn = bornInMudakkuDasa
    ? `The native was born in the Vimshottari Dasa of Mudakku Lord ${mudakkuLordNameEn}. As documented in the manuscript, birth during Mudakku Lord Dasa causes intense childhood hardships and health vulnerabilities.`
    : undefined;

  // Check 2: Currently running Mudakku Lord Dasa or Bhukti
  const presentMahadasa = presentDasaInfo?.mahadasa?.trim();
  const presentPuthi = presentDasaInfo?.puthi?.trim();
  const runningMudakkuDasa = !!(
    (presentMahadasa && presentMahadasa.toLowerCase() === mudakkuLordNameEn.toLowerCase()) ||
    (presentPuthi && presentPuthi.toLowerCase() === mudakkuLordNameEn.toLowerCase())
  );
  const runningMudakkuDasaDetailsTa = runningMudakkuDasa
    ? `தற்போது நடப்பில் உள்ள தசை அல்லது புத்தி முடக்கு அதிபதியான ${mudakkuLordNameTa} ஆதிக்கத்தில் இருப்பதால் புதிய கூட்டு முயற்சிகள், அவசர முதலீடுகள் மற்றும் தேவையற்ற வாக்குவாதங்களைத் தவிர்க்கவும்.`
    : undefined;
  const runningMudakkuDasaDetailsEn = runningMudakkuDasa
    ? `Currently running Vimshottari Mahadasa or Antardasa is ruled by Mudakku Lord ${mudakkuLordNameEn}. Exercise supreme vigilance in business deals, property investments, and partnerships.`
    : undefined;

  // Check 3: Sun in Rohini Nakshatra
  const sunInRohini = sunStarId === 3; // Rohini is index 3
  const sunInRohiniDetailsTa = sunInRohini
    ? 'ஜாதகத்தில் சூரிய பகவான் ரோகிணி நட்சத்திரத்தில் அமர்ந்துள்ளார். ஏட்டுச் சுவடி குறிப்பின்படி: "சூரிய பகவான் ரோகிணியில் இருக்கும் போது தகப்பனுக்கு கருமகாரியம் செய்யமாட்டான்" என்ற சாஸ்திர விதி உள்ளது.'
    : undefined;
  const sunInRohiniDetailsEn = sunInRohini
    ? 'Sun is situated in Rohini nakshatra in the birth chart. As specifically noted in the manuscript: "When Lord Sun is in Rohini, the native may face circumstances preventing direct performance of paternal final rites".'
    : undefined;

  // Check 4: Saturn + Rahu Association (crucial for 10th house or general career struggle)
  const hasSaturnRahuAssociation = !!(
    saturn &&
    rahu &&
    (saturn.signId === rahu.signId ||
      Math.abs(saturn.signId - rahu.signId) === 6 ||
      saturn.house === 10 ||
      rahu.house === 10)
  );
  const hasSaturnRahuDetailsTa = hasSaturnRahuAssociation
    ? 'சனி மற்றும் ராகு கிரகங்களின் சேர்க்கை அல்லது பார்வை உள்ளது. ஏட்டுச் சுவடி குறிப்பின்படி ஜீவனத்திற்காக இடைவிடாது போராடக்கூடிய நிலையும், பிரம்ம தோஷத் தாக்கமும் ஏற்படலாம். அயராத உழைப்பே வெல்லும்.'
    : undefined;
  const hasSaturnRahuDetailsEn = hasSaturnRahuAssociation
    ? 'Saturn and Rahu are intimately connected in the chart (conjunction, aspect, or 10th house association), reflecting continuous perseverance required for livelihood.'
    : undefined;

  // Check 5: Punarphoo Dosha (Saturn + Moon conjunction)
  const hasPunarphooDosha = !!(
    saturn &&
    moon &&
    (saturn.signId === moon.signId || Math.abs(saturn.signId - moon.signId) === 6)
  );
  const hasPunarphooDetailsTa = hasPunarphooDosha
    ? 'சனி மற்றும் சந்திரன் சேர்க்கையால் "புணர்ப்பு விவாக தோஷம்" உண்டாகிறது. திருமணப் பேச்சுவார்த்தைகளில் தடையோ அல்லது தாமதமோ வரலாம்; பரிகாரம் அவசியம்.'
    : undefined;
  const hasPunarphooDetailsEn = hasPunarphooDosha
    ? 'Saturn-Moon connection forms Punarphoo Dosha, inducing delays or misunderstandings in marital unions and agreements.'
    : undefined;

  // Check 6: 12th House / Mars Love Failure caution
  const hasLoveFailureCaution =
    mudakkuBhava === 12 || (mudakkuBhava === 12 && mudakkuLordNameEn === 'Mars');
  const hasLoveFailureDetailsTa = hasLoveFailureCaution
    ? 'லக்னத்திற்கு 12-ம் இடம் முடக்காக அமைந்ததாலும் / செவ்வாய் முடக்கு அதிபதியாக உள்ளதாலும் காதல் விவகாரங்களில் ஏமாற்றமும் (Love Failure) அவமானமும் ஏற்படும் அபாயம் உண்டு; விவேகம் தேவை.'
    : undefined;
  const hasLoveFailureDetailsEn = hasLoveFailureCaution
    ? '12th Bhava Mudakku / Mars Mudakku indicates vulnerability to acute love failure, emotional heartbreak, and marital friction if vigilance is neglected.'
    : undefined;

  // Check 7: Jalliya Dosha caution (3rd or 5th house or Mars affliction)
  const hasJalliyaDoshaCaution = !!(
    mudakkuBhava === 3 ||
    mudakkuBhava === 5 ||
    (mars && planetsInMudakkuSign.some((p) => p.nameEn === 'Mars'))
  );
  const hasJalliyaDoshaDetailsTa = hasJalliyaDoshaCaution
    ? '3 அல்லது 5-ம் பாவக முடக்கு அமைப்பால் "ஜல்லிய தோஷம்" (கடன் தீர்க்க முடியாத நிலம், தோண்டப்பட்ட பூமி, கோர்ட் கேஸ் வம்பு வழக்குள்ள பூமி வாங்குவதால் வரும் தோஷம்) ஏற்படும் அபாயம் உண்டு. நிலம் வாங்கும்போது கூடுதல் கவனம் தேவை.'
    : undefined;
  const hasJalliyaDoshaDetailsEn = hasJalliyaDoshaCaution
    ? '3rd or 5th House Mudakku indicates vulnerability to "Jalliya Dosha" (curse of acquiring heavily debt-ridden, dug-up, or litigant land). Verify all real estate titles rigorously.'
    : undefined;

  // Native's Bhava Data
  const nativeBhavaData = MUDAKKU_BHAVAS_DATA[mudakkuBhava] || MUDAKKU_BHAVAS_DATA[1];

  // Derive Recommended Temple from Matrix
  let groupKey = 'Capricorn_Aquarius';
  if (mudakkuSignId === 0 || mudakkuSignId === 7) groupKey = 'Aries_Scorpio';
  else if (mudakkuSignId === 1 || mudakkuSignId === 6) groupKey = 'Taurus_Libra';
  else if (mudakkuSignId === 2 || mudakkuSignId === 5) groupKey = 'Gemini_Virgo';
  else if (mudakkuSignId === 3) groupKey = 'Cancer';
  else if (mudakkuSignId === 4) groupKey = 'Leo';
  else if (mudakkuSignId === 8 || mudakkuSignId === 11) groupKey = 'Sagittarius_Pisces';

  const groupMatrix = MUDAKKU_LAGNA_BHAVA_MAP[groupKey] || MUDAKKU_LAGNA_BHAVA_MAP['Capricorn_Aquarius'];
  const templeInfo =
    groupMatrix[mudakkuBhava] ||
    groupMatrix[1] || {
      templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்',
      templeEn: 'Madurai Immayilum Nanmai Tharuvar Shiva Temple',
      deityTa: 'இம்மையில் நன்மை தருவார் சிவன்',
      deityEn: 'Immayilum Nanmai Tharuvar Shiva',
    };

  // Check Rahu / Ketu in Mudakku Bhava
  const nodeInfo = BHAVA_MUDAKKU_RAHU_KETU_MAP[mudakkuBhava];
  let recommendedTempleTa = templeInfo.templeTa;
  let recommendedTempleEn = templeInfo.templeEn;
  let recommendedDeityTa = templeInfo.deityTa;
  let recommendedDeityEn = templeInfo.deityEn;

  if (planetsInMudakkuSign.some((p) => p.nameEn === 'Rahu') && nodeInfo) {
    recommendedTempleTa = `${nodeInfo.rahuTempleTa} (முடக்கு ராகு விசேஷ ஸ்தலம்) & ${templeInfo.templeTa}`;
    recommendedTempleEn = `${nodeInfo.rahuTempleEn} (Mudakku Rahu Sthalam) & ${templeInfo.templeEn}`;
    recommendedDeityTa = `ராகு பகவான் & ${templeInfo.deityTa}`;
    recommendedDeityEn = `Rahu Bhagavan & ${templeInfo.deityEn}`;
  } else if (planetsInMudakkuSign.some((p) => p.nameEn === 'Ketu') && nodeInfo) {
    recommendedTempleTa = `${nodeInfo.ketuTempleTa} (முடக்கு கேது விசேஷ ஸ்தலம்) & ${templeInfo.templeTa}`;
    recommendedTempleEn = `${nodeInfo.ketuTempleEn} (Mudakku Ketu Sthalam) & ${templeInfo.templeEn}`;
    recommendedDeityTa = `கேது பகவான் & ${templeInfo.deityTa}`;
    recommendedDeityEn = `Ketu Bhagavan & ${templeInfo.deityEn}`;
  }

  return {
    sunStarId,
    sunStarTa: suryaStarInfo.sunStarTa,
    sunStarEn: suryaStarInfo.sunStarEn,
    mudakkuStarTa: suryaStarInfo.mudakkuStarTa,
    mudakkuStarEn: suryaStarInfo.mudakkuStarEn,
    mudakkuSignId,
    mudakkuSignNameTa,
    mudakkuSignNameEn,
    mudakkuBhava,
    mudakkuBhavaTitleTa: `${mudakkuBhava}-ஆம் பாவம் (${mudakkuSignNameTa} ராசி)`,
    mudakkuBhavaTitleEn: `House ${mudakkuBhava} (${mudakkuSignNameEn} Sign)`,
    mudakkuLordNameTa,
    mudakkuLordNameEn,
    mudakkuLordPlacementHouse,
    mudakkuLordPlacementSignTa,
    mudakkuLordPlacementSignEn,
    mudakkuLordDignityEn,
    planetsInMudakkuSign,
    bornInMudakkuDasa,
    bornInMudakkuDasaDetailsTa,
    bornInMudakkuDasaDetailsEn,
    runningMudakkuDasa,
    runningMudakkuDasaDetailsTa,
    runningMudakkuDasaDetailsEn,
    sunInRohini,
    sunInRohiniDetailsTa,
    sunInRohiniDetailsEn,
    hasSaturnRahuAssociation,
    hasSaturnRahuDetailsTa,
    hasSaturnRahuDetailsEn,
    hasPunarphooDosha,
    hasPunarphooDetailsTa,
    hasPunarphooDetailsEn,
    hasLoveFailureCaution,
    hasLoveFailureDetailsTa,
    hasLoveFailureDetailsEn,
    hasJalliyaDoshaCaution,
    hasJalliyaDoshaDetailsTa,
    hasJalliyaDoshaDetailsEn,
    nativeBhavaData,
    allBhavas: MUDAKKU_BHAVAS_DATA,
    generalRules: MUDAKKU_GENERAL_RULES,
    recommendedTempleTa,
    recommendedTempleEn,
    recommendedDeityTa,
    recommendedDeityEn,
  };
}
