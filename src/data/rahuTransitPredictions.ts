import type { PlanetName, PlanetPosition } from '../types/astrology';

export interface RahuPlanetPrediction {
  planet: PlanetName;
  planetTa: string;
  planetEn: string;
  titleTa: string;
  titleEn: string;
  icon: string;
  summaryTa: string;
  summaryEn: string;
  predictionsTa: string[];
  predictionsEn: string[];
  cautionsTa: string[];
  cautionsEn: string[];
  specialNoteTa?: string;
  specialNoteEn?: string;
}

export interface RahuBhavaPrediction {
  houseNumber: number;
  titleTa: string;
  titleEn: string;
  significanceTa: string;
  significanceEn: string;
  predictionsTa: string[];
  predictionsEn: string[];
  cautionsTa?: string[];
  cautionsEn?: string[];
}

export const RAHU_CORE_PRINCIPLE = {
  ruleTa: 'கோள்சார ராகு தான் நின்ற வீட்டிற்கு திரிகோண ஸ்தானத்தையும் (1, 5, 9), சப்தம ஸ்தானத்தையும் (7) இயக்கும். அதாவது 1, 5, 7, 9 ஆகிய வீடுகளை இயக்கும். ஜாதகம் பார்க்க வரும் நபர்களிடம் அந்த வீட்டைப் பார்க்கும் அல்லது ராகுவால் இயக்கப்படும் கிரகங்களின் கேள்வி தான் பிரதானமாக இருக்கும்.',
  ruleEn: 'Transit Rahu dynamically activates the house it occupies, along with its trines (5th and 9th houses) and its opposite house (7th house) — effectively influencing the 1st, 5th, 7th, and 9th signs. Clients seeking astrological counsel will primarily raise questions related to the significations of these activated houses and planets.',
  exampleTa: 'உதாரணமாக: கோள்சார ராகு மிதுனத்தில் இருந்தால், 1, 5, 7, 9 வீடுகளாகிய மிதுனம், துலாம், தனுசு, கும்பம் ஆகிய வீடுகளை ராகு முழுமையாக இயக்கும்.',
  exampleEn: 'For example: When transit Rahu is in Gemini, it directly energizes Gemini (1st), Libra (5th), Sagittarius (7th), and Aquarius (9th).'
};

