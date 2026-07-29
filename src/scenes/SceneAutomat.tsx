import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {NeonGrid} from '../components/NeonGrid';
import {Stage} from '../components/Stage';
import {VoxelBurst} from '../components/VoxelBurst';
import {PixelSprite} from '../components/PixelSprite';
import {COLORS, FONTS, neonBox, neonText} from '../theme';
import {TOOLS} from '../script';
import {SpriteName} from '../art/sprites';
import {easeOutExpo, ramp} from '../lib/anim';

const RADIUS = 440;
const TILT = 26;
const PULSES_PER_LINE = 3;

/**
 * SCENA 5 (20.0 - 24.5 s)
 * Izometryczny graf: narzedzia podlaczone do rdzenia Claude,
 * dane pulsuja po neonowych przewodach.
 */
export const SceneAutomat: React.FC = () => {
  const frame = useCurrentFrame();

  const spin = frame * 0.52 - 18;
  const rise = ramp(frame, 0, 26, easeOutExpo);
  const coreIn = ramp(frame, 8, 24, easeOutExpo);

  return (
    <AbsoluteFill style={{background: COLORS.void}}>
      <Backdrop tint={COLORS.cyan} tint2={COLORS.magenta} />
      <NeonGrid
        speed={11}
        color={COLORS.purple}
        colorCross={COLORS.cyan}
        horizon={64}
        opacity={0.5}
      />

      <Stage>
        <AbsoluteFill
          style={{
            perspective: 1700,
            perspectiveOrigin: '50% 42%',
          }}
        >
          <AbsoluteFill
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateY(-70px) rotateX(${TILT}deg) rotateY(${spin}deg) scale(${
                0.7 + 0.3 * rise
              })`,
            }}
          >
            {/* podest pod grafem */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: RADIUS * 2.5,
                height: RADIUS * 2.5,
                marginLeft: -RADIUS * 1.25,
                marginTop: -RADIUS * 1.25,
                transform: 'rotateX(90deg)',
                borderRadius: '50%',
                border: `2px solid ${COLORS.cyan}44`,
                background: `radial-gradient(circle, ${COLORS.cyan}14 0%, transparent 68%)`,
                boxShadow: `0 0 90px ${COLORS.cyan}33`,
                opacity: rise,
              }}
            />

            {TOOLS.map((tool, i) => {
              const a = (i * 360) / TOOLS.length;
              const appear = ramp(frame, 6 + i * 5, 22, easeOutExpo);
              const linked = ramp(frame, 16 + i * 4, 18, easeOutExpo);

              return (
                <React.Fragment key={tool.label}>
                  {/* PRZEWOD - lezy plasko w plaszczyznie podestu */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: RADIUS * linked,
                      height: 8,
                      marginTop: -4,
                      transformOrigin: '0% 50%',
                      transform: `rotateY(${a}deg) rotateX(90deg)`,
                      background: `linear-gradient(90deg, ${tool.color}22, ${tool.color})`,
                      boxShadow: `0 0 18px ${tool.color}, 0 0 44px ${tool.color}66`,
                      opacity: linked * 0.95,
                    }}
                  >
                    {/* impulsy danych plynace do rdzenia */}
                    {new Array(PULSES_PER_LINE).fill(0).map((_, p) => {
                      const t =
                        ((frame * 0.022 + p / PULSES_PER_LINE + i * 0.13) % 1);
                      // dane plyna od narzedzia do rdzenia, wiec od konca
                      const pos = (1 - t) * (RADIUS * linked - 26);
                      return (
                        <div
                          key={p}
                          style={{
                            position: 'absolute',
                            left: pos,
                            top: -7,
                            width: 22,
                            height: 22,
                            background: COLORS.white,
                            boxShadow: `0 0 16px ${COLORS.white}, 0 0 34px ${tool.color}`,
                            opacity: linked * (0.35 + 0.65 * Math.sin(t * Math.PI)),
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* WEZEL - zawsze zwrocony do kamery */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: 220,
                      height: 168,
                      marginLeft: -110,
                      marginTop: -84,
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${a}deg) translateX(${RADIUS}px) rotateY(${
                        -a - spin
                      }deg) rotateX(${-TILT}deg) translateY(${
                        (1 - appear) * -120
                      }px) scale(${0.5 + 0.5 * appear})`,
                      opacity: appear,
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 12,
                        background:
                          'linear-gradient(160deg, rgba(12,8,26,0.95), rgba(5,3,14,0.98))',
                        border: `2px solid ${tool.color}`,
                        boxShadow: neonBox(tool.color, 0.9),
                      }}
                    >
                      <PixelSprite
                        name={tool.sprite as SpriteName}
                        size={58}
                        color={tool.color}
                        glow={1}
                      />
                      <div
                        style={{
                          fontFamily: FONTS.display,
                          fontSize: 15,
                          letterSpacing: 2,
                          color: COLORS.cream,
                          textShadow: neonText(tool.color, 0.5),
                        }}
                      >
                        {tool.label}
                      </div>
                    </div>

                    {/* pionowa smuga swiatla pod wezlem */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '100%',
                        width: 3,
                        height: 120 * appear,
                        marginLeft: -1.5,
                        background: `linear-gradient(to bottom, ${tool.color}, transparent)`,
                        boxShadow: `0 0 14px ${tool.color}`,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                </React.Fragment>
              );
            })}

            {/* RDZEN - counter-rotacja, zeby znak patrzyl w kamere */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 600,
                height: 600,
                marginLeft: -300,
                marginTop: -300,
                transformStyle: 'preserve-3d',
                transform: `rotateY(${-spin}deg) rotateX(${-TILT}deg)`,
              }}
            >
              <VoxelBurst
                assembly={coreIn}
                rotY={Math.sin(frame / 24) * 30}
                rotX={10}
                scale={0.34}
                cell={30}
                pulse={0.3 + 0.3 * Math.sin(frame / 6)}
              />
            </div>
          </AbsoluteFill>
        </AbsoluteFill>

        {/* etykieta trybu pracy */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 92,
            display: 'flex',
            justifyContent: 'center',
            opacity: ramp(frame, 30, 20, easeOutExpo),
          }}
        >
          <div
            style={{
              padding: '12px 30px',
              border: `2px solid ${COLORS.lime}`,
              boxShadow: neonBox(COLORS.lime, 0.7),
              background: 'rgba(6,4,14,0.8)',
              fontFamily: FONTS.display,
              fontSize: 20,
              letterSpacing: 4,
              color: COLORS.lime,
              textShadow: neonText(COLORS.lime, 0.7),
            }}
          >
            {frame % 30 < 15 ? 'AUTOPILOT: ON' : 'AUTOPILOT: ON _'}
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
