import {interpolate, random} from 'remotion';
import {noise2D} from '@remotion/noise';
import {BEATS} from '../script';

/** Klasyczny "ease out expo" - szybki start, miekkie ladowanie. */
export const easeOutExpo = (t: number): number =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** 0 -> 1 na przedziale [from, from+len], z wybranym easingiem. */
export const ramp = (
  frame: number,
  from: number,
  len: number,
  ease: (t: number) => number = easeOutExpo,
): number => {
  const t = Math.min(1, Math.max(0, (frame - from) / Math.max(1, len)));
  return ease(t);
};

/** Wejscie i wyjscie w jednym: 0 -> 1 -> 0. */
export const inOut = (
  frame: number,
  from: number,
  to: number,
  fadeIn = 8,
  fadeOut = 8,
): number =>
  interpolate(
    frame,
    [from, from + fadeIn, to - fadeOut, to],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

/** Sila uderzenia bitu w danej klatce (0..1) - do blyskow i wstrzasow. */
export const beatPulse = (frame: number, decay = 9): number => {
  let best = 0;
  for (const b of BEATS) {
    const d = frame - b;
    if (d < 0 || d > decay * 3) continue;
    best = Math.max(best, Math.exp(-d / decay));
  }
  return best;
};

/** Plynne drzenie kamery na dwoch osiach. */
export const shake = (
  frame: number,
  amount: number,
  seed = 0,
): {x: number; y: number; rot: number} => ({
  x: noise2D(`shake-x-${seed}`, frame / 6, 0) * amount,
  y: noise2D(`shake-y-${seed}`, frame / 5.5, 10) * amount,
  rot: noise2D(`shake-r-${seed}`, frame / 8, 20) * amount * 0.08,
});

/** Migotanie neonu - nierowne, jak zepsuta swietlowka. */
export const flicker = (frame: number, seed: string, base = 1): number => {
  const slow = noise2D(`f-${seed}`, frame / 14, 0) * 0.12;
  const spark = random(`${seed}-${Math.floor(frame / 3)}`) > 0.94 ? -0.35 : 0;
  return Math.max(0, base + slow + spark);
};

/** Deterministyczna liczba z zakresu. */
export const rnd = (seed: string, min: number, max: number): number =>
  min + random(seed) * (max - min);

/** Skokowa animacja "co N klatek" - nadaje ruchowi charakter pixel-artu. */
export const stepped = (value: number, steps: number): number =>
  Math.round(value * steps) / steps;