export const RAHU_PLANET_PREDICTIONS: Record<string, RahuPlanetPrediction> = {
  Sun: {
    planet: 'Sun',
    planetTa: 'சூரியன்',
    planetEn: 'Sun',
    titleTa: 'சூரியன் மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Sun',
    icon: 'Sun',
    summaryTa: 'தந்தை, அரசு, தலைமைப் பதவி, கௌரவம், கண் மற்றும் இதய ஆரோக்கிய விவகாரங்கள் மேலோங்கும்.',
    summaryEn: 'Father, governance, high office, recognition, and cardiovascular/ocular health come to the forefront.',
    predictionsTa: [
      'தந்தையைப் பற்றிய கேள்வி மற்றும் பதவி உயர்வு பற்றிய கேள்வி எழும்.',
      'கால புருஷனுக்கு 5-ம் இடமாக சூரியன் வருவதால், குழந்தையைப் பற்றிய முக்கிய சிந்தனைகள் உண்டாகும்.',
      'தலைமை தாங்குதல் மற்றும் நிர்வாகப் பொறுப்புகள் தேடி வரும்.',
      'கௌரவம் உண்டாகும், அரசு வெகுமதிகள் அல்லது பரிசுகள் கிட்டும்.',
      'கல்வெட்டில் ஜாதகரின் பெயர் இடம்பெறும் நற்பெயர் யோகம்.',
      'பூர்வீக சொத்து (தாத்தா சொத்து) தொடர்பான பேச்சுவார்த்தைகள் நடக்கும்.',
      'அரசு அனுமதி பெறுதல் மற்றும் அரசு சார்ந்த உதவிகள் கிட்டும்.',
      'நிர்வாகத்தில் மாற்றம் செய்தல், புதிய நிர்வாகி வருகை (மாற்று மொழி அதிகாரி வருகை அல்லது மாற்று மாநில பணிக்கு செல்லுதல்).',
      'அரசு விழாக்கள், பிரிவு உபசார விழாக்கள், வளைகாப்பு, பூணூல் விழா, ஹோமம் மற்றும் பூஜைகளில் கலந்துகொள்வர்.',
      'வீட்டில் உள்ள பழைய உலோகப் பாத்திரங்களை மாற்றுதல் நடக்கும்.',
      'புதிதாக கிணறு தோண்டுதல், தொழில் வரி கட்டுதல் அல்லது அடகு வைத்த சொத்து பத்திரத்தை மீட்டல் நடக்கும்.',
      'குலதெய்வம் பற்றிய நினைவு மற்றும் குலதெய்வக் கோயில் வழிபாடு உண்டாகும்.'
    ],
    predictionsEn: [
      'Questions and developments regarding father and professional promotion arise.',
      'As Sun rules the cosmic 5th house, significant queries regarding children and progeny emerge.',
      'Leadership roles, administrative control, and supervisory assignments arrive.',
      'Honor and prestige increase; chances of receiving governmental honors or awards.',
      'Name engraved or publicly recognized in civic, charitable, or temple registers.',
      'Ancestral properties and grandfather patrimony matters are brought to resolution.',
      'Official government sanctions, license approvals, or delayed pensions clear up.',
      'Administrative restructuring; arrival of superiors from other languages or postings to other states.',
      'Participation in state ceremonies, farewell functions, sacred thread ceremonies, and homams.',
      'Replacing antique metal utensils in the household.',
      'Drilling wells/borewells, paying commercial tax, or redeeming mortgaged land deeds.',
      'Intense remembrance and pilgrimage to family lineage deity (Kula Deivam).'
    ],
    cautionsTa: [
      'இந்த காலகட்டத்தில் ராட்டினம் ஏறக்கூடாது; உயரமான இடங்களில் ஏறுவதைத் தவிர்க்கவும் (தலைசுற்றல்/கிறுகிறுப்பு உண்டாகலாம்).',
      'தலை சார்ந்த வியாதி, ஒற்றைத் தலைவலி, கண் உபாதைகள் (கண்ணாடி மாற்றம்) வரலாம்.',
      'ஸ்கேன், எக்ஸ்ரே, இசிஜி (ECG) எடுக்கும் சூழல் உண்டாகலாம்; இருதய பயம், முதுகு வலி, எலும்பு வலி வரலாம்.',
      'பெண் ஜாதகமாக இருப்பின் தலைமுடி உதிர்தல் ஏற்படும்.',
      'மருத்துவ செலவு மற்றும் மருத்துவ முறையை அல்லது மருத்துவரை மாற்றும் சூழல் அமையும்.',
      'சூரியனுக்கு செவ்வாய் 6, 8, 12 ஆக இருப்பின் விருப்ப ஓய்வு (VRS) பெறும் எண்ணம் எழும்.'
    ],
    cautionsEn: [
      'Avoid giant wheels, rollercoasters, and extreme heights during this transit due to sudden vertigo.',
      'Eye strains leading to spectacles change, headaches, and migraines.',
      'May require diagnostic medical tests (Scan, X-Ray, ECG); backache or bone discomfort.',
      'For female charts, temporary hair thinning or loss can occur.',
      'Medical consultations and switching physicians or treatment systems.',
      'If Mars is in 6, 8, or 12 from Sun, early retirement (VRS) thoughts may materialize.'
    ],
    specialNoteTa: 'ஜனன ஜாதகத்திலேயே சூரியனுடன் ராகு இணைந்து இருந்தால், இப்பலன்கள் இரட்டிப்பாக உடனடியாக நடக்கும்.',
    specialNoteEn: 'If Rahu is already conjunct Sun in the natal birth chart, these manifestations happen immediately with double intensity.'
  },
  Moon: {
    planet: 'Moon',
    planetTa: 'சந்திரன்',
    planetEn: 'Moon',
    titleTa: 'சந்திரன் மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Moon',
    icon: 'Moon',
    summaryTa: 'மனநிலை மாற்றங்கள், பயணங்கள், வீடு/வாகன மாற்றம், தாய் நலம் மற்றும் கடல் சார்ந்த விஷயங்கள்.',
    summaryEn: 'Psychological shifts, frequent travel, relocation, maternal affairs, and liquid/marine investments.',
    predictionsTa: [
      'இடமாற்றம் மற்றும் அதிக பயணங்கள் உண்டாகும்; தூரதேச பயணம் அமையும்.',
      'வாகன மாற்றம் உண்டாகும் அல்லது வாகனத்தை புதுப்பிப்பார்கள்.',
      'புதிய பெண் தொடர்புகள் உண்டாதல் அல்லது பழைய தொடர்புகளை துண்டித்தல்.',
      'படுக்கை அறை மாற்றம், கட்டில் அல்லது மெத்தை (Bed) மாற்றுதல், வீட்டை அழகுபடுத்துதல்.',
      'புதிதாக இடம் வாங்குதல் அல்லது அடகு வைத்த இடத்தை மீட்டல்.',
      'கடல் கடந்து செல்லுதல் அல்லது கடல்சார் படிப்புகள் (Marine Engineering) படித்தல்.',
      'மீன் வியாபாரம், கப்பல்/படகு வாங்குதல் அல்லது நீர்நிலைகளுக்கு செல்லுதல்.',
      'புதிதாக வாட்டர் பில்டர் வாங்குவது அல்லது அதன் உதிரிபாகங்களை மாற்றுதல்.',
      'கற்பனைத் திறன் கூடி கவிதை, கட்டுரைகள் எழுதுதல்.',
      'வீட்டில் மளிகைக் கடை மற்றும் சலவைக் கடை மாற்றுதல் நடக்கும்.',
      'நான்கு ஜீவசமாதிகளை (அல்லது சமாதிகளை) தரிசிக்கும் ஆன்மீக யோகம் அமையும்.'
    ],
    predictionsEn: [
      'Relocation, frequent travel, and journeys to distant or foreign locales.',
      'Vehicle upgrade, exchange, or purchasing new conveyance.',
      'New female associations or abruptly severing prior toxic connections.',
      'Renovating bedroom, changing bedding/mattress, and interior beautification.',
      'Acquiring new land plots or redeeming pawned domestic lands.',
      'Overseas sea voyages or pursuing marine engineering / oceanography studies.',
      'Aquaculture, seafood trading, or activities centered around water bodies.',
      'Installing home water purification systems or replacing water filter spare parts.',
      'Heightened imaginative mind leading to creative poetry and literary writing.',
      'Changing neighborhood grocery stores or laundry/dry-cleaner service providers.',
      'Spiritual pilgrimage to four Jeeva Samadhis or ancestral shrines.'
    ],
    cautionsTa: [
      'நீரில் கண்டம் உண்டாகும்; மழையில் நனையக் கூடாது, காட்டாறு/ஓடைகளை கவனமின்றி கடக்கக் கூடாது.',
      'ஜலதோஷம், மூக்கடைப்பு, சுவாசக் கோளாறு, காய்ச்சல் வர வாய்ப்புண்டு.',
      'உணவு ஒவ்வாமையினால் வாந்தி, ஃபுட் பாய்சன் (Food Poison) ஏற்படலாம்; வெளி உணவுகளில் கவனம்.',
      'ஜாதகர் ஏமாற்றமடைதல் அல்லது ஏமாற்றப்படுதல் அல்லது பொருட்களை தொலைத்தல்.',
      'வீட்டிற்குள் மழைநீர் ஒழுகுதல் அல்லது குழாய் அடைப்பு பிரச்சனைகள்.',
      'குழந்தைக்கு தாய்ப்பால் குறைவு அல்லது தாயார் உடல்நலத்தில் மருத்துவ செலவு.'
    ],
    cautionsEn: [
      'Vulnerability to water hazards; avoid getting soaked in torrential rain and crossing flash streams.',
      'Respiratory congestion, chest cold, sinus troubles, and seasonal viral fevers.',
      'Susceptibility to food poisoning or acute gastrointestinal upsets from outside food.',
      'Risk of deception, being duped, misplaced valuables, or temporary emotional disillusionment.',
      'Roof leakages during rains or internal plumbing seepage in the residence.',
      'Lactation issues for infants or increased healthcare expenses for mother.'
    ]
  },
  Mars: {
    planet: 'Mars',
    planetTa: 'செவ்வாய்',
    planetEn: 'Mars',
    titleTa: 'செவ்வாய் மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Mars',
    icon: 'Flame',
    summaryTa: 'வீடு மனை யோகம், சகோதர விவகாரங்கள், மின்சாரம், இயந்திரங்கள் மற்றும் அறுவை சிகிச்சை எச்சரிக்கை.',
    summaryEn: 'Real estate, sibling matters, electrical/machinery investments, and surgical precautions.',
    predictionsTa: [
      'வாகனம் அல்லது வீடு மாற்றம் உண்டாகும்; புதிய வீடு கட்டுதல் அல்லது இடம் வாங்குதல்.',
      'பதவி உயர்வு கிடைக்கும் (Supervisor, தலைமைப் பொறுப்பு வகித்தல்).',
      'சகோதர சகோதரிகளுக்கு திருமணம் போன்ற மங்கள காரியங்கள் நடக்கும்.',
      'வாகன ஓட்டுநர் பயிற்சிக்கு செல்வர், புதிய ஓட்டுநர் உரிமம் (Driving License) எடுப்பர்.',
      'காவல் மற்றும் ராணுவம் சார்ந்த துறைகளில் நுழைவு அல்லது தொடர்பு ஏற்படும்.',
      'நடைபயிற்சி, உடற்பயிற்சி மேற்கொள்வர்; உடற்பயிற்சி உபகரணங்கள் வாங்குவர்; தற்காப்புக் கலை கற்பர்.',
      'இஞ்சி, சுக்கு, மல்லி டீ போன்ற உஷ்ண பானங்களை விரும்பி அருந்துவர்.',
      'குடும்பத்தில் இளம் பெண்கள் பூப்படைதல் (ருதுவாதல்) சுப நிகழ்ச்சி நடக்கும்.',
      'டவர் அமைத்தல் (செவ்வாய் + சனி மீது ராகு செல்கையில் மொபைல் டவர் அமைக்கும் ஒப்பந்தம்).'
    ],
    predictionsEn: [
      'Housing upgrades, land purchase, building residential premises, or vehicle trade.',
      'Job promotions to supervisory, managerial, or command hierarchy positions.',
      'Auspicious ceremonies like marriage among brothers or sisters.',
      'Enrolling in driving academies and securing new transport licenses.',
      'Entry, contracts, or active collaboration with police, armed forces, and security domains.',
      'Gym workouts, purchasing fitness gym gear, and learning martial arts.',
      'Gravitating towards herbal ginger, dried coriander, and hot digestive teas.',
      'Attainment of puberty auspicious ceremony among young female relatives in the home.',
      'Erecting transmission/telecom towers on land (especially when aspecting Mars and Saturn).'
    ],
    cautionsTa: [
      'மின்சாரம் சார்ந்த செலவுகள்: வயரிங் செலவு, பல்பு/விளக்கு மாற்றுதல், மோட்டார் எஞ்சின் பழுது, அயர்ன் பாக்ஸ் ரிப்பேர், பிரிட்ஜ்/வாஷிங் மெஷின் காயில் பழுது.',
      'மழைக் காலத்தில் மின்சார உபகரணங்களில் கூடுதல் கவனம்; ஈரக் கையால் தொட்டால் ஷாக் அடிக்கும் அபாயம்.',
      'சிறு சிறு வெட்டுக் காயங்கள், ரத்த பரிசோதனை, பற்களால் தொந்தரவு.',
      'அறுவை சிகிச்சை (Surgery) அல்லது தையல் போடும் சூழல் ஏற்படலாம்.',
      'நாய்க்கடி பயம், நாய்கள் துரத்துதல் அல்லது வீட்டில் உள்ள நாய் இறந்து போகுதல்/காணாமல் போகுதல்.',
      'வாகனங்கள் பழுது அடைந்து நடுவழியில் நிற்றல் (Clutch cable / Break cable மாற்றம்).'
    ],
    cautionsEn: [
      'Electrical expenditures: rewiring, replacing bulbs, burned motor pump coils, damaged iron box/refrigerator.',
      'High danger of electric shocks; strictly avoid touching switches or appliances with wet hands.',
      'Minor cuts, lacerations, blood diagnostic profiling, and dental issues.',
      'Potential surgical interventions or stitch-work situations.',
      'Canine bites, stray dogs chasing vehicles, or family pet dog getting lost/ill.',
      'Vehicle stalling mid-journey due to snapped clutch cables or brake cable renewals.'
    ]
  },
  Mercury: {
    planet: 'Mercury',
    planetTa: 'புதன்',
    planetEn: 'Mercury',
    titleTa: 'புதன் மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Mercury',
    icon: 'BookOpen',
    summaryTa: 'பத்திரப்பதிவு, உயர்கல்வி, தகவல் தொடர்பு, வியாபாரம், இணையம் மற்றும் நரம்பு மண்டல தாக்கம்.',
    summaryEn: 'Documentation, education, communication, brokerage, digital commerce, and nervous system focus.',
    predictionsTa: [
      'பத்திரப்பதிவு, அக்ரிமெண்ட் போடுதல் மற்றும் ஆவணங்கள் கைக்கு வந்து சேரும்.',
      'புதிய புத்தகம் வாங்குதல், புத்தகம் எழுதி வெளியிடுதல் அல்லது காணாமல் போன ஆவணங்கள் கிடைத்தல்.',
      'இசைப் பயிற்சி பெறுதல், இசைக்கருவிகள் வாங்குதல் அல்லது திருக்குறள் படித்தல்.',
      'செல்போன் மாற்றம், சிம் கார்டு/எண் மாற்றுதல், கடவுச்சொல் (Password) மாற்றம், மெமரி கார்டு மாற்றுதல்.',
      'நேர்முகத் தேர்வில் (Interview) பங்குபெறுதல், புதிய விண்ணப்பங்கள் பூர்த்தி செய்தல்.',
      'அரியர்ஸ் தேர்வுகளில் வெற்றி பெறுதல் (Arrear Exam Pass).',
      'சமூக வலைத்தளங்களில் (Facebook, YouTube) ஆழ்ந்த நாட்டம், விளம்பரம் அல்லது மாடலிங் செய்தல்.',
      'ஆடிட்டர்கள் மாற்றம், கணக்கு வழக்குகளை சரிபார்த்தல், ரிப்போர்ட் தாக்கல் செய்தல்.',
      'கமிஷன் தொழில், ஏலச்சீட்டு போடுதல் மற்றும் பங்குச் சந்தை வர்த்தகத்தில் ஈடுபடுதல்.'
    ],
    predictionsEn: [
      'Land registrations, legal deeds, and receiving long-awaited title certificates.',
      'Publishing a book, purchasing reference materials, or recovering lost manuscripts.',
      'Learning instrumental music, acquiring sound systems, or studying classical literary poetry.',
      'Upgrading smartphone, shifting telephone numbers, changing security passwords, or storage drives.',
      'Attending corporate interviews and filing formal recruitment applications.',
      'Clearing long-standing backlog / arrear university examinations.',
      'Viral digital presence, internet social marketing, content creation, and ad modeling.',
      'Auditor changes, corporate financial tax balance reconciliations, and filing statutory returns.',
      'Commission agency businesses, chit funds, and equity stock market operations.'
    ],
    cautionsTa: [
      'போலி பத்திரங்கள் மற்றும் போலி சான்றிதழ்கள் வர வாய்ப்புண்டு; ஆவணங்களில் மிகுந்த எச்சரிக்கை தேவை.',
      'யாருக்கும் கடன் ஜாமீன் போடக் கூடாது; வாக்குறுதிகள் கொடுத்து மாட்டிக்கொள்ளக் கூடாது.',
      'தோல் வியாதி, நரம்பு தளர்ச்சி, விரல்களில் காயம் அல்லது அரிப்பு நோய் உண்டாகலாம்.',
      'காது, மூக்கு, தொண்டை (ENT) தொடர்பான உபாதைகள்.',
      'ஏடிஎம் கார்டு தொலைந்து போகுதல் அல்லது பணம் எடுக்கையில் சிக்கல்.',
      'படிப்பில் தற்காலிக தடைகள் அல்லது கவனச்சிதறல்.'
    ],
    cautionsEn: [
      'Strict vigilance against forged documents, spurious agreements, or counterfeit credentials.',
      'Never sign as financial guarantor/surety for anyone; avoid giving reckless oral promises.',
      'Dermatological flare-ups, peripheral nerve sensitivities, and finger injuries.',
      'Ear, Nose, Throat (ENT) irritations and allergies.',
      'Misplacing bank ATM debit cards or transaction card swipe errors.',
      'Intermittent academic interruptions or mind drifting during competitive study.'
    ]
  },
  Jupiter: {
    planet: 'Jupiter',
    planetTa: 'குரு',
    planetEn: 'Jupiter',
    titleTa: 'குரு மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Jupiter',
    icon: 'Sparkles',
    summaryTa: 'ஜீவகாரகன் இயக்கம்: குழந்தை பேறு, பதவி உயர்வு, தர்ம சிந்தனை, ஆன்மீக யாத்திரை மற்றும் வெளிநாட்டு வருமானம்.',
    summaryEn: 'Life-force activation: progeny blessings, professional promotion, philanthropy, and foreign finances.',
    predictionsTa: [
      'பதவி உயர்வு கிட்டும் அல்லது பதவி உயர்வுடன் கூடிய விரும்பிய இடமாற்றம் கிடைக்கும்.',
      'திருமணமான தம்பதிகளுக்கு குழந்தை பாக்கியம் உண்டாகும்.',
      'வெளிநாட்டு வருமானம் மற்றும் அந்நிய தேச தொடர்புகள் மூலம் தன லாபம்.',
      'வங்கியில் உள்ள சேமிப்புகளை (Fixed Deposit) முடித்து சொத்து வாங்குதல்.',
      'குலதெய்வம் கோயில் செல்லுதல், கும்பாபிஷேகம், அன்னதானம், புதிய ஆன்மீக நூல்கள் வாங்குதல்.',
      'நீண்ட தூர ஆன்மீக யாத்திரை (காசி, ராமேஸ்வரம்) செல்லுதல்; குருமார்களின் ஆசீர்வாதம் பெறுதல்.',
      'வீட்டில் ஹோமங்கள், விசேஷ பூஜைகள் நடத்துதல் மற்றும் அறக்கட்டளை பணிகளில் ஈடுபடுதல்.',
      'புதிதாக தங்க/வைர ஆபரணங்கள் வாங்குதல் அல்லது அடகு வைத்த நகைகளை திருப்புதல்.'
    ],
    predictionsEn: [
      'Professional elevation, executive promotion, or beneficial transfer with higher rank.',
      'Long-awaited conception and blessed childbirth for married couples.',
      'Financial gains through overseas remittances, MNC projects, or international clients.',
      'Liquidating bank fixed deposits to finance residential or commercial real estate acquisitions.',
      'Pilgrimages to ancestral temples, participating in Kumbhabhishekam and mass Annadanam.',
      'Sacred yatras to revered spiritual hubs like Kashi and Rameswaram; blessings of authentic gurus.',
      'Conducting Vedic homams, domestic worship, and instituting charitable trusts.',
      'Purchasing fine gold/gem jewelry or successfully redeeming pledged heirlooms.'
    ],
    cautionsTa: [
      'செரிமானக் கோளாறு, வாயு தொல்லை, கொழுப்பு கட்டிகள் (Lipoma), கல்லீரல் அல்லது கிட்னி பயம்.',
      'குழந்தைகளை பிரிந்து வாழும் சூழ்நிலை (படிப்பிற்காக வெளியூர் செல்லுதல்).',
      'தந்தைக்கு அல்லது பெரியப்பாவுக்கு மருத்துவச் செலவு.',
      'குரு மற்றும் சனி சேர்ந்துள்ள ஜாதகத்தில் ராகு செல்லும்போது, வீட்டில் உள்ள பழைய தேன் பாட்டில்களை அப்புறப்படுத்த வேண்டும் (தோஷம் தரும்).',
      'மதமாற்ற சிந்தனைகள் அல்லது தவறான வழிகாட்டிகளிடம் எச்சரிக்கை தேவை.'
    ],
    cautionsEn: [
      'Digestive issues, gas distention, fatty tumors (lipoma), and anxieties over liver/renal health.',
      'Circumstances compelling separation from children (e.g. sending them to hostels or distant colleges).',
      'Medical and wellness expenditures for paternal uncles or father.',
      'If natal Jupiter and Saturn are conjunct, discard any stale forgotten honey bottles at home to avert dosha.',
      'Caution against ideological confusion or hypocritical spiritual charlatans.'
    ]
  },
  Venus: {
    planet: 'Venus',
    planetTa: 'சுக்கிரன்',
    planetEn: 'Venus',
    titleTa: 'சுக்கிரன் மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Venus',
    icon: 'Heart',
    summaryTa: 'களத்திரகாரகன்: திருமணம், மனைவியின் முன்னேற்றம், ஆடம்பர பொருட்கள், கலைத்துறை மற்றும் அழகுபடுத்துதல்.',
    summaryEn: 'Kalathrakaraka: matrimony, spouse fortunes, luxury lifestyle, aesthetics, and relationship dynamics.',
    predictionsTa: [
      'ஜாதகருக்கு திருமணம் கைகூடும் அல்லது குடும்பத்தில் உள்ள ஒருவருக்கு திருமணத்தை முன்னின்று நடத்துவர்.',
      'வீட்டை நவீனமாக அழகுபடுத்துதல், புதிய பர்னிச்சர்கள் மற்றும் கலைப் பொருட்கள் வாங்குதல்.',
      'பட்டுச் சேலைகள், உயர்தர ஆடைகள், வாசனை திரவியங்கள் மற்றும் வெள்ளிப் பொருட்கள் வாங்குதல்.',
      'மனைவி பெயரில் புதிய சொத்து அல்லது புதிய வாகனம் வாங்குதல்.',
      'கூட்டுத் தொழில் தொடங்குதல் அல்லது புதிய தொழில் கூட்டாளிகள் இணைதல்.',
      'கலைத்துறை, சினிமா, புகைப்பட ஸ்டுடியோ, மீடியா சார்ந்த வருமான வாய்ப்புகள்.',
      'வீட்டில் ஹோம் தியேட்டர் (Home Theatre), புரொஜெக்டர் அல்லது சிசிடிவி (CCTV) கேமரா பொருத்துதல்.',
      'முகம் அழகுபடுத்துதல் (Facial, Grooming) மற்றும் கூலிங் கிளாஸ் அணிவதில் ஆர்வம்.'
    ],
    predictionsEn: [
      'Wedding alliance finalized for native or leading wedding arrangements for loved ones.',
      'Interior redesign, purchasing high-end furnishings, and sophisticated decor elements.',
      'Acquiring silk sarees, designer apparel, premium perfumes, and silverware.',
      'Purchasing landed property or a vehicle registered under wife’s name.',
      'Launching corporate partnership ventures or inducting dynamic partners.',
      'Income streams related to aesthetics, cinema, photography studios, and digital multimedia.',
      'Installing home theatre audio-visual systems, projectors, or modern CCTV surveillance.',
      'Grooming makeovers, facial treatments, and styling with luxury sunglasses.'
    ],
    cautionsTa: [
      'மனைவிக்கு உடல்நலக் கோளாறு (சளி, மூட்டு வலி, விஷக்கடி/அரிப்பு) அல்லது தற்காலிக கருத்து வேறுபாடு.',
      'தாம்பத்திய சுகத்தில் தற்காலிக குறைபாடு அல்லது மனைவி தோழியால் குடும்பத்தில் குழப்பம்.',
      'கண்பார்வை குறைபாடு ஏற்பட்டு புதிய கண்ணாடி மாற்றுதல்.',
      'சர்க்கரை நோய் பரிசோதனை (Sugar checkup), சிறுநீரகக் கல்/அடைப்பு தொந்தரவு.',
      'முகப்பரு மற்றும் முகத்தில் சிறு வடுக்கள் தோன்றுதல்.'
    ],
    cautionsEn: [
      'Health concerns for spouse (joint aches, insect stings, seasonal flu) or domestic friction.',
      'Temporary discord in marital intimacy or complications through outside acquaintances.',
      'Changes in visual acuity necessitating prescription eyewear change.',
      'Undergoing blood sugar check-ups, urinary gravel, or kidney stone diagnosis.',
      'Facial breakouts, acne vulgaris, and minor superficial facial scars.'
    ]
  },
  Saturn: {
    planet: 'Saturn',
    planetTa: 'சனி',
    planetEn: 'Saturn',
    titleTa: 'சனி மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Saturn',
    icon: 'Briefcase',
    summaryTa: 'கர்மகாரகன் இயக்கம்: தொழில் மாற்றம், பணி அபிவிருத்தி, மூட்டு வலி, செருப்பு தொலைதல் மற்றும் ஆயுள் பலம்.',
    summaryEn: 'Karmic career shift: vocation restructuring, knee/joint sensitivities, footwear losses, and longevity.',
    predictionsTa: [
      'தொழில் அல்லது பணி மாற்றம் உண்டாகும்; அல்லது இருக்கும் தொழிலை பல மடங்கு அபிவிருத்தி செய்வர்.',
      'புதிய வேலை ஆட்கள், பணியாளர்கள் வந்து அமைவர்.',
      'ஆயுள் பலம் உண்டாகும்; எதிர்கால தொழில் திட்டங்கள் உருப்பெறும்.',
      'பழைய வீட்டை இடித்து கட்டுதல் அல்லது சீரமைத்தல் (Alteration Work).',
      'நீண்ட தூரம் காலாற நடத்தல், நடைபயணம் மற்றும் ஆன்மீக மலைக்கோவில்களுக்கு செல்லுதல்.',
      'பாரம்பரிய சமையல் எண்ணெய்களுக்கு (மரச்செக்கு எண்ணெய்) மாறுதல்.',
      'கொடுத்து வராத பழைய பாக்கிப் பணங்கள் எதிர்பாராமல் கைக்கு வந்து சேரும்.',
      'தொழிலில் புதிய கிளைகள் தொடங்குதல் மற்றும் ஒன்றுக்கு மேற்பட்ட வருமான வழிகள் அமைதல்.'
    ],
    predictionsEn: [
      'Job transition, organizational shift, or massive scale-up of existing trade enterprise.',
      'Hiring new domestic assistants, reliable laborers, and corporate staff.',
      'Longevity fortification; formulation of resilient long-term career foundations.',
      'Demolishing and reconstructing old property or major structural house alteration work.',
      'Habitual extended walking, brisk trekking, and hiking to sacred hillock shrines.',
      'Switching culinary cooking oils to cold-pressed organic traditional oils.',
      'Recovery of long-pending bad debts and forgotten monetary dues.',
      'Inaugurating new corporate branch locations and multiple income avenues.'
    ],
    cautionsTa: [
      'கால் வலி, முழங்கால் மூட்டு வலி கட்டாயம் இருக்கும்; வலிக்கு ஆயின்மென்ட் தேய்த்தல் அல்லது வர்ம மசாஜ் செய்தல்.',
      'பாதத்தில் பித்த வெடிப்பு, படிகட்டில் சறுக்கி விழுதல், கால்களில் நீர்க்கட்டு/கருப்பு தழும்பு ஏற்படலாம்.',
      'செருப்பு/காலணி தொலைந்து போகுதல் (கோவிலில் அல்லது திருமண மண்டபத்தில் தொலைதல்).',
      'மனதில் தேவையற்ற இனம் புரியாத எதிர்கால பயம் மற்றும் தனிமையை விரும்பும் எண்ணம்.',
      'குடும்பத்தில் அல்லது உறவில் முதியவர்களின் கர்ம காரியங்களில் கலந்துகொள்ளும் சூழல்.',
      'தொழில் செய்யும் இடத்திற்கு விஷ ஜந்துக்கள் அல்லது பாம்பு வருதல்.'
    ],
    cautionsEn: [
      'Knee aches, arthritis flare-ups; using topical pain-relief balms and varma massages.',
      'Heel cracks, accidental slips on staircases, pedal edema, or dark spots on calves.',
      'Losing footwear at temples, marriage halls, or public gatherings.',
      'Unwarranted subconscious anxieties regarding future security; craving isolation.',
      'Obligatory attendance at funeral or ancestral obsequies in the extended family.',
      'Occasional intrusions of reptiles or serpents near work yards or storage premises.'
    ]
  },
  Rahu: {
    planet: 'Rahu',
    planetTa: 'ராகு',
    planetEn: 'Rahu',
    titleTa: 'ராகு மீது கோள்சார ராகு பயணிக்கும் காலம் (Rahu Return)',
    titleEn: 'Transit Rahu Over Natal Rahu (Rahu Return - 18 Year Cycle)',
    icon: 'Compass',
    summaryTa: '18 வருட ராகு திருப்புதல்: வெளிநாட்டுப் பயணம், இடமாற்றம், நரம்பு விவகாரங்கள், விபத்து எச்சரிக்கை.',
    summaryEn: '18-year Rahu Return: foreign expeditions, relocations, nervous dynamics, and sharp vigilance.',
    predictionsTa: [
      'வெளிநாடு அல்லது தூர மாநிலங்களுக்கு செல்லும் வாய்ப்பு மிக பிரகாசமாகும்.',
      'திடீர் இடமாற்றம் மற்றும் ஒரு மாற்றத்தை நோக்கிய முன்னேற்றப் பயணம்.',
      'அந்நிய மொழிகள் கற்றுக் கொள்ளுதல்; வேற்று மதத்தவர் மூலம் புதிய நன்மைகள்.',
      'விமானப் பயணம் மேற்கொள்ளுதல்; புதிய ஷூ, சாக்ஸ், தோல் பெல்ட் வாங்குதல்.',
      'துரித உணவுகளை (Fast Food) விரும்பி உண்ணுதல்; புதிய நண்பர்கள் கூட்டம் சேருதல்.',
      'ஜீவசமாதி வழிபாடு செய்தல்; ஆன்மீக ஞானிகள் மற்றும் சித்தர்களின் தரிசனம் பெறுதல்.',
      'சிசிடிவி (CCTV) கேமரா பொருத்துதல்; புதிய தொழில்நுட்ப உபகரணங்கள் வாங்குதல்.'
    ],
    predictionsEn: [
      'Prime window for overseas travel, international relocation, or inter-state transfers.',
      'Sudden change of residence oriented towards substantial upward mobility.',
      'Acquiring foreign linguistic skills; beneficial networking with individuals of other faiths.',
      'Aviation flights; buying brand new footwear, socks, and genuine leather accessories.',
      'Strong penchant for spicy fast food; broadening eclectic social circles.',
      'Deep attraction towards Jeeva Samadhis, mystic hermitages, and enlightened yogis.',
      'Setting up security CCTV surveillance equipment and high-tech appliances.'
    ],
    cautionsTa: [
      'தோல் அரிப்பு, நரம்பு சம்பந்தமான பிரச்சனைகள் (Varicose Veins), செரிமானக் கோளாறு.',
      'தலைமறைவாக வாழ வேண்டிய நிர்ப்பந்தம் அல்லது தனிமைப்படுத்தப்படுதல்.',
      'ஏவல், பில்லி சூனியம் பற்றிய மாயா பயம் மற்றும் அமானுஷ்ய சிந்தனைகள்.',
      'பூச்சிக்கடி, விஷ ஜந்துக்கள், நாய்க்கடி பயம்; இரவில் தனியாக நடமாடுவதை தவிர்க்கவும்.',
      'லஞ்சம், முறையற்ற குறுக்கு வழிகள், போதை வஸ்துக்களில் இருந்து முழுமையாக விலகியிருக்க வேண்டும்.'
    ],
    cautionsEn: [
      'Pruritus, cutaneous allergies, varicose veins, and sluggish digestive metabolism.',
      'Unfavorable situations prompting one to lie low or endure temporary seclusion.',
      'Paranoia regarding malevolent hexes, occult spells, or uncanny psychic phenomena.',
      'Insect stings, reptile bites, or aggressive dog encounters; exercise vigilance after dark.',
      'Steer totally clear of briberies, shady financial compromises, or addictive substances.'
    ]
  },
  Ketu: {
    planet: 'Ketu',
    planetTa: 'கேது',
    planetEn: 'Ketu',
    titleTa: 'கேது மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Ketu',
    icon: 'ShieldAlert',
    summaryTa: 'ஆன்மீக வைராக்கியம், விரதம், வழக்கு விவகாரங்கள், முடி உதிர்தல் மற்றும் விநாயகர் வழிபாடு.',
    summaryEn: 'Ascetic detachment, fasting disciplines, judicial resolutions, hair loss, and Ganesha worship.',
    predictionsTa: [
      'மனித முகம் இல்லாத தெய்வங்களான ஸ்ரீ விநாயகர், ஸ்ரீ ஆஞ்சநேயர் வழிபாடு நற்பலன் தரும்.',
      'புதிதாக ருத்ராட்சம் அணிதல், துளசி மாலை அணிதல், விரதங்கள் இருத்தல்.',
      'ஜோதிடம், சட்டம் (Law), அக்குபஞ்சர் மற்றும் மூலிகை மருத்துவம் பயில்வதில் ஈடுபாடு.',
      'யார் மீதாவது தொடர்ந்த வழக்குகளில் இருந்து விடுபடுதல் அல்லது சமரச தீர்வு ஏற்படுதல்.',
      'கடன் பாக்கிகளை முழுமையாக அடைத்து நிம்மதி அடைதல்.',
      'இடம் அளத்தல், காலி மனைக்கு வேலி போடுதல், வீட்டின் ஓட்டை உடைசல்களை அடைத்தல்.',
      'ஜீவசமாதி மற்றும் சமாதி ஆலயங்களுக்கு சென்று தியானம் செய்தல்.'
    ],
    predictionsEn: [
      'Supreme auspiciousness through worshiping non-human deity forms: Lord Ganesha & Lord Hanuman.',
      'Wearing consecrated Rudraksha beads, Tulsi malas, and observing strict austerities/fasts.',
      'Fascinating pull towards occult astrology, constitutional law, acupuncture, and Ayurveda.',
      'Complete emancipation from dragging court litigations or amicable dispute settlements.',
      'Total liquidation of burdensome debts bringing psychological liberation.',
      'Surveying boundary lines, erecting security fences around vacant plots, repairing cracks.',
      'Visiting silent Jeeva Samadhis to engage in transcendental contemplation.'
    ],
    cautionsTa: [
      'தலைமுடி உதிர்தல் ஏற்படும்; தலைக்கு தைலம் அல்லது தலைச்சாயம் (Hair dye) பூசுதல் நடக்கும்.',
      'தாடி வளர்ப்பது அல்லது நீண்ட காலமாக வைத்த தாடியை எடுத்து விடுதல்.',
      'பற்களால் தொந்தரவு மற்றும் ஈறுகளில் உபாதைகள்.',
      'காதலில் பிரிவு அல்லது தற்காலிக விரிசல் ஏற்பட வாய்ப்புண்டு.',
      'வேற்று மத நண்பர்களால் கருத்து வேறுபாடு அல்லது வீண் வம்பு வழக்குகள்.'
    ],
    cautionsEn: [
      'Noticeable scalp hair shedding; using medicated oils or applying hair color dyes.',
      'Spontaneously growing a beard or suddenly shaving off a long-standing beard.',
      'Dental discomfort, periodontal sensitivities, or wisdom tooth irritation.',
      'Disenchantment, estrangement, or painful fractures in romantic connections.',
      'Misunderstandings, frictions, or unnecessary squabbles through cross-cultural acquaintances.'
    ]
  },
  Mandhi: {
    planet: 'Mandhi',
    planetTa: 'மாந்தி',
    planetEn: 'Mandi / Gulika',
    titleTa: 'மாந்தி மீது கோள்சார ராகு பயணிக்கும் காலம்',
    titleEn: 'Transit Rahu Over Natal Mandi (Gulika)',
    icon: 'AlertTriangle',
    summaryTa: 'கர்ம காரியங்கள், குடல் சம்பந்தமான வியாதிகள், மரண பயம் மற்றும் தீவிர எச்சரிக்கை காலம்.',
    summaryEn: 'Obsequial attendances, intestinal disorders, mortality anxiety, and strict health care.',
    predictionsTa: [
      'மாந்தி நின்ற நட்சத்திர அதிபதியை கவனித்து பரிகாரம் செய்ய வேண்டும்.',
      'தூக்கமின்மை மற்றும் இருட்டு அறையில் தனிமையில் இருக்கும் சூழல் மாறும்.',
      'முதியவர்களுக்கு அல்லது முன்னோர்களுக்கு செய்ய வேண்டிய திதி, திவச காரியங்களை செவ்வனே செய்தல்.',
      'கோயில் குடமுழுக்கு மற்றும் அன்னதான திருப்பணிகளில் கலந்துகொள்வது தோஷத்தை போக்கும்.'
    ],
    predictionsEn: [
      'Examine the star lord of Mandi closely to institute precise remedial propitiations.',
      'Resolving long-standing insomnia and breaking free of dark melancholic solitary spaces.',
      'Conscientiously carrying out deferred ancestral Shradh and Thithi memorial rituals.',
      'Mitigating heavy afflictions by sponsoring temple consecrations and free public feastings.'
    ],
    cautionsTa: [
      'மரண பயம், இனம் புரியாத பீதி மற்றும் அமானுஷ்ய பயங்கள் உண்டாகலாம்.',
      'குடல் சம்பந்தமான வியாதிகள், செரிமானக் கோளாறு, நச்சு உணவு பாதிப்புகள்.',
      'உறவினர் அல்லது தெரிந்தவர்களின் மரணத்தில் கலந்துகொள்ள முடியாத சங்கடம் அல்லது மரணத்திற்கு காரணமாதல்.',
      'விஷம் மற்றும் விஷ ஜந்துகளால் கண்டம் உண்டாகலாம்; லேசான விஷம் கூட உடனடியாக தீவிர பாதிப்பைத் தரும் என்பதால் மிக எச்சரிக்கை தேவை.'
    ],
    cautionsEn: [
      'Intense existential mortality dread, phobias, and frightening eerie nightmares.',
      'Acute gastro-intestinal infections, irritable bowel syndrome, or toxic food reactions.',
      'Being unhappily unable to attend close obsequies, or getting unfairly dragged into death controversies.',
      'High vulnerability to toxic stings, snakebites, or chemical allergens; seek immediate medical attention.'
    ]
  }
};

