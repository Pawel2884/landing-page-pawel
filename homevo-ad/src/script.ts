// Osie czasu filmu. Wszystkie wartosci w klatkach przy 30 fps, dlugosc 1800 klatek = 60,000 s.
// Momenty startu lektora wynikaja z realnie zmierzonych dlugosci plikow, nie z zalozen.

export type Vo = {file: string; from: number; dur: number};

export const VO: Vo[] = [
  {file: 'vo/v1.wav', from: 8, dur: 126},
  {file: 'vo/v2.wav', from: 141, dur: 273},
  {file: 'vo/v3.wav', from: 422, dur: 192},
  {file: 'vo/v4.wav', from: 621, dur: 158},
  {file: 'vo/v5.wav', from: 788, dur: 291},
  {file: 'vo/v6.wav', from: 1086, dur: 134},
  {file: 'vo/v7.wav', from: 1229, dur: 180},
  {file: 'vo/v8.wav', from: 1418, dur: 149},
  {file: 'vo/v9.wav', from: 1578, dur: 141},
];

// Napisy lektora. Krotkie frazy, maksymalnie dwie linie, slowo kluczowe wyroznione.
export type Cap = {a: number; b: number; text: string; hi?: string};

export const CAPS: Cap[] = [
  {a: 8, b: 88, text: 'Umawiasz się na jedną cenę za elewację.', hi: 'jedną cenę'},
  {a: 88, b: 140, text: 'Potem pojawia się dopłata.', hi: 'dopłata'},

  {a: 141, b: 190, text: 'Jeśli planujesz docieplenie domu,', hi: 'docieplenie domu'},
  {a: 190, b: 262, text: 'zostaw zgłoszenie i poznaj swoją cenę.', hi: 'swoją cenę'},
  {a: 262, b: 360, text: 'Za chwilę pokażę ci, po czym poznać wycenę,'},
  {a: 360, b: 420, text: 'która się nie zmieni.', hi: 'nie zmieni'},

  {a: 422, b: 467, text: 'Najpierw doliczają materiał.', hi: 'materiał'},
  {a: 467, b: 500, text: 'Potem rusztowanie.', hi: 'rusztowanie'},
  {a: 500, b: 543, text: 'Na końcu robotę,'},
  {a: 543, b: 619, text: 'o której nikt wcześniej nie mówił.', hi: 'nikt wcześniej nie mówił'},

  {a: 621, b: 670, text: 'Ekipa znika na tydzień.', hi: 'znika'},
  {a: 670, b: 719, text: 'Dom stoi w rusztowaniu.'},
  {a: 719, b: 786, text: 'A ty liczysz, ile jeszcze zapłacisz.', hi: 'ile jeszcze zapłacisz'},

  {a: 788, b: 858, text: 'Home Evolution robi to inaczej.', hi: 'inaczej'},
  {a: 858, b: 955, text: 'Konkretną cenę poznajesz przed rozpoczęciem prac.', hi: 'przed rozpoczęciem prac'},
  {a: 955, b: 1084, text: '220 zł netto za metr kwadratowy.', hi: '220 zł netto'},

  {a: 1086, b: 1137, text: 'Styropian Termoorganika.', hi: 'Termoorganika'},
  {a: 1137, b: 1181, text: 'Tynk Raum Premium.', hi: 'Raum Premium'},
  {a: 1181, b: 1227, text: 'Dwa lata gwarancji.', hi: 'Dwa lata'},

  {a: 1229, b: 1318, text: 'Przez całą realizację masz swojego opiekuna kontraktu.', hi: 'opiekuna kontraktu'},
  {a: 1318, b: 1416, text: '45% umów pochodzi z poleceń.', hi: '45%'},

  {a: 1418, b: 1482, text: 'Po czym poznać dobrą wycenę?'},
  {a: 1482, b: 1575, text: 'Cena z wyceny zostaje ceną na fakturze.', hi: 'ceną na fakturze'},
];

// Granice scen.
export const S = {
  hook: [0, 140],
  ident: [140, 281],
  tease: [281, 421],
  costs: [421, 620],
  stalled: [620, 787],
  turn: [787, 872],
  promise: [872, 962],
  price: [962, 1085],
  specs: [1085, 1228],
  care: [1228, 1330],
  ref: [1330, 1417],
  payoff: [1417, 1577],
  cta: [1577, 1800],
} as const;
