// wheelColor.js — OKLCH-coherent palette derivation for the Maqasid Comparison Wheel.
// Given a hex levelColor (gold / teal / purple), returns sub-colors at fixed perceived
// lightness targets so the three levels feel designed at equal brightness.
//
// Targets:
//   - base:     the levelColor itself (no change; caller owns)
//   - stroke:   L=0.65 — active hub stroke, needle fill
//   - shimmer:  L=0.72 — empty-state dashes, softer accents
//   - hubTint:  L=0.10 — deep levelColor-tinted hub background hint
//   - brightAura: L=0.78 — luminous "Nur" halo behind pillar icons
//
// sRGB → linear → LMS → OKLab → OKLCH, and back. No deps.

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(v) {
  const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(c * 255)));
}

function rgbToOklab(r, g, b) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}

function oklabToRgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return [
    linearToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s),
  ];
}

function oklabToOklch(L, a, b) {
  const C = Math.sqrt(a * a + b * b);
  const h = Math.atan2(b, a);
  return [L, C, h];
}

function hexFromOklch(L, C, h) {
  const [a, b] = [C * Math.cos(h), C * Math.sin(h)];
  const [r, g, bl] = oklabToRgb(L, a, b);
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

/**
 * Derive perceptually-coherent sub-colors from a hex levelColor.
 * Hue and chroma are preserved; lightness is re-targeted.
 * Falls back to raw hex if input is malformed.
 */
export function deriveWheelPalette(hex) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return { base: hex, stroke: hex, shimmer: hex, hubTint: '#0c1a20', brightAura: hex };
  }
  try {
    const [r, g, b] = hexToRgb(hex);
    const [L, A, B] = rgbToOklab(r, g, b);
    const [, C, h] = oklabToOklch(L, A, B);
    const stroke = hexFromOklch(0.65, Math.min(C, 0.18), h);
    const shimmer = hexFromOklch(0.72, Math.min(C * 0.85, 0.15), h);
    const hubTint = hexFromOklch(0.10, Math.min(C * 0.3, 0.04), h);
    const brightAura = hexFromOklch(0.78, Math.min(C * 0.9, 0.16), h);
    return { base: hex, stroke, shimmer, hubTint, brightAura };
  } catch {
    return { base: hex, stroke: hex, shimmer: hex, hubTint: '#0c1a20', brightAura: hex };
  }
}
