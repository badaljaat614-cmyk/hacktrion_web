"use client";

import { useEffect, useRef, useState } from "react";
import { UserPlus, Building2, Trophy, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Register as an organizer on Hacktrion. The signup process is straightforward and takes just a few minutes.",
    label: "STEP ONE",
  },
  {
    number: "02",
    icon: Building2,
    title: "Set Up Your Organization Profile",
    description:
      "Add the necessary institutional or organizational information to complete your organizer profile.",
    label: "STEP TWO",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Publish Your Hackathon",
    description:
      "Create your hackathon, provide its details, and publish it through Hacktrion for participants to discover.",
    label: "STEP THREE",
  },
];

export default function OrganizerWorkflow() {
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="org-how-it-works"
      className={`org-workflow-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="org-workflow-bg" aria-hidden="true" />

      <div className="org-workflow-container">

        {/* Header */}
        <header className="org-workflow-header">
          <span className="org-workflow-eyebrow org-workflow-animate">
            <Sparkles size={13} />
            SIMPLE PROCESS
          </span>

          <h2 className="org-workflow-animate">
            Get Started in{" "}
            <span>Three Steps</span>
          </h2>

          <p className="org-workflow-animate">
            Organizing a hackathon through Hacktrion is simple.
            Follow these three steps and your event will be live.
          </p>
        </header>

        {/* Steps */}
        <div className="org-workflow-steps">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                className="org-workflow-step"
                key={step.number}
              >
                {/* Number circle */}
                <div className="org-workflow-step-num" aria-hidden="true">
                  {step.number}
                </div>

                {/* Card body */}
                <div className="org-workflow-step-body">
                  <div className="org-workflow-step-icon">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <div className="org-workflow-step-label">
                    <span>{step.label}</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="org-workflow-footer org-workflow-animate">
          <span className="org-workflow-footer-icon">
            <Sparkles size={13} />
          </span>
          <p>Three simple steps. Your hackathon, live on Hacktrion.</p>
        </div>

      </div>
    </section>
  );
}
