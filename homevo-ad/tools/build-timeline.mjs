// Liczy cala os czasu filmu z realnych dlugosci plikow lektora.
// Wynik trafia do src/timeline.json, z ktorego korzysta montaz i syntezator efektow.
// Dzieki temu zmiana glosu wymaga tylko podmiany plikow i jednego uruchomienia.
import fs from 'node:fs';
import path from 'node:path';

const FPS = 30;
const TOTAL = 1800;
const ROOT = path.join(import.meta.dirname, '..');

const wavDur = (f) => {
  const b = fs.readFileSync(f);
  let p = 12, dl = 0;
  while (p < b.length - 8) {
    const id = b.toString('ascii', p, p + 4);
    const sz = b.readUInt32LE(p + 4);
    if (id === 'data') { dl = sz; break; }
    p += 8 + sz + (sz % 2);
  }
  return dl / (48000 * 2);
};

// Napisy lektora. Waga to liczba wypowiadanych slow, po niej dziele segment na frazy.
const SEG = [
  {file: 'vo/v1.wav', caps: [
    {t: 'Umawiasz się na jedną cenę za elewację.', hi: 'jedną cenę', w: 7},
    {t: 'Potem pojawia się dopłata.', hi: 'dopłata', w: 4},
  ]},
  {file: 'vo/v2.wav', caps: [
    {t: 'Jeśli planujesz docieplenie domu,', hi: 'docieplenie domu', w: 4},
    {t: 'zostaw zgłoszenie i poznaj swoją cenę.', hi: 'swoją cenę', w: 6},
    {t: 'Za chwilę pokażę ci, po czym poznać wycenę,', w: 8},
    {t: 'która się nie zmieni.', hi: 'nie zmieni', w: 4},
  ]},
  {file: 'vo/v3.wav', caps: [
    {t: 'Najpierw doliczają materiał.', hi: 'materiał', w: 3},
    {t: 'Potem rusztowanie.', hi: 'rusztowanie', w: 2},
    {t: 'Na końcu robotę,', w: 3},
    {t: 'o której nikt wcześniej nie mówił.', hi: 'nikt wcześniej nie mówił', w: 6},
  ]},
  {file: 'vo/v4.wav', caps: [
    {t: 'Ekipa znika na tydzień.', hi: 'znika', w: 4},
    {t: 'Dom stoi w rusztowaniu.', w: 4},
    {t: 'A ty liczysz, ile jeszcze zapłacisz.', hi: 'ile jeszcze zapłacisz', w: 6},
  ]},
  {file: 'vo/v5.wav', caps: [
    {t: 'Home Evolution robi to inaczej.', hi: 'inaczej', w: 5},
    {t: 'Konkretną cenę poznajesz przed rozpoczęciem prac.', hi: 'przed rozpoczęciem prac', w: 7},
    {t: '220 zł netto za metr kwadratowy.', hi: '220 zł netto', w: 7},
  ]},
  {file: 'vo/v6.wav', caps: [
    {t: 'Styropian Termoorganika.', hi: 'Termoorganika', w: 2},
    {t: 'Tynk Raum Premium.', hi: 'Raum Premium', w: 3},
    {t: 'Dwa lata gwarancji.', hi: 'Dwa lata', w: 3},
  ]},
  {file: 'vo/v7.wav', caps: [
    {t: 'Przez całą realizację masz swojego opiekuna kontraktu.', hi: 'opiekuna kontraktu', w: 7},
    {t: '45% umów pochodzi z poleceń.', hi: '45%', w: 7},
  ]},
  {file: 'vo/v8.wav', caps: [
    {t: 'Po czym poznać dobrą wycenę?', w: 5},
    {t: 'Cena z wyceny zostaje ceną na fakturze.', hi: 'ceną na fakturze', w: 7},
  ]},
  // Plansza koncowa niesie caly przekaz sama, wiec nie zaslaniam jej napisami.
  {file: 'vo/v9.wav', caps: []},
];

const LEAD = 0.30;          // oddech przed pierwszym zdaniem
const GAP_W = [0.55, 0.75, 0.45, 0.95, 0.55, 0.65, 0.85, 0.80]; // wagi pauz miedzy segmentami
const GAP_MAX = 1.05;       // dluzsza cisza w srodku filmu zaczyna ciazyc
const TAIL_MIN = 3.0;       // minimalne przytrzymanie planszy koncowej

const dur = SEG.map((s) => wavDur(path.join(ROOT, 'public', s.file)));
const speech = dur.reduce((a, b) => a + b, 0);

// Nadwyzka czasu idzie najpierw w pauzy, a to co zostanie po przycieciu ich do limitu
// powieksza przytrzymanie planszy koncowej.
let budget = TOTAL / FPS - LEAD - speech - TAIL_MIN;
const wSum = GAP_W.reduce((a, b) => a + b, 0);
let gaps = GAP_W.map((w) => (w / wSum) * budget);
gaps = gaps.map((g) => Math.min(g, GAP_MAX));

