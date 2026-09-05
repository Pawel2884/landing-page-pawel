import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, W, H, COL} from './theme';
import {VO, S} from './script';
import {Photo, Scrim, HeadLine, Pill, Captions, VizTag, Wordmark, base, useEnter, fontFamily,
  IcoCheck, IcoArrow, IcoBoards, IcoRender, useFontReady} from './ui';

const IMG_HOOK = 'img/hook_estimate.jpg';
const IMG_SITE = 'img/scaffold_stalled.jpg';
const IMG_DONE = 'img/hero_after.jpg';

/** Scena z krotkim przenikaniem na wejsciu, zeby ciecia nie klapaly. */
const Scene: React.FC<{a: number; b: number; fade?: number; children: React.ReactNode}> = ({a, b, fade = 5, children}) => (
  <Sequence from={Math.max(0, a - fade)} durationInFrames={b - Math.max(0, a - fade)} layout="none">
    <FadeIn fade={a === 0 ? 0 : fade}>{children}</FadeIn>
  </Sequence>
);

const FadeIn: React.FC<{fade: number; children: React.ReactNode}> = ({fade, children}) => {
  const f = useCurrentFrame();
  if (fade === 0) return <AbsoluteFill>{children}</AbsoluteFill>;
  const p = interpolate(f, [0, fade], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Krotki najazd zamiast czystego przenikania: zmiana czyta sie jako ruch, nie jako podwojny obraz.
  const dy = interpolate(p, [0, 1], [26, 0]);
  return <AbsoluteFill style={{opacity: p * p, transform: `translateY(${dy}px)`}}>{children}</AbsoluteFill>;
};

const Blurred: React.FC<{src: string; opacity?: number; scale?: number}> = ({src, opacity = 0.35, scale = 1.7}) => (
  <AbsoluteFill style={{overflow: 'hidden', background: C.navyDeep}}>
    <Img
      src={staticFile(src)}
      style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover',
        transform: `scale(${scale})`, filter: 'blur(52px) saturate(0.75)', opacity}}
    />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(7,21,39,0.90), rgba(12,31,56,0.78))'}} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* 0 do 4,7 s: hook. Pierwsza klatka od razu niesie temat i napiecie.   */
/* ------------------------------------------------------------------ */
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const shake = f < 12 ? Math.sin(f * 1.7) * (1 - f / 12) * 9 : 0;
  const pop = interpolate(f, [0, 8], [1.09, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Photo src={IMG_HOOK} from={0} len={140} fx={0.5} fy={0.40} zoom={[1.04, 1.16]}
        grade="contrast(1.10) saturate(0.58) brightness(0.86)" />
      <Scrim top={0.80} bottom={0.88} />
      <div style={{position: 'absolute', top: 372, width: W, display: 'flex', justifyContent: 'center',
        transform: `translateX(${shake}px) scale(${pop})`}}>
        <div style={{
          ...base, background: C.red, color: C.white, fontSize: 150, fontWeight: 900,
          letterSpacing: -4, padding: '6px 42px 22px', borderRadius: 14, transform: 'rotate(-2.4deg)',
          boxShadow: '0 22px 60px rgba(0,0,0,0.55)', lineHeight: 1.1,
        }}>DOPŁATA</div>
      </div>
      <div style={{position: 'absolute', top: 586, width: W, textAlign: 'center'}}>
        <div style={{...base, color: C.white, fontSize: 94, fontWeight: 900, letterSpacing: -2.4,
          textShadow: '0 8px 36px rgba(0,0,0,0.7)'}}>W TRAKCIE PRAC</div>
      </div>
      <VizTag />
    </AbsoluteFill>
  );
};

/* 4,7 do 9,4 s: identyfikacja odbiorcy. */
const Ident: React.FC = () => (
  <AbsoluteFill>
    <Photo src={IMG_SITE} mode="strip" stripTop={560} stripH={600} from={0} len={141}
      fx={0.5} fy={0.5} zoom={[1.0, 1.07]} grade="saturate(0.62) contrast(1.05) brightness(0.92)" />
    <HeadLine at={2} top={324} size={60} color={C.white} text="PLANUJESZ DOCIEPLENIE" />
    <HeadLine at={10} top={396} size={80} color={C.amber} text="I ELEWACJĘ DOMU?" />
    <VizTag />
  </AbsoluteFill>
);

