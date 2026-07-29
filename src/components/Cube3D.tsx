import React from 'react';

type Props = {
  size: number;
  color: string;
  /** Krycie scianek (krawedzie zostaja pelne). */
  fill?: number;
  glow?: number;
  /** true = tylko przod, gora i prawy bok (taniej, gdy obrot jest niewielki). */
  cheap?: boolean;
  style?: React.CSSProperties;
};

/** 0..1 -> dwuznakowy kanal alfa w zapisie hex. */
const alpha = (v: number): string =>
  Math.round(Math.max(0, Math.min(1, v)) * 255)
    .toString(16)
    .padStart(2, '0');

const face = (
  size: number,
  color: string,
  fill: number,
  glow: number,
  transform: string,
  shade: number,
): React.CSSProperties => ({
  position: 'absolute',
  width: size,
  height: size,
  left: 0,
  top: 0,
  transform,
  background: `${color}${alpha(fill * shade)}`,
  border: `1px solid ${color}`,
  boxShadow: glow
    ? `0 0 ${6 * glow}px ${color}, inset 0 0 ${8 * glow}px ${color}99`
    : undefined,
  backfaceVisibility: 'hidden',
});

/** Pojedynczy woksel: szescian z neonowymi krawedziami, czyste CSS 3D. */
export const Cube3D: React.FC<Props> = ({
  size,
  color,
  fill = 0.35,
  glow = 1,
  cheap = false,
  style,
}) => {
  const h = size / 2;
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <div style={face(size, color, fill, glow, `translateZ(${h}px)`, 1)} />
      <div
        style={face(
          size,
          color,
          fill,
          glow * 0.6,
          `rotateY(90deg) translateZ(${h}px)`,
          0.7,
        )}
      />
      <div
        style={face(
          size,
          color,
          fill,
          glow * 0.6,
          `rotateX(90deg) translateZ(${h}px)`,
          1.3,
        )}
      />
      {cheap ? null : (
        <>
          <div
            style={face(
              size,
              color,
              fill,
              glow * 0.5,
              `rotateY(180deg) translateZ(${h}px)`,
              0.6,
            )}
          />
          <div
            style={face(
              size,
              color,
              fill,
              glow * 0.5,
              `rotateY(-90deg) translateZ(${h}px)`,
              0.7,
            )}
          />
          <div
            style={face(
              size,
              color,
              fill,
              glow * 0.4,
              `rotateX(-90deg) translateZ(${h}px)`,
              0.45,
            )}
          />
        </>
      )}
    </div>
  );
};