const starts = [];
let t = LEAD;
for (let i = 0; i < SEG.length; i++) {
  starts.push(t);
  t += dur[i] + (gaps[i] ?? 0);
}
const speechEnd = starts[8] + dur[8];
const tail = TOTAL / FPS - speechEnd;

const F = (s) => Math.round(s * FPS);

const vo = SEG.map((s, i) => ({file: s.file, from: F(starts[i]), dur: F(dur[i]) + 1}));

// Frazy napisow dziele proporcjonalnie do liczby slow w segmencie.
const caps = [];
SEG.forEach((s, i) => {
  if (!s.caps.length) return;
  const total = s.caps.reduce((a, c) => a + c.w, 0);
  let acc = 0;
  s.caps.forEach((c, j) => {
    const a = starts[i] + (acc / total) * dur[i];
    acc += c.w;
    const bRaw = starts[i] + (acc / total) * dur[i];
    // Ostatnia fraza w segmencie zostaje na ekranie jeszcze przez czesc pauzy.
    const b = j === s.caps.length - 1 ? bRaw + Math.min(0.5, (gaps[i] ?? 0) * 0.6) : bRaw;
    caps.push({a: F(a), b: F(b), text: c.t, ...(c.hi ? {hi: c.hi} : {})});
  });
});

// Sceny sa zakotwiczone w segmentach lektora. PRE to wyprzedzenie obrazu przed glosem.
const PRE = 6;
const s2 = F(starts[1]), s3 = F(starts[2]), s4 = F(starts[3]), s5 = F(starts[4]);
const s6 = F(starts[5]), s7 = F(starts[6]), s8 = F(starts[7]), s9 = F(starts[8]);
const d2 = F(dur[1]), d5 = F(dur[4]), d7 = F(dur[6]);

const scenes = {
  hook:    [0, s2 - PRE],
  ident:   [s2 - PRE, s2 + Math.round(d2 * 0.455)],
  tease:   [s2 + Math.round(d2 * 0.455), s3 - PRE],
  costs:   [s3 - PRE, s4 - PRE],
  stalled: [s4 - PRE, s5 - PRE],
  turn:    [s5 - PRE, s5 + Math.round(d5 * 0.30)],
  promise: [s5 + Math.round(d5 * 0.30), s5 + Math.round(d5 * 0.65)],
  price:   [s5 + Math.round(d5 * 0.65), s6 - PRE],
  specs:   [s6 - PRE, s7 - PRE],
  care:    [s7 - PRE, s7 + Math.round(d7 * 0.5)],
  ref:     [s7 + Math.round(d7 * 0.5), s8 - PRE],
  payoff:  [s8 - PRE, s9 - PRE],
  cta:     [s9 - PRE, TOTAL],
};

// Efekty dzwiekowe zaczepione o realne momenty montazu (w sekundach).
const sec = (fr) => +(fr / FPS).toFixed(3);
const sfx = [
  {k: 'thud', t: 0, amp: 0.26},
  {k: 'whoosh', t: sec(scenes.ident[0]), amp: 0.20},
  {k: 'whoosh', t: sec(scenes.tease[0]), amp: 0.15},
  {k: 'whoosh', t: sec(scenes.costs[0]), amp: 0.20},
  {k: 'click', t: sec(scenes.costs[0] + 11)},
  {k: 'click', t: sec(scenes.costs[0] + 49)},
  {k: 'click', t: sec(scenes.costs[0] + 87)},
  {k: 'whoosh', t: sec(scenes.stalled[0]), amp: 0.16},
  {k: 'whoosh', t: sec(scenes.turn[0]), amp: 0.24},
  {k: 'thud', t: sec(scenes.promise[0]), amp: 0.18},
  {k: 'thud', t: sec(scenes.price[0]), amp: 0.20},
  {k: 'whoosh', t: sec(scenes.specs[0]), amp: 0.15},
  {k: 'click', t: sec(scenes.specs[0] + 7)},
  {k: 'click', t: sec(scenes.specs[0] + 51)},
  {k: 'click', t: sec(scenes.specs[0] + 95)},
  {k: 'whoosh', t: sec(scenes.care[0]), amp: 0.15},
  {k: 'thud', t: sec(scenes.ref[0]), amp: 0.16},
  {k: 'whoosh', t: sec(scenes.payoff[0]), amp: 0.18},
  {k: 'confirm', t: sec(scenes.payoff[0] + 57), amp: 0.10},
  {k: 'whoosh', t: sec(scenes.cta[0]), amp: 0.22},
];

const out = {fps: FPS, total: TOTAL, vo, caps, scenes, sfx};
fs.writeFileSync(path.join(ROOT, 'src', 'timeline.json'), JSON.stringify(out, null, 2));

console.log('mowa      ', speech.toFixed(3), 's');
console.log('pauzy     ', gaps.map((g) => g.toFixed(2)).join('  '));
console.log('koniec VO ', speechEnd.toFixed(3), 's');
console.log('plansza   ', tail.toFixed(3), 's ciszy na koncu');
console.log('starty    ', vo.map((v) => v.from).join(' '));
console.log('sceny     ', Object.entries(scenes).map(([k, v]) => k + ':' + v[0] + '-' + v[1]).join('  '));
