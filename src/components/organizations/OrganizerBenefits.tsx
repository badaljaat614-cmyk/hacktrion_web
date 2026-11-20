"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, ClipboardList, Globe, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: LayoutDashboard,
    number: "01",
    title: "Simplified Event Management",
    description:
      "Manage hackathon information and event activities through one centralized platform. No more switching between disconnected tools.",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Organized Registrations",
    description:
      "Access participant registration information without managing multiple disconnected sources. Everything is in one place.",
  },
  {
    icon: Globe,
    number: "03",
    title: "Less Operational Complexity",
    description:
      "Publish your hackathon on Hacktrion without needing to create and maintain a separate event website. Focus on the experience.",
  },
];

export default function OrganizerBenefits() {
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
      id="org-benefits"
      className={`org-benefits-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="org-benefits-glow" aria-hidden="true" />

      <div className="org-benefits-container">

        {/* Heading */}
        <div className="org-benefits-heading">
          <span className={`org-eyebrow org-benefits-animate`}>
            <Sparkles size={13} />
            WHY HACKTRION FOR ORGANIZERS
          </span>

          <h2 className="org-benefits-animate">
            Everything You Need,{" "}
            <span style={{ color: "var(--primary)" }}>Nothing You Don&apos;t</span>
          </h2>

          <p className="org-benefits-animate">
            Hacktrion is built to solve the real problems organizers face. Here&apos;s
            how it makes your work simpler.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="org-benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article className="org-benefit-card" key={benefit.number}>
                <span className="org-benefit-number">{benefit.number}</span>

                <div className="org-benefit-icon">
                  <Icon size={22} strokeWidth={1.7} />
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
