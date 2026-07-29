import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  /** Predkosc przewijania siatki (px na klatke). */
  speed?: number;
  color?: string;
  /** Drugi kolor - linie poprzeczne. */
  colorCross?: string;
  cell?: number;
  opacity?: number;
  /** Kat pochylenia plaszczyzny. 90 = idealnie plasko. */
  tilt?: number;
  /** Wysokosc horyzontu w % wysokosci kadru. */
  horizon?: number;
  /** Czy dorysowac lustrzana siatke pod sufitem. */
  ceiling?: boolean;
  perspective?: number;
};

const plane = (
  color: string,
  colorCross: string,
  cell: number,
  offset: number,
): React.CSSProperties => ({
  position: 'absolute',
  left: '50%',
  top: 0,
  width: 6000,
  height: 4200,
  marginLeft: -3000,
  transformOrigin: '50% 0%',
  backgroundImage: [
    // szeroka, miekka poswiata
    `repeating-linear-gradient(0deg, ${color}22 0px, ${color}22 4px, transparent 4px, transparent ${cell}px)`,
    `repeating-linear-gradient(90deg, ${colorCross}18 0px, ${colorCross}18 5px, transparent 5px, transparent ${cell}px)`,
    // ostry rdzen linii
    `repeating-linear-gradient(0deg, ${color} 0px, ${color} 1.5px, transparent 1.5px, transparent ${cell}px)`,
    `repeating-linear-gradient(90deg, ${colorCross} 0px, ${colorCross} 1.5px, transparent 1.5px, transparent ${cell}px)`,
  ].join(', '),
  backgroundPosition: `0px ${offset}px, 0px 0px, 0px ${offset}px, 0px 0px`,
  maskImage:
    'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 8%, black 30%, black 78%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 8%, black 30%, black 78%, transparent 100%)',
});

/**
 * Nieskonczona neonowa siatka w perspektywie 3D (podloga + opcjonalny sufit).
 * Efekt "synthwave" - baza dla wiekszosci scen.
 */
export const NeonGrid: React.FC<Props> = ({
  speed = 9,
  color = COLORS.cyan,
  colorCross = COLORS.magenta,
  cell = 90,
  opacity = 0.9,
  tilt = 79,
  horizon = 56,
  ceiling = true,
  perspective = 520,
}) => {
  const frame = useCurrentFrame();
  const offset = ((frame * speed) % cell) + cell;

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          perspective,
          perspectiveOrigin: `50% ${horizon}%`,
        }}
      >
        {/* podloga */}
        <div
          style={{
            ...plane(color, colorCross, cell, offset),
            top: `${horizon}%`,
            transform: `rotateX(${tilt}deg)`,
          }}
        />
        {/* sufit - lustrzane odbicie */}
        {ceiling ? (
          <div
            style={{
              ...plane(colorCross, color, cell, offset),
              top: `${horizon}%`,
              transform: `rotateX(${-tilt}deg)`,
              opacity: 0.55,
            }}
          />
        ) : null}
      </AbsoluteFill>

      {/* rozswietlenie linii horyzontu */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${horizon}%`,
          height: 2,
          marginTop: -1,
          background: color,
          boxShadow: `0 0 20px 6px ${color}cc, 0 0 90px 30px ${color}55`,
          opacity: 0.85,
        }}
      />
    </AbsoluteFill>
  );
};
