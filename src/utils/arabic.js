// Arabic text utilities.
//
// U+064B-U+0652: tanwin, fatha, damma, kasra, shadda, sukun (standard harakat).
// U+0670:        superscript alef - treated as a diacritic for toggling.
// Intentionally NOT stripped:
//   U+0671 Alef Wasla (a letter form, not a diacritic)
//   U+06D6-U+06ED Qur'anic recitation annotation marks (preserved as semantic).
const HARAKAT_RE = /[ً-ْٰ]/g;

export const stripDiacritics = (s) => (s ? s.replace(HARAKAT_RE, "") : s);

export const formatArabic = (s, showDiacritics = true) =>
  showDiacritics ? s : stripDiacritics(s);
