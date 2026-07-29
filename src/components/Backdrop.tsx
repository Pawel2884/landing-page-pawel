import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  /** Glowny kolor poswiaty atmosferycznej. */
  tint?: string;
  /** Drugi kolor - z przeciwnej strony kadru. */
  tint2?: string;
  intensity?: number;
};

/** Ciemna baza kadru z dwoma zrodlami swiatla. */
export const Backdrop: React.FC<Props> = ({
  tint = COLORS.purple,
  tint2 = COLORS.cyan,
  intensity = 1,
}) => (
  <AbsoluteFill
    style={{
      background: [
        `radial-gradient(ellipse 70% 55% at 22% 18%, ${tint}${Math.round(
          38 * intensity,
        )
          .toString(16)
          .padStart(2, '0')} 0%, transparent 62%)`,
        `radial-gradient(ellipse 65% 50% at 82% 84%, ${tint2}${Math.round(
          30 * intensity,
        )
          .toString(16)
          .padStart(2, '0')} 0%, transparent 60%)`,
        `linear-gradient(175deg, ${COLORS.deep} 0%, ${COLORS.void} 55%, ${COLORS.deeper} 100%)`,
      ].join(', '),
    }}
  />
);