export const RAHU_BHAVA_PREDICTIONS: Record<number, RahuBhavaPrediction> = {
  1: {
    houseNumber: 1,
    titleTa: '1-ஆம் பாவம் / லக்னம் அல்லது லக்னாதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 1st House (Lagna) or Lagna Lord',
    significanceTa: 'தன் உடல், குணம், சுய வளர்ச்சி, இடமாற்றம் மற்றும் பொது வாழ்க்கை',
    significanceEn: 'Self-identity, physical physique, personality evolution, relocation, and vital stamina',
    predictionsTa: [
      'ஜாதகருக்கு புதிய இடமாற்றம் மற்றும் வெளிநாட்டு பயணம் உண்டாகும்.',
      'புதிய நண்பர்கள் தொடர்பு உண்டாகும்; பழைய நண்பர்கள் மாறி புதியவர்கள் இணைவர்.',
      'புதிய பழக்க வழக்கங்கள் உண்டாகும்; வாழ்க்கையில் ஒரு புதிய மறுமலர்ச்சி தொடங்கும்.',
      'ஒரு பெரும் மாற்றத்தை, முன்னேற்றத்தை நோக்கிய பயணமாக இது அமையும்.'
    ],
    predictionsEn: [
      'Relocation, change of dwelling, and remarkable foreign travel horizons.',
      'New network of progressive friends; obsolete social circles phase out gracefully.',
      'Adopting novel lifestyle habits, behavioral patterns, and personal lifestyle reinvention.',
      'A pivotal evolutionary transition geared toward massive upward social mobility.'
    ],
    cautionsTa: [
      'தன் ஆரோக்கியத்தைப் பற்றிய கவலை உண்டாகும்; ஸ்கேன், எக்ஸ்ரே எடுத்துப் பார்க்கும் சூழல்.',
      'தோல் அரிப்பு தொந்தரவு மற்றும் ஒவ்வாமைகள் வரலாம்.'
    ],
    cautionsEn: [
      'Apprehensions concerning personal health; routine scans, medical screenings, and lab tests.',
      'Cutaneous allergies, dermatitis, and recurring skin rashes.'
    ]
  },
  2: {
    houseNumber: 2,
    titleTa: '2-ஆம் பாவம் அல்லது 2-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 2nd House or 2nd Lord',
    significanceTa: 'தனம், குடும்பம், வாக்கு, கண் பார்வை மற்றும் வரவுகள்',
    significanceEn: 'Liquid wealth, family kinship, oral speech, facial expression, and financial receivables',
    predictionsTa: [
      'வர வேண்டிய பழைய பாக்கிப் பணம் கைக்கு வந்து சேரும்; ஊதிய உயர்வு உண்டாகும்.',
      'வட்டிக்கு கொடுப்பார்கள்; வட்டி மூலமும் முதலீடுகள் மூலமும் தன வருமானம் பெருகும்.',
      'திருமணம் ஆகாதவருக்கு திருமணம் கைகூடும் யோகம் உண்டாகும்.',
      'பிரிந்த குடும்பத்தினர் மீண்டும் ஒன்று சேரும் சுப நிகழ்வு அமையும்.'
    ],
    predictionsEn: [
      'Uncollected receivables and delayed funds arrive safely; professional salary hikes.',
      'Lending on interest; augmenting capital gains and dividend yields.',
      'Auspicious wedlock finalized for eligible bachelors and spinsters.',
      'Estranged family members reuniting cordially in domestic harmony.'
    ],
    cautionsTa: [
      'யாருக்கும் வாக்குறுதி கொடுக்கக் கூடாது; கொடுத்த வாக்குறுதி தவறும் சூழ்நிலை உருவாகலாம்.',
      'கண்கள் மற்றும் பற்கள் சம்பந்தமான தொந்தரவு இருந்து கொண்டே இருக்கும்.',
      'குடும்பத்தை விட்டு தற்காலிகமாக பிரியும் சூழல் உருவாகலாம்.',
      'முகத்தில் காயங்கள் அல்லது பருக்கள் தோன்றும்; பெரியம்மாவுக்கு இடமாற்றம்/அறுவை சிகிச்சை.'
    ],
    cautionsEn: [
      'Strictly avoid issuing verbal assurances or guarantees; hazard of involuntary default.',
      'Chronic ocular strain, ophthalmological visits, or dental canal procedures.',
      'Temporary occupational separation from immediate family unit.',
      'Facial cuts, scars, or cystic acne; health concerns or surgical needs for maternal aunts.'
    ]
  },
  3: {
    houseNumber: 3,
    titleTa: '3-ஆம் பாவம் அல்லது 3-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 3rd House or 3rd Lord',
    significanceTa: 'தைரியம், இளைய சகோதரன், தகவல் தொடர்பு, ஆவணங்கள், இசை மற்றும் மாற்றம்',
    significanceEn: 'Courage, younger siblings, communications, legal documentation, music, and changes',
    predictionsTa: [
      'இளைய சகோதரன் பிறத்தல் அல்லது இளைய சகோதரன் இடமாற்றம் அடைவர்.',
      'பத்திரப்பதிவு மற்றும் கமிஷன் வியாபாரம் மூலம் பெரும் தன வருமானம் உண்டாகும்.',
      'இசை, பாடல் பாடுவதில் நாட்டம் கூடும்; புதிய இசைக்கருவிகள், மியூசிக் பிளேயர் வாங்குவர்.',
      'புதிய உடற்பயிற்சி, வாக்கிங் தொடங்குவர்; வேலைக்கான நேர்முகத் தேர்வுக்கு (Interview) செல்வர்.',
      'இடது கை பழக்கம் அல்லது புதிய ஆக்கப்பூர்வ திறமைகள் வெளிப்படும்.'
    ],
    predictionsEn: [
      'Birth of a younger sibling or younger brother relocating to a new station.',
      'Handsomely profitable yields through property registries and brokerage commissions.',
      'Burgeoning passion for vocal music; purchasing high-fidelity music systems or instruments.',
      'Commencing fitness jogging routines; excelling in corporate job interviews.',
      'Developing left-handed dexterity, artistic craftsmanship, and versatile manual agility.'
    ],
    cautionsTa: [
      'தோள்பட்டை, மணிக்கட்டு, புஜங்களில் எலும்பு முறிவு (Fracture) அல்லது வலி உண்டாகலாம்.',
      'கைரேகை வைப்பதிலும், யாருக்கும் ஜாமீன் போடுவதிலும் பெரும் தொல்லைகள் வரும்; ஜாமீன் போடக்கூடாது.',
      'ஜாதகர் மீது வீண் வதந்திகள் வரலாம் அல்லது யாராவது பெட்டிஷன் போடலாம்; ஆவணங்கள் தொலைந்து போகும் நிலை ஏற்படலாம் எச்சரிக்கை.',
      'காதில், மூக்கில், தொண்டையில் (ENT) பிரச்சனைகள் வரலாம்.'
    ],
    cautionsEn: [
      'Vulnerability to fractures or sprains in shoulders, wrists, and forearm joints.',
      'Severe legal embroilments through signatures or bail guarantees; strictly abstain from acting as surety.',
      'Unfounded malicious gossip or petitions filed by detractors; risk of misplacing vital deed records.',
      'Otolaryngology (ENT) inflammation, nasal blockages, or throat infections.'
    ]
  },
  4: {
    houseNumber: 4,
    titleTa: '4-ஆம் பாவம் அல்லது 4-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 4th House or 4th Lord',
    significanceTa: 'தாய், சுகம், வீடு, பூமி, வாகனம், கல்வி மற்றும் விவசாயம்',
    significanceEn: 'Mother, domestic comforts, residences, real estate, vehicles, education, and farming',
    predictionsTa: [
      'புதிய வீடு அல்லது புதிய வாகனம் வாங்குதல்; வீடு மாற்றம், புதுப்பித்தல் நடக்கும்.',
      'புதிதாக நிலத்தில் போர்வெல் (Borewell) போடுவர்; நீர் பெருக்கெடுக்கும்.',
      'விவசாய எண்ணங்கள் உண்டாகும்; கோழிப் பண்ணை, மாட்டுப் பண்ணை, நாய் பண்ணை வைப்பர் (4 & 12 பலம் பெற்றால் தன் கையால் விதைத்தால் அதிக விளைச்சல் தரும்).',
      'புதிய ஆடைகள் வாங்குவர்; புதிய மரக்கன்றுகள் நடுவர்; நதிகளில் புனித நீராடுவர்.',
      'பள்ளிக்கூடம் தொடங்குவர் அல்லது மற்றவர்களுக்கு வகுப்புகள்/பாடங்கள் எடுப்பர்.'
    ],
    predictionsEn: [
      'Purchasing new residential property or modern conveyance; home shifting and renovation.',
      'Drilling productive deep-earth borewells with abundant water yield.',
      'Agricultural motivations: dairy farms, poultry yards, or canine kennels (planting seeds with one’s own hands yields bumper harvests if 4th & 12th are strong).',
      'Shopping for fine apparel; planting lush trees; holy ablutions in sacred rivers.',
      'Establishing educational institutions or conducting professional academic tutorials.'
    ],
    cautionsTa: [
      'தாயாருக்கு மருத்துவச் செலவு உண்டாகும்; தாயார் பற்றிய கவலை எழும்.',
      'ஜலதோஷம், சளித் தொல்லை, நீரினால் பிரச்சனைகள்; வீட்டிற்குள் பாம்பு வரும் எச்சரிக்கை.',
      'மழையினால் கூரை ஒழுகுதல் அல்லது சுவர்களில் ஈரம் இறங்குதல்.',
      'உறவினர்களிடமிருந்து தற்காலிகமாக விலகி இருக்கும் சூழல்.'
    ],
    cautionsEn: [
      'Mounting medical expenses and anxieties centered around maternal welfare.',
      'Susceptibility to severe phlegm colds, water allergies; possibility of snakes near basement.',
      'Ceiling leaks during torrential rains or water seepage issues in household structures.',
      'Temporary estrangement or cool distance from maternal relatives.'
    ]
  },
  5: {
    houseNumber: 5,
    titleTa: '5-ஆம் பாவம் அல்லது 5-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 5th House or 5th Lord',
    significanceTa: 'பூர்வ புண்ணியம், குழந்தைகள், அறிவு, குலதெய்வம், ஜோதிடம் மற்றும் முதலீடு',
    significanceEn: 'Past-life merits, progeny, intellectual intellect, ancestral lineage deities, and stock equity',
    predictionsTa: [
      'குழந்தை பாக்கியம் உண்டாகும் (உறவிலும் குழந்தைகள் பிறக்கும்; வயதானவர்களுக்கு பேரன் பேத்திகள் பிறப்பர்).',
      'குழந்தைகளுக்கு புதிய சொத்துக்கள் சேரும்; குழந்தைகளுக்கு கல்வி மேன்மை.',
      'குலதெய்வம் கோயில் புதுப்பித்தல், திருப்பணி செய்தல் மற்றும் சிறப்பு வழிபாடுகள்.',
      'ஜோதிடம், வேதங்கள், சாஸ்திரங்கள் படிப்பதில் தீவிர நாட்டம் கூடும்.',
      'ஷேர் மார்க்கெட் (Share Market), பங்குச் சந்தை முதலீடுகளில் திடீர் தன லாபம்.',
      'ஆசிரியர் பணி, வழிகாட்டுதல் அல்லது ஆன்மீக உபதேசம் செய்யும் மேன்மை உண்டாகும்.'
    ],
    predictionsEn: [
      'Conception and birth of children (in extended family too; grandchildren for seniors).',
      'Acquiring estates and real assets dedicated in children’s names; academic honors.',
      'Renovating, whitewashing, and performing special pujas at ancestral family shrines.',
      'Passionate pursuit of Vedic literature, astrology, occult sciences, and higher philosophy.',
      'Windfall profits through calculated equity investments, stocks, and speculative instruments.',
      'Ascending to dignified roles as teachers, advisors, spiritual counselors, or mentors.'
    ],
    cautionsTa: [
      'தாத்தாவுக்கு கண்டம் அல்லது உடல்நலக்குறைவு ஏற்படலாம்.',
      'குலதெய்வத்தை பற்றிய கேள்விகளும் குடும்பத்தில் குழப்பங்களும் எழும்.',
      'மறதி உண்டாகும் (5 என்பது புத்தி ஸ்தானம்); முடிவெடுப்பதில் குழப்பம்.',
      'வயிறு சம்பந்தமான உபாதைகள் மற்றும் செரிமானக் கோளாறு.'
    ],
    cautionsEn: [
      'Health concerns or life-force debility for paternal grandfathers.',
      'Doubts, contentions, and unresolved ambiguities surrounding ancestral lineage rites.',
      'Absent-mindedness and mental fogginess (5th house governs intellect); cognitive fatigue.',
      'Gastro-intestinal discomfort, acute gastric ulcers, or food assimilation troubles.'
    ]
  },
  6: {
    houseNumber: 6,
    titleTa: '6-ஆம் பாவம் அல்லது 6-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 6th House or 6th Lord',
    significanceTa: 'வேலைவாய்ப்பு, கடன் நிவர்த்தி, எதிரிகள் வெற்றி, உணவு மற்றும் சேவை',
    significanceEn: 'Employment victories, debt settlement, vanquishing adversaries, dietary medicine, and service',
    predictionsTa: [
      'புதிய வேலைவாய்ப்பு கிடைக்கும்; இரவு நேரப் பணி அல்லது அதிக வருமானமுள்ள வேலை அமையும்.',
      'பழைய கடன்கள் முழுமையாக அடைக்கப்படும்; கடனை மாற்றி அமைத்து நிம்மதி அடைவர்.',
      'எதிரிகள் தொல்லை அடியோடு தீரும்; வழக்குகளில் வெற்றி கிட்டும்.',
      'இயற்கை உணவுக்கு மாறுவர்; உணவு சம்பந்தமான உணவகம்/கேட்டரிங் தொழில் அமையும்.',
      'காவல் மற்றும் ராணுவம் சார்ந்த பணிகள் அல்லது அரசு ஒப்பந்தங்கள் கிடைக்கும்.'
    ],
    predictionsEn: [
      'Securing lucrative employment postings; night-shift operations or high-incentive jobs.',
      'Complete liquidation of lingering debts; restructurings that grant peace of mind.',
      'Vanquishing hostile competitors; complete triumphs in court litigations.',
      'Embracing organic naturopathy diets; launching food catering or culinary enterprises.',
      'Recruitment into defense forces, law enforcement bodies, or state security contracting.'
    ],
    cautionsTa: [
      'வயிறு சம்பந்தமான ரோகம், வாய்வுத் தொல்லை, இடுப்பு வலி ஏற்படலாம்.',
      'வேலையாட்கள் அடிக்கடி மாறுவர்; தொழிலில் பணியாளர்களால் சிறு சலசலப்பு.',
      'வாடகை வருமானத்தில் தற்காலிக தடை வரலாம்; இரண்டாவது வாங்கிய சொத்தை விற்கும் சூழல்.',
      'சித்தி மீது வெறுப்பு அல்லது சித்திக்கு உடல்நலக்குறைவு.'
    ],
    cautionsEn: [
      'Gastric acidity, lumbar backaches, and pelvic nerve twinges.',
      'High turnover of domestic helps and corporate subordinates.',
      'Intermittent delays in collecting tenant rental revenues; liquidating secondary properties.',
      'Estrangements or health downturns concerning stepmothers or maternal aunts.'
    ]
  },
  7: {
    houseNumber: 7,
    titleTa: '7-ஆம் பாவம் அல்லது 7-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 7th House or 7th Lord',
    significanceTa: 'களத்திரம், கூட்டாளி, வர்த்தகம், திருமணம், வெளிநாடு மற்றும் பொதுஜனம்',
    significanceEn: 'Spouse, commercial alliances, global trade, matrimony, foreign stays, and public interactions',
    predictionsTa: [
      'புதிய கூட்டுத் தொழில் தொடங்குதல்; வர்த்தக நிறுவனங்கள் மற்றும் பஜார் சார்ந்த தொழில் மேன்மை.',
      'திருமணமாகாதவர்களுக்கு விவாகப் பிராப்தி; உறவில் ஒரு சுப திருமணம் நடக்கும்.',
      'பிரிந்த குடும்பம் மற்றும் நீண்டகால நண்பர்கள் மீண்டும் வந்து இணைவர்.',
      'வெளிநாட்டுப் பயணம் மற்றும் வெளிநாட்டு வருமானம் உண்டாகும்.',
      'சாதுக்கள், சந்நியாசிகளை சந்தித்து ஆசி பெறுவர்; ஆன்மீக நாட்டம் அதிகரிக்கும்.'
    ],
    predictionsEn: [
      'Inaugurating corporate joint ventures; commercial market boom for merchant business.',
      'Nuptials blessed for prospective brides and grooms; joyous weddings in the kinship.',
      'Reconciliation of long-separated families and reunion of old loyal friends.',
      'Foreign travel opportunities accompanied by handsome foreign-exchange remittances.',
      'Blessed encounters with holy ascetics, hermits, and enlightened spiritual preceptors.'
    ],
    cautionsTa: [
      'தம்பதியருக்குள் கருத்து வேறுபாடு மற்றும் ஈகோ பிரச்சனைகள் எழலாம்.',
      'மனைவிக்கு சளி, மூட்டு வலி அல்லது உடல் நலக்குறைவு ஏற்படலாம்.',
      'கூட்டுத் தொழிலில் இருந்து ஒரு பங்குதாரர் விலகும் சூழல் உருவாகலாம்.',
      'சிறுநீர் உறுப்புகளில் அரிப்பு, எரிச்சல் மற்றும் சிறுநீரக/கல்லீரல் பயம் வரலாம்.'
    ],
    cautionsEn: [
      'Ego frictions, misunderstandings, and temperament clashes between married partners.',
      'Spouse suffering from joint pains, seasonal coughs, or physical low energy.',
      'Disengaging from problematic partnerships or amicable split from old business allies.',
      'Urethral burning, skin allergies in groin regions, or renal stone hypochondria.'
    ]
  },
  8: {
    houseNumber: 8,
    titleTa: '8-ஆம் பாவம் அல்லது 8-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 8th House or 8th Lord',
    significanceTa: 'ஆயுள், எதிர்பாராத தனலாபம், இன்சூரன்ஸ், மறைமுக வருமானம், விபத்து மற்றும் பீதி',
    significanceEn: 'Longevity, unforeseen windfalls, insurance maturity, hidden incomes, and deep anxieties',
    predictionsTa: [
      'எல்ஐசி (LIC), கிராஜுவிட்டி (Gratuity) முதிர்வுத் தொகை மற்றும் எதிர்பாராத தன வரவு கிடைக்கும்.',
      'திடீர் அதிர்ஷ்டம், புதையல் போன்ற அனாமத்து வருமானம் அல்லது மனைவி வழி வருமானம் பெருகும்.',
      'அபகரிக்கப்பட்ட பூமி/சொத்துக்களை சட்டரீதியாக மீட்டெடுக்கும் யோகம்.',
      'ஏற்கனவே தொடுத்த வழக்குகளில் பெருந்தொகை இழப்பீடாக கைக்கு வரும்.'
    ],
    predictionsEn: [
      'Maturity disbursements of LIC policies, employee provident funds, and unexpected inheritances.',
      'Windfall luck, mysterious unearned financial gains, or lucrative income through spouse.',
      'Triumphant reclamation of usurped properties and disputed title deeds.',
      'Reaping substantial compensation settlements from long-drawn judicial arbitration.'
    ],
    cautionsTa: [
      'அவசொல், வீண்பழி மற்றும் மன அமைதியின்மை உண்டாகலாம்; யார் விஷயத்திலும் தலையிடக் கூடாது.',
      'பெரிய விபத்து பயம், அமானுஷ்ய சக்திகள் மற்றும் செய்வினை/கண்திருஷ்டி பற்றிய பயம்.',
      'கழிவுநீர் வழியில் அடைப்பு, வீட்டு முன்பு குப்பைத்தொட்டி வருதல், பிளம்பிங் ஒர்க் செலவு.',
      'மூலம், பவுத்திரம், கடுமையான மலச்சிக்கல் மற்றும் தோல் நோய்கள் வரலாம்.',
      'வீட்டில் காஸ் சிலிண்டர் அல்லது கேஸ் டியூப் மாற்றுதல்; பொருட்கள் களவு போகாமல் எச்சரிக்கை தேவை.'
    ],
    cautionsEn: [
      'Vulnerable to slander, unfounded blame, and inner agitation; refrain from meddling in third-party feuds.',
      'Apprehensions regarding major accidents, evil eye, black magic, or eerie ghostly presences.',
      'Clogged septic tanks, garbage bins deposited in front of home, and recurring plumbing repairs.',
      'Hemorrhoids, anal fissures, chronic constipation, and stubborn dermatological eczema.',
      'Mandatory renewal of domestic LPG gas tubes/cylinders; guard valuables against petty theft.'
    ]
  },
  9: {
    houseNumber: 9,
    titleTa: '9-ஆம் பாவம் அல்லது 9-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 9th House or 9th Lord',
    significanceTa: 'தந்தை, பாக்யம், குரு, தொலைதூர யாத்திரை, உயர்கல்வி, தர்ம சிந்தனை மற்றும் ஆராய்ச்சி',
    significanceEn: 'Father, divine luck, preceptors, long-distance pilgrimages, doctorate research, and dharma',
    predictionsTa: [
      'காசி, ராமேஸ்வரம், தனுஷ்கோடி போன்ற புண்ணிய ஸ்தலங்களுக்கு புனித யாத்திரை செல்வர்.',
      'உயர்கல்வி யோகம்: PhD, ஆராய்ச்சி கல்வி, ஆன்மீகம் மற்றும் ஜோதிடக் கல்வி பயில்வர்.',
      'ஸ்ரீ ஆஞ்சநேயர் வழிபாடு, துளசி மாலை அணிதல், மந்திர ஜெபம், ஹோமங்கள் செய்தல்.',
      'சமூகத்தில் பெரும் கௌரவம், மத குருமார்களின் தரிசனம் மற்றும் ஆசிகள் கிட்டும்.',
      'ஜாதகர் தந்தையாகும் பெரும் பாக்கியம் உண்டாகும்; வெளிநாட்டு பயணம் கைகூடும்.'
    ],
    predictionsEn: [
      'Sacred yatras to holiest tirthas like Kashi, Rameswaram, and Dhanushkodi.',
      'Doctoral scholarly triumphs: PhD completions, advanced research, Vedic theology, and astrology.',
      'Devotional worship of Lord Hanuman, wearing Tulsi beads, japa chanting, and grand homams.',
      'Eminent public respect, darshan and blessings from supreme pontiffs and spiritual heads.',
      'Parenthood blessings: native attaining the joy of becoming a father; overseas travels.'
    ],
    cautionsTa: [
      'தந்தையின் ஆரோக்கியத்தில் கவலை; தந்தைக்கு இடமாற்றம், எக்ஸ்ரே/ஸ்கேன் எடுக்கும் சூழல்.',
      'ஒன்பதாம் அதிபதியும் குருவும் பலம் குறைந்தால் மதமாற்ற எண்ணங்களை தூண்டும்.',
      'தந்தைவழி சொத்தில் சிறு வழக்குகள் அல்லது பாகப்பிரிவினை சிக்கல்கள்.',
      'இரண்டாம் திருமணம் அல்லது மனைவியின் உடன்பிறப்புகளால் குடும்பத்தில் சலசலப்பு.'
    ],
    cautionsEn: [
      'Concerns regarding father’s physical health; diagnostic imaging scans and relocation for father.',
      'If the 9th lord and natal Jupiter are debilitated, it incites temptations of ideological conversion.',
      'Partition conflicts or minor legal claims over patrimonial ancestral legacies.',
      'Complications regarding second marriage matters or friction triggered by spouse’s siblings.'
    ]
  },
  10: {
    houseNumber: 10,
    titleTa: '10-ஆம் பாவம் அல்லது 10-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 10th House or 10th Lord',
    significanceTa: 'ஜீவனம், தொழில், சமூக அந்தஸ்து, அதிகார பதவி, கர்மம் மற்றும் பொது ஈடுபாடு',
    significanceEn: 'Vocation, professional prestige, social standing, corporate authority, karma, and leadership',
    predictionsTa: [
      'தொழில் இல்லாதவர்களுக்கு சிறந்த புதிய வேலை கிடைக்கும்; தொழிலில் புதிய கிளைகள் தொடங்குவர்.',
      'ஒன்றுக்கு மேற்பட்ட புதிய தொழில்கள் அமைதல்; தொழிலுக்காக வெளிநாட்டு பயணங்கள் மேற்கொள்வர்.',
      'பதவி உயர்வு தேடி வரும்; சங்கம் மற்றும் சமூகப் பொறுப்புகளை ஏற்று தலைமை தாங்குவர்.',
      'மனைவி பெயரில் புதிய சொத்து அல்லது புதிய வாகனம் வாங்குவர்.',
      'புனித நதிகளில் நீராடுதல், அன்னதானம் செய்தல் மற்றும் ஆலய திருப்பணி செய்தல்.'
    ],
    predictionsEn: [
      'Lucrative new career appointments for the unemployed; establishing multiple corporate branches.',
      'Diversifying into multiple parallel businesses; international travel dedicated to trade development.',
      'Executive promotions; elected or appointed to govern civic associations, guilds, and boards.',
      'Purchasing landed estates, luxury villas, or modern cars titled under spouse’s name.',
      'Bathing in sanctified rivers, funding large-scale food distribution, and temple restoration.'
    ],
    cautionsTa: [
      'தொழிலில் மற்றவர்கள் தலையீடு மற்றும் தேவையற்ற விரய மருத்துவ செலவுகள் வரலாம்.',
      'பதவி பறிபோதல் அல்லது தொழிலில் இடமாற்றம் ஏற்படும் அபாயம் உண்டு (விழிப்புணர்வு தேவை).',
      'குடும்பத்தில் அல்லது உறவில் முதியவர்களுக்கு கர்ம காரியங்கள் நடக்கும் சூழல்.',
      'தொழில் செய்யும் இடத்திற்கு பாம்பு வருதல்; மாமியாருக்கு உடல்நலக் குறைவு.'
    ],
    cautionsEn: [
      'Intrusive interference by competitors/associates and unbudgeted occupational medical overheads.',
      'Vulnerability to sudden bureaucratic demotion or sudden job transfer unless proactive.',
      'Performing or attending solemn funeral obsequies for senior elders in the family clan.',
      'Reptile visitations in industrial godowns; acute health debility for mother-in-law.'
    ]
  },
  11: {
    houseNumber: 11,
    titleTa: '11-ஆம் பாவம் அல்லது 11-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 11th House or 11th Lord',
    significanceTa: 'லாபம், ஆசை நிறைவேறுதல், மூத்த சகோதரன், நண்பர்கள், வெற்றி மற்றும் கமிஷன்',
    significanceEn: 'Net profits, realization of desires, elder siblings, elite circles, victory, and windfalls',
    predictionsTa: [
      'அபரிமிதமான லாபம் மற்றும் அதீத வருமான வாய்ப்புகள் தேடி வரும்.',
      'நீண்ட நாள் எதிர்கால திட்டங்கள் அனைத்தும் மிகச் சிறப்பாக நிறைவேறும்.',
      'புதிய நண்பர்கள் சேர்க்கை (பெண் நண்பர்கள் மற்றும் வேற்று மொழி/வேற்று மத நண்பர்கள் உதவி).',
      'வழக்குகளில் அபார வெற்றி கிட்டும்; அரியர்ஸ் பரீட்சைகளில் முழு வெற்றி பெறுவர்.',
      'கடனை முழுவதுமாக அடைத்து ரொக்க இருப்பு (Liquid Cash) வைக்கும் யோகம்.',
      'தாய்மாமனுக்கு சுப திருமணம் நடக்கும் நற்செய்தி.'
    ],
    predictionsEn: [
      'Prodigious windfall profits, expanded revenue margins, and capital accretion.',
      'Long-deferred ambitious future aspirations materialize into glorious reality.',
      'Enriching alliances with distinguished friends (female allies, cross-cultural benefactors).',
      'Sweeping victories in pending court trials; clearing every pending university examination.',
      'Complete debt eradication, building up substantial surplus liquid cash reserves.',
      'Celebration of wedding bells and matrimonial bliss for maternal uncles.'
    ],
    cautionsTa: [
      'தீய பழக்க வழக்கங்கள் மற்றும் தவறான நட்பு வட்டாரங்கள் வராமல் விழிப்புணர்வு தேவை.',
      'மூட்டு வலி, கால் வலி மற்றும் கால்களில் ரத்த காயம் வர வாய்ப்புண்டு.',
      'சித்தப்பாவுக்கு இடமாற்றம் அல்லது உடல்நலக் குறைவு ஏற்படலாம்.'
    ],
    cautionsEn: [
      'Vigilance against adopting clandestine addictive vices or deceitful opportunistic companions.',
      'Arthritic stiffness in knees, leg cramps, or minor bleeding lacerations on limbs.',
      'Sudden relocation or medical setbacks concerning paternal uncles.'
    ]
  },
  12: {
    houseNumber: 12,
    titleTa: '12-ஆம் பாவம் அல்லது 12-ஆம் அதிபதி மேல் கோள்சார ராகு',
    titleEn: 'Transit Rahu Over 12th House or 12th Lord',
    significanceTa: 'விரயம், மோட்சம், வெளிநாடு வாசம், மருத்துவமனை, தூக்கம் மற்றும் ஆன்மீக தனிமை',
    significanceEn: 'Expenditures, overseas abode, hospitalization, restful sleep, and contemplative seclusion',
    predictionsTa: [
      'வெளிநாடு அல்லது வெளிமாநிலம் சென்று நீண்ட காலம் வசிக்கும் யோகம்.',
      'வெளிநாட்டு குடியுரிமை (PR, Citizenship) மற்றும் விசா தொடர்பான நற்செய்திகள்.',
      'மருத்துவமனையில் வேலை வாய்ப்பு அமைதல் அல்லது மருத்துவம் சார்ந்த பணிகளில் வெற்றி.',
      'விமானப் பயணம் உண்டாகும்; ராமேஸ்வரம் சென்று கடலில் நீராடி தோஷம் கழித்தல்.',
      'கோயில் குடமுழுக்கு, தர்ம கைங்கரியங்கள் மற்றும் அனாதை இல்லங்களுக்கு உதவி செய்தல்.'
    ],
    predictionsEn: [
      'Enduring foreign relocation or settling in distant prosperous states.',
      'Auspicious approvals for foreign permanent residency (PR), work visas, and passports.',
      'Securing employment contracts in premier hospitals, pharmacology, and care homes.',
      'Aviation international flights; holy bathing in Rameswaram seas to cleanse heavy sins.',
      'Philanthropic donations to hospice centers, temple consecrations, and orphan care.'
    ],
    cautionsTa: [
      'மருத்துவச் செலவுகள் அதிகமாகும்; தூக்கமின்மை அல்லது இருட்டு அறையில் தனிமைப்படல்.',
      'கால் பாதங்களில் பித்த வெடிப்பு, காயம்; இரவு நேரங்களில் நாய்க்கடி அபாயம் எச்சரிக்கை.',
      'நீண்ட கால வழக்குகள் (Supreme Court / High Court) காரணமாக அதிக செலவுகள்.',
      'தந்தைவழி பாட்டிக்கு உடல்நலக் குறைவு ஏற்படலாம்.',
      'மரங்கள் ஏறுதல் மற்றும் மலை ஏற்றங்களில் விபத்து அபாயம் உள்ளதால் தவிர்ப்பது நல்லது.'
    ],
    cautionsEn: [
      'Spiraling hospital expenses; acute insomnia or feeling trapped in dark solitary enclosures.',
      'Severe plantar heel fissures, foot cuts; caution against aggressive dog bites after sunset.',
      'Protracted legal expenses fighting prolonged High Court / Supreme Court litigations.',
      'Health debility or severe medical emergencies for paternal grandmother.',
      'Strictly avoid tree climbing, high-altitude trekking, or rocky crag expeditions.'
    ]
  }
};

