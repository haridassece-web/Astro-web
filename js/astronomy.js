// PG Astro - Planetary & Lagna Astrological Calculation Engine
// Sidereal (Nirayana) / Lahiri Ayanamsa Calculations from Birth Details

window.PGAstro = window.PGAstro || {};

(function() {
  // Cities coordinates (Latitude, Longitude)
  const CITIES = {
    "chennai": { name: "சென்னை (Chennai)", lat: 13.0827, lon: 80.2707 },
    "tiruvannamalai": { name: "திருவண்ணாமலை (Tiruvannamalai)", lat: 12.2253, lon: 79.0747 },
    "madurai": { name: "மதுரை (Madurai)", lat: 9.9252, lon: 78.1198 },
    "coimbatore": { name: "கோயம்புத்தூர் (Coimbatore)", lat: 11.0168, lon: 76.9558 },
    "trichy": { name: "திருச்சி (Tiruchirappalli)", lat: 10.7905, lon: 78.7047 },
    "salem": { name: "சேலம் (Salem)", lat: 11.6643, lon: 78.1460 },
    "tirunelveli": { name: "திருநெல்வேலி (Tirunelveli)", lat: 8.7139, lon: 77.7567 },
    "erode": { name: "ஈரோடு (Erode)", lat: 11.3410, lon: 77.7172 },
    "vellore": { name: "வேலூர் (Vellore)", lat: 12.9165, lon: 79.1325 },
    "thanjavur": { name: "தஞ்சாவூர் (Thanjavur)", lat: 10.7870, lon: 79.1378 },
    "dindigul": { name: "திண்டுக்கல் (Dindigul)", lat: 10.3673, lon: 77.9803 },
    "tiruppur": { name: "திருப்பூர் (Tiruppur)", lat: 11.1085, lon: 77.3411 },
    "kanchipuram": { name: "காஞ்சிபுரம் (Kanchipuram)", lat: 12.8342, lon: 79.7036 },
    "cuddalore": { name: "கடலூர் (Cuddalore)", lat: 11.7480, lon: 79.7714 },
    "pondicherry": { name: "புதுச்சேரி (Pondicherry)", lat: 11.9416, lon: 79.8083 },
    "nagercoil": { name: "நாகர்கோவில் (Nagercoil)", lat: 8.1833, lon: 77.4119 },
    "karur": { name: "கரூர் (Karur)", lat: 10.9601, lon: 78.0766 },
    "bengaluru": { name: "பெங்களூரு (Bengaluru)", lat: 12.9716, lon: 77.5946 },
    "hyderabad": { name: "ஹைதராபாத் (Hyderabad)", lat: 17.3850, lon: 78.4867 },
    "mumbai": { name: "மும்பை (Mumbai)", lat: 19.0760, lon: 72.8777 },
    "delhi": { name: "டெல்லி (New Delhi)", lat: 28.6139, lon: 77.2090 },
    "singapore": { name: "சிங்கப்பூர் (Singapore)", lat: 1.3521, lon: 103.8198 },
    "kualalumpur": { name: "மலேசியா (Kuala Lumpur)", lat: 3.1390, lon: 101.6869 },
    "colombo": { name: "இலங்கை (Colombo)", lat: 6.9271, lon: 79.8612 }
  };

  // Degrees to Radians and vice versa
  const deg2rad = d => d * (Math.PI / 180);
  const rad2deg = r => r * (180 / Math.PI);
  const norm360 = d => ((d % 360) + 360) % 360;

  // Solve Kepler's Equation M = E - e*sin(E) using Newton-Raphson
  function solveKepler(M, e) {
    let E = M + e * Math.sin(deg2rad(M)) * (1.0 + e * Math.cos(deg2rad(M)));
    for (let iter = 0; iter < 15; iter++) {
      const dE = (E - e * rad2deg(Math.sin(deg2rad(E))) - M) / (1.0 - e * Math.cos(deg2rad(E)));
      E -= dE;
      if (Math.abs(dE) < 1e-7) break;
    }
    return E;
  }

  // Calculate Julian Day Number
  function getJulianDay(year, month, day, hour = 0, minute = 0) {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const dayFraction = (hour + minute / 60) / 24;
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + dayFraction + B - 1524.5;
  }

  // Compute instantaneous planetary longitudes at a specific Julian Day
  function getPlanetsAtJD(jd, lat, lon) {
    const d = jd - 2451543.5;
    const T = (jd - 2451545.0) / 36525.0;

    // Lahiri Ayanamsa: exactly 23° 51' 11" at J2000 (23.85305556°)
    // Precession rate: 50.290966" per Julian year
    const ayanamsa = 23.85305556 - (2451545.0 - jd) * (50.290966 / (3600 * 365.25));

    // 1. Sun
    const w_sun = norm360(282.9404 + 4.70935e-5 * d);
    const e_sun = 0.016709 - 1.151e-9 * d;
    const M_sun = norm360(356.0470 + 0.9856002585 * d);
    const E_sun = solveKepler(M_sun, e_sun);
    const xv_sun = Math.cos(deg2rad(E_sun)) - e_sun;
    const yv_sun = Math.sqrt(1.0 - e_sun * e_sun) * Math.sin(deg2rad(E_sun));
    const v_sun = rad2deg(Math.atan2(yv_sun, xv_sun));
    const r_sun = Math.sqrt(xv_sun * xv_sun + yv_sun * yv_sun);
    const lonsun = norm360(v_sun + w_sun);
    const xs = r_sun * Math.cos(deg2rad(lonsun));
    const ys = r_sun * Math.sin(deg2rad(lonsun));

    // 2. Moon
    const N_moon = norm360(125.1228 - 0.0529538083 * d);
    const i_moon = 5.1454;
    const w_moon = norm360(318.0634 + 0.1643573223 * d);
    const a_moon = 60.2666;
    const e_moon = 0.054900;
    const M_moon = norm360(115.3654 + 13.0649929509 * d);
    const E_moon = solveKepler(M_moon, e_moon);
    const xv_moon = a_moon * (Math.cos(deg2rad(E_moon)) - e_moon);
    const yv_moon = a_moon * (Math.sqrt(1.0 - e_moon * e_moon) * Math.sin(deg2rad(E_moon)));
    const v_moon = rad2deg(Math.atan2(yv_moon, xv_moon));
    const r_moon = Math.sqrt(xv_moon * xv_moon + yv_moon * yv_moon);

    const xh_m = r_moon * (Math.cos(deg2rad(N_moon)) * Math.cos(deg2rad(v_moon + w_moon)) - Math.sin(deg2rad(N_moon)) * Math.sin(deg2rad(v_moon + w_moon)) * Math.cos(deg2rad(i_moon)));
    const yh_m = r_moon * (Math.sin(deg2rad(N_moon)) * Math.cos(deg2rad(v_moon + w_moon)) + Math.cos(deg2rad(N_moon)) * Math.sin(deg2rad(v_moon + w_moon)) * Math.cos(deg2rad(i_moon)));
    const zh_m = r_moon * (Math.sin(deg2rad(v_moon + w_moon)) * Math.sin(deg2rad(i_moon)));
    let moonLon = rad2deg(Math.atan2(yh_m, xh_m));

    // Lunar Perturbations (Evection, Variation, Yearly Equation & Major Harmonics)
    const Ls = norm360(M_sun + w_sun);
    const Lm = norm360(M_moon + w_moon + N_moon);
    const D = norm360(Lm - Ls);
    const moonPert = -1.274 * Math.sin(deg2rad(M_moon - 2 * D))
                     + 0.658 * Math.sin(deg2rad(2 * D))
                     - 0.186 * Math.sin(deg2rad(M_sun))
                     - 0.059 * Math.sin(deg2rad(2 * M_moon - 2 * D))
                     - 0.057 * Math.sin(deg2rad(M_moon - 2 * D + M_sun))
                     + 0.053 * Math.sin(deg2rad(M_moon + 2 * D))
                     + 0.046 * Math.sin(deg2rad(2 * D - M_sun))
                     + 0.041 * Math.sin(deg2rad(M_moon - M_sun))
                     - 0.035 * Math.sin(deg2rad(D))
                     - 0.031 * Math.sin(deg2rad(M_moon + M_sun));
    moonLon = norm360(moonLon + moonPert);

    // 3. Orbital Elements for Mercury, Venus, Mars, Jupiter, Saturn
    const PLANET_ELEMENTS = {
      "புதன்": {
        N: d => norm360(48.3313 + 3.24587e-5 * d),
        i: d => 7.0047 + 5.00e-8 * d,
        w: d => norm360(29.1241 + 1.01444e-5 * d),
        a: d => 0.387098,
        e: d => 0.205635 + 5.59e-10 * d,
        M: d => norm360(168.6562 + 4.0923344368 * d)
      },
      "சுக்கிரன்": {
        N: d => norm360(76.6799 + 2.46590e-5 * d),
        i: d => 3.3946 + 2.75e-8 * d,
        w: d => norm360(54.8910 + 1.38374e-5 * d),
        a: d => 0.723330,
        e: d => 0.006773 - 1.302e-9 * d,
        M: d => norm360(48.0052 + 1.6021302244 * d)
      },
      "செவ்வாய்": {
        N: d => norm360(49.5574 + 2.11081e-5 * d),
        i: d => 1.8497 - 1.78e-8 * d,
        w: d => norm360(286.5016 + 2.92961e-5 * d),
        a: d => 1.523688,
        e: d => 0.093405 + 2.516e-9 * d,
        M: d => norm360(18.6021 + 0.5240207766 * d)
      },
      "குரு": {
        N: d => norm360(100.4542 + 2.76854e-5 * d),
        i: d => 1.3030 - 1.557e-7 * d,
        w: d => norm360(273.8777 + 1.64505e-5 * d),
        a: d => 5.20256,
        e: d => 0.048498 + 4.469e-9 * d,
        M: d => norm360(19.8950 + 0.0830853001 * d)
      },
      "சனி": {
        N: d => norm360(113.6634 + 2.38980e-5 * d),
        i: d => 2.4886 - 1.081e-7 * d,
        w: d => norm360(339.3939 + 2.97661e-5 * d),
        a: d => 9.55475,
        e: d => 0.055546 - 9.499e-9 * d,
        M: d => norm360(316.9670 + 0.0334442282 * d)
      }
    };

    const results = {};
    results["சூரியன்"] = norm360(lonsun - ayanamsa);
    results["சந்திரன்"] = norm360(moonLon - ayanamsa);

    // Rahu / Ketu (Mean North Node)
    const rahuLon = norm360(125.044522 - 1934.136261 * T);
    results["ராகு"] = norm360(rahuLon - ayanamsa);
    results["கேது"] = norm360(results["ராகு"] + 180);

    const Mj = PLANET_ELEMENTS["குரு"].M(d);
    const Ms = PLANET_ELEMENTS["சனி"].M(d);

    for (let p in PLANET_ELEMENTS) {
      const el = PLANET_ELEMENTS[p];
      const N = el.N(d);
      const i = el.i(d);
      const w = el.w(d);
      const a = el.a(d);
      const e = el.e(d);
      let M = el.M(d);

      // Major Perturbations of Jupiter & Saturn
      if (p === "குரு") {
        M += -0.332 * Math.sin(deg2rad(2 * Mj - 5 * Ms - 67.6))
             - 0.056 * Math.sin(deg2rad(2 * Mj - 2 * Ms + 21))
             + 0.042 * Math.sin(deg2rad(3 * Mj - 5 * Ms + 21));
      } else if (p === "சனி") {
        M += 0.812 * Math.sin(deg2rad(2 * Mj - 5 * Ms - 67.6))
             - 0.229 * Math.cos(deg2rad(2 * Mj - 5 * Ms - 67.6))
             + 0.119 * Math.sin(deg2rad(Mj - 2 * Ms - 17.8));
      }

      const E = solveKepler(M, e);
      const xv = a * (Math.cos(deg2rad(E)) - e);
      const yv = a * (Math.sqrt(1.0 - e * e) * Math.sin(deg2rad(E)));
      const v = rad2deg(Math.atan2(yv, xv));
      const r = Math.sqrt(xv * xv + yv * yv);

      // Heliocentric coordinates
      const xh = r * (Math.cos(deg2rad(N)) * Math.cos(deg2rad(v + w)) - Math.sin(deg2rad(N)) * Math.sin(deg2rad(v + w)) * Math.cos(deg2rad(i)));
      const yh = r * (Math.sin(deg2rad(N)) * Math.cos(deg2rad(v + w)) + Math.cos(deg2rad(N)) * Math.sin(deg2rad(v + w)) * Math.cos(deg2rad(i)));
      const zh = r * (Math.sin(deg2rad(v + w)) * Math.sin(deg2rad(i)));

      // Geocentric coordinates (Sun is at xs, ys)
      const xg = xh + xs;
      const yg = yh + ys;
      const zg = zh;

      const lonecl = rad2deg(Math.atan2(yg, xg));
      results[p] = norm360(lonecl - ayanamsa);
    }

    // Lagna (Ascendant) Calculation
    const oblecl = 23.4393 - 3.563e-7 * d;
    const GMST0 = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0));
    const LST = norm360(GMST0 + lon);
    const ramcRad = deg2rad(LST);
    const epsRad = deg2rad(oblecl);
    const latRad = deg2rad(lat);
    const yAsc = Math.cos(ramcRad);
    const xAsc = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
    let ascTrop = norm360(rad2deg(Math.atan2(yAsc, xAsc)));
    results["லக்கினம்"] = norm360(ascTrop - ayanamsa);

    return {
      ayanamsa: ayanamsa,
      results: results
    };
  }

  // Calculate planetary sidereal longitudes with exact retrograde detection
  function calculateSiderealPlanets(birthDate, birthTime, lat = 13.0827, lon = 80.2707) {
    const [year, month, day] = birthDate.split("-").map(Number);
    const [hour, minute] = birthTime.split(":").map(Number);

    // Convert IST (UTC+5:30) to UTC
    let utcHour = hour - 5.5 + minute / 60;
    let utcDay = day;
    let utcMonth = month;
    let utcYear = year;

    if (utcHour < 0) {
      utcHour += 24;
      utcDay -= 1;
      if (utcDay < 1) {
        utcMonth -= 1;
        if (utcMonth < 1) {
          utcMonth = 12;
          utcYear -= 1;
        }
        utcDay = 28;
      }
    }

    const jd = getJulianDay(utcYear, utcMonth, utcDay, Math.floor(utcHour), (utcHour % 1) * 60);
    const cur = getPlanetsAtJD(jd, lat, lon);
    const next = getPlanetsAtJD(jd + 0.1, lat, lon);

    const PLANET_NAMES = ["சூரியன்", "சந்திரன்", "செவ்வாய்", "புதன்", "குரு", "சுக்கிரன்", "சனி", "ராகு", "கேது"];

    // Map longitude (0-360) to Rasi ID (1 to 12) and degree within sign
    const toRasi = (lonDeg) => {
      const rasiIndex = Math.floor(lonDeg / 30); // 0 to 11
      const rasiId = rasiIndex + 1; // 1 = மேஷம் ... 12 = மீனம்
      const degInSign = lonDeg % 30;
      return { rasiId, degInSign, totalLon: lonDeg };
    };

    // Determine special conditions
    const checkExaltation = (planet, rasiId) => {
      const exaltMap = { "சூரியன்": 1, "சந்திரன்": 2, "செவ்வாய்": 10, "புதன்": 6, "குரு": 4, "சுக்கிரன்": 12, "சனி": 7, "ராகு": 2, "கேது": 8 };
      return exaltMap[planet] === rasiId;
    };

    const checkDebilitation = (planet, rasiId) => {
      const debilMap = { "சூரியன்": 7, "சந்திரன்": 8, "செவ்வாய்": 4, "புதன்": 12, "குரு": 10, "சுக்கிரன்": 6, "சனி": 1, "ராகு": 8, "கேது": 2 };
      return debilMap[planet] === rasiId;
    };

    // In Nadi, planets within 0°-2.5° or 27.5°-30° of a rasi are Marginal / விளிம்பு கிரகங்கள்!
    const checkMarginal = (degInSign) => {
      return (degInSign <= 2.5 || degInSign >= 27.5);
    };

    const sunSid = cur.results["சூரியன்"];
    const moonSid = cur.results["சந்திரன்"];

    // Sun-Moon elongation for Paksha (திதி)
    const moonElongation = norm360(moonSid - sunSid);
    const isWaxing = moonElongation >= 0 && moonElongation < 180; // வளர்பிறை
    const pakshaName = isWaxing ? "வளர்பிறை (சுக்கில பக்ஷம்)" : "தேய்பிறை (கிருஷ்ண பக்ஷம்)";

    // Combustion (அஸ்தமனம்) thresholds from Sun
    const checkCombustion = (planet, lon) => {
      if (planet === "சூரியன்" || planet === "ராகு" || planet === "கேது") return false;
      const diff = Math.abs(norm360(lon - sunSid));
      const minDiff = Math.min(diff, 360 - diff);
      const thresholds = {
        "சந்திரன்": 12.0,
        "செவ்வாய்": 17.0,
        "புதன்": 14.0,
        "குரு": 11.0,
        "சுக்கிரன்": 10.0,
        "சனி": 15.0
      };
      return minDiff <= (thresholds[planet] || 10.0);
    };

    const computedList = PLANET_NAMES.map(p => {
      const lon1 = cur.results[p];
      const lon2 = next.results[p];
      let diff = lon2 - lon1;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;

      let isRetro = (diff < 0);
      if (p === "ராகு" || p === "கேது") isRetro = true;
      if (p === "சூரியன்" || p === "சந்திரன்") isRetro = false;

      const r = toRasi(lon1);
      return {
        planet: p,
        totalLon: lon1,
        rasiId: r.rasiId,
        degInSign: r.degInSign,
        isRetrograde: isRetro,
        isCombust: checkCombustion(p, lon1),
        isExalted: checkExaltation(p, r.rasiId),
        isDebilitated: checkDebilitation(p, r.rasiId),
        isMarginal: checkMarginal(r.degInSign)
      };
    });

    const lagnaLon = cur.results["லக்கினம்"];
    const lagnaInfo = toRasi(lagnaLon);

    // Dasa Bhukti Antharam Calculation from Moon's Longitude
    const dashaResult = calculateVimshottariDasha(birthDate, birthTime, moonSid);

    // Panchangam (Thithi, Yogam, Karanam, Nakshatram) and Age
    const panchangam = calculatePanchangam(sunSid, moonSid);
    const ageInfo = calculateAge(birthDate, birthTime);

    return {
      ayanamsa: cur.ayanamsa.toFixed(2),
      isWaxingMoon: isWaxing,
      paksha: pakshaName,
      sunLongitude: sunSid,
      moonLongitude: moonSid,
      lagna: {
        rasiId: lagnaInfo.rasiId,
        degInSign: lagnaInfo.degInSign.toFixed(2),
        totalLon: lagnaLon
      },
      planets: computedList,
      dasha: dashaResult,
      panchangam: panchangam,
      age: ageInfo
    };
  }

  // 27 Nakshatras & Vimshottari Lords
  const NAKSHATRAS = [
    { id: 1, name: "அஸ்வினி", english: "Ashwini", lord: "கேது" },
    { id: 2, name: "பரணி", english: "Bharani", lord: "சுக்கிரன்" },
    { id: 3, name: "கார்த்திகை", english: "Krittika", lord: "சூரியன்" },
    { id: 4, name: "ரோகிணி", english: "Rohini", lord: "சந்திரன்" },
    { id: 5, name: "மிருகசீரிஷம்", english: "Mrigashira", lord: "செவ்வாய்" },
    { id: 6, name: "திருவாதிரை", english: "Ardra", lord: "ராகு" },
    { id: 7, name: "புனர்பூசம்", english: "Punarvasu", lord: "குரு" },
    { id: 8, name: "பூசம்", english: "Pushya", lord: "சனி" },
    { id: 9, name: "ஆயில்யம்", english: "Ashlesha", lord: "புதன்" },
    { id: 10, name: "மகம்", english: "Magha", lord: "கேது" },
    { id: 11, name: "பூரம்", english: "Purva Phalguni", lord: "சுக்கிரன்" },
    { id: 12, name: "உத்திரம்", english: "Uttara Phalguni", lord: "சூரியன்" },
    { id: 13, name: "அஸ்தம்", english: "Hasta", lord: "சந்திரன்" },
    { id: 14, name: "சித்திரை", english: "Chitra", lord: "செவ்வாய்" },
    { id: 15, name: "சுவாதி", english: "Swati", lord: "ராகு" },
    { id: 16, name: "விசாகம்", english: "Vishakha", lord: "குரு" },
    { id: 17, name: "அனுஷம்", english: "Anuradha", lord: "சனி" },
    { id: 18, name: "கேட்டை", english: "Jyeshtha", lord: "புதன்" },
    { id: 19, name: "மூலம்", english: "Mula", lord: "கேது" },
    { id: 20, name: "பூராடம்", english: "Purva Ashadha", lord: "சுக்கிரன்" },
    { id: 21, name: "உத்திராடம்", english: "Uttara Ashadha", lord: "சூரியன்" },
    { id: 22, name: "திருவோணம்", english: "Shravana", lord: "சந்திரன்" },
    { id: 23, name: "அவிட்டம்", english: "Dhanishta", lord: "செவ்வாய்" },
    { id: 24, name: "சதயம்", english: "Shatabhisha", lord: "ராகு" },
    { id: 25, name: "பூரட்டாதி", english: "Purva Bhadrapada", lord: "குரு" },
    { id: 26, name: "உத்திரட்டாதி", english: "Uttara Bhadrapada", lord: "சனி" },
    { id: 27, name: "ரேவதி", english: "Revati", lord: "புதன்" }
  ];

  // 27 Nitya Yogas
  const NITYA_YOGAS = [
    { id: 1, name: "விஷ்கம்பம்", english: "Vishkambha", nature: "அசுபம்" },
    { id: 2, name: "பிரீதி", english: "Priti", nature: "சுபம்" },
    { id: 3, name: "ஆயுஷ்மான்", english: "Ayushman", nature: "சுபம்" },
    { id: 4, name: "சௌபாக்யம்", english: "Saubhagya", nature: "சுபம்" },
    { id: 5, name: "சோபனம்", english: "Shobhana", nature: "சுபம்" },
    { id: 6, name: "அதிகண்டம்", english: "Atiganda", nature: "அசுபம்" },
    { id: 7, name: "சுகர்மம்", english: "Sukarma", nature: "சுபம்" },
    { id: 8, name: "திருதி", english: "Dhriti", nature: "சுபம்" },
    { id: 9, name: "சூலம்", english: "Shula", nature: "அசுபம்" },
    { id: 10, name: "கண்டம்", english: "Ganda", nature: "அசுபம்" },
    { id: 11, name: "விருத்தி", english: "Vriddhi", nature: "சுபம்" },
    { id: 12, name: "துருவம்", english: "Dhruva", nature: "சுபம்" },
    { id: 13, name: "வியாகாதம்", english: "Vyaghata", nature: "அசுபம்" },
    { id: 14, name: "ஹர்ஷணம்", english: "Harshana", nature: "சுபம்" },
    { id: 15, name: "வஜ்ரம்", english: "Vajra", nature: "அசுபம்" },
    { id: 16, name: "சித்தி", english: "Siddhi", nature: "சுபம்" },
    { id: 17, name: "வியதிபாதம்", english: "Vyatipata", nature: "அசுபம்" },
    { id: 18, name: "வரீயான்", english: "Variyan", nature: "சுபம்" },
    { id: 19, name: "பரிகம்", english: "Parigha", nature: "அசுபம்" },
    { id: 20, name: "சிவம்", english: "Shiva", nature: "சுபம்" },
    { id: 21, name: "சித்தம்", english: "Siddha", nature: "சுபம்" },
    { id: 22, name: "சாத்தியம்", english: "Sadhya", nature: "சுபம்" },
    { id: 23, name: "சுபம்", english: "Shubha", nature: "சுபம்" },
    { id: 24, name: "சுப்பிரம்", english: "Shukla", nature: "சுபம்" },
    { id: 25, name: "பிரம்மம்", english: "Brahma", nature: "சுபம்" },
    { id: 26, name: "ஐந்திரம்", english: "Indra", nature: "சுபம்" },
    { id: 27, name: "வைதிருதி", english: "Vaidhriti", nature: "அசுபம்" }
  ];

  const TITHI_NAMES = [
    "பிரதமை (Prathama)",
    "துவிதியை (Dvitiya)",
    "திருதியை (Tritiya)",
    "சதுர்த்தி (Chaturthi)",
    "பஞ்சமி (Panchami)",
    "சஷ்டி (Shashti)",
    "சப்தமி (Saptami)",
    "அஷ்டமி (Ashtami)",
    "நவமி (Navami)",
    "தசமி (Dashami)",
    "ஏகாதசி (Ekadashi)",
    "துவாதசி (Dvadashi)",
    "திரயோதசி (Trayodashi)",
    "சதுர்தசி (Chaturdashi)"
  ];

  const MOVABLE_KARANAS = [
    { name: "பவம் (Bava)", lord: "சூரியன்", animal: "சிங்கம்" },
    { name: "பாலவம் (Balava)", lord: "சந்திரன்", animal: "புலி" },
    { name: "கௌலவம் (Kaulava)", lord: "செவ்வாய்", animal: "பன்றி" },
    { name: "தைதுலை (Taitila)", lord: "புதன்", animal: "கழுதை" },
    { name: "கரசை (Garaja)", lord: "குரு", animal: "யானை" },
    { name: "வணிசை (Vanija)", lord: "சுக்கிரன்", animal: "பசு" },
    { name: "பத்திரை (Bhadra / Vishti)", lord: "சனி", animal: "நாய்" }
  ];

  // Jaimini Chara Karakas: 7 Karakas based on descending degrees within sign (0°-30°)
  const CHARA_KARAKA_TITLES = [
    { code: "AK", name: "ஆத்மகாரகன்", desc: "தலைமை, ஆன்மா, ஆளுமை", color: "#ffd700" },
    { code: "AmK", name: "அமாத்தியகாரகன்", desc: "அறிவு, தொழில், செயல்", color: "#38bdf8" },
    { code: "BK", name: "பிராத்ருகாரகன்", desc: "சகோதரன், வழிகாட்டி", color: "#a855f7" },
    { code: "MK", name: "மாத்ருகாரகன்", desc: "தாய், கல்வி, சுகம்", color: "#ec4899" },
    { code: "PK", name: "புத்ரகாரகன்", desc: "பிள்ளைகள், ஞானம்", color: "#34d399" },
    { code: "GK", name: "ஞாதிகாரகன்", desc: "போராட்டம், பங்காளி, தடை", color: "#f97316" },
    { code: "DK", name: "தாரகாரகன்", desc: "களத்திரம், துணைவர்", color: "#f43f5e" }
  ];

  // Classical Nadi & Sthira Karakatvas
  const STHIRA_KARAKAS = {
    "சூரியன்": { title: "பித்ருகாரகன்", details: "தந்தை, ஆத்மா, அரசு, நிர்வாகம்" },
    "சந்திரன்": { title: "மாத்ருகாரகன்", details: "தாய், மனம், நீர், மாற்றம்" },
    "செவ்வாய்": { title: "சகோதர / கணவன் காரகன்", details: "சகோதரன், கணவன், நிலம், வீரம்" },
    "புதன்": { title: "வித்யாகாரகன்", details: "கல்வி, புத்தி, மாமன், வர்த்தகம்" },
    "குரு": { title: "ஜீவகாரகன் / புத்திரகாரகன்", details: "ஜாதகர் (ஜீவன்), ஞானம், குழந்தைகள்" },
    "சுக்கிரன்": { title: "களத்திர / சுககாரகன்", details: "மனைவி, சொகுசு, வாகனம், செல்வம்" },
    "சனி": { title: "கர்ம / ஆயுள்காரகன்", details: "தொழில், வேலை, ஆயுள், உழைப்பு" },
    "ராகு": { title: "போக / பாட்டன் காரகன்", details: "தந்தைவழி பாட்டன், மாயை, வெளிநாடு" },
    "கேது": { title: "மோக்ஷ / ஞானகாரகன்", details: "தாய்வழி பாட்டன், ஞானம், முக்தி, ஆன்மீகம்" },
    "லக்கினம்": { title: "தேககாரகம்", details: "உடல், உயிர், சுய கௌரவம், ஆயுள்" }
  };

  // Calculate Panchangam (Thithi, Yogam, Karanam, Nakshatram)
  function calculatePanchangam(sunLon, moonLon) {
    if (sunLon === undefined || moonLon === undefined) return null;
    const diff = norm360(moonLon - sunSidSafe(sunLon));
    
    // 1. Thithi
    const tithiIdx = Math.floor(diff / 12); // 0 to 29
    const isWaxing = tithiIdx < 15;
    const paksha = isWaxing ? "சுக்கில பக்ஷம் (வளர்பிறை)" : "கிருஷ்ண பக்ஷம் (தேய்பிறை)";
    const pakshaShort = isWaxing ? "வளர்பிறை" : "தேய்பிறை";
    
    let tithiName = "";
    const indexInPaksha = tithiIdx % 15;
    if (indexInPaksha < 14) {
      tithiName = TITHI_NAMES[indexInPaksha];
    } else {
      tithiName = isWaxing ? "பௌர்ணமி (Purnima)" : "அமாவாசை (Amavasya)";
    }
    
    const degInTithi = diff % 12;
    const tithiFractionElapsed = degInTithi / 12;
    const tithiPct = Math.round(tithiFractionElapsed * 100);

    // 2. Yogam (Nitya Yoga)
    const sumLon = norm360(sunLon + moonLon);
    const yogaSpan = 360 / 27; // 13.333333333333334
    const yogaIdx = Math.min(26, Math.floor(sumLon / yogaSpan));
    const yoga = NITYA_YOGAS[yogaIdx] || NITYA_YOGAS[0];
    const degInYoga = sumLon % yogaSpan;
    const yogaPct = Math.round((degInYoga / yogaSpan) * 100);

    // 3. Karanam (11 Karanas across 60 half-tithis)
    const karanaIdx = Math.floor(diff / 6); // 0 to 59
    let karanaName = "";
    let karanaType = "Movable";
    if (karanaIdx === 0) {
      karanaName = "கிம்துக்கினம் (Kimstughna)";
      karanaType = "Fixed (ஸ்திரம்)";
    } else if (karanaIdx === 57) {
      karanaName = "சகுனி (Shakuni)";
      karanaType = "Fixed (ஸ்திரம்)";
    } else if (karanaIdx === 58) {
      karanaName = "சதுஷ்பாதம் (Chatushpada)";
      karanaType = "Fixed (ஸ்திரம்)";
    } else if (karanaIdx === 59) {
      karanaName = "நாகவம் (Nagava)";
      karanaType = "Fixed (ஸ்திரம்)";
    } else {
      const mIdx = (karanaIdx - 1) % 7;
      karanaName = MOVABLE_KARANAS[mIdx].name;
      karanaType = "Movable (சரம்)";
    }
    const degInKarana = diff % 6;
    const karanaPct = Math.round((degInKarana / 6) * 100);

    // 4. Moon Nakshatra, Pada, and Saram
    const moonNak = getNakshatraInfo(moonLon);

    return {
      tithi: {
        index: tithiIdx + 1,
        name: tithiName,
        fullName: `${pakshaShort} ${tithiName}`,
        paksha: paksha,
        pakshaShort: pakshaShort,
        isWaxing: isWaxing,
        percentElapsed: tithiPct,
        degInTithi: degInTithi.toFixed(2)
      },
      yogam: {
        index: yogaIdx + 1,
        name: yoga.name,
        english: yoga.english,
        nature: yoga.nature,
        percentElapsed: yogaPct
      },
      karanam: {
        index: karanaIdx + 1,
        name: karanaName,
        type: karanaType,
        percentElapsed: karanaPct
      },
      nakshatra: {
        name: moonNak.nakshatra,
        english: moonNak.english,
        pada: moonNak.pada,
        saram: `${moonNak.lord} சாரம்`,
        lord: moonNak.lord,
        balanceText: moonNak.balanceText
      }
    };
  }

  function sunSidSafe(s) {
    return s || 0;
  }

  // Calculate Nakshatra, Pada, and Saram for any longitude
  function getNakshatraPadaSaram(totalLon) {
    const norm = norm360(totalLon);
    const nakSpan = 360 / 27;
    const nakIndex = Math.min(26, Math.max(0, Math.floor(norm / nakSpan)));
    const degInNak = norm % nakSpan;
    const pada = Math.min(4, Math.floor(degInNak / (nakSpan / 4)) + 1);
    const nak = NAKSHATRAS[nakIndex] || NAKSHATRAS[0];
    return {
      nakshatra: nak.name,
      english: nak.english,
      pada: pada,
      lord: nak.lord,
      saram: `${nak.lord} சாரம்`,
      degInNak: degInNak
    };
  }

  // Calculate exact Age based on Date of Birth and Time
  function calculateAge(dobStr, timeStr = "12:00", targetDate = new Date()) {
    if (!dobStr) return null;
    const parts = dobStr.split("-").map(Number);
    if (parts.length < 3) return null;
    const [by, bm, bd] = parts;
    const timeParts = (timeStr || "12:00").split(":").map(Number);
    const bh = timeParts[0] || 0;
    const bmin = timeParts[1] || 0;

    const birth = new Date(by, bm - 1, bd, bh, bmin, 0);
    const now = targetDate instanceof Date ? targetDate : new Date(targetDate);

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDate;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const runningYear = years + 1;
    const totalDecimalYears = (now.getTime() - birth.getTime()) / (365.2425 * 86400000);

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      runningYear: Math.max(1, runningYear),
      totalDecimalYears: Math.max(0, totalDecimalYears),
      formattedText: `${years} ஆண்டுகள், ${months} மாதங்கள், ${days} நாட்கள் (${runningYear}-வது வயது நடக்கிறது)`,
      shortText: `${years} வயது (${years}Y ${months}M ${days}D)`
    };
  }

  // Calculate Jaimini Chara Karakas (AK, AmK, BK, MK, PK, GK, DK) and Sthira/Nadi Karakas
  function calculateCharaKarakas(planetsList) {
    const SEVEN_PLANETS = ["சூரியன்", "சந்திரன்", "செவ்வாய்", "புதன்", "குரு", "சுக்கிரன்", "சனி"];
    const eligible = [];
    (planetsList || []).forEach(p => {
      if (SEVEN_PLANETS.includes(p.planet) && p.degree !== undefined && p.degree !== null) {
        eligible.push({
          planet: p.planet,
          degree: parseFloat(p.degree)
        });
      }
    });

    eligible.sort((a, b) => b.degree - a.degree);

    const charaMap = {};
    eligible.forEach((item, idx) => {
      if (idx < CHARA_KARAKA_TITLES.length) {
        charaMap[item.planet] = {
          code: CHARA_KARAKA_TITLES[idx].code,
          name: CHARA_KARAKA_TITLES[idx].name,
          desc: CHARA_KARAKA_TITLES[idx].desc,
          color: CHARA_KARAKA_TITLES[idx].color,
          rank: idx + 1
        };
      }
    });

    return {
      charaMap: charaMap,
      sthiraMap: STHIRA_KARAKAS
    };
  }

  const DASHA_ORDER = [
    { lord: "கேது", years: 7, color: "#d97706" },
    { lord: "சுக்கிரன்", years: 20, color: "#ec4899" },
    { lord: "சூரியன்", years: 6, color: "#ef4444" },
    { lord: "சந்திரன்", years: 10, color: "#94a3b8" },
    { lord: "செவ்வாய்", years: 7, color: "#dc2626" },
    { lord: "ராகு", years: 18, color: "#64748b" },
    { lord: "குரு", years: 16, color: "#f5c518" },
    { lord: "சனி", years: 19, color: "#818cf8" },
    { lord: "புதன்", years: 17, color: "#10b981" }
  ];

  // Calculate Janma Nakshatra and Birth Dasa Balance
  function getNakshatraInfo(moonLon) {
    const norm = norm360(moonLon);
    const nakSpan = 360 / 27; // 13.333333333333334 degrees = 13° 20'
    const nakIndex = Math.min(26, Math.max(0, Math.floor(norm / nakSpan)));
    const degInNak = norm % nakSpan;
    const fractionElapsed = degInNak / nakSpan;
    const fractionRemaining = 1 - fractionElapsed;
    const pada = Math.min(4, Math.floor(degInNak / (nakSpan / 4)) + 1);

    const nak = NAKSHATRAS[nakIndex] || NAKSHATRAS[0];
    const dashaInfo = DASHA_ORDER.find(d => d.lord === nak.lord);
    const totalYears = dashaInfo ? dashaInfo.years : 7;
    const balanceTotalYears = fractionRemaining * totalYears;

    const bYears = Math.floor(balanceTotalYears);
    const remMonths = (balanceTotalYears - bYears) * 12;
    const bMonths = Math.floor(remMonths);
    const bDays = Math.round((remMonths - bMonths) * 30);

    return {
      nakshatra: nak.name,
      english: nak.english,
      lord: nak.lord,
      pada: pada,
      nakIndex: nakIndex,
      degInNak: degInNak,
      fractionElapsed: fractionElapsed,
      fractionRemaining: fractionRemaining,
      birthDashaLord: nak.lord,
      balanceYears: bYears,
      balanceMonths: bMonths,
      balanceDays: bDays,
      balanceTotalYears: balanceTotalYears,
      balanceText: `${nak.lord} மகா தசை இருப்பு: ${bYears} வருடங்கள், ${bMonths} மாதங்கள், ${bDays} நாட்கள்`
    };
  }

  // Calculate Vimshottari Current Dasa, Bhukti, and Antharam
  function calculateVimshottariDasha(birthDateStr, birthTimeStr, moonLon, targetDateObj = new Date()) {
    const nakInfo = getNakshatraInfo(moonLon);
    const [by, bm, bd] = birthDateStr.split("-").map(Number);
    const [bh, bmin] = (birthTimeStr || "12:00").split(":").map(Number);

    const birthDate = new Date(by, bm - 1, bd, bh, bmin, 0);
    const targetDate = targetDateObj instanceof Date ? targetDateObj : new Date(targetDateObj);

    let dashaIdx = DASHA_ORDER.findIndex(d => d.lord === nakInfo.birthDashaLord);
    if (dashaIdx === -1) dashaIdx = 0;

    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
    const dashaTimeline = [];
    let currentStartDate = new Date(birthDate.getTime());

    // 1st Dasa ends at birthDate + balanceTotalYears
    const firstEndMs = currentStartDate.getTime() + (nakInfo.balanceTotalYears * msPerYear);
    const firstEndDate = new Date(firstEndMs);

    dashaTimeline.push({
      lord: DASHA_ORDER[dashaIdx].lord,
      years: DASHA_ORDER[dashaIdx].years,
      startDate: new Date(currentStartDate),
      endDate: new Date(firstEndDate),
      isBirthDasha: true,
      color: DASHA_ORDER[dashaIdx].color
    });

    currentStartDate = new Date(firstEndDate);
    dashaIdx = (dashaIdx + 1) % 9;

    // Generate subsequent Dashas
    for (let cycle = 0; cycle < 9; cycle++) {
      const d = DASHA_ORDER[dashaIdx];
      const endMs = currentStartDate.getTime() + (d.years * msPerYear);
      const nextEndDate = new Date(endMs);
      dashaTimeline.push({
        lord: d.lord,
        years: d.years,
        startDate: new Date(currentStartDate),
        endDate: new Date(nextEndDate),
        isBirthDasha: false,
        color: d.color
      });
      currentStartDate = new Date(nextEndDate);
      dashaIdx = (dashaIdx + 1) % 9;
    }

    // Find current active Maha Dasa
    const nowMs = targetDate.getTime();
    let activeDasa = dashaTimeline.find(d => nowMs >= d.startDate.getTime() && nowMs < d.endDate.getTime());
    if (!activeDasa) {
      activeDasa = dashaTimeline[dashaTimeline.length - 1];
    }

    // Divide active Maha Dasa into 9 Bhuktis
    const dasaLordIdx = DASHA_ORDER.findIndex(d => d.lord === activeDasa.lord);
    const mahaTotalYears = activeDasa.years;
    const fullMahaStartMs = activeDasa.endDate.getTime() - (mahaTotalYears * msPerYear);
    let bhuktiStartMs = fullMahaStartMs;
    const bhuktis = [];

    for (let b = 0; b < 9; b++) {
      const bLordInfo = DASHA_ORDER[(dasaLordIdx + b) % 9];
      const bDurationYears = (mahaTotalYears * bLordInfo.years) / 120;
      const bDurationMs = bDurationYears * msPerYear;
      const bEndMs = bhuktiStartMs + bDurationMs;

      bhuktis.push({
        lord: bLordInfo.lord,
        mahaLord: activeDasa.lord,
        years: bDurationYears,
        startDate: new Date(bhuktiStartMs),
        endDate: new Date(bEndMs),
        color: bLordInfo.color
      });
      bhuktiStartMs = bEndMs;
    }

    let activeBhukti = bhuktis.find(b => nowMs >= b.startDate.getTime() && nowMs < b.endDate.getTime());
    if (!activeBhukti) {
      activeBhukti = bhuktis[bhuktis.length - 1];
    }

    // Divide active Bhukti into 9 Antharams
    const bhuktiLordIdx = DASHA_ORDER.findIndex(d => d.lord === activeBhukti.lord);
    const antharams = [];
    let antharamStartMs = activeBhukti.startDate.getTime();
    const bhuktiTotalYears = activeBhukti.years;

    for (let a = 0; a < 9; a++) {
      const aLordInfo = DASHA_ORDER[(bhuktiLordIdx + a) % 9];
      const aDurationYears = (bhuktiTotalYears * aLordInfo.years) / 120;
      const aDurationMs = aDurationYears * msPerYear;
      const aEndMs = antharamStartMs + aDurationMs;

      antharams.push({
        lord: aLordInfo.lord,
        bhuktiLord: activeBhukti.lord,
        mahaLord: activeDasa.lord,
        startDate: new Date(antharamStartMs),
        endDate: new Date(aEndMs),
        color: aLordInfo.color
      });
      antharamStartMs = aEndMs;
    }

    let activeAntharam = antharams.find(a => nowMs >= a.startDate.getTime() && nowMs < a.endDate.getTime());
    if (!activeAntharam) {
      activeAntharam = antharams[antharams.length - 1];
    }

    // Divide active Antharam into 9 Sookshmams (சூட்சுமம்)
    const antharamLordIdx = DASHA_ORDER.findIndex(d => d.lord === activeAntharam.lord);
    const antharamTotalYears = (activeBhukti.years * DASHA_ORDER.find(d => d.lord === activeAntharam.lord).years) / 120;
    const sookshmams = [];
    let sookshmamStartMs = activeAntharam.startDate.getTime();

    for (let s = 0; s < 9; s++) {
      const sLordInfo = DASHA_ORDER[(antharamLordIdx + s) % 9];
      const sDurationYears = (antharamTotalYears * sLordInfo.years) / 120;
      const sDurationMs = sDurationYears * msPerYear;
      const sEndMs = sookshmamStartMs + sDurationMs;

      sookshmams.push({
        lord: sLordInfo.lord,
        antharamLord: activeAntharam.lord,
        bhuktiLord: activeBhukti.lord,
        mahaLord: activeDasa.lord,
        startDate: new Date(sookshmamStartMs),
        endDate: new Date(sEndMs),
        color: sLordInfo.color
      });
      sookshmamStartMs = sEndMs;
    }

    let activeSookshmam = sookshmams.find(s => nowMs >= s.startDate.getTime() && nowMs < s.endDate.getTime());
    if (!activeSookshmam) {
      activeSookshmam = sookshmams[sookshmams.length - 1];
    }

    const formatDate = (d) => {
      try {
        return d.toLocaleDateString("ta-IN", { year: 'numeric', month: 'short', day: 'numeric' });
      } catch(e) {
        return d.toISOString().split("T")[0];
      }
    };

    // Calculate progress percentages & remaining days
    const calcProgress = (startMs, endMs) => {
      const total = endMs - startMs;
      const elapsed = Math.max(0, Math.min(total, nowMs - startMs));
      const pct = Math.round((elapsed / total) * 100);
      const remMs = Math.max(0, endMs - nowMs);
      const remDays = Math.ceil(remMs / (24 * 60 * 60 * 1000));
      return { pct, remDays };
    };

    const mahaProg = calcProgress(activeDasa.startDate.getTime(), activeDasa.endDate.getTime());
    const bhuktiProg = calcProgress(activeBhukti.startDate.getTime(), activeBhukti.endDate.getTime());
    const antharamProg = calcProgress(activeAntharam.startDate.getTime(), activeAntharam.endDate.getTime());
    const sookshmamProg = calcProgress(activeSookshmam.startDate.getTime(), activeSookshmam.endDate.getTime());

    // Helper to calculate Antharams for any Bhukti
    function calculateAntharamsForBhukti(bLord, bStartMs, bDurationYears) {
      const bLordIdx = DASHA_ORDER.findIndex(d => d.lord === bLord);
      const res = [];
      let curMs = bStartMs;
      for (let i = 0; i < 9; i++) {
        const aLord = DASHA_ORDER[(bLordIdx + i) % 9];
        const aDurYears = (bDurationYears * aLord.years) / 120;
        const aDurMs = aDurYears * msPerYear;
        const aEndMs = curMs + aDurMs;
        const isCur = nowMs >= curMs && nowMs < aEndMs;
        const durDays = Math.round(aDurMs / (24 * 60 * 60 * 1000));
        res.push({
          lord: aLord.lord,
          years: aDurYears,
          durationDays: durDays,
          durationText: durDays >= 30 ? `${Math.floor(durDays / 30)} மாதங்கள் ${durDays % 30} நாட்கள்` : `${durDays} நாட்கள்`,
          startDate: formatDate(new Date(curMs)),
          endDate: formatDate(new Date(aEndMs)),
          startMs: curMs,
          endMs: aEndMs,
          isCurrent: isCur,
          color: aLord.color
        });
        curMs = aEndMs;
      }
      return res;
    }

    // Helper to calculate Sookshmams for any Antharam
    function calculateSookshmamsForAntharam(aLord, aStartMs, aDurationYears) {
      const aLordIdx = DASHA_ORDER.findIndex(d => d.lord === aLord);
      const res = [];
      let curMs = aStartMs;
      for (let i = 0; i < 9; i++) {
        const sLord = DASHA_ORDER[(aLordIdx + i) % 9];
        const sDurYears = (aDurationYears * sLord.years) / 120;
        const sDurMs = sDurYears * msPerYear;
        const sEndMs = curMs + sDurMs;
        const isCur = nowMs >= curMs && nowMs < sEndMs;
        const durDays = Math.round(sDurMs / (24 * 60 * 60 * 1000));
        res.push({
          lord: sLord.lord,
          years: sDurYears,
          durationDays: durDays,
          durationText: durDays >= 30 ? `${Math.floor(durDays / 30)} மாதங்கள் ${durDays % 30} நாட்கள்` : `${durDays} நாட்கள்`,
          startDate: formatDate(new Date(curMs)),
          endDate: formatDate(new Date(sEndMs)),
          startMs: curMs,
          endMs: sEndMs,
          isCurrent: isCur,
          color: sLord.color
        });
        curMs = sEndMs;
      }
      return res;
    }

    const currentAntharamsList = calculateAntharamsForBhukti(activeBhukti.lord, activeBhukti.startDate.getTime(), activeBhukti.years);
    const currentSookshmamsList = calculateSookshmamsForAntharam(activeAntharam.lord, activeAntharam.startDate.getTime(), antharamTotalYears);

    return {
      nakshatraInfo: nakInfo,
      currentMahaDasa: {
        lord: activeDasa.lord,
        startDate: formatDate(activeDasa.startDate),
        endDate: formatDate(activeDasa.endDate),
        color: activeDasa.color,
        percentElapsed: mahaProg.pct,
        remainingDays: mahaProg.remDays
      },
      currentBhukti: {
        lord: activeBhukti.lord,
        startDate: formatDate(activeBhukti.startDate),
        endDate: formatDate(activeBhukti.endDate),
        color: activeBhukti.color,
        percentElapsed: bhuktiProg.pct,
        remainingDays: bhuktiProg.remDays
      },
      currentAntharam: {
        lord: activeAntharam.lord,
        startDate: formatDate(activeAntharam.startDate),
        endDate: formatDate(activeAntharam.endDate),
        color: activeAntharam.color,
        percentElapsed: antharamProg.pct,
        remainingDays: antharamProg.remDays
      },
      currentSookshmam: {
        lord: activeSookshmam.lord,
        startDate: formatDate(activeSookshmam.startDate),
        endDate: formatDate(activeSookshmam.endDate),
        color: activeSookshmam.color,
        percentElapsed: sookshmamProg.pct,
        remainingDays: sookshmamProg.remDays
      },
      currentAntharamsList: currentAntharamsList,
      currentSookshmamsList: currentSookshmamsList,
      dashaTimeline: dashaTimeline.map(d => ({
        lord: d.lord,
        years: d.years,
        startDate: formatDate(d.startDate),
        endDate: formatDate(d.endDate),
        startMs: d.startDate.getTime(),
        endMs: d.endDate.getTime(),
        isCurrent: (d.lord === activeDasa.lord)
      })),
      upcomingBhuktis: bhuktis.map(b => ({
        lord: b.lord,
        years: b.years,
        startDate: formatDate(b.startDate),
        endDate: formatDate(b.endDate),
        startMs: b.startDate.getTime(),
        endMs: b.endDate.getTime(),
        isCurrent: (b.lord === activeBhukti.lord)
      }))
    };
  }

  // Calculate Antharams for any Bhukti on demand
  function calculateAntharamsOnDemand(bhuktiLord, bhuktiStartDate, bhuktiDurationYears) {
    const bLordIdx = DASHA_ORDER.findIndex(d => d.lord === bhuktiLord);
    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
    const res = [];
    const nowMs = Date.now();
    let curMs = (bhuktiStartDate instanceof Date ? bhuktiStartDate : new Date(bhuktiStartDate)).getTime();
    
    for (let i = 0; i < 9; i++) {
      const aLord = DASHA_ORDER[(bLordIdx + i) % 9];
      const aDurYears = (bhuktiDurationYears * aLord.years) / 120;
      const aDurMs = aDurYears * msPerYear;
      const aEndMs = curMs + aDurMs;
      const isCur = nowMs >= curMs && nowMs < aEndMs;
      const durDays = Math.round(aDurMs / (24 * 60 * 60 * 1000));
      const formatDate = (d) => {
        try {
          return d.toLocaleDateString("ta-IN", { year: 'numeric', month: 'short', day: 'numeric' });
        } catch(e) {
          return d.toISOString().split("T")[0];
        }
      };

      res.push({
        lord: aLord.lord,
        years: aDurYears,
        durationDays: durDays,
        durationText: durDays >= 30 ? `${Math.floor(durDays / 30)} மாதங்கள் ${durDays % 30} நாட்கள்` : `${durDays} நாட்கள்`,
        startDate: formatDate(new Date(curMs)),
        endDate: formatDate(new Date(aEndMs)),
        isCurrent: isCur,
        color: aLord.color
      });
      curMs = aEndMs;
    }
    return res;
  }

  // Calculate Sookshmams for any Antharam on demand
  function calculateSookshmamsOnDemand(antharamLord, antharamStartDate, antharamDurationYears) {
    const aLordIdx = DASHA_ORDER.findIndex(d => d.lord === antharamLord);
    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
    const res = [];
    const nowMs = Date.now();
    let curMs = (antharamStartDate instanceof Date ? antharamStartDate : new Date(antharamStartDate)).getTime();
    
    for (let i = 0; i < 9; i++) {
      const sLord = DASHA_ORDER[(aLordIdx + i) % 9];
      const sDurYears = (antharamDurationYears * sLord.years) / 120;
      const sDurMs = sDurYears * msPerYear;
      const sEndMs = curMs + sDurMs;
      const isCur = nowMs >= curMs && nowMs < sEndMs;
      const durDays = Math.round(sDurMs / (24 * 60 * 60 * 1000));
      const formatDate = (d) => {
        try {
          return d.toLocaleDateString("ta-IN", { year: 'numeric', month: 'short', day: 'numeric' });
        } catch(e) {
          return d.toISOString().split("T")[0];
        }
      };

      res.push({
        lord: sLord.lord,
        years: sDurYears,
        durationDays: durDays,
        durationText: durDays >= 30 ? `${Math.floor(durDays / 30)} மாதங்கள் ${durDays % 30} நாட்கள்` : `${durDays} நாட்கள்`,
        startDate: formatDate(new Date(curMs)),
        endDate: formatDate(new Date(sEndMs)),
        isCurrent: isCur,
        color: sLord.color
      });
      curMs = sEndMs;
    }
    return res;
  }

  // Public API
  window.PGAstro.astronomy = {
    calculateSiderealPlanets: calculateSiderealPlanets,
    calculateVimshottariDasha: calculateVimshottariDasha,
    calculateAntharamsOnDemand: calculateAntharamsOnDemand,
    calculateSookshmamsOnDemand: calculateSookshmamsOnDemand,
    calculatePanchangam: calculatePanchangam,
    calculateAge: calculateAge,
    calculateCharaKarakas: calculateCharaKarakas,
    getNakshatraPadaSaram: getNakshatraPadaSaram,
    getNakshatraInfo: getNakshatraInfo,
    NAKSHATRAS: NAKSHATRAS,
    NITYA_YOGAS: NITYA_YOGAS,
    TITHI_NAMES: TITHI_NAMES,
    MOVABLE_KARANAS: MOVABLE_KARANAS,
    CHARA_KARAKA_TITLES: CHARA_KARAKA_TITLES,
    STHIRA_KARAKAS: STHIRA_KARAKAS,
    DASHA_ORDER: DASHA_ORDER,
    CITIES: CITIES
  };
})();
