import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {NeonGrid} from '../components/NeonGrid';
import {PixelWarp} from '../components/PixelWarp';
import {Stage} from '../components/Stage';
import {VoxelBurst} from '../components/VoxelBurst';
import {NeonType} from '../components/NeonType';
import {COLORS, FONTS, neonText} from '../theme';
import {easeInOutCubic, easeOutExpo, ramp} from '../lib/anim';
import {BRAND} from '../script';

/**
 * SCENA 1 (0.0 - 5.0 s)
 * Wlaczenie monitora, przelot przez neonowy tunel, znak Claude sklada sie
 * z lecacych wokseli i osiada w kadrze.
 */
export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // wlaczenie kineskopu: cienka linia rozciaga sie w pelny obraz
  const openY = interpolate(frame, [1, 12], [0.002, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });
  const openX = interpolate(frame, [0, 5], [0.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });

  // hiperprzestrzen wyhamowuje
  const warpStreak = interpolate(frame, [4, 34], [1.1, 0.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOutCubic,
  });
  const warpSpeed = interpolate(frame, [4, 40], [120, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });
  const gridSpeed = interpolate(frame, [4, 44], [70, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });

  // skladanie znaku
  const assembly = ramp(frame, 14, 60, easeOutExpo);
  const rotY = interpolate(frame, [14, 92], [-210, -12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });
  const rotX = interpolate(frame, [14, 92], [46, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });
  const logoScale = interpolate(frame, [14, 96], [0.35, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });

  // znak odjezdza w gore, robiac miejsce pod napis
  const lift = interpolate(frame, [78, 104], [0, -96], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutExpo,
  });

  const pulse = Math.max(0, Math.sin((frame - 74) / 5)) * (frame > 70 ? 0.5 : 0);

  const flashOn = frame >= 70 && frame <= 78 ? (78 - frame) / 8 : 0;

  return (
    <AbsoluteFill
      style={{
        transform: `scaleY(${openY}) scaleX(${openX})`,
        transformOrigin: '50% 50%',
        background: COLORS.void,
      }}
    >
      <Backdrop tint={COLORS.purple} tint2={COLORS.clayGlow} />
      <NeonGrid
        speed={gridSpeed}
        color={COLORS.cyan}
        colorCross={COLORS.magenta}
        horizon={58}
        opacity={interpolate(frame, [4, 26], [0, 0.85], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />
      <PixelWarp
        count={110}
        speed={warpSpeed}
        streak={warpStreak}
        seed="intro"
        opacity={0.95}
      />

      <Stage>
        <AbsoluteFill style={{transform: `translateY(${lift}px)`}}>
          <VoxelBurst
            assembly={assembly}
            rotY={rotY}
            rotX={rotX}
            scale={logoScale * 0.62}
            pulse={pulse}
            cell={30}
          />
        </AbsoluteFill>

        {/* wordmark wjezdza pod znak */}
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 268,
          }}
        >
          <NeonType
            text={BRAND.wordmark}
            size={104}
            from={80}
            stagger={3}
            mode="drop"
            color={COLORS.cream}
            ghost={COLORS.clayBright}
            glow={1.3}
            letterSpacing={0.16}
          />
        </AbsoluteFill>

        {/* linijka statusu jak z terminala */}
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 92,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              letterSpacing: 10,
              color: COLORS.cyan,
              textShadow: neonText(COLORS.cyan, 0.8),
              opacity: interpolate(frame, [24, 40, 120, 138], [0, 0.9, 0.9, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {frame % 24 < 12 ? '> SYSTEM ONLINE _' : '> SYSTEM ONLINE'}
          </div>
        </AbsoluteFill>
      </Stage>

      {/* blysk w momencie zlozenia znaku */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 46%, ${COLORS.white} 0%, ${COLORS.clayBright}00 55%)`,
          opacity: flashOn * 0.85,
          mixBlendMode: 'screen',
        }}
      />

      {/* biala linia startu kineskopu */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: interpolate(frame, [0, 3, 10], [1, 0.9, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            width: '100%',
            height: 6,
            background: COLORS.white,
            boxShadow: `0 0 40px 12px ${COLORS.white}, 0 0 120px 40px ${COLORS.cyan}`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
