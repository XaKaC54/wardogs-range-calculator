import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateDistance,
  extractPairs,
  getCopy,
  normalizeLocale,
} from "../app.mjs";

test("extractPairs accepts one or two coordinate pairs from copied chat text", () => {
  assert.deepEqual(extractPairs("Position: 98.43, 110.38"), [
    { x: 98.43, y: 110.38 },
  ]);
  assert.deepEqual(extractPairs("98.43, 110.38\n94.53, 109.03"), [
    { x: 98.43, y: 110.38 },
    { x: 94.53, y: 109.03 },
  ]);
});

test("calculateDistance converts WARDOGS map units to metres", () => {
  assert.deepEqual(
    calculateDistance({ x: 98.43, y: 110.38 }, { x: 94.53, y: 109.03 }),
    {
      dx: 3.9,
      dy: 1.35,
      mapUnits: 4.127,
      metres: 412.7,
      rounded: 413,
    },
  );
});

test("normalizeLocale supports only Russian and English", () => {
  assert.equal(normalizeLocale("en-US"), "en");
  assert.equal(normalizeLocale("ru-RU"), "ru");
  assert.equal(normalizeLocale("de-DE"), "ru");
});

test("getCopy returns complete localized guidance for both languages", () => {
  const ru = getCopy("ru");
  const en = getCopy("en");

  assert.equal(ru.title, "Калькулятор дальности");
  assert.equal(en.title, "Range calculator");
  assert.match(ru.gunHelp, /Mark Coordinates/);
  assert.match(en.gunHelp, /Mark Coordinates/);
  assert.match(ru.resultReady(413), /RNG.*413/);
  assert.match(en.resultReady(413), /RNG.*413/);
  assert.notEqual(ru.stepsTitle, en.stepsTitle);
  assert.notEqual(ru.calculatorLabel, en.calculatorLabel);
  assert.notEqual(ru.languageLabel, en.languageLabel);
});

