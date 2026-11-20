"use client";

import {
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ─── types ─────────────────────────────────────────────── */

export type CarouselItem = {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
};

type Props = {
  items: (CarouselItem | string | ReactNode)[];
  baseWidth?: number;
  aspectRatio?: number;
  gap?: number;
  radius?: number;
  frame?: boolean;
  effect?: "tilt" | "slide" | "scale" | "fade";
  indicator?: "dots" | "bars" | "counter" | "none";
  arrows?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  initialIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
};

/* ─── helpers ───────────────────────────────────────────── */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const wrap  = (v: number, n: number) => ((v % n) + n) % n;
const nearest = (offset: number, n: number) => wrap(offset + n / 2, n) - n / 2;

/* ─── spring constants ──────────────────────────────────── */

const STIFFNESS = 150;
const DAMPING   = 24;

/* ─── card ──────────────────────────────────────────────── */

function Card({ item, radius }: { item: CarouselItem | string | ReactNode; radius: number }) {
  if (isValidElement(item)) {
    return (
      <div className="c-card c-custom" style={{ "--c-r": `${radius}px` } as CSSProperties}>
        {item}
      </div>
    );
  }

  const data: CarouselItem =
    typeof item === "string" ? { image: item } : (item as CarouselItem) ?? {};
  const { image, alt = "" } = data;

  return (
    <div className="c-card" style={{ "--c-r": `${radius}px` } as CSSProperties}>
      {image && (
        <img
          className="c-img"
          src={image}
          alt={alt}
          draggable={false}
          decoding="async"
        />
      )}
    </div>
  );
}

/* ─── main ──────────────────────────────────────────────── */

export default function Carousel({
  items,
  baseWidth   = 300,
  aspectRatio = 1.25,
  gap         = 0,
  radius      = 12,
  frame       = true,
  effect      = "slide",
  indicator   = "dots",
  arrows      = true,
  autoplay    = true,
  autoplayDelay    = 3500,
  pauseOnHover     = true,
  loop        = true,
  initialIndex = 0,
  onChange,
  className   = "",
  style,
}: Props) {
  const count = items.length;

  const rootRef  = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef  = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const engineRef = useRef<{
    goTo: (i: number) => void;
    step: (d: number, auto?: boolean) => void;
    sync: () => void;
  } | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const ratio  = clamp(aspectRatio, 0.3, 4);
  const [stageW, setStageW] = useState(baseWidth);
  const [viewH,  setViewH]  = useState(Math.round(baseWidth / clamp(aspectRatio, 0.3, 4)));
  const [active, setActive] = useState(() =>
    clamp(Math.round(initialIndex), 0, Math.max(0, count - 1))
  );
  const startRef    = useRef(active);
  const reportedRef = useRef(active);

  const cardW = stageW;
  const cardH = viewH;
  const span  = cardW + gap;

  const getPose = useCallback(
    (index: number, pos: number) => {
      const offset = loop ? nearest(index - pos, count) : index - pos;
      const dist   = Math.abs(offset);
      const near   = Math.min(dist, 1);
      let transform = "none";
      let opacity   = 1;
      let visible   = true;
      const layer   = 10 - Math.min(9, Math.round(dist * 2));

      if (effect === "fade") {
        visible   = dist < 1;
        opacity   = 1 - near * near * (3 - 2 * near);
        transform = `scale(${1 - 0.04 * near})`;
      } else {
        const x = offset * span;
        visible = x > -(cardW + 2) && x < stageW + 2;
        if (effect === "tilt") {
          visible   = visible && dist < 1;
          transform = `translate3d(${x}px,0,0) rotateY(${-clamp(offset, -1, 1) * 90}deg)`;
        } else if (effect === "scale") {
          const sx  = x - Math.sign(offset) * near * cardW * 0.06;
          transform = `translate3d(${sx}px,0,0) scale(${1 - 0.12 * near})`;
          opacity   = 1 - 0.5 * near;
        } else {
          transform = `translate3d(${x}px,0,0)`;
        }
      }
      return { transform, opacity, visible, layer };
    },
    [count, effect, loop, cardW, span, stageW]
  );

  useEffect(() => {
    const root  = rootRef.current;
    const stage = stageRef.current;
    const view  = viewRef.current;
    if (!root || !stage || !view) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const st = {
      p: startRef.current, v: 0,
      target: startRef.current, shown: startRef.current,
      elapsed: 0, hovered: false, focused: false,
      visible: true, wheeling: false, wheelTimer: 0,
      suppress: false, last: 0,
      drag: null as null | {
        id: number; x: number; y: number; p: number;
        from: number; moved: boolean; samples: [number, number][];
      },
    };

    let raf = 0, alive = true;

    const apply = () => {
      for (let i = 0; i < count; i++) {
        const el = slideRefs.current[i];
        if (!el) continue;
        const offset = loop ? nearest(i - st.p, count) : i - st.p;
        const dist = Math.abs(offset), near = Math.min(dist, 1);
        let tr = "none", op = 1, vis = true;
        const z = 10 - Math.min(9, Math.round(dist * 2));
        if (effect === "fade") {
          vis = dist < 1; op = 1 - near * near * (3 - 2 * near);
          tr = `scale(${1 - 0.04 * near})`;
        } else {
          const x = offset * span;
          vis = x > -(cardW + 2) && x < stageW + 2;
          if (effect === "tilt") {
            vis = vis && dist < 1;
            tr  = `translate3d(${x}px,0,0) rotateY(${-clamp(offset, -1, 1) * 90}deg)`;
          } else if (effect === "scale") {
            const sx = x - Math.sign(offset) * near * cardW * 0.06;
            tr = `translate3d(${sx}px,0,0) scale(${1 - 0.12 * near})`; op = 1 - 0.5 * near;
          } else { tr = `translate3d(${x}px,0,0)`; }
        }
        el.style.transform = tr; el.style.opacity = String(op);
        el.style.visibility = vis ? "visible" : "hidden"; el.style.zIndex = String(z);
      }
      const prog = autoplay ? clamp(st.elapsed / Math.max(600, autoplayDelay), 0, 1) : 1;
      for (let i = 0; i < count; i++) {
        const f = fillRefs.current[i];
        if (f) f.style.transform = `scaleX(${i < st.shown ? 1 : i === st.shown ? prog : 0})`;
      }
    };

    const announce = () => {
      const idx = loop ? wrap(Math.round(st.target), count) : clamp(Math.round(st.target), 0, count - 1);
      if (idx === st.shown) return;
      st.shown = idx; setActive(idx);
    };

    const paused = () =>
      (pauseOnHover && st.hovered) || st.focused || Boolean(st.drag) ||
      st.wheeling || !st.visible || document.hidden;

    const tick = (now: number) => {
      raf = 0; if (!alive) return;
      const dt = st.last ? Math.min(0.05, (now - st.last) / 1000) : 1 / 60;
      st.last = now; let busy = false;
      if (!st.drag?.moved && !st.wheeling) {
        if (reduce) { st.p = st.target; st.v = 0; }
        else {
          const steps = Math.ceil(dt * 240), h = dt / steps;
          for (let k = 0; k < steps; k++) {
            st.v += (STIFFNESS * (st.target - st.p) - DAMPING * st.v) * h;
            st.p += st.v * h;
          }
          if (Math.abs(st.target - st.p) < 0.0004 && Math.abs(st.v) < 0.004) {
            st.p = st.target; st.v = 0;
          } else busy = true;
        }
        if (!busy && loop && count) st.target = st.p = wrap(Math.round(st.target), count);
      }
      if (autoplay && !paused()) {
        st.elapsed += dt * 1000;
        if (st.elapsed >= Math.max(600, autoplayDelay)) step(1, true);
        busy = true;
      }
      apply();
      if (busy) raf = requestAnimationFrame(tick); else st.last = 0;
    };

    const wake   = () => { if (!raf && alive) raf = requestAnimationFrame(tick); };
    const moveTo = (target: number) => { st.target = target; st.elapsed = 0; announce(); apply(); wake(); };
    const step   = (dir: number, auto = false) => {
      if (count < 2) return;
      let next = Math.round(st.target) + dir;
      if (!loop) { if (auto && next > count - 1) next = 0; next = clamp(next, 0, count - 1); }
      moveTo(next);
    };
    const goTo = (idx: number) => {
      const goal = clamp(Math.round(idx), 0, count - 1), cur = Math.round(st.target);
      moveTo(loop ? cur + nearest(goal - wrap(cur, count), count) : goal);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      st.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, p: st.p, from: 0, moved: false, samples: [] };
    };
    const onMove = (e: PointerEvent) => {
      if (!st.drag || e.pointerId !== st.drag.id) return;
      if (!st.drag.moved) {
        const dx = e.clientX - st.drag.x, dy = e.clientY - st.drag.y;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) { st.drag = null; return; }
        st.drag.moved = true; st.drag.x = e.clientX; st.drag.p = st.p;
        st.drag.from = Math.round(st.target);
        (view as Element & { setPointerCapture?: (id: number) => void }).setPointerCapture?.(e.pointerId);
        view.dataset.dragging = "true";
      }
      const raw = st.drag.p - (e.clientX - st.drag.x) / span;
      st.p = loop ? raw : clamp(raw, -0.15, count - 0.85);
      st.v = 0; st.target = Math.round(loop ? st.p : clamp(st.p, 0, count - 1));
      st.drag.samples.push([e.timeStamp, e.clientX]);
      if (st.drag.samples.length > 8) st.drag.samples.shift();
      announce(); apply();
    };
    const onUp = (e: PointerEvent) => {
      const drag = st.drag;
      if (!drag || e.pointerId !== drag.id) return;
      st.drag = null; delete view.dataset.dragging;
      if (!drag.moved) { wake(); return; }
      st.suppress = true; window.setTimeout(() => { st.suppress = false; }, 0);
      const sample  = drag.samples.find(([t]) => e.timeStamp - t < 90) ?? [e.timeStamp, e.clientX];
      const elapsed = Math.max(16, e.timeStamp - sample[0]);
      const vel     = clamp(((sample[1] - e.clientX) / elapsed) * (1000 / span), -12, 12);
      const travelled = st.p - drag.from;
      let target = Math.round(st.p + vel * 0.2);
      if (target === drag.from) {
        if (Math.abs(vel) > 0.8) target += Math.sign(vel);
        else if (Math.abs(travelled) > 0.18) target += Math.sign(travelled);
      }
      if (!loop) target = clamp(target, 0, count - 1);
      st.v = (loop || (st.p >= 0 && st.p <= count - 1)) ? vel : 0;
      moveTo(target);
    };
    const onClickCapture = (e: MouseEvent) => {
      if (!st.suppress) return; e.preventDefault(); e.stopPropagation(); st.suppress = false;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; e.preventDefault();
      const raw = st.p + e.deltaX / span;
      st.p = loop ? raw : clamp(raw, -0.15, count - 0.85);
      st.v = 0; st.wheeling = true;
      st.target = Math.round(loop ? st.p : clamp(st.p, 0, count - 1));
      announce(); apply();
      window.clearTimeout(st.wheelTimer);
      st.wheelTimer = window.setTimeout(() => {
        st.wheeling = false;
        moveTo(Math.round(loop ? st.p : clamp(st.p, 0, count - 1)));
      }, 120);
    };
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, () => void> = {
        ArrowRight: () => step(1), ArrowLeft: () => step(-1),
        Home: () => goTo(0), End: () => goTo(count - 1),
      };
      if (!map[e.key]) return; e.preventDefault(); map[e.key]();
    };

    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const box = entry.contentRect;
        if (entry.target === stage) setStageW(Math.max(1, Math.round(box.width)));
        if (entry.target === view)  setViewH(Math.max(1,  Math.round(box.height)));
      }
    });
    resizeObs.observe(stage);
    resizeObs.observe(view);

    const visObs = new IntersectionObserver((entries) => {
      st.visible = entries.some((e) => e.isIntersecting); if (st.visible) wake();
    });
    visObs.observe(root);

    view.addEventListener("pointerdown", onDown);
    view.addEventListener("pointermove", onMove);
    view.addEventListener("pointerup",   onUp);
    view.addEventListener("pointercancel", onUp);
    view.addEventListener("click", onClickCapture as EventListener, true);
    view.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("keydown", onKey);
    root.addEventListener("mouseenter", () => { st.hovered = true; });
    root.addEventListener("mouseleave", () => { st.hovered = false; wake(); });
    document.addEventListener("visibilitychange", () => { if (!document.hidden) { st.last = 0; wake(); } });

    engineRef.current = {
      goTo, step,
      sync: () => {
        if (!loop && count) {
          st.target = clamp(Math.round(st.target), 0, count - 1);
          st.p = clamp(st.p, -0.3, count - 0.7);
        }
        announce(); apply(); wake();
      },
    };
    engineRef.current.sync();

    return () => {
      alive = false; cancelAnimationFrame(raf); window.clearTimeout(st.wheelTimer);
      engineRef.current = null; resizeObs.disconnect(); visObs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, effect, loop, autoplay, autoplayDelay, pauseOnHover]);

  useLayoutEffect(() => { engineRef.current?.sync(); });

  useEffect(() => {
    if (reportedRef.current === active) return;
    reportedRef.current = active; onChangeRef.current?.(active);
  }, [active]);

  const atStart    = !loop && active === 0;
  const atEnd      = !loop && active === count - 1;
  const perspective = effect === "tilt" ? "1000px" : undefined;

  const controlsNode = (indicator !== "none" || arrows) && count > 1 && (
    <div className="c-controls">
      {arrows && (
        <button type="button" className="c-arrow" aria-label="Previous"
          disabled={atStart} onClick={() => engineRef.current?.step(-1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {indicator === "dots" && (
        <div className="c-dots">
          {items.map((_, i) => (
            <button key={i} type="button"
              className={`c-dot${i === active ? " is-active" : ""}`}
              aria-label={`Slide ${i + 1}`}
              onClick={() => engineRef.current?.goTo(i)}>
              <span className="c-dot-mark" />
            </button>
          ))}
        </div>
      )}
      {indicator === "bars" && (
        <div className="c-bars">
          {items.map((_, i) => (
            <button key={i} type="button" className="c-bar"
              aria-label={`Slide ${i + 1}`}
              onClick={() => engineRef.current?.goTo(i)}>
              <span className="c-bar-track">
                <span ref={(el) => { fillRefs.current[i] = el; }} className="c-bar-fill"
                  style={{ transform: `scaleX(${i < active ? 1 : i === active && !autoplay ? 1 : 0})` }} />
              </span>
            </button>
          ))}
        </div>
      )}
      {indicator === "counter" && (
        <div className="c-counter">
          <span className="c-counter-cur">{String(active + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(count).padStart(2, "0")}</span>
        </div>
      )}
      {arrows && (
        <button type="button" className="c-arrow" aria-label="Next"
          disabled={atEnd} onClick={() => engineRef.current?.step(1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`c-container${frame ? " has-frame" : ""} ${className}`}
      style={{ "--c-r": `${radius}px`, width: "100%", height: "100%", ...style } as CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div ref={stageRef} className="c-stage">
        <div className="c-header" aria-hidden="true">
          <span className="c-header-dot" />
          <span className="c-header-dot" />
          <span className="c-header-dot" />
        </div>
        <div
          ref={viewRef}
          className="c-view"
          aria-live={autoplay ? "off" : "polite"}
          style={{ perspective }}
        >
          {items.map((item, i) => {
            const p = getPose(i, active);
            return (
              <div key={i}
                ref={(el) => { slideRefs.current[i] = el; }}
                className="c-slide"
                style={{
                  width: cardW, height: cardH,
                  transform: p.transform, opacity: p.opacity,
                  visibility: p.visible ? "visible" : "hidden",
                  zIndex: p.layer,
                }}
                role="group" aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                onClick={() => { if (i !== active) engineRef.current?.goTo(i); }}
              >
                <Card item={item} radius={radius} />
              </div>
            );
          })}
        </div>
        {controlsNode}
      </div>
    </div>
  );
}