/* 9,4 do 14,0 s: zapowiedz konkretnej informacji, ktora domykam pozniej. */
const Tease: React.FC = () => {
  const f = useCurrentFrame();
  const {o, y} = useEnter(16);
  const lens = interpolate(f, [30, 100], [-150, 150], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Blurred src={IMG_SITE} opacity={0.30} />
      <HeadLine at={2} top={326} size={58} color={C.white} text="PO CZYM POZNAĆ" />
      <HeadLine at={10} top={396} size={92} color={C.amber} text="DOBRĄ WYCENĘ?" />
      <div style={{position: 'absolute', top: 566, left: (W - 520) / 2, width: 520, height: 440,
        background: C.cream, borderRadius: 22, opacity: o, transform: `translateY(${y}px)`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)', overflow: 'hidden'}}>
        <div style={{height: 84, background: C.navy}} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{height: 16, margin: '34px 44px 0', borderRadius: 8,
            background: i === 4 ? C.amber : '#C9D2DC', width: i === 4 ? 200 : 432 - i * 26}} />
        ))}
      </div>
      <div style={{position: 'absolute', top: 700, left: W / 2 - 80 + lens, width: 160, height: 160,
        borderRadius: 999, border: `9px solid ${C.amber}`, boxShadow: '0 0 0 6px rgba(12,31,56,0.35)', opacity: o}} />
      <Pill at={44} top={1064} text="Wracam do tego za chwilę" size={34}
        bg="rgba(245,166,35,0.18)" fg={C.amber} />
    </AbsoluteFill>
  );
};

