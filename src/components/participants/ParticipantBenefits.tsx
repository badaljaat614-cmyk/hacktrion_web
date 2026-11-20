"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Sparkles, UserCheck } from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Explore hackathons from different organizers in one place and find opportunities that interest you.",
  },
  {
    icon: Sparkles,
    title: "Personalized Suggestions",
    description:
      "Get AI-powered hackathon recommendations based on your profile and interests.",
  },
  {
    icon: UserCheck,
    title: "Simple Registration",
    description:
      "Find an interesting hackathon, review its details, and follow its registration process.",
  },
];

export default function ParticipantBenefits() {
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-surface-secondary px-6 py-20 sm:px-8 lg:py-28"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-[-150px] top-20 h-[350px] w-[350px] rounded-full opacity-40 blur-[100px]"
        style={{ background: "rgba(124, 58, 237, 0.1)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold tracking-wider text-primary"
            style={{ transitionDelay: "100ms" }}
          >
            <Sparkles size={13} />
            WHY HACKTRION FOR PARTICIPANTS
          </span>

          <h2
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl"
            style={{ transitionDelay: "250ms" }}
          >
            Everything You Need to{" "}
            <span className="text-primary">Find Your Next Hackathon</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary"
            style={{ transitionDelay: "420ms" }}
          >
            Hacktrion makes it simple to discover, explore, and participate in
            hackathons that match your interests.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article
                key={index}
                className={`group relative rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-500 hover:border-border-highlight hover:shadow-md ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + index * 130}ms` }}
              >
                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-accent-soft p-3 text-primary transition-transform group-hover:scale-110">
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-text-primary">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-text-secondary">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
