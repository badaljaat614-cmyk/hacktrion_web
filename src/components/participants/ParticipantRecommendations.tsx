"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import Carousel from "./Carousel";

const SLIDES = [
  { image: "/images/participants/carousel/search/image1.png",  alt: "Hacktrion recommendations screen 1" },
  { image: "/images/participants/carousel/search/image2.jpeg", alt: "Hacktrion recommendations screen 2" },
  { image: "/images/participants/carousel/search/image3.jpeg", alt: "Hacktrion recommendations screen 3" },
];

export default function ParticipantRecommendations() {
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
      className="relative overflow-hidden bg-surface-secondary px-5 py-16 sm:px-8 sm:py-20 lg:py-28"
    >
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/images/hacktrion-light-lavender-transparent.png')",
          backgroundPosition: "35% -30%",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-2">

          {/* ── CAROUSEL — appears first on mobile, left on desktop ── */}
          <div
            className={`w-full transition-all duration-1000 lg:order-1 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="rec-carousel-wrap">
              <Carousel
                items={SLIDES}
                baseWidth={300}
                aspectRatio={1.16}
                effect="tilt"
                indicator="bars"
                arrows={true}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                loop={true}
                frame={true}
                radius={14}
                gap={0}
              />
            </div>
          </div>

          {/* ── TEXT — appears second on mobile, right on desktop ── */}
          <div
            className={`transition-all duration-700 lg:order-2 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Less Searching.{" "}
              <span className="text-primary">More Relevant Opportunities</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:mt-5 sm:text-base lg:text-lg">
              Hacktrion uses your profile and interests to suggest hackathons
              that may be right for you, helping you discover opportunities more
              easily.
            </p>

            <div className="mt-6 space-y-4 sm:mt-8">
              {[
                {
                  title: "Smart Matching",
                  description: "Our AI analyzes your skills and interests to find the best hackathons for you.",
                },
                {
                  title: "Personalized Feed",
                  description: "See recommendations tailored to your profile and past participation.",
                },
                {
                  title: "Discover Hidden Gems",
                  description: "Find relevant hackathons you might have missed through manual searching.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-3 sm:gap-4"
                  style={{
                    animation: isVisible
                      ? `recSlideIn 0.5s ease-out ${400 + i * 100}ms both`
                      : "none",
                  }}
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent-soft">
                    <Sparkles size={15} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-text-primary sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .rec-carousel-wrap {
          width: 100%;
          height: 460px;
          position: relative;
        }
        @media (min-width: 1024px) {
          .rec-carousel-wrap {
            max-width: 50%;
          }
        }
        @media (max-width: 640px) {
          .rec-carousel-wrap { height: 380px; }
        }
        @media (max-width: 400px) {
          .rec-carousel-wrap { height: 320px; }
        }
        @keyframes recSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