/* 14,0 do 20,7 s: co dolicza sie w trakcie prac. */
const Costs: React.FC = () => {
  const f = useCurrentFrame();
  const Row: React.FC<{at: number; top: number; label: string}> = ({at, top, label}) => {
    const {o, y} = useEnter(at);
    return (
      <div style={{position: 'absolute', top, left: (W - COL) / 2, width: COL, display: 'flex',
        alignItems: 'center', gap: 22, opacity: o, transform: `translateX(${-y}px)`}}>
        <div style={{...base, width: 66, height: 66, borderRadius: 999, background: C.red, color: C.white,
          fontSize: 46, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>+</div>
        <div style={{...base, color: C.white, fontSize: 38, fontWeight: 800, lineHeight: 1.14,
          letterSpacing: -0.8, textAlign: 'left'}}>{label}</div>
      </div>
    );
  };
  const grow = interpolate(f, [126, 168], [300, 720], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const barsIn = useEnter(120);
  const Bar: React.FC<{top: number; label: string; w: number; color: string}> = ({top, label, w, color}) => (
    <div style={{position: 'absolute', top, left: (W - COL) / 2, width: COL, opacity: barsIn.o}}>
      <div style={{...base, color: 'rgba(255,255,255,0.66)', fontSize: 26, fontWeight: 800, letterSpacing: 3,
        textAlign: 'left', marginBottom: 10}}>{label}</div>
      <div style={{height: 30, width: w, background: color, borderRadius: 999}} />
    </div>
  );
  return (
    <AbsoluteFill>
      <Blurred src={IMG_HOOK} opacity={0.24} />
      <HeadLine at={2} top={320} size={54} color={C.white} text="CO SIĘ DOLICZA W TRAKCIE" />
      <Row at={10} top={428} label="MATERIAŁ" />
      <Row at={48} top={528} label="RUSZTOWANIE" />
      <Row at={86} top={628} label={'ROBOTA, O KTÓREJ\nNIKT WCZEŚNIEJ NIE MÓWIŁ'.replace('\n', ' ')} />
      <Bar top={776} label="UMÓWIONA CENA" w={300} color={C.amber} />
      <Bar top={886} label="CENA NA KOŃCU" w={grow} color={C.red} />
      <HeadLine at={150} top={1000} size={40} color="rgba(255,255,255,0.80)" weight={700}
        text="Wtedy cena z wyceny przestaje być ceną." />
    </AbsoluteFill>
  );
};

/* 20,7 do 26,2 s: prace stoja. */
const Stalled: React.FC = () => (
  <AbsoluteFill>
    <Photo src={IMG_SITE} from={0} len={167} fx={0.5} fy={0.64} zoom={[1.02, 1.13]}
      grade="saturate(0.42) contrast(1.08) brightness(0.80)" />
    <Scrim top={0.82} bottom={0.86} />
    <HeadLine at={3} top={328} size={90} color={C.white} text="DOM STOI" />
    <HeadLine at={13} top={428} size={90} color={C.amber} text="W RUSZTOWANIU" />
    <Pill at={72} top={566} text="A koszt rośnie" icon={<IcoArrow dir="up" size={34} />} size={38}
      bg="rgba(217,58,43,0.92)" fg={C.white} />
    <VizTag />
  </AbsoluteFill>
);

/* 26,2 do 29,1 s: zwrot. Kolor wraca, wchodzi marka. */
const Turn: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = interpolate(f, [0, 28], [100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sat = interpolate(f, [0, 40], [0.5, 1.05], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Photo src={IMG_SITE} from={0} len={85} fx={0.5} fy={0.5} zoom={[1.13, 1.16]}
        grade="saturate(0.4) brightness(0.72)" />
      <AbsoluteFill style={{clipPath: `inset(0 ${wipe}% 0 0)`}}>
        <Photo src={IMG_DONE} from={0} len={85} fx={0.5} fy={0.56} zoom={[1.12, 1.03]}
          grade={`saturate(${sat}) brightness(1.0)`} />
        <Scrim top={0.66} bottom={0.7} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: `${100 - wipe}%`, top: 0, width: 7, height: H,
        background: C.amber, opacity: wipe > 1 ? 0.95 : 0, boxShadow: '0 0 40px rgba(245,166,35,0.8)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(60% 26% at 50% 44%, rgba(7,21,39,0.86) 0%, rgba(7,21,39,0) 100%)'}} />
      <Wordmark at={28} top={618} size={54} />
      <HeadLine at={44} top={790} size={40} color="rgba(255,255,255,0.80)" weight={800} text="ROBI TO INACZEJ" />
      <VizTag />
    </AbsoluteFill>
  );
};

/* 29,1 do 32,1 s: obietnica ceny znanej przed startem. */
const Promise2: React.FC = () => (
  <AbsoluteFill>
    <Photo src={IMG_DONE} from={0} len={90} fx={0.5} fy={0.56} zoom={[1.03, 1.10]} grade="saturate(1.02)" />
    <Scrim top={0.8} bottom={0.84} />
    <HeadLine at={2} top={326} size={76} color={C.white} text="KONKRETNA CENA" />
    <HeadLine at={10} top={416} size={60} color={C.amber} text="PRZED STARTEM PRAC" />
    <Pill at={32} top={512} text="Bez dopłat w trakcie realizacji" icon={<IcoCheck size={34} />} size={36}
      bg="rgba(47,163,107,0.92)" fg={C.white} />
    <VizTag />
  </AbsoluteFill>
);

/* 32,1 do 36,2 s: konkretna stawka z kampanii. */
const Price: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 4, fps, config: {damping: 200, mass: 0.9, stiffness: 90}});
  const n = Math.round(interpolate(s, [0, 1], [0, 220]));
  const {o, y} = useEnter(2);
  return (
    <AbsoluteFill>
      <Blurred src={IMG_DONE} opacity={0.42} scale={1.5} />
      <HeadLine at={0} top={372} size={34} color="rgba(255,255,255,0.66)" weight={800} text="CENA ZA WYKONANIE" />
      <div style={{position: 'absolute', top: 452, width: W, display: 'flex', justifyContent: 'center',
        alignItems: 'flex-start', gap: 18, opacity: o, transform: `translateY(${y}px)`}}>
        <div style={{...base, color: C.amber, fontSize: 300, fontWeight: 900, lineHeight: 0.94,
          letterSpacing: -14, fontVariantNumeric: 'tabular-nums'}}>{n}</div>
        <div style={{...base, color: C.white, fontSize: 110, fontWeight: 900, marginTop: 34}}>zł</div>
      </div>
      <div style={{position: 'absolute', top: 806, width: W, textAlign: 'center'}}>
        <div style={{...base, color: C.white, fontSize: 68, fontWeight: 800, letterSpacing: -1}}>netto za m²</div>
      </div>
      <div style={{width: 220, height: 6, background: C.amber, borderRadius: 4,
        position: 'absolute', top: 902, left: (W - 220) / 2}} />
      <HeadLine at={40} top={946} size={38} color="rgba(255,255,255,0.72)" weight={600}
        text="Cenę poznajesz przed rozpoczęciem prac." />
    </AbsoluteFill>
  );
};

