import { describe, expect, it } from "vitest";

describe("TamGiangPhysics Extended Ecosystem Modules", () => {
  describe("Classic Physics Experiments (CE01 - CE30)", () => {
    it("CE01: verifies free fall time and ground velocity independent of mass", () => {
      const h = 45; // meters
      const g = 9.8; // m/s^2
      const t = Math.sqrt((2 * h) / g);
      const v = Math.sqrt(2 * g * h);

      expect(t).toBeCloseTo(3.03, 1);
      expect(v).toBeCloseTo(29.7, 1);
    });

    it("CE09: verifies Young interference fringe spacing formula i = λD / a", () => {
      const lambdaNm = 632; // red laser nm
      const D = 2.0; // meters
      const aMm = 1.0; // mm

      const i = (lambdaNm * 1e-6 * D) / (aMm * 1e-3); // in mm
      expect(i).toBeCloseTo(1.264, 2);
    });

    it("CE16: verifies Ohm's law and electrical power", () => {
      const U = 12; // V
      const R = 6; // Ohm
      const I = U / R;
      const P = U * I;

      expect(I).toBe(2);
      expect(P).toBe(24);
    });

    it("CE25: verifies photoelectric effect threshold and Einstein equation", () => {
      const lambdaNm = 280; // UV nm
      const AEv = 2.2; // eV work function
      const hc = 1240; // eV*nm
      const ePhoton = hc / lambdaNm; // ~4.43 eV

      expect(ePhoton).toBeGreaterThan(AEv);
      const w0Max = ePhoton - AEv;
      expect(w0Max).toBeCloseTo(2.23, 1);
    });
  });

  describe("Advanced Physics Challenges (VDC)", () => {
    it("VDC10-01: verifies multi-stage motion total distance and time", () => {
      const a1 = 1.0; // m/s^2
      const t1 = 20; // s
      const t2 = 40; // s
      const a2 = 2.0; // m/s^2

      const vMax = a1 * t1; // 20 m/s
      const s1 = 0.5 * a1 * t1 * t1; // 200 m
      const s2 = vMax * t2; // 800 m
      const t3 = vMax / a2; // 10 s
      const s3 = (vMax * vMax) / (2 * a2); // 100 m

      const totalS = s1 + s2 + s3;
      const totalT = t1 + t2 + t3;

      expect(vMax).toBe(20);
      expect(totalS).toBe(1100);
      expect(totalT).toBe(70);
    });

    it("VDC11-08: verifies wave interference with phase difference shift", () => {
      const AB = 12;
      const lambda = 2.0;
      const deltaPhiPi = 0.5; // pi/2
      const phaseShift = deltaPhiPi / 2; // 0.25

      const minK = Math.ceil(-AB / lambda - phaseShift);
      const maxK = Math.floor(AB / lambda - phaseShift);
      const numMax = maxK - minK + 1;

      expect(numMax).toBeGreaterThanOrEqual(11);
    });
  });

  describe("Experiment Designer (Data and Error Analysis)", () => {
    it("calculates mean, absolute error, and relative percentage correctly", () => {
      const measurements = [9.78, 9.82, 9.84, 9.79, 9.81];
      const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      expect(avg).toBeCloseTo(9.808, 2);

      const absErrors = measurements.map((m) => Math.abs(m - avg));
      const meanAbsError = absErrors.reduce((a, b) => a + b, 0) / absErrors.length;
      const relativeError = (meanAbsError / avg) * 100;

      expect(meanAbsError).toBeLessThan(0.05);
      expect(relativeError).toBeLessThan(1.0); // Less than 1% error
    });
  });
});
