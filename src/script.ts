/**
 * ==========================================================================
 *  SCENARIUSZ REKLAMY - wszystkie teksty i czasy w jednym miejscu.
 *  Zmiana tekstu = zmiana tutaj. Nie trzeba dotykac komponentow.
 * ==========================================================================
 */

export const FPS = 30;
export const DURATION_IN_FRAMES = 30 * FPS; // 30 sekund

/** Pomocnik: sekundy -> klatki. */
export const s = (seconds: number): number => Math.round(seconds * FPS);

/** ---------------------------------------------------------------- MARKA */

export const BRAND = {
  /** Duzy napis w finale (pixel font - trzymaj krotko). */
  wordmark: 'CLAUDE',
  tagline: 'W PRAKTYCE',
  /** ZMIEN NA SWOJ ADRES, jesli reklama prowadzi na Twoja strone. */
  cta: 'claude.ai',
  ctaLabel: 'ZACZNIJ DZIŚ',
} as const;

/** --------------------------------------------------------------- SCENY */

export const SCENES = {
  intro: {from: 0, duration: s(5)}, //           0 - 150
  problem: {from: s(5), duration: s(5)}, //    150 - 300
  kod: {from: s(10), duration: s(5)}, //        300 - 450
  analiza: {from: s(15), duration: s(5)}, //    450 - 600
  automat: {from: s(20), duration: s(4.5)}, // 600 - 735
  final: {from: s(24.5), duration: s(5.5)}, // 735 - 900
} as const;

/** Klatki, w ktorych "uderza" bit - blysk, shake, glitch. */
export const BEATS: number[] = [
  s(1.2),
  s(5),
  s(7.4),
  s(10),
  s(12.6),
  s(15),
  s(17.5),
  s(20),
  s(22.4),
  s(24.5),
  s(27.2),
];

/** ------------------------------------------------------------- NAPISY */

export type Caption = {
  /** Klatka poczatkowa. */
  from: number;
  /** Klatka koncowa (napis znika). */
  to: number;
  /** Tresc - max ~40 znakow na linie, zeby bylo czytelnie. */
  text: string;
  /** Kolor akcentu paska pod napisem. */
  accent?: string;
};

export const CAPTIONS: Caption[] = [
  {from: s(0.8), to: s(2.6), text: 'To nie jest kolejny chatbot.'},
  {from: s(2.8), to: s(4.9), text: 'To Claude. Asystent, który dowozi.'},

  {from: s(5.3), to: s(7.3), text: 'Maile. Raporty. Arkusze. Kod.'},
  {from: s(7.5), to: s(9.9), text: 'A doba ma tylko 24 godziny.'},

  {from: s(10.4), to: s(12.4), text: 'Claude pisze i naprawia kod.'},
  {from: s(12.6), to: s(14.9), text: 'Czyta całe repo. Rozumie kontekst.'},

  {from: s(15.4), to: s(17.4), text: 'Wrzucasz 200 stron PDF.'},
  {from: s(17.6), to: s(19.9), text: 'Dostajesz wnioski, nie streszczenie.'},

  {from: s(20.4), to: s(22.3), text: 'Podłączasz maila, arkusz, kalendarz.'},
  {from: s(22.5), to: s(24.4), text: 'Claude robi robotę za Ciebie.'},

  {from: s(25.4), to: s(27.4), text: 'Claude w praktyce.'},
  {from: s(27.6), to: s(29.7), text: 'Przestań czytać o AI. Zacznij używać.'},
];

/** ------------------------------------------------ TEKSTY WEWNATRZ SCEN */

/** Scena 2: kafelki zadan, ktore zalewaja ekran. */
export const TASK_CARDS: {label: string; sprite: string}[] = [
  {label: 'MAILE', sprite: 'mail'},
  {label: 'RAPORTY', sprite: 'doc'},
  {label: 'ARKUSZE', sprite: 'chart'},
  {label: 'KOD', sprite: 'code'},
  {label: 'SPOTKANIA', sprite: 'clock'},
  {label: 'OFERTY', sprite: 'doc'},
  {label: 'ANALIZY', sprite: 'chart'},
  {label: 'ZADANIA', sprite: 'check'},
];

/** Scena 3: linie kodu wystukiwane w oknie. */
export const CODE_LINES: {text: string; kind: 'kw' | 'fn' | 'str' | 'cmt' | 'plain'}[] = [
  {text: '// napraw błąd w koszyku', kind: 'cmt'},
  {text: 'const suma = pozycje', kind: 'kw'},
  {text: '  .filter((p) => p.aktywna)', kind: 'fn'},
  {text: '  .reduce((a, p) => a + p.cena, 0);', kind: 'fn'},
  {text: 'return format(suma, "PLN");', kind: 'str'},
];

export const TERMINAL_LINES: string[] = [
  '$ npm test',
  'PASS  koszyk.test.ts (12/12)',
  'naprawione w 8 sekund',
];

/** Scena 4: co wychodzi z analizy dokumentow. */
export const INSIGHT_BARS: {label: string; value: number}[] = [
  {label: 'KOSZTY', value: 0.42},
  {label: 'RYZYKO', value: 0.68},
  {label: 'MARŻA', value: 0.86},
  {label: 'SZANSE', value: 0.95},
];

export const INSIGHT_HEADLINE = '3 ryzyka. 2 oszczędności.';

/** Scena 5: narzedzia podlaczone do Claude. */
export const TOOLS: {label: string; sprite: string; color: string}[] = [
  {label: 'GMAIL', sprite: 'mail', color: '#ff2d95'},
  {label: 'SHEETS', sprite: 'chart', color: '#7cff5a'},
  {label: 'KALENDARZ', sprite: 'clock', color: '#00f0ff'},
  {label: 'REPO', sprite: 'code', color: '#a855f7'},
  {label: 'CRM', sprite: 'doc', color: '#ffb547'},
];