/* 36,2 do 41,0 s: materialy i gwarancja z kampanii. */
const Specs: React.FC = () => {
  const Card: React.FC<{at: number; top: number; label: string; value: string; glyph: React.ReactNode}> =
    ({at, top, label, value, glyph}) => {
      const {o, y} = useEnter(at);
      return (
        <div style={{position: 'absolute', top, left: (W - COL) / 2, width: COL, height: 148,
          background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.20)', borderRadius: 26,
          display: 'flex', alignItems: 'center', gap: 26, padding: '0 28px',
          opacity: o, transform: `translateY(${y}px)`, backdropFilter: 'blur(6px)'}}>
          <div style={{width: 92, height: 92, borderRadius: 20, background: C.amber, color: C.navyDeep,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{glyph}</div>
          <div style={{textAlign: 'left'}}>
            <div style={{...base, color: 'rgba(255,255,255,0.62)', fontSize: 25, fontWeight: 800, letterSpacing: 3}}>{label}</div>
            <div style={{...base, color: C.white, fontSize: 38, fontWeight: 900, letterSpacing: -1,
              marginTop: 4, whiteSpace: 'nowrap'}}>{value}</div>
          </div>
        </div>
      );
    };
  return (
    <AbsoluteFill>
      <Blurred src={IMG_DONE} opacity={0.34} scale={1.6} />
      <HeadLine at={2} top={318} size={54} color={C.white} text="MATERIAŁY I GWARANCJA" />
      <Card at={6} top={424} label="STYROPIAN" value="TERMOORGANIKA DOM-STYR" glyph={<IcoBoards size={50} />} />
      <Card at={50} top={600} label="TYNK" value="RAUM PREMIUM" glyph={<IcoRender size={50} />} />
      <Card at={94} top={776} label="GWARANCJA" value="2 LATA" glyph={<IcoCheck size={52} />} />
    </AbsoluteFill>
  );
};

/* 41,0 do 44,3 s: opiekun kontraktu. */
const Care: React.FC = () => (
  <AbsoluteFill>
    <Photo src={IMG_DONE} from={0} len={102} fx={0.42} fy={0.60} zoom={[1.06, 1.15]} grade="saturate(1.0) brightness(0.94)" />
    <Scrim top={0.84} bottom={0.86} />
    <HeadLine at={3} top={330} size={64} color={C.white} text="OPIEKUN KONTRAKTU" />
    <HeadLine at={14} top={424} size={42} color="rgba(255,255,255,0.82)" weight={600}
      text="Jedna osoba prowadzi twoją realizację." />
    <Pill at={34} top={520} text="Od wyceny do odbioru" icon={<IcoArrow dir="right" size={32} />} size={36}
      bg="rgba(255,255,255,0.16)" fg={C.white} />
    <VizTag />
  </AbsoluteFill>
);

/* 44,3 do 47,2 s: 45 procent umow z polecen. */
const Ref: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 4, fps, config: {damping: 200, mass: 1, stiffness: 80}});
  const pct = Math.round(interpolate(s, [0, 1], [0, 45]));
  const R = 196;
  const CIRC = 2 * Math.PI * R;
  return (
    <AbsoluteFill>
      <Blurred src={IMG_DONE} opacity={0.30} scale={1.55} />
      <svg width={W} height={560} style={{position: 'absolute', top: 400, left: 0}}>
        <circle cx={W / 2} cy={260} r={R} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={26} />
        <circle cx={W / 2} cy={260} r={R} fill="none" stroke={C.amber} strokeWidth={26} strokeLinecap="round"
          strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - (pct / 100))}
          transform={`rotate(-90 ${W / 2} 260)`} />
      </svg>
      <div style={{position: 'absolute', top: 588, width: W, textAlign: 'center'}}>
        <div style={{...base, color: C.white, fontSize: 146, fontWeight: 900, letterSpacing: -6,
          fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>{pct}<span style={{color: C.amber}}>%</span></div>
      </div>
      <HeadLine at={26} top={1006} size={50} color={C.white} weight={800} text="umów pochodzi z poleceń" />
    </AbsoluteFill>
  );
};

