import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS, FONTS, neonText} from '../theme';
import {easeOutBack, flicker} from '../lib/anim';

type Props = {
  text: string;
  size: number;
  color?: string;
  /** Kolor cienia/duszka za literami. */
  ghost?: string;
  font?: string;
  weight?: number;
  letterSpacing?: number;
  /** Klatka, od ktorej litery zaczynaja wskakiwac. */
  from?: number;
  /** Odstep miedzy literami w klatkach. */
  stagger?: number;
  /** Sposob wejscia litery. */
  mode?: 'drop' | 'pop' | 'flip' | 'none';
  glow?: number;
  style?: React.CSSProperties;
};

/**
 * Napis pikselowy z neonowa poswiata i wejsciem litera po literze.
 */
export const NeonType: React.FC<Props> = ({
  text,
  size,
  color = COLORS.cream,
  ghost,
  font = FONTS.display,
  weight = 400,
  letterSpacing = 0.08,
  from = 0,
  stagger = 2,
  mode = 'drop',
  glow = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const chars = [...text];

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        color,
        letterSpacing: size * letterSpacing,
        // letter-spacing dokleja odstep takze za ostatnia litera - kompensujemy,
        // zeby napis byl naprawde wysrodkowany
        paddingLeft: size * letterSpacing,
        textShadow: neonText(ghost ?? color, glow),
        whiteSpace: 'pre',
        ...style,
      }}
    >
      {chars.map((ch, i) => {
        const t = Math.max(
          0,
          Math.min(1, (frame - from - i * stagger) / 10),
        );
        const e = easeOutBack(t);

        let transform = '';
        if (mode === 'drop') {
          transform = `translateY(${(1 - e) * -size * 0.9}px)`;
        } else if (mode === 'pop') {
          transform = `scale(${0.2 + 0.8 * e})`;
        } else if (mode === 'flip') {
          transform = `rotateX(${(1 - e) * 90}deg)`;
        }

        const f = t > 0.99 ? flicker(frame, `nt-${text}-${i}`) : 1;

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform,
              opacity: mode === 'none' ? 1 : Math.min(1, t * 2.2) * f,
              transformOrigin: 'center bottom',
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};
