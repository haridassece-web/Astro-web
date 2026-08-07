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
    shuklaTempleTa: 'திருவில்லிபுத்தூர் வல்வில் ராமர் கோயில் (வளர்பிறை துவாதசி)',
    shuklaTempleEn: 'Thiruvilliputhur Valvil Ramar Temple (Shukla Dwadashi)',
    shuklaDeityTa: 'விஷ்ணு & வல்வில் ராமர்',
    shuklaDeityEn: 'Lord Vishnu & Valvil Ramar',
    krishnaTempleTa: 'கும்பகோணம் சாரங்கபாணி திருக்கோயில் (தேய்பிறை துவாதசி)',
    krishnaTempleEn: 'Kumbakonam Sarangapani Temple (Krishna Dwadashi)',
    krishnaDeityTa: 'விஷ்ணு & சுக்கிரன் சாரங்கபாணி',
    krishnaDeityEn: 'Sarangapani & Venus',
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
  0: { sunStarTa: 'அஸ்வினி', sunStarEn: 'Ashwini', mudakkuStarTa: 'பூரம், மகம்', mudakkuStarEn: 'Purva Phalguni, Magha', mudakkuSignId: 4 },
  1: { sunStarTa: 'பரணி', sunStarEn: 'Bharani', mudakkuStarTa: 'மகம், பூரம்', mudakkuStarEn: 'Magha, Purva Phalguni', mudakkuSignId: 4 },
  2: { sunStarTa: 'கிருத்திகை', sunStarEn: 'Krittika', mudakkuStarTa: 'ஆயில்யம், உத்திரம்', mudakkuStarEn: 'Ashlesha, Uttara Phalguni', mudakkuSignId: 3 },
  3: { sunStarTa: 'ரோஹிணி', sunStarEn: 'Rohini', mudakkuStarTa: 'பூசம், ஹஸ்தம்', mudakkuStarEn: 'Pushya, Hasta', mudakkuSignId: 3 },
  4: { sunStarTa: 'மிருகசீரிஷம்', sunStarEn: 'Mrigasira', mudakkuStarTa: 'புனர்பூசம், சித்திரை', mudakkuStarEn: 'Punarvasu, Chitra', mudakkuSignId: 2 },
  5: { sunStarTa: 'திருவாதிரை', sunStarEn: 'Ardra', mudakkuStarTa: 'திருவாதிரை, சுவாதி', mudakkuStarEn: 'Ardra, Swati', mudakkuSignId: 2 },
  6: { sunStarTa: 'புனர்பூசம்', sunStarEn: 'Punarvasu', mudakkuStarTa: 'மிருகசீரிஷம், விசாகம்', mudakkuStarEn: 'Mrigasira, Vishakha', mudakkuSignId: 5 },
  7: { sunStarTa: 'பூசம்', sunStarEn: 'Pushya', mudakkuStarTa: 'ரோஹிணி, அனுஷம்', mudakkuStarEn: 'Rohini, Anuradha', mudakkuSignId: 6 },
  8: { sunStarTa: 'ஆயில்யம்', sunStarEn: 'Ashlesha', mudakkuStarTa: 'கிருத்திகை, கேட்டை', mudakkuStarEn: 'Krittika, Jyeshtha', mudakkuSignId: 6 },
  9: { sunStarTa: 'மகம்', sunStarEn: 'Magha', mudakkuStarTa: 'அஸ்வினி, பரணி', mudakkuStarEn: 'Ashwini, Bharani', mudakkuSignId: 0 },
  10: { sunStarTa: 'பூரம்', sunStarEn: 'Purva Phalguni', mudakkuStarTa: 'அஸ்வினி, மூலம்', mudakkuStarEn: 'Ashwini, Mula', mudakkuSignId: 0 },
  11: { sunStarTa: 'உத்திரம்', sunStarEn: 'Uttara Phalguni', mudakkuStarTa: 'ரேவதி, உத்திராடம்', mudakkuStarEn: 'Revati, Uttara Ashadha', mudakkuSignId: 8 },
  12: { sunStarTa: 'ஹஸ்தம்', sunStarEn: 'Hasta', mudakkuStarTa: 'உத்திரட்டாதி, திருவோணம்', mudakkuStarEn: 'Uttara Bhadrapada, Shravana', mudakkuSignId: 9 },
  13: { sunStarTa: 'சித்திரை', sunStarEn: 'Chitra', mudakkuStarTa: 'பூரட்டாதி, அவிட்டம்', mudakkuStarEn: 'Purva Bhadrapada, Dhanishta', mudakkuSignId: 10 },
  14: { sunStarTa: 'சுவாதி', sunStarEn: 'Swati', mudakkuStarTa: 'சதயம்', mudakkuStarEn: 'Shatabhisha', mudakkuSignId: 10 },
  15: { sunStarTa: 'விசாகம்', sunStarEn: 'Vishakha', mudakkuStarTa: 'அவிட்டம், பூரட்டாதி', mudakkuStarEn: 'Dhanishta, Purva Bhadrapada', mudakkuSignId: 10 },
  16: { sunStarTa: 'அனுஷம்', sunStarEn: 'Anuradha', mudakkuStarTa: 'திருவோணம், உத்திரட்டாதி', mudakkuStarEn: 'Shravana, Uttara Bhadrapada', mudakkuSignId: 11 },
  17: { sunStarTa: 'கேட்டை', sunStarEn: 'Jyeshtha', mudakkuStarTa: 'உத்திராடம், ரேவதி', mudakkuStarEn: 'Uttara Ashadha, Revati', mudakkuSignId: 11 },
  18: { sunStarTa: 'மூலம்', sunStarEn: 'Mula', mudakkuStarTa: 'பூராடம்', mudakkuStarEn: 'Purva Ashadha', mudakkuSignId: 8 },
  19: { sunStarTa: 'பூராடம்', sunStarEn: 'Purva Ashadha', mudakkuStarTa: 'மூலம்', mudakkuStarEn: 'Mula', mudakkuSignId: 8 },
  20: { sunStarTa: 'உத்திராடம்', sunStarEn: 'Uttara Ashadha', mudakkuStarTa: 'கேட்டை', mudakkuStarEn: 'Jyeshtha', mudakkuSignId: 7 },
  21: { sunStarTa: 'திருவோணம்', sunStarEn: 'Shravana', mudakkuStarTa: 'அனுஷம்', mudakkuStarEn: 'Anuradha', mudakkuSignId: 7 },
  22: { sunStarTa: 'அவிட்டம்', sunStarEn: 'Dhanishta', mudakkuStarTa: 'விசாகம்', mudakkuStarEn: 'Vishakha', mudakkuSignId: 6 },
  23: { sunStarTa: 'சதயம்', sunStarEn: 'Shatabhisha', mudakkuStarTa: 'சுவாதி', mudakkuStarEn: 'Swati', mudakkuSignId: 6 },
  24: { sunStarTa: 'பூரட்டாதி', sunStarEn: 'Purva Bhadrapada', mudakkuStarTa: 'சித்திரை', mudakkuStarEn: 'Chitra', mudakkuSignId: 5 },
  25: { sunStarTa: 'உத்திரட்டாதி', sunStarEn: 'Uttara Bhadrapada', mudakkuStarTa: 'ஹஸ்தம்', mudakkuStarEn: 'Hasta', mudakkuSignId: 5 },
  26: { sunStarTa: 'ரேவதி', sunStarEn: 'Revati', mudakkuStarTa: 'உத்திரம்', mudakkuStarEn: 'Uttara Phalguni', mudakkuSignId: 5 },
};

