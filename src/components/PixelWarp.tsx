import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  count?: number;
  speed?: number;
  seed?: string;
  colors?: string[];
  /** Rozciagniecie w smugi przy duzej predkosci (efekt "warp"). */
  streak?: number;
  size?: number;
  opacity?: number;
  perspective?: number;
};

const DEPTH = 2600;

/**
 * Chmura pikseli lecacych na widza w przestrzeni 3D.
 * Przy wysokim `streak` zamienia sie w hiperprzestrzen.
 */
export const PixelWarp: React.FC<Props> = ({
  count = 90,
  speed = 26,
  seed = 'warp',
  colors = [COLORS.cyan, COLORS.magenta, COLORS.clayBright, COLORS.purple, COLORS.white],
  streak = 0,
  size = 10,
  opacity = 1,
  perspective = 700,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: (random(`${seed}-x-${i}`) - 0.5) * 3200,
        y: (random(`${seed}-y-${i}`) - 0.5) * 2000,
        z0: random(`${seed}-z-${i}`) * DEPTH,
        color: colors[Math.floor(random(`${seed}-c-${i}`) * colors.length)],
        scale: 0.5 + random(`${seed}-s-${i}`) * 1.6,
      })),
    [count, seed, colors],
  );

  return (
    <AbsoluteFill style={{perspective, opacity, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transformStyle: 'preserve-3d',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {particles.map((p, i) => {
          // z rosnie w strone widza, zawija sie po przekroczeniu kamery
          const z = ((p.z0 + frame * speed) % DEPTH) - DEPTH + 300;
          const near = 1 - Math.abs(z + 900) / DEPTH;
          const w = size * p.scale;
          const h = w * (1 + streak * 8);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: w,
                height: h,
                background: p.color,
                boxShadow: `0 0 ${8 * p.scale}px ${p.color}`,
                transform: `translate3d(${p.x}px, ${p.y}px, ${z}px)`,
                opacity: Math.max(0, Math.min(1, near)) * 0.9,
              }}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
