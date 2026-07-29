import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  scanlineOpacity?: number;
  grilleOpacity?: number;
  grainOpacity?: number;
  vignette?: number;
  /** Jasny pasek przesuwajacy sie po ekranie (rolling shutter starego CRT). */
  rollingBar?: boolean;
};

const GRAIN_W = 480;
const GRAIN_H = 270;

/**
 * Warstwa "monitora": linie skanujace, maska aperturowa, ziarno, winieta.
 * Zawsze na samej gorze kadru - to ona spina caly look w jedna calosc.
 */
export const CrtOverlay: React.FC<Props> = ({
  scanlineOpacity = 0.28,
  grilleOpacity = 0.12,
  grainOpacity = 0.16,
  vignette = 0.9,
  rollingBar = true,
}) => {
  const frame = useCurrentFrame();
  const {height} = useVideoConfig();

  const barY = ((frame * 7) % (height + 700)) - 350;
  const grainSeed = Math.floor(frame) % 97;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* poziome linie skanujace */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 3px)',
          opacity: scanlineOpacity,
          mixBlendMode: 'multiply',
        }}
      />

      {/* pionowa maska RGB - jak w kineskopie */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,0,90,0.55) 0px, rgba(255,0,90,0.55) 1px, rgba(0,255,240,0.45) 1px, rgba(0,255,240,0.45) 2px, rgba(140,90,255,0.45) 2px, rgba(140,90,255,0.45) 3px)',
          opacity: grilleOpacity,
          mixBlendMode: 'overlay',
        }}
      />

      {/* przesuwajacy sie jasny pas */}
      {rollingBar ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: barY,
            height: 260,
            background:
              'linear-gradient(to bottom, transparent, rgba(255,255,255,0.055) 45%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.05) 55%, transparent)',
            mixBlendMode: 'screen',
          }}
        />
      ) : null}

      {/* ziarno - male SVG rozciagniete na caly kadr, wiec jest "pikselowe" */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${GRAIN_W} ${GRAIN_H}`}
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: grainOpacity,
          mixBlendMode: 'overlay',
          imageRendering: 'pixelated',
        }}
      >
        <filter id={`crt-grain-${grainSeed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={grainSeed}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width={GRAIN_W}
          height={GRAIN_H}
          filter={`url(#crt-grain-${grainSeed})`}
        />
      </svg>

      {/* winieta + lekkie podswietlenie krawedzi */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 78% 72% at 50% 50%, transparent 40%, rgba(0,0,0,${
            0.55 * vignette
          }) 82%, rgba(0,0,0,${0.9 * vignette}) 100%)`,
        }}
      />

      {/* delikatne migotanie jasnosci calego ekranu */}
      <AbsoluteFill
        style={{
          background: COLORS.white,
          opacity: random(`crt-${Math.floor(frame / 2)}`) * 0.014,
          mixBlendMode: 'overlay',
        }}
      />
    </AbsoluteFill>
  );
};