/* 47,2 do 52,6 s: domkniecie obietnicy z poczatku. */
const Payoff: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const eq = spring({frame: f - 62, fps, config: {damping: 12, mass: 0.6, stiffness: 160}});
  const Doc: React.FC<{at: number; x: number; title: string; dir: number}> = ({at, x, title, dir}) => {
    const {o, s} = useEnter(at);
    const dx = interpolate(s, [0, 1], [46 * dir, 0]);
    const chk = spring({frame: f - 74, fps, config: {damping: 14, mass: 0.5, stiffness: 170}});
    return (
      <div style={{position: 'absolute', top: 470, left: x, width: 320, height: 400, background: C.cream,
        borderRadius: 22, opacity: o, transform: `translateX(${dx}px)`, overflow: 'hidden',
        boxShadow: '0 26px 70px rgba(0,0,0,0.45)'}}>
        <div style={{height: 74, background: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{...base, color: C.white, fontSize: 32, fontWeight: 900, letterSpacing: 3}}>{title}</span>
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{height: 14, margin: '30px 34px 0', borderRadius: 7, background: '#C9D2DC', width: 252 - i * 34}} />
        ))}
        <div style={{margin: '38px 34px 0', height: 46, borderRadius: 10, background: C.amber}} />
        <div style={{position: 'absolute', right: 20, bottom: 16, width: 54, height: 54, borderRadius: 999,
          background: C.green, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${Math.min(1, chk)})`}}><IcoCheck size={30} /></div>
      </div>
    );
  };
  return (
    <AbsoluteFill>
      <Blurred src={IMG_DONE} opacity={0.22} scale={1.6} />
      <HeadLine at={2} top={314} size={52} color={C.white} weight={800} lh={1.14}
        text="PO CZYM POZNAĆ DOBRĄ WYCENĘ?" />
      <Doc at={8} x={130} title="WYCENA" dir={-1} />
      <Doc at={20} x={590} title="FAKTURA" dir={1} />
      <div style={{position: 'absolute', top: 618, left: 450, width: 140, textAlign: 'center',
        transform: `scale(${Math.min(1.0, eq)})`}}>
        <span style={{...base, color: C.amber, fontSize: 116, fontWeight: 900, lineHeight: 1,
          textShadow: '0 8px 30px rgba(0,0,0,0.5)'}}>=</span>
      </div>
      <HeadLine at={86} top={928} size={50} color={C.white} weight={800} lh={1.2}
        text="Cena z wyceny zostaje ceną na fakturze." />
    </AbsoluteFill>
  );
};

/* 52,6 do 60,0 s: jedno wezwanie do dzialania. */
const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const card = useEnter(14);
  const bob = Math.sin(f / 9) * 8;
  const btn = 1 + Math.sin(f / 7) * 0.012;
  const Field: React.FC<{top: number; label: string}> = ({top, label}) => (
    <div style={{position: 'absolute', top, left: 40, width: 780, height: 74, background: '#EDF1F6',
      borderRadius: 16, display: 'flex', alignItems: 'center', paddingLeft: 26}}>
      <span style={{...base, color: '#8C99AA', fontSize: 32, fontWeight: 600}}>{label}</span>
    </div>
  );
  return (
    <AbsoluteFill>
      <Photo src={IMG_DONE} from={0} len={223} fx={0.5} fy={0.56} zoom={[1.0, 1.07]}
        grade="saturate(0.95) brightness(0.62)" />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(7,21,39,0.90) 0%, rgba(7,21,39,0.70) 45%, rgba(7,21,39,0.92) 100%)'}} />
      <Wordmark at={2} top={296} size={44} />
      <HeadLine at={8} top={398} size={33} color="rgba(255,255,255,0.78)" weight={800}
        text="DOCIEPLENIE I ELEWACJA DOMU" />
      <div style={{position: 'absolute', top: 476, left: 110, width: 860, height: 566, background: C.white,
        borderRadius: 32, opacity: card.o, transform: `translateY(${card.y}px)`,
        boxShadow: '0 34px 90px rgba(0,0,0,0.55)'}}>
        <div style={{position: 'absolute', top: 38, left: 40, width: 780, textAlign: 'left'}}>
          <div style={{...base, color: C.navy, fontSize: 42, fontWeight: 900, letterSpacing: -1}}>Bezpłatna wycena elewacji</div>
        </div>
        <Field top={116} label="Imię" />
        <Field top={206} label="Telefon" />
        <Field top={296} label="Metraż domu (m²)" />
        <div style={{position: 'absolute', top: 404, left: 40, width: 780, height: 104, background: C.amber,
          borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${btn})`, boxShadow: '0 12px 34px rgba(245,166,35,0.45)'}}>
          <span style={{...base, color: C.navyDeep, fontSize: 44, fontWeight: 900, letterSpacing: 0.5}}>WYPEŁNIJ FORMULARZ</span>
        </div>
      </div>
      <HeadLine at={40} top={1078} size={42} color={C.white} weight={700} lh={1.24}
        text="Dobierzemy zakres i wyliczymy cenę dla Twojego domu." />
      <div style={{position: 'absolute', top: 1224, width: W, display: 'flex', justifyContent: 'center', gap: 16}}>
        {['220 zł netto/m²', '2 lata gwarancji'].map((t, i) => {
          const e = useEnter(60 + i * 10);
          return (
            <div key={t} style={{...base, background: 'rgba(255,255,255,0.14)', border: '2px solid rgba(255,255,255,0.22)',
              color: C.white, borderRadius: 100, padding: '14px 26px', fontSize: 30, fontWeight: 800,
              opacity: e.o, transform: `translateY(${e.y}px)`}}>{t}</div>
          );
        })}
      </div>
      <div style={{position: 'absolute', top: 1320 + bob, width: W, display: 'flex', justifyContent: 'center', color: C.amber}}>
        <IcoArrow dir="down" size={64} />
      </div>
      <VizTag />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
