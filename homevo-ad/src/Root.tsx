import {Composition} from 'remotion';
import {Main} from './Video';
import {W, H, FPS, TOTAL} from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="HomevoElewacja"
    component={Main}
    durationInFrames={TOTAL}
    fps={FPS}
    width={W}
    height={H}
  />
);
