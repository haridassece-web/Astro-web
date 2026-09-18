// PG Astro - South Indian Rasi Chart Controller
// Interactive 12-Rasi Grid, Touch & Mobile Friendly

window.PGAstro = window.PGAstro || {};

(function() {
  // 12 Rasis in South Indian layout order
  const RASIS = [
    { id: 1, name: "மேஷம்", english: "Aries", lord: "செவ்வாய்", cellClass: "cell-aries" },
    { id: 2, name: "ரிஷபம்", english: "Taurus", lord: "சுக்கிரன்", cellClass: "cell-taurus" },
    { id: 3, name: "மிதுனம்", english: "Gemini", lord: "புதன்", cellClass: "cell-gemini" },
    { id: 4, name: "கடகம்", english: "Cancer", lord: "சந்திரன்", cellClass: "cell-cancer" },
    { id: 5, name: "சிம்மம்", english: "Leo", lord: "சூரியன்", cellClass: "cell-leo" },
    { id: 6, name: "கன்னி", english: "Virgo", lord: "புதன்", cellClass: "cell-virgo" },
    { id: 7, name: "துலாம்", english: "Libra", lord: "சுக்கிரன்", cellClass: "cell-libra" },
    { id: 8, name: "விருச்சிகம்", english: "Scorpio", lord: "செவ்வாய்", cellClass: "cell-scorpio" },
    { id: 9, name: "தனுசு", english: "Sagittarius", lord: "குரு", cellClass: "cell-sagittarius" },
    { id: 10, name: "மகரம்", english: "Capricorn", lord: "சனி", cellClass: "cell-capricorn" },
    { id: 11, name: "கும்பம்", english: "Aquarius", lord: "சனி", cellClass: "cell-aquarius" },
    { id: 12, name: "மீனம்", english: "Pisces", lord: "குரு", cellClass: "cell-pisces" }
  ];

  // 9 Navagrahas
  const PLANETS = [
    { name: "சூரியன்", english: "Sun", icon: "☀️", color: "#ef4444" },
    { name: "சந்திரன்", english: "Moon", icon: "🌙", color: "#f8fafc" },
    { name: "செவ்வாய்", english: "Mars", icon: "♂", color: "#dc2626" },
    { name: "புதன்", english: "Mercury", icon: "☿", color: "#10b981" },
    { name: "குரு", english: "Jupiter", icon: "♃", color: "#f5c518" },
    { name: "சுக்கிரன்", english: "Venus", icon: "♀", color: "#ec4899" },
    { name: "சனி", english: "Saturn", icon: "♄", color: "#818cf8" },
    { name: "ராகு", english: "Rahu", icon: "☊", color: "#94a3b8" },
    { name: "கேது", english: "Ketu", icon: "☋", color: "#d97706" }
  ];

  // Chart State: houseId -> array of { planet, degree, isRetrograde, isExalted, isDebilitated, isMarginal }
  let chartState = {};
  RASIS.forEach(r => { chartState[r.id] = []; });
  let lagnaRasiId = null;
  let lagnaDegree = null;
  let showDegrees = true;
  let showGochara = true;
  let todayGocharaData = null;
  let nativeInfo = null;

  // Format decimal degree to standard astrological DMS (Degrees & Minutes)
  function formatDegree(deg, compact = false) {
    if (deg === undefined || deg === null || isNaN(deg)) return "";
    const num = parseFloat(deg);
    const d = Math.floor(num);
    const m = Math.round((num - d) * 60);
    const mPadded = m < 10 ? "0" + m : m;
    if (compact) {
      return `${d}°${m > 0 ? mPadded + "'" : ""}`;
    }
    return `${d}° ${mPadded}'`;
  }

  // Currently selected placement options
  let selectedPlanet = null;
  let activeModifiers = {
    vakkiram: false, // வக்கிரம்
    ucham: false,    // உச்சம்
    neesam: false,   // நீசம்
    vilimbu: false   // விளிம்பு
  };

  const PLANET_SHORT = {
    "சூரியன்": "சூ",
    "சந்திரன்": "சந்",
    "செவ்வாய்": "செவ்",
    "புதன்": "புத",
    "குரு": "குரு",
    "சுக்கிரன்": "சுக்",
    "சனி": "சனி",
    "ராகு": "ராகு",
    "கேது": "கேது"
  };

  function initChart() {
    renderChartGrid();
    renderNavamsaGrid();
    renderPlanetPalette();
    initGocharaEvents();
    loadPreset("preset_wealth"); // load sample wealth preset by default
  }

  function renderChartGrid() {
    const grid = document.getElementById("rasiChartGrid");
    if (!grid) return;
    grid.innerHTML = "";

    // Render cells according to class names
    RASIS.forEach(rasi => {
      const cell = document.createElement("div");
      cell.className = `rasi-cell ${rasi.cellClass}`;
      cell.id = `rasiCell_${rasi.id}`;
      cell.dataset.rasiId = rasi.id;

      cell.innerHTML = `
        <div class="rasi-cell-header">
          <span class="rasi-name">${rasi.name}</span>
          <span class="rasi-lord">${rasi.lord}</span>
        </div>
        <div class="cell-planets" id="cellPlanets_${rasi.id}"></div>
        <div class="cell-gochara" id="cellGochara_${rasi.id}"></div>
      `;

      // Tap to place planet
      cell.addEventListener("click", () => handleCellClick(rasi.id));
      grid.appendChild(cell);
    });

    // Add Central Hub
    const hub = document.createElement("div");
    hub.className = "cell-center-hub";
    hub.innerHTML = `
      <div class="center-title">PG Astrologer</div>
      <div class="center-subtitle" id="centerHubSubtitle">நாடி ஜோதிட மென்பொருள்</div>
      <div class="center-active-stats" id="centerStatsText">கிரகங்கள்: 0/9</div>
      <div class="center-quick-actions">
        <button class="btn btn-sm btn-outline-gold" id="btnAnalyzeChart">பலன் காண்க</button>
        <button class="btn btn-sm btn-secondary" id="btnClearChart">அழி</button>
      </div>
    `;
    grid.appendChild(hub);

    document.getElementById("btnAnalyzeChart")?.addEventListener("click", (e) => {
      e.stopPropagation();
      window.PGAstroEngine && window.PGAstroEngine.evaluateCurrentChart();
    });

    document.getElementById("btnClearChart")?.addEventListener("click", (e) => {
      e.stopPropagation();
      clearChart();
    });
  }

  // Render Compact 4x4 Navamsa Chart Grid
  function renderNavamsaGrid() {
    const grid = document.getElementById("navamsaChartGrid");
    if (!grid) return;
    grid.innerHTML = "";

    RASIS.forEach(rasi => {
      const cell = document.createElement("div");
      cell.className = `navamsa-cell ${rasi.cellClass}`;
      cell.id = `navamsaCell_${rasi.id}`;
      cell.dataset.rasiId = rasi.id;

      cell.innerHTML = `
        <div class="navamsa-cell-header">
          <span class="navamsa-rasi-name">${rasi.name}</span>
          <span class="navamsa-rasi-lord">${rasi.lord}</span>
        </div>
        <div class="navamsa-cell-planets" id="navamsaPlanets_${rasi.id}"></div>
      `;
      grid.appendChild(cell);
    });

    const hub = document.createElement("div");
    hub.className = "navamsa-center-hub";
    hub.innerHTML = `
      <div class="navamsa-hub-title">நவாம்சம்</div>
      <div class="navamsa-hub-sub">D-9 சக்கரம்</div>
    `;
    grid.appendChild(hub);
  }

  // Calculate Navamsa (D9) Positions for Lagna and all placed planets
  // Classical formula: 3°20' (3.333333°) per navamsa sign
  function calculateNavamsaPositions() {
    const navamsaMap = {};
    for (let i = 1; i <= 12; i++) navamsaMap[i] = [];
    let navLagnaId = null;

    if (lagnaRasiId && lagnaDegree !== null) {
      const totalLon = (lagnaRasiId - 1) * 30 + parseFloat(lagnaDegree);
      navLagnaId = (Math.floor(totalLon / (10 / 3)) % 12) + 1;
    }

    for (let rid in chartState) {
      const list = chartState[rid] || [];
      const rNum = parseInt(rid);
      list.forEach(item => {
        const deg = (item.degree !== undefined && item.degree !== null) ? parseFloat(item.degree) : 15.0;
        const totalLon = (rNum - 1) * 30 + deg;
        const navSignId = (Math.floor(totalLon / (10 / 3)) % 12) + 1;
        navamsaMap[navSignId].push({
          planet: item.planet,
          isRetrograde: !!item.isRetrograde,
          isExalted: !!item.isExalted,
          isDebilitated: !!item.isDebilitated,
          isMarginal: !!item.isMarginal
        });
      });
    }

    return { navamsaMap, navLagnaId };
  }

  function updateNavamsaCells() {
    const { navamsaMap, navLagnaId } = calculateNavamsaPositions();
    RASIS.forEach(r => {
      const container = document.getElementById(`navamsaPlanets_${r.id}`);
      if (!container) return;
      container.innerHTML = "";

      if (navLagnaId === r.id) {
        const lChip = document.createElement("span");
        lChip.className = "navamsa-chip chip-lagna";
        lChip.textContent = "ல";
        lChip.title = "நவாம்ச லக்கினம் (D9 Lagna)";
        container.appendChild(lChip);
      }

      const pList = navamsaMap[r.id] || [];
      pList.forEach(p => {
        const pChip = document.createElement("span");
        pChip.className = `navamsa-chip tag-${p.planet}`;
        const short = PLANET_SHORT[p.planet] || p.planet;
        pChip.textContent = `${short}${p.isRetrograde ? '(வ)' : ''}`;
        pChip.title = `${p.planet}${p.isRetrograde ? ' (வக்கிரம்)' : ''} - நவாம்சத்தில்`;
        container.appendChild(pChip);
      });
    });
  }

  // Today's Gochara calculation & display
  function getTodayGochara() {
    if (todayGocharaData) return todayGocharaData;
    try {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const todayStr = `${y}-${m}-${d}`;
      if (window.PGAstro && window.PGAstro.astronomy && window.PGAstro.astronomy.calculateSiderealPlanets) {
        const transits = window.PGAstro.astronomy.calculateSiderealPlanets(todayStr, "12:00");
        if (transits && transits.planets) {
          const byRasi = {};
          for (let i = 1; i <= 12; i++) byRasi[i] = [];
          transits.planets.forEach(p => {
            if (byRasi[p.rasiId]) {
              byRasi[p.rasiId].push({
                planet: p.planet,
                degInSign: p.degInSign,
                isRetrograde: p.isRetrograde
              });
            }
          });
          todayGocharaData = { todayStr, byRasi, planets: transits.planets };
        }
      }
    } catch (err) {
      console.error("Gochara calculation error:", err);
    }
    return todayGocharaData;
  }

  function updateCellGochara(rasiId) {
    const container = document.getElementById(`cellGochara_${rasiId}`);
    if (!container) return;
    container.innerHTML = "";
    if (!showGochara) return;

    const gData = getTodayGochara();
    if (!gData || !gData.byRasi[rasiId] || gData.byRasi[rasiId].length === 0) return;

    const planetsInSign = gData.byRasi[rasiId];
    const strip = document.createElement("div");
    strip.className = "gochara-cell-strip";
    strip.title = `இன்றைய கோச்சாரம் (${gData.todayStr}) - ${planetsInSign.map(p => p.planet + (p.isRetrograde ? ' (வ)' : '')).join(', ')}`;

    const tag = document.createElement("span");
    tag.className = "gochara-pill-tag";
    tag.textContent = "கோ:";
    strip.appendChild(tag);

    planetsInSign.forEach(p => {
      const pSpan = document.createElement("span");
      pSpan.className = "gochara-planet-item";
      const abbr = PLANET_SHORT[p.planet] || p.planet;
      pSpan.textContent = `${abbr}${p.isRetrograde ? '(வ)' : ''}`;
      strip.appendChild(pSpan);
    });

    container.appendChild(strip);
  }

  function initGocharaEvents() {
    const gocharaToggle = document.getElementById("toggleShowGocharaInChart");
    gocharaToggle?.addEventListener("change", (e) => {
      showGochara = e.target.checked;
      RASIS.forEach(r => updateCellGochara(r.id));
    });
  }

  function renderPlanetPalette() {
    const container = document.getElementById("planetChipsGrid");
    if (!container) return;
    container.innerHTML = "";

    PLANETS.forEach(p => {
      const btn = document.createElement("button");
      btn.className = "planet-source-btn";
      btn.dataset.planet = p.name;
      btn.innerHTML = `
        <span class="p-icon" style="color: ${p.color}">${p.icon}</span>
        <span>${p.name}</span>
      `;

      btn.addEventListener("click", () => {
        // Toggle selection
        if (selectedPlanet === p.name) {
          selectedPlanet = null;
          btn.classList.remove("selected");
        } else {
          document.querySelectorAll(".planet-source-btn").forEach(b => b.classList.remove("selected"));
          selectedPlanet = p.name;
          btn.classList.add("selected");
        }
      });

      container.appendChild(btn);
    });

    // Modifiers toggles
    document.querySelectorAll(".mod-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const mod = btn.dataset.mod;
        activeModifiers[mod] = !activeModifiers[mod];
        btn.classList.toggle("active", activeModifiers[mod]);
      });
    });

    // Degree slider and input sync
    const degSlider = document.getElementById("planetDegreeSlider");
    const degInput = document.getElementById("planetDegreeInput");
    const degDisplay = document.getElementById("activeDegreeDisplay");

    function updateDegUI(val) {
      const num = Math.min(29.99, Math.max(0, parseFloat(val) || 0));
      if (degSlider && parseFloat(degSlider.value) !== num) degSlider.value = num;
      if (degInput && parseFloat(degInput.value) !== num) degInput.value = num.toFixed(1);
      if (degDisplay) degDisplay.textContent = formatDegree(num);

      // Auto-toggle marginal button if near boundary (0°-2.5° or 27.5°-30°)
      const isEdge = (num <= 2.5 || num >= 27.5);
      const vilimbuBtn = document.querySelector(".mod-toggle-btn[data-mod='vilimbu']");
      if (vilimbuBtn && !activeModifiers.vilimbu && isEdge) {
        vilimbuBtn.classList.add("active");
      } else if (vilimbuBtn && !activeModifiers.vilimbu && !isEdge) {
        vilimbuBtn.classList.remove("active");
      }
    }

    degSlider?.addEventListener("input", (e) => updateDegUI(e.target.value));
    degInput?.addEventListener("input", (e) => updateDegUI(e.target.value));

    // Quick degree preset buttons
    document.querySelectorAll(".btn-deg-quick").forEach(btn => {
      btn.addEventListener("click", () => {
        const d = btn.dataset.deg;
        if (d !== undefined) updateDegUI(d);
      });
    });

    // Toggle degree visibility in chart
    const degToggle = document.getElementById("toggleShowDegreesInChart");
    degToggle?.addEventListener("change", (e) => {
      showDegrees = e.target.checked;
      updateAllCells();
    });
  }

  function handleCellClick(rasiId) {
    if (!selectedPlanet) {
      // If no planet selected, highlight trines & oppositions of this house
      highlightTrinesAndOppositions(rasiId);
      return;
    }

    // Check if planet is already in some house, remove it first (1 planet exists in 1 house)
    for (let id in chartState) {
      chartState[id] = chartState[id].filter(item => item.planet !== selectedPlanet);
    }

    // Read current degree from UI (default 15.0°)
    let degVal = 15.0;
    const degInput = document.getElementById("planetDegreeInput");
    if (degInput && degInput.value !== "") {
      degVal = Math.min(29.99, Math.max(0, parseFloat(degInput.value)));
    }

    // Auto-detect marginal (விளிம்பு) if <= 2.5° or >= 27.5°
    const isMarginal = activeModifiers.vilimbu || (degVal <= 2.5 || degVal >= 27.5);

    // Add planet to target house
    chartState[rasiId].push({
      planet: selectedPlanet,
      degree: degVal,
      isRetrograde: activeModifiers.vakkiram,
      isExalted: activeModifiers.ucham,
      isDebilitated: activeModifiers.neesam,
      isMarginal: isMarginal
    });

    // Re-render
    updateCellPlanetsDisplay(rasiId);
    updateAllCells();
    updateCenterStats();

    // Trigger auto-analysis
    if (window.PGAstroEngine) {
      window.PGAstroEngine.evaluateCurrentChart();
    }
  }

  function updateCellPlanetsDisplay(rasiId) {
    const container = document.getElementById(`cellPlanets_${rasiId}`);
    if (!container) return;
    container.innerHTML = "";

    // If Lagna is in this rasi, show Lagna badge first with degree
    if (lagnaRasiId === rasiId) {
      const lagnaChip = document.createElement("span");
      lagnaChip.className = "chart-planet-chip chip-lagna";
      lagnaChip.style.background = "linear-gradient(135deg, #ffd700 0%, #d4af37 100%)";
      lagnaChip.style.color = "#0b0f1d";
      lagnaChip.style.fontWeight = "800";
      
      const degHtml = (showDegrees && lagnaDegree !== null) 
        ? `<span class="chip-degree">${formatDegree(lagnaDegree, true)}</span>` 
        : "";

      lagnaChip.title = `லக்கினம் (Ascendant)${lagnaDegree !== null ? ': ' + formatDegree(lagnaDegree) : ''}`;
      lagnaChip.innerHTML = `<span>ல</span> ${degHtml}`;
      container.appendChild(lagnaChip);
    }

    const list = chartState[rasiId] || [];
    list.forEach(item => {
      const chip = document.createElement("span");
      chip.className = `chart-planet-chip tag-${item.planet}`;
      
      let badgesHtml = "";
      if (item.isRetrograde) badgesHtml += `<span class="chip-status-badge badge-vakkiram" title="வக்கிரம்">வ</span>`;
      if (item.isExalted) badgesHtml += `<span class="chip-status-badge badge-ucham" title="உச்சம்">உ</span>`;
      if (item.isDebilitated) badgesHtml += `<span class="chip-status-badge badge-neesam" title="நீசம்">நீ</span>`;
      if (item.isMarginal) badgesHtml += `<span class="chip-status-badge badge-vilimbu" title="விளிம்பு">வி</span>`;

      const degHtml = (showDegrees && item.degree !== undefined && item.degree !== null)
        ? `<span class="chip-degree">${formatDegree(item.degree, true)}</span>`
        : "";

      chip.title = `${item.planet}${item.degree !== undefined ? ': ' + formatDegree(item.degree) : ''} (நீக்க கிளிக் செய்க)`;
      chip.innerHTML = `<span class="chip-pname">${item.planet}</span> ${degHtml} ${badgesHtml}`;

      // Clicking placed chip removes it or allows edit
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        removePlanetFromChart(item.planet);
      });

      container.appendChild(chip);
    });
  }

  function updateAllCells() {
    RASIS.forEach(r => {
      updateCellPlanetsDisplay(r.id);
      updateCellGochara(r.id);
    });
    renderDegreesTable();
    updateNavamsaCells();
  }

  function removePlanetFromChart(planetName) {
    for (let id in chartState) {
      chartState[id] = chartState[id].filter(item => item.planet !== planetName);
    }
    updateAllCells();
    updateCenterStats();
    if (window.PGAstroEngine) {
      window.PGAstroEngine.evaluateCurrentChart();
    }
  }

  function clearChart() {
    RASIS.forEach(r => { chartState[r.id] = []; });
    lagnaRasiId = null;
    lagnaDegree = null;
    nativeInfo = null;
    window.PGAstro.lastCalculatedHoroscope = null;
    updateAllCells();
    updateCenterStats();
    clearHighlights();
    if (window.PGAstroEngine) {
      window.PGAstroEngine.evaluateCurrentChart();
    }
  }

  function updateCenterStats() {
    let count = 0;
    for (let id in chartState) {
      count += chartState[id].length;
    }
    const statEl = document.getElementById("centerStatsText");
    if (!statEl) return;

    const lagnaRasi = RASIS.find(r => r.id === lagnaRasiId)?.name || "";
    const lagnaStr = lagnaRasi ? `<div style="font-size:0.68rem; color:#93c5fd; margin-top:2px;">லக்கினம்: <strong>${lagnaRasi} ${lagnaDegree !== null ? formatDegree(lagnaDegree) : ''}</strong></div>` : "";

    if (nativeInfo && nativeInfo.name) {
      statEl.innerHTML = `
        <div style="font-weight:700; color:#fff; font-size:0.84rem;">${nativeInfo.name}</div>
        <div style="font-size:0.68rem; color:var(--gold-light); margin-top:1px;">
          ${nativeInfo.dob} | ${nativeInfo.time || ""} • ${nativeInfo.place || ""}
        </div>
        ${lagnaStr}
      `;
    } else {
      statEl.innerHTML = `
        <div>கிரகங்கள்: ${count}/9</div>
        ${lagnaStr}
      `;
    }
  }

  function highlightTrinesAndOppositions(rasiId) {
    clearHighlights();
    // 1-5-9 trines: (id), (id+4), (id+8) modulo 12
    const trine1 = rasiId;
    const trine2 = ((rasiId - 1 + 4) % 12) + 1;
    const trine3 = ((rasiId - 1 + 8) % 12) + 1;
    // 1-7 opposition: (id+6) modulo 12
    const opp = ((rasiId - 1 + 6) % 12) + 1;

    [trine1, trine2, trine3].forEach(id => {
      document.getElementById(`rasiCell_${id}`)?.classList.add("trine-highlight");
    });
    document.getElementById(`rasiCell_${opp}`)?.classList.add("active-selected");
  }

  function clearHighlights() {
    document.querySelectorAll(".rasi-cell").forEach(c => {
      c.classList.remove("trine-highlight", "active-selected");
    });
  }

  function highlightRasi(rasiId) {
    if (!rasiId) return;
    clearHighlights();
    const el = document.getElementById(`rasiCell_${rasiId}`);
    if (el) {
      el.classList.add("active-selected");
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Planetary Degrees & Status Table Renderer
  function renderDegreesTable() {
    const container = document.getElementById("planetaryDegreesTableContainer");
    if (!container) return;

    const rows = [];
    if (lagnaRasiId) {
      const rasi = RASIS.find(r => r.id === lagnaRasiId);
      rows.push({
        isLagna: true,
        name: "லக்கினம் (Lagna)",
        icon: "🌅",
        color: "#ffd700",
        rasiId: lagnaRasiId,
        rasiName: rasi ? rasi.name : "-",
        lord: rasi ? rasi.lord : "-",
        degree: lagnaDegree,
        statusHtml: `<span class="badge badge-gold">லக்கினம்</span>`
      });
    }

    PLANETS.forEach(p => {
      let placed = null;
      let placedRasiId = null;
      for (let rid in chartState) {
        const found = chartState[rid].find(item => item.planet === p.name);
        if (found) {
          placed = found;
          placedRasiId = parseInt(rid);
          break;
        }
      }

      const rasi = placedRasiId ? RASIS.find(r => r.id === placedRasiId) : null;
      let statusBadges = [];
      if (placed) {
        if (placed.isRetrograde) statusBadges.push(`<span class="badge badge-red" style="font-size:0.68rem;">வக்கிரம்</span>`);
        if (placed.isExalted) statusBadges.push(`<span class="badge badge-green" style="font-size:0.68rem;">உச்சம்</span>`);
        if (placed.isDebilitated) statusBadges.push(`<span class="badge" style="background:#4b5563; color:#fff; font-size:0.68rem;">நீசம்</span>`);
        if (placed.isMarginal) statusBadges.push(`<span class="badge badge-gold" style="font-size:0.68rem;">விளிம்பு</span>`);
      }

      rows.push({
        isLagna: false,
        name: p.name,
        icon: p.icon,
        color: p.color,
        rasiId: placedRasiId,
        rasiName: rasi ? rasi.name : "<span style='color:var(--text-muted);'>அமைக்கப்படவில்லை</span>",
        lord: rasi ? rasi.lord : "-",
        degree: placed ? placed.degree : null,
        statusHtml: statusBadges.join(" ") || (placed ? "<span style='color:var(--text-muted); font-size:0.75rem;'>இயல்பு</span>" : "-")
      });
    });

    let html = `
      <div style="overflow-x:auto;">
        <table class="degrees-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
          <thead>
            <tr style="border-bottom:1px solid rgba(212,175,55,0.25); color:var(--gold-light); font-size:0.74rem;">
              <th style="padding:6px 8px;">கிரகம் / லக்கினம்</th>
              <th style="padding:6px 8px;">அமர்ந்த ராசி</th>
              <th style="padding:6px 8px;">துல்லிய பாகை (Degree)</th>
              <th style="padding:6px 8px;">வீட்டு அதிபதி</th>
              <th style="padding:6px 8px;">நிலை</th>
            </tr>
          </thead>
          <tbody>
    `;

    rows.forEach(r => {
      const degStr = (r.degree !== null && r.degree !== undefined) ? `<strong>${formatDegree(r.degree)}</strong>` : "-";
      const rowStyle = r.isLagna ? "background:rgba(212,175,55,0.08); font-weight:bold;" : "border-bottom:1px solid rgba(255,255,255,0.04);";
      const clickAction = r.rasiId ? `onclick="window.PGAstro.chart.highlightRasi(${r.rasiId})"` : "";

      html += `
        <tr style="${rowStyle} ${r.rasiId ? 'cursor:pointer;' : ''}" ${clickAction} title="${r.rasiId ? 'கட்டத்தில் ராசியை காண கிளிக் செய்க' : ''}">
          <td style="padding:5px 8px; color:${r.color}; display:flex; align-items:center; gap:5px;">
            <span>${r.icon}</span> <span>${r.name}</span>
          </td>
          <td style="padding:5px 8px; color:var(--text-main);">${r.rasiName}</td>
          <td style="padding:5px 8px; color:var(--gold-primary); font-family:var(--font-mono, monospace); font-size:0.83rem;">${degStr}</td>
          <td style="padding:5px 8px; color:var(--text-muted);">${r.lord}</td>
          <td style="padding:5px 8px;">${r.statusHtml}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  // Presets with accurate astrological degrees & Lagnas
  const PRESETS = {
    preset_wealth: {
      name: "தொழில் & செல்வ யோகம் (Saturn + Venus)",
      lagna: { rasiId: 5, degree: 12.4 }, // Leo Lagna
      placements: [
        { rasiId: 12, planet: "சனி", degree: 18.4, isExalted: false, isRetrograde: false }, // Pisces
        { rasiId: 12, planet: "சுக்கிரன்", degree: 21.2, isExalted: true, isRetrograde: false }, // Exalted Pisces
        { rasiId: 4, planet: "குரு", degree: 5.0, isExalted: true, isRetrograde: false },   // Cancer (Deep Exalted 5°)
        { rasiId: 5, planet: "சூரியன்", degree: 14.5, isExalted: false, isRetrograde: false },// Leo
        { rasiId: 5, planet: "புதன்", degree: 19.8, isExalted: false, isRetrograde: false },
        { rasiId: 1, planet: "செவ்வாய்", degree: 12.0, isExalted: false, isRetrograde: false },// Aries
        { rasiId: 2, planet: "சந்திரன்", degree: 3.0, isExalted: true, isRetrograde: false }, // Taurus (Exalted 3°)
        { rasiId: 3, planet: "ராகு", degree: 16.5, isExalted: false, isRetrograde: false },
        { rasiId: 9, planet: "கேது", degree: 16.5, isExalted: false, isRetrograde: false }
      ]
    },
    preset_leadership: {
      name: "அரசு & நிர்வாக அதிகாரம் (Sun + Mars Exalted)",
      lagna: { rasiId: 1, degree: 8.2 }, // Aries Lagna
      placements: [
        { rasiId: 1, planet: "சூரியன்", degree: 10.0, isExalted: true, isRetrograde: false }, // Aries (Deep Exalted 10°)
        { rasiId: 1, planet: "செவ்வாய்", degree: 15.3, isExalted: false, isRetrograde: false },
        { rasiId: 9, planet: "குரு", degree: 16.0, isExalted: false, isRetrograde: false },    // Sagittarius (Trine)
        { rasiId: 7, planet: "சனி", degree: 20.0, isExalted: true, isRetrograde: false },     // Libra (Exalted 20°)
        { rasiId: 6, planet: "புதன்", degree: 15.0, isExalted: true, isRetrograde: false },   // Virgo (Exalted 15°)
        { rasiId: 12, planet: "சுக்கிரன்", degree: 27.0, isExalted: true, isRetrograde: false, isMarginal: true }, // Exalted 27°
        { rasiId: 4, planet: "சந்திரன்", degree: 12.4, isExalted: false, isRetrograde: false },
        { rasiId: 11, planet: "ராகு", degree: 24.1, isExalted: false, isRetrograde: false },
        { rasiId: 5, planet: "கேது", degree: 24.1, isExalted: false, isRetrograde: false }
      ]
    },
    preset_spirituality: {
      name: "ஞான யோகம் & ஆன்மீகம் (Guru + Ketu)",
      lagna: { rasiId: 8, degree: 14.0 }, // Scorpio Lagna
      placements: [
        { rasiId: 8, planet: "குரு", degree: 11.2, isExalted: false, isRetrograde: false },  // Scorpio
        { rasiId: 8, planet: "கேது", degree: 13.5, isExalted: false, isRetrograde: false },
        { rasiId: 10, planet: "சனி", degree: 22.0, isExalted: false, isRetrograde: false }, // Capricorn
        { rasiId: 2, planet: "ராகு", degree: 13.5, isExalted: false, isRetrograde: false },
        { rasiId: 4, planet: "சந்திரன்", degree: 18.2, isExalted: false, isRetrograde: false },
        { rasiId: 5, planet: "சூரியன்", degree: 6.4, isExalted: false, isRetrograde: false },
        { rasiId: 6, planet: "புதன்", degree: 24.0, isExalted: false, isRetrograde: false },
        { rasiId: 7, planet: "சுக்கிரன்", degree: 14.8, isExalted: false, isRetrograde: false },
        { rasiId: 1, planet: "செவ்வாய்", degree: 9.3, isExalted: false, isRetrograde: false }
      ]
    },
    preset_retrograde: {
      name: "வக்கிரம் & விளிம்பு ஆய்வு (Retrograde & Edge)",
      lagna: { rasiId: 11, degree: 17.5 }, // Aquarius Lagna
      placements: [
        { rasiId: 3, planet: "புதன்", degree: 1.5, isExalted: false, isRetrograde: true, isMarginal: true }, // Edge 1.5°
        { rasiId: 11, planet: "சனி", degree: 14.0, isExalted: false, isRetrograde: true },
        { rasiId: 10, planet: "செவ்வாய்", degree: 28.5, isExalted: true, isRetrograde: false, isMarginal: true }, // Edge 28.5°
        { rasiId: 1, planet: "சூரியன்", degree: 18.0, isExalted: true, isRetrograde: false },
        { rasiId: 4, planet: "சந்திரன்", degree: 22.1, isExalted: false, isRetrograde: false },
        { rasiId: 9, planet: "குரு", degree: 19.5, isExalted: false, isRetrograde: true },
        { rasiId: 12, planet: "சுக்கிரன்", degree: 16.2, isExalted: false, isRetrograde: true },
        { rasiId: 2, planet: "ராகு", degree: 8.4, isExalted: false, isRetrograde: false },
        { rasiId: 8, planet: "கேது", degree: 8.4, isExalted: false, isRetrograde: false }
      ]
    }
  };

  function loadPreset(key) {
    const preset = PRESETS[key];
    if (!preset) return;
    clearChart();
    if (preset.lagna) {
      lagnaRasiId = preset.lagna.rasiId;
      lagnaDegree = preset.lagna.degree;
    }
    preset.placements.forEach(p => {
      chartState[p.rasiId].push({
        planet: p.planet,
        degree: p.degree !== undefined ? p.degree : 15.0,
        isRetrograde: !!p.isRetrograde,
        isExalted: !!p.isExalted,
        isDebilitated: !!p.isDebilitated,
        isMarginal: !!p.isMarginal
      });
    });
    updateAllCells();
    updateCenterStats();
    if (window.PGAstroEngine) {
      window.PGAstroEngine.evaluateCurrentChart();
    }
  }

  function setBirthHoroscope(computedData, info) {
    clearChart();
    nativeInfo = info;
    window.PGAstro.lastCalculatedHoroscope = computedData;
    if (computedData.lagna && computedData.lagna.rasiId) {
      lagnaRasiId = computedData.lagna.rasiId;
      lagnaDegree = parseFloat(computedData.lagna.degInSign);
    }
    if (computedData.planets) {
      computedData.planets.forEach(p => {
        const deg = p.degInSign !== undefined ? parseFloat(p.degInSign) : 15.0;
        chartState[p.rasiId].push({
          planet: p.planet,
          degree: deg,
          isRetrograde: !!p.isRetrograde,
          isExalted: !!p.isExalted,
          isDebilitated: !!p.isDebilitated,
          isMarginal: !!p.isMarginal
        });
      });
    }
    updateAllCells();
    updateCenterStats();
    if (window.PGAstroEngine) {
      window.PGAstroEngine.evaluateCurrentChart();
    }
  }

  // Public API
  window.PGAstro.chart = {
    init: initChart,
    getState: () => chartState,
    getNativeInfo: () => nativeInfo,
    getLagnaRasiId: () => lagnaRasiId,
    getLagnaDegree: () => lagnaDegree,
    formatDegree: formatDegree,
    setShowDegrees: (val) => { showDegrees = val; updateAllCells(); },
    getShowDegrees: () => showDegrees,
    setShowGochara: (val) => { showGochara = val; updateAllCells(); },
    getShowGochara: () => showGochara,
    getTodayGochara: getTodayGochara,
    calculateNavamsaPositions: calculateNavamsaPositions,
    renderNavamsaChart: updateNavamsaCells,
    highlightRasi: highlightRasi,
    renderDegreesTable: renderDegreesTable,
    setBirthHoroscope: setBirthHoroscope,
    loadPreset: loadPreset,
    clear: clearChart,
    removePlanet: removePlanetFromChart,
    RASIS: RASIS,
    PLANETS: PLANETS
  };
})();
