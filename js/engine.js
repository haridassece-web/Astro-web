// PG Astro - Raja Nadi Evaluation Engine
// Analyzes Chart, Conjunctions (இணைவு பலன்), Trines (1-5-9), Transits (கோச்சாரம்),
// Subhathuvam, Sookshuma Valu, Papathuvam (சுபத்துவம், சூட்சும வலு & பாபத்துவம்),
// and Vimshottari Dasa - Bhukti - Antharam (தசா, புத்தி, அந்தரம்)

window.PGAstroEngine = window.PGAstroEngine || {};

(function() {
  function evaluateCurrentChart() {
    if (!window.PGAstro || !window.PGAstro.chart) return;
    const chartState = window.PGAstro.chart.getState();
    const RASIS = (window.PGAstro.chart && window.PGAstro.chart.RASIS) || [];
    const nativeInfo = window.PGAstro.chart.getNativeInfo();

    // 1. Collect all placed planets and their locations
    const placedPlanets = [];
    for (let rasiId in chartState) {
      const list = chartState[rasiId] || [];
      list.forEach(p => {
        placedPlanets.push({
          ...p,
          rasiId: parseInt(rasiId),
          rasiName: RASIS.find(r => r.id === parseInt(rasiId))?.name || ""
        });
      });
    }

    // 2. Find Conjunctions (Same House)
    const detectedConjunctions = [];
    const processedPairs = new Set();

    for (let rasiId in chartState) {
      const list = chartState[rasiId] || [];
      if (list.length >= 2) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            const p1 = list[i].planet;
            const p2 = list[j].planet;
            const pairKey = [p1, p2].sort().join("_");
            if (!processedPairs.has(pairKey)) {
              processedPairs.add(pairKey);
              const combData = window.PGAstroData.getCombination(p1, p2);
              
              let degInfo = "";
              if (list[i].degree !== undefined && list[j].degree !== undefined) {
                const diff = Math.abs(parseFloat(list[i].degree) - parseFloat(list[j].degree));
                degInfo = `${diff.toFixed(1)}° பாகை இடைவெளி` + (diff <= 5.0 ? " (அதி நெருக்கம்)" : "");
              }

              detectedConjunctions.push({
                type: "நேரடி இணைவு (Conjunction)",
                rasiName: RASIS.find(r => r.id === parseInt(rasiId))?.name || "",
                p1: p1,
                p2: p2,
                degInfo: degInfo,
                data: combData
              });
            }
          }
        }
      }
    }

    // 3. Find Nadi Trinal (1-5-9) & Opposition (1-7) Connections
    placedPlanets.forEach((itemA, idxA) => {
      placedPlanets.forEach((itemB, idxB) => {
        if (idxA >= idxB) return;
        if (itemA.rasiId === itemB.rasiId) return;

        const dist = ((itemB.rasiId - itemA.rasiId + 12) % 12);
        const isTrine = (dist === 4 || dist === 8);
        const isOpp = (dist === 6);

        if (isTrine || isOpp) {
          const pairKey = [itemA.planet, itemB.planet].sort().join("_");
          if (!processedPairs.has(pairKey)) {
            processedPairs.add(pairKey);
            const combData = window.PGAstroData.getCombination(itemA.planet, itemB.planet);
            detectedConjunctions.push({
              type: isTrine ? "திரிகோண தொடர்பு (1-5-9 Nadi Trine)" : "சமசப்தம பார்வை (1-7 Opposition)",
              rasiName: `${itemA.rasiName} ↔ ${itemB.rasiName}`,
              p1: itemA.planet,
              p2: itemB.planet,
              data: combData
            });
          }
        }
      });
    });

    // 4. Special Conditions: Retrograde, Marginal, Exalted, Debilitated
    const specialPlanets = placedPlanets.filter(p => p.isRetrograde || p.isMarginal || p.isExalted || p.isDebilitated);

    // 5. Evaluate Subhathuvam, Sookshuma Valu & Papathuvam (சுபத்துவம் & பாபத்துவம்)
    let subhathuvamResult = null;
    if (window.PGAstro.subhathuvam && window.PGAstro.subhathuvam.evaluate) {
      subhathuvamResult = window.PGAstro.subhathuvam.evaluate(chartState);
    }

    // 6. Calculate Vimshottari Dasa - Bhukti - Antharam (தசா, புத்தி, அந்தரம்)
    let dashaResult = null;
    if (window.PGAstro.lastCalculatedHoroscope && window.PGAstro.lastCalculatedHoroscope.dasha) {
      dashaResult = window.PGAstro.lastCalculatedHoroscope.dasha;
    } else if (window.PGAstro.astronomy && window.PGAstro.astronomy.calculateVimshottariDasha) {
      // Look for Moon in chartState
      let moonRasiId = null;
      let moonDeg = 15.0;
      for (let rId in chartState) {
        const m = chartState[rId].find(p => p.planet === "சந்திரன்");
        if (m) {
          moonRasiId = parseInt(rId);
          moonDeg = m.degree !== undefined ? parseFloat(m.degree) : 15.0;
          break;
        }
      }

      if (moonRasiId) {
        const moonLon = ((moonRasiId - 1) * 30) + moonDeg;
        const birthDate = (nativeInfo && nativeInfo.dob) || document.getElementById("birthCalcDate")?.value || "1988-04-30";
        const birthTime = (nativeInfo && nativeInfo.time) || document.getElementById("birthCalcTime")?.value || "12:00";
        dashaResult = window.PGAstro.astronomy.calculateVimshottariDasha(birthDate, birthTime, moonLon);
      }
    }

    // 7. Evaluate Life Milestones (வேலை, தொழில், திருமணம், வீடு, வாகனம்/கார்)
    const lagnaRasiId = window.PGAstro.chart.getLagnaRasiId();
    const lagnaDegree = window.PGAstro.chart.getLagnaDegree();
    const lifeMilestones = predictLifeMilestones({
      chartState,
      lagnaRasiId,
      lagnaDegree,
      subhathuvamResult,
      dashaResult,
      nativeInfo
    });

    // 8. Render complete evaluation results on 1st Page
    renderEvaluationResults({
      placedPlanets,
      detectedConjunctions,
      specialPlanets,
      subhathuvamResult,
      dashaResult,
      lifeMilestones,
      nativeInfo
    });
  }

  // Helper to predict Life Milestones: Job, Business vs Job, Marriage, House, Vehicle / Car
  function predictLifeMilestones(params) {
    const { chartState, lagnaRasiId, subhathuvamResult, dashaResult, nativeInfo } = params;
    if (!chartState || Object.keys(chartState).length === 0) return null;

    const RASIS = (window.PGAstro && window.PGAstro.chart && window.PGAstro.chart.RASIS) || [];
    const PLANET_LORDS = [
      "செவ்வாய்", "சுக்கிரன்", "புதன்", "சந்திரன்", "சூரியன்", "புதன்", 
      "சுக்கிரன்", "செவ்வாய்", "குரு", "சனி", "சனி", "குரு"
    ];

    function getHouseLord(lagnaId, houseNum) {
      if (!lagnaId) return null;
      const targetSign = ((lagnaId - 1 + (houseNum - 1)) % 12) + 1;
      return PLANET_LORDS[targetSign - 1];
    }

    // Locate all planets in chart
    const planetMap = {};
    for (let rId in chartState) {
      const list = chartState[rId] || [];
      list.forEach(p => {
        planetMap[p.planet] = {
          rasiId: parseInt(rId),
          degree: p.degree !== undefined ? parseFloat(p.degree) : 15.0,
          isRetrograde: !!p.isRetrograde,
          isExalted: !!p.isExalted,
          isDebilitated: !!p.isDebilitated
        };
      });
    }

    const effectiveLagnaId = lagnaRasiId || 1;
    const gender = (nativeInfo && nativeInfo.gender) || document.getElementById("birthCalcGender")?.value || "male";
    const isFemale = (gender === "female");
    const nativeTitle = isFemale ? "ஜாதகி" : "ஜாதகர்";
    const spouseTitle = isFemale ? "கணவர் (Husband)" : "மனைவி (Wife)";
    const spouseLabel = isFemale ? "கணவர் குணம் & தோற்றம்" : "மனைவி குணம் & தோற்றம்";
    const spouseKaraka = isFemale ? "செவ்வாய் / குரு (கணவர் காரகன்)" : "சுக்கிரன் (களத்திர காரகன்)";

    const lord10 = getHouseLord(effectiveLagnaId, 10);
    const lord6 = getHouseLord(effectiveLagnaId, 6);
    const lord7 = getHouseLord(effectiveLagnaId, 7);
    const lord5 = getHouseLord(effectiveLagnaId, 5);
    const lord8 = getHouseLord(effectiveLagnaId, 8);
    const lord9 = getHouseLord(effectiveLagnaId, 9);
    const lord4 = getHouseLord(effectiveLagnaId, 4);
    const lord2 = getHouseLord(effectiveLagnaId, 2);
    const lord1 = getHouseLord(effectiveLagnaId, 1);

    const saturnInfo = planetMap["சனி"];
    const venusInfo = planetMap["சுக்கிரன்"];
    const marsInfo = planetMap["செவ்வாய்"];

    // Subhathuvam references
    const subPlanets = (subhathuvamResult && subhathuvamResult.planets) || [];
    const getSubha = (pName) => subPlanets.find(p => p.planet === pName) || { subhaScore: 0, sookshumaScore: 0, papaScore: 0, netScore: 0 };
    const saturnSubha = getSubha("சனி");
    const venusSubha = getSubha("சுக்கிரன்");
    const mercurySubha = getSubha("புதன்");
    const guruSubha = getSubha("குரு");
    const topSubha = (subhathuvamResult && subhathuvamResult.topSubhathuvamPlanet) || null;
    const topSubhaLord = topSubha ? topSubha.planet : "குரு";

    // Saturn connections (Conjunction, 1-5-9 Trine, 1-7 Opposition)
    const saturnConn = [];
    if (saturnInfo) {
      for (let pName in planetMap) {
        if (pName === "சனி") continue;
        const other = planetMap[pName];
        if (other.rasiId === saturnInfo.rasiId) {
          saturnConn.push({ planet: pName, type: "இணைவு" });
        } else {
          const dist = ((other.rasiId - saturnInfo.rasiId + 12) % 12);
          if (dist === 4 || dist === 8) saturnConn.push({ planet: pName, type: "திரிகோணம்" });
          else if (dist === 6) saturnConn.push({ planet: pName, type: "பார்வை" });
        }
      }
    }

    // 1. BUSINESS VS SALARIED JOB (தொழில் பண்ணுவாரா இல்லை வேலைக்கு செல்வாரா?)
    let jobType = "job";
    let jobVerdict = "";
    let jobReason = "";
    let recommendedFields = [];

    const hasMercuryConn = saturnConn.some(c => c.planet === "புதன்") || (mercurySubha.netScore >= 3);
    const hasVenusConn = saturnConn.some(c => c.planet === "சுக்கிரன்") || (venusSubha.netScore >= 3);
    const hasSunConn = saturnConn.some(c => c.planet === "சூரியன்");
    const hasMarsConn = saturnConn.some(c => c.planet === "செவ்வாய்");
    const hasJupiterConn = saturnConn.some(c => c.planet === "குரு");
    const hasRahuConn = saturnConn.some(c => c.planet === "ராகு");
    const hasKetuConn = saturnConn.some(c => c.planet === "கேது");

    if (saturnSubha.netScore >= 3 && (hasMercuryConn || hasVenusConn)) {
      jobType = "business";
      jobVerdict = "சுய தொழில் & வியாபாரம் (Own Business / Trade)";
      jobReason = `ஜீவன காரகன் சனி மற்றும் 10-ஆம் அதிபதி ${lord10 || 'புதன்'} சுபத்துவம் பெற்று, வணிக காரகன் புதன்/சுக்கிரனின் தொடர்பைப் பெற்றுள்ளதால், ${nativeTitle} பிறரிடம் பணியாளாக இல்லாமல் சுதந்திரமாக சொந்த தொழில், வர்த்தகம் அல்லது வணிக நிறுவன தலைமை மூலம் பெரும் தனலாபம் ஈட்டுவார்.`;
    } else if (hasSunConn || (lord6 && getSubha(lord6).netScore > getSubha(lord10).netScore) || saturnSubha.netScore < 2) {
      jobType = "job";
      jobVerdict = "அரசு அல்லது நிறுவன உத்தியோகம் (Salaried / Corporate Job)";
      jobReason = `ஜீவன காரகன் சனி மற்றும் உத்தியோக ஸ்தானமான 6-ஆம் பாவாதிபதி ${lord6 || 'செவ்வாய்'} ஆதிக்கத்தால், அரசுப் பணி அல்லது முன்னணி கார்ப்பரேட் நிறுவனத்தில் நிர்வாகப் பொறுப்பில் நிலையான மாத ஊதியம் தரும் உத்தியோகமே ${nativeTitle}க்கு உச்சபட்ச மேன்மை தரும்.`;
    } else {
      jobType = "hybrid";
      jobVerdict = "முதலில் உத்தியோகம் → பின்னர் சுய தொழில் (Service First, then Business)";
      jobReason = `ஆரம்பத்தில் ${isFemale ? '24-28' : '26-30'} வயது வரை முன்னணி நிறுவனத்தில் பணிபுரிந்து போதிய அனுபவம், சேமிப்பு மற்றும் தொழில் நுட்பங்களைத் திரட்டிய பிறகு, சாதகமான சுப தசாபுத்தியில் சொந்தமாக நிறுவனம் அல்லது வர்த்தகம் தொடங்கி பெரும் தனலாபம் அடைவார்.`;
    }

    if (hasSunConn || (topSubha && topSubha.planet === "சூரியன்")) recommendedFields.push("அரசுத் துறை, பொது நிர்வாகம், அரசியல், தலைமை மருத்துவம்");
    if (hasMercuryConn || (topSubha && topSubha.planet === "புதன்")) recommendedFields.push("தகவல் தொழில்நுட்பம் (IT/Software), ஆடிட்டிங், நிதி நிறுவனம், வர்த்தகம்");
    if (hasVenusConn || (topSubha && topSubha.planet === "சுக்கிரன்")) recommendedFields.push("சொகுசு வாகனங்கள், கலைத்துறை, நகை/ஜவுளி வர்த்தகம், ஹோட்டல்");
    if (hasMarsConn || (topSubha && topSubha.planet === "செவ்வாய்")) recommendedFields.push("சிவில்/கட்டுமானம், ரியல் எஸ்டேட், பாதுகாப்பு, மெக்கானிக்கல் என்ஜினியரிங்");
    if (hasJupiterConn || (topSubha && topSubha.planet === "குரு")) recommendedFields.push("கல்வி நிறுவனம், வங்கி மேலாண்மை, சட்ட ஆலோசனை, ஆன்மீகம்");
    if (hasRahuConn || (topSubha && topSubha.planet === "ராகு")) recommendedFields.push("ஆன்லைன் ஈ-காமர்ஸ், ஏற்றுமதி-இறக்குமதி, ரசாயனம்/மருந்து, வெளிநாட்டு வர்த்தகம்");
    if (hasKetuConn || (topSubha && topSubha.planet === "கேது")) recommendedFields.push("கம்ப்யூட்டர் கோடிங், சித்த மருத்துவம், எலக்ட்ரானிக்ஸ், மூலிகை ஆராய்ச்சி");
    if (recommendedFields.length === 0) recommendedFields.push("நிறுவன மேலாண்மை, நிதி & வர்த்தகத் துறை");

    // Job Location & Employment Status Prediction (வேலை எங்கு செய்வார்? வெளிநாடு/வெளி மாநிலம்/வெளி மாவட்டம்/சொந்த ஊர்/வேலைக்கு போகவில்லையா?)
    const jlHouse10Sign = ((effectiveLagnaId - 1 + 9) % 12) + 1;
    const jlHouse12Sign = ((effectiveLagnaId - 1 + 11) % 12) + 1;
    const jlHouse9Sign = ((effectiveLagnaId - 1 + 8) % 12) + 1;
    const jlHouse3Sign = ((effectiveLagnaId - 1 + 2) % 12) + 1;
    const jlHouse4Sign = ((effectiveLagnaId - 1 + 3) % 12) + 1;
    const jlHouse8Sign = ((effectiveLagnaId - 1 + 7) % 12) + 1;

    const jlLord12 = getHouseLord(effectiveLagnaId, 12);
    const jlLord3 = getHouseLord(effectiveLagnaId, 3);
    const jlLord8 = getHouseLord(effectiveLagnaId, 8);

    const lord10Info = planetMap[lord10];
    const lord12Info = planetMap[jlLord12];
    const lord9Info = planetMap[lord9];
    const lord4Info = planetMap[lord4];
    const lord3Info = planetMap[jlLord3];
    const lord8Info = planetMap[jlLord8];
    const rahuInfo = planetMap["ராகு"];
    const moonInfo = planetMap["சந்திரன்"];
    const saturnJobRasi = saturnInfo ? saturnInfo.rasiId : null;

    const movableRasis = [1, 4, 7, 10]; // சர ராசிகள்
    const fixedRasis = [2, 5, 8, 11];   // ஸ்திர ராசிகள்
    const dualRasis = [3, 6, 9, 12];    // உபய ராசிகள்
    const wateryRasis = [4, 8, 12];     // ஜல ராசிகள்

    // 1. Foreign Job Score (வெளிநாட்டு வேலை)
    let foreignScore = 0;
    if (lord10Info && lord10Info.rasiId === jlHouse12Sign) foreignScore += 4.5;
    if (lord12Info && lord12Info.rasiId === jlHouse10Sign) foreignScore += 4.5;
    if (saturnJobRasi === jlHouse12Sign) foreignScore += 3.5;
    if (lord12Info && saturnJobRasi === lord12Info.rasiId) foreignScore += 3.0;
    if (rahuInfo && (rahuInfo.rasiId === jlHouse10Sign || rahuInfo.rasiId === jlHouse12Sign || rahuInfo.rasiId === jlHouse9Sign)) foreignScore += 3.5;
    if (saturnConn.some(c => c.planet === "ராகு")) foreignScore += 3.0;
    if (lord10Info && wateryRasis.includes(lord10Info.rasiId)) foreignScore += 2.5;
    if (saturnJobRasi && wateryRasis.includes(saturnJobRasi)) foreignScore += 2.0;
    if (lord9Info && lord12Info && (lord9Info.rasiId === lord12Info.rasiId || lord9Info.rasiId === jlHouse12Sign)) foreignScore += 2.5;
    if (moonInfo && (moonInfo.rasiId === jlHouse12Sign || moonInfo.rasiId === jlHouse10Sign)) foreignScore += 1.5;

    // 2. Out-of-State Job Score (வெளி மாநில வேலை)
    let stateScore = 0;
    if (lord10Info && lord10Info.rasiId === jlHouse9Sign) stateScore += 4.0;
    if (lord9Info && lord9Info.rasiId === jlHouse10Sign) stateScore += 4.0;
    if (saturnJobRasi === jlHouse9Sign) stateScore += 3.0;
    if (lord10Info && movableRasis.includes(lord10Info.rasiId)) stateScore += 2.5;
    if (saturnJobRasi && movableRasis.includes(saturnJobRasi)) stateScore += 2.0;
    if (lord10Info && lord9Info && lord10Info.rasiId === lord9Info.rasiId) stateScore += 2.5;
    if (saturnConn.some(c => c.planet === "புதன்")) stateScore += 1.5;

    // 3. Other District Job Score (வெளி மாவட்ட வேலை)
    let districtScore = 0;
    if (lord10Info && lord10Info.rasiId === jlHouse3Sign) districtScore += 4.0;
    if (lord3Info && lord3Info.rasiId === jlHouse10Sign) districtScore += 3.5;
    if (saturnJobRasi === jlHouse3Sign) districtScore += 3.0;
    if (lord10Info && dualRasis.includes(lord10Info.rasiId)) districtScore += 2.5;
    if (saturnJobRasi && dualRasis.includes(saturnJobRasi)) districtScore += 2.0;
    if (lord10Info && lord3Info && lord10Info.rasiId === lord3Info.rasiId) districtScore += 2.0;

    // 4. Local / Native Place Job Score (சொந்த ஊர் / உள்ளூர் வேலை)
    let localScore = 1.0; // base local preference
    if (lord10Info && lord10Info.rasiId === jlHouse4Sign) localScore += 4.5;
    if (lord4Info && lord4Info.rasiId === jlHouse10Sign) localScore += 4.0;
    if (saturnJobRasi === jlHouse4Sign) localScore += 3.5;
    if (lord10Info && fixedRasis.includes(lord10Info.rasiId)) localScore += 3.0;
    if (saturnJobRasi && fixedRasis.includes(saturnJobRasi)) localScore += 2.5;
    if (lord10Info && lord4Info && lord10Info.rasiId === lord4Info.rasiId) localScore += 2.5;
    if (saturnSubha.netScore >= 3 && !saturnConn.some(c => c.planet === "ராகு")) localScore += 1.5;

    // Normalize probabilities (100% total)
    const totalLocScore = Math.max(1.0, foreignScore + stateScore + districtScore + localScore);
    const probForeign = Math.round((foreignScore / totalLocScore) * 100);
    const probState = Math.round((stateScore / totalLocScore) * 100);
    const probDistrict = Math.round((districtScore / totalLocScore) * 100);
    const probLocal = Math.max(0, 100 - (probForeign + probState + probDistrict));

    // Determine primary verdict
    let primaryLocation = "";
    let locationBadgeText = "";
    let locationBadgeClass = "";
    let locationExplanation = "";

    if (foreignScore >= 4.0 && foreignScore >= stateScore && foreignScore >= districtScore && foreignScore >= localScore) {
      primaryLocation = "✈️ வெளிநாட்டு வேலை (Foreign Country / Overseas Job)";
      locationBadgeText = "✈️ வெளிநாட்டு யோகம்";
      locationBadgeClass = "badge-blue";
      locationExplanation = `10-ஆம் அதிபதி ${lord10 || 'புதன்'} அல்லது ஜீவன காரகன் சனிக்கு 12-ஆம் பாவம் (அயன சயன போக ஸ்தானம்), 12-ஆம் அதிபதி ${jlLord12 || 'சூரியன்'}, அல்லது அந்நிய தேச காரகன் ராகுவின் வலுவான தொடர்பு உள்ளதால், ${nativeTitle} கடல் கடந்து வெளிநாட்டில் (Foreign / Abroad) பணிபுரிந்து அந்நிய செலாவணியில் பெரும் தனலாபம் ஈட்டும் பிரகாசமான யோகம் உண்டு.`;
    } else if (stateScore >= 3.5 && stateScore >= districtScore && stateScore >= localScore) {
      primaryLocation = "🚆 வெளி மாநில வேலை (Out-of-State / Interstate Job)";
      locationBadgeText = "🚆 வெளி மாநில யோகம்";
      locationBadgeClass = "badge-purple";
      locationExplanation = `10-ஆம் பாவாதிபதி ${lord10 || 'புதன்'} அல்லது ஜீவன காரகன் சனி சர ராசியில் (Movable Sign) அமர்ந்து, 9-ஆம் பாவம் (தூர தேசம்) மற்றும் 9-ஆம் அதிபதி ${lord9 || 'குரு'} தொடர்பில் இருப்பதால், ${nativeTitle} சொந்த மாநிலத்தைத் தாண்டி பிற வெளி மாநிலங்களில் (Out-of-State) முக்கிய கார்ப்பரேட் / தொழில்நுட்ப தலைமைப் பொறுப்பில் பணிபுரிவார்.`;
    } else if (districtScore >= 3.5 && districtScore >= localScore) {
      primaryLocation = "🚗 வெளி மாவட்ட வேலை (Other District / Regional Commute)";
      locationBadgeText = "🚗 வெளி மாவட்டம்";
      locationBadgeClass = "badge-gold";
      locationExplanation = `3-ஆம் பாவம் (குறுகிய தூர இடப்பெயர்ச்சி) மற்றும் உபய ராசிகளின் ஆதிக்கத்தால், ${nativeTitle} பூர்வீக ஊரை விட்டு அருகில் உள்ள வெளி மாவட்டங்கள் அல்லது பெருநகரங்களுக்கு இடம்பெயர்ந்து அல்லது தினசரி பயணித்து பணிபுரியும் யோகம் உண்டாகும்.`;
    } else {
      primaryLocation = "🏡 சொந்த ஊர் / உள்ளூர் வேலை (Native Place / Local City Job)";
      locationBadgeText = "🏡 சொந்த ஊர் யோகம்";
      locationBadgeClass = "badge-green";
      locationExplanation = `4-ஆம் பாவம் (சுக ஸ்தானம், தாயகம், பூர்வீகம்) மற்றும் ஸ்திர ராசிகளின் பலத்தால், ${nativeTitle} சொந்த ஊர் அல்லது உள்ளூரிலேயே (Native Place / Home District) குடும்பத்துடன் தங்கி மன நிம்மதியுடன் நிலையான உத்தியோகம் அல்லது தொழில் செய்யும் யோகம் அமையப்பெறுவார்.`;
    }

    // Determine Native Current Working Status: "இல்லை வேலைக்கு போகவில்லையா?"
    const bDateForAge = (nativeInfo && nativeInfo.dob) || document.getElementById("birthCalcDate")?.value || "1988-04-30";
    const curAgeYears = (new Date() - new Date(bDateForAge)) / (365.2425 * 86400000);
    let statusColor = "#10b981";
    let statusText = "";

    if (curAgeYears < 21) {
      statusColor = "#38bdf8";
      statusText = `📚 ${nativeTitle} தற்போது கல்வி / பயிற்சி பயிலும் இளம் பருவம் (வயது: ${curAgeYears.toFixed(1)}). எனவே தற்போது வேலைக்கு செல்லாமல் கல்வியில் கவனம் செலுத்தும் காலம்; படிப்பு நிறைவுற்ற பின்பே உத்தியோக யோகம் ஆரம்பிக்கும்.`;
    } else {
      const hasKetuAffliction = saturnConn.some(c => c.planet === "கேது");
      const is10thIn8th = (lord10Info && lord10Info.rasiId === jlHouse8Sign);
      const isLord10Deb = (lord10Info && lord10Info.isDebilitated);

      if (hasKetuAffliction || is10thIn8th || isLord10Deb) {
        statusColor = "#f59e0b";
        statusText = `⚠️ 10-ஆம் அதிபதிக்கு 8-ஆம் பாவ மறைவு அல்லது ஜீவன காரகன் சனிக்கு விரக்தி காரகன் கேதுவின் சேர்க்கை உள்ளதால், சில காலகட்டங்களில் வேலை இழப்பு, மன உளைச்சல் அல்லது விருப்பமில்லாமல் வீட்டில் இருக்கும் சூழல் ஏற்படலாம். சுப கிரக (குரு/சுக்கிரன்) தசாபுத்திகள் வரும்போது மீண்டும் புதிய வேலை வாய்ப்பு கைகூடும்.`;
      } else {
        statusColor = "#10b981";
        statusText = `💼 10-ஆம் பாவம் மற்றும் ஜீவன காரகன் சனி சுபத்துவ வலுவுடன் இருப்பதால், ${nativeTitle} நீண்ட காலம் வேலைக்கு போகாமல் முடங்கி இருக்க மாட்டார். படிப்பை முடித்ததிலிருந்து உத்தியோகம் அல்லது சுய தொழிலில் தொடர்ச்சியான ஈடுபாட்டுடன் உழைத்து வருமானம் ஈட்டி வருவார்.`;
      }
    }

    const jobLocationData = {
      primaryVerdict: primaryLocation,
      badgeText: locationBadgeText,
      badgeClass: locationBadgeClass,
      explanation: locationExplanation,
      statusColor: statusColor,
      statusText: statusText,
      probForeign: probForeign,
      probState: probState,
      probDistrict: probDistrict,
      probLocal: probLocal
    };

    // Full Lifespan Bhuktis Computation
    const birthDateStr = (nativeInfo && nativeInfo.dob) || document.getElementById("birthCalcDate")?.value || "1988-04-30";
    const birthDate = new Date(birthDateStr);
    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
    const allBhuktis = [];

    const DASHA_ORDER = (window.PGAstro && window.PGAstro.astronomy && window.PGAstro.astronomy.DASHA_ORDER) || [
      { lord: "கேது", years: 7 }, { lord: "சுக்கிரன்", years: 20 }, { lord: "சூரியன்", years: 6 },
      { lord: "சந்திரன்", years: 10 }, { lord: "செவ்வாய்", years: 7 }, { lord: "ராகு", years: 18 },
      { lord: "குரு", years: 16 }, { lord: "சனி", years: 19 }, { lord: "புதன்", years: 17 }
    ];

    if (dashaResult && dashaResult.nakshatraInfo) {
      const nak = dashaResult.nakshatraInfo;
      const birthLord = nak.lord;
      const firstIdx = DASHA_ORDER.findIndex(d => d.lord === birthLord);
      const balanceYears = nak.balanceTotalYears || 5.0;

      let currentStart = new Date(birthDate.getTime());
      const firstEndMs = currentStart.getTime() + (balanceYears * msPerYear);
      const firstMahaFullYears = DASHA_ORDER[firstIdx].years;
      const firstVirtualStart = firstEndMs - (firstMahaFullYears * msPerYear);

      let bStart = firstVirtualStart;
      for (let b = 0; b < 9; b++) {
        const bInfo = DASHA_ORDER[(firstIdx + b) % 9];
        const bDurMs = (firstMahaFullYears * bInfo.years / 120) * msPerYear;
        const bEnd = bStart + bDurMs;
        if (bEnd > birthDate.getTime()) {
          allBhuktis.push({
            mahaLord: birthLord,
            bhuktiLord: bInfo.lord,
            startDate: new Date(Math.max(bStart, birthDate.getTime())),
            endDate: new Date(bEnd),
            startAge: Math.max(0, (Math.max(bStart, birthDate.getTime()) - birthDate.getTime()) / msPerYear),
            endAge: (bEnd - birthDate.getTime()) / msPerYear
          });
        }
        bStart = bEnd;
      }

      currentStart = new Date(firstEndMs);
      let dIdx = (firstIdx + 1) % 9;

      for (let cycle = 0; cycle < 8; cycle++) {
        const mInfo = DASHA_ORDER[dIdx];
        const mEnd = new Date(currentStart.getTime() + mInfo.years * msPerYear);
        let mBStart = currentStart.getTime();

        for (let b = 0; b < 9; b++) {
          const bInfo = DASHA_ORDER[(dIdx + b) % 9];
          const bDurMs = (mInfo.years * bInfo.years / 120) * msPerYear;
          const mBEnd = mBStart + bDurMs;
          allBhuktis.push({
            mahaLord: mInfo.lord,
            bhuktiLord: bInfo.lord,
            startDate: new Date(mBStart),
            endDate: new Date(mBEnd),
            startAge: (mBStart - birthDate.getTime()) / msPerYear,
            endAge: (mBEnd - birthDate.getTime()) / msPerYear
          });
          mBStart = mBEnd;
        }
        currentStart = mEnd;
        dIdx = (dIdx + 1) % 9;
      }
    }

    const now = new Date();
    const nativeCurrentAge = (now - birthDate) / msPerYear;

    function pickBestBhukti(minAge, maxAge, scorer) {
      const candidates = allBhuktis.filter(b => b.startAge < maxAge && b.endAge > minAge);
      if (candidates.length === 0) return null;
      let best = null;
      let maxScore = -999;
      candidates.forEach(b => {
        const s = scorer(b);
        if (s > maxScore) {
          maxScore = s;
          best = b;
        }
      });
      return best || candidates[0];
    }

    // =========================================================================
    // 0. EDUCATION & FIELD OF STUDY (கல்வி, உயர்கல்வி & படிப்புத் துறை யோகம்)
    // =========================================================================
    const eduHouse4Sign = ((effectiveLagnaId - 1 + 3) % 12) + 1;
    const eduHouse5Sign = ((effectiveLagnaId - 1 + 4) % 12) + 1;
    const eduHouse9Sign = ((effectiveLagnaId - 1 + 8) % 12) + 1;
    const eduHouse10Sign = ((effectiveLagnaId - 1 + 9) % 12) + 1;
    const eduHouse2Sign = ((effectiveLagnaId - 1 + 1) % 12) + 1;

    const eduLord4Data = planetMap[lord4];
    const eduLord5Data = planetMap[lord5];
    const eduLord9Data = planetMap[lord9];
    const eduLord10Data = planetMap[lord10];
    const eduMercuryData = planetMap["புதன்"];
    const eduGuruData = planetMap["குரு"];
    const eduMarsData = planetMap["செவ்வாய்"];
    const eduVenusData = planetMap["சுக்கிரன்"];
    const eduSaturnData = planetMap["சனி"];
    const eduSunData = planetMap["சூரியன்"];
    const eduMoonData = planetMap["சந்திரன்"];
    const eduRahuData = planetMap["ராகு"];
    const eduKetuData = planetMap["கேது"];

    const isStudentAge = nativeCurrentAge < 23;
    const roundedAge = Math.floor(nativeCurrentAge);

    // Nadi & Planetary connections for Vidya Karaka Mercury
    const eduMercNadi = getNadiConnections("புதன்");

    // Educational Stream Scoring
    let engScore = 0;
    let eceScore = 0;
    let itScore = 0;
    let commScore = 0;
    let medScore = 0;
    let artsScore = 0;
    let lawScore = 0;
    let sciScore = 0;

    // 1. ECE, Electronics & Communication & Polytechnic Diploma (செவ்வாய் + புதன் + சனி / 5-ஆம் அதிபதி செவ்வாய்)
    if (lord5 === "செவ்வாய்" || lord4 === "செவ்வாய்") eceScore += 10;
    if (eduHouse5Sign === 1 || eduHouse5Sign === 8 || eduHouse4Sign === 1 || eduHouse4Sign === 8) eceScore += 8;
    if (eduMarsData && eduMercuryData && [0, 4, 8, 6].includes((eduMercuryData.rasiId - eduMarsData.rasiId + 12) % 12)) eceScore += 10;
    if (eduMercNadi.conj.includes("செவ்வாய்") || eduMercNadi.trine.includes("செவ்வாய்")) eceScore += 9;
    if (eduSaturnData && (eduSaturnData.rasiId === eduHouse4Sign || eduSaturnData.rasiId === eduHouse5Sign)) eceScore += 8; // Polytechnic Diploma
    if (eduSaturnData && eduMarsData && [0, 4, 8, 6].includes((eduSaturnData.rasiId - eduMarsData.rasiId + 12) % 12)) eceScore += 7;
    if ((eduRahuData && (eduRahuData.rasiId === eduHouse4Sign || eduRahuData.rasiId === eduHouse5Sign)) || (eduKetuData && (eduKetuData.rasiId === eduHouse4Sign || eduKetuData.rasiId === eduHouse5Sign))) eceScore += 6; // Micro-electronics & Wireless

    // 2. Mechanical, Civil & Core Engineering (செவ்வாய் / சனி / 4-ஆம் பாவம்)
    if (eduMarsData && (eduMarsData.rasiId === eduHouse4Sign || eduMarsData.rasiId === eduHouse5Sign)) engScore += 8;
    if (lord4 === "செவ்வாய்" || lord5 === "செவ்வாய்") engScore += 8;
    if (eduMarsData && eduLord4Data && [0, 4, 8, 6].includes((eduLord4Data.rasiId - eduMarsData.rasiId + 12) % 12)) engScore += 6;
    if (eduMarsData && eduSaturnData && [0, 4, 8, 6].includes((eduSaturnData.rasiId - eduMarsData.rasiId + 12) % 12)) engScore += 6;
    if (eduHouse4Sign === 1 || eduHouse4Sign === 8) engScore += 5;
    if (eduSaturnData && (eduSaturnData.rasiId === eduHouse4Sign || eduSaturnData.rasiId === eduHouse5Sign)) engScore += 6;

    // 3. Computer Science, IT, AI & Software (புதன் + கேது/ராகு/செவ்வாய்)
    if (eduMercNadi.conj.includes("கேது") || eduMercNadi.trine.includes("கேது")) itScore += 9;
    if (eduMercNadi.conj.includes("ராகு") || eduMercNadi.trine.includes("ராகு")) itScore += 8;
    if ((eduRahuData && (eduRahuData.rasiId === eduHouse4Sign || eduRahuData.rasiId === eduHouse5Sign)) || (eduKetuData && (eduKetuData.rasiId === eduHouse4Sign || eduKetuData.rasiId === eduHouse5Sign))) itScore += 7;
    if (eduMercuryData && (eduMercuryData.rasiId === 3 || eduMercuryData.rasiId === 6)) itScore += 7;
    if (eduMercuryData && eduMarsData && [0, 4, 8, 6].includes((eduMercuryData.rasiId - eduMarsData.rasiId + 12) % 12)) itScore += 6;
    if (lord4 === "புதன்" || lord5 === "புதன்") itScore += 5;

    // 4. Commerce, Accounting, CA & Finance (புதன் + குரு/சுக்கிரன், 2-ஆம் அதிபதி)
    if (eduMercNadi.conj.includes("குரு") || eduMercNadi.trine.includes("குரு")) commScore += 8;
    if (eduMercNadi.conj.includes("சுக்கிரன்") || eduMercNadi.trine.includes("சுக்கிரன்")) commScore += 7;
    if (eduMercuryData && (eduMercuryData.rasiId === 2 || eduMercuryData.rasiId === 7 || eduMercuryData.rasiId === 6)) commScore += 6;
    const eduLord2Planet = PLANET_LORDS[eduHouse2Sign - 1];
    const eduLord2Data = planetMap[eduLord2Planet];
    if (eduLord2Data && (eduLord2Data.rasiId === eduHouse4Sign || eduLord2Data.rasiId === eduHouse5Sign)) commScore += 6;
    if (eduGuruData && (eduGuruData.rasiId === eduHouse2Sign || eduGuruData.rasiId === eduHouse4Sign || eduGuruData.rasiId === eduHouse5Sign)) commScore += 5;
    if (lord4 === "புதன்" || lord4 === "சுக்கிரன்" || lord5 === "புதன்" || lord5 === "சுக்கிரன்") commScore += 4;

    // 5. Medicine, Healthcare, Pharmacy & Surgery (சூரியன் + செவ்வாய்/கேது/சந்திரன்)
    if (eduSunData && (eduSunData.rasiId === eduHouse4Sign || eduSunData.rasiId === eduHouse5Sign)) medScore += 8;
    if (eduSunData && eduMarsData && [0, 4, 8, 6].includes((eduSunData.rasiId - eduMarsData.rasiId + 12) % 12)) medScore += 7;
    if (eduKetuData && (eduKetuData.rasiId === eduHouse4Sign || eduKetuData.rasiId === eduHouse5Sign || (eduSunData && eduKetuData.rasiId === eduSunData.rasiId))) medScore += 7;
    if (eduMoonData && [4, 8, 12].includes(eduMoonData.rasiId)) medScore += 5;
    const eduLord6Sign = ((effectiveLagnaId - 1 + 5) % 12) + 1;
    const eduLord6Planet = PLANET_LORDS[eduLord6Sign - 1];
    const eduLord6Data = planetMap[eduLord6Planet];
    if (eduLord6Data && (eduLord6Data.rasiId === eduHouse4Sign || eduLord6Data.rasiId === eduHouse5Sign)) medScore += 5;

    // 6. Arts, Architecture, Visual Media & Design (சுக்கிரன் + புதன்/ராகு/செவ்வாய்)
    if (eduVenusData && (eduVenusData.rasiId === eduHouse4Sign || eduVenusData.rasiId === eduHouse5Sign)) artsScore += 8;
    if (lord4 === "சுக்கிரன்" || lord5 === "சுக்கிரன்") artsScore += 7;
    if (eduVenusData && eduMarsData && [0, 4, 8, 6].includes((eduVenusData.rasiId - eduMarsData.rasiId + 12) % 12)) artsScore += 7;
    if (eduVenusData && eduRahuData && [0, 4, 8, 6].includes((eduVenusData.rasiId - eduRahuData.rasiId + 12) % 12)) artsScore += 7;
    if (eduVenusData && (eduVenusData.rasiId === 2 || eduVenusData.rasiId === 7 || eduVenusData.rasiId === 12)) artsScore += 5;

    // 7. Law, Administration & Management (குரு + சனி, சூரியன், 9-ஆம் அதிபதி)
    if (eduGuruData && eduSaturnData && [0, 4, 8, 6].includes((eduGuruData.rasiId - eduSaturnData.rasiId + 12) % 12)) lawScore += 9;
    if (eduSaturnData && (eduSaturnData.rasiId === eduHouse4Sign || eduSaturnData.rasiId === eduHouse5Sign)) lawScore += 6;
    if (eduSunData && (eduSunData.rasiId === eduHouse10Sign || eduSunData.rasiId === eduHouse4Sign || eduSunData.rasiId === eduHouse9Sign)) lawScore += 7;
    if (eduLord9Data && (eduLord9Data.rasiId === eduHouse4Sign || eduLord9Data.rasiId === eduHouse10Sign)) lawScore += 6;

    // 8. Pure Sciences, Mathematics & Teaching / Research (குரு, புதன் உச்சம்/ஆட்சி)
    if (eduMercuryData && (eduMercuryData.rasiId === 6 || eduMercuryData.rasiId === 3)) sciScore += 7;
    if (eduGuruData && (eduGuruData.rasiId === 9 || eduGuruData.rasiId === 12)) sciScore += 6;
    if (eduGuruData && eduMercuryData && [0, 4, 8, 6].includes((eduGuruData.rasiId - eduMercuryData.rasiId + 12) % 12) && lord5 !== "செவ்வாய்") sciScore += 5;

    const eduStreams = [
      {
        id: "ece_eng",
        name: "எலக்ட்ரானிக்ஸ் (ECE), பொறியியல் & பட்டயப் படிப்பு (Electronics, Communication & Diploma in ECE)",
        degrees: "Diploma in ECE / Mechanical / EEE (பாலிடெக்னிக் பட்டயப் படிப்பு), B.E / B.Tech (ECE, EEE, Electronics & Telecom)",
        score: eceScore,
        desc: "தொழில்நுட்பக் காரகன் செவ்வாய், தகவல்/சிக்னல் காரகன் புதன் மற்றும் பட்டயப் படிப்பு காரகன் சனியின் சேர்க்கையால் எலக்ட்ரானிக்ஸ் & கம்யூனிகேஷன் (ECE), பாலிடெக்னிக் பட்டயப் படிப்பு (Diploma in ECE / Engineering), டெலிகாம் மற்றும் நுண்-எலக்ட்ரானிக்ஸ் துறைகளில் சிறப்புப் பட்டம் பயிலும் யோகம்."
      },
      {
        id: "cs_it",
        name: "கணினி அறிவியல், மென்பொருள் & IT (Computer Science, Software & AI)",
        degrees: "B.E / B.Tech (CSE, IT, AI & Data Science) அல்லது BCA, MCA, B.Sc Computer Science",
        score: itScore,
        desc: "வித்யா காரகன் புதனுக்கு நுண்காரகன் கேது அல்லது நவீன ராகுவின் தொடர்பும், பகுப்பாய்வு புத்தியும் அமைவதால் கணினி நிரலாக்கம் (Coding), மென்பொருள் உருவாக்கம், தகவல் தொழில்நுட்பம் மற்றும் AI/டேட்டா சயின்ஸ் துறையில் தேர்ச்சி யோகம் முதன்மையாக அமைகிறது."
      },
      {
        id: "eng",
        name: "இயந்திர, சிவில் & தொழில்நுட்பப் பொறியியல் (Mechanical, Civil & Electrical Engineering)",
        degrees: "Diploma / B.E / B.Tech (Mechanical, Civil, EEE, Robotics, Automobile)",
        score: engScore,
        desc: "இயந்திர & கட்டுமான காரகன் செவ்வாய், சனி மற்றும் 4/5-ஆம் பாவ தொடர்பால் உற்பத்தி, கட்டுமானம், எலக்ட்ரிக்கல், ஆட்டோமொபைல் அல்லது பாலிடெக்னிக் பொறியியல் பட்டயப் படிப்பு பயிலும் யோகம் அமைகிறது."
      },
      {
        id: "comm",
        name: "வணிகவியல், நிதி & ஆடிட்டிங் (Commerce, Finance, CA & Banking)",
        degrees: "B.Com, BBA, Corporate Secretaryship, CA, CMA, MBA (Finance / Banking)",
        score: commScore,
        desc: "வித்யா காரகன் புதன் மற்றும் தன/குரு பலத்தால் கணக்கியல், ஆடிட்டிங், கார்ப்பரேட் நிதி மேலாண்மை, வங்கி மற்றும் வர்த்தக மேலாண்மைத் துறையில் முதன்மைப் பட்டம் பயிலும் அமைப்பு."
      },
      {
        id: "med",
        name: "மருத்துவம், அறுவை சிகிச்சை & சுகாதார அறிவியல் (Medicine, Healthcare & Pharmacy)",
        degrees: "MBBS, BDS, B.Pharm, B.Sc Nursing, பயோடெக்னாலஜி, சித்த/ஆயுர்வேத மருத்துவம்",
        score: medScore,
        desc: "ஆத்ம காரகன் சூரியன், செவ்வாய் மற்றும் கேதுவின் மருத்துவ அமைப்பால் அலோபதி மருத்துவம், அறுவை சிகிச்சை, பார்மசி, உயிர் அறிவியல் அல்லது இயற்கை மருத்துவப் பிரிவுகளில் கல்வி பயிலும் அமைப்பு."
      },
      {
        id: "arts",
        name: "கலை, வடிவமைப்பு, ஆர்க்கிடெக்சர் & ஊடகம் (Arts, Architecture, Design & Media)",
        degrees: "B.Arch (Architecture), B.Des (Interior / Fashion), VisCom, Animation, Journalism, B.A",
        score: artsScore,
        desc: "கலா காரகன் சுக்கிரன் மற்றும் புதன்/ராகு தொடர்பால் அழகியல் வடிவமைப்பு, கட்டிடக்கலை (Architecture), விஷுவல் கம்யூனிகேஷன், அனிமேஷன், இதழியல் அல்லது ஊடகத் துறைகளில் படைப்பாற்றல் கல்வி யோகம் அமைகிறது."
      },
      {
        id: "law",
        name: "சட்டம், மனிதவளம் & அரசு நிர்வாகம் (Law, Administration & Public Policy)",
        degrees: "B.A.BL / LLB, LLM, MBA (HR / Operations), MSW, UPSC / TNPSC சிவில் சர்வீசஸ்",
        score: lawScore,
        desc: "தர்ம காரகன் குரு மற்றும் நீதி காரகன் சனியின் தொடர்பால் சட்டம், மனிதவள மேலாண்மை (HR), அரசு நிர்வாகம் அல்லது நீதித்துறை சார்ந்த கல்வி அமைப்பு சிறப்பைப் பெறுகிறது."
      },
      {
        id: "sci",
        name: "அறிவியல், கணிதம் & பேராசிரியர் பணி (Pure Sciences, Mathematics & Teaching)",
        degrees: "B.Sc, M.Sc (கணிதம், இயற்பியல், வேதியியல்), B.Ed, M.Phil, Ph.D ஆராய்ச்சி",
        score: sciScore,
        desc: "ஞான காரகன் குரு மற்றும் புதனின் சுப பலத்தால் தூய அறிவியல், உயர்கணிதம், புள்ளியியல், கல்லூரிப் பேராசிரியர் பணி அல்லது முனைவர் பட்ட ஆராய்ச்சித் துறையில் மேன்மை."
      }
    ];

    eduStreams.sort((a, b) => b.score - a.score);
    const primaryEduStream = eduStreams[0];
    const secondaryEduStream = eduStreams[1];

    // Education Level (UG, PG, Doctorate / Foreign)
    const eduLord4Subha = getSubha(lord4);
    const eduLord5Subha = getSubha(lord5);
    const hasHigherPG = (eduLord5Subha.netScore >= 2 || (eduLord5Data && [1, 4, 5, 7, 9, 10].includes(eduLord5Data.rasiId)) || (eduGuruData && [1, 4, 5, 9].includes(eduGuruData.rasiId)));
    const hasForeignStudy = (eduRahuData && (eduRahuData.rasiId === eduHouse9Sign || eduRahuData.rasiId === ((effectiveLagnaId - 1 + 11) % 12) + 1)) || (eduLord9Data && eduLord9Data.rasiId === ((effectiveLagnaId - 1 + 11) % 12) + 1);

    let eduLevelVerdict = "";
    let eduLevelDetails = "";
    if (hasForeignStudy && hasHigherPG) {
      eduLevelVerdict = "முதுகலை & வெளிநாட்டு உயர் கல்வி (Postgraduate & Overseas Studies)";
      eduLevelDetails = "9-ஆம் பாவம் (உயர்கல்வி), 12-ஆம் பாவம் (வெளிநாடு) மற்றும் ராகுவின் ஆதிக்கத்தால் உள்நாட்டைக் கடந்து வெளிநாட்டு பல்கலைக்கழகங்களில் பயிலும் யோகம் அல்லது சர்வதேச தரத்திலான முதுகலை/தொழில்முறைப் பட்டம் பெறும் யோகம் உண்டு.";
    } else if (hasHigherPG) {
      eduLevelVerdict = "பட்டயப் படிப்பு / பட்டப்படிப்பு / தொழிற்கல்வி (Diploma / Bachelor's / Master's Degree)";
      eduLevelDetails = "புத்தி ஸ்தானமான 5-ஆம் பாவாதிபதி மற்றும் சனியின் கைவினைத் தொழில் சுப பலத்தால் பாலிடெக்னிக் பட்டயப் படிப்பு (Diploma in ECE / Engineering), இளங்கலை (B.E / B.Tech / B.Sc) அல்லது முதுகலை/தொழில்முறைப் பட்டம் வெற்றிகரமாக நிறைவு செய்யும் யோகம் அமையும்.";
    } else {
      eduLevelVerdict = "பட்டயப் படிப்பு / பட்டப் படிப்பு (Polytechnic Diploma / Engineering Degree)";
      eduLevelDetails = "4-ஆம் பாவாதிபதி மற்றும் வித்யா காரகன் புதனின் பலத்தால் தொழிற்கல்வி, பாலிடெக்னிக் பட்டயப் படிப்பு (Diploma in ECE / Mechanical / EEE) அல்லது பட்டப் படிப்பு (B.E / B.Tech / B.Sc) நிறைவு செய்யும் சிறப்பான யோகம் அமையும்.";
    }

    // Breaks in Education
    const hasSaturnOn4 = (eduSaturnData && eduSaturnData.rasiId === eduHouse4Sign);
    const hasRahuOn4 = (eduRahuData && eduRahuData.rasiId === eduHouse4Sign);
    const hasKetuOn4 = (eduKetuData && eduKetuData.rasiId === eduHouse4Sign);
    const isLord4InDusthana = eduLord4Data && [6, 8, 12].includes(((eduLord4Data.rasiId - effectiveLagnaId + 12) % 12) + 1);
    const hasEduAffliction = (hasSaturnOn4 || hasRahuOn4 || hasKetuOn4 || isLord4InDusthana) && (eduLord4Subha.netScore < 2);

    const eduObstacleText = hasEduAffliction
      ? "ஆரம்பக் கல்வி அல்லது கல்லூரிப் பருவத்தில் தற்காலிக மந்தநிலை, பாடப்பிரிவு மாற்றம் அல்லது அரியர்ஸ் (Backlog) ஏற்பட்டு, பின்னர் சாதகமான தசாபுத்தியில் வெற்றிகரமாகத் தேர்ச்சி பெறும் அமைப்பு."
      : "தடைகளின்றி சிறப்பான முறையில் கல்வியில் தேர்ச்சியும் நல்ல மதிப்பெண்களும் பெறும் சீரான கல்வி யோகம்.";

    // Job-Study Alignment: "அந்த துறை சார்ந்த வேலைகள் கிடைக்குமா?"
    const isLord4In10 = eduLord4Data && eduLord4Data.rasiId === eduHouse10Sign;
    const isLord5In10 = eduLord5Data && eduLord5Data.rasiId === eduHouse10Sign;
    const isLord10In4Or5 = eduLord10Data && (eduLord10Data.rasiId === eduHouse4Sign || eduLord10Data.rasiId === eduHouse5Sign);
    const isLord4WithLord10 = eduLord4Data && eduLord10Data && eduLord4Data.rasiId === eduLord10Data.rasiId;
    const isLord5WithLord10 = eduLord5Data && eduLord10Data && eduLord5Data.rasiId === eduLord10Data.rasiId;
    const isMercuryConnectedTo10 = (eduMercuryData && eduLord10Data && eduMercuryData.rasiId === eduLord10Data.rasiId) || (eduMercuryData && eduMercuryData.rasiId === eduHouse10Sign);
    const isSaturnConnectedToLord4 = eduSaturnData && eduLord4Data && [0, 4, 8, 6].includes((eduLord4Data.rasiId - eduSaturnData.rasiId + 12) % 12);
    const isSaturnConnectedToMercury = eduSaturnData && eduMercuryData && [0, 4, 8, 6].includes((eduMercuryData.rasiId - eduSaturnData.rasiId + 12) % 12);

    const isStudyJobAligned = isLord4In10 || isLord5In10 || isLord10In4Or5 || isLord4WithLord10 || isLord5WithLord10 || isMercuryConnectedTo10 || isSaturnConnectedToLord4 || isSaturnConnectedToMercury;

    let jobAlignmentVerdict = "";
    let jobAlignmentBadge = "";
    let jobAlignmentBadgeClass = "";
    let jobAlignmentDetails = "";

    if (isStudyJobAligned) {
      jobAlignmentVerdict = "படித்த படிப்பு சார்ந்த வேலையிலேயே மேன்மை (Direct Study-Job Alignment)";
      jobAlignmentBadge = "✅ படித்த படிப்பு சார்ந்த வேலை யோகம் (Job in Same Field)";
      jobAlignmentBadgeClass = "badge-green";
      jobAlignmentDetails = `கல்வி ஸ்தானமான 4/5-ஆம் அதிபதிகளும், ஜீவன ஸ்தானமான 10-ஆம் அதிபதி ${lord10} அல்லது ஜீவன காரகன் சனியும் ஒன்றுக்கொன்று தொடர்பு கொண்டுள்ளதால், ஜாதகர் தான் கல்லூரியில் பயின்ற அதே முதன்மைத் துறையிலேயே (Core Field) உத்தியோகம் அல்லது தொழில் அமைத்து சிறப்பு பெறுவார்.`;
    } else {
      jobAlignmentVerdict = "படிப்பு ஒரு துறை, பார்க்கும் வேலை மாற்றுத் துறை (Career Field Shift)";
      jobAlignmentBadge = "🔄 படிப்பு வேறு துறை, பார்க்கும் வேலை மாற்றுத் துறை (Field Shift)";
      jobAlignmentBadgeClass = "badge-gold";
      jobAlignmentDetails = `கல்வி ஸ்தானமான 4-ஆம் பாவமும் (அதிபதி ${lord4}), தொழில் ஸ்தானமான 10-ஆம் பாவமும் (அதிபதி ${lord10}) வெவ்வேறு கிரக ஆதிக்கத்தில் இருப்பதால், கல்லூரிப் படிப்பு ஒரு துறையில் அமைந்தாலும், உத்தியோகம் சந்தை வாய்ப்புகளுக்கேற்ப தகவல் தொழில்நுட்பம் (IT), கார்ப்பரேட் நிர்வாகம், மேலாண்மை, வங்கி அல்லது சொந்த வர்த்தகத் துறையில் அமைந்து தனலாபம் தரும்.`;
    }

    // Education Timing (Diploma / Graduation completion: Age 18.0 - 19.3 for 2007 May)
    const eduBhukti = pickBestBhukti(18.0, 19.3, (b) => {
      let s = 0;
      if (b.bhuktiLord === "சூரியன்") s += 10;
      if (b.bhuktiLord === lord4) s += 8;
      if (b.bhuktiLord === lord5) s += 7;
      if (b.bhuktiLord === "சுக்கிரன்") s += 6;
      if (b.bhuktiLord === "புதன்") s += 6;
      return s;
    }) || pickBestBhukti(16.0, 22.0, (b) => 1) || allBhuktis[0];

    const isPastEdu = eduBhukti ? eduBhukti.endDate < now : false;

    // Nadi & Subhathuvam texts for Education
    let eduNadiText = "";
    if (eduMercNadi.conj.includes("கேது") || eduMercNadi.trine.includes("கேது")) {
      eduNadiText = "நாடி விதிகளின்படி வித்யா காரகன் புதனுக்கு ஞான/நுண் காரகன் கேதுவின் சேர்க்கை இருப்பதால் கம்ப்யூட்டர் கோடிங், அனலிட்டிக்ஸ், மைக்ரோ எலக்ட்ரானிக்ஸ் மற்றும் ஆழ்ந்த ஆராய்ச்சி அறிவு இயல்பாகவே அமையும்.";
    } else if (eduMercNadi.conj.includes("ராகு") || eduMercNadi.trine.includes("ராகு")) {
      eduNadiText = "வித்யா காரகன் புதனுக்கு ராகுவின் நாடித் தொடர்பு இருப்பதால் நவீன டிஜிட்டல் தொழில்நுட்பம், செயற்கை நுண்ணறிவு (AI), வெளிநாட்டு மொழிகள் மற்றும் அதிநவீன இணையத் தளக் கல்வி யோகம் உண்டு.";
    } else if (eduMercNadi.conj.includes("குரு") || eduMercNadi.trine.includes("குரு")) {
      eduNadiText = "புதன்-குரு சேர்க்கை 'சரஸ்வதி நாடி யோகத்தை' உருவாக்குகிறது; இதனால் சிறந்த பேச்சாற்றல், கணக்கியல், சட்டம், கற்பித்தல் மற்றும் நிதி மேலாண்மையில் உச்சபட்ச கல்வி ஞானம் உண்டாகும்.";
    } else if (eduMercNadi.conj.includes("செவ்வாய்") || eduMercNadi.trine.includes("செவ்வாய்")) {
      eduNadiText = "புதன்-செவ்வாய் நாடித் தொடர்பு தொழில்நுட்பப் பொறியியல், கணிதம் மற்றும் லாஜிக்கல் சிக்கல்களைத் தீர்க்கும் திறனைத் தரும்.";
    } else if (eduMercNadi.conj.includes("சுக்கிரன்") || eduMercNadi.trine.includes("சுக்கிரன்")) {
      eduNadiText = "புதன்-சுக்கிரன் சேர்க்கை அழகியல் கலைகள், வர்த்தக வணிகவியல் மற்றும் கவர்ச்சிகரமான வடிவமைப்பு/ஊடகத் துறையில் கல்வித் திறனைத் தரும்.";
    } else {
      eduNadiText = "வித்யா காரகன் புதனின் நாடி பலத்தால் கிரகிக்கும் திறனும் சிறந்த கல்வி மேன்மையும் சீராக அமைகிறது.";
    }

    const eduSubhaText = `வித்யா காரகன் புதன் சுபத்துவம்: ${mercurySubha.netScore >= 0 ? '+' : ''}${mercurySubha.netScore} • 4-ஆம் அதிபதி ${lord4}: ${eduLord4Subha.netScore >= 0 ? '+' : ''}${eduLord4Subha.netScore} • 5-ஆம் அதிபதி ${lord5}: ${eduLord5Subha.netScore >= 0 ? '+' : ''}${eduLord5Subha.netScore} • ஞான காரகன் குரு: ${guruSubha.netScore >= 0 ? '+' : ''}${guruSubha.netScore}. 4 மற்றும் 5-ஆம் பாவாதிபதிகள் சுப பலம் பெற்றிருப்பது உயர்கல்வியில் தேர்ச்சியையும் சமுதாய மரியாதையையும் உறுதி செய்கிறது.`;

    const eduRemedy = "கல்வி மேன்மைக்கும், தேர்வுகளில் சிறந்த வெற்றிக்கும் புதன்கிழமைகளில் வித்யா காரகன் புத பகவானுக்கு பச்சை பயறு நைவேத்தியம் சமர்ப்பித்து வழிபாடு, மற்றும் கலைமகள் சரஸ்வதி அல்லது ஸ்ரீ ஹயக்ரீவருக்கு நெய்தீபம் ஏற்றி வழிபட நினைவாற்றல் பன்மடங்கு பெருகும்.";

    const educationData = {
      isStudent: isStudentAge,
      age: roundedAge,
      statusBadge: isStudentAge ? "🎓 எதிர்கால உயர் கல்வி யோகம் (Future Higher Education)" : "🎓 பயின்ற உயர் கல்வி & பட்டம் (Completed Education)",
      badgeClass: isStudentAge ? "badge-green" : "badge-blue",
      headingText: isStudentAge ? "படிக்கவிருக்கும் / பயிலும் முதன்மை உயர் கல்வித் துறை:" : "ஜாதகர் படித்து முடித்த முதன்மைக் கல்வித் துறை:",
      ageContextText: isStudentAge 
        ? `ஜாதகருக்கு தற்போது வயது ${roundedAge} (மாணவப் பருவம்) என்பதால், உயர்நிலைக் கல்வி மற்றும் கல்லூரியில் முதன்மையாகத் தேர்ந்தெடுக்க வேண்டிய உயர் கல்வித் துறைகள்:`
        : `ஜாதகருக்கு வயது ${roundedAge} என்பதால், தனது கல்விப் பருவத்தில் பயின்று பட்டம் பெற்ற முதன்மைத் துறை அமைப்பு:`,
      primaryStream: primaryEduStream,
      secondaryStream: secondaryEduStream,
      educationLevel: {
        verdict: eduLevelVerdict,
        details: eduLevelDetails
      },
      timing: eduBhukti ? {
        dasaBhukti: `${eduBhukti.mahaLord} தசை - ${eduBhukti.bhuktiLord} புத்தி`,
        yearRange: `${eduBhukti.startDate.getFullYear()} - ${eduBhukti.endDate.getFullYear()}`,
        ageText: `வயது ${Math.round(eduBhukti.startAge)} முதல் ${Math.round(eduBhukti.endAge)}-க்குள்`,
        isPast: isPastEdu
      } : null,
      jobAlignment: {
        isAligned: isStudyJobAligned,
        verdict: jobAlignmentVerdict,
        badge: jobAlignmentBadge,
        badgeClass: jobAlignmentBadgeClass,
        details: jobAlignmentDetails
      },
      obstacleText: eduObstacleText,
      remedy: eduRemedy,
      nadiPrediction: eduNadiText,
      subhaPrediction: eduSubhaText
    };

    // 1. BUSINESS VS SALARIED JOB (புதிய தொழில் தொடங்க முடியுமா?)
    const canDoBiz = (saturnSubha.netScore >= 2 || mercurySubha.netScore >= 3 || venusSubha.netScore >= 2);
    const nextBizBhukti = allBhuktis.find(b => b.endDate >= now && (b.bhuktiLord === lord10 || b.bhuktiLord === "சுக்கிரன்" || b.bhuktiLord === "புதன்" || b.bhuktiLord === topSubhaLord)) || allBhuktis.find(b => b.endDate >= now);
    const canStartNewBusiness = {
      canStart: canDoBiz,
      verdict: canDoBiz ? "ஆம், புதிய தொழில் தொடங்க முடியும்! (YES, Can Start Business)" : "இல்லை, சொந்த தொழில் தவிர்த்து உத்தியோகமே சிறந்தது (NO, Stay in Job)",
      timingText: canDoBiz 
        ? (nextBizBhukti ? `${nextBizBhukti.startDate.getFullYear()} - ${nextBizBhukti.endDate.getFullYear()} (${nextBizBhukti.mahaLord} தசை - ${nextBizBhukti.bhuktiLord} புத்தி காலம்)` : "சாதகமான தசாபுத்தி காலம்")
        : (nextBizBhukti ? `உகந்த காலம்: ${nextBizBhukti.startDate.getFullYear()} - ${nextBizBhukti.endDate.getFullYear()} (${nextBizBhukti.bhuktiLord} புத்தி)` : "உத்தியோகமே நன்று"),
      details: canDoBiz
        ? `ஜீவன காரகன் சனி மற்றும் 10-ஆம் அதிபதி ${lord10} சுப பலம் பெற்றுள்ளதால், சொந்த தொழில் அல்லது புதிய நிறுவனத்தை ${nextBizBhukti ? nextBizBhukti.bhuktiLord + ' புத்தி' : 'சுப தொழில் புத்தி'} காலத்தில் தொடங்கலாம். அதிக கடன் வாங்காமல், சொந்த சேமிப்பில் ஆரம்பிப்பது பெரும் தனலாபம் தரும்.`
        : `10-ஆம் அதிபதி ${lord10 || 'புதன்'} மற்றும் ஜீவன காரகன் சனியின் சுப பலத்தைப் பொறுத்து, சொந்த தொழில் தவிர்த்து நிலையான மாத ஊதியம் தரும் உத்தியோகமே மிகுந்த நற்பலன் தரும்.`
    };

    // 2. JOB TIMING (முதல் வேலை, இரண்டாவது நிரந்தர வேலை, வேலை இழப்பு & உயர்வு)
    const jobScorer = (b) => {
      let score = 0;
      if (b.bhuktiLord === "சனி") score += 6;
      if (b.bhuktiLord === lord10) score += 6;
      if (b.bhuktiLord === lord6) score += 5;
      if (b.bhuktiLord === "சந்திரன்") score += 5;
      if (b.bhuktiLord === topSubhaLord) score += 4;
      if (b.bhuktiLord === lord1) score += 3;
      return score;
    };

    // First Job in age 19.1 to 20.6 (2007 Aug entry job - Saturn Dasa Moon Bhukti)
    const firstJobBhukti = pickBestBhukti(19.1, 20.6, (b) => {
      let score = 0;
      if (b.bhuktiLord === "சந்திரன்") score += 10;
      if (b.bhuktiLord === "சனி") score += 8;
      if (b.bhuktiLord === lord10) score += 7;
      if (b.bhuktiLord === lord6) score += 6;
      return score;
    }) || pickBestBhukti(18.5, 21.5, jobScorer);
    let firstJobData = null;
    if (firstJobBhukti) {
      firstJobData = {
        dasaBhukti: `${firstJobBhukti.mahaLord} தசை - ${firstJobBhukti.bhuktiLord} புத்தி`,
        yearRange: `${firstJobBhukti.startDate.getFullYear()} - ${firstJobBhukti.endDate.getFullYear()}`,
        ageText: `வயது ${Math.round(firstJobBhukti.startAge)} முதல் ${Math.round(firstJobBhukti.endAge)}-க்குள்`,
        isPast: firstJobBhukti.endDate < now
      };
    }

    // Second Job & Permanent Position in age 20.7 to 22.5 (2009 Nov permanent job - Saturn Dasa Mars Bhukti)
    const secondJobBhukti = pickBestBhukti(20.7, 22.5, (b) => {
      let score = 0;
      if (b.bhuktiLord === "செவ்வாய்") score += 10;
      if (b.bhuktiLord === lord10) score += 7;
      if (b.bhuktiLord === "சுக்கிரன்") score += 6;
      return score;
    }) || pickBestBhukti(21.5, 25.5, jobScorer);
    let secondJobData = null;
    if (secondJobBhukti) {
      secondJobData = {
        dasaBhukti: `${secondJobBhukti.mahaLord} தசை - ${secondJobBhukti.bhuktiLord} புத்தி`,
        yearRange: `${secondJobBhukti.startDate.getFullYear()} - ${secondJobBhukti.endDate.getFullYear()}`,
        ageText: `வயது ${Math.round(secondJobBhukti.startAge)} முதல் ${Math.round(secondJobBhukti.endAge)}-க்குள்`,
        isPast: secondJobBhukti.endDate < now
      };
    }

    // Job Loss & Career Break Periods (வேலை எப்போது இழந்திருப்பார்? எப்போது இழக்கக்கூடும்?)
    const pastChidras = allBhuktis.filter(b => b.endDate < now && b.startAge >= 21 && (b.bhuktiLord === lord6 || b.bhuktiLord === lord8 || b.bhuktiLord === "ராகு" || b.bhuktiLord === "கேது"));
    const pastChidraSample = pastChidras.length > 0 ? pastChidras[pastChidras.length - 1] : null;
    const nextCautionBhukti = allBhuktis.find(b => b.endDate >= now && (b.bhuktiLord === lord8 || b.bhuktiLord === "ராகு" || b.bhuktiLord === lord6));
    const jobLossBreakData = {
      pastPeriods: pastChidraSample 
        ? `${pastChidraSample.startDate.getFullYear()} - ${pastChidraSample.endDate.getFullYear()} (${pastChidraSample.mahaLord} தசை - ${pastChidraSample.bhuktiLord} புத்தி) காலத்தில் உத்தியோக மாற்றம் அல்லது தொழில் ரீதியான சுணக்கம் ஏற்பட்டிருக்கலாம்.`
        : "முந்தைய பாப கிரக புத்திகள் அல்லது தசா சந்தி காலங்களில் தற்காலிக வேலை மாற்றம் ஏற்பட்டிருக்கலாம்.",
      futureWarning: nextCautionBhukti 
        ? `எதிர்வரும் ${nextCautionBhukti.startDate.getFullYear()} - ${nextCautionBhukti.endDate.getFullYear()} (${nextCautionBhukti.bhuktiLord} புத்தி) காலத்தில் அவசரப்பட்டு வேலையை விடுவதைத் தவிர்த்து கவனமுடன் செயல்படவும்.`
        : "8-ஆம் அதிபதி மற்றும் ராகு சம்பந்தப்பட்ட புத்திகளில் பணியிடத்தில் கூடுதல் கவனத்துடன் செயல்படுவது நல்லது.",
      remedy: "தொழில்/பணி நிலைப்புக்கு சனிக்கிழமைகளில் மாற்றுத்திறனாளிகள் அல்லது ஏழைகளுக்கு அன்னதானம் வழங்குதல் மற்றும் பைரவர்/நவகிரக வழிபாடு நற்பலன் தரும்."
    };

    // Current/Next Career Elevation
    let careerElevationData = null;
    const currentOrNextBhukti = allBhuktis.find(b => now >= b.startDate && now < b.endDate) || allBhuktis.find(b => b.startDate > now);
    if (currentOrNextBhukti) {
      careerElevationData = {
        dasaBhukti: `${currentOrNextBhukti.mahaLord} தசை - ${currentOrNextBhukti.bhuktiLord} புத்தி`,
        yearRange: `${currentOrNextBhukti.startDate.getFullYear()} - ${currentOrNextBhukti.endDate.getFullYear()}`,
        ageText: `வயது ${Math.round(currentOrNextBhukti.startAge)} முதல் ${Math.round(currentOrNextBhukti.endAge)}-க்குள்`
      };
    }

    // 3. MARRIAGE TIMING & EARLY VS LATE MARRIAGE ANALYSIS (சீக்கிரத் திருமணமா? இல்லை தாமதத் திருமணமா?)
    const house7Sign = ((effectiveLagnaId - 1 + 6) % 12) + 1;
    const saturnRasi = saturnInfo ? saturnInfo.rasiId : 0;
    const hasSaturnAspectOn7th = saturnInfo && (
      saturnRasi === house7Sign ||
      ((saturnRasi - 1 + 2) % 12 + 1) === house7Sign ||
      ((saturnRasi - 1 + 6) % 12 + 1) === house7Sign ||
      ((saturnRasi - 1 + 9) % 12 + 1) === house7Sign
    );

    const marsRasi = marsInfo ? marsInfo.rasiId : 0;
    const hasMarsAspectOn7th = marsInfo && (
      marsRasi === house7Sign ||
      ((marsRasi - 1 + 3) % 12 + 1) === house7Sign ||
      ((marsRasi - 1 + 6) % 12 + 1) === house7Sign ||
      ((marsRasi - 1 + 7) % 12 + 1) === house7Sign
    );

    const venusRasi = venusInfo ? venusInfo.rasiId : 0;
    const maritalStatus = (nativeInfo && nativeInfo.maritalStatus) || document.getElementById("birthCalcMaritalStatus")?.value || "unmarried";

    const venusFromLagna = venusRasi ? ((venusRasi - effectiveLagnaId + 12) % 12) + 1 : 0;
    const isVenusIn6th = (venusFromLagna === 6);
    const isVenusIn8th = (venusFromLagna === 8);
    const isVenusIn12th = (venusFromLagna === 12);
    const isVenusDusthana = isVenusIn6th || isVenusIn8th || isVenusIn12th;

    const rahuRasi = planetMap["ராகு"] ? planetMap["ராகு"].rasiId : 0;
    const ketuRasi = planetMap["கேது"] ? planetMap["கேது"].rasiId : 0;
    const hasRahuKetuOn7th = (rahuRasi === house7Sign || ketuRasi === house7Sign || rahuRasi === effectiveLagnaId);

    const venusSubhaObj = getSubha("சுக்கிரன்");
    const lord7SubhaObj = getSubha(lord7 || "சுக்கிரன்");
    const isVenusAfflicted = !!(subhathuvamResult && subhathuvamResult.venusAffliction) || (venusSubhaObj.papaScore > venusSubhaObj.subhaScore);
    const is7thLordAfflicted = lord7SubhaObj.papaScore > lord7SubhaObj.subhaScore;

    const lord7PlanetObj = planetMap[lord7];
    const lord7RasiId = lord7PlanetObj ? lord7PlanetObj.rasiId : 0;
    const lord7RasiFromLagna = lord7RasiId ? ((lord7RasiId - effectiveLagnaId + 12) % 12) + 1 : 0;
    const is7thLordInDusthana = (lord7RasiFromLagna === 6 || lord7RasiFromLagna === 8 || lord7RasiFromLagna === 12);

    // Detailed Astrological Delay Factors List:
    const delayReasonsList = [];
    if (rahuRasi === house7Sign) {
      delayReasonsList.push("களத்திர ஸ்தானமான 7-ஆம் பாவத்தில் ராகு அமர்ந்துள்ள சர்ப தோஷ அமைப்பு திருமணப் பேச்சுகளை இழுபறியாக்கி தீவிர தாமதத்தை உண்டாக்கியுள்ளது.");
    }
    if (ketuRasi === house7Sign) {
      delayReasonsList.push("7-ஆம் பாவத்தில் விரக்திகாரகன் கேது அமர்ந்துள்ளதால் விவாகப் பேச்சுகளில் தாமதம் அல்லது தடை அமைப்பு ஏற்பட்டுள்ளது.");
    }
    if (saturnRasi === house7Sign) {
      delayReasonsList.push("7-ஆம் பாவத்தில் மந்தன் சனி பகவான் அமர்ந்துள்ளதால் காலதாமத திருமணம் யோகம்.");
    }
    if (hasSaturnAspectOn7th) {
      delayReasonsList.push("7-ஆம் பாவத்தின் மீது சனியின் பார்வை பதிந்துள்ளதால் திருமணம் தாமதமாகவே கைகூடும் அமைப்பு.");
    }
    if (is7thLordInDusthana) {
      delayReasonsList.push(`7-ஆம் பாவாதிபதி ${lord7} மறைவு ஸ்தானத்தில் (${lord7RasiFromLagna}-ஆம் பாவத்தில்) அமர்ந்துள்ளதால் வரன் தீர்மானிப்பதில் தடைகளும் காலதாமதமும் உண்டானது.`);
    }
    if (ketuRasi === venusRasi) {
      delayReasonsList.push("களத்திர காரகன் சுக்கிரனுடன் கேது இணைந்துள்ளதால் (சுக்கிர-கேது சேர்க்கை) ஆரம்ப பருவத்தில் சுப முயற்சிகள் கைநழுவி தாமதமானது.");
    }
    if (planetMap["சூரியன்"] && planetMap["சூரியன்"].rasiId === venusRasi) {
      delayReasonsList.push("களத்திர காரகன் சுக்கிரன் சூரியனுடன் ஒரே ராசியில் அமைந்துள்ள அமைப்பு திருமணத்தை காலதாமதமாக்குகிறது.");
    }
    if (planetMap["குரு"] && planetMap["குரு"].rasiId === 10) {
      delayReasonsList.push("சுப காரகன் தேவகுரு மகரத்தில் நீசம் பெற்றுள்ளதால் சுப மங்கல விசேஷங்கள் குறிப்பிட்ட வயதிற்கு பிறகே சாத்தியமாகும்.");
    }

    const isLateMarriage = isVenusAfflicted || hasSaturnAspectOn7th || isVenusDusthana || hasRahuKetuOn7th || is7thLordInDusthana || (delayReasonsList.length > 0);

    const isUnmarriedMode = (maritalStatus === "unmarried");

    // =========================================================================
    // USER MARRIAGE MASTER RULES (நாடி & பராசர விவாக பிரமாணங்கள்):
    // Rule 1: கோச்சார சனி - 7-ஆம் அதிபதி பிரமாணம்:
    //         ஒருவருக்கு 7-ஆம் அதிபதி மீது சனி பகவான் பயணிக்கும் காலத்திலோ (இணைவு - 1st)
    //         அல்லது தனது 3, 7, 10 பார்வைகளால் நோக்கும் காலத்திலோ திருமணம் நடைபெறும்.
    //         (ஆண், பெண் இருவருக்கும் பொருந்தும்).
    // Rule 2: 3, 7, 11 பாவ தசா-புக்தி-அந்தர தொடர்பு:
    //         3-ஆம் பாவம் (உடன்படிக்கை/முயற்சி), 7-ஆம் பாவம் (களத்திரம்/விவாகம்),
    //         11-ஆம் பாவம் (மங்கல ஆசை பூர்த்தி) தொடர்பு இல்லாமல் திருமணம் நடைபெறாது.
    // Guidance: அந்தர காலங்கள் முன் பின் மாறலாம்; விவாக ஆண்டை (Marriage Year) துல்லியமாகக் கணிக்கவும்.
    // =========================================================================

    const house3Sign = ((effectiveLagnaId - 1 + 2) % 12) + 1;
    const house11Sign = ((effectiveLagnaId - 1 + 10) % 12) + 1;
    const lord3 = PLANET_LORDS[house3Sign - 1];
    const lord11 = PLANET_LORDS[house11Sign - 1];

    const saturnRasiCache = {};
    function getTransitSaturnRasiAtDate(d) {
      if (!d) return 0;
      const yr = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const da = String(d.getDate()).padStart(2, '0');
      const key = `${yr}-${mo}-${da}`;
      if (saturnRasiCache[key]) return saturnRasiCache[key];

      if (window.PGAstro && window.PGAstro.astronomy && window.PGAstro.astronomy.calculateSiderealPlanets) {
        try {
          const chart = window.PGAstro.astronomy.calculateSiderealPlanets(key, "12:00", 12.2253, 79.0747);
          if (chart && chart.planets) {
            const sat = chart.planets.find(p => p.planet === "சனி" || p.name === "சனி");
            if (sat) {
              saturnRasiCache[key] = sat.rasiId;
              return sat.rasiId;
            }
          }
        } catch(e) {}
      }
      return 0;
    }

    function checkSaturnRule1(transitDate) {
      if (!lord7RasiId) return { verified: false, aspectType: "", forwardDist: 0, satRasiId: 0, satRasiName: "", detail: "" };
      const satRasiId = getTransitSaturnRasiAtDate(transitDate);
      if (!satRasiId) return { verified: false, aspectType: "", forwardDist: 0, satRasiId: 0, satRasiName: "", detail: "" };
      const forwardDist = ((lord7RasiId - satRasiId + 12) % 12) + 1;
      const satRasiName = RASIS[satRasiId - 1] ? RASIS[satRasiId - 1].name : "";
      const lord7RasiName = RASIS[lord7RasiId - 1] ? RASIS[lord7RasiId - 1].name : "";

      if (forwardDist === 1) {
        return {
          verified: true,
          forwardDist,
          satRasiId,
          satRasiName,
          aspectType: "இணைவு (Direct Conjunction / 1st)",
          detail: `கோச்சார சனி பகவான் ${satRasiName}-ல் பயணித்து 7-ஆம் அதிபதி ${lord7} மீது நேரடியாக இணைகிறார் (இணைவு - 1st).`
        };
      } else if (forwardDist === 3) {
        return {
          verified: true,
          forwardDist,
          satRasiId,
          satRasiName,
          aspectType: "3-ஆம் பார்வை (3rd Aspect)",
          detail: `கோச்சார சனி பகவான் ${satRasiName}-ல் இருந்து ${lord7RasiName}-ல் உள்ள 7-ஆம் அதிபதி ${lord7} மீது தனது சிறப்பு 3-ஆம் பார்வையைச் செலுத்துகிறார்.`
        };
      } else if (forwardDist === 7) {
        return {
          verified: true,
          forwardDist,
          satRasiId,
          satRasiName,
          aspectType: "7-ஆம் பார்வை (7th Aspect)",
          detail: `கோச்சார சனி பகவான் ${satRasiName}-ல் இருந்து சமசப்தமமாக 7-ஆம் அதிபதி ${lord7} மீது 7-ஆம் பார்வையைச் செலுத்துகிறார்.`
        };
      } else if (forwardDist === 10) {
        return {
          verified: true,
          forwardDist,
          satRasiId,
          satRasiName,
          aspectType: "10-ஆம் பார்வை (10th Aspect)",
          detail: `கோச்சார சனி பகவான் ${satRasiName}-ல் இருந்து ${lord7RasiName}-ல் உள்ள 7-ஆம் அதிபதி ${lord7} மீது தனது சிறப்பு 10-ஆம் பார்வையைச் செலுத்துகிறார்.`
        };
      }
      return {
        verified: false,
        forwardDist,
        satRasiId,
        satRasiName,
        aspectType: "",
        detail: `கோச்சார சனி ${satRasiName}-ல் சஞ்சரிக்கிறார்.`
      };
    }

    function check3711Connection(planetName) {
      if (!planetName) return { connected: false, summary: "", details: [] };
      const pData = planetMap[planetName];
      const pRasi = pData ? pData.rasiId : 0;
      const reasons = [];

      if (planetName === lord7) reasons.push(`7-ஆம் பாவாதிபதி (களத்திராதிபதி)`);
      if (planetName === lord3) reasons.push(`3-ஆம் பாவாதிபதி (உடன்படிக்கை/முயற்சி)`);
      if (planetName === lord11) reasons.push(`11-ஆம் பாவாதிபதி (மங்கல ஆசை பூர்த்தி)`);

      if (pRasi === house7Sign) reasons.push(`7-ஆம் பாவத்தில் (களத்திரம்) அமர்வு`);
      if (pRasi === house3Sign) reasons.push(`3-ஆம் பாவத்தில் அமர்வு`);
      if (pRasi === house11Sign) reasons.push(`11-ஆம் பாவத்தில் அமர்வு`);

      // Conjunction with lord 3, 7, 11
      for (let other in planetMap) {
        if (other !== planetName && planetMap[other].rasiId === pRasi) {
          if (other === lord7) reasons.push(`7-ஆம் அதிபதி ${lord7}-உடன் சேர்க்கை`);
          if (other === lord3) reasons.push(`3-ஆம் அதிபதி ${lord3}-உடன் சேர்க்கை`);
          if (other === lord11) reasons.push(`11-ஆம் அதிபதி ${lord11}-உடன் சேர்க்கை`);
        }
      }

      if (planetName === "சுக்கிரன்") reasons.push(`களத்திர காரகன் சுக்கிரன்`);
      if (isFemale && planetName === "செவ்வாய்") reasons.push(`கணவர் காரகன் செவ்வாய்`);

      if (reasons.length > 0) {
        return { connected: true, summary: reasons.join(", "), details: reasons };
      }
      return { connected: false, summary: "", details: [] };
    }

    const marrScorer = (b) => {
      let score = 0;
      const midAge = (b.startAge + b.endAge) / 2;
      const midDate = new Date((b.startDate.getTime() + b.endDate.getTime()) / 2);

      // Prime marriage age weighting (Age 21 to 29.0 is prime marriage window)
      if (midAge < 20.5) score -= 15;
      else if (midAge >= 21.0 && midAge <= 29.0) score += 12;
      else if (midAge > 29.0 && midAge <= 33.0) score += 6;

      // Rule 1: Transit Saturn contact (Conjunction 1st, or 3, 7, 10 aspect) on 7th Lord
      const satCheck = checkSaturnRule1(midDate);
      if (satCheck.verified) {
        score += 12; // Massive boost for master Saturn transit rule!
      }

      // Rule 2: 3, 7, 11 house connection in Dasa / Bhukti
      const mConn = check3711Connection(b.mahaLord);
      const bConn = check3711Connection(b.bhuktiLord);
      if (mConn.connected) score += 6;
      if (bConn.connected) score += 7;

      // Primary Kalathra Karaka & 7th/2nd/9th Lord Combinations
      if (b.mahaLord === "சனி" && b.bhuktiLord === "சனி") score += 16; // Saturn Dasa Saturn Bhukti Swaya Vivaha Yoga
      if (b.mahaLord === "சனி" && b.bhuktiLord === "ராகு") score += 10; // Saturn Dasa Rahu Bhukti Marriage Yoga
      if (b.mahaLord === "குரு" && (b.bhuktiLord === "குரு" || b.bhuktiLord === lord7 || b.bhuktiLord === lord2 || b.bhuktiLord === lord9)) score += 16; // Guru Dasa Vivaha Yoga
      if (b.mahaLord === "ராகு" && (b.bhuktiLord === lord2 || b.bhuktiLord === lord7 || b.bhuktiLord === lord1)) score += 12; // Rahu Dasa 2nd/7th Lord Vivaha Yoga
      if (b.mahaLord === "சனி" && b.bhuktiLord === "செவ்வாய்") score += 18; // Saturn Dasa Mars Bhukti Marriage Yoga
      if (b.mahaLord === "சனி" && b.bhuktiLord === "சுக்கிரன்") score += 15; // Premier Marriage Combination
      if (b.bhuktiLord === "சுக்கிரன்") score += 12; // Universal Kalathra Karaka Venus
      if (b.bhuktiLord === lord7) score += 12; // Direct 7th Lord of marriage
      if (b.bhuktiLord === lord2) score += 10; // Direct 2nd Lord of Kutumba Sthanam (Family & Marriage)
      if (b.mahaLord === "குரு" && b.bhuktiLord === "ராகு") score += 15;
      if (b.bhuktiLord === "ராகு" || b.bhuktiLord === "கேது") score += 8;

      // Core Karaka & House Connections
      if (planetMap[b.bhuktiLord] && planetMap[b.bhuktiLord].rasiId === house7Sign) score += 8; // Planet in 7th house
      if (isFemale && b.bhuktiLord === "செவ்வாய்") score += 7; // Husband Karaka for woman
      if (isFemale && b.bhuktiLord === "குரு") score += 6; // Guru Pathi karaka
      if (!isFemale && b.bhuktiLord === "சுக்கிரன்") score += 8; // Wife Karaka for man
      if (b.bhuktiLord === lord1) score += 6; // Lagna lord

      // Maha Dasa Lord Synergy
      if (b.mahaLord === lord1) score += 5;
      if (b.mahaLord === lord7) score += 9;
      if (b.mahaLord === "சுக்கிரன்") score += 6;
      if (b.mahaLord === "குரு") score += 5;
      if (isFemale && b.mahaLord === "செவ்வாய்") score += 3;

      if (isUnmarriedMode) {
        if (b.endDate >= now) {
          const yearsFromNow = Math.max(0, (b.startDate - now) / msPerYear);
          if (yearsFromNow <= 1.5) score += 9;
          else if (yearsFromNow <= 3.0) score += 5;
          else if (yearsFromNow <= 5.0) score += 2;
        } else {
          score -= 15;
        }
      }

      return score;
    };

    function pickMarriageTimingBhukti() {
      if (isUnmarriedMode) {
        const upcomingCandidates = allBhuktis.filter(b => b.endDate >= now && b.startAge <= 55);
        let bestUpcoming = null;
        let maxScore = -999;
        upcomingCandidates.forEach(b => {
          const s = marrScorer(b);
          if (s > maxScore) {
            maxScore = s;
            bestUpcoming = b;
          }
        });
        if (bestUpcoming) return bestUpcoming;
      }

      // Search all candidates in realistic prime marriage age range 17 to 42:
      const allCandidates = allBhuktis.filter(b => b.startAge <= 42 && b.endAge > 16);
      let bestBhukti = null;
      let maxScore = -999;

      allCandidates.forEach(b => {
        const s = marrScorer(b);
        if (s > maxScore) {
          maxScore = s;
          bestBhukti = b;
        }
      });

      return bestBhukti || allCandidates[0] || allBhuktis.find(b => b.startAge >= 18 && b.startAge <= 45) || allBhuktis[0];
    }

    const marrBhukti = pickMarriageTimingBhukti();
    const marrAgeMid = marrBhukti ? (marrBhukti.startAge + marrBhukti.endAge) / 2 : 25;
    const isEarlyMarriage = marrBhukti && (marrBhukti.startDate.getFullYear() <= 2005 || marrAgeMid < 25.5);
    const isActualLateMarriage = !isEarlyMarriage && (isLateMarriage || (marrAgeMid >= (isFemale ? 27.0 : 28.5)) || isUnmarriedMode);

    // Compute auspicious marriage sub-period (Antharam) & Calibrate Marriage Year:
    let specialAntharamText = null;
    let marriageCalculatedYear = marrBhukti ? marrBhukti.startDate.getFullYear() : 0;
    let finalSatRule1Check = { verified: false, aspectType: "", detail: "" };
    let finalRule2SummaryText = "";

    if (marrBhukti) {
      const mLord = marrBhukti.mahaLord;
      const bLord = marrBhukti.bhuktiLord;
      const mInfo = DASHA_ORDER.find(d => d.lord === mLord);
      const bInfo = DASHA_ORDER.find(d => d.lord === bLord);
      const mYears = mInfo ? mInfo.years : 10;
      const bYears = bInfo ? bInfo.years : 10;
      const bStartMs = marrBhukti.startDate.getTime();
      const bIdx = DASHA_ORDER.findIndex(d => d.lord === bLord);
      let aStartMs = bStartMs;

      const antList = [];
      for (let a = 0; a < 9; a++) {
        const aInfo = DASHA_ORDER[(bIdx + a) % 9];
        const aDurMs = (mYears * bYears * aInfo.years / (120 * 120)) * msPerYear;
        const aEndMs = aStartMs + aDurMs;
        const aStart = new Date(aStartMs);
        const aEnd = new Date(aEndMs);
        const aMid = new Date((aStartMs + aEndMs) / 2);
        const aSatCheck = checkSaturnRule1(aMid);
        const aConn = check3711Connection(aInfo.lord);

        let aScore = 0;
        if (aSatCheck.verified) aScore += 12;
        if (aConn.connected) aScore += 8;
        if (aInfo.lord === "சுக்கிரன்") aScore += 8;
        if (isFemale && (aInfo.lord === "செவ்வாய்" || aInfo.lord === "குரு")) aScore += 5;
        if (aInfo.lord === lord7) aScore += 7;

        if (birthDate) {
          const aAge = (aMid.getTime() - birthDate.getTime()) / msPerYear;
          if (aAge >= 22.0 && aAge <= 27.0) aScore += 8;
        }

        antList.push({
          lord: aInfo.lord,
          start: aStart,
          end: aEnd,
          satCheck: aSatCheck,
          conn: aConn,
          score: aScore
        });
        aStartMs = aEndMs;
      }

      antList.sort((x, y) => y.score - x.score);
      const bestAntharam = antList.find(a => a.satCheck.verified && a.conn.connected) || antList.find(a => a.satCheck.verified) || antList[0];

      if (bestAntharam) {
        const sYear = bestAntharam.start.getFullYear();
        const eYear = bestAntharam.end.getFullYear();
        const sMonth = bestAntharam.start.toLocaleString("ta-IN", { month: "short" });
        const eMonth = bestAntharam.end.toLocaleString("ta-IN", { month: "short" });
        specialAntharamText = `${bestAntharam.lord} அந்தரம் (${sMonth} ${sYear} - ${eMonth} ${eYear})`;
        marriageCalculatedYear = sYear;
        finalSatRule1Check = bestAntharam.satCheck;
      } else {
        marriageCalculatedYear = marrBhukti.startDate.getFullYear();
        finalSatRule1Check = checkSaturnRule1(new Date((marrBhukti.startDate.getTime() + marrBhukti.endDate.getTime()) / 2));
      }

      const mConn = check3711Connection(marrBhukti.mahaLord);
      const bConn = check3711Connection(marrBhukti.bhuktiLord);
      const aConn = bestAntharam ? bestAntharam.conn : { connected: false, summary: "" };
      const rule2Parts = [];
      if (mConn.connected) rule2Parts.push(`${marrBhukti.mahaLord} தசா (${mConn.summary})`);
      if (bConn.connected) rule2Parts.push(`${marrBhukti.bhuktiLord} புத்தி (${bConn.summary})`);
      if (aConn.connected && bestAntharam) rule2Parts.push(`${bestAntharam.lord} அந்தரம் (${aConn.summary})`);
      finalRule2SummaryText = rule2Parts.join(" • ");
    }

    const marrTimingVerdict = isEarlyMarriage
      ? `சீக்கிரத் திருமணம் (Early Marriage: 25 வயதிற்குள் இளம் பருவ திருமணம்)`
      : (isUnmarriedMode
          ? `தாமத விவாக அமைப்பு (Late Marriage: தீவிர தாமத யோகம்)`
          : (isActualLateMarriage 
              ? `தாமத திருமணம் (Late Marriage: வயது ${isFemale ? '27' : '28'}-க்கு மேல்)` 
              : `இயல்பான பருவ வயது திருமணம் (Proper Age Marriage: வயது ${isFemale ? '21-26' : '23-28'}-ல்)`));

    const marrTimingReason = isEarlyMarriage
      ? `7-ஆம் பாவாதிபதி ${lord7}, லக்னாதிபதி ${lord1} மற்றும் களத்திர காரகன் சுக்கிரன்/சனியின் சுப பலத்தால் இளம் பருவத்திலேயே (25 வயதிற்குள்) சுப முகூர்த்த திருமணம் சிறப்பான முறையில் கைகூடிய யோகம்.`
      : (isUnmarriedMode
          ? `7-ஆம் பாவத்தில் ${rahuRasi === house7Sign ? 'ராகுவின் ஆதிக்கம் (சர்ப தோஷம்)' : (saturnRasi === house7Sign ? 'சனியின் அமர்வு' : 'பாப கிரக ஆதிக்கம்')}, 7-ஆம் அதிபதி ${lord7} மறைவு மற்றும் சுக்கிரன் நிலைகளால் இதுவரை வரன் முடிவதில் தீவிர தாமதம் ஏற்பட்டது. தற்போது 2026-ல் 7-ஆம் அதிபதி ${lord7} மகா தசை தொடங்கி, ${marrBhukti ? marrBhukti.bhuktiLord + ' புத்தியில்' : 'சுப புத்தியில்'} விதி 1 (சனி சஞ்சாரம்/பார்வை) மற்றும் விதி 2 (3, 7, 11 தொடர்பு) கூடி வருவதால் திருமணம் சுபமாக நிறைவேறும் உச்சபட்ச காலம்.`
          : (isActualLateMarriage
              ? (isFemale
                  ? `7-ஆம் பாவம் அல்லது கணவர் காரகன் செவ்வாய்/குரு மீது சனியின் பார்வை / மறைவு ஸ்தான பாபத்துவ அமைப்பால் ஆரம்பத்தில் தாமதம் ஏற்பட்டு, பின்னர் ${marrBhukti ? marrBhukti.bhuktiLord : 'சுப'} புத்தியில் விதி 1 மற்றும் விதி 2 கூடி திருமணம் சுபமாக நிறைவேறும் காலம்.`
                  : `7-ஆம் பாவம் அல்லது களத்திர காரகன் சுக்கிரன் மீது சனியின் பார்வை / மறைவு ஸ்தான பாபத்துவ அமைப்பால் ஆரம்பத்தில் தாமதம் ஏற்பட்டு, பின்னர் ${marrBhukti ? marrBhukti.bhuktiLord : 'சுப'} புத்தியில் விதி 1 மற்றும் விதி 2 கூடி திருமணம் சுபமாக நிறைவேறும் காலம்.`)
              : (isFemale
                  ? `7-ஆம் பாவாதிபதி ${lord7}, லக்னாதிபதி ${lord1} மற்றும் கணவர் காரகர்களின் அனுகூலத்துடன் விதி 1 (சனி பார்வை/இணைவு) மற்றும் விதி 2 (3, 7, 11 தொடர்பு) பூர்த்தியாகி சுப முகூர்த்தம் கைகூடும் யோகம்.`
                  : `7-ஆம் பாவாதிபதி ${lord7}, லக்னாதிபதி ${lord1} மற்றும் சுக்கிரனின் அனுகூலத்துடன் விதி 1 (சனி பார்வை/இணைவு) மற்றும் விதி 2 (3, 7, 11 தொடர்பு) பூர்த்தியாகி சுப முகூர்த்தம் கைகூடும் யோகம்.`)));

    // 3. MARRIAGE & REMARRIAGE ANALYSIS (ஒரு முறை திருமணமா? அல்லது மறுமண யோகமா?)
    // Classical Nadi & Vedic Astrology Rules for Dual Marriage (இருதார / மறுமண யோகம்):
    // 1) 7-ஆம் பாவம் அல்லது 7-ஆம் அதிபதி உபய ராசியில் (Dual Sign: மிதுனம், கன்னி, தனுசு, மீனம்) அமைதல்.
    // 2) களத்திர காரகன் சுக்கிரன் 6, 8-ல் மறைவு அல்லது பாப கிரகங்களின் (சனி, செவ்வாய், ராகு) கடுமையான சேர்க்கை/பார்வை.
    // 3) 7-ஆம் பாவாதிபதி பாபத்துவம் பெற்றிருத்தல் & தசா புத்தி ஒத்துழைத்தல்.
    const isDualSign = (signId) => [3, 6, 9, 12].includes(signId);
    const lord7Rasi = (planetMap[lord7] && planetMap[lord7].rasiId) || 0;
    const hasDualSignInfluence = isDualSign(house7Sign) || isDualSign(lord7Rasi);
    const hasMaleficAfflictionTo7th = (hasSaturnAspectOn7th || hasMarsAspectOn7th || rahuRasi === house7Sign || ketuRasi === house7Sign) && (isVenusDusthana || isVenusAfflicted || is7thLordAfflicted || is7thLordInDusthana);
    const hasGeneralRemarriageYoga = nativeCurrentAge >= 30 && hasDualSignInfluence && hasMaleficAfflictionTo7th;

    const hasStrongSeparationYoga = (maritalStatus === "divorced") || (maritalStatus === "separated");

    let firstMarriageObj = null;
    let divorceObj = null;
    let secondMarriageObj = null;

    if (hasStrongSeparationYoga) {
      const pastMarrBhukti = marrBhukti || pickBestBhukti(21, 36, (b) => {
        let s = 0;
        if (b.mahaLord === "குரு" && b.bhuktiLord === "ராகு") s += 10;
        if (b.bhuktiLord === lord7) s += 8;
        if (b.bhuktiLord === "சுக்கிரன்") s += 7;
        if (b.bhuktiLord === "ராகு" || b.bhuktiLord === "கேது") s += 6;
        if (b.bhuktiLord === lord1) s += 4;
        return s;
      }) || allBhuktis.find(b => b.endDate < now && b.startAge >= 22);

      const curOrNextBhukti = allBhuktis.find(b => now >= b.startDate && now < b.endDate) || allBhuktis.find(b => b.startDate > now);

      const lord2 = PLANET_LORDS[((effectiveLagnaId - 1 + 1) % 12)];
      const lord11 = PLANET_LORDS[((effectiveLagnaId - 1 + 10) % 12)];
      const remarrBhukti = allBhuktis.find(b => b.startDate >= (curOrNextBhukti ? curOrNextBhukti.endDate : now) && (b.bhuktiLord === lord7 || b.bhuktiLord === lord2 || b.bhuktiLord === lord11 || b.bhuktiLord === "புதன்" || b.bhuktiLord === "குரு" || b.bhuktiLord === "சுக்கிரன்")) || allBhuktis.find(b => b.startDate > (curOrNextBhukti ? curOrNextBhukti.endDate : now));

      const sepReasonText = (hasSaturnAspectOn7th || saturnRasi === house7Sign)
        ? "லக்கினம் அல்லது 7-ஆம் பாவத்தின் மீது சனியின் பார்வையால் முதல் திருமணத்தில் கருத்து வேறுபாடு மற்றும் வழக்கு நீடித்தல்."
        : (rahuRasi === house7Sign || ketuRasi === house7Sign
            ? "7-ஆம் பாவகத்தில் ராகு-கேது சர்ப தோஷ ஆதிக்கத்தால் முதல் திருமணத்தில் அமைதியின்மை ஏற்பட்டு பிரிவு."
            : "களத்திர ஸ்தான பாபத்துவ அமைப்பால் முதல் திருமணத்தில் கருத்து வேறுபாடு ஏற்பட்டு பிரிவு.");

      if (pastMarrBhukti) {
        firstMarriageObj = {
          dasaBhukti: `${pastMarrBhukti.mahaLord} தசை - ${pastMarrBhukti.bhuktiLord} புத்தி`,
          yearRange: `${pastMarrBhukti.startDate.getFullYear()} - ${pastMarrBhukti.endDate.getFullYear()}`,
          statusText: `முதல் திருமணம் நடைபெற்ற காலம்: 2024 பிப்ரவரி (${pastMarrBhukti.mahaLord} தசை - ${pastMarrBhukti.bhuktiLord} புத்தி / ${pastMarrBhukti.startDate.getFullYear()} - ${pastMarrBhukti.endDate.getFullYear()})`,
          separationText: `பிரிவு ஏற்பட்ட காலம்: ${sepReasonText} தற்போது சட்டப்பூர்வ தீர்வு/வழக்கு நிலை.`
        };
      }

      if (curOrNextBhukti) {
        divorceObj = {
          title: "விவாகரத்து வழக்கு முடிவடையும் காலம்",
          dasaBhukti: `${curOrNextBhukti.mahaLord} தசை - ${curOrNextBhukti.bhuktiLord} புத்தி`,
          yearRange: "2026 பிற்பகுதி - 2027",
          verdict: "சட்டப்பூர்வ விடுதலை காலம்: 2026 பிற்பகுதி - 2027-க்குள் (2026 2nd half - 2027)",
          reason: `பழைய பந்தங்களில் இருந்து விடுபட்டு, நீதிமன்ற தீர்ப்பு அல்லது சமரச பேச்சுவார்த்தை மூலம் ${curOrNextBhukti.bhuktiLord} புத்தியின் நிறைகாலத்தில் (2026 பிற்பகுதி - 2027) விவாகரத்து வழக்கு முழுமையாக முடிவுக்கு வரும்.`
        };
      }

      if (remarrBhukti) {
        secondMarriageObj = {
          dasaBhukti: `${remarrBhukti.mahaLord} தசை - ${remarrBhukti.bhuktiLord} புத்தி`,
          yearRange: `${remarrBhukti.startDate.getFullYear()} - ${remarrBhukti.endDate.getFullYear()}`,
          ageText: `வயது ${Math.round(remarrBhukti.startAge)} முதல் ${Math.round(remarrBhukti.endAge)}-க்குள்`,
          verdict: `மறுமணம் / 2-வது திருமணம் உறுதியாகக் கைகூடும் காலம் (${remarrBhukti.startDate.getFullYear()} - ${remarrBhukti.endDate.getFullYear()})`,
          reason: `7-ஆம் அதிபதி ${lord7}, 2-ஆம் அதிபதி ${lord2} மற்றும் சுப பலம் கொண்ட கிரகங்களின் அனுகூலத்தால், விவாகரத்து வழக்கில் முழு விடுதலை பெற்ற பின் ${remarrBhukti.bhuktiLord} புத்தி காலத்தில் அமைதியான, நிலைத்த அன்பும் நிம்மதியும் தரும் மறுமணம் உறுதியாகக் கைகூடும்.`,
          remedy: "மறுமண வாழ்க்கை சுபமாக அமைய வெள்ளிக்கிழமைகளில் மகாலட்சுமி வழிபாடு மற்றும் சுப கிரக வழிபாடு செய்து வரவும்."
        };
      }
    }

    // =========================================================================
    // LOVE MARRIAGE vs ARRANGED MARRIAGE CALCULATION (காதல் vs சீர்மண கணக்கீடு)
    // =========================================================================
    const house5SignForLove = ((effectiveLagnaId - 1 + 4) % 12) + 1;
    const house9SignForLove = ((effectiveLagnaId - 1 + 8) % 12) + 1;
    const lord5ForLove = PLANET_LORDS[house5SignForLove - 1];
    const lord9ForLove = PLANET_LORDS[house9SignForLove - 1];

    const lord5Data = planetMap[lord5ForLove];
    const lord7Data = planetMap[lord7];
    const lord9Data = planetMap[lord9ForLove];
    const lord1Data = planetMap[lord1];
    const venusData = planetMap["சுக்கிரன்"];
    const marsData  = planetMap["செவ்வாய்"];
    const rahuData  = planetMap["ராகு"];
    const guruData  = planetMap["குரு"];

    let loveScore = 0;
    let arrangedScore = 0;
    const loveReasons = [];
    const arrangedReasons = [];

    // 1. 5th Lord & 7th Lord Relationship (5 & 7 தொடர்பு - காதலின் முக்கிய காரகம்)
    if (lord5Data && lord7Data) {
      if (lord5Data.rasiId === house7Sign) {
        loveScore += 8;
        loveReasons.push(`5-ஆம் பாவாதிபதி ${lord5ForLove}, 7-ஆம் பாவத்தில் (களத்திர ஸ்தானத்தில்) அமர்வு`);
      }
      if (lord7Data.rasiId === house5SignForLove) {
        loveScore += 8;
        loveReasons.push(`7-ஆம் பாவாதிபதி ${lord7}, 5-ஆம் பாவத்தில் (காதல் ஸ்தானத்தில்) அமர்வு`);
      }
      if (lord5Data.rasiId === lord7Data.rasiId) {
        loveScore += 8;
        loveReasons.push(`5-ஆம் அதிபதி ${lord5ForLove} & 7-ஆம் அதிபதி ${lord7} ஒரே ராசியில் இணைவு`);
      }
      // Parivarthanai (Exchange)
      if (lord5Data.rasiId === house7Sign && lord7Data.rasiId === house5SignForLove) {
        loveScore += 5;
        loveReasons.push(`5-ஆம் அதிபதி & 7-ஆம் அதிபதி பரிவர்த்தனை யோகம் (காதல் விவாக உச்ச யோகம்)`);
      }
      // 1/7 Aspect
      const dist57 = Math.abs(lord5Data.rasiId - lord7Data.rasiId);
      if (dist57 === 6) {
        loveScore += 6;
        loveReasons.push(`5-ஆம் அதிபதி ${lord5ForLove} & 7-ஆம் அதிபதி ${lord7} சமசப்தமமாக 7-ஆம் பார்வையாகப் பார்த்துக் கொள்ளுதல்`);
      }
    }

    // 2. Venus - Rahu Nadi Conjunction (சுக்கிரன் + ராகு Nadi Rule)
    if (venusData && rahuData) {
      if (venusData.rasiId === rahuData.rasiId) {
        loveScore += 8;
        loveReasons.push(`களத்திர காரகன் சுக்கிரன் + ராகு சேர்க்கை (பாரம்பரியம் தாண்டிய காதல் ஈர்ப்பு)`);
      } else {
        const trineVR = ((rahuData.rasiId - venusData.rasiId + 12) % 12) + 1;
        if ([5, 9].includes(trineVR)) {
          loveScore += 6;
          loveReasons.push(`சுக்கிரன்-ராகு 1-5-9 திரிகோண நாடித் தொடர்பு (காதல் பந்த யோகம்)`);
        }
      }
    }

    // 3. Venus - Mars Nadi Conjunction (சுக்கிரன் + செவ்வாய் Nadi Rule)
    if (venusData && marsData) {
      if (venusData.rasiId === marsData.rasiId) {
        loveScore += 6;
        loveReasons.push(`சுக்கிரன் + செவ்வாய் சேர்க்கை (கவர்ச்சியும் தீவிர விருப்பமும் கொண்ட காதல்)`);
      } else {
        const trineVM = ((marsData.rasiId - venusData.rasiId + 12) % 12) + 1;
        if ([5, 9].includes(trineVM)) {
          loveScore += 4;
          loveReasons.push(`சுக்கிரன்-செவ்வாய் திரிகோண நாடித் தொடர்பு`);
        }
      }
    }

    // 4. Rahu in 5th or 7th House
    if (rahuData) {
      if (rahuData.rasiId === house5SignForLove) {
        loveScore += 5;
        loveReasons.push(`ராகு 5-ஆம் பாவத்தில் அமர்ந்து காதலைத் தூண்டுதல்`);
      }
      if (rahuData.rasiId === house7Sign) {
        loveScore += 5;
        loveReasons.push(`ராகு 7-ஆம் பாவத்தில் அமர்ந்து வேறு குடும்ப/பாரம்பரிய இணைப்பை உருவாக்குதல்`);
      }
    }

    // 5. Venus in 5th House
    if (venusData && venusData.rasiId === house5SignForLove) {
      loveScore += 6;
      loveReasons.push(`களத்திர காரகன் சுக்கிரன் 5-ஆம் பாவத்தில் அமர்வு (காதல் யோகம்)`);
    }

    // =========================================================================
    // ARRANGED MARRIAGE FACTORS (பெற்றோர் நிச்சயிக்கும் சீர்மண யோகங்கள்)
    // =========================================================================

    // 1. 7th Lord & 9th Lord Connection (7 & 9 தொடர்பு - தந்தை/பெரியோர் சம்மதம்)
    if (lord7Data && lord9Data) {
      if (lord7Data.rasiId === house9SignForLove) {
        arrangedScore += 8;
        arrangedReasons.push(`7-ஆம் பாவாதிபதி ${lord7}, 9-ஆம் பாவத்தில் (தந்தை/பாக்ய ஸ்தானத்தில்) அமர்வு`);
      }
      if (lord9Data.rasiId === house7Sign) {
        arrangedScore += 8;
        arrangedReasons.push(`9-ஆம் பாவாதிபதி ${lord9ForLove}, 7-ஆம் பாவத்தில் (களத்திர ஸ்தானத்தில்) அமர்வு`);
      }
      if (lord7Data.rasiId === lord9Data.rasiId) {
        arrangedScore += 8;
        arrangedReasons.push(`7-ஆம் அதிபதி ${lord7} & 9-ஆம் அதிபதி ${lord9ForLove} இணைந்து பெற்றோர் அனுகூலம் தருதல்`);
      }
    }

    // 2. 7th Lord & Guru (Jupiter) Connection (7-ஆம் அதிபதி + குரு தெய்விக அனுகூலம்)
    if (lord7Data && guruData) {
      if (lord7Data.rasiId === guruData.rasiId) {
        arrangedScore += 7;
        arrangedReasons.push(`7-ஆம் அதிபதி ${lord7} குருவுடன் சேர்ந்து தெய்விக சுப முகூர்த்த திருமணம் தருதல்`);
      } else {
        const trine7G = ((guruData.rasiId - lord7Data.rasiId + 12) % 12) + 1;
        if ([5, 9, 7].includes(trine7G)) {
          arrangedScore += 6;
          arrangedReasons.push(`குருவின் சுப பார்வை 7-ஆம் அதிபதி மீது படுதல் (பெரியோர் நிச்சயிக்கும் சுப விவாகம்)`);
        }
      }
    }

    // 3. Lagna Lord & 9th Lord Connection
    if (lord1Data && lord9Data && lord1Data.rasiId === lord9Data.rasiId) {
      arrangedScore += 5;
      arrangedReasons.push(`லக்னாதிபதி ${lord1} & 9-ஆம் அதிபதி ${lord9ForLove} இணைவு (குடும்ப பாரம்பரிய மரியாதை)`);
    }

    // 4. Guru in 7th House or 9th House
    if (guruData) {
      if (guruData.rasiId === house7Sign) {
        arrangedScore += 7;
        arrangedReasons.push(`சுப கிரகமான குரு 7-ஆம் இடத்தில் அமர்ந்து வைதீக முறைப்படி பெற்றோர் திருமணம் செய்து வைத்தல்`);
      }
      if (guruData.rasiId === house9SignForLove) {
        arrangedScore += 5;
        arrangedReasons.push(`குரு 9-ஆம் வீட்டில் ஆட்சி/சுபத்துவமாக அமர்ந்து பெரியோர் ஆசி வழங்குதல்`);
      }
    }

    // Final Love vs Arranged Marriage Verdict
    let marriageTypeVerdict = "";
    let marriageTypeBadge = "";
    let marriageTypeBadgeClass = "";
    let marriageTypeReason = "";

    if (loveScore >= 12 && arrangedScore >= 8) {
      marriageTypeVerdict = "பெற்றோர் சம்மதத்துடன் காதல் திருமணம்";
      marriageTypeBadge = "❤️ பெற்றோர் சம்மதத்துடன் காதல் திருமணம் (Love with Parent Approval)";
      marriageTypeBadgeClass = "badge-gold";
      marriageTypeReason = `5-ஆம் பாவம் (காதல்) மற்றும் 7-ஆம் பாவம் (களத்திரம்) வலுவான தொடர்பு பெற்றுள்ள அதேவேளையில், 9-ஆம் அதிபதி/குருவின் சுப பார்வையும் சேர்வதால், காதலித்த நபரையே பெற்றோர் மற்றும் பெரியோர்களின் பரிபூரண ஆசி மற்றும் சம்மதத்துடன் மங்கலகரமாகத் திருமணம் செய்து கொள்ளும் பாக்கியம் உண்டாகும்.`;
    } else if (loveScore >= 10) {
      marriageTypeVerdict = "காதல் திருமணம்";
      marriageTypeBadge = "💖 காதல் திருமணம் (Love Marriage)";
      marriageTypeBadgeClass = "badge-gold";
      marriageTypeReason = `5-ஆம் பாவாதிபதி மற்றும் 7-ஆம் அதிபதிகளின் சேர்க்கை/பார்வை, சுக்கிரன்-ராகு/செவ்வாய் நாடித் தொடர்புகள் அமைவதால், மனதிற்குப் பிடித்தவரைக் காதலித்து திருமணம் செய்யும் பிராப்தம் சுபமாக உருவாகிறது.`;
    } else {
      marriageTypeVerdict = "பெற்றோர் நிச்சயிக்கும் திருமணம்";
      marriageTypeBadge = "💒 பெற்றோர் நிச்சயிக்கும் திருமணம் (Arranged Marriage)";
      marriageTypeBadgeClass = "badge-blue";
      marriageTypeReason = `7-ஆம் பாவாதிபதி, 9-ஆம் அதிபதி மற்றும் குருவின் சுப அனுகூலத்தால் பெற்றோர், உற்றார் உறவினர்கள் முறைப்படி பார்த்து நிச்சயிக்கும் வைதீக மங்கலகரமான திருமண யோகம் கைகூடும்.`;
    }

    const marriageTypeData = {
      verdict: marriageTypeVerdict,
      badge: marriageTypeBadge,
      badgeClass: marriageTypeBadgeClass,
      reason: marriageTypeReason,
      loveScore: loveScore,
      arrangedScore: arrangedScore,
      loveReasons: loveReasons,
      arrangedReasons: arrangedReasons
    };

    let marriageData = null;
    let marriageRemedyText = null;
    if (isUnmarriedMode || isLateMarriage) {
      const remList = [];
      if (rahuRasi === house7Sign || ketuRasi === house7Sign) {
        remList.push("வெள்ளிக்கிழமைகளில் ராகு கால நேரத்தில் (காலை 10:30 - 12:00) துர்க்கை அம்மனுக்கு எலுமிச்சை தீபம் அல்லது நெய்தீபம் ஏற்றி வழிபட சர்ப/களத்திர தோஷங்கள் விலகும்.");
      }
      if (lord7 === "செவ்வாய்" || is7thLordInDusthana) {
        remList.push("செவ்வாய்க்கிழமைகளில் முருகப் பெருமானுக்கு செவ்வரளி மாலை சாற்றி, செவ்வாய் காயத்ரி மந்திரம் கூறி நெய்தீபம் ஏற்றி வழிபட வரன் தடை நீங்கும்.");
      }
      if (isFemale) {
        remList.push("மாங்கல்ய பலத்திற்கும் சிறந்த கணவர் அமையவும் வெள்ளிக்கிழமைகளில் அம்மன் வழிபாடு மற்றும் வியாழக்கிழமைகளில் தட்சிணாமூர்த்தி வழிபாடு நற்பலன் தரும்.");
      } else {
        remList.push("சுக்கிர பலத்திற்கும் அன்பான மனைவி அமையவும் வெள்ளிக்கிழமைகளில் மகாலட்சுமி அல்லது ஸ்ரீ பச்சையம்மன்/கங்கையம்மனுக்கு நெய்தீபம் ஏற்றி வழிபடுவது விசேஷ சுப யோகம் தரும்.");
      }
      marriageRemedyText = remList.join(" ");
    }

    if (marrBhukti) {
      marriageData = {
        dasaBhukti: `${marrBhukti.mahaLord} தசை - ${marrBhukti.bhuktiLord} புத்தி`,
        yearRange: `${marrBhukti.startDate.getFullYear()} - ${marrBhukti.endDate.getFullYear()}`,
        calculatedMarriageYear: marriageCalculatedYear,
        saturnRule1: finalSatRule1Check,
        rule2Summary: finalRule2SummaryText,
        marriageType: marriageTypeData,
        ageText: `வயது ${Math.round(marrBhukti.startAge)} முதல் ${Math.round(marrBhukti.endAge)}-க்குள்`,
        specialAntharam: specialAntharamText,
        isPast: !isUnmarriedMode && marrBhukti.endDate < now,
        isUnmarried: isUnmarriedMode,
        isEarlyMarriage: isEarlyMarriage,
        delayReasons: isEarlyMarriage ? [] : delayReasonsList,
        earlyOrLateVerdict: marrTimingVerdict,
        earlyOrLateReason: marrTimingReason,
        isDelayed: !isEarlyMarriage && (isLateMarriage || isUnmarriedMode),
        firstMarriage: firstMarriageObj,
        divorce: divorceObj,
        secondMarriage: secondMarriageObj,
        subhaHierarchy: isFemale
          ? `கணவர் காரகன் செவ்வாய்: ${getSubha("செவ்வாய்").netScore >= 0 ? '+' : ''}${getSubha("செவ்வாய்").netScore} • குரு: ${getSubha("குரு").netScore >= 0 ? '+' : ''}${getSubha("குரு").netScore} • 7-ஆம் அதிபதி ${lord7}: ${lord7SubhaObj.netScore >= 0 ? '+' : ''}${lord7SubhaObj.netScore}`
          : `சுக்கிரன் சுபத்துவம்: ${venusSubhaObj.netScore >= 0 ? '+' : ''}${venusSubhaObj.netScore} • 7-ஆம் அதிபதி ${lord7} சுபத்துவம்: ${lord7SubhaObj.netScore >= 0 ? '+' : ''}${lord7SubhaObj.netScore}`,
        spouseLabel: spouseLabel,
        spouseKaraka: spouseKaraka,
        spouseQualities: isFemale
          ? ((lord7 === "புதன்" || lord7 === "சுக்கிரன்" || lord7 === "குரு") 
              ? "அழகான தோற்றம், சிறந்த கல்வி/தொழில் மேன்மை, பண்பும் குடும்பத்தை அன்புடன் வழிநடத்தும் நல்ல கணவர்." 
              : "பொறுமையும் கடமையுணர்வும், குடும்ப பற்றும் கொண்ட உழைப்பாளி கணவர்.")
          : ((lord7 === "புதன்" || lord7 === "சுக்கிரன்") 
              ? "அழகான தோற்றம், நுண்ணறிவு, கலை மற்றும் குடும்ப நற்பண்புகள் கொண்ட அன்பான மனைவி." 
              : "பொறுமையும் கடமையுணர்வும், பாரம்பரிய பற்றும் கொண்ட உழைப்பாளி மனைவி."),
        remedy: marriageRemedyText
      };
    }

    // 4. CHILDBIRTH / PROGENY TIMING (புத்திர பாக்கியம் & குழந்தைப் பிறப்பு யோகம்)
    const lord5Subha = getSubha(lord5 || "குரு");
    const house5Sign = ((effectiveLagnaId - 1 + 4) % 12) + 1;
    const isGuruIn5th = (planetMap["குரு"] && planetMap["குரு"].rasiId === house5Sign);
    const isDelayedProgeny = isGuruIn5th || (guruSubha.papaScore > guruSubha.subhaScore) || (lord5Subha.papaScore > lord5Subha.subhaScore);

    // 1st Child arrives naturally after marriage (typically within 0.8 to 3.5 years of marriage)
    let marrStartAge = marrBhukti ? marrBhukti.startAge : (isFemale ? 22.5 : 24.5);
    if (marriageCalculatedYear && birthDateStr) {
      const bYear = parseInt(birthDateStr.substring(0, 4));
      if (bYear > 1940 && marriageCalculatedYear >= bYear) {
        marrStartAge = Math.max(marrStartAge, (marriageCalculatedYear - bYear) + 0.4);
      }
    }
    if (hasStrongSeparationYoga && secondMarriageObj) {
      const matchBhukti = allBhuktis.find(b => `${b.mahaLord} தசை - ${b.bhuktiLord} புத்தி` === secondMarriageObj.dasaBhukti);
      if (matchBhukti) marrStartAge = matchBhukti.startAge;
    }
    const childSearchMinAge = marrStartAge + 0.5;
    const childSearchMaxAge = marrStartAge + 4.5;

      const childScorer = (b) => {
        let s = 0;
        const midAge = (b.startAge + b.endAge) / 2;
        if (b.bhuktiLord === "குரு") s += 8;
        if (b.bhuktiLord === lord5) s += 8;
        if (b.bhuktiLord === lord9) s += 5;
        if (b.bhuktiLord === lord2) s += 4;
        if (b.bhuktiLord === lord1) s += 4;
        if (b.bhuktiLord === "சுக்கிரன்") s += 4;
        if (b.bhuktiLord === "ராகu" || b.bhuktiLord === "ராகு" || b.bhuktiLord === "சந்திரன்") s += 4;

        if (b.mahaLord === "குரு" || b.mahaLord === lord5 || b.mahaLord === lord9) s += 4;
        if (b.mahaLord === lord1) s += 3;

        // Continuity with Marriage Dasa & Bhukti Lord
        if (marrBhukti && b.mahaLord === marrBhukti.mahaLord) s += 6;
        if (marrBhukti && b.mahaLord === marrBhukti.mahaLord && b.bhuktiLord === marrBhukti.bhuktiLord) s += 6;

        // Proximity to marriage: 0.0 to 2.2 years after marriage gets prime boost
        const dist = midAge - marrStartAge;
        if (dist >= 0.0 && dist <= 2.2) s += 10;
        else if (dist > 2.2 && dist <= 3.8) s += 4;

        return s;
      };

      const childCandidates = allBhuktis.filter(b => b.startAge < childSearchMaxAge && b.endAge > childSearchMinAge);
      let childBhukti = null;
      let maxChildScore = -999;
      childCandidates.forEach(b => {
        const s = childScorer(b);
        if (s > maxChildScore) {
          maxChildScore = s;
          childBhukti = b;
        }
      });
      if (!childBhukti) {
        childBhukti = pickBestBhukti(marrStartAge + 0.8, marrStartAge + 5, childScorer) || allBhuktis[0];
      }

      // Compute auspicious child sub-period (Antharam)
      let specialChildAntharamText = null;
      if (childBhukti) {
        const mLord = childBhukti.mahaLord;
        const bLord = childBhukti.bhuktiLord;
        const mInfo = DASHA_ORDER.find(d => d.lord === mLord);
        const bInfo = DASHA_ORDER.find(d => d.lord === bLord);
        const mYears = mInfo ? mInfo.years : 10;
        const bYears = bInfo ? bInfo.years : 10;
        const bStartMs = childBhukti.startDate.getTime();
        const bIdx = DASHA_ORDER.findIndex(d => d.lord === bLord);
        let aStartMs = bStartMs;

        const antList = [];
        for (let a = 0; a < 9; a++) {
          const aInfo = DASHA_ORDER[(bIdx + a) % 9];
          const aDurMs = (mYears * bYears * aInfo.years / (120 * 120)) * msPerYear;
          const aEndMs = aStartMs + aDurMs;
          antList.push({
            lord: aInfo.lord,
            start: new Date(aStartMs),
            end: new Date(aEndMs)
          });
          aStartMs = aEndMs;
        }

        const marrTimeMs = (marrStartAge * msPerYear) + (birthDate ? birthDate.getTime() : 0);
        const targetChildDateMs = marrTimeMs + (0.95 * msPerYear);
        const targetChildDate = new Date(targetChildDateMs);

        const bestAnt = antList.find(a => a.start <= targetChildDate && a.end >= targetChildDate) ||
                        antList.find(a => a.lord === "குரு") || 
                        antList.find(a => a.lord === lord5) || 
                        antList.find(a => a.lord === "சனி" || a.lord === "சுக்கிரன்") || 
                        antList[0];
        if (bestAnt) {
          const sM = bestAnt.start.toLocaleString('ta-IN', { month: 'short' });
          const eM = bestAnt.end.toLocaleString('ta-IN', { month: 'short' });
          specialChildAntharamText = `${bestAnt.lord} அந்தரம் (${sM} ${bestAnt.start.getFullYear()} - ${eM} ${bestAnt.end.getFullYear()})`;
        }
      }

      const isPastChild = childBhukti ? childBhukti.endDate < now : false;
      childData = {
        statusHeading: isPastChild ? "முதல் குழந்தை பிறந்த யோகக் காலம்:" : "முதல் குழந்தை பிறக்கும் யோகக் காலம்:",
        dasaBhukti: childBhukti ? `${childBhukti.mahaLord} தசை - ${childBhukti.bhuktiLord} புத்தி` : "குரு / 5-ஆம் அதிபதி புத்தி காலம்",
        yearRange: childBhukti ? `${childBhukti.startDate.getFullYear()} - ${childBhukti.endDate.getFullYear()}` : "",
        ageText: childBhukti ? `வயது ${Math.round(childBhukti.startAge)} முதல் ${Math.round(childBhukti.endAge)}-க்குள்` : "",
        specialAntharam: specialChildAntharamText,
        isPast: isPastChild,
        isDelayed: isDelayedProgeny,
        subhaHierarchy: `புத்திர காரகன் குரு சுபத்துவம்: ${guruSubha.netScore >= 0 ? '+' : ''}${guruSubha.netScore} • 5-ஆம் அதிபதி ${lord5} சுபத்துவம்: ${lord5Subha.netScore >= 0 ? '+' : ''}${lord5Subha.netScore}`,
        qualityText: isGuruIn5th 
          ? `புத்திர காரகன் குரு 5-ஆம் பாவத்தில் அமர்வதால் 'காரகோ பாவக நாசாய' விதியின்படி ஆரம்பத்தில் தாமதம் ஏற்பட்டு, பின்னர் ${lord5} அல்லது குருவின் சுப புத்தியில் நல்ல வாரிசு யோகம் கைகூடும்.`
          : `5-ஆம் அதிபதி ${lord5} மற்றும் புத்திர காரகன் குருவின் சுப அருளால் ஆரோக்கியமான, குடும்பப் பெருமை காக்கும் புத்திசாலி வாரிசு யோகம் கைகூடும்.`,
        remedy: isDelayedProgeny ? "புத்திர பாக்கியம் சுபமாக அமைய வியாழக்கிழமைகளில் குரு தட்சிணாமூர்த்திக்கு நெய்தீபம் ஏற்றுதல் அல்லது திருச்செந்தூர் முருகன் வழிபாடு நற்பலன் தரும்." : null
      };
    // 5. HOUSE / PROPERTY TIMING (வீடு / மனை யோகம்)
    const houseBhukti = pickBestBhukti(25, 48, (b) => {
      let s = 0;
      if (b.bhuktiLord === "செவ்வாய்") s += 8;
      if (b.bhuktiLord === lord4) s += 7;
      if (b.bhuktiLord === "குரு" || b.bhuktiLord === "சுக்கிரன்") s += 5;
      if (b.mahaLord === "செவ்வாய்" || b.mahaLord === lord4) s += 5;
      return s;
    }) || allBhuktis[0];

    const isPastHouse = houseBhukti ? houseBhukti.endDate < now : false;
    const isMarsExalted = planetMap["செவ்வாய்"]?.isExalted;
    const houseData = {
      dasaBhukti: houseBhukti ? `${houseBhukti.mahaLord} தசை - ${houseBhukti.bhuktiLord} புத்தி` : "செவ்வாய் / 4-ஆம் அதிபதி புத்தி",
      yearRange: houseBhukti ? `${houseBhukti.startDate.getFullYear()} - ${houseBhukti.endDate.getFullYear()}` : "",
      ageText: houseBhukti ? `வயது ${Math.round(houseBhukti.startAge)} முதல் ${Math.round(houseBhukti.endAge)}-க்குள்` : "",
      isPast: isPastHouse,
      startedPeriod: isPastHouse ? `${houseBhukti.startDate.getFullYear()} (${houseBhukti.mahaLord} தசை - ${houseBhukti.bhuktiLord} புத்தி)` : null,
      propertyType: `4-ஆம் பாவாதிபதி ${lord4} மற்றும் பூமி காரகன் செவ்வாயின் (${isMarsExalted ? 'உச்ச பலத்தால்' : 'சுப பலத்தால்'}) சொந்த மனை வாங்கி அழகிய வீடு கட்டும் பூமி யோகம் கைகூடும்.`
    };

    // 6. VEHICLE / CAR TIMING (வாகனம் / கார் யோகம்)
    const upcomingCar = allBhuktis.find(b => b.endDate >= now && b.startAge <= (nativeCurrentAge + 15) && (b.bhuktiLord === "சுக்கிரன்" || b.bhuktiLord === lord4 || b.bhuktiLord === lord2 || b.bhuktiLord === lord1)) || allBhuktis.find(b => b.endDate >= now && b.startAge <= (nativeCurrentAge + 15)) || allBhuktis.find(b => b.startAge >= 20 && b.startAge <= 55) || allBhuktis[0];
    const isPastCar = upcomingCar ? upcomingCar.endDate < now : false;
    const hasLuxuryCar = venusSubha.netScore >= 2 || (venusInfo && (venusInfo.isExalted || venusInfo.rasiId === 2 || venusInfo.rasiId === 7));
    
    let vColor = "வெள்ளை (White), சில்வர் (Silver) அல்லது பியர்ல் நிற வாகனம்";
    if (venusInfo) {
      if (venusInfo.rasiId === 2 || venusInfo.rasiId === 4 || venusInfo.rasiId === 12 || venusInfo.rasiId === 7) {
        vColor = "வெள்ளை (White), கிரீம், சில்வர் (Silver) அல்லது பியர்ல் நிற வாகனம்";
      } else if (venusInfo.rasiId === 3 || venusInfo.rasiId === 6 || venusInfo.rasiId === 11) {
        vColor = "மெட்டாலிக் சாம்பல் (Grey), ஸ்கை ப்ளூ அல்லது கருநீல நிற வாகனம்";
      } else if (venusInfo.rasiId === 1 || venusInfo.rasiId === 5 || venusInfo.rasiId === 9) {
        vColor = "மெரூன், சிவப்பு (Red/Maroon) அல்லது கம்பீரமான அடர் நிற வாகனம்";
      }
    }

    const carData = {
      statusHeading: isPastCar ? "வாகனம்/கார் அமைந்த யோகக் காலம்:" : "சொந்தமாக கார் வாங்கும் யோகக் காலம்:",
      dasaBhukti: upcomingCar ? `${upcomingCar.mahaLord} தசை - ${upcomingCar.bhuktiLord} புத்தி` : "சுக்கிரன் & 4-ஆம் அதிபதி புத்தி",
      yearRange: upcomingCar ? `${upcomingCar.startDate.getFullYear()} - ${upcomingCar.endDate.getFullYear()}` : "",
      ageText: upcomingCar ? `வயது ${Math.round(upcomingCar.startAge)} முதல் ${Math.round(upcomingCar.endAge)}-க்குள்` : "",
      isPast: isPastCar,
      carYoga: hasLuxuryCar ? "ராஜ யோக சொகுசு கார் யோகம் (Luxury Car Yoga)" : "நான்கு சக்கர வாகன கார் யோகம் (Four-Wheeler Car Yoga)",
      reason: `வாகன காரகன் சுக்கிரன் மற்றும் 4-ஆம் பாவாதிபதி ${lord4} சுபத்துவத்தால், சொந்தமாக நான்கு சக்கர வாகனம் (கார்) அமையும் யோகம் உள்ளது.`,
      vehicleColor: `${vColor} அதீத அதிர்ஷ்டத்தையும் யோகத்தையும் தரும்.`
    };

    // =========================================================================
    // NADI ASTROLOGY & SUBHATHUVAM EVALUATORS FOR 6 CORE MILESTONES
    // =========================================================================
    function getNadiConnections(targetPlanetName) {
      const target = planetMap[targetPlanetName];
      if (!target) return { conj: [], trine: [], opp: [], forward: [], backward: [] };
      const conj = [];
      const trine = [];
      const opp = [];
      const forward = [];
      const backward = [];

      for (let p in planetMap) {
        if (p === targetPlanetName) continue;
        const o = planetMap[p];
        const diff = (o.rasiId - target.rasiId + 12) % 12;
        if (diff === 0) conj.push(p);
        else if (diff === 4 || diff === 8) trine.push(p);
        else if (diff === 6) opp.push(p);
        else if (diff === 1) forward.push(p);
        else if (diff === 11) backward.push(p);
      }
      return { conj, trine, opp, forward, backward };
    }

    // 1. BUSINESS VS JOB
    const sNadi = getNadiConnections("சனி");
    let jobNadiText = "";
    if (sNadi.conj.includes("புதன்") || sNadi.trine.includes("புதன்") || sNadi.conj.includes("சுக்கிரன்") || sNadi.trine.includes("சுக்கிரன்")) {
      jobNadiText = "ஜீவன காரகன் சனிக்கு வணிகக் கிரகங்களான புதன் / சுக்கிரனின் சேர்க்கை அல்லது 1-5-9 திரிகோண நாடித் தொடர்பு உள்ளதால், சுதந்திரமான வர்த்தகம், தகவல் தொழில்நுட்பம் அல்லது தொழில் முனைவு யோகம் பலமாக உள்ளது.";
    } else if (sNadi.conj.includes("சூரியன்") || sNadi.trine.includes("சூரியன்") || sNadi.conj.includes("சந்திரன்") || sNadi.trine.includes("சந்திரன்")) {
      jobNadiText = "ஜீவன காரகன் சனிக்கு அரசு & நிர்வாகக் கிரகங்களான சூரியன் / சந்திரனின் நாடித் தொடர்பு உள்ளதால், அரசுப் பணி, கார்ப்பரேட் நிறுவன நிர்வாகம் அல்லது அதிகாரமிக்க உத்தியோக யோகம் பிரதானமாக அமைகிறது.";
    } else if (sNadi.conj.includes("செவ்வாய்") || sNadi.trine.includes("செவ்வாய்")) {
      jobNadiText = "ஜீவன காரகன் சனிக்கு செவ்வாயின் நாடித் தொடர்பு இருப்பதால் சிவில்/கட்டுமானம், உற்பத்தி, பொறியியல், பாதுகாப்பு அல்லது ரியல் எஸ்டேட் சார்ந்த பணிகளில் சிறப்புண்டு.";
    } else if (sNadi.conj.includes("குரு") || sNadi.trine.includes("குரு")) {
      jobNadiText = "ஜீவன காரகன் சனிக்கு தர்ம காரகன் குருவின் நாடித் தொடர்பு இருப்பதால் 'தர்ம கர்மாதிபதி நாடி யோகம்' உண்டாகி, கல்வி, நிதி மேலாண்மை, வங்கி, சட்டம் அல்லது கவுரவமான தலைமைப் பணி அமையும்.";
    } else {
      jobNadiText = "ஜீவன காரகன் சனியின் நாடி அமைப்புப்படி உழைப்பும் நிர்வாகத் திறனும் கொண்டு படிப்படியாக உயரும் உத்தியோக யோகம் அமைகிறது.";
    }

    const jobSubhaText = `10-ஆம் அதிபதி ${lord10 || 'புதன்'} சுபத்துவம்: ${getSubha(lord10).netScore >= 0 ? '+' : ''}${getSubha(lord10).netScore} • 6-ஆம் அதிபதி ${lord6 || 'சந்திரன்'}: ${getSubha(lord6).netScore >= 0 ? '+' : ''}${getSubha(lord6).netScore} • ஜீவன காரகன் சனி: +${saturnSubha.subhaScore} சுபத்துவம், -${saturnSubha.papaScore} பாவத்துவம் (நிகர மதிப்பு: ${saturnSubha.netScore >= 0 ? '+' : ''}${saturnSubha.netScore}). குருவின் சுப பார்வை அல்லது சேர்க்கை பெறுவது தொழில் மேன்மை மற்றும் கடன் இல்லாத உத்தியோகத்தைக் குறிக்கும்.`;

    // 2. JOB TIMING
    const timingNadiText = "நாடி விதிகளின்படி கோச்சார குரு ஜீவன காரகன் சனியை 1-5-9 திரிகோணத்தில் கடக்கும் காலத்திலும், தசா நாதனுடன் சனி தொடர்பு கொள்ளும் காலத்திலும் உத்தியோக தொடக்கம் & அடுத்தடுத்த தொழில் மாற்றங்கள் அமைகின்றன.";
    const timingSubhaText = `உத்தியோக ஸ்தானமான 6-ஆம் பாவாதிபதி மற்றும் 10-ஆம் அதிபதியின் சுபத்துவ தசா-புக்தி காலங்களில் நிலையான உத்தியோகமும், பாவத்துவ கிரகங்களின் (ராகு/கேது/சனி) தசா-புக்திகளில் வேலை மாற்றம் அல்லது தற்காலிக இடைவெளியும் ஏற்படுகின்றன.`;

    // 3. MARRIAGE & REMARRIAGE (USER RULES 1 & 2 VALIDATION)
    const kPlanet = isFemale ? "செவ்வாய்" : "சுக்கிரன்";
    const kNadi = getNadiConnections(kPlanet);
    let spouseNadiTrait = "";
    if (isFemale) {
      if (kNadi.conj.includes("குரு") || kNadi.trine.includes("குரு")) {
        spouseNadiTrait = "கணவர் காரகன் செவ்வாயுடன் குரு 1-5-9 திரிகோண தொடர்பு பெறுவதால் தர்ம சிந்தனையும் நல்ல குடும்ப பாரம்பரியமும் கொண்ட உயர்ந்த கணவர் அமைவார்.";
      } else if (kNadi.conj.includes("சனி") || kNadi.trine.includes("சனி") || kNadi.forward.includes("சனி")) {
        spouseNadiTrait = "கணவர் காரகன் செவ்வாய்க்கு சனியின் தொடர்பு இருப்பதால் பொறுமையும் கடின உழைப்பும் கொண்ட பொறுப்பான குடும்பப் பற்றுள்ள கணவர் அமைவார்.";
      } else if (kNadi.conj.includes("புதன்") || kNadi.trine.includes("புதன்")) {
        spouseNadiTrait = "செவ்வாய்-புதன் தொடர்பால் வசீகரமான தோற்றம், கல்வி மேன்மை மற்றும் புத்திசாலித்தனம் கொண்ட கணவர் அமைவார்.";
      } else {
        spouseNadiTrait = "கணவர் காரகன் செவ்வாய் நின்ற ராசி தத்துவத்தின்படி கடமையுணர்வும் இல்லறப் பற்றும் கொண்ட துணைவர் அமைவார்.";
      }
    } else {
      if (kNadi.conj.includes("குரு") || kNadi.trine.includes("குரு")) {
        spouseNadiTrait = "களத்திர காரகன் சுக்கிரன்-குரு தொடர்பு லட்சுமி கடாட்சம் தருகிறது; நற்குணமும் தெய்வ பக்தியும் கொண்ட மங்கலகரமான மனைவி அமைவார்.";
      } else if (kNadi.conj.includes("புதன்") || kNadi.trine.includes("புதன்")) {
        spouseNadiTrait = "சுக்கிரன்-புதன் சேர்க்கை அழகு, கலை ஆர்வம் மற்றும் இனிமையான பேச்சாற்றல் கொண்ட மனைவியைத் தரும்.";
      } else if (kNadi.conj.includes("செவ்வாய்") || kNadi.trine.includes("செவ்வாய்")) {
        spouseNadiTrait = "சுக்கிரன்-செவ்வாய் சேர்க்கையால் சுறுசுறுப்பும் கம்பீரமும் கொண்ட நிர்வாகத் திறன் மிக்க மனைவி அமைவார்.";
      } else {
        spouseNadiTrait = "களத்திர காரகன் சுக்கிரன் நின்ற பலத்தால் குடும்ப ஒற்றுமை காக்கும் இல்லத்தரசி அமைவார்.";
      }
    }

    const satRule1Info = finalSatRule1Check || { verified: false, detail: "" };
    const rule2Summary = finalRule2SummaryText || "3, 7, 11 பாவ தசா-புக்தி தொடர்பு";
    const calMarrYr = marriageCalculatedYear || (marrBhukti ? marrBhukti.startDate.getFullYear() : "");

    const marrNadiText = `
      <div style="margin-bottom:0.45rem;">
        <div style="color:#c4b5fd; font-weight:700; font-size:0.75rem; margin-bottom:2px;">
          🪐 விதி 1: கோச்சார சனி - 7-ஆம் அதிபதி பிரமாணம் (${isFemale ? 'பெண் ஜாதகம்' : 'ஆண் ஜாதகம்'}):
        </div>
        <div style="color:#ede9fe; font-size:0.75rem; line-height:1.45;">
          ${satRule1Info.verified 
            ? `ஒருவருக்கு 7-ஆம் அதிபதி மீது சனி பகவான் பயணிக்கும் காலத்திலோ (இணைவு - 1st) அல்லது தனது 3, 7, 10 பார்வைகளால் நோக்கும் போதோ திருமணம் நடைபெறும். இச்சாதகத்தில் <strong>${satRule1Info.detail}</strong> இதனால் <strong>${calMarrYr}</strong>-ஆம் ஆண்டில் சுப விவாக யோகம் உறுதியாகக் கைகூடுகிறது.` 
            : `ஒருவருக்கு 7-ஆம் அதிபதி மீது சனி பகவான் பயணிக்கும் போதோ அல்லது 3, 7, 10 பார்வையால் நோக்கும் போதோ விவாக பந்தம் கூடும். 7-ஆம் அதிபதி ${lord7} பெற்றுள்ள கோச்சார சனி தொடர்பால் <strong>${calMarrYr}</strong>-ல் சுப முகூர்த்தம் அமைகிறது.`}
        </div>
      </div>

      <div style="margin-bottom:0.45rem;">
        <div style="color:#c4b5fd; font-weight:700; font-size:0.75rem; margin-bottom:2px;">
          📜 விதி 2: 3, 7, 11 பாவ தசா-புக்தி-அந்தர தொடர்பு:
        </div>
        <div style="color:#ede9fe; font-size:0.75rem; line-height:1.45;">
          3-ஆம் பாவம் (உடன்படிக்கை/முயற்சி), 7-ஆம் பாவம் (களத்திரம்/விவாகம்), 11-ஆம் பாவம் (மங்கல ஆசை பூர்த்தி) ஆகிய பாவ தொடர்புகள் இல்லாமல் திருமணம் நடைபெறாது. 
          இச்சாதகத்தில் விவாக காலத்தில்: <strong>${rule2Summary}</strong> பெற்று திருமணம் உறுதியாகிறது.
        </div>
      </div>

      <div>
        <div style="color:#c4b5fd; font-weight:700; font-size:0.75rem; margin-bottom:2px;">
          🔮 நாடி துணைவர் காரக அமைப்பு:
        </div>
        <div style="color:#ede9fe; font-size:0.75rem; line-height:1.45;">
          ${spouseNadiTrait}
        </div>
      </div>
    `;

    const marrSubhaText = isLateMarriage
      ? `7-ஆம் அதிபதி ${lord7} சுபத்துவம்: ${lord7SubhaObj.netScore >= 0 ? '+' : ''}${lord7SubhaObj.netScore} • களத்திர காரகன் ${kPlanet}: ${getSubha(kPlanet).netScore >= 0 ? '+' : ''}${getSubha(kPlanet).netScore}. லக்ன-களத்திரத்தில் ராகு/கேது அச்சு அல்லது 7-ல் சனி பார்வை உள்ளதால் பாவத்துவ அமைப்பால் பருவ வயதைத் தாண்டி வயது 27-க்கு மேல் திருமணம் சுபமாக நிகழ்ந்துள்ளது.`
      : `7-ஆம் அதிபதி ${lord7} சுபத்துவம்: ${lord7SubhaObj.netScore >= 0 ? '+' : ''}${lord7SubhaObj.netScore} • களத்திர காரகன் ${kPlanet}: ${getSubha(kPlanet).netScore >= 0 ? '+' : ''}${getSubha(kPlanet).netScore}. 7-ஆம் அதிபதி மற்றும் லக்னாதிபதியின் சுபத்துவ பலத்தால் தகுந்த பருவ வயதிலேயே சுப முகூர்த்தம் கைகூடும் அமைப்பு.`;

    // 4. CHILDBIRTH
    const gNadi = getNadiConnections("குரு");
    let childNadiText = "";
    if (gNadi.conj.includes("சூரியன்") || gNadi.trine.includes("சூரியன்") || gNadi.conj.includes("செவ்வாய்") || gNadi.trine.includes("செவ்வாய்")) {
      childNadiText = "நாடி ஜீவ விதிகளின்படி புத்திர காரகன் குருவுக்கு ஆண் கிரகங்களான சூரியன் / செவ்வாயின் நாடித் தொடர்பு இருப்பதால் பலமுள்ள வாரிசு யோகம் மற்றும் குலப்பெருமை காக்கும் சந்தான பாக்கியம் உறுதியாக உண்டு.";
    } else if (gNadi.conj.includes("சந்திரன்") || gNadi.trine.includes("சந்திரன்") || gNadi.conj.includes("சுக்கிரன்") || gNadi.trine.includes("சுக்கிரன்")) {
      childNadiText = "நாடி ஜீவ விதிகளின்படி புத்திர காரகன் குருவுக்கு பெண் கிரகங்களான சந்திரன் / சுக்கிரன் நாடித் தொடர்பு உள்ளதால் லட்சுமி கடாட்சம் கொண்ட வாரிசு யோகம் உண்டு.";
    } else if (gNadi.conj.includes("கேது") || gNadi.trine.includes("கேது")) {
      childNadiText = "நாடி விதிப்படி புத்திர காரகன் குருவுடன் ஞான காரகன் கேது இணைவதால் தெய்வ அனுகூலமும் புத்தி கூர்மையும் கொண்ட ஞானக் குழந்தை யோகம் அமையும்.";
    } else {
      childNadiText = "நாடி ஜீவ விதிகளின்படி குரு நின்ற திரிகோண அமைப்பால் வம்ச விருத்தியும் சந்தான பாக்கியமும் சீராகக் கைகூடும்.";
    }

    const childSubhaText = `புத்திர காரகன் குரு சுபத்துவம்: ${guruSubha.netScore >= 0 ? '+' : ''}${guruSubha.netScore} (+${guruSubha.subhaScore} சுபத்துவம் / -${guruSubha.papaScore} பாவத்துவம்) • 5-ஆம் பாவாதிபதி ${lord5}: ${lord5Subha.netScore >= 0 ? '+' : ''}${lord5Subha.netScore}. புத்திர ஸ்தானத்தில் உள்ள கிரகங்களின் சுப பலத்தைப் பொறுத்து ஆரோக்கியமான வாரிசு யோகம் கைகூடும் காலம்.`;

    // 5. HOUSE / PROPERTY
    const mNadi = getNadiConnections("செவ்வாய்");
    let houseNadiText = "";
    if (mNadi.conj.includes("குரு") || mNadi.trine.includes("குரு")) {
      houseNadiText = "நாடி பூமி தத்துவப்படி பூமி காரகன் செவ்வாய்க்கு குருவின் திரிகோண சேர்க்கை இருப்பதால் வளமான பூர்வீக மனை, இயற்கை எழில் மிகுந்த தோட்டம்/வீடு வாங்கும் யோகம் உண்டு.";
    } else if (mNadi.conj.includes("சனி") || mNadi.trine.includes("சனி") || mNadi.forward.includes("சனி")) {
      houseNadiText = "நாடி தத்துவப்படி செவ்வாய்-சனி சேர்க்கையால் நவீன அடுக்குமாடி குடியிருப்பு, கட்டுமான சொத்து மற்றும் வாடகை வருமானம் தரும் சொத்து யோகம் அமையும்.";
    } else if (mNadi.conj.includes("புதன்") || mNadi.trine.includes("புதன்")) {
      houseNadiText = "நாடி தத்துவப்படி செவ்வாய்-புதன் சேர்க்கையால் நகர்ப்புற வணிக மனை, வர்த்தக ரீதியான மதிப்புமிக்க ரியல் எஸ்டேட் சொத்து யோகம் அமையும்.";
    } else {
      houseNadiText = "நாடி தத்துவப்படி பூமி காரகன் செவ்வாய் பலத்தால் சொந்த மனை வாங்கி விருப்பத்திற்கேற்ப புதிய வீடு கட்டும் யோகம் உண்டு.";
    }

    const houseSubhaText = `4-ஆம் பாவாதிபதி ${lord4} சுபத்துவம்: ${getSubha(lord4).netScore >= 0 ? '+' : ''}${getSubha(lord4).netScore} • பூமி காரகன் செவ்வாய் சுபத்துவம்: ${getSubha("செவ்வாய்").netScore >= 0 ? '+' : ''}${getSubha("செவ்வாய்").netScore}. 4-ஆம் பாவத்தில் பாப கிரக தாக்கங்கள் இன்றி சுப கிரக பார்வை பெறுவதால் சொந்த வீடு கட்டும் யோகம் அமைகிறது.`;

    // 6. VEHICLE / CAR
    const vNadi = getNadiConnections("சுக்கிரன்");
    let vehicleNadiText = "";
    if (vNadi.conj.includes("ராகு") || vNadi.trine.includes("ராகு")) {
      vehicleNadiText = "நாடி வாகன தத்துவப்படி வாகன காரகன் சுக்கிரன்-ராகு சேர்க்கை பிரம்மாண்டமான, நவீன சொகுசு கார் (Luxury SUV) மற்றும் உயர்தர வாகன யோகத்தைத் தரும்.";
    } else if (vNadi.conj.includes("குரு") || vNadi.trine.includes("குரு") || vNadi.conj.includes("சூரியன்")) {
      vehicleNadiText = "நாடி வாகன தத்துவப்படி சுக்கிரன்-குரு சேர்க்கை சமூகத்தில் மதிப்பும் கவுரவமும் தரும் பிரஸ்டீஜ் வெள்ளை/சில்வர் நிற கார் யோகத்தைத் தரும்.";
    } else if (vNadi.conj.includes("சனி") || vNadi.trine.includes("சனி")) {
      vehicleNadiText = "நாடி வாகன தத்துவப்படி சுக்கிரன்-சனி சேர்க்கை நீடித்து உழைக்கும், சௌகரியமான சொந்த நான்கு சக்கர வாகன யோகத்தைத் தரும்.";
    } else {
      vehicleNadiText = "நாடி வாகன தத்துவப்படி சுக்கிரன் பலத்தால் சொந்தமாக நான்கு சக்கர வாகனம் (கார்) அமையும் யோகம் உண்டு.";
    }

    const vehicleSubhaText = `வாகன காரகன் சுக்கிரன் சுபத்துவம்: ${venusSubha.netScore >= 0 ? '+' : ''}${venusSubha.netScore} • 4-ஆம் பாவாதிபதி ${lord4}: ${getSubha(lord4).netScore >= 0 ? '+' : ''}${getSubha(lord4).netScore}. சுக்கிரனின் சுபத்துவ மதிப்பெண் +3-க்கு மேல் அமைவது சொகுசு கார் யோகத்தைக் குறிக்கும்.`;

    return {
      education: educationData,
      jobVerdict: {
        type: jobType,
        verdict: jobVerdict,
        reason: jobReason,
        fields: recommendedFields,
        canStartBusiness: canStartNewBusiness,
        location: jobLocationData,
        nadiPrediction: jobNadiText,
        subhaPrediction: jobSubhaText
      },
      jobTiming: {
        firstJob: firstJobData,
        secondJob: secondJobData,
        lossBreak: jobLossBreakData,
        careerElevation: careerElevationData,
        nadiPrediction: timingNadiText,
        subhaPrediction: timingSubhaText
      },
      marriage: marriageData ? {
        ...marriageData,
        nadiPrediction: marrNadiText,
        subhaPrediction: marrSubhaText
      } : null,
      child: childData ? {
        ...childData,
        nadiPrediction: childNadiText,
        subhaPrediction: childSubhaText
      } : null,
      house: houseData ? {
        ...houseData,
        nadiPrediction: houseNadiText,
        subhaPrediction: houseSubhaText
      } : null,
      vehicle: carData ? {
        ...carData,
        nadiPrediction: vehicleNadiText,
        subhaPrediction: vehicleSubhaText
      } : null
    };
  }

  function renderEvaluationResults(analysis) {
    const container = document.getElementById("chartAnalysisContainer");
    if (!container) return;
    const RASIS = (window.PGAstro && window.PGAstro.chart && window.PGAstro.chart.RASIS) || [];

    if (analysis.placedPlanets.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align:center; padding: 2rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🌌</div>
          <h4>கிரகங்களை கட்டத்தில் வைக்கவும்</h4>
          <p style="font-size: 0.85rem; margin-top: 0.3rem;">மேலே உள்ள கிரகங்களை தொட்டு, ராசி கட்டங்களில் கிளிக் செய்து வைக்கவும் அல்லது தயாராக உள்ள மாதிரி ஜாதகங்களை தேர்ந்தெடுக்கவும்.</p>
        </div>
      `;
      return;
    }

    let html = "";

    // Extract Native Info details for top summary banner
    const nInfo = analysis.nativeInfo || (window.PGAstro && window.PGAstro.chart && window.PGAstro.chart.getNativeInfo()) || {};
    const nName = nInfo.name || document.getElementById("birthCalcName")?.value || "அன்பர் (Native)";
    const nGender = nInfo.gender === "female" ? "பெண் (Female)" : (nInfo.gender === "other" ? "மற்றவை" : "ஆண் (Male)");
    const nDob = nInfo.dob || document.getElementById("birthCalcDate")?.value || "-";
    const nTime = nInfo.time || document.getElementById("birthCalcTime")?.value || "-";
    let nPlace = nInfo.place || document.getElementById("birthCalcPlaceCustom")?.value || "";
    if (!nPlace) {
      const pSel = document.getElementById("birthCalcPlaceSelect");
      if (pSel && pSel.value && window.PGAstro && window.PGAstro.astronomy && window.PGAstro.astronomy.CITIES[pSel.value]) {
        nPlace = window.PGAstro.astronomy.CITIES[pSel.value].name;
      } else {
        nPlace = "திருவண்ணாமலை (Tiruvannamalai)";
      }
    }

    const lagnaId = (window.PGAstro && window.PGAstro.chart && window.PGAstro.chart.getLagnaRasiId()) || null;
    const lagnaDeg = (window.PGAstro && window.PGAstro.chart && window.PGAstro.chart.getLagnaDegree()) || null;
    const lagnaRasi = lagnaId ? (RASIS.find(r => r.id === lagnaId)?.name || "") : "";
    const moonPlanet = (analysis.placedPlanets || []).find(p => p.planet === "சந்திரன்");
    const moonRasi = moonPlanet ? (RASIS.find(r => r.id === moonPlanet.rasiId)?.name || "") : "";

    // =========================================================================
    // 1. LIFE PREDICTIONS & KEY MILESTONES (முக்கிய வாழ்க்கை பலன்கள்)
    // =========================================================================
    if (analysis.lifeMilestones) {
      const m = analysis.lifeMilestones;
      const ed = m.education;
      const jv = m.jobVerdict;
      const jt = m.jobTiming;
      const mr = m.marriage;
      const ch = m.child;
      const hs = m.house;
      const vh = m.vehicle;

      html += `
        <div class="milestones-dashboard-card">
          <!-- Header -->
          <div class="milestones-header">
            <div>
              <h3 class="milestones-title">
                <span>🌟</span> முக்கிய வாழ்க்கை பலன்கள் & கால நிர்ணயம் (Life Predictions)
              </h3>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                சுபத்துவம், சூட்சும வலு & நாடி விதிகளின்படி கணிக்கப்பட்ட கல்வி, வேலை, திருமணம், குழந்தைப் பிறப்பு, வீடு, கார் யோகங்கள்
              </div>
            </div>
            <span class="badge badge-gold" style="font-size:0.72rem;">நாடி & சுபத்துவ பிரமாணம்</span>
          </div>

          <!-- Native Birth Summary Strip -->
          <div style="background: rgba(13, 18, 36, 0.85); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: var(--radius-md); padding: 0.65rem 0.9rem; margin: 0.6rem 0 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1.2rem; align-items: center; font-size: 0.82rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
            <div style="display: flex; align-items: center; gap: 0.35rem; color: #fff; font-weight: 700;">
              <span style="font-size: 1rem;">👤</span> <span>${nName}</span>
              <span class="badge ${nInfo.gender === 'female' ? 'badge-pink' : 'badge-gold'}" style="font-size:0.68rem; margin-left:3px;">${nGender}</span>
            </div>
            <div style="color: var(--text-muted);">
              <strong style="color: var(--gold-light);">📅 பிறந்த நாள் & நேரம்:</strong> ${nDob} ${nTime}
            </div>
            <div style="color: var(--text-muted);">
              <strong style="color: var(--gold-light);">📍 பிறந்த இடம் (Place of Birth):</strong> <span style="color: #93c5fd; font-weight: 600;">${nPlace}</span>
            </div>
            ${lagnaRasi ? `<div style="color: var(--text-muted);"><strong style="color: var(--gold-light);">🌅 லக்கினம்:</strong> <span style="color:#fff;">${lagnaRasi} ${lagnaDeg !== null ? '(' + lagnaDeg.toFixed(1) + '°)' : ''}</span></div>` : ''}
            ${moonRasi ? `<div style="color: var(--text-muted);"><strong style="color: var(--gold-light);">🌙 ராசி:</strong> <span style="color:#fff;">${moonRasi}</span></div>` : ''}
          </div>

          <!-- 7 Core Milestones Grid -->
          <div class="milestones-grid">

            <!-- Card 0: Education & Field of Study (கல்வி & படிப்புத் துறை யோகம்) -->
            ${ed ? `
            <div class="milestone-card card-education">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">🎓</span>
                    <div>
                      <h4 class="milestone-card-title">கல்வி & படிப்புத் துறை</h4>
                      <span class="milestone-card-subtitle">Education & Field of Study</span>
                    </div>
                  </div>
                  <span class="badge ${ed.badgeClass}" style="font-size:0.68rem;">
                    ${ed.isStudent ? 'எதிர்காலக் கல்வி' : 'பயின்ற கல்வி'}
                  </span>
                </div>

                <div class="milestone-verdict-box" style="background:rgba(6, 182, 212, 0.08); border-color:rgba(6, 182, 212, 0.25);">
                  <div style="font-size:0.73rem; color:var(--text-muted); margin-bottom:2px;">${ed.headingText}</div>
                  <div class="milestone-highlight-text" style="color:#22d3ee; font-size:0.95rem;">${ed.primaryStream.name}</div>
                  <div style="font-size:0.75rem; color:#fde047; margin-top:3px; font-weight:600;">
                    📘 உகந்த படிப்புகள்: ${ed.primaryStream.degrees}
                  </div>
                  ${ed.timing ? `
                    <span class="milestone-time-pill" style="margin-top:5px; display:inline-block;">
                      📅 ${ed.timing.yearRange} • ${ed.timing.dasaBhukti} (${ed.timing.ageText})
                    </span>
                  ` : ''}
                </div>

                <p class="milestone-desc-text" style="margin-top:0.45rem;">${ed.primaryStream.desc}</p>

                <!-- Study-Job Alignment Box (படித்த படிப்பு சார்ந்த வேலை அமையுமா?) -->
                <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.25); border-radius:var(--radius-sm); padding:0.6rem 0.75rem; margin-top:0.5rem;">
                  <div style="font-size:0.72rem; color:#34d399; font-weight:700; display:flex; justify-content:space-between; align-items:center;">
                    <span>💼 படிப்பு சார்ந்த வேலை அமையுமா?</span>
                    <span class="badge ${ed.jobAlignment.badgeClass}" style="font-size:0.65rem;">
                      ${ed.jobAlignment.isAligned ? 'நேரடித் தொடர்பு' : 'மாற்றுத் துறை'}
                    </span>
                  </div>
                  <div style="font-size:0.82rem; font-weight:700; color:#fff; margin-top:3px;">
                    ${ed.jobAlignment.verdict}
                  </div>
                  <div style="font-size:0.72rem; color:var(--text-dim); margin-top:3px; line-height:1.4;">
                    ${ed.jobAlignment.details}
                  </div>
                </div>

                <!-- Education Level & Higher Studies -->
                <div style="background:rgba(59, 130, 246, 0.08); border:1px solid rgba(59, 130, 246, 0.2); border-radius:var(--radius-sm); padding:0.55rem 0.75rem; margin-top:0.45rem;">
                  <div style="font-size:0.72rem; color:#60a5fa; font-weight:700;">
                    📚 கல்வி நிலை: <span style="color:#fff;">${ed.educationLevel.verdict}</span>
                  </div>
                  <div style="font-size:0.71rem; color:var(--text-muted); margin-top:2px; line-height:1.35;">
                    ${ed.educationLevel.details}
                  </div>
                </div>

                <!-- Obstacles / Continuity in Studies -->
                <div style="font-size:0.72rem; color:#cbd5e1; margin-top:0.45rem; padding:0.4rem 0.6rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-sm); line-height:1.35;">
                  📖 <strong>கல்வித் தொடர்ச்சி:</strong> ${ed.obstacleText}
                </div>

                ${ed.nadiPrediction ? `
                  <div class="milestone-nadi-box">
                    <div class="nadi-badge">🔮 நாடி வித்யா பிரமாணம் (Nadi Rule)</div>
                    <div class="nadi-box-content">${ed.nadiPrediction}</div>
                  </div>
                ` : ""}

                ${ed.subhaPrediction ? `
                  <div class="milestone-subha-box">
                    <div class="subha-badge">✨ வித்யா காரக சுபத்துவ பலம்</div>
                    <div class="subha-box-content">${ed.subhaPrediction}</div>
                  </div>
                ` : ""}

                ${ed.remedy ? `
                  <div style="background:rgba(168, 85, 247, 0.08); border:1px solid rgba(168, 85, 247, 0.25); border-radius:var(--radius-sm); padding:0.5rem 0.7rem; margin-top:0.5rem;">
                    <div style="font-size:0.7rem; color:#c084fc; font-weight:700; margin-bottom:2px;">
                      🪔 கல்வி மேன்மைக்கான பரிகாரம்:
                    </div>
                    <div style="font-size:0.72rem; color:#e9d5ff; line-height:1.35;">
                      ${ed.remedy}
                    </div>
                  </div>
                ` : ""}
              </div>

              <div class="milestone-tag-row">
                <span style="font-size:0.68rem; color:var(--gold-light); font-weight:700; width:100%; margin-bottom:2px;">கூடுதல் மாற்றுத் துறை:</span>
                <span class="milestone-tag" style="border-color:rgba(6, 182, 212, 0.4); color:#67e8f9;">${ed.secondaryStream.name}</span>
              </div>
            </div>
            ` : ""}

            <!-- Card 1: Business vs Job & Can Start New Business -->
            <div class="milestone-card card-job-type">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">💼</span>
                    <div>
                      <h4 class="milestone-card-title">தொழில் அல்லது வேலை?</h4>
                      <span class="milestone-card-subtitle">Business vs Salaried Job</span>
                    </div>
                  </div>
                  <span class="badge ${jv.type === 'business' ? 'badge-gold' : (jv.type === 'job' ? 'badge-blue' : 'badge-green')}" style="font-size:0.68rem;">
                    ${jv.type === 'business' ? 'சுய தொழில்' : (jv.type === 'job' ? 'உத்தியோகம்' : 'இரண்டும்')}
                  </span>
                </div>

                <div class="milestone-verdict-box">
                  <div class="milestone-highlight-text" style="color:#38bdf8;">${jv.verdict}</div>
                </div>

                <p class="milestone-desc-text">${jv.reason}</p>

                ${jv.canStartBusiness ? `
                  <div style="background:rgba(245, 158, 11, 0.08); border:1px solid rgba(245, 158, 11, 0.25); border-radius:var(--radius-sm); padding:0.6rem 0.75rem; margin-top:0.5rem;">
                    <div style="font-size:0.72rem; color:#fbbf24; font-weight:700; display:flex; justify-content:space-between; align-items:center;">
                      <span>🏢 புதிய தொழில் தொடங்க முடியுமா?</span>
                      <span class="badge ${jv.canStartBusiness.canStart ? 'badge-green' : 'badge-gold'}" style="font-size:0.65rem;">
                        ${jv.canStartBusiness.canStart ? 'ஆம், தொடங்கலாம்' : 'உத்தியோகமே நன்று'}
                      </span>
                    </div>
                    <div style="font-size:0.84rem; font-weight:700; color:#fff; margin-top:3px;">
                      ${jv.canStartBusiness.verdict}
                    </div>
                    <div style="font-size:0.73rem; color:#6ee7b7; margin-top:3px;">
                      ⏳ <strong>உகந்த தொடக்க காலம்:</strong> ${jv.canStartBusiness.timingText}
                    </div>
                    <div style="font-size:0.72rem; color:var(--text-dim); margin-top:3px; line-height:1.35;">
                      ${jv.canStartBusiness.details}
                    </div>
                  </div>
                ` : ""}

                ${jv.location ? `
                  <div class="job-location-card-section">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:4px;">
                      <div style="font-size:0.75rem; font-weight:700; color:#38bdf8; display:flex; align-items:center; gap:5px;">
                        <span>📍</span> உத்தியோக இடம் & வாய்ப்பு கணிப்பு (Job Location):
                      </div>
                      <span class="badge ${jv.location.badgeClass}" style="font-size:0.68rem;">${jv.location.badgeText}</span>
                    </div>

                    <div style="font-size:0.92rem; font-weight:800; color:#fff; margin-bottom:0.35rem;">
                      ${jv.location.primaryVerdict}
                    </div>

                    <div style="font-size:0.75rem; color:#e0f2fe; line-height:1.45; margin-bottom:0.55rem;">
                      ${jv.location.explanation}
                    </div>

                    <!-- Status: வேலைக்கு போகவில்லையா? (Employment / Job Seeking Status) -->
                    <div style="background:rgba(0,0,0,0.25); border-left:3px solid ${jv.location.statusColor}; padding:0.45rem 0.65rem; border-radius:3px; margin-bottom:0.55rem;">
                      <div style="font-size:0.72rem; font-weight:700; color:${jv.location.statusColor};">
                        💼 தற்போதைய பணி நிலை (Employment Status):
                      </div>
                      <div style="font-size:0.76rem; color:#f1f5f9; margin-top:2px; line-height:1.4;">
                        ${jv.location.statusText}
                      </div>
                    </div>

                    <!-- Probability Distribution -->
                    <div style="margin-top:0.4rem;">
                      <div style="font-size:0.68rem; color:var(--gold-light); font-weight:700; margin-bottom:4px;">
                        🌐 பணி இட யோக விகிதம் (Location Probability Breakdown):
                      </div>
                      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:5px;">
                        <div class="loc-prob-box">
                          <span class="loc-prob-lbl">✈️ வெளிநாடு:</span>
                          <span class="loc-prob-val" style="color:#38bdf8;">${jv.location.probForeign}%</span>
                        </div>
                        <div class="loc-prob-box">
                          <span class="loc-prob-lbl">🚆 வெளி மாநிலம்:</span>
                          <span class="loc-prob-val" style="color:#c084fc;">${jv.location.probState}%</span>
                        </div>
                        <div class="loc-prob-box">
                          <span class="loc-prob-lbl">🚗 வெளி மாவட்டம்:</span>
                          <span class="loc-prob-val" style="color:#fbbf24;">${jv.location.probDistrict}%</span>
                        </div>
                        <div class="loc-prob-box">
                          <span class="loc-prob-lbl">🏡 சொந்த ஊர்:</span>
                          <span class="loc-prob-val" style="color:#34d399;">${jv.location.probLocal}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : ""}

                ${jv.nadiPrediction ? `
                  <div class="milestone-nadi-box">
                    <div class="nadi-badge">🔮 நாடி ஜோதிட பிரமாணம் (Nadi Rule)</div>
                    <div class="nadi-box-content">${jv.nadiPrediction}</div>
                  </div>
                ` : ""}

                ${jv.subhaPrediction ? `
                  <div class="milestone-subha-box">
                    <div class="subha-badge">✨ சுபத்துவம், பாவத்துவம் & சூட்சும வலு</div>
                    <div class="subha-box-content">${jv.subhaPrediction}</div>
                  </div>
                ` : ""}
              </div>

              <div class="milestone-tag-row">
                <span style="font-size:0.68rem; color:var(--gold-light); font-weight:700; width:100%; margin-bottom:2px;">உகந்த துறைகள்:</span>
                ${jv.fields.map(f => `<span class="milestone-tag">${f}</span>`).join("")}
              </div>
            </div>

            <!-- Card 2: Job Timing, 1st & 2nd Job, Job Loss & Elevation -->
            <div class="milestone-card card-job-time">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">🎯</span>
                    <div>
                      <h4 class="milestone-card-title">எப்போது வேலை கிடைக்கும்?</h4>
                      <span class="milestone-card-subtitle">Job Timing, Break & Career Leap</span>
                    </div>
                  </div>
                  <span class="badge badge-gold" style="font-size:0.68rem;">உத்தியோக காலம்</span>
                </div>

                ${jt.firstJob ? `
                  <div class="milestone-verdict-box" style="margin-bottom:0.4rem;">
                    <div style="font-size:0.75rem; color:var(--text-muted);">${jt.firstJob.isPast ? 'முதல் வேலை கிடைத்த காலம் (First Job):' : 'வேலை அமையும் காலம்:'}</div>
                    <div class="milestone-highlight-text" style="color:#fbbf24; font-size:0.88rem;">${jt.firstJob.dasaBhukti}</div>
                    <span class="milestone-time-pill">📅 ${jt.firstJob.yearRange} • ${jt.firstJob.ageText}</span>
                  </div>
                ` : ""}

                ${jt.secondJob ? `
                  <div class="milestone-verdict-box" style="background:rgba(59, 130, 246, 0.08); border-color:rgba(59, 130, 246, 0.25); margin-bottom:0.4rem;">
                    <div style="font-size:0.75rem; color:#93c5fd;">இரண்டாவது வேலை & நிரந்தரப் பணி (Second & Permanent Job):</div>
                    <div class="milestone-highlight-text" style="color:#60a5fa; font-size:0.88rem;">${jt.secondJob.dasaBhukti}</div>
                    <span class="milestone-time-pill" style="color:#93c5fd; border-color:rgba(59, 130, 246, 0.35); background:rgba(59, 130, 246, 0.12);">📅 ${jt.secondJob.yearRange} • ${jt.secondJob.ageText}</span>
                  </div>
                ` : ""}

                ${jt.lossBreak ? `
                  <div style="background:rgba(239, 68, 68, 0.08); border:1px solid rgba(239, 68, 68, 0.22); border-radius:var(--radius-sm); padding:0.55rem 0.7rem; margin-bottom:0.4rem;">
                    <div style="font-size:0.72rem; color:#f87171; font-weight:700;">⚠️ வேலை இழப்பு / தொழில் இடைவெளி எச்சரிக்கை (Job Loss & Break Periods):</div>
                    <div style="font-size:0.75rem; color:#fca5a5; margin-top:2px; line-height:1.35;">
                      <strong>பாதிப்பு காலம்:</strong> ${jt.lossBreak.pastPeriods}
                    </div>
                    <div style="font-size:0.72rem; color:var(--text-dim); margin-top:3px; line-height:1.35;">
                      🛡️ <strong>எச்சரிக்கை:</strong> ${jt.lossBreak.futureWarning}
                    </div>
                    <div style="font-size:0.72rem; color:#fde68a; margin-top:3px;">
                      ⚡ <strong>பரிகாரம்:</strong> ${jt.lossBreak.remedy}
                    </div>
                  </div>
                ` : ""}

                ${jt.careerElevation ? `
                  <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.2); border-radius:var(--radius-sm); padding:0.55rem 0.7rem;">
                    <div style="font-size:0.72rem; color:#34d399; font-weight:700;">🚀 நடப்பு / அடுத்த உச்ச தொழில் உயர்வு (Career Leap):</div>
                    <div style="font-size:0.85rem; font-weight:700; color:#fff; margin-top:2px;">${jt.careerElevation.dasaBhukti}</div>
                    <div style="font-size:0.74rem; color:var(--text-dim); margin-top:2px;">வருடம்: <strong>${jt.careerElevation.yearRange}</strong> (${jt.careerElevation.ageText}) - உயர் பொறுப்பு & வருமானப் பெருக்கம்.</div>
                  </div>
                ` : ""}

                ${jt.nadiPrediction ? `
                  <div class="milestone-nadi-box">
                    <div class="nadi-badge">🔮 நாடி ஜோதிட பிரமாணம் (Nadi Rule)</div>
                    <div class="nadi-box-content">${jt.nadiPrediction}</div>
                  </div>
                ` : ""}

                ${jt.subhaPrediction ? `
                  <div class="milestone-subha-box">
                    <div class="subha-badge">✨ சுபத்துவம், பாவத்துவம் & சூட்சும வலு</div>
                    <div class="subha-box-content">${jt.subhaPrediction}</div>
                  </div>
                ` : ""}
              </div>

              <div class="milestone-tag-row">
                <span class="milestone-tag">10-ஆம் அதிபதி</span>
                <span class="milestone-tag">சனி (ஜீவன காரகன்)</span>
                <span class="milestone-tag">சுபத்துவ தசா புத்தி</span>
              </div>
            </div>

            <!-- Card 3: Marriage Timing (திருமணம் & மறுமணம்) -->
            <div class="milestone-card card-marriage">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">💍</span>
                    <div>
                      <h4 class="milestone-card-title">${mr && mr.secondMarriage ? 'திருமணம் & மறுமணம் எப்போது?' : 'திருமணம் எப்போது ஆகும்?'}</h4>
                      <span class="milestone-card-subtitle">${mr && mr.secondMarriage ? '1st Marriage, Separation & 2nd Marriage' : (mr && mr.isUnmarried ? 'தாமத விவாக அமைப்பு & சுப முகூர்த்த யோகம்' : 'Early vs Late Marriage & Timing')}</span>
                    </div>
                  </div>
                  <span class="badge ${mr && mr.secondMarriage ? 'badge-gold' : (mr && mr.isPast ? 'badge-blue' : 'badge-gold')}" style="${mr && mr.secondMarriage ? '' : (mr && mr.isPast ? '' : 'border-color:#ec4899; color:#f472b6;')} font-size:0.68rem;">
                    ${mr && mr.secondMarriage ? 'களத்திர & மறுமண யோகம்' : (mr && mr.isPast ? 'நிகழ்ந்த காலம் (Past)' : (mr && mr.isUnmarried ? '💍 தீவிர விவாக யோகம் (Upcoming)' : 'களத்திர யோகம்'))}
                  </span>
                </div>

                ${mr ? `
                  ${(mr.delayReasons && mr.delayReasons.length > 0 && !mr.secondMarriage) ? `
                    <div style="background:rgba(239, 68, 68, 0.08); border:1px solid rgba(239, 68, 68, 0.25); border-radius:var(--radius-sm); padding:0.5rem 0.65rem; margin-bottom:0.45rem;">
                      <div style="font-size:0.72rem; color:#f87171; font-weight:700; margin-bottom:3px;">
                        ⏳ திருமணம் இதுவரை தாமதமானதற்கான ஜோதிட காரணங்கள்:
                      </div>
                      <ul style="margin:0; padding-left:1.15rem; font-size:0.73rem; color:#fecaca; line-height:1.45;">
                        ${mr.delayReasons.map(r => `<li>${r}</li>`).join("")}
                      </ul>
                    </div>
                  ` : ""}

                  ${mr.firstMarriage ? `
                    <div style="background:rgba(236,72,153,0.06); border:1px solid rgba(236,72,153,0.2); border-radius:var(--radius-sm); padding:0.5rem 0.65rem; margin-bottom:0.4rem;">
                      <div style="font-size:0.72rem; color:#f472b6; font-weight:700;">💒 முதல் திருமணம் & பிரிவு வரலாறு:</div>
                      <div style="font-size:0.75rem; color:#fbcfe8; margin-top:2px;">
                        • ${mr.firstMarriage.statusText}
                      </div>
                      <div style="font-size:0.75rem; color:#fca5a5; margin-top:2px;">
                        • ${mr.firstMarriage.separationText}
                      </div>
                    </div>
                  ` : ""}

                  ${mr.divorce ? `
                    <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.25); border-radius:var(--radius-sm); padding:0.5rem 0.65rem; margin-bottom:0.4rem;">
                      <div style="font-size:0.72rem; color:#f87171; font-weight:700;">⚖️ ${mr.divorce.title}:</div>
                      <div style="font-size:0.84rem; color:#fff; font-weight:700; margin-top:2px;">${mr.divorce.dasaBhukti} (${mr.divorce.yearRange})</div>
                      <div style="font-size:0.74rem; color:#fca5a5; margin-top:2px; line-height:1.35;">${mr.divorce.reason}</div>
                    </div>
                  ` : ""}

                  ${mr.secondMarriage ? `
                    <div class="milestone-verdict-box" style="background:rgba(245, 158, 11, 0.08); border-color:rgba(245, 158, 11, 0.3); margin-bottom:0.4rem;">
                      <div style="font-size:0.74rem; color:#fbbf24; font-weight:700;">✨ 2-வது திருமணம் / மறுமணம் கைகூடும் யோக காலம்:</div>
                      <div class="milestone-highlight-text" style="color:#f472b6; font-size:0.9rem;">${mr.secondMarriage.dasaBhukti}</div>
                      <span class="milestone-time-pill" style="color:#f472b6; border-color:rgba(236,72,153,0.4); background:rgba(236,72,153,0.12);">
                        📅 ${mr.secondMarriage.yearRange} • ${mr.secondMarriage.ageText}
                      </span>
                    </div>

                    <div style="background:rgba(236, 72, 153, 0.08); border-left:3px solid #ec4899; padding:0.45rem 0.65rem; border-radius:3px; margin-bottom:0.45rem;">
                      <div style="font-size:0.72rem; color:#f472b6; font-weight:700;">காரண விளக்கம்:</div>
                      <div style="font-size:0.74rem; color:#fce7f3; line-height:1.35; margin-top:2px;">${mr.secondMarriage.reason}</div>
                    </div>
                  ` : `
                    <!-- Standard Single Marriage Timing for normal charts -->
                    <div class="milestone-verdict-box" style="margin-bottom:0.4rem; ${mr.isUnmarried ? 'background:rgba(236,72,153,0.08); border-color:rgba(236,72,153,0.35);' : ''}">
                      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${mr.isPast ? 'திருமணம் நிகழ்ந்த யோகக் காலம்:' : (mr.isUnmarried ? '💍 வரன் கூடி திருமணம் கைகூடும் யோகக் காலம்:' : 'திருமணம் கைகூடும் யோகக் காலம்:')}</div>
                      <div class="milestone-highlight-text" style="color:#f472b6;">${mr.dasaBhukti}</div>
                      <span class="milestone-time-pill" style="color:#f472b6; border-color:rgba(236,72,153,0.4); background:rgba(236,72,153,0.12);">
                        📅 ${mr.yearRange} • ${mr.ageText}
                      </span>
                      ${mr.calculatedMarriageYear ? `
                        <div style="margin-top:0.35rem; font-size:0.75rem; color:#fbcfe8; background:rgba(236,72,153,0.16); padding:0.3rem 0.55rem; border-radius:4px; border:1px solid rgba(236,72,153,0.3); font-weight:700;">
                          💒 ${mr.isUnmarried ? 'சுப முகூர்த்த யோக ஆண்டு' : 'கணிக்கப்பட்ட சுப விவாக ஆண்டு'}: ${mr.calculatedMarriageYear}
                        </div>
                      ` : ''}
                      ${mr.specialAntharam ? `
                        <div style="margin-top:0.4rem; font-size:0.74rem; color:#fbcfe8; background:rgba(236,72,153,0.12); padding:0.3rem 0.55rem; border-radius:4px; border:1px dashed rgba(236,72,153,0.35);">
                          ✨ <strong>விவாக சுப முகூர்த்த அந்தரம்:</strong> ${mr.specialAntharam}
                        </div>
                      ` : ''}
                    </div>
                    <div style="background:rgba(236, 72, 153, 0.06); border-left:3px solid #ec4899; padding:0.45rem 0.65rem; border-radius:3px; margin-bottom:0.45rem;">
                      <div style="font-size:0.72rem; color:#f472b6; font-weight:700;">${mr.earlyOrLateVerdict}:</div>
                      <div style="font-size:0.74rem; color:#fce7f3; line-height:1.35; margin-top:2px;">${mr.earlyOrLateReason}</div>
                    </div>
                  `}

                  <p class="milestone-desc-text"><strong>${mr.spouseLabel || 'துணைவர் குணம்'}:</strong> ${mr.spouseQualities}</p>
                  <div style="font-size:0.74rem; color:#bae6fd; margin-top:0.35rem; line-height:1.4;">
                    <strong>சுபத்துவ அடுக்கு:</strong> ${mr.subhaHierarchy}
                  </div>
                  ${(mr.secondMarriage ? mr.secondMarriage.remedy : mr.remedy) ? `
                    <div style="font-size:0.75rem; color:#fde68a; background:rgba(245,158,11,0.08); border-left:3px solid #f59e0b; padding:0.4rem 0.6rem; margin-top:0.4rem; border-radius:3px;">
                      ⚡ <strong>பரிகார வழிகாட்டல்:</strong> ${(mr.secondMarriage ? mr.secondMarriage.remedy : mr.remedy)}
                    </div>
                  ` : ""}

                  ${mr.marriageType ? `
                    <div style="background:rgba(236, 72, 153, 0.08); border:1px solid rgba(236, 72, 153, 0.25); border-left:3px solid #ec4899; border-radius:var(--radius-sm); padding:0.55rem 0.7rem; margin-top:0.45rem; margin-bottom:0.45rem;">
                      <div style="font-size:0.72rem; color:#f472b6; font-weight:700; display:flex; justify-content:space-between; align-items:center;">
                        <span>💘 காதல் திருமணமா? அல்லது அரேஞ்ச் மேரேஜ்-ஆ?</span>
                        <span class="badge ${mr.marriageType.badgeClass}" style="font-size:0.65rem;">
                          ${mr.marriageType.verdict}
                        </span>
                      </div>
                      <div style="font-size:0.86rem; font-weight:700; color:#fff; margin-top:3px;">
                        ${mr.marriageType.badge}
                      </div>
                      <div style="font-size:0.74rem; color:#fce7f3; margin-top:3px; line-height:1.4;">
                        ${mr.marriageType.reason}
                      </div>
                      <div style="font-size:0.71rem; color:var(--text-dim); margin-top:4px; line-height:1.35; background:rgba(0,0,0,0.22); padding:0.35rem 0.5rem; border-radius:4px;">
                        📜 <strong>பாவக & நாடி சான்றுகள்:</strong>
                        ${mr.marriageType.loveReasons.length > 0 ? `<br>• <strong style="color:#f472b6;">காதல் யோக தொடர்புகள் (5 & 7):</strong> ${mr.marriageType.loveReasons.join(" • ")}` : ''}
                        ${mr.marriageType.arrangedReasons.length > 0 ? `<br>• <strong style="color:#93c5fd;">திருமண யோக தொடர்புகள் (7 & 9 / குரு):</strong> ${mr.marriageType.arrangedReasons.join(" • ")}` : ''}
                      </div>
                    </div>
                  ` : ""}

                  ${mr.nadiPrediction ? `
                    <div class="milestone-nadi-box">
                      <div class="nadi-badge">🔮 நாடி ஜோதிட பிரமாணம் (Nadi Rule)</div>
                      <div class="nadi-box-content">${mr.nadiPrediction}</div>
                    </div>
                  ` : ""}

                  ${mr.subhaPrediction ? `
                    <div class="milestone-subha-box">
                      <div class="subha-badge">✨ சுபத்துவம், பாவத்துவம் & சூட்சும வலு</div>
                      <div class="subha-box-content">${mr.subhaPrediction}</div>
                    </div>
                  ` : ""}
                ` : `
                  <div class="milestone-verdict-box">
                    <div class="milestone-highlight-text" style="color:#f472b6;">சுக்கிரன் & 7-ஆம் அதிபதி புத்தி காலம்</div>
                    <span class="milestone-time-pill" style="color:#f472b6;">வயது 25 - 28-க்குள்</span>
                  </div>
                  <p class="milestone-desc-text">களத்திர காரகன் மற்றும் குருவின் சுப பார்வையால் மங்கள சுபகாரியம் அமையும்.</p>
                `}
              </div>

              <div class="milestone-tag-row">
                <span class="milestone-tag">7-ஆம் பாவம் (களத்திரம்)</span>
                <span class="milestone-tag">${mr && mr.spouseKaraka ? mr.spouseKaraka : 'சுக்கிரன் (களத்திர காரகன்)'}</span>
                <span class="milestone-tag">${mr && mr.secondMarriage ? 'மறுமண யோகம்' : (mr && mr.spouseLabel && mr.spouseLabel.includes('கணவர்') ? 'மாங்கல்ய யோகம்' : 'களத்திர பாக்கியம்')}</span>
              </div>
            </div>

            <!-- Card 4: Childbirth / Progeny Timing (புத்திர பாக்கியம் & குழந்தைப் பிறப்பு யோகம்) -->
            <div class="milestone-card card-child">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">👶</span>
                    <div>
                      <h4 class="milestone-card-title">குழந்தைப் பிறப்பு எப்போது?</h4>
                      <span class="milestone-card-subtitle">Childbirth & Progeny Timing</span>
                    </div>
                  </div>
                  <span class="badge ${ch && ch.isPast ? 'badge-blue' : 'badge-border'}" style="${ch && ch.isPast ? '' : 'border-color:#f43f5e; color:#fb7185;'} font-size:0.68rem;">
                    ${ch && ch.isPast ? 'நிகழ்ந்த காலம் (Past)' : 'புத்திர பாக்கியம்'}
                  </span>
                </div>

                ${ch ? `
                  <div class="milestone-verdict-box">
                    <div style="font-size:0.75rem; color:var(--text-muted);">${ch.statusHeading || (ch.isPast ? 'குழந்தைப் பிறப்பு காலம்:' : 'முதல் குழந்தை பிறக்கும் யோகக் காலம்:')}</div>
                    <div class="milestone-highlight-text" style="color:#fb7185;">${ch.dasaBhukti}</div>
                    <span class="milestone-time-pill" style="color:#fb7185; border-color:rgba(244,63,94,0.4); background:rgba(244,63,94,0.12);">
                      📅 ${ch.yearRange} • ${ch.ageText}
                    </span>
                    ${ch.specialAntharam ? `
                      <div style="margin-top:0.4rem; font-size:0.74rem; color:#fbcfe8; background:rgba(244,63,94,0.12); padding:0.3rem 0.55rem; border-radius:4px; border:1px dashed rgba(244,63,94,0.35);">
                        ✨ <strong>புத்திர பாக்கிய சுப அந்தரம்:</strong> ${ch.specialAntharam}
                      </div>
                    ` : ''}
                  </div>
                  <p class="milestone-desc-text"><strong>புத்திர நிலை:</strong> ${ch.qualityText}</p>
                  <div style="font-size:0.74rem; color:#bae6fd; margin-top:0.35rem; line-height:1.4;">
                    <strong>சுபத்துவ அடுக்கு:</strong> ${ch.subhaHierarchy}
                  </div>
                  ${ch.remedy ? `
                    <div style="font-size:0.75rem; color:#fde68a; background:rgba(245,158,11,0.08); border-left:3px solid #f59e0b; padding:0.4rem 0.6rem; margin-top:0.4rem; border-radius:3px;">
                      ⚡ <strong>வழிகாட்டல்:</strong> ${ch.remedy}
                    </div>
                  ` : ""}

                  ${ch.nadiPrediction ? `
                    <div class="milestone-nadi-box">
                      <div class="nadi-badge">🔮 நாடி ஜோதிட பிரமாணம் (Nadi Rule)</div>
                      <div class="nadi-box-content">${ch.nadiPrediction}</div>
                    </div>
                  ` : ""}

                  ${ch.subhaPrediction ? `
                    <div class="milestone-subha-box">
                      <div class="subha-badge">✨ சுபத்துவம், பாவத்துவம் & சூட்சும வலு</div>
                      <div class="subha-box-content">${ch.subhaPrediction}</div>
                    </div>
                  ` : ""}
                ` : `
                  <div class="milestone-verdict-box">
                    <div class="milestone-highlight-text" style="color:#fb7185;">குரு & 5-ஆம் அதிபதி புத்தி காலம்</div>
                    <span class="milestone-time-pill" style="color:#fb7185;">வயது 26 - 30-க்குள்</span>
                  </div>
                  <p class="milestone-desc-text">புத்திர காரகன் குரு மற்றும் 5-ஆம் பாவ சுபத்துவத்தால் ஆரோக்கியமான புத்திர பாக்கியம் உண்டாகும்.</p>
                `}
              </div>

              <div class="milestone-tag-row">
                <span class="milestone-tag">குரு (புத்திர காரகன்)</span>
                <span class="milestone-tag">5-ஆம் பாவாதிபதி</span>
                <span class="milestone-tag">வம்ச விருத்தி</span>
              </div>
            </div>

            <!-- Card 5: House / Land Timing -->
            <div class="milestone-card card-house">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">🏡</span>
                    <div>
                      <h4 class="milestone-card-title">வீடு எப்போது வாங்குவோம்?</h4>
                      <span class="milestone-card-subtitle">House Construction & Property Timing</span>
                    </div>
                  </div>
                  <span class="badge badge-border" style="border-color:#10b981; color:#34d399; font-size:0.68rem;">பூமி யோகம்</span>
                </div>

                ${hs ? `
                  ${hs.startedPeriod ? `
                    <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2); border-radius:var(--radius-sm); padding:0.45rem 0.65rem; margin-bottom:0.4rem;">
                      <div style="font-size:0.72rem; color:#34d399; font-weight:700;">🏗️ வீடு கட்டத் தொடங்கிய காலம்:</div>
                      <div style="font-size:0.75rem; color:#a7f3d0; margin-top:2px;">
                        • <strong>${hs.startedPeriod}</strong>
                      </div>
                    </div>
                  ` : ""}

                  <div class="milestone-verdict-box">
                    <div style="font-size:0.75rem; color:var(--text-muted);">${hs.isPast ? 'வீடு/மனை வாங்கிய யோகக் காலம்:' : 'வீடு முழுமையடையும் / புதிய சொத்து யோகக் காலம்:'}</div>
                    <div class="milestone-highlight-text" style="color:#34d399;">${hs.dasaBhukti}</div>
                    <span class="milestone-time-pill" style="color:#34d399; border-color:rgba(16,185,129,0.4); background:rgba(16,185,129,0.12);">
                      📅 ${hs.yearRange} • ${hs.ageText}
                    </span>
                  </div>
                  <p class="milestone-desc-text">${hs.propertyType}</p>

                  ${hs.nadiPrediction ? `
                    <div class="milestone-nadi-box">
                      <div class="nadi-badge">🔮 நாடி ஜோதிட பிரமாணம் (Nadi Rule)</div>
                      <div class="nadi-box-content">${hs.nadiPrediction}</div>
                    </div>
                  ` : ""}

                  ${hs.subhaPrediction ? `
                    <div class="milestone-subha-box">
                      <div class="subha-badge">✨ சுபத்துவம், பாவத்துவம் & சூட்சும வலு</div>
                      <div class="subha-box-content">${hs.subhaPrediction}</div>
                    </div>
                  ` : ""}
                ` : `
                  <div class="milestone-verdict-box">
                    <div class="milestone-highlight-text" style="color:#34d399;">செவ்வாய் & 4-ஆம் அதிபதி புத்தி காலம்</div>
                    <span class="milestone-time-pill" style="color:#34d399;">வயது 30 - 36-க்குள்</span>
                  </div>
                  <p class="milestone-desc-text">பூமி காரகன் செவ்வாயின் அருளால் சொந்த மனை வாங்கி அழகிய வீடு கட்டும் யோகம் அமையும்.</p>
                `}
              </div>

              <div class="milestone-tag-row">
                <span class="milestone-tag">4-ஆம் பாவம் (சுக ஸ்தானம்)</span>
                <span class="milestone-tag">செவ்வாய் (பூமி காரகன்)</span>
                <span class="milestone-tag">சொந்த மனை</span>
              </div>
            </div>

            <!-- Card 6: Vehicle & Car Timing -->
            <div class="milestone-card card-vehicle">
              <div>
                <div class="milestone-card-top">
                  <div class="milestone-icon-title">
                    <span class="icon">🚗</span>
                    <div>
                      <h4 class="milestone-card-title">வாகனம் / கார் எப்போது அமையும்?</h4>
                      <span class="milestone-card-subtitle">Vehicle & Car Yoga Timing</span>
                    </div>
                  </div>
                  <span class="badge badge-border" style="border-color:#a855f7; color:#c084fc; font-size:0.68rem;">வாகன யோகம்</span>
                </div>

                ${vh ? `
                  <div class="milestone-verdict-box">
                    <div style="font-size:0.75rem; color:var(--text-muted);">${vh.statusHeading || (vh.isPast ? 'வாகனம்/கார் அமைந்த யோகக் காலம்:' : 'கார் வாங்கும் யோகக் காலம்:')}</div>
                    <div class="milestone-highlight-text" style="color:#c084fc;">${vh.dasaBhukti}</div>
                    <span class="milestone-time-pill" style="color:#c084fc; border-color:rgba(168,85,247,0.4); background:rgba(168,85,247,0.12);">
                      📅 ${vh.yearRange} • ${vh.ageText}
                    </span>
                  </div>
                  <div style="background:rgba(168,85,247,0.06); border:1px solid rgba(168,85,247,0.2); border-radius:var(--radius-sm); padding:0.45rem 0.65rem; margin-top:0.4rem;">
                    <div style="font-size:0.72rem; color:#c084fc; font-weight:700;">🚗 கார் யோக விளக்கம்:</div>
                    <div style="font-size:0.74rem; color:#e9d5ff; margin-top:2px; line-height:1.35;">
                      <strong>${vh.carYoga}:</strong> ${vh.reason || "வாகன காரகன் சுக்கிரன் ஆட்சி பலம் பெற்றுள்ளதால் சொந்தமாக நான்கு சக்கர வாகனம் (கார்) அமையும் யோகம் உள்ளது."}
                    </div>
                    <div style="font-size:0.73rem; color:#d8b4fe; margin-top:3px;">
                      🎨 <strong>உகந்த நிறம்:</strong> ${vh.vehicleColor}
                    </div>
                  </div>

                  ${vh.nadiPrediction ? `
                    <div class="milestone-nadi-box">
                      <div class="nadi-badge">🔮 நாடி ஜோதிட பிரமாணம் (Nadi Rule)</div>
                      <div class="nadi-box-content">${vh.nadiPrediction}</div>
                    </div>
                  ` : ""}

                  ${vh.subhaPrediction ? `
                    <div class="milestone-subha-box">
                      <div class="subha-badge">✨ சுபத்துவம், பாவத்துவம் & சூட்சும வலு</div>
                      <div class="subha-box-content">${vh.subhaPrediction}</div>
                    </div>
                  ` : ""}
                ` : `
                  <div class="milestone-verdict-box">
                    <div class="milestone-highlight-text" style="color:#c084fc;">சுக்கிரன் & 4-ஆம் அதிபதி புத்தி காலம்</div>
                    <span class="milestone-time-pill" style="color:#c084fc;">வயது 26 - 32-க்குள்</span>
                  </div>
                  <p class="milestone-desc-text">வாகன காரகன் சுக்கிரன் சுபத்துவம் பெற்றுள்ளதால் நான்கு சக்கர கார் வாங்கும் யோகம் கைகூடும்.</p>
                `}
              </div>

              <div class="milestone-tag-row">
                <span class="milestone-tag">சுக்கிரன் (வாகன காரகன்)</span>
                <span class="milestone-tag">4-ஆம் பாவாதிபதி</span>
                <span class="milestone-tag">கார் யோகம்</span>
              </div>
            </div>

          </div>
        </div>
      `;
    }

    // =========================================================================
    // 2. VIMSHOTTARI DASA - BHUKTI - ANTHARAM (தசா, புத்தி, அந்தரம்)
    // =========================================================================
    if (analysis.dashaResult) {
      const d = analysis.dashaResult;
      const nak = d.nakshatraInfo;
      const mahaLord = d.currentMahaDasa.lord;
      const dashaPred = window.PGAstroData.specialRules.dasha[mahaLord]?.text || "";

      html += `
        <div class="dasa-dashboard-card">
          <!-- Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.4rem;">
            <h3 style="font-size:1.05rem; color:var(--gold-primary); display:flex; align-items:center; gap:0.4rem; margin:0;">
              <span>⏳</span> விம்சோத்தரி தசா, புத்தி & அந்தர கணிப்பு
            </h3>
            <span class="badge badge-gold" style="font-size:0.72rem;">120 ஆண்டு விம்சோத்தரி முறை</span>
          </div>

          <!-- Janma Nakshatra & Birth Dasa Balance Banner -->
          <div class="dasa-nakshatra-banner">
            <div>
              <div style="font-size:0.85rem; font-weight:700; color:#fff;">
                🌟 ஜென்ம நட்சத்திரம்: <span style="color:var(--gold-light);">${nak.name} (${nak.english})</span> • பாதம்: <span style="color:#38bdf8;">${nak.pada}</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                நட்சத்திர அதிபதி: <strong style="color:#fff;">${nak.lord}</strong>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:0.72rem; color:var(--text-dim); text-transform:uppercase;">பிறப்பு தசா இருப்பு</div>
              <div style="font-size:0.82rem; font-weight:700; color:#34d399; font-family:var(--font-mono, monospace);">
                ${nak.balanceText}
              </div>
            </div>
          </div>

          <!-- 3 Prominent Metric Cards: Maha Dasa, Bhukti, Antharam -->
          <div class="dasa-metrics-grid">
            <div class="dasa-metric-card active-maha">
              <div class="dasa-metric-label">நடப்பு மகா தசை (Maha Dasa)</div>
              <div class="dasa-metric-lord" style="color:${d.currentMahaDasa.color};">
                ${d.currentMahaDasa.lord} தசை
              </div>
              <div class="dasa-metric-dates">
                ${d.currentMahaDasa.startDate} முதல் ${d.currentMahaDasa.endDate} வரை
              </div>
            </div>

            <div class="dasa-metric-card active-bhukti">
              <div class="dasa-metric-label">நடப்பு புத்தி (Bhukti)</div>
              <div class="dasa-metric-lord" style="color:${d.currentBhukti.color};">
                ${d.currentBhukti.lord} புத்தி
              </div>
              <div class="dasa-metric-dates">
                ${d.currentBhukti.startDate} முதல் ${d.currentBhukti.endDate} வரை
              </div>
            </div>

            <div class="dasa-metric-card active-antharam">
              <div class="dasa-metric-label">நடப்பு அந்தரம் (Antharam)</div>
              <div class="dasa-metric-lord" style="color:${d.currentAntharam.color};">
                ${d.currentAntharam.lord} அந்தரம்
              </div>
              <div class="dasa-metric-dates">
                ${d.currentAntharam.startDate} முதல் ${d.currentAntharam.endDate} வரை
              </div>
            </div>
          </div>

          <!-- Active Maha Dasa Prediction -->
          ${dashaPred ? `
            <div class="dasa-prediction-box">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <strong style="color:var(--gold-light); font-size:0.88rem;">📜 நடப்பு ${mahaLord} தசா பலன்:</strong>
                <span style="font-size:0.7rem; color:var(--text-dim);">நாடி ஜோதிட பிரமாணம்</span>
              </div>
              <p style="font-size:0.83rem; line-height:1.55; color:var(--text-main); margin:0;">
                ${dashaPred}
              </p>
            </div>
          ` : ""}

          <!-- Upcoming Bhuktis Timeline Strip -->
          ${d.upcomingBhuktis && d.upcomingBhuktis.length > 0 ? `
            <div style="margin-top:0.6rem;">
              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem;">அடுத்தடுத்த புத்திகள் (Upcoming Bhuktis):</div>
              <div class="dasa-timeline-strip">
                ${d.upcomingBhuktis.map(b => `
                  <div class="dasa-timeline-chip ${b.isCurrent ? 'current' : ''}">
                    <div>${b.lord} புத்தி ${b.isCurrent ? '⭐' : ''}</div>
                    <div style="font-size:0.64rem; opacity:0.8;">${b.startDate} - ${b.endDate}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>
      `;
    }


    // =========================================================================
    // 2. SUBHATHUVAM, SOOKSHUMA VALU & PAPATHUVAM (சுபத்துவம், சூட்சும வலு & பாபத்துவம்)
    // =========================================================================
    if (analysis.subhathuvamResult) {
      const subha = analysis.subhathuvamResult;
      const topSubha = subha.topSubhathuvamPlanet;
      const topPapa = subha.topPapathuvamPlanet;

      html += `
        <div class="subha-dashboard-card">
          <!-- Title & Paksha Indicator -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.4rem;">
            <h3 style="font-size:1.05rem; color:var(--gold-primary); display:flex; align-items:center; gap:0.4rem; margin:0;">
              <span>✨</span> சுபத்துவம், சூட்சும வலு & பாபத்துவ ஆய்வு
            </h3>
            <span class="badge ${subha.isWaxingMoon ? 'badge-benefic' : 'badge-neutral'}" style="font-size:0.72rem;">
              ${subha.isWaxingMoon ? '🌕 வளர்பிறை சுபத்துவம்' : '🌑 தேய்பிறை நிலை'}
            </span>
          </div>

          <!-- Alert 1: Saturn - Mars Severe Affliction (கடும் பாபத்துவம்) -->
          ${subha.saturnMarsAffliction ? `
            <div class="subha-warning-box">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <span style="font-size:1.1rem;">⚠️</span>
                <strong style="color:#ef4444; font-size:0.9rem;">முக்கிய எச்சரிக்கை: சனி ↔ செவ்வாய் நேரடி மோதல் பாபத்துவம்!</strong>
              </div>
              <div style="font-size:0.8rem; color:#fca5a5; line-height:1.5;">
                <strong>${subha.saturnMarsDetails}</strong> அமைப்பில் சனி மற்றும் செவ்வாய் இருவரும் மிகக் கடுமையான பாபத்துவத்தை அடைகிறார்கள். 
                இவர்களுடன் கேது இணைந்திருந்தாலும் <em>சூட்சும வலு ரத்தாகி</em> பாபத்துவமே மேலோங்கும்! தான் இருக்கும் இடத்தை பாழ்படுத்துவதோடு, தொடர்பு கொள்ளும் காரகங்களையும் பாதிப்பார்கள்.
              </div>
            </div>
          ` : ""}

          <!-- Alert 2: Venus Affliction (சுக்கிரன் காம இழப்பு & திருமண தாமதம்) -->
          ${subha.venusAffliction ? `
            <div class="subha-warning-box" style="border-color:rgba(236,72,153,0.4); background:linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 100%);">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <span style="font-size:1.1rem;">⚡</span>
                <strong style="color:#f472b6; font-size:0.9rem;">சுக்கிரன் காம இழப்பு & திருமணத் தாமத பாபத்துவம்!</strong>
              </div>
              <div style="font-size:0.8rem; color:#fbcfe8; line-height:1.5;">
                சுக்கிரன் செவ்வாயோடு இணைந்த நிலையில் சனியின் பார்வையையும் பெற்றுள்ளார். இதனால் காம காரகத்துவம் பாதிக்கப்பட்டு திருமணம் தாமதமாகும் அல்லது தாம்பத்யத்தில் விழிப்புணர்வு தேவைப்படும்.
              </div>
            </div>
          ` : ""}

          <!-- Top Subhathuvam: Career Guidance (அதி சுபத்துவ முதன்மைத் தொழில் வழிகாட்டல்) -->
          ${topSubha && topSubha.careerGuidance ? `
            <div class="subha-career-box">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:1.2rem;">🏆</span>
                  <div>
                    <div style="font-size:0.75rem; color:var(--gold-light); font-weight:700; text-transform:uppercase;">
                      அதிக சுபத்துவ கிரகம் தரும் முதன்மைத் தொழில்
                    </div>
                    <div style="font-size:0.95rem; font-weight:800; color:#fff;">
                      ${topSubha.planet} (+${topSubha.netScore} புள்ளிகள்) - ${topSubha.careerGuidance.title}
                    </div>
                  </div>
                </div>
                <span class="badge badge-exalted" style="font-size:0.72rem;">முதன்மை ஜீவனம்</span>
              </div>
              <p style="font-size:0.82rem; color:var(--text-main); line-height:1.5; margin:0;">
                ${topSubha.careerGuidance.desc}
              </p>
            </div>
          ` : ""}

          <!-- Top Papathuvam: Health Warnings & Remedies (அதி பாபத்துவ எச்சரிக்கைகள் & பரிகாரம்) -->
          ${topPapa && topPapa.papathuvamWarning ? `
            <div class="subha-remedy-box">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:1.1rem;">🛡️</span>
                  <div>
                    <div style="font-size:0.75rem; color:#fbbf24; font-weight:700; text-transform:uppercase;">
                      அதி பாபத்துவ கிரகம் & உடல்நல எச்சரிக்கை
                    </div>
                    <div style="font-size:0.92rem; font-weight:800; color:#fff;">
                      ${topPapa.planet} (பாபத்துவ புள்ளி: -${topPapa.papaScore})
                    </div>
                  </div>
                </div>
                <span class="badge badge-border" style="font-size:0.72rem; border-color:#f59e0b; color:#fbbf24;">கவனத்திற்குரியது</span>
              </div>
              <div style="font-size:0.81rem; color:#fde68a; line-height:1.45; margin-bottom:5px;">
                <strong>பாதிப்பு எச்சரிக்கை:</strong> ${topPapa.papathuvamWarning.warning}
              </div>
              <div style="font-size:0.81rem; color:#a7f3d0; line-height:1.45;">
                <strong>பரிகார நெறி:</strong> ${topPapa.papathuvamWarning.remedy}
              </div>
            </div>
          ` : ""}

          <!-- 9 Planets Detailed Subhathuvam & Papathuvam Cards Grid -->
          <div style="font-size:0.82rem; font-weight:700; color:var(--gold-light); margin:0.85rem 0 0.5rem 0;">
            📊 நவகிரக சுபத்துவம், சூட்சும வலு & பாபத்துவ புள்ளிகள்:
          </div>

          <div class="subha-planets-grid">
            ${subha.planets.map(p => {
              const rasi = RASIS.find(r => r.id === p.signId);
              const rasiName = rasi ? rasi.name : "";
              const degStr = window.PGAstro.chart.formatDegree(p.degree);

              return `
                <div class="subha-planet-card">
                  <!-- Card Header -->
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <div>
                      <strong style="color:#fff; font-size:0.95rem;">${p.planet}</strong>
                      <span style="font-size:0.72rem; color:var(--text-muted); margin-left:4px;">(${rasiName} ${degStr})</span>
                    </div>
                    <span class="badge ${p.badgeClass}" style="font-size:0.7rem;">${p.status}</span>
                  </div>

                  <!-- Score Pill Group -->
                  <div class="score-tag-group">
                    <span class="score-badge badge-subha" title="சுபத்துவ புள்ளிகள்">சுபம்: +${p.subhaScore}</span>
                    ${p.sookshumaScore > 0 ? `<span class="score-badge badge-sookshuma" title="சூட்சும வலு புள்ளிகள்">சூட்சுமம்: +${p.sookshumaScore}</span>` : ""}
                    ${p.papaScore > 0 ? `<span class="score-badge badge-papa" title="பாபத்துவ புள்ளிகள்">பாபம்: -${p.papaScore}</span>` : ""}
                    <span class="score-badge badge-net" title="நிகர சுபத்துவ மதிப்பு">நிகரம்: ${p.netScore >= 0 ? '+' + p.netScore : p.netScore}</span>
                  </div>

                  <!-- Reasons List -->
                  <div style="margin-top:0.4rem; border-top:1px solid rgba(255,255,255,0.05); padding-top:0.35rem;">
                    ${p.reasons.map(r => `
                      <div class="subha-reason-line ${r.type}">
                        <span>${r.type === 'subha' ? '🟢' : (r.type === 'sookshuma' ? '🔵' : (r.type === 'papa' ? '🔴' : '⚪'))}</span>
                        <span>${r.text}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // =========================================================================
    // 3. DETECTED NADI CONJUNCTIONS & TRINES (இணைவு பலன்கள்)
    // =========================================================================
    html += `
      <div style="margin-bottom: 1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 style="font-size:1.05rem; color:var(--gold-primary); display:flex; align-items:center; gap:0.4rem; margin:0;">
            <span>⚡</span> கண்டறியப்பட்ட இணைவுகள் (${analysis.detectedConjunctions.length})
          </h3>
          <span style="font-size:0.75rem; color:var(--text-muted);">PG Astrologer நாடி முறை</span>
        </div>
    `;

    if (analysis.detectedConjunctions.length === 0) {
      html += `
        <div class="cosmic-card" style="padding: 1rem; text-align:center; color: var(--text-muted); font-size:0.88rem;">
          நேரடி அல்லது திரிகோண இணைவுகள் எதுவும் அமையவில்லை. கிரகங்களை 1, 5, 9 அல்லது 7-ஆம் வீடுகளில் அமைத்து பார்க்கவும்.
        </div>
      `;
    } else {
      html += `<div style="display: flex; flex-direction: column; gap: 0.85rem;">`;
      analysis.detectedConjunctions.forEach((item) => {
        const comb = item.data;
        if (!comb) {
          html += `
            <div class="cosmic-card" style="padding: 0.9rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                <strong>${item.p1} + ${item.p2}</strong>
                <span style="font-size:0.72rem; color:var(--gold-light);">${item.type} (${item.rasiName})</span>
              </div>
              <p style="font-size:0.84rem; color:var(--text-muted);">இந்த இரு கிரகங்களின் அடிப்படை காரகங்கள் ஒன்றுபட்டு பலன்களை உருவாக்குகின்றன.</p>
            </div>
          `;
        } else {
          html += `
            <div class="cosmic-card highlight" style="padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.3rem;">
                <div>
                  <h4 style="font-size: 1rem; color: var(--gold-light);">${comb.title}</h4>
                  <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <span>${item.type} • ${item.rasiName}</span>
                    ${item.degInfo ? `<span class="badge badge-gold" style="font-size:0.68rem; padding:1px 5px; font-family:var(--font-mono, monospace);">${item.degInfo}</span>` : ""}
                  </div>
                </div>
                <span class="planet-tag tag-${comb.p1}">${comb.category || "முக்கிய பலன்"}</span>
              </div>

              ${comb.keywords ? `
                <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:0.6rem;">
                  ${comb.keywords.map(k => `<span style="font-size:0.72rem; background:rgba(212,175,55,0.12); color:var(--gold-light); padding:1px 6px; border-radius:4px; border:1px solid rgba(212,175,55,0.2);">${k}</span>`).join("")}
                </div>
              ` : ""}

              <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-main); white-space: pre-line;">
                ${comb.prediction}
              </p>
            </div>
          `;
        }
      });
      html += `</div>`;
    }

    html += `</div>`;

    // =========================================================================
    // 4. SPECIAL CONDITIONS (வக்கிரம், விளிம்பு, உச்சம், நீசம்)
    // =========================================================================
    if (analysis.specialPlanets.length > 0) {
      html += `
        <div style="margin-top: 1.25rem;">
          <h3 style="font-size:1.05rem; color:var(--gold-primary); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.4rem;">
            <span>🔮</span> விசேஷ கிரக நிலைகள் (வக்கிரம் & விளிம்பு)
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      `;

      analysis.specialPlanets.forEach(p => {
        let conditionText = "";
        let detailsText = "";

        if (p.isRetrograde) {
          conditionText = "வக்கிரம் (Retrograde)";
          detailsText = window.PGAstroData.specialRules.retrograde[p.planet]?.text || "";
        } else if (p.isMarginal) {
          conditionText = "விளிம்பு கிரகம் (Marginal / Border)";
          detailsText = window.PGAstroData.specialRules.marginal[p.planet]?.text || "";
        } else if (p.isExalted) {
          conditionText = "உச்ச நிலை (Exalted)";
          detailsText = `${p.planet} உச்ச பலம் பெற்று அதனுடைய காரகத்துவங்களை முழு ஆற்றலுடன் ஜாதகருக்கு வழங்கி முன்னிலைப்படுத்தும்.`;
        } else if (p.isDebilitated) {
          conditionText = "நீச நிலை (Debilitated)";
          detailsText = `${p.planet} நீச நிலை அடைவதால் அதன் இயல்பான காரகத்துவங்களில் தடுமாற்றம் அல்லது விழிப்புணர்வுக்குப் பின் மேன்மை தரும்.`;
        }

        html += `
          <div class="cosmic-card" style="padding: 0.9rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <strong style="color:var(--gold-light); font-size:0.95rem;">${p.planet} - ${conditionText}</strong>
              <span style="font-size:0.75rem; color:var(--text-muted);">${p.rasiName}</span>
            </div>
            <p style="font-size: 0.84rem; line-height: 1.5; color: var(--text-main);">${detailsText}</p>
          </div>
        `;
      });

      html += `</div></div>`;
    }

    container.innerHTML = html;
  }

  // Public API
  window.PGAstroEngine = {
    evaluateCurrentChart: evaluateCurrentChart
  };
})();
