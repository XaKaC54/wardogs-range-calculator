export function extractPairs(text) {
  const nums = [...String(text).matchAll(/-?\d+(?:[.,]\d+)?/g)].map((match) =>
    Number(match[0].replace(",", ".")),
  );
  const pairs = [];
  for (let index = 0; index + 1 < nums.length; index += 2) {
    pairs.push({ x: nums[index], y: nums[index + 1] });
  }
  return pairs;
}

export function calculateDistance(gun, target) {
  const dx = Number((gun.x - target.x).toFixed(10));
  const dy = Number((gun.y - target.y).toFixed(10));
  const rawMapUnits = Math.hypot(dx, dy);
  const mapUnits = Number(rawMapUnits.toFixed(3));
  const metres = Number((rawMapUnits * 100).toFixed(1));
  return { dx, dy, mapUnits, metres, rounded: Math.round(metres) };
}

export function normalizeLocale(locale) {
  return String(locale).toLowerCase().startsWith("en") ? "en" : "ru";
}

const copy = {
  ru: {
    pageTitle: "WARDOGS — калькулятор дальности",
    title: "Калькулятор дальности",
    subtitle: "для миномёта L81 и артиллерийского танка SPH-2",
    intro: "Вставьте координаты орудия и цели. Калькулятор покажет расстояние, которое нужно выставить на шкале RNG.",
    quickTitle: "Как получить координаты",
    stepsTitle: "Три шага до выстрела",
    quickSteps: [
      "Максимально приблизьте карту к позиции орудия.",
      "Нажмите ПКМ → Mark Coordinates и скопируйте координаты из чата.",
      "Повторите то же самое для цели.",
    ],
    gunLabel: "1. Координаты орудия",
    gunPlaceholder: "Например: 98.43, 110.38",
    gunHelp: "Максимальный зум → ПКМ → Mark Coordinates → скопировать из чата.",
    targetLabel: "2. Координаты цели",
    targetPlaceholder: "Например: 94.53, 109.03",
    targetHelp: "Повторите для цели. Обе пары можно вставить сразу в любое поле.",
    swap: "Поменять местами",
    clearTarget: "Очистить цель",
    demo: "Показать пример",
    resultLabel: "3. Готовое значение",
    resultIdle: "Добавьте две пары координат",
    resultNeedGun: "Добавьте координаты орудия",
    resultNeedTarget: "Добавьте координаты цели",
    resultReady: (range) => `Установите RNG: ${range} м`,
    copyIdle: "После расчёта нажмите сюда, чтобы скопировать число",
    copyReady: "Нажмите, чтобы скопировать число",
    copied: (range) => `Скопировано: ${range}. Теперь выставьте это значение на RNG.`,
    copyFailed: "Не удалось скопировать. Выделите число вручную.",
    mortarName: "L81 миномёт",
    mortarRange: "примерно до 700 м",
    artilleryName: "SPH-2 артиллерия",
    artilleryRange: "примерно 750–2630 м",
    inRange: "подходит",
    tooFarMortar: "слишком далеко",
    tooCloseArtillery: "слишком близко",
    tooFarArtillery: "слишком далеко",
    gap: "между рабочими диапазонами",
    aimTitle: "Что делать дальше",
    aimMortar: "MMB — ромб на цели, в центр прицела, RNG как слева. L81: R×3, C — killcam.",
    aimArtillery: "Наводись на метку, RNG как слева. Здесь SPH-2 (от 750 м).",
    aimGap: "Дыра 700–750 м. Сдвинь позицию и пересчитай.",
    aimTooFar: "Вне дальности. Смени позицию и пересчитай.",
    detailsTitle: "Подробности и частые вопросы",
    formulaTitle: "Как работает формула",
    formulaText: "Координаты карты измеряются в сотнях метров. Калькулятор находит разницу по X и Y, применяет теорему Пифагора и умножает результат на 100.",
    shootingTitle: "Как навестись и выстрелить",
    shootingSteps: [
      "Средней кнопкой мыши поставьте белый ромб на цели.",
      "Поверните орудие так, чтобы ромб оказался в центре прицела.",
      "Выставьте рассчитанное значение на шкале RNG и стреляйте.",
    ],
    troubleshootingTitle: "Если снаряд упал раньше цели",
    troubleshootingText: "Дерево, крыша, гребень. Цифра верная — сместись и пересчитай.",
    accuracyNote: "Зум карты до конца, иначе координаты грубые.",
    factAmmoTitle: "Боезапас",
    factAmmo: "L81: 3×R, 30 ammo/снаряд, 90 на очередь. C — skip killcam.",
    factRangeTitle: "Дальность",
    factRange: "Миномёт ~700. Арт 750–2630. Между ними дыра — сдвинься.",
    formulaGun: "Орудие",
    formulaTarget: "Цель",
    footer: "Неофициальный инструмент сообщества WARDOGS. Названия RNG и Mark Coordinates оставлены как в игре.",
    languageLabel: "Язык интерфейса",
    calculatorLabel: "Калькулятор дальности WARDOGS",
    logoAlt: "WARDOGS",
  },
  en: {
    pageTitle: "WARDOGS — range calculator",
    title: "Range calculator",
    subtitle: "for the L81 mortar and SPH-2 artillery tank",
    intro: "Paste the gun and target coordinates. The calculator will show the distance to set on the RNG scale.",
    quickTitle: "How to get coordinates",
    stepsTitle: "Three steps to fire",
    quickSteps: [
      "Zoom the map all the way in on your gun position.",
      "Right-click → Mark Coordinates and copy the coordinates from chat.",
      "Repeat the same steps for the target.",
    ],
    gunLabel: "1. Gun coordinates",
    gunPlaceholder: "Example: 98.43, 110.38",
    gunHelp: "Maximum zoom → right-click → Mark Coordinates → copy from chat.",
    targetLabel: "2. Target coordinates",
    targetPlaceholder: "Example: 94.53, 109.03",
    targetHelp: "Repeat for the target. You can paste both coordinate pairs into either field.",
    swap: "Swap points",
    clearTarget: "Clear target",
    demo: "Show example",
    resultLabel: "3. Firing range",
    resultIdle: "Add two coordinate pairs",
    resultNeedGun: "Add the gun coordinates",
    resultNeedTarget: "Add the target coordinates",
    resultReady: (range) => `Set RNG to ${range} m`,
    copyIdle: "After calculation, click here to copy the number",
    copyReady: "Click to copy the number",
    copied: (range) => `Copied: ${range}. Set this value on the RNG scale.`,
    copyFailed: "Could not copy. Select the number manually.",
    mortarName: "L81 mortar",
    mortarRange: "approximately up to 700 m",
    artilleryName: "SPH-2 artillery",
    artilleryRange: "approximately 750–2630 m",
    inRange: "in range",
    tooFarMortar: "too far",
    tooCloseArtillery: "too close",
    tooFarArtillery: "too far",
    gap: "between weapon ranges",
    aimTitle: "What to do next",
    aimMortar: "MMB diamond on target, center it, set RNG. L81: R×3, C skips killcam.",
    aimArtillery: "Aim at the marker, set RNG. SPH-2 from 750 m.",
    aimGap: "Gap 700–750 m. Move and recalculate.",
    aimTooFar: "Out of range. Move and recalculate.",
    detailsTitle: "Details and common questions",
    formulaTitle: "How the formula works",
    formulaText: "Map coordinates are measured in hundreds of metres. The calculator finds the X and Y differences, applies the Pythagorean theorem, and multiplies the result by 100.",
    shootingTitle: "How to aim and fire",
    shootingSteps: [
      "Place a white diamond on the target with the middle mouse button.",
      "Turn the weapon until the diamond is centered in the sight.",
      "Set the calculated value on the RNG scale and fire.",
    ],
    troubleshootingTitle: "If the shell lands short",
    troubleshootingText: "Tree, roof, or ridge. The number is right — move and recalculate.",
    accuracyNote: "Zoom the map all the way in or coordinates will be coarse.",
    factAmmoTitle: "Ammo",
    factAmmo: "L81: 3×R, 30 ammo/shell, 90 for a volley. C skips killcam.",
    factRangeTitle: "Range",
    factRange: "Mortar ~700. Arty 750–2630. The gap between them: reposition.",
    formulaGun: "Gun",
    formulaTarget: "Target",
    footer: "Unofficial WARDOGS community tool. RNG and Mark Coordinates are kept exactly as shown in the game.",
    languageLabel: "Interface language",
    calculatorLabel: "WARDOGS range calculator",
    logoAlt: "WARDOGS",
  },
};

