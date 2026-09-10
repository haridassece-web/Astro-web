// Master Traditional Parihara Data extracted from Guruarul Jyothida Vidhyalayam Document

export interface TithiPariharaData {
  tithiIndex: number; // 1 to 15
  shuklaTempleTa: string;
  shuklaTempleEn: string;
  shuklaDeityTa: string;
  shuklaDeityEn: string;
  krishnaTempleTa: string;
  krishnaTempleEn: string;
  krishnaDeityTa: string;
  krishnaDeityEn: string;
}

export const TITHI_PARIHARA_MAP: Record<number, TithiPariharaData> = {
  1: {
    tithiIndex: 1,
    shuklaTempleTa: 'பட்டீஸ்வரம் துர்க்கையம்மன் கோவில் (வளர்பிறை பிரதமை)',
    shuklaTempleEn: 'Pateeswaram Durga Temple (Shukla Pratipada)',
    shuklaDeityTa: 'துர்க்கையம்மன்',
    shuklaDeityEn: 'Goddess Durga',
    krishnaTempleTa: 'திருக்கோட்டுப்பள்ளி ஆரண்யேஸ்வரர் கோவில் (தேய்பிறை பிரதமை)',
    krishnaTempleEn: 'Thirukkattupalli Aranyeswarar Temple (Krishna Pratipada)',
    krishnaDeityTa: 'குபேரன் & சிவன்',
    krishnaDeityEn: 'Lord Kuberan & Shiva',
  },
  2: {
    tithiIndex: 2,
    shuklaTempleTa: 'திருவைக்காவூர் வில்வவனேஸ்வரர் கோயில் (வளர்பிறை துவிதியை)',
    shuklaTempleEn: 'Thiruvaikavur Vilvavaneswarar Temple (Shukla Dwitiya)',
    shuklaDeityTa: 'வாசுதேவன் & சிவன்',
    shuklaDeityEn: 'Vasudevan & Shiva',
    krishnaTempleTa: 'காளஹஸ்தி காளத்தியப்பர் & பாதாள விநாயகர் கோயில் (தேய்பிறை துவிதியை)',
    krishnaTempleEn: 'Srikalahasti Kalahasteeswara & Pathala Ganesha Temple (Krishna Dwitiya)',
    krishnaDeityTa: 'வாயு தேவலிங்கம் & விநாயகர்',
    krishnaDeityEn: 'Vayu Lingam & Pathala Vinayagar',
  },
  3: {
    tithiIndex: 3,
    shuklaTempleTa: 'திங்களூர் கைலாசநாதர் கோயில் (வளர்பிறை திரிதியை)',
    shuklaTempleEn: 'Thingaloor Kailasanathar Temple (Shukla Tritiya)',
    shuklaDeityTa: 'சந்திரன் & பெரியநாயகி',
    shuklaDeityEn: 'Chandra Bhagavan & Periyanayaki',
    krishnaTempleTa: 'திருவண்ணாமலை அண்ணாமலையார் திருக்கோயில் (தேய்பிறை திரிதியை)',
    krishnaTempleEn: 'Tiruvannamalai Annamalaiyar Temple (Krishna Tritiya)',
    krishnaDeityTa: 'அக்னி தேவலிங்கம் & அருணாசலேஸ்வரர்',
    krishnaDeityEn: 'Agni Lingam & Annamalaiyar',
  },
  4: {
    tithiIndex: 4,
    shuklaTempleTa: 'பிள்ளையார்பட்டி கற்பக விநாயகர் கோயில் (வளர்பிறை சதுர்த்தி)',
    shuklaTempleEn: 'Pillayarpatti Karpaga Vinayagar Temple (Shukla Chaturthi)',
    shuklaDeityTa: 'விக்னேஸ்வரன் / கற்பக விநாயகர்',
    shuklaDeityEn: 'Karpaga Vinayagar',
    krishnaTempleTa: 'கஞ்சனூர் கற்பகாம்பாள் அக்னீஸ்வரர் கோயில் (தேய்பிறை சதுர்த்தி)',
    krishnaTempleEn: 'Kanjanoor Agneeswarar & Karpagambal Temple (Krishna Chaturthi)',
    krishnaDeityTa: 'அசுரர் & சுக்கிரன்',
    krishnaDeityEn: 'Sukra Bhagavan & Karpagambal',
  },
  5: {
    tithiIndex: 5,
    shuklaTempleTa: 'பெண்ணாகடம் பிரம்மபுரீஸ்வரர் கோயில் (வளர்பிறை பஞ்சமி)',
    shuklaTempleEn: 'Pennadam Brahmapureeswarar Temple (Shukla Panchami)',
    shuklaDeityTa: 'தேவேந்திரன் & சிவன்',
    shuklaDeityEn: 'Devendran & Shiva',
    krishnaTempleTa: 'ஆலங்குடி ஆபத்சஹாயேஸ்வரர் திருக்கோயில் (தேய்பிறை பஞ்சமி)',
    krishnaTempleEn: 'Alangudi Abathsahayeswarar Temple (Krishna Panchami)',
    krishnaDeityTa: 'தக்ஷிணாமூர்த்தி & குரு',
    krishnaDeityEn: 'Dakshinamurthy & Guru Bhagavan',
  },
  6: {
    tithiIndex: 6,
    shuklaTempleTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில் (வளர்பிறை சஷ்டி)',
    shuklaTempleEn: 'Thiruchendur Murugan Temple (Shukla Shashti)',
    shuklaDeityTa: 'சுப்பிரமணியன் / செந்திலாண்டவர்',
    shuklaDeityEn: 'Lord Murugan',
    krishnaTempleTa: 'வைத்தீஸ்வரன் கோவில் அங்காரகன் சந்நிதி (தேய்பிறை சஷ்டி)',
    krishnaTempleEn: 'Vaitheeswaran Koil Angarakan Sthalam (Krishna Shashti)',
    krishnaDeityTa: 'அங்காரகன் & வைத்தீஸ்வரன்',
    krishnaDeityEn: 'Angarakan & Vaidyanathar',
  },
  7: {
    tithiIndex: 7,
    shuklaTempleTa: 'சூரியனார் கோவில் நவகிரக தலம் (வளர்பிறை சப்தமி)',
    shuklaTempleEn: 'Suryanar Kovil Temple (Shukla Saptami)',
    shuklaDeityTa: 'சூரிய பகவான்',
    shuklaDeityEn: 'Surya Bhagavan',
    krishnaTempleTa: 'திருக்கோனூர் கரும்பீஸ்வரர் கோயில் (தேய்பிறை சப்தமி)',
    krishnaTempleEn: 'Thirukonur Karumbeswarar Temple (Krishna Saptami)',
    krishnaDeityTa: 'சித்தர் & சிவன்',
    krishnaDeityEn: 'Siddhar & Karumbeswarar',
  },
  8: {
    tithiIndex: 8,
    shuklaTempleTa: 'தேவூர் தேவபுரீஸ்வரர் திருக்கோயில் (வளர்பிறை அஷ்டமி)',
    shuklaTempleEn: 'Devur Devapureeswarar Temple (Shukla Ashtami)',
    shuklaDeityTa: 'மகாலட்சுமி & சிவன்',
    shuklaDeityEn: 'Goddess Mahalakshmi & Shiva',
    krishnaTempleTa: 'ஸ்ரீரங்கம் ஆதிசேஷன் & கருடாழ்வார் சந்நிதி (தேய்பிறை அஷ்டமி)',
    krishnaTempleEn: 'Srirangam Ranganathar & Garuda Alwar Temple (Krishna Ashtami)',
    krishnaDeityTa: 'ஆதிசேஷன், ரங்கநாதர் & கருடாழ்வார்',
    krishnaDeityEn: 'Adisheshan, Ranganathar & Garuda',
  },
  9: {
    tithiIndex: 9,
    shuklaTempleTa: 'கூத்தனூர் சரஸ்வதி திருக்கோயில் (வளர்பிறை நவமி)',
    shuklaTempleEn: 'Koothanur Saraswathi Temple (Shukla Navami)',
    shuklaDeityTa: 'சரஸ்வதி தாயார்',
    shuklaDeityEn: 'Goddess Saraswathi',
    krishnaTempleTa: 'திருவாஞ்சியம் வாஞ்சிநாதர் திருக்கோயில் (தேய்பிறை நவமி)',
    krishnaTempleEn: 'Thiruvanchiyam Vanchinathar Temple (Krishna Navami)',
    krishnaDeityTa: 'எமதர்மன் & வாஞ்சிநாதர்',
    krishnaDeityEn: 'Yamadharman & Vanchinathar',
  },
  10: {
    tithiIndex: 10,
    shuklaTempleTa: 'கும்பகோணம் வீரேத்திரசாமி கோயில் (வளர்பிறை தசமி)',
    shuklaTempleEn: 'Kumbakonam Veera Bhathra Swamy Temple (Shukla Dashami)',
    shuklaDeityTa: 'வீரபத்திரன் & அகோரமூர்த்தி',
    shuklaDeityEn: 'Veerabhadran & Aghoramurthy',
    krishnaTempleTa: 'தென்குடித்திட்டை வசிஷ்டேஸ்வரர் குரு கோயில் (தேய்பிறை தசமி)',
    krishnaTempleEn: 'Thenkudithittai Vasishteswarar & Guru Temple (Krishna Dashami)',
    krishnaDeityTa: 'வியாழன் & வசிஷ்டேஸ்வரர்',
    krishnaDeityEn: 'Vasishteswarar & Guru Bhagavan',
  },
  11: {
    tithiIndex: 11,
    shuklaTempleTa: 'மதுரை மீனாட்சி சுந்தரேஸ்வரர் திருக்கோயில் (வளர்பிறை ஏகாதசி)',
    shuklaTempleEn: 'Madurai Meenakshi Amman Temple (Shukla Ekadashi)',
    shuklaDeityTa: 'மீனாட்சி அம்மன் & பார்வதி',
    shuklaDeityEn: 'Meenakshi Amman & Parvati',
    krishnaTempleTa: 'திருநள்ளாறு தர்பாரண்யேஸ்வரர் சனீஸ்வரன் கோயில் (தேய்பிறை ஏகாதசி)',
    krishnaTempleEn: 'Thirunallar Darbaranyeswarar Sani Temple (Krishna Ekadashi)',
    krishnaDeityTa: 'சனீஸ்வர பகவான் & தர்பாரண்யேஸ்வரர்',
    krishnaDeityEn: 'Shaneeswara Bhagavan & Shiva',
  },
  12: {
    tithiIndex: 12,
    shuklaTempleTa: 'கும்பகோணம் சாரங்கபாணி திருக்கோயில் (வளர்பிறை துவாதசி)',
    shuklaTempleEn: 'Kumbakonam Sarangapani Temple (Shukla Dwadashi)',
    shuklaDeityTa: 'விஷ்ணு (சாரங்கபாணி)',
    shuklaDeityEn: 'Lord Vishnu (Sarangapani)',
    krishnaTempleTa: 'திருவில்லியங்குடி வல்வில் ராமர் கோயில், திருப்பனந்தாள் (தேய்பிறை துவாதசி)',
    krishnaTempleEn: 'Thiruvilliyangudi Valvil Ramar Temple, Thiruppanandal (Krishna Dwadashi)',
    krishnaDeityTa: 'விஷ்ணு & வல்வில் ராமர்',
    krishnaDeityEn: 'Lord Vishnu & Valvil Ramar',
  },
  13: {
    tithiIndex: 13,
    shuklaTempleTa: 'திருக்கண்டியூர் பிரம்மசிரக்கண்டீஸ்வரர் கோயில் (வளர்பிறை திரயோதசி)',
    shuklaTempleEn: 'Thirukandiyur Brahmasirakandeeswarar Temple (Shukla Trayodashi)',
    shuklaDeityTa: 'பிரம்மசிரக்கண்டீஸ்வரர் & பிரம்மா',
    shuklaDeityEn: 'Lord Brahma & Shiva',
    krishnaTempleTa: 'திருமழபாடி வைத்தியநாதர் கோயில் (தேய்பிறை திரயோதசி)',
    krishnaTempleEn: 'Thirumazhapadi Vaidyanathar Temple (Krishna Trayodashi)',
    krishnaDeityTa: 'நந்தீஸ்வரர் & வைத்தியநாதர்',
    krishnaDeityEn: 'Nandeeswarar & Vaidyanathar',
  },
  14: {
    tithiIndex: 14,
    shuklaTempleTa: 'திருபுவனம் பரமேஸ்வரர் திருக்கோயில் (வளர்பிறை சதுர்த்தசி)',
    shuklaTempleEn: 'Thirubuvanam Parameswarar Temple (Shukla Chaturdashi)',
    shuklaDeityTa: 'ருத்திரன் & பரமேஸ்வரர்',
    shuklaDeityEn: 'Rudran & Parameswarar',
    krishnaTempleTa: 'கங்கைக்கொண்ட சோழபுரம் பிரகதீஸ்வரர் கோயில் (தேய்பிறை சதுர்த்தசி)',
    krishnaTempleEn: 'Gangaikonda Cholapuram Temple (Krishna Chaturdashi)',
    krishnaDeityTa: 'மகேஸ்வரர் & சிவன்',
    krishnaDeityEn: 'Maheswarar & Shiva',
  },
  15: {
    tithiIndex: 15,
    shuklaTempleTa: 'மகேந்திரப்பள்ளி திருமேனியழகர் கோயில் (பௌர்ணமி)',
    shuklaTempleEn: 'Mahendrapalli Thirumeniyazhagar Temple (Pournami)',
    shuklaDeityTa: 'வருணன் & திருமேனியழகர்',
    shuklaDeityEn: 'Varunan & Thirumeniyazhagar',
    krishnaTempleTa: 'ராமேஸ்வரம் ராமநாதசுவாமி சதாசிவன் திருக்கோயில் (அமாவாசை)',
    krishnaTempleEn: 'Rameswaram Sadashiva Ramanathaswamy Temple (Amavasya)',
    krishnaDeityTa: 'சதாசிவன் & ராமநாதசுவாமி',
    krishnaDeityEn: 'Sadashivan & Ramanathaswamy',
  },
};

