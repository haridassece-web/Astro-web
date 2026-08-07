import type { BirthInput, CalculatedHoroscope } from '../types/astrology';
import { calculateJulianDay, calculateLahiriAyanamsa, calculatePlanetaryPositions } from './astronomy';
import { calculatePanchanga } from './panchanga';
import { computeAllDivisionalCharts } from './divisionalCharts';
import { calculateVimshottariDasa } from './dasaEngine';
import { evaluateAstrologyRules } from './ruleEngine';
import { generateDomainPredictions, generateRemedies } from './predictionEngine';
import { generatePersonalizedTempleRemedies, calculateTraditionalPariharaReport } from './remedyEngine';

export function calculateFullHoroscope(birth: BirthInput): CalculatedHoroscope {
  const julianDay = calculateJulianDay(birth.dob, birth.tob, birth.timezone);
  const rawAyanamsa = calculateLahiriAyanamsa(julianDay);
  const ayanamsa = birth.panchangaSystem === 'vakkiyam' ? rawAyanamsa - 0.55 : rawAyanamsa;

  const { planets, lagnaSignId } = calculatePlanetaryPositions(birth, julianDay, ayanamsa);

  const panchanga = calculatePanchanga(birth.dob, planets, ayanamsa, birth.panchangaSystem || 'thirukkanitham');

  const divisionalCharts = computeAllDivisionalCharts(planets, lagnaSignId);

  const dasaPeriods = calculateVimshottariDasa(birth.dob, planets);

  const yogasMatched = evaluateAstrologyRules(planets, lagnaSignId);

  const domainPredictions = generateDomainPredictions(planets);
  const remedies = generateRemedies();
  const templeRemedies = generatePersonalizedTempleRemedies(panchanga, planets, lagnaSignId, dasaPeriods);
  const traditionalParihara = calculateTraditionalPariharaReport(panchanga, planets, lagnaSignId);

  const yogaScores = yogasMatched.map((y) => y.score);
  const avgYogaScore = yogaScores.length > 0 ? yogaScores.reduce((a, b) => a + b, 0) / yogaScores.length : 70;
  const overallScore = Math.round((avgYogaScore * 0.5) + 42);

  return {
    birthDetails: birth,
    julianDay: Number(julianDay.toFixed(4)),
    ayanamsa: Number(ayanamsa.toFixed(4)),
    planets,
    lagnaSignId,
    panchanga,
    divisionalCharts,
    dasaPeriods,
    yogasMatched,
    domainPredictions,
    remedies,
    templeRemedies,
    traditionalParihara,
    overallScore: Math.min(99, Math.max(65, overallScore)),
  };
}