export function getCopy(locale) {
  return copy[normalizeLocale(locale)];
}

function initBrowserApp() {
  const gunEl = document.querySelector("#gun");
  if (!gunEl) return;

  const targetEl = document.querySelector("#target");
  const resultEl = document.querySelector("#result");
  const resultButton = document.querySelector("#copy-result");
  const copyHintEl = document.querySelector("#copy-hint");
  const formulaWorkEl = document.querySelector("#formula-work");
  const nextStepEl = document.querySelector("#next-step");
  const mortarEl = document.querySelector("#mortar-status");
  const artilleryEl = document.querySelector("#artillery-status");
  const languageButtons = [...document.querySelectorAll("[data-locale]")];
  const storage = { gun: "wardogs-gun", locale: "wardogs-locale" };
  let locale = "ru";

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function readInputs() {
    const gunPairs = extractPairs(gunEl.value);
    const targetPairs = extractPairs(targetEl.value);
    if (gunPairs.length >= 2 && targetPairs.length === 0) return { gun: gunPairs[0], target: gunPairs[1] };
    if (targetPairs.length >= 2 && gunPairs.length === 0) return { gun: targetPairs[0], target: targetPairs[1] };
    return { gun: gunPairs[0] ?? null, target: targetPairs[0] ?? null };
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setStatus(element, name, range, state, stateLabel) {
    element.className = `weapon-status ${state}`;
    element.innerHTML = `<span><strong>${name}</strong><small>${range}</small></span><b>${stateLabel}</b>`;
  }

  function applyLocale(nextLocale) {
    locale = normalizeLocale(nextLocale);
    const t = getCopy(locale);
    document.documentElement.lang = locale;
    document.title = t.pageTitle;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (typeof t[key] === "string") element.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t[element.dataset.i18nPlaceholder];
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", t[element.dataset.i18nAriaLabel]);
    });
    document.querySelector("#quick-steps").innerHTML = t.quickSteps.map((step) => `<li>${step}</li>`).join("");
    document.querySelector("#shooting-steps").innerHTML = t.shootingSteps.map((step) => `<li>${step}</li>`).join("");
    languageButtons.forEach((button) => {
      const active = button.dataset.locale === locale;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    safeSet(storage.locale, locale);
    calculate();
  }

  function calculate() {
    const t = getCopy(locale);
    const { gun, target } = readInputs();
    resultButton.dataset.range = "";
    formulaWorkEl.textContent = "";

    if (!gun || !target) {
      resultEl.textContent = !gun && target ? t.resultNeedGun : gun && !target ? t.resultNeedTarget : t.resultIdle;
      resultEl.classList.add("empty");
      copyHintEl.textContent = t.copyIdle;
      resultButton.disabled = true;
      nextStepEl.textContent = t.accuracyNote;
      setStatus(mortarEl, t.mortarName, t.mortarRange, "neutral", "—");
      setStatus(artilleryEl, t.artilleryName, t.artilleryRange, "neutral", "—");
      return;
    }

    const distance = calculateDistance(gun, target);
    const mortarOk = distance.metres > 0 && distance.metres <= 700;
    const artilleryOk = distance.metres >= 750 && distance.metres <= 2630;
    resultEl.textContent = t.resultReady(distance.rounded);
    resultEl.classList.remove("empty");
    copyHintEl.textContent = t.copyReady;
    resultButton.disabled = false;
    resultButton.dataset.range = String(distance.rounded);

    setStatus(
      mortarEl,
      t.mortarName,
      t.mortarRange,
      mortarOk ? "good" : "bad",
      mortarOk ? t.inRange : t.tooFarMortar,
    );
    setStatus(
      artilleryEl,
      t.artilleryName,
      t.artilleryRange,
      artilleryOk ? "good" : "bad",
      artilleryOk ? t.inRange : distance.metres < 750 ? t.tooCloseArtillery : t.tooFarArtillery,
    );

    if (mortarOk) nextStepEl.textContent = t.aimMortar;
    else if (artilleryOk) nextStepEl.textContent = t.aimArtillery;
    else if (distance.metres > 700 && distance.metres < 750) nextStepEl.textContent = t.aimGap;
    else nextStepEl.textContent = t.aimTooFar;

    formulaWorkEl.textContent =
      `${t.formulaGun} ${gun.x.toFixed(2)}, ${gun.y.toFixed(2)}  ·  ${t.formulaTarget} ${target.x.toFixed(2)}, ${target.y.toFixed(2)}  ·  Δx ${distance.dx.toFixed(2)}  Δy ${distance.dy.toFixed(2)}  ·  √ × 100 = ${distance.metres.toFixed(1)} → RNG ${distance.rounded}`;
    safeSet(storage.gun, `${gun.x}, ${gun.y}`);
  }

  async function copyResult() {
    const range = resultButton.dataset.range;
    if (!range) return;
    const t = getCopy(locale);
    try {
      await navigator.clipboard.writeText(range);
      copyHintEl.textContent = t.copied(range);
      resultButton.classList.remove("flash");
      void resultButton.offsetWidth;
      resultButton.classList.add("flash");
    } catch {
      copyHintEl.textContent = t.copyFailed;
    }
  }

  gunEl.addEventListener("input", calculate);
  targetEl.addEventListener("input", calculate);
  resultButton.addEventListener("click", copyResult);
  languageButtons.forEach((button) => button.addEventListener("click", () => applyLocale(button.dataset.locale)));

  document.querySelector("#swap").addEventListener("click", () => {
    [gunEl.value, targetEl.value] = [targetEl.value, gunEl.value];
    calculate();
    targetEl.focus();
  });
  document.querySelector("#clear-target").addEventListener("click", () => {
    targetEl.value = "";
    calculate();
    targetEl.focus();
  });
  document.querySelector("#demo").addEventListener("click", () => {
    gunEl.value = "98.43, 110.38";
    targetEl.value = "94.53, 109.03";
    calculate();
  });

  gunEl.addEventListener("paste", () => {
    requestAnimationFrame(() => {
      const pairs = extractPairs(gunEl.value);
      if (pairs.length >= 2 && !targetEl.value.trim()) {
        gunEl.value = `${pairs[0].x}, ${pairs[0].y}`;
        targetEl.value = `${pairs[1].x}, ${pairs[1].y}`;
        calculate();
        targetEl.focus();
      } else if (pairs.length === 1) targetEl.focus();
    });
  });

  targetEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      copyResult();
    }
  });

  const savedGun = safeGet(storage.gun);
  if (savedGun) gunEl.value = savedGun;
  const savedLocale = safeGet(storage.locale) || navigator.language;
  applyLocale(savedLocale);
  (extractPairs(gunEl.value).length ? targetEl : gunEl).focus();
}

if (typeof document !== "undefined") initBrowserApp();

