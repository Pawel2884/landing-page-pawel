import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setEntryPoint('./src/index.ts');

// Scena zbudowana jest na transformacjach CSS 3D + filtrach.
// Renderer "angle" daje najbardziej przewidywalny wynik w headless Chrome.
Config.setChromiumOpenGlRenderer('angle');

// Wyzsza jakosc JPEG dla klatek posrednich (duzo gradientow i swiatla).
Config.setJpegQuality(95);
Config.setCrf(17);