// All 11 Karanams Parihara Info (PDF Page 4 Table)
export interface KaranaPariharaInfo {
  karanaNameTa: string;
  karanaNameEn: string;
  animalTa: string;
  planetTa: string;
  templeTa: string;
  templeEn: string;
}

export const KARANA_PARIHARA_LIST: KaranaPariharaInfo[] = [
  { karanaNameTa: 'பவ', karanaNameEn: 'Bava', animalTa: 'சிங்கம் (Lion)', planetTa: 'செவ்வாய் (Mars)', templeTa: 'நாமக்கல் நரசிம்மர் திருக்கோயில்', templeEn: 'Namakkal Narasimhar Temple' },
  { karanaNameTa: 'பாலவ', karanaNameEn: 'Balava', animalTa: 'புலி (Tiger)', planetTa: 'ராகு (Rahu)', templeTa: 'சாஸ்தா / சபரிமலை அய்யப்பன் கோயில்', templeEn: 'Sabarimala Ayyappan Temple' },
  { karanaNameTa: 'கௌலவ', karanaNameEn: 'Kaulava', animalTa: 'பன்றி (Boar)', planetTa: 'சனி (Saturn)', templeTa: 'ஸ்ரீமுஷ்ணம் பூவராகமூர்த்தி கோயில்', templeEn: 'Srimushnam Bhuvarahamoorthy Temple' },
  { karanaNameTa: 'தைதுலை', karanaNameEn: 'Taitila', animalTa: 'கழுதை (Donkey)', planetTa: 'சுக்கிரன் (Venus)', templeTa: 'ஜேஷ்டாதேவி ஆலயம், பெருநகர் காஞ்சிபுரம்', templeEn: 'Perunagar Jyeshtadevi Kanchipuram' },
  { karanaNameTa: 'கரசை', karanaNameEn: 'Garaja', animalTa: 'யானை (Elephant)', planetTa: 'சந்திரன் (Moon)', templeTa: 'பிள்ளையார்பட்டி விக்னேஸ்வரர் திருக்கோயில்', templeEn: 'Pillayarpatti Vigneshwarar Temple' },
  { karanaNameTa: 'வணிஜை', karanaNameEn: 'Vanija', animalTa: 'காளை (Bull)', planetTa: 'சூரியன் (Sun)', templeTa: 'திருமழைப்பாடி சிவன் கோயில், அரியலூர்', templeEn: 'Thirumazhapadi Shiva Temple, Ariyalur' },
  { karanaNameTa: 'பத்ரை (விஷ்டி)', karanaNameEn: 'Vishti (Bhadra)', animalTa: 'கோழி (Rooster)', planetTa: 'கேது (Ketu)', templeTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruchendur Murugan Temple' },
  { karanaNameTa: 'சகுனி', karanaNameEn: 'Shakuni', animalTa: 'காக்கா (Crow)', planetTa: 'சனி (Saturn)', templeTa: 'திருநள்ளாறு தர்பாரண்யேஸ்வரர் சனி பகவான் கோயில்', templeEn: 'Thirunallar Shaneeswara Temple' },
  { karanaNameTa: 'சதுஷ்பாதம்', karanaNameEn: 'Chatushpada', animalTa: 'நாய் (Dog)', planetTa: 'குரு (Jupiter)', templeTa: 'குற்றாலம் க்ஷேத்திரபாலபுரம் பைரவர் கோயில்', templeEn: 'Kuttalam Bhairavar Temple' },
  { karanaNameTa: 'நாகவம்', karanaNameEn: 'Naga', animalTa: 'பாம்பு (Serpent)', planetTa: 'ராகு (Rahu)', templeTa: 'நாகர்கோவில் நாகராஜா திருக்கோயில்', templeEn: 'Nagercoil Nagaraja Temple' },
  { karanaNameTa: 'கிமஸ்துக்னம்', karanaNameEn: 'Kintughna', animalTa: 'புழு (Worm)', planetTa: 'புதன் (Mercury)', templeTa: 'தன்வந்திரி சந்நிதி (ஸ்ரீரங்கம் / வைத்தீஸ்வரன் கோவில்)', templeEn: 'Dhanvantri Srirangam / Vaitheeswaran Koil' },
];

export function getKaranaPariharaInfo(karanaNameEn: string, karanaNameTa: string): KaranaPariharaInfo {
  const match = KARANA_PARIHARA_LIST.find((k) =>
    karanaNameTa.includes(k.karanaNameTa) ||
    karanaNameEn.toLowerCase().includes(k.karanaNameEn.toLowerCase()) ||
    k.karanaNameEn.toLowerCase().includes(karanaNameEn.toLowerCase())
  );
  return match || KARANA_PARIHARA_LIST[0];
}

// 27 Nitya Yoga Parihara Map (PDF Page 4 Table 1)
export const NITYA_YOGA_PARIHARA_MAP: Record<number, { yogiTempleTa: string; yogiTempleEn: string; avayogiTempleTa: string; avayogiTempleEn: string }> = {
  1: { yogiTempleTa: 'தென்குடித்திட்டை சிவன் திருக்கோயில்', yogiTempleEn: 'Thenkudithittai Shiva Temple', avayogiTempleTa: 'சேரன்மாதேவி கைலாசநாதர் திருக்கோயில்', avayogiTempleEn: 'Cheranmahadevi Kailasanathar Temple' },
  2: { yogiTempleTa: 'நாங்கூர் பள்ளி கொண்ட பெருமாள் கோயில்', yogiTempleEn: 'Nangur Palli Konda Perumal Temple', avayogiTempleTa: 'குணசீலம் பிரசன்ன வெங்கடேச பெருமாள் கோயில்', avayogiTempleEn: 'Gunaseelam Prasanna Venkatesa Perumal' },
  3: { yogiTempleTa: 'ஆதிகும்பேஸ்வரர் திருக்கோயில், கும்பகோணம்', yogiTempleEn: 'Adhikumbeswarar Temple Kumbakonam', avayogiTempleTa: 'செப்பங்களூர் செப்பங்கீஸ்வரன் கோயில்', avayogiTempleEn: 'Seppangaloor Seppangeeswaran Temple' },
  4: { yogiTempleTa: 'ஸ்ரீரங்கநாதர் திருக்கோயில், ஸ்ரீரங்கம்', yogiTempleEn: 'Srirangam Ranganathar Temple', avayogiTempleTa: 'நன்னிலம் மங்களபுரீஸ்வரர் கோயில்', avayogiTempleEn: 'Nannilam Mangalapureeswarar Temple' },
  5: { yogiTempleTa: 'சூரியனார் கோவில் நவகிரக தலம்', yogiTempleEn: 'Suryanar Kovil Temple', avayogiTempleTa: 'குச்சனூர் சனி பகவான் திருக்கோயில்', avayogiTempleEn: 'Kutchanur Sani Bhagavan Temple' },
  6: { yogiTempleTa: 'உப்பிலியப்பன் திருக்கோயில், கும்பகோணம்', yogiTempleEn: 'Uppiliappan Temple Kumbakonam', avayogiTempleTa: 'அரியலூர் கலியபெருமாள் கோயில்', avayogiTempleEn: 'Ariyalur Kaliyaperumal Temple' },
  7: { yogiTempleTa: 'வைத்தீஸ்வரன் கோவில் முத்துக்குமாரசாமி சந்நிதி', yogiTempleEn: 'Vaitheeswaran Koil Muthukumaraswamy', avayogiTempleTa: 'காஞ்சிபுரம் சித்திரகுப்தன் திருக்கோயில்', avayogiTempleEn: 'Kanchipuram Chitragupta Temple' },
  8: { yogiTempleTa: 'திருநாகேஸ்வரம் நாகநாதஸ்வாமி திருக்கோயில்', yogiTempleEn: 'Thirunageswaram Naganathaswamy Temple', avayogiTempleTa: 'கஞ்சனூர் சுக்ரன் திருக்கோயில்', avayogiTempleEn: 'Kanjanoor Sukra Bhagavan Temple' },
  9: { yogiTempleTa: 'அவிநாசி லிங்கேஸ்வரர் திருக்கோயில்', yogiTempleEn: 'Avinashi Lingeswarar Temple', avayogiTempleTa: 'திருவையாறு ஐயாரப்பன் சிவன் திருக்கோயில்', avayogiTempleEn: 'Thiruvaiyaru Aiyarappan Shiva Temple' },
  10: { yogiTempleTa: 'திருக்கொள்ளிக்காடு பொங்கு சனி சிவன் கோயில்', yogiTempleEn: 'Thirukollikadu Bongu Sani Temple', avayogiTempleTa: 'மோடச்சூர் சந்திரமௌலீஸ்வரர் கோயில் (கோபி)', avayogiTempleEn: 'Modachur Chandramouleeswarar Temple' },
  11: { yogiTempleTa: 'திருக்கோலிகோடி திருக்கோயில், காஞ்சிபுரம்', yogiTempleEn: 'Thirukolikodi Temple Kanchipuram', avayogiTempleTa: 'வயலூர் முருகன் திருக்கோயில்', avayogiTempleEn: 'Vayalur Murugan Temple' },
  12: { yogiTempleTa: 'திருவண்ணாமலை செந்தூர விநாயகர் கோயில்', yogiTempleEn: 'Tiruvannamalai Senthura Vinayagar Temple', avayogiTempleTa: 'திருவாமாத்தூர் அபிராமேஸ்வரர் முத்தாம்பிகை கோயில்', avayogiTempleEn: 'Thiruvamathur Abirameswarar Temple' },
  13: { yogiTempleTa: 'திருத்தங்கூர் வெள்ளிமலைநாதர் கோயில்', yogiTempleEn: 'Thiruthangur Vellimalainathar Temple', avayogiTempleTa: 'மகேந்திரப்பள்ளி திருமேனியழகர் கோயில்', avayogiTempleEn: 'Mahendrapalli Thirumeniyazhagar Temple' },
  14: { yogiTempleTa: 'சாயாவனம் சாயாவனேஸ்வரர் திருக்கோயில்', yogiTempleEn: 'Sayavanam Sayavaneswarar Temple', avayogiTempleTa: 'திருமணம் திருக்கூடலையாத்தூர் நர்த்தனவல்லபேஸ்வரர்', avayogiTempleEn: 'Thirukoodalaiyathur Narthanavallabheswarar' },
  15: { yogiTempleTa: 'திருச்செந்தூர் ஆத்தூர் சோமநாதேஸ்வரர் கோயில்', yogiTempleEn: 'Thiruchendur Aathur Somanatheswarar', avayogiTempleTa: 'கபிஸ்தலம் கஜேந்திர வரதராஜ பெருமாள் கோயில்', avayogiTempleEn: 'Kabisthalam Gajendra Varadarajar Temple' },
  16: { yogiTempleTa: 'எண்கண் முருகன் திருக்கோயில்', yogiTempleEn: 'Enkan Murugan Temple', avayogiTempleTa: 'உறையூர் பஞ்சவர்ணேஸ்வரர் கோயில்', avayogiTempleEn: 'Uraiyur Panchavarneswarar Temple' },
  17: { yogiTempleTa: 'திருச்செங்கோடு நாகராஜா திருக்கோயில்', yogiTempleEn: 'Thiruchengodu Nagaraja Temple', avayogiTempleTa: 'மணக்கால் அய்யம்பேட்டை வைகுண்டநாத பெருமாள் கோயில்', avayogiTempleEn: 'Manakkal Ayyampettai Vaikundanathar' },
  18: { yogiTempleTa: 'செங்கோட்டை தக்ஷிணாமூர்த்தி திருக்கோயில்', yogiTempleEn: 'Sengottai Dakshinamurthy Temple', avayogiTempleTa: 'புழல் ஞாயிறு கோவில் சிவன் கோயில்', avayogiTempleEn: 'Puzhal Nyayiru Shiva Temple' },
  19: { yogiTempleTa: 'பொழிச்சலூர் சிவன் (அகஸ்தீஸ்வரர்) திருக்கோயில்', yogiTempleEn: 'Polichalur Agastheeswarar Shiva Temple', avayogiTempleTa: 'நந்திபுரவிண்ணகரம் நாதன் கோவில்', avayogiTempleEn: 'Nandipura Vinnagaram Nathan Kovil' },
  20: { yogiTempleTa: 'மதுரை மீனாட்சி சுந்தரேஸ்வரர் திருக்கோயில்', yogiTempleEn: 'Madurai Meenakshi Amman Temple', avayogiTempleTa: 'திருக்கோளூர் பெருமாள் கோயில் (செவ்வாய் ஸ்தலம்)', avayogiTempleEn: 'Thirukolur Perumal Temple' },
  21: { yogiTempleTa: 'திருப்பாம்புரம் சேஷபுரீஸ்வரர் திருக்கோயில்', yogiTempleEn: 'Tirupampuram Shesapureeswarar Temple', avayogiTempleTa: 'நாகர்கோவில் நாகராஜா திருக்கோயில்', avayogiTempleEn: 'Nagercoil Nagaraja Temple' },
  22: { yogiTempleTa: 'திருவில்லியங்கோடு வல்வில் ராமர் திருக்கோயில்', yogiTempleEn: 'Thiruvilliputhur Valvil Ramar Temple', avayogiTempleTa: 'தக்கோலம் தக்ஷிணாமூர்த்தி திருக்கோயில்', avayogiTempleEn: 'Thakkolam Dakshinamurthy Temple' },
  23: { yogiTempleTa: 'ஸ்ரீவைகுண்டம் கள்ளபிரான் திருக்கோயில்', yogiTempleEn: 'Srivaikuntam Kallapiran Temple', avayogiTempleTa: 'தெள்ளாறு திருமூலட்டாணேஸ்வரர் கோயில்', avayogiTempleEn: 'Thellaru Thirumoolattaneswarar Temple' },
  24: { yogiTempleTa: 'திருவக்கரை சந்திரமௌலீஸ்வரர் திருக்கோயில்', yogiTempleEn: 'Thiruvakkarai Chandramouleeswarar Temple', avayogiTempleTa: 'புளியங்குடி ஸ்ரீகோய்சினவேந்தன் பெருமாள் கோயில்', avayogiTempleEn: 'Puliyangudi Koinantha Perumal Temple' },
  25: { yogiTempleTa: 'நாச்சியார் கோவில் பிரசன்ன வெங்கடேச பெருமாள்', yogiTempleEn: 'Nachiyar Kovil Prasanna Venkatesa Perumal', avayogiTempleTa: 'திருக்கூடலூர் ஜகத்ரட்சக பெருமாள் கோயில்', avayogiTempleEn: 'Thirukoodalur Jagathrakshaga Perumal' },
  26: { yogiTempleTa: 'கும்பகோணம் பட்டீஸ்வரம் துர்க்கையம்மன் கோயில்', yogiTempleEn: 'Kumbakonam Pateeswaram Durga Temple', avayogiTempleTa: 'திருபுவனை தோத்தாத்ரி நாதப்பெருமாள் கோயில்', avayogiTempleEn: 'Thirubhuvanai Thothathri Nathan Temple' },
  27: { yogiTempleTa: 'பாடி தக்ஷிணாமூர்த்தி திருக்கோயில்', yogiTempleEn: 'Padi Dakshinamurthy Temple', avayogiTempleTa: 'பாபநாசம் சிவன் திருக்கோயில் (திருநெல்வேலி)', avayogiTempleEn: 'Papanasam Shiva Temple Tirunelveli' },
};

// 27 Vainasika Star Parihara Map (PDF Page 4 Table 2)
export const VAINASIKA_STAR_MAP: Record<number, { templeTa: string; templeEn: string }> = {
  0: { templeTa: 'திருநெல்வேலி மாயக்கூத்த பெருமாள் திருக்கோயில்', templeEn: 'Thirunelveli Mayakoothaperumal Temple' },
  1: { templeTa: 'திருவெண்ணெய் நல்லூர் சிவன் திருக்கோயில்', templeEn: 'Thiruvennainallur Shiva Temple' },
  2: { templeTa: 'சோளிங்கர் லக்ஷ்மி நரசிம்மர் திருக்கோயில்', templeEn: 'Sholinghur Lakshmi Narasimhar Temple' },
  3: { templeTa: 'திருநாவலூர் பக்த ஜனேஸ்வரர் கோயில்', templeEn: 'Thirunavalur Bhakta Janeswarar Temple' },
  4: { templeTa: 'கும்பகோணம் சாரங்கபாணி பெருமாள் கோயில்', templeEn: 'Kumbakonam Sarangapani Temple' },
  5: { templeTa: 'சோமங்கலம் சோமேஸ்வரர் சிவன் கோயில்', templeEn: 'Somangalam Shiva Temple' },
  6: { templeTa: 'பூந்தமல்லி வைத்தீஸ்வரநாதஸ்வாமி கோயில்', templeEn: 'Poonamallee Vaidyanathaswamy Temple' },
  7: { templeTa: 'ஸ்ரீவாஞ்சியம் ராகு-கேது திருக்கோயில்', templeEn: 'Thiruvanchiyam Rahu-Ketu Temple' },
  8: { templeTa: 'ஓமாம்புலியூர் சிவன் கோயில், காட்டுமன்னார்குடி', templeEn: 'Omampuliyur Shiva Temple' },
  9: { templeTa: 'ஆரணி சிவன் திருக்கோயில்', templeEn: 'Arani Shiva Temple' },
  10: { templeTa: 'ஆடுதுறை பெருமாள் திருக்கோயில்', templeEn: 'Aduthurai Perumal Temple' },
  11: { templeTa: 'பாகம்பிரியாள் கோவில், திருவாடானை அருகில்', templeEn: 'Bagampriya Amman Temple, Thiruvadanai' },
  12: { templeTa: 'பரமக்குடி காமன்மேடைகாளியம்மன் கோவில்', templeEn: 'Paramakudi Kamanmedu Kaliyamman Temple' },
  13: { templeTa: 'திருச்சானூர் பத்மாவதி தாயார் திருக்கோயில்', templeEn: 'Tiruchanur Padmavathi Ammavari Temple' },
  14: { templeTa: 'நல்லிணகேஸ்வரர் திருக்கோயில், எழிச்சலூர், தாம்பரம்', templeEn: 'Nallinakeswarar Temple, Elichur Tambaram' },
  15: { templeTa: 'மகேந்திரவாடி சோமநாதேஸ்வரர் கோயில் (அரக்கோணம்)', templeEn: 'Mahendravadi Somanatheswarar Temple' },
  16: { templeTa: 'பழனி திருஆவினன்குடி குழந்தை வேலாயுதசுவாமி கோயில்', templeEn: 'Palani Thiruavinankudi Murugan Temple' },
  17: { templeTa: 'சேரன்மாதேவி கைலாசநாதர் திருக்கோயில்', templeEn: 'Cheranmahadevi Kailasanathar Temple' },
  18: { templeTa: 'பண்ருட்டி, கோழியனூர் வாலேஸ்வரர் கோயில்', templeEn: 'Panruti Kozhiyanur Valeswarar Temple' },
  19: { templeTa: 'தென்திருப்பேரை முகிழ்வண்ண பெருமாள் கோயில்', templeEn: 'Thenthiruperai Mugilvanna Perumal Temple' },
  20: { templeTa: 'திருநெல்வேலி இரட்டை பெருமாள் கோயில்', templeEn: 'Thirunelveli Irattai Perumal Temple' },
  21: { templeTa: 'திருகோட்டீஸ்வரர் திருக்கோயில், திருகோடைக்காவல்', templeEn: 'Thirukotteeswarar Temple, Kodaikaval' },
  22: { templeTa: 'சென்னை கொளப்பாக்கம் சந்திரமௌலீஸ்வரர் கோயில்', templeEn: 'Chennai Kolapakkam Chandramouleeswarar Temple' },
  23: { templeTa: 'திருக்கழிப்பாலை பால்வண்ணேஸ்வரர் கோயில் (கும்பகோணம்)', templeEn: 'Thirukazhipalai Paalvanneswarar Temple' },
  24: { templeTa: 'பெரம்பலூர் திருவாச்சியூர் மதுரகாலி அம்மன் கோயில்', templeEn: 'Perambalur Thiruvachiyur Mathurakali Amman Temple' },
  25: { templeTa: 'கோவிந்தவாடி அகரம் தக்ஷிணாமூர்த்தி கோயில்', templeEn: 'Govindavadi Agaram Dakshinamurthy Temple' },
  26: { templeTa: 'காரைக்குடி பட்டைமங்கலம் தக்ஷிணாமூர்த்தி கோயில்', templeEn: 'Karaikudi Pattaimangalam Dakshinamurthy Temple' },
};

// 27 Sun Stars ➔ Exact Mudakku Stars & Mudakku Zodiac Sign ID (PDF Page 1 Table)
export interface SuryaMudakkuStarInfo {
  sunStarTa: string;
  sunStarEn: string;
  mudakkuStarTa: string;
  mudakkuStarEn: string;
  mudakkuSignId: number; // 0 to 11
}

export const SURYA_MUDAKKU_STAR_TABLE: Record<number, SuryaMudakkuStarInfo> = {
  0: { sunStarTa: 'அஸ்வினி', sunStarEn: 'Ashwini', mudakkuStarTa: 'பூரம்', mudakkuStarEn: 'Purva Phalguni', mudakkuSignId: 4 },
  1: { sunStarTa: 'பரணி', sunStarEn: 'Bharani', mudakkuStarTa: 'மகம்', mudakkuStarEn: 'Magha', mudakkuSignId: 4 },
  2: { sunStarTa: 'கிருத்திகை', sunStarEn: 'Krittika', mudakkuStarTa: 'ஆயில்யம்', mudakkuStarEn: 'Ashlesha', mudakkuSignId: 3 },
  3: { sunStarTa: 'ரோஹிணி', sunStarEn: 'Rohini', mudakkuStarTa: 'பூசம்', mudakkuStarEn: 'Pushya', mudakkuSignId: 3 },
  4: { sunStarTa: 'மிருகசீரிஷம்', sunStarEn: 'Mrigasira', mudakkuStarTa: 'புனர்பூசம்', mudakkuStarEn: 'Punarvasu', mudakkuSignId: 2 },
  5: { sunStarTa: 'திருவாதிரை', sunStarEn: 'Ardra', mudakkuStarTa: 'திருவாதிரை', mudakkuStarEn: 'Ardra', mudakkuSignId: 2 },
  6: { sunStarTa: 'புனர்பூசம்', sunStarEn: 'Punarvasu', mudakkuStarTa: 'மிருகசீரிஷம்', mudakkuStarEn: 'Mrigasira', mudakkuSignId: 1 },
  7: { sunStarTa: 'பூசம்', sunStarEn: 'Pushya', mudakkuStarTa: 'ரோஹிணி', mudakkuStarEn: 'Rohini', mudakkuSignId: 1 },
  8: { sunStarTa: 'ஆயில்யம்', sunStarEn: 'Ashlesha', mudakkuStarTa: 'கிருத்திகை', mudakkuStarEn: 'Krittika', mudakkuSignId: 0 },
  9: { sunStarTa: 'மகம்', sunStarEn: 'Magha', mudakkuStarTa: 'பரணி', mudakkuStarEn: 'Bharani', mudakkuSignId: 0 },
  10: { sunStarTa: 'பூரம்', sunStarEn: 'Purva Phalguni', mudakkuStarTa: 'அஸ்வினி', mudakkuStarEn: 'Ashwini', mudakkuSignId: 0 },
  11: { sunStarTa: 'உத்திரம்', sunStarEn: 'Uttara Phalguni', mudakkuStarTa: 'ரேவதி', mudakkuStarEn: 'Revati', mudakkuSignId: 11 },
  12: { sunStarTa: 'ஹஸ்தம்', sunStarEn: 'Hasta', mudakkuStarTa: 'உத்திரட்டாதி', mudakkuStarEn: 'Uttara Bhadrapada', mudakkuSignId: 11 },
  13: { sunStarTa: 'சித்திரை', sunStarEn: 'Chitra', mudakkuStarTa: 'பூரட்டாதி', mudakkuStarEn: 'Purva Bhadrapada', mudakkuSignId: 10 },
  14: { sunStarTa: 'சுவாதி', sunStarEn: 'Swati', mudakkuStarTa: 'சதயம்', mudakkuStarEn: 'Shatabhisha', mudakkuSignId: 10 },
  15: { sunStarTa: 'விசாகம்', sunStarEn: 'Vishakha', mudakkuStarTa: 'அவிட்டம்', mudakkuStarEn: 'Dhanishta', mudakkuSignId: 9 },
  16: { sunStarTa: 'அனுஷம்', sunStarEn: 'Anuradha', mudakkuStarTa: 'திருவோணம்', mudakkuStarEn: 'Shravana', mudakkuSignId: 9 },
  17: { sunStarTa: 'கேட்டை', sunStarEn: 'Jyeshtha', mudakkuStarTa: 'உத்திராடம்', mudakkuStarEn: 'Uttara Ashadha', mudakkuSignId: 8 },
  18: { sunStarTa: 'மூலம்', sunStarEn: 'Mula', mudakkuStarTa: 'பூராடம்', mudakkuStarEn: 'Purva Ashadha', mudakkuSignId: 8 },
  19: { sunStarTa: 'பூராடம்', sunStarEn: 'Purva Ashadha', mudakkuStarTa: 'மூலம்', mudakkuStarEn: 'Mula', mudakkuSignId: 8 },
  20: { sunStarTa: 'உத்திராடம்', sunStarEn: 'Uttara Ashadha', mudakkuStarTa: 'கேட்டை', mudakkuStarEn: 'Jyeshtha', mudakkuSignId: 7 },
  21: { sunStarTa: 'திருவோணம்', sunStarEn: 'Shravana', mudakkuStarTa: 'அனுஷம்', mudakkuStarEn: 'Anuradha', mudakkuSignId: 7 },
  22: { sunStarTa: 'அவிட்டம்', sunStarEn: 'Dhanishta', mudakkuStarTa: 'விசாகம்', mudakkuStarEn: 'Vishakha', mudakkuSignId: 6 },
  23: { sunStarTa: 'சதயம்', sunStarEn: 'Shatabhisha', mudakkuStarTa: 'சுவாதி', mudakkuStarEn: 'Swati', mudakkuSignId: 6 },
  24: { sunStarTa: 'பூரட்டாதி', sunStarEn: 'Purva Bhadrapada', mudakkuStarTa: 'சித்திரை', mudakkuStarEn: 'Chitra', mudakkuSignId: 5 },
  25: { sunStarTa: 'உத்திரட்டாதி', sunStarEn: 'Uttara Bhadrapada', mudakkuStarTa: 'ஹஸ்தம்', mudakkuStarEn: 'Hasta', mudakkuSignId: 5 },
  26: { sunStarTa: 'ரேவதி', sunStarEn: 'Revati', mudakkuStarTa: 'உத்திரம்', mudakkuStarEn: 'Uttara Phalguni', mudakkuSignId: 4 },
};

// Mudakku Temple Matrix (PDF Page 2 & 3 Tables by Lagna Group & Bhava 2..12)
export const MUDAKKU_LAGNA_BHAVA_MAP: Record<string, Record<number, { templeTa: string; templeEn: string; deityTa: string; deityEn: string }>> = {
  // Group 1: Aries (0) / Scorpio (7) Lagna
  'Aries_Scorpio': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'சிறுகுடி மங்களேஸ்வரர் கோயில் (திருப்பாம்பரம் அருகில்)', templeEn: 'Sirugudi Mangaleswarar Temple', deityTa: 'மங்களேஸ்வரர் & சிவன்', deityEn: 'Mangaleswarar Shiva' },
    3: { templeTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruchendur Murugan Temple', deityTa: 'செந்திலாண்டவர்', deityEn: 'Lord Murugan' },
    4: { templeTa: 'செவலூர் பூமிநாதசுவாமி திருக்கோயில், புதுக்கோட்டை', templeEn: 'Sevalur Boominathaswamy Temple Pudukkottai', deityTa: 'பூமிநாதசுவாமி', deityEn: 'Boominathaswamy' },
    5: { templeTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruchendur Murugan Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Lord Murugan' },
    6: { templeTa: 'கும்பகோணம் மகாமககுளம் அருகில் வீரபத்திரர் திருக்கோயில்', templeEn: 'Kumbakonam Veera Bhathrar Temple', deityTa: 'வீரபத்திரர்', deityEn: 'Veerabhadran' },
    7: { templeTa: 'திருப்பரங்குன்றம் முருகன் & சென்னை சித்துக்காடு தாத்திரீஸ்வரர் கோயில்', templeEn: 'Thiruparankundram Murugan & Sithukadu Thathreeswarar', deityTa: 'சுப்பிரமணியர் & தாத்திரீஸ்வரர்', deityEn: 'Murugan & Thathreeswarar' },
    8: { templeTa: 'திருக்கடையூர் அமிர்தகடேஸ்வரர் அபிராமி அம்மன் கோயில்', templeEn: 'Thirukadaiyur Abirami Temple', deityTa: 'அபிராமி அம்மன் & அமிர்தகடேஸ்வரர்', deityEn: 'Abirami Shiva' },
    9: { templeTa: 'விராலிமலை முருகன் திருக்கோயில்', templeEn: 'Viralimalai Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    10: { templeTa: 'பழனி தண்டாயுதபாணி திருக்கோயில் (ராஜ தரிசனம்)', templeEn: 'Palani Murugan Temple Rajadarsanam', deityTa: 'தண்டாயுதபாணி', deityEn: 'Palani Murugan' },
    11: { templeTa: 'வீரக்குடி கரைமேல் அழகர் முருகன் கோயில் (பார்த்திபனூர், பரமக்குடி)', templeEn: 'Veerakkudi Karaimel Murugan Temple', deityTa: 'கரைமேல் அழகர் முருகன்', deityEn: 'Karaimel Azhagar Murugan' },
    12: { templeTa: 'மயிலம் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Mailam Subramanyaswamy Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Mailam Murugan' },
  },
  // Group 2: Taurus (1) / Libra (6) Lagna
  'Taurus_Libra': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'ஸ்ரீரங்கம் ரங்கநாதர் கருடாழ்வார் சந்நிதி', templeEn: 'Srirangam Ranganathar Garuda Alwar Sannidhi', deityTa: 'கருடாழ்வார் & ரங்கநாதர்', deityEn: 'Garuda Alwar & Ranganathar' },
    3: { templeTa: 'திருத்தணி சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Tiruttani Murugan Temple', deityTa: 'தணிகேசன்', deityEn: 'Tiruttani Murugan' },
    4: { templeTa: 'திருச்சி மணச்சநல்லூர் பூமிநாதசுவாமி கோயில்', templeEn: 'Trichy Manachanallur Boominathaswamy Temple', deityTa: 'பூமிநாதசுவாமி', deityEn: 'Boominathaswamy' },
    5: { templeTa: 'சீயாத்தமங்கை இருமலர்கன்னி கோயில், நாகப்பட்டினம்', templeEn: 'Seeyathamangai Irumalarkanni Temple', deityTa: 'அயவந்தீஸ்வரர் & இருமலர்கன்னி', deityEn: 'Ayavantheeswarar' },
    6: { templeTa: 'கோவை உக்கடம் லட்சுமி நரசிம்மர் திருக்கோயில்', templeEn: 'Coimbatore Ukkadam Lakshmi Narasimhar Temple', deityTa: 'லட்சுமி நரசிம்மர்', deityEn: 'Lakshmi Narasimhar' },
    7: { templeTa: 'மணமுடித்தநல்லூர் முடிச்சூர் திருக்கோயில், தாம்பரம்', templeEn: 'Manamudithanallur Mudichur Temple Tambaram', deityTa: 'சிவன்', deityEn: 'Lord Shiva' },
    8: { templeTa: 'நல்லாத்தூர் சொர்ணபுரீஸ்வரர் திரிபுரசுந்தரி கோயில்', templeEn: 'Nallathur Swarnapureeswarar Temple', deityTa: 'சொர்ணபுரீஸ்வரர் & திரிபுரசுந்தரி', deityEn: 'Swarnapureeswarar' },
    9: { templeTa: 'திருமயம் கோட்டை சிவன் சத்தியகிரீஸ்வரர் திருக்கோயில்', templeEn: 'Thirumayam Fort Sathyagireeswarar Temple', deityTa: 'சத்தியகிரீஸ்வரர்', deityEn: 'Sathyagireeswarar' },
    10: { templeTa: 'மதுரை மீனாட்சி சுந்தரேஸ்வரர் திருக்கோயில்', templeEn: 'Madurai Meenakshi Amman Temple', deityTa: 'மீனாட்சி அம்மன்', deityEn: 'Meenakshi Amman' },
    11: { templeTa: 'காவளம்பாடி கோபாலகிருஷ்ணன் பெருமாள் கோயில் (சீர்காழி)', templeEn: 'Kavalambadi Gopalakrishnan Temple', deityTa: 'கோபாலகிருஷ்ணன்', deityEn: 'Gopalakrishnan' },
    12: { templeTa: 'திருவேற்காடு வேதபுரீஸ்வரர் திருக்கோயில்', templeEn: 'Thiruverkadu Vedapureeswarar Temple', deityTa: 'வேதபுரீஸ்வரர்', deityEn: 'Vedapureeswarar' },
  },
  // Group 3: Gemini (2) / Virgo (5) Lagna
  'Gemini_Virgo': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'காஞ்சிபுரம் திருக்காளிமேடு காரைதிருநகர் சத்யவரதேசுவரர் 2 சிவன் கோயில்கள்', templeEn: 'Kanchipuram Thirukalimedu Sathyavaradheswarar Temple', deityTa: 'சத்யவரதேசுவரர்', deityEn: 'Sathyavaradheswarar' },
    3: { templeTa: 'பழமுதிர்சோலை முருகன் திருக்கோயில்', templeEn: 'Pazhamudircholai Murugan Temple', deityTa: 'சோலைமலை முருகன்', deityEn: 'Lord Murugan' },
    4: { templeTa: 'சௌந்தரராஜபெருமாள் கோயில், நாகப்பட்டினம்', templeEn: 'Soundararaja Perumal Temple Nagapattinam', deityTa: 'சௌந்தரராஜன்', deityEn: 'Soundararajan' },
    5: { templeTa: 'ஸ்ரீமுஷ்ணம் பூவராகப்பெருமாள் திருக்கோயில்', templeEn: 'Srimushnam Bhuvaraha Perumal Temple', deityTa: 'பூவராகமூர்த்தி', deityEn: 'Bhuvarahamoorthy' },
    6: { templeTa: 'திருவெண்காடு அகோரமூர்த்தி திருக்கோயில்', templeEn: 'Thiruvenkadu Aghoramurthy Temple', deityTa: 'அகோரமூர்த்தி', deityEn: 'Aghoramurthy' },
    7: { templeTa: 'திருநகரி கல்யாண ரங்கநாத பெருமாள் கோயில், சீர்காழி', templeEn: 'Thirunagari Kalyana Ranganathar Temple', deityTa: 'கல்யாண ரங்கநாதர்', deityEn: 'Kalyana Ranganathar' },
    8: { templeTa: 'மேலக்கடம்பூர் அமிர்தகடேஸ்வரர் அகிலாண்டேஸ்வரி கோயில்', templeEn: 'Melakadambur Amirthakadeeswarar Temple', deityTa: 'அமிர்தகடேஸ்வரர்', deityEn: 'Amirthakadeeswarar' },
    9: { templeTa: 'அச்சரப்பாக்கம் ஆட்சிபுரீஸ்வரர் கோயில் (கன்னி மூலை பெருமாள்)', templeEn: 'Acharapakkam Atchipureeswarar Temple', deityTa: 'ஆட்சிபுரீஸ்வரர் (சிவன் & பெருமாள்)', deityEn: 'Atchipureeswarar (Shiva & Vishnu)' },
    10: { templeTa: 'ஸ்ரீரங்கம் கருடாழ்வார் சந்நிதி', templeEn: 'Srirangam Garuda Alwar Sannidhi', deityTa: 'கருடாழ்வார்', deityEn: 'Garuda Alwar' },
    11: { templeTa: 'திருவெள்ளறை புண்டரீகாட்சன் பெருமாள் கோயில், திருச்சி', templeEn: 'Thiruvellarai Perumal Temple Trichy', deityTa: 'புண்டரீகாட்சன் பெருமாள்', deityEn: 'Pundarikakshan' },
    12: { templeTa: 'புருஷோத்தமன் உத்தமர்கோவில், திருச்சி', templeEn: 'Purushothaman Uthamar Kovil Trichy', deityTa: 'புருஷோத்தமன் & மும்மூர்த்திகள்', deityEn: 'Purushothaman & Trimurti' },
  },
  // Group 4: Cancer (3) Lagna
  'Cancer': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'ஓசூர் சந்திரசூடேஸ்வரர் திருக்கோயில்', templeEn: 'Hosur Chandra Choodeswarar Temple', deityTa: 'சந்திரசூடேஸ்வரர்', deityEn: 'Chandra Choodeswarar' },
    3: { templeTa: 'திருமலைக்குமாரசுவாமி கோயில், குற்றாலம், தென்காசி', templeEn: 'Thirumalaikumaraswamy Murugan Temple Tenkasi', deityTa: 'திருமலை முருகன்', deityEn: 'Thirumalai Murugan' },
    4: { templeTa: 'பவானி சங்கமேஸ்வரர் திருக்கோயில்', templeEn: 'Bhavani Sangameswarar Temple', deityTa: 'சங்கமேஸ்வரர்', deityEn: 'Sangameswarar' },
    5: { templeTa: 'இராமேஸ்வரம் இராமநாதசுவாமி திருக்கோயில்', templeEn: 'Rameswaram Ramanathaswamy Temple', deityTa: 'இராமநாதசுவாமி', deityEn: 'Ramanathaswamy' },
    6: { templeTa: 'இராமேஸ்வரம் இராமநாதசுவாமி திருக்கோயில்', templeEn: 'Rameswaram Ramanathaswamy Temple', deityTa: 'இராமநாதசுவாமி', deityEn: 'Ramanathaswamy' },
    7: { templeTa: 'திருமணஞ்சேரி கல்யாணசுந்தரேஸ்வரர் கோயில்', templeEn: 'Thirumanancheri Uthvaganathar Temple', deityTa: 'கல்யாணசுந்தரர்', deityEn: 'Kalyanasundarar' },
    8: { templeTa: 'திங்களூர் கைலாசநாதர் கோயில்', templeEn: 'Thingaloor Kailasanathar Chandra Temple', deityTa: 'கைலாசநாதர் & சந்திரன்', deityEn: 'Chandra Bhagavan' },
    9: { templeTa: 'தரங்கம்பாடி மாசிலாமணீஸ்வரர் கோயில் (திருக்கடையூர் அருகில்)', templeEn: 'Tharangambadi Masilamaniswarar Temple', deityTa: 'மாசிலாமணீஸ்வரர்', deityEn: 'Masilamaniswarar' },
    10: { templeTa: 'திருச்சுழி சிவன் திருமேனிநாதர் திருக்கோயில்', templeEn: 'Thiruchuli Shiva Thirumeninathar Temple', deityTa: 'திருமேனிநாதர்', deityEn: 'Thirumeninathar' },
    11: { templeTa: 'திருநெடுங்களநாதர் கோயில், திருநெடுங்குளம், திருச்சி', templeEn: 'Thirunedungulam Nedungalanathar Temple', deityTa: 'நெடுங்களநாதர்', deityEn: 'Nedungalanathar' },
    12: { templeTa: 'திருப்பட்டூர் பிரம்மா திருக்கோயில்', templeEn: 'Thirupattur Brahma Temple', deityTa: 'பிரம்மா & சிவன்', deityEn: 'Lord Brahma' },
  },
  // Group 5: Leo (4) Lagna
  'Leo': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'கொடுமுடி மகுடேஸ்வரர் திருக்கோயில்', templeEn: 'Kodumudi Magudeeswarar Temple', deityTa: 'மகுடேஸ்வரர் & சிவன்', deityEn: 'Magudeeswarar Shiva' },
    3: { templeTa: 'திருவிடைக்கழி முருகன் திருக்கோயில் (திருக்கடையூர் அருகில்)', templeEn: 'Thiruvidaikkazhi Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    4: { templeTa: 'ஏடகநாதர் திருவேடகம், சோழவந்தான், மதுரை அருகில்', templeEn: 'Edaganathar Thiruvedagam Sholavandan', deityTa: 'ஏடகநாதர் & சிவன்', deityEn: 'Edaganathar Shiva' },
    5: { templeTa: 'திருக்காஞ்சி இருகரை ஈஸ்வரன் காசிவிஸ்வநாதர் கோயில் (பாண்டிச்சேரி)', templeEn: 'Thirukanchi Irukarai Eswaran Temple', deityTa: 'இருகரை ஈஸ்வரன் & காசிவிஸ்வநாதர்', deityEn: 'Irukarai Eswaran' },
    6: { templeTa: 'ஒட்டப்பிடாரம் உலகாம்பேஸ்வரி திருக்கோயில்', templeEn: 'Ottapidaram Ulagambeswari Temple', deityTa: 'உலகாம்பேஸ்வரி', deityEn: 'Ulagambeswari' },
    7: { templeTa: 'திருவேள்விக்குடி கல்யாண சுந்தரேஸ்வரர் ஸ்ரீ மணவாளஸ்வரர் கோயில்', templeEn: 'Thiruvelvikudi Kalyanasundareswarar Temple', deityTa: 'கல்யாண சுந்தரேஸ்வரர் & மணவாளஸ்வரர்', deityEn: 'Kalyanasundareswarar' },
    8: { templeTa: 'பருதியப்பர் கோயில், மேலஉளூர் (தஞ்சாவூர் - பட்டுக்கோட்டை வழி)', templeEn: 'Paruthiyappar Temple Melauloor', deityTa: 'பருதியப்பர் & சூரியன்', deityEn: 'Surya Shiva' },
    9: { templeTa: 'பெருநகர் பிரம்மபுரீஸ்வரர் திருக்கோயில்', templeEn: 'Perunagar Brahmapureeswarar Temple', deityTa: 'பிரம்மபுரீஸ்வரர்', deityEn: 'Brahmapureeswarar' },
    10: { templeTa: 'விருத்தபுரீஸ்வரர் கோயில், திருப்புனவாசல், SPபட்டிணம் (புதுக்கோட்டை)', templeEn: 'Viruthapureeswarar Temple Thirupunavasal', deityTa: 'விருத்தபுரீஸ்வரர்', deityEn: 'Viruthapureeswarar' },
    11: { templeTa: 'பிரான்மலை முருகன் திருக்கோயில்', templeEn: 'Piranmalai Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    12: { templeTa: 'நரசிம்மர் யானைமலை ஒத்தக்கடை, மதுரை', templeEn: 'Yanaimalai Narasimhar Othakadai Madurai', deityTa: 'யோக நரசிம்மர்', deityEn: 'Yoga Narasimhar' },
  },
  // Group 6: Sagittarius (8) / Pisces (11) Lagna
  'Sagittarius_Pisces': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'திருத்துறையூர் சிஷ்டகுருநாதர் கோயில் (பண்ருட்டி அருகில்)', templeEn: 'Thiruthuraiyur Sishtagurunathar Temple', deityTa: 'சிஷ்டகுருநாதர் & சிவன்', deityEn: 'Sishtagurunathar Shiva' },
    3: { templeTa: 'சுவாமிமலை முருகன் திருக்கோயில்', templeEn: 'Swamimalai Murugan Temple', deityTa: 'சுவாமிநாதசுவாமி', deityEn: 'Lord Swaminathar' },
    4: { templeTa: 'சிறுவாபுரி பாலமுருகன் திருக்கோயில், சென்னை', templeEn: 'Siruvapuri Balamurugan Temple Chennai', deityTa: 'பாலமுருகன்', deityEn: 'Siruvapuri Murugan' },
    5: { templeTa: 'திருக்கருகாவூர் கர்ப்பரட்சாம்பிகை முல்லைநாதர் திருக்கோயில்', templeEn: 'Thirukarugavur Garbarakshambigai Mullaivananathar Temple', deityTa: 'கர்ப்பரட்சாம்பிகை & முல்லைநாதர்', deityEn: 'Garbarakshambigai' },
    6: { templeTa: 'திருவானைக்காவல் அகிலாண்டேஸ்வரி ஜம்புகேசுவரர் திருக்கோயில்', templeEn: 'Thiruvanaikaval Akilandeswari Jambukeswarar Temple', deityTa: 'அகிலாண்டேஸ்வரி & ஜம்புகேசுவரர்', deityEn: 'Akilandeswari' },
    7: { templeTa: 'திருமுருகன்பூண்டி முருகநாதர் திருக்கோயில் (திருப்பூர்)', templeEn: 'Thirumuruganpoondi Muruganathar Temple Tiruppur', deityTa: 'முருகநாதர்', deityEn: 'Muruganathar' },
    8: { templeTa: 'ஸ்ரீவாஞ்சியம் எமதர்மன் திருக்கோயில்', templeEn: 'Thiruvanchiyam Yamadharman Temple', deityTa: 'எமதர்மன் & வாஞ்சிநாதர்', deityEn: 'Yamadharman Shiva' },
    9: { templeTa: 'தாயுமானவர்சுவாமி திருக்கோயில், திருச்சி', templeEn: 'Thayumanaswamy Temple Rockfort Trichy', deityTa: 'தாயுமானவர் & சுகந்த குந்தளாம்பிகை', deityEn: 'Thayumanaswamy' },
    10: { templeTa: 'அருப்புக்கோட்டை பழைய சிவன் கோவில் மீனாட்சி சொக்கநாதர்', templeEn: 'Aruppukottai Meenakshi Chokkanathar Old Temple', deityTa: 'மீனாட்சி சொக்கநாதர்', deityEn: 'Meenakshi Chokkanathar' },
    11: { templeTa: 'கோவை பேரூர் பட்டீஸ்வரர் திருக்கோயில்', templeEn: 'Perur Pateeswarar Temple Coimbatore', deityTa: 'பட்டீஸ்வரர் & பச்சைநாயகி', deityEn: 'Pateeswarar' },
    12: { templeTa: 'கோடியக்கரை அமுதகடேஸ்வரர் திருக்கோடிக்குழகர் கோயில்', templeEn: 'Kodiakkarai Amirthakadeeswarar Kodikuzhagar Temple', deityTa: 'அமுதகடேஸ்வரர் & கோடிக்குழகர்', deityEn: 'Amirthakadeeswarar' },
  },
  // Group 7: Capricorn (9) / Aquarius (10) Lagna
  'Capricorn_Aquarius': {
    1: { templeTa: 'மதுரை இம்மையில் நன்மை தருவார் சிவன் திருக்கோயில்', templeEn: 'Madurai Immayilum Nanmai Tharuvar Temple', deityTa: 'இம்மையில் நன்மை தருவார் & சிவன்', deityEn: 'Immayilum Nanmai Tharuvar Shiva' },
    2: { templeTa: 'திருவாதவூர் திருமறைநாதர் சிவன் கோவில் (மதுரை மேலூர் அருகில்)', templeEn: 'Thiruvadavur Thirumarainathar Shiva Temple Melur', deityTa: 'திருமறைநாதர்', deityEn: 'Thirumarainathar' },
    3: { templeTa: 'திருப்பரங்குன்றம் முருகன் திருக்கோயில்', templeEn: 'Thiruparankundram Murugan Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Lord Murugan' },
    4: { templeTa: 'வயலூர் முருகன் திருக்கோயில், திருச்சி', templeEn: 'Vayalur Murugan Temple Trichy', deityTa: 'வயலூர் முருகன்', deityEn: 'Vayalur Murugan' },
    5: { templeTa: 'மங்களாம்பிகை ஆதிகும்பேஸ்வரர் கோயில், கும்பகோணம்', templeEn: 'Mangalambigai Adhikumbeswarar Temple Kumbakonam', deityTa: 'மங்களாம்பிகை & ஆதிகும்பேஸ்வரர்', deityEn: 'Mangalambigai' },
    6: { templeTa: 'அழகர்கோவில் கள்ளழகர் திருக்கோயில், மதுரை', templeEn: 'Alagar Kovil Kallalagar Temple Madurai', deityTa: 'கள்ளழகர் பெருமாள்', deityEn: 'Kallalagar Perumal' },
    7: { templeTa: 'வேதாரண்யம் வேதாரண்யஈஸ்வரன் திருக்கோயில்', templeEn: 'Vedaranyam Vedaranyeswarar Temple', deityTa: 'வேதாரண்யஈஸ்வரன்', deityEn: 'Vedaranyeswarar' },
    8: { templeTa: 'எமனேஸ்வரம் சிவன் திருக்கோயில், பரமக்குடி', templeEn: 'Emaneswaram Shiva Temple Paramakudi', deityTa: 'எமனேஸ்வரர்', deityEn: 'Emaneswarar' },
    9: { templeTa: 'தாண்டிக்குடி பாலமுருகன் திருக்கோயில், கொடைக்கானல்', templeEn: 'Thandikudi Balamurugan Temple Kodaikanal', deityTa: 'பாலமுருகன்', deityEn: 'Thandikudi Balamurugan' },
    10: { templeTa: 'திருமால்பூர் மணிகண்டீஸ்வரர் திருக்கோயில்', templeEn: 'Thirumalpur Manikandeeswarar Temple', deityTa: 'மணிகண்டீஸ்வரர்', deityEn: 'Manikandeeswarar' },
    11: { templeTa: 'ஆதிரத்தினேஸ்வரர் கோயில், திருவாடானை, தொண்டி', templeEn: 'Adhirathineeswarar Temple Thiruvadanai Thondi', deityTa: 'ஆதிரத்தினேஸ்வரர்', deityEn: 'Adhirathineeswarar' },
    12: { templeTa: 'திருப்புல்லாணி ஆதிஜெகந்நாத பெருமாள் திருக்கோயில்', templeEn: 'Thiruppullani Aadhi Jagannatha Perumal Temple', deityTa: 'ஆதிஜெகந்நாதர்', deityEn: 'Aadhi Jagannathar' },
  },
};

