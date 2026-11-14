import { describe, expect, it } from "vitest";

import { calculateInterferenceMaxima } from "@/lib/wave-experiment";

describe("wave experiment interference count", () => {
  it("shows seven maxima for 6.0 cm spacing and a 1.6 cm wavelength", () => {
    expect(calculateInterferenceMaxima(6, 1.6)).toBe(7);
  });

  it("shows five maxima for 6.0 cm spacing and a 2.2 cm wavelength", () => {
    expect(calculateInterferenceMaxima(6, 2.2)).toBe(5);
  });

  it("shows three maxima after widening the spacing to 6.6 cm at a 3.2 cm wavelength", () => {
    expect(calculateInterferenceMaxima(6.6, 3.2)).toBe(3);
  });
});