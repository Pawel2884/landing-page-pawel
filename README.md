# Claude w praktyce — reklama 30 s (Remotion)

Animowany spot reklamowy: **30 sekund, 3D, neony, styl pixel-art, bez lektora, napisy PL.**
Wszystko generowane kodem w [Remotion](https://remotion.dev) — bez plików wideo, bez After Effects.

---

## Szybki start

```bash
npm install
npm run dev          # podgląd w przeglądarce (Remotion Studio)
npm run render       # eksport MP4 1920x1080
```

Gotowy plik ląduje w `out/claude-w-praktyce.mp4`.

### Inne formaty

```bash
npm run render:pionowo    # 1080x1920 — Reels / TikTok / Stories
npm run render:kwadrat    # 1080x1080 — feed
```

Te same sceny, automatycznie przeskalowane (`src/components/Stage.tsx`).

---

## Co się dzieje na ekranie

| Czas | Scena | Co widać |
|------|-------|----------|
| 0:00–0:05 | **Intro** | Włączenie kineskopu, przelot przez neonowy tunel, znak Claude składa się z lecących wokseli 3D |
| 0:05–0:10 | **Problem** | Karuzela 3D z obowiązkami (maile, raporty, arkusze, kod) rozkręca się do czerwoności, zegar odlicza dobę |
| 0:10–0:15 | **Kod** | Okno edytora wlatuje w 3D, Claude wystukuje kod, testy przechodzą na zielono |
| 0:15–0:20 | **Analiza** | Strumień dokumentów wpada w rdzeń i wychodzi jako gotowe wnioski + wykres |
| 0:20–0:24,5 | **Automatyzacja** | Izometryczny graf: Gmail, Sheets, Kalendarz, Repo, CRM podłączone do Claude, dane pulsują po przewodach |
| 0:24,5–0:30 | **Finał** | Fala uderzeniowa, wordmark „CLAUDE / W PRAKTYCE", CTA |

Cięcia między scenami spina glitch (rozjazd kanałów RGB), błysk i wstrząs kamery.

---

## Jak to zmienić

### Teksty i czasy — jeden plik

**`src/script.ts`** trzyma wszystko, co widz czyta:

- `CAPTIONS` — napisy PL (klatka od / do + treść)
- `BRAND` — wordmark, tagline, **adres w CTA** (domyślnie `claude.ai` — podmień na swój)
- `TASK_CARDS`, `CODE_LINES`, `TERMINAL_LINES`, `INSIGHT_BARS`, `TOOLS` — teksty wewnątrz scen
- `SCENES` — długości scen
- `BEATS` — klatki, w których „uderza bit" (błysk + wstrząs)

Pomocnik `s(sekundy)` przelicza sekundy na klatki, więc czasy pisze się po ludzku: `s(12.6)`.

> **Napisy:** trzymaj do ~40 znaków w linii. Dłuższe zaczną się łamać i zjedzą kadr.

### Kolory

**`src/theme.ts`** — paleta, fonty i dwa helpery poświaty (`neonText`, `neonBox`).
Zmiana `COLORS.clayBright` przemalowuje cały znak Claude w każdej scenie.

### Grafika pixel-art

**`src/art/sprites.ts`** — ikony rysowane ręcznie w siatce 12×12, jako tekst:

```
'.##########.',
'.#++++++++#.',
```

`#` = kolor główny, `+` = rozjaśnienie, `-` = cień, `.` = przezroczyste.
Dodanie nowej ikony to dopisanie 12 linijek — komponent `PixelSprite` sam zamieni to na SVG.

Tam też siedzi `BURST` — mapa 15×15, z której budowany jest znak-gwiazda 3D.

---

## Struktura

```
src/
  index.ts              rejestracja kompozycji
  Root.tsx              3 formaty: 16:9, 9:16, 1:1
  ClaudeAd.tsx          montaż scen + glitch, błyski, wstrząs
  script.ts             SCENARIUSZ — teksty i czasy
  theme.ts              paleta i poświaty
  fonts.ts              fonty (data URI, zero sieci)
  lib/anim.ts           easingi, bity, drżenie kamery, migotanie
  art/sprites.ts        pixel-art
  components/
    Stage.tsx           skalowanie 1920x1080 -> dowolny format
    Backdrop.tsx        tło
    NeonGrid.tsx        siatka 3D w perspektywie (synthwave)
    PixelWarp.tsx       chmura pikseli lecąca na widza
    VoxelBurst.tsx      znak Claude z wokseli 3D
    Cube3D.tsx          pojedynczy woksel (CSS 3D)
    PixelSprite.tsx     ikony 12x12
    NeonType.tsx        napis pixel z wejściem litera po literze
    Subtitles.tsx       napisy PL
    Glitch.tsx          rozjazd kanałów RGB
    CrtOverlay.tsx      linie skanujące, maska RGB, ziarno, winieta
  scenes/               sześć scen
scripts/
  build-fonts.mjs       generator src/generated/font-data.ts
```

Całe 3D to transformacje CSS (`perspective`, `transform-style: preserve-3d`) — żadnego WebGL,
więc render jest przewidywalny i działa wszędzie tam, gdzie działa Chrome.

---

## Fonty

Trzy fonty, wbudowane w kod jako data URI (`src/generated/font-data.ts`):

- **Press Start 2P** — nagłówki, 8-bit
- **Pixelify Sans** — napisy PL (czytelny przy dłuższych zdaniach)
- **JetBrains Mono** — kod i liczniki

Każdy w subsetach `latin` + `latin-ext`, więc **ą ć ę ł ń ó ś ź ż** działają.

> Uwaga: Press Start 2P rysuje `Ś` w formie małej litery, dlatego CTA używa Pixelify Sans.
> Jeśli dopisujesz tekst z polskimi znakami do nagłówka pisanego `FONTS.display`, sprawdź podgląd.

Po zmianie listy fontów: `node scripts/build-fonts.mjs`.

---

## Dźwięk

Spot jest **bez lektora** — całą treść niosą napisy. Podkład muzyczny można dorzucić jedną linijką
w `src/ClaudeAd.tsx`:

```tsx
import {Audio, staticFile} from 'remotion';
// ...
<Audio src={staticFile('muzyka.mp3')} volume={0.6} />
```

(plik wrzuć do `public/`). `BEATS` w `src/script.ts` wyznacza klatki uderzeń — dopasuj je do
swojego utworu, a błyski i wstrząsy zagrają do rytmu.

---

## Uwaga o znaku graficznym

Gwiazda zbudowana z wokseli to **stylizacja pixel-art**, nie oficjalny znak Anthropic.
Do zastosowań komercyjnych podmień ją na oficjalne materiały brandowe
i sprawdź warunki użycia marki.
