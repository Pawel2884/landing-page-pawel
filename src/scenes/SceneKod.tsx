import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {NeonGrid} from '../components/NeonGrid';
import {Stage} from '../components/Stage';
import {VoxelBurst} from '../components/VoxelBurst';
import {PixelSprite} from '../components/PixelSprite';
import {COLORS, FONTS, neonBox, neonText} from '../theme';
import {CODE_LINES, TERMINAL_LINES} from '../script';
import {easeOutExpo, ramp} from '../lib/anim';

const KIND_COLOR: Record<string, string> = {
  cmt: '#6f6a8f',
  kw: COLORS.magenta,
  fn: COLORS.cyan,
  str: COLORS.lime,
  plain: COLORS.cream,
};

/**
 * SCENA 3 (10.0 - 15.0 s)
 * Okno edytora wlatuje w 3D, Claude wystukuje kod, testy przechodza na zielono.
 */
export const SceneKod: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = ramp(frame, 0, 30, easeOutExpo);
  const rotY = interpolate(enter, [0, 1], [-72, -13]);
  const rotX = interpolate(enter, [0, 1], [26, 5]);
  const tz = interpolate(enter, [0, 1], [-900, 0]);

  // wystukiwanie kodu znak po znaku
  const typed = Math.max(0, (frame - 14) * 2.6);
  let consumed = 0;

  const termIn = ramp(frame, 76, 22, easeOutExpo);
  const termLines = Math.floor(Math.max(0, (frame - 84) / 9));

  const okPop = ramp(frame, 104, 16, easeOutExpo);

  return (
    <AbsoluteFill style={{background: COLORS.void}}>
      <Backdrop tint={COLORS.purple} tint2={COLORS.cyan} />
      <NeonGrid
        speed={7}
        color={COLORS.purple}
        colorCross={COLORS.cyan}
        horizon={62}
        opacity={0.5}
      />

      <Stage>
        {/* iskry unoszace sie w tle */}
        {new Array(26).fill(0).map((_, i) => {
          const x = random(`k-x-${i}`) * 1920;
          const speed = 1.2 + random(`k-s-${i}`) * 2.4;
          const y = 1080 - ((frame * speed + random(`k-o-${i}`) * 1080) % 1180);
          const size = 4 + Math.round(random(`k-w-${i}`) * 6);
          const c = random(`k-c-${i}`) > 0.5 ? COLORS.cyan : COLORS.clayBright;
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
                boxShadow: `0 0 10px ${c}`,
                opacity: 0.55,
              }}
            />
          );
        })}

        <AbsoluteFill style={{perspective: 1600, perspectiveOrigin: '46% 46%'}}>
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* OKNO EDYTORA */}
            <div
              style={{
                position: 'absolute',
                left: 168,
                top: 176,
                width: 1030,
                transform: `translateZ(${tz}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                transformStyle: 'preserve-3d',
                opacity: enter,
                background:
                  'linear-gradient(150deg, rgba(14,10,30,0.97), rgba(6,4,16,0.99))',
                border: `2px solid ${COLORS.cyan}`,
                boxShadow: neonBox(COLORS.cyan, 1.15),
              }}
            >
              {/* pasek tytulu */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 20px',
                  borderBottom: `2px solid ${COLORS.cyan}55`,
                  background: 'rgba(0,240,255,0.06)',
                }}
              >
                {[COLORS.danger, COLORS.amber, COLORS.lime].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 14,
                      height: 14,
                      background: c,
                      boxShadow: `0 0 10px ${c}`,
                    }}
                  />
                ))}
                <div
                  style={{
                    marginLeft: 10,
                    fontFamily: FONTS.mono,
                    fontSize: 22,
                    color: COLORS.dim,
                    letterSpacing: 2,
                  }}
                >
                  koszyk.ts
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    fontFamily: FONTS.display,
                    fontSize: 14,
                    color: COLORS.clayBright,
                    textShadow: neonText(COLORS.clayBright, 0.6),
                  }}
                >
                  CLAUDE
                </div>
              </div>

              {/* kod */}
              <div style={{padding: '26px 30px 34px'}}>
                {CODE_LINES.map((line, i) => {
                  const start = consumed;
                  consumed += line.text.length;
                  const show = Math.max(
                    0,
                    Math.min(line.text.length, typed - start),
                  );
                  const isTyping =
                    typed > start && typed < start + line.text.length;
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 22,
                        fontFamily: FONTS.mono,
                        fontSize: 32,
                        lineHeight: 1.62,
                        whiteSpace: 'pre',
                      }}
                    >
                      <span style={{color: '#4a4468', width: 34}}>{i + 1}</span>
                      <span
                        style={{
                          color: KIND_COLOR[line.kind],
                          textShadow: `0 0 12px ${KIND_COLOR[line.kind]}88`,
                        }}
                      >
                        {line.text.slice(0, Math.floor(show))}
                        {isTyping && frame % 8 < 5 ? (
                          <span
                            style={{
                              background: COLORS.cream,
                              color: COLORS.void,
                            }}
                          >
                            {' '}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TERMINAL */}
            <div
              style={{
                position: 'absolute',
                left: 900,
                top: 606,
                width: 800,
                transform: `translateZ(${140 - (1 - termIn) * 500}px) rotateY(${
                  -10 + (1 - termIn) * 40
                }deg) rotateX(4deg)`,
                opacity: termIn,
                background: 'linear-gradient(150deg, rgba(6,18,12,0.97), rgba(3,8,6,0.99))',
                border: `2px solid ${COLORS.lime}`,
                boxShadow: neonBox(COLORS.lime, 1),
                padding: '22px 26px',
              }}
            >
              {TERMINAL_LINES.map((t, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: FONTS.mono,
                    fontWeight: i === 1 ? 700 : 400,
                    fontSize: 28,
                    lineHeight: 1.6,
                    color: i === 0 ? COLORS.dim : COLORS.lime,
                    textShadow: i === 0 ? undefined : `0 0 14px ${COLORS.lime}99`,
                    opacity: i <= termLines ? 1 : 0,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>

            {/* pieczatka OK */}
            <div
              style={{
                position: 'absolute',
                left: 1286,
                top: 392,
                transform: `scale(${0.3 + 0.7 * okPop}) rotate(${
                  -12 + (1 - okPop) * 40
                }deg)`,
                opacity: okPop,
              }}
            >
              <PixelSprite name="check" size={168} color={COLORS.lime} glow={1.6} />
            </div>
          </AbsoluteFill>
        </AbsoluteFill>

        {/* maly znak Claude w rogu - "kto to zrobil" */}
        <div style={{position: 'absolute', left: 1480, top: 96, width: 380, height: 380}}>
          <VoxelBurst
            assembly={1}
            // wahadlowy obrot zamiast pelnego - gwiazda jest plaska,
            // wiec pelny obrot znikalby co pol obrotu
            rotY={Math.sin(frame / 26) * 34}
            rotX={16}
            scale={0.24}
            cell={30}
            pulse={0.25 + 0.25 * Math.sin(frame / 7)}
          />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
