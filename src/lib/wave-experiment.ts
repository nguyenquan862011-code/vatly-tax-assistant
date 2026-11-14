export function calculateInterferenceMaxima(sourceDistance: number, wavelength: number) {
  if (sourceDistance < 0 || wavelength <= 0) return 0;
  return Math.floor(sourceDistance / wavelength) * 2 + 1;
}