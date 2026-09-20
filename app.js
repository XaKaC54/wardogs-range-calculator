(function () {
  "use strict";

  function extractPairs(text) {
    const nums = [...String(text).matchAll(/-?\d+(?:[.,]\d+)?/g)].map((match) =>
      Number(match[0].replace(",", ".")),
    );
    const pairs = [];
    for (let index = 0; index + 1 < nums.length; index += 2) {
      pairs.push({ x: nums[index], y: nums[index + 1] });
    }
    return pairs;
  }

  function calculateDistance(gun, target) {
    const dx = Number((gun.x - target.x).toFixed(10));
    const dy = Number((gun.y - target.y).toFixed(10));
    const rawMapUnits = Math.hypot(dx, dy);
    const mapUnits = Number(rawMapUnits.toFixed(3));
    const metres = Number((rawMapUnits * 100).toFixed(1));
    return { dx, dy, mapUnits, metres, rounded: Math.round(metres) };
  }

  function normalizeLocale(locale) {
    return String(locale || "ru").toLowerCase().startsWith("en") ? "en" : "ru";
  }

  const copy = {
    ru: {
      pageTitle: "WARDOGS — калькулятор дальности",
      title: "FDC",
      unit: "WARDOGS · L81 / SPH-2",
      consoleTitle: "Расчётная станция",
      sopTitle: "Порядок работы",
      gunLabel: "Орудие",
      gunPlaceholder: "98.43, 110.38",
      gunHelp: "ПКМ → Mark Coordinates → Ctrl+A → Ctrl+C",
      targetLabel: "Цель",
      targetPlaceholder: "94.53, 109.03",
      targetHelp: "То же для цели. Обе пары можно вставить в одно поле.",
      swap: "Поменять",
      clearTarget: "Сброс цели",
      demo: "Пример",
      resultIdle: "Нет данных",
      resultNeedGun: "Нужно орудие",
      resultNeedTarget: "Нужна цель",
      resultReady: (range) => String(range),
      copyIdle: "вставь две точки с карты",
      copyReady: "клик — копировать в RNG",
      copied: (range) => "скопировано " + range,
      copyFailed: "скопируй число вручную",
      mortarName: "L81 миномёт",
      mortarRange: "до ~700 м",
      artilleryName: "SPH-2 арт",
      artilleryRange: "750–2630 м",
      inRange: "берёт",
      tooFarMortar: "далеко",
      tooCloseArtillery: "близко",
      tooFarArtillery: "далеко",
      step1Title: "Подготовка карты",
      step1Body: "Максимальный зум на позицию орудия, иначе координаты грубые.",
      step2Title: "Засечка орудия",
      step2Body: "ПКМ → Mark Coordinates. Чат: Ctrl+A, Ctrl+C. X, затем Y.",
      step3Title: "Засечка цели",
      step3Body: "То же по точке удара. Обе пары можно вставить сразу.",
      step4Title: "Установка RNG",
      step4Body: "Кликни число слева и выставь ползунок. Между рисками — посередине.",
      step5Title: "Наведение",
      step5Body: "Средняя кнопка — белый ромб на цели. Ствол, пока ромб не в центре.",
      step6Title: "Огонь",
      step6Body: "L81: R×3, 30 ammo, C — killcam. SPH-2 от 750 м. Коротко в рельеф — сместись и пересчитай.",
      languageLabel: "Язык",
      calculatorLabel: "Калькулятор дальности WARDOGS",
      flowMap: "карта · цель",
      flowDiamond: "белый ромб",
      flowCenter: "центр экрана",
    },
    en: {
      pageTitle: "WARDOGS — range calculator",
      title: "FDC",
      unit: "WARDOGS · L81 / SPH-2",
      consoleTitle: "Fire-control station",
      sopTitle: "Procedure",
      gunLabel: "Gun",
      gunPlaceholder: "98.43, 110.38",
      gunHelp: "Right-click → Mark Coordinates → Ctrl+A → Ctrl+C",
      targetLabel: "Target",
      targetPlaceholder: "94.53, 109.03",
      targetHelp: "Repeat for the target. Both pairs can go in one field.",
      swap: "Swap",
      clearTarget: "Clear target",
      demo: "Example",
      resultIdle: "No data",
      resultNeedGun: "Need gun coords",
      resultNeedTarget: "Need target coords",
      resultReady: (range) => String(range),
      copyIdle: "paste two map points",
      copyReady: "click to copy for RNG",
      copied: (range) => "copied " + range,
      copyFailed: "copy the number manually",
      mortarName: "L81 mortar",
      mortarRange: "up to ~700 m",
      artilleryName: "SPH-2 arty",
      artilleryRange: "750–2630 m",
      inRange: "in range",
      tooFarMortar: "too far",
      tooCloseArtillery: "too close",
      tooFarArtillery: "too far",
      step1Title: "Map prep",
      step1Body: "Zoom all the way in on the gun or the coordinates go coarse.",
      step2Title: "Mark gun",
      step2Body: "RMB → Mark Coordinates. Chat: Ctrl+A, Ctrl+C. X, then Y.",
      step3Title: "Mark target",
      step3Body: "Same on the impact point. Both pairs can be pasted at once.",
      step4Title: "Set RNG",
      step4Body: "Click the number and set the slider. Between notches, split the difference.",
      step5Title: "Lay on",
      step5Body: "Middle-click for the white diamond. Turn until it sits centre-screen.",
      step6Title: "Fire",
      step6Body: "L81: R×3, 30 ammo, C skips killcam. SPH-2 from 750 m. Short on terrain: move and recalculate.",
      languageLabel: "Language",
      calculatorLabel: "WARDOGS range calculator",
      flowMap: "map · target",
      flowDiamond: "white diamond",
      flowCenter: "view centre",
    },
  };

  function getCopy(locale) {
    return copy[normalizeLocale(locale)];
  }

  const gunEl = document.getElementById("gun");
  const targetEl = document.getElementById("target");
  const resultEl = document.getElementById("result");
  const resultButton = document.getElementById("copy-result");
  const copyHintEl = document.getElementById("copy-hint");
  const mortarEl = document.getElementById("mortar-status");
  const artilleryEl = document.getElementById("artillery-status");
  const algoEl = document.getElementById("algo");
  const languageButtons = [...document.querySelectorAll("[data-locale]")];
  const storage = { gun: "wardogs-gun", locale: "wardogs-locale" };
  let locale = "ru";

  if (!gunEl || !targetEl || !resultButton) return;

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  function readInputs() {
    const gunPairs = extractPairs(gunEl.value);
    const targetPairs = extractPairs(targetEl.value);
    if (gunPairs.length >= 2 && targetPairs.length === 0) return { gun: gunPairs[0], target: gunPairs[1] };
    if (targetPairs.length >= 2 && gunPairs.length === 0) return { gun: targetPairs[0], target: targetPairs[1] };
    return { gun: gunPairs[0] || null, target: targetPairs[0] || null };
  }

  function setStatus(element, name, range, state, stateLabel) {
    if (!element) return;
    element.className = "weapon-status " + state;
    element.innerHTML = "<span><strong>" + name + "</strong><small>" + range + "</small></span><b>" + stateLabel + "</b>";
  }

  function applyLocale(nextLocale) {
    locale = normalizeLocale(nextLocale);
    const t = getCopy(locale);
    document.documentElement.lang = locale;
    document.title = t.pageTitle;
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const value = t[element.getAttribute("data-i18n")];
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      const value = t[element.getAttribute("data-i18n-placeholder")];
      if (typeof value === "string") element.placeholder = value;
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      const value = t[element.getAttribute("data-i18n-aria-label")];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
    languageButtons.forEach(function (button) {
      const active = button.getAttribute("data-locale") === locale;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    safeSet(storage.locale, locale);
    calculate();
  }

  function setStage(name) {
    if (algoEl) algoEl.setAttribute("data-stage", name);
  }

  function calculate() {
    const t = getCopy(locale);
    const { gun, target } = readInputs();
    resultButton.setAttribute("data-range", "");

    if (!gun || !target) {
      resultEl.textContent = !gun && target ? t.resultNeedGun : gun && !target ? t.resultNeedTarget : t.resultIdle;
      resultEl.classList.add("empty");
      copyHintEl.textContent = t.copyIdle;
      resultButton.disabled = true;
      setStatus(mortarEl, t.mortarName, t.mortarRange, "neutral", "—");
      setStatus(artilleryEl, t.artilleryName, t.artilleryRange, "neutral", "—");
      setStage(!gun ? "gun" : "target");
      return;
    }

    const distance = calculateDistance(gun, target);
    const mortarOk = distance.metres > 0 && distance.metres <= 700;
    const artilleryOk = distance.metres >= 750 && distance.metres <= 2630;
    resultEl.textContent = t.resultReady(distance.rounded) + " m";
    resultEl.classList.remove("empty");
    copyHintEl.textContent = t.copyReady;
    resultButton.disabled = false;
    resultButton.setAttribute("data-range", String(distance.rounded));
    setStatus(mortarEl, t.mortarName, t.mortarRange, mortarOk ? "good" : "bad", mortarOk ? t.inRange : t.tooFarMortar);
    setStatus(
      artilleryEl,
      t.artilleryName,
      t.artilleryRange,
      artilleryOk ? "good" : "bad",
      artilleryOk ? t.inRange : distance.metres < 750 ? t.tooCloseArtillery : t.tooFarArtillery,
    );
    setStage("fire");
    safeSet(storage.gun, gun.x + ", " + gun.y);
  }

  function copyResult() {
    const range = resultButton.getAttribute("data-range");
    if (!range) return;
    const t = getCopy(locale);
    function ok() {
      copyHintEl.textContent = t.copied(range);
      resultButton.classList.remove("flash");
      void resultButton.offsetWidth;
      resultButton.classList.add("flash");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(range).then(ok).catch(function () {
        copyHintEl.textContent = t.copyFailed;
      });
    } else {
      copyHintEl.textContent = t.copyFailed;
    }
  }

  gunEl.addEventListener("input", calculate);
  targetEl.addEventListener("input", calculate);
  resultButton.addEventListener("click", copyResult);

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      applyLocale(button.getAttribute("data-locale"));
    });
  });

  const swap = document.getElementById("swap");
  const clearTarget = document.getElementById("clear-target");
  const demo = document.getElementById("demo");

  if (swap) {
    swap.addEventListener("click", function () {
      const a = gunEl.value;
      gunEl.value = targetEl.value;
      targetEl.value = a;
      calculate();
      targetEl.focus();
    });
  }

  if (clearTarget) {
    clearTarget.addEventListener("click", function () {
      targetEl.value = "";
      calculate();
      targetEl.focus();
    });
  }

  if (demo) {
    demo.addEventListener("click", function () {
      gunEl.value = "98.43, 110.38";
      targetEl.value = "94.53, 109.03";
      calculate();
    });
  }

  gunEl.addEventListener("paste", function () {
    requestAnimationFrame(function () {
      const pairs = extractPairs(gunEl.value);
      if (pairs.length >= 2 && !targetEl.value.trim()) {
        gunEl.value = pairs[0].x + ", " + pairs[0].y;
        targetEl.value = pairs[1].x + ", " + pairs[1].y;
        calculate();
        targetEl.focus();
      } else if (pairs.length === 1) {
        targetEl.focus();
      }
    });
  });

  const savedGun = safeGet(storage.gun);
  if (savedGun) gunEl.value = savedGun;
  applyLocale(safeGet(storage.locale) || "ru");
  (extractPairs(gunEl.value).length ? targetEl : gunEl).focus();
})();

