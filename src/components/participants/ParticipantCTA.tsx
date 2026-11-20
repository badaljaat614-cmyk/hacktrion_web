"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ParticipantCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-accent to-primary px-6 py-20 sm:px-8 lg:py-28"
    >
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 20% 50%, rgba(167, 139, 250, 0.15), transparent), radial-gradient(ellipse 40% 60% at 85% 50%, rgba(196, 167, 255, 0.12), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className={`relative mx-auto max-w-4xl text-center transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Icon */}
        <div
          className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-500"
          style={{ transitionDelay: "100ms" }}
        >
          <Sparkles size={32} className="text-white" />
        </div>

        {/* Heading */}
        <h2
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ transitionDelay: "250ms" }}
        >
          Your Next Big Opportunity{" "}
          <span className="block">Starts Here</span>
        </h2>

        {/* Description */}
        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ transitionDelay: "420ms" }}
        >
          Discover hackathons, explore new opportunities, and turn your ideas
          into reality with Hacktrion.
        </p>

        {/* CTA Button */}
        <div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ transitionDelay: "590ms" }}
        >
          <Link
            href="/contact?topic=participant"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary shadow-xl shadow-black/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-black/30"
          >
            Join Hacktrion
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/blogs"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
          >
            Read participant guides
          </Link>
        </div>

        {/* Bottom decorative elements */}
        <div
          className="mt-12 flex items-center justify-center gap-8 text-sm text-white/60"
          style={{ transitionDelay: "760ms" }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Free to join</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>AI-powered matching</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Mobile-first experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
