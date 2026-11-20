"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showBrand, setShowBrand] = useState(false);
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    // Sequence of animations
    const brandTimer = setTimeout(() => setShowBrand(true), 300);
    const exitTimer = setTimeout(() => setStartExit(true), 2200);
    const hideTimer = setTimeout(() => setIsVisible(false), 2900);

    return () => {
      clearTimeout(brandTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-700 ${
        startExit ? "animate-earthquake opacity-0" : "opacity-100"
      }`}
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="flex items-center justify-center">
        {/* Logo and Hacktrion text - Horizontal Layout */}
        <div
          className={`flex items-center gap-4 transition-all duration-1000 sm:gap-6 ${
            showBrand
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-90 opacity-0"
          }`}
          style={{
            transform: showBrand ? "translateZ(50px)" : "translateZ(0)",
            perspective: "1000px",
          }}
        >
          {/* Logo - Left side */}
          <div className="transition-all duration-1000">
            <Image
              src="/favicon.png"
              alt="Hacktrion Logo"
              width={120}
              height={120}
              priority
              className="h-auto w-20 sm:w-28 md:w-32"
            />
          </div>

          {/* Hacktrion text - Right side */}
          <h1
            className="relative text-5xl font-bold tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Hacktrion
          </h1>
        </div>
      </div>

      <style jsx>{`
        @keyframes earthquake {
          0% {
            transform: translateY(0);
          }
          5% {
            transform: translateY(-12px);
          }
          10% {
            transform: translateY(10px);
          }
          15% {
            transform: translateY(-10px);
          }
          20% {
            transform: translateY(8px);
          }
          25% {
            transform: translateY(-8px);
          }
          30% {
            transform: translateY(6px);
          }
          35% {
            transform: translateY(-6px);
          }
          40% {
            transform: translateY(4px);
          }
          45% {
            transform: translateY(-4px);
          }
          50% {
            transform: translateY(3px);
          }
          55% {
            transform: translateY(-3px);
          }
          60% {
            transform: translateY(2px);
          }
          65% {
            transform: translateY(-2px);
          }
          70% {
            transform: translateY(1px);
          }
          75% {
            transform: translateY(-1px);
          }
          80%,
          100% {
            transform: translateY(0);
          }
        }

        .animate-earthquake {
          animation: earthquake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
