# Home Evolution — reklama wideo 60 s (docieplenie i elewacja domu)

Projekt Remotion, z ktorego powstaje plik `out/homevo-elewacja-60s.mp4`.

## Parametry wyjscia
- 1080 x 1920 px, pion 9:16
- 30 fps, 1800 klatek, dokladnie 60,000 s
- MP4, H.264, yuv420p, dzwiek AAC 192 kbps

## Uruchomienie
```bash
npm install
node tools/make-audio.mjs        # generuje muzyke i efekty do public/audio
npm run render
```
Render w tym srodowisku wymaga wskazania przegladarki:
```bash
npx remotion render src/index.ts HomevoElewacja out/homevo-elewacja-60s.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell \
  --codec=h264 --crf=20 --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=192k
```
Podglad na zywo: `npx remotion studio src/index.ts`.

## Struktura
- `src/theme.ts` — paleta, siatka, strefy bezpieczne pod nakladki Reels
- `src/script.ts` — os czasu: momenty startu lektora, napisy, granice scen
- `src/ui.tsx` — warstwa zdjeciowa, naglowki, napisy, ikony wektorowe, font
- `src/Video.tsx` — trzynascie scen skladajacych sie na film
- `tools/make-audio.mjs` — syntezator podkladu i efektow dzwiekowych

## Zasoby
- `public/vo/v1..v9.wav` — lektor PL, ElevenLabs, glos Ryszard, po przycieciu ciszy
  i normalizacji do -16 LUFS. Pliki `vo*.mp3` to material zrodlowy.
- `public/img/*.png` — ujecia wygenerowane (2048 x 1152). Sa oznaczone w filmie
  jako wizualizacja i nie moga byc podpisywane jako realizacje klienta.
- `public/audio/music.wav`, `public/audio/sfx.wav` — wygenerowane w tym projekcie,
  wiec prawa do wykorzystania komercyjnego sa czyste.
- `public/fonts/inter-*.woff2` — Inter (SIL Open Font License), hostowany lokalnie,
  zakres latin-ext daje poprawne polskie znaki.

## Co podmienic przy aktualizacji
- Logo marki: w `src/ui.tsx` komponent `Wordmark` sklada nazwe z fontu.
  Po wgraniu pliku logo do `public/img/` mozna go tam podstawic.
- Stawka, gwarancja i nazwy materialow pochodza ze screena kampanii i siedza
  w `src/Video.tsx` w scenach `Price` i `Specs`.
- Zmiana tekstu lektora wymaga ponownej generacji glosu, zmierzenia dlugosci
  plikow i aktualizacji tablicy `VO` w `src/script.ts`.
