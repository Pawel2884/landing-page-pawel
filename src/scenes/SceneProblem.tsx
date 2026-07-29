import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {NeonGrid} from '../components/NeonGrid';
import {Stage} from '../components/Stage';
import {PixelSprite} from '../components/PixelSprite';
import {COLORS, FONTS, neonBox, neonText} from '../theme';
import {TASK_CARDS} from '../script';
import {SpriteName} from '../art/sprites';
import {easeOutExpo, ramp, shake} from '../lib/anim';

const RING_RADIUS = 640;
const CARD_W = 230;
const CARD_H = 158;

type CardProps = {
  label: string;
  sprite: SpriteName;
  angle: number;
  y: number;
  appear: number;
  danger: number;
};

const TaskCard: React.FC<CardProps> = ({
  label,
  sprite,
  angle,
  y,
  appear,
  danger,
}) => {
  const accent = danger > 0.5 ? COLORS.danger : COLORS.cyan;
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        transform: `translateY(${y}px) rotateY(${angle}deg) translateZ(${RING_RADIUS}px) scale(${
          0.4 + 0.6 * appear
        })`,
        opacity: appear,
        background: 'linear-gradient(160deg, rgba(12,8,26,0.94), rgba(6,4,14,0.98))',
        border: `2px solid ${accent}`,
        boxShadow: neonBox(accent, 0.85),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        backfaceVisibility: 'hidden',
      }}
    >
      <PixelSprite name={sprite} size={64} color={accent} glow={0.9} />
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 17,
          letterSpacing: 2,
          color: COLORS.cream,
          textShadow: neonText(accent, 0.5),
        }}
      >
        {label}
      </div>
    </div>
  );
};

/**
 * SCENA 2 (5.0 - 10.0 s)
 * Karuzela obowiazkow rozkreca sie do granic. Zegar w srodku odlicza dobe.
 */
export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();

  // spin przyspiesza wykladniczo - narastajacy chaos
  const spin = frame * 1.6 + Math.pow(Math.max(0, frame - 10), 1.72) * 0.16;
  const danger = ramp(frame, 52, 40);
  const sh = shake(frame, 3 + danger * 16, 2);

  const rings = [
    {y: -268, dir: 1, speed: 1},
    {y: 0, dir: -1, speed: 1.35},
    {y: 268, dir: 1, speed: 0.85},
  ];

  // zegar wjezdza w drugiej polowie sceny
  const clockIn = ramp(frame, 66, 22, easeOutExpo);
  const handFast = frame * 26;
  const hoursLeft = Math.max(
    0,
    24 - Math.round(interpolate(frame, [70, 138], [0, 24], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })),
  );

  return (
    <AbsoluteFill style={{background: COLORS.void}}>
      <Backdrop
        tint={danger > 0.4 ? COLORS.danger : COLORS.purple}
        tint2={COLORS.magenta}
        intensity={1 + danger}
      />
      <NeonGrid
        speed={14 + danger * 46}
        color={COLORS.magenta}
        colorCross={danger > 0.5 ? COLORS.danger : COLORS.purple}
        horizon={54}
        opacity={0.55}
      />

      <Stage>
        <AbsoluteFill
          style={{
            transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.rot}deg)`,
          }}
        >
          <AbsoluteFill
            style={{
              perspective: 1500,
              perspectiveOrigin: '50% 50%',
            }}
          >
            <AbsoluteFill style={{transformStyle: 'preserve-3d'}}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformStyle: 'preserve-3d',
                  // odsuwamy kamere, zeby cala karuzela zmiescila sie w kadrze
                  transform: `translateZ(-520px) rotateX(6deg)`,
                }}
              >
                {rings.map((ring, r) =>
                  TASK_CARDS.map((card, i) => {
                    const step = 360 / TASK_CARDS.length;
                    const angle =
                      i * step + spin * ring.speed * ring.dir + r * 14;
                    const appear = ramp(
                      frame,
                      2 + i * 2 + r * 6,
                      16,
                      easeOutExpo,
                    );
                    return (
                      <TaskCard
                        key={`${r}-${i}`}
                        label={card.label}
                        sprite={card.sprite as SpriteName}
                        angle={angle}
                        y={ring.y}
                        appear={appear}
                        danger={danger}
                      />
                    );
                  }),
                )}
              </div>
            </AbsoluteFill>
          </AbsoluteFill>

          {/* zegar - presja czasu */}
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              opacity: clockIn,
              transform: `scale(${0.5 + 0.5 * clockIn})`,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 340,
                height: 340,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* przyciemnienie pod zegarem - inaczej ginie w karuzeli */}
              <div
                style={{
                  position: 'absolute',
                  width: 620,
                  height: 620,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(4,3,10,0.96) 0%, rgba(4,3,10,0.85) 42%, rgba(4,3,10,0) 72%)',
                }}
              />

              {/* tarcza z pikselowych znacznikow */}
              {new Array(12).fill(0).map((_, i) => {
                const a = (i * 360) / 12;
                const big = i % 3 === 0;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: big ? 18 : 10,
                      height: big ? 18 : 10,
                      background: COLORS.danger,
                      boxShadow: `0 0 14px ${COLORS.danger}`,
                      transform: `rotate(${a}deg) translateY(-150px)`,
                    }}
                  />
                );
              })}

              {/* wskazowki */}
              <div
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 110,
                  bottom: '50%',
                  background: COLORS.cream,
                  boxShadow: `0 0 16px ${COLORS.cream}`,
                  transformOrigin: '50% 100%',
                  transform: `rotate(${handFast * 0.28}deg)`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 140,
                  bottom: '50%',
                  background: COLORS.danger,
                  boxShadow: `0 0 18px ${COLORS.danger}`,
                  transformOrigin: '50% 100%',
                  transform: `rotate(${handFast}deg)`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 22,
                  height: 22,
                  background: COLORS.cream,
                  boxShadow: `0 0 20px ${COLORS.danger}`,
                }}
              />

              {/* licznik godzin */}
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(50% + 130px)',
                  fontFamily: FONTS.mono,
                  fontWeight: 700,
                  fontSize: 52,
                  color: COLORS.danger,
                  textShadow: neonText(COLORS.danger, 1),
                  letterSpacing: 4,
                }}
              >
                {String(hoursLeft).padStart(2, '0')}:00
              </div>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Stage>

      {/* czerwony alarm pulsujacy na krawedziach */}
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 260px ${COLORS.danger}`,
          opacity:
            danger * (0.35 + 0.35 * Math.abs(Math.sin(frame / 6))) ,
          mixBlendMode: 'screen',
        }}
      />

      {/* przypadkowe przebicia sygnalu */}
      {new Array(3).fill(0).map((_, i) => {
        const on = random(`p-glitch-${i}-${Math.floor(frame / 3)}`) > 0.82;
        if (!on || danger < 0.2) return null;
        const top = random(`p-top-${i}-${Math.floor(frame / 3)}`) * 100;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${top}%`,
              height: 3 + random(`p-h-${i}-${frame}`) * 10,
              background: COLORS.danger,
              opacity: 0.35,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
