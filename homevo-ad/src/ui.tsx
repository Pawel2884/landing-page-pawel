import React, {useLayoutEffect, useState} from 'react';
import {AbsoluteFill, Img, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, W, COL, CAPTION_TOP} from './theme';
import {CAPS} from './script';
import {FONT_CSS} from './font';

// Font hostowany lokalnie: render nie zalezy od siegania po zewnetrzny CDN,
// a zakres latin-ext gwarantuje poprawne polskie znaki.
export const fontFamily = 'InterLocal';

if (typeof document !== 'undefined' && !document.getElementById('homevo-font')) {
  const st = document.createElement('style');
  st.id = 'homevo-font';
  st.textContent = FONT_CSS;
  document.head.appendChild(st);
}

/** Wstrzymuje klatke tylko do momentu, az font jest gotowy do rysowania. */
export const useFontReady = () => {
  const [handle] = useState(() => delayRender('Font', {timeoutInMilliseconds: 25000, retries: 3}));
  useLayoutEffect(() => {
    let live = true;
    const done = () => {
      if (live) {
        live = false;
        continueRender(handle);
      }
    };
    const fonts = (document as any).fonts;
    if (!fonts) {
      done();
      return;
    }
    Promise.race([
      Promise.all([
        fonts.load('900 120px InterLocal', 'ĄĘŁŃŚŻŹÓĆ 220 zł m²'),
        fonts.load('800 60px InterLocal', 'ĄĘŁŃŚŻŹÓĆ'),
        fonts.load('700 60px InterLocal', 'ĄĘŁŃŚŻŹÓĆ'),
        fonts.load('600 60px InterLocal', 'ĄĘŁŃŚŻŹÓĆ'),
      ]).then(() => fonts.ready),
      fonts.ready,
    ]).then(done, done);
    return () => {
      live = false;
    };
  }, [handle]);
};

export const base: React.CSSProperties = {
  fontFamily,
  WebkitFontSmoothing: 'antialiased',
  textRendering: 'geometricPrecision',
};

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Wejscie elementu: sprezyste podniesienie i pojawienie sie. */
export const useEnter = (at: number, damping = 200) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - at, fps, config: {damping, mass: 0.7, stiffness: 130}});
  return {
    o: interpolate(frame - at, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    y: interpolate(s, [0, 1], [34, 0]),
    s,
  };
};

type PhotoProps = {
  src: string;
  mode?: 'bleed' | 'strip';
  fx?: number;
  fy?: number;
  zoom?: [number, number];
  pan?: [number, number];
  from: number;
  len: number;
  grade?: string;
  stripTop?: number;
  stripH?: number;
};

/** Warstwa zdjeciowa: kadr pelnoekranowy albo pas panoramiczny na rozmytym tle. */
export const Photo: React.FC<PhotoProps> = ({
  src, mode = 'bleed', fx = 0.5, fy = 0.5, zoom = [1.02, 1.12], pan = [0, 0],
  from, len, grade = 'none', stripTop = 556, stripH = 608,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, from + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const z = interpolate(easeOut(p), [0, 1], zoom);
  const px = interpolate(easeOut(p), [0, 1], [0, pan[0]]);
  const py = interpolate(easeOut(p), [0, 1], [0, pan[1]]);
  const url = staticFile(src);

  const img = (extra: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: `${fx * 100}% ${fy * 100}%`,
    ...extra,
  });

  if (mode === 'bleed') {
    return (
      <AbsoluteFill style={{overflow: 'hidden', background: C.navyDeep}}>
        <Img src={url} style={img({transform: `scale(${z}) translate(${px}px, ${py}px)`, filter: grade})} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: C.navyDeep}}>
      <Img src={url} style={img({transform: 'scale(1.6)', filter: 'blur(46px) brightness(0.34) saturate(0.8)'})} />
      <div style={{position: 'absolute', top: stripTop, left: 0, width: W, height: stripH, overflow: 'hidden'}}>
        <Img src={url} style={img({transform: `scale(${z}) translate(${px}px, ${py}px)`, filter: grade})} />
      </div>
      <div style={{position: 'absolute', top: stripTop - 3, left: 0, width: W, height: 3, background: 'rgba(255,255,255,0.16)'}} />
      <div style={{position: 'absolute', top: stripTop + stripH, left: 0, width: W, height: 3, background: 'rgba(255,255,255,0.16)'}} />
    </AbsoluteFill>
  );
};

