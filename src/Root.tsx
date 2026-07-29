import React from 'react';
import {Composition} from 'remotion';
import {ClaudeAd} from './ClaudeAd';
import {DURATION_IN_FRAMES, FPS} from './script';
import {loadFonts} from './fonts';

loadFonts();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Wersja glowna - YouTube, strona, LinkedIn */}
      <Composition
        id="ClaudeWPraktyce"
        component={ClaudeAd}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Reels / TikTok / Stories */}
      <Composition
        id="ClaudeWPraktycePionowo"
        component={ClaudeAd}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* Feed kwadratowy */}
      <Composition
        id="ClaudeWPraktyceKwadrat"
        component={ClaudeAd}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
