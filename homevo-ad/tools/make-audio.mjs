// Syntezator podkladu muzycznego i efektow dzwiekowych do reklamy Home Evolution.
// Cala warstwa dzwiekowa poza lektorem powstaje tutaj, wiec prawa do niej sa czyste.
import fs from 'node:fs';
import path from 'node:path';

const SR = 48000;
const DUR = 60;
const N = SR * DUR;
const OUT = path.join(import.meta.dirname, '..', 'public', 'audio');

const L = new Float64Array(N);
const R = new Float64Array(N);

const add = (i, l, r) => {
  if (i < 0 || i >= N) return;
  L[i] += l;
  R[i] += r;
};

// --- akordy: [bas, 3 glosy pada] ---
const A = {am: [110, 261.63, 329.63, 440], f: [87.31, 220, 261.63, 349.23], c: [130.81, 196, 261.63, 329.63], g: [98, 246.94, 293.66, 392]};
const SECTIONS = [
  {t0: 0.0, t1: 10.9, ch: A.am, pad: 0.030, energy: 0.0},
  {t0: 10.9, t1: 21.8, ch: A.f, pad: 0.032, energy: 0.25},
  {t0: 21.8, t1: 26.2, ch: A.am, pad: 0.036, energy: 0.45},
  {t0: 26.2, t1: 32.7, ch: A.c, pad: 0.052, energy: 0.55},
  {t0: 32.7, t1: 39.3, ch: A.g, pad: 0.052, energy: 0.6},
  {t0: 39.3, t1: 45.8, ch: A.am, pad: 0.050, energy: 0.62},
  {t0: 45.8, t1: 52.4, ch: A.f, pad: 0.050, energy: 0.6},
  {t0: 52.4, t1: 60.0, ch: A.c, pad: 0.056, energy: 0.4},
];

// pad + drone
for (const s of SECTIONS) {
  const i0 = Math.floor(s.t0 * SR);
  const i1 = Math.floor(s.t1 * SR);
  const len = i1 - i0;
  const fade = Math.floor(0.9 * SR);
  for (let k = 0; k < len; k++) {
    const i = i0 + k;
    let env = 1;
    if (k < fade) env = k / fade;
    if (k > len - fade) env = Math.min(env, (len - k) / fade);
    env = env * env * (3 - 2 * env); // smoothstep
    const t = i / SR;
    // drone basowy
    const b = s.ch[0];
    let v = Math.sin(2 * Math.PI * b * t) * 0.55 + Math.sin(2 * Math.PI * b * 2.001 * t) * 0.16;
    add(i, v * 0.085 * env, v * 0.085 * env);
    // pad: trzy glosy, kazdy z lekkim detune i wolnym vibrato
    for (let vi = 1; vi < 4; vi++) {
      const f = s.ch[vi];
      const det = 1 + (vi - 2) * 0.0016;
      const trem = 1 + 0.06 * Math.sin(2 * Math.PI * (0.11 + vi * 0.03) * t);
      const w = Math.sin(2 * Math.PI * f * det * t) * 0.62 + Math.sin(2 * Math.PI * f * 2 * det * t) * 0.14 + Math.sin(2 * Math.PI * f * 3 * det * t) * 0.05;
      const pan = 0.5 + (vi - 2) * 0.22;
      const a = w * s.pad * env * trem;
      add(i, a * (1 - pan), a * pan);
    }
  }
}

const secAt = (t) => SECTIONS.find((s) => t >= s.t0 && t < s.t1) || SECTIONS[SECTIONS.length - 1];

// puls basowy od 13 s
const BPM = 88;
const beat = 60 / BPM;
for (let b = 0; b * beat < DUR; b++) {
  const t = b * beat;
  if (t < 13) continue;
  if (b % 2 !== 0) continue;
  const e = secAt(t).energy;
  const amp = 0.16 * e;
  const dur = 0.34;
  const i0 = Math.floor(t * SR);
  for (let k = 0; k < dur * SR; k++) {
    const x = k / SR;
    const env = Math.exp(-x * 13);
    const f = 62 * Math.exp(-x * 7) + 44;
    const v = Math.sin(2 * Math.PI * f * x) * env * amp;
    add(i0 + k, v, v);
  }
}

// delikatny arpeggio-dzwoneczek od 26.2 s (moment rozwiazania)
let seed = 7;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
for (let b = 0; b * (beat / 2) < DUR; b++) {
  const t = b * (beat / 2);
  if (t < 26.2 || t > 56.5) continue;
  const s = secAt(t);
  const note = s.ch[1 + (b % 3)] * 2;
  const amp = 0.026 * (0.6 + 0.4 * Math.sin(b));
  const dur = 0.7;
  const i0 = Math.floor(t * SR);
  const pan = b % 2 === 0 ? 0.34 : 0.66;
  for (let k = 0; k < dur * SR; k++) {
    const x = k / SR;
    const env = Math.exp(-x * 5.5);
    const v = (Math.sin(2 * Math.PI * note * x) * 0.7 + Math.sin(2 * Math.PI * note * 2 * x) * 0.2) * env * amp;
    add(i0 + k, v * (1 - pan), v * pan);
  }
}

