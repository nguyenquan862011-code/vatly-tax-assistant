import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

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
    const logoPath = path.resolve(__dirname, "../../public/logo-tamgiang.png");
    const faviconPath = path.resolve(__dirname, "../../public/favicon.ico");
    expect(fs.existsSync(logoPath)).toBe(true);
    expect(fs.existsSync(faviconPath)).toBe(true);
  });

  it("verifies Bright Academic palette tokens exist in styles.css", () => {
    const cssPath = path.resolve(__dirname, "../styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Light theme palette required by prompt
    expect(cssContent).toContain("#FFFFFF"); // Pure White
    expect(cssContent).toContain("#F6F9FE"); // Ice White
    expect(cssContent).toContain("#EAF2FF"); // Soft Blue
    expect(cssContent).toContain("#2563EB"); // Academic Blue
    expect(cssContent).toContain("#1558C9"); // Deep Blue
    expect(cssContent).toContain("#0F766E"); // Science Teal
    expect(cssContent).toContain("#D9F99D"); // Soft Lime
    expect(cssContent).toContain("#172033"); // Academic Dark

    // Dark theme palette required by prompt
    expect(cssContent).toContain("#101827"); // Dark background
    expect(cssContent).toContain("#182235"); // Dark card
    expect(cssContent).toContain("#243248"); // Dark secondary
    expect(cssContent).toContain("#DCE5F2"); // Dark body text
    expect(cssContent).toContain("#AAB6C8"); // Dark muted
    expect(cssContent).toContain("#60A5FA"); // Dark link blue
    expect(cssContent).toContain("#2DD4BF"); // Dark teal accent
  });

  it("verifies ThemeToggle component exists and exports ThemeToggle", () => {
    const togglePath = path.resolve(__dirname, "../components/theme-toggle.tsx");
    expect(fs.existsSync(togglePath)).toBe(true);
    const content = fs.readFileSync(togglePath, "utf-8");
    expect(content).toContain("export function ThemeToggle");
    expect(content).toContain("tamgiang_theme");
  });
});