// Dedicated Rahu / Ketu presence in Mudakku Bhava (1..12) from Tiruppur Thanikasalam Treatise
export const BHAVA_MUDAKKU_RAHU_KETU_MAP: Record<number, {
  rahuTempleTa: string;
  rahuTempleEn: string;
  ketuTempleTa: string;
  ketuTempleEn: string;
}> = {
  1: {
    rahuTempleTa: 'சேஷாங்களூர் சிவன் கோயில் (பாண்டிச்சேரி)',
    rahuTempleEn: 'Seshangaloor Shiva Temple (Puducherry)',
    ketuTempleTa: 'சென்னை திருநீர்மலை தூமகேது விநாயகர் கோயில்',
    ketuTempleEn: 'Chennai Thiruneermalai Dhumaketu Vinayagar Temple',
  },
  2: {
    rahuTempleTa: 'நாகராஜா திருக்கோயில், நாகர்கோவில்',
    rahuTempleEn: 'Nagaraja Temple, Nagercoil',
    ketuTempleTa: 'ராஜபதி தூமகேது விநாயகர் (திருச்செந்தூர் ஏரல் வழிச்சாலை)',
    ketuTempleEn: 'Rajapathi Dhumaketu Vinayagar Temple (Eral Road, Tiruchendur)',
  },
  3: {
    rahuTempleTa: 'குக்சே சுப்ரமணியா திருக்கோயில், கர்நாடகா',
    rahuTempleEn: 'Kukke Subramanya Temple, Karnataka',
    ketuTempleTa: 'உப்பூர் வெயில்காத்த விநாயகர் கோயில், தொண்டி, ராமநாதபுரம்',
    ketuTempleEn: 'Uppur Veyil Katha Vinayagar Temple, Thondi, Ramanathapuram',
  },
  4: {
    rahuTempleTa: 'தென்திருப்பேரை கைசவப்பெருமாள் கோயில், திருநெல்வேலி',
    rahuTempleEn: 'Thenthiruperai Perumal Temple, Tirunelveli',
    ketuTempleTa: 'திருமுருகன்பூண்டி முருகநாதர் திருக்கோயில், திருப்பூர்',
    ketuTempleEn: 'Thirumuruganpoondi Muruganathar Temple, Tiruppur',
  },
  5: {
    rahuTempleTa: 'அரவக்குறிச்சி சிவன் கோயில், கரூர் மாவட்டம்',
    rahuTempleEn: 'Aravakurichi Shiva Temple, Karur District',
    ketuTempleTa: 'ஸ்ரீகாளஹஸ்தி பாதாள விநாயகர் கோயில், ஆந்திரா',
    ketuTempleEn: 'Srikalahasti Pathala Vinayagar Temple, Andhra Pradesh',
  },
  6: {
    rahuTempleTa: 'திருவக்கரை வக்கிரகாளி அம்மன் கோயில், விழுப்புரம்',
    rahuTempleEn: 'Thiruvakkarai Vakkrakali Amman Temple, Villupuram',
    ketuTempleTa: 'பிள்ளையார்பட்டி கற்பக விநாயகர் திருக்கோயில்',
    ketuTempleEn: 'Pillayarpatti Karpaga Vinayagar Temple',
  },
  7: {
    rahuTempleTa: 'திருநாகேஸ்வரம் நாகநாதசுவாமி திருக்கோயில் (ராகு ஸ்தலம்)',
    rahuTempleEn: 'Thirunageswaram Naganathaswamy Temple (Rahu Sthalam)',
    ketuTempleTa: 'கீழப்பெரும்பள்ளம் நாகநாதசுவாமி கோயில் (கேது ஸ்தலம்), மயிலாடுதுறை அருகில்',
    ketuTempleEn: 'Keezhaperumpallam Naganathaswamy Temple (Ketu Sthalam), Mayiladuthurai',
  },
  8: {
    rahuTempleTa: 'சேஷ்டமூலை சேஷ்டபுரீஸ்வரர் திருக்கோயில், பேரளம் அருகில் (திருநள்ளாறு வழி)',
    rahuTempleEn: 'Sheshtamoolai Sheshtapureeswarar Temple, Peralam / Thirunallar',
    ketuTempleTa: 'திருநெல்வேலி சித்திரகேது விநாயகர் (அருள்மிகு தொண்டர்கள் நயினார் திருக்கோயில்)',
    ketuTempleEn: 'Tirunelveli Chithraketu Vinayagar (Thondargal Nainar Temple)',
  },
  9: {
    rahuTempleTa: 'தெத்துப்பட்டி ராஜகாளியம்மன் திருக்கோயில், திண்டுக்கல்',
    rahuTempleEn: 'Thethupatti Rajakaliamman Temple, Dindigul',
    ketuTempleTa: 'ஈச்சனாரி கற்பக விநாயகர் திருக்கோயில், கோவை',
    ketuTempleEn: 'Eachanari Karpaga Vinayagar Temple, Coimbatore',
  },
  10: {
    rahuTempleTa: 'தும்பூர் நாகாத்தம்மன் கோயில், விழுப்புரம் டு செஞ்சி',
    rahuTempleEn: 'Thumbur Nagathamman Temple, Villupuram to Gingee',
    ketuTempleTa: 'தர்மபுரி காமாட்சி அம்மன் திருக்கோயில்',
    ketuTempleEn: 'Dharmapuri Kamakshi Amman Temple',
  },
  11: {
    rahuTempleTa: 'பாரியூர் கொண்டத்து காளியம்மன் கோயில், கோபிசெட்டிபாளையம்',
    rahuTempleEn: 'Pariyur Kondathu Kaliamman Temple, Gobichettipalayam',
    ketuTempleTa: 'பெருமாநல்லூர் கொண்டத்து காளியம்மன் கோயில், திருப்பூர்',
    ketuTempleEn: 'Perumanallur Kondathu Kaliamman Temple, Tiruppur',
  },
  12: {
    rahuTempleTa: 'ஆந்திரா ஸ்ரீசைலம் மல்லிகார்ஜுனேஸ்வரர் ஜோதிர்லிங்க திருக்கோயில்',
    rahuTempleEn: 'Srisailam Mallikarjuneswarar Jyotirlinga Temple, Andhra Pradesh',
    ketuTempleTa: 'மண்டைக்காடு பகவதி அம்மன் திருக்கோயில், கன்னியாகுமரி',
    ketuTempleEn: 'Mandaikkadu Bhagavathi Amman Temple, Kanyakumari',
  },
};

