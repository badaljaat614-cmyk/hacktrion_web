"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string };

type Props = {
  images: Slide[];
  autoPlayInterval?: number;
};

export default function ImageSlider({ images, autoPlayInterval = 3500 }: Props) {
  // stack order: index 0 = top (visible), 1 = middle, 2 = bottom
  const [stack, setStack] = useState([0, 1, 2]);
  const [lifting, setLifting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rotate: bring bottom card to top (slides up from under)
  const advance = useCallback(() => {
    if (lifting) return;
    setLifting(true);
    setTimeout(() => {
      setStack((prev) => {
        const next = [...prev];
        const bottom = next.pop()!;
        next.unshift(bottom);
        return next;
      });
      setLifting(false);
    }, 600);
  }, [lifting]);

  const retreat = useCallback(() => {
    if (lifting) return;
    setLifting(true);
    setTimeout(() => {
      setStack((prev) => {
        const next = [...prev];
        const top = next.shift()!;
        next.push(top);
        return next;
      });
      setLifting(false);
    }, 600);
  }, [lifting]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(advance, autoPlayInterval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [stack, advance, autoPlayInterval]);

  const pause = () => { if (timerRef.current) clearTimeout(timerRef.current); };
  const resume = () => { timerRef.current = setTimeout(advance, autoPlayInterval); };

  return (
    <div
      className="stack-root"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Card stack — rendered bottom to top so top card is last in DOM */}
      {[...stack].reverse().map((imgIndex, reversedPos) => {
        const pos = 2 - reversedPos; // 0=top, 1=mid, 2=bottom
        const isTop = pos === 0;
        const isLifting = isTop && lifting;

        return (
          <div
            key={imgIndex}
            className={`stack-card ${isLifting ? "is-lifting" : ""}`}
            style={{
              "--pos": pos,
              "--total": images.length,
            } as React.CSSProperties}
          >
            <Image
              src={images[imgIndex].src}
              alt={images[imgIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={pos === 0}
            />
          </div>
        );
      })}

      {/* Prev / Next buttons */}
      <button
        onClick={retreat}
        className="stack-btn stack-btn-left"
        aria-label="Previous"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <button
        onClick={advance}
        className="stack-btn stack-btn-right"
        aria-label="Next"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      <style jsx>{`

        /* ── Root ── */
        .stack-root {
          position: relative;
          width: 100%;
          height: 100%;
          /* extra space so peeking cards below are visible */
          padding-bottom: 32px;
        }

        /* ── Every card ── */
        .stack-card {
          position: absolute;
          /* each card is a little shorter + offset downward by its depth */
          left: calc(var(--pos) * 18px);
          right: calc(var(--pos) * 18px);
          top: calc(var(--pos) * 14px);
          bottom: 0;

          border-radius: 16px;
          overflow: hidden;

          /* depth cue: cards lower in stack are slightly scaled + darker */
          transform: scale(calc(1 - var(--pos) * 0.03));
          filter: brightness(calc(1 - var(--pos) * 0.08));

          transition:
            left   500ms cubic-bezier(0.4, 0, 0.2, 1),
            right  500ms cubic-bezier(0.4, 0, 0.2, 1),
            top    500ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 500ms cubic-bezier(0.4, 0, 0.2, 1),
            filter 500ms ease,
            box-shadow 500ms ease;

          box-shadow:
            0 calc(2px + var(--pos) * 2px) calc(12px + var(--pos) * 6px)
            rgba(0, 0, 0, calc(0.06 + var(--pos) * 0.04));
        }

        /* ── Top card lifts up and slides away ── */
        .stack-card.is-lifting {
          animation: liftUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes liftUp {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
            z-index: 10;
          }
          40% {
            transform: scale(1.03) translateY(-28px);
            opacity: 1;
          }
          100% {
            transform: scale(0.97) translateY(120%);
            opacity: 0;
            z-index: 10;
          }
        }

        /* ── Buttons ── */
        .stack-btn {
          position: absolute;
          bottom: 0px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: var(--surface);
          color: var(--primary);
          cursor: pointer;
          transition:
            transform 200ms ease,
            border-color 200ms ease,
            box-shadow 200ms ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .stack-btn:hover {
          transform: scale(1.12);
          border-color: var(--primary);
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.18);
        }
        .stack-btn:active {
          transform: scale(0.94);
        }
        .stack-btn-left  { left: calc(50% - 44px); }
        .stack-btn-right { left: calc(50% + 8px);  }

        @media (prefers-reduced-motion: reduce) {
          .stack-card,
          .stack-card.is-lifting {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
