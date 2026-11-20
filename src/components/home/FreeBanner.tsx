"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const perks = [
  "No subscription required",
  "Full platform access",
  "Unlimited registrations",
];

export default function FreeBanner() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`free-banner-section ${visible ? "is-visible" : ""}`}
      aria-label="Free for 3 months offer"
    >
      <div className="free-banner-inner">

        {/* Left: copy */}
        <div className="free-banner-copy">
          <span className="free-banner-pill free-banner-animate" style={{ "--d": "0ms" } as React.CSSProperties}>
            <Sparkles size={12} />
            LIMITED-TIME OFFER
          </span>

          <h2 className="free-banner-heading free-banner-animate" style={{ "--d": "120ms" } as React.CSSProperties}>
            Free for Your First{" "}
            <span className="free-banner-highlight">3&nbsp;Months</span>
          </h2>

          <p className="free-banner-desc free-banner-animate" style={{ "--d": "230ms" } as React.CSSProperties}>
            Organize hackathons on Hacktrion at zero cost. No subscription,
            no credit card — just sign up and start.
          </p>

          <ul className="free-banner-perks free-banner-animate" style={{ "--d": "340ms" } as React.CSSProperties}>
            {perks.map((p) => (
              <li key={p}>
                <CheckCircle2 size={15} />
                {p}
              </li>
            ))}
          </ul>

          <Link
            href="/organizations"
            className="free-banner-cta free-banner-animate"
            style={{ "--d": "450ms" } as React.CSSProperties}
          >
            Become an Organizer
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Right: offer card */}
        <div className="free-banner-card free-banner-animate" style={{ "--d": "180ms" } as React.CSSProperties} aria-hidden="true">
          <div className="free-banner-card-glow" />

          <span className="free-banner-card-label">HACKTRION OFFER</span>

          <div className="free-banner-card-price">
            <span className="free-banner-free">FREE</span>
            <span className="free-banner-duration">/ 3 months</span>
          </div>

          <div className="free-banner-card-divider" />

          <ul className="free-banner-card-list">
            {[
              "Full organizer dashboard",
              "Hackathon publishing",
              "Participant data export",
              "Registration management",
            ].map((item) => (
              <li key={item}>
                <span className="free-banner-check">
                  <CheckCircle2 size={13} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="free-banner-card-badge">
            No credit card needed
          </div>
        </div>

      </div>
    </section>
  );
}
