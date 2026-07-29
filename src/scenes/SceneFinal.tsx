import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {NeonGrid} from '../components/NeonGrid';
import {PixelWarp} from '../components/PixelWarp';
import {Stage} from '../components/Stage';
import {VoxelBurst} from '../components/VoxelBurst';
import {NeonType} from '../components/NeonType';
import {COLORS, FONTS, neonBox, neonText} from '../theme';
import {BRAND} from '../script';
import {easeOutExpo, ramp} from '../lib/anim';

const RINGS = [0, 14, 30, 48];

/**
 * SCENA 6 (24.5 - 30.0 s)
 * Znak wraca w pelnej skali, fala uderzeniowa, wordmark i wezwanie do dzialania.
 */
export const SceneFinal: React.FC = () => {
  const frame = useCurrentFrame();

  const boom = ramp(frame, 0, 26, easeOutExpo);
  const assembly = ramp(frame, 0, 34, easeOutExpo);

  // kamera odjezdza i znak osiada
  const scale = interpolate(frame, [0, 34, 165], [1.5, 0.52, 0.56], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });
  const rotY = interpolate(frame, [0, 60], [-46, -8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });

  const ctaIn = ramp(frame, 78, 26, easeOutExpo);
  const breathe = 0.25 + 0.25 * Math.sin(frame / 11);

  const finalFlash =
    frame >= 0 && frame <= 12 ? interpolate(frame, [0, 12], [0.9, 0]) : 0;

  return (
    <AbsoluteFill style={{background: COLORS.void}}>
      <Backdrop tint={COLORS.clayGlow} tint2={COLORS.purple} intensity={1.25} />
      <NeonGrid
        speed={16}
        color={COLORS.clay}
        colorCross={COLORS.cyan}
        horizon={62}
        opacity={0.7}
      />
      <PixelWarp count={70} speed={20} streak={0.05} seed="final" opacity={0.7} />

      <Stage>
        {/* fale uderzeniowe */}
        {RINGS.map((delay, i) => {
          const t = Math.max(0, Math.min(1, (frame - delay) / 46));
          if (t <= 0) return null;
          const e = easeOutExpo(t);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 960,
                top: 292,
                width: 200,
                height: 200,
                marginLeft: -100,
                marginTop: -100,
                borderRadius: '50%',
                border: `${4 - i * 0.6}px solid ${
                  i % 2 ? COLORS.cyan : COLORS.clayBright
                }`,
                boxShadow: `0 0 40px ${i % 2 ? COLORS.cyan : COLORS.clayBright}`,
                transform: `scale(${0.2 + e * 9})`,
                opacity: (1 - t) * 0.6,
              }}
            />
          );
        })}

        {/* konfetti z wokseli */}
        {new Array(34).fill(0).map((_, i) => {
          const x = random(`f-x-${i}`) * 1920;
          const speed = 2 + random(`f-s-${i}`) * 5;
          const y = 1120 - ((frame * speed + random(`f-o-${i}`) * 1200) % 1300);
          const size = 6 + Math.round(random(`f-w-${i}`) * 12);
          const c =
            random(`f-c-${i}`) > 0.6
              ? COLORS.cyan
              : random(`f-c2-${i}`) > 0.5
                ? COLORS.clayBright
                : COLORS.magenta;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                background: c,
                boxShadow: `0 0 12px ${c}`,
                opacity: 0.6,
                transform: `rotate(${frame * 3 + i * 30}deg)`,
              }}
            />
          );
        })}

        {/* ZNAK */}
        <div
          style={{
            position: 'absolute',
            left: 960 - 500,
            top: 292 - 500,
            width: 1000,
            height: 1000,
          }}
        >
          <VoxelBurst
            assembly={assembly}
            rotY={rotY + frame * 0.22}
            rotX={8}
            scale={scale}
            cell={30}
            pulse={breathe + boom * 0.5}
          />
        </div>

        {/* WORDMARK */}
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 500,
          }}
        >
          <NeonType
            text={BRAND.wordmark}
            size={132}
            from={30}
            stagger={3}
            mode="drop"
            color={COLORS.cream}
            ghost={COLORS.clayBright}
            glow={1.5}
            letterSpacing={0.18}
          />
          <div style={{height: 26}} />
          <NeonType
            text={BRAND.tagline}
            size={62}
            from={56}
            stagger={2}
            mode="pop"
            color={COLORS.clayBright}
            ghost={COLORS.clayGlow}
            glow={1.2}
            letterSpacing={0.34}
          />
        </AbsoluteFill>

        {/* CTA */}
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 748,
            opacity: ctaIn,
            transform: `translateY(${(1 - ctaIn) * 40}px)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 26,
              padding: '20px 44px',
              background: 'rgba(6,4,14,0.86)',
              border: `3px solid ${COLORS.cyan}`,
              boxShadow: neonBox(COLORS.cyan, 1 + breathe),
            }}
          >
            {/* Pixelify Sans zamiast Press Start 2P - ma pelne wersaliki
                z polskimi znakami diakrytycznymi (S z kreska w "DZIS"). */}
            <span
              style={{
                fontFamily: FONTS.pixel,
                fontWeight: 700,
                fontSize: 40,
                letterSpacing: 4,
                color: COLORS.cream,
                textShadow: neonText(COLORS.cyan, 0.8),
              }}
            >
              {BRAND.ctaLabel}
            </span>
            <span
              style={{
                width: 3,
                height: 34,
                background: `${COLORS.cyan}88`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontWeight: 700,
                fontSize: 30,
                letterSpacing: 2,
                color: COLORS.cyan,
                textShadow: neonText(COLORS.cyan, 1),
              }}
            >
              {BRAND.cta}
            </span>
          </div>
        </AbsoluteFill>
      </Stage>

      {/* blysk otwierajacy finał */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 27%, ${COLORS.white}, ${COLORS.clayGlow}00 60%)`,
          opacity: finalFlash,
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};
