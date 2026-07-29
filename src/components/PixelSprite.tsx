import React, {useMemo} from 'react';
import {SPRITES, SpriteName} from '../art/sprites';

type Props = {
  name: SpriteName;
  /** Rozmiar w px (sprite jest kwadratowy). */
  size: number;
  color: string;
  /** Kolor dla znaku '+', domyslnie bialy nalot. */
  light?: string;
  /** Kolor dla znaku '-', domyslnie przyciemnienie. */
  dark?: string;
  /** Sila poswiaty (0 = brak). */
  glow?: number;
  opacity?: number;
  style?: React.CSSProperties;
};

/**
 * Rysuje sprite 12x12 jako SVG z ostrymi krawedziami.
 * SVG zamiast divow - duzo mniej wezlow DOM przy wielu ikonach na ekranie.
 */
export const PixelSprite: React.FC<Props> = ({
  name,
  size,
  color,
  light = '#ffffff',
  dark = '#00000088',
  glow = 0.8,
  opacity = 1,
  style,
}) => {
  const map = SPRITES[name];

  const rects = useMemo(() => {
    const out: {x: number; y: number; fill: string}[] = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const ch = map[y][x];
        if (ch === '.') continue;
        out.push({
          x,
          y,
          fill: ch === '+' ? light : ch === '-' ? dark : color,
        });
      }
    }
    return out;
  }, [map, color, light, dark]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${map[0].length} ${map.length}`}
      shapeRendering="crispEdges"
      style={{
        opacity,
        filter: glow > 0 ? `drop-shadow(0 0 ${6 * glow}px ${color})` : undefined,
        ...style,
      }}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  );
};
