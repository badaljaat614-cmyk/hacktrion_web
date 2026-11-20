"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Users,
  Building2,
  CalendarDays,
  FileSpreadsheet,
  Trophy,
  LayoutDashboard,
  ClipboardCheck,
} from "lucide-react";

const audiences = [
  {
    icon: Users,
    type: "For Participants",
    title: "Your next big idea starts here.",
    description:
      "Discover exciting hackathons, connect with like-minded innovators, and turn your ideas into real-world solutions. Find opportunities that help you learn, compete, and grow.",
    features: [
      "Discover upcoming hackathons",
      "Explore challenges and event details",
      "Register for events with ease",
      "Track your hackathon participation",
    ],
    href: "/participants",
    linkText: "Explore for Participants",
  },
  {
    icon: Building2,
    type: "For Organizers",
    title: "Everything you need to host a hackathon.",
    description:
      "From publishing your event to managing registrations, Hacktrion simplifies the entire process. Focus on creating an amazing experience while we help manage the operations.",
    features: [
      "Create and publish hackathon events",
      "Manage participant registrations",
      "Access and export participant data",
      "Manage event results and outcomes",
    ],
    href: "/organizations",
    linkText: "Explore for Organizers",
  },
];

const platformFeatures = [
  { icon: CalendarDays, label: "Hackathon Discovery" },
  { icon: LayoutDashboard, label: "Event Management" },
  { icon: FileSpreadsheet, label: "Registration Management" },
  { icon: Trophy, label: "Results Management" },
];

export default function WhatIsHacktrion() {
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
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-is-hacktrion"
      className={`what-is-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="what-is-pattern" aria-hidden="true" />
      <div className="what-is-glow" aria-hidden="true" />

      <div className="what-is-container">

        {/* Section Heading */}

        <div className="what-is-heading">
          <span className="eyebrow">
            One platform. Two possibilities.
          </span>

          <h2>
            What is <span>Hacktrion?</span>
          </h2>

          <p>
           Hacktrion is platfrom built by KodePix, it connects 
           hackthon organizers to participents and make process easy to 
           organize a hackthon for organizers
          </p>
        </div>

        {/* Audience Cards */}

        <div className="what-is-grid">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;

            return (
              <article
                className="audience-card"
                key={audience.type}
                style={
                  {
                    "--card-delay": `${index * 160}ms`,
                  } as React.CSSProperties
                }
              >
                {/* Type */}

                <div className="audience-type card-item">
                  <span className="audience-type-icon">
                    <Icon size={15} />
                  </span>

                  {audience.type}
                </div>

                {/* Heading */}

                <h3 className="card-item">
                  {audience.title}
                </h3>

                {/* Description */}

                <p className="audience-description card-item">
                  {audience.description}
                </p>

                {/* Features */}

                <div className="audience-provides card-item">
                  <span className="provides-line" />
                  <span>What Hacktrion Provides</span>
                  <span className="provides-line" />
                </div>

                <ul className="audience-features">
                  {audience.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="card-item"
                      style={
                        {
                          "--item-delay": `${featureIndex * 90}ms`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="feature-arrow">
                        <ArrowUpRight size={14} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}

                <Link
                  href={audience.href}
                  className="audience-link card-item"
                >
                  {audience.linkText}
                  <ArrowUpRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Platform Features */}

        <div className="platform-features">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className="platform-feature" key={feature.label}>
                <Icon size={18} />
                <span>{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}