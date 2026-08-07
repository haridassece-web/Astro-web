import type { PlanetPosition, Language } from '../types/astrology';
import { calculateJulianDay, calculateLahiriAyanamsa, calculatePlanetaryPositions } from './astronomy';

export interface TransitInfo {
  planet: string;
  planetTa: string;
  currentSignEn: string;
  currentSignTa: string;
  houseFromMoon: number;
  houseFromLagna: number;
  effectEn: string;
  effectTa: string;
  rating: number; // 1 to 5
  specialStatusEn?: string;
  specialStatusTa?: string;
}

export interface TransitAnalysis {
  transitDate: string;
  transitResults: TransitInfo[];
  ezharaiSaniStatusEn: string;
  ezharaiSaniStatusTa: string;
  guruTransitStatusEn: string;
  guruTransitStatusTa: string;
  overallTransitScore: number;
}

export function calculateCurrentTransits(
  natalPlanets: PlanetPosition[],
  natalLagnaId: number,
  language: Language
): TransitAnalysis {
  const now = new Date();
  const dobStr = now.toISOString().split('T')[0];
  const tobStr = now.toTimeString().split(' ')[0];

  const julianDay = calculateJulianDay(dobStr, tobStr, 5.5);
  const ayanamsa = calculateLahiriAyanamsa(julianDay);

  // Calculate current real-time planetary positions
  const dummyBirth = { name: 'Transit', gender: 'other' as const, dob: dobStr, tob: tobStr, lat: 13.0827, lng: 80.2707, timezone: 5.5, locationName: 'Chennai' };
  const { planets: currentPlanets } = calculatePlanetaryPositions(dummyBirth, julianDay, ayanamsa);

  const natalMoon = natalPlanets.find((p) => p.name === 'Moon')!;
  const natalMoonSignId = natalMoon.signId;

  const transitResults: TransitInfo[] = [];

  // Major Planets Gochara Analysis: Saturn, Jupiter, Rahu, Ketu, Mars, Sun
  currentPlanets.forEach((p) => {
    if (['Saturn', 'Jupiter', 'Rahu', 'Ketu', 'Mars', 'Sun'].includes(p.name)) {
      const houseFromMoon = ((p.signId - natalMoonSignId + 12) % 12) + 1;
      const houseFromLagna = ((p.signId - natalLagnaId + 12) % 12) + 1;

      let effectEn = '';
      let effectTa = '';
      let rating = 3;
      let specialStatusEn = undefined;
      let specialStatusTa = undefined;

      if (p.name === 'Saturn') {
        if ([12, 1, 2].includes(houseFromMoon)) {
          specialStatusEn = 'Ezharai Sani (7.5 Years Saturn)';
          specialStatusTa = 'ஏழரைச் சனி நடைமுறை';
          effectEn = 'Period requires extra patience, hard work, and spiritual discipline.';
          effectTa = 'பொறுமை, உழைப்பு மற்றும் சனீஸ்வரர் வழிபாடு நலம் தரும்.';
          rating = 2;
        } else if (houseFromMoon === 8) {
          specialStatusEn = 'Ashtama Sani (8th Saturn)';
          specialStatusTa = 'அஷ்டமச் சனி நடைமுறை';
          effectEn = 'Exercise caution in financial investments and health matters.';
          effectTa = 'நிதி முதலீடுகள் மற்றும் ஆரோக்கியத்தில் கூடுதல் கவனம் தேவை.';
          rating = 1;
        } else if (houseFromMoon === 4) {
          specialStatusEn = 'Ardhastama / Kanda Sani';
          specialStatusTa = 'அர்த்தாஷ்டம / கண்டச் சனி';
          effectEn = 'Domestic responsibilities and vehicle maintenance highlighted.';
          effectTa = 'குடும்பப் பொறுப்புகள் மற்றும் வாகனப் பராமரிப்பு அவசியம்.';
          rating = 2;
        } else if ([3, 6, 11].includes(houseFromMoon)) {
          specialStatusEn = 'Auspicious Saturn Transit';
          specialStatusTa = 'சுபச் சனி கோசாரம் (நற்பலன்)';
          effectEn = 'Professional stability, competitive victory, and steady income.';
          effectTa = 'தொழில் ஸ்திரத்தன்மை, வெற்றி மற்றும் வருமான உயர்வு.';
          rating = 5;
        } else {
          effectEn = 'Neutral transit period focusing on duties.';
          effectTa = 'கடமைகளைச் செவ்வனே செய்யும் மத்திம காலம்.';
          rating = 3;
        }
      } else if (p.name === 'Jupiter') {
        if ([2, 5, 7, 9, 11].includes(houseFromMoon)) {
          specialStatusEn = 'Subha Guru Transit (5-Star Luck)';
          specialStatusTa = 'சுப குருப் பார்வை & யோகக் கோசாரம்';
          effectEn = 'Prosperity, family auspiciousness, financial growth, and wisdom.';
          effectTa = 'குடும்ப சுபயோகம், லக்ஷ்மி கடாட்சம் மற்றும் பொன்னான காலம்.';
          rating = 5;
        } else {
          effectEn = 'Focus on skill development and steady patience.';
          effectTa = 'திறன் மேம்பாடு மற்றும் நிதானத்துடன் செயல்பட வேண்டிய காலம்.';
          rating = 3;
        }
      } else if (p.name === 'Rahu' || p.name === 'Ketu') {
        if ([3, 6, 11].includes(houseFromMoon)) {
          specialStatusEn = 'Favorable Shadow Planet Transit';
          specialStatusTa = 'சுப ராகு/கேது கோசாரம்';
          effectEn = 'Foreign opportunities, sudden windfalls, and spiritual depth.';
          effectTa = 'வெளிநாட்டு வாய்ப்புகள், எதிர்பாராத தனலாபம் மற்றும் ஞானம்.';
          rating = 4;
        } else {
          effectEn = 'Mindfulness required during major transitions.';
          effectTa = 'முக்கிய முடிவுகளில் மனத் தெளிவுடன் இயங்குவது நல்லது.';
          rating = 3;
        }
      } else {
        effectEn = 'Monthly planetary progression bringing dynamic action.';
        effectTa = 'சுறுசுறுப்பான தினசரி இயக்கம் மற்றும் சுப காரியங்கள்.';
        rating = 3;
      }

      transitResults.push({
        planet: p.name,
        planetTa: p.nameTa,
        currentSignEn: p.signNameEn,
        currentSignTa: p.signNameTa,
        houseFromMoon,
        houseFromLagna,
        effectEn,
        effectTa,
        rating,
        specialStatusEn,
        specialStatusTa,
      });
    }
  });

  const saturnRes = transitResults.find((t) => t.planet === 'Saturn');
  const jupiterRes = transitResults.find((t) => t.planet === 'Jupiter');

  return {
    transitDate: now.toLocaleDateString(),
    transitResults,
    ezharaiSaniStatusEn: saturnRes?.specialStatusEn || 'No Ezharai Sani Affliction',
    ezharaiSaniStatusTa: saturnRes?.specialStatusTa || 'ஏழரைச் சனி தாக்கம் இல்லை',
    guruTransitStatusEn: jupiterRes?.specialStatusEn || 'Regular Guru Transit',
    guruTransitStatusTa: jupiterRes?.specialStatusTa || 'சாதாரண குரு கோசாரம்',
    overallTransitScore: 82,
  };
}