/**
 * Calculates current Transit Rahu influences based on Nadi 1, 5, 7, 9 aspect rule.
 */
export function analyzeRahuTransitForHoroscope(
  natalPlanets: PlanetPosition[],
  lagnaSignId: number,
  currentRahuSignId: number
) {
  // Signs activated by Rahu: 1 (occupying), 5 (trine), 7 (opposite), 9 (trine)
  const activatedSignIds = [
    currentRahuSignId,
    (currentRahuSignId + 4) % 12,
    (currentRahuSignId + 6) % 12,
    (currentRahuSignId + 8) % 12,
  ];

  const aspectNames = [
    'Direct Conjunction (1st House - தான் நின்ற வீடு)',
    '5th Trikona Aspect (5-ம் பார்வை - பூர்வ புண்ணிய திரிகோணம்)',
    '7th Direct Aspect (7-ம் பார்வை - சப்தம பார்வை)',
    '9th Trikona Aspect (9-ம் பார்வை - பாக்கிய திரிகோணம்)'
  ];

  const aspectNamesTa = [
    'நேரடி சேர்க்கை (1-ம் இடம் - தான் நின்ற வீடு)',
    '5-ம் திரிகோணப் பார்வை (திரிகோண ஸ்தானம்)',
    '7-ம் சமசப்தம பார்வை (சப்தம ஸ்தானம்)',
    '9-ம் திரிகோணப் பார்வை (பாக்கிய ஸ்தானம்)'
  ];

  // Find which natal planets are stationed in these 4 activated signs
  const activatedPlanets: {
    planet: PlanetPosition;
    signId: number;
    aspectTypeEn: string;
    aspectTypeTa: string;
    prediction: RahuPlanetPrediction;
  }[] = [];

  activatedSignIds.forEach((signId, index) => {
    natalPlanets.forEach((p) => {
      if (p.signId === signId && p.name !== 'Lagna') {
        const pred = RAHU_PLANET_PREDICTIONS[p.name];
        if (pred) {
          activatedPlanets.push({
            planet: p,
            signId,
            aspectTypeEn: aspectNames[index],
            aspectTypeTa: aspectNamesTa[index],
            prediction: pred
          });
        }
      }
    });
  });

  // Determine which Bhavas (1-12 from Lagna) correspond to these 4 activated signs
  const activatedBhavas: {
    houseNumber: number;
    signId: number;
    aspectTypeEn: string;
    aspectTypeTa: string;
    prediction: RahuBhavaPrediction;
  }[] = [];

  activatedSignIds.forEach((signId, index) => {
    const houseNumber = ((signId - lagnaSignId + 12) % 12) + 1;
    const bhavaPred = RAHU_BHAVA_PREDICTIONS[houseNumber];
    if (bhavaPred) {
      activatedBhavas.push({
        houseNumber,
        signId,
        aspectTypeEn: aspectNames[index],
        aspectTypeTa: aspectNamesTa[index],
        prediction: bhavaPred
      });
    }
  });

  return {
    currentRahuSignId,
    activatedSignIds,
    activatedPlanets,
    activatedBhavas,
    corePrinciple: RAHU_CORE_PRINCIPLE,
    allPlanetPredictions: RAHU_PLANET_PREDICTIONS,
    allBhavaPredictions: RAHU_BHAVA_PREDICTIONS,
  };
}
