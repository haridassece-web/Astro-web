export type Language = 'ta' | 'en';

export interface LocationPreset {
  name: string;
  nameTa: string;
  lat: number;
  lng: number;
  timezone: number; // offset in hours e.g. +5.5
}

export interface BirthInput {
  name: string;
  gender: 'male' | 'female' | 'other';
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm:ss
  lat: number;
  lng: number;
  timezone: number;
  locationName: string;
  panchangaSystem?: 'thirukkanitham' | 'vakkiyam';
}

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface SignInfo {
  id: number; // 0 to 11
  nameEn: ZodiacSign;
  nameTa: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  lord: string;
}

export type PlanetName =
  | 'Sun' | 'Moon' | 'Mars' | 'Mercury'
  | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu' | 'Lagna';

export interface PlanetPosition {
  name: PlanetName;
  nameTa: string;
  longitude: number; // 0 to 360 degrees
  signId: number; // 0 to 11
  signNameEn: ZodiacSign;
  signNameTa: string;
  signDegree: number; // 0 to 30 degrees inside sign
  house: number; // 1 to 12 from Lagna
  nakshatraId: number; // 0 to 26
  nakshatraEn: string;
  nakshatraTa: string;
  pada: number; // 1 to 4
  lord: string;
  isRetrograde: boolean;
  dignityEn: 'Exalted' | 'Moolatrikona' | 'Own House' | 'Great Friend' | 'Friend' | 'Neutral' | 'Enemy' | 'Great Enemy' | 'Debilitated';
  dignityTa: string;
  speed: number;
}

export interface Panchanga {
  systemEn: string;
  systemTa: string;
  varaEn: string;
  varaTa: string;
  varaLord: string;
  tithiEn: string;
  tithiTa: string;
  tithiType: 'Shukla' | 'Krishna';
  tithiIndex: number; // 1-30
  nakshatraEn: string;
  nakshatraTa: string;
  nakshatraIndex: number; // 1-27
  yogaEn: string;
  yogaTa: string;
  yogaIndex: number; // 1-27
  karanaEn: string;
  karanaTa: string;
  karanaIndex: number;
  taraBalam: { statusEn: string; statusTa: string; rating: number };
  chandraBalam: { statusEn: string; statusTa: string; rating: number };
  ayanamsaDegree: string;
}

export interface ChartHouse {
  houseNum: number; // 1 to 12
  signId: number;
  signNameEn: ZodiacSign;
  signNameTa: string;
  planets: PlanetPosition[];
}

export interface DivisionalChart {
  id: string; // e.g. D1, D9, D10
  titleEn: string;
  titleTa: string;
  houses: ChartHouse[];
}

export interface DasaPeriod {
  planet: PlanetName;
  planetTa: string;
  startDate: string;
  endDate: string;
  startYear?: number;
  endYear?: number;
  durationYears: number;
  isCurrent: boolean;
  subDasas?: DasaPeriod[];
}

export interface AstrologyRule {
  id: string;
  nameEn: string;
  nameTa: string;
  category: 'Raja' | 'Dhana' | 'Viparita' | 'NeechaBhanga' | 'PanchaMahapurusha' | 'Arishta' | 'General';
  descriptionEn: string;
  descriptionTa: string;
  score: number; // 0 to 100
  predictionEn: string;
  predictionTa: string;
  sourceText?: string;
}

export interface DomainPrediction {
  domainKey: 'education' | 'career' | 'finance' | 'marriage' | 'children' | 'health' | 'foreign' | 'property' | 'spirituality' | 'longevity';
  domainEn: string;
  domainTa: string;
  iconName: string;
  rating: number;
  summaryEn: string;
  summaryTa: string;
  detailsEn: string[];
  detailsTa: string[];
  strengthScore: number;
}

export interface Remedy {
  titleEn: string;
  titleTa: string;
  categoryEn: 'Gemstone' | 'Mantra' | 'Homam' | 'Charity' | 'Temple' | 'Fasting';
  categoryTa: string;
  descriptionEn: string;
  descriptionTa: string;
}

export type TempleRemedyCategory =
  | 'Tithi'
  | 'Nakshatra'
  | 'Yoga'
  | 'Karana'
  | 'RahuKetu'
  | 'Lagna'
  | 'Dosha'
  | 'Dasa';

export interface TempleRemedy {
  id: string;
  category: TempleRemedyCategory;
  sub_category: string;
  condition: string;
  temple_name: string;
  deity: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  google_map_url: string;
  opening_hours: string;
  auspicious_day_ta: string;
  auspicious_day_en: string;
  related_planet?: string;
  related_nakshatra?: string;
  related_tithi?: string;
  related_yoga?: string;
  related_karana?: string;
  related_dosha?: string;
  worship_method_ta: string;
  worship_method_en: string;
  mantra: string;
  offerings: string;
  description_ta?: string;
  description_en?: string;
  source?: string;
}

export interface TraditionalPariharaItem {
  typeEn: string;
  typeTa: string;
  nameEn: string;
  nameTa: string;
  templeNameEn: string;
  templeNameTa: string;
  deityEn?: string;
  deityTa?: string;
  districtTa?: string;
  googleMapUrl: string;
  detailsTa: string;
  detailsEn: string;
}

export interface TraditionalPariharaReport {
  tithiParihara: TraditionalPariharaItem;
  karanaParihara: TraditionalPariharaItem;
  yogaParihara: TraditionalPariharaItem;
  avayogiParihara: TraditionalPariharaItem;
  vainasikaParihara: TraditionalPariharaItem;
  mudakkuParihara: TraditionalPariharaItem;
}

export interface CalculatedHoroscope {
  birthDetails: BirthInput;
  julianDay: number;
  ayanamsa: number;
  planets: PlanetPosition[];
  lagnaSignId: number;
  panchanga: Panchanga;
  divisionalCharts: { [key: string]: DivisionalChart };
  dasaPeriods: DasaPeriod[];
  yogasMatched: AstrologyRule[];
  domainPredictions: DomainPrediction[];
  remedies: Remedy[];
  templeRemedies: TempleRemedy[];
  traditionalParihara: TraditionalPariharaReport;
  overallScore: number;
}

export interface UserUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  savedHoroscopes?: BirthInput[];
}