// cichy szum jako tekstura
let lp = 0;
for (let i = 0; i < N; i++) {
  const w = rnd() * 2 - 1;
  lp = lp * 0.986 + w * 0.014;
  add(i, lp * 0.016, lp * 0.014);
}

// master: fade in / out + miekki limiter
const fi = Math.floor(1.2 * SR);
const fo0 = Math.floor(57.6 * SR);
for (let i = 0; i < N; i++) {
  let g = 1;
  if (i < fi) g = i / fi;
  if (i > fo0) g = Math.max(0, (N - i) / (N - fo0));
  L[i] *= g;
  R[i] *= g;
  L[i] = Math.tanh(L[i] * 1.25) * 0.8;
  R[i] = Math.tanh(R[i] * 1.25) * 0.8;
}

// ---------- efekty dzwiekowe ----------
const SL = new Float64Array(N);
const SR2 = new Float64Array(N);
const addS = (i, l, r) => {
  if (i < 0 || i >= N) return;
  SL[i] += l;
  SR2[i] += r;
};

const whoosh = (t, amp = 0.20, dur = 0.42) => {
  const i0 = Math.floor(t * SR);
  let z1 = 0, z2 = 0;
  for (let k = 0; k < dur * SR; k++) {
    const x = k / SR;
    const p = x / dur;
    const env = Math.sin(Math.PI * p) ** 1.6;
    const w = rnd() * 2 - 1;
    const cut = 0.02 + 0.30 * p;
    z1 += cut * (w - z1);
    z2 += cut * (z1 - z2);
    const v = (z1 - z2) * env * amp * 3.2;
    addS(i0 + k, v * 0.9, v);
  }
};

const click = (t, amp = 0.10, f = 1500) => {
  const i0 = Math.floor(t * SR);
  for (let k = 0; k < 0.07 * SR; k++) {
    const x = k / SR;
    const env = Math.exp(-x * 90);
    const v = (Math.sin(2 * Math.PI * f * x) * 0.6 + (rnd() * 2 - 1) * 0.4) * env * amp;
    addS(i0 + k, v, v);
  }
};

const thud = (t, amp = 0.22) => {
  const i0 = Math.floor(t * SR);
  for (let k = 0; k < 0.55 * SR; k++) {
    const x = k / SR;
    const env = Math.exp(-x * 8);
    const f = 200 * Math.exp(-x * 6) + 78;
    const v = Math.sin(2 * Math.PI * f * x) * env * amp;
    addS(i0 + k, v, v);
  }
};

const confirm = (t, amp = 0.10) => {
  const i0 = Math.floor(t * SR);
  const notes = [523.25, 783.99];
  notes.forEach((f, ni) => {
    const off = Math.floor(ni * 0.09 * SR);
    for (let k = 0; k < 0.8 * SR; k++) {
      const x = k / SR;
      const env = Math.exp(-x * 4.2);
      const v = (Math.sin(2 * Math.PI * f * x) * 0.65 + Math.sin(2 * Math.PI * f * 2 * x) * 0.14) * env * amp;
      addS(i0 + off + k, v, v);
    }
  });
};

// Znaczniki biore wprost z osi czasu montazu, wiec nie moga sie rozjechac.
const timeline = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'src', 'timeline.json'), 'utf8'));
for (const e of timeline.sfx) {
  if (e.k === 'whoosh') whoosh(e.t, e.amp ?? 0.20);
  else if (e.k === 'click') click(e.t, e.amp ?? 0.09);
  else if (e.k === 'thud') thud(e.t, e.amp ?? 0.20);
  else if (e.k === 'confirm') confirm(e.t, e.amp ?? 0.10);
}

for (let i = 0; i < N; i++) {
  SL[i] = Math.tanh(SL[i] * 1.1) * 0.85;
  SR2[i] = Math.tanh(SR2[i] * 1.1) * 0.85;
}

const writeWav = (file, l, r) => {
  const bytes = N * 4;
  const buf = Buffer.alloc(44 + bytes);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + bytes, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(bytes, 40);
  let p = 44;
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(l[i] * 32767))), p); p += 2;
    buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(r[i] * 32767))), p); p += 2;
  }
  fs.writeFileSync(file, buf);
  console.log('zapisano', file, (buf.length / 1e6).toFixed(2), 'MB');
};

fs.mkdirSync(OUT, {recursive: true});
writeWav(path.join(OUT, 'music.wav'), L, R);
writeWav(path.join(OUT, 'sfx.wav'), SL, SR2);
