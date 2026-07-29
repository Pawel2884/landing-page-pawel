import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CAPTIONS} from '../script';
import {COLORS, FONTS} from '../theme';
import {easeOutExpo, inOut} from '../lib/anim';
import {STAGE_H, STAGE_W} from './Stage';

/**
 * Napisy PL - reklama jest bez lektora, wiec to one niosa cala tresc.
 * Zawsze na wierzchu, zawsze czytelne: ciemna plyta + gruby pikselowy krok.
 */
export const Subtitles: React.FC<{
  /** Przesuniecie od dolu kadru w px. */
  bottom?: number;
  fontSize?: number;
  maxWidth?: number | string;
}> = ({bottom = 96, fontSize = 46, maxWidth = '78%'}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  // W kadrach pionowych i kwadratowych sceny zajmuja tylko pas na srodku.
  // Napisy trzymamy tuz pod tym pasem, zamiast na samym dole ekranu.
  const stageScale = Math.min(width / STAGE_W, height / STAGE_H);
  const letterbox = (height - STAGE_H * stageScale) / 2;
  const bottomOffset = bottom + letterbox;

  const active = CAPTIONS.filter((c) => frame >= c.from - 2 && frame <= c.to + 2);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {active.map((c, idx) => {
        const vis = inOut(frame, c.from, c.to, 7, 7);
        if (vis <= 0.001) return null;

        const t = easeOutExpo(
          Math.max(0, Math.min(1, (frame - c.from) / 10)),
        );
        const accent = c.accent ?? COLORS.cyan;

        // ile znakow juz "wystukane" - napis buduje sie jak na terminalu
        const chars = [...c.text];
        const shown = Math.min(chars.length, Math.ceil((frame - c.from) * 1.6));

        return (
          <div
            key={`${c.from}-${idx}`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: bottomOffset,
              display: 'flex',
              justifyContent: 'center',
              opacity: vis,
              transform: `translateY(${(1 - t) * 26}px)`,
            }}
          >
            <div
              style={{
                position: 'relative',
                maxWidth,
                padding: '18px 40px 22px',
                background:
                  'linear-gradient(180deg, rgba(6,4,14,0.72), rgba(6,4,14,0.88))',
                border: `2px solid ${accent}55`,
                boxShadow: `0 0 26px ${accent}33, inset 0 0 30px rgba(0,0,0,0.65)`,
                backdropFilter: 'blur(2px)',
              }}
            >
              {/* naroznikowe znaczniki - HUD */}
              {[
                {top: -3, left: -3},
                {top: -3, right: -3},
                {bottom: -3, left: -3},
                {bottom: -3, right: -3},
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 14,
                    height: 14,
                    background: accent,
                    boxShadow: `0 0 12px ${accent}`,
                    ...pos,
                  }}
                />
              ))}

              <div
                style={{
                  fontFamily: FONTS.pixel,
                  fontWeight: 700,
                  fontSize,
                  lineHeight: 1.15,
                  color: COLORS.cream,
                  textAlign: 'center',
                  letterSpacing: 1.5,
                  textShadow: `0 0 8px ${accent}aa, 0 3px 0 rgba(0,0,0,0.9)`,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {chars.map((ch, i) => (
                  <span
                    key={i}
                    style={{
                      opacity: i < shown ? 1 : 0,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>

              {/* pasek postepu napisu */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: 4,
                  width: `${
                    Math.max(0, Math.min(1, (frame - c.from) / (c.to - c.from))) *
                    100
                  }%`,
                  background: accent,
                  boxShadow: `0 0 14px ${accent}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
