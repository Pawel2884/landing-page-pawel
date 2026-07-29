import {
  MONO_LATIN_400,
  MONO_LATIN_700,
  MONO_LATIN_EXT_400,
  MONO_LATIN_EXT_700,
  PIXELIFY_LATIN_400,
  PIXELIFY_LATIN_700,
  PIXELIFY_LATIN_EXT_400,
  PIXELIFY_LATIN_EXT_700,
  PRESS_START_LATIN,
  PRESS_START_LATIN_EXT,
} from './generated/font-data';

/**
 * Fonty siedza w kodzie jako data URI (patrz scripts/build-fonts.mjs)
 * i wstrzykujemy je zwyklym @font-face w <head>.
 *
 * Dlaczego nie FontFace + delayRender, jak w typowym projekcie Remotion?
 * Bo przy rownoleglym renderze ciezkich klatek swiezo otwarta karta potrafi
 * stanac na tyle, ze zadna obietnica (ani nawet setTimeout) nie wraca w
 * terminie delayRender. Render sypal sie wtedy w losowych klatkach.
 * Tutaj nie ma na co czekac: dane fontu sa juz w dokumencie, bez sieci,
 * a `font-display: block` gwarantuje, ze tekst nie mignie zapasowym krojem.
 *
 * Subset "latin" + "latin-ext" razem pokrywaja polskie znaki:
 * "o z kreska" (U+00F3) jest w latin, reszta (a, c, e, l, n, s, z, z) w latin-ext.
 */

const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

const LATIN_EXT =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';

type FontSpec = {
  family: string;
  data: string;
  weight: string;
  unicodeRange: string;
};

const SPECS: FontSpec[] = [
  {family: 'Press Start 2P', data: PRESS_START_LATIN, weight: '400', unicodeRange: LATIN},
  {family: 'Press Start 2P', data: PRESS_START_LATIN_EXT, weight: '400', unicodeRange: LATIN_EXT},

  {family: 'Pixelify Sans', data: PIXELIFY_LATIN_400, weight: '400', unicodeRange: LATIN},
  {family: 'Pixelify Sans', data: PIXELIFY_LATIN_EXT_400, weight: '400', unicodeRange: LATIN_EXT},
  {family: 'Pixelify Sans', data: PIXELIFY_LATIN_700, weight: '700', unicodeRange: LATIN},
  {family: 'Pixelify Sans', data: PIXELIFY_LATIN_EXT_700, weight: '700', unicodeRange: LATIN_EXT},

  {family: 'JetBrains Mono', data: MONO_LATIN_400, weight: '400', unicodeRange: LATIN},
  {family: 'JetBrains Mono', data: MONO_LATIN_EXT_400, weight: '400', unicodeRange: LATIN_EXT},
  {family: 'JetBrains Mono', data: MONO_LATIN_700, weight: '700', unicodeRange: LATIN},
  {family: 'JetBrains Mono', data: MONO_LATIN_EXT_700, weight: '700', unicodeRange: LATIN_EXT},
];

const STYLE_ID = 'claude-ad-fonts';

export const loadFonts = (): void => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = SPECS.map(
    (spec) => `@font-face {
  font-family: '${spec.family}';
  font-style: normal;
  font-weight: ${spec.weight};
  font-display: block;
  src: url(${spec.data}) format('woff2');
  unicode-range: ${spec.unicodeRange};
}`,
  ).join('\n');

  document.head.appendChild(style);
};
