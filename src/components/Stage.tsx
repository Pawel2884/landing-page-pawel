import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';

export const STAGE_W = 1920;
export const STAGE_H = 1080;

/**
 * Sceny projektowane sa w stalej siatce 1920x1080.
 * Stage skaluje je do aktualnego formatu (16:9, 9:16, 1:1),
 * dzieki czemu jedna kompozycja obsluguje wszystkie kadry reklamy.
 * Tla (siatka, czastki, CRT) sa poza Stage - zawsze wypelniaja caly kadr.
 */
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {width, height} = useVideoConfig();
  const scale = Math.min(width / STAGE_W, height / STAGE_H);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: STAGE_W,
          height: STAGE_H,
          position: 'relative',
          flexShrink: 0,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
