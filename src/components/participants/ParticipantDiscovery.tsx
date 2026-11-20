"use client";

import { useEffect, useRef, useState } from "react";
import Carousel from "./Carousel";

const SLIDES = [
  { image: "/images/participants/carousel/search/image1.png",  alt: "Hacktrion discovery screen 1" },
  { image: "/images/participants/carousel/search/image2.jpeg", alt: "Hacktrion discovery screen 2" },
  { image: "/images/participants/carousel/search/image3.jpeg", alt: "Hacktrion discovery screen 3" },
];

export default function ParticipantDiscovery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-2">

          {/* ── TEXT ── */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Your Next Hackathon Is Just a{" "}
              <span className="text-primary">Discovery Away</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:mt-5 sm:text-base lg:text-lg">
              Explore hackathons, compare opportunities, and find events that
              match your interests.
            </p>

            <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {[
                "Browse hackathons from multiple organizers",
                "Filter by date, location, and category",
                "View detailed event information",
                "Register with a simple process",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-text-secondary"
                  style={{
                    animation: isVisible
                      ? `discSlideIn 0.5s ease-out ${400 + i * 100}ms both`
                      : "none",
                  }}
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CAROUSEL — fixed 460px height ── */}
          <div
            className={`w-full transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="disc-carousel-wrap">
              <Carousel
                items={SLIDES}
                baseWidth={300}
                aspectRatio={1.16}
                effect="slide"
                indicator="dots"
                arrows={true}
                autoplay={true}
                autoplayDelay={3500}
                pauseOnHover={true}
                loop={true}
                frame={true}
                radius={14}
                gap={0}
              />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .disc-carousel-wrap {
          width: 100%;
          height: 460px;
          position: relative;
        }
        @media (min-width: 1024px) {
          .disc-carousel-wrap {
            max-width: 50%;
            margin-left: auto;
          }
        }
        @media (max-width: 640px) {
          .disc-carousel-wrap { height: 380px; }
        }
        @media (max-width: 400px) {
          .disc-carousel-wrap { height: 320px; }
        }
        @keyframes discSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