/** Przyciemnienia u gory i u dolu, zeby tekst zawsze mial kontrast. */
export const Scrim: React.FC<{top?: number; bottom?: number}> = ({top = 0.72, bottom = 0.86}) => (
  <>
    <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(7,21,39,${top}) 0%, rgba(7,21,39,0.18) 34%, rgba(7,21,39,0) 46%)`}} />
    <AbsoluteFill style={{background: `linear-gradient(0deg, rgba(7,21,39,${bottom}) 0%, rgba(7,21,39,0.42) 22%, rgba(7,21,39,0) 44%)`}} />
  </>
);

export const Col: React.FC<{top: number; children: React.ReactNode; style?: React.CSSProperties}> = ({top, children, style}) => (
  <div style={{position: 'absolute', top, left: (W - COL) / 2, width: COL, textAlign: 'center', ...base, ...style}}>{children}</div>
);

/** Wiersz naglowka wjezdzajacy z dolu z maska. */
export const HeadLine: React.FC<{
  at: number; text: string; size: number; color?: string; weight?: number; top: number; lh?: number;
}> = ({at, text, size, color = C.white, weight = 900, top, lh = 1.02}) => {
  const {o, y} = useEnter(at);
  return (
    <div style={{
      position: 'absolute', top, left: (W - COL) / 2, width: COL, textAlign: 'center', ...base,
      fontSize: size, fontWeight: weight, color, lineHeight: lh, letterSpacing: -size * 0.022,
      opacity: o, transform: `translateY(${y}px)`, textShadow: '0 6px 34px rgba(0,0,0,0.55)',
      textWrap: 'balance' as never,
    }}>{text}</div>
  );
};

export const Pill: React.FC<{
  at: number; text: string; top: number; bg?: string; fg?: string; size?: number; icon?: React.ReactNode;
}> = ({at, text, top, bg = 'rgba(255,255,255,0.14)', fg = C.white, size = 34, icon}) => {
  const {o, y} = useEnter(at);
  return (
    <div style={{position: 'absolute', top, width: W, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${y}px)`}}>
      <div style={{
        ...base, display: 'flex', alignItems: 'center', gap: 16, background: bg, color: fg,
        padding: '18px 34px', borderRadius: 100, fontSize: size, fontWeight: 800, letterSpacing: 0.4,
        border: '2px solid rgba(255,255,255,0.20)', backdropFilter: 'blur(8px)',
      }}>
        {icon ? <span style={{display: 'flex', alignItems: 'center'}}>{icon}</span> : null}
        {text}
      </div>
    </div>
  );
};

/** Napisy lektora. Wyroznione slowo kluczowe w kolorze marki. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const cap = CAPS.find((c) => frame >= c.a && frame < c.b);
  if (!cap) return null;
  const inP = interpolate(frame - cap.a, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const outP = interpolate(cap.b - frame, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = Math.min(inP, outP);

  let parts: React.ReactNode[] = [cap.text];
  if (cap.hi && cap.text.includes(cap.hi)) {
    const i = cap.text.indexOf(cap.hi);
    parts = [
      cap.text.slice(0, i),
      <span key="h" style={{color: C.amber}}>{cap.hi}</span>,
      cap.text.slice(i + cap.hi.length),
    ];
  }

  return (
    <div style={{
      position: 'absolute', top: CAPTION_TOP, left: (W - 800) / 2, width: 800,
      display: 'flex', justifyContent: 'center',
      opacity: o, transform: `translateY(${(1 - inP) * 12}px)`,
    }}>
      <div style={{
        ...base, background: 'rgba(7,21,39,0.80)', border: '2px solid rgba(255,255,255,0.13)',
        borderRadius: 26, padding: '22px 34px', color: C.white, fontSize: 46, fontWeight: 700,
        lineHeight: 1.22, textAlign: 'center', letterSpacing: -0.6, maxWidth: 800,
      }}>{parts}</div>
    </div>
  );
};

/** Uczciwe oznaczenie: ujecia sa wizualizacja, nie zdjeciami realizacji klienta. */
export const VizTag: React.FC = () => (
  <div style={{
    ...base, position: 'absolute', left: 84, top: 1436, color: 'rgba(255,255,255,0.55)',
    fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
  }}>Wizualizacja</div>
);

export const Wordmark: React.FC<{top: number; size?: number; at?: number}> = ({top, size = 46, at = 0}) => {
  const {o, y} = useEnter(at);
  return (
    <div style={{position: 'absolute', top, width: W, textAlign: 'center', opacity: o, transform: `translateY(${y}px)`}}>
      <div style={{...base, color: C.white, fontSize: size, fontWeight: 900, letterSpacing: size * 0.13}}>HOME EVOLUTION</div>
      <div style={{width: 96, height: 5, background: C.amber, margin: '16px auto 0', borderRadius: 4}} />
    </div>
  );
};


type IconProps = {size?: number; color?: string};

export const IcoCheck: React.FC<IconProps> = ({size = 34, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4.5 12.5l5 5 10-11" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IcoArrow: React.FC<IconProps & {dir?: 'up' | 'down' | 'right'}> = ({size = 34, color = 'currentColor', dir = 'right'}) => {
  const rot = dir === 'up' ? -90 : dir === 'down' ? 90 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{transform: `rotate(${rot}deg)`}}>
      <path d="M4 12h15M13 6l6 6-6 6" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const IcoBoards: React.FC<IconProps> = ({size = 34, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="5" rx="1.4" stroke={color} strokeWidth={2.2} />
    <rect x="3" y="10.5" width="18" height="5" rx="1.4" stroke={color} strokeWidth={2.2} />
    <rect x="3" y="17" width="18" height="3.4" rx="1.2" stroke={color} strokeWidth={2.2} />
  </svg>
);

export const IcoRender: React.FC<IconProps> = ({size = 34, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 20l7-7 4 4 7-7" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6.5" cy="6.5" r="2.2" stroke={color} strokeWidth={2.2} />
  </svg>
);