export const Main: React.FC = () => {
  useFontReady();
  const f = useCurrentFrame();
  const speaking = VO.some((v) => f >= v.from - 5 && f <= v.from + v.dur + 8);
  // Podklad siedzi okolo 12 dB pod lektorem, w przerwach delikatnie sie otwiera.
  const musicGain = speaking ? 0.72 : 1.05;

  return (
    <AbsoluteFill style={{background: C.navyDeep, fontFamily}}>
      <Scene a={S.hook[0]} b={S.hook[1]}><Hook /></Scene>
      <Scene a={S.ident[0]} b={S.ident[1]}><Ident /></Scene>
      <Scene a={S.tease[0]} b={S.tease[1]}><Tease /></Scene>
      <Scene a={S.costs[0]} b={S.costs[1]}><Costs /></Scene>
      <Scene a={S.stalled[0]} b={S.stalled[1]}><Stalled /></Scene>
      <Scene a={S.turn[0]} b={S.turn[1]} fade={4}><Turn /></Scene>
      <Scene a={S.promise[0]} b={S.promise[1]}><Promise2 /></Scene>
      <Scene a={S.price[0]} b={S.price[1]}><Price /></Scene>
      <Scene a={S.specs[0]} b={S.specs[1]}><Specs /></Scene>
      <Scene a={S.care[0]} b={S.care[1]}><Care /></Scene>
      <Scene a={S.ref[0]} b={S.ref[1]}><Ref /></Scene>
      <Scene a={S.payoff[0]} b={S.payoff[1]}><Payoff /></Scene>
      <Scene a={S.cta[0]} b={S.cta[1]}><Cta /></Scene>

      <Captions />

      <Audio src={staticFile('audio/music.wav')} volume={musicGain} />
      <Audio src={staticFile('audio/sfx.wav')} volume={0.78} />
      {VO.map((v) => (
        <Sequence key={v.file} from={v.from} durationInFrames={v.dur + 4} layout="none">
          <Audio src={staticFile(v.file)} volume={1} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
