import type { TempleRemedy } from '../types/astrology';
import { NITYA_YOGA_PARIHARA_MAP } from './traditionalPariharaData';

export function getYogaTempleRemedy(yogaIndex: number, yogaEn: string, yogaTa: string): TempleRemedy {
  const normalizedIndex = ((yogaIndex - 1) % 27) + 1;
  const yogaInfo = NITYA_YOGA_PARIHARA_MAP[normalizedIndex] || NITYA_YOGA_PARIHARA_MAP[1];

  return {
    id: `TPL-YOGA-0${normalizedIndex.toString().padStart(2, '0')}`,
    category: 'Yoga',
    sub_category: `${yogaEn} (${yogaTa})`,
    condition: `Birth Nitya Yoga is ${yogaEn} (${yogaTa} யோகம்)`,
    temple_name: `${yogaInfo.yogiTempleTa} / ${yogaInfo.yogiTempleEn}`,
    deity: 'Nitya Yoga Yogi Devata & Lord Shiva (யோகி அதிதேவதை & சிவன்)',
    district: 'Tamil Nadu',
    state: 'Tamil Nadu',
    latitude: 10.8500,
    longitude: 79.3500,
    google_map_url: `https://maps.google.com/?q=${encodeURIComponent(yogaInfo.yogiTempleEn)}`,
    opening_hours: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
    auspicious_day_ta: 'யோகி நட்சத்திர நாள் & திங்கட்கிழமை',
    auspicious_day_en: 'Yogi Nakshatra Days & Mondays',
    related_yoga: `${yogaEn} (${yogaTa})`,
    worship_method_ta: `${yogaTa} யோகத்தில் பிறந்தவர்கள் யோகி ஸ்தலமான இத்தலத்தில் நெய்தீபம் ஏற்றி அர்ச்சனை செய்து வழிபட வேண்டும்.`,
    worship_method_en: `Offering Archana and pure ghee lamps at this sacred Yogi Parihara Sthalam for ${yogaEn} yoga.`,
    mantra: 'Om Shiva Devataya Namaha • Om Nitya Yogaya Namaha',
    offerings: 'Ghee lamps, Fragrant flowers, Bilva leaves, Honey',
    description_ta: `${yogaTa} யோகத்தில் பிறந்தவர்கள் இத்தலத்தில் வழிபட சுப யோக பாக்கியங்கள் உன்னதமாகக் கூடும்.`,
    description_en: `Worshipping at the Yogi Parihara Sthalam activates the supreme fortune and success of birth Nitya Yoga ${yogaEn}.`,
    source: 'Guruarul Nitya Yoga Parihara Sthala Mahatmyam',
  };
}
