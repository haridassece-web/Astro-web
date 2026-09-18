// PG Astro - UI Controller & Interactions
// Handles Tab Navigation, Pair Explorer, Transit Selector, Search, Modals, Print & Share

window.PGAstroUI = window.PGAstroUI || {};

(function() {
  function initUI() {
    setupTabNavigation();
    setupThemeSwitcher();
    setupBirthCalculationForm();
    setupPairSelector();
    setupTransitSelector();
    setupDashaAndRules();
    setupSubhathuvamViewer();
    setupKarakasViewer();
    setupReportGenerator();
    setupClock();
  }

  // 1. Tab Navigation (Top desktop + Mobile bottom bar)
  function setupTabNavigation() {
    const navButtons = document.querySelectorAll(".nav-tab-btn, .mobile-nav-item");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
        if (!targetTab) return;
        switchTab(targetTab);
      });
    });
  }

  function switchTab(tabId) {
    // Update active tab buttons
    document.querySelectorAll(".nav-tab-btn, .mobile-nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    // Update tab panes
    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab_${tabId}`);
    });

    // Scroll top smoothly on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 1.2. Theme & Style Switcher Setup
  function setupThemeSwitcher() {
    const modal = document.getElementById("themeModal");
    const openBtn = document.getElementById("btnOpenThemeModal");
    const closeBtn = document.getElementById("btnCloseThemeModal");
    const applyBtn = document.getElementById("btnApplyThemeClose");

    let currentTheme = localStorage.getItem("pgastro_theme") || "gold";
    let currentChartStyle = localStorage.getItem("pgastro_chart_style") || "classic";
    let currentDensity = localStorage.getItem("pgastro_chart_density") || "standard";

    function applyStyles(showToastMsg = false) {
      document.documentElement.dataset.theme = currentTheme;
      document.documentElement.dataset.chartStyle = currentChartStyle;
      document.documentElement.dataset.chartDensity = currentDensity;

      localStorage.setItem("pgastro_theme", currentTheme);
      localStorage.setItem("pgastro_chart_style", currentChartStyle);
      localStorage.setItem("pgastro_chart_density", currentDensity);

      // Update active button classes in modal
      document.querySelectorAll(".theme-pick-btn").forEach(b => {
        const isMatch = b.dataset.themeVal === currentTheme;
        b.classList.toggle("btn-gold", isMatch);
        b.classList.toggle("btn-secondary", !isMatch);
      });

      document.querySelectorAll(".chart-style-btn").forEach(b => {
        const isMatch = b.dataset.chartVal === currentChartStyle;
        b.classList.toggle("btn-gold", isMatch);
        b.classList.toggle("btn-secondary", !isMatch);
      });

      document.querySelectorAll(".chart-density-btn").forEach(b => {
        const isMatch = b.dataset.densityVal === currentDensity;
        b.classList.toggle("btn-gold", isMatch);
        b.classList.toggle("btn-secondary", !isMatch);
      });

      if (showToastMsg) {
        showToast("🎨 புதிய தோற்றம் மாற்றப்பட்டது (Style Applied)!");
      }
    }

    // Initial load
    applyStyles(false);

    openBtn?.addEventListener("click", () => modal?.classList.add("show"));
    closeBtn?.addEventListener("click", () => modal?.classList.remove("show"));
    applyBtn?.addEventListener("click", () => {
      modal?.classList.remove("show");
      applyStyles(true);
    });

    // Pick theme buttons
    document.querySelectorAll(".theme-pick-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentTheme = btn.dataset.themeVal;
        applyStyles(false);
      });
    });

    // Pick chart style buttons
    document.querySelectorAll(".chart-style-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentChartStyle = btn.dataset.chartVal;
        applyStyles(false);
      });
    });

    // Pick density buttons
    document.querySelectorAll(".chart-density-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentDensity = btn.dataset.densityVal;
        applyStyles(false);
      });
    });
  }

  // 1.5. Birth Calculation Form Setup
  function setupBirthCalculationForm() {
    const calcBtn = document.getElementById("btnCalculateHoroscope");
    const resetBtn = document.getElementById("btnResetBirthForm");
    const nameInput = document.getElementById("birthCalcName");
    const genderInput = document.getElementById("birthCalcGender");
    const dateInput = document.getElementById("birthCalcDate");
    const timeInput = document.getElementById("birthCalcTime");
    const placeSelect = document.getElementById("birthCalcPlaceSelect");
    const placeCustom = document.getElementById("birthCalcPlaceCustom");

    // Populate cities in dropdown if select exists
    if (placeSelect && window.PGAstro && window.PGAstro.astronomy) {
      placeSelect.innerHTML = `<option value="">-- முக்கிய நகரங்கள் (Select City) --</option>`;
      const cities = window.PGAstro.astronomy.CITIES;
      for (let key in cities) {
        const c = cities[key];
        placeSelect.innerHTML += `<option value="${key}">${c.name}</option>`;
      }
      // Default to Tiruvannamalai
      placeSelect.value = "tiruvannamalai";
    }

    function doCalculate(isAuto = false) {
      const name = nameInput?.value.trim() || "அன்பர் (Native)";
      const gender = genderInput?.value || "male";
      const date = dateInput?.value;
      const time = timeInput?.value || "12:00";
      
      if (!date) {
        if (!isAuto) showToast("தயவுசெய்து பிறந்த தேதியை தேர்ந்தெடுக்கவும் (Please select Date of Birth)");
        dateInput?.focus();
        return;
      }

      let lat = 13.0827;
      let lon = 80.2707;
      let placeName = "சென்னை (Chennai)";

      const customPlace = placeCustom?.value.trim();
      const selectedCityKey = placeSelect?.value;

      if (customPlace) {
        placeName = customPlace;
        const lower = customPlace.toLowerCase().replace(/[^a-z]/g, "");
        const cities = window.PGAstro.astronomy.CITIES;
        for (let key in cities) {
          const kLower = key.toLowerCase();
          const nameLower = cities[key].name.toLowerCase();
          if (lower.includes(kLower) || kLower.includes(lower) || nameLower.includes(customPlace.toLowerCase())) {
            lat = cities[key].lat;
            lon = cities[key].lon;
            break;
          }
        }
      } else if (selectedCityKey && window.PGAstro.astronomy.CITIES[selectedCityKey]) {
        const city = window.PGAstro.astronomy.CITIES[selectedCityKey];
        lat = city.lat;
        lon = city.lon;
        placeName = city.name;
      }

      // Compute horoscope using Sidereal Lahiri Ephemeris
      const computed = window.PGAstro.astronomy.calculateSiderealPlanets(date, time, lat, lon);

      const maritalStatus = document.getElementById("birthCalcMaritalStatus")?.value || "unmarried";

      // Load into chart
      const nativeInfo = {
        name: name,
        gender: gender,
        dob: date,
        time: time,
        place: placeName,
        maritalStatus: maritalStatus
      };

      window.PGAstro.chart.setBirthHoroscope(computed, nativeInfo);

      // Update Report Modal native fields automatically
      const reportNameInput = document.getElementById("clientNativeName");
      const reportGenderInput = document.getElementById("clientNativeGender");
      const reportDobInput = document.getElementById("clientNativeDob");
      const reportPlaceInput = document.getElementById("clientNativePlace");
      if (reportNameInput) reportNameInput.value = name;
      if (reportGenderInput) reportGenderInput.value = gender;
      if (reportDobInput) reportDobInput.value = `${date} ${time}`;
      if (reportPlaceInput) reportPlaceInput.value = placeName;

      if (!isAuto) {
        showToast(`🌟 ${name} (${gender === 'female' ? 'பெண்' : 'ஆண்'}) அவர்களின் ஜாதகம் துல்லியமாக கணிக்கப்பட்டது!`);
      }

      // Switch to Chart Tab if not already on it
      switchTab("chart");
    }

    calcBtn?.addEventListener("click", () => doCalculate(false));
    genderInput?.addEventListener("change", () => doCalculate(true));
    dateInput?.addEventListener("change", () => doCalculate(true));
    timeInput?.addEventListener("change", () => doCalculate(true));
    placeSelect?.addEventListener("change", () => doCalculate(true));
    placeCustom?.addEventListener("input", () => doCalculate(true));
    placeCustom?.addEventListener("change", () => doCalculate(true));

    resetBtn?.addEventListener("click", () => {
      if (nameInput) nameInput.value = "";
      if (genderInput) genderInput.value = "male";
      if (dateInput) dateInput.value = "";
      if (timeInput) timeInput.value = "";
      if (placeCustom) placeCustom.value = "";
      window.PGAstro.chart.clear();
      showToast("ஜாதகக் கட்டம் மீட்டமைக்கப்பட்டது");
    });
  }

  // 2. Combination Pair Selector Tab
  let pairP1 = "சூரியன்";
  let pairP2 = "புதன்";

  function setupPairSelector() {
    const listP1 = document.getElementById("pairSelectorListP1");
    const listP2 = document.getElementById("pairSelectorListP2");
    if (!listP1 || !listP2) return;

    const planets = ["சூரியன்", "சந்திரன்", "செவ்வாய்", "புதன்", "குரு", "சுக்கிரன்", "சனி", "ராகு", "கேது"];

    function renderSelectorButtons(container, isP1) {
      container.innerHTML = "";
      planets.forEach(p => {
        const btn = document.createElement("button");
        btn.className = `btn btn-sm ${((isP1 ? pairP1 : pairP2) === p) ? 'btn-gold' : 'btn-secondary'}`;
        btn.style.fontFamily = "var(--font-tamil)";
        btn.textContent = p;
        btn.addEventListener("click", () => {
          if (isP1) {
            pairP1 = p;
          } else {
            pairP2 = p;
          }
          renderSelectorButtons(listP1, true);
          renderSelectorButtons(listP2, false);
          displaySelectedPair();
        });
        container.appendChild(btn);
      });
    }

    renderSelectorButtons(listP1, true);
    renderSelectorButtons(listP2, false);
    displaySelectedPair();
  }

  function displaySelectedPair() {
    const resultBox = document.getElementById("pairResultBox");
    if (!resultBox) return;

    if (pairP1 === pairP2) {
      resultBox.innerHTML = `
        <div class="cosmic-card" style="text-align:center; padding: 2rem; color:var(--text-muted);">
          <h4>ஒரே கிரகம் தேர்ந்தெடுக்கப்பட்டுள்ளது (${pairP1})</h4>
          <p style="font-size:0.85rem; margin-top:0.3rem;">இணைவு பலன் காண இரு வெவ்வேறு கிரகங்களை தேர்ந்தெடுக்கவும்.</p>
        </div>
      `;
      return;
    }

    const comb = window.PGAstroData.getCombination(pairP1, pairP2);
    if (!comb) {
      resultBox.innerHTML = `
        <div class="cosmic-card" style="padding:1.5rem; text-align:center;">
          <h4 style="color:var(--gold-light);">${pairP1} + ${pairP2}</h4>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.4rem;">இந்த இணைவின் பலன்கள் பொதுவான நவகிரக காரகத்துவங்களை இணைத்து பலன் காணப்படுகிறது.</p>
        </div>
      `;
      return;
    }

    resultBox.innerHTML = `
      <div class="cosmic-card highlight" style="padding: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.8rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <h3 style="font-size: 1.25rem; color: var(--gold-light);">${comb.title}</h3>
            <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 3px;">
              ${comb.category || "முக்கிய இணைவு சூத்திரம்"}
            </div>
          </div>
          <button class="btn btn-sm btn-outline-gold" onclick="window.PGAstroUI.sharePrediction('${comb.title}', '${comb.keywords ? comb.keywords.join(', ') : ''}')">
            <span>📲</span> பகிர்க
          </button>
        </div>

        ${comb.keywords ? `
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:1rem;">
            ${comb.keywords.map(k => `<span style="font-size:0.75rem; background:rgba(212,175,55,0.15); color:var(--gold-light); padding:3px 8px; border-radius:4px; border:1px solid rgba(212,175,55,0.25);">${k}</span>`).join("")}
          </div>
        ` : ""}

        <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-main); white-space: pre-line; background: rgba(0,0,0,0.25); padding:1rem; border-radius:var(--radius-md); border:1px solid rgba(255,255,255,0.05);">
          ${comb.prediction}
        </div>
      </div>
    `;
  }

  // 3. Transit Evaluator Tab (நடப்பு கிரக பலன்கள்)
  let activeTransitKey = "நடப்பு_குரு";

  function setupTransitSelector() {
    const transitNav = document.getElementById("transitNavButtons");
    const natalGrid = document.getElementById("transitNatalGrid");
    if (!transitNav || !natalGrid) return;

    const transits = [
      { key: "நடப்பு_குரு", label: "நடப்பு குரு (Jupiter Transit)", color: "#f5c518" },
      { key: "நடப்பு_சனி", label: "நடப்பு சனி (Saturn Transit)", color: "#818cf8" },
      { key: "நடப்பு_ராகு", label: "நடப்பு ராகு (Rahu Transit)", color: "#94a3b8" },
      { key: "நடப்பு_கேது", label: "நடப்பு கேது (Ketu Transit)", color: "#d97706" }
    ];

    transitNav.innerHTML = "";
    transits.forEach(t => {
      const btn = document.createElement("button");
      btn.className = `btn btn-sm ${activeTransitKey === t.key ? 'btn-gold' : 'btn-secondary'}`;
      btn.style.fontFamily = "var(--font-tamil)";
      btn.textContent = t.label;
      btn.addEventListener("click", () => {
        activeTransitKey = t.key;
        setupTransitSelector();
      });
      transitNav.appendChild(btn);
    });

    renderTransitNatalList();
  }

  function renderTransitNatalList() {
    const natalGrid = document.getElementById("transitNatalGrid");
    const transitData = window.PGAstroData.transits[activeTransitKey];
    if (!natalGrid || !transitData) return;

    let html = `
      <div style="margin-bottom:1rem; padding:0.75rem; background:rgba(212,175,55,0.08); border-radius:var(--radius-md); border:1px solid var(--gold-border);">
        <strong style="color:var(--gold-light);">${transitData.name}</strong>
        <p style="font-size:0.84rem; color:var(--text-muted); margin-top:2px;">${transitData.desc}</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.85rem;">
    `;

    for (let planetName in transitData.planets) {
      const item = transitData.planets[planetName];
      html += `
        <div class="cosmic-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <h4 style="font-size:0.98rem; color:var(--gold-light);">${item.title}</h4>
            <span class="planet-tag tag-${planetName}">${planetName}</span>
          </div>
          <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">${item.prediction}</p>
        </div>
      `;
    }

    html += `</div>`;
    natalGrid.innerHTML = html;
  }

  // 4. Dasha & Special Rules Tab
  function setupDashaAndRules() {
    const container = document.getElementById("dashaRulesContainer");
    const searchInput = document.getElementById("dashaRulesSearch");
    if (!container) return;

    function renderRules(filter = "") {
      const rulesData = window.PGAstroData.specialRules;
      let html = "";
      const lowerFilter = filter.toLowerCase();

      // Dasha
      html += `<h3 style="color:var(--gold-primary); margin:1rem 0 0.6rem 0;">🌟 1. தசா / புத்திகளுக்கான பலன்கள்</h3>`;
      for (let p in rulesData.dasha) {
        const item = rulesData.dasha[p];
        if (!filter || item.title.toLowerCase().includes(lowerFilter) || item.text.toLowerCase().includes(lowerFilter)) {
          html += `
            <div class="cosmic-card" style="padding:1rem; margin-bottom:0.75rem;">
              <h4 style="color:var(--gold-light); margin-bottom:0.4rem;">${item.title}</h4>
              <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">${item.text}</p>
            </div>
          `;
        }
      }

      // Retrograde
      html += `<h3 style="color:var(--gold-primary); margin:1.5rem 0 0.6rem 0;">🌀 2. வக்கிர கிரக பலன்கள் (Retrograde Rules)</h3>`;
      for (let p in rulesData.retrograde) {
        const item = rulesData.retrograde[p];
        if (!filter || p.includes(filter) || item.text.toLowerCase().includes(lowerFilter)) {
          html += `
            <div class="cosmic-card" style="padding:1rem; margin-bottom:0.75rem;">
              <h4 style="color:var(--gold-light); margin-bottom:0.4rem;">${p} வக்கிரம்</h4>
              <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">${item.text}</p>
            </div>
          `;
        }
      }

      // Parivarthana
      html += `<h3 style="color:var(--gold-primary); margin:1.5rem 0 0.6rem 0;">🔄 3. பரிவர்த்தனை பலன்கள் (Planetary Exchange)</h3>`;
      for (let p in rulesData.parivarthana) {
        const item = rulesData.parivarthana[p];
        if (!filter || p.includes(filter) || item.text.toLowerCase().includes(lowerFilter)) {
          html += `
            <div class="cosmic-card" style="padding:1rem; margin-bottom:0.75rem;">
              <h4 style="color:var(--gold-light); margin-bottom:0.4rem;">${p} பரிவர்த்தனை</h4>
              <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">${item.text}</p>
            </div>
          `;
        }
      }

      // Marginal Planets
      html += `<h3 style="color:var(--gold-primary); margin:1.5rem 0 0.6rem 0;">📐 4. விளிம்பு கிரக பலன்கள் (Marginal/Border)</h3>`;
      for (let p in rulesData.marginal) {
        const item = rulesData.marginal[p];
        if (!filter || p.includes(filter) || item.text.toLowerCase().includes(lowerFilter)) {
          html += `
            <div class="cosmic-card" style="padding:1rem; margin-bottom:0.75rem;">
              <h4 style="color:var(--gold-light); margin-bottom:0.4rem;">${item.planet} விளிம்பு</h4>
              <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">${item.text}</p>
            </div>
          `;
        }
      }

      // Dominant / Authority
      html += `<h3 style="color:var(--gold-primary); margin:1.5rem 0 0.6rem 0;">👑 5. அதிகார கிரக பலன் & துரித பலன்</h3>`;
      for (let p in rulesData.authority) {
        const item = rulesData.authority[p];
        if (!filter || p.includes(filter) || item.dominant.toLowerCase().includes(lowerFilter) || item.quick.toLowerCase().includes(lowerFilter)) {
          html += `
            <div class="cosmic-card" style="padding:1rem; margin-bottom:0.75rem;">
              <h4 style="color:var(--gold-light); margin-bottom:0.3rem;">${p} - அதிகார கிரகம்</h4>
              <div style="background:rgba(212,175,55,0.1); padding:0.4rem 0.6rem; border-radius:4px; font-size:0.82rem; color:var(--gold-light); margin-bottom:0.5rem;">
                <strong>துரித பலன்:</strong> ${item.quick}
              </div>
              <p style="font-size:0.88rem; line-height:1.6; color:var(--text-main);">${item.dominant}</p>
            </div>
          `;
        }
      }

      container.innerHTML = html;
    }

    renderRules();
    searchInput?.addEventListener("input", (e) => renderRules(e.target.value.trim()));
  }

  // 5. Karakas Viewer Tab
  function setupKarakasViewer() {
    const container = document.getElementById("karakasContainer");
    const searchInput = document.getElementById("karakasSearch");
    if (!container) return;

    function renderKarakas(filter = "") {
      const planets = window.PGAstroData.karakas.planets;
      let html = `<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:1rem;">`;

      for (let p in planets) {
        const item = planets[p];
        const blob = `${item.name} ${item.professions} ${item.organsAndDiseases} ${item.environment} ${item.casteAncestry} ${item.primaryTraits}`.toLowerCase();

        if (!filter || blob.includes(filter.toLowerCase())) {
          html += `
            <div class="cosmic-card" style="padding:1.1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                <h4 style="color:var(--gold-light); font-size:1.05rem;">
                  <span style="margin-right:0.3rem;">${item.symbol}</span> ${item.name}
                </h4>
                <span class="planet-tag tag-${p}">${item.direction}</span>
              </div>

              <div style="font-size:0.82rem; line-height:1.5; display:flex; flex-direction:column; gap:0.5rem;">
                <div>
                  <strong style="color:var(--gold-primary);">🩺 உறுப்புகள் & நோய்கள்:</strong>
                  <p style="color:var(--text-main);">${item.organsAndDiseases}</p>
                </div>
                <div>
                  <strong style="color:var(--gold-primary);">💼 தொழில்கள்:</strong>
                  <p style="color:var(--text-main);">${item.professions}</p>
                </div>
                <div>
                  <strong style="color:var(--gold-primary);">🏡 வாசலில் / அருகில் உள்ளவை:</strong>
                  <p style="color:var(--text-main);">${item.environment}</p>
                </div>
                <div>
                  <strong style="color:var(--gold-primary);">👥 குலம் & முன்னோர்கள்:</strong>
                  <p style="color:var(--text-main);">${item.casteAncestry}</p>
                </div>
                <div>
                  <strong style="color:var(--gold-primary);">✨ பிரதான தன்மைகள்:</strong>
                  <p style="color:var(--text-main);">${item.primaryTraits}</p>
                </div>
              </div>
            </div>
          `;
        }
      }

      html += `</div>`;
      container.innerHTML = html;
    }

    renderKarakas();
    searchInput?.addEventListener("input", (e) => renderKarakas(e.target.value.trim()));
  }

  // 6. Subhathuvam & Sookshuma Valu Viewer Tab
  function setupSubhathuvamViewer() {
    const container = document.getElementById("subhathuvamContainer");
    if (!container) return;

    const subData = window.PGAstro?.subhathuvam?.data;
    if (!subData) return;

    let html = `
      <div class="cosmic-card highlight" style="margin-bottom:1.5rem; text-align:center; padding:1.25rem;">
        <div style="color:var(--gold-light); font-weight:600; margin-bottom:0.25rem;">ஸ்ரீ பச்சையம்மன் துணை • ஸ்ரீ கங்கையம்மன் துணை</div>
        <h2 style="font-size:1.35rem; color:var(--gold-primary); margin-bottom:0.3rem;">${subData.title}</h2>
        <div style="font-size:0.86rem; color:var(--text-muted);">${subData.subTitle}</div>
      </div>

      <!-- Core Rules Grid -->
      <h3 style="color:var(--gold-primary); font-size:1.15rem; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
        <span>✨</span> முக்கிய சுபத்துவ & சூட்சும விதிகள்
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.9rem; margin-bottom:1.5rem;">
    `;

    subData.coreRules.forEach(rule => {
      html += `
        <div class="cosmic-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
            <h4 style="color:var(--gold-light); font-size:0.95rem; margin:0;">${rule.title}</h4>
            <span class="badge badge-gold" style="font-size:0.72rem; white-space:nowrap;">${rule.badge}</span>
          </div>
          <p style="font-size:0.86rem; line-height:1.6; color:var(--text-main); margin:0;">${rule.desc}</p>
        </div>
      `;
    });

    html += `</div>`;

    // Ketu & Saturn-Mars Principles
    if (subData.ketuAndPapathuvamRules) {
      html += `
        <h3 style="color:var(--gold-primary); font-size:1.15rem; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
          <span>🪐</span> கேதுவின் சூட்சும வலு & சனி-செவ்வாய் பாபத்துவ ஆய்வு
        </h3>
        <div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:1.5rem;">
      `;

      subData.ketuAndPapathuvamRules.forEach(r => {
        const borderCol = r.type === 'danger' || r.type === 'warning' ? '#f87171' : r.type === 'success' ? '#4ade80' : 'var(--gold-primary)';
        const bgTint = r.type === 'danger' || r.type === 'warning' ? 'rgba(239, 68, 68, 0.06)' : 'rgba(255,255,255,0.03)';
        html += `
          <div class="cosmic-card" style="padding:1rem; border-left:4px solid ${borderCol}; background:${bgTint};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.3rem;">
              <h4 style="color:var(--gold-light); font-size:0.95rem; margin:0;">${r.title}</h4>
              <span class="badge ${r.type === 'danger' || r.type === 'warning' ? 'badge-danger' : 'badge-gold'}" style="font-size:0.72rem;">${r.badge}</span>
            </div>
            <p style="font-size:0.86rem; line-height:1.6; color:var(--text-main); margin:0;">${r.desc}</p>
          </div>
        `;
      });

      html += `</div>`;
    }

    // Real Case Study Horoscope
    if (subData.caseStudy) {
      const cs = subData.caseStudy;
      html += `
        <div class="cosmic-card" style="padding:1.25rem; margin-top:1.5rem; border:1px solid rgba(212,175,55,0.25);">
          <h3 style="color:var(--gold-primary); font-size:1.15rem; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
            <span>📋</span> ${cs.title}
          </h3>
          <div style="background:rgba(255,255,255,0.02); padding:0.85rem; border-radius:var(--radius-sm); margin-bottom:1rem; font-size:0.88rem;">
            <p style="margin:0 0 0.35rem 0;"><strong style="color:var(--gold-light);">அன்பர்:</strong> ${cs.nativeName} | <strong style="color:var(--gold-light);">பிறந்த தேதி & நேரம்:</strong> ${cs.dob} ${cs.time} | <strong style="color:var(--gold-light);">இடம்:</strong> ${cs.place}</p>
            <p style="margin:0;"><strong style="color:var(--gold-light);">லக்னம்:</strong> ${cs.lagna} | <strong style="color:var(--gold-light);">ராசி:</strong> ${cs.rasi}</p>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
      `;
      cs.keyPoints.forEach(kp => {
        html += `
          <div style="border-left:3px solid var(--gold-primary); padding-left:0.75rem;">
            <strong style="color:var(--gold-light); font-size:0.9rem;">${kp.label}:</strong>
            <p style="font-size:0.86rem; color:var(--text-main); margin:0.25rem 0 0 0; line-height:1.6;">${kp.detail}</p>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    container.innerHTML = html;
  }

  // 6. Client Report & Print Generator
  function setupReportGenerator() {
    const modal = document.getElementById("reportModal");
    const openBtn = document.getElementById("btnOpenReportModal");
    const closeBtn = document.getElementById("btnCloseReportModal");
    const printBtn = document.getElementById("btnPrintReport");

    openBtn?.addEventListener("click", () => {
      generatePrintableReport();
      modal?.classList.add("show");
    });

    closeBtn?.addEventListener("click", () => {
      modal?.classList.remove("show");
    });

    printBtn?.addEventListener("click", () => {
      window.print();
    });
  }

  function generatePrintableReport() {
    const nativeName = document.getElementById("clientNativeName")?.value || "அன்பர்";
    const nativeGender = document.getElementById("clientNativeGender")?.value || document.getElementById("birthCalcGender")?.value || "male";
    const genderLabel = nativeGender === "female" ? "பெண் (Female)" : (nativeGender === "other" ? "மற்றவை (Other)" : "ஆண் (Male)");
    const nativeDob = document.getElementById("clientNativeDob")?.value || new Date().toLocaleDateString("ta-IN");
    const nativePlace = document.getElementById("clientNativePlace")?.value || "திருவண்ணாமலை (Tiruvannamalai)";
    const container = document.getElementById("printableReportContent");
    if (!container) return;

    const chartState = window.PGAstro.chart.getState();
    const RASIS = window.PGAstro.chart.RASIS;
    const lagnaId = window.PGAstro.chart.getLagnaRasiId();
    const lagnaDeg = window.PGAstro.chart.getLagnaDegree();
    const formatDeg = window.PGAstro.chart.formatDegree || ((d) => d + "°");

    // Collect chart summary with degrees
    let chartSummaryHtml = `<div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:4px; margin:0.8rem 0; border:1px solid #d4af37; padding:4px; background:#0d1222;">`;
    RASIS.forEach(r => {
      const planets = chartState[r.id] || [];
      const items = [];
      if (lagnaId === r.id) {
        items.push(`<strong style="color:#ffd700;">ல ${lagnaDeg !== null ? '(' + formatDeg(lagnaDeg, true) + ')' : ''}</strong>`);
      }
      planets.forEach(p => {
        const degStr = p.degree !== undefined ? ` (${formatDeg(p.degree, true)})` : "";
        const modStr = p.isRetrograde ? " [வ]" : p.isExalted ? " [உ]" : p.isDebilitated ? " [நீ]" : p.isMarginal ? " [வி]" : "";
        items.push(`${p.planet}${degStr}${modStr}`);
      });

      chartSummaryHtml += `
        <div style="border:1px solid rgba(212,175,55,0.3); padding:4px; min-height:65px; font-size:0.75rem; background:#12182d;">
          <div style="font-weight:bold; color:#f5c518; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:2px; margin-bottom:3px;">${r.name}</div>
          <div style="color:#e2e8f0; font-size:0.72rem; line-height:1.4;">${items.join("<br>") || "-"}</div>
        </div>
      `;
    });
    chartSummaryHtml += `</div>`;

    container.innerHTML = `
      <div style="text-align:center; margin-bottom:1rem; border-bottom:1px solid var(--gold-border); padding-bottom:0.8rem;">
        <div style="color:var(--gold-light); font-size:0.9rem; font-weight:600;">பச்சையம்மன் துணை • கங்கையம்மன் துணை</div>
        <h2 style="color:var(--gold-primary); font-size:1.4rem; margin:0.3rem 0;">PG ASTROLOGER - நாடி ஜோதிட அறிக்கை</h2>
        <div style="font-size:0.85rem; color:var(--text-muted);">
          ஜாதகர்: <strong>${nativeName}</strong> | பாலினம்: <strong>${genderLabel}</strong> | நாள் & நேரம்: <strong>${nativeDob}</strong> | 📍 பிறந்த இடம்: <strong>${nativePlace}</strong>
        </div>
      </div>

      <h4 style="color:var(--gold-light); margin-bottom:0.4rem;">ராசிக் கட்ட அமைப்பு & பாகைகள் (South Indian Rasi Chart with Degrees):</h4>
      ${chartSummaryHtml}

      <h4 style="color:var(--gold-light); margin:1rem 0 0.4rem 0;">கண்டறியப்பட்ட முக்கிய இணைவுகள் & வழிகாட்டல்:</h4>
      <div id="printReportPredictions">
        ${document.getElementById("chartAnalysisContainer")?.innerHTML || "<p>கிரகங்களை அமைத்து பலன்களை அறியவும்.</p>"}
      </div>
    `;
  }

  function setupClock() {
    const clockEl = document.getElementById("liveAstroClock");
    if (!clockEl) return;
    function update() {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    update();
    setInterval(update, 1000);
  }

  // Toast & WhatsApp sharing
  function showToast(message) {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  function sharePrediction(title, keywords) {
    const text = `🌟 *PG Astrologer - நாடி ஜோதிடம்* 🌟\n\n📌 *${title}*\n🔑 குறிப்புகள்: ${keywords}\n\nபச்சையம்மன் துணை • கங்கையம்மன் துணை`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("பலன் நகலெடுக்கப்பட்டது (Copied to Clipboard)!");
      });
    }
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  }

  // Public API
  window.PGAstroUI = {
    init: initUI,
    switchTab: switchTab,
    showToast: showToast,
    sharePrediction: sharePrediction
  };
})();
