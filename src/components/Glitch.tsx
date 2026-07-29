import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';

type Props = {
  /** 0 = czysto, 1 = pelna awaria sygnalu. */
  amount: number;
  children: React.ReactNode;
  /** Ile pikseli rozjazdu kanalow przy amount = 1. */
  split?: number;
  /** Czy dorzucic poziome wycinki przesuniete w bok. */
  slices?: boolean;
  seed?: string;
};

/** Filtry SVG izolujace kanaly barwne - potrzebne do aberracji chromatycznej. */
export const GlitchFilters: React.FC = () => (
  <svg width={0} height={0} style={{position: 'absolute'}} aria-hidden>
    <defs>
      <filter id="chan-r" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
        />
      </filter>
      <filter id="chan-gb" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
        />
      </filter>
    </defs>
  </svg>
);

/**
 * Rozjazd kanalow RGB + wycinki obrazu. Przy amount ~0 renderuje dzieci
 * bez zadnego narzutu, wiec mozna nim opakowac cala scene.
 */
export const Glitch: React.FC<Props> = ({
  amount,
  children,
  split = 26,
  slices = true,
  seed = 'g',
}) => {
  const frame = useCurrentFrame();

  if (amount <= 0.002) {
    return <>{children}</>;
  }

  const jitter = (random(`${seed}-${frame}`) - 0.5) * 2;
  const dx = split * amount * (0.6 + Math.abs(jitter));

  const sliceCount = slices ? 5 : 0;

  return (
    <AbsoluteFill>
      {/* kanal czerwony w lewo */}
      <AbsoluteFill
        style={{
          filter: 'url(#chan-r)',
          transform: `translateX(${-dx}px)`,
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </AbsoluteFill>

      {/* kanaly zielony + niebieski w prawo */}
      <AbsoluteFill
        style={{
          filter: 'url(#chan-gb)',
          transform: `translateX(${dx}px)`,
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </AbsoluteFill>

      {/* poziome pasy zaklocen - tanie, a robia cala robote */}
      {new Array(sliceCount).fill(0).map((_, i) => {
        const k = `${seed}-s-${i}-${Math.floor(frame / 2)}`;
        const on = random(`${k}-on`) < 0.5 * amount + 0.2;
        if (!on) return null;
        const top = random(k) * 100;
        const h = 0.4 + random(`${k}-h`) * 4 * amount;
        const shift = (random(`${k}-x`) - 0.5) * 260 * amount;
        const tint =
          random(`${k}-c`) > 0.5
            ? 'rgba(0,240,255,0.55)'
            : 'rgba(255,45,149,0.55)';
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: shift,
              right: -shift,
              top: `${top}%`,
              height: `${h}%`,
              background: `linear-gradient(90deg, transparent, ${tint} 20%, rgba(255,255,255,0.7) 50%, ${tint} 80%, transparent)`,
              mixBlendMode: 'screen',
              opacity: 0.5 + 0.5 * amount,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
