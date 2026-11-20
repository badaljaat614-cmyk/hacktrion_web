"use client";

import { useEffect, useRef, useState } from "react";
import { UserPlus, Search, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your participant account on Hacktrion and get started.",
  },
  {
    number: "02",
    icon: Search,
    title: "Explore Hackathons",
    description:
      "Discover hackathons and receive relevant AI-powered recommendations based on your interests.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Register & Participate",
    description:
      "Choose a hackathon, review its details, and follow the registration process.",
  },
];

export default function ParticipantWorkflow() {
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
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="participant-how-it-works"
      className="relative overflow-hidden bg-background px-6 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold tracking-wider text-primary"
            style={{ transitionDelay: "100ms" }}
          >
            <Sparkles size={13} />
            SIMPLE PROCESS, BIG POSSIBILITIES
          </span>

          <h2
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl"
            style={{ transitionDelay: "250ms" }}
          >
            How <span className="text-primary">It Works</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary"
            style={{ transitionDelay: "420ms" }}
          >
            Getting started with Hacktrion is simple. Follow these three steps
            to discover your next hackathon.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div
            className={`absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-border via-primary/30 to-border transition-all duration-1000 lg:block ${
              isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
            aria-hidden="true"
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  {/* Step card */}
                  <div className="group relative flex flex-col items-center text-center">
                    {/* Icon circle */}
                    <div className="relative z-10 mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-border bg-surface shadow-lg transition-all group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                        <Icon size={32} className="text-white" strokeWidth={1.7} />
                      </div>

                      {/* Number badge */}
                      <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-xl font-bold text-text-primary">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>

                    {/* Arrow indicator (desktop only) */}
                    {index < steps.length - 1 && (
                      <div
                        className="absolute -right-8 top-16 hidden text-primary transition-all group-hover:translate-x-1 lg:block"
                        aria-hidden="true"
                      >
                        <ArrowRight size={24} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <Sparkles size={16} className="text-primary" />
            <span className="font-medium">
              Three simple steps. One platform. Endless possibilities.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
