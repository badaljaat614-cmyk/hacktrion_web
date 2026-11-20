"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/* ─── types ─────────────────────────────────────────────── */

export type CCItem = {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
};

type Props = {
  items: CCItem[];
  preset?: "cylinder" | "orbit" | "wheel" | "panorama";
  intro?: "assemble" | "rise" | "spin" | "none";
  cardWidth?: number;
  aspectRatio?: number;
  gap?: number;
  curve?: number;
  tilt?: number;
  perspective?: number;
  autoplay?: "drift" | "step" | "off";
  speed?: number;
  interval?: number;
  direction?: "left" | "right";
  draggable?: boolean;
  momentum?: number;
  snap?: boolean;
  pauseOnHover?: boolean;
  focusOnClick?: boolean;
  parallax?: number;
  stretch?: number;
  depthFade?: number;
  fadeColor?: string;
  innerShade?: number;
  cornerRadius?: number;
  captions?: boolean;
  onChange?: (index: number) => void;
  onItemClick?: (item: CCItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
};

/* ─── constants ─────────────────────────────────────────── */

const PRESETS = {
  cylinder:  { axis: "y", tilt: -5,  perspective: 2500, curve: 1,    spread: 1,    inward: false, billboard: false, backfaces: true,  window: 0   },
  orbit:     { axis: "y", tilt: -16, perspective: 1500, curve: 0,    spread: 1.45, inward: false, billboard: true,  backfaces: false, window: 0   },
  wheel:     { axis: "x", tilt: 0,   perspective: 1800, curve: 0,    spread: 1,    inward: false, billboard: false, backfaces: true,  window: 1.7 },
  panorama:  { axis: "y", tilt: 0,   perspective: 0,    curve: 1,    spread: 1,    inward: true,  billboard: false, backfaces: false, window: 0   },
} as const;

const INTRO_LENGTH = { assemble: 1500, rise: 1400, spin: 1800, none: 0 } as const;
const TILES        = 8;
const OVERLAP      = 2.5;
const DRAG_THRESHOLD = 5;
const SPRING       = 118;
const SETTLE_SPEED = 9;
const CAPTION_SPACE = 76;
const SWAP_LENGTH  = 700;
const SWAP_SPREAD  = 420;
const TO_RAD       = Math.PI / 180;

const clamp  = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const wrap   = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;
const easeOut      = (t: number) => 1 - Math.pow(1 - t, 4);
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

const rotateX = (p: number[], deg: number) => {
  const r = deg * TO_RAD, c = Math.cos(r), s = Math.sin(r);
  return [p[0], p[1]*c - p[2]*s, p[1]*s + p[2]*c];
};
const rotateY = (p: number[], deg: number) => {
  const r = deg * TO_RAD, c = Math.cos(r), s = Math.sin(r);
  return [p[0]*c + p[2]*s, p[1], -p[0]*s + p[2]*c];
};

/* ─── digits ────────────────────────────────────────────── */

function Digits({ value }: { value: number }) {
  return (
    <span className="cc-digits">
      {String(value).padStart(2, "0").split("").map((d, i) => (
        <span key={i} className="cc-digit">
          <span className="cc-reel" style={{ transform: `translateY(${-Number(d) * 10}%)` }}>
            {"0123456789".split("").map(n => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ─── reduced motion ────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const q = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!q) return;
    const u = () => setV(q.matches);
    u(); q.addEventListener?.("change", u);
    return () => q.removeEventListener?.("change", u);
  }, []);
  return v;
}

/* ─── main component ────────────────────────────────────── */

export default function CircularCarousel({
  items,
  preset        = "cylinder",
  intro         = "rise",
  cardWidth     = 220,
  aspectRatio   = 1,
  gap           = 25,
  curve,
  tilt,
  perspective,
  autoplay      = "drift",
  speed         = 14,
  interval      = 3,
  direction     = "left",
  draggable     = true,
  momentum      = 0.6,
  snap          = true,
  pauseOnHover  = true,
  focusOnClick  = true,
  parallax      = 0.3,
  stretch       = 0.5,
  depthFade     = 0.55,
  fadeColor     = "#000000",
  innerShade    = 0.6,
  cornerRadius  = 12,
  captions      = false,
  onChange,
  onItemClick,
  className     = "",
  style,
}: Props) {
  const incoming = items?.length ? items : [];
  const [list, setList]       = useState(incoming);
  const [leaving, setLeaving] = useState<{ id: number; items: CCItem[]; delays: number[] } | null>(null);
  const count   = list.length;
  const shape   = (preset in PRESETS ? preset : "cylinder") as keyof typeof PRESETS;
  const layout  = PRESETS[shape];
  const axis    = layout.axis;
  const tiltVal = tilt  ?? layout.tilt;
  const reduced = usePrefersReducedMotion();

  const cardW = Math.max(40, cardWidth);
  const cardH = cardW / clamp(aspectRatio, 0.2, 5);
  const along = axis === "x" ? cardH : cardW;
  const step  = 360 / count;
  const curveVal = layout.billboard ? 0 : clamp(curve ?? layout.curve, 0, 1);

  const radius = useMemo(() => {
    const n = Math.max(count, 3);
    const pitch = (along + gap) * layout.spread;
    const chord = pitch / (2 * Math.sin(Math.PI / n));
    const arc   = (n * pitch) / (2 * Math.PI);
    return Math.max(chord + (arc - chord) * curveVal, along * 0.6);
  }, [count, along, gap, curveVal, layout.spread]);

  const tiles = useMemo(() => {
    const total  = curveVal > 0.001 ? TILES : 1;
    const length = along / total;
    const bend   = curveVal > 0.001 ? radius / curveVal : 0;
    return Array.from({ length: total }, (_, i) => {
      const start  = i * length - (i > 0 ? OVERLAP / 2 : 0);
      const end    = (i + 1) * length + (i < total - 1 ? OVERLAP / 2 : 0);
      const center = (start + end) / 2 - along / 2;
      const alpha  = bend ? center / bend : 0;
      const shift  = bend ? bend * Math.sin(alpha) : center;
      const sink   = bend ? bend * (1 - Math.cos(alpha)) : 0;
      const depth  = layout.inward ? sink : -sink;
      const turn   = ((layout.inward ? -alpha : alpha) * 180) / Math.PI;
      const move   = axis === "x"
        ? `translate3d(0px,${shift}px,${depth}px) rotateX(${-turn}deg)`
        : `translate3d(${shift}px,0px,${depth}px) rotateY(${turn}deg)`;
      return { index: i, total, start, end, size: end - start, move };
    });
  }, [along, axis, curveVal, layout.inward, radius]);

  const rootRef    = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const cameraRef  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const wakeRef    = useRef(() => {});
  const measureRef = useRef(() => {});
  const activeRef  = useRef(0);
  const [active,   setActive]   = useState(0);
  const [ready,    setReady]    = useState(false);
  const [dragging, setDragging] = useState(false);
  const readyRef   = useRef(false);
  readyRef.current = ready;

  const stateRef = useRef({
    angle: 0, velocity: 0, target: null as number | null,
    dir: 0, press: null as null | { id: number; x: number; y: number; angle: number; moved: boolean; origin: number; samples: { time: number; angle: number }[] },
    drag: false, hover: false,
    pointer: { inside: false, x: 0, y: 0 },
    yaw: 0, pitch: 0,
    intro: null as null | { type: string; start: number },
    introDone: false, holdUntil: 0, stepAt: 0,
    suppressClick: false, wheelTimer: 0 as ReturnType<typeof setTimeout> | number,
    fit: 1, shift: 0, drop: 0, last: 0,
  });

  const settingsRef = useRef({ count, step, radius, layout, axis, tilt: tiltVal,
    perspective: layout.inward ? radius : (perspective ?? layout.perspective),
    cardW, cardH, intro: (reduced ? "none" : intro) as string,
    autoplay: (reduced ? "off" : autoplay) as string,
    speed, interval: Math.max(0.5, interval), draggable,
    momentum: clamp(momentum, 0, 1), snap, pauseOnHover,
    parallax: reduced ? 0 : clamp(parallax, 0, 1),
    stretch: reduced ? 0 : clamp(stretch, 0, 1),
    depthFade: clamp(depthFade, 0, 1), captions, reduced,
  });

  settingsRef.current = { count, step, radius, layout, axis, tilt: tiltVal,
    perspective: layout.inward ? radius : (perspective ?? layout.perspective),
    cardW, cardH, intro: reduced ? "none" : intro,
    autoplay: reduced ? "off" : autoplay,
    speed, interval: Math.max(0.5, interval), draggable,
    momentum: clamp(momentum, 0, 1), snap, pauseOnHover,
    parallax: reduced ? 0 : clamp(parallax, 0, 1),
    stretch: reduced ? 0 : clamp(stretch, 0, 1),
    depthFade: clamp(depthFade, 0, 1), captions, reduced,
  };

  const onChangeRef    = useRef(onChange);
  onChangeRef.current  = onChange;
  const directionSign  = (direction === "right" ? 1 : -1) * (layout.inward ? -1 : 1);

  useEffect(() => { stateRef.current.dir = directionSign; wakeRef.current(); }, [directionSign]);

  const incomingRef = useRef(incoming);
  incomingRef.current = incoming;
  const listRef = useRef(list);
  listRef.current = list;
  const sourcesKey = incoming.map(i => i.src).join("|");

  useEffect(() => {
    let cancelled = false;
    const next    = incomingRef.current;
    const smooth  = readyRef.current && next.length === listRef.current.length;
    if (!smooth) { setReady(false); setLeaving(null); setList(next); }
    const sources = next.slice(0, 16).map(i => i.src);
    const load    = (src: string) => new Promise<void>(res => {
      const img = new window.Image(); img.decoding = "async";
      img.onload = () => (img.decode ? img.decode().then(res, res) : res());
      img.onerror = () => res(); img.src = src;
    });
    const timeout = new Promise<void>(res => setTimeout(res, 2400));
    Promise.race([Promise.all(sources.map(load)), timeout]).then(() => {
      if (cancelled) return;
      const st = stateRef.current;
      if (smooth) {
        const previous = listRef.current;
        const s = settingsRef.current;
        if (!s.reduced && previous !== next) {
          setLeaving(cur => ({ id: (cur?.id || 0) + 1, items: previous,
            delays: previous.map((_, idx) => (Math.abs(wrap(idx * s.step + st.angle)) / 180) * SWAP_SPREAD),
          }));
        }
        setList(next); wakeRef.current(); return;
      }
      st.introDone = false; st.intro = null; setReady(true); wakeRef.current();
    });
    return () => { cancelled = true; };
  }, [sourcesKey]); // eslint-disable-line

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setLeaving(null), SWAP_LENGTH + SWAP_SPREAD + 80);
    return () => clearTimeout(t);
  }, [leaving]);

  useLayoutEffect(() => {
    const root   = rootRef.current;
    const stage  = stageRef.current;
    const camera = cameraRef.current;
    const ring   = ringRef.current;
    if (!root || !stage || !camera || !ring) return;

    const state = stateRef.current;
    let raf = 0, visible = true;
    const nearest = (a: number) => Math.round(a / settingsRef.current.step) * settingsRef.current.step;

    const measure = () => {
      const s    = settingsRef.current;
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const room  = s.captions ? CAPTION_SPACE : 0;
      const width = rect.width * 0.94;
      const height = (rect.height - room) * 0.92;
      const P = s.perspective;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      if (s.layout.inward) {
        minX = -width/2; maxX = width/2; minY = -s.cardH/2; maxY = s.cardH/2;
      } else {
        const corners: [number,number][] = [[-s.cardW/2,-s.cardH/2],[s.cardW/2,-s.cardH/2],[-s.cardW/2,s.cardH/2],[s.cardW/2,s.cardH/2]];
        const limit = s.layout.window ? s.layout.window * s.step : 180;
        for (let a = -limit; a <= limit; a += limit/24) {
          for (const [cx,cy] of corners) {
            let p: number[];
            if (s.axis === "x")          p = rotateY(rotateX([cx,cy,s.radius],-a),s.tilt);
            else if (s.layout.billboard) { const c=rotateY([0,0,s.radius],a); p=rotateX([c[0]+cx,cy,c[2]],s.tilt); }
            else                          p = rotateX(rotateY([cx,cy,s.radius],a),s.tilt);
            p = [p[0],p[1],p[2]-s.radius];
            if (p[2] >= P*0.95) continue;
            const k = P/(P-p[2]);
            minX=Math.min(minX,p[0]*k); maxX=Math.max(maxX,p[0]*k);
            minY=Math.min(minY,p[1]*k); maxY=Math.max(maxY,p[1]*k);
          }
        }
      }
      const spanX = Math.max(maxX-minX,1), spanY = Math.max(maxY-minY,1);
      const fit   = Math.min(1, width/spanX, height/spanY);
      state.fit   = fit;
      state.shift = -((minY+maxY)/2)*fit - room/2;
      state.drop  = s.axis==="x" ? (rect.width/fit)*0.55+s.cardW : (rect.height/fit)*0.55+s.cardH;
      stage.style.perspective = `${P}px`;
      stage.style.transform   = `translate3d(0,${state.shift}px,0) scale(${fit})`;
    };
    measureRef.current = measure;

    const introCard = (elapsed: number, landing: number) => {
      if (!state.intro) return { radius: 1, lift: 0 };
      const type  = state.intro.type;
      const reach = Math.abs(wrap(landing + state.angle));
      if (type === "assemble") {
        const delay = (reach/180)*420;
        const p = easeOut(clamp((elapsed-delay)/1080,0,1));
        return { radius: 1+0.6*(1-p), lift: 0 };
      }
      if (type === "rise") {
        const delay = (reach/180)*480;
        const p = easeOutQuint(clamp((elapsed-delay)/900,0,1));
        return { radius: 1, lift: (1-p)*state.drop };
      }
      if (type === "spin") {
        const p = easeOut(clamp(elapsed/INTRO_LENGTH.spin,0,1));
        return { radius: 1+0.28*(1-p), lift: 0 };
      }
      return { radius: 1, lift: 0 };
    };

    const advance = (s: typeof settingsRef.current, dt: number, now: number) => {
      if (!state.introDone && readyRef.current) {
        if (!state.intro) {
          if (s.intro==="none") state.introDone=true;
          else state.intro = { type:s.intro, start:now };
        }
        if (state.intro && now-state.intro.start >= INTRO_LENGTH[state.intro.type as keyof typeof INTRO_LENGTH]) {
          state.intro=null; state.introDone=true;
        }
      }
      const paused = (s.pauseOnHover&&state.hover)||state.drag||now<state.holdUntil;
      const cruise  = s.autoplay==="drift"&&!paused&&!state.intro ? s.speed*state.dir : 0;
      let busy = Boolean(state.intro)||state.drag;
      if (state.drag||state.intro) { state.velocity=state.drag?state.velocity:0; }
      else if (state.target!==null) {
        let rem=dt;
        const damp=2*Math.sqrt(SPRING);
        while(rem>0){const h=Math.min(rem,1/240);const acc=SPRING*(state.target-state.angle)-damp*state.velocity;state.velocity+=acc*h;state.angle+=state.velocity*h;rem-=h;}
        if(Math.abs(state.target-state.angle)<0.004&&Math.abs(state.velocity)<0.03){state.angle=state.target;state.velocity=0;state.target=null;}
        busy=true;
      } else {
        const tau=0.18+s.momentum*1.5;
        state.velocity+=(cruise-state.velocity)*(1-Math.exp(-dt/tau));
        state.angle+=state.velocity*dt;
        if(cruise===0&&s.snap&&Math.abs(state.velocity)<SETTLE_SPEED) state.target=nearest(state.angle);
        busy=busy||cruise!==0||Math.abs(state.velocity)>0.01||state.target!==null;
      }
      if (s.autoplay==="step"&&!paused&&!state.intro&&state.introDone) {
        if(!state.stepAt) state.stepAt=now+s.interval*1000;
        if(now>=state.stepAt){state.target=(state.target??nearest(state.angle))+s.step*state.dir;state.stepAt=now+s.interval*1000;}
        busy=true;
      } else { state.stepAt=0; }
      if(now<state.holdUntil) busy=true;
      const ease=1-Math.exp(-dt/0.35);
      const aimYaw   = state.pointer.inside ? state.pointer.x*s.parallax*9 : 0;
      const aimPitch = state.pointer.inside ? -state.pointer.y*s.parallax*6 : 0;
      state.yaw  +=(aimYaw-state.yaw)*ease;
      state.pitch+=(aimPitch-state.pitch)*ease;
      if(Math.abs(aimYaw-state.yaw)>0.01||Math.abs(aimPitch-state.pitch)>0.01) busy=true;
      return busy;
    };

    const render = (s: typeof settingsRef.current, now: number) => {
      const elapsed = state.intro ? now-state.intro.start : 0;
      const swell   = 1+s.stretch*0.12*Math.min(1,Math.abs(state.velocity)/420);
      let spinOff   = 0;
      if(state.intro?.type==="spin"){const p=easeOut(clamp(elapsed/INTRO_LENGTH.spin,0,1));spinOff=-300*state.dir*(1-p);}
      else if(state.intro?.type==="assemble"){const p=easeOut(clamp(elapsed/INTRO_LENGTH.assemble,0,1));spinOff=-32*state.dir*(1-p);}
      const angle = state.angle+spinOff;
      const R     = s.radius*swell;
      if(s.axis==="x"){
        camera.style.transform=`translate3d(0,0,${-R}px) rotateY(${s.tilt+state.yaw}deg) rotateX(${state.pitch}deg)`;
        ring.style.transform=`rotateX(${-angle}deg)`;
      } else if(s.layout.inward){
        camera.style.transform=`translate3d(0,0,${s.perspective-1}px) rotateX(${s.tilt+state.pitch}deg) rotateY(${state.yaw}deg)`;
        ring.style.transform=`rotateY(${angle}deg)`;
      } else {
        camera.style.transform=`translate3d(0,0,${-R}px) rotateX(${s.tilt+state.pitch}deg) rotateY(${state.yaw}deg)`;
        ring.style.transform=`rotateY(${angle}deg)`;
      }
      for(let i=0;i<s.count;i++){
        const card=cardRefs.current[i]; if(!card) continue;
        const base=i*s.step;
        const mod=introCard(elapsed,base);
        const r=R*mod.radius;
        let tr: string;
        if(s.axis==="x")          tr=`rotateX(${-base}deg) translateZ(${r}px)`;
        else if(s.layout.inward)   tr=`rotateY(${base}deg) translateZ(${-r}px)`;
        else {
          tr=`rotateY(${base}deg) translateZ(${r}px)`;
          if(s.layout.billboard) tr+=` rotateY(${-(base+angle)}deg)`;
        }
        if(mod.lift) tr+=s.axis==="x"?` translateX(${mod.lift}px)`:`translateY(${mod.lift}px)`;
        card.style.transform=tr;
        const world=wrap(base+angle);
        const facing=Math.cos(world*TO_RAD);
        if(s.layout.inward) card.style.visibility=Math.abs(world)>86?"hidden":"";
        const fade=s.depthFade*Math.pow((1-facing)/2,1.25);
        card.style.setProperty("--cc-depth",fade.toFixed(3));
      }
      const idx=(((Math.round(-state.angle/s.step)%s.count)+s.count)%s.count)||0;
      if(idx!==activeRef.current){activeRef.current=idx;setActive(idx);onChangeRef.current?.(idx);}
    };

    const frame = (now: number) => {
      raf=0;
      const s=settingsRef.current;
      const dt=state.last?Math.min((now-state.last)/1000,0.05):1/60;
      state.last=now;
      const busy=advance(s,dt,now);
      render(s,now);
      if(busy&&visible&&!document.hidden) raf=requestAnimationFrame(frame);
      else state.last=0;
    };
    const wake = () => { if(!raf&&visible&&!document.hidden) raf=requestAnimationFrame(frame); };
    wakeRef.current=wake;

    document.addEventListener("visibilitychange",()=>{ if(document.hidden){cancelAnimationFrame(raf);raf=0;state.last=0;}else wake(); });
    const resizeObs=new ResizeObserver(()=>{measure();wake();});
    resizeObs.observe(root);
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)wake();else{cancelAnimationFrame(raf);raf=0;state.last=0;}});
    io.observe(root);

    root.addEventListener("wheel",(e:WheelEvent)=>{
      const s=settingsRef.current; if(!s.draggable) return;
      const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:0; if(!delta) return;
      e.preventDefault();
      const pxr=180/(Math.PI*s.radius*state.fit);
      state.target=null; state.angle-=delta*pxr*(s.layout.inward?-1:1);
      state.velocity=-delta*pxr*(s.layout.inward?-1:1)*30; state.holdUntil=performance.now()+1600;
      clearTimeout(state.wheelTimer as number);
      state.wheelTimer=setTimeout(()=>{if(settingsRef.current.snap)state.target=nearest(state.angle+state.velocity*0.12);wake();},140);
      wake();
    },{passive:false});

    measure(); render(settingsRef.current,performance.now()); wake();
    return ()=>{cancelAnimationFrame(raf);resizeObs.disconnect();io.disconnect();};
  }, []); // eslint-disable-line

  useLayoutEffect(()=>{measureRef.current();wakeRef.current();},[radius,cardW,cardH,tiltVal,perspective,preset,captions,count]);
  useEffect(()=>{wakeRef.current();});

  const focusIndex=useCallback((idx:number)=>{
    const st=stateRef.current,s=settingsRef.current;
    let t=-idx*s.step; t+=360*Math.round((st.angle-t)/360);
    st.target=t; st.holdUntil=performance.now()+2800; wakeRef.current();
  },[]);

  const stepBy=useCallback((delta:number)=>{
    const st=stateRef.current,s=settingsRef.current;
    const base=st.target??Math.round(st.angle/s.step)*s.step;
    st.target=base-delta*s.step*(s.layout.inward?-1:1);
    st.holdUntil=performance.now()+2800; wakeRef.current();
  },[]);

  const updatePointer=(e:React.PointerEvent)=>{
    const rect=rootRef.current!.getBoundingClientRect();
    const p=stateRef.current.pointer;
    p.x=clamp(((e.clientX-rect.left)/rect.width)*2-1,-1,1);
    p.y=clamp(((e.clientY-rect.top)/rect.height)*2-1,-1,1);
  };

  const handlePointerDown=(e:React.PointerEvent)=>{
    const st=stateRef.current; st.suppressClick=false;
    if(!draggable||e.button!==0) return;
    st.press={id:e.pointerId,x:e.clientX,y:e.clientY,angle:st.angle,moved:false,origin:0,samples:[]};
  };
  const handlePointerMove=(e:React.PointerEvent)=>{
    const st=stateRef.current;
    if(e.pointerType==="mouse"){st.pointer.inside=true;updatePointer(e);}
    const press=st.press; if(!press||press.id!==e.pointerId){wakeRef.current();return;}
    const s=settingsRef.current;
    const delta=s.axis==="x"?e.clientY-press.y:e.clientX-press.x;
    const cross=s.axis==="x"?e.clientX-press.x:e.clientY-press.y;
    if(!press.moved){
      if(Math.abs(delta)<DRAG_THRESHOLD) return;
      if(Math.abs(cross)>Math.abs(delta)*1.2&&e.pointerType!=="mouse"){st.press=null;return;}
      press.moved=true;press.origin=delta;st.drag=true;st.target=null;st.velocity=0;setDragging(true);
      try{rootRef.current!.setPointerCapture(e.pointerId);}catch{}
    }
    const pxr=180/(Math.PI*s.radius*st.fit);
    st.angle=press.angle+(delta-press.origin)*pxr*(s.layout.inward?-1:1);
    const now=performance.now();
    press.samples.push({time:now,angle:st.angle});
    while(press.samples.length>2&&now-press.samples[0].time>110) press.samples.shift();
    wakeRef.current();
  };
  const releasePointer=(e:React.PointerEvent)=>{
    const st=stateRef.current,press=st.press;
    if(!press||press.id!==e.pointerId) return;
    st.press=null; if(!press.moved) return;
    st.drag=false; setDragging(false); st.suppressClick=true;
    const s=settingsRef.current;
    const first=press.samples[0],last=press.samples[press.samples.length-1];
    const span=(last.time-first.time)/1000;
    const vel=span>0.008?clamp((last.angle-first.angle)/span,-1400,1400):0;
    st.velocity=vel; if(Math.abs(vel)>60) st.dir=Math.sign(vel);
    const coasting=s.autoplay==="drift"&&!(s.pauseOnHover&&st.hover&&e.pointerType==="mouse");
    if(s.snap&&!coasting){const tau=0.18+s.momentum*1.5;st.target=Math.round((st.angle+vel*tau*0.55)/s.step)*s.step;}
    wakeRef.current();
  };

  const renderTile=(item:CCItem,tile:ReturnType<typeof tiles.find> & object,back:boolean,index:number)=>{
    if(!tile) return null;
    const t=tile as typeof tiles[0];
    const strip=back?t.total-1-t.index:t.index;
    const first=strip===0,last=strip===t.total-1;
    const r="var(--cc-radius)";
    const fr=axis==="x"?`${first?r:0} ${first?r:0} ${last?r:0} ${last?r:0}`:`${first?r:0} ${last?r:0} ${last?r:0} ${first?r:0}`;
    const offset=back?along-t.end:t.start;
    const box=axis==="x"?{left:-cardW/2,top:-t.size/2,width:cardW,height:t.size}:{left:-t.size/2,top:-cardH/2,width:t.size,height:cardH};
    const ph=axis==="x"?{left:0,top:-offset,width:cardW,height:cardH}:{left:-offset,top:0,width:cardW,height:cardH};
    const flip=axis==="x"?" rotateX(180deg)":" rotateY(180deg)";
    const gone=leaving?.items[index];
    return (
      <div key={`${back?"b":"f"}${t.index}`} className="cc-tile"
        style={{...box,transform:t.move+(back?flip:"")}} aria-hidden="true">
        <div className="cc-frame" style={{height:axis==="x"?t.size:cardH,borderRadius:fr}}>
          <img className="cc-photo" src={item.src} alt="" draggable={false} decoding="async" style={ph} />
          {gone&&(
            <img key={`lv-${leaving!.id}`} className="cc-photo cc-photo-leaving"
              src={gone.src} alt="" draggable={false} decoding="async"
              style={{...ph,animationDelay:`${Math.round(leaving!.delays[index])}ms`}} />
          )}
          {back&&<div className="cc-inner"/>}
          <div className="cc-shade"/>
        </div>
      </div>
    );
  };

  const current=list[active]||list[0];
  const label=current?current.title||current.alt||`Image ${active+1}`:"";

  return (
    <>
      <div
        ref={rootRef}
        className={`cc-root ${className}`.trim()}
        style={{ ...style, "--cc-fade":fadeColor, "--cc-radius":`${Math.max(0,cornerRadius)}px`, "--cc-inner":(1-clamp(innerShade,0,1)).toFixed(3) } as CSSProperties}
        role="region" aria-roledescription="carousel" aria-label="Image carousel"
        tabIndex={0} data-axis={axis} data-shape={shape}
        data-ready={ready?"":undefined} data-draggable={draggable?"":undefined}
        data-dragging={dragging?"":undefined}
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
        onPointerUp={releasePointer} onPointerCancel={releasePointer}
        onPointerEnter={e=>{if(e.pointerType==="mouse"){stateRef.current.hover=true;wakeRef.current();}}}
        onPointerLeave={e=>{if(e.pointerType==="mouse"){stateRef.current.hover=false;stateRef.current.pointer.inside=false;wakeRef.current();}}}
        onClick={e=>{
          const st=stateRef.current; if(st.suppressClick){st.suppressClick=false;return;}
          const card=(e.target as Element).closest?.("[data-cc-idx]");
          if(!card) return;
          const idx=Number(card.getAttribute("data-cc-idx"));
          if(focusOnClick) focusIndex(idx);
          onItemClick?.(list[idx],idx);
        }}
        onKeyDown={e=>{
          const fwd=axis==="x"?"ArrowDown":"ArrowRight",bwd=axis==="x"?"ArrowUp":"ArrowLeft";
          if(e.key===fwd) stepBy(1);
          else if(e.key===bwd) stepBy(-1);
          else if(e.key==="Home") focusIndex(0);
          else if(e.key==="End") focusIndex(count-1);
          else if(e.key==="Enter"||e.key===" ") onItemClick?.(list[activeRef.current],activeRef.current);
          else return;
          e.preventDefault();
        }}
      >
        <div className="cc-view">
          <div ref={stageRef} className="cc-stage">
            <div ref={cameraRef} className="cc-camera">
              <div ref={ringRef} className="cc-ring">
                {list.map((item,i)=>(
                  <div key={i} ref={el=>{cardRefs.current[i]=el;}} className="cc-card"
                    data-cc-idx={i} role="group" aria-roledescription="slide"
                    aria-label={`${item.title||item.alt||`Image ${i+1}`}, ${i+1} of ${count}`}>
                    {tiles.map(t=>renderTile(item,t,false,i))}
                    {layout.backfaces&&tiles.map(t=>renderTile(item,t,true,i))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {captions&&current&&(
          <div className="cc-caption" aria-hidden="true">
            <span key={active} className="cc-title">
              {current.title||current.alt}
              {current.subtitle&&<span className="cc-subtitle">{current.subtitle}</span>}
            </span>
            <span className="cc-count">
              <Digits value={active+1}/>
              <span className="cc-slash">/</span>
              <span>{String(count).padStart(2,"0")}</span>
            </span>
          </div>
        )}
        <div className="cc-live" aria-live="polite" aria-atomic="true">
          {`${label}, ${active+1} of ${count}`}
        </div>
      </div>

      <style jsx global>{`
        .cc-root {
          --cc-fade: #000000; --cc-radius: 12px; --cc-inner: 0.4;
          position: relative; width: 100%; height: 100%; overflow: hidden;
          outline: none; touch-action: pan-y; user-select: none;
          -webkit-user-select: none; -webkit-tap-highlight-color: transparent;
        }
        .cc-root[data-axis='x'] { touch-action: pan-x; }
        .cc-root[data-draggable] { cursor: grab; }
        .cc-root[data-dragging]  { cursor: grabbing; }
        .cc-root:focus-visible   { box-shadow: inset 0 0 0 2px rgba(124,58,237,0.5); }
        .cc-view { position: absolute; inset: 0; }
        .cc-root[data-shape='wheel'] .cc-view {
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
          mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
        }
        .cc-root[data-shape='panorama'] .cc-view {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        .cc-stage {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; opacity: 0; transition: opacity 0.45s ease;
        }
        .cc-root[data-ready] .cc-stage { opacity: 1; }
        .cc-camera, .cc-ring, .cc-card { width: 0; height: 0; transform-style: preserve-3d; }
        .cc-camera { position: relative; }
        .cc-ring, .cc-card { position: absolute; left: 0; top: 0; }
        .cc-tile {
          position: absolute; outline: 1px solid transparent;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        .cc-frame { position: absolute; left: 0; top: 0; width: 100%; overflow: hidden; }
        .cc-photo {
          position: absolute; display: block; max-width: none;
          object-fit: cover; pointer-events: none; user-select: none;
          -webkit-user-drag: none;
        }
        .cc-photo-leaving { animation: cc-leave 700ms cubic-bezier(0.33,1,0.68,1) both; }
        .cc-shade, .cc-inner { position: absolute; inset: 0; pointer-events: none; }
        .cc-shade { background: var(--cc-fade); opacity: var(--cc-depth, 0); }
        .cc-inner { background: #000; opacity: var(--cc-inner); }
        .cc-caption {
          position: absolute; left: 0; right: 0; bottom: 22px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 0 16px; color: inherit; text-align: center;
          pointer-events: none; animation: cc-reveal 900ms ease both;
        }
        .cc-title {
          display: flex; max-width: 100%; flex-direction: column; align-items: center;
          font-size: 15px; font-weight: 500; line-height: 1.35;
          animation: cc-title 520ms cubic-bezier(0.22,1,0.36,1);
        }
        .cc-subtitle { font-weight: 400; opacity: 0.6; }
        .cc-count {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 12px; font-variant-numeric: tabular-nums; opacity: 0.5;
        }
        .cc-slash { opacity: 0.6; }
        .cc-digits { display: inline-flex; }
        .cc-digit  { display: inline-block; height: 1em; overflow: hidden; }
        .cc-reel   { display: flex; flex-direction: column; transition: transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .cc-reel > span { height: 1em; }
        .cc-live   { position: absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }

        @keyframes cc-title { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cc-leave  { from { opacity:1; } to { opacity:0; } }
        @keyframes cc-reveal { from { opacity:0; } to { opacity:1; } }
        @media (prefers-reduced-motion: reduce) {
          .cc-stage, .cc-reel { transition: none; }
          .cc-caption, .cc-title { animation: none; }
        }
      `}</style>
    </>
  );
}
