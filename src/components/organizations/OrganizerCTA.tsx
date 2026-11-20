"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";

export default function OrganizerCTA() {
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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="org-cta"
      className={`org-cta-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="org-cta-glow" aria-hidden="true" />

      <div className="org-cta-container">

        <div className="org-cta-icon" aria-hidden="true">
          <Trophy size={26} strokeWidth={1.7} />
        </div>

        <h2>
          Ready to Organize Your{" "}
          <span>Next Hackathon?</span>
        </h2>

        <p>
          Bring your institution&apos;s hackathon to Hacktrion and manage your
          event through one centralized platform.
        </p>

        <div className="org-cta-actions">
          <Link href="/contact?topic=organizer" className="org-cta-btn-primary">
            Contact the Team
            <ArrowRight size={17} />
          </Link>
        </div>

        <p className="org-cta-note">
          <Sparkles size={13} />
          No separate website required. Everything is on Hacktrion.
        </p>

      </div>
    </section>
  );
}
