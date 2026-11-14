import { describe, expect, it } from "vitest";

describe("TamGiangPhysics Brand and Physics Logic", () => {
  it("verifies Cauchy prism dispersion physics", () => {
    // Glass prism refraction calculation
    const nRed = 1.512;
    const nViolet = 1.543;
    const i1 = (48 * Math.PI) / 180;
    const A = (60 * Math.PI) / 180;

    const r1Red = Math.asin(Math.sin(i1) / nRed);
    const r2Red = A - r1Red;
    const i2Red = Math.asin(nRed * Math.sin(r2Red));
    const dRed = i1 + i2Red - A;

    const r1Violet = Math.asin(Math.sin(i1) / nViolet);
    const r2Violet = A - r1Violet;
    const i2Violet = Math.asin(nViolet * Math.sin(r2Violet));
    const dViolet = i1 + i2Violet - A;

    // Violet light deviates more than red light
    expect(dViolet).toBeGreaterThan(dRed);
    // Angular dispersion delta D is positive
    const deltaD = ((dViolet - dRed) * 180) / Math.PI;
    expect(deltaD).toBeGreaterThan(1.0);
    expect(deltaD).toBeLessThan(3.5);
  });

  it("verifies presence of official Tam Giang logo assets", () => {
    const fs = require("fs");
    const path = require("path");
    const logoPath = path.resolve(__dirname, "../../public/logo-tamgiang.png");
    const faviconPath = path.resolve(__dirname, "../../public/favicon.ico");
    expect(fs.existsSync(logoPath)).toBe(true);
    expect(fs.existsSync(faviconPath)).toBe(true);
  });
});
