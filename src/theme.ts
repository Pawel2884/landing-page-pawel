/**
 * Paleta i stale wizualne reklamy.
 * Styl: neon / synthwave + pixel art, ciemne tlo, mocne swiatlo.
 */

export const COLORS = {
  // Tlo
  void: '#04030a',
  deep: '#0a0618',
  deeper: '#070412',

  // Neony
  cyan: '#00f0ff',
  magenta: '#ff2d95',
  purple: '#a855f7',
  lime: '#7cff5a',
  amber: '#ffb547',

  // Marka Claude (cieply "clay")
  clay: '#d97757',
  clayBright: '#ff8a5c',
  clayGlow: '#ff6b35',

  // Tekst
  cream: '#f6efe6',
  white: '#ffffff',
  dim: '#8e86a8',

  // Alarm (scena "za duzo roboty")
  danger: '#ff3860',
} as const;

export const FONTS = {
  display: '"Press Start 2P", monospace',
  pixel: '"Pixelify Sans", "Press Start 2P", sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;

/** Wielowarstwowa poswiata neonowa dla tekstu. */
export const neonText = (color: string, strength = 1): string =>
  [
    `0 0 ${2 * strength}px ${color}`,
    `0 0 ${8 * strength}px ${color}`,
    `0 0 ${22 * strength}px ${color}`,
    `0 0 ${48 * strength}px ${color}88`,
  ].join(', ');

/** Wielowarstwowa poswiata neonowa dla krawedzi / pudelek. */
export const neonBox = (color: string, strength = 1): string =>
  [
    `0 0 ${3 * strength}px ${color}`,
    `0 0 ${12 * strength}px ${color}aa`,
    `0 0 ${34 * strength}px ${color}66`,
    `inset 0 0 ${10 * strength}px ${color}55`,
  ].join(', ');

/** Ostre krawedzie pikseli - bez wygladzania przy skalowaniu. */
export const PIXELATED: React.CSSProperties = {
  imageRendering: 'pixelated',
  shapeRendering: 'crispEdges',
} as React.CSSProperties;
