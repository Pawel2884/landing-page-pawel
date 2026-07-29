import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {SCENES} from './script';
import {SceneIntro} from './scenes/SceneIntro';
import {SceneProblem} from './scenes/SceneProblem';
import {SceneKod} from './scenes/SceneKod';
import {SceneAnaliza} from './scenes/SceneAnaliza';
import {SceneAutomat} from './scenes/SceneAutomat';
import {SceneFinal} from './scenes/SceneFinal';
import {Subtitles} from './components/Subtitles';
import {CrtOverlay} from './components/CrtOverlay';
import {Glitch, GlitchFilters} from './components/Glitch';
import {COLORS} from './theme';
import {beatPulse, shake} from './lib/anim';

/** Klatki ciec miedzy scenami - tam wchodzi glitch i blysk. */
const CUTS = [
  SCENES.problem.from,
  SCENES.kod.from,
  SCENES.analiza.from,
  SCENES.automat.from,
  SCENES.final.from,
];

/** Sila zaklocenia w danej klatce (0..1). */
const cutIntensity = (frame: number): number => {
  let best = 0;
  for (const c of CUTS) {
    const d = frame - (c - 3);
    if (d < 0 || d > 16) continue;
    best = Math.max(best, Math.exp(-d / 4.5));
  }
  return best;
};

/**
 * Reklama "Claude w praktyce" - 30 sekund, bez lektora, napisy PL.
 * Sceny leca twardymi cieciami, spiete glitchem, blyskiem i wstrzasem kamery.
 */
export const ClaudeAd: React.FC = () => {
  const frame = useCurrentFrame();

  const cut = cutIntensity(frame);
  const beat = beatPulse(frame, 7);
  const sh = shake(frame, 2 + beat * 12 + cut * 22, 7);

  // krotkie "uderzenie" zoomu na cieciu
  const punch = 1 + cut * 0.07 + beat * 0.012;

  return (
    <AbsoluteFill style={{background: COLORS.void, overflow: 'hidden'}}>
      <GlitchFilters />

      <Glitch amount={cut * 0.85} split={30} seed="cut">
        <AbsoluteFill
          style={{
            transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.rot}deg) scale(${punch})`,
          }}
        >
          <Sequence
            from={SCENES.intro.from}
            durationInFrames={SCENES.intro.duration}
            name="1 - Intro"
          >
            <SceneIntro />
          </Sequence>

          <Sequence
            from={SCENES.problem.from}
            durationInFrames={SCENES.problem.duration}
            name="2 - Problem"
          >
            <SceneProblem />
          </Sequence>

          <Sequence
            from={SCENES.kod.from}
            durationInFrames={SCENES.kod.duration}
            name="3 - Kod"
          >
            <SceneKod />
          </Sequence>

          <Sequence
            from={SCENES.analiza.from}
            durationInFrames={SCENES.analiza.duration}
            name="4 - Analiza"
          >
            <SceneAnaliza />
          </Sequence>

          <Sequence
            from={SCENES.automat.from}
            durationInFrames={SCENES.automat.duration}
            name="5 - Automatyzacja"
          >
            <SceneAutomat />
          </Sequence>

          <Sequence
            from={SCENES.final.from}
            durationInFrames={SCENES.final.duration}
            name="6 - Final"
          >
            <SceneFinal />
          </Sequence>
        </AbsoluteFill>
      </Glitch>

      {/* blysk na cieciu */}
      <AbsoluteFill
        style={{
          background: COLORS.white,
          opacity: cut * 0.4,
          mixBlendMode: 'screen',
        }}
      />
      {/* pulsowanie na bicie */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.clayGlow}00 45%, ${COLORS.clayGlow}55 100%)`,
          opacity: beat * 0.5,
          mixBlendMode: 'screen',
        }}
      />

      {/* napisy zawsze ponad efektami - musza byc czytelne */}
      <Subtitles />

      <CrtOverlay />
    </AbsoluteFill>
  );
};
