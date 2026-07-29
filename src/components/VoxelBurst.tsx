import React, {useMemo} from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {BURST_CELLS} from '../art/sprites';
import {COLORS} from '../theme';
import {Cube3D} from './Cube3D';
import {easeOutBack, easeOutExpo} from '../lib/anim';

type Props = {
  /** 0 = woksele rozrzucone w kosmosie, 1 = zlozone w znak. */
  assembly: number;
  cell?: number;
  rotY?: number;
  rotX?: number;
  scale?: number;
  color?: string;
  coreColor?: string;
  /** Rozsuniecie wokseli na zewnatrz (finalowa eksplozja). */
  explode?: number;
  /** Pulsowanie poswiaty. */
  pulse?: number;
  perspective?: number;
  style?: React.CSSProperties;
};

/**
 * Znak-gwiazda zbudowany z wokseli 3D.
 * Serce calej reklamy: sklada sie z lecacych kostek, obraca w przestrzeni
 * i w finale rozrywa na kawalki.
 */
export const VoxelBurst: React.FC<Props> = ({
  assembly,
  cell = 26,
  rotY = 0,
  rotX = 0,
  scale = 1,
  color = COLORS.clayBright,
  coreColor = COLORS.white,
  explode = 0,
  pulse = 0,
  perspective = 1100,
  style,
}) => {
  const frame = useCurrentFrame();

  const voxels = useMemo(
    () =>
      BURST_CELLS.map((c, i) => {
        const dist = Math.hypot(c.x, c.y);
        return {
          ...c,
          i,
          dist,
          // punkt startowy gdzies daleko w chmurze
          sx: (random(`v-sx-${i}`) - 0.5) * 2600,
          sy: (random(`v-sy-${i}`) - 0.5) * 1700,
          sz: (random(`v-sz-${i}`) - 0.5) * 2200 - 400,
          srot: (random(`v-sr-${i}`) - 0.5) * 900,
          delay: random(`v-d-${i}`) * 0.45,
          isCore: dist < 1.5,
        };
      }),
    [],
  );

  return (
    <AbsoluteFill
      style={{
        perspective,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* poswiata pod znakiem */}
      <div
        style={{
          position: 'absolute',
          width: cell * 16 * scale,
          height: cell * 16 * scale,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}55 0%, ${color}18 35%, transparent 68%)`,
          opacity: Math.min(1, assembly * 1.4) * (0.7 + pulse * 0.6),
          filter: 'blur(2px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}
      >
        {voxels.map((v) => {
          // kazdy woksel ma wlasne opoznienie -> znak "sklada sie" falowo
          const t = Math.max(0, Math.min(1, (assembly - v.delay) / 0.55));
          const e = easeOutExpo(t);
          const eb = easeOutBack(t);

          const tx = v.x * cell;
          const ty = v.y * cell;

          const ex = explode * v.x * cell * 3.2;
          const ey = explode * v.y * cell * 3.2;
          const ez = explode * (random(`v-ez-${v.i}`) - 0.3) * 900;

          const x = v.sx + (tx - v.sx) * e + ex;
          const y = v.sy + (ty - v.sy) * e + ey;
          const z = v.sz + (0 - v.sz) * e + ez;
          const rot = v.srot * (1 - e);

          // lekkie falowanie zlozonego znaku
          const wave =
            e > 0.95
              ? Math.sin(frame / 9 - v.dist * 0.55) * 4 * (1 - explode)
              : 0;

          const c = v.isCore ? coreColor : color;
          const glow = (v.isCore ? 1.8 : 1) * (1 + pulse * 1.4);

          return (
            <div
              key={v.i}
              style={{
                position: 'absolute',
                left: -cell / 2,
                top: -cell / 2,
                transformStyle: 'preserve-3d',
                transform: `translate3d(${x}px, ${y}px, ${z + wave}px) rotateX(${rot}deg) rotateY(${
                  rot * 0.7
                }deg) scale(${0.2 + 0.8 * eb})`,
                opacity: Math.min(1, t * 2) * (1 - explode * 0.85),
              }}
            >
              <Cube3D
                size={cell * 0.92}
                color={c}
                fill={v.isCore ? 0.85 : 0.42}
                glow={glow}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