// 27 Birth Stars ➔ Mandi Dosha Nivarana Temples (PDF 1 Pages 7-9)
export const MANDI_DOSHA_STAR_MAP: Record<number, { starTa: string; starEn: string; templeTa: string; templeEn: string }> = {
  0: { starTa: 'அஸ்வினி', starEn: 'Ashwini', templeTa: 'கரூர் வடக்கு ஆற்றுமேடு வெஞ்சமாகூடல் விகர்தநாதர் கோயில் (7-வது சிவன்)', templeEn: 'Venjamakoodal Vikarthanadhar Shiva Temple, Karur' },
  1: { starTa: 'பரணி', starEn: 'Bharani', templeTa: 'திருச்சி உறையூர் சிவன் கோவில் (பஞ்சவர்ணேஸ்வரர்)', templeEn: 'Uraiyur Shiva Temple, Trichy' },
  2: { starTa: 'கிருத்திகை', starEn: 'Krittika', templeTa: 'எட்டுக்குடி முருகன் திருக்கோயில், நாகப்பட்டினம்', templeEn: 'Ettukudi Murugan Temple, Nagapattinam' },
  3: { starTa: 'ரோஹிணி', starEn: 'Rohini', templeTa: 'திருப்பதி ஸ்ரீ வெங்கடாசலபதி திருக்கோயில், ஆந்திரா', templeEn: 'Tirupati Sri Venkateswara Swamy Temple' },
  4: { starTa: 'மிருகசீரிஷம்', starEn: 'Mrigasira', templeTa: 'திருக்கோகர்ணம் சிவஸ்தலம் (வலங்கைமான் அருகில்)', templeEn: 'Thirugokarnam Shiva Temple, Valangaiman' },
  5: { starTa: 'திருவாதிரை', starEn: 'Ardra', templeTa: 'அறந்தாங்கி ஆவுடையார் கோயில் (ஆத்மநாதசுவாமி)', templeEn: 'Aranthangi Avudaiyarkoil (Athmanathaswamy Temple)' },
  6: { starTa: 'புனர்பூசம்', starEn: 'Punarvasu', templeTa: 'நாச்சியார் கோவில் ஸ்ரீனிவாச பெருமாள் திருக்கோயில்', templeEn: 'Nachiyar Koil Srinivasa Perumal Temple' },
  7: { starTa: 'பூசம்', starEn: 'Pushya', templeTa: 'கூர்ம அவதாரப் பெருமாள் கோயில், கூர்ந்தான்வினை, திருநெல்வேலி', templeEn: 'Koorma Avathara Perumal Temple, Koornthanvinai, Tirunelveli' },
  8: { starTa: 'ஆயில்யம்', starEn: 'Ashlesha', templeTa: 'பேரையூர் நாகநாதசுவாமி கோயில், புதுக்கோட்டை அருகில்', templeEn: 'Peraiyur Naganathaswamy Temple, Pudukkottai' },
  9: { starTa: 'மகம்', starEn: 'Magha', templeTa: 'வேலூர் கோட்டை ஜலகண்டேஸ்வரர் திருக்கோயில்', templeEn: 'Vellore Fort Jalakandeswarar Temple' },
  10: { starTa: 'பூரம்', starEn: 'Purva Phalguni', templeTa: 'ஆண்டாள் ஸ்ரீவில்லிபுத்தூர் வடபத்ரசாயீ திருக்கோயில்', templeEn: 'Andal Temple Srivilliputhur' },
  11: { starTa: 'உத்திரம்', starEn: 'Uttara Phalguni', templeTa: 'மூலனூர் சிவன் திருக்கோயில், தாராபுரம்', templeEn: 'Mulanur Shiva Temple, Dharapuram' },
  12: { starTa: 'ஹஸ்தம்', starEn: 'Hasta', templeTa: 'திருச்சி உத்தமர் கோவில் (பிச்சாண்டார் கோவில்)', templeEn: 'Trichy Uthamar Kovil (Pitchandar Temple)' },
  13: { starTa: 'சித்திரை', starEn: 'Chitra', templeTa: 'சிங்கக்குடி சிவன் கோயில் (ராயவேலூர் - கர்ணமங்கலம்)', templeEn: 'Singakkudi Shiva Temple (Rayavellore - Karnamangalam)' },
  14: { starTa: 'சுவாதி', starEn: 'Swati', templeTa: 'திருக்கோஷ்டியூர் சௌமிய நாராயணப் பெருமாள் கோயில்', templeEn: 'Thirukoshtiyur Sowmya Narayana Perumal Temple' },
  15: { starTa: 'விசாகம்', starEn: 'Vishakha', templeTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில் (கடற்கரை தலம்)', templeEn: 'Thiruchendur Murugan Temple' },
  16: { starTa: 'அனுஷம்', starEn: 'Anuradha', templeTa: 'சூரக்குடி சிவன் கோயில், காரைக்குடி அருகில்', templeEn: 'Soorakkudi Shiva Temple, Karaikudi' },
  17: { starTa: 'கேட்டை', starEn: 'Jyeshtha', templeTa: 'திருமயம் கோட்டையில் உள்ள சத்தியமூர்த்தி பெருமாள் கோயில்', templeEn: 'Thirumayam Fort Sathiyamoorthy Perumal Temple' },
  18: { starTa: 'மூலம்', starEn: 'Mula', templeTa: 'மதுரை மீனாட்சி சுந்தரேஸ்வரர் கோயில் முக்குறுணி விநாயகர் சந்நிதி', templeEn: 'Madurai Meenakshi Temple Mukkuruni Vinayagar' },
  19: { starTa: 'பூராடம்', starEn: 'Purva Ashadha', templeTa: 'நாகராஜஸ்தலம், இடையாட்டு மங்கலம் (நாகூர் அருகில்)', templeEn: 'Nagaraja Sthalam, Idayattu Mangalam (Near Nagore)' },
  20: { starTa: 'உத்திராடம்', starEn: 'Uttara Ashadha', templeTa: 'கும்பகோணம் சாரங்கபாணி பெருமாள் திருக்கோயில்', templeEn: 'Kumbakonam Sarangapani Temple' },
  21: { starTa: 'திருவோணம்', starEn: 'Shravana', templeTa: 'திருமோகூர் காளமேகப்பெருமாள் & சக்கரத்தாழ்வார் கோயில் (சிவகங்கை)', templeEn: 'Thirumohur Chakrathalwar Temple, Madurai/Sivagangai' },
  22: { starTa: 'அவிட்டம்', starEn: 'Dhanishta', templeTa: 'காரியாபட்டி வைத்தியநாத சுவாமி கோயில், அருப்புக்கோட்டை அருகில்', templeEn: 'Kariyapatti Vaidyanatha Swamy Temple, Aruppukottai' },
  23: { starTa: 'சதயம்', starEn: 'Shatabhisha', templeTa: 'திருப்புனவாசல் சிவன் கோயில், புதுக்கோட்டை (பிரசவ ஆஸ்பத்திரியே இல்லாத ஊர்)', templeEn: 'Thirupunavasal Shiva Temple, Pudukkottai' },
  24: { starTa: 'பூரட்டாதி', starEn: 'Purva Bhadrapada', templeTa: 'சேலம் ஊத்துமலை பாலசுப்பிரமணியசுவாமி கோயில்', templeEn: 'Salem Uthumalai Murugan Temple' },
  25: { starTa: 'உத்திரட்டாதி', starEn: 'Uttara Bhadrapada', templeTa: 'சென்னை திருவான்மியூர் மருந்தீஸ்வரர் திருக்கோயில்', templeEn: 'Chennai Thiruvanmiyur Marundeeswarar Temple' },
  26: { starTa: 'ரேவதி', starEn: 'Revati', templeTa: 'திருக்காட்டுப்பள்ளி அக்னீஸ்வரர் திருக்கோயில்', templeEn: 'Thirukkattupalli Agneeswarar Temple' },
};

// 16 Sacred Dhumaketu Vinayagar Temples (PDF 1 Page 14)
export const DHUMAKETU_VINAYAGAR_TEMPLES: {
  id: number;
  nameTa: string;
  nameEn: string;
  locationTa: string;
  locationEn: string;
  specialNoteTa?: string;
  specialNoteEn?: string;
}[] = [
  { id: 1, nameTa: 'தெப்பக்குள விநாயகர்', nameEn: 'Theppakulam Vinayagar', locationTa: 'திருநீர்மலை, சென்னை', locationEn: 'Thiruneermalai, Chennai' },
  { id: 2, nameTa: 'கைலாசநாதர் திருக்கோவில் விநாயகர்', nameEn: 'Kailasanathar Temple Vinayagar', locationTa: 'திங்களூர் (சந்திர ஸ்தலம்)', locationEn: 'Thingaloor (Chandra Sthalam)' },
  { id: 3, nameTa: 'கற்பக விநாயகர்', nameEn: 'Karpaga Vinayagar', locationTa: 'ஈச்சனாரி, கோவை', locationEn: 'Eachanari, Coimbatore' },
  { id: 4, nameTa: 'முக்குறுணி விநாயகர்', nameEn: 'Mukkuruni Vinayagar', locationTa: 'மீனாட்சி அம்மன் கோயில், மதுரை', locationEn: 'Meenakshi Temple, Madurai' },
  { id: 5, nameTa: 'நுழைவு வாயில் விநாயகர்', nameEn: 'Entrance Gateway Vinayagar', locationTa: 'ஸ்ரீவாஞ்சியம்', locationEn: 'Srivanchiyam' },
  { id: 6, nameTa: 'வெயில்காத்த விநாயகர்', nameEn: 'Veyil Katha Vinayagar', locationTa: 'உப்பூர், இராமநாதபுரம்', locationEn: 'Uppur, Ramanathapuram' },
  { id: 7, nameTa: 'வடிவுடையம்மன் கோவில் விநாயகர்', nameEn: 'Vadivudaiamman Temple Vinayagar', locationTa: 'திருவொற்றியூர், சென்னை', locationEn: 'Thiruvottiyur, Chennai' },
  { id: 8, nameTa: 'குணம்தந்தநாதர் விநாயகர்', nameEn: 'Gunamthanthanathar Vinayagar', locationTa: 'ஒரக்காட்டுப்பேட்டை, செங்கல்பட்டு', locationEn: 'Orakkattupettai, Chengalpattu' },
  { id: 9, nameTa: 'சேஷ்டபுரீஸ்வரர் கோவில் விநாயகர்', nameEn: 'Sheshtapureeswarar Vinayagar', locationTa: 'சேஷ்டமூலை (திருநள்ளாறு வழி)', locationEn: 'Sheshtamoolai (Near Thirunallar)' },
  { id: 10, nameTa: 'மாரியம்மன் கோவில் விநாயகர்', nameEn: 'Mariamman Temple Vinayagar', locationTa: 'காமன்கோட்டை, பரமக்குடி', locationEn: 'Kamankottai, Paramakudi' },
  { id: 11, nameTa: 'எமனேஸ்வரர் கோவில் விநாயகர்', nameEn: 'Emaneswarar Temple Vinayagar', locationTa: 'எமனேஸ்வரம், பரமக்குடி', locationEn: 'Emaneswaram, Paramakudi' },
  { id: 12, nameTa: 'சந்திரமௌலீஸ்வரர் கோவில் விநாயகர்', nameEn: 'Chandramouleeswarar Vinayagar', locationTa: 'திருவக்கரை', locationEn: 'Thiruvakkarai' },
  { id: 13, nameTa: 'மயிலம் சுப்பிரமணியர் கோவில் விநாயகர்', nameEn: 'Mailam Temple Vinayagar', locationTa: 'மயிலம், திண்டிவனம்', locationEn: 'Mailam, Tindivanam' },
  { id: 14, nameTa: 'கைலாசநாதர் கோவில் விநாயகர்', nameEn: 'Kailasanathar Temple Vinayagar', locationTa: 'நத்தம், திண்டுக்கல்', locationEn: 'Natham, Dindigul' },
  { id: 15, nameTa: 'கைலாசநாதர் கோவில் விநாயகர்', nameEn: 'Kailasanathar Temple Vinayagar', locationTa: 'தாரமங்கலம், சேலம்', locationEn: 'Tharamangalam, Salem' },
  { id: 16, nameTa: 'கற்பக விநாயகர்', nameEn: 'Karpaga Vinayagar', locationTa: 'பிள்ளையார்பட்டி, சிவகங்கை', locationEn: 'Pillayarpatti, Sivagangai' },
  {
    id: 17,
    nameTa: 'உயிர்காக்கும் விநாயகர் (அதிசய தலம்)',
    nameEn: 'Life-Saving Vinayagar (Miracle Sthalam)',
    locationTa: 'பாடைகட்டி மாரியம்மன் கோவில், நன்னிலம்',
    locationEn: 'Paadaikatti Mariamman Temple, Nannilam',
    specialNoteTa: 'கோமா நிலையில் உள்ளவர்கள் கூட இத்தலத்து விநாயகர் அருளால் பிழைத்துவிடுவர் என்பது பாரம்பரிய ஜோதிட வாக்கு.',
    specialNoteEn: 'Revered in traditional Nadi astrology as a miraculous life-saving shrine for critically ill and coma patients.',
  },
];

// Lagna Mudakku with Chhaya Graha (Rahu / Ketu) Presence Temples (PDF 1 Page 16)
export const LAGNA_MUDAKKU_CHHAYA_TEMPLES: {
  signsTa: string;
  signsEn: string;
  rahuTempleTa: string;
  rahuTempleEn: string;
  ketuTempleTa: string;
  ketuTempleEn: string;
}[] = [
  {
    signsTa: 'மேஷம், விருச்சிகம்',
    signsEn: 'Aries, Scorpio',
    rahuTempleTa: 'சீர்காழி ஆதிநாகேஸ்வரர் திருக்கோயில்',
    rahuTempleEn: 'Sirkazhi Aadhi Naganatheswarar Temple',
    ketuTempleTa: 'சிதம்பரம் நடராஜர் கோவில் விநாயகர் சந்நிதி',
    ketuTempleEn: 'Chidambaram Natarajar Temple Vinayagar',
  },
  {
    signsTa: 'ரிஷபம், துலாம்',
    signsEn: 'Taurus, Libra',
    rahuTempleTa: 'சேஷ்டமூலை சேஷ்டபுரீஸ்வரர் சிவன் கோயில் (பேரளம்)',
    rahuTempleEn: 'Sheshtamoolai Shiva Temple (Peralam)',
    ketuTempleTa: 'மதுரை மீனாட்சி கோயில் முக்குறுணி விநாயகர்',
    ketuTempleEn: 'Madurai Mukkuruni Vinayagar Temple',
  },
  {
    signsTa: 'மிதுனம், கன்னி',
    signsEn: 'Gemini, Virgo',
    rahuTempleTa: 'ஸ்ரீரங்கம் ரங்கநாதர் கருடாழ்வார் திருக்கோயில்',
    rahuTempleEn: 'Srirangam Garuda Alwar Temple',
    ketuTempleTa: 'திருச்சானூர் பத்மாவதி தாயார் திருக்கோயில்',
    ketuTempleEn: 'Tiruchanur Padmavathi Ammavari Temple',
  },
  {
    signsTa: 'தனுசு, மீனம்',
    signsEn: 'Sagittarius, Pisces',
    rahuTempleTa: 'கன்னங்குடி இராகு கோயில், தேவகோட்டை',
    rahuTempleEn: 'Kannangudi Rahu Temple, Devakottai',
    ketuTempleTa: 'உப்பூர் வெயில்காத்த விநாயகர் கோயில், ராமநாதபுரம்',
    ketuTempleEn: 'Uppur Vinayagar Temple, Ramanathapuram',
  },
  {
    signsTa: 'மகரம், கும்பம்',
    signsEn: 'Capricorn, Aquarius',
    rahuTempleTa: 'நாகூர் நாகராஜஸ்தலம் திருக்கோயில்',
    rahuTempleEn: 'Nagore Nagaraja Sthalam Temple',
    ketuTempleTa: 'மீன்குளத்தி பகவதி அம்மன் திருக்கோயில், கேரளா/பொள்ளாச்சி',
    ketuTempleEn: 'Meenkulathi Bhagavathi Amman Temple',
  },
  {
    signsTa: 'கடகம்',
    signsEn: 'Cancer',
    rahuTempleTa: 'மேலக்கரியலூர் இராகு கோயில் (சீர்காழி கொள்ளிடம்)',
    rahuTempleEn: 'Melakkariyalur Rahu Temple (Sirkazhi Kollidam)',
    ketuTempleTa: 'சீர்காழி சட்டைநாதர் திரிபுரசுந்தரி திருக்கோயில்',
    ketuTempleEn: 'Sirkazhi Sattainathar Thiripurasundari Temple',
  },
  {
    signsTa: 'சிம்மம்',
    signsEn: 'Leo',
    rahuTempleTa: 'கொடுமுடி மகுடேஸ்வரர் திருக்கோயில்',
    rahuTempleEn: 'Kodumudi Magudeeswarar Temple',
    ketuTempleTa: 'திருச்சி மலைக்கோட்டை உச்சிப்பிள்ளையார் விநாயகர் கோயில்',
    ketuTempleEn: 'Trichy Rockfort Ucchi Pillaiyar Temple',
  },
];