// Mudakku Temple Matrix (PDF Page 2 & 3 Tables by Lagna Group & Bhava 2..12)
export const MUDAKKU_LAGNA_BHAVA_MAP: Record<string, Record<number, { templeTa: string; templeEn: string; deityTa: string; deityEn: string }>> = {
  // Group 1: Aries (0) / Scorpio (7) Lagna
  'Aries_Scorpio': {
    2: { templeTa: 'சிறுகுடி மங்களேஸ்வரர் கோயில் (மயிலாடுதுறை - பூந்தோட்டம்)', templeEn: 'Sirugudi Mangaleswarar Temple', deityTa: 'மங்களேஸ்வரர் & சிவன்', deityEn: 'Mangaleswarar Shiva' },
    3: { templeTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruchendur Murugan Temple', deityTa: 'செந்திலாண்டவர்', deityEn: 'Lord Murugan' },
    4: { templeTa: 'செவ்வளூர் பூமிநாதேஸ்வரர் கோயில், சோன்னமமராவதி', templeEn: 'Sevvalur Boominatheswarar Temple', deityTa: 'பூமிநாதேஸ்வரர்', deityEn: 'Boominatheswarar' },
    5: { templeTa: 'திருச்செந்தூர் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruchendur Murugan Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Lord Murugan' },
    6: { templeTa: 'கும்பகோணம் வீரபத்திரசாமி திருக்கோயில்', templeEn: 'Kumbakonam Veera Bhathra Swamy Temple', deityTa: 'வீரபத்திரன்', deityEn: 'Veerabhadran' },
    7: { templeTa: 'திருப்பரங்குன்றம் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruparankundram Murugan Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Lord Murugan' },
    8: { templeTa: 'திருக்கடையூர் அமிர்தகடேஸ்வரர் அபிராமி அம்மன் கோயில்', templeEn: 'Thirukadaiyur Abirami Temple', deityTa: 'அபிராமி அம்மன் & அமிர்தகடேஸ்வரர்', deityEn: 'Abirami Shiva' },
    9: { templeTa: 'பிரான்மலை முருகன் கோயில் (சிங்கம்புணரி அருகில்)', templeEn: 'Piranmalai Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    10: { templeTa: 'பழனி தண்டாயுதபாணி திருக்கோயில் (ராஜ தரிசனம்)', templeEn: 'Palani Murugan Temple Rajadarsanam', deityTa: 'தண்டாயுதபாணி', deityEn: 'Palani Murugan' },
    11: { templeTa: 'வீரக்குடி கரைமேல் முருகன் கோயில் (பார்த்திபனூர்)', templeEn: 'Veerakkudi Karaimel Murugan Temple', deityTa: 'கரைமேல் முருகன்', deityEn: 'Karaimel Murugan' },
    12: { templeTa: 'மயிலம் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Mailam Subramanyaswamy Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Mailam Murugan' },
  },
  // Group 2: Taurus (1) / Libra (6) Lagna
  'Taurus_Libra': {
    2: { templeTa: 'ஸ்ரீரங்கம் ரங்கநாதர் & ரங்கநாயகி தாயார் திருக்கோயில்', templeEn: 'Srirangam Ranganathar & Thayar Temple', deityTa: 'ரங்கநாத பெருமாள்', deityEn: 'Ranganatha Perumal' },
    3: { templeTa: 'திருத்தணி சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Tiruttani Murugan Temple', deityTa: 'தணிகேசன்', deityEn: 'Tiruttani Murugan' },
    4: { templeTa: 'மண்ணச்சநல்லூர் பூமிநாதர் கோயில், திருச்சி', templeEn: 'Mannachanallur Boominathar Temple', deityTa: 'பூமிநாதர்', deityEn: 'Boominathar' },
    5: { templeTa: 'சீயாத்த மங்கை சிவன் கோயில், நன்னிலம்', templeEn: 'Seeyathamangai Shiva Temple', deityTa: 'அயவந்தீஸ்வரர்', deityEn: 'Ayavantheeswarar' },
    6: { templeTa: 'உக்கடம் லட்சுமி நரசிம்மர் திருக்கோயில்', templeEn: 'Ukkadam Lakshmi Narasimhar Temple', deityTa: 'லட்சுமி நரசிம்மர்', deityEn: 'Lakshmi Narasimhar' },
    7: { templeTa: 'மணமுடிச்சநல்லூர் திருக்கோயில்', templeEn: 'Manamudichanallur Temple', deityTa: 'சிவன்', deityEn: 'Lord Shiva' },
    8: { templeTa: 'நல்லாத்தூர் சொர்ணபுரீஸ்வரர் திரிபுரசுந்தரி கோயில்', templeEn: 'Nallathur Swarnapureeswarar Temple', deityTa: 'சொர்ணபுரீஸ்வரர்', deityEn: 'Swarnapureeswarar' },
    9: { templeTa: 'திருமயம் ஈஸ்வரன் திருக்கோயில், புதுக்கோட்டை', templeEn: 'Thirumayam Eswaran Temple', deityTa: 'சத்யகிரீஸ்வரர்', deityEn: 'Sathyagireeswarar' },
    10: { templeTa: 'மதுரை மீனாட்சி சுந்தரேஸ்வரர் திருக்கோயில்', templeEn: 'Madurai Meenakshi Amman Temple', deityTa: 'மீனாட்சி அம்மன்', deityEn: 'Meenakshi Amman' },
    11: { templeTa: 'காவளம்பாடி பெருமாள் கோயில் (சீர்காழி)', templeEn: 'Kavalambadi Perumal Temple', deityTa: 'கோபாலகிருஷ்ணன்', deityEn: 'Gopalakrishnan' },
    12: { templeTa: 'திருவேற்காடு வேதபுரீஸ்வரர் & தேவி கருமாரி கோயில்', templeEn: 'Thiruverkadu Vedapureeswarar Temple', deityTa: 'வேதபுரீஸ்வரர்', deityEn: 'Vedapureeswarar' },
  },
  // Group 3: Gemini (2) / Virgo (5) Lagna
  'Gemini_Virgo': {
    2: { templeTa: 'திருக்கோளிகேடு திருக்கோயில், காஞ்சிபுரம்', templeEn: 'Thirukolikedu Temple Kanchipuram', deityTa: 'சிவன்', deityEn: 'Lord Shiva' },
    3: { templeTa: 'பழமுதிர்ச்சோலை முருகன் திருக்கோயில்', templeEn: 'Palamuthircholai Murugan Temple', deityTa: 'சோலைமலை முருகன்', deityEn: 'Lord Murugan' },
    4: { templeTa: 'சௌந்தர்ராஜ பெருமாள் கோயில், நாகப்பட்டினம்', templeEn: 'Soundararaja Perumal Temple Nagapattinam', deityTa: 'சௌந்தர்ராஜன்', deityEn: 'Soundararajan' },
    5: { templeTa: 'ஸ்ரீமுஷ்ணம் பூவராகவ பெருமாள் கோயில், சிதம்பரம்', templeEn: 'Srimushnam Bhuvaraha Perumal Temple', deityTa: 'பூவராகமூர்த்தி', deityEn: 'Bhuvarahamoorthy' },
    6: { templeTa: 'திருவெண்காடு அகோரமூர்த்தி திருக்கோயில்', templeEn: 'Thiruvenkadu Aghoramurthy Temple', deityTa: 'அகோரமூர்த்தி', deityEn: 'Aghoramurthy' },
    7: { templeTa: 'திருநகரி கல்யாண ரங்கநாத பெருமாள் கோயில்', templeEn: 'Thirunagari Kalyana Ranganathar Temple', deityTa: 'கல்யாண ரங்கநாதர்', deityEn: 'Kalyana Ranganathar' },
    8: { templeTa: 'மேலக்கடம்பூர் அமிர்தகடேஸ்வரர் கோயில், திண்டிவனம்', templeEn: 'Melakadambur Amirthakadeeswarar Temple', deityTa: 'அமிர்தகடேஸ்வரர்', deityEn: 'Amirthakadeeswarar' },
    9: { templeTa: 'அச்சிரப்பாக்கம் ஆட்சிபுரீஸ்வரர் கோயில்', templeEn: 'Acharapakkam Atchipureeswarar Temple', deityTa: 'ஆட்சிபுரீஸ்வரர்', deityEn: 'Atchipureeswarar' },
    10: { templeTa: 'ஸ்ரீரங்கம் கருடாழ்வார் சந்நிதி', templeEn: 'Srirangam Garuda Alwar Temple', deityTa: 'கருடாழ்வார்', deityEn: 'Garuda Alwar' },
    11: { templeTa: 'திருவெள்ளறை புண்டரீகாட்க்ஷன் பெருமாள் கோயில், திருச்சி', templeEn: 'Thiruvellarai Pundarikakshan Temple', deityTa: 'புண்டரீகாட்க்ஷன்', deityEn: 'Pundarikakshan' },
    12: { templeTa: 'உத்தமர் கோவில் (பிச்சாண்டார் கோவில்), திருச்சி', templeEn: 'Uthamar Kovil Pitchandar Temple', deityTa: 'மும்மூர்த்திகள் & சிவன்', deityEn: 'Trimurti Shiva' },
  },
  // Group 4: Cancer (3) Lagna
  'Cancer': {
    2: { templeTa: 'ஓசூர் சந்திர சூடேஸ்வரர் திருக்கோயில்', templeEn: 'Hosur Chandra Choodeswarar Temple', deityTa: 'சந்திர சூடேஸ்வரர்', deityEn: 'Chandra Choodeswarar' },
    3: { templeTa: 'திருமலைக்குமாரசாமி முருகன் கோயில், குற்றாலம்', templeEn: 'Thirumalaikumaraswamy Murugan Temple', deityTa: 'திருமலை முருகன்', deityEn: 'Thirumalai Murugan' },
    4: { templeTa: 'பவானி சங்கமேஸ்வரர் திருக்கோயில்', templeEn: 'Bhavani Sangameswarar Temple', deityTa: 'சங்கமேஸ்வரர்', deityEn: 'Sangameswarar' },
    5: { templeTa: 'இராமேஸ்வரம் இராமநாதசுவாமி திருக்கோயில்', templeEn: 'Rameswaram Ramanathaswamy Temple', deityTa: 'ராமநாதசுவாமி', deityEn: 'Ramanathaswamy' },
    6: { templeTa: 'இராமேஸ்வரம் ராமர் பாதம் திருக்கோயில்', templeEn: 'Rameswaram Ramar Padam Temple', deityTa: 'ஸ்ரீராமர் பாதம்', deityEn: 'Sri Ramar Padam' },
    7: { templeTa: 'திருமணஞ்சேரி உத்வாகநாதசுவாமி கோயில்', templeEn: 'Thirumanancheri Uthvaganathar Temple', deityTa: 'கல்யாணசுந்தரர்', deityEn: 'Kalyanasundarar' },
    8: { templeTa: 'திங்களூர் கைலாசநாதர் சந்திரன் கோயில்', templeEn: 'Thingaloor Kailasanathar Chandra Temple', deityTa: 'சந்திர பகவான்', deityEn: 'Chandra Bhagavan' },
    9: { templeTa: 'தரங்கம்பாடி மாசிலாமணீஸ்வரர் திருக்கோயில்', templeEn: 'Tharangambadi Masilamaniswarar Temple', deityTa: 'மாசிலாமணீஸ்வரர்', deityEn: 'Masilamaniswarar' },
    10: { templeTa: 'அருப்புக்கோட்டை திருச்சுழி சிவன் கோயில்', templeEn: 'Aruppukottai Thiruchuli Shiva Temple', deityTa: 'திருமேனிநாதர்', deityEn: 'Thirumeninathar' },
    11: { templeTa: 'திருநெடுங்குளம் நெடுங்களநாதர் கோயில்', templeEn: 'Thirunedungulam Nedungalanathar Temple', deityTa: 'நெடுங்களநாதர்', deityEn: 'Nedungalanathar' },
    12: { templeTa: 'திருப்பட்டூர் பிரம்மன் கோயில் (பதஞ்சலி தலம்)', templeEn: 'Thirupattur Brahma Temple', deityTa: 'பிரம்மதேவன்', deityEn: 'Lord Brahma' },
  },
  // Group 5: Leo (4) Lagna
  'Leo': {
    2: { templeTa: 'கொடுமுடி மகுடேஸ்வரர் திருக்கோயில்', templeEn: 'Kodumudi Magudeeswarar Temple', deityTa: 'மகுடேஸ்வரர் & சிவன்', deityEn: 'Magudeeswarar Shiva' },
    3: { templeTa: 'திருவினடைகழி முருகன் திருக்கோயில் (திருக்கடையூர் அருகில்)', templeEn: 'Thiruvedakazhi Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    4: { templeTa: 'திருவேடகம் வேடகநாதர் திருக்கோயில் (சோழவந்தான்)', templeEn: 'Thiruvedagam Vedaganathar Temple', deityTa: 'வேடகநாதர் & சிவன்', deityEn: 'Vedaganathar Shiva' },
    5: { templeTa: 'திருக்கோஞ்சி இருகரயீஸ்வரர் திருக்கோயில் (பாண்டி அருகில்)', templeEn: 'Thirukanchi Irukaraiyeeswarar Temple', deityTa: 'இருகரயீஸ்வரர்', deityEn: 'Irukaraiyeeswarar' },
    6: { templeTa: 'ஓட்டப்பிடாரம் உலகாந்தீஸ்வரி திருக்கோயில்', templeEn: 'Ottapidaram Ulagantheeswari Temple', deityTa: 'உலக்காந்தீஸ்வரி', deityEn: 'Ulagantheeswari' },
    7: { templeTa: 'திருவேள்விக்குடி கல்யாண சுந்தரேஸ்வரர் கோயில்', templeEn: 'Thiruvelvikudi Kalyanasundareswarar Temple', deityTa: 'கல்யாண சுந்தரேஸ்வரர்', deityEn: 'Kalyanasundareswarar' },
    8: { templeTa: 'பரிதியப்பர் திருக்கோயில் (தஞ்சாவூர்)', templeEn: 'Parithiappar Temple Thanjavur', deityTa: 'பரிதியப்பர் & சூரியன்', deityEn: 'Surya Shiva' },
    9: { templeTa: 'பெருநகர் பிரம்மபுரீஸ்வரர் திருக்கோயில் (காஞ்சிபுரம்)', templeEn: 'Perunagar Brahmapureeswarar Temple Kanchipuram', deityTa: 'பிரம்மபுரீஸ்வரர் & பெரியநாயகி', deityEn: 'Brahmapureeswarar' },
    10: { templeTa: 'திருப்புனைவாசல் விருத்தபுரீஸ்வரர் பெரியநாயகி திருக்கோயில்', templeEn: 'Thirupunaivasal Viruthapureeswarar Temple', deityTa: 'விருத்தபுரீஸ்வரர்', deityEn: 'Viruthapureeswarar' },
    11: { templeTa: 'பிரான்மலை முருகன் திருக்கோயில்', templeEn: 'Piranmalai Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    12: { templeTa: 'மதுரை ஒத்தக்கடை யானைமலை நரசிம்மர் திருக்கோயில்', templeEn: 'Madurai Yanaimalai Narasimhar Temple', deityTa: 'யோக நரசிம்மர்', deityEn: 'Yoga Narasimhar' },
  },
  // Group 6: Sagittarius (8) / Pisces (11) Lagna
  'Sagittarius_Pisces': {
    2: { templeTa: 'திருத்துறையூர் சிஷ்டகுருநாதர் திருக்கோயில் (திண்டிவனம்)', templeEn: 'Thiruthuraiyur Sishtagurunathar Temple', deityTa: 'சிஷ்டகுருநாதர் & சிவன்', deityEn: 'Sishtagurunathar Shiva' },
    3: { templeTa: 'சுவாமிமலை முருகன் திருக்கோயில்', templeEn: 'Swamimalai Murugan Temple', deityTa: 'சுவாமிநாதசுவாமி', deityEn: 'Lord Swaminathar' },
    4: { templeTa: 'சென்னை சின்னமேடு சிறுவாபுரி முருகன் திருக்கோயில்', templeEn: 'Chennai Siruvapuri Murugan Temple', deityTa: 'பாலசுப்பிரமணியசுவாமி', deityEn: 'Siruvapuri Murugan' },
    5: { templeTa: 'திருக்கருகாவூர் கர்ப்பரக்ஷாம்பிகை ஈஸ்வரர் திருக்கோயில்', templeEn: 'Thirukarugavur Garbarakshambigai Temple', deityTa: 'முல்லைவனநாதர் & கர்ப்பரக்ஷாம்பிகை', deityEn: 'Garbarakshambigai' },
    6: { templeTa: 'திருவானைக்காவல் அகிலாண்டேஸ்வரி ஜம்புகேஸ்வரர் கோயில்', templeEn: 'Thiruvanaikaval Jambukeswarar Temple', deityTa: 'அகிலாண்டேஸ்வரி & ஜம்புகேஸ்வரர்', deityEn: 'Akilandeswari' },
    7: { templeTa: 'திருமுருகன்பூண்டி முருகன் திருக்கோயில் (திருப்பூர்)', templeEn: 'Thirumuruganpoondi Murugan Temple', deityTa: 'முருகப்பெருமான்', deityEn: 'Lord Murugan' },
    8: { templeTa: 'ஸ்ரீவாஞ்சியம் எமதர்மன் கைலாசநாதர் திருக்கோயில்', templeEn: 'Thiruvanchiyam Yamadharman Temple', deityTa: 'எமதர்மன் & வாஞ்சிநாதர்', deityEn: 'Yamadharman Shiva' },
    9: { templeTa: 'பெருநகர் பிரம்மபுரீஸ்வரர் திருக்கோயில் (காஞ்சிபுரம்) / தாயுமானவர் கோயில் (திருச்சி)', templeEn: 'Perunagar Brahmapureeswarar Temple Kanchipuram / Thayumanavar Trichy', deityTa: 'பிரம்மபுரீஸ்வரர் & பெரியநாயகி', deityEn: 'Brahmapureeswarar & Periyanayaki' },
    10: { templeTa: 'அருப்புக்கோட்டை பழைய சிவன் திருக்கோயில்', templeEn: 'Aruppukottai Pazhaya Shiva Temple', deityTa: 'சிவன்', deityEn: 'Lord Shiva' },
    11: { templeTa: 'பேரூர் பட்டீஸ்வரர் திருக்கோயில் (கோவை)', templeEn: 'Perur Pateeswarar Temple Coimbatore', deityTa: 'பட்டீஸ்வரர் & பச்சைநாயகி', deityEn: 'Pateeswarar' },
    12: { templeTa: 'கோடியக்கரை கோடிக்குழகர் திருக்கோயில்', templeEn: 'Kodiakkarai Kodikuzhagar Temple', deityTa: 'கோடிக்குழகர் & சிவன்', deityEn: 'Kodikuzhagar Shiva' },
  },
  // Group 7: Capricorn (9) / Aquarius (10) Lagna
  'Capricorn_Aquarius': {
    2: { templeTa: 'திருவாதவூர் சிவன் திருக்கோயில்', templeEn: 'Thiruvadavur Shiva Temple', deityTa: 'திருவாதவூரார் சிவன்', deityEn: 'Thiruvadavur Shiva' },
    3: { templeTa: 'திருப்பரங்குன்றம் சுப்பிரமணியசுவாமி திருக்கோயில்', templeEn: 'Thiruparankundram Murugan Temple', deityTa: 'சுப்பிரமணியசுவாமி', deityEn: 'Lord Murugan' },
    4: { templeTa: 'திருச்சி வயலூர் முருகன் திருக்கோயில்', templeEn: 'Trichy Vayalur Murugan Temple', deityTa: 'வயலூர் முருகன்', deityEn: 'Vayalur Murugan' },
    5: { templeTa: 'கும்பகோணம் ஆதிகும்பேஸ்வரர் கோயில் அம்பாள் சந்நிதி', templeEn: 'Kumbakonam Adhikumbeswarar Ambal Temple', deityTa: 'மங்களாம்பிகை & ஆதிகும்பேஸ்வரர்', deityEn: 'Mangalambigai' },
    6: { templeTa: 'மதுரை அழகர் கோவில் கள்ளழகர் திருக்கோயில்', templeEn: 'Madurai Alagar Kovil Kallalagar Temple', deityTa: 'கள்ளழகர் பெருமாள்', deityEn: 'Kallalagar Perumal' },
    7: { templeTa: 'வேதாரண்யம் வேதாரண்யேஸ்வரர் திருக்கோயில்', templeEn: 'Vedaranyam Vedaranyeswarar Temple', deityTa: 'வேதாரண்யேஸ்வரர்', deityEn: 'Vedaranyeswarar' },
    8: { templeTa: 'பரமக்குடி எமனேஸ்வரன் திருக்கோயில்', templeEn: 'Paramakudi Emaneswarar Temple', deityTa: 'எமனேஸ்வரர்', deityEn: 'Emaneswarar' },
    9: { templeTa: 'தாண்டிக்குடி முருகன் கோயில் (கொடைக்கானல் அருகில்)', templeEn: 'Thandikudi Murugan Temple Kodaikanal', deityTa: 'தாண்டிக்குடி முருகன்', deityEn: 'Thandikudi Murugan' },
    10: { templeTa: 'திருமால்பூர் மால்வணங்கீஸ்வரர் திருக்கோயில்', templeEn: 'Thirumalpur Malvanangeeswarar Temple', deityTa: 'மால்வணங்கீஸ்வரர்', deityEn: 'Malvanangeeswarar' },
    11: { templeTa: 'திருவாடானை ஆதிரத்தினேஸ்வரர் திருக்கோயில்', templeEn: 'Thiruvadanai Adhirathineeswarar Temple', deityTa: 'ஆதிரத்தினேஸ்வரர்', deityEn: 'Adhirathineeswarar' },
    12: { templeTa: 'திருப்புல்லாணி சேதுக்கரை / உத்தரகோசமங்கை சிவன் கோயில்', templeEn: 'Thiruppullani Sethukarai / Uthirakosamangai Temple', deityTa: 'மங்களநாதர் & சிவன்', deityEn: 'Mangalanathar Shiva' },
  },
};
