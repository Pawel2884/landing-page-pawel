import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {NeonGrid} from '../components/NeonGrid';
import {Stage} from '../components/Stage';
import {VoxelBurst} from '../components/VoxelBurst';
import {PixelSprite} from '../components/PixelSprite';
import {COLORS, FONTS, neonBox, neonText} from '../theme';
import {INSIGHT_BARS, INSIGHT_HEADLINE} from '../script';
import {easeInOutCubic, easeOutExpo, ramp} from '../lib/anim';

const CORE_X = 700;
const CORE_Y = 470;
const DOC_COUNT = 16;
const CYCLE = 46;

/**
 * SCENA 4 (15.0 - 20.0 s)
 * Stos dokumentow wpada w rdzen Claude i wychodzi jako gotowe wnioski.
 */
export const SceneAnaliza: React.FC = () => {
  const frame = useCurrentFrame();

  const panelIn = ramp(frame, 44, 26, easeOutExpo);
  const headlineIn = ramp(frame, 96, 20, easeOutExpo);

  // licznik stron - rosnie razem ze strumieniem
  const pages = Math.round(
    interpolate(frame, [6, 96], [0, 200], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeInOutCubic,
    }),
  );

  // rdzen pulsuje przy kazdym pochlonietym dokumencie
  const swallow = (frame % (CYCLE / 3)) / (CYCLE / 3);
  const corePulse = Math.pow(1 - swallow, 3) * 0.8;

  return (
    <AbsoluteFill style={{background: COLORS.void}}>
      <Backdrop tint={COLORS.clayGlow} tint2={COLORS.purple} />
      <NeonGrid
        speed={9}
        color={COLORS.clay}
        colorCross={COLORS.purple}
        horizon={60}
        opacity={0.45}
      />

      <Stage>
        <AbsoluteFill style={{perspective: 1500}}>
          {/* STRUMIEN DOKUMENTOW */}
          {new Array(DOC_COUNT).fill(0).map((_, i) => {
            const phase = ((frame + i * (CYCLE / DOC_COUNT) * 2.6) % CYCLE) / CYCLE;
            const e = easeInOutCubic(phase);

            const startY = 120 + random(`a-y-${i}`) * 820;
            const startX = -260 - random(`a-x-${i}`) * 420;
            const x = startX + (CORE_X - startX) * e;
            const y = startY + (CORE_Y - startY) * e;
            const scale = 1.15 - 1.0 * e;
            const rot = (random(`a-r-${i}`) - 0.5) * 60 * (1 - e);
            const z = -400 + 400 * e;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: `translate3d(-50%, -50%, ${z}px) scale(${Math.max(
                    0,
                    scale,
                  )}) rotate(${rot}deg)`,
                  opacity: Math.min(1, phase * 6) * Math.max(0, 1 - phase * 1.08),
                }}
              >
                <PixelSprite
                  name="doc"
                  size={104}
                  color={COLORS.cream}
                  light={COLORS.clayBright}
                  glow={0.7}
                />
              </div>
            );
          })}

          {/* RDZEN */}
          <div
            style={{
              position: 'absolute',
              left: CORE_X - 260,
              top: CORE_Y - 260,
              width: 520,
              height: 520,
            }}
          >
            <VoxelBurst
              assembly={1}
              rotY={Math.sin(frame / 21) * 38}
              rotX={14 + Math.sin(frame / 22) * 8}
              scale={0.3}
              cell={30}
              pulse={corePulse}
            />
          </div>

          {/* fala uderzeniowa przy pochlanianiu */}
          <div
            style={{
              position: 'absolute',
              left: CORE_X,
              top: CORE_Y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              border: `2px solid ${COLORS.clayBright}`,
              borderRadius: '50%',
              transform: `scale(${1 + swallow * 13})`,
              opacity: (1 - swallow) * 0.3,
              boxShadow: `0 0 24px ${COLORS.clayBright}55`,
            }}
          />

          {/* LICZNIK STRON */}
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 120,
              fontFamily: FONTS.mono,
              fontWeight: 700,
              fontSize: 40,
              color: COLORS.clayBright,
              textShadow: neonText(COLORS.clayBright, 0.8),
              letterSpacing: 3,
            }}
          >
            {String(pages).padStart(3, '0')} STRON PDF
            <div
              style={{
                marginTop: 12,
                width: 300,
                height: 8,
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${COLORS.clay}66`,
              }}
            >
              <div
                style={{
                  width: `${(pages / 200) * 100}%`,
                  height: '100%',
                  background: COLORS.clayBright,
                  boxShadow: `0 0 16px ${COLORS.clayBright}`,
                }}
              />
            </div>
          </div>

          {/* PANEL WNIOSKOW */}
          <div
            style={{
              position: 'absolute',
              left: 1180,
              top: 190,
              width: 600,
              padding: '30px 34px 36px',
              background:
                'linear-gradient(160deg, rgba(12,8,26,0.95), rgba(5,3,13,0.99))',
              border: `2px solid ${COLORS.lime}`,
              boxShadow: neonBox(COLORS.lime, 0.9),
              opacity: panelIn,
              transform: `translateX(${(1 - panelIn) * 260}px)`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 18,
                letterSpacing: 3,
                color: COLORS.lime,
                textShadow: neonText(COLORS.lime, 0.7),
                marginBottom: 26,
              }}
            >
              WNIOSKI
            </div>

            {INSIGHT_BARS.map((bar, i) => {
              const grow = ramp(frame, 56 + i * 9, 26, easeOutExpo);
              const value = bar.value * grow;
              return (
                <div key={bar.label} style={{marginBottom: 20}}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: FONTS.mono,
                      fontSize: 22,
                      color: COLORS.cream,
                      marginBottom: 7,
                      letterSpacing: 2,
                    }}
                  >
                    <span>{bar.label}</span>
                    <span style={{color: COLORS.lime}}>
                      {Math.round(value * 100)}%
                    </span>
                  </div>
                  {/* pasek zlozony z blokow - pixel art */}
                  <div style={{display: 'flex', gap: 4}}>
                    {new Array(20).fill(0).map((__, k) => {
                      const on = k / 20 < value;
                      return (
                        <div
                          key={k}
                          style={{
                            width: 22,
                            height: 22,
                            background: on ? COLORS.lime : 'rgba(255,255,255,0.07)',
                            boxShadow: on ? `0 0 12px ${COLORS.lime}aa` : undefined,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div
              style={{
                marginTop: 26,
                paddingTop: 22,
                borderTop: `2px solid ${COLORS.lime}44`,
                fontFamily: FONTS.pixel,
                fontWeight: 700,
                fontSize: 34,
                letterSpacing: 1,
                color: COLORS.cream,
                textShadow: `0 0 12px ${COLORS.lime}88`,
                opacity: headlineIn,
                transform: `translateY(${(1 - headlineIn) * 18}px)`,
              }}
            >
              {INSIGHT_HEADLINE}
            </div>
          </div>
        </AbsoluteFill>
      </Stage>
    </AbsoluteFill>
  );
};
